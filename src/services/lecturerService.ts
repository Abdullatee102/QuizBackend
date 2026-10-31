import { eq, and, or, ilike, desc, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  usersTable,
  coursesTable,
  departmentsTable,
  facultiesTable,
  courseAssignmentsTable,
  questionsTable,
} from '../db/schema.js';
import type { LecturerDashboardOverview } from '../types/lecturer.types.js';

export const lecturerService = {
  /**
   * Retrieves dashboard overview metrics for an authenticated lecturer.
   */
  getLecturerDashboardData: async (lecturerId: string): Promise<LecturerDashboardOverview> => {
    // 1. Fetch lecturer profile with faculty and department
    const [user] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
        facultyName: facultiesTable.name,
        departmentName: departmentsTable.name,
      })
      .from(usersTable)
      .leftJoin(facultiesTable, eq(usersTable.facultyId, facultiesTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(eq(usersTable.id, lecturerId as any));

    if (!user) {
      throw new Error('Lecturer not found');
    }

    // 2. Fetch all active course assignments for this lecturer
    const assignments = await db
      .select({
        assignmentId: courseAssignmentsTable.id,
        courseId: coursesTable.id,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        level: coursesTable.level,
        semester: courseAssignmentsTable.semester,
        catalogueSemester: coursesTable.semester,
        academicSession: courseAssignmentsTable.academicSession,
        assignedAt: courseAssignmentsTable.createdAt,
      })
      .from(courseAssignmentsTable)
      .innerJoin(coursesTable, eq(courseAssignmentsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturerId as any),
          eq(courseAssignmentsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      )
      .orderBy(desc(courseAssignmentsTable.createdAt));

    const activeSessionsSet = new Set<string>();
    assignments.forEach((a) => {
      if (a.academicSession) activeSessionsSet.add(a.academicSession);
    });
    const activeSessions = Array.from(activeSessionsSet);

    return {
      lecturer: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        facultyName: user.facultyName || null,
        departmentName: user.departmentName || null,
      },
      metrics: {
        assignedCoursesCount: assignments.length,
        activeSessionsCount: activeSessions.length,
        activeSessions,
      },
      recentAssignments: assignments.slice(0, 5),
    };
  },

  /**
   * Retrieves paginated courses actively assigned to the authenticated lecturer.
   */
  getAssignedCourses: async (
    lecturerId: string,
    options: {
      page?: number | undefined;
      limit?: number | undefined;
      search?: string | undefined;
      semester?: string | undefined;
      academicSession?: string | undefined;
    }
  ) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [
      eq(courseAssignmentsTable.lecturerId, lecturerId as any),
      eq(courseAssignmentsTable.status, 'ACTIVE'),
      eq(coursesTable.isActive, true),
    ];

    if (options.search && typeof options.search === 'string') {
      const pattern = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(coursesTable.code, pattern),
          ilike(coursesTable.title, pattern)
        )!
      );
    }

    if (options.semester) {
      conditions.push(eq(courseAssignmentsTable.semester, options.semester.trim().toLowerCase()));
    }

    if (options.academicSession) {
      conditions.push(eq(courseAssignmentsTable.academicSession, options.academicSession));
    }

    const whereClause = and(...conditions);

    const coursesQuery = db
      .select({
        assignmentId: courseAssignmentsTable.id,
        academicSession: courseAssignmentsTable.academicSession,
        assignmentStatus: courseAssignmentsTable.status,
        assignedAt: courseAssignmentsTable.createdAt,
        courseId: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        semester: courseAssignmentsTable.semester,
        catalogueSemester: coursesTable.semester,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyId: departmentsTable.facultyId,
        facultyName: facultiesTable.name,
      })
      .from(courseAssignmentsTable)
      .innerJoin(coursesTable, eq(courseAssignmentsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(whereClause)
      .orderBy(coursesTable.code)
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(courseAssignmentsTable)
      .innerJoin(coursesTable, eq(courseAssignmentsTable.courseId, coursesTable.id))
      .where(whereClause);

    const [courses, countResult] = await Promise.all([coursesQuery, countQuery]);
    const total = countResult[0]?.count || 0;

    // Enrich courses with question count metrics (safe summary without answer leak)
    const enrichedCourses = await Promise.all(
      courses.map(async (c) => {
        const [counts] = await db
          .select({
            totalQuestions: sql<number>`count(*)`.mapWith(Number),
            cbtQuestions: sql<number>`count(case when ${questionsTable.type} = 'cbt' then 1 end)`.mapWith(Number),
            theoryQuestions: sql<number>`count(case when ${questionsTable.type} = 'theory' then 1 end)`.mapWith(Number),
          })
          .from(questionsTable)
          .where(
            and(
              eq(questionsTable.courseId, c.courseId),
              eq(questionsTable.isActive, true)
            )
          );

        return {
          ...c,
          metrics: {
            totalQuestions: counts?.totalQuestions || 0,
            cbtQuestions: counts?.cbtQuestions || 0,
            theoryQuestions: counts?.theoryQuestions || 0,
          },
        };
      })
    );

    return {
      courses: enrichedCourses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Retrieves detailed permitted information for a specific assigned course.
   */
  getAssignedCourseDetails: async (lecturerId: string, courseId: string) => {
    // 1. Fetch assignment and course
    const [record] = await db
      .select({
        assignmentId: courseAssignmentsTable.id,
        academicSession: courseAssignmentsTable.academicSession,
        assignmentStatus: courseAssignmentsTable.status,
        assignedAt: courseAssignmentsTable.createdAt,
        courseId: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        semester: courseAssignmentsTable.semester,
        catalogueSemester: coursesTable.semester,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyId: departmentsTable.facultyId,
        facultyName: facultiesTable.name,
      })
      .from(courseAssignmentsTable)
      .innerJoin(coursesTable, eq(courseAssignmentsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturerId as any),
          eq(courseAssignmentsTable.courseId, courseId as any),
          eq(courseAssignmentsTable.status, 'ACTIVE'),
          eq(coursesTable.isActive, true)
        )
      );

    if (!record) {
      return null;
    }

    // 2. Fetch question summary stats
    const [counts] = await db
      .select({
        totalQuestions: sql<number>`count(*)`.mapWith(Number),
        cbtQuestions: sql<number>`count(case when ${questionsTable.type} = 'cbt' then 1 end)`.mapWith(Number),
        theoryQuestions: sql<number>`count(case when ${questionsTable.type} = 'theory' then 1 end)`.mapWith(Number),
      })
      .from(questionsTable)
      .where(
        and(
          eq(questionsTable.courseId, record.courseId),
          eq(questionsTable.isActive, true)
        )
      );

    return {
      ...record,
      metrics: {
        totalQuestions: counts?.totalQuestions || 0,
        cbtQuestions: counts?.cbtQuestions || 0,
        theoryQuestions: counts?.theoryQuestions || 0,
      },
    };
  },
};
