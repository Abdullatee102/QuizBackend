import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable, coursesTable, courseAssignmentsTable, USER_ROLES } from '../db/schema.js';
import type { LecturerAuthenticatedRequest, LecturerUserPayload } from '../types/lecturer.types.js';
import type { UserRole, AccountStatus } from '../db/schema.js';
import logger from '../config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
  throw new Error('[FATAL] JWT_SECRET environment variable is missing or insecure.');
}

/**
 * Protects lecturer-facing routes.
 * Ensures the requester possesses a valid JWT and an active account with the LECTURER role.
 */
export const protectLecturer = async (
  req: LecturerAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Lecturer token missing or malformed.',
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
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. Lecturer account does not exist.',
      });
      return;
    }

    // Verify account status
    if (user.status !== 'ACTIVE') {
      logger.warn(`[LECTURER AUTH BLOCKED] User ${user.email} status is ${user.status}`);
      res.status(403).json({
        status: 'fail',
        message: `Account is ${user.status.toLowerCase()}. Access denied.`,
      });
      return;
    }

    // Verify role is LECTURER
    if (user.role !== USER_ROLES.LECTURER) {
      logger.warn(`[LECTURER AUTH DENIED] Non-lecturer ${user.email} (Role: ${user.role}) attempted lecturer access`);
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. Lecturer access required.',
      });
      return;
    }

    const lecturerPayload: LecturerUserPayload = {
      id: String(user.id),
      email: String(user.email),
      fullName: user.fullName,
      username: user.username,
      role: user.role as UserRole,
      status: user.status as AccountStatus,
      facultyId: user.facultyId,
      departmentId: user.departmentId,
    };

    req.lecturerUser = lecturerPayload;
    next();
  } catch (error: any) {
    logger.warn(`[LECTURER AUTH ERROR] Token verification failed: ${error.message}`);
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Lecturer token expired or invalid.',
    });
    return;
  }
};

/**
 * Ensures the authenticated lecturer has an ACTIVE assignment for the course identified in req.params.courseId.
 * Prevents Insecure Direct Object References (IDOR).
 */
export const requireLecturerCourseAssignment = async (
  req: LecturerAuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.lecturerUser) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized. Lecturer credentials required.',
    });
    return;
  }

  const { courseId } = req.params;

  if (!courseId) {
    res.status(400).json({
      status: 'fail',
      message: 'Course ID parameter is required.',
    });
    return;
  }

  try {
    // 1. Verify course existence
    const [course] = await db
      .select({
        id: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        semester: coursesTable.semester,
        departmentId: coursesTable.departmentId,
        isActive: coursesTable.isActive,
      })
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    if (!course || !course.isActive) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found or inactive.',
      });
      return;
    }

    // 2. Verify active assignment for this lecturer
    const [assignment] = await db
      .select()
      .from(courseAssignmentsTable)
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, req.lecturerUser.id as any),
          eq(courseAssignmentsTable.courseId, courseId as any),
          eq(courseAssignmentsTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      logger.warn(
        `[LECTURER ACCESS DENIED] Lecturer ${req.lecturerUser.email} unauthorized for course: ${courseId}`
      );
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. You are not assigned to this course.',
      });
      return;
    }

    req.assignedCourse = {
      ...course,
      assignment: {
        id: assignment.id,
        academicSession: assignment.academicSession,
        semester: assignment.semester,
        assignedAt: assignment.createdAt,
      },
    };

    next();
  } catch (error: any) {
    logger.error(`[COURSE ACCESS VERIFICATION ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred verifying course assignment authorization.',
    });
    return;
  }
};

