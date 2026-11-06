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
  updateLeaderboardPrivacy,
} from '../controllers/auth.controller.js';

import {
  getFacultiesList,
  getDepartmentsList,
  getCoursesList,
  getQuestionsByCourseId,
  getQuestionsByCategory,
  getMixedQuestionsHandler,
  getReviewQuestionsHandler,
} from '../controllers/quiz.controller.js';

import {
  getStudentEnrollmentsHandler,
  getStudentEligibleOfferingsHandler,
  getAvailableCourseOfferingsHandler,
  checkOfferingEligibilityHandler,
  enrollInOfferingHandler,
  unenrollFromOfferingHandler,
} from '../controllers/student/enrollments.controller.js';
import {
  getStudentOfferingAssessmentsHandler,
  getStudentAssessmentDetailsHandler,
} from '../controllers/student/assessments.controller.js';
import {
  getAvailableAssessmentsHandler,
  getAssessmentInstructionsHandler,
  startOrResumeAttemptHandler,
  saveAnswersHandler,
  heartbeatHandler,
  submitAttemptHandler,
  getStudentPublishedResultHandler,
} from '../controllers/student/assessmentAttempts.controller.js';
import { getStudentSelfAttendanceHandler } from '../controllers/student/attendance.controller.js';
import {
  listStudentMaterialsHandler,
  downloadStudentMaterialHandler,
} from '../controllers/student/materials.controller.js';
import { listStudentAnnouncementsHandler } from '../controllers/student/announcements.controller.js';
import {
  listStudentDiscussionsHandler,
  createStudentDiscussionHandler,
  getStudentDiscussionDetailsHandler,
  replyStudentDiscussionHandler,
  deleteStudentDiscussionHandler,
} from '../controllers/student/discussions.controller.js';
import {
  saveAnswersSchema,
  submitAttemptSchema,
} from '../schemas/assessmentAttempt.schemas.js';
import {
  createDiscussionSchema,
  replyDiscussionSchema,
} from '../schemas/discussion.schemas.js';


import { validate } from '../middlewares/validate.middleware.js';
import {
  otpRateLimiter,
  authRateLimiter,
} from '../middlewares/rateLimit.middleware.js';

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
  updateLeaderboardPrivacySchema,
} from '../schemas/auth.schemas.js';

import type { Response } from 'express';

const router = Router();

// =====================================================
// AUTHENTICATION & ACCOUNT ROUTES
// =====================================================

router.post(
  '/signup',
  authRateLimiter,
  validate(signUpSchema),
  signUp
);

router.post(
  '/login',
  authRateLimiter,
  validate(loginSchema),
  login
);

router.post(
  '/google',
  authRateLimiter,
  googleAuth
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  refreshToken
);

router.post(
  '/send-otp',
  otpRateLimiter,
  validate(sendOtpSchema),
  sendOtp
);

router.post(
  '/verify-otp',
  authRateLimiter,
  validate(verifyOtpSchema),
  verifyOtp
);

router.post(
  '/forgot-password',
  otpRateLimiter,
  validate(forgotPasswordSchema),
  forgotPassword
);

router.post(
  '/reset-password',
  authRateLimiter,
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

router.patch(
  '/profile/leaderboard-privacy',
  protect,
  validate(updateLeaderboardPrivacySchema),
  updateLeaderboardPrivacy
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

router.get(
  '/courses/:courseId/review-questions',
  protect,
  getReviewQuestionsHandler
);

router.get(
  '/questions/mixed',
  protect,
  getMixedQuestionsHandler
);

router.get(
  '/questions/review',
  protect,
  getReviewQuestionsHandler
);


// =====================================================
// ACADEMIC ENROLMENTS & ELIGIBILITY (BB-07F.2)
// =====================================================

router.get('/enrollments', protect, getStudentEnrollmentsHandler);
router.post('/enrollments', protect, enrollInOfferingHandler);
router.get('/offerings/available', protect, getAvailableCourseOfferingsHandler);
router.get('/offerings/eligible', protect, getStudentEligibleOfferingsHandler);
router.post('/offerings/:offeringId/enroll', protect, enrollInOfferingHandler);
router.delete('/offerings/:offeringId/enroll', protect, unenrollFromOfferingHandler);
router.get('/offerings/:offeringId/eligibility', protect, checkOfferingEligibilityHandler);

// =====================================================
// =====================================================
// ACADEMIC ASSESSMENTS DISCOVERY & ATTEMPTS (BB-07F.4 & BB-07F.5)
// =====================================================

router.get('/offerings/:offeringId/assessments', protect, getStudentOfferingAssessmentsHandler);
router.get('/assessments/available', protect, getAvailableAssessmentsHandler);
router.get('/assessments/:assessmentId/instructions', protect, getAssessmentInstructionsHandler);
router.get('/assessments/:assessmentId', protect, getStudentAssessmentDetailsHandler);
router.post('/assessments/:assessmentId/attempts', protect, startOrResumeAttemptHandler);
router.put(
  '/assessments/:assessmentId/attempts/:attemptId/answers',
  protect,
  validate(saveAnswersSchema),
  saveAnswersHandler
);
router.post(
  '/assessments/:assessmentId/attempts/:attemptId/heartbeat',
  protect,
  heartbeatHandler
);
router.post(
  '/assessments/:assessmentId/attempts/:attemptId/submit',
  protect,
  validate(submitAttemptSchema),
  submitAttemptHandler
);
router.get(
  '/assessments/:assessmentId/results',
  protect,
  getStudentPublishedResultHandler
);

// Student Attendance (BB-07G)
router.get(
  '/offerings/:offeringId/attendance',
  protect,
  getStudentSelfAttendanceHandler
);

// Course Materials (BB-07H)
router.get(
  '/offerings/:offeringId/materials',
  protect,
  listStudentMaterialsHandler
);
router.get(
  '/offerings/:offeringId/materials/:materialId/download',
  protect,
  downloadStudentMaterialHandler
);

// Course Announcements (BB-07I)
router.get(
  '/offerings/:offeringId/announcements',
  protect,
  listStudentAnnouncementsHandler
);

// Course Discussions (BB-07I)
router.get(
  '/offerings/:offeringId/discussions',
  protect,
  listStudentDiscussionsHandler
);
router.post(
  '/offerings/:offeringId/discussions',
  protect,
  validate(createDiscussionSchema),
  createStudentDiscussionHandler
);
router.get(
  '/offerings/:offeringId/discussions/:discussionId',
  protect,
  getStudentDiscussionDetailsHandler
);
router.post(
  '/offerings/:offeringId/discussions/:discussionId/replies',
  protect,
  validate(replyDiscussionSchema),
  replyStudentDiscussionHandler
);
router.delete(
  '/offerings/:offeringId/discussions/:discussionId',
  protect,
  deleteStudentDiscussionHandler
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