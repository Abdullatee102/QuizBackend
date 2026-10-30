import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { feedbackService, FeedbackError } from '../services/feedbackService.js';
import logger from '../config/logger.js';

export const feedbackController = {
  // =====================================================
  // GET ELIGIBILITY STATUS
  // =====================================================
  getEligibility: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User identification missing.',
      });
      return;
    }

    const version = (req.query.version as string) || '1.0';

    try {
      const eligibility = await feedbackService.checkEligibility(
        String(userId),
        version
      );

      res.status(200).json({
        status: 'success',
        data: eligibility,
      });
    } catch (error: any) {
      logger.error(`[FEEDBACK ELIGIBILITY ERROR] ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Failed to verify feedback eligibility. Please try again.',
      });
    }
  },

  // =====================================================
  // SUBMIT FEEDBACK
  // =====================================================
  submitFeedback: async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized. User identification missing.',
      });
      return;
    }

    try {
      const result = await feedbackService.submitFeedback(
        String(userId),
        req.body
      );

      res.status(201).json({
        status: 'success',
        message:
          'Feedback submitted successfully. Thank you for helping improve Brain Buzz!',
        data: result,
      });
    } catch (error: any) {
      if (error instanceof FeedbackError) {
        res.status(error.statusCode).json({
          status: 'fail',
          code: error.code,
          message: error.message,
        });
        return;
      }

      logger.error(`[FEEDBACK SUBMIT CONTROLLER ERROR] ${error.message}`);
      res.status(500).json({
        status: 'error',
        message: 'An error occurred while saving your feedback.',
      });
    }
  },
};

