import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    text: z
      .string()
      .trim()
      .min(1, 'Message cannot be empty')
      .max(4000, 'Message cannot exceed 4000 characters'),
  }),
});

export const joinAcademicChannelSchema = z.object({
  body: z.object({
    type: z.enum(['faculty', 'department', 'level']),
    targetId: z.string().optional(),
    level: z.number().int().min(100).max(500).optional(),
    title: z.string().min(1),
    code: z.string().optional(),
  }),
});

