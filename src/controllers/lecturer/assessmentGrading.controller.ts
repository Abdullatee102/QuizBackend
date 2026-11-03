import type { Response } from 'express';
import { assessmentGradingService } from '../../services/assessmentGradingService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getLecturerGradingOverviewHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.user?.id ? String(req.user.id) : null;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const result = await assessmentGradingService.getLecturerGradingOverview(lecturerId, assessmentId);

    res.status(200).json({
      status: 'success',
      success: true,
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to retrieve assessment grading overview.',
    });
  }
};

export const getAttemptGradingDetailHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.user?.id ? String(req.user.id) : null;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const attemptId = String(req.params.attemptId);

    const result = await assessmentGradingService.getAttemptGradingDetail(lecturerId, assessmentId, attemptId);

    res.status(200).json({
      status: 'success',
      success: true,
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to retrieve attempt grading details.',
    });
  }
};

export const gradeTheoryQuestionsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.user?.id ? String(req.user.id) : null;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const attemptId = String(req.params.attemptId);
    const { questionGrades, reason } = req.body;

    const result = await assessmentGradingService.gradeTheoryQuestions(
      lecturerId,
      assessmentId,
      attemptId,
      questionGrades,
      reason
    );

    res.status(200).json({
      status: 'success',
      success: true,
      message: 'Theory questions graded successfully and audit recorded.',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to grade theory questions.',
    });
  }
};

export const getAiTheorySuggestionHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.user?.id ? String(req.user.id) : null;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', success: false, message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const attemptId = String(req.params.attemptId);
    const assessmentQuestionId = String(req.params.assessmentQuestionId);

    const result = await assessmentGradingService.getAiTheorySuggestion(
      lecturerId,
      assessmentId,
      attemptId,
      assessmentQuestionId
    );

    res.status(200).json({
      status: 'success',
      success: true,
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      success: false,
      message: error.message || 'Failed to generate AI theory suggestion.',
    });
  }
};

