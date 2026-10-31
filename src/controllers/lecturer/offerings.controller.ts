import type { Response } from 'express';
import { courseOfferingService } from '../../services/courseOfferingService.js';
import { studentEnrollmentService } from '../../services/studentEnrollmentService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';

export const listLecturerOfferingsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offerings = await courseOfferingService.getLecturerOfferings(lecturerId);

    res.status(200).json({
      status: 'success',
      data: { offerings },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve assigned offerings.',
    });
  }
};

export const getLecturerOfferingDetailsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const offeringId = String(req.params.offeringId);

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    // 1. Verify offering exists
    const offering = await courseOfferingService.getOfferingDetails(offeringId);
    if (!offering) {
      res.status(404).json({
        status: 'fail',
        message: 'Course offering not found.',
      });
      return;
    }

    // 2. IDOR Defense: Verify lecturer is assigned to this offering
    const isAssigned = await courseOfferingService.isLecturerAssignedToOffering(lecturerId, offeringId);
    if (!isAssigned) {
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. You are not assigned to this course offering.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { offering },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve offering details.',
    });
  }
};

export const listLecturerOfferingStudentsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const offeringId = String(req.params.offeringId);

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    // 1. IDOR Defense: Verify lecturer is assigned to this offering
    const isAssigned = await courseOfferingService.isLecturerAssignedToOffering(lecturerId, offeringId);
    if (!isAssigned) {
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden. You are not assigned to this course offering.',
      });
      return;
    }

    const options: {
      page?: number | undefined;
      limit?: number | undefined;
      status?: string | undefined;
      search?: string | undefined;
    } = {};

    if (req.query.page) options.page = Number(req.query.page);
    if (req.query.limit) options.limit = Number(req.query.limit);
    if (req.query.status) options.status = String(req.query.status);
    if (req.query.search || req.query.q) options.search = String(req.query.search || req.query.q);

    const result = await studentEnrollmentService.listOfferingEnrollments(offeringId, options);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve offering student roster.',
    });
  }
};
