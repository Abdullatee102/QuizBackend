import type { Response } from 'express';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';
import { opportunityService } from '../../services/opportunityService.js';
import logger from '../../config/logger.js';

export const adminOpportunitiesController = {
  /**
   * GET /api/admin/opportunities
   * List opportunities across all statuses with pagination & search.
   */
  listOpportunities: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const result = await opportunityService.listOpportunitiesForAdmin({
        category: req.query.category as string,
        status: req.query.status as string,
        verificationStatus: req.query.verificationStatus as string,
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20,
      });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITIES LIST ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to list opportunities.' });
    }
  },

  /**
   * GET /api/admin/opportunities/:id
   * Get single opportunity detail with bookmarks analytics.
   */
  getOpportunityById: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const opportunityId = String(id);
    try {
      const opp = await opportunityService.getOpportunityByIdForAdmin(opportunityId);
      if (!opp) {
        res.status(404).json({ status: 'fail', message: 'Opportunity not found.' });
        return;
      }

      res.status(200).json({
        status: 'success',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY DETAIL ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to fetch opportunity.' });
    }
  },

  /**
   * POST /api/admin/opportunities
   * Create new opportunity.
   */
  createOpportunity: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    try {
      const opp = await opportunityService.createOpportunity(adminId, req.body);
      res.status(201).json({
        status: 'success',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY CREATE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: error.message || 'Failed to create opportunity.' });
    }
  },

  /**
   * PUT /api/admin/opportunities/:id
   * Update opportunity.
   */
  updateOpportunity: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    const opportunityId = String(id);
    try {
      const opp = await opportunityService.updateOpportunity(opportunityId, adminId, req.body);
      res.status(200).json({
        status: 'success',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY UPDATE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: error.message || 'Failed to update opportunity.' });
    }
  },

  /**
   * POST /api/admin/opportunities/:id/publish
   * Publish opportunity and optionally dispatch notifications.
   */
  publishOpportunity: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    const opportunityId = String(id);
    const notifySubscribers = req.body.notifySubscribers !== false;

    try {
      const opp = await opportunityService.publishOpportunity(opportunityId, adminId, notifySubscribers);
      res.status(200).json({
        status: 'success',
        message: 'Opportunity published successfully.',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY PUBLISH ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: error.message || 'Failed to publish opportunity.' });
    }
  },

  /**
   * POST /api/admin/opportunities/:id/archive
   * Archive opportunity.
   */
  archiveOpportunity: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    const opportunityId = String(id);
    try {
      const opp = await opportunityService.archiveOpportunity(opportunityId, adminId);
      res.status(200).json({
        status: 'success',
        message: 'Opportunity archived successfully.',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY ARCHIVE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: error.message || 'Failed to archive opportunity.' });
    }
  },

  /**
   * DELETE /api/admin/opportunities/:id
   * Delete opportunity.
   */
  deleteOpportunity: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized.' });
      return;
    }

    const { id } = req.params;
    const opportunityId = String(id);
    try {
      const opp = await opportunityService.deleteOpportunity(opportunityId, adminId);
      res.status(200).json({
        status: 'success',
        message: 'Opportunity deleted successfully.',
        data: opp,
      });
    } catch (error: any) {
      logger.error(`[ADMIN OPPORTUNITY DELETE ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: error.message || 'Failed to delete opportunity.' });
    }
  },

  /**
   * GET /api/admin/opportunities/audiences/lookup
   * Lookup faculties and departments for targeting selectors.
   */
  lookupAudiences: async (req: AdminAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const options = await opportunityService.lookupAudienceOptions();
      res.status(200).json({
        status: 'success',
        data: options,
      });
    } catch (error: any) {
      logger.error(`[ADMIN AUDIENCES LOOKUP ERROR] ${error.message}`);
      res.status(500).json({ status: 'error', message: 'Failed to lookup audience options.' });
    }
  },
};

