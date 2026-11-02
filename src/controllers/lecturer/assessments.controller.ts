import type { Response } from 'express';
import { assessmentService } from '../../services/assessmentService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';

export const createAssessmentDraftHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId || req.body.offeringId);
    if (!offeringId || offeringId === 'undefined') {
      res.status(400).json({ status: 'fail', message: 'Course offering ID is required.' });
      return;
    }

    const assessment = await assessmentService.createDraft(
      lecturerId,
      offeringId,
      req.body,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(201).json({
      status: 'success',
      message: 'Assessment draft created successfully.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to create assessment draft.',
    });
  }
};

export const listOfferingAssessmentsHandler = async (
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
    const { status, type, page, limit } = req.query;

    const result = await assessmentService.listOfferingAssessments(
      lecturerId,
      offeringId,
      {
        status: status as string | undefined,
        type: type as string | undefined,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to list assessments.',
    });
  }
};

export const getAssessmentDetailsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const assessment = await assessmentService.getAssessmentDetails(
      lecturerId,
      'LECTURER',
      assessmentId
    );

    res.status(200).json({
      status: 'success',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessment details.',
    });
  }
};

export const updateAssessmentDraftHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const assessment = await assessmentService.updateDraft(
      lecturerId,
      assessmentId,
      req.body,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment draft updated successfully.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to update assessment draft.',
    });
  }
};

export const assignQuestionsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const result = await assessmentService.assignQuestions(
      lecturerId,
      assessmentId,
      req.body.questions,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Questions assigned to assessment successfully.',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to assign questions.',
    });
  }
};

export const publishAssessmentHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const assessment = await assessmentService.publishAssessment(
      lecturerId,
      assessmentId,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment published successfully with frozen question snapshots.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to publish assessment.',
    });
  }
};

export const rescheduleAssessmentHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const { startTime, endTime, reason } = req.body;

    const assessment = await assessmentService.rescheduleAssessment(
      lecturerId,
      assessmentId,
      startTime,
      endTime,
      reason,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment rescheduled successfully.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to reschedule assessment.',
    });
  }
};

export const extendAssessmentHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const { endTime, reason } = req.body;

    const assessment = await assessmentService.extendAssessment(
      lecturerId,
      assessmentId,
      endTime,
      reason,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment closing deadline extended successfully.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to extend assessment.',
    });
  }
};

export const cancelAssessmentHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const { reason } = req.body;

    const assessment = await assessmentService.cancelAssessment(
      lecturerId,
      'LECTURER',
      assessmentId,
      reason,
      {
        actorId: lecturerId,
        actorRole: 'LECTURER',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment cancelled successfully.',
      data: { assessment },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to cancel assessment.',
    });
  }
};

export const getAssessmentAuditLogsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    // Verify lecturer assignment first
    const assessment = await assessmentService.getAssessmentDetails(lecturerId, 'LECTURER', assessmentId);
    const auditLogs = await assessmentService.getAssessmentAuditLogs(assessmentId);

    res.status(200).json({
      status: 'success',
      data: { auditLogs },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessment audit logs.',
    });
  }
};

