import { z } from 'zod';

export const saveAnswersSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        assessmentQuestionId: z.string().uuid('Invalid assessment question ID'),
        questionId: z.string().uuid('Invalid question ID'),
        answer: z.string().nullable().optional().default(''),
        clientVersion: z.number().int().min(1).optional().default(1),
        isFlagged: z.boolean().optional().default(false),
      })
    ).min(1, 'At least one answer must be provided'),
  }),
});

export const submitAttemptSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        assessmentQuestionId: z.string().uuid('Invalid assessment question ID'),
        questionId: z.string().uuid('Invalid question ID'),
        answer: z.string().nullable().optional().default(''),
        clientVersion: z.number().int().min(1).optional().default(1),
        isFlagged: z.boolean().optional().default(false),
      })
    ).optional(),
  }).optional(),
});

export const forceSubmitSchema = z.object({
  body: z.object({
    reason: z.string().min(3, 'A clear reason is mandatory for administrative force-submission'),
  }),
});

export const gradeTheorySchema = z.object({
  body: z.object({
    questionGrades: z
      .array(
        z.object({
          assessmentQuestionId: z.string().uuid('Invalid assessment question ID'),
          awardedMarks: z.number().min(0, 'Awarded marks cannot be negative'),
          rubricScores: z
            .array(
              z.object({
                concept: z.string().min(1),
                maxWeight: z.number().min(0),
                awardedWeight: z.number().min(0),
                comment: z.string().optional(),
              })
            )
            .optional(),
          feedback: z.string().optional(),
        })
      )
      .min(1, 'At least one question grade must be provided'),
    reason: z.string().optional(),
  }),
});

