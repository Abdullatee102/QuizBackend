import { Router } from 'express';
import {
  createBroadcast,
  listBroadcasts,
} from '../../controllers/admin/notifications.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { broadcastRateLimiter } from '../../middlewares/rateLimit.middleware.js';

const router = Router();

router.use(protectAdmin);

router.post(
  '/broadcast',
  broadcastRateLimiter,
  requirePermission(PERMISSIONS.NOTIFICATIONS_BROADCAST),
  createBroadcast
);
router.get('/broadcasts', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), listBroadcasts);

export default router;

