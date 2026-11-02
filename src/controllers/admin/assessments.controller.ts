import type { Response } from 'express';
import { assessmentService } from '../../services/assessmentService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const adminListAssessmentsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const {
      academicSession,
      semester,
      departmentId,
      facultyId,
      status,
      search,
      page,
      limit,
    } = req.query;

    const result = await assessmentService.adminListAssessments({
      academicSession: academicSession as string | undefined,
      semester: semester as string | undefined,
      departmentId: departmentId as string | undefined,
      facultyId: facultyId as string | undefined,
      status: status as string | undefined,
      search: search as string | undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to list assessments.',
    });
  }
};

export const adminGetAssessmentDetailsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const assessment = await assessmentService.getAssessmentDetails(
      adminId,
      'SUPER_ADMIN',
      assessmentId
    );

    res.status(200).json({
      status: 'success',
      data: { assessment },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessment details.',
    });
  }
};

export const adminGetAssessmentAuditLogsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const auditLogs = await assessmentService.getAssessmentAuditLogs(assessmentId);

    res.status(200).json({
      status: 'success',
      data: { auditLogs },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to retrieve assessment audit logs.',
    });
  }
};

export const adminSuspendAssessmentHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const adminId = req.adminUser?.id;
    if (!adminId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const assessmentId = String(req.params.assessmentId);
    const { reason } = req.body;

    const assessment = await assessmentService.cancelAssessment(
      adminId,
      'SUPER_ADMIN',
      assessmentId,
      `[Admin Emergency Suspension]: ${reason.trim()}`,
      {
        actorId: adminId,
        actorRole: 'SUPER_ADMIN',
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Assessment suspended successfully via administrative override.',
      data: { assessment },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to suspend assessment.',
    });
  }
};

