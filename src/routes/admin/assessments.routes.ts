import { Router } from 'express';
import {
  adminListAssessmentsHandler,
  adminGetAssessmentDetailsHandler,
  adminGetAssessmentAuditLogsHandler,
  adminSuspendAssessmentHandler,
  adminGetGradingOversightHandler,
  adminRetryCbtGradingHandler,
} from '../../controllers/admin/assessments.controller.js';
import {
  getAdminAssessmentPublicationReviewHandler,
  adminApproveResultsHandler,
  adminRejectResultsHandler,
  adminPublishResultsHandler,
  adminModerateGradeHandler,
} from '../../controllers/admin/publication.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import {
  adminSuspendAssessmentSchema,
  rejectResultsSchema,
  moderateGradeSchema,
} from '../../schemas/assessment.schemas.js';

const router = Router();

router.use(protectAdmin);

router.get(
  '/',
  requirePermission(PERMISSIONS.ASSESSMENTS_READ),
  adminListAssessmentsHandler
);

router.get(
  '/:assessmentId',
  requirePermission(PERMISSIONS.ASSESSMENTS_READ),
  adminGetAssessmentDetailsHandler
);

router.get(
  '/:assessmentId/audit-logs',
  requirePermission(PERMISSIONS.ASSESSMENTS_READ),
  adminGetAssessmentAuditLogsHandler
);

router.post(
  '/:assessmentId/suspend',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  validate(adminSuspendAssessmentSchema),
  adminSuspendAssessmentHandler
);

router.get(
  '/:assessmentId/grading-oversight',
  requirePermission(PERMISSIONS.ASSESSMENTS_READ),
  adminGetGradingOversightHandler
);

router.post(
  '/:assessmentId/attempts/:attemptId/retry-cbt-grading',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  adminRetryCbtGradingHandler
);

// Results Review, Moderation & Publication (BB-07F.7)
router.get(
  '/:assessmentId/publication-review',
  requirePermission(PERMISSIONS.ASSESSMENTS_READ),
  getAdminAssessmentPublicationReviewHandler
);

router.post(
  '/:assessmentId/approve-results',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  adminApproveResultsHandler
);

router.post(
  '/:assessmentId/reject-results',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  validate(rejectResultsSchema),
  adminRejectResultsHandler
);

router.post(
  '/:assessmentId/publish-results',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  adminPublishResultsHandler
);

router.post(
  '/:assessmentId/grades/:gradeId/moderate',
  requirePermission(PERMISSIONS.ASSESSMENTS_OVERRIDE),
  validate(moderateGradeSchema),
  adminModerateGradeHandler
);

export default router;
