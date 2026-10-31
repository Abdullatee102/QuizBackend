import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  usersTable,
  coursesTable,
  departmentsTable,
  facultiesTable,
  courseAssignmentsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../../db/schema.js';
import { auditService } from './auditService.js';
import logger from '../../config/logger.js';

export const adminLecturerService = {
  /**
   * Explicitly provisions a new lecturer account by an authorized administrator.
   */
  provisionLecturer: async (
    data: {
      fullName: string;
      email: string;
      password: string;
      username?: string | undefined;
      phoneNumber?: string | undefined;
      facultyId?: string | undefined;
      departmentId?: string | undefined;
    },
    adminUserId: string,
    reqMeta?: { ipAddress?: string | null; userAgent?: string | null }
  ) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const username = data.username ? data.username.trim().toLowerCase() : normalizedEmail.split('@')[0]!;

    // Verify non-existence
    const [existing] = await db
      .select({ id: usersTable.id, email: usersTable.email, role: usersTable.role })
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, normalizedEmail),
          eq(usersTable.username, username as any)
        )
      );

    if (existing) {
      throw new Error(`An account with this email or username already exists (Role: ${existing.role}). Direct conversion of existing accounts is prohibited.`);
    }

    // Verify faculty and department if provided
    if (data.facultyId) {
      const [fac] = await db.select().from(facultiesTable).where(eq(facultiesTable.id, data.facultyId as any));
      if (!fac) throw new Error('Referenced faculty not found.');
    }

    if (data.departmentId) {
      const [dept] = await db.select().from(departmentsTable).where(eq(departmentsTable.id, data.departmentId as any));
      if (!dept) throw new Error('Referenced department not found.');
    }

    const [newLecturer] = await db
      .insert(usersTable)
      .values({
        fullName: data.fullName,
        email: normalizedEmail,
        username,
        phoneNumber: data.phoneNumber || null,
        password: data.password, // Existing project convention for password storage
        facultyId: (data.facultyId as any) || null,
        departmentId: (data.departmentId as any) || null,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
        createdAt: usersTable.createdAt,
      });

    if (!newLecturer) {
      throw new Error('Failed to create lecturer account.');
    }

    await auditService.logAdminAction({
      adminUserId,
      action: 'PROVISION_LECTURER',
      resourceType: 'users',
      resourceId: newLecturer.id,
      metadata: {
        lecturerId: newLecturer.id,
        email: newLecturer.email,
        facultyId: newLecturer.facultyId,
        departmentId: newLecturer.departmentId,
      },
      ipAddress: reqMeta?.ipAddress || null,
      userAgent: reqMeta?.userAgent || null,
    });

    return newLecturer;
  },

  /**
   * Lists all lecturer accounts with administrative filtering and pagination.
   */
  listLecturers: async (filters: {
    search?: string | undefined;
    status?: string | undefined;
    facultyId?: string | undefined;
    departmentId?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  }) => {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [eq(usersTable.role, USER_ROLES.LECTURER)];

    if (filters.search && typeof filters.search === 'string') {
      const pattern = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(usersTable.fullName, pattern),
          ilike(usersTable.email, pattern),
          ilike(usersTable.username, pattern)
        )!
      );
    }

    if (filters.status) {
      conditions.push(eq(usersTable.status, filters.status));
    }

    if (filters.facultyId) {
      conditions.push(eq(usersTable.facultyId, filters.facultyId as any));
    }

    if (filters.departmentId) {
      conditions.push(eq(usersTable.departmentId, filters.departmentId as any));
    }

    const whereClause = and(...conditions);

    const lecturersQuery = db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        phoneNumber: usersTable.phoneNumber,
        role: usersTable.role,
        status: usersTable.status,
        facultyId: usersTable.facultyId,
        facultyName: facultiesTable.name,
        departmentId: usersTable.departmentId,
        departmentName: departmentsTable.name,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(whereClause)
      .orderBy(desc(usersTable.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(usersTable)
      .where(whereClause);

    const [lecturers, countResult] = await Promise.all([lecturersQuery, countQuery]);
    const total = countResult[0]?.count || 0;

    // Attach active course assignment counts
    const enriched = await Promise.all(
      lecturers.map(async (l) => {
        const [assignmentCount] = await db
          .select({ count: sql<number>`count(*)`.mapWith(Number) })
          .from(courseAssignmentsTable)
          .where(
            and(
              eq(courseAssignmentsTable.lecturerId, l.id),
              eq(courseAssignmentsTable.status, 'ACTIVE')
            )
          );

        return {
          ...l,
          assignedCoursesCount: assignmentCount?.count || 0,
        };
      })
    );

    return {
      lecturers: enriched,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Retrieves a single lecturer and their full assignment history.
   */
  getLecturerDetails: async (lecturerId: string) => {
    const [lecturer] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        phoneNumber: usersTable.phoneNumber,
        role: usersTable.role,
        status: usersTable.status,
        facultyId: usersTable.facultyId,
        facultyName: facultiesTable.name,
        departmentId: usersTable.departmentId,
        departmentName: departmentsTable.name,
        createdAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(
        and(
          eq(usersTable.id, lecturerId as any),
          eq(usersTable.role, USER_ROLES.LECTURER)
        )
      );

    if (!lecturer) return null;

    const assignments = await db
      .select({
        assignmentId: courseAssignmentsTable.id,
        academicSession: courseAssignmentsTable.academicSession,
        semester: courseAssignmentsTable.semester,
        status: courseAssignmentsTable.status,
        assignedBy: courseAssignmentsTable.assignedBy,
        createdAt: courseAssignmentsTable.createdAt,
        updatedAt: courseAssignmentsTable.updatedAt,
        courseId: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        departmentName: departmentsTable.name,
      })
      .from(courseAssignmentsTable)
      .innerJoin(coursesTable, eq(courseAssignmentsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(eq(courseAssignmentsTable.lecturerId, lecturerId as any))
      .orderBy(desc(courseAssignmentsTable.createdAt));

    return {
      lecturer,
      assignments,
    };
  },

  /**
   * Assigns a course offering to a lecturer.
   */
  assignCourseToLecturer: async (
    lecturerId: string,
    courseId: string,
    assignmentDetails: {
      academicSession?: string | undefined;
      semester?: string | undefined;
    },
    adminUserId: string,
    reqMeta?: { ipAddress?: string | null; userAgent?: string | null }
  ) => {
    // 1. Verify lecturer exists and role is LECTURER
    const [lecturer] = await db
      .select()
      .from(usersTable)
      .where(
        and(
          eq(usersTable.id, lecturerId as any),
          eq(usersTable.role, USER_ROLES.LECTURER)
        )
      );

    if (!lecturer) {
      throw new Error('Lecturer account not found or invalid role.');
    }

    if (lecturer.status !== ACCOUNT_STATUS.ACTIVE) {
      throw new Error(`Cannot assign course to a ${lecturer.status.toLowerCase()} lecturer account.`);
    }

    // 2. Verify course exists
    const [course] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    if (!course) {
      throw new Error('Course not found.');
    }

    // COURSE-02: Require explicit, valid academic session without silent fallback
    if (!assignmentDetails.academicSession || typeof assignmentDetails.academicSession !== 'string') {
      throw new Error('Academic session is required.');
    }

    const academicSession = assignmentDetails.academicSession.trim();
    if (!/^\d{4}\/\d{4}$/.test(academicSession)) {
      throw new Error('Academic session must follow the YYYY/YYYY format (e.g. 2025/2026).');
    }

    const [startStr, endStr] = academicSession.split('/');
    const startYear = Number(startStr);
    const endYear = Number(endStr);
    if (isNaN(startYear) || isNaN(endYear) || endYear !== startYear + 1) {
      throw new Error('Academic session end year must be consecutive to start year (e.g. 2025/2026).');
    }

    // COURSE-04: Require explicit, valid assignment semester
    const rawSemester = assignmentDetails.semester || course.semester;
    if (!rawSemester || typeof rawSemester !== 'string') {
      throw new Error('Semester is required.');
    }
    const semester = rawSemester.trim().toLowerCase();
    if (semester !== 'harmattan' && semester !== 'rain') {
      throw new Error('Invalid semester. Must be "harmattan" or "rain".');
    }

    // COURSE-03: Check for existing assignment matching (lecturer, course, session, semester)
    const [existingAssignment] = await db
      .select()
      .from(courseAssignmentsTable)
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturerId as any),
          eq(courseAssignmentsTable.courseId, courseId as any),
          eq(courseAssignmentsTable.academicSession, academicSession),
          eq(courseAssignmentsTable.semester, semester)
        )
      );

    let resultAssignment;

    if (existingAssignment) {
      if (existingAssignment.status === 'ACTIVE') {
        throw new Error(`This course is already actively assigned to this lecturer for session ${academicSession} (${semester} semester).`);
      }

      // Reactivate revoked assignment
      const [updated] = await db
        .update(courseAssignmentsTable)
        .set({
          status: 'ACTIVE',
          semester,
          assignedBy: adminUserId as any,
          updatedAt: new Date(),
        })
        .where(eq(courseAssignmentsTable.id, existingAssignment.id))
        .returning();

      resultAssignment = updated;
    } else {
      const [inserted] = await db
        .insert(courseAssignmentsTable)
        .values({
          lecturerId: lecturerId as any,
          courseId: courseId as any,
          academicSession,
          semester,
          status: 'ACTIVE',
          assignedBy: adminUserId as any,
        })
        .returning();

      resultAssignment = inserted;
    }

    await auditService.logAdminAction({
      adminUserId,
      action: 'ASSIGN_LECTURER_COURSE',
      resourceType: 'course_assignments',
      resourceId: resultAssignment?.id || null,
      metadata: {
        lecturerId,
        courseId,
        courseCode: course.code,
        academicSession,
        semester,
      },
      ipAddress: reqMeta?.ipAddress || null,
      userAgent: reqMeta?.userAgent || null,
    });

    return {
      assignment: resultAssignment,
      course: {
        id: course.id,
        code: course.code,
        title: course.title,
        level: course.level,
        catalogueSemester: course.semester,
        assignedSemester: semester,
      },
      lecturer: {
        id: lecturer.id,
        fullName: lecturer.fullName,
        email: lecturer.email,
      },
    };
  },

  /**
   * Revokes an existing lecturer course assignment.
   */
  revokeCourseAssignment: async (
    lecturerId: string,
    courseId: string,
    adminUserId: string,
    options?: { academicSession?: string | undefined; semester?: string | undefined },
    reqMeta?: { ipAddress?: string | null; userAgent?: string | null }
  ) => {
    const conditions = [
      eq(courseAssignmentsTable.lecturerId, lecturerId as any),
      eq(courseAssignmentsTable.courseId, courseId as any),
      eq(courseAssignmentsTable.status, 'ACTIVE'),
    ];

    if (options?.academicSession) {
      conditions.push(eq(courseAssignmentsTable.academicSession, options.academicSession));
    }

    if (options?.semester) {
      conditions.push(eq(courseAssignmentsTable.semester, options.semester.toLowerCase()));
    }

    const [existingAssignment] = await db
      .select()
      .from(courseAssignmentsTable)
      .where(and(...conditions));

    if (!existingAssignment) {
      throw new Error('Active course assignment not found for this lecturer.');
    }

    const [revoked] = await db
      .update(courseAssignmentsTable)
      .set({
        status: 'REVOKED',
        updatedAt: new Date(),
      })
      .where(eq(courseAssignmentsTable.id, existingAssignment.id))
      .returning();

    await auditService.logAdminAction({
      adminUserId,
      action: 'REVOKE_LECTURER_COURSE',
      resourceType: 'course_assignments',
      resourceId: revoked?.id || null,
      metadata: {
        lecturerId,
        courseId,
        assignmentId: revoked?.id || null,
        academicSession: existingAssignment.academicSession,
        semester: existingAssignment.semester,
      },
      ipAddress: reqMeta?.ipAddress || null,
      userAgent: reqMeta?.userAgent || null,
    });

    return revoked;
  },
};
