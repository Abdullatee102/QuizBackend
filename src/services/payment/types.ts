/**
 * BB-05B: Payment Gateway Architecture & Ledger Types
 * Brain Buzz — Core Payment Infrastructure
 */

export interface PaymentInitParams {
  email: string;
  amount: number; // in minor units (e.g. kobo: 1000 NGN = 100000)
  reference: string; // unique internal order reference
  currency?: string | undefined;
  callbackUrl?: string | undefined;
  metadata?: Record<string, any> | undefined;
  channels?: string[] | undefined;
}

export interface PaymentInitResult {
  success: boolean;
  reference: string;
  authorizationUrl?: string | undefined;
  accessCode?: string | undefined;
  gateway: string;
  rawResponse?: any;
  error?: string | undefined;
}

export type NormalizedPaymentStatus = 'SUCCESS' | 'FAILED' | 'PENDING' | 'ABANDONED' | 'REVERSED';

export interface PaymentVerifyResult {
  success: boolean;
  status: NormalizedPaymentStatus;
  reference: string;
  gatewayTransactionId?: string | undefined;
  amount: number; // in minor units
  currency: string;
  channel?: string | undefined;
  paidAt?: Date | undefined;
  gatewayResponse?: string | undefined;
  customerEmail?: string | undefined;
  metadata?: Record<string, any> | undefined;
  rawResponse?: any;
  error?: string | undefined;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  event?: string | undefined;
  data?: any;
  error?: string | undefined;
}

export interface IPaymentGateway {
  readonly gatewayName: string;

  /**
   * Initialize a payment transaction with the gateway.
   */
  initializePayment(params: PaymentInitParams): Promise<PaymentInitResult>;

  /**
   * Verify transaction status directly with the gateway using the payment reference.
   */
  verifyPayment(reference: string): Promise<PaymentVerifyResult>;

  /**
   * Cryptographically verify the webhook payload signature.
   */
  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean;
}

export type ProductCategory = 'SEMESTER_PASS' | 'EXAM_PREP' | 'OPTIONAL_PURCHASE';

export interface PaymentProduct {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  amount: number; // minor units (kobo: 1000 NGN = 100000)
  currency: string;
  purpose: string;
  featureKey: string;
  durationDays: number | null; // null for lifetime or semester-bound
  academicSession?: string | null | undefined;
  semester?: string | null | undefined;
  benefits?: string[] | undefined;
  isActive?: boolean | undefined;
  isTestProduct?: boolean | undefined;
}

export interface EntitlementCheckResult {
  hasAccess: boolean;
  featureKey: string;
  status?: string | undefined;
  remainingDays?: number | null | undefined;
  expiryDate?: Date | null | undefined;
  entitlementId?: string | undefined;
  productId?: string | null | undefined;
  academicSession?: string | null | undefined;
  semester?: string | null | undefined;
  reason?: string | undefined;
}
