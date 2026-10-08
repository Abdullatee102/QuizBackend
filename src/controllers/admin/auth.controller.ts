import type { Response } from 'express';
import { eq, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { usersTable, refreshTokensTable } from '../../db/schema.js';
import { authService } from '../../services/authService.js';
import { auditService } from '../../services/admin/auditService.js';
import { isAdminRole, getRolePermissions } from '../../config/permissions.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import type { UserRole, AccountStatus } from '../../db/schema.js';
import logger from '../../config/logger.js';

export const adminLogin = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'Email and password are required.',
    });
    return;
  }

  const normalizedEmail = String(email).trim().toLowerCase();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(
      or(
        eq(usersTable.email, normalizedEmail),
        eq(usersTable.username, normalizedEmail)
      )
    );

  if (!user || user.password !== password) {
    logger.warn(`[ADMIN LOGIN] Failed attempt for: ${normalizedEmail}`);
    res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password.',
    });
    return;
  }

  // Account status check
  if (user.status !== 'ACTIVE') {
    logger.warn(`[ADMIN LOGIN] Blocked ${user.status} user: ${user.email}`);
    res.status(403).json({
      status: 'fail',
      message: `Account is ${user.status.toLowerCase()}. Access denied.`,
    });
    return;
  }

  // Reject non-admin (students)
  if (!isAdminRole(user.role)) {
    logger.warn(`[ADMIN LOGIN DENIED] Non-admin attempted admin login: ${user.email} (Role: ${user.role})`);
    res.status(403).json({
      status: 'fail',
      message: 'Access denied. Account is not registered as an administrator.',
    });
    return;
  }

  const tokens = await authService.generateAuthTokens({
    id: user.id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  });

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
  const userAgent = req.headers['user-agent'] || null;

  await auditService.logAdminAction({
    adminUserId: user.id,
    action: 'ADMIN_LOGIN',
    resourceType: 'auth',
    resourceId: user.id,
    metadata: {
      email: user.email,
      role: user.role,
    },
    ipAddress,
    userAgent,
  });

  logger.info(`[ADMIN LOGIN SUCCESS] Admin logged in: ${user.email} (Role: ${user.role})`);

  res.status(200).json({
    status: 'success',
    message: 'Admin authenticated successfully.',
    tokens,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      role: user.role as UserRole,
      status: user.status as AccountStatus,
      permissions: getRolePermissions(user.role),
    },
  });
};

export const getAdminMe = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.adminUser) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized.',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    user: req.adminUser,
  });
};

export const adminLogout = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.body;
  const adminId = req.adminUser?.id;

  if (refreshToken) {
    await authService.revokeRefreshToken(refreshToken);
  }

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
  const userAgent = req.headers['user-agent'] || null;

  if (adminId) {
    await auditService.logAdminAction({
      adminUserId: adminId,
      action: 'ADMIN_LOGOUT',
      resourceType: 'auth',
      resourceId: adminId,
      metadata: {
        email: req.adminUser?.email,
      },
      ipAddress,
      userAgent,
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Admin logged out successfully.',
  });
};

export const adminChangePassword = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  if (!req.adminUser) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized.',
    });
    return;
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({
      status: 'fail',
      message: 'Current password and new password are required.',
    });
    return;
  }

  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    res.status(400).json({
      status: 'fail',
      message: 'New password must be at least 6 characters.',
    });
    return;
  }

  if (currentPassword === newPassword) {
    res.status(400).json({
      status: 'fail',
      message: 'New password must be different from current password.',
    });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.adminUser.id as any));

  if (!user || user.password !== currentPassword) {
    logger.warn(`[ADMIN CHANGE PASSWORD] Incorrect current password for admin: ${req.adminUser.email}`);
    res.status(400).json({
      status: 'fail',
      message: 'Incorrect current password.',
    });
    return;
  }

  // Update password in database
  await db
    .update(usersTable)
    .set({ password: newPassword })
    .where(eq(usersTable.id, req.adminUser.id as any));

  // Invalidate any active refresh tokens to enforce renewed session
  try {
    await db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.userId, req.adminUser.id as any));
  } catch (err: any) {
    logger.warn(`[ADMIN CHANGE PASSWORD] Could not clear refresh tokens: ${err.message}`);
  }

  const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
  const userAgent = req.headers['user-agent'] || null;

  await auditService.logAdminAction({
    adminUserId: req.adminUser.id,
    action: 'ADMIN_PASSWORD_CHANGE',
    resourceType: 'auth',
    resourceId: req.adminUser.id,
    metadata: {
      email: req.adminUser.email,
      role: req.adminUser.role,
    },
    ipAddress,
    userAgent,
  });

  logger.info(`[ADMIN CHANGE PASSWORD] Password changed successfully for admin: ${req.adminUser.email}`);

  res.status(200).json({
    status: 'success',
    message: 'Password updated successfully.',
  });
};

