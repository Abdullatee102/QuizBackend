import { describe, it, before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { db } from '../db/index.js';
import { usersTable, userDevicesTable, notificationsTable } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { notificationService, maskPushToken } from '../services/notificationService.js';

describe('BB-03A: End-to-End Push Notification Reliability & Security', () => {
  let testUserAId: string;
  let testUserBId: string;
  const originalFetch = globalThis.fetch;

  before(async () => {
    // Create test user A
    const [userA] = await db
      .insert(usersTable)
      .values({
        fullName: 'Push Test User A',
        username: `push_user_a_${Date.now()}`,
        email: `push_user_a_${Date.now()}@lautech.edu.ng`,
        password: 'hashed-password-test',
        role: 'STUDENT',
        status: 'ACTIVE',
      })
      .returning();
    testUserAId = userA!.id;

    // Create test user B
    const [userB] = await db
      .insert(usersTable)
      .values({
        fullName: 'Push Test User B',
        username: `push_user_b_${Date.now()}`,
        email: `push_user_b_${Date.now()}@lautech.edu.ng`,
        password: 'hashed-password-test',
        role: 'STUDENT',
        status: 'ACTIVE',
      })
      .returning();
    testUserBId = userB!.id;
  });

  after(async () => {
    // Restore fetch
    globalThis.fetch = originalFetch;

    // Clean up notifications
    if (testUserAId) {
      await db.delete(notificationsTable).where(eq(notificationsTable.userId, testUserAId));
      await db.delete(userDevicesTable).where(eq(userDevicesTable.userId, testUserAId));
      await db.delete(usersTable).where(eq(usersTable.id, testUserAId));
    }
    if (testUserBId) {
      await db.delete(notificationsTable).where(eq(notificationsTable.userId, testUserBId));
      await db.delete(userDevicesTable).where(eq(userDevicesTable.userId, testUserBId));
      await db.delete(usersTable).where(eq(usersTable.id, testUserBId));
    }
  });

  // ===================================================
  // 1. TICKET PARSING & STATUS NORMALIZATION
  // ===================================================

  describe('1. Expo Ticket Parsing & Error Classification', () => {
    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it('1.1 Correctly parses single-object success ticket response', async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: { status: 'ok', id: 'ticket-single-123' },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      const result = await notificationService.sendPushNotification({
        pushToken: 'ExponentPushToken[mock-token-single]',
        title: 'Test Title',
        body: 'Test Body',
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.ticketId, 'ticket-single-123');
      assert.strictEqual(result.deviceNotRegistered, false);
    });

    it('1.2 Correctly parses array-based success ticket response', async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: [{ status: 'ok', id: 'ticket-array-456' }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      const result = await notificationService.sendPushNotification({
        pushToken: 'ExponentPushToken[mock-token-array]',
        title: 'Test Title',
        body: 'Test Body',
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.ticketId, 'ticket-array-456');
      assert.strictEqual(result.deviceNotRegistered, false);
    });

    it('1.3 Correctly classifies DeviceNotRegistered error ticket (array format)', async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: [
              {
                status: 'error',
                message: 'DeviceNotRegistered',
                details: { error: 'DeviceNotRegistered' },
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      const result = await notificationService.sendPushNotification({
        pushToken: 'ExponentPushToken[mock-dead-device]',
        title: 'Test Title',
        body: 'Test Body',
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.deviceNotRegistered, true);
      assert.strictEqual(result.errorCode, 'DeviceNotRegistered');
    });

    it('1.4 Correctly classifies InvalidCredentials error ticket without crashing', async () => {
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: {
              status: 'error',
              message: 'Unable to retrieve the FCM server key for the recipients app.',
              details: { error: 'InvalidCredentials', fault: 'developer' },
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      const result = await notificationService.sendPushNotification({
        pushToken: 'ExponentPushToken[mock-fcm-missing]',
        title: 'Test Title',
        body: 'Test Body',
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.invalidCredentials, true);
      assert.strictEqual(result.errorCode, 'InvalidCredentials');
      assert.strictEqual(result.deviceNotRegistered, false);
    });

    it('1.5 Safely handles non-200 HTTP responses and malformed payloads', async () => {
      globalThis.fetch = async () =>
        new Response('Internal Server Error', {
          status: 500,
          statusText: 'Internal Server Error',
        });

      const result = await notificationService.sendPushNotification({
        pushToken: 'ExponentPushToken[mock-server-error]',
        title: 'Test Title',
        body: 'Test Body',
      });

      assert.strictEqual(result.success, false);
      assert.strictEqual(result.deviceNotRegistered, false);
    });

    it('1.6 Masks sensitive tokens in logs and output', () => {
      const longToken = 'ExponentPushToken[1234567890abcdef]';
      const masked = maskPushToken(longToken);
      assert.strictEqual(masked.startsWith('ExponentPu...'), true);
      assert.strictEqual(masked.endsWith('def]'), true);
      assert.strictEqual(masked.includes('abcdef'), false);
    });
  });

  // ===================================================
  // 2. DEVICE REGISTRATION & ACCOUNT SWITCHING
  // ===================================================

  describe('2. Device Registration, Reassignment & Bounded Storage', () => {
    const sharedToken = `ExponentPushToken[shared-device-${Date.now()}]`;

    after(async () => {
      await db.delete(userDevicesTable).where(eq(userDevicesTable.pushToken, sharedToken));
    });

    it('2.1 Registers device token for User A', async () => {
      const device = await notificationService.registerDevice({
        userId: testUserAId,
        pushToken: sharedToken,
        platform: 'android',
      });

      assert.ok(device);
      assert.strictEqual(device.userId, testUserAId);
      assert.strictEqual(device.pushToken, sharedToken);
    });

    it('2.2 Reassigns device token to User B on account switch without duplicate key violation', async () => {
      // User B logs in on the same device with same token
      const reassignedDevice = await notificationService.registerDevice({
        userId: testUserBId,
        pushToken: sharedToken,
        platform: 'android',
      });

      assert.ok(reassignedDevice);
      assert.strictEqual(reassignedDevice.userId, testUserBId);

      // Verify User A no longer owns this token in the database
      const userADevices = await db
        .select()
        .from(userDevicesTable)
        .where(
          and(
            eq(userDevicesTable.userId, testUserAId),
            eq(userDevicesTable.pushToken, sharedToken)
          )
        );

      assert.strictEqual(userADevices.length, 0, 'User A must no longer hold the shared token');

      // Verify User B now owns the token
      const userBDevices = await db
        .select()
        .from(userDevicesTable)
        .where(
          and(
            eq(userDevicesTable.userId, testUserBId),
            eq(userDevicesTable.pushToken, sharedToken)
          )
        );

      assert.strictEqual(userBDevices.length, 1, 'User B must exclusively hold the shared token');
    });

    it('2.3 Automatically prunes excess devices per user beyond threshold (bounds stale tokens)', async () => {
      const createdTokens: string[] = [];
      for (let i = 1; i <= 7; i++) {
        const token = `ExponentPushToken[prune-test-${i}-${Date.now()}]`;
        createdTokens.push(token);
        await notificationService.registerDevice({
          userId: testUserAId,
          pushToken: token,
          platform: 'android',
        });
      }

      const activeDevices = await db
        .select()
        .from(userDevicesTable)
        .where(eq(userDevicesTable.userId, testUserAId));

      assert.ok(
        activeDevices.length <= 5,
        `Active devices (${activeDevices.length}) must be capped at 5`
      );

      // Clean up
      for (const t of createdTokens) {
        await db.delete(userDevicesTable).where(eq(userDevicesTable.pushToken, t));
      }
    });
  });

  // ===================================================
  // 3. IN-APP PRESERVATION & STALE TOKEN CLEANUP
  // ===================================================

  describe('3. In-App Preservation & Delivery Lifecycle', () => {
    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it('3.1 Preserves in-app notification in database even when push delivery returns error', async () => {
      // Mock push failure (e.g. InvalidCredentials)
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: [{ status: 'error', details: { error: 'InvalidCredentials' } }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      const notification = await notificationService.createNotification({
        userId: testUserAId,
        type: 'test_announcement',
        title: 'Preserved Notification',
        body: 'Must be saved in PostgreSQL even if push fails',
        data: { test: true },
      });

      assert.ok(notification, 'createNotification must return inserted record');

      // Verify record is in PostgreSQL
      const [saved] = await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.id, notification.id));

      assert.ok(saved, 'Notification record must exist in PostgreSQL notificationsTable');
      assert.strictEqual(saved.title, 'Preserved Notification');
      assert.strictEqual(saved.isRead, false);
    });

    it('3.2 Automatically removes dead device token from database on DeviceNotRegistered', async () => {
      const deadToken = `ExponentPushToken[dead-device-${Date.now()}]`;
      await notificationService.registerDevice({
        userId: testUserBId,
        pushToken: deadToken,
        platform: 'android',
      });

      // Mock Expo returning DeviceNotRegistered
      globalThis.fetch = async () =>
        new Response(
          JSON.stringify({
            data: [{ status: 'error', details: { error: 'DeviceNotRegistered' } }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

      // Invoke sendToUser
      await notificationService.sendToUser(
        testUserBId,
        'Test Cleanup',
        'Testing automatic token cleanup'
      );

      // Verify token was deleted from user_devices
      const [remaining] = await db
        .select()
        .from(userDevicesTable)
        .where(eq(userDevicesTable.pushToken, deadToken));

      assert.strictEqual(remaining, undefined, 'Dead token must be deleted from user_devices');
    });

    it('3.3 notifyAchievementUnlocked dispatches push notification exactly once without duplication', async () => {
      let pushDispatchCount = 0;
      const achievementToken = `ExponentPushToken[achievement-test-${Date.now()}]`;

      await notificationService.registerDevice({
        userId: testUserAId,
        pushToken: achievementToken,
        platform: 'android',
      });

      globalThis.fetch = async () => {
        pushDispatchCount++;
        return new Response(
          JSON.stringify({
            data: [{ status: 'ok', id: `ticket-achievement-${Date.now()}` }],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      };

      await notificationService.notifyAchievementUnlocked({
        userId: testUserAId,
        achievementKey: 'first_quiz_passed',
        title: 'Quiz Champion',
        description: 'Completed your first quiz successfully',
      });

      // Await background execution
      for (let i = 0; i < 30; i++) {
        if (pushDispatchCount > 0) break;
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Wait a moment longer to verify no secondary duplicate dispatch occurs
      await new Promise((resolve) => setTimeout(resolve, 300));

      assert.strictEqual(
        pushDispatchCount,
        1,
        'Achievement unlock must dispatch to Expo exactly ONCE, not duplicated'
      );

      // Clean up
      await db.delete(userDevicesTable).where(eq(userDevicesTable.pushToken, achievementToken));
    });
  });
});
