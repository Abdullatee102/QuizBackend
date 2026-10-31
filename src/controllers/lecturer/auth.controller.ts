import type { Response } from 'express';
import { eq, or } from 'drizzle-orm';
import { db } from '../../db/index.js';
import { usersTable, USER_ROLES } from '../../db/schema.js';
import { authService } from '../../services/authService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

/**
 * Handles lecturer login for the lecturer web portal.
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
 * Returns the currently authenticated lecturer's profile and account status.
 */
export const getLecturerMe = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  res.status(200).json({
    status: 'success',
    user: req.lecturerUser,
  });
};

