import { db } from '../db/index.js';
import {
  assessmentsTable,
  assessmentAttemptsTable,
  assessmentGradesTable,
  assessmentQuestionGradesTable,
  assessmentGradingAuditLogsTable,
  courseOfferingsTable,
  coursesTable,
  usersTable,
  studentEnrollmentsTable,
  offeringLecturersTable,
  departmentsTable,
  facultiesTable,
  RESULTS_PUBLICATION_STATUS,
  type ResultsPublicationStatus,
} from '../db/schema.js';
import {
  eq,
  and,
  or,
  inArray,
  desc,
  asc,
  sql,
  ilike,
} from 'drizzle-orm';
import { notificationService } from './notificationService.js';
import { assessmentService } from './assessmentService.js';
import logger from '../config/logger.js';

export const gradebookService = {
  /**
   * Retrieves centralized cohort gradebook for an authorized course offering.
   */
  getOfferingGradebook: async (
    lecturerId: string,
    offeringId: string,
    options: { page?: number | undefined; limit?: number | undefined; search?: string | undefined } = {}
  ) => {
    // 1. Enforce lecturer authorization on the backend
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    // 2. Fetch offering details with course, department, faculty
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        offeringId: courseOfferingsTable.id,
        courseId: coursesTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: courseOfferingsTable.level,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        departmentName: departmentsTable.name,
        facultyName: facultiesTable.name,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .leftJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // 3. Fetch all active/published assessments for this offering
    const assessments = await db
      .select({
        id: assessmentsTable.id,
        title: assessmentsTable.title,
        type: assessmentsTable.type,
        status: assessmentsTable.status,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        resultsPublicationStatus: assessmentsTable.resultsPublicationStatus,
        resultsPublishedAt: assessmentsTable.resultsPublishedAt,
      })
      .from(assessmentsTable)
      .where(
        and(
          eq(assessmentsTable.offeringId, offeringId as any),
          eq(assessmentsTable.status, 'PUBLISHED')
        )
      )
      .orderBy(asc(assessmentsTable.createdAt));

    // 4. Fetch enrolled students with search & pagination
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 50));
    const offset = (page - 1) * limit;

    const studentConditions = [
      eq(studentEnrollmentsTable.offeringId, offeringId as any),
      eq(studentEnrollmentsTable.status, 'ENROLLED'),
    ];

    if (options.search?.trim()) {
      const term = `%${options.search.trim()}%`;
      studentConditions.push(
        or(
          ilike(usersTable.fullName, term),
          ilike(usersTable.username, term),
          ilike(usersTable.email, term)
        )!
      );
    }

    const [countResult] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .where(and(...studentConditions));

    const totalStudents = countResult?.count || 0;

    const students = await db
      .select({
        studentId: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        matricNumber: usersTable.username,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .where(and(...studentConditions))
      .orderBy(asc(usersTable.fullName))
      .limit(limit)
      .offset(offset);

    // 5. Fetch grades for these students across the offering's assessments
    const assessmentIds = assessments.map((a) => a.id);
    const studentIds = students.map((s) => s.studentId);

    const grades =
      assessmentIds.length > 0 && studentIds.length > 0
        ? await db
            .select({
              id: assessmentGradesTable.id,
              attemptId: assessmentGradesTable.attemptId,
              assessmentId: assessmentGradesTable.assessmentId,
              studentId: assessmentGradesTable.studentId,
              cbtScore: assessmentGradesTable.cbtScore,
              theoryScore: assessmentGradesTable.theoryScore,
              totalScore: assessmentGradesTable.totalScore,
              maxPossibleScore: assessmentGradesTable.maxPossibleScore,
              percentage: assessmentGradesTable.percentage,
              isPassing: assessmentGradesTable.isPassing,
              status: assessmentGradesTable.status,
              isModerated: assessmentGradesTable.isModerated,
              isFlaggedForReview: assessmentGradesTable.isFlaggedForReview,
            })
            .from(assessmentGradesTable)
            .where(
              and(
                inArray(assessmentGradesTable.assessmentId, assessmentIds as any[]),
                inArray(assessmentGradesTable.studentId, studentIds as any[])
              )
            )
        : [];

    const gradeMap = new Map<string, (typeof grades)[0]>();
    grades.forEach((g) => {
      gradeMap.set(`${g.studentId}:${g.assessmentId}`, g);
    });

    const studentRows = students.map((student) => {
      const assessmentResults = assessments.map((a) => {
        const grade = gradeMap.get(`${student.studentId}:${a.id}`);
        return {
          assessmentId: a.id,
          assessmentTitle: a.title,
          totalMarks: a.totalMarks,
          passMarks: a.passMarks,
          resultsPublicationStatus: a.resultsPublicationStatus,
          isSubmitted: !!grade,
          gradeId: grade?.id || null,
          attemptId: grade?.attemptId || null,
          totalScore: grade ? grade.totalScore : null,
          maxPossibleScore: grade ? grade.maxPossibleScore : a.totalMarks,
          percentage: grade ? grade.percentage : null,
          isPassing: grade ? grade.isPassing : null,
          gradingStatus: grade ? grade.status : 'NOT_SUBMITTED',
          isModerated: grade ? grade.isModerated : false,
          isFlaggedForReview: grade ? grade.isFlaggedForReview : false,
        };
      });

      // Compute student's average percentage across submitted assessments
      const evaluatedGrades = assessmentResults.filter((ar) => ar.percentage !== null);
      const studentAvgPercentage =
        evaluatedGrades.length > 0
          ? Math.round(
              (evaluatedGrades.reduce((sum, item) => sum + (item.percentage || 0), 0) /
                evaluatedGrades.length) *
                100
            ) / 100
          : null;

      return {
        student,
        assessments: assessmentResults,
        averagePercentage: studentAvgPercentage,
      };
    });

    // 6. Overall offering statistics
    const allPercentages = grades.map((g) => g.percentage);
    const cohortAveragePercentage =
      allPercentages.length > 0
        ? Math.round(
            (allPercentages.reduce((a, b) => a + b, 0) / allPercentages.length) * 100
          ) / 100
        : 0;

    const passingGrades = grades.filter((g) => g.isPassing === true).length;
    const cohortPassRate =
      grades.length > 0 ? Math.round((passingGrades / grades.length) * 10000) / 100 : 0;

    return {
      offering,
      assessments,
      students: studentRows,
      summary: {
        totalEnrolledStudents: totalStudents,
        totalAssessments: assessments.length,
        totalEvaluatedGrades: grades.length,
        cohortAveragePercentage,
        cohortPassRate,
      },
      stats: {
        totalStudents,
        totalAssessments: assessments.length,
        cohortPassRate,
      },
      pagination: {
        page,
        limit,
        total: totalStudents,
        totalPages: Math.ceil(totalStudents / limit) || 1,
      },
    };
  },

  /**
   * Retrieves assessment-specific gradebook and moderation workspace.
   */
  getAssessmentGradebook: async (
    userId: string,
    userRole: 'LECTURER' | 'ADMIN',
    assessmentId: string,
    options: {
      page?: number | undefined;
      limit?: number | undefined;
      search?: string | undefined;
      status?: string | undefined;
    } = {}
  ) => {
    // 1. Fetch assessment details
    const [assessment] = await db
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
        resultReleasePolicy: assessmentsTable.resultReleasePolicy,
        resultsPublicationStatus: assessmentsTable.resultsPublicationStatus,
        resultsSubmittedAt: assessmentsTable.resultsSubmittedAt,
        resultsSubmittedBy: assessmentsTable.resultsSubmittedBy,
        resultsApprovedAt: assessmentsTable.resultsApprovedAt,
        resultsApprovedBy: assessmentsTable.resultsApprovedBy,
        resultsRejectedAt: assessmentsTable.resultsRejectedAt,
        resultsRejectedBy: assessmentsTable.resultsRejectedBy,
        resultsRejectionReason: assessmentsTable.resultsRejectionReason,
        resultsPublishedAt: assessmentsTable.resultsPublishedAt,
        resultsPublishedBy: assessmentsTable.resultsPublishedBy,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        level: courseOfferingsTable.level,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        departmentName: departmentsTable.name,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // 2. Authorization check
    if (userRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(userId, assessment.offeringId);
    }

    // 3. Query assessment grades with student information
    const page = Math.max(1, Number(options.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(options.limit) || 50));
    const offset = (page - 1) * limit;

    const conditions = [eq(assessmentGradesTable.assessmentId, assessmentId as any)];

    if (options.status?.trim()) {
      const st = options.status.trim().toUpperCase();
      if (st === 'MODERATED') {
        conditions.push(eq(assessmentGradesTable.isModerated, true));
      } else if (st === 'FLAGGED') {
        conditions.push(eq(assessmentGradesTable.isFlaggedForReview, true));
      } else {
        conditions.push(eq(assessmentGradesTable.status, st));
      }
    }

    if (options.search?.trim()) {
      const term = `%${options.search.trim()}%`;
      conditions.push(
        or(
          ilike(usersTable.fullName, term),
          ilike(usersTable.username, term),
          ilike(usersTable.email, term)
        )!
      );
    }

    const [countResult] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(assessmentGradesTable)
      .innerJoin(usersTable, eq(assessmentGradesTable.studentId, usersTable.id))
      .where(and(...conditions));

    const total = countResult?.count || 0;

    const grades = await db
      .select({
        id: assessmentGradesTable.id,
        attemptId: assessmentGradesTable.attemptId,
        studentId: assessmentGradesTable.studentId,
        studentName: usersTable.fullName,
        studentEmail: usersTable.email,
        matricNumber: usersTable.username,
        cbtScore: assessmentGradesTable.cbtScore,
        theoryScore: assessmentGradesTable.theoryScore,
        totalScore: assessmentGradesTable.totalScore,
        maxPossibleScore: assessmentGradesTable.maxPossibleScore,
        percentage: assessmentGradesTable.percentage,
        isPassing: assessmentGradesTable.isPassing,
        status: assessmentGradesTable.status,
        isModerated: assessmentGradesTable.isModerated,
        moderatedBy: assessmentGradesTable.moderatedBy,
        moderatedAt: assessmentGradesTable.moderatedAt,
        moderationNotes: assessmentGradesTable.moderationNotes,
        isFlaggedForReview: assessmentGradesTable.isFlaggedForReview,
        flagReason: assessmentGradesTable.flagReason,
        finalGradedAt: assessmentGradesTable.finalGradedAt,
        attemptSubmittedAt: assessmentAttemptsTable.submittedAt,
      })
      .from(assessmentGradesTable)
      .innerJoin(usersTable, eq(assessmentGradesTable.studentId, usersTable.id))
      .innerJoin(assessmentAttemptsTable, eq(assessmentGradesTable.attemptId, assessmentAttemptsTable.id))
      .where(and(...conditions))
      .orderBy(asc(usersTable.fullName))
      .limit(limit)
      .offset(offset);

    // 4. Compute comprehensive telemetry for this assessment
    const allGrades = await db
      .select({
        status: assessmentGradesTable.status,
        totalScore: assessmentGradesTable.totalScore,
        percentage: assessmentGradesTable.percentage,
        isPassing: assessmentGradesTable.isPassing,
        isModerated: assessmentGradesTable.isModerated,
        isFlaggedForReview: assessmentGradesTable.isFlaggedForReview,
      })
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.assessmentId, assessmentId as any));

    let autoGradedCount = 0;
    let needsTheoryCount = 0;
    let completedCount = 0;
    let partiallyGradedCount = 0;
    let moderatedCount = 0;
    let flaggedCount = 0;
    let passCount = 0;
    let failCount = 0;
    let scoreSum = 0;

    allGrades.forEach((g) => {
      if (g.status === 'AUTO_GRADED') autoGradedCount++;
      if (g.status === 'NEEDS_THEORY_GRADING') needsTheoryCount++;
      if (g.status === 'COMPLETED') completedCount++;
      if (g.status === 'PARTIALLY_GRADED') partiallyGradedCount++;
      if (g.isModerated) moderatedCount++;
      if (g.isFlaggedForReview) flaggedCount++;
      if (g.isPassing === true) passCount++;
      if (g.isPassing === false) failCount++;
      scoreSum += g.totalScore;
    });

    const averageScore =
      allGrades.length > 0 ? Math.round((scoreSum / allGrades.length) * 100) / 100 : 0;
    const passRate =
      allGrades.length > 0 ? Math.round((passCount / allGrades.length) * 10000) / 100 : 0;

    // 5. Audit history for this assessment
    const auditLogs = await db
      .select({
        id: assessmentGradingAuditLogsTable.id,
        attemptId: assessmentGradingAuditLogsTable.attemptId,
        actorId: assessmentGradingAuditLogsTable.actorId,
        actorRole: assessmentGradingAuditLogsTable.actorRole,
        action: assessmentGradingAuditLogsTable.action,
        previousScore: assessmentGradingAuditLogsTable.previousScore,
        newScore: assessmentGradingAuditLogsTable.newScore,
        previousStatus: assessmentGradingAuditLogsTable.previousStatus,
        newStatus: assessmentGradingAuditLogsTable.newStatus,
        reason: assessmentGradingAuditLogsTable.reason,
        metadata: assessmentGradingAuditLogsTable.metadata,
        createdAt: assessmentGradingAuditLogsTable.createdAt,
        actorName: usersTable.fullName,
      })
      .from(assessmentGradingAuditLogsTable)
      .leftJoin(usersTable, eq(assessmentGradingAuditLogsTable.actorId, usersTable.id))
      .where(
        or(
          eq(assessmentGradingAuditLogsTable.assessmentId, assessmentId as any),
          inArray(
            assessmentGradingAuditLogsTable.attemptId,
            grades.map((g) => g.attemptId) as any[]
          )
        )
      )
      .orderBy(desc(assessmentGradingAuditLogsTable.createdAt))
      .limit(50);

    return {
      assessment,
      grades,
      stats: {
        totalSubmissions: allGrades.length,
        autoGradedCount,
        needsTheoryCount,
        completedCount,
        partiallyGradedCount,
        moderatedCount,
        flaggedCount,
        passCount,
        failCount,
        averageScore,
        passRate,
        isReadyForApproval:
          allGrades.length > 0 && needsTheoryCount === 0 && partiallyGradedCount === 0,
      },
      auditLogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Moderates a student grade with audit logging and optional score adjustments.
   */
  moderateGrade: async (
    moderatorId: string,
    moderatorRole: 'LECTURER' | 'ADMIN',
    assessmentId: string,
    gradeId: string,
    data: {
      newScore?: number;
      isFlaggedForReview?: boolean;
      flagReason?: string;
      moderationNotes?: string;
      reason: string;
    }
  ) => {
    // 1. Fetch grade record and associated assessment
    const [grade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(
        and(
          eq(assessmentGradesTable.id, gradeId as any),
          eq(assessmentGradesTable.assessmentId, assessmentId as any)
        )
      );

    if (!grade) {
      throw new Error('Grade record not found.');
    }

    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // 2. Verify authorization
    if (moderatorRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(moderatorId, assessment.offeringId);
    }

    // 3. Disallow silent modifications if results are already published
    if (assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.PUBLISHED) {
      if (moderatorRole !== 'ADMIN') {
        throw new Error('Forbidden. Published assessment results cannot be modified by lecturers without administrative authorization.');
      }
    }

    // 4. Score bounds validation if adjusting score
    const updates: Record<string, any> = {
      isModerated: true,
      moderatedBy: moderatorId as any,
      moderatedAt: new Date(),
      updatedAt: new Date(),
    };

    if (data.moderationNotes !== undefined) {
      updates.moderationNotes = data.moderationNotes ? data.moderationNotes.trim() : null;
    }

    if (data.isFlaggedForReview !== undefined) {
      updates.isFlaggedForReview = data.isFlaggedForReview;
      updates.flagReason = data.isFlaggedForReview && data.flagReason ? data.flagReason.trim() : null;
    }

    let previousScore = grade.totalScore;
    let newScore = grade.totalScore;

    if (data.newScore !== undefined) {
      if (data.newScore < 0 || data.newScore > grade.maxPossibleScore) {
        throw new Error(
          `Moderated score (${data.newScore}) must be between 0 and maximum marks (${grade.maxPossibleScore}).`
        );
      }
      newScore = data.newScore;
      updates.totalScore = newScore;
      updates.percentage =
        grade.maxPossibleScore > 0
          ? Math.round((newScore / grade.maxPossibleScore) * 10000) / 100
          : 0;

      if (assessment.passMarks !== null && assessment.passMarks !== undefined) {
        updates.isPassing = newScore >= assessment.passMarks;
      }
    }

    // 5. Update grade record
    const [updatedGrade] = await db
      .update(assessmentGradesTable)
      .set(updates)
      .where(eq(assessmentGradesTable.id, grade.id))
      .returning();

    // 6. Record immutable moderation audit log entry
    await db.insert(assessmentGradingAuditLogsTable).values({
      assessmentId: assessment.id,
      attemptId: grade.attemptId,
      actorId: moderatorId as any,
      actorRole: moderatorRole,
      action: data.isFlaggedForReview ? 'FLAGGED_FOR_REVIEW' : 'GRADE_MODERATED',
      previousScore,
      newScore,
      previousStatus: grade.status,
      newStatus: grade.status,
      reason: data.reason.trim(),
      metadata: {
        moderationNotes: data.moderationNotes || null,
        isFlaggedForReview: updates.isFlaggedForReview,
        flagReason: updates.flagReason,
      },
    });

    logger.info(
      `[MODERATION] Grade ${grade.id} for assessment ${assessmentId} moderated by ${moderatorRole} ${moderatorId}: score ${previousScore} -> ${newScore}`
    );

    return updatedGrade;
  },

  /**
   * Submits assessment results for administrative publication approval.
   */
  submitAssessmentResultsForApproval: async (
    lecturerId: string,
    assessmentId: string,
    options?: { overrideIncompleteReason?: string }
  ) => {
    // 1. Fetch assessment and check lecturer assignment
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    await assessmentService.verifyLecturerAssignment(lecturerId, assessment.offeringId);

    // 2. Lifecycle state transition validation
    if (
      assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.SUBMITTED_FOR_APPROVAL
    ) {
      throw new Error('Results for this assessment are already submitted and pending administrative approval.');
    }

    if (assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.APPROVED) {
      throw new Error('Results are already approved and awaiting publication release.');
    }

    if (assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.PUBLISHED) {
      throw new Error('Results for this assessment are already officially published.');
    }

    // 3. Inspect attempt completion states
    const attempts = await db
      .select({
        id: assessmentAttemptsTable.id,
        status: assessmentAttemptsTable.status,
        gradingStatus: assessmentGradesTable.status,
      })
      .from(assessmentAttemptsTable)
      .leftJoin(assessmentGradesTable, eq(assessmentAttemptsTable.id, assessmentGradesTable.attemptId))
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessmentId as any),
          or(
            eq(assessmentAttemptsTable.status, 'SUBMITTED'),
            eq(assessmentAttemptsTable.status, 'TIMED_OUT')
          )
        )
      );

    const incompleteCount = attempts.filter(
      (a) => !a.gradingStatus || !['AUTO_GRADED', 'COMPLETED'].includes(a.gradingStatus)
    ).length;

    if (incompleteCount > 0 && !options?.overrideIncompleteReason?.trim()) {
      throw new Error(
        `Cannot submit results for approval: ${incompleteCount} attempt(s) remain pending evaluation. All attempts must be graded or an authorized override reason provided.`
      );
    }

    // 4. Update assessment publication status
    const [updated] = await db
      .update(assessmentsTable)
      .set({
        resultsPublicationStatus: RESULTS_PUBLICATION_STATUS.SUBMITTED_FOR_APPROVAL,
        resultsSubmittedAt: new Date(),
        resultsSubmittedBy: lecturerId as any,
        resultsRejectionReason: null, // Clear any prior rejection reason
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    // 5. Record lifecycle audit entry
    await db.insert(assessmentGradingAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: lecturerId as any,
      actorRole: 'LECTURER',
      action: 'SUBMITTED_FOR_APPROVAL',
      previousStatus: assessment.resultsPublicationStatus,
      newStatus: RESULTS_PUBLICATION_STATUS.SUBMITTED_FOR_APPROVAL,
      reason: options?.overrideIncompleteReason?.trim() || 'All grading verified and submitted for publication approval.',
      metadata: {
        totalAttemptsCount: attempts.length,
        incompleteCount,
        overrideReason: options?.overrideIncompleteReason || null,
      },
    });

    logger.info(`[RESULTS_APPROVAL] Assessment ${assessmentId} submitted for publication approval by lecturer ${lecturerId}`);

    return updated;
  },

  /**
   * Administrator approves submitted results for an assessment.
   */
  adminApproveResults: async (adminUserId: string, assessmentId: string, notes?: string) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    if (assessment.resultsPublicationStatus !== RESULTS_PUBLICATION_STATUS.SUBMITTED_FOR_APPROVAL) {
      throw new Error(
        `Cannot approve results: current status is ${assessment.resultsPublicationStatus}. Results must be in SUBMITTED_FOR_APPROVAL status.`
      );
    }

    const [updated] = await db
      .update(assessmentsTable)
      .set({
        resultsPublicationStatus: RESULTS_PUBLICATION_STATUS.APPROVED,
        resultsApprovedAt: new Date(),
        resultsApprovedBy: adminUserId as any,
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentGradingAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: adminUserId as any,
      actorRole: 'ADMIN',
      action: 'RESULTS_APPROVED',
      previousStatus: assessment.resultsPublicationStatus,
      newStatus: RESULTS_PUBLICATION_STATUS.APPROVED,
      reason: notes?.trim() || 'Administrator approved results for publication.',
    });

    logger.info(`[RESULTS_APPROVED] Assessment ${assessmentId} approved by admin ${adminUserId}`);
    return updated;
  },

  /**
   * Administrator rejects submitted results with a mandatory reason.
   */
  adminRejectResults: async (adminUserId: string, assessmentId: string, reason: string) => {
    if (!reason?.trim() || reason.trim().length < 5) {
      throw new Error('A rejection reason of at least 5 characters is required.');
    }

    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    if (assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.PUBLISHED) {
      throw new Error('Cannot reject results that are already officially published.');
    }

    const [updated] = await db
      .update(assessmentsTable)
      .set({
        resultsPublicationStatus: RESULTS_PUBLICATION_STATUS.REJECTED,
        resultsRejectedAt: new Date(),
        resultsRejectedBy: adminUserId as any,
        resultsRejectionReason: reason.trim(),
        updatedAt: new Date(),
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentGradingAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: adminUserId as any,
      actorRole: 'ADMIN',
      action: 'RESULTS_REJECTED',
      previousStatus: assessment.resultsPublicationStatus,
      newStatus: RESULTS_PUBLICATION_STATUS.REJECTED,
      reason: reason.trim(),
    });

    // Notify submitting lecturer
    const notifyRecipientId = assessment.resultsSubmittedBy || assessment.creatorLecturerId;
    if (notifyRecipientId) {
      await notificationService.createNotification({
        userId: notifyRecipientId,
        type: 'ASSESSMENT_RESULTS_REJECTED',
        title: 'Results Approval Returned',
        body: `Results submission for "${assessment.title}" was returned for review: ${reason.trim()}`,
        data: { assessmentId: assessment.id, reason: reason.trim() },
      });
    }

    logger.info(`[RESULTS_REJECTED] Assessment ${assessmentId} results rejected by admin ${adminUserId}: ${reason}`);
    return updated;
  },

  /**
   * Administrator officially publishes results, unlocking them for students.
   */
  adminPublishResults: async (adminUserId: string, assessmentId: string) => {
    const [assessment] = await db
      .select()
      .from(assessmentsTable)
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // Idempotent return if already published
    if (assessment.resultsPublicationStatus === RESULTS_PUBLICATION_STATUS.PUBLISHED) {
      return assessment;
    }

    if (
      assessment.resultsPublicationStatus !== RESULTS_PUBLICATION_STATUS.APPROVED &&
      assessment.resultsPublicationStatus !== RESULTS_PUBLICATION_STATUS.SUBMITTED_FOR_APPROVAL
    ) {
      throw new Error(
        `Cannot publish results: current status is ${assessment.resultsPublicationStatus}. Results must be approved before publication.`
      );
    }

    const now = new Date();
    const [updated] = await db
      .update(assessmentsTable)
      .set({
        resultsPublicationStatus: RESULTS_PUBLICATION_STATUS.PUBLISHED,
        resultsPublishedAt: now,
        resultsPublishedBy: adminUserId as any,
        resultsReleasedAt: now,
        updatedAt: now,
      })
      .where(eq(assessmentsTable.id, assessment.id))
      .returning();

    await db.insert(assessmentGradingAuditLogsTable).values({
      assessmentId: assessment.id,
      actorId: adminUserId as any,
      actorRole: 'ADMIN',
      action: 'RESULTS_PUBLISHED',
      previousStatus: assessment.resultsPublicationStatus,
      newStatus: RESULTS_PUBLICATION_STATUS.PUBLISHED,
      reason: 'Official results published and released to students.',
    });

    // Notify all enrolled students who participated
    try {
      const studentAttempts = await db
        .select({ studentId: assessmentAttemptsTable.studentId })
        .from(assessmentAttemptsTable)
        .where(eq(assessmentAttemptsTable.assessmentId, assessment.id));

      const uniqueStudentIds = Array.from(new Set(studentAttempts.map((s) => s.studentId)));

      for (const studentId of uniqueStudentIds) {
        await notificationService.createNotification({
          userId: studentId,
          type: 'ASSESSMENT_RESULTS_PUBLISHED',
          title: 'Assessment Results Published',
          body: `Official results for "${assessment.title}" are now available in your results gradebook.`,
          data: { assessmentId: assessment.id },
        });
      }
    } catch (notifyErr: any) {
      logger.warn('[PUBLISH_NOTIFY_ERROR] Failed to send publication notifications: %s', notifyErr?.message);
    }

    logger.info(`[RESULTS_PUBLISHED] Assessment ${assessmentId} results officially released by admin ${adminUserId}`);
    return updated;
  },

  /**
   * Retrieves official published results for the authenticated student.
   * Strictly conceals unpublished marks, keys, and raw internal notes.
   */
  getStudentPublishedResult: async (studentUserId: string, assessmentId: string) => {
    // 1. Fetch assessment details with course information
    const [assessment] = await db
      .select({
        id: assessmentsTable.id,
        title: assessmentsTable.title,
        type: assessmentsTable.type,
        totalMarks: assessmentsTable.totalMarks,
        passMarks: assessmentsTable.passMarks,
        resultsPublicationStatus: assessmentsTable.resultsPublicationStatus,
        resultsPublishedAt: assessmentsTable.resultsPublishedAt,
        resultReleasePolicy: assessmentsTable.resultReleasePolicy,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
      })
      .from(assessmentsTable)
      .innerJoin(courseOfferingsTable, eq(assessmentsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(assessmentsTable.courseId, coursesTable.id))
      .where(eq(assessmentsTable.id, assessmentId as any));

    if (!assessment) {
      throw new Error('Assessment not found.');
    }

    // 2. Strict Unpublished Result Concealment
    if (assessment.resultsPublicationStatus !== RESULTS_PUBLICATION_STATUS.PUBLISHED) {
      return {
        isPublished: false,
        status: 'PENDING_PUBLICATION',
        result: null,
        message: 'Official results for this assessment are undergoing formal evaluation and have not been published yet.',
        assessment: {
          id: assessment.id,
          title: assessment.title,
          courseCode: assessment.courseCode,
          courseTitle: assessment.courseTitle,
          academicSession: assessment.academicSession,
          semester: assessment.semester,
          status: 'AWAITING_PUBLICATION',
        },
      };
    }

    // 3. Fetch student's attempt
    const [attempt] = await db
      .select({
        id: assessmentAttemptsTable.id,
        status: assessmentAttemptsTable.status,
        submittedAt: assessmentAttemptsTable.submittedAt,
      })
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.assessmentId, assessment.id),
          eq(assessmentAttemptsTable.studentId, studentUserId as any)
        )
      )
      .orderBy(desc(assessmentAttemptsTable.createdAt))
      .limit(1);

    if (!attempt) {
      throw new Error('No submitted examination attempt found for this assessment.');
    }

    // 4. Fetch authoritative grade
    const [grade] = await db
      .select({
        totalScore: assessmentGradesTable.totalScore,
        maxPossibleScore: assessmentGradesTable.maxPossibleScore,
        percentage: assessmentGradesTable.percentage,
        isPassing: assessmentGradesTable.isPassing,
        cbtScore: assessmentGradesTable.cbtScore,
        theoryScore: assessmentGradesTable.theoryScore,
        completedAt: assessmentGradesTable.finalGradedAt,
      })
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, attempt.id));

    if (!grade) {
      return {
        isPublished: true,
        hasAttempt: true,
        message: 'Grading is being finalized for this attempt.',
      };
    }

    // 5. Question-level breakdown (excluding answer keys or unpublished staff notes)
    const questionGrades = await db
      .select({
        questionType: assessmentQuestionGradesTable.questionType,
        maxMarks: assessmentQuestionGradesTable.maxMarks,
        awardedMarks: assessmentQuestionGradesTable.awardedMarks,
        isCorrect: assessmentQuestionGradesTable.isCorrect,
        feedback: assessmentQuestionGradesTable.feedback,
        rubricScores: assessmentQuestionGradesTable.rubricScores,
      })
      .from(assessmentQuestionGradesTable)
      .where(eq(assessmentQuestionGradesTable.attemptId, attempt.id));

    return {
      isPublished: true,
      status: 'PUBLISHED',
      hasAttempt: true,
      assessment: {
        id: assessment.id,
        title: assessment.title,
        courseCode: assessment.courseCode,
        courseTitle: assessment.courseTitle,
        academicSession: assessment.academicSession,
        semester: assessment.semester,
        totalMarks: assessment.totalMarks,
        passMarks: assessment.passMarks,
        publishedAt: assessment.resultsPublishedAt,
      },
      result: {
        totalScore: grade.totalScore,
        maxPossibleScore: grade.maxPossibleScore,
        percentage: grade.percentage,
        isPassing: grade.isPassing,
        cbtScore: grade.cbtScore,
        theoryScore: grade.theoryScore,
        completedAt: grade.completedAt || attempt.submittedAt,
      },
      questions: questionGrades,
    };
  },
};
