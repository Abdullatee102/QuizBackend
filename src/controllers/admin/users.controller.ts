import type { Response } from 'express';
import { eq, or, ilike, and, sql, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  usersTable,
  facultiesTable,
  departmentsTable,
  quizHistoryTable,
  supportRequestsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
  type UserRole,
  type AccountStatus,
} from '../../db/schema.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const listUsers = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const offset = (page - 1) * limit;

    const search = req.query.search || req.query.q;
    const role = req.query.role as string | undefined;
    const status = req.query.status as string | undefined;
    const facultyId = req.query.facultyId as string | undefined;
    const departmentId = req.query.departmentId as string | undefined;
    const level = req.query.level ? Number(req.query.level) : undefined;

    const conditions = [];

    if (search && typeof search === 'string') {
      const pattern = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(usersTable.fullName, pattern),
          ilike(usersTable.email, pattern),
          ilike(usersTable.username, pattern),
          ilike(usersTable.phoneNumber, pattern)
        )
      );
    }

    if (role) {
      conditions.push(eq(usersTable.role, role));
    }

    if (status) {
      conditions.push(eq(usersTable.status, status));
    }

    if (facultyId) {
      conditions.push(eq(usersTable.facultyId, facultyId as any));
    }

    if (departmentId) {
      conditions.push(eq(usersTable.departmentId, departmentId as any));
    }

    if (level) {
      conditions.push(eq(usersTable.level, level));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const usersQuery = db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        phoneNumber: usersTable.phoneNumber,
        bio: usersTable.bio,
        photoURL: usersTable.photoURL,
        role: usersTable.role,
        status: usersTable.status,
        level: usersTable.level,
        facultyId: usersTable.facultyId,
        facultyName: facultiesTable.name,
        departmentId: usersTable.departmentId,
        departmentName: departmentsTable.name,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(usersTable);

    const [users, countResult] = await Promise.all([
      whereClause ? usersQuery.where(whereClause) : usersQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = countResult[0]?.count || 0;

    res.status(200).json({
      status: 'success',
      data: {
        users,
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
      message: `Failed to fetch users: ${error.message}`,
    });
  }
};

export const getUserDetails = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId || typeof userId !== 'string' || userId.length < 10) {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid user ID provided.',
      });
      return;
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        phoneNumber: usersTable.phoneNumber,
        bio: usersTable.bio,
        photoURL: usersTable.photoURL,
        role: usersTable.role,
        status: usersTable.status,
        level: usersTable.level,
        facultyId: usersTable.facultyId,
        facultyName: facultiesTable.name,
        departmentId: usersTable.departmentId,
        departmentName: departmentsTable.name,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(eq(usersTable.id, userId as any));

    if (!user) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found.',
      });
      return;
    }

    // Additional statistics for this user
    const [quizStats, supportStats] = await Promise.all([
      db
        .select({
          totalQuizzes: sql<number>`count(*)`.mapWith(Number),
          averageScore: sql<number>`coalesce(round(avg(${quizHistoryTable.score})::numeric, 1), 0)`.mapWith(Number),
        })
        .from(quizHistoryTable)
        .where(eq(quizHistoryTable.userId, userId as any)),

      db
        .select({
          totalTickets: sql<number>`count(*)`.mapWith(Number),
        })
        .from(supportRequestsTable)
        .where(eq(supportRequestsTable.userId, userId as any)),
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        user,
        statistics: {
          quizzesTaken: quizStats[0]?.totalQuizzes || 0,
          averageScore: quizStats[0]?.averageScore || 0,
          supportTickets: supportStats[0]?.totalTickets || 0,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch user details: ${error.message}`,
    });
  }
};

export const updateUserStatus = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { status, reason } = req.body;

    if (!userId || typeof userId !== 'string' || userId.length < 10) {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid user ID provided.',
      });
      return;
    }

    if (!status || !Object.values(ACCOUNT_STATUS).includes(status)) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid status. Must be one of: ${Object.values(ACCOUNT_STATUS).join(', ')}`,
      });
      return;
    }

    if (String(req.adminUser?.id) === String(userId)) {
      res.status(400).json({
        status: 'fail',
        message: 'Administrators cannot change their own account status.',
      });
      return;
    }

    const [targetUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!targetUser) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found.',
      });
      return;
    }

    // Only SUPER_ADMIN can modify another SUPER_ADMIN or ADMIN
    if (
      targetUser.role === USER_ROLES.SUPER_ADMIN &&
      req.adminUser?.role !== USER_ROLES.SUPER_ADMIN
    ) {
      res.status(403).json({
        status: 'fail',
        message: 'Only a Super Administrator can modify another Super Administrator account.',
      });
      return;
    }

    // Prevent suspending or disabling the final active SUPER_ADMIN
    if (
      targetUser.role === USER_ROLES.SUPER_ADMIN &&
      status !== ACCOUNT_STATUS.ACTIVE
    ) {
      const [superAdminCount] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(usersTable)
        .where(
          and(
            eq(usersTable.role, USER_ROLES.SUPER_ADMIN),
            eq(usersTable.status, ACCOUNT_STATUS.ACTIVE)
          )
        );

      if ((superAdminCount?.count || 0) <= 1) {
        res.status(400).json({
          status: 'fail',
          message: 'Cannot suspend or disable the final active Super Administrator account. At least one active Super Administrator must remain.',
        });
        return;
      }
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set({ status: status as AccountStatus })
      .where(eq(usersTable.id, userId as any))
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        fullName: usersTable.fullName,
        role: usersTable.role,
        status: usersTable.status,
      });

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'USER_STATUS_UPDATE',
      resourceType: 'user',
      resourceId: String(userId),
      metadata: {
        previousStatus: targetUser.status,
        newStatus: status,
        reason: reason || null,
        userEmail: targetUser.email,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: `User status successfully updated to ${status}.`,
      data: { user: updatedUser },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update user status: ${error.message}`,
    });
  }
};

export const updateUserRole = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!userId || typeof userId !== 'string' || userId.length < 10) {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid user ID provided.',
      });
      return;
    }

    if (!role || !Object.values(USER_ROLES).includes(role)) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid role. Must be one of: ${Object.values(USER_ROLES).join(', ')}`,
      });
      return;
    }

    if (req.adminUser?.role !== USER_ROLES.SUPER_ADMIN) {
      res.status(403).json({
        status: 'fail',
        message: 'Only Super Administrators can assign or change user roles.',
      });
      return;
    }

    if (String(req.adminUser?.id) === String(userId)) {
      res.status(400).json({
        status: 'fail',
        message: 'Administrators cannot alter their own role.',
      });
      return;
    }

    const [targetUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!targetUser) {
      res.status(404).json({
        status: 'fail',
        message: 'User not found.',
      });
      return;
    }

    // Prevent demoting the final active SUPER_ADMIN
    if (
      targetUser.role === USER_ROLES.SUPER_ADMIN &&
      role !== USER_ROLES.SUPER_ADMIN
    ) {
      const [superAdminCount] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(usersTable)
        .where(
          and(
            eq(usersTable.role, USER_ROLES.SUPER_ADMIN),
            eq(usersTable.status, ACCOUNT_STATUS.ACTIVE)
          )
        );

      if ((superAdminCount?.count || 0) <= 1) {
        res.status(400).json({
          status: 'fail',
          message: 'Cannot demote the final Super Administrator account. At least one active Super Administrator must remain.',
        });
        return;
      }
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set({ role: role as UserRole })
      .where(eq(usersTable.id, userId as any))
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        fullName: usersTable.fullName,
        role: usersTable.role,
        status: usersTable.status,
      });

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'USER_ROLE_UPDATE',
      resourceType: 'user',
      resourceId: String(userId),
      metadata: {
        previousRole: targetUser.role,
        newRole: role,
        userEmail: targetUser.email,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: `User role successfully updated to ${role}.`,
      data: { user: updatedUser },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update user role: ${error.message}`,
    });
  }
};

