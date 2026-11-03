import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'http';
import express from 'express';
import { db } from '../db/index.js';
import {
  usersTable,
  facultiesTable,
  departmentsTable,
  coursesTable,
  courseOfferingsTable,
  offeringLecturersTable,
  studentEnrollmentsTable,
  questionsTable,
  assessmentsTable,
  assessmentQuestionsTable,
  assessmentAttemptsTable,
  assessmentAnswersTable,
  assessmentGradesTable,
  assessmentQuestionGradesTable,
  assessmentGradingAuditLogsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import { assessmentGradingService } from '../services/assessmentGradingService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.6: Formal Grading, Theory Evaluation & Rubric Scoring Engine Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let assignedLecturerId: string;
  let assignedLecturerToken: string;

  let unassignedLecturerId: string;
  let unassignedLecturerToken: string;

  let adminId: string;
  let adminToken: string;

  let studentId: string;
  let studentToken: string;

  let questionCbt1Id: string;
  let questionCbt2Id: string;
  let questionTheoryId: string;

  let cbtAssessmentId: string;
  let cbtAq1Id: string;
  let cbtAq2Id: string;

  let mixedAssessmentId: string;
  let mixedAqCbtId: string;
  let mixedAqTheoryId: string;

  let cbtAttemptId: string;
  let mixedAttemptId: string;

  before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/lecturer', lecturerRoutes);

    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const address = server.address() as any;
    baseUrl = `http://127.0.0.1:${address.port}`;

    const timestamp = Date.now();
    const rand = Math.floor(Math.random() * 89999 + 10000);

    // 1. Setup Faculty, Department & Course
    const [faculty] = (await db
      .insert(facultiesTable)
      .values({
        name: `Faculty_Grading_${rand}`,
        code: `FGRADE_${rand}`,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [dept] = (await db
      .insert(departmentsTable)
      .values({
        name: `Dept_Grading_${rand}`,
        code: `DGRADE_${rand}`,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = dept.id;

    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `CSC_GRADE_${rand}`,
        title: 'Formal Grading Verification',
        level: 400,
        semester: 'harmattan',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
        isActive: true,
      } as any)
      .returning()) as any[];
    testCourseId = course.id;

    // 2. Setup Course Offerings
    const [offering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2026/2027',
        semester: 'harmattan',
        level: 400,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    testOfferingId = offering.id;

    const [unassignedOff] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2026/2027',
        semester: 'rain',
        level: 400,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    unassignedOfferingId = unassignedOff.id;

    // 3. Create Users
    // Assigned Lecturer
    const [lecturer1] = (await db
      .insert(usersTable)
      .values({
        email: `assigned_lec_${rand}@test.edu.ng`,
        password: 'Password123!',
        fullName: 'Dr. Assigned Evaluator',
        username: `asgn_lec_${rand}`,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    assignedLecturerId = lecturer1.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: assignedLecturerId,
      email: lecturer1.email,
      role: USER_ROLES.LECTURER,
    });
    assignedLecturerToken = l1Tokens.accessToken;

    // Unassigned Lecturer
    const [lecturer2] = (await db
      .insert(usersTable)
      .values({
        email: `unassigned_lec_${rand}@test.edu.ng`,
        password: 'Password123!',
        fullName: 'Prof. Unassigned',
        username: `unasgn_lec_${rand}`,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    unassignedLecturerId = lecturer2.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: unassignedLecturerId,
      email: lecturer2.email,
      role: USER_ROLES.LECTURER,
    });
    unassignedLecturerToken = l2Tokens.accessToken;

    // Admin
    const [adminUser] = (await db
      .insert(usersTable)
      .values({
        email: `admin_grading_${rand}@test.edu.ng`,
        password: 'Password123!',
        fullName: 'Admin Grading Overseer',
        username: `admin_grd_${rand}`,
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    adminId = adminUser.id;
    const adminTokens = await authService.generateAuthTokens({
      id: adminId,
      email: adminUser.email,
      role: USER_ROLES.SUPER_ADMIN,
    });
    adminToken = adminTokens.accessToken;

    // Student
    const [studentUser] = (await db
      .insert(usersTable)
      .values({
        email: `student_grade_${rand}@test.edu.ng`,
        password: 'Password123!',
        fullName: 'Jane Examinee',
        username: `jane_${rand}`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        level: 400,
      } as any)
      .returning()) as any[];
    studentId = studentUser.id;
    const studentTokens = await authService.generateAuthTokens({
      id: studentId,
      email: studentUser.email,
      role: USER_ROLES.STUDENT,
    });
    studentToken = studentTokens.accessToken;

    // 4. Assign Lecturer to Primary Offering
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: assignedLecturerId,
      role: 'PRIMARY',
      status: 'ACTIVE',
    } as any);

    // 5. Enroll Student into Primary Offering
    await db.insert(studentEnrollmentsTable).values({
      offeringId: testOfferingId,
      studentId: studentId,
      status: 'ENROLLED',
    } as any);

    // 6. Create Questions in Question Bank
    const [qCbt1] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        question: 'What is the time complexity of binary search on a sorted array?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswer: 'O(log n)',
        type: 'cbt',
        points: 5,
        isActive: true,
      } as any)
      .returning()) as any[];
    questionCbt1Id = qCbt1.id;

    const [qCbt2] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        question: 'HTTP is a stateless protocol. (True or False)',
        options: ['True', 'False'],
        correctAnswer: 'True',
        type: 'boolean',
        points: 5,
        isActive: true,
      } as any)
      .returning()) as any[];
    questionCbt2Id = qCbt2.id;

    const [qTheory] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        question: 'Explain the concept of virtual memory and how page faults are handled.',
        correctAnswer: 'Virtual memory maps virtual addresses to physical RAM using page tables and page fault handlers.',
        gradingPoints: [
          { concept: 'Address Translation', weight: 4, aliases: ['page table', 'mmu', 'virtual address'] },
          { concept: 'Page Fault Handler', weight: 4, aliases: ['interrupt', 'trap', 'page fault', 'disk swap'] },
          { concept: 'Swapping / Page Replacement', weight: 2, aliases: ['swap space', 'fifo', 'lru', 'replacement'] },
        ],
        type: 'theory',
        points: 10,
        isActive: true,
      } as any)
      .returning()) as any[];
    questionTheoryId = qTheory.id;

    // 7. Create and Publish Pure CBT Assessment
    const now = new Date();
    const startTime = new Date(now.getTime() - 10 * 60 * 1000); // 10 mins ago
    const endTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour ahead

    const [cbtAssessment] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: assignedLecturerId,
        title: 'Pure CBT Midterm Test',
        type: 'CBT',
        status: 'PUBLISHED',
        totalMarks: 10,
        passMarks: 5,
        durationMinutes: 30,
        startTime,
        endTime,
        publishedAt: startTime,
      } as any)
      .returning()) as any[];
    cbtAssessmentId = cbtAssessment.id;

    const [cbtAq1] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: cbtAssessmentId,
        questionId: questionCbt1Id,
        orderIndex: 0,
        allocatedMarks: 5,
        snapshot: {
          type: 'multiple_choice',
          question: qCbt1.question,
          options: qCbt1.options,
          correctAnswer: 'O(log n)',
          gradingPoints: [],
          points: 5,
        },
      } as any)
      .returning()) as any[];
    cbtAq1Id = cbtAq1.id;

    const [cbtAq2] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: cbtAssessmentId,
        questionId: questionCbt2Id,
        orderIndex: 1,
        allocatedMarks: 5,
        snapshot: {
          type: 'boolean',
          question: qCbt2.question,
          options: qCbt2.options,
          correctAnswer: 'True',
          gradingPoints: [],
          points: 5,
        },
      } as any)
      .returning()) as any[];
    cbtAq2Id = cbtAq2.id;

    // 8. Create and Publish Mixed Assessment (CBT + Theory)
    const [mixedAssessment] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: assignedLecturerId,
        title: 'Comprehensive Mixed Assessment',
        type: 'MIXED',
        status: 'PUBLISHED',
        totalMarks: 20,
        passMarks: 10,
        durationMinutes: 45,
        startTime,
        endTime,
        publishedAt: startTime,
      } as any)
      .returning()) as any[];
    mixedAssessmentId = mixedAssessment.id;

    const [mixedAq1] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: mixedAssessmentId,
        questionId: questionCbt1Id,
        orderIndex: 0,
        allocatedMarks: 10,
        snapshot: {
          type: 'multiple_choice',
          question: qCbt1.question,
          options: qCbt1.options,
          correctAnswer: 'O(log n)',
          gradingPoints: [],
          points: 10,
        },
      } as any)
      .returning()) as any[];
    mixedAqCbtId = mixedAq1.id;

    const [mixedAq2] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: mixedAssessmentId,
        questionId: questionTheoryId,
        orderIndex: 1,
        allocatedMarks: 10,
        snapshot: {
          type: 'theory',
          question: qTheory.question,
          options: null,
          correctAnswer: qTheory.correctAnswer,
          gradingPoints: qTheory.gradingPoints,
          points: 10,
        },
      } as any)
      .returning()) as any[];
    mixedAqTheoryId = mixedAq2.id;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // TEST SUITE: AUTOMATIC CBT GRADING ENGINE
  // =========================================================================

  it('1. Student submits pure CBT attempt: evaluates deterministically and completes automatically', async () => {
    // Start attempt
    const startRes = await fetch(`${baseUrl}/api/auth/assessments/${cbtAssessmentId}/attempts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
    });
    assert.strictEqual(startRes.status, 200);
    const startJson = (await startRes.json()) as any;
    cbtAttemptId = startJson.data.attempt.id;

    // Save 1 correct answer and 1 incorrect answer
    const submitPayload = {
      answers: [
        {
          assessmentQuestionId: cbtAq1Id,
          questionId: questionCbt1Id,
          answer: 'O(log n)', // Correct -> 5 marks
        },
        {
          assessmentQuestionId: cbtAq2Id,
          questionId: questionCbt2Id,
          answer: 'False', // Incorrect -> 0 marks
        },
      ],
    };

    const submitRes = await fetch(
      `${baseUrl}/api/auth/assessments/${cbtAssessmentId}/attempts/${cbtAttemptId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify(submitPayload),
      }
    );

    assert.strictEqual(submitRes.status, 200);
    const submitJson = (await submitRes.json()) as any;
    assert.strictEqual(submitJson.status, 'success');

    // Verify submission response strictly DOES NOT leak scores or correct answers to student
    assert.strictEqual(submitJson.attempt.cbtScore, undefined);
    assert.strictEqual(submitJson.attempt.totalScore, undefined);
    assert.strictEqual(submitJson.attempt.percentage, undefined);

    // Verify database grade record
    const [grade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, cbtAttemptId as any));

    assert.ok(grade, 'assessment_grades row must be created');
    assert.strictEqual(grade.cbtScore, 5);
    assert.strictEqual(grade.theoryScore, 0);
    assert.strictEqual(grade.totalScore, 5);
    assert.strictEqual(grade.maxPossibleScore, 10);
    assert.strictEqual(grade.percentage, 50);
    assert.strictEqual(grade.isPassing, true); // 5 >= passMarks(5)
    assert.strictEqual(grade.status, 'AUTO_GRADED');
  });

  it('2. Repeated CBT grading is strictly idempotent without score mutation or record duplication', async () => {
    // Re-run CBT auto-grader directly on same attempt
    const secondResult = await assessmentGradingService.gradeCbtAttempt(cbtAttemptId);

    assert.ok(secondResult, 'secondResult must be defined');
    assert.strictEqual(secondResult.cbtScore, 5);
    assert.strictEqual(secondResult.totalScore, 5);
    assert.strictEqual(secondResult.status, 'AUTO_GRADED');

    // Confirm only 1 row exists in assessment_grades
    const allGrades = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, cbtAttemptId as any));

    assert.strictEqual(allGrades.length, 1);
  });

  it('3. Mixed assessment submission auto-grades CBT and transitions attempt to NEEDS_THEORY_GRADING', async () => {
    // Start mixed attempt
    const startRes = await fetch(`${baseUrl}/api/auth/assessments/${mixedAssessmentId}/attempts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
    });
    assert.strictEqual(startRes.status, 200);
    const startJson = (await startRes.json()) as any;
    mixedAttemptId = startJson.data.attempt.id;

    // Submit CBT correct answer and theory draft response
    const submitPayload = {
      answers: [
        {
          assessmentQuestionId: mixedAqCbtId,
          questionId: questionCbt1Id,
          answer: 'O(log n)', // Correct CBT -> 10 marks
        },
        {
          assessmentQuestionId: mixedAqTheoryId,
          questionId: questionTheoryId,
          answer:
            'Virtual memory allows the operating system to map virtual addresses to physical RAM using page tables. When a required page is not in RAM, the MMU triggers a page fault interrupt to swap it from disk.',
        },
      ],
    };

    const submitRes = await fetch(
      `${baseUrl}/api/auth/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${studentToken}`,
        },
        body: JSON.stringify(submitPayload),
      }
    );

    assert.strictEqual(submitRes.status, 200);

    // Verify database grade status
    const [grade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, mixedAttemptId as any));

    assert.ok(grade);
    assert.strictEqual(grade.cbtScore, 10);
    assert.strictEqual(grade.theoryScore, 0); // Not graded yet
    assert.strictEqual(grade.totalScore, 10);
    assert.strictEqual(grade.status, 'NEEDS_THEORY_GRADING');
  });

  // =========================================================================
  // TEST SUITE: THEORY EVALUATION & RUBRIC SCORING
  // =========================================================================

  it('4. Assigned lecturer can view grading overview roster and stats', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/grading`, {
      headers: {
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.stats.totalSubmitted, 1);
    assert.strictEqual(json.data.stats.needsTheoryCount, 1);
    assert.strictEqual(json.data.roster.length, 1);
    assert.strictEqual(json.data.roster[0].grade.status, 'NEEDS_THEORY_GRADING');
  });

  it('5. Assigned lecturer can retrieve detailed grading desk with student response and rubric criteria', async () => {
    const res = await fetch(
      `${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/grading`,
      {
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.questions.length, 2);

    const theoryQ = json.data.questions.find((q: any) => q.type === 'theory');
    assert.ok(theoryQ);
    assert.strictEqual(theoryQ.allocatedMarks, 10);
    assert.ok(theoryQ.studentAnswer.includes('page fault'));
    assert.strictEqual(theoryQ.gradingPoints.length, 3);
  });

  it('6. Assigned lecturer can request AI rubric assistance without mutating authoritative grade', async () => {
    const res = await fetch(
      `${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/questions/${mixedAqTheoryId}/ai-assist`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.isAiSuggestion, true);
    assert.strictEqual(json.data.authoritative, false);
    assert.ok(json.data.suggestedScore > 0);
    assert.ok(json.data.matchedConcepts.length > 0);

    // Verify DB was NOT mutated
    const [grade] = await db
      .select()
      .from(assessmentGradesTable)
      .where(eq(assessmentGradesTable.attemptId, mixedAttemptId as any));
    assert.ok(grade, 'grade must be defined');
    assert.strictEqual(grade.theoryScore, 0); // Still 0
  });

  it('7. Reject theory grading when awarded marks exceed allocated maximum marks (400 Bad Request)', async () => {
    const invalidPayload = {
      questionGrades: [
        {
          assessmentQuestionId: mixedAqTheoryId,
          awardedMarks: 15, // Allocated is 10!
          feedback: 'Too generous',
        },
      ],
      reason: 'Testing boundary rejection',
    };

    const res = await fetch(
      `${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/grade-theory`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify(invalidPayload),
      }
    );

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
    assert.ok(json.message.includes('exceed maximum allocated marks'));
  });

  it('8. Assigned lecturer successfully grades theory question with rubrics and feedback', async () => {
    const gradePayload = {
      questionGrades: [
        {
          assessmentQuestionId: mixedAqTheoryId,
          awardedMarks: 8.5,
          rubricScores: [
            { concept: 'Address Translation', maxWeight: 4, awardedWeight: 4, comment: 'Well stated' },
            { concept: 'Page Fault Handler', maxWeight: 4, awardedWeight: 3.5, comment: 'Good mention of trap' },
            { concept: 'Swapping / Page Replacement', maxWeight: 2, awardedWeight: 1, comment: 'Brief' },
          ],
          feedback: 'Solid conceptual understanding of page fault handling.',
        },
      ],
      reason: 'First evaluation pass',
    };

    const res = await fetch(
      `${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/grade-theory`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify(gradePayload),
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.grade.cbtScore, 10);
    assert.strictEqual(json.data.grade.theoryScore, 8.5);
    assert.strictEqual(json.data.grade.totalScore, 18.5);
    assert.strictEqual(json.data.grade.maxPossibleScore, 20);
    assert.strictEqual(json.data.grade.percentage, 92.5);
    assert.strictEqual(json.data.grade.status, 'COMPLETED');
    assert.strictEqual(json.data.grade.gradedBy, assignedLecturerId);
  });

  it('9. Lecturer re-evaluation records audit trail with previous vs new score and reason', async () => {
    const reEvalPayload = {
      questionGrades: [
        {
          assessmentQuestionId: mixedAqTheoryId,
          awardedMarks: 9.0, // adjusted from 8.5 to 9.0
          feedback: 'Upgraded after reviewing replacement algorithm explanation.',
        },
      ],
      reason: 'Student appeal review on page replacement explanation',
    };

    const res = await fetch(
      `${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/grade-theory`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify(reEvalPayload),
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.grade.theoryScore, 9.0);
    assert.strictEqual(json.data.grade.totalScore, 19.0);

    // Verify audit log entry
    const auditLogs = await db
      .select()
      .from(assessmentGradingAuditLogsTable)
      .where(
        and(
          eq(assessmentGradingAuditLogsTable.attemptId, mixedAttemptId as any),
          eq(assessmentGradingAuditLogsTable.action, 'RE_EVALUATED')
        )
      );

    assert.ok(auditLogs.length > 0, 'Must record RE_EVALUATED audit log');
    const latestLog = auditLogs[0];
    assert.ok(latestLog, 'latestLog must be defined');
    assert.strictEqual(latestLog.previousScore, 8.5);
    assert.strictEqual(latestLog.newScore, 9.0);
    assert.strictEqual(latestLog.actorId, assignedLecturerId);
    assert.strictEqual(latestLog.actorRole, 'LECTURER');
    assert.ok(latestLog.reason?.includes('appeal review'));
  });

  // =========================================================================
  // TEST SUITE: SECURITY, AUTHORIZATION & ACCESS BOUNDARIES
  // =========================================================================

  it('10. Unassigned lecturer is rejected from grading with 403 Forbidden', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/grading`, {
      headers: {
        Authorization: `Bearer ${unassignedLecturerToken}`,
      },
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
    assert.ok(json.message.includes('not actively assigned'));
  });

  it('11. Student cannot access lecturer grading endpoints (403 Forbidden)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${mixedAssessmentId}/grading`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    assert.strictEqual(res.status, 403);
  });

  it('12. Student assessment discovery shows appropriate grading status while strictly concealing raw marks', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/available`, {
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    const mixed = json.data.assessments.find((a: any) => a.id === mixedAssessmentId);
    assert.ok(mixed);
    assert.strictEqual(mixed.studentAttemptStatus, 'SUBMITTED');
    assert.strictEqual(mixed.gradingStatus, 'GRADING_COMPLETED');

    // Strict security assertions: NO marks, answers, or keys exposed in student endpoint
    assert.strictEqual(mixed.totalScore, undefined);
    assert.strictEqual(mixed.cbtScore, undefined);
    assert.strictEqual(mixed.theoryScore, undefined);
    assert.strictEqual(mixed.percentage, undefined);
    assert.strictEqual(mixed.awardedMarks, undefined);
    assert.strictEqual(mixed.correctAnswer, undefined);
  });

  // =========================================================================
  // TEST SUITE: ADMIN OVERSIGHT & RETRY
  // =========================================================================

  it('13. Admin can retrieve grading oversight telemetry and audit logs', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/assessments/${mixedAssessmentId}/grading-oversight`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.stats.submittedCount, 1);
    assert.strictEqual(json.data.stats.completedCount, 1);
    assert.ok(json.data.auditLogs.length >= 2);
  });

  it('14. Admin can trigger CBT grading retry and it succeeds without corrupting theory scores', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/assessments/${mixedAssessmentId}/attempts/${mixedAttemptId}/retry-cbt-grading`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');

    // Theory score was 9.0; CBT score was 10. Total must remain 19.0
    assert.strictEqual(json.data.grade.cbtScore, 10);
    assert.strictEqual(json.data.grade.theoryScore, 9.0);
    assert.strictEqual(json.data.grade.totalScore, 19.0);
  });

  // =========================================================================
  // TEST SUITE: ZERO REGRESSION ON OPEN PRACTICE QUIZZES
  // =========================================================================

  it('15. Open-practice quiz submission, scoring, and gamification continue with zero regression', async () => {
    const practicePayload = {
      courseId: testCourseId,
      category: 'general',
      quizType: 'cbt',
      answers: [
        {
          questionId: questionCbt1Id,
          answer: 'O(log n)',
        },
      ],
    };

    const res = await fetch(`${baseUrl}/api/auth/quiz-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify(practicePayload),
    });

    assert.ok(res.status === 200 || res.status === 201);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');

    // Verify open-practice did NOT insert any assessment_grades rows
    const assessmentGradesForPractice = await db
      .select()
      .from(assessmentGradesTable)
      .where(
        and(
          eq(assessmentGradesTable.studentId, studentId as any),
          eq(assessmentGradesTable.assessmentId, testCourseId as any)
        )
      );
    assert.strictEqual(assessmentGradesForPractice.length, 0);
  });
});
