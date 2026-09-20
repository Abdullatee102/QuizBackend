import type { Response } from 'express';

import type {
  AuthenticatedRequest,
} from '../middlewares/auth.middleware.js';

import logger from '../config/logger.js';

import {
  notificationService,
} from '../services/notificationService.js';

// =====================================================
// GET USER ID
// =====================================================

const getUserId = (
  req: AuthenticatedRequest
): string | undefined => {
  const userId =
    req.user?.id ||
    req.user?.userId;

  if (!userId) {
    return undefined;
  }

  return String(userId);
};

// =====================================================
// REGISTER DEVICE
// =====================================================

export const registerDevice = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId =
    getUserId(req);

  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message:
        'User authentication required',
    });

    return;
  }

  try {
    const {
      pushToken,
      platform,
    } = req.body;

    const device =
      await notificationService
        .registerDevice({
          userId,
          pushToken,
          platform,
        });

    res.status(200).json({
      status: 'success',
      message:
        'Device registered successfully',
      data: device,
    });
  } catch (error: any) {
    logger.error(
      `[NOTIFICATION] Error registering device: ${error.message}`
    );

    res.status(500).json({
      status: 'fail',
      message:
        'Failed to register device',
    });
  }
};

// =====================================================
// UNREGISTER DEVICE
// =====================================================

export const unregisterDevice =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      getUserId(req);

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'User authentication required',
      });

      return;
    }

    try {
      const {
        pushToken,
      } = req.body;

      const removed =
        await notificationService
          .unregisterDevice(
            userId,
            pushToken
          );

      res.status(200).json({
        status: 'success',
        message:
          removed
            ? 'Device unregistered successfully'
            : 'Device was not registered',
      });
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Error unregistering device: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to unregister device',
      });
    }
  };

// =====================================================
// GET NOTIFICATIONS
// =====================================================

export const getNotifications =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      getUserId(req);

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'User authentication required',
      });

      return;
    }

    try {
      // =================================================
      // GET VALIDATED QUERY
      //
      // Express 5 does not allow us to replace
      // req.query. The validation middleware stores
      // the validated query in res.locals instead.
      // =================================================

      const validatedQuery =
        res.locals
          ?.validatedQuery as
          | {
              limit?: unknown;
            }
          | undefined;

      let limit = 50;

      if (
        validatedQuery &&
        validatedQuery.limit !==
          undefined
      ) {
        const parsedLimit =
          Number(
            validatedQuery.limit
          );

        if (
          Number.isInteger(
            parsedLimit
          ) &&
          parsedLimit >= 1 &&
          parsedLimit <= 100
        ) {
          limit = parsedLimit;
        }
      }

      // =================================================
      // FETCH NOTIFICATIONS
      // =================================================

      const notifications =
        await notificationService
          .getUserNotifications(
            userId,
            limit
          );

      res.status(200).json({
        status: 'success',
        count:
          notifications.length,
        data: notifications,
      });
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Error fetching notifications: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch notifications',
      });
    }
  };

// =====================================================
// MARK ONE AS READ
// =====================================================

export const markNotificationAsRead =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      getUserId(req);

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'User authentication required',
      });

      return;
    }

    const rawNotificationId =
      req.params.notificationId;

    const notificationId =
      Array.isArray(
        rawNotificationId
      )
        ? rawNotificationId[0]
        : rawNotificationId;

    if (!notificationId) {
      res.status(400).json({
        status: 'fail',
        message:
          'Notification ID is required',
      });

      return;
    }

    try {
      const notification =
        await notificationService
          .markAsRead(
            userId,
            notificationId
          );

      if (!notification) {
        res.status(404).json({
          status: 'fail',
          message:
            'Notification not found',
        });

        return;
      }

      res.status(200).json({
        status: 'success',
        message:
          'Notification marked as read',
        data: notification,
      });
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Error marking notification as read: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to mark notification as read',
      });
    }
  };

// =====================================================
// MARK ALL AS READ
// =====================================================

export const markAllNotificationsAsRead =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      getUserId(req);

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'User authentication required',
      });

      return;
    }

    try {
      const count =
        await notificationService
          .markAllAsRead(userId);

      res.status(200).json({
        status: 'success',
        message:
          'All notifications marked as read',
        count,
      });
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Error marking all notifications as read: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to mark notifications as read',
      });
    }
  };