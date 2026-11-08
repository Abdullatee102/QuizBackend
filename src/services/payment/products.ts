/**
 * BB-05C: Server-Controlled Product Catalog & Pricing
 * Brain Buzz — Core Payment Infrastructure
 * 
 * CRITICAL RULE: Payment amounts, currencies, feature keys, and entitlement durations
 * are strictly defined on the server. Clients may NEVER dictate or override these values.
 */

import { eq, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { paymentProductsTable, type PaymentProductRecord } from '../../db/schema.js';
import type { PaymentProduct } from './types.js';

export const PAYMENT_PRODUCTS: Record<string, PaymentProduct> = {
  // 1. PRIMARY: SEMESTER PREMIUM PASSES
  SEMESTER_PASS_HARMATTAN_2026: {
    id: 'SEMESTER_PASS_HARMATTAN_2026',
    title: 'Brain Buzz Semester Pass (Harmattan 2026/2027)',
    description: 'Full semester premium access to AI tutoring, timed mock exams, and advanced cognitive analytics for Harmattan semester.',
    category: 'SEMESTER_PASS',
    amount: 150000, // 1,500.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'SEMESTER_SUBSCRIPTION',
    featureKey: 'SEMESTER_PREMIUM_ACCESS',
    durationDays: 120,
    academicSession: '2026/2027',
    semester: 'harmattan',
    benefits: [
      'Full CBT & Theory Mock Exam Simulator',
      'Deep Multi-Step AI Concept Breakdown',
      'Cognitive Weakness Analysis & Heatmaps',
      'Curated Exam Revision Resources',
      'Priority Study Pack Access',
    ],
    isActive: true,
    isTestProduct: true,
  },

  SEMESTER_PASS_RAIN_2026: {
    id: 'SEMESTER_PASS_RAIN_2026',
    title: 'Brain Buzz Semester Pass (Rain 2026/2027)',
    description: 'Full semester premium access to AI tutoring, timed mock exams, and advanced cognitive analytics for Rain semester.',
    category: 'SEMESTER_PASS',
    amount: 150000, // 1,500.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'SEMESTER_SUBSCRIPTION',
    featureKey: 'SEMESTER_PREMIUM_ACCESS',
    durationDays: 120,
    academicSession: '2026/2027',
    semester: 'rain',
    benefits: [
      'Full CBT & Theory Mock Exam Simulator',
      'Deep Multi-Step AI Concept Breakdown',
      'Cognitive Weakness Analysis & Heatmaps',
      'Curated Exam Revision Resources',
      'Priority Study Pack Access',
    ],
    isActive: true,
    isTestProduct: true,
  },

  // 2. SECONDARY: EXAMINATION PREPARATION PASSES
  EXAM_PREP_PASS_30: {
    id: 'EXAM_PREP_PASS_30',
    title: 'Examination Sprint Pass (30 Days)',
    description: 'Intensive 30-day examination preparation pass for revision seasons and departmental mock trials.',
    category: 'EXAM_PREP',
    amount: 80000, // 800.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'EXAM_PRACTICE',
    featureKey: 'EXAM_PREP_ACCESS',
    durationDays: 30,
    academicSession: null,
    semester: null,
    benefits: [
      'Full Timed CBT Mock Trials',
      'Countdown Exam Simulation',
      'Post-Mock Performance Analytics',
      'High-Yield Question Revisions',
    ],
    isActive: true,
    isTestProduct: true,
  },

  EXAM_PREP_PASS_60: {
    id: 'EXAM_PREP_PASS_60',
    title: 'Examination Preparation Pack (60 Days)',
    description: 'Extended 60-day examination preparation pass for comprehensive midterm and final exam readiness.',
    category: 'EXAM_PREP',
    amount: 120000, // 1,200.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'EXAM_PRACTICE',
    featureKey: 'EXAM_PREP_ACCESS',
    durationDays: 60,
    academicSession: null,
    semester: null,
    benefits: [
      '60-Day Unlimited Timed Mock Trials',
      'Full Diagnostic Exam Analytics',
      'AI Model Answer Comparisons',
      'Exam Readiness Scoring',
    ],
    isActive: true,
    isTestProduct: true,
  },

  // 3. INDIVIDUAL OPTIONAL PURCHASES
  AI_TUTOR_BOOST_100: {
    id: 'AI_TUTOR_BOOST_100',
    title: 'AI Explanation & Tutoring Pack',
    description: '100 on-demand AI explanations and concept breakdowns for difficult practice problems across any course.',
    category: 'OPTIONAL_PURCHASE',
    amount: 30000, // 300.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'AI_TUTORING',
    featureKey: 'AI_EXPLANATIONS',
    durationDays: 60,
    academicSession: null,
    semester: null,
    benefits: [
      '100 Deep AI Step-by-Step Problem Breakdowns',
      'Theory Sample Answer Explanations',
      'Instant Concept Clarification',
    ],
    isActive: true,
    isTestProduct: true,
  },

  // 4. BACKWARD COMPATIBILITY ALIASES (BB-05B Suites)
  PREMIUM_PASS_MONTHLY: {
    id: 'PREMIUM_PASS_MONTHLY',
    title: 'Brain Buzz Premium Access (30 Days)',
    description: 'Unlocks advanced practice modes, detailed performance analytics, and priority revision.',
    category: 'EXAM_PREP',
    amount: 100000, // 1,000.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'PREMIUM_SUBSCRIPTION',
    featureKey: 'PREMIUM_QUIZ_PASS',
    durationDays: 30,
    academicSession: null,
    semester: null,
    benefits: ['Advanced practice modes', 'Detailed performance analytics'],
    isActive: true,
    isTestProduct: true,
  },

  EXAM_PRACTICE_BUNDLE: {
    id: 'EXAM_PRACTICE_BUNDLE',
    title: 'Semester Examination Prep Pack',
    description: 'Access to comprehensive faculty question banks and AI-assisted revision rubrics.',
    category: 'EXAM_PREP',
    amount: 50000, // 500.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'EXAM_PRACTICE',
    featureKey: 'EXAM_PRACTICE_BUNDLE',
    durationDays: 90,
    academicSession: null,
    semester: null,
    benefits: ['Faculty question banks', 'AI revision rubrics'],
    isActive: true,
    isTestProduct: true,
  },

  VERIFIED_CERTIFICATE: {
    id: 'VERIFIED_CERTIFICATE',
    title: 'Course Completion Certificate of Merit',
    description: 'Cryptographically signed digital certificate verifying academic excellence.',
    category: 'OPTIONAL_PURCHASE',
    amount: 150000, // 1,500.00 NGN in integer kobo
    currency: 'NGN',
    purpose: 'VERIFIED_CERTIFICATE',
    featureKey: 'VERIFIED_CERTIFICATE',
    durationDays: null, // Lifetime/Permanent
    academicSession: null,
    semester: null,
    benefits: ['Cryptographically signed digital certificate'],
    isActive: true,
    isTestProduct: true,
  },
};

/**
 * Retrieve product definition by server-controlled product identifier.
 * First checks DB table (if accessible); falls back to static dictionary.
 */
export async function getProductByIdAsync(productId: string): Promise<PaymentProduct | null> {
  if (!productId || typeof productId !== 'string') {
    return null;
  }
  const normalizedKey = productId.trim();

  try {
    const [row] = await db
      .select()
      .from(paymentProductsTable)
      .where(eq(paymentProductsTable.id, normalizedKey));

    if (row) {
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category as any,
        amount: row.amount,
        currency: row.currency,
        purpose: row.purpose,
        featureKey: row.featureKey,
        durationDays: row.durationDays,
        academicSession: row.academicSession,
        semester: row.semester,
        benefits: (row.benefits as string[]) || [],
        isActive: row.isActive,
        isTestProduct: row.isTestProduct,
      };
    }
  } catch {
    // Database table may not be queried in unit tests; fallback to static catalog
  }

  return PAYMENT_PRODUCTS[normalizedKey] || null;
}

/**
 * Synchronous product definition lookup (used for fast checks and unit tests).
 */
export function getProductById(productId: string): PaymentProduct | null {
  if (!productId || typeof productId !== 'string') {
    return null;
  }
  const normalizedKey = productId.trim();
  return PAYMENT_PRODUCTS[normalizedKey] || null;
}

/**
 * Returns all active products available for student checkout.
 */
export async function getAvailableProductsAsync(): Promise<PaymentProduct[]> {
  try {
    const rows = await db
      .select()
      .from(paymentProductsTable)
      .where(eq(paymentProductsTable.isActive, true))
      .orderBy(desc(paymentProductsTable.createdAt));

    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category as any,
        amount: row.amount,
        currency: row.currency,
        purpose: row.purpose,
        featureKey: row.featureKey,
        durationDays: row.durationDays,
        academicSession: row.academicSession,
        semester: row.semester,
        benefits: (row.benefits as string[]) || [],
        isActive: row.isActive,
        isTestProduct: row.isTestProduct,
      }));
    }
  } catch {
    // Fallback to static catalog
  }

  return Object.values(PAYMENT_PRODUCTS).filter((p) => p.isActive !== false);
}

/**
 * Returns ALL products (active and inactive) for administrative oversight.
 */
export async function getAllProductsAdminAsync(): Promise<PaymentProduct[]> {
  try {
    const rows = await db
      .select()
      .from(paymentProductsTable)
      .orderBy(desc(paymentProductsTable.createdAt));

    if (rows && rows.length > 0) {
      return rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category as any,
        amount: row.amount,
        currency: row.currency,
        purpose: row.purpose,
        featureKey: row.featureKey,
        durationDays: row.durationDays,
        academicSession: row.academicSession,
        semester: row.semester,
        benefits: (row.benefits as string[]) || [],
        isActive: row.isActive,
        isTestProduct: row.isTestProduct,
      }));
    }
  } catch {
    // Fallback to static catalog
  }

  return Object.values(PAYMENT_PRODUCTS);
}

/**
 * Synchronous available products (for existing tests and default fallbacks).
 */
export function getAvailableProducts(): PaymentProduct[] {
  return Object.values(PAYMENT_PRODUCTS).filter((p) => p.isActive !== false);
}

/**
 * Create or register a new product in the payment_products database table.
 */
export async function createProductAsync(productData: {
  id: string;
  title: string;
  description: string;
  category: string;
  amount: number;
  currency?: string | null | undefined;
  purpose: string;
  featureKey: string;
  durationDays?: number | null | undefined;
  academicSession?: string | null | undefined;
  semester?: string | null | undefined;
  benefits?: string[] | undefined;
  isActive?: boolean | undefined;
  isTestProduct?: boolean | undefined;
}): Promise<PaymentProduct> {
  const [created] = await db
    .insert(paymentProductsTable)
    .values({
      id: productData.id,
      title: productData.title,
      description: productData.description,
      category: productData.category,
      amount: productData.amount,
      currency: productData.currency || 'NGN',
      purpose: productData.purpose,
      featureKey: productData.featureKey,
      durationDays: productData.durationDays ?? null,
      academicSession: productData.academicSession ?? null,
      semester: productData.semester ?? null,
      benefits: productData.benefits || [],
      isActive: productData.isActive !== false,
      isTestProduct: productData.isTestProduct ?? false,
      updatedAt: new Date(),
    })
    .returning();

  if (!created) {
    throw new Error(`Failed to create payment product ${productData.id} in database.`);
  }

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    category: created.category as any,
    amount: created.amount,
    currency: created.currency,
    purpose: created.purpose,
    featureKey: created.featureKey,
    durationDays: created.durationDays,
    academicSession: created.academicSession,
    semester: created.semester,
    benefits: (created.benefits as string[]) || [],
    isActive: created.isActive,
    isTestProduct: created.isTestProduct,
  };
}

/**
 * Update an existing payment product configuration in the database.
 */
export async function updateProductAsync(
  productId: string,
  patch: Partial<{
    title: string;
    description: string;
    category: string;
    amount: number;
    durationDays: number | null;
    academicSession: string | null;
    semester: string | null;
    benefits: string[];
    isActive: boolean;
    isTestProduct: boolean;
  }>
): Promise<PaymentProduct | null> {
  const updateData: any = {
    updatedAt: new Date(),
  };

  if (patch.title !== undefined) updateData.title = patch.title;
  if (patch.description !== undefined) updateData.description = patch.description;
  if (patch.category !== undefined) updateData.category = patch.category;
  if (patch.amount !== undefined) updateData.amount = patch.amount;
  if (patch.durationDays !== undefined) updateData.durationDays = patch.durationDays;
  if (patch.academicSession !== undefined) updateData.academicSession = patch.academicSession;
  if (patch.semester !== undefined) updateData.semester = patch.semester;
  if (patch.benefits !== undefined) updateData.benefits = patch.benefits;
  if (patch.isActive !== undefined) updateData.isActive = patch.isActive;
  if (patch.isTestProduct !== undefined) updateData.isTestProduct = patch.isTestProduct;

  const [updated] = await db
    .update(paymentProductsTable)
    .set(updateData)
    .where(eq(paymentProductsTable.id, productId))
    .returning();

  if (!updated) {
    // If not in DB yet but exists in static dictionary, insert it with the patch!
    const staticProd = PAYMENT_PRODUCTS[productId];
    if (staticProd) {
      return createProductAsync({
        id: productId,
        title: patch.title || staticProd.title,
        description: patch.description || staticProd.description,
        category: patch.category || staticProd.category,
        amount: patch.amount !== undefined ? patch.amount : staticProd.amount,
        currency: staticProd.currency,
        purpose: staticProd.purpose,
        featureKey: staticProd.featureKey,
        durationDays: patch.durationDays !== undefined ? patch.durationDays : staticProd.durationDays,
        academicSession: patch.academicSession !== undefined ? patch.academicSession : staticProd.academicSession,
        semester: patch.semester !== undefined ? patch.semester : staticProd.semester,
        benefits: patch.benefits || staticProd.benefits,
        isActive: patch.isActive !== undefined ? patch.isActive : staticProd.isActive,
        isTestProduct: patch.isTestProduct !== undefined ? patch.isTestProduct : staticProd.isTestProduct,
      });
    }
    return null;
  }

  return {
    id: updated.id,
    title: updated.title,
    description: updated.description,
    category: updated.category as any,
    amount: updated.amount,
    currency: updated.currency,
    purpose: updated.purpose,
    featureKey: updated.featureKey,
    durationDays: updated.durationDays,
    academicSession: updated.academicSession,
    semester: updated.semester,
    benefits: (updated.benefits as string[]) || [],
    isActive: updated.isActive,
    isTestProduct: updated.isTestProduct,
  };
}
