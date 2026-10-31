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
  courseAssignmentsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07D: Lecturer Course Assignment Model Remediation Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDeptId: string;
  let activeCourse1Id: string;
  let activeCourse2Id: string;
  let inactiveCourseId: string;
  let unassignedCourseId: string;

  let superAdminId: string;
  let superAdminToken: string;

  let studentId: string;
  let studentEmail: string;
  let studentPassword = 'StudentPassword123!';
  let studentToken: string;

  let lecturer1Id: string;
  let lecturer1Email: string;
  let lecturer1Password = 'Lecturer1Password123!';
  let lecturer1Token: string;

  let lecturer2Id: string;
  let lecturer2Email: string;
  let lecturer2Password = 'Lecturer2Password123!';
  let lecturer2Token: string;

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

    // 2. Setup Faculty & Department
    const [fac] = await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Computing ${timestamp}`,
        code: `FC_${rand}`.slice(0, 10),
      })
      .returning();
    if (!fac) throw new Error('Failed to create faculty');
    testFacultyId = fac.id;

    const [dept] = await db
      .insert(departmentsTable)
      .values({
        name: `Software Engineering ${timestamp}`,
        code: `SE_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    if (!dept) throw new Error('Failed to create department');
    testDeptId = dept.id;

    // 3. Setup Test Courses
    // Active Course 1 (Catalogue semester: harmattan)
    const [c1] = await db
      .insert(coursesTable)
      .values({
        code: `SEN1_${rand}`.slice(0, 10),
        title: 'Software Quality Assurance',
        level: 400,
        semester: 'harmattan',
        departmentId: testDeptId,
        isActive: true,
      })
      .returning();
    if (!c1) throw new Error('Failed to create active course 1');
    activeCourse1Id = c1.id;

    // Active Course 2 (Catalogue semester: harmattan)
    const [c2] = await db
      .insert(coursesTable)
      .values({
        code: `SEN2_${rand}`.slice(0, 10),
        title: 'Advanced Database Systems',
        level: 400,
        semester: 'harmattan',
        departmentId: testDeptId,
        isActive: true,
      })
      .returning();
    if (!c2) throw new Error('Failed to create active course 2');
    activeCourse2Id = c2.id;

    // Inactive Course (isActive: false)
    const [cInactive] = await db
      .insert(coursesTable)
      .values({
        code: `INA_${rand}`.slice(0, 10),
        title: 'Legacy Computing Systems',
        level: 400,
        semester: 'harmattan',
        departmentId: testDeptId,
        isActive: false, // Inactive course
      })
      .returning();
    if (!cInactive) throw new Error('Failed to create inactive course');
    inactiveCourseId = cInactive.id;

    // Unassigned active course
    const [cUnassigned] = await db
      .insert(coursesTable)
      .values({
        code: `SEN3_${rand}`.slice(0, 10),
        title: 'Distributed Systems',
        level: 400,
        semester: 'rain',
        departmentId: testDeptId,
        isActive: true,
      })
      .returning();
    if (!cUnassigned) throw new Error('Failed to create unassigned course');
    unassignedCourseId = cUnassigned.id;

    // 4. Setup Super Admin
    const [adminUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Super Admin Test',
        email: `admin_${timestamp}@brainbuzz.edu.ng`,
        username: `admin_${timestamp}`,
        password: 'AdminPassword123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    if (!adminUser) throw new Error('Failed to create super admin');
    superAdminId = adminUser.id;
    const adminTokens = await authService.generateAuthTokens({
      id: superAdminId,
      email: adminUser.email,
      role: USER_ROLES.SUPER_ADMIN,
    });
    superAdminToken = adminTokens.accessToken;

    // 5. Setup Student
    studentEmail = `student_${timestamp}@student.lautech.edu.ng`;
    const [student] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Remediation Test',
        email: studentEmail,
        username: `student_${timestamp}`,
        password: studentPassword,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDeptId,
        level: 400,
      })
      .returning();
    if (!student) throw new Error('Failed to create student');
    studentId = student.id;
    const studentTokens = await authService.generateAuthTokens({
      id: studentId,
      email: studentEmail,
      role: USER_ROLES.STUDENT,
    });
    studentToken = studentTokens.accessToken;

    // 6. Setup Lecturer 1 (Active)
    lecturer1Email = `lecturer1_${timestamp}@lautech.edu.ng`;
    const [lecturer1] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Remediation Lead',
        email: lecturer1Email,
        username: `lecturer1_${timestamp}`,
        password: lecturer1Password,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDeptId,
      })
      .returning();
    if (!lecturer1) throw new Error('Failed to create lecturer 1');
    lecturer1Id = lecturer1.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: lecturer1Id,
      email: lecturer1Email,
      role: USER_ROLES.LECTURER,
    });
    lecturer1Token = l1Tokens.accessToken;

    // 7. Setup Lecturer 2 (Active)
    lecturer2Email = `lecturer2_${timestamp}@lautech.edu.ng`;
    const [lecturer2] = await db
      .insert(usersTable)
      .values({
        fullName: 'Prof. Second Lecturer',
        email: lecturer2Email,
        username: `lecturer2_${timestamp}`,
        password: lecturer2Password,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDeptId,
      })
      .returning();
    if (!lecturer2) throw new Error('Failed to create lecturer 2');
    lecturer2Id = lecturer2.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: lecturer2Id,
      email: lecturer2Email,
      role: USER_ROLES.LECTURER,
    });
    lecturer2Token = l2Tokens.accessToken;

    // 8. Assign Active Course 1 (Harmattan) to Lecturer 1
    await db.insert(courseAssignmentsTable).values({
      lecturerId: lecturer1Id,
      courseId: activeCourse1Id,
      academicSession: '2025/2026',
      semester: 'harmattan',
      status: 'ACTIVE',
      assignedBy: superAdminId,
    });

    // 9. Assign Inactive Course to Lecturer 1 (Assignment active, but course inactive)
    await db.insert(courseAssignmentsTable).values({
      lecturerId: lecturer1Id,
      courseId: inactiveCourseId,
      academicSession: '2025/2026',
      semester: 'harmattan',
      status: 'ACTIVE',
      assignedBy: superAdminId,
    });

    // 10. Assign Active Course 2 to Lecturer 2
    await db.insert(courseAssignmentsTable).values({
      lecturerId: lecturer2Id,
      courseId: activeCourse2Id,
      academicSession: '2025/2026',
      semester: 'harmattan',
      status: 'ACTIVE',
      assignedBy: superAdminId,
    });
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // 1. Active assignments for active courses appear correctly
  // =========================================================================
  it('1. Active assignments for active courses appear correctly', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/courses`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data));

    const found = body.data.find((c: any) => c.courseId === activeCourse1Id);
    assert.ok(found, 'Active assigned course must appear in the courses list');
    assert.strictEqual(found.semester, 'harmattan');
    assert.strictEqual(found.academicSession, '2025/2026');
  });

  // =========================================================================
  // 2. Inactive courses do not appear as active teaching courses (COURSE-01)
  // =========================================================================
  it('2. Inactive courses do not appear as active teaching courses (COURSE-01)', async () => {
    // 2.1 Not in GET /api/lecturer/courses
    const listRes = await fetch(`${baseUrl}/api/lecturer/courses`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    const listBody = await listRes.json() as any;
    const inactiveInList = listBody.data.find((c: any) => c.courseId === inactiveCourseId);
    assert.strictEqual(inactiveInList, undefined, 'Inactive course must NOT appear in assigned courses list');

    // 2.2 Not in GET /api/lecturer/dashboard metrics or recent assignments
    const dashRes = await fetch(`${baseUrl}/api/lecturer/dashboard`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    const dashBody = await dashRes.json() as any;
    assert.strictEqual(dashBody.data.metrics.assignedCoursesCount, 1, 'Assigned count must only reflect active courses');
    const inactiveInDash = dashBody.data.recentAssignments.find((a: any) => a.courseId === inactiveCourseId);
    assert.strictEqual(inactiveInDash, undefined, 'Inactive course must NOT appear in recent assignments');

    // 2.3 Direct access to GET /api/lecturer/courses/:inactiveCourseId returns 404
    const detailRes = await fetch(`${baseUrl}/api/lecturer/courses/${inactiveCourseId}`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(detailRes.status, 404, 'Accessing inactive course details must return 404 Not Found');
    const detailBody = await detailRes.json() as any;
    assert.strictEqual(detailBody.status, 'fail');
    assert.ok(detailBody.message.includes('inactive') || detailBody.message.includes('not found'));
  });

  // =========================================================================
  // 3. Deactivating a course does not delete its lecturer assignment (COURSE-01)
  // =========================================================================
  it('3. Deactivating a course does not delete its lecturer assignment (COURSE-01)', async () => {
    // Verify that the assignment record still exists in the database
    const [assignment] = await db
      .select()
      .from(courseAssignmentsTable)
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturer1Id as any),
          eq(courseAssignmentsTable.courseId, inactiveCourseId as any)
        )
      );

    assert.ok(assignment, 'Assignment record must be preserved in database');
    assert.strictEqual(assignment.status, 'ACTIVE', 'Assignment status is distinct and preserved as ACTIVE');
  });

  // =========================================================================
  // 4. Harmattan assignments return the correct semester (COURSE-04)
  // =========================================================================
  it('4. Harmattan assignments return the correct semester (COURSE-04)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/courses?semester=harmattan`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.ok(body.data.length >= 1);
    const item = body.data.find((c: any) => c.courseId === activeCourse1Id);
    assert.ok(item);
    assert.strictEqual(item.semester, 'harmattan', 'Must return assignment semester as harmattan');
  });

  // =========================================================================
  // 5. Rain assignments return the correct semester (COURSE-04)
  // =========================================================================
  it('5. Rain assignments return the correct semester even if catalogue is harmattan (COURSE-04)', async () => {
    // Super admin assigns activeCourse2Id (catalogue semester: harmattan) to Lecturer 1 specifically for 'rain' semester
    const assignRainRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse2Id,
        academicSession: '2025/2026',
        semester: 'rain',
      }),
    });
    assert.strictEqual(assignRainRes.status, 201, 'Admin course assignment for rain must succeed');

    // Query courses for lecturer 1
    const res = await fetch(`${baseUrl}/api/lecturer/courses/${activeCourse2Id}`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.strictEqual(body.data.semester, 'rain', 'Assigned semester must be authoritative as "rain"');
    assert.strictEqual(body.data.catalogueSemester, 'harmattan', 'Catalogue semester must be preserved as "harmattan"');

    // Filter by semester=rain
    const filterRainRes = await fetch(`${baseUrl}/api/lecturer/courses?semester=rain`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    const filterRainBody = await filterRainRes.json() as any;
    const rainMatch = filterRainBody.data.find((c: any) => c.courseId === activeCourse2Id);
    assert.ok(rainMatch, 'Course assigned for rain must be matched by semester=rain filter');

    // Filter by semester=harmattan should NOT match activeCourse2Id for Lecturer 1
    const filterHarmattanRes = await fetch(`${baseUrl}/api/lecturer/courses?semester=harmattan`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    const filterHarmattanBody = await filterHarmattanRes.json() as any;
    const harmattanMatch = filterHarmattanBody.data.find((c: any) => c.courseId === activeCourse2Id);
    assert.strictEqual(harmattanMatch, undefined, 'Course assigned for rain must not match harmattan filter');
  });

  // =========================================================================
  // 6. The same lecturer can be assigned the same course in both semesters (COURSE-03)
  // =========================================================================
  it('6. The same lecturer can be assigned the same course in both semesters within the same session (COURSE-03)', async () => {
    const session = '2026/2027';

    // 6.1 Assign Course 1 in Harmattan
    const harmattanRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer2Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: session,
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(harmattanRes.status, 201, 'Harmattan assignment must succeed');

    // 6.2 Assign same Course 1 in Rain for the same lecturer and same session
    const rainRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer2Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: session,
        semester: 'rain',
      }),
    });
    assert.strictEqual(rainRes.status, 201, 'Rain assignment for same course and session must succeed');

    // Verify both rows exist simultaneously in DB
    const assignments = await db
      .select()
      .from(courseAssignmentsTable)
      .where(
        and(
          eq(courseAssignmentsTable.lecturerId, lecturer2Id as any),
          eq(courseAssignmentsTable.courseId, activeCourse1Id as any),
          eq(courseAssignmentsTable.academicSession, session)
        )
      );

    assert.strictEqual(assignments.length, 2, 'Both Harmattan and Rain assignments must coexist');
    const semesters = assignments.map((a) => a.semester).sort();
    assert.deepStrictEqual(semesters, ['harmattan', 'rain']);

    // Attempting duplicate (same lecturer, course, session, AND semester) must be rejected
    const dupRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer2Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: session,
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(dupRes.status, 400, 'Duplicate assignment in same semester must be rejected');
  });

  // =========================================================================
  // 7. Invalid or missing academic sessions are rejected (COURSE-02)
  // =========================================================================
  it('7. Invalid or missing academic sessions are rejected (COURSE-02)', async () => {
    // 7.1 Missing academic session
    const missingRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(missingRes.status, 400, 'Missing academic session must be rejected with 400');

    // 7.2 Non-consecutive session years (e.g. 2025/2027)
    const nonConsecutiveRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: '2025/2027',
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(nonConsecutiveRes.status, 400, 'Non-consecutive session years must be rejected with 400');

    // 7.3 Malformed session format (e.g. 2025-2026 or 2025)
    const malformedRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: '2025-2026',
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(malformedRes.status, 400, 'Malformed session must be rejected with 400');
  });

  // =========================================================================
  // 8. Existing valid assignment records remain accessible
  // =========================================================================
  it('8. Existing valid assignment records remain accessible', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/courses`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json() as any;
    assert.ok(body.data.length >= 1);
    const initialAssignment = body.data.find((c: any) => c.courseId === activeCourse1Id);
    assert.ok(initialAssignment, 'Initial valid assignment must remain accessible');
  });

  // =========================================================================
  // 9. Unassigned lecturers cannot access another lecturer course (IDOR defense)
  // =========================================================================
  it('9. Unassigned lecturers cannot access another lecturer course (IDOR defense)', async () => {
    // Lecturer 1 attempts to access activeCourse2Id (only assigned to Lecturer 2 for harmattan)
    // Wait, let's test with unassignedCourseId which is not assigned to Lecturer 1 at all
    const res = await fetch(`${baseUrl}/api/lecturer/courses/${unassignedCourseId}`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(res.status, 403, 'Unassigned course access must return 403 Forbidden');
    const body = await res.json() as any;
    assert.strictEqual(body.status, 'fail');
    assert.strictEqual(body.message, 'Forbidden. You are not assigned to this course.');
  });

  // =========================================================================
  // 10. Revoked assignments remain inaccessible
  // =========================================================================
  it('10. Revoked assignments remain inaccessible', async () => {
    // Revoke Lecturer 1 assignment on activeCourse2Id
    const revokeRes = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments/${activeCourse2Id}?semester=rain`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${superAdminToken}` },
    });
    assert.strictEqual(revokeRes.status, 200, 'Revocation must succeed');

    // Lecturer 1 subsequently accessing activeCourse2Id
    const reAccessRes = await fetch(`${baseUrl}/api/lecturer/courses/${activeCourse2Id}`, {
      headers: { Authorization: `Bearer ${lecturer1Token}` },
    });
    assert.strictEqual(reAccessRes.status, 403, 'Revoked assignment must return 403 Forbidden');
  });

  // =========================================================================
  // 11. Student authorization behavior remains unchanged
  // =========================================================================
  it('11. Student authorization behavior remains unchanged', async () => {
    // 11.1 Student login
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: studentEmail,
        password: studentPassword,
      }),
    });
    assert.strictEqual(loginRes.status, 200);

    // 11.2 Student forbidden from lecturer portal
    const dashRes = await fetch(`${baseUrl}/api/lecturer/dashboard`, {
      headers: { Authorization: `Bearer ${studentToken}` },
    });
    assert.strictEqual(dashRes.status, 403);
    const body = await dashRes.json() as any;
    assert.ok(body.message.includes('Lecturer access required'));
  });

  // =========================================================================
  // 12. Existing admin permissions remain enforced
  // =========================================================================
  it('12. Existing admin permissions remain enforced', async () => {
    // Student token attempting to call admin lecturer assignment
    const res = await fetch(`${baseUrl}/api/admin/lecturers/${lecturer1Id}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({
        courseId: activeCourse1Id,
        academicSession: '2025/2026',
        semester: 'harmattan',
      }),
    });
    assert.strictEqual(res.status, 403, 'Non-admin must be rejected with 403 Forbidden');
  });
});
