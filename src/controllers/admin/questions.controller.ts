import type { Response } from 'express';
import { eq, or, ilike, and, sql, desc } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  questionsTable,
  coursesTable,
  departmentsTable,
  facultiesTable,
  type GradingPoint,
} from '../../db/schema.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const listQuestions = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const offset = (page - 1) * limit;

    const courseId = req.query.courseId as string | undefined;
    const type = req.query.type as string | undefined;
    const difficulty = req.query.difficulty as string | undefined;
    const search = req.query.search || req.query.q;

    const conditions = [];

    if (courseId) {
      conditions.push(eq(questionsTable.courseId, courseId as any));
    }

    if (type) {
      conditions.push(eq(questionsTable.type, type.toLowerCase()));
    }

    if (difficulty) {
      conditions.push(eq(questionsTable.difficulty, difficulty.toLowerCase()));
    }

    if (search && typeof search === 'string') {
      const pattern = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(questionsTable.question, pattern),
          ilike(questionsTable.correctAnswer, pattern)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const questionsQuery = db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        level: coursesTable.level,
        departmentName: departmentsTable.name,
        facultyName: facultiesTable.name,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        difficulty: questionsTable.difficulty,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .orderBy(desc(questionsTable.id))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .innerJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .innerJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id));

    const [questions, countResult] = await Promise.all([
      whereClause ? questionsQuery.where(whereClause) : questionsQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = countResult[0]?.count || 0;

    res.status(200).json({
      status: 'success',
      data: {
        questions,
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
      message: `Failed to fetch questions: ${error.message}`,
    });
  }
};

export const getQuestionDetails = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { questionId } = req.params;

    const [question] = await db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        level: coursesTable.level,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        difficulty: questionsTable.difficulty,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      res.status(404).json({
        status: 'fail',
        message: 'Question not found.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { question },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch question: ${error.message}`,
    });
  }
};

export const createQuestion = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      courseId,
      type = 'cbt',
      question,
      options,
      correctAnswer,
      gradingPoints,
      difficulty = 'medium',
    } = req.body;

    if (!courseId || !question || !correctAnswer) {
      res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: courseId, question, correctAnswer.',
      });
      return;
    }

    const normalizedType = type === 'theory' ? 'theory' : 'cbt';

    if (normalizedType === 'cbt') {
      if (!Array.isArray(options) || options.length < 2) {
        res.status(400).json({
          status: 'fail',
          message: 'CBT questions require an array of at least 2 options.',
        });
        return;
      }

      const trimmedAnswer = String(correctAnswer).trim();
      const optionMatches = options.some((opt: any) => String(opt).trim() === trimmedAnswer);
      if (!optionMatches) {
        res.status(400).json({
          status: 'fail',
          message: 'For CBT questions, correctAnswer must match one of the available options.',
        });
        return;
      }
    } else {
      if (gradingPoints !== undefined) {
        if (!Array.isArray(gradingPoints)) {
          res.status(400).json({
            status: 'fail',
            message: 'Theory gradingPoints must be an array.',
          });
          return;
        }

        for (const gp of gradingPoints) {
          const concept = gp.concept || gp.point;
          if (!concept || typeof concept !== 'string' || !concept.trim()) {
            res.status(400).json({
              status: 'fail',
              message: 'Each grading point must define a non-empty concept or point.',
            });
            return;
          }
          if (typeof gp.weight !== 'number' || gp.weight <= 0) {
            res.status(400).json({
              status: 'fail',
              message: 'Each grading point must specify a positive numeric weight.',
            });
            return;
          }
        }
      }
    }

    // Verify course exists
    const [course] = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.id, courseId as any));

    if (!course) {
      res.status(404).json({
        status: 'fail',
        message: 'Course not found.',
      });
      return;
    }

    const [newQuestion] = await db
      .insert(questionsTable)
      .values({
        courseId: courseId as any,
        type: normalizedType,
        question: String(question).trim(),
        options: normalizedType === 'cbt' ? options : null,
        correctAnswer: String(correctAnswer).trim(),
        gradingPoints: Array.isArray(gradingPoints) ? gradingPoints : [],
        difficulty: String(difficulty).toLowerCase(),
      })
      .returning();

    if (!newQuestion) {
      throw new Error('Failed to create question record.');
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'QUESTION_CREATE',
      resourceType: 'question',
      resourceId: String(newQuestion.id),
      metadata: {
        courseCode: course.code,
        courseId: course.id,
        type: normalizedType,
      },
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      status: 'success',
      message: 'Question created successfully.',
      data: { question: newQuestion },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to create question: ${error.message}`,
    });
  }
};

export const updateQuestion = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { questionId } = req.params;
    const {
      courseId,
      type,
      question,
      options,
      correctAnswer,
      gradingPoints,
      difficulty,
    } = req.body;

    const [existingQuestion] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!existingQuestion) {
      res.status(404).json({
        status: 'fail',
        message: 'Question not found.',
      });
      return;
    }

    const effectiveType = type ? (type === 'theory' ? 'theory' : 'cbt') : existingQuestion.type;
    const effectiveOptions = options !== undefined ? options : existingQuestion.options;
    const effectiveAnswer = correctAnswer !== undefined ? String(correctAnswer).trim() : existingQuestion.correctAnswer;

    if (effectiveType === 'cbt') {
      if (options !== undefined && (!Array.isArray(options) || options.length < 2)) {
        res.status(400).json({
          status: 'fail',
          message: 'CBT questions require an array of at least 2 options.',
        });
        return;
      }
      if (effectiveAnswer && Array.isArray(effectiveOptions)) {
        const matches = effectiveOptions.some((opt: any) => String(opt).trim() === effectiveAnswer);
        if (!matches) {
          res.status(400).json({
            status: 'fail',
            message: 'For CBT questions, correctAnswer must match one of the available options.',
          });
          return;
        }
      }
    } else {
      if (gradingPoints !== undefined) {
        if (!Array.isArray(gradingPoints)) {
          res.status(400).json({
            status: 'fail',
            message: 'Theory gradingPoints must be an array.',
          });
          return;
        }
        for (const gp of gradingPoints) {
          const concept = gp.concept || gp.point;
          if (!concept || typeof concept !== 'string' || !concept.trim()) {
            res.status(400).json({
              status: 'fail',
              message: 'Each grading point must define a non-empty concept or point.',
            });
            return;
          }
          if (typeof gp.weight !== 'number' || gp.weight <= 0) {
            res.status(400).json({
              status: 'fail',
              message: 'Each grading point must specify a positive numeric weight.',
            });
            return;
          }
        }
      }
    }

    const updateData: Partial<typeof questionsTable.$inferInsert> = {};

    if (courseId) updateData.courseId = courseId as any;
    if (type) updateData.type = type === 'theory' ? 'theory' : 'cbt';
    if (question) updateData.question = String(question).trim();
    if (options !== undefined) updateData.options = options;
    if (correctAnswer) updateData.correctAnswer = String(correctAnswer).trim();
    if (gradingPoints !== undefined) updateData.gradingPoints = gradingPoints;
    if (difficulty) updateData.difficulty = String(difficulty).toLowerCase();

    const [updatedQuestion] = await db
      .update(questionsTable)
      .set(updateData)
      .where(eq(questionsTable.id, questionId as any))
      .returning();

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'QUESTION_UPDATE',
      resourceType: 'question',
      resourceId: String(questionId),
      metadata: {
        updatedFields: Object.keys(updateData),
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: 'Question updated successfully.',
      data: { question: updatedQuestion },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update question: ${error.message}`,
    });
  }
};

export const deleteQuestion = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { questionId } = req.params;
    const hard = req.query.hard === 'true';

    const [existingQuestion] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!existingQuestion) {
      res.status(404).json({
        status: 'fail',
        message: 'Question not found.',
      });
      return;
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    if (!hard) {
      // Soft-archive by default to safeguard against orphaned quiz history references
      await db
        .update(questionsTable)
        .set({ isActive: false })
        .where(eq(questionsTable.id, questionId as any));

      await auditService.logAdminAction({
        adminUserId: req.adminUser!.id,
        action: 'QUESTION_ARCHIVE',
        resourceType: 'question',
        resourceId: String(questionId),
        metadata: {
          courseId: existingQuestion.courseId,
          type: existingQuestion.type,
          softDeleted: true,
        },
        ipAddress,
        userAgent,
      });

      res.status(200).json({
        status: 'success',
        message: 'Question archived (soft-deleted) successfully.',
        data: { archived: true },
      });
      return;
    }

    await db
      .delete(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'QUESTION_DELETE',
      resourceType: 'question',
      resourceId: String(questionId),
      metadata: {
        courseId: existingQuestion.courseId,
        type: existingQuestion.type,
        hardDeleted: true,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: 'Question deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to delete question: ${error.message}`,
    });
  }
};
