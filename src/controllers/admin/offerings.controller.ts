import type { Response } from 'express';
import { courseOfferingService } from '../../services/courseOfferingService.js';
import { studentEnrollmentService } from '../../services/studentEnrollmentService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const createOfferingHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { courseId, academicSession, semester, level, section, status, maxCapacity } = req.body;

    const offering = await courseOfferingService.createOffering(
      {
        courseId,
        academicSession,
        semester,
        level,
        section,
        status,
        maxCapacity,
      },
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(201).json({
      status: 'success',
      message: 'Course offering created successfully.',
      data: { offering },
    });
  } catch (error: any) {
    const isConflict =
      error.message?.includes('already exists') || error.message?.includes('duplicate key');
    const isValidation = error.message?.includes('Inactive catalogue courses');

    res.status(isConflict ? 409 : isValidation ? 400 : 500).json({
      status: 'error',
      message: error.message || 'Failed to create course offering.',
    });
  }
};

export const listOfferingsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const options: {
      page?: number | undefined;
      limit?: number | undefined;
      academicSession?: string | undefined;
      semester?: string | undefined;
      courseId?: string | undefined;
      departmentId?: string | undefined;
      level?: number | undefined;
      status?: string | undefined;
      search?: string | undefined;
    } = {};

    if (req.query.page) options.page = Number(req.query.page);
    if (req.query.limit) options.limit = Number(req.query.limit);
    if (req.query.academicSession) options.academicSession = String(req.query.academicSession);
    if (req.query.semester) options.semester = String(req.query.semester);
    if (req.query.courseId) options.courseId = String(req.query.courseId);
    if (req.query.departmentId) options.departmentId = String(req.query.departmentId);
    if (req.query.level) options.level = Number(req.query.level);
    if (req.query.status) options.status = String(req.query.status);
    if (req.query.search || req.query.q) options.search = String(req.query.search || req.query.q);

    const result = await courseOfferingService.listOfferings(options);

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve course offerings.',
    });
  }
};

export const getOfferingDetailsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const offering = await courseOfferingService.getOfferingDetails(offeringId);

    if (!offering) {
      res.status(404).json({
        status: 'fail',
        message: 'Course offering not found.',
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
      message: error.message || 'Failed to retrieve course offering details.',
    });
  }
};

export const updateOfferingHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const { level, section, status, maxCapacity } = req.body;

    const updated = await courseOfferingService.updateOffering(
      offeringId,
      { level, section, status, maxCapacity },
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Course offering updated successfully.',
      data: { offering: updated },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('already exists');

    res.status(isNotFound ? 404 : isConflict ? 409 : 500).json({
      status: 'error',
      message: error.message || 'Failed to update course offering.',
    });
  }
};

export const updateOfferingStatusHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const { status } = req.body;

    const updated = await courseOfferingService.updateOffering(
      offeringId,
      { status },
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: `Course offering status updated to ${status}.`,
      data: { offering: updated },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 500).json({
      status: 'error',
      message: error.message || 'Failed to update offering status.',
    });
  }
};

export const assignOfferingLecturerHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const { lecturerId, role } = req.body;

    const assignment = await courseOfferingService.assignLecturerToOffering(
      offeringId,
      lecturerId,
      role,
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Lecturer successfully assigned to course offering.',
      data: { assignment },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('already actively assigned');
    const isRole = error.message?.includes('not a valid lecturer');

    res.status(isNotFound ? 404 : isConflict ? 409 : isRole ? 400 : 500).json({
      status: 'error',
      message: error.message || 'Failed to assign lecturer to course offering.',
    });
  }
};

export const listOfferingLecturersHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const offering = await courseOfferingService.getOfferingDetails(offeringId);

    if (!offering) {
      res.status(404).json({
        status: 'fail',
        message: 'Course offering not found.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        offeringId: offering.id,
        courseCode: offering.courseCode,
        lecturers: offering.lecturers,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve offering lecturers.',
    });
  }
};

export const revokeOfferingLecturerHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const lecturerId = String(req.params.lecturerId);

    const revoked = await courseOfferingService.revokeOfferingLecturer(
      offeringId,
      lecturerId,
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Lecturer assignment to offering successfully revoked.',
      data: { assignment: revoked },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 500).json({
      status: 'error',
      message: error.message || 'Failed to revoke lecturer from offering.',
    });
  }
};

export const createOfferingEnrollmentsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
    const { studentId, studentIds, source } = req.body;

    const auditContext = {
      adminId: req.adminUser?.id,
      ipAddress: req.ip || req.socket.remoteAddress || undefined,
      userAgent: req.headers['user-agent'] || undefined,
    };

    if (studentIds && Array.isArray(studentIds) && studentIds.length > 0) {
      const results = await studentEnrollmentService.enrollBulkStudents(
        offeringId,
        studentIds,
        source,
        auditContext
      );

      res.status(200).json({
        status: 'success',
        message: `Processed bulk enrolment: ${results.enrolled.length} enrolled, ${results.alreadyEnrolled.length} already enrolled, ${results.failed.length} failed.`,
        data: results,
      });
      return;
    }

    if (!studentId) {
      res.status(400).json({
        status: 'fail',
        message: 'studentId is required.',
      });
      return;
    }

    const enrollment = await studentEnrollmentService.enrollStudent(
      offeringId,
      studentId,
      source,
      auditContext
    );

    res.status(201).json({
      status: 'success',
      message: 'Student successfully enrolled into course offering.',
      data: { enrollment },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('already actively enrolled');
    const isValidation =
      error.message?.includes('not a student account') ||
      error.message?.includes('suspended or disabled') ||
      error.message?.includes('Cannot enrol');

    res.status(isNotFound ? 404 : isConflict ? 409 : isValidation ? 400 : 500).json({
      status: 'error',
      message: error.message || 'Failed to enrol student into offering.',
    });
  }
};

export const listOfferingEnrollmentsHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const offeringId = String(req.params.offeringId);
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
      message: error.message || 'Failed to retrieve offering enrolments.',
    });
  }
};

export const updateEnrollmentStatusHandler = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const enrollmentId = String(req.params.enrollmentId);
    const { status } = req.body;

    const updated = await studentEnrollmentService.updateEnrollmentStatus(
      enrollmentId,
      status,
      {
        adminId: req.adminUser?.id,
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: `Enrolment status updated to ${status}.`,
      data: { enrollment: updated },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    res.status(isNotFound ? 404 : 500).json({
      status: 'error',
      message: error.message || 'Failed to update enrolment status.',
    });
  }
};
