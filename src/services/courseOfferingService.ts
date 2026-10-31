import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  courseOfferingsTable,
  offeringLecturersTable,
  coursesTable,
  departmentsTable,
  facultiesTable,
  usersTable,
  courseAssignmentsTable,
  studentEnrollmentsTable,
  type OfferingStatus,
} from '../db/schema.js';
import { auditService } from './admin/auditService.js';

export interface AuditContextInput {
  adminId?: string | undefined;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}

export const courseOfferingService = {
  /**
   * Creates a new course offering.
   */
  createOffering: async (
    data: {
      courseId: string;
      academicSession: string;
      semester: string;
      level: number;
      section?: string | undefined;
      status?: OfferingStatus | undefined;
      maxCapacity?: number | null | undefined;
      createdBy?: string | undefined;
    },
    auditContext?: AuditContextInput
  ) => {
    // 1. Verify catalogue course exists and is active
    const [course] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, data.courseId as any));

    if (!course) {
      throw new Error('Catalogue course not found');
    }

    if (!course.isActive) {
      throw new Error('Inactive catalogue courses cannot be published as active offerings');
    }

    const section = (data.section || 'DEFAULT').trim().toUpperCase();
    const semester = data.semester.trim().toLowerCase();

    // 2. Check for duplicate offering (same course, session, semester, section)
    const [existing] = await db
      .select({ id: courseOfferingsTable.id })
      .from(courseOfferingsTable)
      .where(
        and(
          eq(courseOfferingsTable.courseId, data.courseId as any),
          eq(courseOfferingsTable.academicSession, data.academicSession.trim()),
          eq(courseOfferingsTable.semester, semester),
          eq(courseOfferingsTable.section, section)
        )
      );

    if (existing) {
      throw new Error(
        `A course offering for ${course.code} in session ${data.academicSession} (${semester} semester, section ${section}) already exists.`
      );
    }

    // 3. Insert offering
    const [offering] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: data.courseId as any,
        academicSession: data.academicSession.trim(),
        semester,
        level: data.level,
        section,
        status: data.status || 'ACTIVE',
        maxCapacity: data.maxCapacity ?? null,
        createdBy: (data.createdBy || auditContext?.adminId) as any,
      })
      .returning();

    if (!offering) {
      throw new Error('Failed to create course offering record');
    }

    // 4. Record audit log
    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'CREATE_COURSE_OFFERING',
        resourceType: 'course_offerings',
        resourceId: offering.id,
        metadata: {
          courseId: offering.courseId,
          courseCode: course.code,
          academicSession: offering.academicSession,
          semester: offering.semester,
          section: offering.section,
          status: offering.status,
        },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return offering;
  },

  /**
   * Retrieves paginated course offerings with optional filters.
   */
  listOfferings: async (options: {
    page?: number | undefined;
    limit?: number | undefined;
    academicSession?: string | undefined;
    semester?: string | undefined;
    courseId?: string | undefined;
    departmentId?: string | undefined;
    level?: number | undefined;
    status?: string | undefined;
    search?: string | undefined;
  }) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [];

    if (options.courseId) {
      conditions.push(eq(courseOfferingsTable.courseId, options.courseId as any));
    }
    if (options.academicSession) {
      conditions.push(eq(courseOfferingsTable.academicSession, options.academicSession.trim()));
    }
    if (options.semester) {
      conditions.push(eq(courseOfferingsTable.semester, options.semester.trim().toLowerCase()));
    }
    if (options.status) {
      conditions.push(eq(courseOfferingsTable.status, options.status.trim().toUpperCase() as any));
    }
    if (options.level !== undefined && !isNaN(options.level)) {
      conditions.push(eq(courseOfferingsTable.level, options.level));
    }
    if (options.departmentId) {
      conditions.push(eq(coursesTable.departmentId, options.departmentId as any));
    }
    if (options.search && typeof options.search === 'string') {
      const pattern = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(coursesTable.code, pattern),
          ilike(coursesTable.title, pattern),
          ilike(courseOfferingsTable.section, pattern)
        )!
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const offeringsQuery = db
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
        maxCapacity: courseOfferingsTable.maxCapacity,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyName: facultiesTable.name,
        createdAt: courseOfferingsTable.createdAt,
        updatedAt: courseOfferingsTable.updatedAt,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .orderBy(desc(courseOfferingsTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id));

    const [offerings, countResult] = await Promise.all([
      whereClause ? offeringsQuery.where(whereClause) : offeringsQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = countResult[0]?.count || 0;

    // Enrich offerings with enrolled student count and lecturer count
    const enrichedOfferings = await Promise.all(
      offerings.map(async (offering) => {
        const [[enrolled], [lecturers]] = await Promise.all([
          db
            .select({ count: sql<number>`count(*)`.mapWith(Number) })
            .from(studentEnrollmentsTable)
            .where(
              and(
                eq(studentEnrollmentsTable.offeringId, offering.id),
                eq(studentEnrollmentsTable.status, 'ENROLLED')
              )
            ),
          db
            .select({ count: sql<number>`count(*)`.mapWith(Number) })
            .from(offeringLecturersTable)
            .where(
              and(
                eq(offeringLecturersTable.offeringId, offering.id),
                eq(offeringLecturersTable.status, 'ACTIVE')
              )
            ),
        ]);

        return {
          ...offering,
          metrics: {
            enrolledStudents: enrolled?.count || 0,
            assignedLecturers: lecturers?.count || 0,
          },
        };
      })
    );

    return {
      offerings: enrichedOfferings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Retrieves full details for a course offering.
   */
  getOfferingDetails: async (offeringId: string) => {
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
        maxCapacity: courseOfferingsTable.maxCapacity,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyId: departmentsTable.facultyId,
        facultyName: facultiesTable.name,
        createdAt: courseOfferingsTable.createdAt,
        updatedAt: courseOfferingsTable.updatedAt,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      return null;
    }

    // Fetch assigned lecturers
    const lecturers = await db
      .select({
        assignmentId: offeringLecturersTable.id,
        lecturerId: offeringLecturersTable.lecturerId,
        role: offeringLecturersTable.role,
        status: offeringLecturersTable.status,
        assignedAt: offeringLecturersTable.assignedAt,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
      })
      .from(offeringLecturersTable)
      .innerJoin(usersTable, eq(offeringLecturersTable.lecturerId, usersTable.id))
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    // Fetch enrolled count
    const [enrolled] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      );

    return {
      ...offering,
      lecturers,
      metrics: {
        enrolledStudents: enrolled?.count || 0,
        assignedLecturers: lecturers.length,
      },
    };
  },

  /**
   * Updates an offering's metadata or status.
   */
  updateOffering: async (
    offeringId: string,
    updates: {
      level?: number | undefined;
      section?: string | undefined;
      status?: OfferingStatus | undefined;
      maxCapacity?: number | null | undefined;
    },
    auditContext?: AuditContextInput
  ) => {
    const [existing] = await db
      .select()
      .from(courseOfferingsTable)
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!existing) {
      throw new Error('Course offering not found');
    }

    const newSection = updates.section ? updates.section.trim().toUpperCase() : existing.section;

    // If section changed, verify duplicate
    if (newSection !== existing.section) {
      const [conflict] = await db
        .select({ id: courseOfferingsTable.id })
        .from(courseOfferingsTable)
        .where(
          and(
            eq(courseOfferingsTable.courseId, existing.courseId),
            eq(courseOfferingsTable.academicSession, existing.academicSession),
            eq(courseOfferingsTable.semester, existing.semester),
            eq(courseOfferingsTable.section, newSection),
            sql`${courseOfferingsTable.id} != ${offeringId as any}`
          )
        );

      if (conflict) {
        throw new Error(
          `Another offering already exists for section ${newSection} in session ${existing.academicSession} (${existing.semester} semester).`
        );
      }
    }

    const [updated] = await db
      .update(courseOfferingsTable)
      .set({
        ...(updates.level !== undefined && { level: updates.level }),
        ...(updates.section !== undefined && { section: newSection }),
        ...(updates.status !== undefined && { status: updates.status }),
        ...(updates.maxCapacity !== undefined && { maxCapacity: updates.maxCapacity }),
        updatedAt: new Date(),
      })
      .where(eq(courseOfferingsTable.id, offeringId as any))
      .returning();

    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'UPDATE_COURSE_OFFERING',
        resourceType: 'course_offerings',
        resourceId: offeringId,
        metadata: { updates },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return updated;
  },

  /**
   * Assigns a lecturer to an offering.
   */
  assignLecturerToOffering: async (
    offeringId: string,
    lecturerId: string,
    role: 'PRIMARY' | 'CO_LECTURER' | 'ASSISTANT' = 'PRIMARY',
    auditContext?: AuditContextInput
  ) => {
    // 1. Verify offering exists
    const [offering] = await db
      .select()
      .from(courseOfferingsTable)
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found');
    }

    // 2. Verify lecturer exists and has role LECTURER
    const [lecturer] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, lecturerId as any));

    if (!lecturer || lecturer.role !== 'LECTURER') {
      throw new Error('User is not a valid lecturer account');
    }

    if (lecturer.status !== 'ACTIVE') {
      throw new Error('Lecturer account is suspended or disabled');
    }

    // 3. Upsert offering lecturer record
    const [existingAssignment] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any)
        )
      );

    let assignmentRecord;
    if (existingAssignment) {
      if (existingAssignment.status === 'ACTIVE' && existingAssignment.role === role) {
        throw new Error('Lecturer is already actively assigned to this offering');
      }
      [assignmentRecord] = await db
        .update(offeringLecturersTable)
        .set({
          role,
          status: 'ACTIVE',
          assignedBy: (auditContext?.adminId || null) as any,
          assignedAt: new Date(),
        })
        .where(eq(offeringLecturersTable.id, existingAssignment.id))
        .returning();
    } else {
      [assignmentRecord] = await db
        .insert(offeringLecturersTable)
        .values({
          offeringId: offeringId as any,
          lecturerId: lecturerId as any,
          role,
          status: 'ACTIVE',
          assignedBy: (auditContext?.adminId || null) as any,
        })
        .returning();
    }

    if (!assignmentRecord) {
      throw new Error('Failed to record offering lecturer assignment');
    }

    // 4. Ensure matching BB-07B/BB-07D course_assignments record exists so existing routes remain synchronized
    const [existingCourseAssignment] = await db
      .select()
      .from(courseAssignmentsTable)
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturerId as any),
          eq(courseAssignmentsTable.courseId, offering.courseId),
          eq(courseAssignmentsTable.academicSession, offering.academicSession),
          eq(courseAssignmentsTable.semester, offering.semester)
        )
      );

    if (!existingCourseAssignment) {
      await db.insert(courseAssignmentsTable).values({
        lecturerId: lecturerId as any,
        courseId: offering.courseId,
        academicSession: offering.academicSession,
        semester: offering.semester,
        status: 'ACTIVE',
        assignedBy: (auditContext?.adminId || null) as any,
      });
    } else if (existingCourseAssignment.status !== 'ACTIVE') {
      await db
        .update(courseAssignmentsTable)
        .set({ status: 'ACTIVE', updatedAt: new Date() })
        .where(eq(courseAssignmentsTable.id, existingCourseAssignment.id));
    }

    // 5. Audit log
    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'ASSIGN_OFFERING_LECTURER',
        resourceType: 'offering_lecturers',
        resourceId: assignmentRecord.id,
        metadata: {
          offeringId,
          lecturerId,
          role,
          academicSession: offering.academicSession,
          semester: offering.semester,
        },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return assignmentRecord;
  },

  /**
   * Revokes a lecturer's assignment to an offering.
   */
  revokeOfferingLecturer: async (
    offeringId: string,
    lecturerId: string,
    auditContext?: AuditContextInput
  ) => {
    const [record] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!record) {
      throw new Error('Active lecturer assignment for this offering not found');
    }

    const [updated] = await db
      .update(offeringLecturersTable)
      .set({ status: 'REVOKED' })
      .where(eq(offeringLecturersTable.id, record.id))
      .returning();

    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'REVOKE_OFFERING_LECTURER',
        resourceType: 'offering_lecturers',
        resourceId: record.id,
        metadata: { offeringId, lecturerId },
        ipAddress: auditContext.ipAddress || null,
        userAgent: auditContext.userAgent || null,
      });
    }

    return updated;
  },

  /**
   * Retrieves offerings assigned to a specific lecturer.
   */
  getLecturerOfferings: async (lecturerId: string) => {
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
        offeringStatus: courseOfferingsTable.status,
        lecturerRole: offeringLecturersTable.role,
        assignedAt: offeringLecturersTable.assignedAt,
        departmentName: departmentsTable.name,
      })
      .from(offeringLecturersTable)
      .innerJoin(courseOfferingsTable, eq(offeringLecturersTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(
        and(
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE'),
          eq(courseOfferingsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      )
      .orderBy(coursesTable.code);
  },

  /**
   * Verifies if a lecturer is actively assigned to an offering.
   */
  isLecturerAssignedToOffering: async (lecturerId: string, offeringId: string): Promise<boolean> => {
    const [record] = await db
      .select({ id: offeringLecturersTable.id })
      .from(offeringLecturersTable)
      .innerJoin(courseOfferingsTable, eq(offeringLecturersTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.status, 'ACTIVE'),
          eq(courseOfferingsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      );

    return !!record;
  },
};
