import { Router } from 'express';
import { sendOtp, verifyOtp, signup, login, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protect, type AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { 
  sendOtpSchema, 
  verifyOtpSchema, 
  signupSchema, 
  loginSchema, 
  forgotPasswordSchema,
  resetPasswordSchema 
} from '../schemas/auth.schemas.js';
import type { Response } from 'express';

const router = Router();

router.post('/signup', validate(signupSchema), signup);

router.post('/login', validate(loginSchema), login);

router.post('/send-otp', validate(sendOtpSchema), sendOtp);

router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);

// Route: POST /api/auth/forgot-password
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);

router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

// Route: GET /api/auth/me (Protected Route to test JWT middleware)
router.get('/me', protect, (req: AuthenticatedRequest, res: Response): void => {
  res.status(200).json({
    status: 'success',
    message: 'Token verified successfully! Access granted.',
    user: req.user,
  });
});

export default router;