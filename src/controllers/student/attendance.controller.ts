import type { Response } from 'express';
import { attendanceService } from '../../services/attendanceService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getStudentSelfAttendanceHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id ? String(req.user.id) : null;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const data = await attendanceService.getStudentSelfAttendance(studentId, offeringId);

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to retrieve student attendance.',
    });
  }
};

export const studentSelfMarkAttendanceHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id ? String(req.user.id) : null;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const sessionId = String(req.params.sessionId);

    const result = await attendanceService.studentSelfMarkAttendance(studentId, offeringId, sessionId);

    res.status(200).json({
      status: 'success',
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to mark attendance.',
    });
  }
};

