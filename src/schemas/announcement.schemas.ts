import { z } from 'zod';
import {
  ANNOUNCEMENT_PRIORITIES,
  ANNOUNCEMENT_STATUSES,
} from '../db/schema.js';

export const createAnnouncementSchema = z.object({
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
    priority: z
      .enum([
        ANNOUNCEMENT_PRIORITIES.NORMAL,
        ANNOUNCEMENT_PRIORITIES.IMPORTANT,
        ANNOUNCEMENT_PRIORITIES.URGENT,
      ])
      .default(ANNOUNCEMENT_PRIORITIES.NORMAL),
    status: z
      .enum([
        ANNOUNCEMENT_STATUSES.DRAFT,
        ANNOUNCEMENT_STATUSES.PUBLISHED,
        ANNOUNCEMENT_STATUSES.ARCHIVED,
      ])
      .default(ANNOUNCEMENT_STATUSES.PUBLISHED),
    attachmentUrl: z.string().trim().url().optional().nullable(),
    attachmentName: z.string().trim().max(255).optional().nullable(),
  }),
});

export const updateAnnouncementSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(255, 'Title cannot exceed 255 characters')
      .optional(),
    content: z
      .string()
      .trim()
      .min(5, 'Content must be at least 5 characters')
      .max(10000, 'Content cannot exceed 10000 characters')
      .optional(),
    priority: z
      .enum([
        ANNOUNCEMENT_PRIORITIES.NORMAL,
        ANNOUNCEMENT_PRIORITIES.IMPORTANT,
        ANNOUNCEMENT_PRIORITIES.URGENT,
      ])
      .optional(),
    status: z
      .enum([
        ANNOUNCEMENT_STATUSES.DRAFT,
        ANNOUNCEMENT_STATUSES.PUBLISHED,
        ANNOUNCEMENT_STATUSES.ARCHIVED,
      ])
      .optional(),
    attachmentUrl: z.string().trim().url().optional().nullable(),
    attachmentName: z.string().trim().max(255).optional().nullable(),
  }),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>['body'];
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>['body'];

