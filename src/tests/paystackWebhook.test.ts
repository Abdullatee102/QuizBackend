import { describe, it } from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { PaystackGateway } from '../services/payment/paystackGateway.js';

describe('Paystack Webhook & Callback Verification Tests', () => {
  const testSecretKey = 'sk_test_mock_secret_key_778899aabbcc';
  const gateway = new PaystackGateway({ secretKey: testSecretKey });

  it('should verify valid HMAC-SHA512 webhook signature', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-123' } });
    const signature = crypto.createHmac('sha512', testSecretKey).update(payload).digest('hex');

    const isValid = gateway.verifyWebhookSignature(payload, signature);
    assert.strictEqual(isValid, true, 'Valid signature must pass verification');
  });

  it('should reject tampered payload or signature', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-123' } });
    const tamperedPayload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-TAMPERED' } });
    const signature = crypto.createHmac('sha512', testSecretKey).update(payload).digest('hex');

    const isValid = gateway.verifyWebhookSignature(tamperedPayload, signature);
    assert.strictEqual(isValid, false, 'Tampered payload must be rejected');
  });

  it('should reject empty or missing signature', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-123' } });
    assert.strictEqual(gateway.verifyWebhookSignature(payload, ''), false);
  });

  it('should support timestamped Paystack-Signature format (t=timestamp,v1=hash)', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-TS' } });
    const currentTimestamp = Math.floor(Date.now() / 1000).toString();
    const payloadToSign = `${currentTimestamp}.${payload}`;
    const hash = crypto.createHmac('sha512', testSecretKey).update(payloadToSign).digest('hex');
    const timestampedHeader = `t=${currentTimestamp},v1=${hash}`;

    const isValid = gateway.verifyWebhookSignature(payload, timestampedHeader);
    assert.strictEqual(isValid, true, 'Timestamped signature format must pass verification');
  });

  it('should reject expired timestamped signature (replay attack protection)', () => {
    const payload = JSON.stringify({ event: 'charge.success', data: { reference: 'BB-REF-OLD' } });
    const expiredTimestamp = (Math.floor(Date.now() / 1000) - 1000).toString(); // >10 minutes old
    const payloadToSign = `${expiredTimestamp}.${payload}`;
    const hash = crypto.createHmac('sha512', testSecretKey).update(payloadToSign).digest('hex');
    const timestampedHeader = `t=${expiredTimestamp},v1=${hash}`;

    const isValid = gateway.verifyWebhookSignature(payload, timestampedHeader);
    assert.strictEqual(isValid, false, 'Expired signature timestamp must be rejected');
  });
});
