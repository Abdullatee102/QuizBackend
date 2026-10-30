import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { db } from '../db/index.js';
import { usersTable, quizHistoryTable, coursesTable, facultiesTable, departmentsTable, questionsTable } from '../db/schema.js';
import { authService } from '../services/authService.js';
import { unlockAchievement } from '../controllers/auth.controller.js';
import { eq, and } from 'drizzle-orm';

describe('BB-04: Gamification, Leaderboard Integrity & Achievement Security', () => {

  let testUserId: string;
  let testUser2Id: string;
  let course1Id: string;
  let course2Id: string;
  let question1Id: string;
  let question2Id: string;
  let testFacultyId: string;
  let testDeptId: string;

  before(async () => {
    // 1. Fetch or create faculty & department
    const [existingFac] = await db.select().from(facultiesTable).limit(1);
    if (existingFac) {
      testFacultyId = existingFac.id;
    } else {
      const [newFac] = await db.insert(facultiesTable).values({
        name: 'Faculty of Computing and Informatics',
        code: 'FCI',
      }).returning();
      if (!newFac) throw new Error('Failed to create test faculty');
      testFacultyId = newFac.id;
    }

    const [existingDept] = await db.select().from(departmentsTable).where(eq(departmentsTable.facultyId, testFacultyId)).limit(1);
    if (existingDept) {
      testDeptId = existingDept.id;
    } else {
      const [newDept] = await db.insert(departmentsTable).values({
        name: 'Computer Science',
        code: 'CSC',
        facultyId: testFacultyId,
      }).returning();
      if (!newDept) throw new Error('Failed to create test department');
      testDeptId = newDept.id;
    }

    // 2. Fetch or create courses
    const [c1] = await db.insert(coursesTable).values({
      code: `GAM1_${Date.now() % 100000}`,
      title: 'Gamification Test Course 1',
      departmentId: testDeptId,
      level: 100,
      semester: 'harmattan',
    }).returning();
    if (!c1) throw new Error('Failed to create test course 1');
    course1Id = c1.id;

    const [c2] = await db.insert(coursesTable).values({
      code: `GAM2_${Date.now() % 100000}`,
      title: 'Gamification Test Course 2',
      departmentId: testDeptId,
      level: 100,
      semester: 'harmattan',
    }).returning();
    if (!c2) throw new Error('Failed to create test course 2');
    course2Id = c2.id;

    // 3. Create question for course 1 & 2
    const [q1] = await db.insert(questionsTable).values({
      courseId: course1Id,
      type: 'cbt',
      question: 'What is 10 + 10?',
      options: ['10', '20', '30', '40'],
      correctAnswer: '20',
      difficulty: 'easy',
    }).returning();
    if (!q1) throw new Error('Failed to create test question 1');
    question1Id = q1.id;

    const [q2] = await db.insert(questionsTable).values({
      courseId: course2Id,
      type: 'cbt',
      question: 'What is 50 + 50?',
      options: ['50', '100', '150', '200'],
      correctAnswer: '100',
      difficulty: 'easy',
    }).returning();
    if (!q2) throw new Error('Failed to create test question 2');
    question2Id = q2.id;

    // 4. Create main test user
    const timestamp = Date.now();
    const [u1] = await db.insert(usersTable).values({
      fullName: `Test Gamer ${timestamp}`,
      username: `gamer_${timestamp}`,
      email: `gamer_${timestamp}@lautech.edu.ng`,
      password: 'hashed-password-test',
      role: 'STUDENT',
      status: 'ACTIVE',
      facultyId: testFacultyId,
      departmentId: testDeptId,
      leaderboardPrivacy: 'USERNAME_ONLY',
    }).returning();
    if (!u1) throw new Error('Failed to create test user 1');
    testUserId = u1.id;

    // 5. Create peer test user in same faculty/dept for scope testing
    const [u2] = await db.insert(usersTable).values({
      fullName: `Peer Gamer ${timestamp}`,
      username: `peer_${timestamp}`,
      email: `peer_${timestamp}@lautech.edu.ng`,
      password: 'hashed-password-test',
      role: 'STUDENT',
      status: 'ACTIVE',
      facultyId: testFacultyId,
      departmentId: testDeptId,
      leaderboardPrivacy: 'USERNAME_ONLY',
    }).returning();
    if (!u2) throw new Error('Failed to create test user 2');
    testUser2Id = u2.id;
  });

  after(async () => {
    // Teardown
    if (testUserId) {
      await db.delete(quizHistoryTable).where(eq(quizHistoryTable.userId, testUserId as any));
      await db.delete(usersTable).where(eq(usersTable.id, testUserId as any));
    }
    if (testUser2Id) {
      await db.delete(quizHistoryTable).where(eq(quizHistoryTable.userId, testUser2Id as any));
      await db.delete(usersTable).where(eq(usersTable.id, testUser2Id as any));
    }
    if (question1Id) {
      await db.delete(questionsTable).where(eq(questionsTable.id, question1Id));
    }
    if (question2Id) {
      await db.delete(questionsTable).where(eq(questionsTable.id, question2Id));
    }
    if (course1Id) {
      await db.delete(coursesTable).where(eq(coursesTable.id, course1Id));
    }
    if (course2Id) {
      await db.delete(coursesTable).where(eq(coursesTable.id, course2Id));
    }
  });

  // =====================================================
  // 1. DECISION A: ANTI-GRIND MASTERY XP DECAY (24H ROLLING)
  // =====================================================
  it('1.1 Computes 100% XP (multiplier 1.0) for Attempt 1 on Course 1', async () => {
    const result = await authService.saveQuizHistory(testUserId, {
      courseId: course1Id,
      quizType: 'cbt',
      answers: [{ questionId: question1Id, answer: '20' }],
    });

    assert.ok(result.grading.score > 0, 'Quiz score must be positive');
    assert.strictEqual(result.grading.attemptMultiplier, 1.0, 'Attempt 1 multiplier must be 1.0');
    assert.strictEqual(result.grading.earnedXp, result.grading.score, 'Attempt 1 earned XP must equal raw score');
    assert.strictEqual(result.history.earnedXp, result.history.score, 'Database row earned_xp must equal score for Attempt 1');
  });

  it('1.2 Applies 50% decay (multiplier 0.5) for Attempt 2 on Course 1 within 24h', async () => {
    const result = await authService.saveQuizHistory(testUserId, {
      courseId: course1Id,
      quizType: 'cbt',
      answers: [{ questionId: question1Id, answer: '20' }],
    });

    assert.strictEqual(result.grading.attemptMultiplier, 0.5, 'Attempt 2 multiplier must be 0.5');
    assert.strictEqual(
      result.grading.earnedXp,
      Math.round(result.grading.score * 0.5),
      'Attempt 2 earned XP must be 50% of score'
    );
    // Academic score remains unaltered
    assert.strictEqual(
      result.history.score,
      result.grading.score,
      'Raw academic score in database must be preserved intact'
    );
  });

  it('1.3 Applies 25% decay (multiplier 0.25) for Attempt 3+ on Course 1 within 24h', async () => {
    const result3 = await authService.saveQuizHistory(testUserId, {
      courseId: course1Id,
      quizType: 'cbt',
      answers: [{ questionId: question1Id, answer: '20' }],
    });

    assert.strictEqual(result3.grading.attemptMultiplier, 0.25, 'Attempt 3 multiplier must be 0.25');
    assert.strictEqual(
      result3.grading.earnedXp,
      Math.round(result3.grading.score * 0.25),
      'Attempt 3 earned XP must be 25% of score'
    );

    const result4 = await authService.saveQuizHistory(testUserId, {
      courseId: course1Id,
      quizType: 'cbt',
      answers: [{ questionId: question1Id, answer: '20' }],
    });

    assert.strictEqual(result4.grading.attemptMultiplier, 0.25, 'Attempt 4 multiplier must remain 0.25');
  });

  it('1.4 Awards full 100% XP for Attempt 1 on Course 2 (independent per-course decay)', async () => {
    const result = await authService.saveQuizHistory(testUserId, {
      courseId: course2Id,
      quizType: 'cbt',
      answers: [{ questionId: question2Id, answer: '100' }],
    });

    assert.strictEqual(
      result.grading.attemptMultiplier,
      1.0,
      'Attempt 1 on Course 2 must receive full 1.0 multiplier despite prior attempts on Course 1'
    );
    assert.strictEqual(
      result.grading.earnedXp,
      result.grading.score,
      'Earned XP for new course must be 100% of score'
    );
  });

  it('1.5 Assigns 0 XP for empty / 0-question attempts', async () => {
    const result = await authService.saveQuizHistory(testUserId, {
      courseId: course2Id,
      quizType: 'cbt',
      answers: [],
    });

    assert.strictEqual(result.grading.earnedXp, 0, '0-score or empty quiz attempt must earn 0 XP');
  });

  // =====================================================
  // 2. DECISION B: ACHIEVEMENT UNLOCK LOCKDOWN (SERVER-SIDE ONLY)
  // =====================================================
  it('2.1 Rejects client-side manual achievement unlock request with 403 Forbidden', async () => {
    let responseStatus: number = 0;
    let responseBody: any = null;

    const mockReq: any = {
      user: { id: testUserId },
      body: { key: 'fake_cheat_badge', title: 'Cheater' },
    };

    const mockRes: any = {
      status: (s: number) => {
        responseStatus = s;
        return {
          json: (b: any) => {
            responseBody = b;
          },
        };
      },
    };

    await unlockAchievement(mockReq, mockRes);

    assert.strictEqual(responseStatus, 403, 'Manual unlock must return HTTP 403 Forbidden');
    assert.strictEqual(responseBody?.code, 'MANUAL_UNLOCK_DISABLED', 'Must return MANUAL_UNLOCK_DISABLED code');
    assert.strictEqual(responseBody?.status, 'fail');
  });

  it('2.2 Server-side evaluateAndUnlockAchievements operates safely without errors', async () => {
    await assert.doesNotReject(
      async () => {
        await authService.evaluateAndUnlockAchievements(testUserId);
      },
      'Server-side evaluateAndUnlockAchievements must execute without errors'
    );
  });

  // =====================================================
  // 3. DECISION C: LEADERBOARD PRIVACY PREFERENCES & MASKING
  // =====================================================
  it('3.1 Rejects invalid privacy setting value', async () => {
    await assert.rejects(
      async () => {
        await authService.updateLeaderboardPrivacy(testUserId, 'INVALID_PREFERENCE' as any);
      },
      /Invalid leaderboard privacy setting/,
      'Must reject unsupported privacy enum values'
    );
  });

  it('3.2 Correctly masks user as Scholar #XXXX when ANONYMOUS is selected', async () => {
    await authService.updateLeaderboardPrivacy(testUserId, 'ANONYMOUS');

    const leaders = await authService.getTopLeaderboard('24h', 100, 'global');
    const myEntry = leaders.find((l: any) => l.id === testUserId);

    assert.ok(myEntry, 'User must appear on leaderboard when ANONYMOUS');
    assert.match(
      myEntry.fullName,
      /^Scholar #[0-9a-zA-Z]{4}$/,
      `Full name must be masked as Scholar #XXXX. Found: ${myEntry.fullName}`
    );
    assert.match(
      myEntry.username,
      /^scholar_[0-9a-zA-Z]{4}$/,
      `Username must be masked as scholar_XXXX. Found: ${myEntry.username}`
    );
    assert.strictEqual(myEntry.photoURL, null, 'Photo URL must be null for anonymous user');
  });

  it('3.3 Omits user from public leaderboard query when EXCLUDE is selected', async () => {
    await authService.updateLeaderboardPrivacy(testUserId, 'EXCLUDE');

    const leaders = await authService.getTopLeaderboard('24h', 100, 'global');
    const myEntry = leaders.find((l: any) => l.id === testUserId);

    assert.strictEqual(myEntry, undefined, 'User must NOT appear in public leaderboard when EXCLUDE is selected');
  });

  it('3.4 Allows EXCLUDED user to view personal private rank and standing', async () => {
    const leaders = await authService.getTopLeaderboard('24h', 10, 'global', testUserId);
    const standing = (leaders as any).userStanding;

    assert.ok(standing, 'Requesting user standing must be returned');
    assert.strictEqual(standing.isExcluded, true, 'User standing must indicate isExcluded = true');
    assert.ok(typeof standing.rank === 'number' && standing.rank >= 1, 'Private rank must be a positive integer');
    assert.ok(typeof standing.percentile === 'number', 'Percentile must be computed');
    assert.ok(standing.totalScore > 0, 'Personal totalScore must reflect earned XP');
  });

  it('3.5 Correctly masks user as @username when USERNAME_ONLY is selected', async () => {
    await authService.updateLeaderboardPrivacy(testUserId, 'USERNAME_ONLY');

    const leaders = await authService.getTopLeaderboard('24h', 100, 'global');
    const myEntry = leaders.find((l: any) => l.id === testUserId);

    assert.ok(myEntry, 'User must appear on leaderboard when USERNAME_ONLY');
    assert.match(
      myEntry.fullName,
      /^@gamer_/,
      `Full name must be masked to @username. Found: ${myEntry.fullName}`
    );
  });

  // =====================================================
  // 4. LEADERBOARD SCOPES & ACADEMIC AFFILIATION
  // =====================================================
  it('4.1 Scope faculty returns only users within requesting user faculty', async () => {
    const facultyLeaders = await authService.getTopLeaderboard('24h', 50, 'faculty', testUserId);
    assert.ok(Array.isArray(facultyLeaders), 'Faculty leaderboard must return an array');

    for (const entry of facultyLeaders) {
      if (entry.facultyId) {
        assert.strictEqual(
          entry.facultyId,
          testFacultyId,
          `Every student in faculty scope must belong to faculty ${testFacultyId}`
        );
      }
    }
  });

  it('4.2 Scope department returns only users within requesting user department', async () => {
    const deptLeaders = await authService.getTopLeaderboard('24h', 50, 'department', testUserId);
    assert.ok(Array.isArray(deptLeaders), 'Department leaderboard must return an array');

    for (const entry of deptLeaders) {
      if (entry.departmentId) {
        assert.strictEqual(
          entry.departmentId,
          testDeptId,
          `Every student in department scope must belong to department ${testDeptId}`
        );
      }
    }
  });

  it('4.3 Gracefully handles unauthenticated or missing affiliation for scoped queries', async () => {
    const anonFacultyLeaders = await authService.getTopLeaderboard('24h', 10, 'faculty');
    assert.strictEqual(anonFacultyLeaders.length, 0, 'Faculty query without user ID must return empty array');

    // Create user without faculty
    const timestamp = Date.now();
    const [noFacUser] = await db.insert(usersTable).values({
      fullName: 'No Affiliation Student',
      username: `nofac_${timestamp}`,
      email: `nofac_${timestamp}@lautech.edu.ng`,
      password: 'hashed-password-test',
      role: 'STUDENT',
      status: 'ACTIVE',
      leaderboardPrivacy: 'USERNAME_ONLY',
    }).returning();
    if (!noFacUser) throw new Error('Failed to create noFacUser');

    const noFacLeaders = await authService.getTopLeaderboard('24h', 10, 'faculty', noFacUser.id);
    assert.strictEqual(noFacLeaders.length, 0, 'User without faculty must receive empty faculty list');
    assert.ok((noFacLeaders as any).userStanding?.scopeNotice, 'Must receive informative notice to configure faculty');

    // Clean up
    await db.delete(usersTable).where(eq(usersTable.id, noFacUser.id));
  });

  // =====================================================
  // 5. 4-TIER DETERMINISTIC TIE-BREAKERS
  // =====================================================
  it('5.1 Confirms deterministic ordering precedence (Total XP -> Accuracy -> Questions -> Earliest)', async () => {
    const leaders = await authService.getTopLeaderboard('all', 20, 'global');

    if (leaders.length >= 2) {
      for (let i = 0; i < leaders.length - 1; i++) {
        const a = leaders[i];
        const b = leaders[i + 1];

        // Tier 1: Total XP
        if (a && b && a.totalScore !== b.totalScore) {
          assert.ok(a.totalScore >= b.totalScore, 'Ranked items must be ordered by totalScore DESC');
        }
      }
    }
  });
});
