import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { quizService } from '../services/quizService.js';

type QuizType = 'cbt' | 'theory';

// =====================================================
// QUIZ TYPE NORMALIZER
// =====================================================

const normalizeQuizType = (
  value: unknown
): QuizType | undefined => {
  if (
    value === 'cbt' ||
    value === 'theory'
  ) {
    return value;
  }

  return undefined;
};

// =====================================================
// FACULTIES
// =====================================================

export const getFacultiesList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    logger.info(
      '[QUIZ] Fetching all faculties'
    );

    const faculties =
      await quizService.getFaculties();

    res.status(200).json({
      status: 'success',
      count: faculties.length,
      data: faculties,
    });
  } catch (error: any) {
    logger.error(
      `[QUIZ] Error fetching faculties: ${error.message}`
    );

    res.status(500).json({
      status: 'fail',
      message:
        'Failed to fetch faculties',
    });
  }
};

// =====================================================
// DEPARTMENTS
// =====================================================

export const getDepartmentsList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { facultyId } =
    req.params;

  try {
    logger.info(
      `[QUIZ] Fetching departments for faculty: ${facultyId}`
    );

    const departments =
      await quizService.getDepartmentsByFaculty(
        facultyId as string
      );

    res.status(200).json({
      status: 'success',
      count: departments.length,
      data: departments,
    });
  } catch (error: any) {
    logger.error(
      `[QUIZ] Error fetching departments: ${error.message}`
    );

    res.status(500).json({
      status: 'fail',
      message:
        'Failed to fetch departments',
    });
  }
};

// =====================================================
// COURSES
// =====================================================

export const getCoursesList = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { departmentId } =
    req.params;

  const {
    level,
    semester,
  } = req.query;

  try {
    const parsedLevel =
      typeof level === 'string'
        ? Number(level)
        : undefined;

    const parsedSemester =
      typeof semester === 'string'
        ? semester
        : undefined;

    logger.info(
      `[QUIZ] Fetching courses for department: ${departmentId}, level: ${
        parsedLevel ?? 'all'
      }, semester: ${
        parsedSemester || 'all'
      }`
    );

    const courses =
      await quizService.getCourses(
        departmentId as string,
        parsedLevel,
        parsedSemester
      );

    res.status(200).json({
      status: 'success',
      count: courses.length,
      data: courses,
    });
  } catch (error: any) {
    logger.error(
      `[QUIZ] Error fetching courses: ${error.message}`
    );

    res.status(500).json({
      status: 'fail',
      message:
        'Failed to fetch courses',
    });
  }
};

// =====================================================
// QUESTIONS
// =====================================================

export const getQuestionsByCourseId =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const { courseId } =
      req.params;

    const { type } =
      req.query;

    if (!courseId) {
      res.status(400).json({
        status: 'fail',
        message:
          'Course ID is required.',
      });

      return;
    }

    const quizType =
      normalizeQuizType(type);

    if (
      type !== undefined &&
      !quizType
    ) {
      res.status(400).json({
        status: 'fail',
        message:
          'Invalid quiz type. Use "cbt" or "theory".',
      });

      return;
    }

    try {
      logger.info(
        `[QUIZ] Fetching questions for course: ${courseId}, type: ${
          quizType || 'all'
        }`
      );

      const questions =
        await quizService.getQuestionsByCourse(
          courseId as string,
          quizType,
          10
        );

      if (
        !questions ||
        questions.length === 0
      ) {
        logger.warn(
          `[QUIZ] No ${
            quizType || ''
          } questions found for course ID: ${courseId}`
        );

        res.status(404).json({
          status: 'fail',
          message:
            'No questions found for the selected course parameters.',
        });

        return;
      }

      /*
       * These questions are already safe because
       * quizService.getQuestionsByCourse()
       * does not select correctAnswer.
       */

      res.status(200).json({
        status: 'success',
        count: questions.length,
        data: questions,
      });
    } catch (error: any) {
      logger.error(
        `[QUIZ] Error fetching course questions: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch questions',
      });
    }
  };

// =====================================================
// LEGACY QUESTIONS
// =====================================================

export const getQuestionsByCategory =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const rawCategoryId =
      req.params.categoryId;

    const category =
      Array.isArray(rawCategoryId)
        ? rawCategoryId[0]
        : rawCategoryId;

    if (!category) {
      res.status(400).json({
        status: 'fail',
        message:
          'Category ID is required.',
      });

      return;
    }

    try {
      logger.info(
        `[QUIZ] Fetching dynamic questions for legacy category: ${category}`
      );

      const questions =
        await quizService.getDynamicQuestions(
          category,
          5
        );

      if (
        !questions ||
        questions.length === 0
      ) {
        res.status(404).json({
          status: 'fail',
          message:
            `No questions found for category: ${category}`,
        });

        return;
      }

      res.status(200).json({
        status: 'success',
        category,
        count: questions.length,
        data: questions,
      });
    } catch (error: any) {
      logger.error(
        `[QUIZ] Error fetching legacy questions: ${error.message}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch questions',
      });
    }
  };