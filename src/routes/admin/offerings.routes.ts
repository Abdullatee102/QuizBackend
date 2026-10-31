import { Router } from 'express';
import {
  createOfferingHandler,
  listOfferingsHandler,
  getOfferingDetailsHandler,
  updateOfferingHandler,
  updateOfferingStatusHandler,
  assignOfferingLecturerHandler,
  listOfferingLecturersHandler,
  revokeOfferingLecturerHandler,
  createOfferingEnrollmentsHandler,
  listOfferingEnrollmentsHandler,
  updateEnrollmentStatusHandler,
} from '../../controllers/admin/offerings.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createOfferingSchema,
  updateOfferingSchema,
  updateOfferingStatusSchema,
  queryOfferingsSchema,
  assignOfferingLecturerSchema,
  createEnrollmentSchema,
  updateEnrollmentStatusSchema,
  queryEnrollmentsSchema,
} from '../../schemas/offering.schemas.js';

const router = Router();

router.use(protectAdmin);

// Course Offerings
router.post(
  '/',
  requirePermission(PERMISSIONS.OFFERINGS_CREATE),
  validate(createOfferingSchema),
  createOfferingHandler
);

router.get(
  '/',
  requirePermission(PERMISSIONS.OFFERINGS_READ),
  validate(queryOfferingsSchema),
  listOfferingsHandler
);

router.get(
  '/:offeringId',
  requirePermission(PERMISSIONS.OFFERINGS_READ),
  getOfferingDetailsHandler
);

router.patch(
  '/:offeringId',
  requirePermission(PERMISSIONS.OFFERINGS_UPDATE),
  validate(updateOfferingSchema),
  updateOfferingHandler
);

router.patch(
  '/:offeringId/status',
  requirePermission(PERMISSIONS.OFFERINGS_UPDATE),
  validate(updateOfferingStatusSchema),
  updateOfferingStatusHandler
);

// Lecturer assignments to offerings
router.post(
  '/:offeringId/lecturers',
  requirePermission(PERMISSIONS.OFFERING_LECTURERS_MANAGE),
  validate(assignOfferingLecturerSchema),
  assignOfferingLecturerHandler
);

router.get(
  '/:offeringId/lecturers',
  requirePermission(PERMISSIONS.OFFERINGS_READ),
  listOfferingLecturersHandler
);

router.delete(
  '/:offeringId/lecturers/:lecturerId',
  requirePermission(PERMISSIONS.OFFERING_LECTURERS_MANAGE),
  revokeOfferingLecturerHandler
);

// Student enrolments
router.post(
  '/:offeringId/enrollments',
  requirePermission(PERMISSIONS.ENROLLMENTS_CREATE),
  validate(createEnrollmentSchema),
  createOfferingEnrollmentsHandler
);

router.get(
  '/:offeringId/enrollments',
  requirePermission(PERMISSIONS.ENROLLMENTS_READ),
  validate(queryEnrollmentsSchema),
  listOfferingEnrollmentsHandler
);

router.patch(
  '/:offeringId/enrollments/:enrollmentId',
  requirePermission(PERMISSIONS.ENROLLMENTS_UPDATE),
  validate(updateEnrollmentStatusSchema),
  updateEnrollmentStatusHandler
);

export default router;

