import { eq, and, or, ilike, desc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  questionsTable,
  questionVersionsTable,
  questionReviewsTable,
  coursesTable,
  courseOfferingsTable,
  offeringLecturersTable,
  usersTable,
  QUESTION_STATUS,
  type QuestionStatus,
  type GradingPoint,
} from '../db/schema.js';
import { auditService } from './admin/auditService.js';
import type { AuditContextInput } from '../types/admin.types.js';

export interface CreateDraftInput {
  type?: 'cbt' | 'theory';
  question: string;
  options?: string[] | null | undefined;
  correctAnswer: string;
  gradingPoints?: GradingPoint[] | undefined;
  explanation?: string | null | undefined;
  points?: number | undefined;
  difficulty?: 'easy' | 'medium' | 'hard' | undefined;
  imageUrl?: string | null | undefined;
}

export interface UpdateDraftInput {
  type?: 'cbt' | 'theory' | undefined;
  question?: string | undefined;
  options?: string[] | null | undefined;
  correctAnswer?: string | undefined;
  gradingPoints?: GradingPoint[] | undefined;
  explanation?: string | null | undefined;
  points?: number | undefined;
  difficulty?: 'easy' | 'medium' | 'hard' | undefined;
  imageUrl?: string | null | undefined;
}

export interface ListQuestionsFilter {
  offeringId?: string | undefined;
  courseId?: string | undefined;
  status?: QuestionStatus | undefined;
  type?: string | undefined;
  difficulty?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export const questionWorkflowService = {
  /**
   * Creates a draft question in the context of an assigned course offering.
   */
  createDraft: async (
    lecturerId: string,
    offeringId: string,
    data: CreateDraftInput,
    auditContext?: AuditContextInput
  ) => {
    // 1. Verify lecturer account exists, is active, and has LECTURER role
    const [lecturer] = await db
      .select({
        id: usersTable.id,
        role: usersTable.role,
        status: usersTable.status,
      })
      .from(usersTable)
      .where(eq(usersTable.id, lecturerId as any));

    if (!lecturer || lecturer.role !== 'LECTURER') {
      throw new Error('Unauthorized. User is not a recognized lecturer.');
    }

    if (lecturer.status !== 'ACTIVE') {
      throw new Error('Forbidden. Lecturer account is inactive or suspended.');
    }

    // 2. Verify offering exists and is active
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        status: courseOfferingsTable.status,
      })
      .from(courseOfferingsTable)
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    if (offering.status !== 'ACTIVE') {
      throw new Error(`Cannot author questions for an offering in ${offering.status.toLowerCase()} status.`);
    }

    // 3. Verify lecturer is actively assigned to this offering
    const [assignment] = await db
      .select({ id: offeringLecturersTable.id })
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any),
          eq(offeringLecturersTable.status, 'ACTIVE')
        )
      );

    if (!assignment) {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    const normalizedType = data.type === 'theory' ? 'theory' : 'cbt';
    const trimmedQuestion = data.question.trim();
    const trimmedAnswer = data.correctAnswer.trim();

    // 4. Insert draft record
    const [newQuestion] = await db
      .insert(questionsTable)
      .values({
        courseId: offering.courseId as any,
        originOfferingId: offeringId as any,
        authorLecturerId: lecturerId as any,
        status: QUESTION_STATUS.DRAFT,
        type: normalizedType,
        question: trimmedQuestion,
        options: normalizedType === 'cbt' ? data.options || null : null,
        correctAnswer: trimmedAnswer,
        gradingPoints: normalizedType === 'theory' ? (data.gradingPoints || []) : [],
        explanation: data.explanation?.trim() || null,
        points: data.points ?? 1,
        imageUrl: data.imageUrl?.trim() || null,
        difficulty: data.difficulty || 'medium',
        isPracticeEligible: false,
        isActive: true,
        currentVersion: 1,
      })
      .returning();

    if (!newQuestion) {
      throw new Error('Failed to create draft question record.');
    }

    // 5. Audit log
    if (auditContext?.adminId) {
      await auditService.logAdminAction({
        adminUserId: auditContext.adminId,
        action: 'CREATE_QUESTION_DRAFT',
        resourceType: 'questions',
        resourceId: newQuestion.id,
        metadata: {
          offeringId,
          type: normalizedType,
          authorLecturerId: lecturerId,
        },
      });
    }

    return newQuestion;
  },

  /**
   * Retrieves paginated questions authored by the authenticated lecturer.
   */
  getLecturerQuestions: async (
    lecturerId: string,
    filters: ListQuestionsFilter = {}
  ) => {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(100, Math.max(1, filters.limit || 20));
    const offset = (page - 1) * limit;

    const conditions = [eq(questionsTable.authorLecturerId, lecturerId as any)];

    if (filters.offeringId) {
      conditions.push(eq(questionsTable.originOfferingId, filters.offeringId as any));
    }

    if (filters.courseId) {
      conditions.push(eq(questionsTable.courseId, filters.courseId as any));
    }

    if (filters.status) {
      conditions.push(eq(questionsTable.status, filters.status));
    }

    if (filters.type) {
      conditions.push(eq(questionsTable.type, filters.type.toLowerCase()));
    }

    if (filters.difficulty) {
      conditions.push(eq(questionsTable.difficulty, filters.difficulty.toLowerCase()));
    }

    if (filters.search && filters.search.trim()) {
      const pattern = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(questionsTable.question, pattern),
          ilike(questionsTable.correctAnswer, pattern)
        )!
      );
    }

    const whereClause = and(...conditions);

    const questionsQuery = db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        originOfferingId: questionsTable.originOfferingId,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        section: courseOfferingsTable.section,
        status: questionsTable.status,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        points: questionsTable.points,
        imageUrl: questionsTable.imageUrl,
        difficulty: questionsTable.difficulty,
        currentVersion: questionsTable.currentVersion,
        reviewFeedback: questionsTable.reviewFeedback,
        rejectionReason: questionsTable.rejectionReason,
        createdAt: questionsTable.createdAt,
        updatedAt: questionsTable.updatedAt,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .leftJoin(courseOfferingsTable, eq(questionsTable.originOfferingId, courseOfferingsTable.id))
      .where(whereClause)
      .orderBy(desc(questionsTable.updatedAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(questionsTable)
      .where(whereClause);

    const [questions, countResult] = await Promise.all([questionsQuery, countQuery]);
    const total = countResult[0]?.count || 0;

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Retrieves single question details for the authoring lecturer.
   */
  getLecturerQuestionById: async (lecturerId: string, questionId: string) => {
    const [question] = await db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        originOfferingId: questionsTable.originOfferingId,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        section: courseOfferingsTable.section,
        status: questionsTable.status,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        points: questionsTable.points,
        imageUrl: questionsTable.imageUrl,
        difficulty: questionsTable.difficulty,
        currentVersion: questionsTable.currentVersion,
        reviewFeedback: questionsTable.reviewFeedback,
        rejectionReason: questionsTable.rejectionReason,
        authorLecturerId: questionsTable.authorLecturerId,
        createdAt: questionsTable.createdAt,
        updatedAt: questionsTable.updatedAt,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .leftJoin(courseOfferingsTable, eq(questionsTable.originOfferingId, courseOfferingsTable.id))
      .where(
        and(
          eq(questionsTable.id, questionId as any),
          eq(questionsTable.authorLecturerId, lecturerId as any)
        )
      );

    if (!question) {
      throw new Error('Question not found or you are not authorized to view it.');
    }

    return question;
  },

  /**
   * Updates a draft or revision-requested question.
   */
  updateDraft: async (
    lecturerId: string,
    questionId: string,
    data: UpdateDraftInput,
    auditContext?: AuditContextInput
  ) => {
    // 1. Fetch existing question and verify ownership
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(
        and(
          eq(questionsTable.id, questionId as any),
          eq(questionsTable.authorLecturerId, lecturerId as any)
        )
      );

    if (!question) {
      throw new Error('Question not found or you are not authorized to modify it.');
    }

    // 2. Enforce status lock
    if (question.status !== QUESTION_STATUS.DRAFT && question.status !== QUESTION_STATUS.REVISION_REQUIRED) {
      throw new Error(
        `Question cannot be edited in ${question.status} status. Only DRAFT or REVISION_REQUIRED questions can be modified.`
      );
    }

    // 3. Verify lecturer assignment is still active
    if (question.originOfferingId) {
      const [assignment] = await db
        .select({ id: offeringLecturersTable.id })
        .from(offeringLecturersTable)
        .where(
          and(
            eq(offeringLecturersTable.offeringId, question.originOfferingId),
            eq(offeringLecturersTable.lecturerId, lecturerId as any),
            eq(offeringLecturersTable.status, 'ACTIVE')
          )
        );

      if (!assignment) {
        throw new Error('Forbidden. Your teaching assignment for this course offering has been revoked.');
      }
    }

    const updates: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (data.type !== undefined) updates.type = data.type;
    if (data.question !== undefined) updates.question = data.question.trim();
    if (data.options !== undefined) updates.options = data.options;
    if (data.correctAnswer !== undefined) updates.correctAnswer = data.correctAnswer.trim();
    if (data.gradingPoints !== undefined) updates.gradingPoints = data.gradingPoints;
    if (data.explanation !== undefined) updates.explanation = data.explanation?.trim() || null;
    if (data.points !== undefined) updates.points = data.points;
    if (data.difficulty !== undefined) updates.difficulty = data.difficulty;
    if (data.imageUrl !== undefined) updates.imageUrl = data.imageUrl?.trim() || null;

    const [updated] = await db
      .update(questionsTable)
      .set(updates)
      .where(eq(questionsTable.id, questionId as any))
      .returning();

    return updated;
  },

  /**
   * Submits a draft or revision question for departmental review.
   * Creates an immutable snapshot in question_versions and records a question_reviews audit entry.
   */
  submitQuestion: async (
    lecturerId: string,
    questionId: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(
        and(
          eq(questionsTable.id, questionId as any),
          eq(questionsTable.authorLecturerId, lecturerId as any)
        )
      );

    if (!question) {
      throw new Error('Question not found or you are not authorized to submit it.');
    }

    if (question.status !== QUESTION_STATUS.DRAFT && question.status !== QUESTION_STATUS.REVISION_REQUIRED) {
      if (question.status === QUESTION_STATUS.SUBMITTED) {
        return question; // Idempotent return
      }
      throw new Error(`Cannot submit question in ${question.status} status.`);
    }

    // Verify lecturer assignment is still active
    if (question.originOfferingId) {
      const [assignment] = await db
        .select({ id: offeringLecturersTable.id })
        .from(offeringLecturersTable)
        .where(
          and(
            eq(offeringLecturersTable.offeringId, question.originOfferingId),
            eq(offeringLecturersTable.lecturerId, lecturerId as any),
            eq(offeringLecturersTable.status, 'ACTIVE')
          )
        );

      if (!assignment) {
        throw new Error('Forbidden. Your teaching assignment for this course offering has been revoked.');
      }
    }

    // CBT validation check
    if (question.type === 'cbt') {
      if (!Array.isArray(question.options) || question.options.length < 2) {
        throw new Error('CBT question requires at least 2 options before submission.');
      }
      const trimmedAnswer = question.correctAnswer.trim();
      const matchesOption = question.options.some((opt) => opt.trim() === trimmedAnswer);
      if (!matchesOption) {
        throw new Error('Correct answer must match one of the available options before submission.');
      }
    }

    const previousStatus = question.status;
    const versionNumber = question.currentVersion;

    // Execute atomic transaction
    return await db.transaction(async (tx) => {
      // 1. Create version snapshot
      await tx
        .insert(questionVersionsTable)
        .values({
          questionId: question.id,
          versionNumber,
          type: question.type,
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
          gradingPoints: question.gradingPoints as any,
          explanation: question.explanation,
          points: question.points,
          imageUrl: question.imageUrl,
          difficulty: question.difficulty,
          submittedByUserId: lecturerId as any,
        })
        .onConflictDoNothing();

      // 2. Update question status to SUBMITTED
      const [updatedQuestion] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.SUBMITTED,
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, question.id))
        .returning();

      // 3. Record review event
      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber,
        action: 'SUBMIT',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.SUBMITTED,
        performedByUserId: lecturerId as any,
      });

      return updatedQuestion;
    });
  },

  /**
   * Withdraws a submission back to DRAFT before review has started.
   */
  withdrawSubmission: async (
    lecturerId: string,
    questionId: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(
        and(
          eq(questionsTable.id, questionId as any),
          eq(questionsTable.authorLecturerId, lecturerId as any)
        )
      );

    if (!question) {
      throw new Error('Question not found or you are not authorized to withdraw it.');
    }

    if (question.status === QUESTION_STATUS.UNDER_REVIEW) {
      throw new Error('Question is already under active review and cannot be withdrawn.');
    }

    if (question.status !== QUESTION_STATUS.SUBMITTED) {
      throw new Error(`Cannot withdraw question in ${question.status} status.`);
    }

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.DRAFT,
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, question.id))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'WITHDRAW',
        fromStatus: QUESTION_STATUS.SUBMITTED,
        toStatus: QUESTION_STATUS.DRAFT,
        performedByUserId: lecturerId as any,
      });

      return updated;
    });
  },

  /**
   * Deletes a draft question.
   */
  deleteDraft: async (lecturerId: string, questionId: string) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(
        and(
          eq(questionsTable.id, questionId as any),
          eq(questionsTable.authorLecturerId, lecturerId as any)
        )
      );

    if (!question) {
      throw new Error('Question not found or you are not authorized to delete it.');
    }

    if (question.status !== QUESTION_STATUS.DRAFT && question.status !== QUESTION_STATUS.REJECTED) {
      throw new Error(`Cannot delete question in ${question.status} status.`);
    }

    await db.delete(questionsTable).where(eq(questionsTable.id, questionId as any));
    return { success: true };
  },

  // =========================================================================
  // ADMIN REVIEW & APPROVAL WORKFLOW
  // =========================================================================

  /**
   * Retrieves the review queue of submitted questions for administrators.
   */
  getAdminReviewQueue: async (filters: ListQuestionsFilter = {}) => {
    const page = Math.max(1, filters.page || 1);
    const limit = Math.min(100, Math.max(1, filters.limit || 20));
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.status) {
      conditions.push(eq(questionsTable.status, filters.status));
    } else {
      // Default to submissions requiring review
      conditions.push(
        inArray(questionsTable.status, [
          QUESTION_STATUS.SUBMITTED,
          QUESTION_STATUS.UNDER_REVIEW,
          QUESTION_STATUS.REVISION_REQUIRED,
        ])
      );
    }

    if (filters.courseId) {
      conditions.push(eq(questionsTable.courseId, filters.courseId as any));
    }

    if (filters.offeringId) {
      conditions.push(eq(questionsTable.originOfferingId, filters.offeringId as any));
    }

    if (filters.type) {
      conditions.push(eq(questionsTable.type, filters.type.toLowerCase()));
    }

    if (filters.difficulty) {
      conditions.push(eq(questionsTable.difficulty, filters.difficulty.toLowerCase()));
    }

    if (filters.search && filters.search.trim()) {
      const pattern = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(questionsTable.question, pattern),
          ilike(questionsTable.correctAnswer, pattern)
        )!
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const questionsQuery = db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        originOfferingId: questionsTable.originOfferingId,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        section: courseOfferingsTable.section,
        authorLecturerId: questionsTable.authorLecturerId,
        authorName: usersTable.fullName,
        authorEmail: usersTable.email,
        status: questionsTable.status,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        points: questionsTable.points,
        imageUrl: questionsTable.imageUrl,
        difficulty: questionsTable.difficulty,
        currentVersion: questionsTable.currentVersion,
        reviewFeedback: questionsTable.reviewFeedback,
        rejectionReason: questionsTable.rejectionReason,
        createdAt: questionsTable.createdAt,
        updatedAt: questionsTable.updatedAt,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .leftJoin(courseOfferingsTable, eq(questionsTable.originOfferingId, courseOfferingsTable.id))
      .leftJoin(usersTable, eq(questionsTable.authorLecturerId, usersTable.id))
      .where(whereClause)
      .orderBy(desc(questionsTable.updatedAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(questionsTable)
      .where(whereClause);

    const [questions, countResult] = await Promise.all([questionsQuery, countQuery]);
    const total = countResult[0]?.count || 0;

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Retrieves full question detail with history for administrators.
   */
  getAdminQuestionDetails: async (questionId: string) => {
    const [question] = await db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        originOfferingId: questionsTable.originOfferingId,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        section: courseOfferingsTable.section,
        authorLecturerId: questionsTable.authorLecturerId,
        authorName: usersTable.fullName,
        authorEmail: usersTable.email,
        status: questionsTable.status,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        points: questionsTable.points,
        imageUrl: questionsTable.imageUrl,
        difficulty: questionsTable.difficulty,
        isPracticeEligible: questionsTable.isPracticeEligible,
        isActive: questionsTable.isActive,
        currentVersion: questionsTable.currentVersion,
        reviewedByAdminId: questionsTable.reviewedByAdminId,
        reviewedAt: questionsTable.reviewedAt,
        reviewFeedback: questionsTable.reviewFeedback,
        rejectionReason: questionsTable.rejectionReason,
        publishedByAdminId: questionsTable.publishedByAdminId,
        publishedAt: questionsTable.publishedAt,
        createdAt: questionsTable.createdAt,
        updatedAt: questionsTable.updatedAt,
      })
      .from(questionsTable)
      .innerJoin(coursesTable, eq(questionsTable.courseId, coursesTable.id))
      .leftJoin(courseOfferingsTable, eq(questionsTable.originOfferingId, courseOfferingsTable.id))
      .leftJoin(usersTable, eq(questionsTable.authorLecturerId, usersTable.id))
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    const reviews = await db
      .select({
        id: questionReviewsTable.id,
        versionNumber: questionReviewsTable.versionNumber,
        action: questionReviewsTable.action,
        fromStatus: questionReviewsTable.fromStatus,
        toStatus: questionReviewsTable.toStatus,
        performedByUserId: questionReviewsTable.performedByUserId,
        performerName: usersTable.fullName,
        performerRole: usersTable.role,
        feedback: questionReviewsTable.feedback,
        reason: questionReviewsTable.reason,
        createdAt: questionReviewsTable.createdAt,
      })
      .from(questionReviewsTable)
      .leftJoin(usersTable, eq(questionReviewsTable.performedByUserId, usersTable.id))
      .where(eq(questionReviewsTable.questionId, questionId as any))
      .orderBy(desc(questionReviewsTable.createdAt));

    const versions = await db
      .select({
        id: questionVersionsTable.id,
        versionNumber: questionVersionsTable.versionNumber,
        type: questionVersionsTable.type,
        question: questionVersionsTable.question,
        options: questionVersionsTable.options,
        correctAnswer: questionVersionsTable.correctAnswer,
        gradingPoints: questionVersionsTable.gradingPoints,
        explanation: questionVersionsTable.explanation,
        points: questionVersionsTable.points,
        difficulty: questionVersionsTable.difficulty,
        createdAt: questionVersionsTable.createdAt,
      })
      .from(questionVersionsTable)
      .where(eq(questionVersionsTable.questionId, questionId as any))
      .orderBy(desc(questionVersionsTable.versionNumber));

    return {
      question,
      reviews,
      versions,
    };
  },

  /**
   * Sets question status to UNDER_REVIEW when an admin opens the review modal.
   */
  beginReview: async (adminId: string, questionId: string) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    if (question.status !== QUESTION_STATUS.SUBMITTED) {
      return question; // Already under review or past review
    }

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.UNDER_REVIEW,
          reviewedByAdminId: adminId as any,
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'BEGIN_REVIEW',
        fromStatus: QUESTION_STATUS.SUBMITTED,
        toStatus: QUESTION_STATUS.UNDER_REVIEW,
        performedByUserId: adminId as any,
      });

      return updated;
    });
  },

  /**
   * Requests revisions from the authoring lecturer with mandatory feedback.
   */
  requestRevision: async (
    adminId: string,
    questionId: string,
    feedback: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    if (
      question.status !== QUESTION_STATUS.SUBMITTED &&
      question.status !== QUESTION_STATUS.UNDER_REVIEW
    ) {
      throw new Error(`Cannot request revisions for question in ${question.status} status.`);
    }

    const previousStatus = question.status;
    const nextVersion = question.currentVersion + 1;

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.REVISION_REQUIRED,
          currentVersion: nextVersion,
          reviewedByAdminId: adminId as any,
          reviewedAt: new Date(),
          reviewFeedback: feedback.trim(),
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'REQUEST_REVISION',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.REVISION_REQUIRED,
        performedByUserId: adminId as any,
        feedback: feedback.trim(),
      });

      if (auditContext?.adminId) {
        await auditService.logAdminAction({
          adminUserId: auditContext.adminId,
          action: 'REQUEST_QUESTION_REVISION',
          resourceType: 'questions',
          resourceId: question.id,
          metadata: { feedback: feedback.trim() },
        });
      }

      return updated;
    });
  },

  /**
   * Permanently rejects a submitted question with a recorded reason.
   */
  rejectQuestion: async (
    adminId: string,
    questionId: string,
    reason: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    if (
      question.status !== QUESTION_STATUS.SUBMITTED &&
      question.status !== QUESTION_STATUS.UNDER_REVIEW
    ) {
      throw new Error(`Cannot reject question in ${question.status} status.`);
    }

    const previousStatus = question.status;

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.REJECTED,
          isActive: false,
          reviewedByAdminId: adminId as any,
          reviewedAt: new Date(),
          rejectionReason: reason.trim(),
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'REJECT',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.REJECTED,
        performedByUserId: adminId as any,
        reason: reason.trim(),
      });

      if (auditContext?.adminId) {
        await auditService.logAdminAction({
          adminUserId: auditContext.adminId,
          action: 'REJECT_QUESTION',
          resourceType: 'questions',
          resourceId: question.id,
          metadata: { reason: reason.trim() },
        });
      }

      return updated;
    });
  },

  /**
   * Approves a submitted question.
   * STRICT ENFORCEMENT: Self-approval prevention invariant.
   */
  approveQuestion: async (
    adminId: string,
    questionId: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    // SELF-APPROVAL DEFENSE: Compare canonical user IDs
    if (question.authorLecturerId && String(question.authorLecturerId) === String(adminId)) {
      throw new Error('Self-approval violation: Administrators cannot approve questions they have authored.');
    }

    if (
      question.status !== QUESTION_STATUS.SUBMITTED &&
      question.status !== QUESTION_STATUS.UNDER_REVIEW
    ) {
      if (question.status === QUESTION_STATUS.APPROVED) {
        return question;
      }
      throw new Error(`Cannot approve question in ${question.status} status.`);
    }

    const previousStatus = question.status;

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.APPROVED,
          reviewedByAdminId: adminId as any,
          reviewedAt: new Date(),
          reviewFeedback: null,
          rejectionReason: null,
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'APPROVE',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.APPROVED,
        performedByUserId: adminId as any,
      });

      if (auditContext?.adminId) {
        await auditService.logAdminAction({
          adminUserId: auditContext.adminId,
          action: 'APPROVE_QUESTION',
          resourceType: 'questions',
          resourceId: question.id,
          metadata: { versionNumber: question.currentVersion },
        });
      }

      return updated;
    });
  },

  /**
   * Publishes an approved question and designates open-practice eligibility.
   */
  publishQuestion: async (
    adminId: string,
    questionId: string,
    isPracticeEligible: boolean,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    if (
      question.status !== QUESTION_STATUS.APPROVED &&
      question.status !== QUESTION_STATUS.PUBLISHED
    ) {
      throw new Error(`Cannot publish question in ${question.status} status. Only APPROVED questions can be published.`);
    }

    const previousStatus = question.status;

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.PUBLISHED,
          isPracticeEligible: !!isPracticeEligible,
          isActive: true,
          publishedByAdminId: adminId as any,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'PUBLISH',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.PUBLISHED,
        performedByUserId: adminId as any,
        feedback: `Published. Practice eligible: ${isPracticeEligible}`,
      });

      if (auditContext?.adminId) {
        await auditService.logAdminAction({
          adminUserId: auditContext.adminId,
          action: 'PUBLISH_QUESTION',
          resourceType: 'questions',
          resourceId: question.id,
          metadata: { isPracticeEligible },
        });
      }

      return updated;
    });
  },

  /**
   * Archives / withdraws a published question from active use.
   */
  archiveQuestion: async (
    adminId: string,
    questionId: string,
    auditContext?: AuditContextInput
  ) => {
    const [question] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, questionId as any));

    if (!question) {
      throw new Error('Question not found.');
    }

    const previousStatus = question.status;

    return await db.transaction(async (tx) => {
      const [updated] = await tx
        .update(questionsTable)
        .set({
          status: QUESTION_STATUS.ARCHIVED,
          isActive: false,
          isPracticeEligible: false,
          updatedAt: new Date(),
        })
        .where(eq(questionsTable.id, questionId as any))
        .returning();

      await tx.insert(questionReviewsTable).values({
        questionId: question.id,
        versionNumber: question.currentVersion,
        action: 'ARCHIVE',
        fromStatus: previousStatus,
        toStatus: QUESTION_STATUS.ARCHIVED,
        performedByUserId: adminId as any,
      });

      if (auditContext?.adminId) {
        await auditService.logAdminAction({
          adminUserId: auditContext.adminId,
          action: 'ARCHIVE_QUESTION',
          resourceType: 'questions',
          resourceId: question.id,
        });
      }

      return updated;
    });
  },
};

