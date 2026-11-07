/**
 * BB-05B: Core Payment Infrastructure & Database Ledger Test Suite
 * Brain Buzz — Automated Payment & Entitlement Verification
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  usersTable,
  paymentOrdersTable,
  paymentTransactionsTable,
  userEntitlementsTable,
  webhookEventsTable,
  auditLogsTable,
  type PaymentOrder,
  type PaymentTransaction,
  type UserEntitlement,
} from '../db/schema.js';
import {
  PaymentService,
  PaystackGateway,
  getProductById,
  getAvailableProducts,
  type IPaymentGateway,
  type PaymentInitParams,
  type PaymentInitResult,
  type PaymentVerifyResult,
} from '../services/payment/index.js';
import {
  initializePaymentSchema,
  orderReferenceParamSchema,
  listOrdersQuerySchema,
} from '../schemas/payment.schemas.js';

// =====================================================
// MOCK PAYMENT GATEWAY IMPLEMENTATION
// =====================================================
class MockPaymentGateway implements IPaymentGateway {
  readonly gatewayName = 'MOCK_PAYSTACK';
  public webhookSecret = 'test_webhook_secret_key_12345';
  public initResponse: Partial<PaymentInitResult> = { success: true };
  public verifyResponses: Map<string, Partial<PaymentVerifyResult>> = new Map();
  public defaultVerifyStatus: 'SUCCESS' | 'FAILED' | 'PENDING' | 'ABANDONED' = 'SUCCESS';

  async initializePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    if (this.initResponse.success === false) {
      return {
        success: false,
        reference: params.reference,
        gateway: this.gatewayName,
        error: this.initResponse.error || 'Gateway initialization error',
      };
    }

    return {
      success: true,
      reference: params.reference,
      authorizationUrl: `https://mock.paystack.co/checkout/${params.reference}`,
      accessCode: `acc_${params.reference}`,
      gateway: this.gatewayName,
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResult> {
    const custom = this.verifyResponses.get(reference);
    if (custom) {
      return {
        success: custom.status === 'SUCCESS',
        status: custom.status || 'SUCCESS',
        reference,
        gatewayTransactionId: custom.gatewayTransactionId || `tx_${Date.now()}`,
        amount: custom.amount ?? 100000,
        currency: custom.currency || 'NGN',
        channel: custom.channel || 'card',
        paidAt: custom.paidAt || new Date(),
        gatewayResponse: custom.gatewayResponse || 'Successful',
        error: custom.error,
      };
    }

    const isSuccess = this.defaultVerifyStatus === 'SUCCESS';
    return {
      success: isSuccess,
      status: this.defaultVerifyStatus,
      reference,
      gatewayTransactionId: `tx_mock_${Date.now()}`,
      amount: 100000, // Default 1000.00 NGN
      currency: 'NGN',
      channel: 'card',
      paidAt: isSuccess ? new Date() : undefined,
      gatewayResponse: isSuccess ? 'Successful' : 'Transaction failed or unconfirmed',
    };
  }

  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    if (!signature) return false;
    const hmac = crypto.createHmac('sha512', this.webhookSecret);
    const expected = hmac.update(rawBody).digest('hex');
    try {
      return crypto.timingSafeEqual(
        Buffer.from(signature, 'utf8'),
        Buffer.from(expected, 'utf8')
      );
    } catch {
      return false;
    }
  }

  generateSignature(payload: string | Buffer): string {
    return crypto.createHmac('sha512', this.webhookSecret).update(payload).digest('hex');
  }
}

describe('BB-05B: Core Payment Infrastructure & Database Ledger Suite', () => {
  let mockGateway: MockPaymentGateway;
  let paymentService: PaymentService;
  let studentAId: string;
  let studentBId: string;
  let adminId: string;
  const testRunSuffix = Date.now().toString(36);
  const studentAEmail = `studentA_${testRunSuffix}@brainbuzz.edu.ng`;
  const studentBEmail = `studentB_${testRunSuffix}@brainbuzz.edu.ng`;
  const adminEmail = `admin_${testRunSuffix}@brainbuzz.edu.ng`;

  before(async () => {
    mockGateway = new MockPaymentGateway();
    paymentService = new PaymentService(mockGateway);

    // Create Test Student A
    const [userA] = await db
      .insert(usersTable)
      .values({
        email: studentAEmail,
        password: 'password123',
        fullName: 'Test Student Alpha',
        role: 'STUDENT',
        status: 'ACTIVE',
      } as any)
      .returning();
    studentAId = String(userA.id);

    // Create Test Student B (for IDOR verification)
    const [userB] = await db
      .insert(usersTable)
      .values({
        email: studentBEmail,
        password: 'password123',
        fullName: 'Test Student Beta',
        role: 'STUDENT',
        status: 'ACTIVE',
      } as any)
      .returning();
    studentBId = String(userB.id);

    // Create Test Admin User
    const [userAdmin] = await db
      .insert(usersTable)
      .values({
        email: adminEmail,
        password: 'password123',
        fullName: 'Test System Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      } as any)
      .returning();
    adminId = String(userAdmin.id);
  });

  after(async () => {
    // Teardown test data in reverse foreign key order
    try {
      const userIds = [studentAId, studentBId, adminId];
      for (const uid of userIds) {
        await db.delete(userEntitlementsTable).where(eq(userEntitlementsTable.userId, uid as any));
        await db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.userId, uid as any));
      }
      await db.delete(webhookEventsTable).where(eq(webhookEventsTable.gateway, mockGateway.gatewayName));
      await db.delete(usersTable).where(eq(usersTable.email, studentAEmail));
      await db.delete(usersTable).where(eq(usersTable.email, studentBEmail));
      await db.delete(usersTable).where(eq(usersTable.email, adminEmail));
    } catch (err) {
      // Ignore teardown errors
    }
  });

  // =====================================================
  // 1. PRODUCT CATALOG & PRICING TESTS
  // =====================================================
  describe('1. Server-Controlled Product Catalog & Pricing', () => {
    it('1.1. Returns all active products in integer minor currency units (kobo)', () => {
      const products = getAvailableProducts();
      assert.ok(products.length >= 3, 'Must contain at least 3 default products');

      for (const prod of products) {
        assert.ok(Number.isInteger(prod.amount), `Amount for ${prod.id} must be an integer`);
        assert.ok(prod.amount > 0, `Amount for ${prod.id} must be positive`);
        assert.strictEqual(prod.currency, 'NGN');
        assert.ok(prod.featureKey.length > 0);
      }
    });

    it('1.2. Retrieves exact product definition by product ID', () => {
      const product = getProductById('PREMIUM_PASS_MONTHLY');
      assert.ok(product, 'PREMIUM_PASS_MONTHLY must exist');
      assert.strictEqual(product.amount, 100000, 'Price must be 100,000 kobo (1,000 NGN)');
      assert.strictEqual(product.durationDays, 30, 'Duration must be 30 days');
      assert.strictEqual(product.featureKey, 'PREMIUM_QUIZ_PASS');
    });

    it('1.3. Returns null for non-existent product IDs', () => {
      assert.strictEqual(getProductById('HACKED_FREE_PASS'), null);
      assert.strictEqual(getProductById(''), null);
    });
  });

  // =====================================================
  // 2. ORDER INITIALIZATION & LEDGER CREATION
  // =====================================================
  describe('2. Order Initialization & Server-Controlled Pricing', () => {
    it('2.1. Successfully initializes a pending payment order with server pricing', async () => {
      const result = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'PREMIUM_PASS_MONTHLY',
        callbackUrl: 'https://brainbuzz.app/payment/callback',
      });

      assert.ok(result.order);
      assert.strictEqual(result.order.status, 'PENDING');
      assert.strictEqual(result.order.amount, 100000); // 1,000 NGN in kobo
      assert.strictEqual(result.order.currency, 'NGN');
      assert.strictEqual(result.order.productId, 'PREMIUM_PASS_MONTHLY');
      assert.ok(result.order.orderReference.startsWith('BB-ORD-'));
      assert.ok(result.authorizationUrl?.includes(result.order.orderReference));

      // Verify DB persistence
      const [persisted] = await db
        .select()
        .from(paymentOrdersTable)
        .where(eq(paymentOrdersTable.id, result.order.id));

      assert.ok(persisted, 'Order must be saved in PostgreSQL paymentOrdersTable');
      assert.strictEqual(persisted.status, 'PENDING');
    });

    it('2.2. Rejects order initialization with unrecognized product ID', async () => {
      await assert.rejects(
        async () => {
          await paymentService.initializeOrder({
            userId: studentAId,
            productId: 'UNKNOWN_PRODUCT_999',
          });
        },
        /Invalid or unrecognized product ID/
      );
    });

    it('2.3. Rejects order initialization for non-existent user account', async () => {
      await assert.rejects(
        async () => {
          await paymentService.initializeOrder({
            userId: '00000000-0000-0000-0000-000000000000',
            productId: 'PREMIUM_PASS_MONTHLY',
          });
        },
        /User account not found/
      );

      await assert.rejects(
        async () => {
          await paymentService.initializeOrder({
            userId: 'invalid-non-uuid-string',
            productId: 'PREMIUM_PASS_MONTHLY',
          });
        },
        /User account not found/
      );
    });
  });

  // =====================================================
  // 3. PAYMENT VERIFICATION & ATOMIC ENTITLEMENT GRANT
  // =====================================================
  describe('3. Atomic Verification, Transaction Recording & Entitlement Provisioning', () => {
    let orderRef: string;

    before(async () => {
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'PREMIUM_PASS_MONTHLY',
      });
      orderRef = init.order.orderReference;
    });

    it('3.1. Successfully verifies payment, updates order to COMPLETED, and provisions active entitlement', async () => {
      mockGateway.defaultVerifyStatus = 'SUCCESS';

      const result = await paymentService.verifyAndProcessPayment({
        reference: orderRef,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.order.status, 'COMPLETED');
      assert.ok(result.transaction);
      assert.strictEqual(result.transaction?.status, 'SUCCESS');
      assert.ok(result.entitlement);
      assert.strictEqual(result.entitlement?.status, 'ACTIVE');
      assert.strictEqual(result.entitlement?.featureKey, 'PREMIUM_QUIZ_PASS');
      assert.ok(result.entitlement?.expiryDate);

      // Verify entitlement expiry is approximately 30 days in the future
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      const expectedExpiry = Date.now() + thirtyDaysMs;
      const actualExpiry = new Date(result.entitlement.expiryDate).getTime();
      assert.ok(
        Math.abs(actualExpiry - expectedExpiry) < 60000,
        'Expiry must be roughly 30 days from now'
      );

      // Verify audit log entry
      const [auditLog] = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.action, 'PAYMENT_VERIFIED'),
            eq(auditLogsTable.resourceId, result.order.id)
          )
        );
      assert.ok(auditLog, 'Audit log must record PAYMENT_VERIFIED event');
    });

    it('3.2. Idempotent repeated verification returns existing completed order without duplication', async () => {
      const result = await paymentService.verifyAndProcessPayment({
        reference: orderRef,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.order.status, 'COMPLETED');

      // Verify only 1 active entitlement exists for Student A
      const entitlements = await paymentService.getUserEntitlements(studentAId);
      assert.strictEqual(
        entitlements.filter((e) => e.featureKey === 'PREMIUM_QUIZ_PASS').length,
        1,
        'Must not create duplicate entitlements on re-verification'
      );
    });
  });

  // =====================================================
  // 4. ANTI-FRAUD & INTEGRITY CHECKS
  // =====================================================
  describe('4. Anti-Fraud Defenses (Amount & Currency Mismatch)', () => {
    it('4.1. Rejects payment and marks order FAILED if gateway amount does not match server catalog price', async () => {
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'PREMIUM_PASS_MONTHLY', // Expects 100000 kobo
      });

      // Configure mock gateway to return fraudulent reduced amount (e.g. 50000 kobo)
      mockGateway.verifyResponses.set(init.order.orderReference, {
        status: 'SUCCESS',
        amount: 50000, // 50% discount fraud attempt
        currency: 'NGN',
      });

      const result = await paymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.order.status, 'FAILED');
      assert.match(result.error || '', /Amount mismatch/i);

      // Verify order status in DB is FAILED
      const [dbOrder] = await db
        .select()
        .from(paymentOrdersTable)
        .where(eq(paymentOrdersTable.id, init.order.id));
      assert.strictEqual(dbOrder?.status, 'FAILED');

      // Verify transaction table recorded fraud flag
      const [tx] = await db
        .select()
        .from(paymentTransactionsTable)
        .where(eq(paymentTransactionsTable.orderId, init.order.id));
      assert.strictEqual(tx?.status, 'FAILED');
      assert.match(tx?.gatewayResponse || '', /FRAUD_ALERT/i);
    });

    it('4.2. Rejects payment and marks order FAILED if gateway currency does not match server currency', async () => {
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'PREMIUM_PASS_MONTHLY',
      });

      // Gateway returns USD instead of expected NGN
      mockGateway.verifyResponses.set(init.order.orderReference, {
        status: 'SUCCESS',
        amount: 100000,
        currency: 'USD',
      });

      const result = await paymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.order.status, 'FAILED');
      assert.match(result.error || '', /currency mismatch/i);
    });

    it('4.3. Handles gateway failed or abandoned payment without granting entitlement', async () => {
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'EXAM_PRACTICE_BUNDLE',
      });

      mockGateway.verifyResponses.set(init.order.orderReference, {
        status: 'ABANDONED',
        amount: 0,
        currency: 'NGN',
        gatewayResponse: 'Customer abandoned transaction',
      });

      const result = await paymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.order.status, 'ABANDONED');
      assert.strictEqual(result.entitlement, undefined);
    });
  });

  // =====================================================
  // 5. IDOR & ACCESS CONTROL ENFORCEMENT
  // =====================================================
  describe('5. Insecure Direct Object Reference (IDOR) Protections', () => {
    let studentAOrderRef: string;

    before(async () => {
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'EXAM_PRACTICE_BUNDLE',
      });
      studentAOrderRef = init.order.orderReference;
    });

    it('5.1. Prevents Student B from verifying or triggering entitlement on Student A order', async () => {
      await assert.rejects(
        async () => {
          await paymentService.verifyAndProcessPayment({
            reference: studentAOrderRef,
            expectedUserId: studentBId, // Student B attempting to verify Student A's order
            callerRole: 'STUDENT',
          });
        },
        /Unauthorized: You do not have permission/
      );
    });

    it('5.2. Prevents Student B from viewing Student A order details', async () => {
      await assert.rejects(
        async () => {
          await paymentService.getOrderDetails({
            referenceOrId: studentAOrderRef,
            userId: studentBId,
            role: 'STUDENT',
          });
        },
        /Access denied\. You do not own this order/
      );
    });

    it('5.3. Allows administrative role (SUPER_ADMIN) to view order details for any student', async () => {
      const orderDetails = await paymentService.getOrderDetails({
        referenceOrId: studentAOrderRef,
        userId: adminId,
        role: 'SUPER_ADMIN',
      });

      assert.ok(orderDetails);
      assert.strictEqual(orderDetails.order.orderReference, studentAOrderRef);
    });
  });

  // =====================================================
  // 6. ENTITLEMENT STACKING (RENEWAL EXTENSION)
  // =====================================================
  describe('6. Stackable Entitlement Renewal Extensions', () => {
    it('6.1. Extends active entitlement from existing expiry date rather than resetting from now', async () => {
      // 1. Student A already has an active entitlement from test 3.1
      const [initialEntitlement] = await paymentService.getUserEntitlements(studentAId);
      assert.ok(initialEntitlement?.expiryDate);
      const initialExpiryMs = new Date(initialEntitlement.expiryDate).getTime();

      // 2. Student A purchases another 30-day pass
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'PREMIUM_PASS_MONTHLY',
      });

      mockGateway.defaultVerifyStatus = 'SUCCESS';
      const result = await paymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
        expectedUserId: studentAId,
      });

      assert.strictEqual(result.success, true);
      assert.ok(result.entitlement?.expiryDate);

      const updatedExpiryMs = new Date(result.entitlement.expiryDate).getTime();
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

      // The new expiry should be roughly initialExpiry + 30 days
      assert.ok(
        Math.abs(updatedExpiryMs - (initialExpiryMs + thirtyDaysMs)) < 5000,
        'Stacked entitlement must extend expiry from previous expiration date'
      );
    });
  });

  // =====================================================
  // 7. WEBHOOK INGESTION & HMAC DEDUPLICATION
  // =====================================================
  describe('7. Webhook Ingestion, Cryptographic Verification & Deduplication', () => {
    const webhookEventId = Math.floor(Math.random() * 90000000) + 10000000;

    it('7.1. Rejects webhook payload with invalid HMAC-SHA512 signature', async () => {
      const payload = {
        event: 'charge.success',
        data: { reference: 'BB-ORD-INVALID-SIG' },
      };
      const rawBody = JSON.stringify(payload);

      const result = await paymentService.processWebhook({
        rawBody,
        signatureHeader: 'invalid_fraudulent_signature_hex',
        payload,
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.statusCode, 400);
      assert.strictEqual(result.message, 'Invalid webhook signature.');
    });

    it('7.2. Processes valid charge.success webhook and provisions entitlement', async () => {
      const init = await paymentService.initializeOrder({
        userId: studentBId,
        productId: 'EXAM_PRACTICE_BUNDLE',
      });

      const payload = {
        id: webhookEventId,
        event: 'charge.success',
        data: {
          id: 1234567,
          reference: init.order.orderReference,
          amount: 50000, // 500 NGN in kobo
          currency: 'NGN',
          status: 'success',
        },
      };

      const rawBody = JSON.stringify(payload);
      const validSig = mockGateway.generateSignature(rawBody);

      // Configure mock gateway verify response to match
      mockGateway.verifyResponses.set(init.order.orderReference, {
        status: 'SUCCESS',
        amount: 50000,
        currency: 'NGN',
      });

      const result = await paymentService.processWebhook({
        rawBody,
        signatureHeader: validSig,
        payload,
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.statusCode, 200);

      // Verify entitlement was granted to Student B
      const entitlements = await paymentService.getUserEntitlements(studentBId);
      const practiceEntitlement = entitlements.find((e) => e.featureKey === 'EXAM_PRACTICE_BUNDLE');
      assert.ok(practiceEntitlement, 'Student B must receive EXAM_PRACTICE_BUNDLE entitlement');
    });

    it('7.3. Deduplicates identical webhook delivery idempotently without re-execution', async () => {
      const payload = {
        id: webhookEventId, // Same event ID as previous test
        event: 'charge.success',
        data: { reference: 'BB-ORD-SOME-REF' },
      };

      const rawBody = JSON.stringify(payload);
      const validSig = mockGateway.generateSignature(rawBody);

      const result = await paymentService.processWebhook({
        rawBody,
        signatureHeader: validSig,
        payload,
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.statusCode, 200);
      assert.match(result.message, /already processed/i);
    });
  });

  // =====================================================
  // 8. ORDER RECONCILIATION
  // =====================================================
  describe('8. Safe Pending Order Reconciliation Mechanism', () => {
    it('8.1. Successfully reconciles stale pending orders against payment gateway', async () => {
      // Create an order and backdate its createdAt to 30 minutes ago
      const init = await paymentService.initializeOrder({
        userId: studentAId,
        productId: 'VERIFIED_CERTIFICATE',
      });

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      await db
        .update(paymentOrdersTable)
        .set({ createdAt: thirtyMinutesAgo })
        .where(eq(paymentOrdersTable.id, init.order.id));

      mockGateway.verifyResponses.set(init.order.orderReference, {
        status: 'SUCCESS',
        amount: 150000,
        currency: 'NGN',
      });

      const recon = await paymentService.reconcilePendingOrders(15, 10);
      assert.ok(recon.reconciledCount >= 1, 'Should find at least 1 order older than 15 mins');
      assert.ok(recon.updatedCount >= 1, 'Should update at least 1 order');

      // Verify order is now completed
      const [updatedOrder] = await db
        .select()
        .from(paymentOrdersTable)
        .where(eq(paymentOrdersTable.id, init.order.id));
      assert.strictEqual(updatedOrder?.status, 'COMPLETED');
    });
  });

  // =====================================================
  // 9. ZOD SCHEMAS & INPUT VALIDATION
  // =====================================================
  describe('9. Zod Input Validation Schemas', () => {
    it('9.1. initializePaymentSchema validates valid input and rejects missing productId', () => {
      const valid = initializePaymentSchema.safeParse({
        body: {
          productId: 'PREMIUM_PASS_MONTHLY',
          callbackUrl: 'https://brainbuzz.app/success',
        },
      });
      assert.strictEqual(valid.success, true);

      const invalid = initializePaymentSchema.safeParse({
        body: {
          productId: '', // Empty string rejected
        },
      });
      assert.strictEqual(invalid.success, false);
    });

    it('9.2. orderReferenceParamSchema enforces minimum reference length', () => {
      const valid = orderReferenceParamSchema.safeParse({
        params: { reference: 'BB-ORD-123456' },
      });
      assert.strictEqual(valid.success, true);

      const invalid = orderReferenceParamSchema.safeParse({
        params: { reference: 'AB' }, // Less than 3 chars
      });
      assert.strictEqual(invalid.success, false);
    });

    it('9.3. listOrdersQuerySchema coerces numbers and validates status enum', () => {
      const valid = listOrdersQuerySchema.safeParse({
        query: { limit: '25', offset: '10', status: 'COMPLETED' },
      });
      assert.strictEqual(valid.success, true);
      if (valid.success) {
        assert.strictEqual(valid.data.query?.limit, 25);
        assert.strictEqual(valid.data.query?.offset, 10);
        assert.strictEqual(valid.data.query?.status, 'COMPLETED');
      }

      const invalid = listOrdersQuerySchema.safeParse({
        query: { status: 'INVALID_STATUS_CODE' },
      });
      assert.strictEqual(invalid.success, false);
    });
  });

  // =====================================================
  // 10. REAL PAYSTACK ADAPTER HMAC & UTILITY TESTS
  // =====================================================
  describe('10. Official PaystackGateway Adapter Verification', () => {
    const paystackSecret = 'sk_test_fake_paystack_secret_key_9988';
    const realGateway = new PaystackGateway({ secretKey: paystackSecret });

    it('10.1. Correctly verifies valid Paystack HMAC-SHA512 webhook signature', () => {
      const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'REF123' } });
      const signature = crypto.createHmac('sha512', paystackSecret).update(payload).digest('hex');

      const isValid = realGateway.verifyWebhookSignature(payload, signature);
      assert.strictEqual(isValid, true, 'HMAC signature verification must pass');
    });

    it('10.2. Rejects invalid or tampered Paystack webhook signature', () => {
      const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'REF123' } });
      const isValid = realGateway.verifyWebhookSignature(payload, 'tampered_signature_hex');
      assert.strictEqual(isValid, false, 'Tampered signature must be rejected');
    });
  });
});
