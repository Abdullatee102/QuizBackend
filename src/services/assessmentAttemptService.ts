import { eq, and, or, desc, asc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  assessmentsTable,
  assessmentQuestionsTable,
  assessmentAttemptsTable,
  assessmentAnswersTable,
  assessmentAttemptEventsTable,
  studentEnrollmentsTable,
  courseOfferingsTable,
  coursesTable,
  usersTable,
  offeringLecturersTable,
  type QuestionSnapshot,
} from '../db/schema.js';
import { eligibilityService } from './eligibilityService.js';
import { socketService } from '../socket/index.js';
import logger from '../config/logger.js';

export interface AnswerItemInput {
  assessmentQuestionId: string;
  questionId: string;
  answer?: string | null;
  clientVersion?: number;
  isFlagged?: boolean;
}

export const assessmentAttemptService = {
  /**
   * Helper: Automatically mark expired IN_PROGRESS attempts as TIMED_OUT.
   */
  finalizeExpiredAttempts: async (assessmentId?: string) => {
    try {
      const now = new Date();
      // Add 15 seconds grace period for network latency
      const cutoff = new Date(now.getTime() - 15000);

      const conditions = [
        eq(assessmentAttemptsTable.status, 'IN_PROGRESS'),
        sql`${assessmentAttemptsTable.expiresAt} < ${cutoff}`,
      ];

      if (assessmentId) {
        conditions.push(eq(assessmentAttemptsTable.assessmentId, assessmentId as any));
      }

      const expiredAttempts = await db
        .select({
          id: assessmentAttemptsTable.id,
          assessmentId: assessmentAttemptsTable.assessmentId,
          studentId: assessmentAttemptsTable.studentId,
        })
        .from(assessmentAttemptsTable)
        .where(and(...conditions));

      if (expiredAttempts.length === 0) return 0;

      for (const att of expiredAttempts) {
        await db
          .update(assessmentAttemptsTable)
          .set({
            status: 'TIMED_OUT',
            updatedAt: now,
          })
          .where(eq(assessmentAttemptsTable.id, att.id));

        await db.insert(assessmentAttemptEventsTable).values({
          attemptId: att.id,
          eventType: 'ATTEMPT_TIMED_OUT',
          eventData: { reason: 'Server-authoritative timer expired' },
          serverTimestamp: now,
        });

        // Notify live monitoring room
        try {
          socketService.emitToRoom(`assessment:${att.assessmentId}:monitor`, 'assessment:attempt:update', {
            type: 'ATTEMPT_TIMED_OUT',
            attemptId: att.id,
            studentId: att.studentId,
            status: 'TIMED_OUT',
            timestamp: now.toISOString(),
          });
        } catch (sockErr) {}
      }

      logger.info(`[ASSESSMENT] Finalized ${expiredAttempts.length} expired attempt(s) to TIMED_OUT.`);
      return expiredAttempts.length;
    } catch (err: any) {
      logger.error(`[ASSESSMENT] Error finalizing expired attempts: ${err.message}`);
      return 0;
    }
  },

  /**
   * Discovers all published assessments across offerings in which the student is enrolled.
   */
  getAvailableAssessmentsForStudent: async (studentId: string) => {
    await assessmentAttemptService.finalizeExpiredAttempts();

    // 1. Get student active enrollments
    const enrollments = await db
      .select({
        offeringId: studentEnrollmentsTable.offeringId,
      })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, studentId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      );

    if (enrollments.length === 0) {
      return [];
    }

    const offeringIds = enrollments.map((e) => e.offeringId);

    // 2. Fetch PUBLISHED assessments for these offerings
    const assessments = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        title: assessmentsTable.title,
        description: assessmentsTable.description,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        durationMinutes: assessmentsTable.durationMinutes,
        startTime: assessmentsTable.startTime,
        endTime: assessmentsTable.endTime,
        maxAttempts: assessmentsTable.maxAttempts,
        isRandomized: assessmentsTable.isRandomized,
        allowLateSubmission: assessmentsTable.allowLateSubmission,
        lateSubmissionDeadline: assessmentsTable.lateSubmissionDeadline,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .where(
        and(
          inArray(assessmentsTable.offeringId, offeringIds as any[]),
          eq(assessmentsTable.status, 'PUBLISHED')
        )
      )
      .orderBy(asc(assessmentsTable.startTime));

    // 3. For each assessment, fetch attempt summary for this student
    const now = Date.now();
    const results = [];

    for (const a of assessments) {
      const startMs = new Date(a.startTime).getTime();
      const endMs = new Date(a.endTime).getTime();
      const lateDeadlineMs = a.allowLateSubmission && a.lateSubmissionDeadline
        ? new Date(a.lateSubmissionDeadline).getTime()
        : endMs;

      let operationalStatus: 'SCHEDULED' | 'OPEN' | 'CLOSED' = 'SCHEDULED';
      if (now < startMs) {
        operationalStatus = 'SCHEDULED';
      } else if (now >= startMs && now <= lateDeadlineMs) {
        operationalStatus = 'OPEN';
      } else {
        operationalStatus = 'CLOSED';
      }

      // Query student attempts
      const studentAttempts = await db
        .select({
          id: assessmentAttemptsTable.id,
          attemptNumber: assessmentAttemptsTable.attemptNumber,
          status: assessmentAttemptsTable.status,
          startedAt: assessmentAttemptsTable.startedAt,
          submittedAt: assessmentAttemptsTable.submittedAt,
          expiresAt: assessmentAttemptsTable.expiresAt,
        })
        .from(assessmentAttemptsTable)
        .where(
          and(
            eq(assessmentAttemptsTable.assessmentId, a.id as any),
            eq(assessmentAttemptsTable.studentId, studentId as any)
          )
        )
        .orderBy(desc(assessmentAttemptsTable.attemptNumber));

      const attemptsCount = studentAttempts.length;
      const activeAttempt = studentAttempts.find((att) => att.status === 'IN_PROGRESS');

      const canStart = operationalStatus === 'OPEN' && attemptsCount < a.maxAttempts && !activeAttempt;
      const canResume = !!activeAttempt;

      results.push({
        ...a,
        operationalStatus,
        attemptsCount,
        maxAttempts: a.maxAttempts,
        canStart,
        canResume,
        activeAttemptId: activeAttempt ? activeAttempt.id : null,
        activeAttemptExpiresAt: activeAttempt ? activeAttempt.expiresAt : null,
        attempts: studentAttempts,
      });
    }

    return results;
  },

  /**
   * Retrieves instructions and metadata for an assessment for an enrolled student.
   */
  getAssessmentInstructions: async (studentId: string, assessmentId: string) => {
    await assessmentAttemptService.finalizeExpiredAttempts(assessmentId);

    const [assessment] = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        title: assessmentsTable.title,
        description: assessmentsTable.description,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        durationMinutes: assessmentsTable.durationMinutes,
        startTime: assessmentsTable.startTime,
        endTime: assessmentsTable.endTime,
        maxAttempts: assessmentsTable.maxAttempts,
        isRandomized: assessmentsTable.isRandomized,
        allowLateSubmission: assessmentsTable.allowLateSubmission,
        lateSubmissionDeadline: assessmentsTable.lateSubmissionDeadline,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    if (assessment.status !== 'PUBLISHED') {
      throw new Error('Assessment is not currently published.');
    }

    // Verify eligibility
    const eligibility = await eligibilityService.checkStudentEligibility(studentId, assessment.offeringId);
    if (!eligibility.isEligible) {
      throw new Error(`Forbidden. ${eligibility.message}`);
    }

    // Count questions
    const [qCount] = await db
      .select({
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any));

    // Get attempts by student
    const studentAttempts = await db
      .select({
        id: assessmentAttemptsTable.id,
        attemptNumber: assessmentAttemptsTable.attemptNumber,
        status: assessmentAttemptsTable.status,
        startedAt: assessmentAttemptsTable.startedAt,
        submittedAt: assessmentAttemptsTable.submittedAt,
        expiresAt: assessmentAttemptsTable.expiresAt,
      })
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any)
        )
      )
      .orderBy(desc(assessmentAttemptsTable.attemptNumber));

    const now = Date.now();
    const startMs = new Date(assessment.startTime).getTime();
    const endMs = new Date(assessment.endTime).getTime();
    const lateDeadlineMs = assessment.allowLateSubmission && assessment.lateSubmissionDeadline
      ? new Date(assessment.lateSubmissionDeadline).getTime()
      : endMs;

    let operationalStatus: 'SCHEDULED' | 'OPEN' | 'CLOSED' = 'SCHEDULED';
    if (now < startMs) {
      operationalStatus = 'SCHEDULED';
    } else if (now >= startMs && now <= lateDeadlineMs) {
      operationalStatus = 'OPEN';
    } else {
      operationalStatus = 'CLOSED';
    }

    const attemptsCount = studentAttempts.length;
    const activeAttempt = studentAttempts.find((att) => att.status === 'IN_PROGRESS');

    const canStart = operationalStatus === 'OPEN' && attemptsCount < assessment.maxAttempts && !activeAttempt;
    const canResume = !!activeAttempt;

    return {
      assessment: {
        ...assessment,
        questionCount: qCount?.count || 0,
        operationalStatus,
        attemptsCount,
        canStart,
        canResume,
        activeAttemptId: activeAttempt ? activeAttempt.id : null,
        activeAttemptExpiresAt: activeAttempt ? activeAttempt.expiresAt : null,
        attempts: studentAttempts,
      },
    };
  },

  /**
   * Initializes or securely resumes an assessment attempt for an enrolled student.
   */
  startOrResumeAttempt: async (
    studentId: string,
    assessmentId: string,
    clientMeta: { clientIp?: string | undefined; userAgent?: string | undefined } = {}
  ) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    if (assessment.status !== 'PUBLISHED') {
      throw new Error('Assessment is not currently open for examination.');
    }

    // 2. Enforce student eligibility
    const eligibility = await eligibilityService.checkStudentEligibility(studentId, assessment.offeringId);
    if (!eligibility.isEligible) {
      throw new Error(`Forbidden. ${eligibility.message}`);
    }

    const nowMs = Date.now();
    const startMs = new Date(assessment.startTime).getTime();
    const endMs = new Date(assessment.endTime).getTime();
    const lateDeadlineMs = assessment.allowLateSubmission && assessment.lateSubmissionDeadline
      ? new Date(assessment.lateSubmissionDeadline).getTime()
      : endMs;

    // 3. Check for existing active attempt (resume scenario)
    const existingActiveAttempts = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any),
          eq(assessmentAttemptsTable.status, 'IN_PROGRESS')
        )
      )
      .limit(1);

    const activeAttempt = existingActiveAttempts[0];

    if (activeAttempt) {
      const expiryMs = new Date(activeAttempt.expiresAt).getTime();
      if (nowMs > expiryMs) {
        // Expired -> finalize to TIMED_OUT
        await db
          .update(assessmentAttemptsTable)
          .set({
            status: 'TIMED_OUT',
            updatedAt: new Date(),
          })
          .where(eq(assessmentAttemptsTable.id, activeAttempt.id));

        await db.insert(assessmentAttemptEventsTable).values({
          attemptId: activeAttempt.id,
          eventType: 'ATTEMPT_TIMED_OUT',
          eventData: { reason: 'Expired on resume check' },
          serverTimestamp: new Date(),
        });
      } else {
        // Resuming active valid attempt!
        const attemptQuestions = await assessmentAttemptService.getAttemptQuestions(assessmentId, activeAttempt.id);
        const savedAnswers = await assessmentAttemptService.getAttemptSavedAnswers(activeAttempt.id);

        await db
          .update(assessmentAttemptsTable)
          .set({
            lastHeartbeatAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(assessmentAttemptsTable.id, activeAttempt.id));

        await db.insert(assessmentAttemptEventsTable).values({
          attemptId: activeAttempt.id,
          eventType: 'HEARTBEAT',
          eventData: { action: 'Attempt resumed / reconnected' },
          serverTimestamp: new Date(),
        });

        const remainingSeconds = Math.max(0, Math.floor((expiryMs - nowMs) / 1000));

        return {
          attempt: {
            id: activeAttempt.id,
            attemptNumber: activeAttempt.attemptNumber,
            status: activeAttempt.status,
            startedAt: activeAttempt.startedAt,
            expiresAt: activeAttempt.expiresAt,
            remainingSeconds,
            serverTime: new Date().toISOString(),
            durationMinutes: assessment.durationMinutes,
            isResumed: true,
          },
          questions: attemptQuestions,
          savedAnswers,
        };
      }
    }

    // 4. Starting a new attempt: Check assessment schedule
    if (nowMs < startMs) {
      throw new Error('Assessment has not started yet.');
    }
    if (nowMs > lateDeadlineMs) {
      throw new Error('Assessment examination window has closed.');
    }

    // 5. Check attempt count
    const [attemptCountRecord] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any)
        )
      );

    const totalAttemptsSoFar = attemptCountRecord?.count || 0;
    if (totalAttemptsSoFar >= assessment.maxAttempts) {
      throw new Error(`Maximum attempt limit (${assessment.maxAttempts}) reached for this assessment.`);
    }

    const nextAttemptNumber = totalAttemptsSoFar + 1;

    // 6. Calculate server-authoritative expiresAt
    const durationMs = assessment.durationMinutes * 60 * 1000;
    const windowCap = lateDeadlineMs;
    const calculatedExpiryMs = Math.min(nowMs + durationMs, windowCap);
    const expiresAt = new Date(calculatedExpiryMs);
    const isLate = nowMs > endMs;

    // 7. Insert new attempt atomically
    const [newAttempt] = await db
      .insert(assessmentAttemptsTable)
      .values({
        assessmentId: assessmentId as any,
        studentId: studentId as any,
        attemptNumber: nextAttemptNumber,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        expiresAt,
        lastHeartbeatAt: new Date(),
        isLate,
        clientIp: clientMeta.clientIp || null,
        userAgent: clientMeta.userAgent || null,
      })
      .returning();

    if (!newAttempt) {
      throw new Error('Failed to create assessment attempt.');
    }

    // 8. Log attempt event
    await db.insert(assessmentAttemptEventsTable).values({
      attemptId: newAttempt.id,
      eventType: 'ATTEMPT_STARTED',
      eventData: {
        attemptNumber: nextAttemptNumber,
        expiresAt: expiresAt.toISOString(),
        isLate,
      },
      serverTimestamp: new Date(),
    });

    // 9. Emit real-time monitoring update to lecturer room
    try {
      socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
        type: 'ATTEMPT_STARTED',
        attemptId: newAttempt.id,
        studentId,
        attemptNumber: nextAttemptNumber,
        status: 'IN_PROGRESS',
        startedAt: newAttempt.startedAt,
        expiresAt: newAttempt.expiresAt,
      });
    } catch (sockErr) {}

    // 10. Fetch questions
    const attemptQuestions = await assessmentAttemptService.getAttemptQuestions(assessmentId, newAttempt.id);

    const remainingSeconds = Math.max(0, Math.floor((calculatedExpiryMs - nowMs) / 1000));

    return {
      attempt: {
        id: newAttempt.id,
        attemptNumber: newAttempt.attemptNumber,
        status: newAttempt.status,
        startedAt: newAttempt.startedAt,
        expiresAt: newAttempt.expiresAt,
        remainingSeconds,
        serverTime: new Date().toISOString(),
        durationMinutes: assessment.durationMinutes,
        isResumed: false,
      },
      questions: attemptQuestions,
      savedAnswers: {},
    };
  },

  /**
   * Helper: fetches questions from immutable snapshots with answer keys strictly redacted.
   */
  getAttemptQuestions: async (assessmentId: string, attemptId: string) => {
    const rawQuestions = await db
      .select({
        assessmentQuestionId: assessmentQuestionsTable.id,
        questionId: assessmentQuestionsTable.questionId,
        orderIndex: assessmentQuestionsTable.orderIndex,
        allocatedMarks: assessmentQuestionsTable.allocatedMarks,
        snapshot: assessmentQuestionsTable.snapshot,
      })
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any))
      .orderBy(assessmentQuestionsTable.orderIndex);

    return rawQuestions.map((q) => {
      const snap: QuestionSnapshot | null = q.snapshot;
      return {
        assessmentQuestionId: q.assessmentQuestionId,
        questionId: q.questionId,
        orderIndex: q.orderIndex,
        allocatedMarks: q.allocatedMarks,
        type: snap?.type || 'cbt',
        question: snap?.question || '',
        options: snap?.options || [],
        imageUrl: snap?.imageUrl || null,
        // STRICT SECURITY: Do NOT expose correctAnswer, gradingPoints, explanation!
      };
    });
  },

  /**
   * Helper: fetches currently saved answers for an attempt.
   */
  getAttemptSavedAnswers: async (attemptId: string) => {
    const answers = await db
      .select({
        assessmentQuestionId: assessmentAnswersTable.assessmentQuestionId,
        questionId: assessmentAnswersTable.questionId,
        answer: assessmentAnswersTable.answer,
        isFlagged: assessmentAnswersTable.isFlagged,
        clientVersion: assessmentAnswersTable.clientVersion,
        savedAt: assessmentAnswersTable.savedAt,
      })
      .from(assessmentAnswersTable)
      .where(eq(assessmentAnswersTable.attemptId, attemptId as any));

    const map: Record<string, { answer: string | null; isFlagged: boolean; clientVersion: number }> = {};
    for (const a of answers) {
      map[a.assessmentQuestionId] = {
        answer: a.answer,
        isFlagged: a.isFlagged,
        clientVersion: a.clientVersion,
      };
    }
    return map;
  },

  /**
   * Saves student answers durably with version checks, expiry checks, and autosave broadcast.
   */
  saveAnswers: async (
    studentId: string,
    assessmentId: string,
    attemptId: string,
    answers: AnswerItemInput[]
  ) => {
    // 1. Fetch attempt
    const [attempt] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.id, attemptId as any),
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any)
        )
      );

    if (!attempt) {
      throw new Error('Assessment attempt not found or does not belong to you.');
    }

    // 2. Validate attempt status
    if (attempt.status === 'SUBMITTED') {
      throw new Error('Attempt is already submitted. Answer updates are not permitted.');
    }
    if (attempt.status === 'TIMED_OUT') {
      throw new Error('Attempt has timed out. Answer updates are not permitted.');
    }
    if (attempt.status !== 'IN_PROGRESS') {
      throw new Error(`Attempt is ${attempt.status}. Answer updates are not permitted.`);
    }

    // 3. Enforce server-authoritative timer with 15s grace period
    const now = new Date();
    const expiryMs = new Date(attempt.expiresAt).getTime();
    const graceWindowMs = 15000;

    if (now.getTime() > expiryMs + graceWindowMs) {
      // Mark as TIMED_OUT
      await db
        .update(assessmentAttemptsTable)
        .set({ status: 'TIMED_OUT', updatedAt: now })
        .where(eq(assessmentAttemptsTable.id, attempt.id));

      await db.insert(assessmentAttemptEventsTable).values({
        attemptId: attempt.id,
        eventType: 'ATTEMPT_TIMED_OUT',
        eventData: { reason: 'Answer update attempted after expiry' },
        serverTimestamp: now,
      });

      try {
        socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
          type: 'ATTEMPT_TIMED_OUT',
          attemptId: attempt.id,
          studentId,
          status: 'TIMED_OUT',
          timestamp: now.toISOString(),
        });
      } catch (e) {}

      throw new Error('Assessment deadline has expired. Your attempt has been finalized as timed out.');
    }

    // 4. Upsert each answer in batch
    for (const item of answers) {
      const clientVer = item.clientVersion || 1;
      const isFlagged = item.isFlagged ?? false;
      const cleanAnswer = item.answer !== undefined ? item.answer : null;

      const [existing] = await db
        .select()
        .from(assessmentAnswersTable)
        .where(
          and(
            eq(assessmentAnswersTable.attemptId, attemptId as any),
            eq(assessmentAnswersTable.assessmentQuestionId, item.assessmentQuestionId as any)
          )
        );

      if (existing) {
        // Enforce version check (reject stale out-of-order writes)
        if (clientVer >= existing.clientVersion) {
          await db
            .update(assessmentAnswersTable)
            .set({
              answer: cleanAnswer,
              isFlagged,
              clientVersion: clientVer,
              savedAt: now,
              updatedAt: now,
            })
            .where(eq(assessmentAnswersTable.id, existing.id));
        }
      } else {
        await db.insert(assessmentAnswersTable).values({
          attemptId: attemptId as any,
          assessmentQuestionId: item.assessmentQuestionId as any,
          questionId: item.questionId as any,
          answer: cleanAnswer,
          isFlagged,
          clientVersion: clientVer,
          savedAt: now,
          createdAt: now,
          updatedAt: now,
        });
      }
    }

    // 5. Update attempt heartbeat and timestamp
    await db
      .update(assessmentAttemptsTable)
      .set({
        lastHeartbeatAt: now,
        updatedAt: now,
      })
      .where(eq(assessmentAttemptsTable.id, attemptId as any));

    // 6. Count answered questions
    const [answeredRecord] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentAnswersTable)
      .where(
        and(
          eq(assessmentAnswersTable.attemptId, attemptId as any),
          sql`${assessmentAnswersTable.answer} is not null and length(trim(${assessmentAnswersTable.answer})) > 0`
        )
      );

    const answeredCount = answeredRecord?.count || 0;

    // 7. Log event and emit live update
    await db.insert(assessmentAttemptEventsTable).values({
      attemptId: attempt.id,
      eventType: 'ANSWER_SAVED',
      eventData: { count: answers.length, totalAnswered: answeredCount },
      serverTimestamp: now,
    });

    try {
      socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
        type: 'ANSWER_SAVED',
        attemptId: attempt.id,
        studentId,
        answeredCount,
        lastHeartbeatAt: now.toISOString(),
      });
    } catch (e) {}

    return {
      success: true,
      status: 'success',
      savedCount: answers.length,
      savedAt: now.toISOString(),
      answeredCount,
      data: {
        savedCount: answers.length,
        answeredCount,
      },
    };
  },

  /**
   * Heartbeat / presence update from mobile client.
   */
  recordHeartbeat: async (studentId: string, assessmentId: string, attemptId: string) => {
    const [attempt] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.id, attemptId as any),
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any)
        )
      );

    if (!attempt) {
      throw new Error('Attempt not found.');
    }

    const now = new Date();
    const expiryMs = new Date(attempt.expiresAt).getTime();

    if (attempt.status !== 'IN_PROGRESS') {
      return {
        isExpired: true,
        status: attempt.status,
        remainingSeconds: 0,
        serverTime: now.toISOString(),
      };
    }

    // Check expiry
    if (now.getTime() > expiryMs) {
      await db
        .update(assessmentAttemptsTable)
        .set({ status: 'TIMED_OUT', updatedAt: now })
        .where(eq(assessmentAttemptsTable.id, attempt.id));

      await db.insert(assessmentAttemptEventsTable).values({
        attemptId: attempt.id,
        eventType: 'ATTEMPT_TIMED_OUT',
        eventData: { reason: 'Expired on heartbeat check' },
        serverTimestamp: now,
      });

      try {
        socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
          type: 'ATTEMPT_TIMED_OUT',
          attemptId: attempt.id,
          studentId,
          status: 'TIMED_OUT',
          timestamp: now.toISOString(),
        });
      } catch (e) {}

      return {
        isExpired: true,
        status: 'TIMED_OUT',
        remainingSeconds: 0,
        serverTime: now.toISOString(),
      };
    }

    // Heartbeat update
    await db
      .update(assessmentAttemptsTable)
      .set({
        lastHeartbeatAt: now,
        updatedAt: now,
      })
      .where(eq(assessmentAttemptsTable.id, attempt.id));

    try {
      socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
        type: 'HEARTBEAT',
        attemptId: attempt.id,
        studentId,
        lastHeartbeatAt: now.toISOString(),
      });
    } catch (e) {}

    const remainingSeconds = Math.max(0, Math.floor((expiryMs - now.getTime()) / 1000));

    return {
      isExpired: false,
      status: 'IN_PROGRESS',
      remainingSeconds,
      serverTime: now.toISOString(),
      attempt: {
        id: attempt.id,
        status: 'IN_PROGRESS',
        lastHeartbeatAt: now.toISOString(),
      },
      data: {
        attempt: {
          id: attempt.id,
          status: 'IN_PROGRESS',
          lastHeartbeatAt: now.toISOString(),
        },
      },
    };
  },

  /**
   * Finalizes and submits an attempt.
   */
  submitAttempt: async (
    studentId: string,
    assessmentId: string,
    attemptId: string,
    finalAnswers?: AnswerItemInput[]
  ) => {
    const [attempt] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.id, attemptId as any),
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          eq(assessmentAttemptsTable.studentId, studentId as any)
        )
      );

    if (!attempt) {
      throw new Error('Attempt not found.');
    }

    // Idempotent submission: if already SUBMITTED, return success immediately
    if (attempt.status === 'SUBMITTED') {
      return {
        success: true,
        status: 'success',
        message: 'Assessment attempt was already submitted.',
        attempt: {
          id: attempt.id,
          status: 'SUBMITTED',
          submittedAt: attempt.submittedAt,
        },
        data: {
          attempt: {
            id: attempt.id,
            status: 'SUBMITTED',
            submittedAt: attempt.submittedAt,
          },
        },
      };
    }

    if (attempt.status === 'TIMED_OUT') {
      throw new Error('Assessment attempt has already timed out.');
    }

    const now = new Date();
    const expiryMs = new Date(attempt.expiresAt).getTime();
    const graceWindowMs = 15000;

    // Check expiry
    if (now.getTime() > expiryMs + graceWindowMs) {
      await db
        .update(assessmentAttemptsTable)
        .set({ status: 'TIMED_OUT', updatedAt: now })
        .where(eq(assessmentAttemptsTable.id, attempt.id));

      await db.insert(assessmentAttemptEventsTable).values({
        attemptId: attempt.id,
        eventType: 'ATTEMPT_TIMED_OUT',
        eventData: { reason: 'Expired before submission request' },
        serverTimestamp: now,
      });

      try {
        socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
          type: 'ATTEMPT_TIMED_OUT',
          attemptId: attempt.id,
          studentId,
          status: 'TIMED_OUT',
          timestamp: now.toISOString(),
        });
      } catch (e) {}

      throw new Error('Assessment deadline has passed. Attempt marked as timed out.');
    }

    // If final answers provided, save them first
    if (finalAnswers && finalAnswers.length > 0) {
      await assessmentAttemptService.saveAnswers(studentId, assessmentId, attemptId, finalAnswers);
    }

    // Mark as SUBMITTED
    const [updatedAttempt] = await db
      .update(assessmentAttemptsTable)
      .set({
        status: 'SUBMITTED',
        submittedAt: now,
        lastHeartbeatAt: now,
        updatedAt: now,
      })
      .where(eq(assessmentAttemptsTable.id, attempt.id))
      .returning();

    if (!updatedAttempt) {
      throw new Error('Failed to submit assessment attempt.');
    }

    // Log event
    await db.insert(assessmentAttemptEventsTable).values({
      attemptId: attempt.id,
      eventType: 'ATTEMPT_SUBMITTED',
      eventData: { submittedAt: now.toISOString() },
      serverTimestamp: now,
    });

    // Real-time broadcast to lecturer monitoring room
    try {
      socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
        type: 'ATTEMPT_SUBMITTED',
        attemptId: attempt.id,
        studentId,
        status: 'SUBMITTED',
        submittedAt: now.toISOString(),
      });
    } catch (e) {}

    return {
      success: true,
      status: 'success',
      message: 'Assessment submitted successfully.',
      attempt: {
        id: updatedAttempt.id,
        status: updatedAttempt.status,
        submittedAt: updatedAttempt.submittedAt,
      },
      data: {
        attempt: {
          id: updatedAttempt.id,
          status: updatedAttempt.status,
          submittedAt: updatedAttempt.submittedAt,
        },
      },
    };
  },

  /**
   * Retrieves live examination monitoring data for assigned lecturers and administrators.
   */
  getLecturerMonitorData: async (
    userId: string,
    userRole: string,
    assessmentId: string
  ) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        title: assessmentsTable.title,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        durationMinutes: assessmentsTable.durationMinutes,
        startTime: assessmentsTable.startTime,
        endTime: assessmentsTable.endTime,
        maxAttempts: assessmentsTable.maxAttempts,
        allowLateSubmission: assessmentsTable.allowLateSubmission,
        lateSubmissionDeadline: assessmentsTable.lateSubmissionDeadline,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // 2. Authorization check: Lecturer must be actively assigned to offering
    if (userRole === 'LECTURER') {
      const [assignment] = await db
        .select()
        .from(offeringLecturersTable)
        .where(
          and(
            eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
            eq(offeringLecturersTable.lecturerId, userId as any),
            eq(offeringLecturersTable.status, 'ACTIVE')
          )
        );

      if (!assignment) {
        throw new Error('Forbidden. You are not actively assigned to this course offering.');
      }
    }

    // 3. Finalize any expired attempts for this assessment
    await assessmentAttemptService.finalizeExpiredAttempts(assessmentId);

    // 4. Fetch total enrolled students in this offering
    const enrolledStudents = await db
      .select({
        studentId: usersTable.id,
        fullName: usersTable.fullName,
        email: usersTable.email,
        username: usersTable.username,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, assessment.offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      )
      .orderBy(asc(usersTable.fullName));

    const totalEligibleStudents = enrolledStudents.length;

    // 5. Fetch all attempts for this assessment
    const attempts = await db
      .select({
        id: assessmentAttemptsTable.id,
        studentId: assessmentAttemptsTable.studentId,
        attemptNumber: assessmentAttemptsTable.attemptNumber,
        status: assessmentAttemptsTable.status,
        startedAt: assessmentAttemptsTable.startedAt,
        submittedAt: assessmentAttemptsTable.submittedAt,
        expiresAt: assessmentAttemptsTable.expiresAt,
        lastHeartbeatAt: assessmentAttemptsTable.lastHeartbeatAt,
        isLate: assessmentAttemptsTable.isLate,
        clientIp: assessmentAttemptsTable.clientIp,
      })
      .from(assessmentAttemptsTable)
      .where(eq(assessmentAttemptsTable.assessmentId, assessmentId as any))
      .orderBy(desc(assessmentAttemptsTable.startedAt));

    // 6. Fetch total questions count in assessment
    const [qCountRec] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any));
    const totalQuestionsCount = qCountRec?.count || 0;

    // 7. Fetch answered questions count grouped by attempt
    const answeredRecords = await db
      .select({
        attemptId: assessmentAnswersTable.attemptId,
        answeredCount: sql<number>`count(*)`.mapWith(Number),
      })
      .from(assessmentAnswersTable)
      .where(
        and(
          sql`${assessmentAnswersTable.answer} is not null and length(trim(${assessmentAnswersTable.answer})) > 0`
        )
      )
      .groupBy(assessmentAnswersTable.attemptId);

    const answeredCountMap: Record<string, number> = {};
    for (const r of answeredRecords) {
      answeredCountMap[r.attemptId] = r.answeredCount;
    }

    // 8. Build roster
    const nowMs = Date.now();
    const studentAttemptMap: Record<string, any[]> = {};
    for (const att of attempts) {
      const list = studentAttemptMap[att.studentId] ?? [];
      list.push(att);
      studentAttemptMap[att.studentId] = list;
    }

    let startedCount = 0;
    let activeOnlineCount = 0;
    let disconnectedCount = 0;
    let submittedCount = 0;
    let timedOutCount = 0;

    const roster = enrolledStudents.map((std) => {
      const studentAttempts = studentAttemptMap[std.studentId] || [];
      const latestAttempt = studentAttempts[0] || null;

      if (latestAttempt) startedCount++;

      let connectionStatus: 'NOT_STARTED' | 'ONLINE' | 'DISCONNECTED' | 'COMPLETED' = 'NOT_STARTED';
      let answeredCount = 0;
      let remainingSeconds = 0;
      let elapsedMinutes = 0;

      if (latestAttempt) {
        answeredCount = answeredCountMap[latestAttempt.id] || 0;
        const expiryMs = new Date(latestAttempt.expiresAt).getTime();
        const startMs = new Date(latestAttempt.startedAt).getTime();
        remainingSeconds = Math.max(0, Math.floor((expiryMs - nowMs) / 1000));
        elapsedMinutes = Math.max(0, Math.floor((nowMs - startMs) / 60000));

        if (latestAttempt.status === 'SUBMITTED') {
          submittedCount++;
          connectionStatus = 'COMPLETED';
        } else if (latestAttempt.status === 'TIMED_OUT') {
          timedOutCount++;
          connectionStatus = 'COMPLETED';
        } else if (latestAttempt.status === 'IN_PROGRESS') {
          const lastHeartbeatMs = new Date(latestAttempt.lastHeartbeatAt).getTime();
          if (nowMs - lastHeartbeatMs <= 45000) {
            activeOnlineCount++;
            connectionStatus = 'ONLINE';
          } else {
            disconnectedCount++;
            connectionStatus = 'DISCONNECTED';
          }
        }
      }

      return {
        studentId: std.studentId,
        fullName: std.fullName,
        email: std.email,
        username: std.username,
        attemptStatus: latestAttempt ? latestAttempt.status : 'UNSTARTED',
        answeredCount,
        connectionStatus,
        attempt: latestAttempt
          ? {
              id: latestAttempt.id,
              attemptNumber: latestAttempt.attemptNumber,
              status: latestAttempt.status,
              startedAt: latestAttempt.startedAt,
              submittedAt: latestAttempt.submittedAt,
              expiresAt: latestAttempt.expiresAt,
              lastHeartbeatAt: latestAttempt.lastHeartbeatAt,
              isLate: latestAttempt.isLate,
              remainingSeconds,
              elapsedMinutes,
              answeredCount,
              totalQuestionsCount,
              connectionStatus,
            }
          : null,
      };
    });

    // 9. Fetch recent events
    const recentEvents = await db
      .select({
        id: assessmentAttemptEventsTable.id,
        attemptId: assessmentAttemptEventsTable.attemptId,
        eventType: assessmentAttemptEventsTable.eventType,
        eventData: assessmentAttemptEventsTable.eventData,
        serverTimestamp: assessmentAttemptEventsTable.serverTimestamp,
        studentName: usersTable.fullName,
      })
      .from(assessmentAttemptEventsTable)
      .innerJoin(assessmentAttemptsTable, eq(assessmentAttemptEventsTable.attemptId, assessmentAttemptsTable.id))
      .innerJoin(usersTable, eq(assessmentAttemptsTable.studentId, usersTable.id))
      .where(eq(assessmentAttemptsTable.assessmentId, assessmentId as any))
      .orderBy(desc(assessmentAttemptEventsTable.serverTimestamp))
      .limit(30);

    return {
      assessment,
      stats: {
        totalEligibleStudents,
        eligibleStudents: totalEligibleStudents,
        startedCount,
        startedAttempts: startedCount,
        activeOnlineCount,
        onlineCount: activeOnlineCount,
        disconnectedCount,
        submittedCount,
        timedOutCount,
        unstartedCount: totalEligibleStudents - startedCount,
      },
      roster,
      recentEvents,
    };
  },

  /**
   * Emergency Force-Submit an attempt by an assigned lecturer.
   */
  forceSubmitAttempt: async (
    userId: string,
    userRole: string,
    assessmentId: string,
    attemptId: string,
    reason: string
  ) => {
    // 1. Fetch assessment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) throw new Error('Assessment not found.');

    // 2. Verify authorization
    if (userRole === 'LECTURER') {
      const [assignment] = await db
        .select()
        .from(offeringLecturersTable)
        .where(
          and(
            eq(offeringLecturersTable.offeringId, assessment.offeringId as any),
            eq(offeringLecturersTable.lecturerId, userId as any),
            eq(offeringLecturersTable.status, 'ACTIVE')
          )
        );

      if (!assignment) {
        throw new Error('Forbidden. You are not actively assigned to this course offering.');
      }
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

    if (!attempt) throw new Error('Attempt not found.');

    if (attempt.status === 'SUBMITTED' || attempt.status === 'TIMED_OUT') {
      return {
        status: 'success',
        message: `Attempt was already finalized with status ${attempt.status}.`,
        attempt,
      };
    }

    const now = new Date();
    const [updatedAttempt] = await db
      .update(assessmentAttemptsTable)
      .set({
        status: 'SUBMITTED',
        submittedAt: now,
        updatedAt: now,
      })
      .where(eq(assessmentAttemptsTable.id, attempt.id))
      .returning();

    // Log force-submit event
    await db.insert(assessmentAttemptEventsTable).values({
      attemptId: attempt.id,
      eventType: 'FORCE_SUBMITTED',
      eventData: {
        forcedBy: userId,
        forcedByRole: userRole,
        reason,
      },
      serverTimestamp: now,
    });

    // Real-time notification
    try {
      socketService.emitToRoom(`assessment:${assessmentId}:monitor`, 'assessment:attempt:update', {
        type: 'FORCE_SUBMITTED',
        attemptId: attempt.id,
        studentId: attempt.studentId,
        status: 'SUBMITTED',
        reason,
        timestamp: now.toISOString(),
      });
    } catch (e) {}

    return {
      success: true,
      status: 'success',
      message: 'Attempt was force-submitted successfully.',
      attempt: updatedAttempt,
      data: {
        attempt: updatedAttempt,
      },
    };
  },
};
