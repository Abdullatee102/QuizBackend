/**
 * BB-05B & BB-05C: Payment Controller
 * Brain Buzz — Core Payment Infrastructure & Entitlement Management
 */

import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { paymentService } from '../services/payment/index.js';
import {
  getAvailableProductsAsync,
  getAllProductsAdminAsync,
  createProductAsync,
  updateProductAsync,
} from '../services/payment/products.js';
import { entitlementService } from '../services/payment/entitlementService.js';
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
      const products = await getAvailableProductsAsync();
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
        error.message.includes('email address required') ||
        error.message.includes('already holds an active')
      ) {
        res.status(400).json({
          status: 'fail',
          message: error.message,
        });
        return;
      }

      if (error.message.includes('Payment gateway configuration missing')) {
        res.status(503).json({
          status: 'fail',
          message: 'Payment gateway configuration is missing on the server. Please ensure PAYSTACK_SECRET_KEY is configured in environment variables.',
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
  // GET COMPLETE USER ENTITLEMENT HISTORY (BB-05C)
  // =====================================================
  getEntitlementHistory: async (
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
      const history = await paymentService.getUserEntitlementHistory(String(userId));

      res.status(200).json({
        status: 'success',
        data: {
          history,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] getEntitlementHistory error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve entitlement history.',
      });
    }
  },

  // =====================================================
  // CHECK SPECIFIC FEATURE ACCESS (BB-05C)
  // =====================================================
  checkFeatureAccess: async (
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

    const { featureKey } = req.params;
    const academicSession = req.query.academicSession as string | undefined;
    const semester = req.query.semester as 'harmattan' | 'rain' | undefined;

    try {
      const context: { academicSession?: string | null; semester?: string | null } = {};
      if (academicSession) context.academicSession = academicSession;
      if (semester) context.semester = semester;

      const accessResult = await paymentService.checkFeatureAccess(
        String(userId),
        featureKey as string,
        context
      );

      res.status(200).json({
        status: 'success',
        data: accessResult,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] checkFeatureAccess error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to check feature access.',
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
    const signature = (req.headers['x-paystack-signature'] || req.headers['paystack-signature'] || '') as string;
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
  // PAYSTACK PAYMENT REDIRECT CALLBACK (PUBLIC ENDPOINT)
  // =====================================================
  handleCallback: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const reference = (req.query.reference || req.query.trxref || req.body?.reference || req.body?.trxref) as string | undefined;

    if (!reference) {
      if (req.accepts('html')) {
        res.status(400).send(`
          <!DOCTYPE html>
          <html>
            <head><title>Payment Verification Error</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b;">
              <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 400px; text-align: center; border: 1px solid #e2e8f0;">
                <div style="color: #ef4444; font-size: 3rem; margin-bottom: 1rem;">&#10008;</div>
                <h2 style="margin: 0 0 0.5rem; font-size: 1.25rem;">Missing Reference</h2>
                <p style="color: #64748b; font-size: 0.875rem;">No payment reference was received in the redirect callback.</p>
              </div>
            </body>
          </html>
        `);
        return;
      }
      res.status(400).json({ status: 'fail', message: 'Missing transaction reference in callback.' });
      return;
    }

    try {
      const result = await paymentService.verifyAndProcessPayment({ reference });
      const isSuccess = result.success;

      if (req.accepts('html')) {
        res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${isSuccess ? 'Payment Successful' : 'Payment Status'}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b; }
                .card { background: white; padding: 2.5rem 2rem; border-radius: 1.25rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); max-width: 420px; width: 90%; text-align: center; border: 1px solid #e2e8f0; }
                .icon { font-size: 3.5rem; margin-bottom: 1rem; line-height: 1; }
                .success { color: #10b981; }
                .fail { color: #ef4444; }
                h1 { margin: 0 0 0.5rem; font-size: 1.35rem; font-weight: 700; }
                p { color: #64748b; font-size: 0.875rem; line-height: 1.5; margin: 0 0 1.5rem; }
                .details { background: #f1f5f9; padding: 1rem; border-radius: 0.75rem; text-align: left; font-size: 0.8125rem; margin-bottom: 1.5rem; }
                .details-row { display: flex; justify-content: space-between; margin-bottom: 0.35rem; }
                .details-row:last-child { margin-bottom: 0; }
                .details-label { color: #64748b; }
                .details-val { font-weight: 600; color: #0f172a; }
                .btn { display: inline-block; width: 100%; box-sizing: border-box; background: #4f46e5; color: white; padding: 0.75rem 1rem; border-radius: 0.75rem; text-decoration: none; font-weight: 600; font-size: 0.875rem; cursor: pointer; border: none; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="icon ${isSuccess ? 'success' : 'fail'}">${isSuccess ? '&#10004;' : '&#10008;'}</div>
                <h1>${isSuccess ? 'Payment Successful!' : 'Payment Pending or Failed'}</h1>
                <p>${isSuccess ? 'Your premium pass has been activated successfully. You can now return to Brain Buzz.' : (result.error || 'Payment status could not be verified automatically. Please return to the app to check status.')}</p>
                
                <div class="details">
                  <div class="details-row"><span class="details-label">Reference:</span><span class="details-val">${reference}</span></div>
                  <div class="details-row"><span class="details-label">Status:</span><span class="details-val">${result.order?.status || 'UNKNOWN'}</span></div>
                  ${result.order?.amount ? `<div class="details-row"><span class="details-label">Amount:</span><span class="details-val">&#8358;${(result.order.amount / 100).toLocaleString()}</span></div>` : ''}
                </div>

                <a href="brainbuzz://payment-callback?reference=${encodeURIComponent(reference)}&status=${result.order?.status || 'UNKNOWN'}" class="btn">
                  Return to Brain Buzz App
                </a>
              </div>
            </body>
          </html>
        `);
        return;
      }

      res.status(200).json({
        status: result.success ? 'success' : 'fail',
        message: result.success ? 'Payment verified successfully.' : (result.error || 'Payment verification failed.'),
        data: {
          order: result.order,
          entitlement: result.entitlement,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] handleCallback error: ${error.message}`);
      if (req.accepts('html')) {
        res.status(500).send(`
          <!DOCTYPE html>
          <html>
            <head><title>Callback Processing Error</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f8fafc; color: #1e293b;">
              <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); max-width: 400px; text-align: center; border: 1px solid #e2e8f0;">
                <div style="color: #ef4444; font-size: 3rem; margin-bottom: 1rem;">&#9888;</div>
                <h2 style="margin: 0 0 0.5rem; font-size: 1.25rem;">Verification Error</h2>
                <p style="color: #64748b; font-size: 0.875rem;">${error.message || 'An error occurred while confirming payment.'}</p>
              </div>
            </body>
          </html>
        `);
        return;
      }
      res.status(500).json({ status: 'error', message: error.message || 'Failed to process payment callback.' });
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

  // =====================================================
  // ADMIN: GET ALL PRODUCTS (INCLUDING INACTIVE & TEST)
  // =====================================================
  adminGetProducts: async (
    _req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const products = await getAllProductsAdminAsync();
      res.status(200).json({
        status: 'success',
        data: {
          products,
        },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] adminGetProducts error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve administrative product list.',
      });
    }
  },

  // =====================================================
  // ADMIN: CREATE PRODUCT IN CATALOGUE (BB-05C)
  // =====================================================
  adminCreateProduct: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const product = await createProductAsync(req.body);
      res.status(201).json({
        status: 'success',
        message: `Product ${product.id} created successfully.`,
        data: { product },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] adminCreateProduct error: ${error.message}`);
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Failed to create payment product.',
      });
    }
  },

  // =====================================================
  // ADMIN: UPDATE PRODUCT IN CATALOGUE (BB-05C)
  // =====================================================
  adminUpdateProduct: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const updated = await updateProductAsync(id as string, req.body);
      if (!updated) {
        res.status(404).json({
          status: 'fail',
          message: `Product "${id}" not found.`,
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        message: `Product ${id} updated successfully.`,
        data: { product: updated },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] adminUpdateProduct error: ${error.message}`);
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Failed to update payment product.',
      });
    }
  },

  // =====================================================
  // ADMIN: MANUAL ENTITLEMENT ADJUSTMENT (BB-05C)
  // =====================================================
  adminManualAdjustEntitlement: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const adminId = req.user?.id || req.user?.userId;
    if (!adminId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Admin session required.',
      });
      return;
    }

    const { userId, featureKey, action, reason, durationDays, productId, academicSession, semester } = req.body;

    try {
      const entitlement = await entitlementService.manualAdjustEntitlementAdmin({
        adminUserId: String(adminId),
        targetUserId: userId,
        featureKey,
        action,
        reason,
        durationDays,
        productId,
        academicSession,
        semester,
      });

      res.status(200).json({
        status: 'success',
        message: `Entitlement ${action.toLowerCase()}ed successfully for user.`,
        data: { entitlement },
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] adminManualAdjustEntitlement error: ${error.message}`);
      res.status(400).json({
        status: 'fail',
        message: error.message || 'Failed to perform manual entitlement adjustment.',
      });
    }
  },

  // =====================================================
  // ADMIN: LIST ALL ORDERS (BB-05C)
  // =====================================================
  adminListAllOrders: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const offset = req.query.offset ? parseInt(req.query.offset as string, 10) : 0;
    const status = req.query.status as string | undefined;
    const userId = req.query.userId as string | undefined;
    const productId = req.query.productId as string | undefined;

    try {
      const params: { limit?: number; offset?: number; status?: string; userId?: string; productId?: string } = {
        limit,
        offset,
      };
      if (status) params.status = status;
      if (userId) params.userId = userId;
      if (productId) params.productId = productId;

      const result = await paymentService.listAllOrdersAdmin(params);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      logger.error(`[PAYMENT CONTROLLER] adminListAllOrders error: ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve administrative order history.',
      });
    }
  },
};
