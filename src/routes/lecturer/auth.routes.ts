import { Router } from 'express';
import {
  lecturerLogin,
  lecturerGoogleLogin,
  getLecturerMe,
  updateLecturerProfile,
  changeLecturerPassword,
  uploadLecturerAvatar,
  removeLecturerAvatar,
} from '../../controllers/lecturer/auth.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { authRateLimiter } from '../../middlewares/rateLimit.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { lecturerLoginSchema } from '../../schemas/lecturer.schemas.js';
import { uploadAttachment } from '../../services/storage/storageService.js';

const router = Router();

// Public auth endpoints
router.post('/login', authRateLimiter, validate(lecturerLoginSchema), lecturerLogin);
router.post('/google', authRateLimiter, lecturerGoogleLogin);

// Protected account & profile endpoints
router.get('/me', protectLecturer, getLecturerMe);
router.patch('/profile', protectLecturer, updateLecturerProfile);
router.patch('/password', protectLecturer, changeLecturerPassword);
router.post('/profile/avatar', protectLecturer, uploadAttachment.single('file'), uploadLecturerAvatar);
router.delete('/profile/avatar', protectLecturer, removeLecturerAvatar);

export default router;
