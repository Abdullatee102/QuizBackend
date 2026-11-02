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
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.5: Student Assessment Participation & Examination Engine Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;

  let lecturer1Id: string;
  let lecturer1Token: string;

  let lecturer2Id: string;
  let lecturer2Token: string;

  let enrolledStudentId: string;
  let enrolledStudentToken: string;

  let unenrolledStudentId: string;
  let unenrolledStudentToken: string;

  let questionCbtId: string;
  let questionTheoryId: string;

  let activeAssessmentId: string;
  let scheduledAssessmentId: string;
  let multiAttemptAssessmentId: string;

  let activeAttemptId: string;
  let activeAqCbtId: string;
  let activeAqTheoryId: string;

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
        name: `Engineering_${rand}`,
        code: `ENG_${rand}`,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [dept] = (await db
      .insert(departmentsTable)
      .values({
        name: `Computer Science_${rand}`,
        code: `CSC_${rand}`,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = dept.id;

    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `CSC_PART_${rand}`,
        title: 'Assessment Engine Testing',
        level: 300,
        semester: 'harmattan',
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        isActive: true,
      } as any)
      .returning()) as any[];
    testCourseId = course.id;

    // 2. Setup Academic Offering
    const [offering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'harmattan',
        level: 300,
        section: 'A',
        cohort: '2025/2026 Regular',
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    testOfferingId = offering.id;

    // 3. Setup Lecturers
    const [lect1] = (await db
      .insert(usersTable)
      .values({
        email: `lect1_part_${timestamp}_${rand}@lautech.edu.ng`,
        password: 'hashed_lecturer_pass',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Dr. Lecturer One Part',
        isVerifiedLecturer: true,
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    lecturer1Id = lect1.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: lecturer1Id,
      email: lect1.email!,
      role: lect1.role,
    });
    lecturer1Token = l1Tokens.accessToken;

    // Assign Lecturer 1 to offering
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: lecturer1Id,
      role: 'COORDINATOR',
      status: 'ACTIVE',
    } as any);

    const [lect2] = (await db
      .insert(usersTable)
      .values({
        email: `lect2_unassigned_${timestamp}_${rand}@lautech.edu.ng`,
        password: 'hashed_lecturer_pass',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Dr. Lecturer Two Unassigned',
        isVerifiedLecturer: true,
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    lecturer2Id = lect2.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: lecturer2Id,
      email: lect2.email!,
      role: lect2.role,
    });
    lecturer2Token = l2Tokens.accessToken;

    // 4. Setup Students (Enrolled vs Unenrolled)
    const [stud1] = (await db
      .insert(usersTable)
      .values({
        email: `stud1_enrolled_${timestamp}_${rand}@student.lautech.edu.ng`,
        password: 'hashed_student_pass',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Enrolled Student Part',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    enrolledStudentId = stud1.id;
    const s1Tokens = await authService.generateAuthTokens({
      id: enrolledStudentId,
      email: stud1.email!,
      role: stud1.role,
    });
    enrolledStudentToken = s1Tokens.accessToken;

    // Enroll student 1
    await db.insert(studentEnrollmentsTable).values({
      offeringId: testOfferingId,
      studentId: enrolledStudentId,
      status: 'ENROLLED',
      enrollmentType: 'REGULAR',
    } as any);

    const [stud2] = (await db
      .insert(usersTable)
      .values({
        email: `stud2_unenrolled_${timestamp}_${rand}@student.lautech.edu.ng`,
        password: 'hashed_student_pass',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Unenrolled Student Part',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    unenrolledStudentId = stud2.id;
    const s2Tokens = await authService.generateAuthTokens({
      id: unenrolledStudentId,
      email: stud2.email!,
      role: stud2.role,
    });
    unenrolledStudentToken = s2Tokens.accessToken;

    // 5. Setup Questions in Question Bank
    const [qCbt] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: lecturer1Id,
        type: 'cbt',
        question: 'What is the primary function of an operating system kernel?',
        options: ['Manage hardware resources', 'Compile source code', 'Design web pages', 'Render 3D graphics'],
        correctAnswer: 'Manage hardware resources',
        points: 5,
        status: 'PUBLISHED',
      } as any)
      .returning()) as any[];
    questionCbtId = qCbt.id;

    const [qTheory] = (await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: lecturer1Id,
        type: 'theory',
        question: 'Explain the difference between process concurrency and parallelism.',
        options: null,
        correctAnswer: 'Concurrency is about dealing with lots of things at once; parallelism is about doing lots of things at once.',
        gradingPoints: [
          { concept: 'Concurrency dealing with multiple tasks', weight: 0.5 },
          { concept: 'Parallelism simultaneous physical execution', weight: 0.5 },
        ],
        points: 10,
        status: 'PUBLISHED',
      } as any)
      .returning()) as any[];
    questionTheoryId = qTheory.id;

    // 6. Setup Active Assessment (Available Now)
    const now = Date.now();
    const tenMinsAgo = new Date(now - 10 * 60 * 1000);
    const fiftyMinsLater = new Date(now + 50 * 60 * 1000);

    const [aActive] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: lecturer1Id,
        title: 'Mid-Semester CBT & Theory Examination',
        type: 'HYBRID',
        status: 'PUBLISHED',
        totalMarks: 15,
        passMarks: 8,
        durationMinutes: 30,
        startTime: tenMinsAgo,
        endTime: fiftyMinsLater,
        maxAttempts: 1,
        allowLateSubmission: false,
      } as any)
      .returning()) as any[];
    activeAssessmentId = aActive.id;

    // Insert immutable question snapshots
    const [aq1] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: activeAssessmentId,
        questionId: questionCbtId,
        questionVersion: 1,
        orderIndex: 0,
        allocatedMarks: 5,
        snapshot: {
          type: 'cbt',
          question: qCbt.question,
          options: qCbt.options,
          correctAnswer: qCbt.correctAnswer,
          gradingPoints: [],
          points: 5,
        },
      } as any)
      .returning()) as any[];
    activeAqCbtId = aq1.id;

    const [aq2] = (await db
      .insert(assessmentQuestionsTable)
      .values({
        assessmentId: activeAssessmentId,
        questionId: questionTheoryId,
        questionVersion: 1,
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
    activeAqTheoryId = aq2.id;

    // 7. Setup Scheduled Assessment (Opens 2 Hours in Future)
    const twoHoursLater = new Date(now + 2 * 60 * 60 * 1000);
    const threeHoursLater = new Date(now + 3 * 60 * 60 * 1000);

    const [aScheduled] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: lecturer1Id,
        title: 'Upcoming Final Examination',
        type: 'CBT',
        status: 'PUBLISHED',
        totalMarks: 20,
        passMarks: 10,
        durationMinutes: 45,
        startTime: twoHoursLater,
        endTime: threeHoursLater,
        maxAttempts: 1,
        allowLateSubmission: false,
      } as any)
      .returning()) as any[];
    scheduledAssessmentId = aScheduled.id;

    // 8. Setup Multi-Attempt Assessment (maxAttempts: 2)
    const [aMulti] = (await db
      .insert(assessmentsTable)
      .values({
        offeringId: testOfferingId,
        courseId: testCourseId,
        creatorLecturerId: lecturer1Id,
        title: 'Continuous Practice Test (2 Attempts)',
        type: 'CBT',
        status: 'PUBLISHED',
        totalMarks: 5,
        passMarks: 2,
        durationMinutes: 15,
        startTime: tenMinsAgo,
        endTime: fiftyMinsLater,
        maxAttempts: 2,
        allowLateSubmission: false,
      } as any)
      .returning()) as any[];
    multiAttemptAssessmentId = aMulti.id;

    await db.insert(assessmentQuestionsTable).values({
      assessmentId: multiAttemptAssessmentId,
      questionId: questionCbtId,
      questionVersion: 1,
      orderIndex: 0,
      allocatedMarks: 5,
      snapshot: {
        type: 'cbt',
        question: qCbt.question,
        options: qCbt.options,
        correctAnswer: qCbt.correctAnswer,
        gradingPoints: [],
        points: 5,
      },
    } as any);
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // TEST SUITE: DISCOVERY & INSTRUCTIONS
  // =========================================================================

  it('1. Eligible student can retrieve available assessments with accurate operationalStatus', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/available`, {
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.ok(Array.isArray(json.data.assessments));

    const active = json.data.assessments.find((a: any) => a.id === activeAssessmentId);
    assert.ok(active, 'Active assessment should be returned');
    assert.strictEqual(active.operationalStatus, 'OPEN');
    assert.strictEqual(active.durationMinutes, 30);

    const scheduled = json.data.assessments.find((a: any) => a.id === scheduledAssessmentId);
    assert.ok(scheduled, 'Scheduled assessment should be returned');
    assert.strictEqual(scheduled.operationalStatus, 'SCHEDULED');
  });

  it('2. Unenrolled student does not receive assessments for offerings they are not enrolled in', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/available`, {
      headers: { Authorization: `Bearer ${unenrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    const found = json.data.assessments.find((a: any) => a.id === activeAssessmentId);
    assert.strictEqual(found, undefined, 'Unenrolled student must not receive assessments for this offering');
  });

  it('3. Eligible student can retrieve assessment instructions & pre-exam briefing', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${activeAssessmentId}/instructions`, {
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.assessment.id, activeAssessmentId);
    assert.strictEqual(json.data.assessment.canStart, true);
    assert.strictEqual(json.data.assessment.questionCount, 2);
    assert.strictEqual(json.data.assessment.attemptsCount, 0);
  });

  it('4. Ineligible student is rejected from retrieving instructions with 403 Forbidden', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${activeAssessmentId}/instructions`, {
      headers: { Authorization: `Bearer ${unenrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
  });

  // =========================================================================
  // TEST SUITE: ATTEMPT INITIATION & ANSWER PERSISTENCE
  // =========================================================================

  it('5. Starting attempt before scheduled startTime is rejected with 400 Bad Request', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${scheduledAssessmentId}/attempts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
    assert.ok(json.message.includes('not started yet'));
  });

  it('6. Starting attempt within open window succeeds, calculates server expiresAt, and redacts answer keys', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);

    const attempt = json.data.attempt;
    assert.ok(attempt.id, 'Attempt ID must be returned');
    assert.strictEqual(attempt.status, 'IN_PROGRESS');
    assert.strictEqual(attempt.attemptNumber, 1);
    assert.ok(attempt.remainingSeconds > 0 && attempt.remainingSeconds <= 1800);
    assert.ok(attempt.expiresAt, 'Server-authoritative expiresAt must be present');

    activeAttemptId = attempt.id;

    const questions = json.data.questions;
    assert.strictEqual(questions.length, 2);

    // CRITICAL SECURITY ASSERTIONS: Answer keys must be strictly redacted
    for (const q of questions) {
      assert.strictEqual(q.correctAnswer, undefined, 'correctAnswer must never be leaked to student!');
      assert.strictEqual(q.gradingPoints, undefined, 'gradingPoints must never be leaked to student!');
      assert.strictEqual(q.explanation, undefined, 'explanation must never be leaked to student!');
      assert.ok(q.question, 'Question text must be provided');
      assert.ok(q.assessmentQuestionId, 'assessmentQuestionId must be provided');
    }
  });

  it('7. Idempotent resumption returns same attempt and saved answers without creating a new attempt', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.attempt.id, activeAttemptId);
    assert.strictEqual(json.data.attempt.isResumed, true);
    assert.strictEqual(json.data.attempt.attemptNumber, 1);
  });

  it('8. Autosaving answers updates assessment_answers table with clientVersion ordering', async () => {
    const payload = {
      answers: [
        {
          assessmentQuestionId: activeAqCbtId,
          questionId: questionCbtId,
          answer: 'Manage hardware resources',
          clientVersion: 1,
          isFlagged: false,
        },
        {
          assessmentQuestionId: activeAqTheoryId,
          questionId: questionTheoryId,
          answer: 'Concurrency is dealing with many tasks at once, parallelism is doing them simultaneously.',
          clientVersion: 1,
          isFlagged: true,
        },
      ],
    };

    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/answers`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.savedCount, 2);

    // Verify database record directly
    const [cbtAns] = await db
      .select()
      .from(assessmentAnswersTable)
      .where(
        and(
          eq(assessmentAnswersTable.attemptId, activeAttemptId as any),
          eq(assessmentAnswersTable.assessmentQuestionId, activeAqCbtId as any)
        )
      );
    assert.ok(cbtAns);
    assert.strictEqual(cbtAns.answer, 'Manage hardware resources');
    assert.strictEqual(cbtAns.isFlagged, false);

    const [theoryAns] = await db
      .select()
      .from(assessmentAnswersTable)
      .where(
        and(
          eq(assessmentAnswersTable.attemptId, activeAttemptId as any),
          eq(assessmentAnswersTable.assessmentQuestionId, activeAqTheoryId as any)
        )
      );
    assert.ok(theoryAns);
    assert.strictEqual(theoryAns.isFlagged, true);
  });

  it('9. Unauthorized user attempting to save answers to another student attempt is rejected with 403', async () => {
    const payload = {
      answers: [
        {
          assessmentQuestionId: activeAqCbtId,
          questionId: questionCbtId,
          answer: 'Hacked answer',
          clientVersion: 99,
          isFlagged: false,
        },
      ],
    };

    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/answers`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${unenrolledStudentToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
  });

  it('10. Heartbeat ping updates lastHeartbeatAt timestamp', async () => {
    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/heartbeat`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${enrolledStudentToken}` },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.attempt.status, 'IN_PROGRESS');
  });

  // =========================================================================
  // TEST SUITE: SUBMISSION & ATTEMPT FINALIZATION
  // =========================================================================

  it('11. Submitting attempt sets status to SUBMITTED and strictly does not reveal marks (BB-07F.6 ownership)', async () => {
    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
        body: JSON.stringify({}),
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.attempt.status, 'SUBMITTED');
    assert.ok(json.data.attempt.submittedAt);

    // CRITICAL: Ensure no marks, grades, or answers are released in BB-07F.5
    assert.strictEqual(json.data.attempt.score, undefined);
    assert.strictEqual(json.data.attempt.totalScore, undefined);
  });

  it('12. Resubmitting an already submitted attempt is idempotent and succeeds without error', async () => {
    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/submit`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${enrolledStudentToken}` },
      }
    );

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);
    assert.strictEqual(json.data.attempt.status, 'SUBMITTED');
  });

  it('13. Attempting to save answers after submission is rejected with 400 Bad Request', async () => {
    const payload = {
      answers: [
        {
          assessmentQuestionId: activeAqCbtId,
          questionId: questionCbtId,
          answer: 'Changed after submission',
          clientVersion: 10,
          isFlagged: false,
        },
      ],
    };

    const res = await fetch(
      `${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts/${activeAttemptId}/answers`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
    assert.ok(json.message.includes('not in progress') || json.message.includes('already submitted'));
  });

  it('14. Starting attempt when maxAttempts is exhausted is rejected with 400 Bad Request', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${activeAssessmentId}/attempts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
    assert.ok(json.message.includes('Maximum attempt limit'));
  });

  // =========================================================================
  // TEST SUITE: LECTURER LIVE MONITORING & FORCE SUBMIT
  // =========================================================================

  it('15. Assigned course lecturer can retrieve live monitoring data, stats and roster', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${activeAssessmentId}/monitor`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, true);

    const data = json.data;
    assert.strictEqual(data.assessment.id, activeAssessmentId);
    assert.ok(data.stats.eligibleStudents >= 1);
    assert.ok(data.stats.startedAttempts >= 1);
    assert.ok(data.stats.submittedCount >= 1);

    // Verify Student 1 in roster
    const student1Roster = data.roster.find((r: any) => r.studentId === enrolledStudentId);
    assert.ok(student1Roster, 'Student 1 must appear in the monitoring roster');
    assert.strictEqual(student1Roster.attemptStatus, 'SUBMITTED');
    assert.strictEqual(student1Roster.answeredCount, 2);
  });

  it('16. Unassigned lecturer is rejected from live monitoring with 403 Forbidden', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${activeAssessmentId}/monitor`, {
      headers: { Authorization: `Bearer ${lecturer2Token}` },
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.strictEqual(json.success, false);
  });

  it('17. Assigned lecturer can emergency force-submit an ongoing attempt with mandatory audit reason', async () => {
    // 1. Student starts attempt on multi-attempt assessment
    const startRes = await fetch(`${baseUrl}/api/auth/assessments/${multiAttemptAssessmentId}/attempts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${enrolledStudentToken}` },
    });
    assert.strictEqual(startRes.status, 200);
    const startJson = (await startRes.json()) as any;
    const multiAttemptId = startJson.data.attempt.id;

    // 2. Force-submit without reason fails with 400
    const failRes = await fetch(
      `${baseUrl}/api/lecturer/assessments/${multiAttemptAssessmentId}/attempts/${multiAttemptId}/force-submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${lecturer1Token}`,
        },
        body: JSON.stringify({}),
      }
    );
    assert.strictEqual(failRes.status, 400);

    // 3. Force-submit with reason succeeds
    const forceRes = await fetch(
      `${baseUrl}/api/lecturer/assessments/${multiAttemptAssessmentId}/attempts/${multiAttemptId}/force-submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${lecturer1Token}`,
        },
        body: JSON.stringify({ reason: 'Student had a medical emergency during session' }),
      }
    );

    assert.strictEqual(forceRes.status, 200);
    const forceJson = (await forceRes.json()) as any;
    assert.strictEqual(forceJson.success, true);
    assert.strictEqual(forceJson.data.attempt.status, 'SUBMITTED');

    // Verify attempt in DB has status SUBMITTED
    const [attRecord] = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(eq(assessmentAttemptsTable.id, multiAttemptId as any));
    assert.ok(attRecord);
    assert.strictEqual(attRecord.status, 'SUBMITTED');
  });

  // =========================================================================
  // TEST SUITE: ZERO REGRESSION ON OPEN-PRACTICE QUIZZES
  // =========================================================================

  it('18. Open-practice quizzes and gamification continue working with zero disruption', async () => {
    const practicePayload = {
      courseId: testCourseId,
      category: 'general',
      quizType: 'cbt',
      answers: [
        {
          questionId: questionCbtId,
          answer: 'Manage hardware resources',
        },
      ],
    };

    const res = await fetch(`${baseUrl}/api/auth/quiz-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${enrolledStudentToken}`,
      },
      body: JSON.stringify(practicePayload),
    });

    assert.ok(res.status === 200 || res.status === 201);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');

    // Verify open-practice did NOT insert any assessment_attempts rows
    const assessmentAttemptsForPractice = await db
      .select()
      .from(assessmentAttemptsTable)
      .where(
        and(
          eq(assessmentAttemptsTable.studentId, enrolledStudentId as any),
          eq(assessmentAttemptsTable.assessmentId, testCourseId as any)
        )
      );
    assert.strictEqual(assessmentAttemptsForPractice.length, 0);
  });
});
