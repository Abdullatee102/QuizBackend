import { Router } from 'express';
import { lecturerLogin, getLecturerMe } from '../../controllers/lecturer/auth.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { authRateLimiter } from '../../middlewares/rateLimit.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { lecturerLoginSchema } from '../../schemas/lecturer.schemas.js';

const router = Router();

router.post('/login', authRateLimiter, validate(lecturerLoginSchema), lecturerLogin);
router.get('/me', protectLecturer, getLecturerMe);

export default router;

