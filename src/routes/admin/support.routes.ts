import { Router } from 'express';
import {
  listAdminSupportRequests,
  getAdminSupportDetails,
  replyToSupportRequest,
  updateSupportStatus,
  updateSupportPriority,
} from '../../controllers/admin/support.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);

router.get('/', requirePermission(PERMISSIONS.SUPPORT_READ), listAdminSupportRequests);
router.get('/:requestId', requirePermission(PERMISSIONS.SUPPORT_READ), getAdminSupportDetails);
router.post('/:requestId/messages', requirePermission(PERMISSIONS.SUPPORT_REPLY), replyToSupportRequest);
router.patch('/:requestId/status', requirePermission(PERMISSIONS.SUPPORT_STATUS), updateSupportStatus);
router.patch('/:requestId/priority', requirePermission(PERMISSIONS.SUPPORT_STATUS), updateSupportPriority);

export default router;

