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
  assessmentAuditLogsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.4: Assessment Authoring & Scheduling Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let superAdminId: string;
  let superAdminToken: string;

  let lecturer1Id: string;
  let lecturer1Token: string;

  let lecturer2Id: string;
  let lecturer2Token: string;

  let enrolledStudentId: string;
  let enrolledStudentToken: string;

  let unenrolledStudentId: string;
  let unenrolledStudentToken: string;

  let question1Id: string;
  let question2Id: string;
  let otherCourseQuestionId: string;

  let draftAssessmentId: string;
  let publishedAssessmentId: string;

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

    // Setup Faculty & Department
    const [faculty] = await db
      .insert(facultiesTable)
      .values({
        name: `Engineering_${rand}`,
        code: `ENG_${rand}`,
      })
      .returning() as any[];
    testFacultyId = faculty.id;

    const [dept] = await db
      .insert(departmentsTable)
      .values({
        name: `Computer Science_${rand}`,
        code: `CSC_${rand}`,
        facultyId: testFacultyId,
      })
      .returning() as any[];
    testDepartmentId = dept.id;

    // Setup Course
    const [course] = await db
      .insert(coursesTable)
      .values({
        code: `CSC_ASSESS_${rand}`,
        title: 'Assessment Systems Testing',
        level: 200,
        semester: 'harmattan',
        departmentId: testDepartmentId,
        isActive: true,
      })
      .returning() as any[];
    testCourseId = course.id;

    // Setup other Course for negative question assignment testing
    const [otherCourse] = await db
      .insert(coursesTable)
      .values({
        code: `OTHER_CRS_${rand}`,
        title: 'Other Course Testing',
        level: 100,
        semester: 'harmattan',
        departmentId: testDepartmentId,
        isActive: true,
      })
      .returning() as any[];

    // Setup Offerings
    const [offering] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'harmattan',
        level: 200,
        section: 'A',
        status: 'ACTIVE',
      })
      .returning() as any[];
    testOfferingId = offering.id;

    const [unassignedOff] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'harmattan',
        level: 200,
        section: 'B',
        status: 'ACTIVE',
      })
      .returning() as any[];
    unassignedOfferingId = unassignedOff.id;

    // Setup Users: Super Admin
    const [superAdmin] = await db
      .insert(usersTable)
      .values({
        email: `admin_as_${timestamp}_${rand}@lautech.edu.ng`,
        password: 'hashed_admin_pass',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Super Admin Assessment',
      })
      .returning() as any[];
    superAdminId = superAdmin.id;
    const sTokens = await authService.generateAuthTokens({
      id: superAdmin.id,
      email: superAdmin.email!,
      role: superAdmin.role,
    });
    superAdminToken = sTokens.accessToken;

    // Lecturer 1 (Assigned to testOfferingId)
    const [lecturer1] = await db
      .insert(usersTable)
      .values({
        email: `lect1_as_${timestamp}_${rand}@lautech.edu.ng`,
        password: 'hashed_lecturer_pass',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Dr. Lecturer One',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      })
      .returning() as any[];
    lecturer1Id = lecturer1.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: lecturer1.id,
      email: lecturer1.email!,
      role: lecturer1.role,
    });
    lecturer1Token = l1Tokens.accessToken;

    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: lecturer1Id,
      role: 'PRIMARY',
      status: 'ACTIVE',
    });

    // Lecturer 2 (Not assigned to testOfferingId)
    const [lecturer2] = await db
      .insert(usersTable)
      .values({
        email: `lect2_as_${timestamp}_${rand}@lautech.edu.ng`,
        password: 'hashed_lecturer_pass',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Dr. Lecturer Two',
        departmentId: testDepartmentId,
        facultyId: testFacultyId,
      })
      .returning() as any[];
    lecturer2Id = lecturer2.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: lecturer2.id,
      email: lecturer2.email!,
      role: lecturer2.role,
    });
    lecturer2Token = l2Tokens.accessToken;

    // Enrolled Student
    const [enrolledStudent] = await db
      .insert(usersTable)
      .values({
        email: `enr_std_${timestamp}_${rand}@student.lautech.edu.ng`,
        password: 'hashed_student_pass',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Enrolled Student',
      })
      .returning() as any[];
    enrolledStudentId = enrolledStudent.id;
    const enrTokens = await authService.generateAuthTokens({
      id: enrolledStudent.id,
      email: enrolledStudent.email!,
      role: enrolledStudent.role,
    });
    enrolledStudentToken = enrTokens.accessToken;

    await db.insert(studentEnrollmentsTable).values({
      offeringId: testOfferingId,
      studentId: enrolledStudentId,
      status: 'ENROLLED',
    });

    // Unenrolled Student
    const [unenrolledStudent] = await db
      .insert(usersTable)
      .values({
        email: `unenr_std_${timestamp}_${rand}@student.lautech.edu.ng`,
        password: 'hashed_student_pass',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        fullName: 'Unenrolled Student',
      })
      .returning() as any[];
    unenrolledStudentId = unenrolledStudent.id;
    const unenrTokens = await authService.generateAuthTokens({
      id: unenrolledStudent.id,
      email: unenrolledStudent.email!,
      role: unenrolledStudent.role,
    });
    unenrolledStudentToken = unenrTokens.accessToken;

    // Setup Test Questions
    const [q1] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        type: 'cbt',
        question: 'What is a process control block (PCB)?',
        options: ['Data structure holding process information', 'Cache line', 'Virtual memory block', 'I/O buffer'],
        correctAnswer: 'Data structure holding process information',
        status: 'PUBLISHED',
        isPracticeEligible: true,
        points: 2,
      })
      .returning() as any[];
    question1Id = q1.id;

    const [q2] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: lecturer1Id,
        type: 'theory',
        question: 'Explain the critical section problem.',
        options: null,
        correctAnswer: 'Mutual exclusion among concurrently running processes accessing shared resources.',
        gradingPoints: [
          { concept: 'mutual exclusion', weight: 1 },
          { concept: 'progress', weight: 1 },
          { concept: 'bounded waiting', weight: 1 },
        ],
        status: 'PUBLISHED',
        isPracticeEligible: false, // Assessment-only question
        points: 3,
      })
      .returning() as any[];
    question2Id = q2.id;

    const [otherQ] = await db
      .insert(questionsTable)
      .values({
        courseId: otherCourse.id,
        type: 'cbt',
        question: 'Unrelated other question',
        options: ['A', 'B'],
        correctAnswer: 'A',
        status: 'PUBLISHED',
      })
      .returning() as any[];
    otherCourseQuestionId = otherQ.id;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // --------------------------------------------------------------------------
  // TEST SCENARIOS
  // --------------------------------------------------------------------------

  it('1. Authorized lecturer can create an assessment draft for assigned offering', async () => {
    const startTime = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
    const endTime = new Date(Date.now() + 4 * 3600 * 1000).toISOString();

    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'CSC201 Mid-Semester Test',
        description: 'Covers Operating System architecture.',
        type: 'CBT',
        durationMinutes: 60,
        startTime,
        endTime,
        maxAttempts: 1,
        isRandomized: true,
      }),
    });

    assert.strictEqual(res.status, 201);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.assessment.status, 'DRAFT');
    assert.strictEqual(json.data.assessment.durationMinutes, 60);
    draftAssessmentId = json.data.assessment.id;
  });

  it('2. Lecturer cannot create assessment for an unassigned course offering (403)', async () => {
    const startTime = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
    const endTime = new Date(Date.now() + 4 * 3600 * 1000).toISOString();

    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${unassignedOfferingId}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'Unauthorized Assessment',
        type: 'CBT',
        durationMinutes: 30,
        startTime,
        endTime,
      }),
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.match(json.message, /not actively assigned/i);
  });

  it('3. Validation rejects draft creation if endTime <= startTime or window < duration (400)', async () => {
    const startTime = new Date(Date.now() + 4 * 3600 * 1000).toISOString();
    const invalidEndTime = new Date(Date.now() + 2 * 3600 * 1000).toISOString();

    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'Invalid Timing Assessment',
        type: 'CBT',
        durationMinutes: 60,
        startTime,
        endTime: invalidEndTime,
      }),
    });

    assert.strictEqual(res.status, 400);
  });

  it('4. Lecturer can update draft parameters while in DRAFT status', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${draftAssessmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'CSC201 Mid-Semester Test (Updated)',
        durationMinutes: 50,
      }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.assessment.title, 'CSC201 Mid-Semester Test (Updated)');
    assert.strictEqual(json.data.assessment.durationMinutes, 50);
  });

  it('5. Lecturer can assign questions to draft assessment, computing total marks accurately', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${draftAssessmentId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        questions: [
          { questionId: question1Id, orderIndex: 0, allocatedMarks: 10 },
          { questionId: question2Id, orderIndex: 1, allocatedMarks: 15 },
        ],
      }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.questionCount, 2);
    assert.strictEqual(json.data.totalMarks, 25);
  });

  it('6. Validation rejects assigning questions from another unrelated course (400)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${draftAssessmentId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        questions: [{ questionId: otherCourseQuestionId, allocatedMarks: 5 }],
      }),
    });

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.match(json.message, /does not belong to course/i);
  });

  it('7. Validation rejects publication if assessment has 0 questions assigned (400)', async () => {
    // Create an empty assessment
    const startTime = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
    const endTime = new Date(Date.now() + 4 * 3600 * 1000).toISOString();

    const emptyRes = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'Empty Assessment',
        type: 'CBT',
        durationMinutes: 30,
        startTime,
        endTime,
      }),
    });
    const emptyJson = (await emptyRes.json()) as any;
    const emptyId = emptyJson.data.assessment.id;

    const pubRes = await fetch(`${baseUrl}/api/lecturer/assessments/${emptyId}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(pubRes.status, 400);
    const pubJson = (await pubRes.json()) as any;
    assert.match(pubJson.message, /zero questions/i);
  });

  it('8. Validation rejects publication if start time is in the past (400)', async () => {
    // Force start time in the past directly in DB for this test
    await db
      .update(assessmentsTable)
      .set({
        startTime: new Date(Date.now() - 3600 * 1000),
        endTime: new Date(Date.now() + 3600 * 1000),
      })
      .where(eq(assessmentsTable.id, draftAssessmentId));

    const pubRes = await fetch(`${baseUrl}/api/lecturer/assessments/${draftAssessmentId}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(pubRes.status, 400);
    const pubJson = (await pubRes.json()) as any;
    assert.match(pubJson.message, /future/i);

    // Restore valid future time
    await db
      .update(assessmentsTable)
      .set({
        startTime: new Date(Date.now() + 2 * 3600 * 1000),
        endTime: new Date(Date.now() + 4 * 3600 * 1000),
      })
      .where(eq(assessmentsTable.id, draftAssessmentId));
  });

  it('9. Lecturer publishes assessment; frozen question snapshots generated in database', async () => {
    const pubRes = await fetch(`${baseUrl}/api/lecturer/assessments/${draftAssessmentId}/publish`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(pubRes.status, 200);
    const pubJson = (await pubRes.json()) as any;
    assert.strictEqual(pubJson.data.assessment.status, 'PUBLISHED');
    publishedAssessmentId = draftAssessmentId;

    // Verify snapshots generated in assessment_questions table
    const snapshots = await db
      .select({
        questionId: assessmentQuestionsTable.questionId,
        snapshot: assessmentQuestionsTable.snapshot,
      })
      .from(assessmentQuestionsTable)
      .where(eq(assessmentQuestionsTable.assessmentId, publishedAssessmentId));

    assert.strictEqual(snapshots.length, 2);
    for (const s of snapshots) {
      assert.ok(s.snapshot !== null, 'Snapshot must not be null');
      assert.ok(typeof s.snapshot.question === 'string' && s.snapshot.question.length > 0);
      assert.ok(s.snapshot.correctAnswer !== undefined);
    }
  });

  it('10. Question edits in questions table do not alter published assessment snapshot (Immutability guarantee)', async () => {
    // Mutate underlying question in questions table
    await db
      .update(questionsTable)
      .set({ question: 'MUTATED QUESTION TEXT AFTER PUBLICATION' })
      .where(eq(questionsTable.id, question1Id));

    // Fetch assessment details
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${publishedAssessmentId}`, {
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    const q1 = json.data.assessment.questions.find((q: any) => q.questionId === question1Id);
    assert.strictEqual(q1.question, 'What is a process control block (PCB)?');
    assert.notStrictEqual(q1.question, 'MUTATED QUESTION TEXT AFTER PUBLICATION');
  });

  it('11. Published assessment content cannot be modified via update draft (400 Conflict/Immutable)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${publishedAssessmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        title: 'Attempting to mutate published title',
      }),
    });

    assert.strictEqual(res.status, 400);
    const json = (await res.json()) as any;
    assert.match(json.message, /immutable/i);
  });

  it('12. Lecturer can reschedule assessment before it opens; updates schedule and records audit log', async () => {
    const newStart = new Date(Date.now() + 3 * 3600 * 1000).toISOString();
    const newEnd = new Date(Date.now() + 5 * 3600 * 1000).toISOString();

    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${publishedAssessmentId}/reschedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        startTime: newStart,
        endTime: newEnd,
        reason: 'Shifted schedule for laboratory session',
      }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(new Date(json.data.assessment.startTime).toISOString(), newStart);

    // Verify audit log
    const auditLogs = await db
      .select({ action: assessmentAuditLogsTable.action, reason: assessmentAuditLogsTable.reason })
      .from(assessmentAuditLogsTable)
      .where(eq(assessmentAuditLogsTable.assessmentId, publishedAssessmentId));

    const rescheduleLog = auditLogs.find((l) => l.action === 'RESCHEDULED');
    assert.ok(rescheduleLog, 'RESCHEDULED audit log must exist');
    assert.strictEqual(rescheduleLog.reason, 'Shifted schedule for laboratory session');
  });

  it('13. Lecturer can extend closing deadline (endTime) while assessment is open', async () => {
    // Simulate assessment currently OPEN
    await db
      .update(assessmentsTable)
      .set({
        startTime: new Date(Date.now() - 30 * 60 * 1000), // started 30 mins ago
        endTime: new Date(Date.now() + 30 * 60 * 1000),   // ends in 30 mins
      })
      .where(eq(assessmentsTable.id, publishedAssessmentId));

    const extendedEnd = new Date(Date.now() + 90 * 60 * 1000).toISOString(); // extend by 1 hour

    const res = await fetch(`${baseUrl}/api/lecturer/assessments/${publishedAssessmentId}/extend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        endTime: extendedEnd,
        reason: 'Network outage on campus; 60 minute extension granted',
      }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(new Date(json.data.assessment.endTime).toISOString(), extendedEnd);
  });

  it('14. Eligible enrolled student discovers published assessment', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/assessments`, {
      headers: {
        Authorization: `Bearer ${enrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.ok(Array.isArray(json.data.assessments));
    assert.strictEqual(json.data.assessments.length, 1);
    assert.strictEqual(json.data.assessments[0].id, publishedAssessmentId);
    assert.strictEqual(json.data.assessments[0].operationalStatus, 'OPEN');
  });

  it('15. Unenrolled student cannot access assessment details (403 Forbidden)', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${publishedAssessmentId}`, {
      headers: {
        Authorization: `Bearer ${unenrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.match(json.message, /not officially enrolled/i);
  });

  it('16. Student endpoint strictly conceals correctAnswer and gradingPoints from questions', async () => {
    const res = await fetch(`${baseUrl}/api/auth/assessments/${publishedAssessmentId}`, {
      headers: {
        Authorization: `Bearer ${enrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    const questions = json.data.assessment.questions;
    assert.ok(questions.length >= 2);

    for (const q of questions) {
      assert.strictEqual(q.correctAnswer, undefined, 'correctAnswer must be redacted');
      assert.strictEqual(q.gradingPoints, undefined, 'gradingPoints must be redacted');
      assert.strictEqual(q.explanation, undefined, 'explanation must be redacted');
      assert.ok(q.question !== undefined, 'question text must be present');
      assert.ok(q.allocatedMarks !== undefined, 'allocatedMarks must be present');
    }
  });

  it('17. Admin can list assessments across all offerings with session and status filters', async () => {
    const res = await fetch(`${baseUrl}/api/admin/assessments?status=PUBLISHED&academicSession=2025/2026`, {
      headers: {
        Authorization: `Bearer ${superAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.ok(json.data.assessments.length >= 1);
    const found = json.data.assessments.find((a: any) => a.id === publishedAssessmentId);
    assert.ok(found, 'Admin list must include the published assessment');
    assert.strictEqual(found.creatorName, 'Dr. Lecturer One');
  });

  it('18. Admin can execute emergency suspension with recorded reason (200 OK)', async () => {
    const res = await fetch(`${baseUrl}/api/admin/assessments/${publishedAssessmentId}/suspend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        reason: 'Investigation of reported student compromise',
      }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.assessment.status, 'CANCELLED');
    assert.match(json.data.assessment.cancellationReason, /Admin Emergency Suspension/i);
  });

  it('19. Complete audit log trail is captured for assessment lifecycle', async () => {
    const res = await fetch(`${baseUrl}/api/admin/assessments/${publishedAssessmentId}/audit-logs`, {
      headers: {
        Authorization: `Bearer ${superAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    const actions = json.data.auditLogs.map((l: any) => l.action);

    assert.ok(actions.includes('CREATED'), 'Audit log must include CREATED');
    assert.ok(actions.includes('QUESTIONS_CHANGED'), 'Audit log must include QUESTIONS_CHANGED');
    assert.ok(actions.includes('PUBLISHED'), 'Audit log must include PUBLISHED');
    assert.ok(actions.includes('RESCHEDULED'), 'Audit log must include RESCHEDULED');
    assert.ok(actions.includes('TIME_EXTENDED'), 'Audit log must include TIME_EXTENDED');
    assert.ok(actions.includes('ADMIN_OVERRIDE_SUSPEND'), 'Audit log must include ADMIN_OVERRIDE_SUSPEND');
  });

  it('20. Open-practice isolation: unenrolled student can still retrieve open practice questions without error', async () => {
    const res = await fetch(`${baseUrl}/api/auth/courses/${testCourseId}/questions?type=cbt`, {
      headers: {
        Authorization: `Bearer ${unenrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.ok(Array.isArray(json.data));
    assert.strictEqual(json.data.length, 1);
    // question2 was marked isPracticeEligible = false, so only question1 is returned!
    assert.strictEqual(json.data[0].id, question1Id);
    assert.strictEqual(json.data[0].correctAnswer, undefined, 'Open practice must conceal answers');
  });

  it('21. Open-practice submission: student receives immediate grading and XP without creating assessment records', async () => {
    const res = await fetch(`${baseUrl}/api/auth/quiz-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${unenrolledStudentToken}`,
      },
      body: JSON.stringify({
        courseId: testCourseId,
        quizType: 'cbt',
        category: 'practice',
        answers: [{ questionId: question1Id, answer: 'Data structure holding process information' }],
      }),
    });

    assert.strictEqual(res.status, 201);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.ok(json.data?.id);
    assert.strictEqual(json.grading?.correctAnswers, 1);
    assert.strictEqual(json.grading?.totalQuestions, 1);
  });
});

