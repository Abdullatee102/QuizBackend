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
  auditLogsTable,
  notificationsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.7: Gradebook, Moderation & Result Publication Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let anotherFacultyId: string;
  let testDepartmentId: string;
  let mismatchedDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let assignedLecturerId: string;
  let assignedLecturerToken: string;

  let unassignedLecturerId: string;
  let unassignedLecturerToken: string;

  let adminId: string;
  let adminToken: string;

  let student1Id: string;
  let student1Token: string;
  let student2Id: string;
  let student2Token: string;

  let assessmentId: string;
  let questionCbtId: string;
  let aqCbtId: string;
  let questionTheoryId: string;
  let aqTheoryId: string;

  let student1AttemptId: string;
  let student1GradeId: string;
  let student2AttemptId: string;
  let student2GradeId: string;

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

    // 1. Setup Faculties & Departments
    const [faculty] = (await db
      .insert(facultiesTable)
      .values({
        name: `Faculty_Pub_${rand}`,
        code: `FPUB_${rand}`,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [otherFaculty] = (await db
      .insert(facultiesTable)
      .values({
        name: `Faculty_Other_${rand}`,
        code: `FOTH_${rand}`,
      } as any)
      .returning()) as any[];
    anotherFacultyId = otherFaculty.id;

    const [dept] = (await db
      .insert(departmentsTable)
      .values({
        name: `Dept_Pub_${rand}`,
        code: `DPUB_${rand}`,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = dept.id;

    const [mismatchedDept] = (await db
      .insert(departmentsTable)
      .values({
        name: `Dept_Mismatched_${rand}`,
        code: `DMIS_${rand}`,
        facultyId: anotherFacultyId,
      } as any)
      .returning()) as any[];
    mismatchedDepartmentId = mismatchedDept.id;

    // 2. Setup Course & Offerings
    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `CSC_PUB_${rand}`,
        title: 'Publication Workflow Course',
        level: 300,
        semester: 'harmattan',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
        isActive: true,
      } as any)
      .returning()) as any[];
    testCourseId = course.id;

    const [offering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2024/2025',
        semester: 'harmattan',
        level: 300,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    testOfferingId = offering.id;

    const [unassignedOff] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'rain',
        level: 300,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    unassignedOfferingId = unassignedOff.id;

    // 3. Setup Users (Lecturers, Admin, Students)
    const [lecturer1] = (await db
      .insert(usersTable)
      .values({
        email: `assigned_lecturer_${rand}@brainbuzz.app`,
        password: 'dummy',
        fullName: 'Dr. Assigned Lecturer',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    assignedLecturerId = lecturer1.id;
    const l1 = await authService.generateAuthTokens({
      id: assignedLecturerId,
      role: USER_ROLES.LECTURER,
      email: lecturer1.email,
    });
    assignedLecturerToken = l1.accessToken;

    const [lecturer2] = (await db
      .insert(usersTable)
      .values({
        email: `unassigned_lecturer_${rand}@brainbuzz.app`,
        password: 'dummy',
        fullName: 'Prof. Unassigned Lecturer',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    unassignedLecturerId = lecturer2.id;
    const l2 = await authService.generateAuthTokens({
      id: unassignedLecturerId,
      role: USER_ROLES.LECTURER,
      email: lecturer2.email,
    });
    unassignedLecturerToken = l2.accessToken;

    const [adminUser] = (await db
      .insert(usersTable)
      .values({
        email: `admin_pub_${rand}@brainbuzz.app`,
        password: 'dummy',
        fullName: 'Academic Board Admin',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    adminId = adminUser.id;
    const adm = await authService.generateAuthTokens({
      id: adminId,
      role: USER_ROLES.SUPER_ADMIN,
      email: adminUser.email,
    });
    adminToken = adm.accessToken;

    const [std1] = (await db
      .insert(usersTable)
      .values({
        email: `student1_${rand}@brainbuzz.app`,
        password: 'dummy',
        fullName: 'Alice Student',
        username: `MAT/PUB/01/${rand}`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    student1Id = std1.id;
    const s1 = await authService.generateAuthTokens({
      id: student1Id,
      role: USER_ROLES.STUDENT,
      email: std1.email,
    });
    student1Token = s1.accessToken;

    const [std2] = (await db
      .insert(usersTable)
      .values({
        email: `student2_${rand}@brainbuzz.app`,
        password: 'dummy',
        fullName: 'Bob Student',
        username: `MAT/PUB/02/${rand}`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    student2Id = std2.id;
    const s2 = await authService.generateAuthTokens({
      id: student2Id,
      role: USER_ROLES.STUDENT,
      email: std2.email,
    });
    student2Token = s2.accessToken;

    // Assign lecturer 1 to offering
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: assignedLecturerId,
      role: 'PRIMARY',
      status: 'ACTIVE',
    } as any);

    // Enroll students
    await db.insert(studentEnrollmentsTable).values([
      {
        offeringId: testOfferingId,
        studentId: student1Id,
        enrollmentType: 'REGULAR',
        status: 'ENROLLED',
      } as any,
      {
        offeringId: testOfferingId,
        studentId: student2Id,
        enrollmentType: 'REGULAR',
        status: 'ENROLLED',
      } as any,
    ]);

    // 4. Setup Questions & Assessment
    const [qCbt] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        question: 'What is 10 + 10?',
        options: ['10', '20', '30', '40'],
        correctAnswer: '20',
        type: 'cbt',
        points: 10,
        isActive: true,
      } as any)
      .returning()) as any[];
    questionCbtId = qCbt.id;

    const [qThy] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        question: 'Explain binary trees.',
        correctAnswer: 'A tree data structure where each node has at most two children.',
        type: 'theory',
        points: 20,
        isActive: true,
      } as any)
      .returning()) as any[];
    questionTheoryId = qThy.id;

    const startTime = new Date(Date.now() - 3600000);
    const endTime = new Date(Date.now() + 7200000);

    const [assessment] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: assignedLecturerId,
        title: 'Midterm Evaluation Assessment',
        type: 'MIXED',
        status: 'PUBLISHED',
        resultsPublicationStatus: 'GRADING_IN_PROGRESS',
        totalMarks: 30,
        passMarks: 15,
        durationMinutes: 60,
        startTime,
        endTime,
        publishedAt: startTime,
        maxAttempts: 1,
      } as any)
      .returning()) as any[];
    assessmentId = assessment.id;

    const [aq1] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId,
        questionId: questionCbtId,
        orderIndex: 0,
        allocatedMarks: 10,
        snapshot: {
          type: 'cbt',
          question: qCbt.question,
          options: qCbt.options,
          correctAnswer: '20',
          gradingPoints: [],
          points: 10,
        },
      } as any)
      .returning()) as any[];
    aqCbtId = aq1.id;

    const [aq2] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId,
        questionId: questionTheoryId,
        orderIndex: 1,
        allocatedMarks: 20,
        snapshot: {
          type: 'theory',
          question: qThy.question,
          correctAnswer: 'A tree data structure where each node has at most two children.',
          gradingPoints: [],
          points: 20,
        },
      } as any)
      .returning()) as any[];
    aqTheoryId = aq2.id;

    // 5. Setup Student Attempts and Grades
    // Student 1: Attempt + Grade (COMPLETED, CBT=10, Theory=18, Total=28)
    const [att1] = (await db
      .insert(assessmentAttemptsTable)
      .values({
        assessmentId,
        studentId: student1Id,
        attemptNumber: 1,
        status: 'SUBMITTED',
        startedAt: new Date(Date.now() - 2000000),
        submittedAt: new Date(Date.now() - 1000000),
        expiresAt: new Date(Date.now() + 3600000),
      } as any)
      .returning()) as any[];
    student1AttemptId = att1.id;

    const [grade1] = (await db
      .insert(assessmentGradesTable)
      .values({
        assessmentId,
        attemptId: student1AttemptId,
        studentId: student1Id,
        cbtScore: 10,
        theoryScore: 18,
        totalScore: 28,
        maxPossibleScore: 30,
        percentage: 93.33,
        isPassing: true,
        status: 'COMPLETED',
        isModerated: false,
        isFlaggedForReview: false,
      } as any)
      .returning()) as any[];
    student1GradeId = grade1.id;

    // Student 2: Attempt + Grade (NEEDS_THEORY_GRADING, CBT=10, Theory=0, Total=10)
    const [att2] = (await db
      .insert(assessmentAttemptsTable)
      .values({
        assessmentId,
        studentId: student2Id,
        attemptNumber: 1,
        status: 'SUBMITTED',
        startedAt: new Date(Date.now() - 2000000),
        submittedAt: new Date(Date.now() - 1000000),
        expiresAt: new Date(Date.now() + 3600000),
      } as any)
      .returning()) as any[];
    student2AttemptId = att2.id;

    const [grade2] = (await db
      .insert(assessmentGradesTable)
      .values({
        assessmentId,
        attemptId: student2AttemptId,
        studentId: student2Id,
        cbtScore: 10,
        theoryScore: 0,
        totalScore: 10,
        maxPossibleScore: 30,
        percentage: 33.33,
        isPassing: false,
        status: 'NEEDS_THEORY_GRADING',
        isModerated: false,
        isFlaggedForReview: false,
      } as any)
      .returning()) as any[];
    student2GradeId = grade2.id;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // 1. Offering Gradebook & IDOR Protection
  // =========================================================================
  describe('1. Offering Gradebook Retrieval & Access Control', () => {
    it('rejects unassigned lecturer with 403 on offering gradebook', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/gradebook`, {
        headers: { Authorization: `Bearer ${unassignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 403);
      const json: any = await res.json();
      assert.match(json.message || json.error, /assigned/i);
    });

    it('returns aggregated cohort metrics and assessments for assigned lecturer', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/gradebook`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.offering);
      assert.strictEqual(json.data.offering.offeringId || json.data.offering.id, testOfferingId);
      assert.ok(Array.isArray(json.data.assessments));
      assert.strictEqual(json.data.assessments.length, 1);
      assert.strictEqual(json.data.assessments[0].id, assessmentId);
      assert.ok(json.data.stats);
      assert.strictEqual(json.data.stats.totalStudents, 2);
    });
  });

  // =========================================================================
  // 2. Assessment Gradebook & Filter Operations
  // =========================================================================
  describe('2. Assessment Gradebook Retrieval & Filtering', () => {
    it('rejects unassigned lecturer on assessment gradebook', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/gradebook`, {
        headers: { Authorization: `Bearer ${unassignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 403);
    });

    it('returns grade roster, statistics and audit logs for assigned lecturer', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/gradebook`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.assessment);
      assert.strictEqual(json.data.assessment.resultsPublicationStatus, 'GRADING_IN_PROGRESS');
      assert.strictEqual(json.data.grades.length, 2);
      assert.strictEqual(json.data.stats.totalSubmissions, 2);
      assert.strictEqual(json.data.stats.completedCount, 1);
      assert.strictEqual(json.data.stats.needsTheoryCount, 1);
    });

    it('filters grade roster by search term (matric number)', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/gradebook?search=MAT/PUB/01`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.grades.length, 1);
      assert.strictEqual(json.data.grades[0].studentId, student1Id);
    });

    it('filters grade roster by status (COMPLETED)', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/gradebook?status=COMPLETED`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.grades.length, 1);
      assert.strictEqual(json.data.grades[0].status, 'COMPLETED');
    });
  });

  // =========================================================================
  // 3. Grade Moderation & Immutable Audit Trail
  // =========================================================================
  describe('3. Controlled Grade Moderation & Audit Log', () => {
    it('rejects out-of-bounds moderation score (> maxPossibleScore)', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/grades/${student1GradeId}/moderate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newScore: 35, // Max is 30
          reason: 'Attempting invalid score above maximum',
        }),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message, /must be between/i);
    });

    it('rejects negative moderation score', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/grades/${student1GradeId}/moderate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newScore: -5,
          reason: 'Invalid negative score',
        }),
      });
      assert.strictEqual(res.status, 400);
    });

    it('moderates grade within bounds and writes immutable audit entry', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/grades/${student1GradeId}/moderate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newScore: 29,
          reason: 'Upward adjustment on binary tree diagram clarity',
          isFlaggedForReview: false,
        }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.totalScore, 29);
      assert.strictEqual(json.data.isModerated, true);

      // Verify immutable audit log record
      const auditLogs = await db
        .select()
        .from(assessmentGradingAuditLogsTable)
        .where(
          and(
            eq(assessmentGradingAuditLogsTable.assessmentId, assessmentId as any),
            eq(assessmentGradingAuditLogsTable.action, 'GRADE_MODERATED')
          )
        );
      assert.ok(auditLogs.length >= 1);
      const latest = auditLogs[auditLogs.length - 1]!;
      assert.ok(latest);
      assert.strictEqual(latest.previousScore, 28);
      assert.strictEqual(latest.newScore, 29);
      assert.match(latest.reason || '', /diagram clarity/i);
    });
  });

  // =========================================================================
  // 4. Lecturer Approval Submission Lifecycle
  // =========================================================================
  describe('4. Lecturer Approval Submission Lifecycle', () => {
    it('rejects approval submission when incomplete attempts exist without override reason', async () => {
      // student2 is still in NEEDS_THEORY_GRADING
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/submit-for-approval`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message, /pending evaluation/i);
    });

    it('allows approval submission when valid override reason is provided', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/submit-for-approval`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overrideIncompleteReason: 'Student 2 theory evaluation deferred to makeup session by committee',
        }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.resultsPublicationStatus, 'SUBMITTED_FOR_APPROVAL');
    });

    it('rejects duplicate approval submission while already in SUBMITTED_FOR_APPROVAL', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/submit-for-approval`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ overrideIncompleteReason: 'Duplicate attempt' }),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message, /already submitted/i);
    });
  });

  // =========================================================================
  // 5. Admin Publication Oversight, Rejection & Notification
  // =========================================================================
  describe('5. Admin Publication Oversight, Rejection & Notification', () => {
    it('allows admin to inspect publication review data', async () => {
      const res = await fetch(`${baseUrl}/api/admin/assessments/${assessmentId}/publication-review`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.assessment.id, assessmentId);
      assert.strictEqual(json.data.assessment.resultsPublicationStatus, 'SUBMITTED_FOR_APPROVAL');
      assert.ok(json.data.stats);
      assert.ok(Array.isArray(json.data.grades));
      assert.ok(Array.isArray(json.data.auditLogs));
    });

    it('rejects admin rejection when reason is shorter than 5 characters', async () => {
      const res = await fetch(`${baseUrl}/api/admin/assessments/${assessmentId}/reject-results`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: 'Bad' }),
      });
      assert.strictEqual(res.status, 400);
    });

    it('admin rejects results with valid reason, returning to REJECTED and notifying lecturer', async () => {
      const res = await fetch(`${baseUrl}/api/admin/assessments/${assessmentId}/reject-results`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reason: 'Incomplete grading on Student 2 must be evaluated before release.',
        }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.resultsPublicationStatus, 'REJECTED');
      assert.match(json.data.resultsRejectionReason, /Incomplete grading/);

      // Verify notification sent to lecturer
      const notifs = await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.userId, assignedLecturerId as any));
      assert.ok(notifs.some((n) => n.title.includes('Returned')));
    });
  });

  // =========================================================================
  // 6. Resubmission, Admin Approval & Official Publication Release
  // =========================================================================
  describe('6. Resubmission, Admin Approval & Publication Release', () => {
    it('lecturer resolves incomplete grade and resubmits for approval', async () => {
      // Mark student 2 completed
      await db
        .update(assessmentGradesTable)
        .set({
          theoryScore: 12,
          totalScore: 22,
          percentage: 73.33,
          isPassing: true,
          status: 'COMPLETED',
        } as any)
        .where(eq(assessmentGradesTable.id, student2GradeId as any));

      const res = await fetch(`${baseUrl}/api/lecturer/assessments/${assessmentId}/submit-for-approval`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.resultsPublicationStatus, 'SUBMITTED_FOR_APPROVAL');
    });

    it('admin approves results transition to APPROVED', async () => {
      const res = await fetch(`${baseUrl}/api/admin/assessments/${assessmentId}/approve-results`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.resultsPublicationStatus, 'APPROVED');
    });

    it('admin officially publishes results transition to PUBLISHED and notifies students', async () => {
      const res = await fetch(`${baseUrl}/api/admin/assessments/${assessmentId}/publish-results`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.resultsPublicationStatus, 'PUBLISHED');
      assert.ok(json.data.resultsPublishedAt);

      // Verify student notification delivered
      const notifs = await db
        .select()
        .from(notificationsTable)
        .where(eq(notificationsTable.userId, student1Id as any));
      assert.ok(notifs.some((n) => n.title.includes('Results Published')));
    });
  });

  // =========================================================================
  // 7. Student Result Retrieval & Concealment Verification
  // =========================================================================
  describe('7. Student Published Results Access & Strict Concealment', () => {
    it('returns published score, percentage and feedback to student 1', async () => {
      const res = await fetch(`${baseUrl}/api/auth/assessments/${assessmentId}/results`, {
        headers: { Authorization: `Bearer ${student1Token}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.status, 'PUBLISHED');
      assert.ok(json.data.result);
      assert.strictEqual(json.data.result.totalScore, 29);
      assert.strictEqual(json.data.result.maxPossibleScore, 30);
      assert.strictEqual(json.data.result.isPassing, true);
    });

    it('strictly conceals marks and answers when an assessment is NOT published', async () => {
      // Create unpublished assessment
      const [unpub] = (await db
        .insert(assessmentsTable)
        .values({
          offeringId: testOfferingId,
          courseId: testCourseId,
          creatorLecturerId: assignedLecturerId,
          title: 'Unpublished Final Exam',
          type: 'CBT',
          status: 'PUBLISHED',
          resultsPublicationStatus: 'GRADING_IN_PROGRESS',
          totalMarks: 50,
          passMarks: 25,
          durationMinutes: 60,
          startTime: new Date(),
          endTime: new Date(Date.now() + 3600000),
          publishedAt: new Date(),
          maxAttempts: 1,
        } as any)
        .returning()) as any[];

      const [att] = (await db
        .insert(assessmentAttemptsTable)
        .values({
          assessmentId: unpub.id,
          studentId: student1Id,
          attemptNumber: 1,
          status: 'SUBMITTED',
          startedAt: new Date(),
          submittedAt: new Date(),
          expiresAt: new Date(Date.now() + 3600000),
        } as any)
        .returning()) as any[];

      await db.insert(assessmentGradesTable).values({
        assessmentId: unpub.id,
        attemptId: att.id,
        studentId: student1Id,
        cbtScore: 45,
        totalScore: 45,
        maxPossibleScore: 50,
        percentage: 90,
        isPassing: true,
        status: 'COMPLETED',
      } as any);

      const res = await fetch(`${baseUrl}/api/auth/assessments/${unpub.id}/results`, {
        headers: { Authorization: `Bearer ${student1Token}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.status, 'PENDING_PUBLICATION');
      assert.strictEqual(json.data.result, null);
      assert.match(json.data.message, /formal evaluation/i);
    });

    it('rejects student with 404 when no attempt exists', async () => {
      // Create fresh student
      const [otherStudent] = (await db
        .insert(usersTable)
        .values({
          email: `no_attempt_${Date.now()}@brainbuzz.app`,
          password: 'dummy',
          fullName: 'No Attempt Student',
          role: USER_ROLES.STUDENT,
          status: ACCOUNT_STATUS.ACTIVE,
        } as any)
        .returning()) as any[];
      const ot = await authService.generateAuthTokens({
        id: otherStudent.id,
        role: USER_ROLES.STUDENT,
        email: otherStudent.email,
      });
      const otherToken = ot.accessToken;

      const res = await fetch(`${baseUrl}/api/auth/assessments/${assessmentId}/results`, {
        headers: { Authorization: `Bearer ${otherToken}` },
      });
      assert.strictEqual(res.status, 404);
      const json: any = await res.json();
      assert.match(json.message, /attempt found/i);
    });
  });

  // =========================================================================
  // 8. Admin Lecturer Profile & Affiliation Validation (H3)
  // =========================================================================
  describe('8. Admin Lecturer Affiliation & Profile Validation', () => {
    it('rejects profile update when department does not belong to specified faculty', async () => {
      const res = await fetch(`${baseUrl}/api/admin/lecturers/${assignedLecturerId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facultyId: testFacultyId,
          departmentId: mismatchedDepartmentId, // belongs to anotherFacultyId!
        }),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message, /does not belong/i);
    });

    it('updates lecturer profile when department matches faculty and writes audit log', async () => {
      const res = await fetch(`${baseUrl}/api/admin/lecturers/${assignedLecturerId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'Dr. Assigned Lecturer Updated',
          facultyId: testFacultyId,
          departmentId: testDepartmentId,
        }),
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.fullName, 'Dr. Assigned Lecturer Updated');

      // Verify audit log
      const audit = await db
        .select()
        .from(auditLogsTable)
        .where(
          and(
            eq(auditLogsTable.resourceId, assignedLecturerId as any),
            eq(auditLogsTable.action, 'UPDATE_LECTURER_PROFILE')
          )
        );
      assert.ok(audit.length >= 1);
    });
  });
});
