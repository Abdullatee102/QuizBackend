import { z } from 'zod';

export const gradeTheoryAnswerSchema = z.object({
  body: z
    .object({
      questionId: z.string().uuid().optional(),
      questionText: z.string().min(1).optional(),
      studentAnswer: z.string({
        error: 'Student answer is required',
      }),
      referenceAnswer: z.string().optional(),
      gradingPoints: z
        .array(
          z.object({
            concept: z.string().min(1),
            weight: z.number().positive(),
            aliases: z.array(z.string()).optional(),
          })
        )
        .optional(),
      maxScore: z.number().positive().optional(),
    })
    .refine((data) => Boolean(data.questionId || data.questionText), {
      message: 'Either questionId or questionText must be provided.',
    }),
});

export const supportAssistantSchema = z.object({
  body: z.object({
    message: z
      .string({
        error: 'Support inquiry message is required',
      })
      .min(1, 'Message cannot be empty')
      .max(2000, 'Message cannot exceed 2000 characters'),
  }),
});
