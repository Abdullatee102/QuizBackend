/**
 * BB-05B & BB-05C: Payment API Routes
 * Brain Buzz — Core Payment Infrastructure & Entitlement Management
 */

import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { protectAdmin } from '../middlewares/adminAuth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { paymentController } from '../controllers/payment.controller.js';
import {
  initializePaymentSchema,
  orderReferenceParamSchema,
  listOrdersQuerySchema,
  reconcileOrdersSchema,
  checkFeatureParamSchema,
  createPaymentProductSchema,
  updatePaymentProductSchema,
  manualEntitlementAdjustmentSchema,
  adminOrdersQuerySchema,
} from '../schemas/payment.schemas.js';

const router = Router();

// =====================================================
// 1. PUBLIC / INCOMING WEBHOOKS & PRICING CATALOG
// =====================================================

// Authoritative pricing catalog and available products
router.get('/products', paymentController.getProducts);

// Paystack payment redirect callback endpoint (GET and POST support)
router.get('/callback', paymentController.handleCallback);
router.post('/callback', paymentController.handleCallback);

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

// Get student's full historical audit of entitlements (BB-05C)
router.get(
  '/entitlements/history',
  protect,
  paymentController.getEntitlementHistory
);

// Check if student currently holds active access to a feature (BB-05C)
router.get(
  '/entitlements/check/:featureKey',
  protect,
  validate(checkFeatureParamSchema),
  paymentController.checkFeatureAccess
);

// =====================================================
// 3. ADMINISTRATIVE PRODUCT & ENTITLEMENT MANAGEMENT (BB-05C)
// =====================================================

// Administrative product catalogue listing (all products including inactive/test)
router.get(
  '/admin/products',
  protectAdmin as any,
  paymentController.adminGetProducts
);

// Create new product in server catalogue
router.post(
  '/admin/products',
  protectAdmin as any,
  validate(createPaymentProductSchema),
  paymentController.adminCreateProduct
);

// Update product configuration (pricing, status, benefits)
router.patch(
  '/admin/products/:id',
  protectAdmin as any,
  validate(updatePaymentProductSchema),
  paymentController.adminUpdateProduct
);

// Audited manual entitlement adjustment (grant/revoke)
router.post(
  '/admin/entitlements/manual',
  protectAdmin as any,
  validate(manualEntitlementAdjustmentSchema),
  paymentController.adminManualAdjustEntitlement
);

// List all student payment orders across the platform
router.get(
  '/admin/orders',
  protectAdmin as any,
  validate(adminOrdersQuerySchema),
  paymentController.adminListAllOrders
);

// Manually reconcile pending orders against payment gateway
router.post(
  '/reconcile',
  protectAdmin as any,
  validate(reconcileOrdersSchema),
  paymentController.reconcilePendingOrders
);

export default router;
