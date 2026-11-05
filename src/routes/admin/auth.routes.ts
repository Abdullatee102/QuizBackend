import { Router } from 'express';
import {
  adminLogin,
  adminGoogleLogin,
  getAdminMe,
  adminLogout,
  adminChangePassword,
  updateAdminProfile,
  uploadAdminAvatar,
  removeAdminAvatar,
} from '../../controllers/admin/auth.controller.js';
import { protectAdmin } from '../../middlewares/adminAuth.middleware.js';
import { adminLoginRateLimiter } from '../../middlewares/rateLimit.middleware.js';
import { uploadAttachment } from '../../services/storage/storageService.js';

const router = Router();

// Public auth endpoints
router.post('/login', adminLoginRateLimiter, adminLogin);
router.post('/google', adminLoginRateLimiter, adminGoogleLogin);

// Protected admin account & profile endpoints
router.get('/me', protectAdmin, getAdminMe);
router.post('/logout', protectAdmin, adminLogout);
router.patch('/password', protectAdmin, adminChangePassword);
router.patch('/profile', protectAdmin, updateAdminProfile);
router.post('/profile/avatar', protectAdmin, uploadAttachment.single('file'), uploadAdminAvatar);
router.delete('/profile/avatar', protectAdmin, removeAdminAvatar);

export default router;
