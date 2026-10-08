import { eq, desc, and, sql } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { auditLogsTable, usersTable } from '../../db/schema.js';
import type { AuditLogEntryInput } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

export const auditService = {
  /**
   * Safe asynchronous logger for administrative actions.
   * Catches errors internally to prevent failing the primary transaction.
   */
  logAdminAction: async (entry: AuditLogEntryInput): Promise<void> => {
    try {
      await db.insert(auditLogsTable).values({
        adminUserId: entry.adminUserId as any,
        action: entry.action,
        resourceType: entry.resourceType,
        resourceId: entry.resourceId || null,
        metadata: entry.metadata || {},
        ipAddress: entry.ipAddress || null,
        userAgent: entry.userAgent || null,
      });
      logger.info(
        `[AUDIT] Action: ${entry.action} on ${entry.resourceType} (ID: ${entry.resourceId || 'N/A'}) by Admin: ${entry.adminUserId || 'system'}`
      );
    } catch (error: any) {
      logger.error(`[AUDIT ERROR] Failed to record audit log: ${error.message}`);
    }
  },

  /**
   * Retrieves paginated audit logs with optional filtering.
   */
  getAuditLogs: async (filters: {
    adminUserId?: string | undefined;
    action?: string | undefined;
    resourceType?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) => {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.adminUserId) {
      conditions.push(eq(auditLogsTable.adminUserId, filters.adminUserId as any));
    }
    if (filters.action) {
      conditions.push(eq(auditLogsTable.action, filters.action));
    }
    if (filters.resourceType) {
      conditions.push(eq(auditLogsTable.resourceType, filters.resourceType));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const logsQuery = db
      .select({
        id: auditLogsTable.id,
        action: auditLogsTable.action,
        resourceType: auditLogsTable.resourceType,
        resourceId: auditLogsTable.resourceId,
        metadata: auditLogsTable.metadata,
        ipAddress: auditLogsTable.ipAddress,
        userAgent: auditLogsTable.userAgent,
        createdAt: auditLogsTable.createdAt,
        adminUser: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
          role: usersTable.role,
        },
      })
      .from(auditLogsTable)
      .leftJoin(usersTable, eq(auditLogsTable.adminUserId, usersTable.id))
      .orderBy(desc(auditLogsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({
        count: sql<number>`count(${auditLogsTable.id})`.mapWith(Number),
      })
      .from(auditLogsTable);

    const [logs, totalCountResult] = await Promise.all([
      whereClause ? logsQuery.where(whereClause) : logsQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = totalCountResult[0]?.count || 0;

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
