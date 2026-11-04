import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { opportunityService } from '../services/opportunityService.js';
import logger from '../config/logger.js';

export const opportunityController = {
  /**
   * GET /api/opportunities
   * List opportunities available to the authenticated student.
   */
  getOpportunities: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    try {
      const result = await opportunityService.listOpportunitiesForStudent(String(userId), {
        category: req.query.category as string,
        search: req.query.search as string,
        filter: req.query.filter as any,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITIES LIST ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to fetch opportunities.' });
    }
  },

  /**
   * GET /api/opportunities/:id
   * Fetch specific opportunity details for student.
   */
  getOpportunityById: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'fail', message: 'Opportunity ID is required.' });
      return;
    }

    const opportunityId = String(id);

    try {
      const opp = await opportunityService.getOpportunityForStudent(opportunityId, String(userId));
      if (!opp) {
        res.status(404).json({ status: 'fail', message: 'Opportunity not found.' });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITY DETAIL ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to fetch opportunity.' });
    }
  },

  /**
   * POST /api/opportunities/:id/track-click
   * Record outbound student click.
   */
  trackClick: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'fail', message: 'Opportunity ID is required.' });
      return;
    }

    const opportunityId = String(id);

    try {
      const updated = await opportunityService.trackClick(opportunityId);
      if (!updated) {
        res.status(404).json({ status: 'fail', message: 'Opportunity not found.' });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: { clicksCount: updated.clicksCount },
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITY CLICK TRACK ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to track outbound click.' });
    }
  },

  /**
   * GET /api/opportunities/preferences
   * Retrieve notification preferences.
   */
  getPreferences: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    try {
      const preferences = await opportunityService.getStudentPreferences(String(userId));
      res.status(200).json({
        status: 'success',
        data: { preferences },
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITY PREFERENCES GET ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to fetch preferences.' });
    }
  },

  /**
   * PUT /api/opportunities/preferences
   * Update category notification preference.
   */
  updatePreference: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { category, isEnabled } = req.body;
    try {
      const sub = await opportunityService.updateStudentPreference(
        String(userId),
        category,
        Boolean(isEnabled)
      );

      res.status(200).json({
        status: 'success',
        data: sub,
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITY PREFERENCE UPDATE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to update preference.' });
    }
  },

  /**
   * POST /api/opportunities/:id/bookmark
   * Toggle bookmark for the opportunity.
   */
  toggleBookmark: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    if (!id) {
      res.status(400).json({ status: 'fail', message: 'Opportunity ID is required.' });
      return;
    }

    const opportunityId = String(id);

    try {
      const result = await opportunityService.toggleBookmark(String(userId), opportunityId);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      logger.error(`[OPPORTUNITY BOOKMARK TOGGLE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to toggle bookmark.' });
    }
  },
};

