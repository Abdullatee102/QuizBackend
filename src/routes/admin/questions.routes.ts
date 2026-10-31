import { Router } from 'express';
import {
  listQuestions,
  getQuestionDetails,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../../controllers/admin/questions.controller.js';
import {
  getAdminReviewQueueHandler,
  getAdminQuestionDetailsHandler,
  beginQuestionReviewHandler,
  requestQuestionRevisionHandler,
  rejectQuestionHandler,
  approveQuestionHandler,
  publishQuestionHandler,
  archiveQuestionHandler,
} from '../../controllers/admin/questionWorkflow.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  requestRevisionSchema,
  rejectQuestionSchema,
  publishQuestionSchema,
  listQuestionsQuerySchema,
} from '../../schemas/questionWorkflow.schemas.js';

const router = Router();

router.use(protectAdmin);

// Review queue (MUST be before /:questionId to prevent param clash)
router.get(
  '/review-queue',
  requirePermission(PERMISSIONS.QUESTIONS_REVIEW),
  validate(listQuestionsQuerySchema),
  getAdminReviewQueueHandler
);

// Review actions on specific question
router.get(
  '/:questionId/review',
  requirePermission(PERMISSIONS.QUESTIONS_REVIEW),
  getAdminQuestionDetailsHandler
);

router.post(
  '/:questionId/begin-review',
  requirePermission(PERMISSIONS.QUESTIONS_REVIEW),
  beginQuestionReviewHandler
);

router.post(
  '/:questionId/request-revision',
  requirePermission(PERMISSIONS.QUESTIONS_APPROVE),
  validate(requestRevisionSchema),
  requestQuestionRevisionHandler
);

router.post(
  '/:questionId/reject',
  requirePermission(PERMISSIONS.QUESTIONS_APPROVE),
  validate(rejectQuestionSchema),
  rejectQuestionHandler
);

router.post(
  '/:questionId/approve',
  requirePermission(PERMISSIONS.QUESTIONS_APPROVE),
  approveQuestionHandler
);

router.post(
  '/:questionId/publish',
  requirePermission(PERMISSIONS.QUESTIONS_PUBLISH),
  validate(publishQuestionSchema),
  publishQuestionHandler
);

router.post(
  '/:questionId/archive',
  requirePermission(PERMISSIONS.QUESTIONS_PUBLISH),
  archiveQuestionHandler
);

// Standard catalogue question CRUD
router.get('/', requirePermission(PERMISSIONS.QUESTIONS_READ), listQuestions);
router.get('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_READ), getQuestionDetails);
router.post('/', requirePermission(PERMISSIONS.QUESTIONS_CREATE), createQuestion);
router.patch('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_UPDATE), updateQuestion);
router.delete('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_DELETE), deleteQuestion);

export default router;
