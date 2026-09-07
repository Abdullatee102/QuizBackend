import { Router } from 'express';
import { 
  sendOtp, 
  verifyOtp, 
  signUp, 
  login, 
  forgotPassword, 
  resetPassword, 
  googleAuth, 
  refreshToken, 
  logout, 
  getProfile, 
  updateProfile,
  submitQuizHistory,
  getLeaderboard,
  getQuizHistory,
  changePassword,
  getAchievements,
  unlockAchievement
} from '../controllers/auth.controller.js';
import { getQuestionsByCategory } from '../controllers/quiz.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protect, type AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { 
  sendOtpSchema, 
  verifyOtpSchema, 
  signUpSchema, 
  loginSchema, 
  forgotPasswordSchema,
  resetPasswordSchema,
  refreshTokenSchema,
  submitQuizHistorySchema,
  updateProfileSchema,
  changePasswordSchema,
  unlockAchievementSchema
} from '../schemas/auth.schemas.js';
import type { Response } from 'express';

const router = Router();

// --- AUTHENTICATION & ACCOUNT ROUTES ---
router.post('/signup', validate(signUpSchema), signUp);
router.post('/login', validate(loginSchema), login);
router.post('/google', googleAuth);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);
router.post('/send-otp', validate(sendOtpSchema), sendOtp);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.post('/change-password', protect, validate(changePasswordSchema), changePassword);
router.post('/logout', protect, logout);

// --- STATIC SUB-RESOURCE & PROFILE ROUTES (Must be placed before dynamic routes) ---
router.get('/me', protect, (req: AuthenticatedRequest, res: Response): void => {
  res.status(200).json({
    status: 'success',
    message: 'Token verified successfully! Access granted.',
    user: req.user,
  });
});

router.get('/profile', protect, getProfile);
router.patch('/profile', protect, validate(updateProfileSchema), updateProfile);

router.post('/quiz-history', protect, validate(submitQuizHistorySchema), submitQuizHistory);
router.get('/quiz-history', protect, getQuizHistory);

router.get('/achievements', protect, getAchievements);
router.post('/achievements/unlock', protect, validate(unlockAchievementSchema), unlockAchievement);

router.get('/leaderboard', protect, getLeaderboard);

// --- DYNAMIC PARAMETER ROUTES (Must be placed last to avoid shadowing) ---
router.get('/:categoryId', protect, getQuestionsByCategory);

export default router;