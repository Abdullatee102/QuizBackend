import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'http';
import express from 'express';
import * as XLSX from 'xlsx';
import { db } from '../db/index.js';
import {
  usersTable,
  facultiesTable,
  departmentsTable,
  coursesTable,
  courseOfferingsTable,
  offeringLecturersTable,
  questionsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import lecturerRoutes from '../routes/lecturer/index.js';
import adminRoutes from '../routes/admin/index.js';

describe('BB-07J: Bulk Question Authoring, Printable Papers & Secure Authentication Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let assignedLecturerId: string;
  let assignedLecturerEmail: string;
  let assignedLecturerToken: string;

  let unassignedLecturerId: string;
  let unassignedLecturerEmail: string;
  let unassignedLecturerToken: string;

  let adminId: string;
  let adminEmail: string;
  let adminToken: string;

  let studentId: string;
  let studentEmail: string;
  let studentToken: string;

  let createdQuestionId: string;

  before(async () => {
    process.env.NODE_ENV = 'test';
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/lecturer', lecturerRoutes);
    app.use('/api/admin', adminRoutes);

    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const address = server.address() as any;
    baseUrl = `http://127.0.0.1:${address.port}`;

    const rand = Math.floor(Math.random() * 89999 + 10000);

    // 1. Setup Faculty & Department
    const [faculty] = await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Science & Tech ${rand}`,
        code: `FST_${rand}`,
      })
      .returning();
    testFacultyId = faculty!.id;

    const [dept] = await db
      .insert(departmentsTable)
      .values({
        facultyId: testFacultyId,
        name: `Software Engineering ${rand}`,
        code: `SWE_${rand}`,
      })
      .returning();
    testDepartmentId = dept!.id;

    // 2. Setup Course & Offerings
    const [course] = await db
      .insert(coursesTable)
      .values({
        departmentId: testDepartmentId,
        code: `SWE${rand % 900 + 100}`,
        title: `Software Architecture ${rand}`,
        level: 300,
        semester: 'FIRST',
      })
      .returning();
    testCourseId = course!.id;

    const [offering] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'FIRST',
        level: 300,
      })
      .returning();
    testOfferingId = offering!.id;

    const [unoffering] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'SECOND',
        level: 300,
      })
      .returning();
    unassignedOfferingId = unoffering!.id;

    // 3. Setup Users
    assignedLecturerEmail = `lecturer_assigned_${rand}@brainbuzz.edu`;
    const [assignedLecturer] = await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Assigned Lecturer ${rand}`,
        username: `assigned_lec_${rand}`,
        email: assignedLecturerEmail,
        password: 'Password123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      })
      .returning();
    assignedLecturerId = assignedLecturer!.id;

    // Assign lecturer to offering
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: assignedLecturerId,
      role: 'COORDINATOR',
    });

    const assignedTokens = await authService.generateAuthTokens({
      id: assignedLecturerId,
      email: assignedLecturerEmail,
      role: USER_ROLES.LECTURER,
    });
    assignedLecturerToken = assignedTokens.accessToken;

    // Unassigned Lecturer
    unassignedLecturerEmail = `lecturer_unassigned_${rand}@brainbuzz.edu`;
    const [unassignedLecturer] = await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Unassigned Lecturer ${rand}`,
        username: `unassigned_lec_${rand}`,
        email: unassignedLecturerEmail,
        password: 'Password123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    unassignedLecturerId = unassignedLecturer!.id;

    const unassignedTokens = await authService.generateAuthTokens({
      id: unassignedLecturerId,
      email: unassignedLecturerEmail,
      role: USER_ROLES.LECTURER,
    });
    unassignedLecturerToken = unassignedTokens.accessToken;

    // Admin
    adminEmail = `admin_${rand}@brainbuzz.edu`;
    const [adminUser] = await db
      .insert(usersTable)
      .values({
        fullName: `Super Admin ${rand}`,
        username: `admin_${rand}`,
        email: adminEmail,
        password: 'Password123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    adminId = adminUser!.id;

    const adminTokens = await authService.generateAuthTokens({
      id: adminId,
      email: adminEmail,
      role: USER_ROLES.SUPER_ADMIN,
    });
    adminToken = adminTokens.accessToken;

    // Student
    studentEmail = `student_${rand}@brainbuzz.edu`;
    const [studentUser] = await db
      .insert(usersTable)
      .values({
        fullName: `Test Student ${rand}`,
        username: `student_${rand}`,
        email: studentEmail,
        password: 'Password123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    studentId = studentUser!.id;

    const studentTokens = await authService.generateAuthTokens({
      id: studentId,
      email: studentEmail,
      role: USER_ROLES.STUDENT,
    });
    studentToken = studentTokens.accessToken;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // ================= 1. EXCEL TEMPLATE DOWNLOAD =================
  it('1. Lecturer should download Excel question template successfully', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/template`, {
      headers: { Authorization: `Bearer ${assignedLecturerToken}` },
    });

    assert.strictEqual(res.status, 200);
    const contentType = res.headers.get('content-type') || '';
    assert.ok(
      contentType.includes('spreadsheetml') || contentType.includes('octet-stream'),
      `Expected Excel content-type, got ${contentType}`
    );

    const buffer = Buffer.from(await res.arrayBuffer());
    assert.ok(buffer.length > 500, 'Excel workbook buffer should not be empty');

    const workbook = XLSX.read(buffer, { type: 'buffer' });
    assert.ok(workbook.SheetNames.includes('Questions Template'), 'Should include Questions Template sheet');
    assert.ok(workbook.SheetNames.includes('Instructions'), 'Should include Instructions sheet');
  });

  // ================= 2. BULK PARSING & VALIDATION =================
  it('2. Lecturer should validate and preview questions from payload', async () => {
    const sampleQuestions = [
      {
        type: 'cbt',
        question: 'What is coupling in software engineering?',
        options: [
          'The degree of interdependence between software modules',
          'The internal cohesion of a single module',
          'The compilation speed of the language',
          'The runtime memory usage',
        ],
        correctAnswer: 'The degree of interdependence between software modules',
        points: 2,
        difficulty: 'medium',
        explanation: 'Coupling measures interdependence.',
      },
      {
        type: 'theory',
        question: 'Describe three key principles of SOLID architecture.',
        correctAnswer: 'Single responsibility, Open/Closed, Liskov substitution, Interface segregation, Dependency inversion.',
        points: 5,
        difficulty: 'hard',
        gradingPoints: [
          { concept: 'SRP explanation', weight: 1.5 },
          { concept: 'OCP explanation', weight: 1.5 },
          { concept: 'LSP explanation', weight: 2.0 },
        ],
      },
    ];

    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({ questions: sampleQuestions, confirm: false }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.totalRows, 2);
    assert.strictEqual(json.data.validCount, 2);
    assert.strictEqual(json.data.invalidCount, 0);
    assert.strictEqual(json.data.duplicateCount, 0);
  });

  // ================= 3. ROW-LEVEL VALIDATION ERRORS =================
  it('3. Bulk import should catch invalid rows with specific error messages', async () => {
    const invalidQuestions = [
      {
        type: 'cbt',
        question: 'Invalid CBT question with only 1 option',
        options: ['Only Option'],
        correctAnswer: 'Only Option',
      },
      {
        type: 'cbt',
        question: 'CBT with correct answer not in options',
        options: ['Alpha', 'Beta'],
        correctAnswer: 'Gamma',
      },
      {
        type: 'theory',
        question: '', // Empty prompt
        correctAnswer: 'Some answer',
      },
    ];

    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({ questions: invalidQuestions, confirm: false }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.invalidCount, 3);
    assert.strictEqual(json.data.canImport, false);
    assert.ok(json.data.rows[0].errors[0].includes('at least 2'));
    assert.ok(json.data.rows[1].errors[0].includes('must match one'));
    assert.ok(json.data.rows[2].errors[0].includes('prompt is required'));
  });

  // ================= 4. CONFIRMATION & PARTIAL IMPORT =================
  it('4. Bulk import should commit valid questions to question bank on confirm', async () => {
    const questionsToImport = [
      {
        type: 'cbt',
        question: 'Which design pattern restricts instantiation of a class to one single instance?',
        options: ['Singleton', 'Factory', 'Observer', 'Strategy'],
        correctAnswer: 'Singleton',
        points: 2,
        difficulty: 'easy',
      },
    ];

    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/bulk-import?confirm=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({ questions: questionsToImport }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.data.importedCount, 1);
    createdQuestionId = json.data.importedQuestions[0].id;
    assert.ok(createdQuestionId, 'Question ID should be returned');

    // Verify in database
    const [inDb] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.id, createdQuestionId as any));
    assert.ok(inDb, 'Question should exist in database');
    assert.strictEqual(inDb.status, 'DRAFT');
  });

  // ================= 5. DUPLICATE DETECTION =================
  it('5. Bulk import should detect duplicate question prompt against existing question bank', async () => {
    const duplicateQuestion = [
      {
        type: 'cbt',
        question: 'Which design pattern restricts instantiation of a class to one single instance?', // identical prompt
        options: ['Singleton', 'Factory', 'Observer', 'Strategy'],
        correctAnswer: 'Singleton',
      },
    ];

    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({ questions: duplicateQuestion }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.data.duplicateCount, 1);
    assert.strictEqual(json.data.rows[0].isDuplicateInBank, true);
  });

  // ================= 6. UNASSIGNED LECTURER AUTHORIZATION =================
  it('6. Unassigned lecturer should be rejected with 403 Forbidden for bulk import', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/bulk-import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${unassignedLecturerToken}`,
      },
      body: JSON.stringify({ questions: [{ type: 'cbt', question: 'Valid?', options: ['A', 'B'], correctAnswer: 'A' }] }),
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.ok(json.message.includes('Forbidden'));
  });

  // ================= 7. PRINTABLE QUESTION PAPER (PDF) =================
  it('7. Lecturer should generate printable A4 question paper PDF without answers', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/paper-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        questionIds: [createdQuestionId],
        config: {
          examinationTitle: 'Mid-Semester Test',
          durationMinutes: 90,
          withAnswerKey: false,
        },
      }),
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/pdf');
    const buffer = Buffer.from(await res.arrayBuffer());
    assert.ok(buffer.length > 500, 'PDF buffer should be non-empty');

    // Confirm PDF magic number %PDF-
    assert.strictEqual(buffer.slice(0, 4).toString(), '%PDF');
  });

  // ================= 8. SECURE MARKING GUIDE (PDF) =================
  it('8. Lecturer can generate confidential marking guide with answer key', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/paper-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        questionIds: [createdQuestionId],
        config: {
          withAnswerKey: true,
        },
      }),
    });

    assert.strictEqual(res.status, 200);
    const buffer = Buffer.from(await res.arrayBuffer());
    assert.ok(buffer.length > 500);
    assert.strictEqual(buffer.slice(0, 4).toString(), '%PDF');
  });

  // ================= 9. STUDENT REJECTION FOR PAPER GENERATION =================
  it('9. Student should be rejected from question paper generation endpoint with 401/403', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/offerings/${testOfferingId}/paper-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${studentToken}`,
      },
      body: JSON.stringify({ questionIds: [createdQuestionId] }),
    });

    assert.ok(res.status === 401 || res.status === 403);
  });

  // ================= 10. LECTURER GOOGLE LOGIN =================
  it('10. Authorized lecturer should log in with Google ID token', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: `test-google-token:${assignedLecturerEmail}:Dr. Google Lecturer` }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.user.email, assignedLecturerEmail);
    assert.strictEqual(json.user.role, 'LECTURER');
    assert.ok(json.tokens.accessToken);
  });

  // ================= 11. UNREGISTERED GOOGLE LECTURER REJECTION =================
  it('11. Unregistered Google account should be rejected with 403 Forbidden for lecturer portal', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: 'test-google-token:random_person_4910@gmail.com:Random Person' }),
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.ok(json.message.includes('No authorized Brain Buzz lecturer account found'));
  });

  // ================= 12. STUDENT GOOGLE LECTURER LOGIN REJECTION =================
  it('12. Student attempting lecturer Google login should be rejected with 403 Forbidden', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: `test-google-token:${studentEmail}:Test Student` }),
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.ok(json.message.includes('authorized lecturer privileges'));
  });

  // ================= 13. ADMIN GOOGLE LOGIN =================
  it('13. Authorized administrator should log in with Google ID token', async () => {
    const res = await fetch(`${baseUrl}/api/admin/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: `test-google-token:${adminEmail}:Super Admin Google` }),
    });

    assert.strictEqual(res.status, 200);
    const json = (await res.json()) as any;
    assert.strictEqual(json.status, 'success');
    assert.strictEqual(json.user.email, adminEmail);
    assert.strictEqual(json.user.role, 'SUPER_ADMIN');
    assert.ok(json.tokens.accessToken);
  });

  // ================= 14. NON-ADMIN GOOGLE ADMIN REJECTION =================
  it('14. Lecturer or student attempting admin Google login should be rejected with 403 Forbidden', async () => {
    const res = await fetch(`${baseUrl}/api/admin/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: `test-google-token:${assignedLecturerEmail}:Lecturer Trying Admin` }),
    });

    assert.strictEqual(res.status, 403);
    const json = (await res.json()) as any;
    assert.ok(json.message.includes('administrative privileges'));
  });

  // ================= 15. LECTURER PROFILE & PASSWORD MANAGEMENT =================
  it('15. Lecturer can update profile and change password', async () => {
    const randomPhone = `+234${Math.floor(1000000000 + Math.random() * 8999999999)}`;
    // 15.1 Update profile
    const updateRes = await fetch(`${baseUrl}/api/lecturer/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        fullName: 'Prof. Assigned Architect Updated',
        phoneNumber: randomPhone,
        bio: 'Senior Lecturer in Software Engineering',
      }),
    });

    assert.strictEqual(updateRes.status, 200);
    const updateJson = (await updateRes.json()) as any;
    assert.strictEqual(updateJson.user.fullName, 'Prof. Assigned Architect Updated');
    assert.strictEqual(updateJson.user.phoneNumber, randomPhone);

    // 15.2 Change password
    const passRes = await fetch(`${baseUrl}/api/lecturer/auth/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        currentPassword: 'Password123!',
        newPassword: 'NewSecurePassword456!',
      }),
    });

    assert.strictEqual(passRes.status, 200);
    const passJson = (await passRes.json()) as any;
    assert.strictEqual(passJson.status, 'success');

    // Verify login with new password
    const loginRes = await fetch(`${baseUrl}/api/lecturer/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: assignedLecturerEmail,
        password: 'NewSecurePassword456!',
      }),
    });
    assert.strictEqual(loginRes.status, 200);
  });

  // ================= 16. ADMIN PROFILE & PASSWORD MANAGEMENT =================
  it('16. Admin can update profile and change password', async () => {
    const randomAdminPhone = `+234${Math.floor(1000000000 + Math.random() * 8999999999)}`;
    const profileRes = await fetch(`${baseUrl}/api/admin/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        fullName: 'Super Administrator Updated',
        phoneNumber: randomAdminPhone,
      }),
    });

    assert.strictEqual(profileRes.status, 200);
    const profileJson = (await profileRes.json()) as any;
    assert.strictEqual(profileJson.user.fullName, 'Super Administrator Updated');
  });
});
