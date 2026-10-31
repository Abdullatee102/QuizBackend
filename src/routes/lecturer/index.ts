import { Router } from 'express';
import authRoutes from './auth.routes.js';
import coursesRoutes from './courses.routes.js';
import offeringsRoutes from './offerings.routes.js';
import questionsRoutes from './questions.routes.js';
import { lecturerLogin, getLecturerMe } from '../../controllers/lecturer/auth.controller.js';
import {
  getLecturerDashboard,
  listAssignedCourses,
  getAssignedCourseDetails,
} from '../../controllers/lecturer/courses.controller.js';
import {
  protectLecturer,
  requireLecturerCourseAssignment,
} from '../../middlewares/lecturerAuth.middleware.js';
import { authRateLimiter } from '../../middlewares/rateLimit.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { lecturerLoginSchema } from '../../schemas/lecturer.schemas.js';

const router = Router();

// Sub-routers
router.use('/auth', authRoutes);

// Root lecturer routes matching contracts directly
router.post('/login', authRateLimiter, validate(lecturerLoginSchema), lecturerLogin);
router.get('/me', protectLecturer, getLecturerMe);
router.get('/dashboard', protectLecturer, getLecturerDashboard);
router.get('/courses', protectLecturer, listAssignedCourses);
router.get('/courses/:courseId', protectLecturer, requireLecturerCourseAssignment, getAssignedCourseDetails);

// Nested routes
router.use('/questions', questionsRoutes);
router.use('/offerings', offeringsRoutes);
router.use('/', coursesRoutes);

export default router;

