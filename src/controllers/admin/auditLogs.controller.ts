import type { Response } from 'express';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const listAuditLogs = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { page, limit, adminUserId, action, resourceType } = req.query;

    const result = await auditService.getAuditLogs({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      adminUserId: adminUserId as string | undefined,
      action: action as string | undefined,
      resourceType: resourceType as string | undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch audit logs: ${error.message}`,
    });
  }
};

