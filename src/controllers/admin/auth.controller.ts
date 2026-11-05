import type { Response } from 'express';
import { eq, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { usersTable, refreshTokensTable } from '../../db/schema.js';
import { authService } from '../../services/authService.js';
import { googleAuthService } from '../../services/googleAuthService.js';
import { storageProvider } from '../../services/storage/storageService.js';
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

  // Reject non-admin (students/lecturers)
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
      method: 'password',
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
      photoURL: user.photoURL,
    },
  });
};

/**
 * Handles secure Google Sign-In for Admin portal.
 * STRICT: Only pre-provisioned, ACTIVE accounts with authorized admin roles are permitted.
 * Unknown Google users are NEVER registered automatically.
 */
export const adminGoogleLogin = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({
        status: 'fail',
        message: 'Google ID token is required.',
      });
      return;
    }

    const claims = await googleAuthService.verifyGoogleToken(idToken);
    const verifiedEmail = claims.email.toLowerCase().trim();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, verifiedEmail));

    if (!user) {
      logger.warn(`[ADMIN GOOGLE AUTH REJECTED] Unregistered Google email: ${verifiedEmail}`);
      res.status(403).json({
        status: 'fail',
        message: 'Access denied. No authorized Brain Buzz administrator account found for this Google email. Administrators must be provisioned by a Super Administrator.',
      });
      return;
    }

    // Role check: ONLY authorized admin roles permitted
    if (!isAdminRole(user.role)) {
      logger.warn(`[ADMIN GOOGLE AUTH REJECTED] Non-admin role for ${verifiedEmail}: ${user.role}`);
      res.status(403).json({
        status: 'fail',
        message: 'Access denied. Account is not registered with administrative privileges.',
      });
      return;
    }

    // Status check
    if (user.status !== 'ACTIVE') {
      logger.warn(`[ADMIN GOOGLE AUTH BLOCKED] Inactive account for ${verifiedEmail}: ${user.status}`);
      res.status(403).json({
        status: 'fail',
        message: `Account is ${user.status.toLowerCase()}. Access denied.`,
      });
      return;
    }

    // Optionally sync photoURL if user does not have one
    if (claims.picture && !user.photoURL) {
      try {
        await db
          .update(usersTable)
          .set({ photoURL: claims.picture })
          .where(eq(usersTable.id, user.id));
        user.photoURL = claims.picture;
      } catch (err: any) {
        logger.warn(`[ADMIN GOOGLE AUTH] Could not update photoURL: ${err.message}`);
      }
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
        method: 'google_sso',
      },
      ipAddress,
      userAgent,
    });

    logger.info(`[ADMIN GOOGLE AUTH SUCCESS] Admin logged in with Google SSO: ${user.email} (Role: ${user.role})`);

    res.status(200).json({
      status: 'success',
      message: 'Admin authenticated successfully via Google.',
      tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role as UserRole,
        status: user.status as AccountStatus,
        permissions: getRolePermissions(user.role),
        photoURL: user.photoURL,
      },
    });
  } catch (error: any) {
    logger.error(`[ADMIN GOOGLE AUTH ERROR] ${error.message}`);
    res.status(401).json({
      status: 'fail',
      message: error.message || 'Google authentication failed.',
    });
  }
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

/**
 * Updates admin profile details (fullName, phoneNumber, photoURL).
 */
export const updateAdminProfile = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const { fullName, phoneNumber, photoURL } = req.body;
    const updates: Record<string, any> = {};

    if (fullName !== undefined) updates.fullName = String(fullName).trim();
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber ? String(phoneNumber).trim() : null;
    if (photoURL !== undefined) updates.photoURL = photoURL ? String(photoURL).trim() : null;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ status: 'fail', message: 'No valid update fields provided.' });
      return;
    }

    const [updated] = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, adminId as any))
      .returning({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
        photoURL: usersTable.photoURL,
        phoneNumber: usersTable.phoneNumber,
      });

    if (!updated) {
      res.status(404).json({ status: 'fail', message: 'Admin not found.' });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully.',
      user: {
        ...updated,
        permissions: getRolePermissions(updated.role as UserRole),
      },
    });
  } catch (error: any) {
    if (error.code === '23505' || error.message?.includes('unique constraint')) {
      res.status(409).json({
        status: 'fail',
        message: 'Phone number or username is already taken by another account.',
      });
      return;
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Uploads a profile picture for the authenticated admin.
 */
export const uploadAdminAvatar = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ status: 'fail', message: 'No image file uploaded.' });
      return;
    }

    const stored = await storageProvider.saveFile(file);

    await db
      .update(usersTable)
      .set({ photoURL: stored.url })
      .where(eq(usersTable.id, adminId as any));

    res.status(200).json({
      status: 'success',
      message: 'Profile picture updated successfully.',
      photoURL: stored.url,
    });
  } catch (error: any) {
    res.status(400).json({ status: 'fail', message: error.message || 'Failed to upload profile picture.' });
  }
};

/**
 * Resets / removes the profile picture for the authenticated admin.
 */
export const removeAdminAvatar = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    await db
      .update(usersTable)
      .set({ photoURL: null })
      .where(eq(usersTable.id, adminId as any));

    res.status(200).json({
      status: 'success',
      message: 'Profile picture removed.',
      photoURL: null,
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
