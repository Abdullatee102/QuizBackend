import type { Response } from 'express';
import { attendanceService } from '../../services/attendanceService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

export const createSessionHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const session = await attendanceService.createSession(lecturerId, offeringId, req.body);

    res.status(201).json({
      status: 'success',
      data: session,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to create attendance session.',
    });
  }
};

export const updateSessionHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const sessionId = String(req.params.sessionId);
    const updated = await attendanceService.updateSession(lecturerId, offeringId, sessionId, req.body);

    res.status(200).json({
      status: 'success',
      data: updated,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to update attendance session.',
    });
  }
};

export const listSessionsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const { status, page, limit } = req.query;

    const data = await attendanceService.listSessions(lecturerId, offeringId, {
      status: typeof status === 'string' ? status : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

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
      message: error.message || 'Failed to list attendance sessions.',
    });
  }
};

export const getSessionDetailsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const sessionId = String(req.params.sessionId);

    const data = await attendanceService.getSessionDetails(lecturerId, offeringId, sessionId);

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
      message: error.message || 'Failed to retrieve attendance session details.',
    });
  }
};

export const recordBatchAttendanceHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const sessionId = String(req.params.sessionId);

    const result = await attendanceService.recordBatchAttendance(
      lecturerId,
      offeringId,
      sessionId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to record attendance.',
    });
  }
};

export const updateAttendanceRecordHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const sessionId = String(req.params.sessionId);
    const recordId = String(req.params.recordId);

    const result = await attendanceService.updateAttendanceRecord(
      lecturerId,
      offeringId,
      sessionId,
      recordId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to correct attendance record.',
    });
  }
};

export const getOfferingAttendanceSummaryHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const summary = await attendanceService.getOfferingAttendanceSummary(lecturerId, offeringId);

    res.status(200).json({
      status: 'success',
      data: summary,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to retrieve offering attendance summary.',
    });
  }
};

export const getStudentAttendanceHistoryHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const studentId = String(req.params.studentId);

    const data = await attendanceService.getStudentAttendanceHistory(lecturerId, offeringId, studentId);

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
      message: error.message || 'Failed to retrieve student attendance history.',
    });
  }
};

