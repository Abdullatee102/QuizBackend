import type { Response } from 'express';
import { assessmentAttemptService } from '../../services/assessmentAttemptService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getAvailableAssessmentsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id ? String(req.user.id) : null;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessments = await assessmentAttemptService.getAvailableAssessmentsForStudent(studentId);

    res.status(200).json({
      status: 'success',
      data: { assessments },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve available assessments.',
    });
  }
};

export const getAssessmentInstructionsHandler = async (
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
    const result = await assessmentAttemptService.getAssessmentInstructions(studentId, assessmentId);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessment instructions.',
    });
  }
};

export const startOrResumeAttemptHandler = async (
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
    const clientMeta: { clientIp?: string | undefined; userAgent?: string | undefined } = {
      clientIp: req.ip || (req.socket?.remoteAddress as string) || undefined,
      userAgent: req.headers['user-agent'] || undefined,
    };

    const result = await assessmentAttemptService.startOrResumeAttempt(studentId, assessmentId, clientMeta);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to initialize assessment attempt.',
    });
  }
};

export const saveAnswersHandler = async (
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
    const attemptId = String(req.params.attemptId);
    const { answers } = req.body;

    const result = await assessmentAttemptService.saveAnswers(studentId, assessmentId, attemptId, answers);

    res.status(200).json(result);
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden') || error.message?.includes('does not belong to you');
    const isExpired = error.message?.includes('expired') || error.message?.includes('timed out');
    res.status(isForbidden ? 403 : isExpired ? 400 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to save answers.',
    });
  }
};

export const heartbeatHandler = async (
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
    const attemptId = String(req.params.attemptId);

    const result = await assessmentAttemptService.recordHeartbeat(studentId, assessmentId, attemptId);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Heartbeat update failed.',
    });
  }
};

export const submitAttemptHandler = async (
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
    const attemptId = String(req.params.attemptId);
    const { answers } = req.body || {};

    const result = await assessmentAttemptService.submitAttempt(studentId, assessmentId, attemptId, answers);

    res.status(200).json(result);
  } catch (error: any) {
    const isExpired = error.message?.includes('timed out') || error.message?.includes('passed');
    res.status(isExpired ? 400 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to submit assessment.',
    });
  }
};
