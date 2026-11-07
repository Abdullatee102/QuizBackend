/**
 * BB-05B: Payment API Routes
 * Brain Buzz — Core Payment Infrastructure
 */

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { paymentController } from '../controllers/payment.controller.js';
import {
  initializePaymentSchema,
  orderReferenceParamSchema,
  listOrdersQuerySchema,
  reconcileOrdersSchema,
} from '../schemas/payment.schemas.js';

const router = Router();

// =====================================================
// 1. PUBLIC / INCOMING WEBHOOKS & PRICING CATALOG
// =====================================================

// Authoritative pricing catalog and available products
router.get('/products', paymentController.getProducts);

// Paystack webhook ingestion endpoint (HMAC signature validated via rawBody)
router.post('/webhook', paymentController.handleWebhook);

// =====================================================
// 2. AUTHENTICATED STUDENT PAYMENT & LEDGER ENDPOINTS
// =====================================================

// Initialize order with server-controlled pricing (students cannot specify amounts)
router.post(
  '/initialize',
  protect,
  validate(initializePaymentSchema),
  paymentController.initializePayment
);

// Verify payment status with gateway and provision entitlement atomically
router.post(
  '/verify/:reference',
  protect,
  validate(orderReferenceParamSchema),
  paymentController.verifyPayment
);

// List student's own payment orders with pagination and filtering
router.get(
  '/orders',
  protect,
  validate(listOrdersQuerySchema),
  paymentController.listUserOrders
);

// Get specific order details and associated entitlement (IDOR protected)
router.get(
  '/orders/:reference',
  protect,
  validate(orderReferenceParamSchema),
  paymentController.getOrderDetails
);

// Get student's active provisioned entitlements
router.get(
  '/entitlements',
  protect,
  paymentController.getUserEntitlements
);

// =====================================================
// 3. ADMINISTRATIVE RECONCILIATION
// =====================================================

// Manually reconcile pending orders against payment gateway
router.post(
  '/reconcile',
  protect,
  validate(reconcileOrdersSchema),
  paymentController.reconcilePendingOrders
);

export default router;
