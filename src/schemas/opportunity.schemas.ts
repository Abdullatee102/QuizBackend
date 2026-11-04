import { z } from 'zod';
import {
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_STATUS,
  OPPORTUNITY_VERIFICATION_STATUS,
} from '../db/schema.js';

// Enforce strict HTTPS URL validation to defend against phishing and javascript/data URI attacks
const httpsUrlRegex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
const httpsUrlValidator = z
  .string()
  .trim()
  .regex(httpsUrlRegex, { message: 'Must be a valid HTTPS URL (http/relative/data URIs are rejected)' });

export const targetAudienceSchema = z.object({
  isAll: z.boolean().default(true),
  facultyIds: z.array(z.string().uuid()).optional().default([]),
  departmentIds: z.array(z.string().uuid()).optional().default([]),
  levels: z.array(z.number().int().min(100).max(900)).optional().default([]),
  facultyCodes: z.array(z.string().trim().toUpperCase()).optional(),
  departmentCodes: z.array(z.string().trim().toUpperCase()).optional(),
});

export const createOpportunitySchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Title must be at least 3 characters')
      .max(255, 'Title cannot exceed 255 characters'),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(255)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
      .optional(),
    category: z.enum([
      OPPORTUNITY_CATEGORIES.SCHOLARSHIPS,
      OPPORTUNITY_CATEGORIES.ORGANISATIONS,
      OPPORTUNITY_CATEGORIES.TUTORIALS,
    ]),
    organization: z
      .string()
      .trim()
      .min(2, 'Organization name must be at least 2 characters')
      .max(255),
    shortDescription: z
      .string()
      .trim()
      .min(5, 'Short description must be at least 5 characters')
      .max(500, 'Short description cannot exceed 500 characters'),
    fullDescription: z
      .string()
      .trim()
      .min(10, 'Full description must be at least 10 characters'),
    requirements: z.string().trim().optional().nullable(),
    benefits: z.string().trim().optional().nullable(),
    applicationUrl: httpsUrlValidator.optional().nullable(),
    contactEmail: z.string().trim().email('Invalid contact email format').optional().nullable(),
    contactPhone: z.string().trim().max(50).optional().nullable(),
    logoUrl: httpsUrlValidator.optional().nullable(),
    bannerUrl: httpsUrlValidator.optional().nullable(),
    deadline: z.string().datetime({ offset: true }).or(z.string().datetime()).optional().nullable(),
    status: z
      .enum([
        OPPORTUNITY_STATUS.DRAFT,
        OPPORTUNITY_STATUS.PUBLISHED,
        OPPORTUNITY_STATUS.ARCHIVED,
      ])
      .default(OPPORTUNITY_STATUS.DRAFT),
    verificationStatus: z
      .enum([
        OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
        OPPORTUNITY_VERIFICATION_STATUS.COMMUNITY_SUBMITTED,
        OPPORTUNITY_VERIFICATION_STATUS.UNVERIFIED,
      ])
      .default(OPPORTUNITY_VERIFICATION_STATUS.UNVERIFIED),
    isFeatured: z.boolean().default(false),
    targetAudience: targetAudienceSchema.default(() => ({ isAll: true, facultyIds: [], departmentIds: [], levels: [] })),
    notifySubscribers: z.boolean().default(false),
  }),
});

export const updateOpportunitySchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(255).optional(),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(255)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens')
      .optional(),
    category: z
      .enum([
        OPPORTUNITY_CATEGORIES.SCHOLARSHIPS,
        OPPORTUNITY_CATEGORIES.ORGANISATIONS,
        OPPORTUNITY_CATEGORIES.TUTORIALS,
      ])
      .optional(),
    organization: z.string().trim().min(2).max(255).optional(),
    shortDescription: z.string().trim().min(5).max(500).optional(),
    fullDescription: z.string().trim().min(10).optional(),
    requirements: z.string().trim().optional().nullable(),
    benefits: z.string().trim().optional().nullable(),
    applicationUrl: httpsUrlValidator.optional().nullable(),
    contactEmail: z.string().trim().email().optional().nullable(),
    contactPhone: z.string().trim().max(50).optional().nullable(),
    logoUrl: httpsUrlValidator.optional().nullable(),
    bannerUrl: httpsUrlValidator.optional().nullable(),
    deadline: z.string().datetime({ offset: true }).or(z.string().datetime()).optional().nullable(),
    status: z
      .enum([
        OPPORTUNITY_STATUS.DRAFT,
        OPPORTUNITY_STATUS.PUBLISHED,
        OPPORTUNITY_STATUS.ARCHIVED,
      ])
      .optional(),
    verificationStatus: z
      .enum([
        OPPORTUNITY_VERIFICATION_STATUS.VERIFIED,
        OPPORTUNITY_VERIFICATION_STATUS.COMMUNITY_SUBMITTED,
        OPPORTUNITY_VERIFICATION_STATUS.UNVERIFIED,
      ])
      .optional(),
    isFeatured: z.boolean().optional(),
    targetAudience: targetAudienceSchema.optional(),
  }),
});

export const updateOpportunityPreferenceSchema = z.object({
  body: z.object({
    category: z.enum([
      OPPORTUNITY_CATEGORIES.SCHOLARSHIPS,
      OPPORTUNITY_CATEGORIES.ORGANISATIONS,
      OPPORTUNITY_CATEGORIES.TUTORIALS,
    ]),
    isEnabled: z.boolean(),
  }),
});

export const publishOpportunitySchema = z.object({
  body: z.object({
    notifySubscribers: z.boolean().default(true),
  }).default({ notifySubscribers: true }),
});

export type CreateOpportunityInput = z.infer<typeof createOpportunitySchema>['body'];
export type UpdateOpportunityInput = z.infer<typeof updateOpportunitySchema>['body'];
export type UpdateOpportunityPreferenceInput = z.infer<typeof updateOpportunityPreferenceSchema>['body'];

