/**
 * BB-05B & BB-05C: Payment Validation Schemas
 * Brain Buzz — Core Payment Infrastructure & Entitlement Management
 */

import { z } from 'zod';

export const initializePaymentSchema = z.object({
  body: z.object({
    productId: z
      .string()
      .min(1, 'Product ID cannot be empty.')
      .trim(),
    callbackUrl: z
      .string()
      .trim()
      .url()
      .optional(),
    metadata: z.record(z.string(), z.any()).optional(),
  }),
});

export const orderReferenceParamSchema = z.object({
  params: z.object({
    reference: z
      .string()
      .min(3, 'Order reference must be at least 3 characters long.')
      .trim(),
  }),
});

export const listOrdersQuerySchema = z.object({
  query: z
    .object({
      limit: z.coerce.number().int().positive().max(100).optional(),
      offset: z.coerce.number().int().nonnegative().optional(),
      status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']).optional(),
    })
    .optional(),
});

export const reconcileOrdersSchema = z.object({
  body: z
    .object({
      olderThanMinutes: z.number().int().positive().max(1440).optional(),
      maxBatch: z.number().int().positive().max(100).optional(),
    })
    .optional(),
});

// =========================================================================
// BB-05C: Product Management & Entitlement Schemas
// =========================================================================

export const checkFeatureParamSchema = z.object({
  params: z.object({
    featureKey: z.string().min(1, 'Feature key is required.').trim(),
  }),
  query: z.object({
    academicSession: z.string().trim().optional(),
    semester: z.enum(['harmattan', 'rain']).optional(),
  }).optional(),
});

export const createPaymentProductSchema = z.object({
  body: z.object({
    id: z
      .string()
      .min(3, 'Product ID must be at least 3 characters.')
      .regex(/^[A-Z0-9_]+$/, 'Product ID must contain only uppercase letters, numbers, and underscores.')
      .trim(),
    title: z.string().min(3, 'Title must be at least 3 characters.').trim(),
    description: z.string().min(10, 'Description must be at least 10 characters.').trim(),
    category: z.enum(['SEMESTER_PASS', 'EXAM_PREP', 'AI_TUTOR', 'CONTENT_PACK', 'CERTIFICATE', 'INSTITUTIONAL']),
    amount: z.number().int().positive('Amount must be an integer in kobo greater than 0.'),
    currency: z.literal('NGN').default('NGN'),
    purpose: z.enum(['SEMESTER_SUBSCRIPTION', 'EXAM_PRACTICE', 'AI_ASSISTANCE', 'MATERIAL_ACCESS', 'CERTIFICATION', 'INSTITUTION_PILOT']),
    featureKey: z.string().min(2, 'Feature key is required.').trim(),
    durationDays: z.number().int().positive().nullable().optional(),
    academicSession: z.string().trim().nullable().optional(),
    semester: z.enum(['harmattan', 'rain']).nullable().optional(),
    benefits: z.array(z.string().min(1)).min(1, 'At least one benefit bullet must be provided.'),
    isActive: z.boolean().default(true),
    isTestProduct: z.boolean().default(false),
  }),
});

export const updatePaymentProductSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Product ID is required.'),
  }),
  body: z.object({
    title: z.string().min(3).trim().optional(),
    description: z.string().min(10).trim().optional(),
    category: z.enum(['SEMESTER_PASS', 'EXAM_PREP', 'AI_TUTOR', 'CONTENT_PACK', 'CERTIFICATE', 'INSTITUTIONAL']).optional(),
    amount: z.number().int().positive('Amount must be an integer in kobo greater than 0.').optional(),
    durationDays: z.number().int().positive().nullable().optional(),
    academicSession: z.string().trim().nullable().optional(),
    semester: z.enum(['harmattan', 'rain']).nullable().optional(),
    benefits: z.array(z.string().min(1)).optional(),
    isActive: z.boolean().optional(),
    isTestProduct: z.boolean().optional(),
  }),
});

export const manualEntitlementAdjustmentSchema = z.object({
  body: z.object({
    userId: z.string().uuid('Valid user UUID is required.'),
    featureKey: z.string().min(1, 'Feature key is required.').trim(),
    action: z.enum(['GRANT', 'REVOKE']),
    reason: z.string().min(5, 'A clear administrative justification of at least 5 characters is mandatory.'),
    durationDays: z.number().int().positive().optional(),
    productId: z.string().trim().optional(),
    academicSession: z.string().trim().optional(),
    semester: z.enum(['harmattan', 'rain']).optional(),
  }),
});

export const adminOrdersQuerySchema = z.object({
  query: z.object({
    limit: z.coerce.number().int().positive().max(100).optional(),
    offset: z.coerce.number().int().nonnegative().optional(),
    status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED']).optional(),
    userId: z.string().uuid().optional(),
    productId: z.string().optional(),
    search: z.string().optional(),
  }).optional(),
});

export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>['body'];
export type OrderReferenceParamInput = z.infer<typeof orderReferenceParamSchema>['params'];
export type ListOrdersQueryInput = z.infer<typeof listOrdersQuerySchema>['query'];
export type CreatePaymentProductInput = z.infer<typeof createPaymentProductSchema>['body'];
export type UpdatePaymentProductInput = z.infer<typeof updatePaymentProductSchema>['body'];
export type ManualEntitlementAdjustmentInput = z.infer<typeof manualEntitlementAdjustmentSchema>['body'];
export type AdminOrdersQueryInput = z.infer<typeof adminOrdersQuerySchema>['query'];
