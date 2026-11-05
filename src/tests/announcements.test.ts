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
  courseAnnouncementsTable,
  courseDiscussionsTable,
  courseDiscussionRepliesTable,
  notificationsTable,
  broadcastsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
  ANNOUNCEMENT_PRIORITIES,
  ANNOUNCEMENT_STATUSES,
} from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import lecturerRoutes from '../routes/lecturer/index.js';
import adminRoutes from '../routes/admin/index.js';

describe('BB-07I: Announcements & Discussions Engine Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testFacultyCode: string;
  let testDepartmentId: string;
  let testDepartmentCode: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let assignedLecturerId: string;
  let assignedLecturerToken: string;

  let unassignedLecturerId: string;
  let unassignedLecturerToken: string;

  let adminId: string;
  let adminToken: string;

  let enrolledStudentId: string;
  let enrolledStudentEmail: string;
  let enrolledStudentToken: string;

  let unenrolledStudentId: string;
  let unenrolledStudentToken: string;

  let createdDraftAnnouncementId: string;
  let createdPublishedAnnouncementId: string;
  let studentDiscussionThreadId: string;
  let lecturerDiscussionThreadId: string;

  before(async () => {
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
    testFacultyCode = `FCI_${rand}`;
    testDepartmentCode = `CSC_${rand}`;

    // 1. Setup Faculty & Department
    const [faculty] = (await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Computing ${rand}`,
        code: testFacultyCode,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [department] = (await db
      .insert(departmentsTable)
      .values({
        name: `Computer Science ${rand}`,
        code: testDepartmentCode,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = department.id;

    // 2. Setup Course
    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `CSC301_${rand}`,
        title: `Announcements Systems Course ${rand}`,
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
        academicSession: '2024/2025',
        semester: 'FIRST',
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
        semester: 'SECOND',
        level: 300,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    unassignedOfferingId = unassignedOff.id;

    // 4. Setup Users
    const [lecturer1] = (await db
      .insert(usersTable)
      .values({
        email: `assigned_lecturer_${rand}@brainbuzz.app`,
        password: 'password123',
        fullName: 'Dr. Assigned Lecturer',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    assignedLecturerId = lecturer1.id;
    const l1Token = await authService.generateAuthTokens({
      id: assignedLecturerId,
      role: USER_ROLES.LECTURER,
      email: lecturer1.email,
    });
    assignedLecturerToken = l1Token.accessToken;

    const [lecturer2] = (await db
      .insert(usersTable)
      .values({
        email: `unassigned_lecturer_${rand}@brainbuzz.app`,
        password: 'password123',
        fullName: 'Prof. Unassigned Lecturer',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    unassignedLecturerId = lecturer2.id;
    const l2Token = await authService.generateAuthTokens({
      id: unassignedLecturerId,
      role: USER_ROLES.LECTURER,
      email: lecturer2.email,
    });
    unassignedLecturerToken = l2Token.accessToken;

    const [adminUser] = (await db
      .insert(usersTable)
      .values({
        email: `admin_notice_${rand}@brainbuzz.app`,
        password: 'password123',
        fullName: 'System Administrator',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    adminId = adminUser.id;
    const admToken = await authService.generateAuthTokens({
      id: adminId,
      role: USER_ROLES.SUPER_ADMIN,
      email: adminUser.email,
    });
    adminToken = admToken.accessToken;

    enrolledStudentEmail = `enrolled_student_${rand}@brainbuzz.app`;
    const [student1] = (await db
      .insert(usersTable)
      .values({
        email: enrolledStudentEmail,
        password: 'password123',
        fullName: 'Jane Enrolled',
        username: `jane_${rand}`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        level: 300,
      } as any)
      .returning()) as any[];
    enrolledStudentId = student1.id;
    const s1Token = await authService.generateAuthTokens({
      id: enrolledStudentId,
      role: USER_ROLES.STUDENT,
      email: student1.email,
    });
    enrolledStudentToken = s1Token.accessToken;

    const [student2] = (await db
      .insert(usersTable)
      .values({
        email: `unenrolled_student_${rand}@brainbuzz.app`,
        password: 'password123',
        fullName: 'John Unenrolled',
        username: `john_${rand}`,
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
      } as any)
      .returning()) as any[];
    unenrolledStudentId = student2.id;
    const s2Token = await authService.generateAuthTokens({
      id: unenrolledStudentId,
      role: USER_ROLES.STUDENT,
      email: student2.email,
    });
    unenrolledStudentToken = s2Token.accessToken;

    // 5. Link Lecturer to testOfferingId
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: assignedLecturerId,
      role: 'COORDINATOR',
      isPrimary: true,
    } as any);

    // 6. Enroll Student in testOfferingId
    await db.insert(studentEnrollmentsTable).values({
      offeringId: testOfferingId,
      studentId: enrolledStudentId,
      status: 'ENROLLED',
    } as any);
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // SECTION 1: LECTURER ANNOUNCEMENT LIFECYCLE & PRIORITIES
  // =========================================================================

  it('1. Lecturer should create a DRAFT announcement successfully without sending notifications', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        title: 'Draft: Upcoming Exam Schedule',
        content: 'This draft notice is not yet visible to students.',
        priority: 'NORMAL',
        status: 'DRAFT',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.title, 'Draft: Upcoming Exam Schedule');
    assert.strictEqual(body.data.status, 'DRAFT');
    assert.strictEqual(body.data.priority, 'NORMAL');
    createdDraftAnnouncementId = body.data.id;

    // Verify student notifications was NOT triggered for DRAFT
    const notifs = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, enrolledStudentId as any));
    const matchingNotif = notifs.find((n) => (n.data as any)?.announcementId === createdDraftAnnouncementId);
    assert.strictEqual(matchingNotif, undefined, 'Draft announcements must not dispatch student notifications');
  });

  it('2. Lecturer should create a PUBLISHED URGENT announcement and dispatch notifications to enrolled students', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        title: 'URGENT: CBT Hall Changed to Science Lab 2',
        content: 'Please proceed immediately to Lab 2 for your examination.',
        priority: 'URGENT',
        status: 'PUBLISHED',
        attachmentUrl: 'https://example.com/hall_allocation.pdf',
        attachmentName: 'Hall Allocation Map',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.status, 'PUBLISHED');
    assert.strictEqual(body.data.priority, 'URGENT');
    assert.ok(body.data.publishedAt);
    createdPublishedAnnouncementId = body.data.id;

    // Small delay for asynchronous notification dispatch to complete
    await new Promise((r) => setTimeout(r, 200));

    // Verify student received the in-app notification
    const notifs = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, enrolledStudentId as any));
    const urgentNotif = notifs.find((n) => (n.data as any)?.announcementId === createdPublishedAnnouncementId);
    assert.ok(urgentNotif, 'Enrolled student should receive in-app notification on published announcement');
    assert.strictEqual(urgentNotif.type, 'COURSE_ANNOUNCEMENT');
    assert.ok(urgentNotif.title.includes('URGENT'), 'Title should reflect URGENT priority');
  });

  it('3. Lecturer should list offering announcements with metrics overview', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements`, {
      headers: {
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.announcements));
    assert.strictEqual(body.data.announcements.length, 2);
    assert.strictEqual(body.data.metrics.total, 2);
    assert.strictEqual(body.data.metrics.published, 1);
    assert.strictEqual(body.data.metrics.draft, 1);
    assert.strictEqual(body.data.metrics.urgent, 1);
  });

  it('4. Lecturer should update announcement from DRAFT to PUBLISHED and trigger notification', async () => {
    const res = await fetch(
      `${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements/${createdDraftAnnouncementId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'FINAL: Upcoming Exam Schedule Released',
          status: 'PUBLISHED',
          priority: 'IMPORTANT',
        }),
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.status, 'PUBLISHED');
    assert.strictEqual(body.data.priority, 'IMPORTANT');
    assert.ok(body.data.publishedAt);

    await new Promise((r) => setTimeout(r, 200));

    // Verify notification was dispatched upon transitioning DRAFT -> PUBLISHED
    const notifs = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, enrolledStudentId as any));
    const publishedDraftNotif = notifs.find((n) => (n.data as any)?.announcementId === createdDraftAnnouncementId);
    assert.ok(publishedDraftNotif, 'Publishing a draft should dispatch notifications to students');
  });

  // =========================================================================
  // SECTION 2: IDOR DEFENSES ON LECTURER ENDPOINTS
  // =========================================================================

  it('5. Unassigned lecturer should be rejected with 403 Forbidden when creating announcements', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${unassignedLecturerToken}`,
      },
      body: JSON.stringify({
        title: 'Unauthorized Notice',
        content: 'I am not assigned to this offering.',
      }),
    });

    assert.strictEqual(res.status, 403);
  });

  it('6. Unassigned lecturer should be rejected with 403 Forbidden when modifying announcements', async () => {
    const res = await fetch(
      `${baseUrl}/api/lecturer/offerings/${testOfferingId}/announcements/${createdPublishedAnnouncementId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${unassignedLecturerToken}`,
        },
        body: JSON.stringify({
          title: 'Malicious modification',
        }),
      }
    );

    assert.strictEqual(res.status, 403);
  });

  // =========================================================================
  // SECTION 3: STUDENT ANNOUNCEMENT ACCESS & ENROLLMENT BOUNDARIES
  // =========================================================================

  it('7. Enrolled student should view only PUBLISHED announcements for their offering', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/announcements`, {
      headers: {
        Authorization: `Bearer ${enrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.announcements));
    // Both announcements are now PUBLISHED
    assert.strictEqual(body.data.announcements.length, 2);
    // Ensure all items are published
    body.data.announcements.forEach((a: any) => {
      assert.ok(a.publishedAt);
      assert.ok(a.title);
      assert.ok(a.author.fullName);
    });
  });

  it('8. Unenrolled student should be rejected with 403 Forbidden when viewing announcements', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/announcements`, {
      headers: {
        Authorization: `Bearer ${unenrolledStudentToken}`,
      },
    });

    assert.strictEqual(res.status, 403);
  });

  // =========================================================================
  // SECTION 4: COURSE DISCUSSIONS ENGINE & MODERATION
  // =========================================================================

  it('9. Enrolled student should create a discussion thread successfully', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${enrolledStudentToken}`,
      },
      body: JSON.stringify({
        title: 'Question regarding Question 4 of Midterm Revision',
        content: 'Could someone clarify the difference between link-state and distance-vector?',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.authorRole, 'STUDENT');
    assert.strictEqual(body.data.replyCount, 0);
    studentDiscussionThreadId = body.data.id;
  });

  it('10. Lecturer should create a discussion thread successfully', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${assignedLecturerToken}`,
      },
      body: JSON.stringify({
        title: 'Weekly Office Hours & Q&A Thread',
        content: 'Post your inquiries for this week here.',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.authorRole, 'LECTURER');
    lecturerDiscussionThreadId = body.data.id;
  });

  it('11. Unenrolled student should be rejected with 403 when creating discussion', async () => {
    const res = await fetch(`${baseUrl}/api/auth/offerings/${testOfferingId}/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${unenrolledStudentToken}`,
      },
      body: JSON.stringify({
        title: 'Spam topic',
        content: 'I am not in this course.',
      }),
    });

    assert.strictEqual(res.status, 403);
  });

  it('12. Student and Lecturer should post replies to a discussion thread', async () => {
    // 1. Student replies to lecturer thread
    const res1 = await fetch(
      `${baseUrl}/api/auth/offerings/${testOfferingId}/discussions/${lecturerDiscussionThreadId}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
        body: JSON.stringify({
          content: 'Thank you doctor, will the office hours be in person or online?',
        }),
      }
    );

    assert.strictEqual(res1.status, 201);
    const reply1: any = await res1.json();
    assert.strictEqual(reply1.status, 'success');
    assert.strictEqual(reply1.data.authorRole, 'STUDENT');

    // 2. Lecturer replies back
    const res2 = await fetch(
      `${baseUrl}/api/lecturer/offerings/${testOfferingId}/discussions/${lecturerDiscussionThreadId}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          content: 'It will be held via Google Meet, link is posted on the syllabus.',
        }),
      }
    );

    assert.strictEqual(res2.status, 201);
    const reply2: any = await res2.json();
    assert.strictEqual(reply2.status, 'success');
    assert.strictEqual(reply2.data.authorRole, 'LECTURER');

    // 3. Inspect thread details
    const threadRes = await fetch(
      `${baseUrl}/api/auth/offerings/${testOfferingId}/discussions/${lecturerDiscussionThreadId}`,
      {
        headers: {
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
      }
    );
    assert.strictEqual(threadRes.status, 200);
    const threadDetails: any = await threadRes.json();
    assert.strictEqual(threadDetails.data.discussion.replyCount, 2);
    assert.strictEqual(threadDetails.data.replies.length, 2);
  });

  it('13. Lecturer should moderate discussion: pin to top and lock replies', async () => {
    const res = await fetch(
      `${baseUrl}/api/lecturer/offerings/${testOfferingId}/discussions/${lecturerDiscussionThreadId}/moderate`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: JSON.stringify({
          isPinned: true,
          isLocked: true,
        }),
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.strictEqual(body.data.isPinned, true);
    assert.strictEqual(body.data.isLocked, true);
  });

  it('14. Student reply should be rejected on locked discussion thread', async () => {
    const res = await fetch(
      `${baseUrl}/api/auth/offerings/${testOfferingId}/discussions/${lecturerDiscussionThreadId}/replies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
        body: JSON.stringify({
          content: 'Attempting to reply to locked thread.',
        }),
      }
    );

    assert.strictEqual(res.status, 400);
    const body: any = await res.json();
    assert.ok(body.message.includes('locked'));
  });

  it('15. Student should delete their own discussion thread', async () => {
    const res = await fetch(
      `${baseUrl}/api/auth/offerings/${testOfferingId}/discussions/${studentDiscussionThreadId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${enrolledStudentToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.data.deleted, true);
  });

  // =========================================================================
  // SECTION 5: ADMIN AUDIENCE TARGETING BY FACULTY & DEPARTMENT CODES
  // =========================================================================

  it('16. Admin should retrieve faculties list for audience targeting', async () => {
    const res = await fetch(`${baseUrl}/api/admin/notifications/targeting/faculties`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.faculties));
    const matchingFac = body.data.faculties.find((f: any) => f.code === testFacultyCode);
    assert.ok(matchingFac, 'Targeting faculties should include newly created faculty');
  });

  it('17. Admin should retrieve departments list filtered by faculty', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/notifications/targeting/departments?facultyCode=${testFacultyCode}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data.departments));
    const matchingDept = body.data.departments.find((d: any) => d.code === testDepartmentCode);
    assert.ok(matchingDept, 'Targeting departments should resolve under matching faculty');
  });

  it('18. Admin should search users by email/username for user targeting', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/notifications/targeting/users/search?q=${encodeURIComponent(enrolledStudentEmail)}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data.users.length >= 1);
    assert.strictEqual(body.data.users[0].email, enrolledStudentEmail);
  });

  it('19. Admin should estimate recipient count using human-readable facultyCode', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/notifications/broadcast/estimate?targetType=faculty&facultyCode=${testFacultyCode}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data.recipientCount >= 1, 'Should resolve at least 1 active user in faculty');
    assert.ok(body.data.summary.includes(testFacultyCode), 'Summary should cite faculty code');
  });

  it('20. Admin should estimate recipient count using human-readable departmentCode', async () => {
    const res = await fetch(
      `${baseUrl}/api/admin/notifications/broadcast/estimate?targetType=department&departmentCode=${testDepartmentCode}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data.recipientCount >= 1, 'Should resolve at least 1 active user in department');
  });

  it('21. Admin should dispatch targeted broadcast notification using facultyCode', async () => {
    const res = await fetch(`${baseUrl}/api/admin/notifications/broadcast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        title: 'Faculty Town Hall',
        body: 'All students under Faculty of Computing are invited to the auditorium.',
        targetType: 'faculty',
        targetFilter: {
          facultyCode: testFacultyCode,
        },
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(body.data.broadcast.recipientCount >= 1);
    assert.strictEqual(body.data.broadcast.status, 'sent');
  });
});

