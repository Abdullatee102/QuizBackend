import type { Response } from 'express';
import { eq, desc, and, sql, inArray } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  broadcastsTable,
  notificationsTable,
  usersTable,
} from '../../db/schema.js';
import { notificationService } from '../../services/notificationService.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

export const createBroadcast = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, body, targetType, targetFilter = {} } = req.body;

    if (!title || !body || !targetType) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: title, body, targetType.',
      });
      return;
    }

    const normalizedTarget = String(targetType).toLowerCase();
    const validTargets = ['all', 'faculty', 'department', 'level', 'user'];
    if (!validTargets.includes(normalizedTarget)) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid targetType. Must be one of: ${validTargets.join(', ')}`,
      });
      return;
    }

    // Determine target users
    const conditions = [eq(usersTable.status, 'ACTIVE')];

    if (normalizedTarget === 'faculty' && targetFilter.facultyId) {
      conditions.push(eq(usersTable.facultyId, targetFilter.facultyId));
    } else if (normalizedTarget === 'department' && targetFilter.departmentId) {
      conditions.push(eq(usersTable.departmentId, targetFilter.departmentId));
    } else if (normalizedTarget === 'level' && targetFilter.level) {
      conditions.push(eq(usersTable.level, Number(targetFilter.level)));
    } else if (normalizedTarget === 'user') {
      const userIds: string[] = [];
      if (targetFilter.userId && typeof targetFilter.userId === 'string') {
        userIds.push(targetFilter.userId.trim());
      }
      if (Array.isArray(targetFilter.userIds)) {
        for (const uid of targetFilter.userIds) {
          if (typeof uid === 'string' && uid.trim()) {
            userIds.push(uid.trim());
          }
        }
      }

      if (userIds.length === 0) {
        res.status(400).json({
          status: 'fail',
          message: 'Targeting user requires targetFilter.userId or non-empty targetFilter.userIds.',
        });
        return;
      }

      conditions.push(inArray(usersTable.id, userIds as any));
    }

    const rawTargetUsers = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(and(...conditions));

    // Deduplicate recipients
    const uniqueUserIds = Array.from(new Set(rawTargetUsers.map((u) => String(u.id))));
    const recipientCount = uniqueUserIds.length;
    const adminId = req.adminUser!.id;

    // Create broadcast record with initial 'processing' status
    const [broadcast] = await db
      .insert(broadcastsTable)
      .values({
        adminUserId: adminId as any,
        title: String(title).trim(),
        body: String(body).trim(),
        targetType: normalizedTarget,
        targetFilter,
        recipientCount,
        status: 'processing',
      })
      .returning();

    if (!broadcast) {
      throw new Error('Failed to create broadcast record.');
    }

    // Fan-out notifications asynchronously
    if (recipientCount > 0) {
      const notificationRows = uniqueUserIds.map((uid) => ({
        userId: uid,
        type: 'broadcast',
        title: String(title).trim(),
        body: String(body).trim(),
        data: {
          broadcastId: broadcast.id,
          targetType: normalizedTarget,
        },
      }));

      // Batch insert in-app notifications
      try {
        await db.insert(notificationsTable).values(notificationRows);
      } catch (err: any) {
        logger.error(`[BROADCAST IN-APP INSERT ERROR] ${err.message}`);
      }

      // Dispatch push notifications to target users in background
      (async () => {
        for (const uid of uniqueUserIds) {
          try {
            await notificationService.sendToUser(
              uid,
              String(title).trim(),
              String(body).trim(),
              { broadcastId: broadcast.id }
            );
          } catch {
            // non-blocking
          }
        }
      })().catch((e) => logger.error(`[BROADCAST PUSH ERROR] ${e.message}`));
    }

    // Mark broadcast as sent
    await db
      .update(broadcastsTable)
      .set({
        status: 'sent',
        sentAt: new Date(),
      })
      .where(eq(broadcastsTable.id, broadcast.id));

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: adminId,
      action: 'NOTIFICATION_BROADCAST',
      resourceType: 'broadcast',
      resourceId: String(broadcast.id),
      metadata: {
        title,
        targetType,
        targetFilter,
        recipientCount,
      },
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      status: 'success',
      message: `Broadcast dispatched successfully to ${recipientCount} recipient(s).`,
      data: { broadcast },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to create broadcast notification: ${error.message}`,
    });
  }
};

export const listBroadcasts = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const offset = (page - 1) * limit;

    const broadcasts = await db
      .select({
        id: broadcastsTable.id,
        title: broadcastsTable.title,
        body: broadcastsTable.body,
        targetType: broadcastsTable.targetType,
        targetFilter: broadcastsTable.targetFilter,
        recipientCount: broadcastsTable.recipientCount,
        status: broadcastsTable.status,
        createdAt: broadcastsTable.createdAt,
        sentAt: broadcastsTable.sentAt,
        sender: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
        },
      })
      .from(broadcastsTable)
      .leftJoin(usersTable, eq(broadcastsTable.adminUserId, usersTable.id))
      .orderBy(desc(broadcastsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(broadcastsTable);

    const total = countResult?.count || 0;

    res.status(200).json({
      status: 'success',
      data: {
        broadcasts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to list broadcasts: ${error.message}`,
    });
  }
};
