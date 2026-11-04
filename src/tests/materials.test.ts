import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'http';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { db } from '../db/index.js';
import {
  usersTable,
  facultiesTable,
  departmentsTable,
  coursesTable,
  courseOfferingsTable,
  offeringLecturersTable,
  studentEnrollmentsTable,
  courseMaterialsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07H: Course Materials & Learning Resources Suite', () => {
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

  let enrolledStudentId: string;
  let enrolledStudentToken: string;

  let unenrolledStudentId: string;
  let unenrolledStudentToken: string;

  let uploadedMaterial1Id: string;
  let uploadedMaterial2Id: string;
  let material1DiskPath: string;

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
        name: `Faculty_Mat_${rand}`,
        code: `FMAT_${rand}`,
      } as any)
      .returning()) as any[];
    testFacultyId = faculty.id;

    const [department] = (await db
      .insert(departmentsTable)
      .values({
        name: `Dept_Mat_${rand}`,
        code: `DMAT_${rand}`,
        facultyId: testFacultyId,
      } as any)
      .returning()) as any[];
    testDepartmentId = department.id;

    // 2. Setup Course
    const [course] = (await db
      .insert(coursesTable)
      .values({
        code: `MAT_${rand}`,
        title: `Materials Systems Testing ${rand}`,
        departmentId: testDepartmentId,
        level: 400,
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
        level: 400,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    testOfferingId = offering.id;

    const [otherOffering] = (await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2025/2026',
        semester: 'SECOND',
        level: 400,
        status: 'ACTIVE',
      } as any)
      .returning()) as any[];
    unassignedOfferingId = otherOffering.id;

    // 4. Create Users (Lecturers & Students)
    const [assignedLecturer] = (await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Assigned Materials ${rand}`,
        email: `lecturer_mat_assigned_${rand}@test.brainbuzz.edu`,
        password: 'Password123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    assignedLecturerId = assignedLecturer.id;

    const [unassignedLecturer] = (await db
      .insert(usersTable)
      .values({
        fullName: `Dr. Unassigned Materials ${rand}`,
        email: `lecturer_mat_unassigned_${rand}@test.brainbuzz.edu`,
        password: 'Password123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      } as any)
      .returning()) as any[];
    unassignedLecturerId = unassignedLecturer.id;

    const [enrolledStudent] = (await db
      .insert(usersTable)
      .values({
        fullName: `Enrolled Student ${rand}`,
        email: `student_mat_enrolled_${rand}@test.brainbuzz.edu`,
        username: `MAT_ENR_${rand}`,
        password: 'Password123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: testDepartmentId,
        level: 400,
      } as any)
      .returning()) as any[];
    enrolledStudentId = enrolledStudent.id;

    const [unenrolledStudent] = (await db
      .insert(usersTable)
      .values({
        fullName: `Unenrolled Student ${rand}`,
        email: `student_mat_unenrolled_${rand}@test.brainbuzz.edu`,
        username: `MAT_UNENR_${rand}`,
        password: 'Password123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        departmentId: testDepartmentId,
        level: 400,
      } as any)
      .returning()) as any[];
    unenrolledStudentId = unenrolledStudent.id;

    // 5. Generate Auth Tokens
    const assignedTokens = await authService.generateAuthTokens({
      id: assignedLecturer.id,
      email: assignedLecturer.email,
      role: assignedLecturer.role,
    });
    assignedLecturerToken = assignedTokens.accessToken;

    const unassignedTokens = await authService.generateAuthTokens({
      id: unassignedLecturer.id,
      email: unassignedLecturer.email,
      role: unassignedLecturer.role,
    });
    unassignedLecturerToken = unassignedTokens.accessToken;

    const enrolledTokens = await authService.generateAuthTokens({
      id: enrolledStudent.id,
      email: enrolledStudent.email,
      role: enrolledStudent.role,
    });
    enrolledStudentToken = enrolledTokens.accessToken;

    const unenrolledTokens = await authService.generateAuthTokens({
      id: unenrolledStudent.id,
      email: unenrolledStudent.email,
      role: unenrolledStudent.role,
    });
    unenrolledStudentToken = unenrolledTokens.accessToken;

    // 6. Assign Assigned Lecturer
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: assignedLecturerId,
      role: 'COORDINATOR',
      status: 'ACTIVE',
    } as any);

    // 7. Enroll Enrolled Student
    await db.insert(studentEnrollmentsTable).values({
      offeringId: testOfferingId,
      studentId: enrolledStudentId,
      status: 'ENROLLED',
    } as any);
  });

  after(async () => {
    // Teardown test server and database records
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }

    try {
      if (testOfferingId) {
        await db.delete(courseMaterialsTable).where(eq(courseMaterialsTable.offeringId, testOfferingId));
        await db.delete(studentEnrollmentsTable).where(eq(studentEnrollmentsTable.offeringId, testOfferingId));
        await db.delete(offeringLecturersTable).where(eq(offeringLecturersTable.offeringId, testOfferingId));
        await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, testOfferingId));
      }
      if (unassignedOfferingId) {
        await db.delete(courseOfferingsTable).where(eq(courseOfferingsTable.id, unassignedOfferingId));
      }
      if (testCourseId) {
        await db.delete(coursesTable).where(eq(coursesTable.id, testCourseId));
      }
      if (testDepartmentId) {
        await db.delete(departmentsTable).where(eq(departmentsTable.id, testDepartmentId));
      }
      if (testFacultyId) {
        await db.delete(facultiesTable).where(eq(facultiesTable.id, testFacultyId));
      }
      if (assignedLecturerId) {
        await db.delete(usersTable).where(eq(usersTable.id, assignedLecturerId));
      }
      if (unassignedLecturerId) {
        await db.delete(usersTable).where(eq(usersTable.id, unassignedLecturerId));
      }
      if (enrolledStudentId) {
        await db.delete(usersTable).where(eq(usersTable.id, enrolledStudentId));
      }
      if (unenrolledStudentId) {
        await db.delete(usersTable).where(eq(usersTable.id, unenrolledStudentId));
      }
    } catch (e) {
      console.warn('Teardown cleanup notice:', e);
    }
  });

  // ==========================================
  // SUITE 1: Material Upload & Validation
  // ==========================================
  describe('Suite 1: Material Upload & Validation', () => {
    it('should upload a PDF learning material successfully as PUBLISHED', async () => {
      const form = new FormData();
      form.append('title', 'Lecture 1: Introduction to Distributed Systems');
      form.append('description', 'Fundamental concepts, CAP theorem, and consistency models.');
      form.append('category', 'LECTURE_NOTE');
      form.append('status', 'PUBLISHED');
      const blob = new Blob(['%PDF-1.4 simulated pdf document content for automated testing'], {
        type: 'application/pdf',
      });
      form.append('file', blob, 'lecture_1_intro.pdf');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 201);
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.id);
      assert.strictEqual(json.data.title, 'Lecture 1: Introduction to Distributed Systems');
      assert.strictEqual(json.data.category, 'LECTURE_NOTE');
      assert.strictEqual(json.data.status, 'PUBLISHED');
      assert.strictEqual(json.data.originalFileName, 'lecture_1_intro.pdf');
      assert.strictEqual(json.data.mimeType, 'application/pdf');
      assert.ok(json.data.fileSizeBytes > 0);
      assert.strictEqual(json.data.downloadCount, 0);

      uploadedMaterial1Id = json.data.id;

      // Verify file exists on disk
      material1DiskPath = path.resolve(process.cwd(), 'uploads', 'materials', json.data.storageKey);
      assert.strictEqual(fs.existsSync(material1DiskPath), true);
    });

    it('should upload a presentation slide successfully as DRAFT', async () => {
      const form = new FormData();
      form.append('title', 'Week 2 Slides: Consensus Protocols');
      form.append('category', 'SLIDE');
      form.append('status', 'DRAFT');
      const blob = new Blob(['simulated pptx slide binary content'], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      });
      form.append('file', blob, 'week_2_slides.pptx');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 201);
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.title, 'Week 2 Slides: Consensus Protocols');
      assert.strictEqual(json.data.category, 'SLIDE');
      assert.strictEqual(json.data.status, 'DRAFT');

      uploadedMaterial2Id = json.data.id;
    });

    it('should reject material upload with invalid category', async () => {
      const form = new FormData();
      form.append('title', 'Invalid Category Test');
      form.append('category', 'NON_EXISTENT_CATEGORY');
      const blob = new Blob(['test content'], { type: 'application/pdf' });
      form.append('file', blob, 'test.pdf');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(json.status, 'fail');
    });
  });

  // ==========================================
  // SUITE 2: File Format & Security Validation
  // ==========================================
  describe('Suite 2: File Format & Security Validation', () => {
    it('should reject executable file extensions (.exe)', async () => {
      const form = new FormData();
      form.append('title', 'Dangerous File Test');
      form.append('category', 'OTHER');
      const blob = new Blob(['MZ simulated executable content'], { type: 'application/x-msdownload' });
      form.append('file', blob, 'malware.exe');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(json.status, 'fail');
      assert.ok(json.message.includes('Invalid file format'));
    });

    it('should reject upload when no file is attached', async () => {
      const form = new FormData();
      form.append('title', 'Missing File Test');
      form.append('category', 'SYLLABUS');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 400);
      assert.strictEqual(json.status, 'fail');
      assert.ok(json.message.includes('No learning material file uploaded'));
    });
  });

  // ==========================================
  // SUITE 3: IDOR Defense & Access Control
  // ==========================================
  describe('Suite 3: IDOR Defense & Access Control', () => {
    it('should reject upload by unassigned lecturer with 403 Forbidden', async () => {
      const form = new FormData();
      form.append('title', 'IDOR Upload Attempt');
      form.append('category', 'LECTURE_NOTE');
      const blob = new Blob(['test content'], { type: 'application/pdf' });
      form.append('file', blob, 'unassigned_lecture.pdf');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${unassignedLecturerToken}`,
        },
        body: form,
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
    });

    it('should reject listing by unassigned lecturer with 403 Forbidden', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        headers: {
          Authorization: `Bearer ${unassignedLecturerToken}`,
        },
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
    });

    it('should reject unauthenticated requests with 401 Unauthorized', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`);
      assert.strictEqual(res.status, 401);
    });
  });

  // ==========================================
  // SUITE 4: Material Listing & Filtering
  // ==========================================
  describe('Suite 4: Material Listing & Filtering', () => {
    it('should list all materials for offering as assigned lecturer (both DRAFT and PUBLISHED)', async () => {
      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
      });

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.materials.length, 2);
      assert.strictEqual(json.data.stats.total, 2);
      assert.strictEqual(json.data.stats.published, 1);
      assert.strictEqual(json.data.stats.draft, 1);
    });

    it('should filter materials by category', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials?category=SLIDE`,
        {
          headers: {
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.data.materials.length, 1);
      assert.strictEqual(json.data.materials[0].category, 'SLIDE');
    });

    it('should filter materials by status', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials?status=DRAFT`,
        {
          headers: {
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.data.materials.length, 1);
      assert.strictEqual(json.data.materials[0].status, 'DRAFT');
    });
  });

  // ==========================================
  // SUITE 5: Material Detail & Updates
  // ==========================================
  describe('Suite 5: Material Detail & Updates', () => {
    it('should fetch material details for assigned lecturer', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}`,
        {
          headers: {
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(json.data.id, uploadedMaterial1Id);
      assert.strictEqual(json.data.title, 'Lecture 1: Introduction to Distributed Systems');
    });

    it('should update material title and transition status from DRAFT to PUBLISHED', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial2Id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
          body: JSON.stringify({
            title: 'Week 2 Slides: Consensus Protocols (Published Edition)',
            status: 'PUBLISHED',
          }),
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.status, 'success');
      assert.strictEqual(
        json.data.title,
        'Week 2 Slides: Consensus Protocols (Published Edition)'
      );
      assert.strictEqual(json.data.status, 'PUBLISHED');
    });

    it('should reject update by unassigned lecturer with 403 Forbidden', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial2Id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${unassignedLecturerToken}`,
          },
          body: JSON.stringify({
            title: 'Hacked Title',
          }),
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
    });
  });

  // ==========================================
  // SUITE 6: Student Access & Publication Boundary
  // ==========================================
  describe('Suite 6: Student Access & Publication Boundary', () => {
    let draftMaterialId: string;

    before(async () => {
      // Create a DRAFT material to verify publication boundary
      const form = new FormData();
      form.append('title', 'Exam Preview (Confidential)');
      form.append('category', 'READING');
      form.append('status', 'DRAFT');
      const blob = new Blob(['confidential draft exam material'], { type: 'application/pdf' });
      form.append('file', blob, 'confidential_draft.pdf');

      const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${assignedLecturerToken}`,
        },
        body: form,
      });
      const json: any = await res.json();
      draftMaterialId = json.data.id;
    });

    it('should allow enrolled student to list only PUBLISHED materials', async () => {
      const res = await fetch(
        `${baseUrl}/api/auth/offerings/${testOfferingId}/materials`,
        {
          headers: {
            Authorization: `Bearer ${enrolledStudentToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.status, 'success');
      assert.ok(json.data.materials.length >= 2);

      // Verify NO draft or archived material is leaked to student
      const hasDraft = json.data.materials.some((m: any) => m.status !== 'PUBLISHED');
      assert.strictEqual(hasDraft, false, 'Student response must strictly contain only PUBLISHED materials');

      // Verify confidential draft material is NOT in student list
      const leakedDraft = json.data.materials.find((m: any) => m.id === draftMaterialId);
      assert.strictEqual(leakedDraft, undefined, 'Confidential draft material must be concealed from students');
    });

    it('should reject unenrolled student from listing materials with 403 Forbidden', async () => {
      const res = await fetch(
        `${baseUrl}/api/auth/offerings/${testOfferingId}/materials`,
        {
          headers: {
            Authorization: `Bearer ${unenrolledStudentToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
      assert.ok(json.message.includes('not actively enrolled'));
    });
  });

  // ==========================================
  // SUITE 7: Authenticated File Download & Tracking
  // ==========================================
  describe('Suite 7: Authenticated File Download & Tracking', () => {
    it('should stream material file for assigned lecturer with correct filename headers', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}/download`,
        {
          headers: {
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
        }
      );

      assert.strictEqual(res.status, 200);
      const disposition = res.headers.get('content-disposition');
      assert.ok(disposition?.includes('lecture_1_intro.pdf'));
      const text = await res.text();
      assert.ok(text.includes('simulated pdf document content'));
    });

    it('should stream material file for enrolled student and increment downloadCount', async () => {
      // Check initial download count
      const [beforeMat] = await db
        .select()
        .from(courseMaterialsTable)
        .where(eq(courseMaterialsTable.id, uploadedMaterial1Id as any));
      assert.ok(beforeMat);
      const initialCount = beforeMat.downloadCount;

      const res = await fetch(
        `${baseUrl}/api/auth/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}/download`,
        {
          headers: {
            Authorization: `Bearer ${enrolledStudentToken}`,
          },
        }
      );

      assert.strictEqual(res.status, 200);
      const text = await res.text();
      assert.ok(text.includes('simulated pdf document content'));

      // Verify download count incremented in database
      const [afterMat] = await db
        .select()
        .from(courseMaterialsTable)
        .where(eq(courseMaterialsTable.id, uploadedMaterial1Id as any));
      assert.ok(afterMat);
      assert.strictEqual(afterMat.downloadCount, initialCount + 1);
    });

    it('should reject unenrolled student from downloading material with 403 Forbidden', async () => {
      const res = await fetch(
        `${baseUrl}/api/auth/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}/download`,
        {
          headers: {
            Authorization: `Bearer ${unenrolledStudentToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
    });
  });

  // ==========================================
  // SUITE 8: Material Deletion & Cleanup
  // ==========================================
  describe('Suite 8: Material Deletion & Cleanup', () => {
    it('should reject deletion by unassigned lecturer with 403 Forbidden', async () => {
      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${unassignedLecturerToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 403);
      assert.strictEqual(json.status, 'fail');
    });

    it('should delete material and remove file from disk as assigned lecturer', async () => {
      assert.strictEqual(fs.existsSync(material1DiskPath), true, 'File must exist on disk before deletion');

      const res = await fetch(
        `${baseUrl}/api/lecturer/offerings/${testOfferingId}/materials/${uploadedMaterial1Id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${assignedLecturerToken}`,
          },
        }
      );

      const json: any = await res.json();
      assert.strictEqual(res.status, 200);
      assert.strictEqual(json.status, 'success');

      // Verify record is deleted from database
      const [record] = await db
        .select()
        .from(courseMaterialsTable)
        .where(eq(courseMaterialsTable.id, uploadedMaterial1Id as any));
      assert.strictEqual(record, undefined, 'Material record should be removed from database');

      // Verify file is removed from disk
      assert.strictEqual(fs.existsSync(material1DiskPath), false, 'File should be removed from disk');
    });
  });
});
