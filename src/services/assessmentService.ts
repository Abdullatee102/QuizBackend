import { eq, and, or, ilike, desc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  assessmentsTable,
  assessmentQuestionsTable,
  assessmentAuditLogsTable,
  courseOfferingsTable,
  coursesTable,
  offeringLecturersTable,
  studentEnrollmentsTable,
  userEntitlementsTable,
  questionsTable,
  usersTable,
  departmentsTable,
  facultiesTable,
  type AssessmentStatus,
  type AssessmentType,
  type ResultReleasePolicy,
  type QuestionSnapshot,
} from '../db/schema.js';
import { eligibilityService } from './eligibilityService.js';
import { notificationService } from './notificationService.js';
import logger from '../config/logger.js';

export interface AuditContextInput {
  actorId: string;
  actorRole: 'LECTURER' | 'SUPER_ADMIN' | 'SYSTEM';
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}

export interface CreateAssessmentInput {
  title: string;
  description?: string | null | undefined;
  type?: AssessmentType | undefined;
  durationMinutes: number;
  startTime: string | Date;
  endTime: string | Date;
  passMarks?: number | null | undefined;
  maxAttempts?: number | undefined;
  isRandomized?: boolean | undefined;
  allowLateSubmission?: boolean | undefined;
  lateSubmissionDeadline?: string | Date | null | undefined;
  resultReleasePolicy?: ResultReleasePolicy | undefined;
  notificationAudienceType?: 'ACADEMIC_ENROLLED' | 'PRODUCT_ENTITLED' | undefined;
  requiredProductId?: string | null | undefined;
}

export interface UpdateAssessmentDraftInput {
  title?: string | undefined;
  description?: string | null | undefined;
  type?: AssessmentType | undefined;
  durationMinutes?: number | undefined;
  startTime?: string | Date | undefined;
  endTime?: string | Date | undefined;
  passMarks?: number | null | undefined;
  maxAttempts?: number | undefined;
  isRandomized?: boolean | undefined;
  allowLateSubmission?: boolean | undefined;
  lateSubmissionDeadline?: string | Date | null | undefined;
  resultReleasePolicy?: ResultReleasePolicy | undefined;
  notificationAudienceType?: 'ACADEMIC_ENROLLED' | 'PRODUCT_ENTITLED' | undefined;
  requiredProductId?: string | null | undefined;
}

export interface QuestionAssignmentItem {
  questionId: string;
  orderIndex?: number | undefined;
  allocatedMarks?: number | undefined;
}

export const assessmentService = {
  /**
   * Helper to verify that an authenticated lecturer is actively assigned to an offering.
   */
  verifyLecturerAssignment: async (lecturerId: string, offeringId: string) => {
    const [lecturer] = await db
      .select({ id: usersTable.id, role: usersTable.role, status: usersTable.status })
      .from(usersTable)
      .where(eq(usersTable.id, lecturerId as any));

    if (!lecturer || lecturer.role !== 'LECTURER') {
      throw new Error('Unauthorized. User is not a recognized lecturer.');
    }

    if (lecturer.status !== 'ACTIVE') {
      throw new Error('Forbidden. Lecturer account is inactive or suspended.');
    }

    const [assignment] = await db
      .select({
        id: offeringLecturersTable.id,
        role: offeringLecturersTable.role,
        status: offeringLecturersTable.status,
      })
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any)
        )
      );

    if (!assignment || assignment.status !== 'ACTIVE') {
      throw new Error('Forbidden. You are not actively assigned to this course offering.');
    }

    return assignment;
  },

  /**
   * Creates an assessment draft under an active course offering.
   */
  createDraft: async (
    lecturerId: string,
    offeringId: string,
    input: CreateAssessmentInput,
    auditContext?: AuditContextInput
  ) => {
    // 1. Verify lecturer assignment
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

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
      throw new Error(`Cannot create assessments for an offering in ${offering.status.toLowerCase()} status.`);
    }

    const start = new Date(input.startTime);
    const end = new Date(input.endTime);

    if (end.getTime() <= start.getTime()) {
      throw new Error('End time must be strictly after start time.');
    }

    const windowMinutes = (end.getTime() - start.getTime()) / (60 * 1000);
    if (windowMinutes < input.durationMinutes) {
      throw new Error('Assessment availability window cannot be shorter than attempt duration.');
    }

    // 3. Insert assessment draft
    const [assessment] = await db
      .insert(assessmentsTable)
      .values({
        offeringId: offering.id,
        courseId: offering.courseId,
        creatorLecturerId: lecturerId as any,
        title: input.title.trim(),
        description: input.description?.trim() || null,
        type: input.type || 'CBT',
        status: 'DRAFT',
        durationMinutes: input.durationMinutes,
        startTime: start,
        endTime: end,
        passMarks: input.passMarks ?? null,
        maxAttempts: input.maxAttempts || 1,
        isRandomized: Boolean(input.isRandomized),
        allowLateSubmission: Boolean(input.allowLateSubmission),
        lateSubmissionDeadline: input.lateSubmissionDeadline ? new Date(input.lateSubmissionDeadline) : null,
        resultReleasePolicy: input.resultReleasePolicy || 'MANUAL_AFTER_GRADING',
        notificationAudienceType: input.notificationAudienceType || 'ACADEMIC_ENROLLED',
        requiredProductId: input.requiredProductId || null,
      })
      .returning();

    if (!assessment) {
      throw new Error('Failed to create assessment record.');
    }

    // 4. Log audit record
    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'CREATED',
      newState: assessment,
      reason: 'Created new assessment draft',
    });

    return assessment;
  },

  /**
   * Retrieves assessments belonging to an offering.
   */
  listOfferingAssessments: async (
    lecturerId: string,
    offeringId: string,
    options: {
      status?: string | undefined;
      type?: string | undefined;
      page?: number | undefined;
      limit?: number | undefined;
    } = {}
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [eq(assessmentsTable.offeringId, offeringId as any)];
    if (options.status) {
      conditions.push(eq(assessmentsTable.status, options.status as AssessmentStatus));
    }
    if (options.type) {
      conditions.push(eq(assessmentsTable.type, options.type as AssessmentType));
    }

    const [countResult] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentsTable)
      .where(and(...conditions));

    const total = countResult?.count || 0;

    const assessments = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        creatorLecturerId: assessmentsTable.creatorLecturerId,
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
        resultReleasePolicy: assessmentsTable.resultReleasePolicy,
        publishedAt: assessmentsTable.publishedAt,
        cancelledAt: assessmentsTable.cancelledAt,
        cancellationReason: assessmentsTable.cancellationReason,
        createdAt: assessmentsTable.createdAt,
        updatedAt: assessmentsTable.updatedAt,
      })
      .from(assessmentsTable)
      .where(and(...conditions))
      .orderBy(desc(assessmentsTable.createdAt))
      .limit(limit)
      .offset(offset);

    // Enrich with question count for each assessment
    const enriched = await Promise.all(
      assessments.map(async (a) => {
        const [qCount] = await db
          .select({ count: sql<number>`count(*)`.mapWith(Number) })
          .from(assessmentQuestionsTable)
          .where(eq(assessmentQuestionsTable.assessmentId, a.id));

        const now = Date.now();
        const start = new Date(a.startTime).getTime();
        const end = new Date(a.endTime).getTime();

        let operationalStatus = a.status;
        if (a.status === 'PUBLISHED') {
          if (now < start) {
            operationalStatus = 'SCHEDULED';
          } else if (now >= start && now < end) {
            operationalStatus = 'OPEN';
          } else {
            operationalStatus = 'CLOSED';
          }
        }

        return {
          ...a,
          questionCount: qCount?.count || 0,
          operationalStatus,
        };
      })
    );

    return {
      assessments: enriched,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Retrieves single assessment details with assigned questions.
   */
  getAssessmentDetails: async (
    userId: string,
    userRole: 'LECTURER' | 'STUDENT' | 'SUPER_ADMIN' | 'CONTENT_ADMIN',
    assessmentId: string
  ) => {
    const [assessment] = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        creatorLecturerId: assessmentsTable.creatorLecturerId,
        creatorName: usersTable.fullName,
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
        resultReleasePolicy: assessmentsTable.resultReleasePolicy,
        publishedAt: assessmentsTable.publishedAt,
        cancelledAt: assessmentsTable.cancelledAt,
        cancellationReason: assessmentsTable.cancellationReason,
        createdAt: assessmentsTable.createdAt,
        updatedAt: assessmentsTable.updatedAt,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .leftJoin(usersTable, eq(assessmentsTable.creatorLecturerId, usersTable.id))
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // Role-based authorization
    if (userRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(userId, assessment.offeringId);
    } else if (userRole === 'STUDENT') {
      const eligibility = await eligibilityService.checkStudentEligibility(userId, assessment.offeringId);
      if (!eligibility.isEligible) {
        throw new Error(`Forbidden. ${eligibility.message}`);
      }
      if (assessment.status !== 'PUBLISHED') {
        throw new Error('Assessment not found or not currently available to students.');
      }
    }

    // Retrieve questions
    const rawQuestions = await db
      .select({
        id: assessmentQuestionsTable.id,
        questionId: assessmentQuestionsTable.questionId,
        questionVersion: assessmentQuestionsTable.questionVersion,
        orderIndex: assessmentQuestionsTable.orderIndex,
        allocatedMarks: assessmentQuestionsTable.allocatedMarks,
        snapshot: assessmentQuestionsTable.snapshot,
        // Live question fallback if snapshot not yet generated (DRAFT)
        liveType: questionsTable.type,
        liveQuestion: questionsTable.question,
        liveOptions: questionsTable.options,
        liveCorrectAnswer: questionsTable.correctAnswer,
        liveGradingPoints: questionsTable.gradingPoints,
        liveExplanation: questionsTable.explanation,
        liveDifficulty: questionsTable.difficulty,
        livePoints: questionsTable.points,
      })
      .from(assessmentQuestionsTable)
      .leftJoin(questionsTable, eq(assessmentQuestionsTable.questionId, questionsTable.id))
      .where(eq(assessmentQuestionsTable.assessmentId, assessmentId as any))
      .orderBy(assessmentQuestionsTable.orderIndex);

    const questions = rawQuestions.map((q) => {
      const snap = q.snapshot;
      const questionText = snap?.question || q.liveQuestion || '';
      const type = snap?.type || q.liveType || 'cbt';
      const options = snap?.options || q.liveOptions || [];
      const allocatedMarks = q.allocatedMarks;

      if (userRole === 'STUDENT') {
        // Redact correct answer and rubrics for students
        return {
          id: q.id,
          questionId: q.questionId,
          orderIndex: q.orderIndex,
          allocatedMarks,
          type,
          question: questionText,
          options,
        };
      }

      // Lecturer / Admin view
      return {
        id: q.id,
        questionId: q.questionId,
        orderIndex: q.orderIndex,
        allocatedMarks,
        type,
        question: questionText,
        options,
        correctAnswer: snap?.correctAnswer || q.liveCorrectAnswer,
        gradingPoints: snap?.gradingPoints || q.liveGradingPoints || [],
        explanation: snap?.explanation || q.liveExplanation,
      };
    });

    const now = Date.now();
    const start = new Date(assessment.startTime).getTime();
    const end = new Date(assessment.endTime).getTime();

    let operationalStatus = assessment.status;
    if (assessment.status === 'PUBLISHED') {
      if (now < start) {
        operationalStatus = 'SCHEDULED';
      } else if (now >= start && now < end) {
        operationalStatus = 'OPEN';
      } else {
        operationalStatus = 'CLOSED';
      }
    }

    return {
      ...assessment,
      operationalStatus,
      questions,
    };
  },

  /**
   * Updates an assessment draft before publication.
   */
  updateDraft: async (
    lecturerId: string,
    assessmentId: string,
    updates: UpdateAssessmentDraftInput,
    auditContext?: AuditContextInput
  ) => {
    const [existing] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!existing) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, existing.offeringId);

    if (existing.status !== 'DRAFT') {
      throw new Error(`Cannot modify assessment parameters in ${existing.status} status. Assessment is immutable.`);
    }

    const start = updates.startTime ? new Date(updates.startTime) : new Date(existing.startTime);
    const end = updates.endTime ? new Date(updates.endTime) : new Date(existing.endTime);
    const duration = updates.durationMinutes ?? existing.durationMinutes;

    if (end.getTime() <= start.getTime()) {
      throw new Error('End time must be strictly after start time.');
    }

    const windowMinutes = (end.getTime() - start.getTime()) / (60 * 1000);
    if (windowMinutes < duration) {
      throw new Error('Assessment availability window cannot be shorter than attempt duration.');
    }

    const [updated] = await db
      .update(assessmentsTable)
      .set({
        title: updates.title !== undefined ? updates.title.trim() : existing.title,
        description: updates.description !== undefined ? (updates.description ? updates.description.trim() : null) : existing.description,
        type: updates.type || existing.type,
        durationMinutes: duration,
        startTime: start,
        endTime: end,
        passMarks: updates.passMarks !== undefined ? updates.passMarks : existing.passMarks,
        maxAttempts: updates.maxAttempts !== undefined ? updates.maxAttempts : existing.maxAttempts,
        isRandomized: updates.isRandomized !== undefined ? updates.isRandomized : existing.isRandomized,
        allowLateSubmission: updates.allowLateSubmission !== undefined ? updates.allowLateSubmission : existing.allowLateSubmission,
        lateSubmissionDeadline: updates.lateSubmissionDeadline !== undefined ? (updates.lateSubmissionDeadline ? new Date(updates.lateSubmissionDeadline) : null) : existing.lateSubmissionDeadline,
        resultReleasePolicy: updates.resultReleasePolicy || existing.resultReleasePolicy,
        notificationAudienceType: updates.notificationAudienceType || existing.notificationAudienceType,
        requiredProductId: updates.requiredProductId !== undefined ? updates.requiredProductId : existing.requiredProductId,
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessmentId as any))
      .returning();

    await db.insert(assessmentAuditLogsTable).values({
      assessmentId,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'UPDATED',
      previousState: existing,
      newState: updated,
      reason: 'Updated draft configuration',
    });

    return updated;
  },

  /**
   * Assigns, replaces, or reorders questions for an assessment in DRAFT.
   */
  assignQuestions: async (
    lecturerId: string,
    assessmentId: string,
    questionItems: QuestionAssignmentItem[],
    auditContext?: AuditContextInput
  ) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, assessment.offeringId);

    if (assessment.status !== 'DRAFT') {
      throw new Error(`Cannot modify questions for an assessment in ${assessment.status} status.`);
    }

    if (!questionItems || questionItems.length === 0) {
      throw new Error('At least one question is required.');
    }

    // Verify all questions exist and are either:
    // A) In catalogue course with status = 'PUBLISHED', OR
    // B) Authored by this lecturer for this offering
    const questionIds = questionItems.map((q) => q.questionId);
    const validQuestions = await db
      .select({
        id: questionsTable.id,
        courseId: questionsTable.courseId,
        originOfferingId: questionsTable.originOfferingId,
        authorLecturerId: questionsTable.authorLecturerId,
        status: questionsTable.status,
        currentVersion: questionsTable.currentVersion,
      })
      .from(questionsTable)
      .where(inArray(questionsTable.id, questionIds as any));

    if (validQuestions.length !== questionIds.length) {
      throw new Error('One or more selected questions could not be found.');
    }

    for (const q of validQuestions) {
      const isCatalogueCourseMatch = q.courseId === assessment.courseId;
      const isOfferingMatch = q.originOfferingId === assessment.offeringId;
      const isAuthor = q.authorLecturerId === lecturerId;
      const isPublished = q.status === 'PUBLISHED';

      if (!isCatalogueCourseMatch && !isOfferingMatch) {
        throw new Error(`Question ${q.id} does not belong to course or offering of this assessment.`);
      }

      // If it's not published in catalogue bank, it must be authored by this lecturer for this offering
      if (!isPublished && (!isOfferingMatch || !isAuthor)) {
        throw new Error(`Question ${q.id} is an unapproved draft from another author.`);
      }
    }

    // Atomic replacement of assessment questions
    let totalMarks = 0;
    const valuesToInsert = questionItems.map((item, idx) => {
      const qMeta = validQuestions.find((vq) => vq.id === item.questionId);
      const allocated = item.allocatedMarks ?? 1;
      totalMarks += allocated;
      return {
        assessmentId: assessment.id,
        questionId: item.questionId as any,
        questionVersion: qMeta?.currentVersion || 1,
        orderIndex: item.orderIndex ?? idx,
        allocatedMarks: allocated,
      };
    });

    await db.transaction(async (tx) => {
      await tx
        .delete(assessmentQuestionsTable)
        .where(eq(assessmentQuestionsTable.assessmentId, assessment.id));

      await tx.insert(assessmentQuestionsTable).values(valuesToInsert);

      await tx
        .update(assessmentsTable)
        .set({
          totalMarks,
          updatedAt: new Date(),
        })
        .where(eq(assessmentsTable.id, assessment.id));
    });

    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'QUESTIONS_CHANGED',
      newState: { questionCount: questionItems.length, totalMarks },
      reason: `Assigned ${questionItems.length} questions to assessment`,
    });

    return {
      assessmentId: assessment.id,
      questionCount: questionItems.length,
      totalMarks,
    };
  },

  /**
   * Publishes an assessment, generating frozen question snapshots and notifying enrolled students.
   */
  publishAssessment: async (
    lecturerId: string,
    assessmentId: string,
    auditContext?: AuditContextInput
  ) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, assessment.offeringId);

    if (assessment.status !== 'DRAFT') {
      throw new Error(`Assessment is already in ${assessment.status} status.`);
    }

    // 1. Validate schedule
    const now = Date.now();
    const start = new Date(assessment.startTime).getTime();
    const end = new Date(assessment.endTime).getTime();

    if (start <= now) {
      throw new Error('Assessment start time must be set in the future before publication.');
    }

    if (end <= start) {
      throw new Error('Assessment end time must be after start time.');
    }

    const windowMinutes = (end - start) / (60 * 1000);
    if (windowMinutes < assessment.durationMinutes) {
      throw new Error('Availability window cannot be shorter than attempt duration.');
    }

    // 2. Validate questions exist
    const assigned = await db
      .select({
        id: assessmentQuestionsTable.id,
        questionId: assessmentQuestionsTable.questionId,
        allocatedMarks: assessmentQuestionsTable.allocatedMarks,
        // Question source
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        imageUrl: questionsTable.imageUrl,
        points: questionsTable.points,
      })
      .from(assessmentQuestionsTable)
      .innerJoin(questionsTable, eq(assessmentQuestionsTable.questionId, questionsTable.id))
      .where(eq(assessmentQuestionsTable.assessmentId, assessment.id));

    if (assigned.length === 0) {
      throw new Error('Cannot publish an assessment with zero questions. Assign at least 1 question.');
    }

    // 3. Freeze snapshots for each assigned question
    await db.transaction(async (tx) => {
      for (const item of assigned) {
        const snapshot: QuestionSnapshot = {
          type: item.type,
          question: item.question,
          options: item.options,
          correctAnswer: item.correctAnswer,
          gradingPoints: item.gradingPoints || [],
          explanation: item.explanation,
          imageUrl: item.imageUrl,
          points: item.allocatedMarks,
        };

        await tx
          .update(assessmentQuestionsTable)
          .set({ snapshot })
          .where(eq(assessmentQuestionsTable.id, item.id));
      }

      await tx
        .update(assessmentsTable)
        .set({
          status: 'PUBLISHED',
          publishedAt: new Date(),
          publishedBy: lecturerId as any,
          updatedAt: new Date(),
        })
        .where(eq(assessmentsTable.id, assessment.id));
    });

    // 4. Record audit log
    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'PUBLISHED',
      previousState: { status: 'DRAFT' },
      newState: { status: 'PUBLISHED', publishedAt: new Date() },
      reason: 'Lecturer published assessment with frozen question snapshots',
    });

    // 5. Query course code for notification
    const [course] = await db
      .select({ code: coursesTable.code })
      .from(coursesTable)
      .where(eq(coursesTable.id, assessment.courseId));

    // 6. Notify all eligible enrolled students (respecting product-aware targeting)
    try {
      const enrollments = await db
        .select({ studentId: studentEnrollmentsTable.studentId })
        .from(studentEnrollmentsTable)
        .where(
          and(
            eq(studentEnrollmentsTable.offeringId, assessment.offeringId),
            eq(studentEnrollmentsTable.status, 'ENROLLED')
          )
        );

      let eligibleStudentIds = enrollments.map((e) => String(e.studentId));

      // Product-aware filtering: If assessment requires an active entitlement, intersect enrolled students
      if (
        assessment.notificationAudienceType === 'PRODUCT_ENTITLED' &&
        assessment.requiredProductId &&
        eligibleStudentIds.length > 0
      ) {
        const now = new Date();
        const activeEntitled = await db
          .select({ userId: userEntitlementsTable.userId })
          .from(userEntitlementsTable)
          .where(
            and(
              inArray(userEntitlementsTable.userId, eligibleStudentIds as any),
              eq(userEntitlementsTable.productId, assessment.requiredProductId),
              eq(userEntitlementsTable.status, 'ACTIVE'),
              or(
                sql`${userEntitlementsTable.expiryDate} IS NULL`,
                sql`${userEntitlementsTable.expiryDate} > ${now}`
              )
            )
          );
        eligibleStudentIds = activeEntitled.map((e) => String(e.userId));
      }

      const courseCode = course?.code || 'Course';
      const notificationTitle = `New Assessment Scheduled: ${courseCode}`;
      const notificationBody = `"${assessment.title}" has been scheduled for ${new Date(assessment.startTime).toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}.`;

      for (const studentId of eligibleStudentIds) {
        notificationService
          .createNotification({
            userId: studentId,
            type: 'assessment.published',
            title: notificationTitle,
            body: notificationBody,
            data: {
              assessmentId: assessment.id,
              offeringId: assessment.offeringId,
              courseCode,
              title: assessment.title,
              startTime: assessment.startTime,
              durationMinutes: assessment.durationMinutes,
              audienceType: assessment.notificationAudienceType,
              requiredProductId: assessment.requiredProductId,
            },
          })
          .catch((err) => {
            logger.warn(`[NOTIFICATION] Failed to send assessment notification to ${studentId}: ${err.message}`);
          });
      }
    } catch (notifErr: any) {
      logger.warn(`[NOTIFICATION] Error dispatching assessment published notifications: ${notifErr.message}`);
    }

    const [published] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessment.id));

    return published;
  },

  /**
   * Reschedules an assessment before it opens.
   */
  rescheduleAssessment: async (
    lecturerId: string,
    assessmentId: string,
    newStartTime: string | Date,
    newEndTime: string | Date,
    reason?: string,
    auditContext?: AuditContextInput
  ) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, assessment.offeringId);

    const now = Date.now();
    const currentStart = new Date(assessment.startTime).getTime();

    // Cannot reschedule if already open or closed
    if (assessment.status === 'PUBLISHED' && now >= currentStart) {
      throw new Error('Cannot reschedule an assessment that is already open or past its start time. Use time extension instead.');
    }

    if (assessment.status === 'CANCELLED' || assessment.status === 'ARCHIVED') {
      throw new Error(`Cannot reschedule an assessment in ${assessment.status} status.`);
    }

    const start = new Date(newStartTime);
    const end = new Date(newEndTime);

    if (start.getTime() <= now) {
      throw new Error('New start time must be set in the future.');
    }

    if (end.getTime() <= start.getTime()) {
      throw new Error('End time must be strictly after start time.');
    }

    const windowMinutes = (end.getTime() - start.getTime()) / (60 * 1000);
    if (windowMinutes < assessment.durationMinutes) {
      throw new Error('Availability window cannot be shorter than attempt duration.');
    }

    const [updated] = await db
      .update(assessmentsTable)
      .set({
        startTime: start,
        endTime: end,
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'RESCHEDULED',
      previousState: { startTime: assessment.startTime, endTime: assessment.endTime },
      newState: { startTime: start, endTime: end },
      reason: reason || 'Lecturer rescheduled assessment window',
    });

    // Notify enrolled students if assessment was already published
    if (assessment.status === 'PUBLISHED') {
      try {
        const enrollments = await db
          .select({ studentId: studentEnrollmentsTable.studentId })
          .from(studentEnrollmentsTable)
          .where(
            and(
              eq(studentEnrollmentsTable.offeringId, assessment.offeringId),
              eq(studentEnrollmentsTable.status, 'ENROLLED')
            )
          );

        for (const enr of enrollments) {
          notificationService
            .createNotification({
              userId: enr.studentId,
              type: 'assessment.rescheduled',
              title: `Assessment Rescheduled: ${assessment.title}`,
              body: `The schedule for "${assessment.title}" has been updated to ${start.toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}.`,
              data: { assessmentId: assessment.id, offeringId: assessment.offeringId, newStartTime: start },
            })
            .catch(() => {});
        }
      } catch (err) {}
    }

    return updated;
  },

  /**
   * Extends the closing deadline of an active assessment while OPEN.
   */
  extendAssessment: async (
    lecturerId: string,
    assessmentId: string,
    newEndTime: string | Date,
    reason?: string,
    auditContext?: AuditContextInput
  ) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, assessment.offeringId);

    const now = Date.now();
    const currentEnd = new Date(assessment.endTime).getTime();
    const extendedEnd = new Date(newEndTime);

    if (extendedEnd.getTime() <= now) {
      throw new Error('Extended end time cannot be set in the past.');
    }

    if (extendedEnd.getTime() <= currentEnd) {
      throw new Error('Extended end time must be greater than current end time.');
    }

    const [updated] = await db
      .update(assessmentsTable)
      .set({
        endTime: extendedEnd,
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: auditContext?.actorRole || 'LECTURER',
      action: 'TIME_EXTENDED',
      previousState: { endTime: assessment.endTime },
      newState: { endTime: extendedEnd },
      reason: reason || 'Lecturer extended assessment deadline',
    });

    return updated;
  },

  /**
   * Cancels an assessment with a recorded audit reason.
   */
  cancelAssessment: async (
    userId: string,
    userRole: 'LECTURER' | 'SUPER_ADMIN',
    assessmentId: string,
    reason: string,
    auditContext?: AuditContextInput
  ) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    if (userRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(userId, assessment.offeringId);
    }

    if (assessment.status === 'CANCELLED' || assessment.status === 'ARCHIVED') {
      throw new Error(`Assessment is already ${assessment.status.toLowerCase()}.`);
    }

    const [cancelled] = await db
      .update(assessmentsTable)
      .set({
        status: 'CANCELLED',
        cancelledAt: new Date(),
        cancellationReason: reason.trim(),
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: userId as any,
      actorRole: auditContext?.actorRole || userRole,
      action: userRole === 'SUPER_ADMIN' ? 'ADMIN_OVERRIDE_SUSPEND' : 'CANCELLED',
      previousState: { status: assessment.status },
      newState: { status: 'CANCELLED', cancelledAt: new Date(), reason },
      reason,
    });

    // Notify enrolled students if it was previously published
    if (assessment.status === 'PUBLISHED') {
      try {
        const enrollments = await db
          .select({ studentId: studentEnrollmentsTable.studentId })
          .from(studentEnrollmentsTable)
          .where(
            and(
              eq(studentEnrollmentsTable.offeringId, assessment.offeringId),
              eq(studentEnrollmentsTable.status, 'ENROLLED')
            )
          );

        for (const enr of enrollments) {
          notificationService
            .createNotification({
              userId: enr.studentId,
              type: 'assessment.cancelled',
              title: `Assessment Cancelled: ${assessment.title}`,
              body: `The assessment "${assessment.title}" has been cancelled. Reason: ${reason}`,
              data: { assessmentId: assessment.id, offeringId: assessment.offeringId },
            })
            .catch(() => {});
        }
      } catch (err) {}
    }

    return cancelled;
  },

  /**
   * Retrieves active/upcoming published assessments for an eligible enrolled student.
   */
  getStudentAvailableAssessments: async (studentId: string, offeringId: string) => {
    const eligibility = await eligibilityService.checkStudentEligibility(studentId, offeringId);
    if (!eligibility.isEligible) {
      throw new Error(`Forbidden. ${eligibility.message}`);
    }

    const assessments = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
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
        publishedAt: assessmentsTable.publishedAt,
      })
      .from(assessmentsTable)
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(assessmentsTable.offeringId, offeringId as any),
          eq(assessmentsTable.status, 'PUBLISHED')
        )
      )
      .orderBy(assessmentsTable.startTime);

    const now = Date.now();
    return assessments.map((a) => {
      const start = new Date(a.startTime).getTime();
      const end = new Date(a.endTime).getTime();

      let operationalStatus: 'UPCOMING' | 'OPEN' | 'CLOSED' = 'UPCOMING';
      if (now >= start && now < end) {
        operationalStatus = 'OPEN';
      } else if (now >= end) {
        operationalStatus = 'CLOSED';
      }

      return {
        ...a,
        operationalStatus,
      };
    });
  },

  /**
   * Admin global oversight query across all academic offerings.
   */
  adminListAssessments: async (options: {
    academicSession?: string | undefined;
    semester?: string | undefined;
    departmentId?: string | undefined;
    facultyId?: string | undefined;
    status?: string | undefined;
    search?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
  } = {}) => {
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions: any[] = [];

    if (options.status) {
      conditions.push(eq(assessmentsTable.status, options.status as AssessmentStatus));
    }
    if (options.academicSession) {
      conditions.push(eq(courseOfferingsTable.academicSession, options.academicSession));
    }
    if (options.semester) {
      conditions.push(eq(courseOfferingsTable.semester, options.semester.toLowerCase()));
    }
    if (options.departmentId) {
      conditions.push(eq(coursesTable.departmentId, options.departmentId as any));
    }
    if (options.facultyId) {
      conditions.push(eq(departmentsTable.facultyId, options.facultyId as any));
    }
    if (options.search) {
      const pattern = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(assessmentsTable.title, pattern),
          ilike(coursesTable.code, pattern),
          ilike(coursesTable.title, pattern)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(whereClause);

    const total = countResult?.count || 0;

    const assessments = await db
      .select({
        id: assessmentsTable.id,
        offeringId: assessmentsTable.offeringId,
        courseId: assessmentsTable.courseId,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        departmentName: departmentsTable.name,
        creatorLecturerId: assessmentsTable.creatorLecturerId,
        creatorName: usersTable.fullName,
        creatorEmail: usersTable.email,
        title: assessmentsTable.title,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        durationMinutes: assessmentsTable.durationMinutes,
        startTime: assessmentsTable.startTime,
        endTime: assessmentsTable.endTime,
        publishedAt: assessmentsTable.publishedAt,
        cancelledAt: assessmentsTable.cancelledAt,
        cancellationReason: assessmentsTable.cancellationReason,
        createdAt: assessmentsTable.createdAt,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .leftJoin(usersTable, eq(assessmentsTable.creatorLecturerId, usersTable.id))
      .where(whereClause)
      .orderBy(desc(assessmentsTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      assessments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Retrieves audit logs for a specific assessment.
   */
  getAssessmentAuditLogs: async (assessmentId: string) => {
    return await db
      .select({
        id: assessmentAuditLogsTable.id,
        assessmentId: assessmentAuditLogsTable.assessmentId,
        actorId: assessmentAuditLogsTable.actorId,
        actorRole: assessmentAuditLogsTable.actorRole,
        actorName: usersTable.fullName,
        actorEmail: usersTable.email,
        action: assessmentAuditLogsTable.action,
        previousState: assessmentAuditLogsTable.previousState,
        newState: assessmentAuditLogsTable.newState,
        reason: assessmentAuditLogsTable.reason,
        createdAt: assessmentAuditLogsTable.createdAt,
      })
      .from(assessmentAuditLogsTable)
      .leftJoin(usersTable, eq(assessmentAuditLogsTable.actorId, usersTable.id))
      .where(eq(assessmentAuditLogsTable.assessmentId, assessmentId as any))
      .orderBy(desc(assessmentAuditLogsTable.createdAt));
  },
};
