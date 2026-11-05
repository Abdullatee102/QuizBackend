import type { Response } from 'express';
import { discussionService } from '../../services/discussionService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const listStudentDiscussionsHandler = async (
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
    const data = await discussionService.listDiscussions(studentId, 'STUDENT', offeringId);

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
      message: error.message || 'Failed to list course discussions.',
    });
  }
};

export const createStudentDiscussionHandler = async (
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
    const discussion = await discussionService.createDiscussion(
      studentId,
      'STUDENT',
      offeringId,
      req.body
    );

    res.status(201).json({
      status: 'success',
      data: discussion,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to create discussion thread.',
    });
  }
};

export const getStudentDiscussionDetailsHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const data = await discussionService.getDiscussionDetails(
      studentId,
      'STUDENT',
      offeringId,
      discussionId
    );

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
      message: error.message || 'Failed to get discussion details.',
    });
  }
};

export const replyStudentDiscussionHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const reply = await discussionService.replyToDiscussion(
      studentId,
      'STUDENT',
      offeringId,
      discussionId,
      req.body
    );

    res.status(201).json({
      status: 'success',
      data: reply,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to reply to discussion.',
    });
  }
};

export const deleteStudentDiscussionHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const result = await discussionService.deleteDiscussion(
      studentId,
      'STUDENT',
      offeringId,
      discussionId
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
      message: error.message || 'Failed to delete discussion.',
    });
  }
};

