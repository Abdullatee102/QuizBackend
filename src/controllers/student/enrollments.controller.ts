import type { Response } from 'express';
import { studentEnrollmentService } from '../../services/studentEnrollmentService.js';
import { eligibilityService } from '../../services/eligibilityService.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';

export const getStudentEnrollmentsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const enrollments = await studentEnrollmentService.getStudentEnrollments(String(studentId));

    res.status(200).json({
      status: 'success',
      data: { enrollments },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve course enrolments.',
    });
  }
};

export const getStudentEligibleOfferingsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offerings = await eligibilityService.getStudentEligibleOfferings(String(studentId));

    res.status(200).json({
      status: 'success',
      data: { offerings },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve eligible course offerings.',
    });
  }
};

export const checkOfferingEligibilityHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id;
    const offeringId = String(req.params.offeringId);

    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const result = await eligibilityService.checkStudentEligibility(String(studentId), offeringId);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to check offering eligibility.',
    });
  }
};
