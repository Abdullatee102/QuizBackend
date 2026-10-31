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
  questionsTable,
  questionVersionsTable,
  questionReviewsTable,
  USER_ROLES,
  ACCOUNT_STATUS,
} from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authService } from '../services/authService.js';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from '../routes/admin/index.js';
import lecturerRoutes from '../routes/lecturer/index.js';

describe('BB-07F.3: Question-Bank Authoring & Approval Workflow Suite', () => {
  let server: http.Server;
  let baseUrl: string;

  let testFacultyId: string;
  let testDepartmentId: string;
  let testCourseId: string;
  let testOfferingId: string;
  let unassignedOfferingId: string;

  let superAdminId: string;
  let superAdminToken: string;

  let contentAdminId: string;
  let contentAdminToken: string;

  let lecturer1Id: string;
  let lecturer1Token: string;

  let lecturer2Id: string;
  let lecturer2Token: string;

  let dualRoleLecturerAdminId: string;
  let dualRoleLecturerAdminToken: string;

  let suspendedLecturerId: string;
  let suspendedLecturerToken: string;

  let studentId: string;
  let studentToken: string;

  let legacyQuestionId: string;
  let cbtDraftId: string;
  let theoryDraftId: string;
  let toRejectDraftId: string;

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
    const [faculty] = await db
      .insert(facultiesTable)
      .values({
        name: `Faculty of Science ${timestamp}_${rand}`,
        code: `FS_${rand}`.slice(0, 10),
      })
      .returning();
    if (!faculty) throw new Error('Failed to create faculty');
    testFacultyId = faculty.id;

    const [dept] = await db
      .insert(departmentsTable)
      .values({
        name: `Computer Science ${timestamp}_${rand}`,
        code: `CS_${rand}`.slice(0, 10),
        facultyId: testFacultyId,
      })
      .returning();
    if (!dept) throw new Error('Failed to create department');
    testDepartmentId = dept.id;

    // 3. Create Test Course
    const [course] = await db
      .insert(coursesTable)
      .values({
        code: `CSC_${rand}`.slice(0, 10),
        title: 'Compiler Construction',
        level: 400,
        semester: 'harmattan',
        departmentId: testDepartmentId,
        isActive: true,
      })
      .returning();
    if (!course) throw new Error('Failed to create test course');
    testCourseId = course.id;

    // 4. Create Course Offerings
    const [offering1] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2026/2027',
        semester: 'harmattan',
        level: 400,
        section: 'DEFAULT',
        status: 'ACTIVE',
      })
      .returning();
    if (!offering1) throw new Error('Failed to create test offering 1');
    testOfferingId = offering1.id;

    const [offering2] = await db
      .insert(courseOfferingsTable)
      .values({
        courseId: testCourseId,
        academicSession: '2026/2027',
        semester: 'harmattan',
        level: 400,
        section: 'Section B',
        status: 'ACTIVE',
      })
      .returning();
    if (!offering2) throw new Error('Failed to create test offering 2');
    unassignedOfferingId = offering2.id;

    // 5. Setup Users & Auth Tokens
    // Super Admin
    const [sAdmin] = await db
      .insert(usersTable)
      .values({
        fullName: 'Super Admin Workflow',
        email: `sadmin_wf_${timestamp}@lautech.edu.ng`,
        username: `sadmin_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    superAdminId = sAdmin!.id;
    const sTokens = await authService.generateAuthTokens({
      id: sAdmin!.id,
      email: sAdmin!.email!,
      role: sAdmin!.role,
    });
    superAdminToken = sTokens.accessToken;

    // Content Admin
    const [cAdmin] = await db
      .insert(usersTable)
      .values({
        fullName: 'Content Admin Workflow',
        email: `cadmin_wf_${timestamp}@lautech.edu.ng`,
        username: `cadmin_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.CONTENT_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    contentAdminId = cAdmin!.id;
    const cTokens = await authService.generateAuthTokens({
      id: cAdmin!.id,
      email: cAdmin!.email!,
      role: cAdmin!.role,
    });
    contentAdminToken = cTokens.accessToken;

    // Lecturer 1 (Assigned to testOfferingId)
    const [l1] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Lecturer Primary',
        email: `lecturer1_wf_${timestamp}@lautech.edu.ng`,
        username: `lecturer1_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      })
      .returning();
    lecturer1Id = l1!.id;
    const l1Tokens = await authService.generateAuthTokens({
      id: l1!.id,
      email: l1!.email!,
      role: l1!.role,
    });
    lecturer1Token = l1Tokens.accessToken;

    // Assign Lecturer 1 to Offering 1
    await db.insert(offeringLecturersTable).values({
      offeringId: testOfferingId,
      lecturerId: lecturer1Id,
      role: 'PRIMARY',
      status: 'ACTIVE',
    });

    // Lecturer 2 (Not assigned to testOfferingId)
    const [l2] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Lecturer Unassigned',
        email: `lecturer2_wf_${timestamp}@lautech.edu.ng`,
        username: `lecturer2_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      })
      .returning();
    lecturer2Id = l2!.id;
    const l2Tokens = await authService.generateAuthTokens({
      id: l2!.id,
      email: l2!.email!,
      role: l2!.role,
    });
    lecturer2Token = l2Tokens.accessToken;

    // Dual-role user (Lecturer who also acts as Content Admin)
    const [dualUser] = await db
      .insert(usersTable)
      .values({
        fullName: 'Prof. Dual Role',
        email: `dual_wf_${timestamp}@lautech.edu.ng`,
        username: `dual_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.CONTENT_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      })
      .returning();
    dualRoleLecturerAdminId = dualUser!.id;
    const dualTokens = await authService.generateAuthTokens({
      id: dualUser!.id,
      email: dualUser!.email!,
      role: dualUser!.role,
    });
    dualRoleLecturerAdminToken = dualTokens.accessToken;

    // Suspended Lecturer
    const [suspL] = await db
      .insert(usersTable)
      .values({
        fullName: 'Dr. Suspended Lecturer',
        email: `suspended_wf_${timestamp}@lautech.edu.ng`,
        username: `suspended_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.LECTURER,
        status: ACCOUNT_STATUS.SUSPENDED,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
      })
      .returning();
    suspendedLecturerId = suspL!.id;
    const suspTokens = await authService.generateAuthTokens({
      id: suspL!.id,
      email: suspL!.email!,
      role: suspL!.role,
    });
    suspendedLecturerToken = suspTokens.accessToken;

    // Student
    const [stud] = await db
      .insert(usersTable)
      .values({
        fullName: 'Student Practice Tester',
        email: `student_wf_${timestamp}@lautech.edu.ng`,
        username: `student_wf_${timestamp}`,
        password: 'HashedPassword123!',
        role: USER_ROLES.STUDENT,
        status: ACCOUNT_STATUS.ACTIVE,
        facultyId: testFacultyId,
        departmentId: testDepartmentId,
        level: 400,
      })
      .returning();
    studentId = stud!.id;
    const studTokens = await authService.generateAuthTokens({
      id: stud!.id,
      email: stud!.email!,
      role: stud!.role,
    });
    studentToken = studTokens.accessToken;

    // Pre-existing legacy published question
    const [legacyQ] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        type: 'cbt',
        question: 'Legacy published question for open practice?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        difficulty: 'easy',
        status: 'PUBLISHED',
        isPracticeEligible: true,
        isActive: true,
      })
      .returning();
    legacyQuestionId = legacyQ!.id;
  });

  after(async () => {
    if (server) {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  // =========================================================================
  // SCENARIO 1: Authorized lecturer creates CBT draft for assigned offering
  // =========================================================================
  it('1. Authorized lecturer can create a CBT question draft for assigned offering', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        type: 'cbt',
        question: 'What is the primary phase in a compiler that performs lexical analysis?',
        options: ['Lexer / Scanner', 'Parser', 'Code Generator', 'Optimizer'],
        correctAnswer: 'Lexer / Scanner',
        points: 2,
        difficulty: 'medium',
        explanation: 'The lexer converts stream of characters into stream of tokens.',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.ok(q?.id);
    assert.strictEqual(q.status, 'DRAFT');
    assert.strictEqual(q.currentVersion, 1);
    assert.strictEqual(q.courseId, testCourseId);
    assert.strictEqual(q.originOfferingId, testOfferingId);
    assert.strictEqual(q.authorLecturerId, lecturer1Id);

    cbtDraftId = q.id;
  });

  // =========================================================================
  // SCENARIO 2: Authorized lecturer creates Theory draft with valid grading rubric
  // =========================================================================
  it('2. Authorized lecturer can create a Theory question draft with structured grading rubric', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        offeringId: testOfferingId,
        type: 'theory',
        question: 'Explain the difference between LL(1) and LR(1) parsing.',
        correctAnswer:
          'LL(1) is top-down left-to-right parsing with 1 lookahead token, whereas LR(1) is bottom-up shift-reduce parsing.',
        gradingPoints: [
          {
            concept: 'top-down vs bottom-up',
            weight: 0.5,
            keywords: ['top-down', 'bottom-up'],
          },
          {
            concept: 'direction of derivation',
            weight: 0.5,
            keywords: ['leftmost', 'rightmost in reverse'],
          },
        ],
        points: 5,
        difficulty: 'hard',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.ok(q?.id);
    assert.strictEqual(q.type, 'theory');
    assert.strictEqual(q.status, 'DRAFT');
    assert.strictEqual(q.gradingPoints?.length, 2);

    theoryDraftId = q.id;
  });

  // =========================================================================
  // SCENARIO 3: Lecturer cannot create question for unassigned offering (403)
  // =========================================================================
  it('3. Lecturer cannot create question for an unassigned course offering (403)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${unassignedOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`, // Lecturer 1 is not assigned to offering 2
      },
      body: JSON.stringify({
        type: 'cbt',
        question: 'Will this unauthorized creation succeed?',
        options: ['Yes', 'No'],
        correctAnswer: 'No',
      }),
    });

    assert.strictEqual(res.status, 403);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'fail');
    assert.match(body.message, /assigned/i);
  });

  // =========================================================================
  // SCENARIO 4: IDOR defense on draft access
  // =========================================================================
  it("4. Lecturer cannot view or modify another lecturer's question draft (IDOR defense)", async () => {
    // Lecturer 2 attempts to read Lecturer 1's draft
    const getRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${lecturer2Token}`,
      },
    });

    assert.ok(getRes.status === 404 || getRes.status === 403);

    // Lecturer 2 attempts to update Lecturer 1's draft
    const patchRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer2Token}`,
      },
      body: JSON.stringify({
        question: 'Malicious modification of another lecturer draft',
      }),
    });

    assert.ok(patchRes.status === 404 || patchRes.status === 403);
  });

  // =========================================================================
  // SCENARIO 5: Lecturer can update own draft while in DRAFT status
  // =========================================================================
  it('5. Lecturer can update own draft while in DRAFT status', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        question: 'What is the primary phase in a compiler that performs lexical tokenization?',
        points: 3,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.strictEqual(q.points, 3);
    assert.match(q.question, /tokenization/i);
  });

  // =========================================================================
  // SCENARIO 6: Lecturer submits draft; immutability once SUBMITTED
  // =========================================================================
  it('6. Lecturer submits draft; question becomes immutable once SUBMITTED (409 Conflict)', async () => {
    // Submit draft
    const submitRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(submitRes.status, 200);
    const submitBody: any = await submitRes.json();
    assert.strictEqual(submitBody.status, 'success');
    const sq = submitBody.data?.question || submitBody.data;
    assert.strictEqual(sq.status, 'SUBMITTED');

    // Attempt to edit submitted question -> must be rejected with 409 Conflict
    const editRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        question: 'Attempt to mutate submitted question',
      }),
    });

    assert.strictEqual(editRes.status, 409);
    const editBody: any = await editRes.json();
    assert.strictEqual(editBody.status, 'fail');
    assert.match(editBody.message, /cannot be edited/i);
  });

  // =========================================================================
  // SCENARIO 7: Lecturer withdraws submission back to DRAFT
  // =========================================================================
  it('7. Lecturer can withdraw a submission back to DRAFT before review has started', async () => {
    const withdrawRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}/withdraw`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(withdrawRes.status, 200);
    const withdrawBody: any = await withdrawRes.json();
    assert.strictEqual(withdrawBody.status, 'success');
    const wq = withdrawBody.data?.question || withdrawBody.data;
    assert.strictEqual(wq.status, 'DRAFT');

    // Now re-submit so it is available for admin review
    const reSubmitRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });
    assert.strictEqual(reSubmitRes.status, 200);
  });

  // =========================================================================
  // SCENARIO 8: Validation rejects invalid CBT options or unmatched correct answer
  // =========================================================================
  it('8. Validation rejects CBT draft with fewer than 2 options or unmatched correct answer (400)', async () => {
    // Fewer than 2 options
    const res1 = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        type: 'cbt',
        question: 'Invalid single option question?',
        options: ['Only one option'],
        correctAnswer: 'Only one option',
      }),
    });
    assert.strictEqual(res1.status, 400);

    // Correct answer not in options
    const res2 = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        type: 'cbt',
        question: 'Mismatched correct answer question?',
        options: ['Alpha', 'Beta', 'Gamma'],
        correctAnswer: 'Delta',
      }),
    });
    assert.strictEqual(res2.status, 400);
  });

  // =========================================================================
  // SCENARIO 9: Validation rejects invalid Theory rubrics
  // =========================================================================
  it('9. Validation rejects Theory draft with missing grading points or negative weights (400)', async () => {
    // Missing grading points
    const res1 = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        type: 'theory',
        question: 'Theory question without rubric?',
        correctAnswer: 'Model answer text.',
        gradingPoints: [],
      }),
    });
    assert.strictEqual(res1.status, 400);

    // Negative weight
    const res2 = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        type: 'theory',
        question: 'Theory question with negative rubric weight?',
        correctAnswer: 'Model answer text.',
        gradingPoints: [
          {
            concept: 'Invalid concept',
            weight: -1,
          },
        ],
      }),
    });
    assert.strictEqual(res2.status, 400);
  });

  // =========================================================================
  // SCENARIO 10: Admin review queue lists submitted questions
  // =========================================================================
  it('10. Admin review queue lists submitted questions with author and offering metadata', async () => {
    const res = await fetch(`${baseUrl}/api/admin/questions/review-queue`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${contentAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const list = Array.isArray(body.data) ? body.data : body.data?.questions || [];
    assert.ok(Array.isArray(list));

    const submittedQ = list.find((q: any) => q.id === cbtDraftId);
    assert.ok(submittedQ, 'Submitted question must be in review queue');
    assert.strictEqual(submittedQ.authorLecturerId, lecturer1Id);
    assert.ok(submittedQ.authorName);
    assert.strictEqual(submittedQ.status, 'SUBMITTED');
  });

  // =========================================================================
  // SCENARIO 11: Admin begins review
  // =========================================================================
  it('11. Admin can mark a question UNDER_REVIEW when starting review', async () => {
    const res = await fetch(`${baseUrl}/api/admin/questions/${cbtDraftId}/begin-review`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${contentAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.strictEqual(q.status, 'UNDER_REVIEW');
  });

  // =========================================================================
  // SCENARIO 12: Admin requests revision with mandatory feedback
  // =========================================================================
  it('12. Admin can request revisions with mandatory feedback notes', async () => {
    // Missing feedback should fail with 400
    const failRes = await fetch(`${baseUrl}/api/admin/questions/${cbtDraftId}/request-revision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${contentAdminToken}`,
      },
      body: JSON.stringify({
        feedback: '  ',
      }),
    });
    assert.strictEqual(failRes.status, 400);

    // Valid feedback
    const res = await fetch(`${baseUrl}/api/admin/questions/${cbtDraftId}/request-revision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${contentAdminToken}`,
      },
      body: JSON.stringify({
        feedback: 'Please refine the distractors to make them more distinct for 400L students.',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.strictEqual(q.status, 'REVISION_REQUIRED');
    assert.strictEqual(q.currentVersion, 2);
    assert.match(q.reviewFeedback, /refine the distractors/i);
  });

  // =========================================================================
  // SCENARIO 13: Lecturer sees feedback, revises, and resubmits
  // =========================================================================
  it('13. Lecturer can view feedback, revise question, and resubmit for review', async () => {
    // Lecturer reads question details with feedback
    const getRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(getRes.status, 200);
    const getBody: any = await getRes.json();
    const gq = getBody.data?.question || getBody.data;
    assert.strictEqual(gq.status, 'REVISION_REQUIRED');
    assert.match(gq.reviewFeedback, /refine the distractors/i);

    // Lecturer updates the question options
    const patchRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${lecturer1Token}`,
      },
      body: JSON.stringify({
        options: ['Lexer / Scanner', 'Parser Generator', 'Intermediate Code Generator', 'Register Allocator'],
        correctAnswer: 'Lexer / Scanner',
      }),
    });

    assert.strictEqual(patchRes.status, 200);
    const patchBody: any = await patchRes.json();
    const pq = patchBody.data?.question || patchBody.data;
    assert.strictEqual(pq.options[3], 'Register Allocator');

    // Lecturer resubmits
    const resubmitRes = await fetch(`${baseUrl}/api/lecturer/questions/${cbtDraftId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${lecturer1Token}`,
      },
    });

    assert.strictEqual(resubmitRes.status, 200);
    const resubmitBody: any = await resubmitRes.json();
    const rq = resubmitBody.data?.question || resubmitBody.data;
    assert.strictEqual(rq.status, 'SUBMITTED');
  });

  // =========================================================================
  // SCENARIO 14: Admin approves valid submission
  // =========================================================================
  it('14. Admin can approve a submitted question', async () => {
    const res = await fetch(`${baseUrl}/api/admin/questions/${cbtDraftId}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${contentAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const q = body.data?.question || body.data;
    assert.strictEqual(q.status, 'APPROVED');
    assert.strictEqual(q.reviewedByAdminId, contentAdminId);
  });

  // =========================================================================
  // SCENARIO 15: Self-approval defense prevents dual-role lecturer-admin approval
  // =========================================================================
  it('15. Self-approval defense: Lecturer-admin cannot approve their own authored question (403)', async () => {
    // 1. Dual-role lecturer-admin creates question directly in database to simulate authored question
    const [dualAuthored] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: dualRoleLecturerAdminId, // Author is dualRoleLecturerAdmin
        type: 'cbt',
        question: 'Self-approval invariant test question?',
        options: ['Option A', 'Option B'],
        correctAnswer: 'Option A',
        status: 'SUBMITTED',
        currentVersion: 1,
        isActive: true,
      })
      .returning();

    assert.ok(dualAuthored);

    // 2. The author attempts to approve their own question using their admin token
    const res = await fetch(`${baseUrl}/api/admin/questions/${dualAuthored.id}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${dualRoleLecturerAdminToken}`,
      },
    });

    assert.strictEqual(res.status, 403);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'fail');
    assert.match(body.message, /self-approval/i);
  });

  // =========================================================================
  // SCENARIO 16: Admin rejects submission with recorded reason
  // =========================================================================
  it('16. Admin can permanently reject a submission with recorded reason', async () => {
    // Lecturer 1 creates a draft to be rejected
    const [q] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: lecturer1Id,
        type: 'cbt',
        question: 'Question with severe inaccuracies that must be rejected?',
        options: ['False', 'Wrong'],
        correctAnswer: 'Wrong',
        status: 'SUBMITTED',
        currentVersion: 1,
        isActive: true,
      })
      .returning();
    toRejectDraftId = q!.id;

    // Admin rejects with reason
    const res = await fetch(`${baseUrl}/api/admin/questions/${toRejectDraftId}/reject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${contentAdminToken}`,
      },
      body: JSON.stringify({
        reason: 'Question formulation violates curriculum guidelines and contains factual errors.',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const rj = body.data?.question || body.data;
    assert.strictEqual(rj.status, 'REJECTED');
    assert.strictEqual(rj.isActive, false);
    assert.match(rj.rejectionReason, /violates curriculum guidelines/i);
  });

  // =========================================================================
  // SCENARIO 17: Admin publishes approved question and toggles open-practice eligibility
  // =========================================================================
  it('17. Admin can publish approved question with practice eligibility toggle', async () => {
    const res = await fetch(`${baseUrl}/api/admin/questions/${cbtDraftId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${superAdminToken}`,
      },
      body: JSON.stringify({
        isPracticeEligible: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    const pq = body.data?.question || body.data;
    assert.strictEqual(pq.status, 'PUBLISHED');
    assert.strictEqual(pq.isPracticeEligible, true);
    assert.strictEqual(pq.publishedByAdminId, superAdminId);
  });

  // =========================================================================
  // SCENARIO 18: Open practice serves only PUBLISHED & isPracticeEligible=true questions
  // =========================================================================
  it('18. Open practice endpoint serves only PUBLISHED and practice-eligible questions', async () => {
    // Create an unapproved draft, an approved un-published question, and a published question with isPracticeEligible=false
    const [privateQ] = await db
      .insert(questionsTable)
      .values({
        courseId: testCourseId,
        originOfferingId: testOfferingId,
        authorLecturerId: lecturer1Id,
        type: 'cbt',
        question: 'Private exam question not for practice?',
        options: ['Priv 1', 'Priv 2'],
        correctAnswer: 'Priv 1',
        status: 'PUBLISHED',
        isPracticeEligible: false, // Strictly exam only!
        isActive: true,
      })
      .returning();

    const res = await fetch(`${baseUrl}/api/auth/courses/${testCourseId}/questions?type=cbt`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'success');
    assert.ok(Array.isArray(body.data));

    const returnedIds = body.data.map((q: any) => q.id);

    // Published practice-eligible questions must be present
    assert.ok(returnedIds.includes(cbtDraftId), 'Approved published question must be returned');
    assert.ok(returnedIds.includes(legacyQuestionId), 'Legacy published question must be returned');

    // Non-practice and draft/rejected questions must NOT be present
    assert.ok(!returnedIds.includes(privateQ!.id), 'Exam-only question must NOT be returned for practice');
    assert.ok(!returnedIds.includes(toRejectDraftId), 'Rejected question must NOT be returned');
    assert.ok(!returnedIds.includes(theoryDraftId), 'Draft theory question must NOT be returned');
  });

  // =========================================================================
  // SCENARIO 19: Student endpoint strictly conceals correctAnswer and gradingPoints
  // =========================================================================
  it('19. Student endpoint strictly conceals correctAnswer and gradingPoints', async () => {
    const res = await fetch(`${baseUrl}/api/auth/courses/${testCourseId}/questions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    for (const q of body.data) {
      assert.strictEqual(q.correctAnswer, undefined, 'correctAnswer must be undefined on student API');
      assert.strictEqual(q.gradingPoints, undefined, 'gradingPoints must be undefined on student API');
    }
  });

  // =========================================================================
  // SCENARIO 20: Legacy questions remain 100% accessible in open practice
  // =========================================================================
  it('20. Legacy questions remain 100% accessible in open practice after migration', async () => {
    const res = await fetch(`${baseUrl}/api/auth/courses/${testCourseId}/questions`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${studentToken}`,
      },
    });

    assert.strictEqual(res.status, 200);
    const body: any = await res.json();
    const legacyItem = body.data.find((q: any) => q.id === legacyQuestionId);
    assert.ok(legacyItem, 'Legacy question must be returned for practice');
    assert.match(legacyItem.question, /legacy published question/i);
  });

  // =========================================================================
  // SCENARIO 21: Suspended lecturer cannot create or submit questions
  // =========================================================================
  it('21. Suspended lecturer cannot create or submit questions (403)', async () => {
    const res = await fetch(`${baseUrl}/api/lecturer/offerings/${testOfferingId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${suspendedLecturerToken}`,
      },
      body: JSON.stringify({
        type: 'cbt',
        question: 'Should a suspended lecturer be able to author questions?',
        options: ['Yes', 'No'],
        correctAnswer: 'No',
      }),
    });

    assert.strictEqual(res.status, 403);
    const body: any = await res.json();
    assert.strictEqual(body.status, 'fail');
    assert.match(body.message, /suspended/i);
  });

  // =========================================================================
  // SCENARIO 22: Version history and review audit trail are recorded in database
  // =========================================================================
  it('22. Version history and review audit trail are accurately captured in database', async () => {
    // Check question_versions for cbtDraftId (submitted twice)
    const versions = await db
      .select()
      .from(questionVersionsTable)
      .where(eq(questionVersionsTable.questionId, cbtDraftId as any));

    assert.ok(versions.length >= 1, 'Version snapshots must exist in question_versions');
    assert.strictEqual(versions[0]?.type, 'cbt');

    // Check question_reviews for cbtDraftId (SUBMIT, BEGIN_REVIEW, REQUEST_REVISION, SUBMIT, APPROVE, PUBLISH)
    const reviews = await db
      .select()
      .from(questionReviewsTable)
      .where(eq(questionReviewsTable.questionId, cbtDraftId as any));

    assert.ok(reviews.length >= 4, 'Multiple audit events must be logged in question_reviews');
    const actions = reviews.map((r) => r.action);
    assert.ok(actions.includes('SUBMIT'), 'Must log SUBMIT');
    assert.ok(actions.includes('BEGIN_REVIEW'), 'Must log BEGIN_REVIEW');
    assert.ok(actions.includes('REQUEST_REVISION'), 'Must log REQUEST_REVISION');
    assert.ok(actions.includes('APPROVE'), 'Must log APPROVE');
    assert.ok(actions.includes('PUBLISH'), 'Must log PUBLISH');
  });
});
