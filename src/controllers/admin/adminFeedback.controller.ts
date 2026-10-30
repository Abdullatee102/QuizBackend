import type { Response } from 'express';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import { adminFeedbackService } from '../../services/admin/adminFeedbackService.js';
import logger from '../../config/logger.js';

export const adminFeedbackController = {
  // =====================================================
  // GET ANALYTICS SUMMARY
  // =====================================================
  getSummary: async (
    req: AdminAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const version = (req.query.version as string) || '1.0';
      const facultyId = req.query.facultyId as string | undefined;

      const summary = await adminFeedbackService.getFeedbackSummary(
        version,
        facultyId
      );

      res.status(200).json({
        status: 'success',
        data: summary,
      });
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK SUMMARY CONTROLLER] ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve feedback analytics summary.',
      });
    }
  },

  // =====================================================
  // LIST PAGINATED SUBMISSIONS
  // =====================================================
  listSubmissions: async (
    req: AdminAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const version = (req.query.version as string) || '1.0';
      const satisfaction = req.query.satisfaction
        ? Number(req.query.satisfaction)
        : undefined;
      const friction = req.query.friction as string | undefined;
      const facultyId = req.query.facultyId as string | undefined;
      const search = req.query.search as string | undefined;

      const result = await adminFeedbackService.listFeedbackSubmissions({
        page,
        limit,
        version,
        satisfaction,
        friction,
        facultyId,
        search,
      });

      res.status(200).json({
        status: 'success',
        ...result,
      });
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK LIST CONTROLLER] ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve feedback submissions list.',
      });
    }
  },

  // =====================================================
  // GET SUBMISSION DETAIL
  // =====================================================
  getDetail: async (
    req: AdminAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const feedbackId = Array.isArray(id) ? id[0] : id;
    if (!feedbackId) {
      res.status(400).json({
        status: 'fail',
        message: 'Feedback ID is required.',
      });
      return;
    }

    try {
      const detail = await adminFeedbackService.getFeedbackDetail(feedbackId);

      if (!detail) {
        res.status(404).json({
          status: 'fail',
          message: 'Feedback submission not found.',
        });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: detail,
      });
    } catch (error: any) {
      logger.error(`[ADMIN FEEDBACK DETAIL CONTROLLER] ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve feedback submission details.',
      });
    }
  },
};
