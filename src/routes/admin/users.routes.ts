import { Router } from 'express';
import {
  listUsers,
  getUserDetails,
  updateUserStatus,
  updateUserRole,
  updateUserAcademic,
} from '../../controllers/admin/users.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);

router.get('/', requirePermission(PERMISSIONS.USERS_READ), listUsers);
router.get('/:userId', requirePermission(PERMISSIONS.USERS_READ), getUserDetails);
router.patch('/:userId/status', requirePermission(PERMISSIONS.USERS_SUSPEND), updateUserStatus);
router.patch('/:userId/role', requirePermission(PERMISSIONS.ADMINS_UPDATE), updateUserRole);
router.patch('/:userId/academic', requirePermission(PERMISSIONS.USERS_UPDATE), updateUserAcademic);

export default router;

