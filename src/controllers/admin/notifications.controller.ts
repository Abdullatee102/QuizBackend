import type { Response } from 'express';
import { eq, desc, and, sql, inArray, ilike, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  broadcastsTable,
  notificationsTable,
  usersTable,
  facultiesTable,
  departmentsTable,
  userEntitlementsTable,
} from '../../db/schema.js';
import { notificationService } from '../../services/notificationService.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

/**
 * Resolve target user IDs and summary description based on targetType and targetFilter.
 */
async function resolveRecipients(
  targetType: string,
  targetFilter: Record<string, any> = {}
): Promise<{ userIds: string[]; summary: string }> {
  const normalizedTarget = String(targetType).toLowerCase();
  const conditions = [eq(usersTable.status, 'ACTIVE')];
  let summary = 'All active users across the platform';

  if (normalizedTarget === 'faculty') {
    let facultyId = targetFilter.facultyId;
    let facultyCode = targetFilter.facultyCode;
    let facultyName = '';

    if (!facultyId && facultyCode) {
      const [fac] = await db
        .select({ id: facultiesTable.id, name: facultiesTable.name, code: facultiesTable.code })
        .from(facultiesTable)
        .where(sql`UPPER(${facultiesTable.code}) = ${String(facultyCode).trim().toUpperCase()}`);
      if (fac) {
        facultyId = fac.id;
        facultyName = fac.name;
        facultyCode = fac.code;
      }
    } else if (facultyId) {
      const [fac] = await db
        .select({ name: facultiesTable.name, code: facultiesTable.code })
        .from(facultiesTable)
        .where(eq(facultiesTable.id, facultyId));
      if (fac) {
        facultyName = fac.name;
        facultyCode = fac.code;
      }
    }

    if (facultyId) {
      conditions.push(eq(usersTable.facultyId, facultyId));
      summary = `Faculty of ${facultyName || facultyCode} (${facultyCode || facultyId})`;
    } else {
      // Specified faculty not found
      return { userIds: [], summary: 'Specified faculty could not be resolved.' };
    }
  } else if (normalizedTarget === 'department') {
    let departmentId = targetFilter.departmentId;
    let departmentCode = targetFilter.departmentCode;
    let departmentName = '';

    if (!departmentId && departmentCode) {
      const [dept] = await db
        .select({ id: departmentsTable.id, name: departmentsTable.name, code: departmentsTable.code })
        .from(departmentsTable)
        .where(sql`UPPER(${departmentsTable.code}) = ${String(departmentCode).trim().toUpperCase()}`);
      if (dept) {
        departmentId = dept.id;
        departmentName = dept.name;
        departmentCode = dept.code;
      }
    } else if (departmentId) {
      const [dept] = await db
        .select({ name: departmentsTable.name, code: departmentsTable.code })
        .from(departmentsTable)
        .where(eq(departmentsTable.id, departmentId));
      if (dept) {
        departmentName = dept.name;
        departmentCode = dept.code;
      }
    }

    if (departmentId) {
      conditions.push(eq(usersTable.departmentId, departmentId));
      summary = `Department of ${departmentName || departmentCode} (${departmentCode || departmentId})`;
    } else {
      return { userIds: [], summary: 'Specified department could not be resolved.' };
    }
  } else if (normalizedTarget === 'level') {
    const levelNum = Number(targetFilter.level);
    if (levelNum) {
      conditions.push(eq(usersTable.level, levelNum));
      summary = `${levelNum} Level Students`;
    }
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

    // Support resolution by email/emails
    const emails: string[] = [];
    if (targetFilter.email && typeof targetFilter.email === 'string') {
      emails.push(targetFilter.email.trim().toLowerCase());
    }
    if (Array.isArray(targetFilter.emails)) {
      for (const em of targetFilter.emails) {
        if (typeof em === 'string' && em.trim()) {
          emails.push(em.trim().toLowerCase());
        }
      }
    }

    if (emails.length > 0) {
      const usersByEmail = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(inArray(sql`LOWER(${usersTable.email})`, emails));
      for (const u of usersByEmail) {
        userIds.push(String(u.id));
      }
    }

    if (userIds.length === 0) {
      return { userIds: [], summary: 'No valid user IDs or emails specified.' };
    }

    conditions.push(inArray(usersTable.id, userIds as any));
    summary = `Targeted individual user(s) (${userIds.length} specified)`;
  } else if (normalizedTarget === 'product' || normalizedTarget === 'product_entitlement') {
    const productId = targetFilter.productId || targetFilter.requiredProductId;
    const now = new Date();
    const activeEntitled = await db
      .select({ userId: userEntitlementsTable.userId })
      .from(userEntitlementsTable)
      .where(
        and(
          productId ? eq(userEntitlementsTable.productId, productId) : undefined,
          eq(userEntitlementsTable.status, 'ACTIVE'),
          or(sql`${userEntitlementsTable.expiryDate} IS NULL`, sql`${userEntitlementsTable.expiryDate} > ${now}`)
        )
      );

    const entitledUserIds = Array.from(new Set(activeEntitled.map((e) => String(e.userId))));
    if (entitledUserIds.length === 0) {
      return { userIds: [], summary: `No active entitled students for product ${productId || 'any'}` };
    }
    conditions.push(inArray(usersTable.id, entitledUserIds as any));
    summary = `Students with active entitlement for ${productId || 'product'}`;
  }

  // Intersect academic targeting with product entitlement if requiredProductId is present
  if (
    targetFilter.requiredProductId &&
    normalizedTarget !== 'product' &&
    normalizedTarget !== 'product_entitlement'
  ) {
    const now = new Date();
    const activeEntitled = await db
      .select({ userId: userEntitlementsTable.userId })
      .from(userEntitlementsTable)
      .where(
        and(
          eq(userEntitlementsTable.productId, targetFilter.requiredProductId),
          eq(userEntitlementsTable.status, 'ACTIVE'),
          or(sql`${userEntitlementsTable.expiryDate} IS NULL`, sql`${userEntitlementsTable.expiryDate} > ${now}`)
        )
      );
    const entitledUserIds = Array.from(new Set(activeEntitled.map((e) => String(e.userId))));
    if (entitledUserIds.length === 0) {
      return { userIds: [], summary: `${summary} (no students hold active entitlement for ${targetFilter.requiredProductId})` };
    }
    conditions.push(inArray(usersTable.id, entitledUserIds as any));
    summary = `${summary} [Filtered by Product: ${targetFilter.requiredProductId}]`;
  }

  const rawTargetUsers = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(and(...conditions));

  const uniqueUserIds = Array.from(new Set(rawTargetUsers.map((u) => String(u.id))));
  return { userIds: uniqueUserIds, summary };
}

/**
 * Get available faculties for audience targeting.
 */
export const getTargetingFaculties = async (
  _req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const faculties = await db
      .select({
        id: facultiesTable.id,
        code: facultiesTable.code,
        name: facultiesTable.name,
      })
      .from(facultiesTable)
      .orderBy(facultiesTable.code);

    res.status(200).json({
      status: 'success',
      data: { faculties },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch targeting faculties: ${error.message}`,
    });
  }
};

/**
 * Get available departments for audience targeting.
 */
export const getTargetingDepartments = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { facultyId, facultyCode } = req.query;
    const conditions = [];

    if (typeof facultyId === 'string' && facultyId.trim()) {
      conditions.push(eq(departmentsTable.facultyId, facultyId.trim() as any));
    } else if (typeof facultyCode === 'string' && facultyCode.trim()) {
      const [fac] = await db
        .select({ id: facultiesTable.id })
        .from(facultiesTable)
        .where(sql`UPPER(${facultiesTable.code}) = ${facultyCode.trim().toUpperCase()}`);
      if (fac) {
        conditions.push(eq(departmentsTable.facultyId, fac.id as any));
      }
    }

    const query = db
      .select({
        id: departmentsTable.id,
        facultyId: departmentsTable.facultyId,
        code: departmentsTable.code,
        name: departmentsTable.name,
      })
      .from(departmentsTable);

    const departments =
      conditions.length > 0
        ? await query.where(and(...conditions)).orderBy(departmentsTable.code)
        : await query.orderBy(departmentsTable.code);

    res.status(200).json({
      status: 'success',
      data: { departments },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch targeting departments: ${error.message}`,
    });
  }
};

/**
 * Search users by name, email, or matric number for user targeting.
 */
export const searchTargetingUsers = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q || q.length < 2) {
      res.status(200).json({ status: 'success', data: { users: [] } });
      return;
    }

    const searchPattern = `%${q}%`;
    const users = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(
        and(
          eq(usersTable.status, 'ACTIVE'),
          or(
            ilike(usersTable.fullName, searchPattern),
            ilike(usersTable.email, searchPattern),
            ilike(usersTable.username, searchPattern)
          )
        )
      )
      .limit(20);

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to search users: ${error.message}`,
    });
  }
};

/**
 * Estimate recipient count before dispatching broadcast.
 */
export const estimateBroadcastRecipients = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const targetType = (req.query.targetType as string) || (req.body?.targetType as string);
    if (!targetType) {
      res.status(400).json({ status: 'fail', message: 'targetType is required' });
      return;
    }

    const targetFilter = {
      facultyId: (req.query.facultyId as string) || req.body?.targetFilter?.facultyId,
      facultyCode: (req.query.facultyCode as string) || req.body?.targetFilter?.facultyCode,
      departmentId: (req.query.departmentId as string) || req.body?.targetFilter?.departmentId,
      departmentCode: (req.query.departmentCode as string) || req.body?.targetFilter?.departmentCode,
      level: req.query.level || req.body?.targetFilter?.level,
      userId: (req.query.userId as string) || req.body?.targetFilter?.userId,
      email: (req.query.email as string) || req.body?.targetFilter?.email,
      userIds: req.body?.targetFilter?.userIds,
      emails: req.body?.targetFilter?.emails,
    };

    const { userIds, summary } = await resolveRecipients(targetType, targetFilter);

    res.status(200).json({
      status: 'success',
      data: {
        recipientCount: userIds.length,
        summary,
        targetType,
        targetFilter,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to estimate recipients: ${error.message}`,
    });
  }
};

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

    const { userIds: uniqueUserIds, summary } = await resolveRecipients(
      normalizedTarget,
      targetFilter
    );
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
        targetFilter: { ...targetFilter, targetSummary: summary },
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
    const [sentBroadcast] = await db
      .update(broadcastsTable)
      .set({
        status: 'sent',
        sentAt: new Date(),
      })
      .where(eq(broadcastsTable.id, broadcast.id))
      .returning();

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
        summary,
      },
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      status: 'success',
      message: `Broadcast dispatched successfully to ${recipientCount} recipient(s).`,
      data: { broadcast: sentBroadcast || { ...broadcast, status: 'sent', sentAt: new Date() } },
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
