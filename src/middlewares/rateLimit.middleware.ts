import rateLimit from 'express-rate-limit';

/**
 * Dedicated rate limiter for sensitive OTP and verification requests.
 * Prevents OTP spam, Brevo credit exhaustion, and inbox flooding.
 * Allows 10 requests per 15-minute window per IP.
 */
export const otpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many verification code requests from this network. Please wait a few minutes before trying again.',
  },
});

/**
 * Rate limiter for credential-based authentication endpoints.
 * Protects against brute-force login and account abuse.
 * Allows 30 requests per 15-minute window per IP.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many authentication attempts from this network. Please try again later.',
  },
});

/**
 * Strict rate limiter for administrative login to defend against brute force attempts.
 * Allows 10 requests per 15-minute window per IP.
 */
export const adminLoginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many admin authentication attempts. Please wait 15 minutes before trying again.',
  },
});

/**
 * Rate limiter for admin broadcast notifications to prevent accidental spam / flooding.
 * Allows 10 broadcasts per 10-minute window per IP.
 */
export const broadcastRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many broadcast notification dispatches. Please wait before broadcasting again.',
  },
});

/**
 * Rate limiter for support tickets and messaging.
 * Allows 60 requests per minute per IP.
 */
export const supportMessageRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many support messages sent. Please slow down.',
  },
});

/**
 * Rate limiter for support attachment uploads.
 * Allows 20 uploads per 15-minute window per IP.
 */
export const attachmentUploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'fail',
    message: 'Too many attachment uploads. Please wait before uploading more files.',
  },
});
