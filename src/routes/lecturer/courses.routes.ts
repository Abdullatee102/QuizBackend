import { Router } from 'express';
import {
  getLecturerDashboard,
  listAssignedCourses,
  getAssignedCourseDetails,
} from '../../controllers/lecturer/courses.controller.js';
import {
  protectLecturer,
  requireLecturerCourseAssignment,
} from '../../middlewares/lecturerAuth.middleware.js';

const router = Router();

// Enforce authentication across all lecturer course routes
router.use(protectLecturer);

router.get('/dashboard', getLecturerDashboard);
router.get('/courses', listAssignedCourses);
router.get('/courses/:courseId', requireLecturerCourseAssignment, getAssignedCourseDetails);

export default router;

