/**
 * BB-05B: Server-Controlled Product Catalog & Pricing
 * Brain Buzz — Core Payment Infrastructure
 * 
 * CRITICAL RULE: Payment amounts, currencies, feature keys, and entitlement durations
 * are strictly defined on the server. Clients may NEVER dictate or override these values.
 */

import type { PaymentProduct } from './types.js';

export const PAYMENT_PRODUCTS: Record<string, PaymentProduct> = {
  PREMIUM_PASS_MONTHLY: {
    id: 'PREMIUM_PASS_MONTHLY',
    title: 'Brain Buzz Premium Access (30 Days)',
    description: 'Unlocks advanced practice modes, detailed performance analytics, and priority revision.',
    amount: 100000, // 1,000.00 NGN in kobo
    currency: 'NGN',
    purpose: 'PREMIUM_SUBSCRIPTION',
    featureKey: 'PREMIUM_QUIZ_PASS',
    durationDays: 30,
    isTestProduct: true,
  },
  EXAM_PRACTICE_BUNDLE: {
    id: 'EXAM_PRACTICE_BUNDLE',
    title: 'Semester Examination Prep Pack',
    description: 'Access to comprehensive faculty question banks and AI-assisted revision rubrics.',
    amount: 50000, // 500.00 NGN in kobo
    currency: 'NGN',
    purpose: 'EXAM_PRACTICE',
    featureKey: 'EXAM_PRACTICE_BUNDLE',
    durationDays: 90,
    isTestProduct: true,
  },
  VERIFIED_CERTIFICATE: {
    id: 'VERIFIED_CERTIFICATE',
    title: 'Course Completion Certificate of Merit',
    description: 'Cryptographically signed digital certificate verifying academic excellence.',
    amount: 150000, // 1,500.00 NGN in kobo
    currency: 'NGN',
    purpose: 'VERIFIED_CERTIFICATE',
    featureKey: 'VERIFIED_CERTIFICATE',
    durationDays: null, // Lifetime/Permanent
    isTestProduct: true,
  },
};

/**
 * Retrieve product definition by server-controlled product identifier.
 * Returns null if the requested product does not exist in the catalog.
 */
export function getProductById(productId: string): PaymentProduct | null {
  if (!productId || typeof productId !== 'string') {
    return null;
  }
  const normalizedKey = productId.trim();
  return PAYMENT_PRODUCTS[normalizedKey] || null;
}

/**
 * Returns all active products in the catalog for client pricing displays.
 */
export function getAvailableProducts(): PaymentProduct[] {
  return Object.values(PAYMENT_PRODUCTS);
}
