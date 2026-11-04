import { Router } from 'express';
import {
  provisionLecturerHandler,
  listLecturersHandler,
  getLecturerDetailsHandler,
  assignCourseHandler,
  revokeCourseAssignmentHandler,
  updateLecturerProfileHandler,
  listFacultiesHandler,
  listDepartmentsHandler,
} from '../../controllers/admin/lecturers.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import {
  provisionLecturerSchema,
  assignCourseSchema,
  updateLecturerProfileSchema,
} from '../../schemas/lecturer.schemas.js';

const router = Router();

// Protect all admin lecturer routes with admin authentication
router.use(protectAdmin);

router.post(
  '/',
  requirePermission(PERMISSIONS.LECTURERS_CREATE),
  validate(provisionLecturerSchema),
  provisionLecturerHandler
);

router.get(
  '/',
  requirePermission(PERMISSIONS.LECTURERS_READ),
  listLecturersHandler
);

router.get(
  '/faculties',
  requirePermission(PERMISSIONS.LECTURERS_READ),
  listFacultiesHandler
);

router.get(
  '/departments',
  requirePermission(PERMISSIONS.LECTURERS_READ),
  listDepartmentsHandler
);

router.get(
  '/:lecturerId',
  requirePermission(PERMISSIONS.LECTURERS_READ),
  getLecturerDetailsHandler
);

router.patch(
  '/:lecturerId',
  requirePermission(PERMISSIONS.LECTURERS_UPDATE),
  validate(updateLecturerProfileSchema),
  updateLecturerProfileHandler
);

router.post(
  '/:lecturerId/assignments',
  requirePermission(PERMISSIONS.LECTURER_ASSIGNMENTS_MANAGE),
  validate(assignCourseSchema),
  assignCourseHandler
);

router.delete(
  '/:lecturerId/assignments/:courseId',
  requirePermission(PERMISSIONS.LECTURER_ASSIGNMENTS_MANAGE),
  revokeCourseAssignmentHandler
);

router.patch(
  '/:lecturerId/assignments/:courseId/revoke',
  requirePermission(PERMISSIONS.LECTURER_ASSIGNMENTS_MANAGE),
  revokeCourseAssignmentHandler
);

export default router;

