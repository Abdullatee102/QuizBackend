/**
 * BB-05C: Entitlement Management Engine
 * Brain Buzz — Core Payment Infrastructure & Access Authorization
 * 
 * Provides authoritative entitlement verification, multi-product semester pass logic,
 * stackable exam pass renewals, expiration tracking, and audited administrative overrides.
 */

import { eq, and, desc, sql, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  userEntitlementsTable,
  paymentOrdersTable,
  type UserEntitlement,
  type PaymentOrder,
} from '../../db/schema.js';
import { auditService } from '../admin/auditService.js';
import logger from '../../config/logger.js';
import type { EntitlementCheckResult, PaymentProduct } from './types.js';

// Core feature keys unlocked by Semester Pass
const SEMESTER_PASS_UNLOCKED_FEATURES = new Set([
  'SEMESTER_PREMIUM_ACCESS',
  'AI_EXPLANATIONS',
  'EXAM_PREP_ACCESS',
  'ADVANCED_ANALYTICS',
  'REVISION_RESOURCES',
  'PREMIUM_QUIZ_PASS',
  'EXAM_PRACTICE_BUNDLE',
]);

export const entitlementService = {
  /**
   * Authoritatively evaluates whether a student currently has active access to a premium feature.
   * Can evaluate optional academic context (e.g. session & semester for course-specific passes).
   */
  checkUserFeatureAccess: async (
    userId: string,
    featureKey: string,
    context?: { academicSession?: string | null; semester?: string | null }
  ): Promise<EntitlementCheckResult> => {
    if (!userId) {
      return { hasAccess: false, featureKey, reason: 'NO_USER_SPECIFIED' };
    }

    const now = new Date();

    // 1. Fetch all ACTIVE entitlements for the user
    const entitlements = await db
      .select()
      .from(userEntitlementsTable)
      .where(
        and(
          eq(userEntitlementsTable.userId, userId as any),
          eq(userEntitlementsTable.status, 'ACTIVE')
        )
      )
      .orderBy(desc(userEntitlementsTable.createdAt));

    if (!entitlements || entitlements.length === 0) {
      return { hasAccess: false, featureKey, reason: 'NO_ACTIVE_ENTITLEMENT' };
    }

    // 2. Evaluate active entitlements and auto-expire stale entries
    for (const ent of entitlements) {
      const isExpired = ent.expiryDate !== null && ent.expiryDate <= now;
      if (isExpired) {
        // Asynchronously update stale active entitlement to EXPIRED
        db.update(userEntitlementsTable)
          .set({ status: 'EXPIRED', updatedAt: now })
          .where(eq(userEntitlementsTable.id, ent.id))
          .catch((err) => logger.error(`[ENTITLEMENT AUTO-EXPIRE ERROR] ${err.message}`));
        continue;
      }

      // Calculate remaining days
      const remainingDays = ent.expiryDate
        ? Math.max(0, Math.ceil((ent.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        : null;

      // Rule A: Student holds an active SEMESTER_PREMIUM_ACCESS pass
      if (ent.featureKey === 'SEMESTER_PREMIUM_ACCESS') {
        // If context provides session & semester, verify compatibility
        if (context?.academicSession && ent.academicSession && context.academicSession !== ent.academicSession) {
          continue; // Mismatched academic session
        }
        if (context?.semester && ent.semester && context.semester.toLowerCase() !== ent.semester.toLowerCase()) {
          continue; // Mismatched semester
        }

        if (SEMESTER_PASS_UNLOCKED_FEATURES.has(featureKey)) {
          return {
            hasAccess: true,
            featureKey,
            status: 'ACTIVE',
            remainingDays,
            expiryDate: ent.expiryDate,
            entitlementId: ent.id,
            productId: ent.productId,
            academicSession: ent.academicSession,
            semester: ent.semester,
          };
        }
      }

      // Rule B: Student holds an active EXAM_PREP_ACCESS pass
      if (ent.featureKey === 'EXAM_PREP_ACCESS' || ent.featureKey === 'EXAM_PRACTICE_BUNDLE') {
        if (featureKey === 'EXAM_PREP_ACCESS' || featureKey === 'EXAM_PRACTICE_BUNDLE') {
          return {
            hasAccess: true,
            featureKey,
            status: 'ACTIVE',
            remainingDays,
            expiryDate: ent.expiryDate,
            entitlementId: ent.id,
            productId: ent.productId,
          };
        }
      }

      // Rule C: Direct exact match on featureKey
      if (ent.featureKey === featureKey) {
        return {
          hasAccess: true,
          featureKey,
          status: 'ACTIVE',
          remainingDays,
          expiryDate: ent.expiryDate,
          entitlementId: ent.id,
          productId: ent.productId,
          academicSession: ent.academicSession,
          semester: ent.semester,
        };
      }
    }

    return { hasAccess: false, featureKey, reason: 'FEATURE_NOT_INCLUDED_IN_ENTITLEMENTS' };
  },

  /**
   * Retrieves all currently active, non-expired entitlements for a student.
   */
  getUserActiveEntitlements: async (userId: string): Promise<Array<UserEntitlement & { remainingDays: number | null }>> => {
    const now = new Date();

    const rows = await db
      .select()
      .from(userEntitlementsTable)
      .where(
        and(
          eq(userEntitlementsTable.userId, userId as any),
          eq(userEntitlementsTable.status, 'ACTIVE')
        )
      )
      .orderBy(desc(userEntitlementsTable.createdAt));

    const activeList: Array<UserEntitlement & { remainingDays: number | null }> = [];

    for (const ent of rows) {
      if (ent.expiryDate && ent.expiryDate <= now) {
        // Mark expired
        await db
          .update(userEntitlementsTable)
          .set({ status: 'EXPIRED', updatedAt: now })
          .where(eq(userEntitlementsTable.id, ent.id));
      } else {
        const remainingDays = ent.expiryDate
          ? Math.max(0, Math.ceil((ent.expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
          : null;
        activeList.push({ ...ent, remainingDays });
      }
    }

    return activeList;
  },

  /**
   * Retrieves the full historical audit of entitlements granted to a student (ACTIVE, EXPIRED, REVOKED, REFUNDED).
   */
  getUserEntitlementHistory: async (userId: string): Promise<UserEntitlement[]> => {
    return await db
      .select()
      .from(userEntitlementsTable)
      .where(eq(userEntitlementsTable.userId, userId as any))
      .orderBy(desc(userEntitlementsTable.createdAt));
  },

  /**
   * Checks whether a student currently has an active, unexpired pass for a specific session and semester.
   * Prevents accidental duplicate semester pass purchases.
   */
  hasActiveSemesterPass: async (
    userId: string,
    academicSession: string,
    semester: string
  ): Promise<boolean> => {
    const now = new Date();

    const [existing] = await db
      .select()
      .from(userEntitlementsTable)
      .where(
        and(
          eq(userEntitlementsTable.userId, userId as any),
          eq(userEntitlementsTable.featureKey, 'SEMESTER_PREMIUM_ACCESS'),
          eq(userEntitlementsTable.academicSession, academicSession),
          eq(userEntitlementsTable.semester, semester.toLowerCase()),
          eq(userEntitlementsTable.status, 'ACTIVE')
        )
      )
      .limit(1);

    if (!existing) return false;
    if (existing.expiryDate && existing.expiryDate <= now) return false;
    return true;
  },

  /**
   * Provisions an authoritative entitlement upon successful payment verification.
   * Supports semester isolation and duration stacking.
   */
  grantEntitlementForVerifiedOrder: async (
    order: PaymentOrder,
    product: PaymentProduct,
    txInstance?: any
  ): Promise<UserEntitlement> => {
    const dbClient = txInstance || db;
    const now = new Date();
    const durationDays = product.durationDays;
    const featureKey = product.featureKey;

    let newExpiryDate: Date | null = null;

    if (durationDays !== null && durationDays > 0) {
      if (product.category === 'EXAM_PREP') {
        // Stackable renewal: Check for existing active exam pass
        const [existingActive] = await dbClient
          .select()
          .from(userEntitlementsTable)
          .where(
            and(
              eq(userEntitlementsTable.userId, order.userId),
              eq(userEntitlementsTable.featureKey, featureKey),
              eq(userEntitlementsTable.status, 'ACTIVE')
            )
          )
          .limit(1);

        const baseTime =
          existingActive?.expiryDate && existingActive.expiryDate > now
            ? existingActive.expiryDate.getTime()
            : now.getTime();

        newExpiryDate = new Date(baseTime + durationDays * 24 * 60 * 60 * 1000);
      } else {
        // Standard duration from now
        newExpiryDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
      }
    }

    const [entitlement] = await dbClient
      .insert(userEntitlementsTable)
      .values({
        userId: order.userId,
        orderId: order.id,
        productId: product.id,
        featureKey,
        academicSession: product.academicSession || null,
        semester: product.semester ? product.semester.toLowerCase() : null,
        status: 'ACTIVE',
        startDate: now,
        expiryDate: newExpiryDate,
        metadata: {
          productId: product.id,
          orderReference: order.orderReference,
          productTitle: product.title,
          category: product.category,
          grantedAt: now.toISOString(),
        },
      })
      .returning();

    logger.info(
      `[ENTITLEMENT GRANTED] User ${order.userId} granted ${featureKey} (Product: ${product.id}, Expiry: ${newExpiryDate?.toISOString() || 'LIFETIME'})`
    );

    return entitlement;
  },

  /**
   * Audited Administrative Entitlement Adjustment (GRANT or REVOKE).
   * Strictly records admin identity and non-empty justification in audit_logs.
   */
  manualAdjustEntitlementAdmin: async (params: {
    adminUserId: string;
    action: 'GRANT' | 'REVOKE';
    targetUserId: string;
    featureKey: string;
    productId?: string | undefined;
    academicSession?: string | undefined;
    semester?: string | undefined;
    durationDays?: number | undefined;
    reason: string;
    ipAddress?: string | undefined;
    userAgent?: string | undefined;
  }): Promise<UserEntitlement> => {
    const {
      adminUserId,
      action,
      targetUserId,
      featureKey,
      productId,
      academicSession,
      semester,
      durationDays,
      reason,
      ipAddress,
      userAgent,
    } = params;

    if (!reason || reason.trim().length < 5) {
      throw new Error('A detailed reason (at least 5 characters) is required for manual entitlement adjustments.');
    }

    const now = new Date();

    if (action === 'GRANT') {
      let expiryDate: Date | null = null;
      if (durationDays && durationDays > 0) {
        expiryDate = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);
      }

      const [entitlement] = await db
        .insert(userEntitlementsTable)
        .values({
          userId: targetUserId as any,
          orderId: null,
          productId: productId || 'ADMIN_MANUAL_GRANT',
          featureKey,
          academicSession: academicSession || null,
          semester: semester ? semester.toLowerCase() : null,
          status: 'ACTIVE',
          startDate: now,
          expiryDate,
          metadata: {
            manualAdjustment: true,
            grantedByAdminId: adminUserId,
            reason: reason.trim(),
            adjustedAt: now.toISOString(),
          },
        })
        .returning();

      if (!entitlement) {
        throw new Error('Failed to create manual entitlement record.');
      }

      await auditService.logAdminAction({
        adminUserId,
        action: 'MANUAL_ENTITLEMENT_GRANT',
        resourceType: 'user_entitlements',
        resourceId: entitlement.id,
        metadata: {
          targetUserId,
          featureKey,
          productId: productId || undefined,
          academicSession: academicSession || undefined,
          semester: semester || undefined,
          durationDays: durationDays || undefined,
          reason: reason.trim(),
        },
        ...(ipAddress ? { ipAddress } : {}),
        ...(userAgent ? { userAgent } : {}),
      });

      return entitlement;
    } else {
      // Action: REVOKE
      const [existing] = await db
        .select()
        .from(userEntitlementsTable)
        .where(
          and(
            eq(userEntitlementsTable.userId, targetUserId as any),
            eq(userEntitlementsTable.featureKey, featureKey),
            eq(userEntitlementsTable.status, 'ACTIVE')
          )
        )
        .limit(1);

      if (!existing) {
        throw new Error(`No active entitlement found for user ${targetUserId} with feature ${featureKey}.`);
      }

      const [revoked] = await db
        .update(userEntitlementsTable)
        .set({
          status: 'REVOKED',
          metadata: {
            ...(existing.metadata as Record<string, any>),
            revokedByAdminId: adminUserId,
            revocationReason: reason.trim(),
            revokedAt: now.toISOString(),
          },
          updatedAt: now,
        })
        .where(eq(userEntitlementsTable.id, existing.id))
        .returning();

      if (!revoked) {
        throw new Error('Failed to revoke entitlement record.');
      }

      await auditService.logAdminAction({
        adminUserId,
        action: 'MANUAL_ENTITLEMENT_REVOKE',
        resourceType: 'user_entitlements',
        resourceId: existing.id,
        metadata: {
          targetUserId,
          featureKey,
          reason: reason.trim(),
        },
        ...(ipAddress ? { ipAddress } : {}),
        ...(userAgent ? { userAgent } : {}),
      });

      return revoked;
    }
  },
};
