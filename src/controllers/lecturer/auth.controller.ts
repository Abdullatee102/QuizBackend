import type { Response } from 'express';
import { eq, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { usersTable, facultiesTable, departmentsTable, USER_ROLES } from '../../db/schema.js';
import { authService } from '../../services/authService.js';
import { googleAuthService } from '../../services/googleAuthService.js';
import { storageProvider } from '../../services/storage/storageService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

/**
 * Handles lecturer login for the lecturer web portal with email/password.
 * Explicitly blocks students and non-lecturers.
 */
export const lecturerLogin = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'Email and password are required.',
      });
      return;
    }

    const normalizedIdentifier = String(email).trim().toLowerCase();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, normalizedIdentifier),
          eq(usersTable.username, normalizedIdentifier)
        )
      );

    if (!user || user.password !== password) {
      logger.warn(`[LECTURER LOGIN FAILED] Invalid credentials for: ${normalizedIdentifier}`);
      res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password.',
      });
      return;
    }

    // Account status check
    if (user.status !== 'ACTIVE') {
      logger.warn(`[LECTURER LOGIN BLOCKED] Blocked ${user.status} lecturer: ${user.email}`);
      res.status(403).json({
        status: 'fail',
        message: `Account is ${user.status.toLowerCase()}. Access denied.`,
      });
      return;
    }

    // Explicit role authorization check
    if (user.role !== USER_ROLES.LECTURER) {
      logger.warn(`[LECTURER LOGIN DENIED] Non-lecturer attempted lecturer login: ${user.email} (Role: ${user.role})`);
      res.status(403).json({
        status: 'fail',
        message: 'Access denied. Account is not registered as an authorized lecturer.',
      });
      return;
    }

    const tokens = await authService.generateAuthTokens({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

    logger.info(`[LECTURER LOGIN SUCCESS] Lecturer authenticated: ${user.email}`);

    res.status(200).json({
      status: 'success',
      message: 'Lecturer authenticated successfully.',
      tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        facultyId: user.facultyId,
        departmentId: user.departmentId,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error: any) {
    logger.error(`[LECTURER LOGIN ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'An internal server error occurred during lecturer login.',
    });
  }
};

/**
 * Handles secure Google Sign-In for Lecturers with strict institutional authorization.
 * Reject any user that does not already have an approved ACTIVE account with the LECTURER role.
 */
export const lecturerGoogleLogin = async (
  req: LecturerAuthenticatedRequest,
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

    // Check whether the user already has an authorized Brain Buzz account
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, verifiedEmail));

    if (!user) {
      logger.warn(`[LECTURER GOOGLE AUTH REJECTED] Unregistered Google identity: ${verifiedEmail}`);
      res.status(403).json({
        status: 'fail',
        message: 'Access denied. No authorized Brain Buzz lecturer account found for this Google email. Please contact the administrator.',
      });
      return;
    }

    // Role check: ONLY authorized lecturers permitted
    if (user.role !== USER_ROLES.LECTURER) {
      logger.warn(`[LECTURER GOOGLE AUTH REJECTED] Role mismatch for ${verifiedEmail}: ${user.role}`);
      res.status(403).json({
        status: 'fail',
        message: 'Access denied. This account does not possess authorized lecturer privileges.',
      });
      return;
    }

    // Account status check
    if (user.status !== 'ACTIVE') {
      logger.warn(`[LECTURER GOOGLE AUTH BLOCKED] Inactive account for ${verifiedEmail}: ${user.status}`);
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
        logger.warn(`[LECTURER GOOGLE AUTH] Could not update photoURL: ${err.message}`);
      }
    }

    const tokens = await authService.generateAuthTokens({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    });

    logger.info(`[LECTURER GOOGLE AUTH SUCCESS] Verified Google identity for lecturer: ${user.email}`);

    res.status(200).json({
      status: 'success',
      message: 'Google authentication successful.',
      tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        facultyId: user.facultyId,
        departmentId: user.departmentId,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error: any) {
    logger.error(`[LECTURER GOOGLE AUTH ERROR] ${error.message}`);
    res.status(401).json({
      status: 'fail',
      message: error.message || 'Google authentication failed.',
    });
  }
};

/**
 * Returns the currently authenticated lecturer's profile, including institutional affiliation.
 */
export const getLecturerMe = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const [user] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
        photoURL: usersTable.photoURL,
        phoneNumber: usersTable.phoneNumber,
        bio: usersTable.bio,
        facultyName: facultiesTable.name,
        departmentName: departmentsTable.name,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(eq(usersTable.id, lecturerId as any));

    res.status(200).json({
      status: 'success',
      user: user || req.lecturerUser,
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Updates editable profile details for the authenticated lecturer.
 * Protected institutional fields (role, status, facultyId, departmentId) cannot be altered here.
 */
export const updateLecturerProfile = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const { fullName, phoneNumber, bio, photoURL } = req.body;

    const updates: Record<string, any> = {};
    if (fullName !== undefined) updates.fullName = String(fullName).trim();
    if (phoneNumber !== undefined) updates.phoneNumber = phoneNumber ? String(phoneNumber).trim() : null;
    if (bio !== undefined) updates.bio = bio ? String(bio).trim() : null;
    if (photoURL !== undefined) updates.photoURL = photoURL ? String(photoURL).trim() : null;

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ status: 'fail', message: 'No valid update fields provided.' });
      return;
    }

    const [updated] = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, lecturerId as any))
      .returning({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
        photoURL: usersTable.photoURL,
        phoneNumber: usersTable.phoneNumber,
        bio: usersTable.bio,
      });

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully.',
      user: updated,
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
 * Changes password for the authenticated lecturer.
 */
export const changeLecturerPassword = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      res.status(400).json({
        status: 'fail',
        message: 'New password must be at least 6 characters.',
      });
      return;
    }

    const [user] = await db
      .select({ password: usersTable.password })
      .from(usersTable)
      .where(eq(usersTable.id, lecturerId as any));

    // If the user already has a local password, require currentPassword verification
    if (user?.password) {
      if (!currentPassword || user.password !== currentPassword) {
        res.status(401).json({
          status: 'fail',
          message: 'Current password is incorrect.',
        });
        return;
      }
    }

    await db
      .update(usersTable)
      .set({ password: newPassword })
      .where(eq(usersTable.id, lecturerId as any));

    logger.info(`[LECTURER PASSWORD] Password updated for lecturer ${lecturerId}`);

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully.',
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

/**
 * Uploads a profile picture for the authenticated lecturer.
 */
export const uploadLecturerAvatar = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
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
      .where(eq(usersTable.id, lecturerId as any));

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
 * Resets / removes the profile picture for the authenticated lecturer.
 */
export const removeLecturerAvatar = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    await db
      .update(usersTable)
      .set({ photoURL: null })
      .where(eq(usersTable.id, lecturerId as any));

    res.status(200).json({
      status: 'success',
      message: 'Profile picture removed.',
      photoURL: null,
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
