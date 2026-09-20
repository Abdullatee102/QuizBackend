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

interface ExpoPushTicket {
  status?: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: {
    error?: string;
  };
}

interface ExpoPushResponse {
  data?: ExpoPushTicket;
}

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

const EXPO_PUSH_API_URL =
  'https://exp.host/--/api/v2/push/send';

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

    const [device] =
      await db
        .insert(userDevicesTable)
        .values({
          userId,
          pushToken,
          platform,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target:
            userDevicesTable.pushToken,

          set: {
            userId,
            platform,
            updatedAt: now,
          },
        })
        .returning();

    return device;
  },

  // ===================================================
  // UNREGISTER DEVICE
  // ===================================================

  unregisterDevice: async (
    userId: string,
    pushToken: string
  ) => {

    const deleted =
      await db
        .delete(userDevicesTable)
        .where(
          and(
            eq(
              userDevicesTable.userId,
              userId
            ),
            eq(
              userDevicesTable.pushToken,
              pushToken
            )
          )
        )
        .returning({
          id: userDevicesTable.id,
        });

    return deleted.length > 0;
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

    const [notification] =
      await db
        .insert(notificationsTable)
        .values({
          userId,
          type,
          title,
          body,
          data,
        })
        .returning();

    return notification;
  },

  // ===================================================
  // SEND EXPO PUSH NOTIFICATION
  // ===================================================

  // ===================================================
// SEND EXPO PUSH NOTIFICATION
// ===================================================

sendPushNotification: async ({
  pushToken,
  title,
  body,
  data = {},
}: SendPushNotificationInput): Promise<{
  success: boolean;
  deviceNotRegistered: boolean;
}> => {
  try {
    const hasExpoAccessToken =
      Boolean(
        process.env.EXPO_ACCESS_TOKEN
      );

    logger.info(
      `[NOTIFICATION] Sending Expo push. Access token configured: ${hasExpoAccessToken}`
    );

    const response =
      await fetch(
        EXPO_PUSH_API_URL,
        {
          method: 'POST',

          headers: {
            Accept:
              'application/json',

            'Accept-encoding':
              'gzip, deflate',

            'Content-Type':
              'application/json',

            ...(hasExpoAccessToken
              ? {
                  Authorization:
                    `Bearer ${process.env.EXPO_ACCESS_TOKEN}`,
                }
              : {}),
          },

          body: JSON.stringify({
            to: pushToken,
            sound: 'default',
            title,
            body,
            data,
          }),
        }
      );

    const payload =
      (await response
        .json()
        .catch(
          () => null
        )) as
        | ExpoPushResponse
        | null;

    logger.info(
      `[NOTIFICATION] Expo response status: ${response.status} ${response.statusText}`
    );

    logger.info(
      `[NOTIFICATION] Expo response payload: ${JSON.stringify(
        payload
      )}`
    );

    if (!response.ok) {
      logger.error(
        `[NOTIFICATION] Expo push request failed: ${response.status} ${response.statusText}`
      );

      return {
        success: false,
        deviceNotRegistered: false,
      };
    }

    const ticket =
      payload?.data;

    if (
      ticket?.status ===
      'error'
    ) {
      const errorCode =
        ticket.details?.error;

      logger.error(
        `[NOTIFICATION] Expo push failed: ${
          errorCode ||
          ticket.message ||
          'Unknown error'
        }`
      );

      return {
        success: false,

        deviceNotRegistered:
          errorCode ===
          'DeviceNotRegistered',
      };
    }

    logger.info(
      '[NOTIFICATION] Push notification sent successfully'
    );

    return {
      success: true,
      deviceNotRegistered: false,
    };
  } catch (error: any) {
    logger.error(
      `[NOTIFICATION] Error sending push notification: ${error.message}`
    );

    return {
      success: false,
      deviceNotRegistered: false,
    };
  }
},

  // ===================================================
  // REMOVE INVALID DEVICE
  // ===================================================

  removeDeviceByToken: async (
    pushToken: string
  ) => {

    try {

      await db
        .delete(userDevicesTable)
        .where(
          eq(
            userDevicesTable.pushToken,
            pushToken
          )
        );

      logger.info(
        '[NOTIFICATION] Removed invalid push token'
      );

    } catch (error: any) {

      logger.error(
        `[NOTIFICATION] Failed to remove invalid push token: ${error.message}`
      );
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

    const devices =
      await db
        .select()
        .from(userDevicesTable)
        .where(
          eq(
            userDevicesTable.userId,
            userId
          )
        );

    if (
      devices.length === 0
    ) {

      logger.info(
        `[NOTIFICATION] User ${userId} has no registered devices`
      );

      return;
    }

    for (
      const device of devices
    ) {

      const result =
        await notificationService
          .sendPushNotification({
            pushToken:
              device.pushToken,

            title,
            body,
            data,
          });

      if (
        result.deviceNotRegistered
      ) {

        await notificationService
          .removeDeviceByToken(
            device.pushToken
          );
      }
    }
  },

  // ===================================================
  // ACHIEVEMENT NOTIFICATION
  // ===================================================

  notifyAchievementUnlocked:
    async ({
      userId,
      achievementKey,
      title,
      description,
    }: AchievementNotificationInput) => {

      const notificationTitle =
        'Achievement Unlocked! 🏆';

      const notificationBody =
        `You've earned the "${title}" badge!`;

      const data = {
        url:
          '/(profile)/achievements',

        type:
          'achievement_unlocked',

        achievementKey,

        ...(description
          ? {
              description,
            }
          : {}),
      };

      /*
       * Always create the persistent
       * inbox notification first.
       */

      await notificationService
        .createNotification({
          userId,

          type:
            'achievement_unlocked',

          title:
            notificationTitle,

          body:
            notificationBody,

          data,
        });

      /*
       * Push delivery must never make
       * quiz submission fail.
       */

      try {

        await notificationService
          .sendToUser(
            userId,
            notificationTitle,
            notificationBody,
            data
          );

      } catch (error: any) {

        logger.error(
          `[NOTIFICATION] Achievement push failed for user ${userId}: ${error.message}`
        );
      }
    },

  // ===================================================
  // GET USER NOTIFICATIONS
  // ===================================================

  getUserNotifications:
    async (
      userId: string,
      limit: number = 50
    ) => {

      return await db
        .select()
        .from(notificationsTable)
        .where(
          eq(
            notificationsTable.userId,
            userId
          )
        )
        .orderBy(
          desc(
            notificationsTable.createdAt
          )
        )
        .limit(limit);
    },

  // ===================================================
  // MARK ONE AS READ
  // ===================================================

  markAsRead: async (
    userId: string,
    notificationId: string
  ) => {

    const [notification] =
      await db
        .update(notificationsTable)
        .set({
          isRead: true,
          readAt: new Date(),
        })
        .where(
          and(
            eq(
              notificationsTable.id,
              notificationId
            ),
            eq(
              notificationsTable.userId,
              userId
            )
          )
        )
        .returning();

    return notification;
  },

  // ===================================================
  // MARK ALL AS READ
  // ===================================================

  markAllAsRead: async (
    userId: string
  ) => {

    const updated =
      await db
        .update(notificationsTable)
        .set({
          isRead: true,
          readAt: new Date(),
        })
        .where(
          and(
            eq(
              notificationsTable.userId,
              userId
            ),
            eq(
              notificationsTable.isRead,
              false
            )
          )
        )
        .returning({
          id:
            notificationsTable.id,
        });

    return updated.length;
  },
};