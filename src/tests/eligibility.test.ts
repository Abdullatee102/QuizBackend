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
  questionsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
  studentEnrollmentsTable,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import { eligibilityService } from '../services/eligibilityService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.2: Course Offering & Student Eligibility Foundation Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let deptAId: string;
  let deptBId: string;
  let courseA1Id: string;
  let courseB1Id: string;
  let inactiveCourseId: string;
  let sampleQuestionId: string;

  let superAdminId: string;
  let superAdminToken: string;

  let contentAdminId: string;
  let contentAdminToken: string;

  let lecturer1Id: string;
  let lecturer1Email: string;
  let lecturer1Token: string;

  let lecturer2Id: string;
  let lecturer2Email: string;
  let lecturer2Token: string;

  let student1Id: string; // 400L in Dept A
  let student1Token: string;

  let student2Id: string;
  let student2Token: string;

  let student3Id: string;
  let student3Token: string;

  let studentUnenrolledId: string;
  let studentUnenrolledToken: string;

  let studentSameProfileId: string; // Same dept/level as courseA1 but not enrolled

  // Dynamic test variables populated during tests
  let offering1Id: string;
  let offeringSectionBId: string;
  let offeringElectiveId: string;
  let enrollment1Id: string;

  const testSession = '2026/2027';
  const testSemester = 'harmattan';

  before(async () => {
    // 1. Initialize Express test server on ephemeral port
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

    // 2. Setup Faculty & 2 Departments
    const [fac] = await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Engineering ${timestamp}_${rand}`,
        code: `FE_${rand}`.slice(0, 10),
      })
      .returning();
    if (!fac) throw new Error('Failed to create faculty');
    testFacultyId = fac.id;

    const [deptA] = await db
      .insert(departmentsTable)
      .values({
        name: `Computer Engineering ${timestamp}_${rand}`,
        code: `CP_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    if (!deptA) throw new Error('Failed to create department A');
    deptAId = deptA.id;

    const [deptB] = await db
      .insert(departmentsTable)
      .values({
        name: `Mechanical Engineering ${timestamp}_${rand}`,
        code: `ME_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    if (!deptB) throw new Error('Failed to create department B');
    deptBId = deptB.id;

    // 3. Setup Test Courses
    // Course A1: 400L Computer Engineering (Active)
    const [cA1] = await db
      .insert(coursesTable)
      .values({
        code: `CPE_${rand}`.slice(0, 10),
        title: 'Embedded Systems Design',
        level: 400,
        semester: 'harmattan',
        departmentId: deptAId,
        isActive: true,
      })
      .returning();
    if (!cA1) throw new Error('Failed to create Course A1');
    courseA1Id = cA1.id;

    // Insert sample questions for Course A1 to support open practice tests
    const [q1] = await db.insert(questionsTable).values([
      {
        courseId: courseA1Id,
        type: 'cbt',
        question: 'What is a microcontroller?',
        options: ['A small computer on a single IC', 'A monitor', 'A cable', 'A keyboard'],
        correctAnswer: 'A small computer on a single IC',
        difficulty: 'medium',
        isActive: true,
      },
    ]).returning();
    if (!q1) throw new Error('Failed to create test question');
    sampleQuestionId = q1.id;

    // Course B1: 200L Mechanical Engineering (Active)
    const [cB1] = await db
      .insert(coursesTable)
      .values({
        code: `MEE_${rand}`.slice(0, 10),
        title: 'Engineering Thermodynamics',
        level: 200,
        semester: 'harmattan',
        departmentId: deptBId,
        isActive: true,
      })
      .returning();
    if (!cB1) throw new Error('Failed to create Course B1');
    courseB1Id = cB1.id;

    // Inactive Course
    const [cInactive] = await db
      .insert(coursesTable)
      .values({
        code: `INA_${rand}`.slice(0, 10),
        title: 'Deprecated Engineering Code',
        level: 400,
        semester: 'harmattan',
        departmentId: deptAId,
        isActive: false,
      })
      .returning();
    if (!cInactive) throw new Error('Failed to create inactive course');
    inactiveCourseId = cInactive.id;

    // 4. Setup Users & Auth Tokens
    // Super Admin
    const [adminUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Super Administrator',
        email: `sadmin_${timestamp}@lautech.edu.ng`,
        username: `sadmin_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    if (!adminUser) throw new Error('Failed to create super admin');
    superAdminId = adminUser.id;
    const adminTokens = await authService.generateAuthTokens({
      id: adminUser.id,
      email: adminUser.email!,
      role: adminUser.role,
    });
    superAdminToken = adminTokens.accessToken;

    // Content Admin
    const [contentAdminUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Content Administrator',
        email: `cadmin_${timestamp}@lautech.edu.ng`,
        username: `cadmin_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.CONTENT_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    if (!contentAdminUser) throw new Error('Failed to create content admin');
    contentAdminId = contentAdminUser.id;
    const cadminTokens = await authService.generateAuthTokens({
      id: contentAdminUser.id,
      email: contentAdminUser.email!,
      role: contentAdminUser.role,
    });
    contentAdminToken = cadminTokens.accessToken;

    // Lecturer 1
    lecturer1Email = `lecturer1_${timestamp}@lautech.edu.ng`;
    const [l1] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Lecturer One',
        email: lecturer1Email,
        username: `lecturer1_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: deptAId,
      })
      .returning();
    if (!l1) throw new Error('Failed to create lecturer 1');
    lecturer1Id = l1.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: l1.id,
      email: l1.email!,
      role: l1.role,
    });
    lecturer1Token = l1Tokens.accessToken;

    // Lecturer 2
    lecturer2Email = `lecturer2_${timestamp}@lautech.edu.ng`;
    const [l2] = await db
      .insert(usersTable)
      .values({
        fullName: 'Engr. Lecturer Two',
        email: lecturer2Email,
        username: `lecturer2_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: deptAId,
      })
      .returning();
    if (!l2) throw new Error('Failed to create lecturer 2');
    lecturer2Id = l2.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: l2.id,
      email: l2.email!,
      role: l2.role,
    });
    lecturer2Token = l2Tokens.accessToken;

    // Student 1 (400L, Dept A)
    const [s1] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student One (Eligible)',
        email: `student1_${timestamp}@student.lautech.edu.ng`,
        username: `student1_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: deptAId,
        level: 400,
      })
      .returning();
    if (!s1) throw new Error('Failed to create student 1');
    student1Id = s1.id;
    const s1Tokens = await authService.generateAuthTokens({
      id: s1.id,
      email: s1.email!,
      role: s1.role,
    });
    student1Token = s1Tokens.accessToken;

    // Student 2 (For bulk enrollment)
    const [s2] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Two',
        email: `student2_${timestamp}@student.lautech.edu.ng`,
        username: `student2_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        level: 400,
      })
      .returning();
    if (!s2) throw new Error('Failed to create student 2');
    student2Id = s2.id;
    const s2Tokens = await authService.generateAuthTokens({
      id: s2.id,
      email: s2.email!,
      role: s2.role,
    });
    student2Token = s2Tokens.accessToken;

    // Student 3 (For bulk enrollment)
    const [s3] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Three',
        email: `student3_${timestamp}@student.lautech.edu.ng`,
        username: `student3_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        level: 400,
      })
      .returning();
    if (!s3) throw new Error('Failed to create student 3');
    student3Id = s3.id;
    const s3Tokens = await authService.generateAuthTokens({
      id: s3.id,
      email: s3.email!,
      role: s3.role,
    });
    student3Token = s3Tokens.accessToken;

    // Student Unenrolled
    const [sUnenrolled] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Unenrolled',
        email: `unenrolled_${timestamp}@student.lautech.edu.ng`,
        username: `unenrolled_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptBId,
        level: 200,
      })
      .returning();
    if (!sUnenrolled) throw new Error('Failed to create unenrolled student');
    studentUnenrolledId = sUnenrolled.id;
    const sUnenrolledTokens = await authService.generateAuthTokens({
      id: sUnenrolled.id,
      email: sUnenrolled.email!,
      role: sUnenrolled.role,
    });
    studentUnenrolledToken = sUnenrolledTokens.accessToken;

    // Student with same profile (Dept A, 400L) but deliberately NOT enrolled
    const [sSameProfile] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Same Profile Not Enrolled',
        email: `sameprofile_${timestamp}@student.lautech.edu.ng`,
        username: `sameprofile_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: deptAId,
        level: 400,
      })
      .returning();
    if (!sSameProfile) throw new Error('Failed to create same-profile student');
    studentSameProfileId = sSameProfile.id;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // 1. COURSE OFFERINGS TESTS (Tests 1 - 6)
  // =========================================================================

  it('1. Authorized administrator can create an offering', async () => {
    const res = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'A',
        status: 'ACTIVE',
        maxCapacity: 100,
      }),
    });

    assert.strictEqual(res.status, 201);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data.offering.id);
    assert.strictEqual(body.data.offering.section, 'A');
    assert.strictEqual(body.data.offering.status, 'ACTIVE');

    offering1Id = body.data.offering.id;
  });

  it('2. Unauthorized users cannot create or modify offerings', async () => {
    // Unauthenticated
    const res1 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
      }),
    });
    assert.strictEqual(res1.status, 401);

    // Student
    const res2 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${student1Token}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
      }),
    });
    assert.strictEqual(res2.status, 403);

    // Lecturer attempting admin endpoint
    const res3 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
      }),
    });
    assert.strictEqual(res3.status, 403);
  });

  it('3. Academic session and semester validation works', async () => {
    // Non-consecutive years (e.g. 2026/2028)
    const res1 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: '2026/2028',
        semester: 'harmattan',
        level: 400,
      }),
    });
    assert.strictEqual(res1.status, 400);

    // Invalid semester (e.g. 'summer')
    const res2 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: 'summer',
        level: 400,
      }),
    });
    assert.strictEqual(res2.status, 400);
  });

  it('4. Duplicate offerings are handled correctly', async () => {
    // Attempt to re-create the exact same offering (courseA1Id, session, semester, section 'A')
    const res = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'A',
      }),
    });

    assert.strictEqual(res.status, 409);
    const body = (await res.json()) as any;
    assert.ok(body.message.includes('already exists'));
  });

  it('5. Inactive catalogue courses cannot be published as active offerings', async () => {
    const res = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: inactiveCourseId,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
      }),
    });

    assert.strictEqual(res.status, 400);
    const body = (await res.json()) as any;
    assert.ok(body.message.includes('Inactive catalogue courses cannot be published'));
  });

  it('6. Offering status changes behave correctly', async () => {
    // Change offering status to COMPLETED
    const res1 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'COMPLETED' }),
    });

    assert.strictEqual(res1.status, 200);
    const body1 = (await res1.json()) as any;
    assert.strictEqual(body1.data.offering.status, 'COMPLETED');

    // Restore to ACTIVE for remaining tests
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'ACTIVE' }),
    });

    assert.strictEqual(res2.status, 200);
    const body2 = (await res2.json()) as any;
    assert.strictEqual(body2.data.offering.status, 'ACTIVE');
  });

  // =========================================================================
  // 2. LECTURER ASSIGNMENTS TESTS (Tests 7 - 10)
  // =========================================================================

  it('7. Authorized administrators can assign lecturers to offerings', async () => {
    const res = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/lecturers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        lecturerId: lecturer1Id,
        role: 'PRIMARY',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.assignment.lecturerId, lecturer1Id);
    assert.strictEqual(body.data.assignment.role, 'PRIMARY');
    assert.strictEqual(body.data.assignment.status, 'ACTIVE');
  });

  it('8. Lecturers can access only offerings assigned to them (IDOR defense)', async () => {
    // Lecturer 1 (assigned) accessing offering details
    const res1 = await fetch(`${baseUrl}/api/lecturer/offerings/${offering1Id}`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(res1.status, 200);
    const body1 = (await res1.json()) as any;
    assert.strictEqual(body1.data.offering.id, offering1Id);

    // Lecturer 2 (not assigned) attempting to access offering details -> 403 Forbidden
    const res2 = await fetch(`${baseUrl}/api/lecturer/offerings/${offering1Id}`, {
      headers: { Authorization: `Bearer ${lecturer2Token}` },
    });
    assert.strictEqual(res2.status, 403);
    const body2 = (await res2.json()) as any;
    assert.ok(body2.message.includes('not assigned to this course offering'));

    // Lecturer 2 attempting to access student roster -> 403 Forbidden
    const res3 = await fetch(`${baseUrl}/api/lecturer/offerings/${offering1Id}/students`, {
      headers: { Authorization: `Bearer ${lecturer2Token}` },
    });
    assert.strictEqual(res3.status, 403);
  });

  it('9. Multiple lecturers or sections behave correctly where supported', async () => {
    // Assign Lecturer 2 to offering1Id as CO_LECTURER
    const res1 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/lecturers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        lecturerId: lecturer2Id,
        role: 'CO_LECTURER',
      }),
    });
    assert.strictEqual(res1.status, 200);

    // List lecturers on offering1Id
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/lecturers`, {
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(res2.status, 200);
    const body2 = (await res2.json()) as any;
    assert.strictEqual(body2.data.lecturers.length, 2);

    // Create Section B for the same course and session
    const res3 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 400,
        section: 'B',
      }),
    });
    assert.strictEqual(res3.status, 201);
    const body3 = (await res3.json()) as any;
    assert.strictEqual(body3.data.offering.section, 'B');
    offeringSectionBId = body3.data.offering.id;
  });

  it('10. Revoked lecturer assignments no longer grant access', async () => {
    // Revoke Lecturer 2 from offering1Id
    const res1 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/lecturers/${lecturer2Id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(res1.status, 200);

    // Lecturer 2 now receives 403 Forbidden
    const res2 = await fetch(`${baseUrl}/api/lecturer/offerings/${offering1Id}`, {
      headers: { Authorization: `Bearer ${lecturer2Token}` },
    });
    assert.strictEqual(res2.status, 403);
  });

  // =========================================================================
  // 3. STUDENT ENROLMENTS TESTS (Tests 11 - 17)
  // =========================================================================

  it('11. Authorized enrolment creation works (individual & bulk)', async () => {
    // Single enrolment: Student 1 into offering1Id
    const res1 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        studentId: student1Id,
        source: 'ADMIN_MANUAL',
      }),
    });

    assert.strictEqual(res1.status, 201);
    const body1 = (await res1.json()) as any;
    assert.strictEqual(body1.status, 'success');
    assert.strictEqual(body1.data.enrollment.status, 'ENROLLED');
    enrollment1Id = body1.data.enrollment.id;

    // Bulk enrolment: Students 2 and 3 into offering1Id
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        studentIds: [student2Id, student3Id],
        source: 'ADMIN_IMPORT',
      }),
    });

    assert.strictEqual(res2.status, 200);
    const body2 = (await res2.json()) as any;
    assert.strictEqual(body2.data.enrolled.length, 2);
  });

  it('12. Duplicate enrolments are prevented', async () => {
    const res = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        studentId: student1Id,
      }),
    });

    assert.strictEqual(res.status, 409);
    const body = (await res.json()) as any;
    assert.ok(body.message.includes('already actively enrolled'));
  });

  it('13. Students can access their own enrolment records', async () => {
    const res = await fetch(`${baseUrl}/api/auth/enrollments`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.enrollments));
    assert.ok(body.data.enrollments.some((e: any) => e.offeringId === offering1Id));
  });

  it('14. Students cannot access another student private enrolment information', async () => {
    // When Student 1 queries /api/auth/enrollments, only Student 1's records are returned
    const res1 = await fetch(`${baseUrl}/api/auth/enrollments`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    const body1 = (await res1.json()) as any;
    assert.ok(body1.data.enrollments.every((e: any) => e.enrollmentId === enrollment1Id));

    // Student 1 cannot query admin enrolment list -> 403 Forbidden
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(res2.status, 403);
  });

  it('15. Dropped or suspended enrolments fail eligibility checks', async () => {
    // Drop Student 1's enrolment
    const res1 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments/${enrollment1Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'DROPPED' }),
    });
    assert.strictEqual(res1.status, 200);

    // Check Student 1 eligibility via service
    const eligibility1 = await eligibilityService.checkStudentEligibility(student1Id, offering1Id);
    assert.strictEqual(eligibility1.isEligible, false);
    assert.strictEqual(eligibility1.reason, 'ENROLLMENT_DROPPED');

    // Suspend Student 1's enrolment
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments/${enrollment1Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'SUSPENDED' }),
    });
    assert.strictEqual(res2.status, 200);

    const eligibility2 = await eligibilityService.checkStudentEligibility(student1Id, offering1Id);
    assert.strictEqual(eligibility2.isEligible, false);
    assert.strictEqual(eligibility2.reason, 'ENROLLMENT_SUSPENDED');

    // Re-enrol Student 1
    const res3 = await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments/${enrollment1Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'ENROLLED' }),
    });
    assert.strictEqual(res3.status, 200);

    const eligibility3 = await eligibilityService.checkStudentEligibility(student1Id, offering1Id);
    assert.strictEqual(eligibility3.isEligible, true);
  });

  it('16. Historical enrolments remain preserved', async () => {
    // Verify in database that dropping an enrolment retains the record and sets droppedAt
    const [enrBefore] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(eq(studentEnrollmentsTable.id, enrollment1Id as any));
    assert.ok(enrBefore);

    // Set status to DROPPED
    await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments/${enrollment1Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'DROPPED' }),
    });

    const [enrDropped] = await db
      .select()
      .from(studentEnrollmentsTable)
      .where(eq(studentEnrollmentsTable.id, enrollment1Id as any));
    assert.ok(enrDropped);
    assert.strictEqual(enrDropped.status, 'DROPPED');
    assert.ok(enrDropped.droppedAt !== null);

    // Re-enrol for subsequent tests
    await fetch(`${baseUrl}/api/admin/offerings/${offering1Id}/enrollments/${enrollment1Id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({ status: 'ENROLLED' }),
    });
  });

  it('17. Spillover and elective enrolments are supported', async () => {
    // Create offering for 200L Mechanical Engineering course (courseB1Id)
    const res1 = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseB1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 200,
        section: 'DEFAULT',
      }),
    });
    assert.strictEqual(res1.status, 201);
    const body1 = (await res1.json()) as any;
    offeringElectiveId = body1.data.offering.id;

    // Enrol Student 1 (400L Computer Engineering) as an elective / spillover student into 200L Mechanical course
    const res2 = await fetch(`${baseUrl}/api/admin/offerings/${offeringElectiveId}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        studentId: student1Id,
        source: 'STUDENT_SELF',
      }),
    });
    assert.strictEqual(res2.status, 201);

    // Verify Student 1 is eligible for this elective
    const eligibility = await eligibilityService.checkStudentEligibility(student1Id, offeringElectiveId);
    assert.strictEqual(eligibility.isEligible, true);
    assert.strictEqual(eligibility.offering?.level, 200);
    assert.ok(eligibility.offering?.courseCode);
  });

  // =========================================================================
  // 4. ELIGIBILITY AND REGRESSION TESTS (Tests 18 - 24)
  // =========================================================================

  it('18. Eligible students pass official offering eligibility checks', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offering1Id}/eligibility`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.isEligible, true);
    assert.strictEqual(body.data.offering.id, offering1Id);

    // Verify GET /api/auth/offerings/eligible includes offering1Id
    const resEligible = await fetch(`${baseUrl}/api/auth/offerings/eligible`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(resEligible.status, 200);
    const bodyEligible = (await resEligible.json()) as any;
    assert.ok(bodyEligible.data.offerings.some((o: any) => o.offeringId === offering1Id));
  });

  it('19. Ineligible students are denied official participation', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${offering1Id}/eligibility`, {
      headers: { Authorization: `Bearer ${studentUnenrolledToken}` },
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.isEligible, false);
    assert.strictEqual(body.data.reason, 'NOT_ENROLLED');
  });

  it('20. Profile attributes alone do not establish eligibility', async () => {
    // studentSameProfileId has exact departmentId and level as courseA1Id, but is not enrolled
    const eligibility = await eligibilityService.checkStudentEligibility(studentSameProfileId, offering1Id);
    assert.strictEqual(eligibility.isEligible, false);
    assert.strictEqual(eligibility.reason, 'NOT_ENROLLED');
  });

  it('21. Open practice remains accessible without official enrolment', async () => {
    // Unenrolled student requests practice questions for courseA1Id
    const res = await fetch(`${baseUrl}/api/auth/courses/${courseA1Id}/questions`, {
      headers: { Authorization: `Bearer ${studentUnenrolledToken}` },
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
    // Verify answer keys are NEVER leaked in open practice
    assert.strictEqual(body.data[0].correctAnswer, undefined);
    assert.strictEqual(body.data[0].gradingPoints, undefined);
  });

  it('22. Existing practice quiz history remains intact', async () => {
    // Submit practice quiz as an unenrolled student
    const res = await fetch(`${baseUrl}/api/auth/quiz-history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentUnenrolledToken}`,
      },
      body: JSON.stringify({
        courseId: courseA1Id,
        quizType: 'cbt',
        category: 'practice',
        answers: [
          {
            questionId: sampleQuestionId,
            answer: 'A small computer on a single IC',
          },
        ],
      }),
    });

    assert.strictEqual(res.status, 201);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data?.id);
    assert.strictEqual(body.data?.earnedXp, 10);
  });

  it('23. Existing gamification behavior remains intact', async () => {
    // Verify student quiz history query returns the practice attempt
    const res = await fetch(`${baseUrl}/api/auth/quiz-history`, {
      headers: { Authorization: `Bearer ${studentUnenrolledToken}` },
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
  });

  it('24. Existing lecturer and admin permissions remain enforced', async () => {
    // Content Admin can create an offering
    const resContent = await fetch(`${baseUrl}/api/admin/offerings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${contentAdminToken}`,
      },
      body: JSON.stringify({
        courseId: courseB1Id,
        academicSession: testSession,
        semester: testSemester,
        level: 200,
        section: 'SECTION_C',
      }),
    });
    assert.strictEqual(resContent.status, 201);

    // Student attempting admin endpoint -> 403 Forbidden
    const resStudent = await fetch(`${baseUrl}/api/admin/offerings`, {
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    assert.strictEqual(resStudent.status, 403);

    // Lecturer attempting admin endpoint -> 403 Forbidden
    const resLecturer = await fetch(`${baseUrl}/api/admin/offerings`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(resLecturer.status, 403);
  });
});
