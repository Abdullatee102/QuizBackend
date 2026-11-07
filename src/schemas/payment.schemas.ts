/**
 * BB-05B: Payment Validation Schemas
 * Brain Buzz — Core Payment Infrastructure
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

export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>['body'];
export type OrderReferenceParamInput = z.infer<typeof orderReferenceParamSchema>['params'];
export type ListOrdersQueryInput = z.infer<typeof listOrdersQuerySchema>['query'];
