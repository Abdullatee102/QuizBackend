import { z } from 'zod';

export const createDiscussionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(255, 'Title cannot exceed 255 characters'),
    content: z
      .string()
      .trim()
      .min(5, 'Content must be at least 5 characters')
      .max(10000, 'Content cannot exceed 10000 characters'),
    announcementId: z.string().uuid().optional().nullable(),
  }),
});

export const replyDiscussionSchema = z.object({
  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Reply content cannot be empty')
      .max(10000, 'Reply content cannot exceed 10000 characters'),
  }),
});

export const moderateDiscussionSchema = z.object({
  body: z.object({
    isPinned: z.boolean().optional(),
    isLocked: z.boolean().optional(),
  }),
});

export type CreateDiscussionInput = z.infer<typeof createDiscussionSchema>['body'];
export type ReplyDiscussionInput = z.infer<typeof replyDiscussionSchema>['body'];
export type ModerateDiscussionInput = z.infer<typeof moderateDiscussionSchema>['body'];

