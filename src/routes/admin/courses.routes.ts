import { Router } from 'express';
import {
  listCourses,
  getCourseDetails,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../../controllers/admin/courses.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);

router.get('/', requirePermission(PERMISSIONS.COURSES_READ), listCourses);
router.get('/:courseId', requirePermission(PERMISSIONS.COURSES_READ), getCourseDetails);
router.post('/', requirePermission(PERMISSIONS.COURSES_CREATE), createCourse);
router.patch('/:courseId', requirePermission(PERMISSIONS.COURSES_UPDATE), updateCourse);
router.delete('/:courseId', requirePermission(PERMISSIONS.COURSES_DELETE), deleteCourse);

export default router;

