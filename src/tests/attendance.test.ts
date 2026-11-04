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
  attendanceSessionsTable,
  attendanceRecordsTable,
  attendanceAuditLogsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07G: Lecturer Attendance Management Suite', () => {
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

  let enrolledStudent1Id: string;
  let enrolledStudent1Token: string;

  let enrolledStudent2Id: string;
  let enrolledStudent2Token: string;

  let unenrolledStudentId: string;
  let unenrolledStudentToken: string;

  let sessionId1: string;
  let sessionId2: string;
  let student1RecordId: string;

  before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
    app.use('/api/lecturer', lecturerRoutes);

    server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, () => resolve()));
    const address = server.address() as any;
    baseUrl = `http://127.0.0.1:${address.port}`;

    const timestamp = Date.now();
    const rand = Math.floor(Math.random() * 89999 + 10000);

    // 1. Setup Faculty & Department
    const [faculty] = (await db
      .insert(facultiesTable)
      .values({
        name: `Faculty_Att_${rand}`,
        code: `FATT_${rand}`,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [department] = (await db
      .insert(departmentsTable)
      .values({
        name: `Dept_Att_${rand}`,
        code: `DATT_${rand}`,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = department.id;

    // 2. Setup Course
    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `ATT_${rand}`,
        title: `Attendance Systems Testing ${rand}`,
        departmentId: testDepartmentId,
        level: 300,
        semester: 'FIRST',
      } as any)
      .returning()) as any[];
    testCourseId = course.id;

    // 3. Setup Course Offerings
    const [offering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'FIRST',
        level: 300,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    testOfferingId = offering.id;

    const [unassignedOffering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'SECOND',
        level: 300,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    unassignedOfferingId = unassignedOffering.id;

    // 4. Setup Lecturers
    const [assignedLecturer] = (await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Assigned Lecturer ${rand}`,
        email: `assigned_lec_${rand}@test.edu`,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        password: 'Password123!',
      } as any)
      .returning()) as any[];
    assignedLecturerId = assignedLecturer.id;

    const assignedTokens = await authService.generateAuthTokens({
      id: assignedLecturer.id,
      email: assignedLecturer.email,
      role: assignedLecturer.role,
    });
    assignedLecturerToken = assignedTokens.accessToken;

    const [unassignedLecturer] = (await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Unassigned Lecturer ${rand}`,
        email: `unassigned_lec_${rand}@test.edu`,
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        password: 'Password123!',
      } as any)
      .returning()) as any[];
    unassignedLecturerId = unassignedLecturer.id;

    const unassignedTokens = await authService.generateAuthTokens({
      id: unassignedLecturer.id,
      email: unassignedLecturer.email,
      role: unassignedLecturer.role,
    });
    unassignedLecturerToken = unassignedTokens.accessToken;

    // Link assigned lecturer to offering
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId as any,
      lecturerId: assignedLecturerId as any,
      role: 'COORDINATOR',
      status: 'ACTIVE',
    });

    // 5. Setup Students
    const [student1] = (await db
      .insert(usersTable)
      .values({
        fullName: `Student Alpha ${rand}`,
        email: `student_alpha_${rand}@student.edu`,
        username: `MAT_${rand}_01`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: testDepartmentId,
        level: 300,
        password: 'Password123!',
      } as any)
      .returning()) as any[];
    enrolledStudent1Id = student1.id;

    const student1Tokens = await authService.generateAuthTokens({
      id: student1.id,
      email: student1.email,
      role: student1.role,
    });
    enrolledStudent1Token = student1Tokens.accessToken;

    const [student2] = (await db
      .insert(usersTable)
      .values({
        fullName: `Student Beta ${rand}`,
        email: `student_beta_${rand}@student.edu`,
        username: `MAT_${rand}_02`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: testDepartmentId,
        level: 300,
        password: 'Password123!',
      } as any)
      .returning()) as any[];
    enrolledStudent2Id = student2.id;

    const student2Tokens = await authService.generateAuthTokens({
      id: student2.id,
      email: student2.email,
      role: student2.role,
    });
    enrolledStudent2Token = student2Tokens.accessToken;

    const [unenrolledStudent] = (await db
      .insert(usersTable)
      .values({
        fullName: `Student Gamma ${rand}`,
        email: `student_gamma_${rand}@student.edu`,
        username: `MAT_${rand}_03`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: testDepartmentId,
        level: 300,
        password: 'Password123!',
      } as any)
      .returning()) as any[];
    unenrolledStudentId = unenrolledStudent.id;

    const unenrolledTokens = await authService.generateAuthTokens({
      id: unenrolledStudent.id,
      email: unenrolledStudent.email,
      role: unenrolledStudent.role,
    });
    unenrolledStudentToken = unenrolledTokens.accessToken;

    // Enroll student1 and student2 into testOfferingId
    await db.insert(studentEnrollmentsTable).values([
      {
        offeringId: testOfferingId as any,
        studentId: enrolledStudent1Id as any,
        status: 'ENROLLED',
      },
      {
        offeringId: testOfferingId as any,
        studentId: enrolledStudent2Id as any,
        status: 'ENROLLED',
      },
    ]);
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // 1. Attendance Session Creation & Validation
  // =========================================================================
  describe('1. Attendance Session Creation & Validation', () => {
    it('rejects unassigned lecturer on session creation with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${unassignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'Week 1: Introduction to Indexing',
          sessionType: 'LECTURE',
          sessionDate: '2026-03-10',
          startTime: '09:00',
          endTime: '11:00',
        }),
      });
      assert.strictEqual(res.status, 403);
      const json: any = await res.json();
      assert.match(json.message, /not actively assigned/i);
    });

    it('rejects session creation with title shorter than 3 characters with 400 Bad Request', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'Hi',
          sessionType: 'LECTURE',
          sessionDate: '2026-03-10',
        }),
      });
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message || json.errors?.[0]?.message, /at least 3 characters/i);
    });

    it('creates attendance session successfully for assigned lecturer', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'Week 1: Introduction to Indexing',
          sessionType: 'LECTURE',
          sessionDate: '2026-03-10',
          startTime: '09:00',
          endTime: '11:00',
          notes: 'Lecture Hall 3',
        }),
      });
      assert.strictEqual(res.status, 201);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.id);
      assert.strictEqual(json.data.title, 'Week 1: Introduction to Indexing');
      assert.strictEqual(json.data.sessionType, 'LECTURE');
      assert.strictEqual(json.data.status, 'OPEN');
      assert.strictEqual(json.data.startTime, '09:00');
      assert.strictEqual(json.data.endTime, '11:00');
      sessionId1 = json.data.id;
    });

    it('creates a second session for lab work', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'Week 2: Practical Query Tuning Lab',
          sessionType: 'LAB',
          sessionDate: '2026-03-17',
          startTime: '14:00',
          endTime: '16:00',
        }),
      });
      assert.strictEqual(res.status, 201);
      const json: any = await res.json();
      sessionId2 = json.data.id;
    });
  });

  // =========================================================================
  // 2. Attendance Session Updates & Lifecycle
  // =========================================================================
  describe('2. Attendance Session Updates & Lifecycle', () => {
    it('updates session parameters successfully', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            title: 'Week 1: Introduction to Indexing & Explain Plans',
            notes: 'Moved to Computer Lab A',
          }),
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.title, 'Week 1: Introduction to Indexing & Explain Plans');
      assert.strictEqual(json.data.notes, 'Moved to Computer Lab A');
    });

    it('rejects update from unassigned lecturer with 403 Forbidden', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${unassignedLecturerToken}`,
          },
          body: JSON.stringify({
            title: 'Unauthorized Modification',
          }),
        }
      );
      assert.strictEqual(res.status, 403);
    });
  });

  // =========================================================================
  // 3. Session Listing & Filtering
  // =========================================================================
  describe('3. Session Listing & Filtering', () => {
    it('lists all sessions for assigned offering with stats', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.sessions.length, 2);
      assert.strictEqual(json.data.pagination.total, 2);
      assert.ok(json.data.sessions[0].stats);
    });

    it('filters sessions by status=OPEN', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions?status=OPEN`,
        {
          headers: { Authorization: `Bearer ${assignedLecturerToken}` },
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.sessions.length, 2);
    });

    it('rejects unassigned lecturer on list with 403', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions`,
        {
          headers: { Authorization: `Bearer ${unassignedLecturerToken}` },
        }
      );
      assert.strictEqual(res.status, 403);
    });
  });

  // =========================================================================
  // 4. Attendance Session Details & Student Roster
  // =========================================================================
  describe('4. Attendance Session Details & Student Roster', () => {
    it('returns session details and enrolled student roster', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}`,
        {
          headers: { Authorization: `Bearer ${assignedLecturerToken}` },
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.session.id, sessionId1);
      assert.strictEqual(json.data.stats.enrolledTotal, 2);
      assert.strictEqual(json.data.stats.markedTotal, 0);
      assert.strictEqual(json.data.roster.length, 2);
      assert.strictEqual(json.data.roster[0].isMarked, false);
      assert.strictEqual(json.data.roster[0].status, null);
    });
  });

  // =========================================================================
  // 5. Batch Attendance Recording
  // =========================================================================
  describe('5. Batch Attendance Recording', () => {
    it('rejects attendance recording when student is not enrolled in offering (400)', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            records: [
              { studentId: unenrolledStudentId, status: 'PRESENT' },
            ],
          }),
        }
      );
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message, /not actively enrolled/i);
    });

    it('records attendance for enrolled students successfully', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            records: [
              { studentId: enrolledStudent1Id, status: 'PRESENT', remarks: 'Arrived on time' },
              { studentId: enrolledStudent2Id, status: 'LATE', remarks: '15 mins late' },
            ],
          }),
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.createdCount, 2);

      // Verify records in database
      const records = await db
        .select()
        .from(attendanceRecordsTable)
        .where(eq(attendanceRecordsTable.sessionId, sessionId1 as any));
      assert.strictEqual(records.length, 2);

      const st1 = records.find((r) => r.studentId === enrolledStudent1Id);
      assert.ok(st1);
      assert.strictEqual(st1.status, 'PRESENT');
      assert.strictEqual(st1.remarks, 'Arrived on time');
      student1RecordId = st1.id;

      const st2 = records.find((r) => r.studentId === enrolledStudent2Id);
      assert.ok(st2);
      assert.strictEqual(st2.status, 'LATE');
    });

    it('records attendance for session 2 (st1 present, st2 absent)', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId2}/records`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            records: [
              { studentId: enrolledStudent1Id, status: 'PRESENT' },
              { studentId: enrolledStudent2Id, status: 'ABSENT' },
            ],
          }),
        }
      );
      assert.strictEqual(res.status, 200);
    });
  });

  // =========================================================================
  // 6. Attendance Correction & Audit Logging
  // =========================================================================
  describe('6. Attendance Correction & Audit Logging', () => {
    it('rejects correction when reason is shorter than 5 characters (400)', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}/records/${student1RecordId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            status: 'EXCUSED',
            reason: 'Sick',
          }),
        }
      );
      assert.strictEqual(res.status, 400);
      const json: any = await res.json();
      assert.match(json.message || json.errors?.[0]?.message, /at least 5 characters/i);
    });

    it('corrects attendance record and generates immutable audit entry', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/sessions/${sessionId1}/records/${student1RecordId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            status: 'EXCUSED',
            remarks: 'Submitted medical note',
            reason: 'Student presented official health clinic note for excused absence.',
          }),
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.record.status, 'EXCUSED');
      assert.strictEqual(json.data.record.remarks, 'Submitted medical note');
      assert.strictEqual(json.data.auditLog.previousStatus, 'PRESENT');
      assert.strictEqual(json.data.auditLog.newStatus, 'EXCUSED');
      assert.strictEqual(json.data.auditLog.reason, 'Student presented official health clinic note for excused absence.');

      // Check database audit table
      const [audit] = await db
        .select()
        .from(attendanceAuditLogsTable)
        .where(eq(attendanceAuditLogsTable.recordId, student1RecordId as any));
      assert.ok(audit);
      assert.strictEqual(audit.previousStatus, 'PRESENT');
      assert.strictEqual(audit.newStatus, 'EXCUSED');
    });
  });

  // =========================================================================
  // 7. Offering Attendance Summary & Cohort Analytics
  // =========================================================================
  describe('7. Offering Attendance Summary & Cohort Analytics', () => {
    it('returns cohort-level attendance metrics and student summaries', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/summary`, {
        headers: { Authorization: `Bearer ${assignedLecturerToken}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.metrics.totalSessions, 2);
      assert.strictEqual(json.data.metrics.enrolledStudentsCount, 2);
      assert.ok(json.data.students.length === 2);

      const st1 = json.data.students.find((s: any) => s.studentId === enrolledStudent1Id);
      assert.ok(st1);
      // Student 1 has session 1 (EXCUSED) and session 2 (PRESENT)
      assert.strictEqual(st1.presentCount, 1);
      assert.strictEqual(st1.excusedCount, 1);
      assert.strictEqual(st1.attendedCount, 1); // 1 present out of 2 = 50%
      assert.strictEqual(st1.attendancePercentage, 50);

      const st2 = json.data.students.find((s: any) => s.studentId === enrolledStudent2Id);
      assert.ok(st2);
      // Student 2 has session 1 (LATE) and session 2 (ABSENT)
      assert.strictEqual(st2.lateCount, 1);
      assert.strictEqual(st2.absentCount, 1);
      assert.strictEqual(st2.attendedCount, 1); // 1 late out of 2 = 50%
      assert.strictEqual(st2.attendancePercentage, 50);
    });

    it('returns individual student history with correction audit entries', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/attendance/students/${enrolledStudent1Id}/history`,
        {
          headers: { Authorization: `Bearer ${assignedLecturerToken}` },
        }
      );
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.data.records.length, 2);
      assert.ok(json.data.auditLogs.length >= 1);
      assert.strictEqual(json.data.auditLogs[0].newStatus, 'EXCUSED');
    });
  });

  // =========================================================================
  // 8. Student Self-Service Attendance Access & Isolation
  // =========================================================================
  describe('8. Student Self-Service Attendance Access & Isolation', () => {
    it('returns own attendance records and summary to enrolled student 1', async () => {
      const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/attendance`, {
        headers: { Authorization: `Bearer ${enrolledStudent1Token}` },
      });
      assert.strictEqual(res.status, 200);
      const json: any = await res.json();
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.summary.totalSessions, 2);
      assert.strictEqual(json.data.summary.attendedCount, 1);
      assert.strictEqual(json.data.summary.attendancePercentage, 50);
      assert.strictEqual(json.data.history.length, 2);
    });

    it('rejects unenrolled student from viewing offering attendance (403 Forbidden)', async () => {
      const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/attendance`, {
        headers: { Authorization: `Bearer ${unenrolledStudentToken}` },
      });
      assert.strictEqual(res.status, 403);
      const json: any = await res.json();
      assert.match(json.message, /not actively enrolled/i);
    });

    it('rejects enrolled student from accessing unassigned/unenrolled offering (403 Forbidden)', async () => {
      const res = await fetch(`${baseUrl}/api/auth/offerings/${unassignedOfferingId}/attendance`, {
        headers: { Authorization: `Bearer ${enrolledStudent1Token}` },
      });
      assert.strictEqual(res.status, 403);
    });
  });
});

