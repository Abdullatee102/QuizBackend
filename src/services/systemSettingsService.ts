/**
 * System Settings & Campus-Wide Access Control Service
 * Brain Buzz — Core Platform Infrastructure
 *
 * Manages administrative open-access windows, onboarding free trials,
 * and subscription enforcement policies.
 */

import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { systemSettingsTable, usersTable, userEntitlementsTable } from '../db/schema.js';
import { auditService } from './admin/auditService.js';
import logger from '../config/logger.js';

export interface AccessControlConfig {
  /** If true, all students can access courses & materials without paid pass */
  isGlobalTrialActive: boolean;
  /** ISO timestamp when global trial expires */
  globalTrialEndsAt: string | null;
  /** Human-readable banner label for global trial */
  globalTrialDescription: string;

  /** If true, new students receive a free trial from their registration date */
  isUserTrialEnabled: boolean;
  /** Number of days from user.createdAt the onboarding trial remains valid */
  userTrialDays: number;

  /** Master switch to enforce paid subscription (default true) */
  enforceSubscription: boolean;
}

const DEFAULT_ACCESS_CONTROL: AccessControlConfig = {
  isGlobalTrialActive: false,
  globalTrialEndsAt: null,
  globalTrialDescription: 'Campus Open Access Period',
  isUserTrialEnabled: true,
  userTrialDays: 7, // 7 days free onboarding trial for all users
  enforceSubscription: true,
};

const SETTINGS_KEY = 'access_control';

// In-memory cache with short TTL (30 seconds) to avoid DB spam on high throughput
let cachedConfig: AccessControlConfig | null = null;
let cacheExpiresAt = 0;

export const systemSettingsService = {
  /**
   * Retrieves the current access control configuration.
   */
  getAccessControlConfig: async (): Promise<AccessControlConfig> => {
    const now = Date.now();
    if (cachedConfig && now < cacheExpiresAt) {
      return cachedConfig;
    }

    try {
      const [record] = await db
        .select()
        .from(systemSettingsTable)
        .where(eq(systemSettingsTable.key, SETTINGS_KEY));

      if (record && record.value) {
        cachedConfig = {
          ...DEFAULT_ACCESS_CONTROL,
          ...(record.value as AccessControlConfig),
        };
      } else {
        cachedConfig = { ...DEFAULT_ACCESS_CONTROL };
      }
    } catch (err: any) {
      logger.warn(`[SYSTEM SETTINGS] Failed to read from DB, using defaults: ${err.message}`);
      cachedConfig = { ...DEFAULT_ACCESS_CONTROL };
    }

    cacheExpiresAt = now + 30 * 1000; // 30 second cache
    return cachedConfig;
  },

  /**
   * Updates access control configuration.
   */
  updateAccessControlConfig: async (
    updates: Partial<AccessControlConfig>,
    adminId?: string
  ): Promise<AccessControlConfig> => {
    const current = await systemSettingsService.getAccessControlConfig();
    const updated: AccessControlConfig = {
      ...current,
      ...updates,
    };

    const now = new Date();

    await db
      .insert(systemSettingsTable)
      .values({
        key: SETTINGS_KEY,
        value: updated,
        description: 'Global campus trial and subscription access control configuration',
        updatedBy: adminId ? (adminId as any) : null,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: systemSettingsTable.key,
        set: {
          value: updated,
          updatedBy: adminId ? (adminId as any) : null,
          updatedAt: now,
        },
      });

    // Invalidate cache immediately
    cachedConfig = updated;
    cacheExpiresAt = Date.now() + 30 * 1000;

    if (adminId) {
      try {
        await auditService.logAdminAction({
          adminUserId: adminId,
          action: 'UPDATE_SYSTEM_SETTINGS',
          resourceType: 'system_settings',
          resourceId: SETTINGS_KEY,
          metadata: { before: current, after: updated },
        });
      } catch (err: any) {
        logger.warn(`[AUDIT LOG ERROR] ${err.message}`);
      }
    }

    logger.info(`[ACCESS CONTROL UPDATED] Global Trial: ${updated.isGlobalTrialActive}, User Trial: ${updated.isUserTrialEnabled} (${updated.userTrialDays} days)`);
    return updated;
  },

  /**
   * Authoritatively evaluates whether a specific student is covered by an active free trial window.
   */
  evaluateStudentAccessStatus: async (
    userId: string
  ): Promise<{
    hasTrialAccess: boolean;
    trialType: 'GLOBAL_OPEN_ACCESS' | 'USER_ONBOARDING_TRIAL' | null;
    endsAt: string | null;
    remainingDays: number;
    description: string | null;
  }> => {
    const config = await systemSettingsService.getAccessControlConfig();
    const now = new Date();

    // 1. If subscription enforcement is turned OFF globally by admin
    if (!config.enforceSubscription) {
      return {
        hasTrialAccess: true,
        trialType: 'GLOBAL_OPEN_ACCESS',
        endsAt: null,
        remainingDays: 999,
        description: 'Subscription enforcement is currently disabled by campus administration.',
      };
    }

    // 2. Check Global Open-Access Window
    if (config.isGlobalTrialActive && config.globalTrialEndsAt) {
      const globalEnd = new Date(config.globalTrialEndsAt);
      if (now < globalEnd) {
        const remainingDays = Math.max(1, Math.ceil((globalEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
        return {
          hasTrialAccess: true,
          trialType: 'GLOBAL_OPEN_ACCESS',
          endsAt: globalEnd.toISOString(),
          remainingDays,
          description: config.globalTrialDescription || 'Campus Open Access Period',
        };
      }
    }

    // 3. Check Per-User Onboarding Free Trial
    if (config.isUserTrialEnabled && config.userTrialDays > 0) {
      try {
        const [student] = await db
          .select({ createdAt: usersTable.createdAt })
          .from(usersTable)
          .where(eq(usersTable.id, userId as any));

        if (student && student.createdAt) {
          const userTrialEnd = new Date(student.createdAt.getTime() + config.userTrialDays * 24 * 60 * 60 * 1000);
          if (now < userTrialEnd) {
            const remainingDays = Math.max(1, Math.ceil((userTrialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
            return {
              hasTrialAccess: true,
              trialType: 'USER_ONBOARDING_TRIAL',
              endsAt: userTrialEnd.toISOString(),
              remainingDays,
              description: `New Student Free Trial (${remainingDays} days remaining)`,
            };
          }
        }
      } catch (err: any) {
        logger.warn(`[STUDENT TRIAL EVALUATION ERROR] ${err.message}`);
      }
    }

    return {
      hasTrialAccess: false,
      trialType: null,
      endsAt: null,
      remainingDays: 0,
      description: null,
    };
  },
};
