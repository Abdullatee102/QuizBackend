import { Router } from 'express';
import {
  gradeTheoryEndpoint,
  supportAssistantEndpoint,
  getAiStatus,
} from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  gradeTheoryAnswerSchema,
  supportAssistantSchema,
} from '../schemas/ai.schemas.js';

const router = Router();

// =====================================================
// AI ROUTES
// =====================================================

// Check AI status
router.get('/status', protect, getAiStatus);

// Standalone theory grading
router.post(
  '/theory/grade',
  protect,
  validate(gradeTheoryAnswerSchema),
  gradeTheoryEndpoint
);

// In-app AI student support
router.post(
  '/support',
  protect,
  validate(supportAssistantSchema),
  supportAssistantEndpoint
);

export default router;
