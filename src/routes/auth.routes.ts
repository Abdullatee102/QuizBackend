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
  deleteAccount,
  submitQuizHistory,
  getLeaderboard,
  getQuizHistory,
  changePassword,
  getAchievements,
  unlockAchievement,
  getRecommendedCourses,
} from '../controllers/auth.controller.js';

import {
  getFacultiesList,
  getDepartmentsList,
  getCoursesList,
  getQuestionsByCourseId,
  getQuestionsByCategory,
} from '../controllers/quiz.controller.js';

import { validate } from '../middlewares/validate.middleware.js';

import {
  protect,
  type AuthenticatedRequest,
} from '../middlewares/auth.middleware.js';

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
  unlockAchievementSchema,
  deleteAccountSchema,
} from '../schemas/auth.schemas.js';

import type { Response } from 'express';

const router = Router();

// =====================================================
// AUTHENTICATION & ACCOUNT ROUTES
// =====================================================

router.post(
  '/signup',
  validate(signUpSchema),
  signUp
);

router.post(
  '/login',
  validate(loginSchema),
  login
);

router.post(
  '/google',
  googleAuth
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  refreshToken
);

router.post(
  '/send-otp',
  validate(sendOtpSchema),
  sendOtp
);

router.post(
  '/verify-otp',
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  '/forgot-password',
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  '/reset-password',
  validate(resetPasswordSchema),
  resetPassword
);

router.post(
  '/change-password',
  protect,
  validate(changePasswordSchema),
  changePassword
);

router.post(
  '/logout',
  protect,
  logout
);

// =====================================================
// DELETE ACCOUNT
// =====================================================

router.delete(
  '/account',
  protect,
  (req, res, next) => {
    console.log('====================================');
    console.log('[DELETE ACCOUNT REQUEST]');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers content-type:', req.headers['content-type']);
    console.log('Body:', req.body);
    console.log('====================================');

    next();
  },
  validate(deleteAccountSchema),
  deleteAccount
);

// =====================================================
// STATIC SUB-RESOURCE & PROFILE ROUTES
// =====================================================

router.get(
  '/me',
  protect,
  (
    req: AuthenticatedRequest,
    res: Response
  ): void => {

    res.status(200).json({
      status: 'success',
      message:
        'Token verified successfully! Access granted.',
      user: req.user,
    });
  }
);

router.get(
  '/profile',
  protect,
  getProfile
);

router.patch(
  '/profile',
  protect,
  validate(updateProfileSchema),
  updateProfile
);

router.get(
  '/recommended-courses',
  protect,
  getRecommendedCourses
);

// =====================================================
// QUIZ HISTORY
// =====================================================

router.post(
  '/quiz-history',
  protect,
  validate(submitQuizHistorySchema),
  submitQuizHistory
);

router.get(
  '/quiz-history',
  protect,
  getQuizHistory
);

// =====================================================
// ACHIEVEMENTS
// =====================================================

router.get(
  '/achievements',
  protect,
  getAchievements
);

router.post(
  '/achievements/unlock',
  protect,
  validate(unlockAchievementSchema),
  unlockAchievement
);

// =====================================================
// LEADERBOARD
// =====================================================

router.get(
  '/leaderboard',
  protect,
  getLeaderboard
);

// =====================================================
// HIERARCHICAL QUIZ ROUTES
// =====================================================

router.get(
  '/faculties',
  protect,
  getFacultiesList
);

router.get(
  '/faculties/:facultyId/departments',
  protect,
  getDepartmentsList
);

router.get(
  '/departments/:departmentId/courses',
  protect,
  getCoursesList
);

router.get(
  '/courses/:courseId/questions',
  protect,
  getQuestionsByCourseId
);

// =====================================================
// LEGACY BACKWARD COMPATIBILITY
// =====================================================

router.get(
  '/:categoryId',
  protect,
  getQuestionsByCategory
);

export default router;