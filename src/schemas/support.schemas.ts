import { z } from 'zod';

export const createSupportRequestSchema = z.object({
  body: z.object({
    subject: z
      .string()
      .min(3, 'Subject must be at least 3 characters long')
      .max(150, 'Subject cannot exceed 150 characters'),

    category: z.enum([
      'academic',
      'technical',
      'billing',
      'account',
      'general',
    ]),

    message: z
      .string()
      .min(5, 'Message must be at least 5 characters long')
      .max(2000, 'Message cannot exceed 2000 characters'),

    priority: z
      .enum(['low', 'medium', 'high', 'urgent'])
      .optional()
      .default('medium'),
  }),
});

export const addSupportMessageSchema = z.object({
  body: z.object({
    message: z
      .string()
      .min(1, 'Message cannot be empty')
      .max(2000, 'Message cannot exceed 2000 characters'),
  }),
});

export const updateSupportStatusSchema = z.object({
  body: z.object({
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
  }),
});
