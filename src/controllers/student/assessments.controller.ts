import type { Response } from 'express';
import { assessmentService } from '../../services/assessmentService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getStudentOfferingAssessmentsHandler = async (
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
    const assessments = await assessmentService.getStudentAvailableAssessments(studentId, offeringId);

    res.status(200).json({
      status: 'success',
      data: { assessments },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessments.',
    });
  }
};

export const getStudentAssessmentDetailsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id ? String(req.user.id) : null;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const assessment = await assessmentService.getAssessmentDetails(studentId, 'STUDENT', assessmentId);

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
