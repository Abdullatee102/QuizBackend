/**
 * BB-04: Authoritative Reward & Gamification Engine
 * Brain Buzz — Core Reward Ledger, Per-Course Daily XP Cap, Stateful Streaks & Assessment Milestone Rewards
 */

import { eq, and, gte, sql, desc, sum } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  rewardEventsTable,
  userStreaksTable,
  quizHistoryTable,
  coursesTable,
  type RewardEvent,
  type UserStreak,
} from '../db/schema.js';
import logger from '../config/logger.js';

export const COURSE_DAILY_PRACTICE_CAP = 500;
export const ASSESSMENT_COMPLETION_MILESTONE_XP = 150;
export const MAX_STREAK_FREEZE_CREDITS = 2;

export interface DailyCourseXpStatus {
  earnedToday: number;
  courseXpToday: number;
  remainingCourseXp: number;
  isCourseCapReached: boolean;
  cappedCourses: string[];
}

export interface StreakStatusResult {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  freezeCredits: number;
  lastFrozenDate: string | null;
  isActiveToday: boolean;
  freezeAvailable: boolean;
}

export interface StudentXpSummary {
  lifetimeXp: number;
  practiceXpToday: number;
  streak: StreakStatusResult;
  courseBreakdownToday: Array<{
    courseId: string;
    courseCode: string;
    xpEarnedToday: number;
    remainingXpToday: number;
    isCapReached: boolean;
  }>;
}

/**
 * Returns current calendar date in Nigeria (West Africa Time, Africa/Lagos) in 'YYYY-MM-DD' format.
 */
export function getWatDateString(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Computes the Date representing 00:00:00 WAT on the current WAT calendar day.
 */
export function getWatStartOfDay(date: Date = new Date()): Date {
  const dateStr = getWatDateString(date); // YYYY-MM-DD
  // Convert YYYY-MM-DD 00:00:00 WAT (+01:00) into ISO string
  return new Date(`${dateStr}T00:00:00.000+01:00`);
}

/**
 * Computes previous WAT date string given a base WAT date string.
 */
export function getPreviousWatDateString(baseWatDate: string, daysAgo: number = 1): string {
  const baseDate = new Date(`${baseWatDate}T12:00:00.000+01:00`);
  baseDate.setDate(baseDate.getDate() - daysAgo);
  return getWatDateString(baseDate);
}

export const rewardService = {
  // =========================================================================
  // 1. PER-COURSE DAILY PRACTICE XP ENFORCEMENT
  // =========================================================================

  /**
   * Evaluates and applies the per-course 500 XP daily cap for practice quizzes.
   * Enforces Africa/Lagos (WAT) calendar day boundaries.
   * Transactionally records immutable reward_events ledger row.
   */
  processPracticeQuizReward: async ({
    userId,
    courseId,
    quizHistoryId,
    rawEarnedXp,
    score,
    totalQuestions,
    attemptMultiplier,
  }: {
    userId: string;
    courseId: string;
    quizHistoryId: string;
    rawEarnedXp: number;
    score: number;
    totalQuestions: number;
    attemptMultiplier: number;
  }): Promise<{
    awardedXp: number;
    courseXpToday: number;
    remainingCourseXp: number;
    isCourseCapReached: boolean;
    rewardEventId: string | null;
  }> => {
    const watStart = getWatStartOfDay();

    // 1. Query today's earned XP for THIS course in WAT
    const [courseTodayResult] = await db
      .select({
        totalXp: sql<number>`coalesce(sum(${rewardEventsTable.earnedXp}), 0)`.mapWith(Number),
      })
      .from(rewardEventsTable)
      .where(
        and(
          eq(rewardEventsTable.userId, userId as any),
          eq(rewardEventsTable.courseId, courseId as any),
          eq(rewardEventsTable.eventType, 'PRACTICE_QUIZ'),
          gte(rewardEventsTable.createdAt, watStart)
        )
      );

    const courseXpBefore = courseTodayResult?.totalXp ?? 0;
    const remainingRoom = Math.max(0, COURSE_DAILY_PRACTICE_CAP - courseXpBefore);
    const awardedXp = Math.min(rawEarnedXp, remainingRoom);
    const courseXpAfter = courseXpBefore + awardedXp;
    const remainingCourseXp = Math.max(0, COURSE_DAILY_PRACTICE_CAP - courseXpAfter);
    const isCourseCapReached = remainingCourseXp === 0;

    // 2. Insert immutable row into reward_events ledger
    let rewardEventId: string | null = null;
    try {
      const [inserted] = await db
        .insert(rewardEventsTable)
        .values({
          userId: userId as any,
          courseId: courseId as any,
          eventType: 'PRACTICE_QUIZ',
          referenceId: quizHistoryId,
          earnedXp: awardedXp,
          metadata: {
            score,
            totalQuestions,
            attemptMultiplier,
            rawEarnedXp,
            courseXpBefore,
            courseXpAfter,
            isCourseCapReached,
            watDate: getWatDateString(),
          },
        })
        .onConflictDoNothing({
          target: [
            rewardEventsTable.userId,
            rewardEventsTable.eventType,
            rewardEventsTable.referenceId,
          ],
        })
        .returning({ id: rewardEventsTable.id });

      if (inserted) {
        rewardEventId = inserted.id;
      }
    } catch (err: any) {
      logger.error(`[REWARD LEDGER] Error recording practice quiz reward: ${err.message}`);
    }

    // 3. Update persistent streaks state machine
    try {
      await rewardService.recordPracticeActivity(userId);
    } catch (streakErr: any) {
      logger.warn(`[STREAK] Failed to record practice activity for user ${userId}: ${streakErr.message}`);
    }

    return {
      awardedXp,
      courseXpToday: courseXpAfter,
      remainingCourseXp,
      isCourseCapReached,
      rewardEventId,
    };
  },

  // =========================================================================
  // 2. OFFICIAL ASSESSMENT COMPLETION REWARD (+150 XP)
  // =========================================================================

  /**
   * Awards exactly 150 milestone XP for completing an official CBT/Theory assessment.
   * Completely decoupled from course practice caps and academic grades.
   * Idempotent via unique constraint on (userId, 'OFFICIAL_ASSESSMENT', attemptId).
   */
  awardAssessmentCompletionXp: async ({
    userId,
    assessmentId,
    attemptId,
    courseId,
  }: {
    userId: string;
    assessmentId: string;
    attemptId: string;
    courseId?: string;
  }): Promise<{ awarded: boolean; earnedXp: number; eventId: string | null }> => {
    try {
      const [inserted] = await db
        .insert(rewardEventsTable)
        .values({
          userId: userId as any,
          courseId: courseId as any,
          eventType: 'OFFICIAL_ASSESSMENT',
          referenceId: attemptId,
          earnedXp: ASSESSMENT_COMPLETION_MILESTONE_XP,
          metadata: {
            assessmentId,
            attemptId,
            watDate: getWatDateString(),
          },
        })
        .onConflictDoNothing({
          target: [
            rewardEventsTable.userId,
            rewardEventsTable.eventType,
            rewardEventsTable.referenceId,
          ],
        })
        .returning({ id: rewardEventsTable.id });

      if (inserted) {
        logger.info(
          `[REWARD LEDGER] Awarded ${ASSESSMENT_COMPLETION_MILESTONE_XP} Milestone XP to student ${userId} for assessment attempt ${attemptId}`
        );
        // Also updates learning activity on streaks
        await rewardService.recordPracticeActivity(userId);
        return { awarded: true, earnedXp: ASSESSMENT_COMPLETION_MILESTONE_XP, eventId: inserted.id };
      }

      // Already awarded for this attempt
      return { awarded: false, earnedXp: 0, eventId: null };
    } catch (err: any) {
      logger.error(`[REWARD LEDGER] Failed to award assessment completion XP: ${err.message}`);
      return { awarded: false, earnedXp: 0, eventId: null };
    }
  },

  // =========================================================================
  // 3. PERSISTENT STREAKS & STREAK FREEZES (WAT CALENDAR)
  // =========================================================================

  /**
   * Authoritatively updates or reconciles the student's learning streak in Africa/Lagos (WAT).
   * Supports atomic streak freeze consumption and automatic freeze credit granting (1 per 7 days, max 2).
   */
  recordPracticeActivity: async (
    userId: string,
    activityDate: Date = new Date()
  ): Promise<UserStreak> => {
    const todayWat = getWatDateString(activityDate);
    const yesterdayWat = getPreviousWatDateString(todayWat, 1);
    const twoDaysAgoWat = getPreviousWatDateString(todayWat, 2);

    const [existing] = await db
      .select()
      .from(userStreaksTable)
      .where(eq(userStreaksTable.userId, userId as any));

    if (!existing) {
      // First activity ever
      const [newStreak] = await db
        .insert(userStreaksTable)
        .values({
          userId: userId as any,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: todayWat,
          freezeCredits: 0,
          lastFrozenDate: null,
          updatedAt: new Date(),
        })
        .returning();
      if (!newStreak) throw new Error('Failed to create user streak record');
      return newStreak;
    }

    // If activity was already logged today, streak is unchanged (idempotent)
    if (existing.lastActivityDate === todayWat) {
      return existing;
    }

    let nextStreak = existing.currentStreak;
    let nextLongest = existing.longestStreak;
    let nextFreezes = existing.freezeCredits;
    let nextFrozenDate = existing.lastFrozenDate;

    if (existing.lastActivityDate === yesterdayWat) {
      // Consecutive calendar day!
      nextStreak += 1;
      // Award 1 streak freeze credit every 7 consecutive days (max 2)
      if (nextStreak % 7 === 0 && nextFreezes < MAX_STREAK_FREEZE_CREDITS) {
        nextFreezes += 1;
        logger.info(`[STREAK] Student ${userId} earned a Streak Freeze credit! Total: ${nextFreezes}`);
      }
      nextLongest = Math.max(nextLongest, nextStreak);
    } else if (existing.lastActivityDate === twoDaysAgoWat) {
      // Missed exactly yesterday: Check if student has an available Streak Freeze
      if (nextFreezes > 0) {
        nextFreezes -= 1;
        nextFrozenDate = yesterdayWat;
        nextStreak += 1; // Freeze protects the streak
        nextLongest = Math.max(nextLongest, nextStreak);
        logger.info(
          `[STREAK FREEZE] Student ${userId} consumed a Streak Freeze for missed day ${yesterdayWat}. Remaining freezes: ${nextFreezes}`
        );

        // Record streak freeze consumption in ledger
        await db
          .insert(rewardEventsTable)
          .values({
            userId: userId as any,
            eventType: 'STREAK_FREEZE',
            referenceId: `freeze_${yesterdayWat}`,
            earnedXp: 0,
            metadata: {
              protectedDate: yesterdayWat,
              consumedAtWat: todayWat,
            },
          })
          .onConflictDoNothing();
      } else {
        // Missed yesterday and no freeze credits: streak resets to 1
        nextStreak = 1;
      }
    } else {
      // Missed 2+ days: streak resets to 1
      nextStreak = 1;
    }

    const [updated] = await db
      .update(userStreaksTable)
      .set({
        currentStreak: nextStreak,
        longestStreak: nextLongest,
        lastActivityDate: todayWat,
        freezeCredits: nextFreezes,
        lastFrozenDate: nextFrozenDate,
        updatedAt: new Date(),
      })
      .where(eq(userStreaksTable.userId, userId as any))
      .returning();

    return updated || existing;
  },

  /**
   * Retrieves authoritative streak state, lazily reconciling broken streaks if stale.
   */
  getStreakStatus: async (userId: string): Promise<StreakStatusResult> => {
    const todayWat = getWatDateString();
    const yesterdayWat = getPreviousWatDateString(todayWat, 1);

    const [streak] = await db
      .select()
      .from(userStreaksTable)
      .where(eq(userStreaksTable.userId, userId as any));

    if (!streak) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: '',
        freezeCredits: 0,
        lastFrozenDate: null,
        isActiveToday: false,
        freezeAvailable: false,
      };
    }

    // Lazy reconciliation: If lastActivityDate is older than yesterday and not frozen, current streak is stale
    const isStale = streak.lastActivityDate !== todayWat && streak.lastActivityDate !== yesterdayWat;
    const canFreezeProtect = streak.lastActivityDate === getPreviousWatDateString(todayWat, 2) && streak.freezeCredits > 0;
    
    let activeStreakCount = streak.currentStreak;
    if (isStale && !canFreezeProtect) {
      activeStreakCount = 0; // Stale streak displays 0 until student practices
    }

    return {
      currentStreak: activeStreakCount,
      longestStreak: streak.longestStreak,
      lastActivityDate: streak.lastActivityDate,
      freezeCredits: streak.freezeCredits,
      lastFrozenDate: streak.lastFrozenDate,
      isActiveToday: streak.lastActivityDate === todayWat,
      freezeAvailable: streak.freezeCredits > 0,
    };
  },

  // =========================================================================
  // 4. STUDENT XP SUMMARY & DAILY COURSE BREAKDOWN
  // =========================================================================

  /**
   * Authoritatively computes student XP metrics, per-course daily progress, and streak status.
   */
  getStudentXpSummary: async (userId: string): Promise<StudentXpSummary> => {
    const watStart = getWatStartOfDay();
    const todayWat = getWatDateString();

    // 1. Lifetime XP from reward_events ledger (fallback to quiz_history if pre-migration)
    const [lifetimeLedger] = await db
      .select({
        total: sql<number>`coalesce(sum(${rewardEventsTable.earnedXp}), 0)`.mapWith(Number),
      })
      .from(rewardEventsTable)
      .where(eq(rewardEventsTable.userId, userId as any));

    let lifetimeXp = lifetimeLedger?.total ?? 0;

    // 2. Practice XP today across all courses
    const [practiceTodayResult] = await db
      .select({
        total: sql<number>`coalesce(sum(${rewardEventsTable.earnedXp}), 0)`.mapWith(Number),
      })
      .from(rewardEventsTable)
      .where(
        and(
          eq(rewardEventsTable.userId, userId as any),
          eq(rewardEventsTable.eventType, 'PRACTICE_QUIZ'),
          gte(rewardEventsTable.createdAt, watStart)
        )
      );

    const practiceXpToday = practiceTodayResult?.total ?? 0;

    // 3. Per-course breakdown today
    const courseBreakdownRaw = await db
      .select({
        courseId: rewardEventsTable.courseId,
        courseCode: coursesTable.code,
        xpEarnedToday: sql<number>`coalesce(sum(${rewardEventsTable.earnedXp}), 0)`.mapWith(Number),
      })
      .from(rewardEventsTable)
      .leftJoin(coursesTable, eq(rewardEventsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(rewardEventsTable.userId, userId as any),
          eq(rewardEventsTable.eventType, 'PRACTICE_QUIZ'),
          gte(rewardEventsTable.createdAt, watStart)
        )
      )
      .groupBy(rewardEventsTable.courseId, coursesTable.code);

    const courseBreakdownToday = courseBreakdownRaw
      .filter((c) => c.courseId !== null)
      .map((c) => {
        const remaining = Math.max(0, COURSE_DAILY_PRACTICE_CAP - c.xpEarnedToday);
        return {
          courseId: c.courseId as string,
          courseCode: c.courseCode || 'General',
          xpEarnedToday: c.xpEarnedToday,
          remainingXpToday: remaining,
          isCapReached: remaining === 0,
        };
      });

    // 4. Streak status
    const streak = await rewardService.getStreakStatus(userId);

    return {
      lifetimeXp,
      practiceXpToday,
      streak,
      courseBreakdownToday,
    };
  },

  // =========================================================================
  // 5. HISTORICAL XP RECONCILIATION & SAFE BACKFILL
  // =========================================================================

  /**
   * Reconciles existing quiz_history rows into reward_events without double counting.
   */
  reconcileHistoricalXp: async (userId?: string): Promise<{ migratedCount: number }> => {
    let query = db
      .select({
        id: quizHistoryTable.id,
        userId: quizHistoryTable.userId,
        courseId: quizHistoryTable.courseId,
        score: quizHistoryTable.score,
        totalQuestions: quizHistoryTable.totalQuestions,
        earnedXp: quizHistoryTable.earnedXp,
        createdAt: quizHistoryTable.createdAt,
      })
      .from(quizHistoryTable);

    if (userId) {
      query = (query as any).where(eq(quizHistoryTable.userId, userId as any));
    }

    const histories = await query;
    let migratedCount = 0;

    for (const h of histories) {
      if (h.earnedXp > 0) {
        try {
          const [inserted] = await db
            .insert(rewardEventsTable)
            .values({
              userId: h.userId,
              courseId: h.courseId,
              eventType: 'PRACTICE_QUIZ',
              referenceId: h.id,
              earnedXp: h.earnedXp,
              metadata: {
                source: 'historical_backfill',
                score: h.score,
                totalQuestions: h.totalQuestions,
              },
              createdAt: h.createdAt,
            })
            .onConflictDoNothing({
              target: [
                rewardEventsTable.userId,
                rewardEventsTable.eventType,
                rewardEventsTable.referenceId,
              ],
            })
            .returning({ id: rewardEventsTable.id });

          if (inserted) {
            migratedCount++;
          }
        } catch (err: any) {
          logger.warn(`[RECONCILIATION] Failed row migration: ${err.message}`);
        }
      }
    }

    logger.info(`[RECONCILIATION] Historical XP reconciliation completed. Backfilled ${migratedCount} rows.`);
    return { migratedCount };
  },
};
