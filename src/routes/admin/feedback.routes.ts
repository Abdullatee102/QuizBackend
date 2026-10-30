import { Router } from 'express';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { feedbackFilterSchema } from '../../schemas/feedback.schemas.js';
import { adminFeedbackController } from '../../controllers/admin/adminFeedback.controller.js';

const router = Router();

// Require admin authentication and 'feedback.read' permission
router.use(protectAdmin);
router.use(requirePermission(PERMISSIONS.FEEDBACK_READ));

// 1. Aggregated analytics and metrics overview
router.get('/summary', adminFeedbackController.getSummary);

// 2. Paginated submissions list with filters
router.get('/', validate(feedbackFilterSchema), adminFeedbackController.listSubmissions);

// 3. Individual submission response inspector
router.get('/:id', adminFeedbackController.getDetail);

export default router;

