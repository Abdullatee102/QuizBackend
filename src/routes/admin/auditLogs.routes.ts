import { Router } from 'express';
import { listAuditLogs } from '../../controllers/admin/auditLogs.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);

router.get('/', requirePermission(PERMISSIONS.AUDIT_LOGS_READ), listAuditLogs);

export default router;

