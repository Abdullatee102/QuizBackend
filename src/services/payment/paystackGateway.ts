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
   * Supports both legacy Paystack HMAC-SHA512 (via PAYSTACK_SECRET_KEY)
   * and the newer Paystack-Signature mechanism (via PAYSTACK_WEBHOOK_SECRET if configured).
   * Utilizes timingSafeEqual to prevent timing attacks.
   */
  verifyWebhookSignature(rawBody: string | Buffer, signature: string): boolean {
    const signingKey = this.secretKey || process.env.PAYSTACK_WEBHOOK_SECRET || '';
    if (!signingKey || !signature) {
      logger.warn('[PAYSTACK WEBHOOK] Missing signing key or signature header for verification.');
      return false;
    }

    try {
      // Check for newer Paystack-Signature format (e.g. t=1612345678,v1=abcdef...)
      if (signature.includes('t=') && signature.includes('v1=')) {
        const timestampMatch = signature.match(/t=([0-9]+)/);
        const hashMatch = signature.match(/v1=([a-fA-F0-9]+)/);

        const timestamp = timestampMatch?.[1];
        const receivedHash = hashMatch?.[1];

        if (!timestamp || !receivedHash) {
          logger.warn('[PAYSTACK WEBHOOK] Malformed timestamped signature header components.');
          return false;
        }

        // Optional timestamp replay prevention (reject if older than 10 minutes)
        const eventTime = parseInt(timestamp, 10);
        const currentTime = Math.floor(Date.now() / 1000);
        if (Math.abs(currentTime - eventTime) > 600) {
          logger.warn(`[PAYSTACK WEBHOOK] Signature timestamp drifted beyond 600 seconds: ${eventTime} vs ${currentTime}`);
          return false;
        }

        const payloadToSign = `${timestamp}.${typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8')}`;
        const hmac = crypto.createHmac('sha512', signingKey);
        const computedHash = hmac.update(payloadToSign).digest('hex');

        const computedBuffer = Buffer.from(computedHash, 'hex');
        const signatureBuffer = Buffer.from(receivedHash, 'hex');

        if (computedBuffer.length !== signatureBuffer.length) {
          return false;
        }

        return crypto.timingSafeEqual(computedBuffer, signatureBuffer);
      }

      // Standard legacy HMAC-SHA512 hex signature verification
      const hmac = crypto.createHmac('sha512', signingKey);
      const computedHash = hmac.update(rawBody).digest('hex');

      const computedBuffer = Buffer.from(computedHash, 'hex');
      const signatureBuffer = Buffer.from(signature.trim(), 'hex');

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
