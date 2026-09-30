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
