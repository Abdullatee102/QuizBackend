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

