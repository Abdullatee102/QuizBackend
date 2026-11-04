import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  updateOpportunityPreferenceSchema,
} from '../schemas/opportunity.schemas.js';
import { opportunityController } from '../controllers/opportunity.controller.js';

const router = Router();

// All student opportunity endpoints require authenticated session
router.use(protect);

// 1. Notification preferences (server-synced)
router.get('/preferences', opportunityController.getPreferences);
router.put(
  '/preferences',
  validate(updateOpportunityPreferenceSchema),
  opportunityController.updatePreference
);

// 2. Track outbound click (safe external referral)
router.post('/:id/track-click', opportunityController.trackClick);

// 3. Toggle bookmark
router.post('/:id/bookmark', opportunityController.toggleBookmark);

// 4. Detail view for single opportunity
router.get('/:id', opportunityController.getOpportunityById);

// 5. Paginated opportunities listing with audience filtering
router.get('/', opportunityController.getOpportunities);

export default router;

