import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { db } from '../db/index.js';
import { usersTable, quizHistoryTable, coursesTable, facultiesTable, departmentsTable, questionsTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { getReviewQuestionsHandler } from '../controllers/quiz.controller.js';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import type { Response } from 'express';

// Helper to create mock Express response
function createMockResponse() {
  const res: any = {
    statusCode: 200,
    body: null,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(data: any) {
      this.body = data;
      return this;
    },
  };
  return res as Response & { statusCode: number; body: any };
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  throw new Error('Retries exhausted');
}

describe('BB-02: Answer-Key Exposure Defense (getReviewQuestionsHandler)', () => {
  let studentAId: string;
  let studentBId: string;
  let adminId: string;
  let courseId: string;
  let completedHistoryId: string;

  before(async () => {
    // Look up an existing active course or use first available course
    const c = await withRetry(async () => {
      const [res] = await db.select({ id: coursesTable.id }).from(coursesTable).limit(1);
      return res;
    });
    courseId = c?.id || '00000000-0000-0000-0000-000000000001';

    // Create student A
    const studentA = await withRetry(async () => {
      const [res] = await db
        .insert(usersTable)
        .values({
          fullName: 'Student A Test',
          username: `student_a_${Date.now()}`,
          email: `student_a_${Date.now()}@lautech.edu.ng`,
          password: 'hashed-password-test',
          role: 'STUDENT',
          status: 'ACTIVE',
        })
        .returning();
      return res!;
    });
    studentAId = studentA!.id;

    // Create student B
    const studentB = await withRetry(async () => {
      const [res] = await db
        .insert(usersTable)
        .values({
          fullName: 'Student B Test',
          username: `student_b_${Date.now()}`,
          email: `student_b_${Date.now()}@lautech.edu.ng`,
          password: 'hashed-password-test',
          role: 'STUDENT',
          status: 'ACTIVE',
        })
        .returning();
      return res!;
    });
    studentBId = studentB!.id;

    // Create completed quiz history for student A only
    const history = await withRetry(async () => {
      const [res] = await db
        .insert(quizHistoryTable)
        .values({
          userId: studentAId as any,
          courseId: courseId as any,
          quizType: 'cbt',
          category: 'CSC101',
          score: 80,
          correctAnswers: 8,
          totalQuestions: 10,
        })
        .returning();
      return res!;
    });
    completedHistoryId = history!.id;
  });

  after(async () => {
    // Clean up created records
    if (completedHistoryId) {
      await db.delete(quizHistoryTable).where(eq(quizHistoryTable.id, completedHistoryId));
    }
    if (studentAId) {
      await db.delete(usersTable).where(eq(usersTable.id, studentAId));
    }
    if (studentBId) {
      await db.delete(usersTable).where(eq(usersTable.id, studentBId));
    }
  });

  it('1. Rejects unauthenticated request with 401 Unauthorized', async () => {
    const req = {
      params: { courseId },
      query: {},
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body?.status, 'fail');
    assert.match(res.body?.message, /unauthorized/i);
  });

  it('2. Rejects student request without historyId with 403 Forbidden', async () => {
    const req = {
      user: { id: studentAId, role: 'STUDENT' },
      params: { courseId },
      query: { type: 'cbt' },
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body?.status, 'fail');
    assert.match(res.body?.message, /historyId|attempt/i);
  });

  it("3. Rejects student request attempting to use ANOTHER student's historyId with 403 Forbidden", async () => {
    // Student B attempts to pass Student A's completed historyId
    const req = {
      user: { id: studentBId, role: 'STUDENT' },
      params: { courseId },
      query: { type: 'cbt', historyId: completedHistoryId },
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body?.status, 'fail');
    assert.match(res.body?.message, /not authorized|forbidden/i);
  });

  it('4. Rejects student request with an invalid/unfinished/fake attempt ID with 403 Forbidden', async () => {
    const fakeHistoryId = 'a0000000-0000-0000-0000-000000000000';
    const req = {
      user: { id: studentAId, role: 'STUDENT' },
      params: { courseId },
      query: { type: 'cbt', historyId: fakeHistoryId },
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body?.status, 'fail');
  });

  it("5. Allows student review when valid historyId matching student's completed attempt is supplied", async () => {
    const req = {
      user: { id: studentAId, role: 'STUDENT' },
      params: { courseId },
      query: { type: 'cbt', historyId: completedHistoryId },
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body?.status, 'success');
    assert.ok(Array.isArray(res.body?.data), 'Returns question review array');
  });

  it('6. Allows administrator access to review questions without requiring student historyId', async () => {
    const req = {
      user: { id: 'admin-123', role: 'SUPER_ADMIN' },
      params: { courseId },
      query: { type: 'cbt' },
    } as any as AuthenticatedRequest;
    const res = createMockResponse();

    await getReviewQuestionsHandler(req, res);
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body?.status, 'success');
    assert.ok(Array.isArray(res.body?.data));
  });
});
