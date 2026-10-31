import type { Response } from 'express';
import { adminLecturerService } from '../../services/admin/adminLecturerService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

/**
 * Provisions a new lecturer account.
 */
export const provisionLecturerHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const lecturer = await adminLecturerService.provisionLecturer(
      req.body,
      adminUserId,
      { ipAddress, userAgent }
    );

    res.status(201).json({
      status: 'success',
      message: 'Lecturer account provisioned successfully.',
      data: lecturer,
    });
  } catch (error: any) {
    logger.warn(`[PROVISION LECTURER FAIL] ${error.message}`);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

/**
 * Lists lecturer accounts with pagination and filters.
 */
export const listLecturersHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { search, status, facultyId, departmentId, page, limit } = req.query;

    const result = await adminLecturerService.listLecturers({
      search: typeof search === 'string' ? search : undefined,
      status: typeof status === 'string' ? status : undefined,
      facultyId: typeof facultyId === 'string' ? facultyId : undefined,
      departmentId: typeof departmentId === 'string' ? departmentId : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result.lecturers,
      pagination: result.pagination,
    });
  } catch (error: any) {
    logger.error(`[LIST LECTURERS ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve lecturers.',
    });
  }
};

/**
 * Retrieves a single lecturer's details along with their course assignments.
 */
export const getLecturerDetailsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { lecturerId: rawLecturerId } = req.params;

    if (!rawLecturerId) {
      res.status(400).json({
        status: 'fail',
        message: 'Lecturer ID parameter is required.',
      });
      return;
    }
    const lecturerId = String(rawLecturerId);

    const result = await adminLecturerService.getLecturerDetails(lecturerId);

    if (!result) {
      res.status(404).json({
        status: 'fail',
        message: 'Lecturer not found.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    logger.error(`[GET LECTURER DETAILS ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve lecturer details.',
    });
  }
};

/**
 * Assigns a course to a lecturer.
 */
export const assignCourseHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const { lecturerId: rawLecturerId } = req.params;
    const { courseId, academicSession, semester } = req.body;

    if (!rawLecturerId) {
      res.status(400).json({
        status: 'fail',
        message: 'Lecturer ID parameter is required.',
      });
      return;
    }
    const lecturerId = String(rawLecturerId);

    if (!courseId) {
      res.status(400).json({
        status: 'fail',
        message: 'courseId is required in request body.',
      });
      return;
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const result = await adminLecturerService.assignCourseToLecturer(
      lecturerId,
      String(courseId),
      { academicSession, semester },
      adminUserId,
      { ipAddress, userAgent }
    );

    res.status(201).json({
      status: 'success',
      message: 'Course successfully assigned to lecturer.',
      data: result,
    });
  } catch (error: any) {
    logger.warn(`[ASSIGN COURSE FAIL] ${error.message}`);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

/**
 * Revokes a course assignment for a lecturer.
 */
export const revokeCourseAssignmentHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const { lecturerId: rawLecturerId, courseId: rawCourseId } = req.params;

    if (!rawLecturerId || !rawCourseId) {
      res.status(400).json({
        status: 'fail',
        message: 'Lecturer ID and Course ID parameters are required.',
      });
      return;
    }
    const lecturerId = String(rawLecturerId);
    const courseId = String(rawCourseId);

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    const academicSession = typeof req.query.academicSession === 'string' ? req.query.academicSession : (typeof req.body?.academicSession === 'string' ? req.body.academicSession : undefined);
    const semester = typeof req.query.semester === 'string' ? req.query.semester : (typeof req.body?.semester === 'string' ? req.body.semester : undefined);

    const revoked = await adminLecturerService.revokeCourseAssignment(
      lecturerId,
      courseId,
      adminUserId,
      { academicSession, semester },
      { ipAddress, userAgent }
    );

    res.status(200).json({
      status: 'success',
      message: 'Course assignment revoked successfully.',
      data: revoked,
    });
  } catch (error: any) {
    logger.warn(`[REVOKE COURSE FAIL] ${error.message}`);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
