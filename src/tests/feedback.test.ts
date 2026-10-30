import { describe, it } from 'node:test';
import assert from 'node:assert';
import { submitFeedbackSchema } from '../schemas/feedback.schemas.js';
import { feedbackService } from '../services/feedbackService.js';
import { adminFeedbackService } from '../services/admin/adminFeedbackService.js';

describe('BB-03: In-App User Feedback & Admin Management Suite', () => {
  // =====================================================
  // 1. ZOD SCHEMA & MUTUAL EXCLUSION VALIDATION
  // =====================================================
  it('1. Rejects "None — app ran smoothly" when combined with other frictions', () => {
    const invalidPayload = {
      body: {
        surveyVersion: '1.0',
        overallSatisfaction: 4,
        usageFrequency: 'daily',
        contentAccuracyRating: 4,
        fairnessRating: 4,
        technicalFrictions: ['none_smooth', 'app_freeze'], // INVALID COMBINATION
        featureRatings: { cbtQuizzes: 4 },
        structuredAnswers: {
          usageFrequency: 'daily',
          featuresEvaluated: ['cbtQuizzes'],
          courseDiscoveryScore: 4,
          cbtSessionExperience: 'smooth',
          answerReviewScore: 4,
          progressTrackingScore: 4,
          technicalFrictions: ['none_smooth', 'app_freeze'],
          contentAccuracyScore: 4,
          competitionFairnessScore: 4,
          overallSatisfaction: 4,
          featuresNotUsed: [],
        },
      },
    };

    const result = submitFeedbackSchema.safeParse(invalidPayload);
    assert.strictEqual(
      result.success,
      false,
      'Schema must fail when none_smooth is mixed with other friction options'
    );
  });

  it('2. Accepts "None — app ran smoothly" when selected alone', () => {
    const validPayload = {
      body: {
        surveyVersion: '1.0',
        overallSatisfaction: 5,
        usageFrequency: 'several_times_week',
        contentAccuracyRating: 5,
        fairnessRating: 5,
        technicalFrictions: ['none_smooth'],
        featureRatings: { cbtQuizzes: 4, quizReview: 3 },
        structuredAnswers: {
          usageFrequency: 'several_times_week',
          featuresEvaluated: ['cbtQuizzes', 'quizReview'],
          courseDiscoveryScore: 5,
          cbtSessionExperience: 'smooth',
          answerReviewScore: 5,
          progressTrackingScore: 4,
          technicalFrictions: ['none_smooth'],
          contentAccuracyScore: 5,
          competitionFairnessScore: 5,
          overallSatisfaction: 5,
          featuresNotUsed: [],
        },
      },
    };

    const result = submitFeedbackSchema.safeParse(validPayload);
    assert.strictEqual(
      result.success,
      true,
      'Schema must succeed when none_smooth is selected alone'
    );
  });

  it('3. Accepts multiple distinct technical frictions when none_smooth is absent', () => {
    const validMultipleFrictions = {
      body: {
        surveyVersion: '1.0',
        overallSatisfaction: 3,
        usageFrequency: 'weekly',
        contentAccuracyRating: 3,
        fairnessRating: 3,
        technicalFrictions: ['network_timeout', 'battery_drain', 'slow_loading'],
        frictionDetails: 'Hostel WiFi drops frequently during CBT tests',
        featureRatings: { cbtQuizzes: 3 },
        structuredAnswers: {
          usageFrequency: 'weekly',
          featuresEvaluated: ['cbtQuizzes'],
          courseDiscoveryScore: 3,
          cbtSessionExperience: 'moderate',
          answerReviewScore: 3,
          progressTrackingScore: 3,
          technicalFrictions: ['network_timeout', 'battery_drain', 'slow_loading'],
          frictionDetails: 'Hostel WiFi drops frequently during CBT tests',
          contentAccuracyScore: 3,
          competitionFairnessScore: 3,
          overallSatisfaction: 3,
          featuresNotUsed: [],
        },
      },
    };

    const result = submitFeedbackSchema.safeParse(validMultipleFrictions);
    assert.strictEqual(
      result.success,
      true,
      'Schema must accept multiple valid technical friction selections'
    );
  });

  it('4. Rejects out-of-range satisfaction ratings (< 1 or > 5)', () => {
    const outOfRangePayload = {
      body: {
        surveyVersion: '1.0',
        overallSatisfaction: 6, // OUT OF RANGE
        usageFrequency: 'daily',
        contentAccuracyRating: 4,
        fairnessRating: 4,
        technicalFrictions: [],
        featureRatings: {},
        structuredAnswers: {
          usageFrequency: 'daily',
          featuresEvaluated: [],
          courseDiscoveryScore: 3,
          cbtSessionExperience: 'smooth',
          answerReviewScore: 3,
          progressTrackingScore: 3,
          technicalFrictions: [],
          contentAccuracyScore: 3,
          competitionFairnessScore: 3,
          overallSatisfaction: 6,
          featuresNotUsed: [],
        },
      },
    };

    const result = submitFeedbackSchema.safeParse(outOfRangePayload);
    assert.strictEqual(
      result.success,
      false,
      'Schema must reject satisfaction scores greater than 5'
    );
  });

  // =====================================================
  // 2. ELIGIBILITY SERVICE LOGIC
  // =====================================================
  it('5. Correctly flags non-existent or zero-quiz user as ineligible', async () => {
    // Non-existent synthetic user ID
    const randomUserId = '00000000-0000-0000-0000-000000000099';
    const eligibility = await feedbackService.checkEligibility(randomUserId, '1.0');

    assert.strictEqual(eligibility.eligible, false);
    assert.strictEqual(eligibility.hasCompletedQuiz, false);
    assert.strictEqual(eligibility.completedQuizCount, 0);
    assert.strictEqual(eligibility.ineligibilityReason, 'no_completed_quizzes');
    assert.ok(eligibility.message?.includes('complete at least one'));
  });

  // =====================================================
  // 3. ADMIN SUMMARY & PSEUDONYMOUS PRIVACY
  // =====================================================
  it('6. Admin summary returns structured analytics metrics without errors', async () => {
    const summary = await adminFeedbackService.getFeedbackSummary('1.0');

    assert.ok(typeof summary.totalSubmissions === 'number');
    assert.ok(typeof summary.uniqueUsers === 'number');
    assert.ok(typeof summary.averageSatisfaction === 'number');
    assert.ok(summary.satisfactionDistribution);
    assert.ok(summary.usageFrequencyBreakdown);
    assert.ok(Array.isArray(summary.topTechnicalFrictions));
    assert.ok(Array.isArray(summary.submissionsTimeline));
  });

  it('7. Admin submissions list enforces pseudonymous student masking', async () => {
    const listResult = await adminFeedbackService.listFeedbackSubmissions({
      page: 1,
      limit: 10,
      version: '1.0',
    });

    assert.ok(listResult.pagination);
    assert.ok(Array.isArray(listResult.data));

    for (const item of listResult.data) {
      assert.ok(item.respondentCode.startsWith('Scholar #'));
      assert.strictEqual(
        (item as any).email,
        undefined,
        'Admin submissions list must NEVER return student email!'
      );
      assert.strictEqual(
        (item as any).matricNumber,
        undefined,
        'Admin submissions list must NEVER return matriculation number!'
      );
    }
  });
});

