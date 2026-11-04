import { Router } from 'express';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import {
  createOpportunitySchema,
  updateOpportunitySchema,
  publishOpportunitySchema,
} from '../../schemas/opportunity.schemas.js';
import { adminOpportunitiesController } from '../../controllers/admin/adminOpportunities.controller.js';

const router = Router();

// Require admin authentication for all opportunity admin endpoints
router.use(protectAdmin);

// 1. Audience lookup for form autocompletion (faculties, departments, levels)
router.get(
  '/audiences/lookup',
  requirePermission(PERMISSIONS.OPPORTUNITIES_READ),
  adminOpportunitiesController.lookupAudiences
);

// 2. Publish opportunity & trigger notification fan-out
router.post(
  '/:id/publish',
  requirePermission(PERMISSIONS.OPPORTUNITIES_PUBLISH),
  validate(publishOpportunitySchema),
  adminOpportunitiesController.publishOpportunity
);

// 3. Archive opportunity
router.post(
  '/:id/archive',
  requirePermission(PERMISSIONS.OPPORTUNITIES_UPDATE),
  adminOpportunitiesController.archiveOpportunity
);

// 4. Detail inspector
router.get(
  '/:id',
  requirePermission(PERMISSIONS.OPPORTUNITIES_READ),
  adminOpportunitiesController.getOpportunityById
);

// 5. Update opportunity
router.put(
  '/:id',
  requirePermission(PERMISSIONS.OPPORTUNITIES_UPDATE),
  validate(updateOpportunitySchema),
  adminOpportunitiesController.updateOpportunity
);

// 6. Delete opportunity
router.delete(
  '/:id',
  requirePermission(PERMISSIONS.OPPORTUNITIES_DELETE),
  adminOpportunitiesController.deleteOpportunity
);

// 7. Paginated list
router.get(
  '/',
  requirePermission(PERMISSIONS.OPPORTUNITIES_READ),
  adminOpportunitiesController.listOpportunities
);

// 8. Create opportunity
router.post(
  '/',
  requirePermission(PERMISSIONS.OPPORTUNITIES_CREATE),
  validate(createOpportunitySchema),
  adminOpportunitiesController.createOpportunity
);

export default router;

