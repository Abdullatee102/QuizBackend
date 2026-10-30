import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { submitFeedbackSchema } from '../schemas/feedback.schemas.js';
import { feedbackController } from '../controllers/feedback.controller.js';

const router = Router();

// All student feedback routes require authentication
router.use(protect);

// Check student eligibility for the active survey version
router.get('/eligibility', feedbackController.getEligibility);

// Submit student feedback (validated with Zod)
router.post('/', validate(submitFeedbackSchema), feedbackController.submitFeedback);

export default router;

