import { Router } from 'express';
import { getAdminDashboard } from '../../controllers/admin/dashboard.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);
router.get('/', requirePermission(PERMISSIONS.DASHBOARD_READ), getAdminDashboard);

export default router;

