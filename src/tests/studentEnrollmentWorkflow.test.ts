import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'http';
import express from 'express';
import { db } from '../db/index.js';
import {
  usersTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  courseOfferingsTable,
  offeringLecturersTable,
  studentEnrollmentsTable,
  assessmentAttemptsTable,
  attendanceSessionsTable,
  attendanceRecordsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-06 / BB-07: Student Self-Enrollment & Lecturer Integration E2E Workflow', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let deptAId: string; // Software Engineering
  let deptBId: string; // Electrical Engineering

  let courseA1Id: string; // SEN 401 (400L, Harmattan, Dept A)
  let courseA2Id: string; // SEN 201 (200L, Harmattan, Dept A)
  let courseB1Id: string; // EEE 401 (400L, Harmattan, Dept B)

  let offeringA1Id: string; // SEN 401, Level 400, ACTIVE, maxCapacity = 2
  let offeringA2Id: string; // SEN 201, Level 200, ACTIVE
  let offeringB1Id: string; // EEE 401, Level 400, ACTIVE
  let offeringClosedId: string; // SEN 401, Level 400, CLOSED

  let student1Id: string; // Dept A, Level 400
  let student1Token: string;

  let student2Id: string; // Dept A, Level 400
  let student2Token: string;

  let student3Id: string; // Dept A, Level 400
  let student3Token: string;

  let studentInactiveId: string; // Dept A, Level 400, SUSPENDED
  let studentInactiveToken: string;

  let studentUnenrolledId: string; // Dept B, Level 400
  let studentUnenrolledToken: string;

  let lecturerId: string;
  let lecturerToken: string;

  let adminId: string;
  let adminToken: string;

  const testSession = '2026/2027';
  const testSemester = 'harmattan';

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

    // 1. Setup Faculty & 2 Departments
    const [fac] = await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Computing ${timestamp}_${rand}`,
        code: `FC_${rand}`.slice(0, 10),
      })
      .returning();
    testFacultyId = fac!.id;

    const [deptA] = await db
      .insert(departmentsTable)
      .values({
        name: `Software Engineering ${timestamp}_${rand}`,
        code: `SE_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    deptAId = deptA!.id;

    const [deptB] = await db
      .insert(departmentsTable)
      .values({
        name: `Electrical Engineering ${timestamp}_${rand}`,
        code: `EE_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    deptBId = deptB!.id;

    // 2. Setup Courses
    const [cA1] = await db
      .insert(coursesTable)
      .values({
        code: `SEN401_${rand}`.slice(0, 10),
        title: 'Advanced Software Architecture',
        level: 400,
        semester: testSemester,
        departmentId: deptAId,
        isActive: true,
      })
      .returning();
    courseA1Id = cA1!.id;

    const [cA2] = await db
      .insert(coursesTable)
      .values({
        code: `SEN201_${rand}`.slice(0, 10),
        title: 'Introduction to Software Engineering',
        level: 200,
        semester: testSemester,
        departmentId: deptAId,
        isActive: true,
      })
      .returning();
    courseA2Id = cA2!.id;

    const [cB1] = await db
      .insert(coursesTable)
      .values({
        code: `EEE401_${rand}`.slice(0, 10),
        title: 'Control Systems Engineering',
        level: 400,
        semester: testSemester,
        departmentId: deptBId,
        isActive: true,
      })
      .returning();
    courseB1Id = cB1!.id;

    // 3. Setup Course Offerings
    const [offA1] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'A',
        status: 'ACTIVE',
        maxCapacity: 2,
      })
      .returning();
    offeringA1Id = offA1!.id;

    const [offA2] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: courseA2Id,
        academicSession: testSession,
        semester: testSemester,
        level: 200,
        section: 'DEFAULT',
        status: 'ACTIVE',
      })
      .returning();
    offeringA2Id = offA2!.id;

    const [offB1] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: courseB1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'DEFAULT',
        status: 'ACTIVE',
      })
      .returning();
    offeringB1Id = offB1!.id;

    const [offClosed] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'CLOSED_SEC',
        status: 'CLOSED',
      })
      .returning();
    offeringClosedId = offClosed!.id;

    // 4. Setup Users & Auth Tokens
    const [adminUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Super Admin Workflow',
        email: `admin_wf_${timestamp}@test.edu`,
        username: `admin_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    adminId = adminUser!.id;
    const adminTokens = await authService.generateAuthTokens({
      id: adminUser!.id,
      email: adminUser!.email!,
      role: adminUser!.role,
    });
    adminToken = adminTokens.accessToken;

    const [lecturerUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Test Lecturer',
        email: `lecturer_wf_${timestamp}@test.edu`,
        username: `lecturer_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        facultyId: testFacultyId,
      })
      .returning();
    lecturerId = lecturerUser!.id;
    const lecturerTokens = await authService.generateAuthTokens({
      id: lecturerUser!.id,
      email: lecturerUser!.email!,
      role: lecturerUser!.role,
    });
    lecturerToken = lecturerTokens.accessToken;

    // Assign lecturer to offeringA1
    await db.insert(offeringLecturersTable).values({
      offeringId: offeringA1Id,
      lecturerId: lecturerId,
      role: 'PRIMARY',
      status: 'ACTIVE',
    });

    // Students
    const [st1] = await db
      .insert(usersTable)
      .values({
        fullName: 'Alice Student',
        email: `student1_wf_${timestamp}@test.edu`,
        username: `student1_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        facultyId: testFacultyId,
        level: 400,
      })
      .returning();
    student1Id = st1!.id;
    const st1Tokens = await authService.generateAuthTokens({
      id: st1!.id,
      email: st1!.email!,
      role: st1!.role,
    });
    student1Token = st1Tokens.accessToken;

    const [st2] = await db
      .insert(usersTable)
      .values({
        fullName: 'Bob Student',
        email: `student2_wf_${timestamp}@test.edu`,
        username: `student2_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        facultyId: testFacultyId,
        level: 400,
      })
      .returning();
    student2Id = st2!.id;
    const st2Tokens = await authService.generateAuthTokens({
      id: st2!.id,
      email: st2!.email!,
      role: st2!.role,
    });
    student2Token = st2Tokens.accessToken;

    const [st3] = await db
      .insert(usersTable)
      .values({
        fullName: 'Charlie Student',
        email: `student3_wf_${timestamp}@test.edu`,
        username: `student3_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        facultyId: testFacultyId,
        level: 400,
      })
      .returning();
    student3Id = st3!.id;
    const st3Tokens = await authService.generateAuthTokens({
      id: st3!.id,
      email: st3!.email!,
      role: st3!.role,
    });
    student3Token = st3Tokens.accessToken;

    const [stInactive] = await db
      .insert(usersTable)
      .values({
        fullName: 'Suspended Student',
        email: `student_susp_${timestamp}@test.edu`,
        username: `student_susp_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.SUSPENDED,
        departmentId: deptAId,
        facultyId: testFacultyId,
        level: 400,
      })
      .returning();
    studentInactiveId = stInactive!.id;
    const stInactiveTokens = await authService.generateAuthTokens({
      id: stInactive!.id,
      email: stInactive!.email!,
      role: stInactive!.role,
    });
    studentInactiveToken = stInactiveTokens.accessToken;

    const [stUnenrolled] = await db
      .insert(usersTable)
      .values({
        fullName: 'Unenrolled Dept B Student',
        email: `student_unenr_${timestamp}@test.edu`,
        username: `student_unenr_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptBId,
        facultyId: testFacultyId,
        level: 400,
      })
      .returning();
    studentUnenrolledId = stUnenrolled!.id;
    const stUnenrolledTokens = await authService.generateAuthTokens({
      id: stUnenrolled!.id,
      email: stUnenrolled!.email!,
      role: stUnenrolled!.role,
    });
    studentUnenrolledToken = stUnenrolledTokens.accessToken;
  });

  after(async () => {
    // Teardown test server and clean up test records
    await new Promise<void>((resolve) => server.close(() => resolve()));

    try {
      if (offeringA1Id) {
        await db.delete(attendanceRecordsTable).where(eq(attendanceRecordsTable.studentId, student1Id as any));
        await db.delete(attendanceSessionsTable).where(eq(attendanceSessionsTable.offeringId, offeringA1Id as any));
        // deleted with cascade
        await db.delete(studentEnrollmentsTable).where(eq(studentEnrollmentsTable.offeringId, offeringA1Id as any));
        await db.delete(offeringLecturersTable).where(eq(offeringLecturersTable.offeringId, offeringA1Id as any));
        await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, offeringA1Id as any));
      }
      if (offeringA2Id) await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, offeringA2Id as any));
      if (offeringB1Id) await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, offeringB1Id as any));
      if (offeringClosedId) await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, offeringClosedId as any));

      if (courseA1Id) await db.delete(coursesTable).where(eq(coursesTable.id, courseA1Id as any));
      if (courseA2Id) await db.delete(coursesTable).where(eq(coursesTable.id, courseA2Id as any));
      if (courseB1Id) await db.delete(coursesTable).where(eq(coursesTable.id, courseB1Id as any));

      const userIds = [student1Id, student2Id, student3Id, studentInactiveId, studentUnenrolledId, lecturerId, adminId].filter(Boolean);
      for (const uid of userIds) {
        await db.delete(usersTable).where(eq(usersTable.id, uid as any));
      }

      if (deptAId) await db.delete(departmentsTable).where(eq(departmentsTable.id, deptAId as any));
      if (deptBId) await db.delete(departmentsTable).where(eq(departmentsTable.id, deptBId as any));
      if (testFacultyId) await db.delete(facultiesTable).where(eq(facultiesTable.id, testFacultyId as any));
    } catch (cleanupErr) {
      // Ignore teardown errors
    }
  });

  // =========================================================================
  // STEP 1 & 2: Student Fetches Available Offerings Filtered by Profile
  // =========================================================================
  it('Step 1 & 2: Only offerings matching student department and level are displayed in available offerings', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/available`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.offerings));

    const returnedOfferings = body.data.offerings;
    const offeringIds = returnedOfferings.map((o: any) => o.id);

    // Offering A1 (Dept A, 400L, ACTIVE) MUST be displayed
    assert.ok(offeringIds.includes(offeringA1Id), 'Offering A1 (Dept A, 400L) should be displayed');

    // Offering A2 (Dept A, 200L) MUST NOT be displayed (student is 400L)
    assert.ok(!offeringIds.includes(offeringA2Id), 'Offering A2 (200L) must not be displayed for 400L student');

    // Offering B1 (Dept B, 400L) MUST NOT be displayed (student is in Dept A)
    assert.ok(!offeringIds.includes(offeringB1Id), 'Offering B1 (Dept B) must not be displayed for Dept A student');

    // Offering Closed (CLOSED status) MUST NOT be displayed
    assert.ok(!offeringIds.includes(offeringClosedId), 'Closed offering must not be displayed');

    // Initial enrollment status must be false
    const offA1 = returnedOfferings.find((o: any) => o.id === offeringA1Id);
    assert.strictEqual(offA1.isEnrolled, false);
    assert.strictEqual(offA1.enrollmentStatus, null);
  });

  it('Step 2: Respects semester and session query filters for eligible student', async () => {
    // When querying with matching semester and session
    const res = await fetch(`${baseUrl}/api/auth/offerings/available?semester=${testSemester}&academicSession=${testSession}`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    const offeringIds = body.data.offerings.map((o: any) => o.id);
    assert.ok(offeringIds.includes(offeringA1Id));

    // When querying with non-matching semester
    const resMismatch = await fetch(`${baseUrl}/api/auth/offerings/available?semester=rain&academicSession=${testSession}`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(resMismatch.status, 200);
    const bodyMismatch = await resMismatch.json() as any;
    const offeringIdsMismatch = bodyMismatch.data.offerings.map((o: any) => o.id);
    assert.ok(!offeringIdsMismatch.includes(offeringA1Id), 'Should filter out Harmattan offerings when Rain is requested');
  });

  // =========================================================================
  // STEP 3: Student Successfully Enrolls in Eligible Offering
  // =========================================================================
  it('Step 3: Student successfully self-enrolls in an eligible course offering', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });

    assert.strictEqual(res.status, 201);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.message, 'Successfully enrolled in course offering.');
    assert.strictEqual(body.data.enrollment.status, 'ENROLLED');
    assert.strictEqual(body.data.enrollment.source, 'STUDENT_SELF');

    // Verify database record
    const [dbRec] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringA1Id as any),
          eq(studentEnrollmentsTable.studentId, student1Id as any)
        )
      );
    assert.ok(dbRec, 'Database record must exist');
    assert.strictEqual(dbRec.status, 'ENROLLED');
    assert.strictEqual(dbRec.source, 'STUDENT_SELF');

    // Verify available offerings endpoint now reflects isEnrolled: true
    const checkRes = await fetch(`${baseUrl}/api/auth/offerings/available`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    const checkBody = await checkRes.json() as any;
    const enrolledOff = checkBody.data.offerings.find((o: any) => o.id === offeringA1Id);
    assert.ok(enrolledOff);
    assert.strictEqual(enrolledOff.isEnrolled, true);
    assert.strictEqual(enrolledOff.enrollmentStatus, 'ENROLLED');
  });

  // =========================================================================
  // STEP 4: Duplicate & Ineligible/Closed Offerings Rejected Appropriately
  // =========================================================================
  it('Step 4a: Rejects duplicate active enrollment with 400 Bad Request', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.ok(body.message.includes('already actively enrolled'));
  });

  it('Step 4b: Rejects self-enrollment in closed offering with 400 Bad Request', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringClosedId}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.ok(body.message.includes('closed'));
  });

  it('Step 4c: Rejects self-enrollment into offering outside student department', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringB1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.ok(body.message.includes('outside their department'));
  });

  it('Step 4d: Rejects self-enrollment into offering at mismatched academic level', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringA2Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });

    assert.strictEqual(res.status, 400);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.ok(body.message.includes('level'));
  });

  it('Step 4e: Rejects enrollment for inactive or suspended student', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${studentInactiveToken}`,
        'Content-Type': 'application/json',
      },
    });

    assert.ok(res.status === 403 || res.status === 400, 'Suspended student must be rejected with 403 or 400');
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.ok(body.message.toLowerCase().includes('suspended') || body.message.toLowerCase().includes('disabled'));
  });

  it('Step 4f: Rejects enrollment when offering reaches max capacity', async () => {
    // offeringA1 has maxCapacity = 2. Student 1 is enrolled (1/2).
    // Enroll Student 2 successfully (2/2).
    const res2 = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student2Token}`,
        'Content-Type': 'application/json',
      },
    });
    assert.strictEqual(res2.status, 201);

    // Student 3 attempts enrollment when offering is full (2/2)
    const res3 = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student3Token}`,
        'Content-Type': 'application/json',
      },
    });
    assert.strictEqual(res3.status, 400);
    const body3 = await res3.json() as any;
    assert.strictEqual(body3.status, 'fail');
    assert.ok(body3.message.includes('maximum capacity'));
  });

  // =========================================================================
  // STEP 5: Enrolled Student Appears in Lecturer Roster, Attendance & Gradebook
  // =========================================================================
  let attendanceSessionId: string;

  it('Step 5a: Enrolled student appears in lecturer course enrollments roster', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/enrollments`, {
      headers: { Authorization: `Bearer ${lecturerToken}` },
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.enrollments));

    const enrolledStudents = body.data.enrollments;
    const student1Entry = enrolledStudents.find((e: any) => e.studentId === student1Id);
    assert.ok(student1Entry, 'Student 1 must appear in lecturer course roster');
    assert.strictEqual(student1Entry.fullName, 'Alice Student');
    assert.strictEqual(student1Entry.status, 'ENROLLED');
    assert.strictEqual(student1Entry.source, 'STUDENT_SELF');
  });

  it('Step 5b: Enrolled student appears in lecturer attendance session roster', async () => {
    // Lecturer creates an attendance session
    const createRes = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/attendance/sessions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Week 1 Lecture: System Architecture',
        sessionDate: '2026-11-06',
        sessionType: 'LECTURE',
      }),
    });
    assert.strictEqual(createRes.status, 201);
    const createBody = await createRes.json() as any;
    attendanceSessionId = createBody.data.id;
    assert.ok(attendanceSessionId, 'attendanceSessionId must be returned');

    // Fetch session details & roster
    const sessionRes = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/attendance/sessions/${attendanceSessionId}`, {
      headers: { Authorization: `Bearer ${lecturerToken}` },
    });
    assert.strictEqual(sessionRes.status, 200);
    const sessionBody = await sessionRes.json() as any;
    assert.ok(Array.isArray(sessionBody.data.roster));

    const rosterStudentIds = sessionBody.data.roster.map((r: any) => r.studentId);
    assert.ok(rosterStudentIds.includes(student1Id), 'Student 1 must appear in session attendance roster');
    assert.ok(rosterStudentIds.includes(student2Id), 'Student 2 must appear in session attendance roster');
    assert.ok(!rosterStudentIds.includes(studentUnenrolledId), 'Unenrolled student must NOT appear in attendance roster');
  });

  it('Step 5c: Enrolled student appears in lecturer course gradebook roster', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/gradebook`, {
      headers: { Authorization: `Bearer ${lecturerToken}` },
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.students));

    const gradebookStudentIds = body.data.students.map((st: any) => st.student?.studentId || st.studentId);
    assert.ok(gradebookStudentIds.includes(student1Id), 'Student 1 must appear in gradebook');
    assert.ok(gradebookStudentIds.includes(student2Id), 'Student 2 must appear in gradebook');
  });

  // =========================================================================
  // STEP 6: Assessments and Attendance Available to Enrolled Student in Mobile
  // =========================================================================
  it('Step 6: Enrolled student can fetch offering assessments and attendance in mobile app', async () => {
    // 1. Fetch assessments for offeringA1 as enrolled student
    const assessRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/assessments`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(assessRes.status, 200);
    const assessBody = await assessRes.json() as any;
    assert.strictEqual(assessBody.status, 'success');
    assert.ok(Array.isArray(assessBody.data.assessments));

    // 2. Fetch attendance for offeringA1 as enrolled student
    const attendRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/attendance`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(attendRes.status, 200);
    const attendBody = await attendRes.json() as any;
    assert.strictEqual(attendBody.status, 'success');
    assert.ok(attendBody.data.summary, 'Must return attendance summary');
    assert.ok(Array.isArray(attendBody.data.history), 'Must return attendance history');

    // 3. Unenrolled student is rejected from viewing offering assessments & attendance
    const unenrollAssessRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/assessments`, {
      headers: { Authorization: `Bearer ${studentUnenrolledToken}` },
    });
    assert.strictEqual(unenrollAssessRes.status, 403);

    const unenrollAttendRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/attendance`, {
      headers: { Authorization: `Bearer ${studentUnenrolledToken}` },
    });
    assert.strictEqual(unenrollAttendRes.status, 403);
  });

  // =========================================================================
  // STEP 7: Student Participation Reflected in Lecturer's Records
  // =========================================================================
  it('Step 7: Student participation in attendance is reflected in lecturer records', async () => {
    // Lecturer records attendance for student 1
    const recordRes = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/attendance/sessions/${attendanceSessionId}/records`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          { studentId: student1Id, status: 'PRESENT', notes: 'Attended full lecture' },
        ],
      }),
    });

    assert.strictEqual(recordRes.status, 200);
    const recordBody = await recordRes.json() as any;
    assert.strictEqual(recordBody.status, 'success');

    // Lecturer checks attendance summary
    const summaryRes = await fetch(`${baseUrl}/api/lecturer/offerings/${offeringA1Id}/attendance/summary`, {
      headers: { Authorization: `Bearer ${lecturerToken}` },
    });
    assert.strictEqual(summaryRes.status, 200);
    const summaryBody = await summaryRes.json() as any;
    assert.strictEqual(summaryBody.status, 'success');
    assert.ok(summaryBody.data.metrics.enrolledStudentsCount >= 1);
    const st1Summary = summaryBody.data.students.find((s: any) => s.studentId === student1Id);
    assert.ok(st1Summary, 'Student 1 must appear in attendance summary');
    assert.strictEqual(st1Summary.presentCount, 1);
  });

  // =========================================================================
  // STEP 8: Dropping Course Preserves Historical Attempts, Grades & Attendance
  // =========================================================================
  it('Step 8: Dropping a course sets status to DROPPED and preserves historical academic records', async () => {
    // 1. Verify an attendance record exists for student 1 before dropping
    const [attBefore] = await db
      .select()
      .from(attendanceRecordsTable)
      .where(
        and(
          eq(attendanceRecordsTable.sessionId, attendanceSessionId as any),
          eq(attendanceRecordsTable.studentId, student1Id as any)
        )
      );
    assert.ok(attBefore, 'Attendance record must exist before drop');
    assert.strictEqual(attBefore.status, 'PRESENT');

    // 2. Student drops the course offering
    const dropRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    assert.strictEqual(dropRes.status, 200);
    const dropBody = await dropRes.json() as any;
    assert.strictEqual(dropBody.status, 'success');
    assert.strictEqual(dropBody.message, 'Successfully dropped course offering.');

    // 3. Verify enrollment record is updated to DROPPED with droppedAt timestamp
    const [enrollmentRec] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringA1Id as any),
          eq(studentEnrollmentsTable.studentId, student1Id as any)
        )
      );
    assert.ok(enrollmentRec, 'Enrollment row must NOT be deleted');
    assert.strictEqual(enrollmentRec.status, 'DROPPED');
    assert.ok(enrollmentRec.droppedAt !== null, 'droppedAt timestamp must be recorded');

    // 4. Verify historical attendance record is STILL PRESERVED in the database
    const [attAfter] = await db
      .select()
      .from(attendanceRecordsTable)
      .where(
        and(
          eq(attendanceRecordsTable.sessionId, attendanceSessionId as any),
          eq(attendanceRecordsTable.studentId, student1Id as any)
        )
      );
    assert.ok(attAfter, 'Attendance record must remain intact after course drop');
    assert.strictEqual(attAfter.status, 'PRESENT');

    // 5. Verify student can re-enroll if desired and retains history
    const reEnrollRes = await fetch(`${baseUrl}/api/auth/offerings/${offeringA1Id}/enroll`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${student1Token}`,
        'Content-Type': 'application/json',
      },
    });
    assert.strictEqual(reEnrollRes.status, 201);
    const reEnrollBody = await reEnrollRes.json() as any;
    assert.strictEqual(reEnrollBody.data.enrollment.status, 'ENROLLED');
  });
});
