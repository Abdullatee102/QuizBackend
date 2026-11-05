import type { Response } from 'express';
import { discussionService } from '../../services/discussionService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';

export const listLecturerDiscussionsHandler = async (
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
    const data = await discussionService.listDiscussions(lecturerId, 'LECTURER', offeringId);

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

export const createLecturerDiscussionHandler = async (
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
    const discussion = await discussionService.createDiscussion(
      lecturerId,
      'LECTURER',
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

export const getLecturerDiscussionDetailsHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const data = await discussionService.getDiscussionDetails(
      lecturerId,
      'LECTURER',
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

export const replyLecturerDiscussionHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const reply = await discussionService.replyToDiscussion(
      lecturerId,
      'LECTURER',
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

export const moderateLecturerDiscussionHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const updated = await discussionService.moderateDiscussion(
      lecturerId,
      offeringId,
      discussionId,
      req.body
    );

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
      message: error.message || 'Failed to moderate discussion.',
    });
  }
};

export const deleteLecturerDiscussionHandler = async (
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
    const discussionId = String(req.params.discussionId);

    const result = await discussionService.deleteDiscussion(
      lecturerId,
      'LECTURER',
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

