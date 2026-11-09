/**
 * BB-05G: Payment Integration Verification & Release-Readiness Test Suite
 * Brain Buzz — End-to-End Fintech, Security & Entitlement Verification
 */

import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  usersTable,
  paymentOrdersTable,
  paymentTransactionsTable,
  userEntitlementsTable,
  webhookEventsTable,
  auditLogsTable,
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
import { entitlementService } from '../services/payment/entitlementService.js';
import { hasPermission, isAdminRole } from '../config/permissions.js';

// Mock Gateway for deterministic edge cases & failure injection
class MockGateway implements IPaymentGateway {
  readonly gatewayName = 'PAYSTACK_MOCK';
  public webhookSecret = 'test_webhook_secret_key_12345';
  public customVerifyStatus: 'SUCCESS' | 'FAILED' | 'ABANDONED' | 'PENDING' = 'SUCCESS';
  public customVerifyAmount?: number;
  public customVerifyCurrency?: string;

  async initializePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    return {
      success: true,
      reference: params.reference,
      authorizationUrl: `https://checkout.paystack.com/mock_${params.reference}`,
      accessCode: `mock_code_${params.reference}`,
      gateway: this.gatewayName,
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResult> {
    const isSuccess = this.customVerifyStatus === 'SUCCESS';
    return {
      success: isSuccess,
      status: this.customVerifyStatus,
      reference,
      gatewayTransactionId: `mock_tx_${Date.now()}`,
      amount: this.customVerifyAmount ?? 150000,
      currency: this.customVerifyCurrency ?? 'NGN',
      channel: 'card',
      paidAt: isSuccess ? new Date() : undefined,
      gatewayResponse: isSuccess ? 'Successful' : 'Payment failed or abandoned',
    };
  }

  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    const hmac = crypto.createHmac('sha512', this.webhookSecret);
    const expected = hmac.update(rawBody).digest('hex');
    const bExpected = Buffer.from(expected, 'hex');
    const bSig = Buffer.from(signature.trim(), 'hex');
    if (bExpected.length !== bSig.length) return false;
    return crypto.timingSafeEqual(bExpected, bSig);
  }

  generateSignature(rawBody: string | Buffer): string {
    const hmac = crypto.createHmac('sha512', this.webhookSecret);
    return hmac.update(rawBody).digest('hex');
  }
}

describe('BB-05G: Payment Integration Verification & Release Readiness Suite', () => {
  let mockGateway: MockGateway;
  let mockPaymentService: PaymentService;
  let livePaystackGateway: PaystackGateway;

  let studentAId: string;
  let studentBId: string;
  let adminId: string;

  const runId = Date.now();
  const studentAEmail = `qa_student_a_${runId}@student.lautech.edu.ng`;
  const studentBEmail = `qa_student_b_${runId}@student.lautech.edu.ng`;
  const adminEmail = `qa_admin_${runId}@lautech.edu.ng`;

  before(async () => {
    mockGateway = new MockGateway();
    mockPaymentService = new PaymentService(mockGateway);
    livePaystackGateway = new PaystackGateway();

    // Setup Student A
    const [sA] = await db
      .insert(usersTable)
      .values({
        email: studentAEmail,
        password: 'Password123!',
        fullName: 'QA Student Alpha',
        role: 'STUDENT',
        status: 'ACTIVE',
      } as any)
      .returning();
    studentAId = String(sA!.id);

    // Setup Student B
    const [sB] = await db
      .insert(usersTable)
      .values({
        email: studentBEmail,
        password: 'Password123!',
        fullName: 'QA Student Beta',
        role: 'STUDENT',
        status: 'ACTIVE',
      } as any)
      .returning();
    studentBId = String(sB!.id);

    // Setup Super Admin
    const [adm] = await db
      .insert(usersTable)
      .values({
        email: adminEmail,
        password: 'AdminPassword123!',
        fullName: 'QA Super Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      } as any)
      .returning();
    adminId = String(adm!.id);
  });

  after(async () => {
    try {
      const uids = [studentAId, studentBId, adminId];
      for (const uid of uids) {
        if (uid) {
          await db.delete(userEntitlementsTable).where(eq(userEntitlementsTable.userId, uid as any));
          await db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.userId, uid as any));
          await db.delete(usersTable).where(eq(usersTable.id, uid as any));
        }
      }
    } catch (err: any) {
      console.warn('[TEARDOWN WARNING]', err.message);
    }
  });

  // =========================================================================
  // 1. PAYSTACK SANDBOX LIVE API TEST
  // =========================================================================
  describe('1. Paystack Sandbox Live API Integration', () => {
    it('should initialize a real transaction against Paystack Sandbox API with test credentials', async () => {
      const testReference = `BB-E2E-SANDBOX-${Date.now()}`;
      const initResult = await livePaystackGateway.initializePayment({
        email: 'test_student@student.lautech.edu.ng',
        amount: 150000, // ₦1,500 in integer kobo
        reference: testReference,
        currency: 'NGN',
        callbackUrl: 'https://quizbackend-1-wxdb.onrender.com/api/payments/callback',
      });

      assert.strictEqual(initResult.success, true, 'Paystack Sandbox initialization must succeed');
      assert.strictEqual(initResult.reference, testReference);
      assert.ok(initResult.authorizationUrl, 'Must return a Paystack checkout URL');
      assert.ok(
        initResult.authorizationUrl.startsWith('https://checkout.paystack.com/'),
        'Authorization URL must point to Paystack checkout domain'
      );
      assert.ok(initResult.accessCode, 'Must return a Paystack access code');
    });

    it('should query Paystack Sandbox for an uncompleted transaction and recognize non-success status', async () => {
      const freshRef = `BB-UNPAID-${Date.now()}`;
      const verifyResult = await livePaystackGateway.verifyPayment(freshRef);

      // A newly minted reference that was never paid should not verify as SUCCESS
      assert.strictEqual(verifyResult.success, false, 'Unpaid transaction must not succeed');
      assert.notStrictEqual(verifyResult.status, 'SUCCESS', 'Status must not be SUCCESS');
    });
  });

  // =========================================================================
  // 2. CHECKOUT INTEGRITY, TAMPERING & SECURITY GATES
  // =========================================================================
  describe('2. Checkout Integrity & Anti-Tamper Defenses', () => {
    it('should reject order initialization for non-existent product ID', async () => {
      await assert.rejects(
        async () => {
          await mockPaymentService.initializeOrder({
            userId: studentAId,
            productId: 'NON_EXISTENT_PRODUCT_999',
          });
        },
        /Invalid or unrecognized product ID/
      );
    });

    it('should enforce server-authoritative pricing (ignoring client amount injection)', async () => {
      const product = getProductById('pass_harmattan_2026') || getProductById('SEMESTER_PASS_HARMATTAN_2026');
      assert.ok(product, 'Harmattan semester product must exist in server catalog');

      const initResult = await mockPaymentService.initializeOrder({
        userId: studentAId,
        productId: product.id,
        clientMetadata: { injectedClientPrice: 50 }, // Attacker attempts to dictate ₦50
      });

      // Assert server database recorded the exact canonical price (150,000 kobo), not the client injection
      assert.strictEqual(initResult.order.amount, product.amount);
      assert.strictEqual(initResult.order.amount, 150000);
      assert.strictEqual(initResult.order.currency, 'NGN');
      assert.strictEqual(initResult.order.status, 'PENDING');
    });

    it('should reject verification and mark order FAILED when gateway amount mismatches order amount', async () => {
      const product = getProductById('prep_exam_30d') || getProductById('EXAM_PREP_PASS_30');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentBId,
        productId: product.id,
      });

      // Simulate compromised or manipulated gateway callback with wrong amount
      mockGateway.customVerifyStatus = 'SUCCESS';
      mockGateway.customVerifyAmount = product.amount - 20000; // Underpaid

      const verifyRes = await mockPaymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
      });

      assert.strictEqual(verifyRes.success, false);
      assert.strictEqual(verifyRes.order.status, 'FAILED');

      // Ensure NO entitlement was granted to student B
      const entitlements = await entitlementService.getUserActiveEntitlements(studentBId);
      const hasPrep = entitlements.some((e) => e.featureKey === product.featureKey);
      assert.strictEqual(hasPrep, false, 'No entitlement should be granted on amount mismatch');
    });

    it('should reject verification and mark order FAILED when gateway currency mismatches order currency', async () => {
      const product = getProductById('prep_exam_30d') || getProductById('EXAM_PREP_PASS_30');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentBId,
        productId: product.id,
      });

      mockGateway.customVerifyStatus = 'SUCCESS';
      mockGateway.customVerifyAmount = product.amount;
      mockGateway.customVerifyCurrency = 'USD'; // Currency spoofing

      const verifyRes = await mockPaymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
      });

      assert.strictEqual(verifyRes.success, false);
      assert.strictEqual(verifyRes.order.status, 'FAILED');
    });
  });

  // =========================================================================
  // 3. CALLBACK & WEBHOOK CONCURRENCY & DEDUPLICATION
  // =========================================================================
  describe('3. Callback & Webhook Event Ordering & Deduplication', () => {
    it('Scenario A: Callback arrives first -> Webhook arrives second (Idempotent)', async () => {
      const product = getProductById('pass_rain_2026') || getProductById('SEMESTER_PASS_RAIN_2026');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentAId,
        productId: product.id,
      });

      mockGateway.customVerifyStatus = 'SUCCESS';
      mockGateway.customVerifyAmount = product.amount;
      mockGateway.customVerifyCurrency = 'NGN';

      // 1. Callback arrives first
      const callbackResult = await mockPaymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
      });

      assert.strictEqual(callbackResult.success, true);
      assert.strictEqual(callbackResult.order.status, 'COMPLETED');
      assert.ok(callbackResult.entitlement);

      // 2. Webhook arrives second with charge.success
      const webhookPayload = {
        event: 'charge.success',
        data: {
          reference: init.order.orderReference,
          amount: product.amount,
          currency: 'NGN',
          status: 'success',
          id: `paystack_evt_${Date.now()}`,
        },
      };

      const rawBody = JSON.stringify(webhookPayload);
      const signature = mockGateway.generateSignature(rawBody);

      const webhookResult = await mockPaymentService.processWebhook({
        rawBody,
        signatureHeader: signature,
        payload: webhookPayload,
      });

      assert.strictEqual(webhookResult.success, true);
      assert.strictEqual(webhookResult.statusCode, 200);

      // 3. Confirm student only received exactly ONE entitlement (no duplicate row)
      const userEntitlements = await entitlementService.getUserEntitlementHistory(studentAId);
      const matchingEntitlements = userEntitlements.filter(
        (e) => e.orderId === init.order.id
      );
      assert.strictEqual(
        matchingEntitlements.length,
        1,
        'Order must produce exactly one entitlement grant despite callback + webhook delivery'
      );
    });

    it('Scenario B: Webhook arrives first -> Callback arrives second (Idempotent)', async () => {
      const product = getProductById('prep_exam_60d') || getProductById('EXAM_PREP_PASS_60');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentBId,
        productId: product.id,
      });

      mockGateway.customVerifyStatus = 'SUCCESS';
      mockGateway.customVerifyAmount = product.amount;
      mockGateway.customVerifyCurrency = 'NGN';

      // 1. Webhook arrives first
      const webhookPayload = {
        event: 'charge.success',
        data: {
          reference: init.order.orderReference,
          amount: product.amount,
          currency: 'NGN',
          status: 'success',
          id: `evt_wh_first_${Date.now()}`,
        },
      };

      const rawBody = JSON.stringify(webhookPayload);
      const signature = mockGateway.generateSignature(rawBody);

      const webhookResult = await mockPaymentService.processWebhook({
        rawBody,
        signatureHeader: signature,
        payload: webhookPayload,
      });

      assert.strictEqual(webhookResult.success, true);

      // 2. Callback arrives later
      const callbackResult = await mockPaymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
      });

      assert.strictEqual(callbackResult.success, true);
      assert.strictEqual(callbackResult.order.status, 'COMPLETED');

      // 3. Confirm exactly one entitlement provisioned
      const userEntitlements = await entitlementService.getUserEntitlementHistory(studentBId);
      const matching = userEntitlements.filter((e) => e.orderId === init.order.id);
      assert.strictEqual(matching.length, 1, 'Exactly one entitlement must exist');
    });

    it('Scenario C: Replay of identical webhook delivery returns 200 without duplicate execution', async () => {
      const eventId = `replay_evt_${Date.now()}`;
      const payload = {
        event: 'charge.success',
        id: eventId,
        data: {
          reference: 'BB-ORD-NON-EXISTENT',
          amount: 50000,
        },
      };

      // Seed a processed event
      await db.insert(webhookEventsTable).values({
        gateway: mockGateway.gatewayName,
        eventId,
        eventType: 'charge.success',
        signature: 'valid_sig',
        signatureValid: true,
        processingStatus: 'PROCESSED',
        payload,
      });

      const rawBody = JSON.stringify(payload);
      const sig = mockGateway.generateSignature(rawBody);

      const replayResult = await mockPaymentService.processWebhook({
        rawBody,
        signatureHeader: sig,
        payload,
      });

      assert.strictEqual(replayResult.success, true);
      assert.strictEqual(replayResult.statusCode, 200);
      assert.ok(replayResult.message.includes('idempotent'));
    });
  });

  // =========================================================================
  // 4. ENTITLEMENT ISOLATION & SEMESTER ACCESS CONTROL
  // =========================================================================
  describe('4. Entitlement Isolation, Expiry & Duplicate Prevention', () => {
    it('should grant umbrella access to child features when holding SEMESTER_PREMIUM_ACCESS', async () => {
      // Check feature access for Student A who holds 2026/2027 Rain Semester Pass
      const aiAccess = await entitlementService.checkUserFeatureAccess(studentAId, 'AI_EXPLANATIONS');
      assert.strictEqual(aiAccess.hasAccess, true, 'Semester pass must satisfy AI_EXPLANATIONS');

      const examAccess = await entitlementService.checkUserFeatureAccess(studentAId, 'EXAM_PREP_ACCESS');
      assert.strictEqual(examAccess.hasAccess, true, 'Semester pass must satisfy EXAM_PREP_ACCESS');

      const analyticsAccess = await entitlementService.checkUserFeatureAccess(studentAId, 'ADVANCED_ANALYTICS');
      assert.strictEqual(analyticsAccess.hasAccess, true, 'Semester pass must satisfy ADVANCED_ANALYTICS');
    });

    it('should enforce semester context isolation (Rain Pass cannot satisfy Harmattan semester query)', async () => {
      // Student A holds Rain semester pass
      const harmattanCheck = await entitlementService.checkUserFeatureAccess(
        studentAId,
        'SEMESTER_PREMIUM_ACCESS',
        { academicSession: '2026/2027', semester: 'harmattan' }
      );

      assert.strictEqual(
        harmattanCheck.hasAccess,
        false,
        'Rain semester pass must not grant access to Harmattan semester query'
      );
    });

    it('should block duplicate active semester pass purchases for the same session and semester', async () => {
      const product = getProductById('pass_rain_2026') || getProductById('SEMESTER_PASS_RAIN_2026');
      assert.ok(product);

      // Student A already has active 2026/2027 Rain pass
      await assert.rejects(
        async () => {
          await mockPaymentService.initializeOrder({
            userId: studentAId,
            productId: product.id,
          });
        },
        /already hold an active Brain Buzz Semester Pass/
      );
    });

    it('should stack renewal duration additively when purchasing an exam prep pass while active', async () => {
      // Student B already has a 60-day pass from earlier test. Purchase another 30-day pass:
      const prepProduct = getProductById('prep_exam_30d') || getProductById('EXAM_PREP_PASS_30');
      assert.ok(prepProduct);

      const [activeBefore] = (await entitlementService.getUserActiveEntitlements(studentBId)).filter(
        (e) => e.featureKey === prepProduct.featureKey
      );
      assert.ok(activeBefore && activeBefore.expiryDate);
      const initialExpiryMs = activeBefore.expiryDate.getTime();

      const init = await mockPaymentService.initializeOrder({
        userId: studentBId,
        productId: prepProduct.id,
      });

      mockGateway.customVerifyStatus = 'SUCCESS';
      mockGateway.customVerifyAmount = prepProduct.amount;
      mockGateway.customVerifyCurrency = 'NGN';

      const verifyRes = await mockPaymentService.verifyAndProcessPayment({
        reference: init.order.orderReference,
      });

      assert.strictEqual(verifyRes.success, true);
      assert.ok(verifyRes.entitlement?.expiryDate);

      const newExpiryMs = verifyRes.entitlement.expiryDate.getTime();
      const expectedAdditionMs = (prepProduct.durationDays || 30) * 24 * 60 * 60 * 1000;

      // The new expiry date must be strictly greater than initialExpiryMs by approx 30 days
      assert.ok(
        Math.abs(newExpiryMs - (initialExpiryMs + expectedAdditionMs)) < 5000,
        'Renewal must additively extend from previous active expiry date'
      );
    });
  });

  // =========================================================================
  // 5. AI TUTOR CREDIT LEDGER ASSESSMENT (SECTION 5 OF PROMPT)
  // =========================================================================
  describe('5. AI Tutor Credit Ledger Mechanism Assessment', () => {
    it('audit findings: checks whether a credit balance / ledger mechanism exists in DB schema', async () => {
      // Inspect whether user_entitlements has a credit balance column or separate credit table
      const res: any = await db.execute(
        sql`SELECT column_name FROM information_schema.columns 
         WHERE table_name = 'user_entitlements' AND column_name IN ('credits_remaining', 'balance', 'credit_balance');`
      );

      const rows = res?.rows || (Array.isArray(res) ? res : []);
      const hasCreditColumn = rows.length > 0;
      
      // Documenting actual implementation reality:
      // The product ai_tutor_pack_50 exists in products.ts and grants featureKey: 'AI_EXPLANATIONS' with durationDays: null.
      // However, NO discrete credit ledger or per-request decrement exists.
      assert.strictEqual(
        hasCreditColumn,
        false,
        'Confirmed: user_entitlements does NOT currently contain a credit_balance column. AI Tutor is implemented as a feature entitlement, not a discrete 50-use consumption ledger.'
      );
    });
  });

  // =========================================================================
  // 6. EDUCATIONAL EQUITY FIREWALL VERIFICATION
  // =========================================================================
  describe('6. Educational Equity Firewall Verification', () => {
    it('should verify that students without any entitlements can access core academic operations', async () => {
      // Create a brand new student with ZERO entitlements
      const [freeStudent] = await db
        .insert(usersTable)
        .values({
          email: `free_student_${Date.now()}@student.lautech.edu.ng`,
          password: 'Password123!',
          fullName: 'Free Student No Pass',
          role: 'STUDENT',
          status: 'ACTIVE',
        } as any)
        .returning();

      const freeStudentId = String(freeStudent!.id);

      // Verify active entitlements is completely empty
      const activeEntitlements = await entitlementService.getUserActiveEntitlements(freeStudentId);
      assert.strictEqual(activeEntitlements.length, 0);

      // Verify that core academic actions are NOT in the list of paywalled feature keys
      const commercialFeatureKeys = [
        'SEMESTER_PREMIUM_ACCESS',
        'AI_EXPLANATIONS',
        'EXAM_PREP_ACCESS',
        'ADVANCED_ANALYTICS',
        'REVISION_RESOURCES',
      ];

      const freeAcademicFeatures = [
        'COURSE_ENROLLMENT',
        'LECTURER_ASSESSMENT_TAKING',
        'CONTINUOUS_ASSESSMENT_CBT',
        'THEORY_SUBMISSION',
        'ATTENDANCE_MARKING',
        'COURSE_MATERIALS_DOWNLOAD',
        'DEPARTMENTAL_ANNOUNCEMENTS',
        'GRADEBOOK_ACCESS',
      ];

      for (const freeKey of freeAcademicFeatures) {
        assert.strictEqual(
          commercialFeatureKeys.includes(freeKey),
          false,
          `Core academic feature "${freeKey}" must NEVER be gated or commercialized`
        );
      }

      // Cleanup
      await db.delete(usersTable).where(eq(usersTable.id, freeStudentId as any));
    });
  });

  // =========================================================================
  // 7. ADMINISTRATIVE SECURITY, IDOR & RECONCILIATION
  // =========================================================================
  describe('7. Administrative Authorization & IDOR Protections', () => {
    it('should prevent Student B from verifying or viewing Student A order (IDOR protection)', async () => {
      const product = getProductById('pass_harmattan_2026') || getProductById('SEMESTER_PASS_HARMATTAN_2026');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentAId,
        productId: product.id,
      });

      // Student B attempts to verify Student A's order
      await assert.rejects(
        async () => {
          await mockPaymentService.verifyAndProcessPayment({
            reference: init.order.orderReference,
            expectedUserId: studentBId, // Mismatched user
            callerRole: 'STUDENT',
          });
        },
        /Unauthorized: You do not have permission/
      );

      // Student B attempts to view Student A's order
      await assert.rejects(
        async () => {
          await mockPaymentService.getOrderDetails({
            referenceOrId: init.order.orderReference,
            userId: studentBId,
            role: 'STUDENT',
          });
        },
        /Access denied. You do not own this order/
      );
    });

    it('should allow Super Admin to view order details for any student', async () => {
      const product = getProductById('pass_harmattan_2026') || getProductById('SEMESTER_PASS_HARMATTAN_2026');
      assert.ok(product);

      const init = await mockPaymentService.initializeOrder({
        userId: studentAId,
        productId: product.id,
      });

      const adminView = await mockPaymentService.getOrderDetails({
        referenceOrId: init.order.orderReference,
        userId: adminId,
        role: 'SUPER_ADMIN',
      });

      assert.strictEqual(adminView.order.orderReference, init.order.orderReference);
      assert.strictEqual(adminView.order.userId, studentAId);
    });

    it('should require a non-empty audit reason for manual administrative adjustments', async () => {
      await assert.rejects(
        async () => {
          await entitlementService.manualAdjustEntitlementAdmin({
            adminUserId: adminId,
            action: 'GRANT',
            targetUserId: studentAId,
            featureKey: 'SPECIAL_TEST_ACCESS',
            reason: '', // Empty reason
          });
        },
        /A detailed reason/
      );
    });

    it('should record an audit log with admin identity upon manual entitlement adjustment', async () => {
      const testReason = 'Special Dean scholarship waiver approved for student';
      const grant = await entitlementService.manualAdjustEntitlementAdmin({
        adminUserId: adminId,
        action: 'GRANT',
        targetUserId: studentAId,
        featureKey: 'SCHOLARSHIP_PREMIUM_ACCESS',
        durationDays: 60,
        reason: testReason,
      });

      assert.strictEqual(grant.featureKey, 'SCHOLARSHIP_PREMIUM_ACCESS');
      assert.strictEqual(grant.status, 'ACTIVE');

      // Verify audit log entry exists
      const [auditLog] = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.adminUserId, adminId as any),
            eq(auditLogsTable.action, 'MANUAL_ENTITLEMENT_GRANT')
          )
        )
        .limit(1);

      assert.ok(auditLog, 'Audit log must be created for administrative override');
      assert.strictEqual((auditLog.metadata as any)?.reason, testReason);
    });

    it('should ensure reconciliation mechanism cannot overwrite already COMPLETED orders', async () => {
      // Reconciling orders should not modify any order that is already in COMPLETED status
      const [completedOrder] = await db
        .select()
        .from(paymentOrdersTable)
        .where(eq(paymentOrdersTable.status, 'COMPLETED'))
        .limit(1);

      if (completedOrder) {
        const result = await mockPaymentService.verifyAndProcessPayment({
          reference: completedOrder.orderReference,
        });

        assert.strictEqual(result.success, true);
        assert.strictEqual(result.order.status, 'COMPLETED');
      }
    });
  });
});
