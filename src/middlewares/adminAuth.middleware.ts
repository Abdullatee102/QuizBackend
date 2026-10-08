import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { isAdminRole, hasPermission, getRolePermissions } from '../config/permissions.js';
import type { AdminAuthenticatedRequest, AdminUserPayload } from '../types/admin.types.js';
import type { UserRole, AccountStatus } from '../db/schema.js';
import logger from '../config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
  throw new Error('[FATAL] JWT_SECRET environment variable is missing or insecure.');
}

export const protectAdmin = async (
  req: AdminAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Admin token missing or malformed.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Token missing.',
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const userId = decoded.id || decoded.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Invalid token payload.',
      });
      return;
    }

    // Always fetch fresh state from DB to guarantee live role and status validation
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        fullName: usersTable.fullName,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Admin account does not exist.',
      });
      return;
    }

    // Verify account status
    if (user.status !== 'ACTIVE') {
      logger.warn(`[ADMIN AUTH BLOCKED] User ${user.email} status is ${user.status}`);
      res.status(403).json({
        status: 'fail',
        message: `Account is ${user.status.toLowerCase()}. Access denied.`,
      });
      return;
    }

    // Verify role is administrative
    if (!isAdminRole(user.role)) {
      logger.warn(`[ADMIN AUTH DENIED] Student/Non-admin ${user.email} attempted admin access`);
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. Administrator privileges required.',
      });
      return;
    }

    const adminPayload: AdminUserPayload = {
      id: String(user.id),
      email: String(user.email),
      fullName: user.fullName,
      username: user.username,
      role: user.role as UserRole,
      status: user.status as AccountStatus,
      permissions: getRolePermissions(user.role),
    };

    req.adminUser = adminPayload;
    next();
  } catch (error: any) {
    logger.warn(`[ADMIN AUTH ERROR] Token verification failed: ${error.message}`);
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Admin token expired or invalid.',
    });
    return;
  }
};

export const requirePermission = (...requiredPermissions: string[]) => {
  return (req: AdminAuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.adminUser) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Admin credentials required.',
      });
      return;
    }

    const { role } = req.adminUser;

    for (const perm of requiredPermissions) {
      if (!hasPermission(role, perm)) {
        logger.warn(
          `[RBAC DENIED] Admin ${req.adminUser.email} (Role: ${role}) lacks permission: ${perm}`
        );
        res.status(403).json({
          status: 'fail',
          message: `Forbidden. Insufficient permissions: ${perm}`,
        });
        return;
      }
    }

    next();
  };
};

export const requireAdminRole = (...allowedRoles: UserRole[]) => {
  return (req: AdminAuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.adminUser) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Admin credentials required.',
      });
      return;
    }

    const { role } = req.adminUser;

    if (role === 'SUPER_ADMIN' || allowedRoles.includes(role)) {
      next();
      return;
    }

    logger.warn(`[RBAC DENIED] Admin ${req.adminUser.email} role ${role} not in allowed: ${allowedRoles.join(', ')}`);
    res.status(403).json({
      status: 'fail',
      message: `Forbidden. Action restricted to roles: ${allowedRoles.join(', ')}`,
    });
  };
};

