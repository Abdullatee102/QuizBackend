import type { Response } from 'express';
import { db } from '../../db/index.js';
import {
  studentEnrollmentsTable,
  courseOfferingsTable,
  coursesTable,
  departmentsTable,
  facultiesTable,
} from '../../db/schema.js';
import { and, eq } from 'drizzle-orm';
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

export const enrollInOfferingHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id;
    const offeringId = String(req.params.offeringId || req.body?.offeringId);

    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    if (!offeringId) {
      res.status(400).json({ status: 'fail', message: 'Offering ID is required.' });
      return;
    }

    const enrollment = await studentEnrollmentService.enrollStudent(
      offeringId,
      String(studentId),
      'STUDENT_SELF',
      { ipAddress: req.ip, userAgent: req.get('user-agent') }
    );

    res.status(201).json({
      status: 'success',
      message: 'Successfully enrolled in course offering.',
      data: { enrollment },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to enrol in course offering.',
    });
  }
};

export const unenrollFromOfferingHandler = async (
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

    await db
      .update(studentEnrollmentsTable)
      .set({ status: 'DROPPED', droppedAt: new Date() })
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.studentId, studentId as any)
        )
      );

    res.status(200).json({
      status: 'success',
      message: 'Successfully dropped course offering.',
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to drop course offering.',
    });
  }
};

export const getAvailableCourseOfferingsHandler = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offerings = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        level: courseOfferingsTable.level,
        section: courseOfferingsTable.section,
        status: courseOfferingsTable.status,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyName: facultiesTable.name,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .leftJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(
        and(
          eq(courseOfferingsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      )
      .orderBy(coursesTable.code);

    const existingEnrollments = await db
      .select({
        offeringId: studentEnrollmentsTable.offeringId,
        status: studentEnrollmentsTable.status,
      })
      .from(studentEnrollmentsTable)
      .where(eq(studentEnrollmentsTable.studentId, studentId as any));

    const enrollmentMap = new Map<string, string>();
    for (const e of existingEnrollments) {
      enrollmentMap.set(String(e.offeringId), e.status);
    }

    const result = offerings.map((off) => ({
      ...off,
      isEnrolled: enrollmentMap.get(String(off.id)) === 'ENROLLED',
      enrollmentStatus: enrollmentMap.get(String(off.id)) || null,
    }));

    res.status(200).json({
      status: 'success',
      data: { offerings: result },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve available course offerings.',
    });
  }
};


