import { db } from '../db/index.js';

import {
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
  type GradingPoint,
} from '../db/schema.js';

import { eq, and } from 'drizzle-orm';

// =====================================================
// TYPES
// =====================================================

type QuizType = 'cbt' | 'theory';

interface QuizAnswer {
  questionId: string;
  answer: string;
}

interface GradedQuestion {
  questionId: string;
  answer: string;
  isCorrect: boolean;

  /**
   * Actual points earned for this question.
   *
   * Every question is worth 10 points.
   *
   * CBT:
   *   correct = 10
   *   wrong   = 0
   *
   * Theory:
   *   100% = 10
   *   75%  = 7.5
   *   50%  = 5
   *   0%   = 0
   */
  score: number;

  /**
   * Theory similarity/percentage.
   *
   * Example:
   *   75 = 75%
   * Maximum possible points for this question (10).
   */
  maxScore: number;

  /**
   * Theory similarity or question percentage (0 - 100).
   */
  similarity?: number;
  percentage?: number;

  /**
   * Structured concept breakdown for theory answers.
   */
  matchedConcepts?: string[];
  missingConcepts?: string[];
  feedback?: string;
}

interface QuizGradingResult {
  quizType: QuizType;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;

  /**
   * Final quiz score in POINTS.
   *
   * Every question is worth 10 points.
   *
   * Example for 10 questions:
   *
   * 10/10 = 100 points
   * 7.5 average = 75 points
   * 5/10  = 50 points
   */
  score: number;

  /**
   * Final quiz percentage.
   *
   * This is kept separate from points.
   *
   * Example:
   *
   * 100 points / 100 possible = 100%
   * 75 points / 100 possible  = 75%
   * 50 points / 100 possible  = 50%
   */
  percentage: number;

  results: GradedQuestion[];
}

// =====================================================
// SCORE SETTINGS
// =====================================================

/**
 * Every question is worth exactly 10 points.
 */
const POINTS_PER_QUESTION = 10;

// =====================================================
// THEORY SETTINGS
// =====================================================

const THEORY_CORRECT_THRESHOLD = 0.75;

// =====================================================
// ANSWER NORMALIZATION
// =====================================================

const normalizeAnswer = (
  value: string | null | undefined
): string => {
  if (!value) {
    return '';
  }

  return value
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/⁴/g, '4')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// =====================================================
// TOKENIZATION
// =====================================================

const tokenizeAnswer = (
  value: string
): string[] => {
  const normalized = normalizeAnswer(value);

  if (!normalized) {
    return [];
  }

  return [
    ...new Set(
      normalized
        .split(' ')
        .filter(
          (word) => word.length > 1
        )
    ),
  ];
};

// =====================================================
// TOKEN OVERLAP FALLBACK
// =====================================================

const calculateTokenOverlap = (
  studentText: string,
  targetText: string
): number => {
  const studentTokens =
    tokenizeAnswer(studentText);

  const targetTokens =
    tokenizeAnswer(targetText);

  if (
    studentTokens.length === 0 ||
    targetTokens.length === 0
  ) {
    return 0;
  }

  const studentSet =
    new Set(studentTokens);

  const targetSet =
    new Set(targetTokens);

  let matchingTokens = 0;

  for (const token of studentSet) {
    if (targetSet.has(token)) {
      matchingTokens++;
    }
  }

  if (matchingTokens === 0) {
    return 0;
  }

  const precision =
    matchingTokens /
    studentSet.size;

  const recall =
    matchingTokens /
    targetSet.size;

  if (
    precision + recall === 0
  ) {
    return 0;
  }

  return (
    (2 * precision * recall) /
    (precision + recall)
  );
};

// =====================================================
// MATCH GRADING POINT
// =====================================================

const matchGradingPoint = (
  studentAnswer: string,
  gradingPoint: GradingPoint
): number => {
  const normalizedStudent =
    normalizeAnswer(studentAnswer);

  if (!normalizedStudent) {
    return 0;
  }

  const candidates = [
    gradingPoint.concept,
    ...(gradingPoint.aliases || []),
  ];

  // ===================================================
  // EXACT CONCEPT / ALIAS MATCH
  // ===================================================

  for (const candidate of candidates) {
    const normalizedCandidate =
      normalizeAnswer(candidate);

    if (!normalizedCandidate) {
      continue;
    }

    if (
      normalizedStudent.includes(
        normalizedCandidate
      )
    ) {
      return 1;
    }
  }

  // ===================================================
  // TOKEN OVERLAP FALLBACK
  // ===================================================

  let bestOverlap = 0;

  for (const candidate of candidates) {
    const overlap =
      calculateTokenOverlap(
        normalizedStudent,
        candidate
      );

    if (overlap > bestOverlap) {
      bestOverlap = overlap;
    }
  }

  // Require strong overlap before awarding
  // the complete grading point.
  if (bestOverlap >= 0.75) {
    return 1;
  }

  return 0;
};

// =====================================================
// THEORY GRADING
// =====================================================

/**
 * Returns the normalized theory score.
 *
 * IMPORTANT:
 * This function returns 0–1 internally because
 * the grading logic is percentage-based.
 *
 * It is converted to actual 0–10 points
 * inside gradeQuiz().
 */
const gradeTheoryAnswer = (
  studentAnswer: string,
  correctAnswer: string,
  gradingPoints: GradingPoint[]
): {
  isCorrect: boolean;
  score: number;
  similarity: number;
  matchedConcepts: string[];
  missingConcepts: string[];
  feedback: string;
} => {
  const normalizedStudent =
    normalizeAnswer(studentAnswer);

  const normalizedCorrect =
    normalizeAnswer(correctAnswer);

  // ===================================================
  // EMPTY ANSWER
  // ===================================================

  if (!normalizedStudent) {
    return {
      isCorrect: false,
      score: 0,
      similarity: 0,
      matchedConcepts: [],
      missingConcepts: (gradingPoints || []).map((p) => p.concept),
      feedback: 'No answer was provided.',
    };
  }

  // ===================================================
  // EXACT ANSWER
  // ===================================================

  if (
    normalizedStudent ===
    normalizedCorrect
  ) {
    return {
      isCorrect: true,
      score: 1,
      similarity: 100,
      matchedConcepts: (gradingPoints || []).map((p) => p.concept),
      missingConcepts: [],
      feedback: 'Excellent answer! You matched the expected solution accurately.',
    };
  }

  // ===================================================
  // CORRECT ANSWER INSIDE LONGER EXPLANATION
  // ===================================================

  if (
    normalizedCorrect &&
    normalizedStudent.includes(
      normalizedCorrect
    )
  ) {
    return {
      isCorrect: true,
      score: 1,
      similarity: 100,
      matchedConcepts: (gradingPoints || []).map((p) => p.concept),
      missingConcepts: [],
      feedback: 'Great response! You covered the core expected concept comprehensively.',
    };
  }

  // ===================================================
  // FALLBACK FOR OLD THEORY QUESTIONS
  // ===================================================

  if (
    !gradingPoints ||
    gradingPoints.length === 0
  ) {
    const similarity =
      calculateTokenOverlap(
        normalizedStudent,
        normalizedCorrect
      );

    const score =
      Number(
        similarity.toFixed(4)
      );

    const isCorrect =
      similarity >=
      THEORY_CORRECT_THRESHOLD;

    const simPercent =
      Number(
        (
          similarity * 100
        ).toFixed(2)
      );

    return {
      isCorrect,
      score,
      similarity: simPercent,
      matchedConcepts: isCorrect ? ['Core explanation'] : [],
      missingConcepts: isCorrect ? [] : ['Detailed elaboration'],
      feedback: isCorrect
        ? 'Well explained!'
        : 'Your explanation could be more detailed and aligned with key points.',
    };
  }

  // ===================================================
  // RUBRIC-BASED GRADING
  // ===================================================

  let totalWeight = 0;
  let earnedWeight = 0;
  const matchedConcepts: string[] = [];
  const missingConcepts: string[] = [];

  for (const point of gradingPoints) {
    const weight =
      Number(point.weight) || 0;

    if (weight <= 0) {
      continue;
    }

    totalWeight += weight;

    const matched =
      matchGradingPoint(
        normalizedStudent,
        point
      );

    earnedWeight +=
      weight * matched;
    if (matched > 0) {
      matchedConcepts.push(point.concept);
      earnedWeight += weight * matched;
    } else {
      missingConcepts.push(point.concept);
    }
  }

  // ===================================================
  // INVALID RUBRIC PROTECTION
  // ===================================================

  if (totalWeight <= 0) {
    return {
      isCorrect: false,
      score: 0,
      similarity: 0,
      matchedConcepts: [],
      missingConcepts: [],
      feedback: 'Grading rubric unavailable.',
    };
  }

  // ===================================================
  // FINAL THEORY NORMALIZED SCORE
  // ===================================================

  const score =
    Number(
      (
        earnedWeight /
        totalWeight
      ).toFixed(4)
    );

  const similarity =
    Number(
      (
        score * 100
      ).toFixed(2)
    );

  const isCorrect =
    score >=
    THEORY_CORRECT_THRESHOLD;

  let feedback = '';
  if (score >= 1) {
    feedback = 'Outstanding! You correctly addressed all key concepts.';
  } else if (score >= 0.75) {
    feedback = `Great work! You captured ${matchedConcepts.length} key concept(s).`;
  } else if (matchedConcepts.length > 0) {
    feedback = `Partially correct. You covered: "${matchedConcepts.join(', ')}", but missed: "${missingConcepts.join(', ')}".`;
  } else {
    feedback = `Your answer missed the expected key concepts: "${missingConcepts.join(', ')}".`;
  }

  return {
    isCorrect,
    score,
    similarity,
    matchedConcepts,
    missingConcepts,
    feedback,
  };
};

// =====================================================
// QUIZ SERVICE
// =====================================================

export const quizService = {
  // ===================================================
  // FACULTIES
  // ===================================================

  getFaculties:
    async (): Promise<any[]> => {
      return await db
        .select()
        .from(facultiesTable);
    },

  // ===================================================
  // DEPARTMENTS
  // ===================================================

  getDepartmentsByFaculty:
    async (
      facultyId: string
    ): Promise<any[]> => {
      return await db
        .select()
        .from(departmentsTable)
        .where(
          eq(
            departmentsTable.facultyId,
            facultyId
          )
        );
    },

  // ===================================================
  // COURSES
  // ===================================================

  getCourses: async (
    departmentId: string,
    level?: number,
    semester?: string
  ): Promise<any[]> => {
    const conditions = [
      eq(
        coursesTable.departmentId,
        departmentId
      ),
    ];

    if (level !== undefined) {
      conditions.push(
        eq(
          coursesTable.level,
          level
        )
      );
    }

    if (semester) {
      conditions.push(
        eq(
          coursesTable.semester,
          semester
        )
      );
    }

    return await db
      .select()
      .from(coursesTable)
      .where(
        and(...conditions)
      );
  },

  // ===================================================
  // QUESTIONS
  // ===================================================

  getQuestionsByCourse:
    async (
      courseId: string,
      type?: QuizType,
      limit: number = 10
    ): Promise<any[]> => {
      const conditions = [
        eq(
          questionsTable.courseId,
          courseId
        ),
      ];

      if (type) {
        conditions.push(
          eq(
            questionsTable.type,
            type
          )
        );
      }

      /*
       * SECURITY:
       *
       * Never return:
       *
       * - correctAnswer
       * - gradingPoints
       *
       * to the mobile application.
       */

      const questions =
        await db
          .select({
            id:
              questionsTable.id,

            courseId:
              questionsTable.courseId,

            type:
              questionsTable.type,

            question:
              questionsTable.question,

            options:
              questionsTable.options,

            difficulty:
              questionsTable.difficulty,
          })
          .from(questionsTable)
          .where(
            and(...conditions)
          )
          .limit(limit);

      return questions;
    },

  // ===================================================
  // GRADE QUIZ
  // ===================================================

  gradeQuiz: async (
    courseId: string,
    quizType: QuizType,
    answers: QuizAnswer[]
  ): Promise<QuizGradingResult> => {
    /*
     * correctAnswer and gradingPoints are fetched
     * ONLY on the backend.
     */

    const questions =
      await db
        .select({
          id:
            questionsTable.id,

          courseId:
            questionsTable.courseId,

          type:
            questionsTable.type,

          correctAnswer:
            questionsTable.correctAnswer,

          gradingPoints:
            questionsTable.gradingPoints,
        })
        .from(questionsTable)
        .where(
          and(
            eq(
              questionsTable.courseId,
              courseId
            ),

            eq(
              questionsTable.type,
              quizType
            )
          )
        );

    if (
      !questions ||
      questions.length === 0
    ) {
      throw new Error(
        `No ${quizType} questions found for course: ${courseId}`
      );
    }

    // =================================================
    // STORE SUBMITTED ANSWERS
    // =================================================

    const submittedAnswers =
      new Map<string, string>();

    for (const item of answers) {
      submittedAnswers.set(
        item.questionId,
        item.answer || ''
      );
    }

    // =================================================
    // GRADE QUESTIONS
    // =================================================

    const results: GradedQuestion[] =
      questions.map(
        (question) => {
          const studentAnswer =
            submittedAnswers.get(
              question.id
            ) || '';

          // ===========================================
          // CBT
          // ===========================================

          if (
            quizType === 'cbt'
          ) {
            const isCorrect =
              normalizeAnswer(
                studentAnswer
              ) ===
              normalizeAnswer(
                question.correctAnswer
              );

            return {
              questionId:
                question.id,

              answer:
                studentAnswer,

              isCorrect,

              /*
               * CBT is either:
               *
               * correct = 10 points
               * wrong   = 0 points
               */
              score:
                isCorrect
                  ? POINTS_PER_QUESTION
                  : 0,

              maxScore: POINTS_PER_QUESTION,

              percentage:
                isCorrect ? 100 : 0,

              feedback: isCorrect
                ? 'Correct answer!'
                : 'Incorrect answer.',
            };
          }

          // ===========================================
          // THEORY
          // ===========================================

          const theoryResult =
            gradeTheoryAnswer(
              studentAnswer,
              question.correctAnswer,
              question.gradingPoints || []
            );

          /*
           * theoryResult.score is normalized:
           *
           * 1    = 100%
           * 0.75 = 75%
           * 0.5  = 50%
           *
           * Convert it immediately into the
           * actual 10-point question score:
           *
           * 1    × 10 = 10
           * 0.75 × 10 = 7.5
           * 0.5  × 10 = 5
           */
          const questionScore =
            Number(
              (
                theoryResult.score *
                POINTS_PER_QUESTION
              ).toFixed(2)
            );

          return {
            questionId:
              question.id,

            answer:
              studentAnswer,

            isCorrect:
              theoryResult.isCorrect,

            score:
              questionScore,

            maxScore: POINTS_PER_QUESTION,

            similarity:
              theoryResult.similarity,

            percentage:
              theoryResult.similarity,

            matchedConcepts:
              theoryResult.matchedConcepts,

            missingConcepts:
              theoryResult.missingConcepts,

            feedback:
              theoryResult.feedback,
          };
        }
      );

    // =================================================
    // STATISTICS
    // =================================================

    const correctAnswers =
      results.filter(
        (result) =>
          result.isCorrect
      ).length;

    const wrongAnswers =
      results.filter(
        (result) =>
          !result.isCorrect
      ).length;

    const totalQuestions =
      questions.length;

    const answeredQuestions =
      results.filter(
        (result) =>
          normalizeAnswer(
            result.answer
          ).length > 0
      ).length;

    // =================================================
    // FINAL SCORE IN POINTS
    // =================================================
    //
    // IMPORTANT:
    //
    // result.score is ALREADY in points.
    //
    // CBT:
    //   correct = 10
    //   wrong   = 0
    //
    // Theory:
    //   100% = 10
    //   75%  = 7.5
    //   50%  = 5
    //   0%   = 0
    //
    // Therefore the final quiz score is simply
    // the sum of all question scores.
    // =================================================

    const score =
      Number(
        results
          .reduce(
            (sum, result) =>
              sum + result.score,
            0
          )
          .toFixed(2)
      );

    // =================================================
    // FINAL PERCENTAGE
    // =================================================
    //
    // Maximum possible points =
    //
    // totalQuestions × 10
    //
    // Example:
    //
    // 10 questions = 100 possible points
    // 5 questions = 50 possible points
    //
    // Percentage is ONLY a percentage representation
    // of the points. It does not replace the score.
    // =================================================

    const maximumScore =
      totalQuestions *
      POINTS_PER_QUESTION;

    const percentage =
      maximumScore > 0
        ? Number(
            (
              (score /
                maximumScore) *
              100
            ).toFixed(2)
          )
        : 0;

    // =================================================
    // FINAL RESULT
    // =================================================

    return {
      quizType,

      totalQuestions,

      answeredQuestions,

      correctAnswers,

      wrongAnswers,

      score,

      percentage,

      results,
    };
  },

  // ===================================================
  // LEGACY
  // ===================================================

  getDynamicQuestions:
    async (
      category: string,
      limit: number = 10
    ): Promise<any[]> => {
      return await db
        .select({
          id:
            questionsTable.id,

          courseId:
            questionsTable.courseId,

          type:
            questionsTable.type,

          question:
            questionsTable.question,

          options:
            questionsTable.options,

          difficulty:
            questionsTable.difficulty,
        })
        .from(questionsTable)
        .limit(limit);
    },
};