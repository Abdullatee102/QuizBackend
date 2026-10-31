import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  studentEnrollmentsTable,
  courseOfferingsTable,
  coursesTable,
  departmentsTable,
  usersTable,
  type EnrollmentStatus,
  type EnrollmentSource,
} from '../db/schema.js';
import { auditService } from './admin/auditService.js';
import type { AuditContextInput } from './courseOfferingService.js';

export const studentEnrollmentService = {
  /**
   * Enrols a single student into a course offering.
   */
  enrollStudent: async (
    offeringId: string,
    studentId: string,
    source: EnrollmentSource = 'ADMIN_MANUAL',
    auditContext?: AuditContextInput
  ) => {
    // 1. Verify offering exists and is not archived/completed
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        courseCode: coursesTable.code,
        status: courseOfferingsTable.status,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found');
    }

    if (offering.status === 'ARCHIVED' || offering.status === 'COMPLETED') {
      throw new Error(`Cannot enrol students into a ${offering.status.toLowerCase()} course offering`);
    }

    // 2. Verify student exists and has role STUDENT
    const [student] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, studentId as any));

    if (!student || student.role !== 'STUDENT') {
      throw new Error('User is not a student account');
    }

    if (student.status !== 'ACTIVE') {
      throw new Error('Student account is suspended or disabled');
    }

    // 3. Check existing enrolment
    const [existing] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.studentId, studentId as any)
        )
      );

    let enrollment;
    if (existing) {
      if (existing.status === 'ENROLLED') {
        throw new Error('Student is already actively enrolled in this course offering');
      }

      // Re-enrol dropped or suspended student
      [enrollment] = await db
        .update(studentEnrollmentsTable)
        .set({
          status: 'ENROLLED',
          source,
          enrolledBy: (auditContext?.adminId || null) as any,
          enrolledAt: new Date(),
          updatedAt: new Date(),
          droppedAt: null,
        })
        .where(eq(studentEnrollmentsTable.id, existing.id))
        .returning();
    } else {
      [enrollment] = await db
        .insert(studentEnrollmentsTable)
        .values({
          offeringId: offeringId as any,
          studentId: studentId as any,
          status: 'ENROLLED',
          source,
          enrolledBy: (auditContext?.adminId || null) as any,
        })
        .returning();
    }

    if (!enrollment) {
      throw new Error('Failed to record student enrolment');
    }

    // 4. Log audit action
    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'ENROLL_STUDENT',
        resourceType: 'student_enrollments',
        resourceId: enrollment.id,
        metadata: {
          offeringId,
          studentId,
          courseCode: offering.courseCode,
          academicSession: offering.academicSession,
          semester: offering.semester,
          source,
        },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return enrollment;
  },

  /**
   * Enrols multiple students in bulk.
   */
  enrollBulkStudents: async (
    offeringId: string,
    studentIds: string[],
    source: EnrollmentSource = 'ADMIN_IMPORT',
    auditContext?: AuditContextInput
  ) => {
    const results = {
      enrolled: [] as string[],
      alreadyEnrolled: [] as string[],
      failed: [] as { studentId: string; error: string }[],
    };

    for (const studentId of studentIds) {
      try {
        await studentEnrollmentService.enrollStudent(offeringId, studentId, source, auditContext);
        results.enrolled.push(studentId);
      } catch (err: any) {
        if (err.message.includes('already actively enrolled')) {
          results.alreadyEnrolled.push(studentId);
        } else {
          results.failed.push({ studentId, error: err.message });
        }
      }
    }

    return results;
  },

  /**
   * Lists enrolments for an offering with student details (privacy-safe, no passwords or tokens).
   */
  listOfferingEnrollments: async (
    offeringId: string,
    options: {
      page?: number | undefined;
      limit?: number | undefined;
      status?: string | undefined;
      search?: string | undefined;
    }
  ) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [eq(studentEnrollmentsTable.offeringId, offeringId as any)];

    if (options.status) {
      conditions.push(eq(studentEnrollmentsTable.status, options.status.trim().toUpperCase() as any));
    }

    if (options.search && typeof options.search === 'string') {
      const pattern = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(usersTable.fullName, pattern),
          ilike(usersTable.username, pattern),
          ilike(usersTable.email, pattern)
        )!
      );
    }

    const whereClause = and(...conditions);

    const enrollmentsQuery = db
      .select({
        enrollmentId: studentEnrollmentsTable.id,
        studentId: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        level: usersTable.level,
        departmentName: departmentsTable.name,
        status: studentEnrollmentsTable.status,
        source: studentEnrollmentsTable.source,
        enrolledAt: studentEnrollmentsTable.enrolledAt,
        droppedAt: studentEnrollmentsTable.droppedAt,
        updatedAt: studentEnrollmentsTable.updatedAt,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(whereClause)
      .orderBy(usersTable.fullName)
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .where(whereClause);

    const [enrollments, countResult] = await Promise.all([enrollmentsQuery, countQuery]);
    const total = countResult[0]?.count || 0;

    return {
      enrollments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Updates an enrolment's status (e.g. DROPPED, SUSPENDED, ENROLLED).
   */
  updateEnrollmentStatus: async (
    enrollmentId: string,
    status: EnrollmentStatus,
    auditContext?: AuditContextInput
  ) => {
    const [existing] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(eq(studentEnrollmentsTable.id, enrollmentId as any));

    if (!existing) {
      throw new Error('Student enrolment record not found');
    }

    const droppedAt = status === 'DROPPED' ? new Date() : (status === 'ENROLLED' ? null : existing.droppedAt);

    const [updated] = await db
      .update(studentEnrollmentsTable)
      .set({
        status,
        droppedAt,
        updatedAt: new Date(),
      })
      .where(eq(studentEnrollmentsTable.id, enrollmentId as any))
      .returning();

    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'UPDATE_ENROLLMENT_STATUS',
        resourceType: 'student_enrollments',
        resourceId: enrollmentId,
        metadata: {
          previousStatus: existing.status,
          newStatus: status,
          studentId: existing.studentId,
          offeringId: existing.offeringId,
        },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return updated;
  },

  /**
   * Retrieves all course enrolments for a student.
   */
  getStudentEnrollments: async (studentId: string) => {
    return await db
      .select({
        enrollmentId: studentEnrollmentsTable.id,
        enrollmentStatus: studentEnrollmentsTable.status,
        enrolledAt: studentEnrollmentsTable.enrolledAt,
        offeringId: courseOfferingsTable.id,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        level: courseOfferingsTable.level,
        section: courseOfferingsTable.section,
        offeringStatus: courseOfferingsTable.status,
        courseId: coursesTable.id,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        departmentName: departmentsTable.name,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(courseOfferingsTable, eq(studentEnrollmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, studentId as any),
          eq(coursesTable.isActive, true)
        )
      )
      .orderBy(desc(studentEnrollmentsTable.enrolledAt));
  },
};
