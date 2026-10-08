import type { Response } from 'express';
import { eq, or, ilike, and, sql, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  coursesTable,
  departmentsTable,
  facultiesTable,
  questionsTable,
  quizHistoryTable,
} from '../../db/schema.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const listCourses = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const offset = (page - 1) * limit;

    const search = req.query.search || req.query.q;
    const facultyId = req.query.facultyId as string | undefined;
    const departmentId = req.query.departmentId as string | undefined;
    const level = req.query.level ? Number(req.query.level) : undefined;
    const semester = req.query.semester as string | undefined;

    const conditions = [];

    if (search && typeof search === 'string') {
      const pattern = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(coursesTable.code, pattern),
          ilike(coursesTable.title, pattern)
        )
      );
    }

    if (departmentId) {
      conditions.push(eq(coursesTable.departmentId, departmentId as any));
    }

    if (level) {
      conditions.push(eq(coursesTable.level, level));
    }

    if (semester) {
      conditions.push(eq(coursesTable.semester, semester));
    }

    if (facultyId) {
      conditions.push(eq(departmentsTable.facultyId, facultyId as any));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const coursesQuery = db
      .select({
        id: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        semester: coursesTable.semester,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyId: departmentsTable.facultyId,
        facultyName: facultiesTable.name,
      })
      .from(coursesTable)
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .orderBy(coursesTable.code)
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(coursesTable)
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id));

    const [courses, countResult] = await Promise.all([
      whereClause ? coursesQuery.where(whereClause) : coursesQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = countResult[0]?.count || 0;

    // Attach question counts for each course
    const enrichedCourses = await Promise.all(
      courses.map(async (course) => {
        const [counts] = await db
          .select({
            total: sql<number>`count(*)`.mapWith(Number),
            cbt: sql<number>`count(case when ${questionsTable.type} = 'cbt' then 1 end)`.mapWith(Number),
            theory: sql<number>`count(case when ${questionsTable.type} = 'theory' then 1 end)`.mapWith(Number),
          })
          .from(questionsTable)
          .where(eq(questionsTable.courseId, course.id));

        return {
          ...course,
          questionsCount: counts || { total: 0, cbt: 0, theory: 0 },
        };
      })
    );

    res.status(200).json({
      status: 'success',
      data: {
        courses: enrichedCourses,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch courses: ${error.message}`,
    });
  }
};

export const getCourseDetails = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { courseId } = req.params;

    const [course] = await db
      .select({
        id: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: coursesTable.level,
        semester: coursesTable.semester,
        departmentId: coursesTable.departmentId,
        departmentName: departmentsTable.name,
        facultyId: departmentsTable.facultyId,
        facultyName: facultiesTable.name,
      })
      .from(coursesTable)
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(eq(coursesTable.id, courseId as any));

    if (!course) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found.',
      });
      return;
    }

    const [counts] = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
        cbt: sql<number>`count(case when ${questionsTable.type} = 'cbt' then 1 end)`.mapWith(Number),
        theory: sql<number>`count(case when ${questionsTable.type} = 'theory' then 1 end)`.mapWith(Number),
      })
      .from(questionsTable)
      .where(eq(questionsTable.courseId, course.id));

    res.status(200).json({
      status: 'success',
      data: {
        course: {
          ...course,
          questionsCount: counts || { total: 0, cbt: 0, theory: 0 },
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch course details: ${error.message}`,
    });
  }
};

export const createCourse = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { code, title, level, semester, departmentId } = req.body;

    if (!code || !title || !level || !semester || !departmentId) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: code, title, level, semester, departmentId.',
      });
      return;
    }

    const normalizedCode = String(code).trim().toUpperCase();

    // Verify department exists
    const [department] = await db
      .select()
      .from(departmentsTable)
      .where(eq(departmentsTable.id, departmentId as any));

    if (!department) {
      res.status(404).json({
        status: 'fail',
        message: 'Department not found.',
      });
      return;
    }

    // Check for duplicate course code in department
    const [existing] = await db
      .select()
      .from(coursesTable)
      .where(
        and(
          eq(coursesTable.code, normalizedCode),
          eq(coursesTable.departmentId, departmentId as any)
        )
      );

    if (existing) {
      res.status(400).json({
        status: 'fail',
        message: `Course with code ${normalizedCode} already exists in this department.`,
      });
      return;
    }

    const [newCourse] = await db
      .insert(coursesTable)
      .values({
        code: normalizedCode,
        title: String(title).trim(),
        level: Number(level),
        semester: String(semester).trim().toLowerCase(),
        departmentId: departmentId as any,
      })
      .returning();

    if (!newCourse) {
      throw new Error('Failed to create course record.');
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'COURSE_CREATE',
      resourceType: 'course',
      resourceId: String(newCourse.id),
      metadata: {
        code: newCourse.code,
        title: newCourse.title,
        departmentId: newCourse.departmentId,
      },
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      status: 'success',
      message: 'Course created successfully.',
      data: { course: newCourse },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to create course: ${error.message}`,
    });
  }
};

export const updateCourse = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { courseId } = req.params;
    const { code, title, level, semester, departmentId } = req.body;

    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    if (!existingCourse) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found.',
      });
      return;
    }

    const updateData: Partial<typeof coursesTable.$inferInsert> = {};

    if (code) updateData.code = String(code).trim().toUpperCase();
    if (title) updateData.title = String(title).trim();
    if (level !== undefined) updateData.level = Number(level);
    if (semester) updateData.semester = String(semester).trim().toLowerCase();
    if (departmentId) updateData.departmentId = departmentId as any;

    const [updatedCourse] = await db
      .update(coursesTable)
      .set(updateData)
      .where(eq(coursesTable.id, courseId as any))
      .returning();

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'COURSE_UPDATE',
      resourceType: 'course',
      resourceId: String(courseId),
      metadata: {
        previous: {
          code: existingCourse.code,
          title: existingCourse.title,
        },
        updated: updateData,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: 'Course updated successfully.',
      data: { course: updatedCourse },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update course: ${error.message}`,
    });
  }
};

export const deleteCourse = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { courseId } = req.params;
    const cascade = req.query.cascade === 'true';

    const [existingCourse] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    if (!existingCourse) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found.',
      });
      return;
    }

    // Safety check: count existing questions
    const [qCount] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(questionsTable)
      .where(eq(questionsTable.courseId, courseId as any));

    const questionsCount = qCount?.count || 0;

    // Safety check: check historical student quiz attempts
    const [historyCount] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(quizHistoryTable)
      .where(eq(quizHistoryTable.courseId, courseId as any));

    const attemptsCount = historyCount?.count || 0;

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    // If historical quiz records exist, soft-archive the course to preserve student scores
    if (attemptsCount > 0) {
      await db
        .update(coursesTable)
        .set({ isActive: false })
        .where(eq(coursesTable.id, courseId as any));

      await db
        .update(questionsTable)
        .set({ isActive: false })
        .where(eq(questionsTable.courseId, courseId as any));

      await auditService.logAdminAction({
        adminUserId: req.adminUser!.id,
        action: 'COURSE_ARCHIVE',
        resourceType: 'course',
        resourceId: String(courseId),
        metadata: {
          code: existingCourse.code,
          title: existingCourse.title,
          preservedAttemptsCount: attemptsCount,
          archivedQuestionsCount: questionsCount,
          reason: 'Preserved historical student quiz attempts',
        },
        ipAddress,
        userAgent,
      });

      res.status(200).json({
        status: 'success',
        message: `Course ${existingCourse.code} has been archived (soft-deleted) to preserve ${attemptsCount} historical student quiz record(s).`,
        data: {
          archived: true,
          preservedAttempts: attemptsCount,
        },
      });
      return;
    }

    // If no history exists, enforce cascade flag if questions exist
    if (questionsCount > 0 && !cascade) {
      res.status(400).json({
        status: 'fail',
        message: `Course has ${questionsCount} associated question(s). To delete this course and all its questions, provide the query parameter '?cascade=true'.`,
        questionsCount,
      });
      return;
    }

    await db
      .delete(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'COURSE_DELETE',
      resourceType: 'course',
      resourceId: String(courseId),
      metadata: {
        code: existingCourse.code,
        title: existingCourse.title,
        deletedQuestionsCount: questionsCount,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: `Course ${existingCourse.code} deleted successfully.`,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to delete course: ${error.message}`,
    });
  }
};
