import { Router } from 'express';
import {
  adminListAssessmentsHandler,
  adminGetAssessmentDetailsHandler,
  adminGetAssessmentAuditLogsHandler,
  adminSuspendAssessmentHandler,
  adminGetGradingOversightHandler,
  adminRetryCbtGradingHandler,
} from '../../controllers/admin/assessments.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { adminSuspendAssessmentSchema } from '../../schemas/assessment.schemas.js';

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

export default router;
