import type { Response } from 'express';
import { questionWorkflowService } from '../../services/questionWorkflowService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import type { QuestionStatus } from '../../db/schema.js';

export const getAdminReviewQueueHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { offeringId, courseId, status, type, difficulty, search, page, limit } = req.query;

    const result = await questionWorkflowService.getAdminReviewQueue({
      offeringId: offeringId as string | undefined,
      courseId: courseId as string | undefined,
      status: status as QuestionStatus | undefined,
      type: type as string | undefined,
      difficulty: difficulty as string | undefined,
      search: search as string | undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve question review queue.',
    });
  }
};

export const getAdminQuestionDetailsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { questionId } = req.params;

    const result = await questionWorkflowService.getAdminQuestionDetails(String(questionId));

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: error.message || 'Question not found.',
    });
  }
};

export const beginQuestionReviewHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.beginReview(
      String(adminId),
      String(questionId)
    );

    res.status(200).json({
      status: 'success',
      message: 'Question is now under review.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to begin review.',
    });
  }
};

export const requestQuestionRevisionHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;
    const { feedback } = req.body;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.requestRevision(
      String(adminId),
      String(questionId),
      String(feedback),
      {
        adminId: String(adminId),
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Revision requested from authoring lecturer.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to request revision.',
    });
  }
};

export const rejectQuestionHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;
    const { reason } = req.body;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.rejectQuestion(
      String(adminId),
      String(questionId),
      String(reason),
      {
        adminId: String(adminId),
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question submission rejected.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to reject question.',
    });
  }
};

export const approveQuestionHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.approveQuestion(
      String(adminId),
      String(questionId),
      {
        adminId: String(adminId),
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question approved successfully.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isSelfApproval = error.message?.includes('Self-approval violation');

    res.status(isNotFound ? 404 : isSelfApproval ? 403 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to approve question.',
    });
  }
};

export const publishQuestionHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;
    const { isPracticeEligible } = req.body;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.publishQuestion(
      String(adminId),
      String(questionId),
      !!isPracticeEligible,
      {
        adminId: String(adminId),
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question published successfully.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to publish question.',
    });
  }
};

export const archiveQuestionHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    const { questionId } = req.params;

    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.archiveQuestion(
      String(adminId),
      String(questionId),
      {
        adminId: String(adminId),
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question archived successfully.',
      data: { question },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to archive question.',
    });
  }
};

