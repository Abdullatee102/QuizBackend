import type { Response } from 'express';
import { materialService } from '../../services/materialService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const listStudentMaterialsHandler = async (
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
    const { category } = req.query;

    const data = await materialService.listOfferingMaterialsForStudent(studentId, offeringId, {
      category: typeof category === 'string' ? category : undefined,
    });

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
      message: error.message || 'Failed to retrieve course materials.',
    });
  }
};

export const downloadStudentMaterialHandler = async (
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
    const materialId = String(req.params.materialId);

    const { filePath, originalFileName } = await materialService.downloadMaterialForStudent(
      studentId,
      offeringId,
      materialId
    );

    res.download(filePath, originalFileName, (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({
          status: 'fail',
          message: 'Error transferring material file. The file may be missing from server storage.',
        });
      }
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found') || error.message?.includes('missing');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to download course material.',
    });
  }
};

