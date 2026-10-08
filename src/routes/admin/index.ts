import { Router } from 'express';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import usersRoutes from './users.routes.js';
import coursesRoutes from './courses.routes.js';
import questionsRoutes from './questions.routes.js';
import supportRoutes from './support.routes.js';
import notificationsRoutes from './notifications.routes.js';
import auditLogsRoutes from './auditLogs.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/users', usersRoutes);
router.use('/courses', coursesRoutes);
router.use('/questions', questionsRoutes);
router.use('/support', supportRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/audit-logs', auditLogsRoutes);

export default router;

