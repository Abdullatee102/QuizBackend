import { z } from 'zod';

export const TECHNICAL_FRICTION_OPTIONS = [
  'app_freeze',
  'network_timeout',
  'slow_loading',
  'timer_session_issues',
  'incorrect_content',
  'navigation_issues',
  'readability_issues',
  'battery_drain',
  'session_login_issues',
  'none_smooth',
  'other',
] as const;

export type TechnicalFriction = (typeof TECHNICAL_FRICTION_OPTIONS)[number];

export const submitFeedbackSchema = z.object({
  body: z
    .object({
      surveyVersion: z.string().default('1.0'),
      overallSatisfaction: z.number().int().min(1).max(5),
      usageFrequency: z.enum([
        'daily',
        'several_times_week',
        'weekly',
        'exam_season',
        'rarely',
      ]),
      contentAccuracyRating: z.number().int().min(1).max(5),
      fairnessRating: z.number().int().min(1).max(5),
      technicalFrictions: z
        .array(
          z.enum([
            'app_freeze',
            'network_timeout',
            'slow_loading',
            'timer_session_issues',
            'incorrect_content',
            'navigation_issues',
            'readability_issues',
            'battery_drain',
            'session_login_issues',
            'none_smooth',
            'other',
          ])
        )
        .default([]),
      frictionDetails: z
        .string()
        .max(500, 'Friction details cannot exceed 500 characters')
        .optional()
        .nullable(),
      featureRatings: z
        .record(z.string(), z.number().int().min(0).max(4))
        .default({}),
      structuredAnswers: z.object({
        usageFrequency: z.string(),
        featuresEvaluated: z.array(z.string()).default([]),
        courseDiscoveryScore: z.number().int().min(1).max(5).default(3),
        cbtSessionExperience: z.string().default('smooth'),
        answerReviewScore: z.number().int().min(1).max(5).default(3),
        progressTrackingScore: z.number().int().min(1).max(5).default(3),
        technicalFrictions: z.array(z.string()).default([]),
        frictionDetails: z.string().max(500).optional().nullable(),
        contentAccuracyScore: z.number().int().min(1).max(5).default(3),
        competitionFairnessScore: z.number().int().min(1).max(5).default(3),
        overallSatisfaction: z.number().int().min(1).max(5),
        featuresNotUsed: z.array(z.string()).default([]),
      }),
      suggestions: z
        .string()
        .max(1000, 'Suggestions cannot exceed 1000 characters')
        .optional()
        .nullable(),
      clientMetadata: z
        .object({
          appVersion: z.string().default('1.0.0'),
          platform: z.enum(['android', 'ios', 'other']).default('android'),
          deviceModel: z.string().max(100).optional(),
        })
        .default({ appVersion: '1.0.0', platform: 'android' }),
    })
    .refine(
      (data) => {
        if (data.technicalFrictions.includes('none_smooth')) {
          return data.technicalFrictions.length === 1;
        }
        return true;
      },
      {
        message:
          '"None — app ran smoothly" cannot be combined with specific technical friction options.',
        path: ['technicalFrictions'],
      }
    ),
});

export const feedbackFilterSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    version: z.string().optional().default('1.0'),
    satisfaction: z.coerce.number().int().min(1).max(5).optional(),
    friction: z.string().optional(),
    facultyId: z.string().uuid().optional(),
    search: z.string().max(100).optional(),
  }),
});
