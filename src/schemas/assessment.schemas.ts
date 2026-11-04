import { z } from 'zod';
import { ASSESSMENT_TYPES, RESULT_RELEASE_POLICY } from '../db/schema.js';

export const createAssessmentSchema = z
  .object({
    body: z
      .object({
        title: z
          .string()
          .trim()
          .min(3, 'Title must be at least 3 characters')
          .max(255, 'Title cannot exceed 255 characters'),
        description: z.string().trim().max(2000).optional().nullable(),
        type: z
          .enum([
            ASSESSMENT_TYPES.CBT,
            ASSESSMENT_TYPES.THEORY,
            ASSESSMENT_TYPES.MIXED,
            ASSESSMENT_TYPES.ASSIGNMENT,
          ])
          .default(ASSESSMENT_TYPES.CBT),
        durationMinutes: z
          .number()
          .int('Duration must be an integer')
          .min(5, 'Duration must be at least 5 minutes')
          .max(480, 'Duration cannot exceed 480 minutes (8 hours)'),
        startTime: z
          .string()
          .datetime({ message: 'Start time must be a valid ISO 8601 string' }),
        endTime: z
          .string()
          .datetime({ message: 'End time must be a valid ISO 8601 string' }),
        passMarks: z.number().min(0).optional().nullable(),
        maxAttempts: z.number().int().min(1).max(10).default(1),
        isRandomized: z.boolean().default(false),
        allowLateSubmission: z.boolean().default(false),
        lateSubmissionDeadline: z
          .string()
          .datetime({ message: 'Late submission deadline must be an ISO 8601 string' })
          .optional()
          .nullable(),
        resultReleasePolicy: z
          .enum([
            RESULT_RELEASE_POLICY.IMMEDIATE,
            RESULT_RELEASE_POLICY.SCHEDULED,
            RESULT_RELEASE_POLICY.MANUAL_AFTER_GRADING,
          ])
          .default(RESULT_RELEASE_POLICY.MANUAL_AFTER_GRADING),
      })
      .superRefine((data, ctx) => {
        const start = new Date(data.startTime).getTime();
        const end = new Date(data.endTime).getTime();

        if (end <= start) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'End time must be strictly after start time',
            path: ['endTime'],
          });
        }

        const windowMinutes = (end - start) / (60 * 1000);
        if (windowMinutes < data.durationMinutes) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Assessment availability window (${Math.round(windowMinutes)} mins) cannot be shorter than attempt duration (${data.durationMinutes} mins)`,
            path: ['durationMinutes'],
          });
        }

        if (data.allowLateSubmission && data.lateSubmissionDeadline) {
          const late = new Date(data.lateSubmissionDeadline).getTime();
          if (late <= end) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Late submission deadline must be after end time',
              path: ['lateSubmissionDeadline'],
            });
          }
        }
      }),
  });

export const updateAssessmentDraftSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(3).max(255).optional(),
      description: z.string().trim().max(2000).optional().nullable(),
      type: z
        .enum([
          ASSESSMENT_TYPES.CBT,
          ASSESSMENT_TYPES.THEORY,
          ASSESSMENT_TYPES.MIXED,
          ASSESSMENT_TYPES.ASSIGNMENT,
        ])
        .optional(),
      durationMinutes: z.number().int().min(5).max(480).optional(),
      startTime: z.string().datetime().optional(),
      endTime: z.string().datetime().optional(),
      passMarks: z.number().min(0).optional().nullable(),
      maxAttempts: z.number().int().min(1).max(10).optional(),
      isRandomized: z.boolean().optional(),
      allowLateSubmission: z.boolean().optional(),
      lateSubmissionDeadline: z.string().datetime().optional().nullable(),
      resultReleasePolicy: z
        .enum([
          RESULT_RELEASE_POLICY.IMMEDIATE,
          RESULT_RELEASE_POLICY.SCHEDULED,
          RESULT_RELEASE_POLICY.MANUAL_AFTER_GRADING,
        ])
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.startTime && data.endTime) {
        const start = new Date(data.startTime).getTime();
        const end = new Date(data.endTime).getTime();
        if (end <= start) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'End time must be strictly after start time',
            path: ['endTime'],
          });
        }
        if (data.durationMinutes) {
          const windowMinutes = (end - start) / (60 * 1000);
          if (windowMinutes < data.durationMinutes) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Availability window cannot be shorter than attempt duration`,
              path: ['durationMinutes'],
            });
          }
        }
      }
    }),
});

export const assignQuestionsSchema = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          questionId: z.string().uuid('Question ID must be a valid UUID'),
          orderIndex: z.number().int().min(0).optional(),
          allocatedMarks: z.number().positive('Allocated marks must be greater than 0').default(1),
        })
      )
      .min(1, 'At least one question must be selected'),
  }),
});

export const rescheduleAssessmentSchema = z.object({
  body: z
    .object({
      startTime: z
        .string()
        .datetime({ message: 'Start time must be a valid ISO 8601 string' }),
      endTime: z
        .string()
        .datetime({ message: 'End time must be a valid ISO 8601 string' }),
      reason: z.string().trim().max(1000).optional(),
    })
    .superRefine((data, ctx) => {
      const start = new Date(data.startTime).getTime();
      const end = new Date(data.endTime).getTime();
      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'End time must be strictly after start time',
          path: ['endTime'],
        });
      }
    }),
});

export const extendAssessmentSchema = z.object({
  body: z.object({
    endTime: z
      .string()
      .datetime({ message: 'End time must be a valid ISO 8601 string' }),
    reason: z.string().trim().max(1000).optional(),
  }),
});

export const cancelAssessmentSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .trim()
      .min(3, 'Cancellation reason must be at least 3 characters')
      .max(1000, 'Cancellation reason cannot exceed 1000 characters'),
  }),
});

export const adminSuspendAssessmentSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .trim()
      .min(5, 'Reason must be at least 5 characters')
      .max(1000, 'Reason cannot exceed 1000 characters'),
  }),
});

// =====================================================
// GRADEBOOK, MODERATION & RESULT PUBLICATION (BB-07F.7)
// =====================================================

export const submitResultsApprovalSchema = z.object({
  body: z.object({
    overrideIncompleteReason: z.string().trim().min(5, 'Override reason must be at least 5 characters').optional(),
  }).optional(),
});

export const moderateGradeSchema = z.object({
  body: z.object({
    newScore: z.number().min(0, 'Score cannot be negative').optional(),
    isFlaggedForReview: z.boolean().optional(),
    flagReason: z.string().trim().optional(),
    moderationNotes: z.string().trim().optional(),
    reason: z.string().trim().min(3, 'A clear reason for moderation is mandatory'),
  }),
});

export const approveResultsSchema = z.object({
  body: z.object({
    notes: z.string().trim().max(1000).optional(),
  }).optional(),
});

export const rejectResultsSchema = z.object({
  body: z.object({
    reason: z
      .string()
      .trim()
      .min(5, 'Rejection reason must be at least 5 characters')
      .max(1000, 'Rejection reason cannot exceed 1000 characters'),
  }),
});

export const publishResultsSchema = z.object({
  body: z.object({
    scheduledReleaseAt: z.string().datetime().optional(),
  }).optional(),
});
