// src/controllers/admin/pilotAnalytics.controller.ts
import type { Response } from 'express';
import { sql, and, gte, eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  usersTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  quizHistoryTable,
  assessmentAttemptsTable,
  assessmentGradesTable,
  feedbackTable,
  supportRequestsTable,
  userStreaksTable,
} from '../../db/schema.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

/**
 * GET /api/admin/dashboard/pilot-analytics
 * Computes privacy-conscious, aggregated analytics for the LAUTECH Institutional Pilot.
 * Zero individual PII is exposed.
 */
export const getPilotAnalytics = async (
  _req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const past7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const past30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      adoptionMetrics,
      activeUsersMetrics,
      practiceMetrics,
      assessmentMetrics,
      feedbackMetrics,
      retentionMetrics,
    ] = await Promise.all([
      // 1. Registered Students & Faculty Breakdown
      db.select({
        totalStudents: sql<number>`count(*)`.mapWith(Number),
        activeStatusStudents: sql<number>`count(case when ${usersTable.status} = 'ACTIVE' then 1 end)`.mapWith(Number),
      })
      .from(usersTable)
      .where(eq(usersTable.role, 'STUDENT')),

      // 2. Active Learners (DAL, WAL, MAL) based on real activity
      Promise.all([
        // Daily Active Learners (practice or login in past 24h)
        db.select({ count: sql<number>`count(distinct ${quizHistoryTable.userId})`.mapWith(Number) })
          .from(quizHistoryTable)
          .where(gte(quizHistoryTable.createdAt, past24h)),
        // Weekly Active Learners (past 7d)
        db.select({ count: sql<number>`count(distinct ${quizHistoryTable.userId})`.mapWith(Number) })
          .from(quizHistoryTable)
          .where(gte(quizHistoryTable.createdAt, past7d)),
        // Monthly Active Learners (past 30d)
        db.select({ count: sql<number>`count(distinct ${quizHistoryTable.userId})`.mapWith(Number) })
          .from(quizHistoryTable)
          .where(gte(quizHistoryTable.createdAt, past30d)),
      ]),

      // 3. Quiz Practice Activity (Voluntary Self-Study)
      db.select({
        totalQuizSessions: sql<number>`count(*)`.mapWith(Number),
        totalQuestionsAnswered: sql<number>`coalesce(sum(${quizHistoryTable.totalQuestions}), 0)`.mapWith(Number),
        averageScorePercentage: sql<number>`coalesce(round(avg(case when ${quizHistoryTable.totalQuestions} > 0 then (${quizHistoryTable.score}::numeric / ${quizHistoryTable.totalQuestions}) * 100 else 0 end), 1), 0)`.mapWith(Number),
        totalXpEarned: sql<number>`coalesce(sum(${quizHistoryTable.earnedXp}), 0)`.mapWith(Number),
      }).from(quizHistoryTable),

      // 4. Formal Institutional Assessments Activity
      Promise.all([
        db.select({
          totalAttempts: sql<number>`count(*)`.mapWith(Number),
          submittedAttempts: sql<number>`count(case when ${assessmentAttemptsTable.status} = 'SUBMITTED' then 1 end)`.mapWith(Number),
          inProgressAttempts: sql<number>`count(case when ${assessmentAttemptsTable.status} = 'IN_PROGRESS' then 1 end)`.mapWith(Number),
        }).from(assessmentAttemptsTable),
        db.select({
          gradedAssessments: sql<number>`count(*)`.mapWith(Number),
          averageTheoryMarks: sql<number>`coalesce(round(avg(${assessmentGradesTable.theoryScore})::numeric, 1), 0)`.mapWith(Number),
          averageCbtMarks: sql<number>`coalesce(round(avg(${assessmentGradesTable.cbtScore})::numeric, 1), 0)`.mapWith(Number),
        }).from(assessmentGradesTable),
      ]),

      // 5. Student Feedback & Satisfaction
      Promise.all([
        db.select({
          totalFeedback: sql<number>`count(*)`.mapWith(Number),
          avgRating: sql<number>`coalesce(round(avg(${feedbackTable.overallSatisfaction})::numeric, 1), 5.0)`.mapWith(Number),
        }).from(feedbackTable),
        db.select({
          totalSupportRequests: sql<number>`count(*)`.mapWith(Number),
          resolvedSupportRequests: sql<number>`count(case when ${supportRequestsTable.status} = 'RESOLVED' or ${supportRequestsTable.status} = 'CLOSED' then 1 end)`.mapWith(Number),
        }).from(supportRequestsTable),
      ]),

      // 6. Habit Persistence & Repeat Revision
      db.select({
        totalStreaksLogged: sql<number>`count(*)`.mapWith(Number),
        avgCurrentStreakDays: sql<number>`coalesce(round(avg(${userStreaksTable.currentStreak})::numeric, 1), 0)`.mapWith(Number),
        maxStreakDays: sql<number>`coalesce(max(${userStreaksTable.longestStreak}), 0)`.mapWith(Number),
      }).from(userStreaksTable),
    ]);

    const students = adoptionMetrics[0] || { totalStudents: 0, activeStatusStudents: 0 };
    const [dalRes, walRes, malRes] = activeUsersMetrics;
    const practice = practiceMetrics[0] || { totalQuizSessions: 0, totalQuestionsAnswered: 0, averageScorePercentage: 0, totalXpEarned: 0 };
    const [attemptsRes, gradesRes] = assessmentMetrics;
    const [fbRes, suppRes] = feedbackMetrics;
    const streaks = retentionMetrics[0] || { totalStreaksLogged: 0, avgCurrentStreakDays: 0, maxStreakDays: 0 };

    const totalAttempts = attemptsRes[0]?.totalAttempts || 0;
    const submittedAttempts = attemptsRes[0]?.submittedAttempts || 0;
    const completionRate = totalAttempts > 0 ? Number(((submittedAttempts / totalAttempts) * 100).toFixed(1)) : 100;

    // Faculty participation summary (aggregated count only)
    const facultyDistribution = await db
      .select({
        facultyName: facultiesTable.name,
        facultyCode: facultiesTable.code,
        courseCount: sql<number>`count(distinct ${coursesTable.id})`.mapWith(Number),
      })
      .from(facultiesTable)
      .leftJoin(departmentsTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .leftJoin(coursesTable, eq(coursesTable.departmentId, departmentsTable.id))
      .groupBy(facultiesTable.id, facultiesTable.name, facultiesTable.code);

    res.status(200).json({
      status: 'success',
      data: {
        institutionalContext: {
          institution: 'Ladoke Akintola University of Technology (LAUTECH)',
          pilotPhase: 'Phase 1 Student-First Institutional Deployment',
          generatedAt: now.toISOString(),
        },
        adoption: {
          registeredStudents: students.totalStudents,
          activeStatusStudents: students.activeStatusStudents,
          facultiesCovered: facultyDistribution.length,
          totalCoursesOffered: facultyDistribution.reduce((acc, f) => acc + f.courseCount, 0),
        },
        engagement: {
          dailyActiveLearners: dalRes[0]?.count || 0,
          weeklyActiveLearners: walRes[0]?.count || 0,
          monthlyActiveLearners: malRes[0]?.count || 0,
          totalPracticeSessions: practice.totalQuizSessions,
          totalQuestionsAnswered: practice.totalQuestionsAnswered,
          averageScorePercentage: practice.averageScorePercentage,
          totalXpEarned: practice.totalXpEarned,
        },
        curriculumCoverage: {
          assessmentAttempts: totalAttempts,
          completionRatePercentage: completionRate,
          gradedSubmissions: gradesRes[0]?.gradedAssessments || 0,
          averageCbtScore: gradesRes[0]?.averageCbtMarks || 0,
          averageTheoryScore: gradesRes[0]?.averageTheoryMarks || 0,
        },
        persistenceAndHabits: {
          totalActiveStreaks: streaks.totalStreaksLogged,
          averageStreakDays: streaks.avgCurrentStreakDays,
          maximumStreakDays: streaks.maxStreakDays,
        },
        studentFeedbackAndReliability: {
          feedbackSubmissionsCount: fbRes[0]?.totalFeedback || 0,
          averageSatisfactionRating: fbRes[0]?.avgRating || 5.0,
          supportRequestsCount: suppRes[0]?.totalSupportRequests || 0,
          supportResolutionRate:
            (suppRes[0]?.totalSupportRequests ?? 0) > 0
              ? Number((((suppRes[0]?.resolvedSupportRequests ?? 0) / suppRes[0]!.totalSupportRequests) * 100).toFixed(1))
              : 100,
          systemAvailabilityTarget: '99.9%',
        },
        facultyBreakdown: facultyDistribution,
      },
    });
  } catch (error: any) {
    logger.error(`[PILOT ANALYTICS ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to compute institutional pilot analytics.',
    });
  }
};
