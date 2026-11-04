import type { Response } from 'express';
import { gradebookService } from '../../services/gradebookService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

export const getOfferingGradebookHandler = async (
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
    const { page, limit, search } = req.query;

    const data = await gradebookService.getOfferingGradebook(lecturerId, offeringId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      search: typeof search === 'string' ? search : undefined,
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    if (statusCode === 500) {
      logger.error(`[OFFERING GRADEBOOK ERROR] ${error.message}`);
    }

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to retrieve offering gradebook.',
    });
  }
};

export const getAssessmentGradebookHandler = async (
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
    const { page, limit, search, status } = req.query;

    const data = await gradebookService.getAssessmentGradebook(
      lecturerId,
      'LECTURER',
      assessmentId,
      {
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: typeof search === 'string' ? search : undefined,
        status: typeof status === 'string' ? status : undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    if (statusCode === 500) {
      logger.error(`[ASSESSMENT GRADEBOOK ERROR] ${error.message}`);
    }

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to retrieve assessment gradebook.',
    });
  }
};

export const moderateGradeHandler = async (
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
    const gradeId = String(req.params.gradeId);

    const updated = await gradebookService.moderateGrade(
      lecturerId,
      'LECTURER',
      assessmentId,
      gradeId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      message: 'Grade moderated successfully.',
      data: updated,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isBadRequest =
      error.message?.includes('must be') ||
      error.message?.includes('mandatory') ||
      error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isBadRequest ? 400 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to moderate grade.',
    });
  }
};

export const submitResultsApprovalHandler = async (
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
    const { overrideIncompleteReason } = req.body || {};

    const updated = await gradebookService.submitAssessmentResultsForApproval(
      lecturerId,
      assessmentId,
      { overrideIncompleteReason }
    );

    res.status(200).json({
      status: 'success',
      message: 'Results successfully submitted for administrative publication approval.',
      data: updated,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isBadRequest =
      error.message?.includes('Cannot submit') ||
      error.message?.includes('already submitted') ||
      error.message?.includes('already approved') ||
      error.message?.includes('already officially published');
    const statusCode = isForbidden ? 403 : isBadRequest ? 400 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to submit results for approval.',
    });
  }
};
