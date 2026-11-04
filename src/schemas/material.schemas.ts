import { z } from 'zod';
import {
  COURSE_MATERIAL_CATEGORIES,
  COURSE_MATERIAL_STATUSES,
} from '../db/schema.js';

export const createMaterialSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(255, 'Title cannot exceed 255 characters'),
    description: z.string().trim().max(3000).optional().nullable(),
    category: z
      .enum([
        COURSE_MATERIAL_CATEGORIES.LECTURE_NOTE,
        COURSE_MATERIAL_CATEGORIES.SYLLABUS,
        COURSE_MATERIAL_CATEGORIES.SLIDE,
        COURSE_MATERIAL_CATEGORIES.ASSIGNMENT_BRIEF,
        COURSE_MATERIAL_CATEGORIES.LAB_MANUAL,
        COURSE_MATERIAL_CATEGORIES.READING,
        COURSE_MATERIAL_CATEGORIES.OTHER,
      ])
      .default(COURSE_MATERIAL_CATEGORIES.LECTURE_NOTE),
    status: z
      .enum([
        COURSE_MATERIAL_STATUSES.DRAFT,
        COURSE_MATERIAL_STATUSES.PUBLISHED,
        COURSE_MATERIAL_STATUSES.ARCHIVED,
      ])
      .default(COURSE_MATERIAL_STATUSES.PUBLISHED),
  }),
});

export const updateMaterialSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(255, 'Title cannot exceed 255 characters')
      .optional(),
    description: z.string().trim().max(3000).optional().nullable(),
    category: z
      .enum([
        COURSE_MATERIAL_CATEGORIES.LECTURE_NOTE,
        COURSE_MATERIAL_CATEGORIES.SYLLABUS,
        COURSE_MATERIAL_CATEGORIES.SLIDE,
        COURSE_MATERIAL_CATEGORIES.ASSIGNMENT_BRIEF,
        COURSE_MATERIAL_CATEGORIES.LAB_MANUAL,
        COURSE_MATERIAL_CATEGORIES.READING,
        COURSE_MATERIAL_CATEGORIES.OTHER,
      ])
      .optional(),
    status: z
      .enum([
        COURSE_MATERIAL_STATUSES.DRAFT,
        COURSE_MATERIAL_STATUSES.PUBLISHED,
        COURSE_MATERIAL_STATUSES.ARCHIVED,
      ])
      .optional(),
  }),
});

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>['body'];
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>['body'];

