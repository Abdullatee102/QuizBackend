import { Router } from 'express';
import { getAdminDashboard } from '../../controllers/admin/dashboard.controller.js';
import { getPilotAnalytics } from '../../controllers/admin/pilotAnalytics.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);
router.get('/', requirePermission(PERMISSIONS.DASHBOARD_READ), getAdminDashboard);
router.get('/pilot-analytics', requirePermission(PERMISSIONS.DASHBOARD_READ), getPilotAnalytics);

export default router;

