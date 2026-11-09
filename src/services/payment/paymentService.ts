/**
 * BB-05B: Core Payment & Ledger Service
 * Brain Buzz — Core Payment Infrastructure
 * 
 * Implements atomic financial transactions, server-controlled pricing,
 * idempotent verification, and strict entitlement lifecycle management.
 */

import { eq, and, desc, sql, lt } from 'drizzle-orm';
import crypto from 'node:crypto';
import { db } from '../../db/index.js';
import {
  paymentOrdersTable,
  paymentTransactionsTable,
  userEntitlementsTable,
  webhookEventsTable,
  auditLogsTable,
  usersTable,
  type PaymentOrder,
  type PaymentTransaction,
  type UserEntitlement,
} from '../../db/schema.js';
import logger from '../../config/logger.js';
import type { IPaymentGateway, PaymentProduct } from './types.js';
import { getProductById, getProductByIdAsync } from './products.js';
import { entitlementService } from './entitlementService.js';

export class PaymentService {
  private gateway: IPaymentGateway;

  constructor(gateway: IPaymentGateway) {
    this.gateway = gateway;
  }

  /**
   * Replace or inject payment gateway adapter (used for testing or gateway switching).
   */
  setGateway(gateway: IPaymentGateway): void {
    this.gateway = gateway;
  }

  getGateway(): IPaymentGateway {
    return this.gateway;
  }

  /**
   * Generate an unpredictable, collision-resistant internal order reference.
   * Format: BB-ORD-{TIMESTAMP}-{RANDOM_HEX}
   */
  generateOrderReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `BB-ORD-${timestamp}-${randomHex}`;
  }

  /**
   * Initialize a new payment order for a student.
   * Server strictly enforces product configuration and pricing.
   */
  async initializeOrder(params: {
    userId: string;
    productId: string;
    callbackUrl?: string | undefined;
    clientMetadata?: Record<string, any> | undefined;
  }): Promise<{
    order: PaymentOrder;
    authorizationUrl?: string | undefined;
    accessCode?: string | undefined;
  }> {
    const { userId, productId, callbackUrl, clientMetadata } = params;

    // 1. Verify user exists and is active
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
    if (!isUuid) {
      throw new Error('User account not found.');
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user) {
      throw new Error('User account not found.');
    }

    if (user.status !== 'ACTIVE') {
      throw new Error(`Account status is ${user.status.toLowerCase()}. Payments are disabled.`);
    }

    if (!user.email) {
      throw new Error('User does not have a registered email address required for payments.');
    }

    // 2. Authoritative server product resolution
    const product = (await getProductByIdAsync(productId)) || getProductById(productId);
    if (!product) {
      throw new Error(`Invalid or unrecognized product ID: "${productId}".`);
    }

    if (product.isActive === false) {
      throw new Error(`Product "${product.title}" is currently disabled and unavailable for purchase.`);
    }

    // Duplicate purchase protection for active Semester Passes
    if (product.category === 'SEMESTER_PASS' && product.academicSession && product.semester) {
      const alreadyActive = await entitlementService.hasActiveSemesterPass(
        userId,
        product.academicSession,
        product.semester
      );
      if (alreadyActive) {
        throw new Error(
          `You already hold an active Brain Buzz Semester Pass for ${product.academicSession} (${product.semester}). Duplicate purchase is not permitted.`
        );
      }
    }

    // 3. Generate unique order reference
    const orderReference = this.generateOrderReference();

    // 4. Record pending order in database ledger
    const [order] = await db
      .insert(paymentOrdersTable)
      .values({
        userId: String(user.id),
        orderReference,
        amount: product.amount, // Server-enforced integer minor units (kobo)
        currency: product.currency,
        purpose: product.purpose,
        productId: product.id,
        status: 'PENDING',
        metadata: {
          productTitle: product.title,
          category: product.category,
          featureKey: product.featureKey,
          durationDays: product.durationDays,
          academicSession: product.academicSession || null,
          semester: product.semester || null,
          benefits: product.benefits || [],
          userEmail: user.email,
          ...(clientMetadata || {}),
        },
      })
      .returning();

    if (!order) {
      throw new Error('Failed to record payment order in database.');
    }

    logger.info(
      `[PAYMENT ORDER CREATED] Order ID=${order.id}, Ref=${order.orderReference}, Product=${product.id}, Amount=${order.amount} ${order.currency}`
    );

    // 5. Initialize payment with gateway
    const initResult = await this.gateway.initializePayment({
      email: user.email,
      amount: order.amount,
      reference: order.orderReference,
      currency: order.currency,
      callbackUrl,
      metadata: {
        orderId: order.id,
        userId: user.id,
        productId: product.id,
      },
    });

    if (!initResult.success) {
      // Mark order as failed if gateway rejected initialization
      await db
        .update(paymentOrdersTable)
        .set({
          status: 'FAILED',
          metadata: {
            ...(order.metadata && typeof order.metadata === 'object' ? (order.metadata as Record<string, any>) : {}),
            initError: initResult.error,
          },
          updatedAt: new Date(),
        })
        .where(eq(paymentOrdersTable.id, order.id));

      throw new Error(`Payment gateway initialization failed: ${initResult.error}`);
    }

    return {
      order,
      authorizationUrl: initResult.authorizationUrl,
      accessCode: initResult.accessCode,
    };
  }

  /**
   * Verify and process a payment with the gateway.
   * Performs atomic updates, financial validation, and exactly-once entitlement provisioning.
   */
  async verifyAndProcessPayment(params: {
    reference: string;
    expectedUserId?: string | undefined;
    callerRole?: string | undefined;
  }): Promise<{
    success: boolean;
    order: PaymentOrder;
    transaction?: PaymentTransaction | undefined;
    entitlement?: UserEntitlement | undefined;
    error?: string | undefined;
  }> {
    const { reference, expectedUserId, callerRole } = params;

    // 1. Fetch order by internal reference
    const [order] = await db
      .select()
      .from(paymentOrdersTable)
      .where(eq(paymentOrdersTable.orderReference, reference));

    if (!order) {
      return {
        success: false,
        order: null as any,
        error: `Payment order with reference "${reference}" was not found.`,
      };
    }

    // 2. IDOR Enforcement: Enforce user ownership unless admin
    if (expectedUserId && callerRole !== 'SUPER_ADMIN' && callerRole !== 'CONTENT_ADMIN') {
      if (order.userId !== expectedUserId) {
        logger.warn(
          `[PAYMENT IDOR BLOCKED] User ${expectedUserId} attempted to verify order belonging to ${order.userId}`
        );
        throw new Error('Unauthorized: You do not have permission to verify or modify this order.');
      }
    }

    // 3. Idempotency Check: If order is already completed, return existing entitlement
    if (order.status === 'COMPLETED') {
      const [existingTx] = await db
        .select()
        .from(paymentTransactionsTable)
        .where(eq(paymentTransactionsTable.orderId, order.id))
        .limit(1);

      const product = (await getProductByIdAsync(order.productId)) || getProductById(order.productId);
      const [existingEntitlement] = product
        ? await db
            .select()
            .from(userEntitlementsTable)
            .where(
              and(
                eq(userEntitlementsTable.userId, order.userId),
                eq(userEntitlementsTable.featureKey, product.featureKey)
              )
            )
            .limit(1)
        : [undefined];

      logger.info(
        `[PAYMENT VERIFY IDEMPOTENT] Order ${order.orderReference} already completed. Returning existing state.`
      );

      return {
        success: true,
        order,
        transaction: existingTx ?? undefined,
        entitlement: existingEntitlement ?? undefined,
      };
    }

    // 4. Query gateway for authoritative verification
    const verifyResult = await this.gateway.verifyPayment(reference);

    if (!verifyResult.success || verifyResult.status !== 'SUCCESS') {
      logger.warn(
        `[PAYMENT VERIFY UNCONFIRMED] Gateway returned status=${verifyResult.status} for reference=${reference}`
      );

      const normalizedStatus =
        verifyResult.status === 'ABANDONED'
          ? 'ABANDONED'
          : verifyResult.status === 'PENDING'
          ? 'PENDING'
          : 'FAILED';

      if (normalizedStatus !== 'PENDING') {
        await db
          .update(paymentOrdersTable)
          .set({
            status: normalizedStatus,
            updatedAt: new Date(),
          })
          .where(eq(paymentOrdersTable.id, order.id));
      }

      // Record transaction failure attempt
      const [failedTx] = await db
        .insert(paymentTransactionsTable)
        .values({
          orderId: order.id,
          gateway: this.gateway.gatewayName,
          gatewayReference: verifyResult.reference || reference,
          gatewayTransactionId: verifyResult.gatewayTransactionId,
          amount: verifyResult.amount || 0,
          currency: verifyResult.currency || order.currency,
          channel: verifyResult.channel,
          status: normalizedStatus,
          gatewayResponse: verifyResult.gatewayResponse || verifyResult.error,
          paidAt: verifyResult.paidAt,
          metadata: verifyResult.metadata || {},
        })
        .onConflictDoUpdate({
          target: paymentTransactionsTable.gatewayReference,
          set: {
            status: normalizedStatus,
            gatewayResponse: verifyResult.gatewayResponse || verifyResult.error,
            updatedAt: new Date(),
          },
        })
        .returning();

      return {
        success: false,
        order: { ...order, status: normalizedStatus },
        transaction: failedTx ?? undefined,
        error: verifyResult.error || `Payment was not successful. Current status: ${normalizedStatus}.`,
      };
    }

    // 5. Strict Amount & Currency Verification (Anti-Fraud)
    if (verifyResult.amount !== order.amount) {
      logger.error(
        `[PAYMENT FRAUD DETECTED] Amount mismatch for order ${order.orderReference}: expected ${order.amount}, received ${verifyResult.amount}`
      );

      await db
        .update(paymentOrdersTable)
        .set({ status: 'FAILED', updatedAt: new Date() })
        .where(eq(paymentOrdersTable.id, order.id));

      await db
        .insert(paymentTransactionsTable)
        .values({
          orderId: order.id,
          gateway: this.gateway.gatewayName,
          gatewayReference: verifyResult.reference,
          gatewayTransactionId: verifyResult.gatewayTransactionId,
          amount: verifyResult.amount,
          currency: verifyResult.currency,
          channel: verifyResult.channel,
          status: 'FAILED',
          gatewayResponse: `FRAUD_ALERT_AMOUNT_MISMATCH: expected ${order.amount}, received ${verifyResult.amount}`,
          paidAt: verifyResult.paidAt,
          metadata: { ...verifyResult.metadata, securityFlag: 'AMOUNT_MISMATCH' },
        })
        .onConflictDoUpdate({
          target: paymentTransactionsTable.gatewayReference,
          set: {
            status: 'FAILED',
            gatewayResponse: `FRAUD_ALERT_AMOUNT_MISMATCH: expected ${order.amount}, received ${verifyResult.amount}`,
            updatedAt: new Date(),
          },
        });

      return {
        success: false,
        order: { ...order, status: 'FAILED' },
        error: `Security violation: Amount mismatch. Expected ${order.amount}, received ${verifyResult.amount}.`,
      };
    }

    if (verifyResult.currency.toUpperCase() !== order.currency.toUpperCase()) {
      logger.error(
        `[PAYMENT FRAUD DETECTED] Currency mismatch for order ${order.orderReference}: expected ${order.currency}, received ${verifyResult.currency}`
      );

      await db
        .update(paymentOrdersTable)
        .set({ status: 'FAILED', updatedAt: new Date() })
        .where(eq(paymentOrdersTable.id, order.id));

      return {
        success: false,
        order: { ...order, status: 'FAILED' },
        error: 'Payment rejected due to currency mismatch.',
      };
    }

    // 6. Atomic Database Transaction: Complete Order, Record Transaction, Grant Entitlement
    const product = (await getProductByIdAsync(order.productId)) || getProductById(order.productId);
    const featureKey = product?.featureKey || (order.metadata as any)?.featureKey || 'PREMIUM_QUIZ_PASS';
    const durationDays = product?.durationDays ?? (order.metadata as any)?.durationDays ?? null;

    return await db.transaction(async (tx) => {
      // a. Mark order as COMPLETED
      const [completedOrder] = await tx
        .update(paymentOrdersTable)
        .set({
          status: 'COMPLETED',
          updatedAt: new Date(),
        })
        .where(eq(paymentOrdersTable.id, order.id))
        .returning();

      if (!completedOrder) {
        throw new Error(`Failed to update order ${order.id} status to COMPLETED`);
      }

      // b. Record successful transaction
      const [successfulTx] = await tx
        .insert(paymentTransactionsTable)
        .values({
          orderId: order.id,
          gateway: this.gateway.gatewayName,
          gatewayReference: verifyResult.reference,
          gatewayTransactionId: verifyResult.gatewayTransactionId,
          amount: verifyResult.amount,
          currency: verifyResult.currency,
          channel: verifyResult.channel,
          status: 'SUCCESS',
          gatewayResponse: verifyResult.gatewayResponse || 'Successful',
          paidAt: verifyResult.paidAt || new Date(),
          metadata: verifyResult.metadata || {},
        })
        .onConflictDoUpdate({
          target: paymentTransactionsTable.gatewayReference,
          set: {
            status: 'SUCCESS',
            amount: verifyResult.amount,
            paidAt: verifyResult.paidAt || new Date(),
            gatewayResponse: verifyResult.gatewayResponse || 'Successful',
            updatedAt: new Date(),
          },
        })
        .returning();

      if (!successfulTx) {
        throw new Error(`Failed to record transaction for order ${order.id}`);
      }

      // c. Authoritative Entitlement Provisioning via Entitlement Engine
      const effectiveProduct = product || {
        id: order.productId,
        title: (order.metadata as any)?.productTitle || 'Premium Access',
        description: '',
        category: (order.metadata as any)?.category || 'SEMESTER_PASS',
        amount: order.amount,
        currency: order.currency,
        purpose: order.purpose,
        featureKey: (order.metadata as any)?.featureKey || featureKey,
        durationDays: (order.metadata as any)?.durationDays ?? durationDays,
        academicSession: (order.metadata as any)?.academicSession || null,
        semester: (order.metadata as any)?.semester || null,
        benefits: (order.metadata as any)?.benefits || [],
      };

      const entitlement = await entitlementService.grantEntitlementForVerifiedOrder(
        order,
        effectiveProduct,
        tx
      );

      // e. Immutable Audit Log
      await tx.insert(auditLogsTable).values({
        adminUserId: null,
        action: 'PAYMENT_VERIFIED',
        resourceType: 'payment_orders',
        resourceId: order.id,
        metadata: {
          orderReference: order.orderReference,
          amount: verifyResult.amount,
          currency: verifyResult.currency,
          featureKey,
          expiryDate: entitlement.expiryDate ? entitlement.expiryDate.toISOString() : null,
        },
      });

      logger.info(
        `[ENTITLEMENT PROVISIONED] User ${order.userId} granted ${featureKey} until ${entitlement.expiryDate ? entitlement.expiryDate.toISOString() : 'LIFETIME'}`
      );

      return {
        success: true,
        order: completedOrder,
        transaction: successfulTx,
        entitlement,
      };
    });
  }

  /**
   * Ingest and process Paystack Webhook Event with cryptographic verification and deduplication.
   */
  async processWebhook(params: {
    rawBody: string | Buffer;
    signatureHeader: string;
    payload: any;
  }): Promise<{
    success: boolean;
    statusCode: number;
    message: string;
    orderReference?: string | undefined;
  }> {
    const { rawBody, signatureHeader, payload } = params;

    // 1. Cryptographic Signature Verification
    const isSignatureValid = this.gateway.verifyWebhookSignature(rawBody, signatureHeader);

    const eventId =
      payload?.id?.toString() ||
      payload?.data?.id?.toString() ||
      `evt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const eventType = payload?.event || 'unknown';
    const gatewayReference = payload?.data?.reference || null;

    if (!isSignatureValid) {
      logger.error(
        `[WEBHOOK SIGNATURE INVALID] Rejected webhook eventType=${eventType}, reference=${gatewayReference}`
      );

      // Log fraudulent or corrupted attempt
      await db
        .insert(webhookEventsTable)
        .values({
          gateway: this.gateway.gatewayName,
          eventId,
          eventType,
          signature: signatureHeader || 'missing',
          signatureValid: false,
          processingStatus: 'FAILED',
          gatewayReference,
          payload: typeof payload === 'object' ? payload : { raw: String(payload) },
          error: 'Cryptographic signature verification failed.',
        })
        .onConflictDoNothing();

      return {
        success: false,
        statusCode: 400,
        message: 'Invalid webhook signature.',
      };
    }

    // 2. Check for duplicate webhook delivery (Idempotency)
    const [existingWebhook] = await db
      .select()
      .from(webhookEventsTable)
      .where(
        and(
          eq(webhookEventsTable.gateway, this.gateway.gatewayName),
          eq(webhookEventsTable.eventId, eventId)
        )
      );

    if (existingWebhook && existingWebhook.processingStatus === 'PROCESSED') {
      logger.info(
        `[WEBHOOK DEDUPLICATED] Event ${eventId} already processed for reference ${gatewayReference}`
      );
      return {
        success: true,
        statusCode: 200,
        message: 'Webhook already processed (idempotent).',
        orderReference: gatewayReference,
      };
    }

    // 3. Record pending webhook event in ledger
    const [webhookLog] = await db
      .insert(webhookEventsTable)
      .values({
        gateway: this.gateway.gatewayName,
        eventId,
        eventType,
        signature: signatureHeader,
        signatureValid: true,
        processingStatus: 'PENDING',
        gatewayReference,
        payload: payload || {},
      })
      .onConflictDoUpdate({
        target: [webhookEventsTable.gateway, webhookEventsTable.eventId],
        set: {
          processingStatus: 'PENDING',
          payload: payload || {},
        },
      })
      .returning();

    if (!webhookLog) {
      throw new Error('Failed to record webhook event in database.');
    }

    // 4. Handle 'charge.success' events
    if (eventType === 'charge.success' && gatewayReference) {
      try {
        logger.info(`[WEBHOOK CHARGE SUCCESS] Processing order reference=${gatewayReference}`);

        // Direct independent server-side verification before provisioning
        const verifyResult = await this.verifyAndProcessPayment({
          reference: gatewayReference,
        });

        if (verifyResult.success) {
          await db
            .update(webhookEventsTable)
            .set({
              processingStatus: 'PROCESSED',
              processedAt: new Date(),
            })
            .where(eq(webhookEventsTable.id, webhookLog.id));

          return {
            success: true,
            statusCode: 200,
            message: 'Webhook charge processed and entitlement granted.',
            orderReference: gatewayReference,
          };
        } else {
          await db
            .update(webhookEventsTable)
            .set({
              processingStatus: 'FAILED',
              error: verifyResult.error,
              processedAt: new Date(),
            })
            .where(eq(webhookEventsTable.id, webhookLog.id));

          return {
            success: false,
            statusCode: 422,
            message: verifyResult.error || 'Payment verification failed.',
            orderReference: gatewayReference,
          };
        }
      } catch (err: any) {
        logger.error(
          `[WEBHOOK PROCESSING ERROR] Error processing reference ${gatewayReference}: ${err.message}`
        );

        await db
          .update(webhookEventsTable)
          .set({
            processingStatus: 'FAILED',
            error: err.message,
            processedAt: new Date(),
          })
          .where(eq(webhookEventsTable.id, webhookLog.id));

        return {
          success: false,
          statusCode: 500,
          message: 'Internal error processing payment webhook.',
          orderReference: gatewayReference,
        };
      }
    }

    // Other events (e.g. transfer, refund) are acknowledged safely
    await db
      .update(webhookEventsTable)
      .set({
        processingStatus: 'IGNORED',
        processedAt: new Date(),
      })
      .where(eq(webhookEventsTable.id, webhookLog.id));

    return {
      success: true,
      statusCode: 200,
      message: `Webhook event "${eventType}" acknowledged.`,
    };
  }

  /**
   * Retrieve order details with ownership verification.
   */
  async getOrderDetails(params: {
    referenceOrId: string;
    userId: string;
    role?: string | undefined;
  }): Promise<{
    order: PaymentOrder;
    transactions: PaymentTransaction[];
    entitlement?: UserEntitlement | null | undefined;
  }> {
    const { referenceOrId, userId, role } = params;

    // Check by reference or by ID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      referenceOrId
    );

    const [order] = await db
      .select()
      .from(paymentOrdersTable)
      .where(
        isUuid
          ? eq(paymentOrdersTable.id, referenceOrId as any)
          : eq(paymentOrdersTable.orderReference, referenceOrId)
      );

    if (!order) {
      throw new Error(`Order "${referenceOrId}" not found.`);
    }

    // IDOR protection: only owner or admin may view
    if (order.userId !== userId && role !== 'SUPER_ADMIN' && role !== 'CONTENT_ADMIN') {
      throw new Error('Access denied. You do not own this order.');
    }

    const transactions = await db
      .select()
      .from(paymentTransactionsTable)
      .where(eq(paymentTransactionsTable.orderId, order.id))
      .orderBy(desc(paymentTransactionsTable.createdAt));

    const product = (await getProductByIdAsync(order.productId)) || getProductById(order.productId);
    const [entitlement] = product
      ? await db
          .select()
          .from(userEntitlementsTable)
          .where(
            and(
              eq(userEntitlementsTable.userId, order.userId),
              eq(userEntitlementsTable.featureKey, product.featureKey)
            )
          )
          .limit(1)
      : [null];

    return {
      order,
      transactions,
      entitlement,
    };
  }

  /**
   * List paginated order history for a user.
   */
  async listUserOrders(params: {
    userId: string;
    limit?: number | undefined;
    offset?: number | undefined;
    status?: string | undefined;
  }): Promise<{
    orders: PaymentOrder[];
    total: number;
  }> {
    const { userId, limit = 20, offset = 0, status } = params;

    const conditions = [eq(paymentOrdersTable.userId, userId as any)];
    if (status) {
      conditions.push(eq(paymentOrdersTable.status, status));
    }

    const orders = await db
      .select()
      .from(paymentOrdersTable)
      .where(and(...conditions))
      .orderBy(desc(paymentOrdersTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(paymentOrdersTable)
      .where(and(...conditions));

    return {
      orders,
      total: countResult?.count || 0,
    };
  }

  /**
   * List paginated orders across all students for administrative portal (BB-05C).
   */
  async listAllOrdersAdmin(params: {
    limit?: number;
    offset?: number;
    status?: string;
    userId?: string;
    productId?: string;
  }): Promise<{
    orders: Array<PaymentOrder & { studentEmail?: string | null; studentName?: string | null }>;
    total: number;
  }> {
    const { limit = 20, offset = 0, status, userId, productId } = params;

    const conditions: any[] = [];
    if (status) conditions.push(eq(paymentOrdersTable.status, status));
    if (userId) conditions.push(eq(paymentOrdersTable.userId, userId as any));
    if (productId) conditions.push(eq(paymentOrdersTable.productId, productId));

    const rows = await db
      .select({
        order: paymentOrdersTable,
        email: usersTable.email,
        fullName: usersTable.fullName,
      })
      .from(paymentOrdersTable)
      .leftJoin(usersTable, eq(paymentOrdersTable.userId, usersTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(paymentOrdersTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(paymentOrdersTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      orders: rows.map((r) => ({
        ...r.order,
        studentEmail: r.email,
        studentName: r.fullName,
      })),
      total: countResult?.count || 0,
    };
  }

  /**
   * List active entitlements for a user via the Entitlement Engine.
   */
  async getUserEntitlements(userId: string): Promise<Array<UserEntitlement & { remainingDays: number | null }>> {
    return await entitlementService.getUserActiveEntitlements(userId);
  }

  /**
   * Retrieve full historical audit of student entitlements (ACTIVE, EXPIRED, REVOKED, REFUNDED).
   */
  async getUserEntitlementHistory(userId: string): Promise<UserEntitlement[]> {
    return await entitlementService.getUserEntitlementHistory(userId);
  }

  /**
   * Check whether user currently holds access to a specific premium feature key.
   */
  async checkFeatureAccess(
    userId: string,
    featureKey: string,
    context?: { academicSession?: string | null; semester?: string | null }
  ) {
    return await entitlementService.checkUserFeatureAccess(userId, featureKey, context);
  }

  /**
   * Safe reconciliation mechanism for pending orders whose webhook was delayed or dropped.
   * Scans orders older than `olderThanMinutes` (default: 15) and verifies them directly with gateway.
   */
  async reconcilePendingOrders(olderThanMinutes = 15, maxBatch = 20): Promise<{
    reconciledCount: number;
    updatedCount: number;
    details: Array<{ reference: string; previousStatus: string; newStatus: string }>;
  }> {
    const cutoffTime = new Date(Date.now() - olderThanMinutes * 60 * 1000);

    const pendingOrders = await db
      .select()
      .from(paymentOrdersTable)
      .where(
        and(
          eq(paymentOrdersTable.status, 'PENDING'),
          lt(paymentOrdersTable.createdAt, cutoffTime)
        )
      )
      .orderBy(paymentOrdersTable.createdAt)
      .limit(maxBatch);

    logger.info(
      `[PAYMENT RECONCILIATION] Found ${pendingOrders.length} pending orders older than ${olderThanMinutes} mins.`
    );

    let updatedCount = 0;
    const details: Array<{ reference: string; previousStatus: string; newStatus: string }> = [];

    for (const order of pendingOrders) {
      try {
        const result = await this.verifyAndProcessPayment({
          reference: order.orderReference,
        });

        if (result.order && result.order.status !== 'PENDING') {
          updatedCount++;
          details.push({
            reference: order.orderReference,
            previousStatus: 'PENDING',
            newStatus: result.order.status,
          });
        }
      } catch (err: any) {
        logger.error(
          `[PAYMENT RECONCILIATION ERROR] Error reconciling order ${order.orderReference}: ${err.message}`
        );
      }
    }

    return {
      reconciledCount: pendingOrders.length,
      updatedCount,
      details,
    };
  }
}
