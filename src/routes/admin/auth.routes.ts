import { Router } from 'express';
import { adminLogin, getAdminMe, adminLogout, adminChangePassword } from '../../controllers/admin/auth.controller.js';
import { protectAdmin } from '../../middlewares/adminAuth.middleware.js';
import { adminLoginRateLimiter } from '../../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/login', adminLoginRateLimiter, adminLogin);
router.get('/me', protectAdmin, getAdminMe);
router.post('/logout', protectAdmin, adminLogout);
router.patch('/password', protectAdmin, adminChangePassword);

export default router;

