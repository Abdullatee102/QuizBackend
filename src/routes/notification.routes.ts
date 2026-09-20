import { Router } from 'express';

import {
  registerDevice,
  unregisterDevice,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../controllers/notification.controller.js';

import {
  protect,
} from '../middlewares/auth.middleware.js';

import {
  validate,
} from '../middlewares/validate.middleware.js';

import {
  registerDeviceSchema,
  unregisterDeviceSchema,
  notificationIdSchema,
  notificationListSchema,
} from '../schemas/notification.schemas.js';

const router = Router();

// =====================================================
// DEVICE REGISTRATION
// =====================================================

router.post(
  '/devices',
  protect,
  validate(registerDeviceSchema),
  registerDevice
);

router.delete(
  '/devices',
  protect,
  validate(unregisterDeviceSchema),
  unregisterDevice
);

// =====================================================
// NOTIFICATIONS
// =====================================================

router.get(
  '/',
  protect,
  validate(notificationListSchema),
  getNotifications
);

router.patch(
  '/read-all',
  protect,
  markAllNotificationsAsRead
);

router.patch(
  '/:notificationId/read',
  protect,
  validate(notificationIdSchema),
  markNotificationAsRead
);

export default router;