/**
 * BB-05B: Payment Controller
 * Brain Buzz — Core Payment Infrastructure
 */

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { paymentService } from '../services/payment/index.js';
import { getAvailableProducts } from '../services/payment/products.js';
import logger from '../config/logger.js';

export const paymentController = {
  // =====================================================
  // GET AUTHORITATIVE PRODUCT CATALOG & PRICING
  // =====================================================
  getProducts: async (
    _req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const products = getAvailableProducts();
      res.status(200).json({
        status: 'success',
        data: {
          products,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] getProducts error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve available products.',
      });
    }
  },

  // =====================================================
  // INITIALIZE PAYMENT ORDER
  // =====================================================
  initializePayment: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User authentication required.',
      });
      return;
    }

    const { productId, callbackUrl, metadata } = req.body;

    try {
      const result = await paymentService.initializeOrder({
        userId: String(userId),
        productId,
        callbackUrl,
        clientMetadata: metadata,
      });

      res.status(201).json({
        status: 'success',
        message: 'Payment order initialized successfully.',
        data: {
          order: result.order,
          authorizationUrl: result.authorizationUrl,
          accessCode: result.accessCode,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] initializePayment error: ${error.message}`);

      if (
        error.message.includes('not found') ||
        error.message.includes('disabled') ||
        error.message.includes('Invalid or unrecognized') ||
        error.message.includes('email address required')
      ) {
        res.status(400).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: error.message || 'Failed to initialize payment transaction.',
      });
    }
  },

  // =====================================================
  // VERIFY & PROCESS PAYMENT
  // =====================================================
  verifyPayment: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    const role = req.user?.role;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User authentication required.',
      });
      return;
    }

    const reference = req.params.reference as string;
    if (!reference) {
      res.status(400).json({
        status: 'fail',
        message: 'Order reference parameter is required.',
      });
      return;
    }

    try {
      const result = await paymentService.verifyAndProcessPayment({
        reference,
        expectedUserId: String(userId),
        callerRole: role,
      });

      if (!result.success) {
        res.status(400).json({
          status: 'fail',
          message: result.error || 'Payment verification failed or was not successful.',
          data: {
            order: result.order,
            transaction: result.transaction,
            verified: false,
          },
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        message: 'Payment verified and entitlement successfully provisioned.',
        data: {
          order: result.order,
          transaction: result.transaction,
          entitlement: result.entitlement,
          verified: true,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] verifyPayment error: ${error.message}`);

      if (error.message.includes('Unauthorized') || error.message.includes('Security violation')) {
        res.status(403).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      if (error.message.includes('not found')) {
        res.status(404).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      if (error.message.includes('MISMATCH') || error.message.includes('currency mismatch')) {
        res.status(400).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: error.message || 'Internal error during payment verification.',
      });
    }
  },

  // =====================================================
  // GET ORDER DETAILS
  // =====================================================
  getOrderDetails: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    const role = req.user?.role;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User authentication required.',
      });
      return;
    }

    const reference = req.params.reference as string;
    if (!reference) {
      res.status(400).json({
        status: 'fail',
        message: 'Order reference parameter is required.',
      });
      return;
    }

    try {
      const orderData = await paymentService.getOrderDetails({
        referenceOrId: reference,
        userId: String(userId),
        role,
      });

      res.status(200).json({
        status: 'success',
        data: orderData,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] getOrderDetails error: ${error.message}`);

      if (error.message.includes('Access denied') || error.message.includes('permission')) {
        res.status(403).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      if (error.message.includes('not found')) {
        res.status(404).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve order details.',
      });
    }
  },

  // =====================================================
  // LIST USER ORDER HISTORY
  // =====================================================
  listUserOrders: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User authentication required.',
      });
      return;
    }

    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const status = req.query.status as string | undefined;

    try {
      const orders = await paymentService.listUserOrders({
        userId: String(userId),
        limit,
        offset,
        status,
      });

      res.status(200).json({
        status: 'success',
        data: orders,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] listUserOrders error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve order history.',
      });
    }
  },

  // =====================================================
  // GET ACTIVE USER ENTITLEMENTS
  // =====================================================
  getUserEntitlements: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User authentication required.',
      });
      return;
    }

    try {
      const entitlements = await paymentService.getUserEntitlements(String(userId));

      res.status(200).json({
        status: 'success',
        data: {
          entitlements,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] getUserEntitlements error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user entitlements.',
      });
    }
  },

  // =====================================================
  // INGEST GATEWAY WEBHOOK (PUBLIC ENDPOINT)
  // =====================================================
  handleWebhook: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const signature = (req.headers['x-paystack-signature'] || '') as string;
    const rawBody = (req as any).rawBody || (typeof req.body === 'string' ? req.body : JSON.stringify(req.body));

    try {
      const result = await paymentService.processWebhook({
        rawBody,
        signatureHeader: signature,
        payload: req.body,
      });

      if (!result.success && result.statusCode === 400) {
        res.status(400).json({
          status: 'fail',
          message: result.message,
        });
        return;
      }

      res.status(result.statusCode).json({
        status: result.success ? 'success' : 'fail',
        message: result.message,
        data: result,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] handleWebhook error: ${error.message}`);
      res.status(200).json({
        status: 'error',
        message: error.message || 'Webhook processing encountered an error.',
      });
    }
  },

  // =====================================================
  // RECONCILE PENDING ORDERS (ADMIN ONLY)
  // =====================================================
  reconcilePendingOrders: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const role = req.user?.role;
    if (role !== 'SUPER_ADMIN' && role !== 'CONTENT_ADMIN') {
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. Administrative role required for order reconciliation.',
      });
      return;
    }

    const { olderThanMinutes, maxBatch } = req.body || {};

    try {
      const result = await paymentService.reconcilePendingOrders(olderThanMinutes, maxBatch);
      res.status(200).json({
        status: 'success',
        message: `Reconciled ${result.reconciledCount} pending orders.`,
        data: result,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] reconcilePendingOrders error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to reconcile pending orders.',
      });
    }
  },
};
