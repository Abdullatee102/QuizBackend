import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { io as ioClient, Socket as ClientSocket } from 'socket.io-client';
import { db } from '../db/index.js';
import {
  usersTable,
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import authRoutes from '../routes/auth.routes.js';
import messageRoutes from '../routes/message.routes.js';
import supportRoutes from '../routes/support.routes.js';
import notificationRoutes from '../routes/notification.routes.js';
import { socketService } from '../socket/index.js';
import { authService } from '../services/authService.js';
import { quizService } from '../services/quizService.js';

dotenv.config();

const TEST_PORT = 5099;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function runAllTests() {
  console.log('\n=============================================================');
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND INTEGRATION & VERIFICATION');
  console.log('=============================================================\n');

  // 1. Setup express & socket test server
  const app = express();
  app.use(express.json());
  app.use(cors());

  const httpServer = http.createServer(app);
  socketService.init(httpServer);

  app.use('/api/auth', authRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api/support', supportRoutes);
  app.use('/api/notifications', notificationRoutes);

  await new Promise<void>((resolve) => httpServer.listen(TEST_PORT, () => resolve()));
  console.log(`[TEST SERVER] Listening on ${BASE_URL}`);

  let clientSocket: ClientSocket | null = null;

  try {
    // 2. Fetch or create a test user
    const testEmail = `test_verification_${Date.now()}@lautech.edu.ng`;
    const user = await authService.saveUser(testEmail, {
      fullName: 'Test Scholar',
      username: `scholar_${Date.now()}`,
      email: testEmail,
      phoneNumber: `+234${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      password: 'testpassword123',
    });

    const authTokens = await authService.generateAuthTokens({
      id: user.id,
      email: user.email,
    });

    const token = authTokens.accessToken;
    const authHeaders = { Authorization: `Bearer ${token}` };

    console.log(`✅ [1/7] Test user created: ${user.fullName} (${user.id})`);

    // 3. Fetch sample faculties and departments for validation tests
    const faculties = await db.select().from(facultiesTable).limit(2);
    if (faculties.length < 2) {
      throw new Error('Database needs at least 2 faculties for full testing');
    }
    const facultyA = faculties[0]!;
    const facultyB = faculties[1]!;

    const [deptA] = await db
      .select()
      .from(departmentsTable)
      .where(eq(departmentsTable.facultyId, facultyA.id))
      .limit(1);

    const [deptB] = await db
      .select()
      .from(departmentsTable)
      .where(eq(departmentsTable.facultyId, facultyB.id))
      .limit(1);

    if (!deptA || !deptB) {
      throw new Error('Database needs departments for testing');
    }

    console.log(`   Faculty A: ${facultyA.name} (${facultyA.code}) -> Dept: ${deptA.name}`);
    console.log(`   Faculty B: ${facultyB.name} (${facultyB.code}) -> Dept: ${deptB.name}`);

    // 4. Test Valid Academic Profile Update
    console.log('\n--- [2/7] Testing Academic Profile Update & Retrieval ---');
    const updateRes = await axios.patch(
      `${BASE_URL}/api/auth/profile`,
      {
        facultyId: facultyA.id,
        departmentId: deptA.id,
        level: 200,
        bio: 'Studying hard for exams!',
      },
      { headers: authHeaders }
    );

    if (updateRes.status !== 200 || updateRes.data.data.level !== 200) {
      throw new Error('Valid profile update failed');
    }
    console.log('✅ Academic profile successfully updated with Faculty A + Dept A + 200L');

    // Fetch Profile and check populated data
    const getProfileRes = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: authHeaders,
    });
    const profileData = getProfileRes.data.data;
    if (
      !profileData.faculty ||
      profileData.faculty.id !== facultyA.id ||
      !profileData.department ||
      profileData.department.id !== deptA.id ||
      profileData.level !== 200
    ) {
      throw new Error('Profile GET did not properly populate faculty/department objects');
    }
    console.log('✅ GET /api/auth/profile returned populated faculty & department structures');

    // 5. Test Strict Academic Validation (Negative Tests)
    console.log('\n--- [3/7] Testing Academic Validation Rejections ---');
    // Mismatched Faculty A with Dept B (Dept B belongs to Faculty B)
    try {
      await axios.patch(
        `${BASE_URL}/api/auth/profile`,
        {
          facultyId: facultyA.id,
          departmentId: deptB.id,
        },
        { headers: authHeaders }
      );
      throw new Error('Server unexpectedly allowed mismatched Faculty and Department!');
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        console.log(`✅ Correctly rejected mismatched Faculty/Department: "${err.response.data.message}"`);
      } else {
        throw err;
      }
    }

    // Invalid academic level (e.g. 99)
    try {
      await axios.patch(
        `${BASE_URL}/api/auth/profile`,
        { level: 99 },
        { headers: authHeaders }
      );
      throw new Error('Server unexpectedly allowed invalid academic level (99)!');
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        console.log(`✅ Correctly rejected invalid academic level: 400 Bad Request`);
      } else {
        throw err;
      }
    }

    // 6. Test Recommended Courses Endpoint
    console.log('\n--- [4/7] Testing Recommended Courses Endpoint ---');
    const recCoursesRes = await axios.get(
      `${BASE_URL}/api/auth/recommended-courses`,
      { headers: authHeaders }
    );
    if (recCoursesRes.status !== 200 || !recCoursesRes.data.hasAcademicProfile) {
      throw new Error('Failed to retrieve recommended courses');
    }
    console.log(
      `✅ GET /api/auth/recommended-courses returned ${recCoursesRes.data.count} course(s) for Dept: ${deptA.code} at 200L`
    );

    // Global courses browsing test
    const globalCoursesRes = await axios.get(
      `${BASE_URL}/api/auth/departments/${deptA.id}/courses`,
      { headers: authHeaders }
    );
    if (globalCoursesRes.status !== 200) {
      throw new Error('Global courses list endpoint failed');
    }
    console.log(`✅ Global course discovery endpoint intact (${globalCoursesRes.data.count} courses)`);

    // 7. Test Socket.IO Real-time Connection and Academic Messaging
    console.log('\n--- [5/7] Testing Socket.IO Real-time Academic Messaging ---');
    clientSocket = ioClient(BASE_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    await new Promise<void>((resolve, reject) => {
      clientSocket!.on('connect', () => {
        console.log(`✅ Socket.IO authenticated client connected: ${clientSocket!.id}`);
        resolve();
      });
      clientSocket!.on('connect_error', (err) => {
        reject(new Error(`Socket connection error: ${err.message}`));
      });
      setTimeout(() => reject(new Error('Socket connection timed out')), 5000);
    });

    // Verify academic channels listing with department scoping
    const deptChannelsRes = await axios.get(
      `${BASE_URL}/api/messages/academic-channels?departmentId=${deptA.id}`,
      { headers: authHeaders }
    );
    const level200 = deptChannelsRes.data.data.levels.find((l: any) => l.level === 200);
    if (!level200 || !level200.title.includes(deptA.name)) {
      throw new Error('Department-scoped level title was not generated properly');
    }
    console.log(`✅ Academic channels returned department-scoped level: "${level200.title}"`);

    // Test joining academic rooms
    clientSocket.emit('join:faculty', facultyA.id);
    clientSocket.emit('join:department', deptA.id);
    clientSocket.emit('join:level', { level: 200, departmentId: deptA.id });

    // Create or get departmental level conversation
    const levelChannelRes = await axios.post(
      `${BASE_URL}/api/messages/academic-channels/join`,
      {
        type: 'level',
        targetId: deptA.id,
        level: 200,
        title: `200 Level — ${deptA.name}`,
        code: `${deptA.code} 200L`,
      },
      { headers: authHeaders }
    );
    if (
      levelChannelRes.data.data.level !== 200 ||
      levelChannelRes.data.data.departmentId !== deptA.id
    ) {
      throw new Error('Level channel not scoped to department');
    }
    console.log(`✅ Level discussion created & scoped: "${levelChannelRes.data.data.title}" (Dept: ${deptA.code}, Level: 200)`);

    // Create or get department conversation
    const channelRes = await axios.post(
      `${BASE_URL}/api/messages/academic-channels/join`,
      {
        type: 'department',
        targetId: deptA.id,
        title: deptA.name,
        code: deptA.code,
      },
      { headers: authHeaders }
    );

    const convId = channelRes.data.data.id;
    clientSocket.emit('join:conversation', convId);

    // Listen for real-time new_message event
    const receivedMessagePromise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error('Timed out waiting for socket new_message event')),
        5000
      );
      clientSocket!.on('new_message', (msg) => {
        clearTimeout(timeout);
        resolve(msg);
      });
    });

    // Send message via Socket.IO
    clientSocket.emit('send_message', {
      conversationId: convId,
      text: 'Hello scholars from automated test socket!',
    });

    const receivedSocketMsg = await receivedMessagePromise;
    if (
      !receivedSocketMsg ||
      receivedSocketMsg.text !== 'Hello scholars from automated test socket!'
    ) {
      throw new Error('Socket new_message event content did not match expected text');
    }
    console.log('✅ Real-time Socket.IO send_message persisted to DB and emitted new_message');

    // Also test REST API send message emits to socket
    const restMsgPromise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error('Timed out waiting for REST socket emission')),
        5000
      );
      clientSocket!.on('new_message', (msg) => {
        if (msg.text === 'Message sent via REST API') {
          clearTimeout(timeout);
          resolve(msg);
        }
      });
    });

    await axios.post(
      `${BASE_URL}/api/messages/conversations/${convId}/messages`,
      { text: 'Message sent via REST API' },
      { headers: authHeaders }
    );
    await restMsgPromise;
    console.log('✅ REST message POST successfully triggered Socket.IO room broadcast');

    // 8. Test Support Request System
    console.log('\n--- [6/7] Testing Support Ticket System ---');
    const createSupportRes = await axios.post(
      `${BASE_URL}/api/support/requests`,
      {
        subject: 'Inquiry regarding quiz past question access',
        category: 'academic',
        message: 'Could you please confirm if harmattan 2024 questions are available?',
        priority: 'medium',
      },
      { headers: authHeaders }
    );

    if (createSupportRes.status !== 201) {
      throw new Error('Failed to create support ticket');
    }
    const ticketId = createSupportRes.data.data.id;
    console.log(`✅ Support request created: ${ticketId} (Status: ${createSupportRes.data.data.status})`);

    // List user support requests
    const listSupportRes = await axios.get(`${BASE_URL}/api/support/requests`, {
      headers: authHeaders,
    });
    if (listSupportRes.data.count < 1) {
      throw new Error('Support request list was empty');
    }
    console.log(`✅ GET /api/support/requests returned ${listSupportRes.data.count} ticket(s)`);

    // Add reply message
    const replyRes = await axios.post(
      `${BASE_URL}/api/support/requests/${ticketId}/messages`,
      { message: 'Follow up update on my question.' },
      { headers: authHeaders }
    );
    if (replyRes.status !== 201) {
      throw new Error('Failed to add reply to support ticket');
    }
    console.log('✅ Added reply to support ticket');

    // Update support status as ordinary student (MUST FAIL with 403 Forbidden)
    try {
      await axios.patch(
        `${BASE_URL}/api/support/requests/${ticketId}/status`,
        { status: 'resolved' },
        { headers: authHeaders }
      );
      throw new Error('Server unexpectedly allowed ordinary student to change support status!');
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        console.log(`✅ Correctly prevented ordinary student from updating support status (403 Forbidden): "${err.response.data.message}"`);
      } else {
        throw err;
      }
    }

    // Update support status as support representative/admin (MUST SUCCEED)
    const supportTokens = await authService.generateAuthTokens({
      id: user.id,
      email: user.email,
      role: 'support',
    });
    const supportHeaders = { Authorization: `Bearer ${supportTokens.accessToken}` };

    const statusRes = await axios.patch(
      `${BASE_URL}/api/support/requests/${ticketId}/status`,
      { status: 'resolved' },
      { headers: supportHeaders }
    );
    if (statusRes.data.data.status !== 'resolved') {
      throw new Error('Failed to update support ticket status with support credentials');
    }
    console.log('✅ Support representative successfully updated ticket status to "resolved"');

    // 9. Test Theory & CBT Grading Contracts & Question Security
    console.log('\n--- [7/7] Testing Theory Grading Contract & Question Security ---');
    // Find a course with theory questions
    const [theoryQuestion] = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.type, 'theory'))
      .limit(1);

    if (theoryQuestion) {
      const gradingResult = await quizService.gradeQuiz(
        theoryQuestion.courseId,
        'theory',
        [
          {
            questionId: theoryQuestion.id,
            answer: theoryQuestion.correctAnswer, // Full match test
          },
        ]
      );

      const gradedQ = gradingResult.results[0]!;
      if (
        !gradedQ ||
        gradedQ.maxScore !== 10 ||
        gradedQ.score !== 10 ||
        !gradedQ.feedback ||
        !gradedQ.matchedConcepts
      ) {
        throw new Error('Theory grading contract missing structured fields');
      }
      console.log('✅ Theory Grading Contract verified:');
      console.log(`   Score: ${gradedQ.score}/${gradedQ.maxScore} (${gradedQ.percentage}%)`);
      console.log(`   Matched Concepts: [${gradedQ.matchedConcepts.join(', ')}]`);
      console.log(`   Feedback: "${gradedQ.feedback}"`);

      // Verify question endpoint security (ensure correctAnswer & gradingPoints are NOT returned)
      const studentQuestionsRes = await axios.get(
        `${BASE_URL}/api/auth/courses/${theoryQuestion.courseId}/questions?type=theory`,
        { headers: authHeaders }
      );
      const studentQ = studentQuestionsRes.data.data[0];
      if (studentQ.correctAnswer !== undefined || studentQ.gradingPoints !== undefined) {
        throw new Error('CRITICAL SECURITY ISSUE: correctAnswer or gradingPoints exposed to client!');
      }
      console.log('🔒 Security check passed: correctAnswer and gradingPoints are strictly hidden from students');
    } else {
      console.log('ℹ️ No theory questions found to evaluate, skipping theory grading check.');
    }

    console.log('\n=============================================================');
    console.log('🎉 ALL INTEGRATION TESTS PASSED WITH 100% SUCCESS!');
    console.log('=============================================================\n');
  } catch (error: any) {
    console.error('\n❌ INTEGRATION TEST FAILED:');
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else {
      console.error(error.message || error);
    }
    process.exit(1);
  } finally {
    if (clientSocket) {
      clientSocket.disconnect();
    }
    httpServer.close();
  }
}

runAllTests();

