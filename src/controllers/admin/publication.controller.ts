import type { Response } from 'express';
import { gradebookService } from '../../services/gradebookService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import logger from '../../config/logger.js';

export const getAdminAssessmentPublicationReviewHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const assessmentId = String(req.params.assessmentId);
    const { page, limit, search, status } = req.query;

    const data = await gradebookService.getAssessmentGradebook(
      adminUserId,
      'ADMIN',
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
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 500).json({
      status: isNotFound ? 'fail' : 'error',
      message: error.message || 'Failed to retrieve assessment publication review.',
    });
  }
};

export const adminApproveResultsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const assessmentId = String(req.params.assessmentId);
    const { notes } = req.body || {};

    const updated = await gradebookService.adminApproveResults(
      adminUserId,
      assessmentId,
      notes
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment results approved for publication release.',
      data: updated,
    });
  } catch (error: any) {
    const isBadRequest =
      error.message?.includes('Cannot approve') ||
      error.message?.includes('not found');
    res.status(isBadRequest ? 400 : 500).json({
      status: isBadRequest ? 'fail' : 'error',
      message: error.message || 'Failed to approve assessment results.',
    });
  }
};

export const adminRejectResultsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const assessmentId = String(req.params.assessmentId);
    const { reason } = req.body || {};

    if (!reason) {
      res.status(400).json({
        status: 'fail',
        message: 'A rejection reason of at least 5 characters is required.',
      });
      return;
    }

    const updated = await gradebookService.adminRejectResults(
      adminUserId,
      assessmentId,
      reason
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment results returned for lecturer review.',
      data: updated,
    });
  } catch (error: any) {
    const isBadRequest =
      error.message?.includes('Cannot reject') ||
      error.message?.includes('required') ||
      error.message?.includes('not found');
    res.status(isBadRequest ? 400 : 500).json({
      status: isBadRequest ? 'fail' : 'error',
      message: error.message || 'Failed to reject assessment results.',
    });
  }
};

export const adminPublishResultsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const assessmentId = String(req.params.assessmentId);

    const updated = await gradebookService.adminPublishResults(
      adminUserId,
      assessmentId
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment results officially published and released to students.',
      data: updated,
    });
  } catch (error: any) {
    const isBadRequest =
      error.message?.includes('Cannot publish') ||
      error.message?.includes('not found');
    res.status(isBadRequest ? 400 : 500).json({
      status: isBadRequest ? 'fail' : 'error',
      message: error.message || 'Failed to publish assessment results.',
    });
  }
};

export const adminModerateGradeHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminUserId = req.adminUser!.id;
    const assessmentId = String(req.params.assessmentId);
    const gradeId = String(req.params.gradeId);

    const updated = await gradebookService.moderateGrade(
      adminUserId,
      'ADMIN',
      assessmentId,
      gradeId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      message: 'Grade moderated successfully by administrator.',
      data: updated,
    });
  } catch (error: any) {
    const isBadRequest =
      error.message?.includes('must be') ||
      error.message?.includes('mandatory') ||
      error.message?.includes('not found');
    res.status(isBadRequest ? 400 : 500).json({
      status: isBadRequest ? 'fail' : 'error',
      message: error.message || 'Failed to moderate grade.',
    });
  }
};

