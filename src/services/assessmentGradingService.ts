import { eq, and, sql, desc, inArray } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  assessmentsTable,
  assessmentQuestionsTable,
  assessmentAttemptsTable,
  assessmentAnswersTable,
  assessmentGradesTable,
  assessmentQuestionGradesTable,
  assessmentGradingAuditLogsTable,
  offeringLecturersTable,
  usersTable,
  type QuestionSnapshot,
  type RubricScoreItem,
} from '../db/schema.js';
import { evaluateTheoryDeterministically } from './ai/theoryGrader.js';
import logger from '../config/logger.js';

export interface TheoryQuestionGradeInput {
  assessmentQuestionId: string;
  awardedMarks: number;
  rubricScores?: RubricScoreItem[];
  feedback?: string;
}

export const assessmentGradingService = {
  /**
   * Evaluates CBT questions for a submitted/timed-out attempt automatically, deterministically, and idempotently.
   */
  gradeCbtAttempt: async (attemptId: string) => {
    // 1. Fetch attempt
    const [attempt] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(eq(assessmentAttemptsTable.id, attemptId as any));

    if (!attempt) {
      throw new Error(`Attempt with ID ${attemptId} not found.`);
    }

    // 2. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, attempt.assessmentId as any));

    if (!assessment) {
      throw new Error(`Assessment ${attempt.assessmentId} not found.`);
    }

    // 3. Fetch questions with frozen snapshots
    const questions = await db
      .select({
        id: assessmentQuestionsTable.id,
        assessmentId: assessmentQuestionsTable.assessmentId,
        questionId: assessmentQuestionsTable.questionId,
        orderIndex: assessmentQuestionsTable.orderIndex,
        allocatedMarks: assessmentQuestionsTable.allocatedMarks,
        snapshot: assessmentQuestionsTable.snapshot,
      })
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessment.id as any))
      .orderBy(assessmentQuestionsTable.orderIndex);

    // 4. Fetch all student answers for this attempt
    const answers = await db
      .select()
      .from(assessmentAnswersTable)
      .where(eq(assessmentAnswersTable.attemptId, attemptId as any));

    const answerMap = new Map<string, (typeof answers)[0]>();
    for (const ans of answers) {
      answerMap.set(ans.assessmentQuestionId, ans);
    }

    // 5. Fetch existing question grades (to preserve manual theory evaluations)
    const existingQGrades = await db
      .select()
      .from(assessmentQuestionGradesTable)
      .where(eq(assessmentQuestionGradesTable.attemptId, attemptId as any));

    const existingQGradeMap = new Map<string, (typeof existingQGrades)[0]>();
    for (const eqg of existingQGrades) {
      existingQGradeMap.set(eqg.assessmentQuestionId, eqg);
    }

    let calculatedCbtScore = 0;
    let calculatedTheoryScore = 0;
    let hasTheoryQuestions = false;
    let pendingTheoryCount = 0;
    const now = new Date();

    for (const q of questions) {
      const snap: QuestionSnapshot | null = q.snapshot;
      const qType = (snap?.type || 'cbt').toLowerCase();
      const allocatedMarks = Number(q.allocatedMarks) || 1;
      const ansRec = answerMap.get(q.id);
      const studentAnsRaw = ansRec?.answer !== undefined && ansRec?.answer !== null ? String(ansRec.answer).trim() : '';

      const isTheory = qType === 'theory';

      if (isTheory) {
        hasTheoryQuestions = true;
        const existingGrade = existingQGradeMap.get(q.id);

        if (existingGrade && existingGrade.gradingMethod !== 'AUTO_CBT') {
          // Keep existing lecturer-evaluated score
          calculatedTheoryScore += Number(existingGrade.awardedMarks) || 0;
        } else {
          pendingTheoryCount++;
          // Ensure a record exists in question grades if not already present
          if (!existingGrade) {
            await db.insert(assessmentQuestionGradesTable).values({
              attemptId: attemptId as any,
              assessmentQuestionId: q.id as any,
              answerId: ansRec ? (ansRec.id as any) : null,
              studentId: attempt.studentId as any,
              questionType: 'theory',
              maxMarks: allocatedMarks,
              awardedMarks: 0,
              isCorrect: null,
              gradingMethod: 'MANUAL_RUBRIC',
              rubricScores: null,
              feedback: null,
              gradedBy: null,
              gradedAt: now,
              createdAt: now,
              updatedAt: now,
            });
          }
        }
      } else {
        // CBT Auto Evaluation
        const targetCorrect = (snap?.correctAnswer || '').trim();
        const isAnswered = studentAnsRaw.length > 0;
        // Deterministic comparison: case-insensitive normalized string match
        const isCorrect = isAnswered && studentAnsRaw.toLowerCase() === targetCorrect.toLowerCase();
        const awardedMarks = isCorrect ? allocatedMarks : 0;

        calculatedCbtScore += awardedMarks;

        const existingGrade = existingQGradeMap.get(q.id);
        if (existingGrade) {
          await db
            .update(assessmentQuestionGradesTable)
            .set({
              answerId: ansRec ? (ansRec.id as any) : null,
              questionType: qType,
              maxMarks: allocatedMarks,
              awardedMarks,
              isCorrect,
              gradingMethod: 'AUTO_CBT',
              gradedAt: now,
              updatedAt: now,
            })
            .where(eq(assessmentQuestionGradesTable.id, existingGrade.id));
        } else {
          await db.insert(assessmentQuestionGradesTable).values({
            attemptId: attemptId as any,
            assessmentQuestionId: q.id as any,
            answerId: ansRec ? (ansRec.id as any) : null,
            studentId: attempt.studentId as any,
            questionType: qType,
            maxMarks: allocatedMarks,
            awardedMarks,
            isCorrect,
            gradingMethod: 'AUTO_CBT',
            rubricScores: null,
            feedback: null,
            gradedBy: null,
            gradedAt: now,
            createdAt: now,
            updatedAt: now,
          });
        }
      }
    }

    // 6. Calculate total attempt grade
    const totalScore = calculatedCbtScore + calculatedTheoryScore;
    const maxPossibleScore =
      Number(assessment.totalMarks) > 0
        ? Number(assessment.totalMarks)
        : questions.reduce((sum, q) => sum + (Number(q.allocatedMarks) || 0), 0);

    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    const isPassing = assessment.passMarks !== null ? totalScore >= Number(assessment.passMarks) : null;

    let overallStatus: 'AUTO_GRADED' | 'NEEDS_THEORY_GRADING' | 'PARTIALLY_GRADED' | 'COMPLETED' = 'COMPLETED';
    if (hasTheoryQuestions) {
      if (pendingTheoryCount > 0 && pendingTheoryCount === questions.filter((q) => (q.snapshot?.type || '').toLowerCase() === 'theory').length) {
        overallStatus = 'NEEDS_THEORY_GRADING';
      } else if (pendingTheoryCount > 0) {
        overallStatus = 'PARTIALLY_GRADED';
      } else {
        overallStatus = 'COMPLETED';
      }
    } else {
      overallStatus = 'AUTO_GRADED';
    }

    // 7. Upsert assessment_grades record
    const [existingAttemptGrade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, attemptId as any));

    let savedGrade;
    if (existingAttemptGrade) {
      [savedGrade] = await db
        .update(assessmentGradesTable)
        .set({
          cbtScore: calculatedCbtScore,
          theoryScore: calculatedTheoryScore,
          totalScore,
          maxPossibleScore,
          percentage,
          isPassing,
          status: overallStatus,
          cbtGradedAt: now,
          finalGradedAt: overallStatus === 'COMPLETED' || overallStatus === 'AUTO_GRADED' ? now : null,
          updatedAt: now,
        })
        .where(eq(assessmentGradesTable.id, existingAttemptGrade.id))
        .returning();
    } else {
      [savedGrade] = await db
        .insert(assessmentGradesTable)
        .values({
          attemptId: attemptId as any,
          assessmentId: assessment.id as any,
          studentId: attempt.studentId as any,
          cbtScore: calculatedCbtScore,
          theoryScore: calculatedTheoryScore,
          totalScore,
          maxPossibleScore,
          percentage,
          isPassing,
          status: overallStatus,
          cbtGradedAt: now,
          finalGradedAt: overallStatus === 'COMPLETED' || overallStatus === 'AUTO_GRADED' ? now : null,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
    }

    // 8. Record audit log
    await db.insert(assessmentGradingAuditLogsTable).values({
      attemptId: attemptId as any,
      actorId: null,
      actorRole: 'SYSTEM',
      action: 'CBT_AUTO_GRADED',
      previousScore: existingAttemptGrade?.totalScore ?? null,
      newScore: totalScore,
      previousStatus: existingAttemptGrade?.status ?? null,
      newStatus: overallStatus,
      reason: 'Automatic deterministic CBT evaluation upon attempt completion',
      metadata: {
        cbtScore: calculatedCbtScore,
        theoryScore: calculatedTheoryScore,
        totalScore,
        hasTheoryQuestions,
        pendingTheoryCount,
      },
      createdAt: now,
    });

    logger.info(
      `[GRADING] Evaluated attempt ${attemptId} for assessment ${assessment.id}: totalScore=${totalScore}/${maxPossibleScore} (${overallStatus})`
    );

    return savedGrade;
  },

  /**
   * Manual rubric-based theory grading by an assigned lecturer.
   */
  gradeTheoryQuestions: async (
    lecturerId: string,
    assessmentId: string,
    attemptId: string,
    questionGrades: TheoryQuestionGradeInput[],
    reason?: string
  ) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // 2. Verify lecturer is actively assigned to this offering
    const [assignment] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    // 3. Fetch attempt
    const [attempt] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.id, attemptId as any),
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any)
        )
      );

    if (!attempt) {
      throw new Error('Assessment attempt not found.');
    }

    if (attempt.status !== 'SUBMITTED' && attempt.status !== 'TIMED_OUT') {
      throw new Error(`Attempt cannot be graded while in status ${attempt.status}.`);
    }

    // 4. Fetch questions and current question grades
    const questions = await db
      .select()
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any));

    const qMap = new Map<string, (typeof questions)[0]>();
    for (const q of questions) {
      qMap.set(q.id, q);
    }

    const answers = await db
      .select()
      .from(assessmentAnswersTable)
      .where(eq(assessmentAnswersTable.attemptId, attemptId as any));
    const ansMap = new Map<string, (typeof answers)[0]>();
    for (const ans of answers) {
      ansMap.set(ans.assessmentQuestionId, ans);
    }

    const existingQGrades = await db
      .select()
      .from(assessmentQuestionGradesTable)
      .where(eq(assessmentQuestionGradesTable.attemptId, attemptId as any));
    const gradeMap = new Map<string, (typeof existingQGrades)[0]>();
    for (const g of existingQGrades) {
      gradeMap.set(g.assessmentQuestionId, g);
    }

    const now = new Date();

    // 5. Validate and update each theory question
    for (const item of questionGrades) {
      const qRec = qMap.get(item.assessmentQuestionId);
      if (!qRec) {
        throw new Error(`Question ${item.assessmentQuestionId} does not belong to this assessment.`);
      }

      const snap: QuestionSnapshot | null = qRec.snapshot;
      const allocatedMarks = Number(qRec.allocatedMarks) || 1;
      const awarded = Number(item.awardedMarks);

      if (isNaN(awarded) || awarded < 0) {
        throw new Error(`Awarded marks must be a non-negative number for question ${item.assessmentQuestionId}.`);
      }
      if (awarded > allocatedMarks) {
        throw new Error(
          `Awarded marks (${awarded}) exceed maximum allocated marks (${allocatedMarks}) for question ${item.assessmentQuestionId}.`
        );
      }

      // Validate rubric breakdown if supplied
      if (item.rubricScores && Array.isArray(item.rubricScores)) {
        for (const r of item.rubricScores) {
          if (r.awardedWeight < 0 || r.awardedWeight > r.maxWeight) {
            throw new Error(`Rubric criterion "${r.concept}" awarded weight (${r.awardedWeight}) exceeds max (${r.maxWeight}).`);
          }
        }
      }

      const existing = gradeMap.get(item.assessmentQuestionId);
      const isReEvaluation = !!existing && existing.gradingMethod === 'MANUAL_RUBRIC' && existing.gradedBy !== null;
      const ansRec = ansMap.get(item.assessmentQuestionId);

      if (existing) {
        await db
          .update(assessmentQuestionGradesTable)
          .set({
            awardedMarks: awarded,
            isCorrect: awarded === allocatedMarks,
            gradingMethod: 'MANUAL_RUBRIC',
            rubricScores: item.rubricScores || existing.rubricScores || null,
            feedback: item.feedback !== undefined ? item.feedback : existing.feedback,
            gradedBy: lecturerId as any,
            gradedAt: now,
            updatedAt: now,
          })
          .where(eq(assessmentQuestionGradesTable.id, existing.id));
      } else {
        await db.insert(assessmentQuestionGradesTable).values({
          attemptId: attemptId as any,
          assessmentQuestionId: item.assessmentQuestionId as any,
          answerId: ansRec ? (ansRec.id as any) : null,
          studentId: attempt.studentId as any,
          questionType: (snap?.type || 'theory').toLowerCase(),
          maxMarks: allocatedMarks,
          awardedMarks: awarded,
          isCorrect: awarded === allocatedMarks,
          gradingMethod: 'MANUAL_RUBRIC',
          rubricScores: item.rubricScores || null,
          feedback: item.feedback || null,
          gradedBy: lecturerId as any,
          gradedAt: now,
          createdAt: now,
          updatedAt: now,
        });
      }

      // Log question-level audit
      await db.insert(assessmentGradingAuditLogsTable).values({
        attemptId: attemptId as any,
        assessmentQuestionId: item.assessmentQuestionId as any,
        actorId: lecturerId as any,
        actorRole: 'LECTURER',
        action: isReEvaluation ? 'RE_EVALUATED' : 'THEORY_GRADED',
        previousScore: existing?.awardedMarks ?? null,
        newScore: awarded,
        previousStatus: existing ? 'GRADED' : 'PENDING',
        newStatus: 'GRADED',
        reason: reason || (isReEvaluation ? 'Lecturer re-evaluation of theory marks' : 'Manual theory rubric scoring'),
        metadata: {
          rubricScores: item.rubricScores,
          feedback: item.feedback,
        },
        createdAt: now,
      });
    }

    // 6. Recalculate full attempt scores
    const allUpdatedQGrades = await db
      .select()
      .from(assessmentQuestionGradesTable)
      .where(eq(assessmentQuestionGradesTable.attemptId, attemptId as any));

    let totalCbt = 0;
    let totalTheory = 0;
    let pendingTheoryCount = 0;

    const theoryQuestions = questions.filter((q) => (q.snapshot?.type || '').toLowerCase() === 'theory');

    for (const ug of allUpdatedQGrades) {
      if (ug.questionType === 'theory') {
        if (ug.gradedBy !== null) {
          totalTheory += Number(ug.awardedMarks) || 0;
        } else {
          pendingTheoryCount++;
        }
      } else {
        totalCbt += Number(ug.awardedMarks) || 0;
      }
    }

    const totalScore = totalCbt + totalTheory;
    const maxPossibleScore =
      Number(assessment.totalMarks) > 0
        ? Number(assessment.totalMarks)
        : questions.reduce((sum, q) => sum + (Number(q.allocatedMarks) || 0), 0);

    const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
    const isPassing = assessment.passMarks !== null ? totalScore >= Number(assessment.passMarks) : null;

    let overallStatus: 'NEEDS_THEORY_GRADING' | 'PARTIALLY_GRADED' | 'COMPLETED' = 'COMPLETED';
    if (theoryQuestions.length > 0) {
      const gradedTheoryCount = allUpdatedQGrades.filter(
        (g) => g.questionType === 'theory' && g.gradedBy !== null
      ).length;

      if (gradedTheoryCount === 0) {
        overallStatus = 'NEEDS_THEORY_GRADING';
      } else if (gradedTheoryCount < theoryQuestions.length) {
        overallStatus = 'PARTIALLY_GRADED';
      } else {
        overallStatus = 'COMPLETED';
      }
    }

    const [existingAttemptGrade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, attemptId as any));

    let updatedAttemptGrade;
    if (existingAttemptGrade) {
      [updatedAttemptGrade] = await db
        .update(assessmentGradesTable)
        .set({
          cbtScore: totalCbt,
          theoryScore: totalTheory,
          totalScore,
          maxPossibleScore,
          percentage,
          isPassing,
          status: overallStatus,
          theoryGradedAt: now,
          finalGradedAt: overallStatus === 'COMPLETED' ? now : null,
          gradedBy: lecturerId as any,
          updatedAt: now,
        })
        .where(eq(assessmentGradesTable.id, existingAttemptGrade.id))
        .returning();
    } else {
      [updatedAttemptGrade] = await db
        .insert(assessmentGradesTable)
        .values({
          attemptId: attemptId as any,
          assessmentId: assessment.id as any,
          studentId: attempt.studentId as any,
          cbtScore: totalCbt,
          theoryScore: totalTheory,
          totalScore,
          maxPossibleScore,
          percentage,
          isPassing,
          status: overallStatus,
          theoryGradedAt: now,
          finalGradedAt: overallStatus === 'COMPLETED' ? now : null,
          gradedBy: lecturerId as any,
          createdAt: now,
          updatedAt: now,
        })
        .returning();
    }

    return {
      success: true,
      grade: updatedAttemptGrade,
      questionGrades: allUpdatedQGrades,
    };
  },

  /**
   * Generates a non-authoritative AI suggestion for a theory response.
   * STRICT: Does not write to DB or bypass lecturer review.
   */
  getAiTheorySuggestion: async (
    lecturerId: string,
    assessmentId: string,
    attemptId: string,
    assessmentQuestionId: string
  ) => {
    // Verify lecturer authorization
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) throw new Error('Assessment not found.');

    const [assignment] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    const [aq] = await db
      .select()
      .from(assessmentQuestionsTable)
      .where(
        and(
          eq(assessmentQuestionsTable.id, assessmentQuestionId as any),
          eq(assessmentQuestionsTable.assessmentId, assessmentId as any)
        )
      );

    if (!aq) throw new Error('Question not found in this assessment.');

    const snap: QuestionSnapshot | null = aq.snapshot;
    const allocatedMarks = Number(aq.allocatedMarks) || 1;

    const [ans] = await db
      .select()
      .from(assessmentAnswersTable)
      .where(
        and(
          eq(assessmentAnswersTable.attemptId, attemptId as any),
          eq(assessmentAnswersTable.assessmentQuestionId, assessmentQuestionId as any)
        )
      );

    const studentAnswer = (ans?.answer || '').trim();

    const evaluation = evaluateTheoryDeterministically({
      questionText: snap?.question,
      studentAnswer,
      correctAnswer: snap?.correctAnswer,
      maxScore: allocatedMarks,
      gradingPoints: snap?.gradingPoints || [],
    });

    return {
      isAiSuggestion: true,
      authoritative: false,
      allocatedMarks,
      suggestedScore: evaluation.score,
      matchedConcepts: evaluation.matchedConcepts,
      missingConcepts: evaluation.missingConcepts,
      suggestedFeedback: evaluation.feedback,
      gradingNotes: evaluation.gradingNotes,
    };
  },

  /**
   * Retrieves full grading desk overview for an assessment (for assigned lecturers).
   */
  getLecturerGradingOverview: async (lecturerId: string, assessmentId: string) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        title: assessmentsTable.title,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        startTime: assessmentsTable.startTime,
        endTime: assessmentsTable.endTime,
      })
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) throw new Error('Assessment not found.');

    // 2. Verify lecturer assigned
    const [assignment] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    // 3. Fetch all completed attempts
    const attempts = await db
      .select({
        id: assessmentAttemptsTable.id,
        studentId: assessmentAttemptsTable.studentId,
        attemptNumber: assessmentAttemptsTable.attemptNumber,
        status: assessmentAttemptsTable.status,
        startedAt: assessmentAttemptsTable.startedAt,
        submittedAt: assessmentAttemptsTable.submittedAt,
        expiresAt: assessmentAttemptsTable.expiresAt,
        isLate: assessmentAttemptsTable.isLate,
        studentFullName: usersTable.fullName,
        studentEmail: usersTable.email,
        studentUsername: usersTable.username,
      })
      .from(assessmentAttemptsTable)
      .innerJoin(usersTable, eq(assessmentAttemptsTable.studentId, usersTable.id))
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          inArray(assessmentAttemptsTable.status, ['SUBMITTED', 'TIMED_OUT'])
        )
      )
      .orderBy(desc(assessmentAttemptsTable.submittedAt));

    // 4. Fetch grades
    const grades = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.assessmentId, assessmentId as any));

    const gradeMap = new Map<string, (typeof grades)[0]>();
    for (const g of grades) {
      gradeMap.set(g.attemptId, g);
    }

    let totalSubmitted = attempts.length;
    let autoGradedCount = 0;
    let needsTheoryCount = 0;
    let partiallyGradedCount = 0;
    let completedCount = 0;
    let scoreSum = 0;
    let scoredAttemptsCount = 0;

    const roster = attempts.map((att) => {
      const g = gradeMap.get(att.id);
      const gStatus = g?.status || 'PENDING_GRADING';

      if (gStatus === 'AUTO_GRADED') autoGradedCount++;
      else if (gStatus === 'NEEDS_THEORY_GRADING') needsTheoryCount++;
      else if (gStatus === 'PARTIALLY_GRADED') partiallyGradedCount++;
      else if (gStatus === 'COMPLETED') {
        completedCount++;
        scoreSum += Number(g?.totalScore || 0);
        scoredAttemptsCount++;
      }

      return {
        attemptId: att.id,
        attemptNumber: att.attemptNumber,
        status: att.status,
        startedAt: att.startedAt,
        submittedAt: att.submittedAt,
        isLate: att.isLate,
        student: {
          id: att.studentId,
          fullName: att.studentFullName,
          email: att.studentEmail,
          username: att.studentUsername,
        },
        grade: g
          ? {
              id: g.id,
              cbtScore: g.cbtScore,
              theoryScore: g.theoryScore,
              totalScore: g.totalScore,
              maxPossibleScore: g.maxPossibleScore,
              percentage: g.percentage,
              isPassing: g.isPassing,
              status: g.status,
              cbtGradedAt: g.cbtGradedAt,
              theoryGradedAt: g.theoryGradedAt,
              finalGradedAt: g.finalGradedAt,
            }
          : null,
      };
    });

    const averageScore = scoredAttemptsCount > 0 ? Number((scoreSum / scoredAttemptsCount).toFixed(2)) : null;

    return {
      assessment,
      stats: {
        totalSubmitted,
        autoGradedCount,
        needsTheoryCount,
        partiallyGradedCount,
        completedCount,
        averageScore,
      },
      roster,
    };
  },

  /**
   * Retrieves single attempt grading detail desk (for assigned lecturers).
   */
  getAttemptGradingDetail: async (
    lecturerId: string,
    assessmentId: string,
    attemptId: string
  ) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) throw new Error('Assessment not found.');

    // 2. Verify lecturer assigned
    const [assignment] = await db
      .select()
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    // 3. Fetch attempt and student info
    const [attempt] = await db
      .select({
        id: assessmentAttemptsTable.id,
        assessmentId: assessmentAttemptsTable.assessmentId,
        studentId: assessmentAttemptsTable.studentId,
        attemptNumber: assessmentAttemptsTable.attemptNumber,
        status: assessmentAttemptsTable.status,
        startedAt: assessmentAttemptsTable.startedAt,
        submittedAt: assessmentAttemptsTable.submittedAt,
        expiresAt: assessmentAttemptsTable.expiresAt,
        isLate: assessmentAttemptsTable.isLate,
        studentFullName: usersTable.fullName,
        studentEmail: usersTable.email,
        studentUsername: usersTable.username,
      })
      .from(assessmentAttemptsTable)
      .innerJoin(usersTable, eq(assessmentAttemptsTable.studentId, usersTable.id))
      .where(
        and(
          eq(assessmentAttemptsTable.id, attemptId as any),
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any)
        )
      );

    if (!attempt) throw new Error('Attempt not found.');

    // 4. Fetch questions
    const questions = await db
      .select()
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any))
      .orderBy(assessmentQuestionsTable.orderIndex);

    // 5. Fetch answers
    const answers = await db
      .select()
      .from(assessmentAnswersTable)
      .where(eq(assessmentAnswersTable.attemptId, attemptId as any));
    const ansMap = new Map<string, (typeof answers)[0]>();
    for (const ans of answers) {
      ansMap.set(ans.assessmentQuestionId, ans);
    }

    // 6. Fetch existing question grades
    const qGrades = await db
      .select()
      .from(assessmentQuestionGradesTable)
      .where(eq(assessmentQuestionGradesTable.attemptId, attemptId as any));
    const qGradeMap = new Map<string, (typeof qGrades)[0]>();
    for (const g of qGrades) {
      qGradeMap.set(g.assessmentQuestionId, g);
    }

    // 7. Fetch attempt grade
    const [attemptGrade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, attemptId as any));

    // 8. Fetch grading audit logs for this attempt
    const auditLogs = await db
      .select({
        id: assessmentGradingAuditLogsTable.id,
        actorId: assessmentGradingAuditLogsTable.actorId,
        actorRole: assessmentGradingAuditLogsTable.actorRole,
        action: assessmentGradingAuditLogsTable.action,
        previousScore: assessmentGradingAuditLogsTable.previousScore,
        newScore: assessmentGradingAuditLogsTable.newScore,
        reason: assessmentGradingAuditLogsTable.reason,
        createdAt: assessmentGradingAuditLogsTable.createdAt,
        actorFullName: usersTable.fullName,
      })
      .from(assessmentGradingAuditLogsTable)
      .leftJoin(usersTable, eq(assessmentGradingAuditLogsTable.actorId, usersTable.id))
      .where(eq(assessmentGradingAuditLogsTable.attemptId, attemptId as any))
      .orderBy(desc(assessmentGradingAuditLogsTable.createdAt));

    const questionsDetail = questions.map((q) => {
      const snap: QuestionSnapshot | null = q.snapshot;
      const ans = ansMap.get(q.id);
      const grade = qGradeMap.get(q.id);

      return {
        assessmentQuestionId: q.id,
        questionId: q.questionId,
        orderIndex: q.orderIndex,
        allocatedMarks: q.allocatedMarks,
        type: snap?.type || 'cbt',
        question: snap?.question || '',
        options: snap?.options || [],
        correctAnswer: snap?.correctAnswer || '',
        explanation: snap?.explanation || null,
        gradingPoints: snap?.gradingPoints || [],
        studentAnswer: ans?.answer || null,
        savedAt: ans?.savedAt || null,
        grade: grade
          ? {
              id: grade.id,
              maxMarks: grade.maxMarks,
              awardedMarks: grade.awardedMarks,
              isCorrect: grade.isCorrect,
              gradingMethod: grade.gradingMethod,
              rubricScores: grade.rubricScores,
              feedback: grade.feedback,
              gradedBy: grade.gradedBy,
              gradedAt: grade.gradedAt,
            }
          : null,
      };
    });

    return {
      assessment: {
        id: assessment.id,
        title: assessment.title,
        type: assessment.type,
        totalMarks: assessment.totalMarks,
        passMarks: assessment.passMarks,
      },
      attempt: {
        id: attempt.id,
        attemptNumber: attempt.attemptNumber,
        status: attempt.status,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        isLate: attempt.isLate,
        student: {
          id: attempt.studentId,
          fullName: attempt.studentFullName,
          email: attempt.studentEmail,
          username: attempt.studentUsername,
        },
      },
      grade: attemptGrade || null,
      questions: questionsDetail,
      auditLogs,
    };
  },

  /**
   * Retrieves grading oversight for administrators.
   */
  getAdminGradingOversight: async (assessmentId: string) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) throw new Error('Assessment not found.');

    // 2. Fetch all attempts
    const attempts = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(eq(assessmentAttemptsTable.assessmentId, assessmentId as any));

    // 3. Fetch all grades
    const grades = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.assessmentId, assessmentId as any));

    const gradeMap = new Map<string, (typeof grades)[0]>();
    for (const g of grades) {
      gradeMap.set(g.attemptId, g);
    }

    let submittedCount = 0;
    let autoGradedCount = 0;
    let needsTheoryCount = 0;
    let partiallyGradedCount = 0;
    let completedCount = 0;
    let failedCount = 0;

    for (const att of attempts) {
      if (att.status === 'SUBMITTED' || att.status === 'TIMED_OUT') {
        submittedCount++;
        const g = gradeMap.get(att.id);
        const status = g?.status || 'PENDING_GRADING';
        if (status === 'AUTO_GRADED') autoGradedCount++;
        else if (status === 'NEEDS_THEORY_GRADING') needsTheoryCount++;
        else if (status === 'PARTIALLY_GRADED') partiallyGradedCount++;
        else if (status === 'COMPLETED') completedCount++;
        else if (status === 'FAILED') failedCount++;
      }
    }

    // 4. Fetch recent grading audit logs
    const auditLogs = await db
      .select({
        id: assessmentGradingAuditLogsTable.id,
        attemptId: assessmentGradingAuditLogsTable.attemptId,
        actorId: assessmentGradingAuditLogsTable.actorId,
        actorRole: assessmentGradingAuditLogsTable.actorRole,
        action: assessmentGradingAuditLogsTable.action,
        previousScore: assessmentGradingAuditLogsTable.previousScore,
        newScore: assessmentGradingAuditLogsTable.newScore,
        reason: assessmentGradingAuditLogsTable.reason,
        createdAt: assessmentGradingAuditLogsTable.createdAt,
        actorFullName: usersTable.fullName,
      })
      .from(assessmentGradingAuditLogsTable)
      .leftJoin(usersTable, eq(assessmentGradingAuditLogsTable.actorId, usersTable.id))
      .innerJoin(
        assessmentAttemptsTable,
        eq(assessmentGradingAuditLogsTable.attemptId, assessmentAttemptsTable.id)
      )
      .where(eq(assessmentAttemptsTable.assessmentId, assessmentId as any))
      .orderBy(desc(assessmentGradingAuditLogsTable.createdAt))
      .limit(50);

    return {
      assessment: {
        id: assessment.id,
        title: assessment.title,
        type: assessment.type,
        status: assessment.status,
        totalMarks: assessment.totalMarks,
        passMarks: assessment.passMarks,
        startTime: assessment.startTime,
        endTime: assessment.endTime,
      },
      stats: {
        totalAttempts: attempts.length,
        submittedCount,
        autoGradedCount,
        needsTheoryCount,
        partiallyGradedCount,
        completedCount,
        failedCount,
      },
      auditLogs,
    };
  },
};

