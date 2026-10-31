import { z } from 'zod';

const gradingPointSchema = z
  .object({
    concept: z.string().trim().min(1, 'Concept name is required'),
    weight: z.coerce.number().positive('Weight must be a positive number'),
    aliases: z.array(z.string().trim()).optional(),
    keywords: z.array(z.string().trim()).optional(),
  })
  .passthrough();

export const createQuestionDraftSchema = z.object({
  params: z
    .object({
      offeringId: z.string().trim().optional(),
    })
    .optional(),
  body: z
    .object({
      offeringId: z.string().trim().optional(),
      type: z.enum(['cbt', 'theory']).default('cbt'),
      question: z.string().trim().min(5, 'Question text must be at least 5 characters'),
      options: z.array(z.string().trim().min(1, 'Option cannot be empty')).optional().nullable(),
      correctAnswer: z.string().trim().min(1, 'Correct answer / model answer is required'),
      gradingPoints: z.array(gradingPointSchema).optional().default([]),
      explanation: z.string().trim().optional().nullable(),
      points: z.coerce.number().int().positive('Points must be a positive integer').default(1),
      difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
      imageUrl: z.string().trim().optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.type === 'cbt') {
        if (!data.options || !Array.isArray(data.options) || data.options.length < 2) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'CBT questions require at least 2 non-empty options',
            path: ['options'],
          });
          return;
        }

        const trimmedAnswer = data.correctAnswer.trim();
        const matchesOption = data.options.some((opt) => opt.trim() === trimmedAnswer);
        if (!matchesOption) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Correct answer must exactly match one of the available options',
            path: ['correctAnswer'],
          });
        }
      } else if (data.type === 'theory') {
        if (!data.gradingPoints || !Array.isArray(data.gradingPoints) || data.gradingPoints.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Theory questions require at least one grading rubric point',
            path: ['gradingPoints'],
          });
          return;
        }

        for (let i = 0; i < data.gradingPoints.length; i++) {
          const gp = data.gradingPoints[i];
          if (!gp || !gp.concept || !gp.concept.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Grading point at index ${i} requires a non-empty concept`,
              path: ['gradingPoints', i, 'concept'],
            });
          } else if (typeof gp.weight !== 'number' || gp.weight <= 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Grading point at index ${i} requires a positive numeric weight`,
              path: ['gradingPoints', i, 'weight'],
            });
          }
        }
      }
    }),
});

export const updateQuestionDraftSchema = z.object({
  body: z
    .object({
      type: z.enum(['cbt', 'theory']).optional(),
      question: z.string().trim().min(5, 'Question text must be at least 5 characters').optional(),
      options: z.array(z.string().trim().min(1, 'Option cannot be empty')).optional().nullable(),
      correctAnswer: z.string().trim().min(1, 'Correct answer / model answer is required').optional(),
      gradingPoints: z.array(gradingPointSchema).optional(),
      explanation: z.string().trim().optional().nullable(),
      points: z.coerce.number().int().positive('Points must be a positive integer').optional(),
      difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
      imageUrl: z.string().trim().optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (data.type === 'cbt' || (data.options !== undefined && data.type !== 'theory')) {
        if (data.options !== undefined) {
          if (!data.options || !Array.isArray(data.options) || data.options.length < 2) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'CBT questions require at least 2 non-empty options',
              path: ['options'],
            });
            return;
          }

          if (data.correctAnswer) {
            const trimmedAnswer = data.correctAnswer.trim();
            const matchesOption = data.options.some((opt) => opt.trim() === trimmedAnswer);
            if (!matchesOption) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Correct answer must exactly match one of the available options',
                path: ['correctAnswer'],
              });
            }
          }
        }
      }
    }),
});

export const requestRevisionSchema = z.object({
  body: z.object({
    feedback: z.string().trim().min(5, 'Review feedback must be at least 5 characters'),
  }),
});

export const rejectQuestionSchema = z.object({
  body: z.object({
    reason: z.string().trim().min(5, 'Rejection reason must be at least 5 characters'),
  }),
});

export const publishQuestionSchema = z.object({
  body: z.object({
    isPracticeEligible: z.boolean().default(false),
  }),
});

export const listQuestionsQuerySchema = z.object({
  query: z.object({
    offeringId: z.string().uuid().optional(),
    courseId: z.string().uuid().optional(),
    status: z
      .enum([
        'DRAFT',
        'SUBMITTED',
        'UNDER_REVIEW',
        'REVISION_REQUIRED',
        'REJECTED',
        'APPROVED',
        'PUBLISHED',
        'ARCHIVED',
      ])
      .optional(),
    type: z.enum(['cbt', 'theory']).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    search: z.string().trim().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});
