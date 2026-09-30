import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { aiProvider } from '../services/ai/index.js';
import { db } from '../db/index.js';
import { questionsTable, coursesTable, usersTable, facultiesTable, departmentsTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import logger from '../config/logger.js';

// =====================================================
// GRADE THEORY ANSWER (DIRECT ENDPOINT)
// =====================================================

export const gradeTheoryEndpoint = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const {
    questionId,
    questionText,
    studentAnswer,
    referenceAnswer,
    gradingPoints,
    maxScore,
  } = req.body;

  try {
    let finalQuestionText = questionText;
    let finalReferenceAnswer = referenceAnswer;
    let finalGradingPoints = gradingPoints;
    let courseContext: { code?: string; title?: string; level?: number } | undefined;

    // If a questionId was supplied, retrieve the official question & rubric from database
    if (questionId) {
      const [questionRecord] = await db
        .select()
        .from(questionsTable)
        .where(eq(questionsTable.id, questionId));

      if (!questionRecord) {
        res.status(404).json({
          status: 'fail',
          message: 'Question not found.',
        });
        return;
      }

      if (questionRecord.type !== 'theory') {
        res.status(400).json({
          status: 'fail',
          message: 'The requested question is not a theory question. CBT questions cannot be graded via the theory AI endpoint.',
        });
        return;
      }

      finalQuestionText = questionRecord.question;
      finalReferenceAnswer = questionRecord.correctAnswer;
      finalGradingPoints = questionRecord.gradingPoints || [];

      // Fetch course context
      const [courseRecord] = await db
        .select({
          code: coursesTable.code,
          title: coursesTable.title,
          level: coursesTable.level,
        })
        .from(coursesTable)
        .where(eq(coursesTable.id, questionRecord.courseId));

      if (courseRecord) {
        courseContext = {
          code: courseRecord.code,
          title: courseRecord.title,
          level: courseRecord.level,
        };
      }
    }

    const gradingOutput = await aiProvider.gradeTheoryAnswer({
      questionId,
      questionText: finalQuestionText,
      questionType: 'theory',
      maxScore: maxScore || 10,
      referenceAnswer: finalReferenceAnswer,
      gradingPoints: finalGradingPoints,
      studentAnswer,
      courseContext,
    });

    res.status(200).json({
      status: 'success',
      data: gradingOutput,
    });
  } catch (error: any) {
    logger.error(`[AI CONTROLLER] Error in gradeTheoryEndpoint: ${error?.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to process theory grading request.',
    });
  }
};

// =====================================================
// AI SUPPORT ASSISTANT
// =====================================================

export const supportAssistantEndpoint = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const { message } = req.body;

  try {
    // Optionally fetch student profile context for tailored responses
    let userContext:
      | {
          userId?: string | undefined;
          fullName?: string | undefined;
          faculty?: string | undefined;
          department?: string | undefined;
          level?: number | undefined;
        }
      | undefined;

    const [userRecord] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        level: usersTable.level,
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (userRecord) {
      let facultyName: string | undefined;
      let departmentName: string | undefined;

      if (userRecord.facultyId) {
        const [fac] = await db
          .select({ name: facultiesTable.name })
          .from(facultiesTable)
          .where(eq(facultiesTable.id, userRecord.facultyId));
        facultyName = fac?.name;
      }

      if (userRecord.departmentId) {
        const [dept] = await db
          .select({ name: departmentsTable.name })
          .from(departmentsTable)
          .where(eq(departmentsTable.id, userRecord.departmentId));
        departmentName = dept?.name;
      }

      userContext = {
        userId: String(userRecord.id),
        fullName: userRecord.fullName,
        faculty: facultyName,
        department: departmentName,
        level: userRecord.level || undefined,
      };
    }

    const supportResult = await aiProvider.generateSupportResponse({
      userMessage: message,
      userContext,
    });

    if (supportResult.status === 'ai_unavailable') {
      res.status(200).json({
        status: 'ai_unavailable',
        message: 'AI support is temporarily unavailable. You can continue using the normal support system.',
        data: supportResult,
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: supportResult,
    });
  } catch (error: any) {
    logger.error(`[AI CONTROLLER] Error in supportAssistantEndpoint: ${error?.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to generate support response.',
    });
  }
};

// =====================================================
// AI STATUS
// =====================================================

export const getAiStatus = (
  _req: AuthenticatedRequest,
  res: Response
): void => {
  res.status(200).json({
    status: 'success',
    data: {
      isAvailable: aiProvider.isAvailable(),
      model: aiProvider.getModelName(),
    },
  });
};
