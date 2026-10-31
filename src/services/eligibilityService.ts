import { eq, and } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  studentEnrollmentsTable,
  courseOfferingsTable,
  coursesTable,
  usersTable,
} from '../db/schema.js';

export interface EligibilityResult {
  isEligible: boolean;
  reason?:
    | 'STUDENT_NOT_FOUND'
    | 'STUDENT_INACTIVE'
    | 'STUDENT_ROLE_INVALID'
    | 'OFFERING_NOT_FOUND'
    | 'COURSE_INACTIVE'
    | 'OFFERING_NOT_ACTIVE'
    | 'NOT_ENROLLED'
    | 'ENROLLMENT_DROPPED'
    | 'ENROLLMENT_SUSPENDED'
    | 'ENROLLMENT_NOT_ACTIVE';
  message: string;
  offering?: {
    id: string;
    courseId: string;
    courseCode: string;
    courseTitle: string;
    academicSession: string;
    semester: string;
    level: number;
    section: string;
    status: string;
  };
  enrollment?: {
    id: string;
    status: string;
    source: string;
    enrolledAt: Date;
  };
}

export const eligibilityService = {
  /**
   * Authoritatively evaluates whether an authenticated student is eligible
   * for official participation in a specific academic course offering.
   */
  checkStudentEligibility: async (
    studentId: string,
    offeringId: string
  ): Promise<EligibilityResult> => {
    // 1. Check student identity and account status
    const [student] = await db
      .select({
        id: usersTable.id,
        role: usersTable.role,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.id, studentId as any));

    if (!student) {
      return {
        isEligible: false,
        reason: 'STUDENT_NOT_FOUND',
        message: 'Student account not found.',
      };
    }

    if (student.role !== 'STUDENT') {
      return {
        isEligible: false,
        reason: 'STUDENT_ROLE_INVALID',
        message: 'Account is not a student.',
      };
    }

    if (student.status !== 'ACTIVE') {
      return {
        isEligible: false,
        reason: 'STUDENT_INACTIVE',
        message: 'Student account is suspended or disabled.',
      };
    }

    // 2. Check offering and course active status
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        courseIsActive: coursesTable.isActive,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        level: courseOfferingsTable.level,
        section: courseOfferingsTable.section,
        status: courseOfferingsTable.status,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      return {
        isEligible: false,
        reason: 'OFFERING_NOT_FOUND',
        message: 'Course offering not found.',
      };
    }

    if (!offering.courseIsActive) {
      return {
        isEligible: false,
        reason: 'COURSE_INACTIVE',
        message: 'Underlying catalogue course is inactive.',
      };
    }

    if (offering.status !== 'ACTIVE') {
      return {
        isEligible: false,
        reason: 'OFFERING_NOT_ACTIVE',
        message: `Course offering is currently ${offering.status.toLowerCase()}.`,
      };
    }

    // 3. Check official student enrolment
    const [enrollment] = await db
      .select({
        id: studentEnrollmentsTable.id,
        status: studentEnrollmentsTable.status,
        source: studentEnrollmentsTable.source,
        enrolledAt: studentEnrollmentsTable.enrolledAt,
      })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.studentId, studentId as any)
        )
      );

    if (!enrollment) {
      return {
        isEligible: false,
        reason: 'NOT_ENROLLED',
        message: 'Student is not officially enrolled in this course offering.',
      };
    }

    if (enrollment.status === 'DROPPED') {
      return {
        isEligible: false,
        reason: 'ENROLLMENT_DROPPED',
        message: 'Enrolment in this course offering was dropped.',
      };
    }

    if (enrollment.status === 'SUSPENDED') {
      return {
        isEligible: false,
        reason: 'ENROLLMENT_SUSPENDED',
        message: 'Enrolment in this course offering is suspended.',
      };
    }

    if (enrollment.status !== 'ENROLLED') {
      return {
        isEligible: false,
        reason: 'ENROLLMENT_NOT_ACTIVE',
        message: `Enrolment is in ${enrollment.status.toLowerCase()} status.`,
      };
    }

    // 4. Student meets all criteria
    return {
      isEligible: true,
      message: 'Student is officially eligible for this course offering.',
      offering: {
        id: offering.id,
        courseId: offering.courseId,
        courseCode: offering.courseCode,
        courseTitle: offering.courseTitle,
        academicSession: offering.academicSession,
        semester: offering.semester,
        level: offering.level,
        section: offering.section,
        status: offering.status,
      },
      enrollment: {
        id: enrollment.id,
        status: enrollment.status,
        source: enrollment.source,
        enrolledAt: enrollment.enrolledAt,
      },
    };
  },

  /**
   * Retrieves all offerings for which the student has active verified eligibility.
   */
  getStudentEligibleOfferings: async (studentId: string) => {
    return await db
      .select({
        offeringId: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        level: courseOfferingsTable.level,
        section: courseOfferingsTable.section,
        enrollmentId: studentEnrollmentsTable.id,
        enrolledAt: studentEnrollmentsTable.enrolledAt,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(courseOfferingsTable, eq(studentEnrollmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, studentId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED'),
          eq(courseOfferingsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      )
      .orderBy(coursesTable.code);
  },
};

