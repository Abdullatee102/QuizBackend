import { db } from '../db/index.js';
import {
  notificationsTable,
  userDevicesTable,
} from '../db/schema.js';
import {
  and,
  desc,
  eq,
} from 'drizzle-orm';
import logger from '../config/logger.js';
import { socketService } from '../socket/index.js';

// =====================================================
// TYPES
// =====================================================

export interface RegisterDeviceInput {
  userId: string;
  pushToken: string;
  platform: string;
}

export interface NotificationData {
  userId: string;
  type: string;
  title: string;
  body: string;
  data?: Record<string, any>;
}

export interface SendPushNotificationInput {
  pushToken: string;
  title: string;
  body: string;
  data?: Record<string, any>;
}

export interface AchievementNotificationInput {
  userId: string;
  achievementKey: string;
  title: string;
  description?: string;
}

export interface PushDeliveryResult {
  success: boolean;
  ticketId?: string | undefined;
  errorCode?: string | undefined;
  errorMessage?: string | undefined;
  deviceNotRegistered: boolean;
  invalidCredentials?: boolean | undefined;
}

interface ExpoPushTicket {
  status?: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: {
    error?: string;
    [key: string]: any;
  };
}

interface ExpoPushResponse {
  data?: ExpoPushTicket | ExpoPushTicket[];
  errors?: Array<{ message: string; code?: string }>;
}

// =====================================================
// HELPERS
// =====================================================

export const maskPushToken = (token: string): string => {
  if (!token || typeof token !== 'string') return '[empty-token]';
  if (token.length <= 12) return '***';
  return `${token.slice(0, 10)}...${token.slice(-4)}`;
};

// =====================================================
// EXPO PUSH API
// =====================================================

/*
 * This is Expo's public push notification endpoint.
 *
 * It is NOT the URL of the Brain Buzz application.
 *
 * Backend
 *   ↓
 * Expo Push Service
 *   ↓
 * User's device
 */

const EXPO_PUSH_API_URL = 'https://exp.host/--/api/v2/push/send';

// =====================================================
// NOTIFICATION SERVICE
// =====================================================

export const notificationService = {
  // ===================================================
  // REGISTER DEVICE
  // ===================================================

  registerDevice: async ({
    userId,
    pushToken,
    platform,
  }: RegisterDeviceInput) => {
    const now = new Date();

    const [device] = await db
      .insert(userDevicesTable)
      .values({
        userId,
        pushToken,
        platform,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: userDevicesTable.pushToken,
        set: {
          userId,
          platform,
          updatedAt: now,
        },
      })
      .returning();

    // Bound per-user device tokens: prune older tokens if count exceeds threshold
    try {
      const userDevices = await db
        .select({ id: userDevicesTable.id })
        .from(userDevicesTable)
        .where(eq(userDevicesTable.userId, userId))
        .orderBy(desc(userDevicesTable.updatedAt));

      const MAX_DEVICES_PER_USER = 5;
      if (userDevices.length > MAX_DEVICES_PER_USER) {
        const staleDevices = userDevices.slice(MAX_DEVICES_PER_USER);
        for (const stale of staleDevices) {
          await db
            .delete(userDevicesTable)
            .where(eq(userDevicesTable.id, stale.id));
        }
        logger.info(
          `[NOTIFICATION] Pruned ${staleDevices.length} stale devices for user ${userId}`
        );
      }
    } catch (pruneErr: any) {
      logger.warn(
        `[NOTIFICATION] Failed to prune excess devices: ${pruneErr.message}`
      );
    }

    return device;
  },

  // ===================================================
  // UNREGISTER DEVICE
  // ===================================================

  unregisterDevice: async (userId: string, pushToken: string) => {
    const deleted = await db
      .delete(userDevicesTable)
      .where(
        and(
          eq(userDevicesTable.userId, userId),
          eq(userDevicesTable.pushToken, pushToken)
        )
      )
      .returning({
        id: userDevicesTable.id,
      });

    return deleted.length > 0;
  },

  // ===================================================
  // REMOVE INVALID DEVICE BY TOKEN
  // ===================================================

  removeDeviceByToken: async (pushToken: string) => {
    try {
      await db
        .delete(userDevicesTable)
        .where(eq(userDevicesTable.pushToken, pushToken));

      logger.info(
        `[NOTIFICATION] Removed invalid push token ${maskPushToken(pushToken)}`
      );
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Failed to remove invalid push token: ${error.message}`
      );
    }
  },

  // ===================================================
  // CREATE IN-APP NOTIFICATION
  // ===================================================

  createNotification: async ({
    userId,
    type,
    title,
    body,
    data = {},
  }: NotificationData) => {
    const [notification] = await db
      .insert(notificationsTable)
      .values({
        userId,
        type,
        title,
        body,
        data,
      })
      .returning();

    // Emit real-time event so the mobile client invalidates its notifications cache
    if (notification) {
      try {
        socketService.emitToRoom(`user:${userId}`, 'notification:new', {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          body: notification.body,
          data: notification.data,
          isRead: false,
          createdAt: notification.createdAt,
        });
      } catch (socketErr: any) {
        logger.warn(
          `[NOTIFICATION] Failed to emit socket event: ${socketErr.message}`
        );
      }

      // Deliver push notification to physical devices outside the app (failure-isolated)
      notificationService
        .sendToUser(userId, title, body, data)
        .catch((pushErr: any) => {
          logger.warn(
            `[NOTIFICATION] Push delivery failed for user ${userId}: ${pushErr.message}`
          );
        });
    }

    return notification;
  },

  // ===================================================
  // SEND EXPO PUSH NOTIFICATION
  // ===================================================

  sendPushNotification: async ({
    pushToken,
    title,
    body,
    data = {},
  }: SendPushNotificationInput): Promise<PushDeliveryResult> => {
    try {
      const hasExpoAccessToken = Boolean(process.env.EXPO_ACCESS_TOKEN);

      logger.info(
        `[NOTIFICATION] Sending Expo push to ${maskPushToken(
          pushToken
        )}. Access token configured: ${hasExpoAccessToken}`
      );

      const response = await fetch(EXPO_PUSH_API_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          ...(hasExpoAccessToken
            ? {
                Authorization: `Bearer ${process.env.EXPO_ACCESS_TOKEN}`,
              }
            : {}),
        },
        body: JSON.stringify({
          to: pushToken,
          sound: 'default',
          title,
          body,
          channelId: 'default',
          priority: 'high',
          data,
        }),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as ExpoPushResponse | null;

      logger.info(
        `[NOTIFICATION] Expo response status: ${response.status} ${response.statusText}`
      );

      if (!response.ok) {
        const topLevelError =
          payload?.errors?.[0]?.message ||
          `HTTP ${response.status} ${response.statusText}`;

        logger.error(
          `[NOTIFICATION] Expo push HTTP request failed for ${maskPushToken(
            pushToken
          )}: ${topLevelError}`
        );

        return {
          success: false,
          errorMessage: topLevelError,
          deviceNotRegistered: false,
        };
      }

      const tickets: ExpoPushTicket[] = Array.isArray(payload?.data)
        ? payload.data
        : payload?.data
        ? [payload.data]
        : [];

      if (tickets.length === 0) {
        const topLevelError =
          payload?.errors?.[0]?.message ||
          'No ticket returned by Expo Push Service';

        logger.error(
          `[NOTIFICATION] Expo push returned no tickets for ${maskPushToken(
            pushToken
          )}: ${topLevelError}`
        );

        return {
          success: false,
          errorMessage: topLevelError,
          deviceNotRegistered: false,
        };
      }

      const ticket = tickets[0];

      if (ticket?.status === 'error') {
        const errorCode = ticket.details?.error || 'UNKNOWN_ERROR';
        const errorMessage = ticket.message || errorCode;

        logger.error(
          `[NOTIFICATION] Expo push ticket failed for ${maskPushToken(
            pushToken
          )}: ${errorMessage} (code: ${errorCode})`
        );

        const isDeviceNotRegistered = errorCode === 'DeviceNotRegistered';
        const isInvalidCredentials = errorCode === 'InvalidCredentials';

        if (isInvalidCredentials) {
          logger.error(
            `[NOTIFICATION] CRITICAL: Expo project is missing FCM v1 credentials. Push delivery to Android devices is blocked until an FCM v1 private key is configured on Expo.`
          );
        }

        return {
          success: false,
          errorCode,
          errorMessage,
          deviceNotRegistered: isDeviceNotRegistered,
          invalidCredentials: isInvalidCredentials,
        };
      }

      if (ticket?.status === 'ok') {
        logger.info(
          `[NOTIFICATION] Push notification accepted by Expo for ${maskPushToken(
            pushToken
          )} (ticket ID: ${ticket.id})`
        );

        return {
          success: true,
          ticketId: ticket.id,
          deviceNotRegistered: false,
        };
      }

      logger.warn(
        `[NOTIFICATION] Unexpected Expo ticket status for ${maskPushToken(
          pushToken
        )}: ${ticket?.status}`
      );

      return {
        success: false,
        errorMessage: 'Unexpected ticket status',
        deviceNotRegistered: false,
      };
    } catch (error: any) {
      logger.error(
        `[NOTIFICATION] Error sending push notification to ${maskPushToken(
          pushToken
        )}: ${error.message}`
      );

      return {
        success: false,
        errorMessage: error.message,
        deviceNotRegistered: false,
      };
    }
  },

  // ===================================================
  // SEND TO ALL USER DEVICES
  // ===================================================

  sendToUser: async (
    userId: string,
    title: string,
    body: string,
    data: Record<string, any> = {}
  ) => {
    try {
      const devices = await db
        .select()
        .from(userDevicesTable)
        .where(eq(userDevicesTable.userId, userId))
        .orderBy(desc(userDevicesTable.updatedAt))
        .limit(5);

      if (devices.length === 0) {
        logger.info(`[NOTIFICATION] User ${userId} has no registered devices`);
        return;
      }

      // Concurrently dispatch to devices with failure isolation
      const results = await Promise.allSettled(
        devices.map((device) =>
          notificationService.sendPushNotification({
            pushToken: device.pushToken,
            title,
            body,
            data,
          })
        )
      );

      // Clean up devices that returned DeviceNotRegistered
      for (let i = 0; i < devices.length; i++) {
        const res = results[i];
        const device = devices[i];
        if (
          res &&
          res.status === 'fulfilled' &&
          res.value.deviceNotRegistered &&
          device
        ) {
          await notificationService.removeDeviceByToken(device.pushToken);
        }
      }
    } catch (err: any) {
      logger.error(
        `[NOTIFICATION] sendToUser encountered an error for user ${userId}: ${err.message}`
      );
    }
  },

  // ===================================================
  // ACHIEVEMENT NOTIFICATION
  // ===================================================

  notifyAchievementUnlocked: async ({
    userId,
    achievementKey,
    title,
    description,
  }: AchievementNotificationInput) => {
    const notificationTitle = 'Achievement Unlocked! 🏆';
    const notificationBody = `You've earned the "${title}" badge!`;

    const data = {
      url: '/(profile)/achievements',
      type: 'achievement_unlocked',
      achievementKey,
      ...(description ? { description } : {}),
    };

    /*
     * Always create the persistent inbox notification first.
     * createNotification automatically handles push delivery to user devices.
     */
    await notificationService.createNotification({
      userId,
      type: 'achievement_unlocked',
      title: notificationTitle,
      body: notificationBody,
      data,
    });
  },

  // ===================================================
  // GET USER NOTIFICATIONS
  // ===================================================

  getUserNotifications: async (userId: string, limit: number = 50) => {
    return await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, userId))
      .orderBy(desc(notificationsTable.createdAt))
      .limit(limit);
  },

  // ===================================================
  // MARK ONE AS READ
  // ===================================================

  markAsRead: async (userId: string, notificationId: string) => {
    const [notification] = await db
      .update(notificationsTable)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where(
        and(
          eq(notificationsTable.id, notificationId),
          eq(notificationsTable.userId, userId)
        )
      )
      .returning();

    return notification;
  },

  // ===================================================
  // MARK ALL AS READ
  // ===================================================

  markAllAsRead: async (userId: string) => {
    const updated = await db
      .update(notificationsTable)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where(
        and(
          eq(notificationsTable.userId, userId),
          eq(notificationsTable.isRead, false)
        )
      )
      .returning({
        id: notificationsTable.id,
      });

    return updated.length;
  },
};
