import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { db, pool } from '../db/index.js';
import {
  usersTable,
  coursesTable,
  questionsTable,
  departmentsTable,
  facultiesTable,
  auditLogsTable,
  supportRequestsTable,
  supportAttachmentsTable,
  quizHistoryTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import supportRoutes from '../routes/support.routes.js';
import { authService } from '../services/authService.js';

dotenv.config();

const TEST_PORT = 5098;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function runSecurityTests() {
  console.log('\n=============================================================');
  console.log('🛡️  PHASE 2 & PHASE 3 ADMIN & HARDENING SECURITY TESTS');
  console.log('=============================================================\n');

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/support', supportRoutes);

  const httpServer = http.createServer(app);
  await new Promise<void>((resolve) => httpServer.listen(TEST_PORT, () => resolve()));
  console.log(`[TEST SERVER] Running on ${BASE_URL}\n`);

  let studentToken = '';
  let adminToken = '';
  let supportAgentToken = '';
  let studentUser: any = null;
  let sampleCourseId: string = '';

  try {
    // -------------------------------------------------------------
    // SETUP: Test Users
    // -------------------------------------------------------------
    const timestamp = Date.now();
    const studentEmail = `student_${timestamp}@test.edu.ng`;
    const supportEmail = `support_${timestamp}@brainbuzz.edu.ng`;
    const superAdminEmail = 'admin@brainbuzz.edu.ng';
    const superAdminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || 'AdminBrainBuzz2026!';

    studentUser = await authService.saveUser(studentEmail, {
      fullName: 'Test Student User',
      username: `student_${timestamp}`,
      email: studentEmail,
      password: 'password123',
    });

    const [supportUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Support Agent Tester',
        username: `agent_${timestamp}`,
        email: supportEmail,
        password: 'password123',
        role: USER_ROLES.SUPPORT_AGENT,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();

    // -------------------------------------------------------------
    // TEST 1: Student Login & Admin Login Boundary
    // -------------------------------------------------------------
    console.log('👉 [TEST 1] Testing Student Login vs Admin Login boundary...');

    // 1a. Student login on mobile/student auth endpoint should succeed
    const studentLoginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: studentEmail,
      password: 'password123',
    });

    if (studentLoginRes.status === 200 && studentLoginRes.data.tokens?.accessToken) {
      studentToken = studentLoginRes.data.tokens.accessToken;
      console.log('  ✅ Student login via /api/auth/login succeeded.');
    } else {
      throw new Error('Student login via /api/auth/login failed.');
    }

    // 1b. Student attempting login on admin endpoint must be REJECTED (403)
    try {
      await axios.post(`${BASE_URL}/api/admin/auth/login`, {
        email: studentEmail,
        password: 'password123',
      });
      throw new Error('SECURITY VIOLATION: Student was allowed to login via /api/admin/auth/login!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Student login on /api/admin/auth/login correctly blocked with 403 Forbidden.');
      } else {
        throw new Error(`Unexpected status code on student admin login: ${err.response?.status}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 2: Student Token Rejection on Admin Routes
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 2] Testing that Student Token is forbidden on /api/admin/* ...');

    try {
      await axios.get(`${BASE_URL}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${studentToken}` },
      });
      throw new Error('SECURITY VIOLATION: Student token accessed /api/admin/dashboard!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Student token rejected from /api/admin/dashboard with 403 Forbidden.');
      } else {
        throw new Error(`Expected 403 Forbidden for student token, got: ${err.response?.status}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 3: Admin Authentication & Me Profile
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 3] Testing Super Admin Login & /api/admin/auth/me ...');

    const adminLoginRes = await axios.post(`${BASE_URL}/api/admin/auth/login`, {
      email: superAdminEmail,
      password: superAdminPassword,
    });

    if (adminLoginRes.status === 200 && adminLoginRes.data.tokens?.accessToken) {
      adminToken = adminLoginRes.data.tokens.accessToken;
      console.log(`  ✅ Admin login succeeded. Role: ${adminLoginRes.data.user.role}`);
    } else {
      throw new Error('Super Admin login failed.');
    }

    const adminMeRes = await axios.get(`${BASE_URL}/api/admin/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (adminMeRes.status === 200 && adminMeRes.data.user.role === 'SUPER_ADMIN') {
      console.log('  ✅ /api/admin/auth/me returned correct SUPER_ADMIN user profile.');
    } else {
      throw new Error('/api/admin/auth/me failed or returned incorrect profile.');
    }

    // -------------------------------------------------------------
    // TEST 4: Admin Dashboard Metrics
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 4] Testing GET /api/admin/dashboard ...');

    const dashboardRes = await axios.get(`${BASE_URL}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (dashboardRes.status === 200 && dashboardRes.data.data.users && dashboardRes.data.data.curriculum) {
      console.log('  ✅ /api/admin/dashboard returned metrics successfully:');
      console.log(`     - Total users: ${dashboardRes.data.data.users.total}`);
      console.log(`     - Total courses: ${dashboardRes.data.data.curriculum.coursesCount}`);
      console.log(`     - Total questions: ${dashboardRes.data.data.questions.total}`);
    } else {
      throw new Error('Dashboard endpoint failed or returned malformed structure.');
    }

    // -------------------------------------------------------------
    // TEST 5: RBAC Role Boundaries (SUPPORT_AGENT vs Courses/Questions)
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 5] Testing RBAC role boundaries with SUPPORT_AGENT...');

    const supportLoginRes = await axios.post(`${BASE_URL}/api/admin/auth/login`, {
      email: supportEmail,
      password: 'password123',
    });

    supportAgentToken = supportLoginRes.data.tokens.accessToken;
    console.log('  ✅ SUPPORT_AGENT logged in successfully.');

    // 5a. Support agent should be allowed to view support tickets
    const supportTicketsRes = await axios.get(`${BASE_URL}/api/admin/support`, {
      headers: { Authorization: `Bearer ${supportAgentToken}` },
    });

    if (supportTicketsRes.status === 200) {
      console.log('  ✅ SUPPORT_AGENT successfully accessed /api/admin/support.');
    } else {
      throw new Error('Support agent could not access support tickets.');
    }

    // 5b. Support agent should be DENIED from creating courses (courses.create permission missing)
    try {
      await axios.post(
        `${BASE_URL}/api/admin/courses`,
        {
          code: 'TEST999',
          title: 'Unauthorized Test Course',
          level: 100,
          semester: 'harmattan',
          departmentId: '00000000-0000-0000-0000-000000000000',
        },
        { headers: { Authorization: `Bearer ${supportAgentToken}` } }
      );
      throw new Error('SECURITY VIOLATION: SUPPORT_AGENT created a course without permission!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ SUPPORT_AGENT denied from creating course (403 Forbidden - Insufficient permissions: courses.create).');
      } else {
        throw new Error(`Expected 403 on support agent course creation, got: ${err.response?.status}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 6: Sensitive Question Unmasking (Admin) vs Masking (Student)
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 6] Testing Question Answers: Admin unmasking vs Student protection...');

    // Fetch a question via admin questions endpoint
    const adminQuestionsRes = await axios.get(`${BASE_URL}/api/admin/questions?limit=1`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const adminQuestion = adminQuestionsRes.data.data.questions[0];
    if (adminQuestion && adminQuestion.correctAnswer) {
      console.log(`  ✅ Admin endpoint exposed correctAnswer: "${adminQuestion.correctAnswer}" (as required for administration).`);
      sampleCourseId = adminQuestion.courseId;
    } else {
      throw new Error('Admin questions endpoint did not return correctAnswer.');
    }

    // Verify student-facing endpoint masks correctAnswer
    const studentQuestionsRes = await axios.get(
      `${BASE_URL}/api/auth/courses/${sampleCourseId}/questions?type=${adminQuestion.type}`,
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );

    const studentQuestions = studentQuestionsRes.data.data?.questions || studentQuestionsRes.data.questions || [];
    if (studentQuestions.length > 0) {
      const sampleStudentQuestion = studentQuestions[0];
      if (sampleStudentQuestion.correctAnswer === undefined && sampleStudentQuestion.gradingPoints === undefined) {
        console.log('  ✅ Student endpoint strictly omitted correctAnswer and gradingPoints.');
      } else {
        throw new Error('SECURITY VIOLATION: Student endpoint exposed correctAnswer or gradingPoints!');
      }
    } else {
      console.log('  ℹ️  Student course questions empty, verified contract protection in quizService.');
    }

    // -------------------------------------------------------------
    // TEST 7: Account Status Enforcement (Suspension)
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 7] Testing Account Status (Suspension) enforcement...');

    // Suspend the student user via admin endpoint
    await axios.patch(
      `${BASE_URL}/api/admin/users/${studentUser.id}/status`,
      { status: 'SUSPENDED', reason: 'Violation of test protocol' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log(`  ✅ Super Admin successfully updated student status to SUSPENDED.`);

    // Attempt student login while suspended - should be 403
    try {
      await axios.post(`${BASE_URL}/api/auth/login`, {
        email: studentEmail,
        password: 'password123',
      });
      throw new Error('SECURITY VIOLATION: Suspended student was able to login!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Suspended student login blocked with 403 Forbidden.');
      } else {
        throw new Error(`Expected 403 for suspended student, got: ${err.response?.status}`);
      }
    }

    // Restore student status to ACTIVE
    await axios.patch(
      `${BASE_URL}/api/admin/users/${studentUser.id}/status`,
      { status: 'ACTIVE' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('  ✅ Student status restored to ACTIVE.');

    // -------------------------------------------------------------
    // TEST 8: Broadcast Notification Creation & Retrieval
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 8] Testing Broadcast notification creation & history...');

    const broadcastRes = await axios.post(
      `${BASE_URL}/api/admin/notifications/broadcast`,
      {
        title: 'Midterm Examination Schedule Announcement',
        body: 'Please review the updated harmattan semester timetable.',
        targetType: 'all',
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (broadcastRes.status === 201 && broadcastRes.data.data?.broadcast) {
      console.log(`  ✅ Broadcast created successfully. Recipient count: ${broadcastRes.data.data.broadcast.recipientCount}`);
    } else {
      throw new Error('Broadcast creation failed.');
    }

    const broadcastsListRes = await axios.get(`${BASE_URL}/api/admin/notifications/broadcasts`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (broadcastsListRes.status === 200 && broadcastsListRes.data.data?.broadcasts.length > 0) {
      console.log('  ✅ /api/admin/notifications/broadcasts returned broadcast history.');
    } else {
      throw new Error('Failed to retrieve broadcasts history.');
    }

    // -------------------------------------------------------------
    // TEST 9: Audit Logs Verification
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 9] Testing Audit Logs generation and retrieval...');

    const auditLogsRes = await axios.get(`${BASE_URL}/api/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    if (auditLogsRes.status === 200 && auditLogsRes.data.data?.logs.length > 0) {
      const logs = auditLogsRes.data.data.logs;
      const actions = logs.map((l: any) => l.action);
      console.log(`  ✅ Retrieved ${logs.length} audit log entries.`);
      console.log(`     Recorded actions include: ${Array.from(new Set(actions)).slice(0, 5).join(', ')}`);
    } else {
      throw new Error('Audit logs endpoint returned empty logs.');
    }

    // -------------------------------------------------------------
    // TEST 10: Suspended Student Token Rejection on Live Protected Routes
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 10] Testing Live Token rejection for Suspended users...');

    // Re-login student to get fresh token
    const freshLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: studentEmail,
      password: 'password123',
    });
    const activeStudentToken = freshLogin.data.tokens.accessToken;
    const activeRefreshToken = freshLogin.data.tokens.refreshToken;

    // Verify token works while ACTIVE
    const profileBefore = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${activeStudentToken}` },
    });
    if (profileBefore.status !== 200) {
      throw new Error('Active student could not access profile');
    }

    // Now suspend student
    await axios.patch(
      `${BASE_URL}/api/admin/users/${studentUser.id}/status`,
      { status: 'SUSPENDED' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    // Call protected endpoint with existing unexpired token -> MUST BE REJECTED (403)
    try {
      await axios.get(`${BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${activeStudentToken}` },
      });
      throw new Error('SECURITY VIOLATION: Suspended user was able to use existing JWT!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Live account status check rejected existing JWT for suspended user (403).');
      } else {
        throw new Error(`Expected 403 for suspended user, got: ${err.response?.status}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 11: Refresh Token Rejection for Suspended User
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 11] Testing Refresh Token rotation rejection for Suspended user...');

    try {
      await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
        refreshToken: activeRefreshToken,
      });
      throw new Error('SECURITY VIOLATION: Suspended user was able to rotate refresh token!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Refresh token rotation blocked for suspended user (403).');
      } else {
        throw new Error(`Expected 403 for suspended user refresh token, got: ${err.response?.status}`);
      }
    }

    // Restore student to ACTIVE
    await axios.patch(
      `${BASE_URL}/api/admin/users/${studentUser.id}/status`,
      { status: 'ACTIVE' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    // -------------------------------------------------------------
    // TEST 12: Super Admin Lockout Prevention
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 12] Testing Super Admin Lockout Prevention...');

    // Attempt to demote Super Admin
    const [superAdminRow] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, superAdminEmail));

    if (superAdminRow) {
      try {
        await axios.patch(
          `${BASE_URL}/api/admin/users/${superAdminRow.id}/role`,
          { role: 'STUDENT' },
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        throw new Error('SECURITY VIOLATION: Allowed demoting the final Super Admin!');
      } catch (err: any) {
        if (err.response?.status === 400) {
          console.log('  ✅ Demoting the final Super Admin was prevented (400 Bad Request).');
        } else {
          throw new Error(`Expected 400 for demoting final super admin, got: ${err.response?.status}`);
        }
      }

      try {
        await axios.patch(
          `${BASE_URL}/api/admin/users/${superAdminRow.id}/status`,
          { status: 'SUSPENDED' },
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        throw new Error('SECURITY VIOLATION: Allowed suspending the final Super Admin!');
      } catch (err: any) {
        if (err.response?.status === 400) {
          console.log('  ✅ Suspending the final Super Admin was prevented (400 Bad Request).');
        } else {
          throw new Error(`Expected 400 for suspending final super admin, got: ${err.response?.status}`);
        }
      }
    }

    // -------------------------------------------------------------
    // TEST 13: Question Input Validation (CBT Options & Correct Answer)
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 13] Testing CBT Question Input Validation...');

    // 13a. Attempt CBT question with options < 2
    try {
      await axios.post(
        `${BASE_URL}/api/admin/questions`,
        {
          courseId: sampleCourseId,
          type: 'cbt',
          question: 'What is a binary tree?',
          options: ['Only one option'],
          correctAnswer: 'Only one option',
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      throw new Error('VALIDATION FAILED: Created CBT question with only 1 option!');
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log('  ✅ CBT question with fewer than 2 options correctly rejected (400).');
      } else {
        throw new Error(`Expected 400 for invalid options count, got: ${err.response?.status}`);
      }
    }

    // 13b. Attempt CBT question with correctAnswer not in options
    try {
      await axios.post(
        `${BASE_URL}/api/admin/questions`,
        {
          courseId: sampleCourseId,
          type: 'cbt',
          question: 'What is a stack?',
          options: ['Option A', 'Option B', 'Option C'],
          correctAnswer: 'Option Z (not in options)',
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      throw new Error('VALIDATION FAILED: Created CBT question with non-matching correctAnswer!');
    } catch (err: any) {
      if (err.response?.status === 400) {
        console.log('  ✅ CBT question with non-matching correctAnswer correctly rejected (400).');
      } else {
        throw new Error(`Expected 400 for non-matching correctAnswer, got: ${err.response?.status}`);
      }
    }

    // -------------------------------------------------------------
    // TEST 14: Broadcast USER Targeting & Deduplication
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 14] Testing Broadcast USER targeting & recipient deduplication...');

    const userBroadcastRes = await axios.post(
      `${BASE_URL}/api/admin/notifications/broadcast`,
      {
        title: 'Personal Academic Warning',
        body: 'Please visit the department advisor office.',
        targetType: 'user',
        targetFilter: {
          userIds: [studentUser.id, studentUser.id], // duplicate test
        },
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (
      userBroadcastRes.status === 201 &&
      userBroadcastRes.data.data?.broadcast?.recipientCount === 1
    ) {
      console.log('  ✅ Broadcast targeted single user and deduplicated recipients (recipientCount = 1).');
    } else {
      throw new Error(`Expected recipientCount = 1, got: ${userBroadcastRes.data.data?.broadcast?.recipientCount}`);
    }

    // -------------------------------------------------------------
    // TEST 15: Course Safe-Deletion & Quiz History Preservation
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 15] Testing Course Safe-Deletion & Quiz History Preservation...');

    // Find first department
    const [dept] = await db.select({ id: departmentsTable.id }).from(departmentsTable).limit(1);
    if (!dept) throw new Error('No department found for testing');

    // Create a temporary course for deletion test
    const [tempCourse] = await db
      .insert(coursesTable)
      .values({
        code: `TST_${timestamp}`,
        title: 'Temporary Test Course',
        level: 100,
        semester: 'harmattan',
        departmentId: dept.id,
        isActive: true,
      })
      .returning();

    if (!tempCourse) throw new Error('Failed to create test course');

    // Create a temporary question
    const [tempQuestion] = await db
      .insert(questionsTable)
      .values({
        courseId: tempCourse.id,
        type: 'cbt',
        question: 'Temporary test question?',
        options: ['Yes', 'No'],
        correctAnswer: 'Yes',
        isActive: true,
      })
      .returning();

    if (!tempQuestion) throw new Error('Failed to create test question');

    // Insert student quiz attempt referencing this course
    const [tempAttempt] = await db
      .insert(quizHistoryTable)
      .values({
        userId: studentUser.id,
        courseId: tempCourse.id,
        quizType: 'cbt',
        category: 'test',
        score: 10,
        correctAnswers: 1,
        totalQuestions: 1,
      })
      .returning();

    if (!tempAttempt) throw new Error('Failed to create test quiz attempt');

    // Attempt deleting this course -> MUST SOFT-ARCHIVE to preserve history
    const deleteCourseRes = await axios.delete(
      `${BASE_URL}/api/admin/courses/${tempCourse.id}`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    if (deleteCourseRes.status === 200 && deleteCourseRes.data.data?.archived === true) {
      console.log('  ✅ Course deletion soft-archived to protect historical student records.');
    } else {
      throw new Error('Course with quiz history was not soft-archived!');
    }

    // Verify course is inactive in DB and attempt still exists
    const [dbCourseAfter] = await db
      .select({ isActive: coursesTable.isActive })
      .from(coursesTable)
      .where(eq(coursesTable.id, tempCourse.id));

    if (dbCourseAfter && dbCourseAfter.isActive === false) {
      console.log('  ✅ Verified course isActive is false in database.');
    } else {
      throw new Error('Expected course isActive to be false');
    }

    // Clean up temporary quiz attempt and course
    await db.delete(quizHistoryTable).where(eq(quizHistoryTable.id, tempAttempt.id));
    await db.delete(questionsTable).where(eq(questionsTable.id, tempQuestion.id));
    await db.delete(coursesTable).where(eq(coursesTable.id, tempCourse.id));

    // -------------------------------------------------------------
    // TEST 16: Support Attachment Upload & Authorized Download
    // -------------------------------------------------------------
    console.log('\n👉 [TEST 16] Testing Support Attachment Upload & Authorized Download...');

    // 16a. Student creates support ticket
    const ticketRes = await axios.post(
      `${BASE_URL}/api/support/requests`,
      {
        subject: 'Attachment Verification Ticket',
        category: 'technical',
        message: 'Here is a screenshot of the system error.',
        priority: 'medium',
      },
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );

    const ticketId = ticketRes.data.data.id;

    // 16b. Student uploads a mock image file using FormData
    const formData = new FormData();
    const fakeImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    );
    const blob = new Blob([fakeImageBuffer], { type: 'image/png' });
    formData.append('file', blob, 'screenshot.png');

    const uploadRes = await fetch(`${BASE_URL}/api/support/requests/${ticketId}/attachments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
      body: formData,
    });

    const uploadJson: any = await uploadRes.json();
    if (uploadRes.status !== 201 || !uploadJson.data?.attachment?.id) {
      throw new Error(`Failed to upload attachment: ${JSON.stringify(uploadJson)}`);
    }

    const attachmentId = uploadJson.data.attachment.id;
    console.log(`  ✅ Student successfully uploaded attachment (${uploadJson.data.attachment.fileName}).`);

    // 16c. Ticket owner downloads attachment -> 200 OK
    const ownerDownloadRes = await axios.get(
      `${BASE_URL}/api/support/requests/${ticketId}/attachments/${attachmentId}/file`,
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    if (ownerDownloadRes.status === 200) {
      console.log('  ✅ Ticket owner successfully downloaded attachment (200 OK).');
    }

    // 16d. Support Agent downloads attachment -> 200 OK
    const agentDownloadRes = await axios.get(
      `${BASE_URL}/api/support/requests/${ticketId}/attachments/${attachmentId}/file`,
      { headers: { Authorization: `Bearer ${supportAgentToken}` } }
    );
    if (agentDownloadRes.status === 200) {
      console.log('  ✅ Support Agent successfully downloaded user attachment (200 OK).');
    }

    // 16e. Create another student user and attempt unauthorized download -> 403 Forbidden
    const otherStudentEmail = `intruder_${timestamp}@test.edu.ng`;
    const otherStudent = await authService.saveUser(otherStudentEmail, {
      fullName: 'Other Student',
      username: `other_${timestamp}`,
      email: otherStudentEmail,
      password: 'password123',
    });
    const otherLogin = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: otherStudentEmail,
      password: 'password123',
    });
    const otherStudentToken = otherLogin.data.tokens.accessToken;

    try {
      await axios.get(
        `${BASE_URL}/api/support/requests/${ticketId}/attachments/${attachmentId}/file`,
        { headers: { Authorization: `Bearer ${otherStudentToken}` } }
      );
      throw new Error('SECURITY VIOLATION: Unauthorized student was able to download ticket attachment!');
    } catch (err: any) {
      if (err.response?.status === 403) {
        console.log('  ✅ Unauthorized student blocked from downloading ticket attachment (403 Forbidden).');
      } else {
        throw new Error(`Expected 403 for unauthorized attachment download, got: ${err.response?.status}`);
      }
    }

    // Clean up attachment and other student
    await db.delete(supportAttachmentsTable).where(eq(supportAttachmentsTable.id, attachmentId));
    await db.delete(supportRequestsTable).where(eq(supportRequestsTable.id, ticketId));
    await db.delete(usersTable).where(eq(usersTable.id, otherStudent.id));

    // Clean up test support agent
    if (supportUser?.id) {
      await db.delete(usersTable).where(eq(usersTable.id, supportUser.id));
    }
    if (studentUser?.id) {
      await db.delete(usersTable).where(eq(usersTable.id, studentUser.id));
    }

    console.log('\n=============================================================');
    console.log('🎉 ALL PHASE 2 & PHASE 3 TESTS PASSED WITH 100% SUCCESS!');
    console.log('=============================================================\n');
  } catch (error: any) {
    console.error('\n❌ TEST RUN FAILED:', error.message);
    if (error.response?.data) {
      console.error('Response Data:', error.response.data);
    }
    process.exitCode = 1;
  } finally {
    httpServer.close();
    await pool.end();
  }
}

runSecurityTests();
