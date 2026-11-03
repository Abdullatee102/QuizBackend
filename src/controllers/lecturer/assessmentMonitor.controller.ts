import type { Response } from 'express';
import { assessmentAttemptService } from '../../services/assessmentAttemptService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getAssessmentMonitorHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = (req as any).lecturerUser?.id || req.user?.id ? String((req as any).lecturerUser?.id || req.user?.id) : null;
    const userRole = (req as any).lecturerUser?.role || req.user?.role || 'LECTURER';

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const data = await assessmentAttemptService.getLecturerMonitorData(lecturerId, userRole, assessmentId);

    res.status(200).json({
      status: 'success',
      success: true,
      data,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to retrieve assessment monitoring data.',
    });
  }
};

export const forceSubmitAttemptHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = (req as any).lecturerUser?.id || req.user?.id ? String((req as any).lecturerUser?.id || req.user?.id) : null;
    const userRole = (req as any).lecturerUser?.role || req.user?.role || 'LECTURER';

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const attemptId = String(req.params.attemptId);
    const { reason } = req.body;

    const result = await assessmentAttemptService.forceSubmitAttempt(
      lecturerId,
      userRole,
      assessmentId,
      attemptId,
      reason
    );

    res.status(200).json(result);
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to force-submit attempt.',
    });
  }
};

