import { eq, and, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { feedbackTable, quizHistoryTable, usersTable } from '../db/schema.js';
import logger from '../config/logger.js';

export interface SubmitFeedbackPayload {
  surveyVersion: string;
  overallSatisfaction: number;
  usageFrequency: string;
  contentAccuracyRating: number;
  fairnessRating: number;
  technicalFrictions: string[];
  frictionDetails?: string | null;
  featureRatings: Record<string, number>;
  structuredAnswers: {
    usageFrequency: string;
    featuresEvaluated: string[];
    courseDiscoveryScore: number;
    cbtSessionExperience: string;
    answerReviewScore: number;
    progressTrackingScore: number;
    technicalFrictions: string[];
    frictionDetails?: string | null;
    contentAccuracyScore: number;
    competitionFairnessScore: number;
    overallSatisfaction: number;
    featuresNotUsed: string[];
  };
  suggestions?: string | null;
  clientMetadata?: {
    appVersion: string;
    platform: 'android' | 'ios' | 'other';
    deviceModel?: string;
  };
}

export class FeedbackError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.name = 'FeedbackError';
    this.statusCode = statusCode;
    this.code = code;
  }
}

export const feedbackService = {
  // =====================================================
  // CHECK ELIGIBILITY
  // =====================================================
  checkEligibility: async (userId: string, surveyVersion: string = '1.0') => {
    // 1. Verify actually completed quiz attempts (total_questions > 0)
    const [historyCountResult] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(quizHistoryTable)
      .where(
        and(
          eq(quizHistoryTable.userId, userId as any),
          sql`${quizHistoryTable.totalQuestions} > 0`
        )
      );

    const completedQuizCount = Number(historyCountResult?.count || 0);
    const hasCompletedQuiz = completedQuizCount > 0;

    // 2. Check if student already submitted for this survey version
    const [existingFeedback] = await db
      .select({ id: feedbackTable.id, createdAt: feedbackTable.createdAt })
      .from(feedbackTable)
      .where(
        and(
          eq(feedbackTable.userId, userId as any),
          eq(feedbackTable.surveyVersion, surveyVersion)
        )
      )
      .limit(1);

    const hasSubmittedFeedback = !!existingFeedback;
    const eligible = hasCompletedQuiz && !hasSubmittedFeedback;

    let ineligibilityReason: 'no_completed_quizzes' | 'already_submitted' | null = null;
    let message: string | null = null;

    if (!hasCompletedQuiz) {
      ineligibilityReason = 'no_completed_quizzes';
      message = 'You must complete at least one CBT or practice quiz before sharing feedback.';
    } else if (hasSubmittedFeedback) {
      ineligibilityReason = 'already_submitted';
      message = 'Thank you! You have already submitted feedback for this survey version.';
    }

    return {
      eligible,
      hasCompletedQuiz,
      completedQuizCount,
      hasSubmittedFeedback,
      currentSurveyVersion: surveyVersion,
      ineligibilityReason,
      message,
    };
  },

  // =====================================================
  // SUBMIT FEEDBACK
  // =====================================================
  submitFeedback: async (userId: string, data: SubmitFeedbackPayload) => {
    const surveyVersion = data.surveyVersion || '1.0';

    // 1. Re-verify completed-quiz eligibility server-side
    const [historyCountResult] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(quizHistoryTable)
      .where(
        and(
          eq(quizHistoryTable.userId, userId as any),
          sql`${quizHistoryTable.totalQuestions} > 0`
        )
      );

    const completedQuizCount = Number(historyCountResult?.count || 0);
    if (completedQuizCount <= 0) {
      throw new FeedbackError(
        'Ineligible to submit feedback. You must complete at least one practice quiz first.',
        403,
        'INELIGIBLE_NO_QUIZ'
      );
    }

    // 2. Enforce one submission per user per survey version
    const [existingFeedback] = await db
      .select({ id: feedbackTable.id })
      .from(feedbackTable)
      .where(
        and(
          eq(feedbackTable.userId, userId as any),
          eq(feedbackTable.surveyVersion, surveyVersion)
        )
      )
      .limit(1);

    if (existingFeedback) {
      throw new FeedbackError(
        'You have already submitted feedback for this survey version.',
        409,
        'DUPLICATE_SUBMISSION'
      );
    }

    // 3. Fetch minimal student academic cohort context (pseudonymous)
    const [userProfile] = await db
      .select({
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
        level: usersTable.level,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    // 4. Store submission in database
    try {
      const [inserted] = await db
        .insert(feedbackTable)
        .values({
          userId: userId as any,
          surveyVersion,
          overallSatisfaction: data.overallSatisfaction,
          usageFrequency: data.usageFrequency,
          contentAccuracyRating: data.contentAccuracyRating,
          fairnessRating: data.fairnessRating,
          technicalFrictions: data.technicalFrictions,
          frictionDetails: data.frictionDetails || null,
          featureRatings: data.featureRatings || {},
          structuredAnswers: data.structuredAnswers,
          suggestions: data.suggestions || null,
          academicContext: {
            facultyId: userProfile?.facultyId || null,
            departmentId: userProfile?.departmentId || null,
            level: userProfile?.level || null,
          },
          clientMetadata: data.clientMetadata || {
            appVersion: '1.0.0',
            platform: 'android',
          },
        })
        .returning({
          id: feedbackTable.id,
          createdAt: feedbackTable.createdAt,
        });

      if (!inserted) {
        throw new Error('Failed to insert feedback submission');
      }

      logger.info(
        `[FEEDBACK] Submission recorded for user ${userId} (Survey Version: ${surveyVersion})`
      );

      return {
        id: inserted.id,
        submittedAt: inserted.createdAt,
      };
    } catch (error: any) {
      // Check for PostgreSQL unique constraint violation (code 23505)
      if (error?.code === '23505') {
        throw new FeedbackError(
          'You have already submitted feedback for this survey version.',
          409,
          'DUPLICATE_SUBMISSION'
        );
      }
      logger.error(`[FEEDBACK ERROR] Failed to save submission: ${error.message}`);
      throw error;
    }
  },
};
