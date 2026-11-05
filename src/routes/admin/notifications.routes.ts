import { Router } from 'express';
import {
  createBroadcast,
  listBroadcasts,
  getTargetingFaculties,
  getTargetingDepartments,
  searchTargetingUsers,
  estimateBroadcastRecipients,
} from '../../controllers/admin/notifications.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';
import { broadcastRateLimiter } from '../../middlewares/rateLimit.middleware.js';

const router = Router();

router.use(protectAdmin);

// Targeting helpers & recipient estimation
router.get('/targeting/faculties', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), getTargetingFaculties);
router.get('/targeting/departments', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), getTargetingDepartments);
router.get('/targeting/users/search', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), searchTargetingUsers);
router.get('/broadcast/estimate', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), estimateBroadcastRecipients);
router.post('/broadcast/estimate', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), estimateBroadcastRecipients);

router.post(
  '/broadcast',
  broadcastRateLimiter,
  requirePermission(PERMISSIONS.NOTIFICATIONS_BROADCAST),
  createBroadcast
);
router.get('/broadcasts', requirePermission(PERMISSIONS.NOTIFICATIONS_READ), listBroadcasts);

export default router;

