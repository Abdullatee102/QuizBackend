/**
 * BB-05B: Payment Module Index
 * Brain Buzz — Core Payment Infrastructure
 */

import { PaystackGateway } from './paystackGateway.js';
import { PaymentService } from './paymentService.js';

export * from './types.js';
export * from './products.js';
export * from './paystackGateway.js';
export * from './paymentService.js';

// Default singleton instance wired to the Paystack Gateway adapter
export const paystackGateway = new PaystackGateway();
export const paymentService = new PaymentService(paystackGateway);

export default paymentService;
