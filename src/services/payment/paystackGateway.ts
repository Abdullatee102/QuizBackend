/**
 * BB-05B: Paystack Payment Gateway Adapter
 * Brain Buzz — Core Payment Infrastructure
 * 
 * Official Paystack API Integration (Test Environment Exclusively)
 * Documentation: https://paystack.com/docs/api/
 */

import axios, { type AxiosInstance } from 'axios';
import crypto from 'node:crypto';
import logger from '../../config/logger.js';
import type {
  IPaymentGateway,
  PaymentInitParams,
  PaymentInitResult,
  PaymentVerifyResult,
  NormalizedPaymentStatus,
} from './types.js';

export interface PaystackGatewayConfig {
  secretKey?: string | undefined;
  baseUrl?: string | undefined;
  timeoutMs?: number | undefined;
}

export class PaystackGateway implements IPaymentGateway {
  readonly gatewayName = 'PAYSTACK';
  private readonly secretKey: string;
  private readonly client: AxiosInstance;

  constructor(config?: PaystackGatewayConfig) {
    this.secretKey = config?.secretKey || process.env.PAYSTACK_SECRET_KEY || '';
    const baseURL = config?.baseUrl || 'https://api.paystack.co';
    const timeout = config?.timeoutMs || 15000;

    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private getAuthHeaders(): Record<string, string> {
    if (!this.secretKey) {
      throw new Error('[PAYSTACK CONFIG ERROR] Paystack secret key is not configured.');
    }
    return {
      Authorization: `Bearer ${this.secretKey}`,
    };
  }

  /**
   * Initialize a payment transaction with Paystack.
   */
  async initializePayment(params: PaymentInitParams): Promise<PaymentInitResult> {
    try {
      if (!this.secretKey) {
        logger.error('[PAYSTACK ERROR] Secret key missing during payment initialization.');
        return {
          success: false,
          reference: params.reference,
          gateway: this.gatewayName,
          error: 'Payment gateway configuration missing. Test keys required.',
        };
      }

      const payload: Record<string, any> = {
        email: params.email,
        amount: Math.round(params.amount), // Integer minor currency units (kobo)
        reference: params.reference,
        currency: params.currency || 'NGN',
      };

      if (params.callbackUrl) {
        payload.callback_url = params.callbackUrl;
      }

      if (params.metadata) {
        payload.metadata = params.metadata;
      }

      if (params.channels && params.channels.length > 0) {
        payload.channels = params.channels;
      }

      logger.info(
        `[PAYSTACK INIT] Initializing transaction for reference=${params.reference}, amount=${payload.amount} ${payload.currency}`
      );

      const response = await this.client.post('/transaction/initialize', payload, {
        headers: this.getAuthHeaders(),
      });

      const responseData = response.data;
      if (responseData?.status && responseData?.data) {
        return {
          success: true,
          reference: responseData.data.reference || params.reference,
          authorizationUrl: responseData.data.authorization_url,
          accessCode: responseData.data.access_code,
          gateway: this.gatewayName,
          rawResponse: {
            reference: responseData.data.reference,
            accessCode: responseData.data.access_code,
          },
        };
      }

      logger.warn(
        `[PAYSTACK INIT REJECTED] Paystack rejected initialization: ${responseData?.message || 'Unknown reason'}`
      );
      return {
        success: false,
        reference: params.reference,
        gateway: this.gatewayName,
        error: responseData?.message || 'Gateway initialization rejected',
        rawResponse: responseData,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Payment initialization network failure';
      logger.error(
        `[PAYSTACK INIT ERROR] Failed initializing transaction ${params.reference}: ${errorMessage}`
      );

      return {
        success: false,
        reference: params.reference,
        gateway: this.gatewayName,
        error: errorMessage,
      };
    }
  }

  /**
   * Verify transaction status directly with Paystack using the payment reference.
   */
  async verifyPayment(reference: string): Promise<PaymentVerifyResult> {
    try {
      if (!this.secretKey) {
        logger.error('[PAYSTACK ERROR] Secret key missing during payment verification.');
        return {
          success: false,
          status: 'FAILED',
          reference,
          amount: 0,
          currency: 'NGN',
          error: 'Payment gateway configuration missing. Test keys required.',
        };
      }

      logger.info(`[PAYSTACK VERIFY] Verifying transaction reference=${reference}`);

      const response = await this.client.get(
        `/transaction/verify/${encodeURIComponent(reference)}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      const responseData = response.data;
      if (!responseData?.status || !responseData?.data) {
        logger.warn(
          `[PAYSTACK VERIFY UNKNOWN] Verification failed or invalid structure for reference=${reference}`
        );
        return {
          success: false,
          status: 'FAILED',
          reference,
          amount: 0,
          currency: 'NGN',
          error: responseData?.message || 'Invalid gateway verification response',
        };
      }

      const txData = responseData.data;
      const normalizedStatus = this.normalizeStatus(txData.status);

      return {
        success: normalizedStatus === 'SUCCESS',
        status: normalizedStatus,
        reference: txData.reference || reference,
        gatewayTransactionId: txData.id ? String(txData.id) : undefined,
        amount: typeof txData.amount === 'number' ? txData.amount : 0,
        currency: (txData.currency || 'NGN').toUpperCase(),
        channel: txData.channel,
        paidAt: txData.paid_at ? new Date(txData.paid_at) : undefined,
        gatewayResponse: txData.gateway_response,
        customerEmail: txData.customer?.email,
        metadata: txData.metadata,
        rawResponse: {
          id: txData.id,
          status: txData.status,
          reference: txData.reference,
          amount: txData.amount,
          currency: txData.currency,
          channel: txData.channel,
          gateway_response: txData.gateway_response,
          paid_at: txData.paid_at,
        },
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Payment verification network failure';
      logger.error(
        `[PAYSTACK VERIFY ERROR] Failed verifying transaction ${reference}: ${errorMessage}`
      );

      return {
        success: false,
        status: 'FAILED',
        reference,
        amount: 0,
        currency: 'NGN',
        error: errorMessage,
      };
    }
  }

  /**
   * Cryptographically verify the webhook payload signature using HMAC-SHA512.
   * Utilizes timingSafeEqual to prevent timing attacks.
   */
  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    if (!this.secretKey || !signature) {
      logger.warn('[PAYSTACK WEBHOOK] Missing secret key or signature header for verification.');
      return false;
    }

    try {
      const hmac = crypto.createHmac('sha512', this.secretKey);
      const computedHash = hmac.update(rawBody).digest('hex');

      const computedBuffer = Buffer.from(computedHash, 'hex');
      const signatureBuffer = Buffer.from(signature, 'hex');

      if (computedBuffer.length !== signatureBuffer.length) {
        return false;
      }

      return crypto.timingSafeEqual(computedBuffer, signatureBuffer);
    } catch (err: any) {
      logger.error(`[PAYSTACK WEBHOOK ERROR] Signature comparison failed: ${err.message}`);
      return false;
    }
  }

  /**
   * Normalize Paystack string status to unified system status.
   */
  private normalizeStatus(paystackStatus: string): NormalizedPaymentStatus {
    const s = (paystackStatus || '').toLowerCase().trim();
    switch (s) {
      case 'success':
        return 'SUCCESS';
      case 'failed':
        return 'FAILED';
      case 'abandoned':
        return 'ABANDONED';
      case 'reversed':
        return 'REVERSED';
      default:
        return 'PENDING';
    }
  }
}
