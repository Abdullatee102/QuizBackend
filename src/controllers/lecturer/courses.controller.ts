import type { Response } from 'express';
import { lecturerService } from '../../services/lecturerService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

/**
 * Returns summary overview metrics for the authenticated lecturer dashboard.
 */
export const getLecturerDashboard = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser!.id;
    const overview = await lecturerService.getLecturerDashboardData(lecturerId);

    res.status(200).json({
      status: 'success',
      data: overview,
    });
  } catch (error: any) {
    logger.error(`[LECTURER DASHBOARD ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve lecturer dashboard metrics.',
    });
  }
};

/**
 * Lists courses actively assigned to the authenticated lecturer.
 */
export const listAssignedCourses = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser!.id;
    const { page, limit, search, semester, academicSession } = req.query;

    const result = await lecturerService.getAssignedCourses(lecturerId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: typeof search === 'string' ? search : undefined,
      semester: typeof semester === 'string' ? semester : undefined,
      academicSession: typeof academicSession === 'string' ? academicSession : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result.courses,
      pagination: result.pagination,
    });
  } catch (error: any) {
    logger.error(`[LIST ASSIGNED COURSES ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve assigned courses.',
    });
  }
};

/**
 * Returns course details for an assigned course.
 * Protected by requireLecturerCourseAssignment middleware against unauthorized access.
 */
export const getAssignedCourseDetails = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser!.id;
    const { courseId } = req.params;

    if (!courseId) {
      res.status(400).json({
        status: 'fail',
        message: 'Course ID parameter is required.',
      });
      return;
    }

    const courseDetails = await lecturerService.getAssignedCourseDetails(lecturerId, String(courseId));

    if (!courseDetails) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found or assignment inactive.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: courseDetails,
    });
  } catch (error: any) {
    logger.error(`[COURSE DETAILS ERROR] ${error.message}`);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve course details.',
    });
  }
};
