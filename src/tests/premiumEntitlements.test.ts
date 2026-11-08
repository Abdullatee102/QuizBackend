/**
 * BB-05C: Premium Monetization, Semester Subscriptions & Entitlement Management Suite
 * Brain Buzz — End-to-End Monetization & Entitlement Authorization Tests
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { eq, and } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  usersTable,
  paymentOrdersTable,
  paymentTransactionsTable,
  userEntitlementsTable,
  paymentProductsTable,
  auditLogsTable,
} from '../db/schema.js';
import {
  PaymentService,
  getProductById,
  getAvailableProducts,
  getProductByIdAsync,
  getAvailableProductsAsync,
  createProductAsync,
  updateProductAsync,
  type IPaymentGateway,
  type PaymentInitParams,
  type PaymentInitResult,
  type PaymentVerifyResult,
} from '../services/payment/index.js';
import { entitlementService } from '../services/payment/entitlementService.js';

// =====================================================
// MOCK PAYMENT GATEWAY IMPLEMENTATION
// =====================================================
class MockPaystackAdapter implements IPaymentGateway {
  readonly gatewayName = 'MOCK_PAYSTACK';
  public webhookSecret = 'test_webhook_secret_key_bb05c';
  public dynamicVerifyMap: Map<string, Partial<PaymentVerifyResult>> = new Map();

  async initializePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    return {
      success: true,
      reference: params.reference,
      authorizationUrl: `https://mock.paystack.co/pay/${params.reference}`,
      accessCode: `acc_${params.reference}`,
      gateway: this.gatewayName,
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerifyResult> {
    const custom = this.dynamicVerifyMap.get(reference);
    if (custom) {
      return {
        success: custom.status === 'SUCCESS',
        status: custom.status || 'SUCCESS',
        reference,
        gatewayTransactionId: custom.gatewayTransactionId || `tx_${Date.now()}`,
        amount: custom.amount ?? 150000,
        currency: custom.currency || 'NGN',
        channel: 'card',
        paidAt: new Date(),
        gatewayResponse: 'Successful',
        error: custom.error,
      };
    }

    return {
      success: true,
      status: 'SUCCESS',
      reference,
      gatewayTransactionId: `tx_${Date.now()}`,
      amount: 150000,
      currency: 'NGN',
      channel: 'card',
      paidAt: new Date(),
      gatewayResponse: 'Successful',
    };
  }

  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    if (!signature) return false;
    const hmac = crypto.createHmac('sha512', this.webhookSecret);
    const expected = hmac.update(rawBody).digest('hex');
    try {
      return crypto.timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'));
    } catch {
      return false;
    }
  }
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      lastErr = err;
      if (err.message && (err.message.includes('Connection') || err.message.includes('timeout') || err.message.includes('socket'))) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

describe('BB-05C: Premium Monetization & Semester Entitlement Suite', () => {
  let gateway: MockPaystackAdapter;
  let paymentService: PaymentService;

  let testStudentId: string;
  let testAdminId: string;
  const runTimestamp = Date.now();
  const studentEmail = `student_bb05c_${runTimestamp}@student.lautech.edu.ng`;
  const adminEmail = `admin_bb05c_${runTimestamp}@lautech.edu.ng`;
  const dynamicTestProductId = `DYNAMIC_PASS_${runTimestamp}`;

  before(async () => {
    gateway = new MockPaystackAdapter();
    paymentService = new PaymentService(gateway);

    // Setup Test Student
    const [student] = await db
      .insert(usersTable)
      .values({
        email: studentEmail,
        password: 'password123',
        fullName: 'Test Monetization Student',
        role: 'STUDENT',
        status: 'ACTIVE',
      } as any)
      .returning();
    testStudentId = String(student!.id);

    // Setup Test Admin
    const [admin] = await db
      .insert(usersTable)
      .values({
        email: adminEmail,
        password: 'password123',
        fullName: 'Test Financial Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      } as any)
      .returning();
    testAdminId = String(admin!.id);
  });

  after(async () => {
    try {
      const uids = [testStudentId, testAdminId];
      for (const uid of uids) {
        if (uid) {
          await db.delete(userEntitlementsTable).where(eq(userEntitlementsTable.userId, uid as any));
          await db.delete(paymentOrdersTable).where(eq(paymentOrdersTable.userId, uid as any));
          await db.delete(usersTable).where(eq(usersTable.id, uid as any));
        }
      }
      await db.delete(paymentProductsTable).where(eq(paymentProductsTable.id, dynamicTestProductId));
    } catch (err: any) {
      console.warn('Cleanup warning:', err.message);
    }
  });

  // =========================================================================
  // 1. PRODUCT CATALOGUE & INTEGER KOBO PRICING
  // =========================================================================
  describe('1. Server-Controlled Product Catalogue', () => {
    it('should expose canonical products with integer kobo amounts and valid categories', async () => {
      const products = getAvailableProducts();
      assert.ok(products.length >= 3, 'Should provide at least 3 active products.');

      for (const p of products) {
        assert.ok(Number.isInteger(p.amount), `Product ${p.id} amount must be an integer (kobo).`);
        assert.ok(p.amount > 0, `Product ${p.id} amount must be positive.`);
        assert.strictEqual(p.currency, 'NGN', `Product ${p.id} must be in NGN currency.`);
        assert.ok(
          ['SEMESTER_PASS', 'EXAM_PREP', 'AI_TUTOR', 'OPTIONAL_PURCHASE', 'CONTENT_PACK', 'CERTIFICATE', 'INSTITUTIONAL'].includes(p.category),
          `Product ${p.id} category "${p.category}" must be valid.`
        );
        assert.ok(Array.isArray(p.benefits) && p.benefits.length > 0, `Product ${p.id} must define benefit bullet points.`);
      }
    });

    it('should correctly configure Harmattan and Rain 2026/2027 Semester Passes at 150,000 kobo (₦1,500)', () => {
      const harmattanPass = getProductById('SEMESTER_PASS_HARMATTAN_2026');
      assert.ok(harmattanPass, 'Harmattan pass must be defined.');
      assert.strictEqual(harmattanPass.amount, 150000);
      assert.strictEqual(harmattanPass.category, 'SEMESTER_PASS');
      assert.strictEqual(harmattanPass.featureKey, 'SEMESTER_PREMIUM_ACCESS');
      assert.strictEqual(harmattanPass.academicSession, '2026/2027');
      assert.strictEqual(harmattanPass.semester, 'harmattan');

      const rainPass = getProductById('SEMESTER_PASS_RAIN_2026');
      assert.ok(rainPass, 'Rain pass must be defined.');
      assert.strictEqual(rainPass.amount, 150000);
      assert.strictEqual(rainPass.category, 'SEMESTER_PASS');
      assert.strictEqual(rainPass.academicSession, '2026/2027');
      assert.strictEqual(rainPass.semester, 'rain');
    });

    it('should correctly configure Exam Prep Passes (30 and 60 days)', () => {
      const prep30 = getProductById('EXAM_PREP_PASS_30');
      assert.ok(prep30);
      assert.strictEqual(prep30.amount, 80000); // ₦800
      assert.strictEqual(prep30.durationDays, 30);
      assert.strictEqual(prep30.featureKey, 'EXAM_PREP_ACCESS');

      const prep60 = getProductById('EXAM_PREP_PASS_60');
      assert.ok(prep60);
      assert.strictEqual(prep60.amount, 120000); // ₦1,200
      assert.strictEqual(prep60.durationDays, 60);
      assert.strictEqual(prep60.featureKey, 'EXAM_PREP_ACCESS');
    });
  });

  // =========================================================================
  // 2. SEMESTER PASS PURCHASE & FEATURE HIERARCHY
  // =========================================================================
  describe('2. Semester Pass Purchase, Provisioning & Feature Hierarchy', () => {
    let orderRef: string;

    it('should initialize and verify a Semester Pass purchase', async () => {
      const initResult = await paymentService.initializeOrder({
        userId: testStudentId,
        productId: 'SEMESTER_PASS_HARMATTAN_2026',
      });

      assert.strictEqual(initResult.order.status, 'PENDING');
      assert.strictEqual(initResult.order.amount, 150000);
      assert.strictEqual(initResult.order.currency, 'NGN');
      orderRef = initResult.order.orderReference;

      // Mock gateway success with exact amount & currency
      gateway.dynamicVerifyMap.set(orderRef, {
        status: 'SUCCESS',
        amount: 150000,
        currency: 'NGN',
      });

      const verifyResult = await paymentService.verifyAndProcessPayment({
        reference: orderRef,
        expectedUserId: testStudentId,
      });

      assert.strictEqual(verifyResult.success, true);
      assert.strictEqual(verifyResult.order.status, 'COMPLETED');
      assert.ok(verifyResult.entitlement);
      assert.strictEqual(verifyResult.entitlement.featureKey, 'SEMESTER_PREMIUM_ACCESS');
      assert.strictEqual(verifyResult.entitlement.academicSession, '2026/2027');
      assert.strictEqual(verifyResult.entitlement.semester, 'harmattan');
      assert.strictEqual(verifyResult.entitlement.status, 'ACTIVE');
      assert.ok(verifyResult.entitlement.expiryDate);
    });

    it('should resolve umbrella feature access through the active Semester Pass', async () => {
      // Semester pass unlocks AI_EXPLANATIONS, EXAM_PREP_ACCESS, ADVANCED_ANALYTICS, REVISION_RESOURCES
      const featuresToCheck = [
        'SEMESTER_PREMIUM_ACCESS',
        'AI_EXPLANATIONS',
        'EXAM_PREP_ACCESS',
        'ADVANCED_ANALYTICS',
        'REVISION_RESOURCES',
      ];

      for (const feat of featuresToCheck) {
        const check = await entitlementService.checkUserFeatureAccess(
          testStudentId,
          feat,
          { academicSession: '2026/2027', semester: 'harmattan' }
        );
        assert.strictEqual(check.hasAccess, true, `Feature ${feat} must be granted via active Semester Pass.`);
        assert.strictEqual(check.status, 'ACTIVE');
      }
    });

    it('should reject duplicate semester pass purchase for the currently active semester', async () => {
      await assert.rejects(
        async () => {
          await paymentService.initializeOrder({
            userId: testStudentId,
            productId: 'SEMESTER_PASS_HARMATTAN_2026',
          });
        },
        /already hold.*active Brain Buzz Semester Pass/i
      );
    });

    it('should permit purchasing a future semester pass (Rain 2026/2027) without schema collision', async () => {
      const rainInit = await paymentService.initializeOrder({
        userId: testStudentId,
        productId: 'SEMESTER_PASS_RAIN_2026',
      });

      assert.strictEqual(rainInit.order.status, 'PENDING');
      const rainRef = rainInit.order.orderReference;

      gateway.dynamicVerifyMap.set(rainRef, {
        status: 'SUCCESS',
        amount: 150000,
        currency: 'NGN',
      });

      const rainVerify = await paymentService.verifyAndProcessPayment({
        reference: rainRef,
        expectedUserId: testStudentId,
      });

      assert.strictEqual(rainVerify.success, true);
      assert.strictEqual(rainVerify.entitlement!.academicSession, '2026/2027');
      assert.strictEqual(rainVerify.entitlement!.semester, 'rain');

      // Both passes now exist in history without unique constraint deadlock!
      const activeEntitlements = await entitlementService.getUserActiveEntitlements(testStudentId);
      const semesterPasses = activeEntitlements.filter((e) => e.featureKey === 'SEMESTER_PREMIUM_ACCESS');
      assert.strictEqual(semesterPasses.length, 2, 'Student should hold both Harmattan and Rain active passes.');
    });
  });

  // =========================================================================
  // 3. EXAM PREP PASS & STACKABLE DURATION RENEWALS
  // =========================================================================
  describe('3. Examination Prep Pass & Stackable Duration Renewals', () => {
    it('should provision Exam Prep Pass with correct expiry date', async () => {
      const prepOrder = await paymentService.initializeOrder({
        userId: testStudentId,
        productId: 'EXAM_PREP_PASS_30',
      });

      gateway.dynamicVerifyMap.set(prepOrder.order.orderReference, {
        status: 'SUCCESS',
        amount: 80000,
        currency: 'NGN',
      });

      const prepVerify = await paymentService.verifyAndProcessPayment({
        reference: prepOrder.order.orderReference,
        expectedUserId: testStudentId,
      });

      assert.strictEqual(prepVerify.success, true);
      assert.strictEqual(prepVerify.entitlement!.featureKey, 'EXAM_PREP_ACCESS');
      assert.ok(prepVerify.entitlement!.expiryDate);

      const daysRemaining = Math.round(
        (new Date(prepVerify.entitlement!.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      assert.ok(daysRemaining >= 29 && daysRemaining <= 31, 'Should provision approx 30 days.');
    });

    it('should additively extend expiration date upon stackable renewal (Repeat Purchase)', async () => {
      // Find current expiry date of EXAM_PREP_ACCESS
      const [currentEntitlement] = await db
        .select()
        .from(userEntitlementsTable)
        .where(
          and(
            eq(userEntitlementsTable.userId, testStudentId as any),
            eq(userEntitlementsTable.featureKey, 'EXAM_PREP_ACCESS'),
            eq(userEntitlementsTable.status, 'ACTIVE')
          )
        );

      assert.ok(currentEntitlement && currentEntitlement.expiryDate);
      const initialExpiry = new Date(currentEntitlement.expiryDate).getTime();

      // Purchase another 30-day exam prep pass
      const renewOrder = await withRetry(() =>
        paymentService.initializeOrder({
          userId: testStudentId,
          productId: 'EXAM_PREP_PASS_30',
        })
      );

      gateway.dynamicVerifyMap.set(renewOrder.order.orderReference, {
        status: 'SUCCESS',
        amount: 80000,
        currency: 'NGN',
      });

      const renewVerify = await paymentService.verifyAndProcessPayment({
        reference: renewOrder.order.orderReference,
        expectedUserId: testStudentId,
      });

      assert.strictEqual(renewVerify.success, true);
      const extendedExpiry = new Date(renewVerify.entitlement!.expiryDate!).getTime();

      // Extended expiry must be approx initialExpiry + 30 days (stackable!)
      const addedDays = Math.round((extendedExpiry - initialExpiry) / (1000 * 60 * 60 * 24));
      assert.strictEqual(addedDays, 30, 'Renewal must extend existing expiry date by 30 days.');
    });
  });

  // =========================================================================
  // 4. ENTITLEMENT EXPIRATION & HISTORY AUDIT
  // =========================================================================
  describe('4. Entitlement Expiry Evaluation & Historical Audit Trail', () => {
    it('should return complete auditable history of entitlements', async () => {
      const history = await entitlementService.getUserEntitlementHistory(testStudentId);
      assert.ok(history.length >= 3, 'Student should have at least 3 historical entitlement records.');

      for (const ent of history) {
        assert.ok(ent.id, 'Entitlement must have ID.');
        assert.strictEqual(ent.userId, testStudentId);
        assert.ok(ent.featureKey);
        assert.ok(ent.startDate);
      }
    });

    it('should reject access and mark entitlement as EXPIRED when past expiry date', async () => {
      // Artificially age one entitlement to the past
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5); // 5 days ago
      const [expiredRecord] = await db
        .insert(userEntitlementsTable)
        .values({
          userId: testStudentId as any,
          featureKey: 'TEMPORARY_TEST_FEATURE',
          status: 'ACTIVE',
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
          expiryDate: pastDate,
          metadata: { test: true },
        })
        .returning();

      assert.ok(expiredRecord);

      // Check feature access
      const accessCheck = await entitlementService.checkUserFeatureAccess(
        testStudentId,
        'TEMPORARY_TEST_FEATURE'
      );

      assert.strictEqual(accessCheck.hasAccess, false);
      assert.ok(accessCheck.reason === 'EXPIRED_ENTITLEMENT' || accessCheck.reason === 'FEATURE_NOT_INCLUDED_IN_ENTITLEMENTS');

      // Verify the record in DB has been transitioned to EXPIRED
      const [updated] = await db
        .select()
        .from(userEntitlementsTable)
        .where(eq(userEntitlementsTable.id, expiredRecord.id));

      assert.strictEqual(updated?.status, 'EXPIRED');

      // Clean up test record
      await db.delete(userEntitlementsTable).where(eq(userEntitlementsTable.id, expiredRecord.id));
    });
  });

  // =========================================================================
  // 5. ADMINISTRATIVE PRODUCT MANAGEMENT & AUDITED MANUAL OVERRIDES
  // =========================================================================
  describe('5. Administrative Product Catalogue & Manual Overrides', () => {
    it('should allow admin to create a new product dynamically in DB', async () => {
      const created = await createProductAsync({
        id: dynamicTestProductId,
        title: 'Flash Revision Pass (10 Days)',
        description: 'Ten days of high-velocity revision practice for sprint tests.',
        category: 'EXAM_PREP',
        amount: 40000, // ₦400
        currency: 'NGN',
        purpose: 'EXAM_PRACTICE',
        featureKey: 'FLASH_REVISION_ACCESS',
        durationDays: 10,
        benefits: ['Ten days intensive practice', 'Exam countdown'],
        isActive: true,
        isTestProduct: true,
      });

      assert.strictEqual(created.id, dynamicTestProductId);
      assert.strictEqual(created.amount, 40000);

      // Verify retrieval through async DB lookup
      const fetched = await getProductByIdAsync(dynamicTestProductId);
      assert.ok(fetched);
      assert.strictEqual(fetched.title, 'Flash Revision Pass (10 Days)');
    });

    it('should allow admin to update product pricing and active status', async () => {
      const updated = await updateProductAsync(dynamicTestProductId, {
        amount: 45000, // Updated to ₦450
        description: 'Updated description by admin test.',
      });

      assert.ok(updated);
      assert.strictEqual(updated.amount, 45000);
      assert.strictEqual(updated.description, 'Updated description by admin test.');
    });

    it('should perform audited manual entitlement grant with mandatory reason', async () => {
      const manualGrant = await entitlementService.manualAdjustEntitlementAdmin({
        adminUserId: testAdminId,
        targetUserId: testStudentId,
        featureKey: 'SPECIAL_HONORS_ACCESS',
        action: 'GRANT',
        reason: 'Dean approved academic scholarship waiver for outstanding CGPA.',
        durationDays: 45,
      });

      assert.ok(manualGrant);
      assert.strictEqual(manualGrant.status, 'ACTIVE');
      assert.strictEqual(manualGrant.featureKey, 'SPECIAL_HONORS_ACCESS');

      // Verify audit log entry
      const [auditLog] = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.adminUserId, testAdminId as any),
            eq(auditLogsTable.action, 'MANUAL_ENTITLEMENT_GRANT')
          )
        )
        .orderBy(eq(auditLogsTable.createdAt, auditLogsTable.createdAt))
        .limit(1);

      assert.ok(auditLog, 'Audit log entry must be written for manual grant.');
      assert.strictEqual((auditLog.metadata as any).reason, 'Dean approved academic scholarship waiver for outstanding CGPA.');

      // Verify student now has access
      const access = await entitlementService.checkUserFeatureAccess(testStudentId, 'SPECIAL_HONORS_ACCESS');
      assert.strictEqual(access.hasAccess, true);
    });

    it('should perform audited manual entitlement revocation with mandatory reason', async () => {
      const manualRevoke = await entitlementService.manualAdjustEntitlementAdmin({
        adminUserId: testAdminId,
        targetUserId: testStudentId,
        featureKey: 'SPECIAL_HONORS_ACCESS',
        action: 'REVOKE',
        reason: 'Student transferred faculty; honors pass revoked per departmental policy.',
      });

      assert.ok(manualRevoke);
      assert.strictEqual(manualRevoke.status, 'REVOKED');

      // Verify audit log entry
      const [auditLog] = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.adminUserId, testAdminId as any),
            eq(auditLogsTable.action, 'MANUAL_ENTITLEMENT_REVOKE')
          )
        )
        .limit(1);

      assert.ok(auditLog, 'Audit log entry must be written for manual revoke.');

      // Verify student access is immediately revoked
      const access = await entitlementService.checkUserFeatureAccess(testStudentId, 'SPECIAL_HONORS_ACCESS');
      assert.strictEqual(access.hasAccess, false);
      assert.ok(access.reason === 'NO_ACTIVE_ENTITLEMENT' || access.reason === 'FEATURE_NOT_INCLUDED_IN_ENTITLEMENTS');
    });

    it('should reject manual adjustments with empty or insufficient reason', async () => {
      await assert.rejects(
        async () => {
          await entitlementService.manualAdjustEntitlementAdmin({
            adminUserId: testAdminId,
            targetUserId: testStudentId,
            featureKey: 'TEST_FEATURE',
            action: 'GRANT',
            reason: 'tiny', // Less than 5 characters
          });
        },
        /detailed reason.*is required/i
      );
    });
  });

  // =========================================================================
  // 6. EDUCATIONAL EQUITY FIREWALL VERIFICATION
  // =========================================================================
  describe('6. Educational Equity Firewall', () => {
    it('should ensure core academic feature keys are never commercialized or paywalled', () => {
      // Canonical list of essential academic functions from BB-05A/BB-05C specifications
      const essentialAcademicFeatures = [
        'COURSE_ENROLLMENT',
        'OFFICIAL_ASSESSMENTS',
        'ASSESSMENT_SUBMISSION',
        'ATTENDANCE_CHECKIN',
        'COURSE_MATERIALS',
        'ANNOUNCEMENTS',
        'ACADEMIC_DISCUSSIONS',
        'OPPORTUNITY_HUB_PUBLIC',
      ];

      const products = getAvailableProducts();
      const commercialFeatureKeys = new Set(products.map((p) => p.featureKey));

      for (const coreFeature of essentialAcademicFeatures) {
        assert.ok(
          !commercialFeatureKeys.has(coreFeature),
          `Essential academic feature "${coreFeature}" must NEVER be gated behind a commercial product key.`
        );
      }
    });
  });
});
