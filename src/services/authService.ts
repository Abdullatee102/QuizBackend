import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { db, pool } from '../db/index.js';

import {
  usersTable,
  quizHistoryTable,
  refreshTokensTable,
  achievementsTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  questionsTable,
  otpsTable,
} from '../db/schema.js';

import {
  eq,
  or,
  sql,
  desc,
  asc,
  and,
  gte,
  gt,
  lt,
  ne,
  isNull,
} from 'drizzle-orm';

import { quizService } from './quizService.js';

import {
  notificationService,
} from './notificationService.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
  throw new Error('[FATAL] JWT_SECRET environment variable is missing or insecure.');
}

const REFRESH_SECRET = process.env.REFRESH_SECRET;
if (!REFRESH_SECRET || REFRESH_SECRET === 'fallback-refresh-secret') {
  throw new Error('[FATAL] REFRESH_SECRET environment variable is missing or insecure.');
}

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_OTP_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown

const normalizeQuizType = (
  value: unknown
): 'cbt' | 'theory' => {
  return value === 'theory'
    ? 'theory'
    : 'cbt';
};

const POINTS_PER_QUESTION = 10;

// =====================================================
// ACHIEVEMENT TYPES
// =====================================================

interface AchievementData {
  key: string;
  title: string;
  description?: string;
  icon?: string;
}

interface UnlockAchievementResult {
  achievement: any;
  newlyUnlocked: boolean;
}

// =====================================================
// INTERNAL ACHIEVEMENT UNLOCK HELPER
// =====================================================
//
// This is intentionally outside authService.
//
// It prevents the public authService object from needing
// to call itself for the internal achievement operation.
//
// The unique constraint on:
//
//   userId + achievementKey
//
// must exist in schema.ts before this is pushed to the DB.
// =====================================================

const unlockAchievementWithStatus = async (
  userId: string | number,
  achievementData: AchievementData
): Promise<UnlockAchievementResult> => {

  /*
   * First check whether the achievement already exists.
   *
   * This avoids unnecessary database inserts and,
   * more importantly, avoids sending duplicate
   * notifications for an achievement the user already has.
   */

  const [existing] =
    await db
      .select()
      .from(achievementsTable)
      .where(
        and(
          eq(
            achievementsTable.userId,
            userId as any
          ),

          eq(
            achievementsTable.achievementKey,
            achievementData.key
          )
        )
      );

  if (existing) {
    return {
      achievement: existing,
      newlyUnlocked: false,
    };
  }

  /*
   * Insert the achievement.
   *
   * The composite unique constraint on:
   *
   *   userId + achievementKey
   *
   * protects against two simultaneous requests
   * trying to unlock the same achievement.
   */

  const inserted =
    await db
      .insert(achievementsTable)
      .values({
        userId:
          userId as any,

        achievementKey:
          achievementData.key,

        title:
          achievementData.title,

        description:
          achievementData.description ||
          null,

        icon:
          achievementData.icon ||
          null,
      } as any)
      .onConflictDoNothing({
        target: [
          achievementsTable.userId,
          achievementsTable.achievementKey,
        ],
      })
      .returning();

  /*
   * If nothing was inserted, another request
   * won the race and created the achievement first.
   *
   * Fetch that existing achievement and do NOT
   * send another notification.
   */

  if (
    inserted.length === 0
  ) {

    const [
      concurrentAchievement,
    ] = await db
      .select()
      .from(achievementsTable)
      .where(
        and(
          eq(
            achievementsTable.userId,
            userId as any
          ),

          eq(
            achievementsTable.achievementKey,
            achievementData.key
          )
        )
      );

    return {
      achievement:
        concurrentAchievement,

      newlyUnlocked: false,
    };
  }

  const achievement =
    inserted[0];

  /*
   * The achievement was genuinely created for
   * the first time.
   *
   * Now notify the user.
   *
   * Notification failure MUST NOT cause the
   * achievement itself to fail.
   */

  try {
  await notificationService
    .notifyAchievementUnlocked({
      userId:
        String(userId),

      achievementKey:
        achievementData.key,

      title:
        achievementData.title,

      ...(achievementData.description
        ? {
            description:
              achievementData.description,
          }
        : {}),
    });
} catch (error: any) {

    console.error(
      `[ACHIEVEMENTS] Failed to send achievement notification: ${
        error?.message || error
      }`
    );
  }

  return {
    achievement,

    newlyUnlocked: true,
  };
};

// =====================================================
// AUTH SERVICE
// =====================================================

export const authService = {

  // ===================================================
  // OTP
  // ===================================================

  generateOtp: async (
    identifier: string,
    purpose: string = 'verification'
  ): Promise<string> => {
    const normalizedId = identifier.trim().toLowerCase();
    const now = new Date();

    // 1. Enforce resend cooldown (60s)
    const recentThreshold = new Date(now.getTime() - OTP_RESEND_COOLDOWN_MS);
    const [recentOtp] = await db
      .select({ id: otpsTable.id, createdAt: otpsTable.createdAt })
      .from(otpsTable)
      .where(
        and(
          eq(otpsTable.identifier, normalizedId),
          eq(otpsTable.purpose, purpose),
          eq(otpsTable.isUsed, false),
          gt(otpsTable.createdAt, recentThreshold)
        )
      )
      .limit(1);

    if (recentOtp) {
      const elapsedSec = Math.floor((now.getTime() - new Date(recentOtp.createdAt).getTime()) / 1000);
      const cooldownRemaining = Math.max(1, 60 - elapsedSec);
      const error: any = new Error(`Please wait ${cooldownRemaining} seconds before requesting a new verification code.`);
      error.statusCode = 429;
      error.cooldownRemaining = cooldownRemaining;
      throw error;
    }

    // 2. Invalidate previous active OTPs for the same identifier and purpose
    await db
      .update(otpsTable)
      .set({ isUsed: true })
      .where(
        and(
          eq(otpsTable.identifier, normalizedId),
          eq(otpsTable.purpose, purpose),
          eq(otpsTable.isUsed, false)
        )
      );

    // 3. Cryptographically secure 6-digit numeric OTP
    const otpCode = crypto.randomInt(100000, 1000000).toString();

    // 4. Store SHA-256 hash with 10-minute expiry (never store plaintext OTP)
    const otpHash = crypto
      .createHash('sha256')
      .update(otpCode)
      .digest('hex');

    const expiresAt = new Date(now.getTime() + OTP_TTL_MS);

    await db.insert(otpsTable).values({
      identifier: normalizedId,
      otpHash,
      purpose,
      expiresAt,
      attempts: 0,
      maxAttempts: MAX_OTP_ATTEMPTS,
      isUsed: false,
    });

    // 5. Periodic cleanup of expired entries (> 24 hours old)
    try {
      const cleanupThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      await db
        .delete(otpsTable)
        .where(lt(otpsTable.expiresAt, cleanupThreshold));
    } catch {
      // Safe to ignore non-critical cleanup error
    }

    return otpCode;
  },

  verifyOtpCode: async (
    identifier: string,
    inputCode: string,
    purpose?: string
  ): Promise<boolean> => {
    const normalizedId = identifier.trim().toLowerCase();
    const cleanedCode = (inputCode || '').trim();

    if (!cleanedCode || cleanedCode.length !== 6) {
      return false;
    }

    const now = new Date();

    const conditions = [
      eq(otpsTable.identifier, normalizedId),
      eq(otpsTable.isUsed, false),
      gt(otpsTable.expiresAt, now),
    ];

    if (purpose) {
      conditions.push(eq(otpsTable.purpose, purpose));
    }

    const [record] = await db
      .select()
      .from(otpsTable)
      .where(and(...conditions))
      .orderBy(desc(otpsTable.createdAt))
      .limit(1);

    if (!record) {
      return false;
    }

    // Reject if already reached maximum attempts
    if (record.attempts >= record.maxAttempts) {
      await db
        .update(otpsTable)
        .set({ isUsed: true })
        .where(eq(otpsTable.id, record.id));
      return false;
    }

    // Increment attempt count
    const currentAttempt = record.attempts + 1;
    await db
      .update(otpsTable)
      .set({ attempts: currentAttempt })
      .where(eq(otpsTable.id, record.id));

    // Hash user-provided code using SHA-256
    const inputHash = crypto
      .createHash('sha256')
      .update(cleanedCode)
      .digest('hex');

    const inputBuf = Buffer.from(inputHash, 'hex');
    const storedBuf = Buffer.from(record.otpHash, 'hex');

    const isMatch =
      inputBuf.length === storedBuf.length &&
      crypto.timingSafeEqual(inputBuf, storedBuf);

    if (!isMatch) {
      if (currentAttempt >= record.maxAttempts) {
        await db
          .update(otpsTable)
          .set({ isUsed: true })
          .where(eq(otpsTable.id, record.id));
      }
      return false;
    }

    // Single-use: invalidate upon successful verification
    await db
      .update(otpsTable)
      .set({ isUsed: true })
      .where(eq(otpsTable.id, record.id));

    return true;
  },

  // ===================================================
  // USERS
  // ===================================================

  findUser: async (
    identifier: string
  ): Promise<any> => {

    const [user] =
      await db
        .select()
        .from(usersTable)
        .where(
          or(
            eq(
              usersTable.email,
              identifier
            ),

            eq(
              usersTable.phoneNumber,
              identifier
            )
          )
        );

    return user || null;
  },

  findUserById: async (
    userId: string | number
  ): Promise<any> => {

    if (!userId) {
      return null;
    }

    const [user] =
      await db
        .select()
        .from(usersTable)
        .where(
          eq(
            usersTable.id,
            userId as any
          )
        );

    return user || null;
  },

  findUserWithStats: async (
    userId: string | number
  ): Promise<any> => {

    if (!userId) {
      return null;
    }

    const [user] =
      await db
        .select()
        .from(usersTable)
        .where(
          eq(
            usersTable.id,
            userId as any
          )
        );

    if (!user) {
      return null;
    }

    const [stats] =
      await db
        .select({
          totalScore:
            sql<number>`
              coalesce(
                sum(${quizHistoryTable.score}),
                0
              )
            `.mapWith(Number),

          quizzesCompleted:
            sql<number>`
              count(${quizHistoryTable.id})
            `.mapWith(Number),

          totalCorrect:
            sql<number>`
              coalesce(
                sum(${quizHistoryTable.correctAnswers}),
                0
              )
            `.mapWith(Number),
        })
        .from(
          quizHistoryTable
        )
        .where(
          eq(
            quizHistoryTable.userId,
            userId as any
          )
        );

    let faculty = null;
    if (user.facultyId) {
      const [fac] = await db
        .select({
          id: facultiesTable.id,
          name: facultiesTable.name,
          code: facultiesTable.code,
        })
        .from(facultiesTable)
        .where(eq(facultiesTable.id, user.facultyId));
      faculty = fac || null;
    }

    let department = null;
    if (user.departmentId) {
      const [dept] = await db
        .select({
          id: departmentsTable.id,
          name: departmentsTable.name,
          code: departmentsTable.code,
          facultyId: departmentsTable.facultyId,
        })
        .from(departmentsTable)
        .where(eq(departmentsTable.id, user.departmentId));
      department = dept || null;
    }

    return {
      ...user,
      faculty,
      department,
      ...stats,
    };
  },

  saveUser: async (
    identifier: string,
    userData: any
  ): Promise<any> => {

    const isEmailSignup =
      identifier.includes('@');

    const result =
      await db
        .insert(usersTable)
        .values({
          fullName:
            userData.fullName ||
            'User',

          username:
            userData.username
              ? userData.username
                  .trim()
                  .toLowerCase()
              : null,

          email:
            userData.email ||
            (isEmailSignup
              ? identifier
              : null),

          phoneNumber:
            userData.phoneNumber ||
            (!isEmailSignup
              ? identifier
              : null),

          bio:
            userData.bio ||
            null,

          photoURL:
            userData.photoURL ||
            null,

          password:
            userData.password ||
            '',
        })
        .returning();

    return result[0];
  },

  updateUserPassword: async (
    identifier: string,
    newPassword: string
  ): Promise<any> => {

    const [updatedUser] =
      await db
        .update(usersTable)
        .set({
          password:
            newPassword,
        })
        .where(
          or(
            eq(
              usersTable.email,
              identifier
            ),

            eq(
              usersTable.phoneNumber,
              identifier
            )
          )
        )
        .returning();

    return updatedUser || null;
  },

  changePassword: async (
    userId: string | number,
    currentPassword: string,
    newPassword: string
  ): Promise<any> => {

    const [user] =
      await db
        .select()
        .from(usersTable)
        .where(
          eq(
            usersTable.id,
            userId as any
          )
        );

    if (!user) {
      return {
        success: false,
        message:
          'User not found.',
      };
    }

    if (
      user.password !==
      currentPassword
    ) {
      return {
        success: false,
        message:
          'Incorrect current password.',
      };
    }

    const [updatedUser] =
      await db
        .update(usersTable)
        .set({
          password:
            newPassword,
        })
        .where(
          eq(
            usersTable.id,
            userId as any
          )
        )
        .returning();

    return {
      success: true,
      data: updatedUser,
    };
  },

  updateUserProfile: async (
    userId: string | number,
    updateData: any
  ): Promise<any> => {
    const dataToUpdate: any = {};

    const [currentUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!currentUser) {
      throw new Error('User not found.');
    }

    if (updateData.fullName !== undefined) {
      dataToUpdate.fullName = updateData.fullName;
    }

    if (updateData.bio !== undefined) {
      dataToUpdate.bio = updateData.bio;
    }

    if (updateData.photoURL !== undefined) {
      dataToUpdate.photoURL = updateData.photoURL;
    }

    if (updateData.username !== undefined) {
      const cleanUsername = updateData.username
        ? updateData.username.trim().toLowerCase()
        : null;

      if (cleanUsername) {
        const [existingUsername] = await db
          .select()
          .from(usersTable)
          .where(
            and(
              eq(usersTable.username, cleanUsername),
              sql`${usersTable.id} != ${userId}`
            )
          );

        if (existingUsername) {
          throw new Error('This username is already taken by another account.');
        }
      }

      dataToUpdate.username = cleanUsername;
    }

    if (updateData.email !== undefined) {
      const cleanEmail = updateData.email
        ? updateData.email.trim().toLowerCase()
        : null;

      if (cleanEmail) {
        const [existingEmail] = await db
          .select()
          .from(usersTable)
          .where(
            and(
              eq(usersTable.email, cleanEmail),
              sql`${usersTable.id} != ${userId}`
            )
          );

        if (existingEmail) {
          throw new Error('This email address is already registered to another account.');
        }
      }

      dataToUpdate.email = cleanEmail;
    }

    if (updateData.phoneNumber !== undefined) {
      const cleanPhone = updateData.phoneNumber
        ? updateData.phoneNumber.trim()
        : null;

      if (cleanPhone) {
        const [existingPhone] = await db
          .select()
          .from(usersTable)
          .where(
            and(
              eq(usersTable.phoneNumber, cleanPhone),
              sql`${usersTable.id} != ${userId}`
            )
          );

        if (existingPhone) {
          throw new Error('This phone number is already registered to another account.');
        }
      }

      dataToUpdate.phoneNumber = cleanPhone;
    }

    if (updateData.leaderboardPrivacy !== undefined) {
      const allowed = ['FULL_NAME', 'USERNAME_ONLY', 'ANONYMOUS', 'EXCLUDE'];
      if (!allowed.includes(updateData.leaderboardPrivacy)) {
        throw new Error('Invalid leaderboard privacy setting. Must be FULL_NAME, USERNAME_ONLY, ANONYMOUS, or EXCLUDE.');
      }
      dataToUpdate.leaderboardPrivacy = updateData.leaderboardPrivacy;
    }

    // ===================================================
    // ACADEMIC VALIDATION & UPDATE
    // ===================================================

    if (updateData.level !== undefined) {
      if (
        updateData.level !== null &&
        ![100, 200, 300, 400, 500].includes(updateData.level)
      ) {
        throw new Error('Invalid academic level. Must be 100, 200, 300, 400, or 500.');
      }
      dataToUpdate.level = updateData.level;
    }

    const nextFacultyId =
      updateData.facultyId !== undefined
        ? updateData.facultyId
        : currentUser.facultyId;

    if (updateData.facultyId !== undefined) {
      if (updateData.facultyId !== null) {
        const [fac] = await db
          .select()
          .from(facultiesTable)
          .where(eq(facultiesTable.id, updateData.facultyId));
        if (!fac) {
          throw new Error('Specified faculty does not exist.');
        }
      }
      dataToUpdate.facultyId = updateData.facultyId;
    }

    if (updateData.departmentId !== undefined) {
      if (updateData.departmentId !== null) {
        const [dept] = await db
          .select()
          .from(departmentsTable)
          .where(eq(departmentsTable.id, updateData.departmentId));
        if (!dept) {
          throw new Error('Specified department does not exist.');
        }

        if (nextFacultyId && dept.facultyId !== nextFacultyId) {
          throw new Error('Selected department does not belong to the selected faculty.');
        }

        // Auto-assign faculty if not previously set or supplied
        if (!nextFacultyId) {
          dataToUpdate.facultyId = dept.facultyId;
        }
      }
      dataToUpdate.departmentId = updateData.departmentId;
    } else if (
      updateData.facultyId !== undefined &&
      updateData.facultyId !== null &&
      currentUser.departmentId
    ) {
      // User changed faculty without supplying departmentId: ensure existing department matches
      const [dept] = await db
        .select()
        .from(departmentsTable)
        .where(eq(departmentsTable.id, currentUser.departmentId));
      if (dept && dept.facultyId !== updateData.facultyId) {
        throw new Error(
          'Current department does not belong to the newly selected faculty. Please select a valid department for this faculty.'
        );
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return null;
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set(dataToUpdate)
      .where(eq(usersTable.id, userId as any))
      .returning();

    if (!updatedUser) {
      return null;
    }

    // Populate faculty and department
    let faculty = null;
    if (updatedUser.facultyId) {
      const [fac] = await db
        .select({
          id: facultiesTable.id,
          name: facultiesTable.name,
          code: facultiesTable.code,
        })
        .from(facultiesTable)
        .where(eq(facultiesTable.id, updatedUser.facultyId));
      faculty = fac || null;
    }

    let department = null;
    if (updatedUser.departmentId) {
      const [dept] = await db
        .select({
          id: departmentsTable.id,
          name: departmentsTable.name,
          code: departmentsTable.code,
          facultyId: departmentsTable.facultyId,
        })
        .from(departmentsTable)
        .where(eq(departmentsTable.id, updatedUser.departmentId));
      department = dept || null;
    }

    return {
      ...updatedUser,
      faculty,
      department,
    };
  },

  // ===================================================
  // RECOMMENDED COURSES
  // ===================================================

  getRecommendedCourses: async (
    userId: string | number,
    semester?: string
  ): Promise<{
    hasAcademicProfile: boolean;
    faculty?: any;
    department?: any;
    level?: number | null;
    count: number;
    data: any[];
    message?: string;
  }> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user || !user.departmentId || !user.level) {
      return {
        hasAcademicProfile: false,
        count: 0,
        data: [],
        message:
          'Please complete your academic profile (faculty, department, and level) in settings to receive personalized course recommendations.',
      };
    }

    const conditions = [
      eq(coursesTable.departmentId, user.departmentId),
      eq(coursesTable.level, user.level),
    ];

    if (semester) {
      conditions.push(eq(coursesTable.semester, semester));
    }

    const courses = await db
      .select()
      .from(coursesTable)
      .where(and(...conditions));

    // Enrich courses with question counts in a single efficient query
    const questionStats = await db
      .select({
        courseId: questionsTable.courseId,
        type: questionsTable.type,
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(questionsTable)
      .groupBy(questionsTable.courseId, questionsTable.type);

    const statsMap = new Map<string, { cbt: number; theory: number }>();
    for (const stat of questionStats) {
      if (!statsMap.has(stat.courseId)) {
        statsMap.set(stat.courseId, { cbt: 0, theory: 0 });
      }
      const entry = statsMap.get(stat.courseId)!;
      if (stat.type === 'theory') {
        entry.theory = stat.count;
      } else {
        entry.cbt = stat.count;
      }
    }

    const enriched = courses.map((c) => {
      const stats = statsMap.get(c.id) || { cbt: 0, theory: 0 };
      return {
        ...c,
        cbtQuestionsCount: stats.cbt,
        theoryQuestionsCount: stats.theory,
        totalQuestionsCount: stats.cbt + stats.theory,
      };
    });

    let department = null;
    if (user.departmentId) {
      const [dept] = await db
        .select()
        .from(departmentsTable)
        .where(eq(departmentsTable.id, user.departmentId));
      department = dept || null;
    }

    let faculty = null;
    if (user.facultyId) {
      const [fac] = await db
        .select()
        .from(facultiesTable)
        .where(eq(facultiesTable.id, user.facultyId));
      faculty = fac || null;
    }

    return {
      hasAcademicProfile: true,
      faculty,
      department,
      level: user.level,
      count: enriched.length,
      data: enriched,
    };
  },

    // ===================================================
  // DELETE ACCOUNT
  // ===================================================

  deleteAccount: async (
    userId: string | number
  ): Promise<boolean> => {

    if (!userId) {
      return false;
    }

    /*
     * Deleting the user automatically deletes all
     * user-owned records because the database schema
     * uses ON DELETE CASCADE on:
     *
     * - refresh_tokens
     * - user_devices
     * - notifications
     * - quiz_history
     * - achievements
     *
     * Academic data such as faculties, departments,
     * courses, and questions is NOT connected to the
     * user with a foreign key, so it remains untouched.
     */

    const deleted = await db
      .delete(usersTable)
      .where(
        eq(
          usersTable.id,
          userId as any
        )
      )
      .returning({
        id: usersTable.id,
      });

    return deleted.length > 0;
  },

  // ===================================================
  // QUIZ HISTORY
  // ===================================================

  saveQuizHistory: async (
    userId: string | number,
    quizData: any
  ): Promise<any> => {

    console.log(
      '===================================='
    );

    console.log(
      '[QUIZ FLOW] Starting submit → grade → save'
    );

    console.log(
      '[QUIZ FLOW] userId:',
      userId
    );

    console.log(
      '[QUIZ FLOW] quizData:',
      JSON.stringify(
        quizData,
        null,
        2
      )
    );

    console.log(
      '===================================='
    );

    if (
      !quizData?.courseId
    ) {
      throw new Error(
        'courseId is missing from quizData'
      );
    }

    if (
      !Array.isArray(
        quizData.answers
      )
    ) {
      throw new Error(
        'Quiz answers are required'
      );
    }

    const quizType =
      normalizeQuizType(
        quizData.quizType
      );

    let course: { id: string; code: string; title: string } | undefined;

    if (quizData.courseId === 'mixed') {
      const firstQuestionId = quizData.answers[0]?.questionId;
      if (firstQuestionId) {
        const [q] = await db
          .select({ courseId: questionsTable.courseId })
          .from(questionsTable)
          .where(eq(questionsTable.id, firstQuestionId));
        if (q?.courseId) {
          const [c] = await db
            .select({ id: coursesTable.id, code: coursesTable.code, title: coursesTable.title })
            .from(coursesTable)
            .where(eq(coursesTable.id, q.courseId));
          course = c;
        }
      }
      if (!course) {
        const [fallbackCourse] = await db
          .select({ id: coursesTable.id, code: coursesTable.code, title: coursesTable.title })
          .from(coursesTable)
          .limit(1);
        course = fallbackCourse;
      }
    } else {
      const [found] = await db
        .select({
          id: coursesTable.id,
          code: coursesTable.code,
          title: coursesTable.title,
        })
        .from(coursesTable)
        .where(
          eq(
            coursesTable.id,
            quizData.courseId
          )
        );
      course = found;
    }

    if (!course) {
      throw new Error(
        `Course not found for courseId: ${quizData.courseId}`
      );
    }

    console.log(
      `[QUIZ FLOW] Course verified: ${course.code} - ${course.title}`
    );

    console.log(
      `[QUIZ FLOW] Grading ${quizType} quiz on backend...`
    );

    const gradingResult =
      await quizService.gradeQuiz(
        quizData.courseId,
        quizType,
        quizData.answers
      );

    console.log(
      '[QUIZ FLOW] Grading complete:',
      JSON.stringify(
        gradingResult,
        null,
        2
      )
    );

    // ---------------------------------------------------
    // BB-04 ANTI-GRIND MASTERY XP CALCULATION (ROLLING 24H DECAY)
    // Same-course attempt decay:
    // Attempt 1: 100% XP (1.0)
    // Attempt 2: 50% XP (0.5)
    // Attempt 3+: 25% XP (0.25)
    // Empty / 0-question attempts: 0 XP
    // Historical academic score is preserved intact.
    // ---------------------------------------------------
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [priorAttemptsResult] = await db
      .select({
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(quizHistoryTable)
      .where(
        and(
          eq(quizHistoryTable.userId, userId as any),
          eq(quizHistoryTable.courseId, course.id),
          gte(quizHistoryTable.createdAt, twentyFourHoursAgo)
        )
      );

    const priorAttempts = priorAttemptsResult?.count ?? 0;
    let attemptMultiplier = 1.0;
    if (priorAttempts === 1) {
      attemptMultiplier = 0.5;
    } else if (priorAttempts >= 2) {
      attemptMultiplier = 0.25;
    }

    let earnedXp = 0;
    if (gradingResult.totalQuestions > 0 && gradingResult.score > 0) {
      earnedXp = Math.round(gradingResult.score * attemptMultiplier);
    }

    const [result] =
      await db
        .insert(
          quizHistoryTable
        )
        .values({
          userId:
            userId as any,

          courseId:
            course.id,

          quizType,

          score:
            gradingResult.score,

          earnedXp,

          totalQuestions:
            gradingResult.totalQuestions,

          category:
            String(
              quizData.courseId === 'mixed'
                ? 'MIXED'
                : (quizData.category || course.code)
            ),

          correctAnswers:
            gradingResult.correctAnswers,
        })
        .returning();

    console.log(
      '[QUIZ FLOW] History saved:',
      result
    );

    return {
      history: result,

      grading: {
        quizType:
          gradingResult.quizType,

        totalQuestions:
          gradingResult.totalQuestions,

        answeredQuestions:
          gradingResult.answeredQuestions,

        correctAnswers:
          gradingResult.correctAnswers,

        wrongAnswers:
          gradingResult.wrongAnswers,

        score:
          gradingResult.score,

        earnedXp,

        attemptMultiplier,

        percentage:
          gradingResult.percentage,

        results:
          gradingResult.results,
      },
    };
  },

  // ===================================================
  // ACHIEVEMENTS
  // ===================================================

  getUserAchievements:
    async (
      userId: string | number
    ): Promise<any[]> => {

      return await db
        .select()
        .from(achievementsTable)
        .where(
          eq(
            achievementsTable.userId,
            userId as any
          )
        )
        .orderBy(
          desc(
            achievementsTable.unlockedAt
          )
        );
    },

  // ===================================================
  // PUBLIC ACHIEVEMENT UNLOCK
  // ===================================================

  unlockAchievement: async (
    userId: string | number,
    achievementData: AchievementData
  ): Promise<any> => {

    const result =
      await unlockAchievementWithStatus(
        userId,
        achievementData
      );

    /*
     * Preserve the original public API.
     *
     * The controller still receives only
     * the achievement record.
     */

    return result.achievement;
  },

  // ===================================================
  // EVALUATE ACHIEVEMENTS
  // ===================================================

  evaluateAndUnlockAchievements:
    async (
      userId: string | number
    ): Promise<void> => {

      const history =
        await authService
          .getUserQuizHistory(
            userId
          );

      const stats =
        await authService
          .findUserWithStats(
            userId
          );

      const totalQuizzes =
        history.length;

      const totalScore =
        stats?.totalScore || 0;

      const uniqueQuizDates = [
        ...new Set(
          history
            .filter(
              (quiz: any) =>
                quiz.createdAt
            )
            .map(
              (quiz: any) => {

                const date =
                  new Date(
                    quiz.createdAt
                  );

                if (
                  isNaN(
                    date.getTime()
                  )
                ) {
                  return null;
                }

                return date
                  .toISOString()
                  .split('T')[0];
              }
            )
            .filter(Boolean)
        ),
      ].sort(
        (a, b) =>
          new Date(
            b as string
          ).getTime() -
          new Date(
            a as string
          ).getTime()
      );

      let userStreak = 0;

      if (
        uniqueQuizDates.length >
        0
      ) {

        userStreak = 1;

        for (
          let i = 1;
          i <
          uniqueQuizDates.length;
          i++
        ) {

          const currentDate =
            new Date(
              uniqueQuizDates[
                i - 1
              ] as string
            );

          const previousDate =
            new Date(
              uniqueQuizDates[
                i
              ] as string
            );

          const differenceInDays =
            Math.round(
              (
                currentDate.getTime() -
                previousDate.getTime()
              ) /
                (
                  1000 *
                  60 *
                  60 *
                  24
                )
            );

          if (
            differenceInDays ===
            1
          ) {

            userStreak++;

          } else {

            break;
          }
        }
      }

      console.log(
        `[ACHIEVEMENTS] User ${userId} streak: ${userStreak} days`
      );

      // =================================================
      // COMPREHENSIVE HISTORY METRICS CALCULATION
      // =================================================
      let perfectScoresCount = 0;
      let cbtHighScores = 0;
      let theoryHighScores = 0;
      let weekendQuizzes = 0;
      let hasEarlyBirdQuiz = false;
      let hasNightQuiz = false;
      let hasCompletedCSCQuiz = false;
      let hasCompletedEEEQuiz = false;
      let hasCompletedMTHQuiz = false;
      let hasCompletedPHYQuiz = false;
      const courseIdSet = new Set<string>();

      const sortedByTimeAsc = [...history].sort((a: any, b: any) => 
        new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
      );

      let currentConsecutivePerfect = 0;
      let maxConsecutivePerfectScores = 0;

      for (const quiz of sortedByTimeAsc) {
        const totalQuestions = Number(quiz.totalQuestions) || 0;
        const score = Number(quiz.score) || 0;
        const maximumScore = totalQuestions * POINTS_PER_QUESTION;
        const percentage = maximumScore > 0 ? Number(((score / maximumScore) * 100).toFixed(2)) : 0;
        const quizType = String(quiz.quizType || 'cbt').toLowerCase();
        const category = String(quiz.category || '').toLowerCase();

        if (quiz.courseId) {
          courseIdSet.add(quiz.courseId);
        }

        if (percentage >= 100) {
          perfectScoresCount++;
          currentConsecutivePerfect++;
          if (currentConsecutivePerfect > maxConsecutivePerfectScores) {
            maxConsecutivePerfectScores = currentConsecutivePerfect;
          }
        } else {
          currentConsecutivePerfect = 0;
        }

        if (quizType === 'cbt' && percentage >= 80) {
          cbtHighScores++;
        }
        if (quizType === 'theory' && percentage >= 80) {
          theoryHighScores++;
        }

        if (category.startsWith('csc') || category.includes('computer')) {
          hasCompletedCSCQuiz = true;
        }
        if (category.startsWith('eee') || category.includes('electrical')) {
          hasCompletedEEEQuiz = true;
        }
        if (category.startsWith('mth') || category.includes('math')) {
          hasCompletedMTHQuiz = true;
        }
        if (category.startsWith('phy') || category.includes('physics')) {
          hasCompletedPHYQuiz = true;
        }

        const dateObj = quiz.createdAt ? new Date(quiz.createdAt) : null;
        if (dateObj && !isNaN(dateObj.getTime())) {
          const hour = dateObj.getHours();
          const day = dateObj.getDay(); // 0 = Sun, 6 = Sat
          if (day === 0 || day === 6) {
            weekendQuizzes++;
          }
          if (hour >= 22 || hour <= 4) {
            hasNightQuiz = true;
          }
          if (hour >= 4 && hour < 7) {
            hasEarlyBirdQuiz = true;
          }
        }
      }

      const distinctCourses = courseIdSet.size;

      // 1. Fast Learner
      if (totalQuizzes >= 5) {
        await authService.unlockAchievement(userId, {
          key: '1',
          title: 'Fast Learner',
          description: 'Complete 5 quizzes',
          icon: 'speedometer',
        });
      }

      // 2. Perfect Score
      if (perfectScoresCount >= 1) {
        await authService.unlockAchievement(userId, {
          key: '2',
          title: 'Perfect Score',
          description: 'Get 100% in any quiz',
          icon: 'trophy',
        });
      }

      // 3. Scholar Status
      if (totalScore >= 1000) {
        await authService.unlockAchievement(userId, {
          key: '3',
          title: 'Scholar Status',
          description: 'Reach 1000 Total Pts',
          icon: 'school',
        });
      }

      // 4. CSC Starter
      if (hasCompletedCSCQuiz) {
        await authService.unlockAchievement(userId, {
          key: '4',
          title: 'CSC Starter',
          description: 'Complete a Computer Science quiz',
          icon: 'xml',
        });
      }

      // 5. Consistency
      if (userStreak >= 7) {
        await authService.unlockAchievement(userId, {
          key: '5',
          title: 'Consistency',
          description: 'Achieve a 7-day streak',
          icon: 'fire',
        });
      }

      // 6. Night Owl
      if (hasNightQuiz) {
        await authService.unlockAchievement(userId, {
          key: '6',
          title: 'Night Owl',
          description: 'Take a quiz after 10PM',
          icon: 'weather-moonset',
        });
      }

      // 7. Early Bird
      if (hasEarlyBirdQuiz) {
        await authService.unlockAchievement(userId, {
          key: '7',
          title: 'Early Bird',
          description: 'Take a quiz before 7AM',
          icon: 'weather-sunny',
        });
      }

      // 8. Hat Trick (Score 100% three times)
      if (perfectScoresCount >= 3) {
        await authService.unlockAchievement(userId, {
          key: '8',
          title: 'Hat Trick',
          description: 'Score 100% three times',
          icon: 'star-circle',
        });
      }

      // 9. Warm Up (Complete your first quiz)
      if (totalQuizzes >= 1) {
        await authService.unlockAchievement(userId, {
          key: '9',
          title: 'Warm Up',
          description: 'Complete your first quiz',
          icon: 'rocket-launch',
        });
      }

      // 10. 3-Day Streak
      if (userStreak >= 3) {
        await authService.unlockAchievement(userId, {
          key: '10',
          title: '3-Day Streak',
          description: 'Maintain a 3-day streak',
          icon: 'calendar-check',
        });
      }

      // 11. Marathon (Complete 25 quizzes)
      if (totalQuizzes >= 25) {
        await authService.unlockAchievement(userId, {
          key: '11',
          title: 'Marathon',
          description: 'Complete 25 quizzes',
          icon: 'run-fast',
        });
      }

      // 12. Century (Complete 100 quizzes)
      if (totalQuizzes >= 100) {
        await authService.unlockAchievement(userId, {
          key: '12',
          title: 'Century',
          description: 'Complete 100 quizzes',
          icon: 'numeric-100-box',
        });
      }

      // 13. Theory Master (Score 80%+ on 5 theory assessments)
      if (theoryHighScores >= 5) {
        await authService.unlockAchievement(userId, {
          key: '13',
          title: 'Theory Master',
          description: 'Score 80%+ on 5 theory assessments',
          icon: 'book-open-page-variant',
        });
      }

      // 14. CBT Champion (Score 80%+ on 10 CBT quizzes)
      if (cbtHighScores >= 10) {
        await authService.unlockAchievement(userId, {
          key: '14',
          title: 'CBT Champion',
          description: 'Score 80%+ on 10 CBT quizzes',
          icon: 'laptop',
        });
      }

      // 15. Multi-Faculty (Quizzes from 3 courses/faculties)
      if (distinctCourses >= 3) {
        await authService.unlockAchievement(userId, {
          key: '15',
          title: 'Multi-Faculty',
          description: 'Complete quizzes from 3 different faculties',
          icon: 'domain',
        });
      }

      // 16. Department Explorer (Quizzes from 5 departments/courses)
      if (distinctCourses >= 5) {
        await authService.unlockAchievement(userId, {
          key: '16',
          title: 'Department Explorer',
          description: 'Complete quizzes from 5 departments',
          icon: 'compass-outline',
        });
      }

      // 17. Weekend Warrior (Take 5 quizzes on weekends)
      if (weekendQuizzes >= 5) {
        await authService.unlockAchievement(userId, {
          key: '17',
          title: 'Weekend Warrior',
          description: 'Take 5 quizzes on weekends',
          icon: 'beach',
        });
      }

      // 21. EEE Explorer
      if (hasCompletedEEEQuiz) {
        await authService.unlockAchievement(userId, {
          key: '21',
          title: 'EEE Explorer',
          description: 'Complete an Electrical Engineering quiz',
          icon: 'flash',
        });
      }

      // 22. MTH Solver
      if (hasCompletedMTHQuiz) {
        await authService.unlockAchievement(userId, {
          key: '22',
          title: 'MTH Solver',
          description: 'Complete a Mathematics quiz',
          icon: 'calculator-variant',
        });
      }

      // 23. PHY Pioneer
      if (hasCompletedPHYQuiz) {
        await authService.unlockAchievement(userId, {
          key: '23',
          title: 'PHY Pioneer',
          description: 'Complete a Physics quiz',
          icon: 'atom',
        });
      }

      // 25. Perfectionist (5 perfect scores in a row)
      if (maxConsecutivePerfectScores >= 5) {
        await authService.unlockAchievement(userId, {
          key: '25',
          title: 'Perfectionist',
          description: 'Get 5 perfect scores in a row',
          icon: 'check-decagram',
        });
      }

      // 26. 14-Day Streak
      if (userStreak >= 14) {
        await authService.unlockAchievement(userId, {
          key: '26',
          title: '14-Day Streak',
          description: 'Maintain a 14-day streak',
          icon: 'calendar-star',
        });
      }

      // 27. 30-Day Streak
      if (userStreak >= 30) {
        await authService.unlockAchievement(userId, {
          key: '27',
          title: '30-Day Streak',
          description: 'Maintain a 30-day streak',
          icon: 'calendar-month',
        });
      }

      // 29. All-Rounder (10 different courses)
      if (distinctCourses >= 10) {
        await authService.unlockAchievement(userId, {
          key: '29',
          title: 'All-Rounder',
          description: 'Complete quizzes in 10 different courses',
          icon: 'chart-donut',
        });
      }

      // 30. Quiz Legend (200 quizzes total)
      if (totalQuizzes >= 200) {
        await authService.unlockAchievement(userId, {
          key: '30',
          title: 'Quiz Legend',
          description: 'Complete 200 quizzes total',
          icon: 'crown',
        });
      }
    },

  // ===================================================
  // LEADERBOARD PRIVACY PREFERENCE
  // ===================================================

  updateLeaderboardPrivacy: async (
    userId: string | number,
    privacy: 'FULL_NAME' | 'USERNAME_ONLY' | 'ANONYMOUS' | 'EXCLUDE'
  ): Promise<{ success: boolean; privacy: string }> => {
    const allowed = ['FULL_NAME', 'USERNAME_ONLY', 'ANONYMOUS', 'EXCLUDE'];
    if (!allowed.includes(privacy)) {
      throw new Error('Invalid leaderboard privacy setting. Must be FULL_NAME, USERNAME_ONLY, ANONYMOUS, or EXCLUDE.');
    }

    await db
      .update(usersTable)
      .set({ leaderboardPrivacy: privacy })
      .where(eq(usersTable.id, userId as any));

    return { success: true, privacy };
  },

  // ===================================================
  // LEADERBOARD
  // ===================================================

  getTopLeaderboard:
    async (
      range: string = '24h',
      limit: number = 20,
      scope: string = 'global',
      requestingUserId?: string | number
    ): Promise<any[]> => {

      let dateFilter:
        | ReturnType<typeof gte>
        | undefined;

      if (
        range === '24h'
      ) {

        const d =
          new Date();

        d.setDate(
          d.getDate() - 1
        );

        dateFilter =
          gte(
            quizHistoryTable.createdAt,
            d
          );

      } else if (
        range === '30d'
      ) {

        const d =
          new Date();

        d.setDate(
          d.getDate() - 30
        );

        dateFilter =
          gte(
            quizHistoryTable.createdAt,
            d
          );
      }

      // Resolve requesting user if ID is supplied
      let requestingUser: any = null;
      if (requestingUserId) {
        const [u] = await db
          .select({
            id: usersTable.id,
            facultyId: usersTable.facultyId,
            departmentId: usersTable.departmentId,
            leaderboardPrivacy: usersTable.leaderboardPrivacy,
            username: usersTable.username,
            fullName: usersTable.fullName,
          })
          .from(usersTable)
          .where(eq(usersTable.id, requestingUserId as any));
        requestingUser = u || null;
      }

      // Public list conditions:
      // 1. Exclude students who set privacy to 'EXCLUDE'
      const conditions: any[] = [
        or(
          isNull(usersTable.leaderboardPrivacy),
          ne(usersTable.leaderboardPrivacy, 'EXCLUDE')
        ),
      ];

      // 2. Filter by scope
      if (scope === 'faculty') {
        if (requestingUser?.facultyId) {
          conditions.push(eq(usersTable.facultyId, requestingUser.facultyId));
        } else {
          // Missing faculty affiliation - return empty public ranking for faculty scope
          conditions.push(sql`1=0`);
        }
      } else if (scope === 'department') {
        if (requestingUser?.departmentId) {
          conditions.push(eq(usersTable.departmentId, requestingUser.departmentId));
        } else {
          // Missing department affiliation - return empty public ranking for department scope
          conditions.push(sql`1=0`);
        }
      }

      // 4-tier deterministic tie-breakers:
      // Tier 1: Total Mastery XP (earned_xp) DESC
      // Tier 2: Overall Accuracy % DESC
      // Tier 3: Total Questions Attempted DESC
      // Tier 4: Earliest Completion Timestamp ASC (fallback: user ID ASC)
      const rawLeaders =
        await db
          .select({
            id: usersTable.id,
            fullName: usersTable.fullName,
            username: usersTable.username,
            photoURL: usersTable.photoURL,
            leaderboardPrivacy: usersTable.leaderboardPrivacy,
            facultyId: usersTable.facultyId,
            departmentId: usersTable.departmentId,
            facultyCode: facultiesTable.code,
            facultyName: facultiesTable.name,
            departmentCode: departmentsTable.code,
            departmentName: departmentsTable.name,
            totalScore:
              sql<number>`
                coalesce(
                  sum(${quizHistoryTable.earnedXp}),
                  0
                )
              `.mapWith(Number),
            accuracy:
              sql<number>`
                coalesce(
                  round((sum(${quizHistoryTable.correctAnswers})::numeric / nullif(sum(${quizHistoryTable.totalQuestions}), 0)::numeric) * 100, 2),
                  0
                )
              `.mapWith(Number),
            totalQuestions:
              sql<number>`
                coalesce(
                  sum(${quizHistoryTable.totalQuestions}),
                  0
                )
              `.mapWith(Number),
            earliestAt:
              sql<string | null>`min(${quizHistoryTable.createdAt})`,
          })
          .from(usersTable)
          .leftJoin(
            facultiesTable,
            eq(usersTable.facultyId, facultiesTable.id)
          )
          .leftJoin(
            departmentsTable,
            eq(usersTable.departmentId, departmentsTable.id)
          )
          .leftJoin(
            quizHistoryTable,
            dateFilter
              ? and(
                  eq(
                    usersTable.id,
                    quizHistoryTable.userId
                  ),
                  dateFilter
                )
              : eq(
                  usersTable.id,
                  quizHistoryTable.userId
                )
          )
          .where(and(...conditions))
          .groupBy(
            usersTable.id,
            usersTable.fullName,
            usersTable.username,
            usersTable.photoURL,
            usersTable.leaderboardPrivacy,
            usersTable.facultyId,
            usersTable.departmentId,
            facultiesTable.code,
            facultiesTable.name,
            departmentsTable.code,
            departmentsTable.name
          )
          .orderBy(
            desc(
              sql`
                coalesce(
                  sum(${quizHistoryTable.earnedXp}),
                  0
                )
              `
            ),
            desc(
              sql`
                coalesce(
                  round((sum(${quizHistoryTable.correctAnswers})::numeric / nullif(sum(${quizHistoryTable.totalQuestions}), 0)::numeric) * 100, 2),
                  0
                )
              `
            ),
            desc(
              sql`
                coalesce(
                  sum(${quizHistoryTable.totalQuestions}),
                  0
                )
              `
            ),
            sql`min(${quizHistoryTable.createdAt}) ASC NULLS LAST`,
            asc(usersTable.id)
          )
          .limit(limit);

      // Apply Privacy Masking
      // Note: NEVER expose student emails, matriculation numbers, phone numbers, or auth tokens.
      const maskedLeaders: any[] = rawLeaders.map((row) => {
        let displayName = row.fullName || '';
        let displayUsername = row.username || '';
        let displayPhoto = row.photoURL;

        const privacy = row.leaderboardPrivacy || 'USERNAME_ONLY';

        if (privacy === 'ANONYMOUS') {
          const shortId = String(row.id).slice(-4).padStart(4, '0');
          displayName = `Scholar #${shortId}`;
          displayUsername = `scholar_${shortId}`;
          displayPhoto = null;
        } else if (privacy === 'USERNAME_ONLY') {
          displayName = row.username ? `@${row.username}` : 'Scholar';
          displayUsername = row.username || '';
        } else if (privacy === 'FULL_NAME') {
          displayName = row.fullName || (row.username ? `@${row.username}` : 'Scholar');
          displayUsername = row.username || '';
        }

        return {
          id: row.id,
          fullName: displayName,
          username: displayUsername,
          photoURL: displayPhoto,
          facultyId: row.facultyId,
          departmentId: row.departmentId,
          facultyCode: row.facultyCode,
          facultyName: row.facultyName,
          departmentCode: row.departmentCode,
          departmentName: row.departmentName,
          totalScore: row.totalScore,
        };
      });

      // Compute Personal Standing for Requesting User (even if excluded from public view)
      let userStanding: any = null;

      if (requestingUser) {
        const facultyMissing = scope === 'faculty' && !requestingUser.facultyId;
        const departmentMissing = scope === 'department' && !requestingUser.departmentId;

        if (facultyMissing || departmentMissing) {
          userStanding = {
            rank: null,
            percentile: null,
            totalScore: 0,
            accuracy: 0,
            totalQuestions: 0,
            isExcluded: requestingUser.leaderboardPrivacy === 'EXCLUDE',
            privacy: requestingUser.leaderboardPrivacy,
            scope,
            scopeNotice: facultyMissing
              ? 'Set your faculty in profile settings to participate in faculty rankings.'
              : 'Set your department in profile settings to participate in department rankings.',
          };
        } else {
          let dateJoinSql = '';
          if (range === '24h') {
            dateJoinSql = "AND q.created_at >= NOW() - INTERVAL '24 HOURS'";
          } else if (range === '30d') {
            dateJoinSql = "AND q.created_at >= NOW() - INTERVAL '30 DAYS'";
          }

          let scopeWhereSql = '1=1';
          const queryParams: any[] = [requestingUserId];

          if (scope === 'faculty') {
            queryParams.push(requestingUser.facultyId);
            scopeWhereSql = `u.faculty_id = $${queryParams.length}`;
          } else if (scope === 'department') {
            queryParams.push(requestingUser.departmentId);
            scopeWhereSql = `u.department_id = $${queryParams.length}`;
          }

          try {
            const { rows } = await pool.query(
              `WITH ranked_users AS (
                SELECT 
                  u.id,
                  u.leaderboard_privacy,
                  COALESCE(SUM(q.earned_xp), 0)::integer AS total_score,
                  COALESCE(ROUND((SUM(q.correct_answers)::numeric / NULLIF(SUM(q.total_questions), 0)::numeric) * 100, 2), 0)::float AS accuracy,
                  COALESCE(SUM(q.total_questions), 0)::integer AS total_questions,
                  MIN(q.created_at) AS earliest_at,
                  RANK() OVER (
                    ORDER BY 
                      COALESCE(SUM(q.earned_xp), 0) DESC,
                      COALESCE(ROUND((SUM(q.correct_answers)::numeric / NULLIF(SUM(q.total_questions), 0)::numeric) * 100, 2), 0) DESC,
                      COALESCE(SUM(q.total_questions), 0) DESC,
                      MIN(q.created_at) ASC NULLS LAST,
                      u.id ASC
                  ) AS rank,
                  COUNT(*) OVER () AS total_participants
                FROM users u
                LEFT JOIN quiz_history q ON u.id = q.user_id ${dateJoinSql}
                WHERE ${scopeWhereSql}
                GROUP BY u.id, u.leaderboard_privacy
              )
              SELECT * FROM ranked_users WHERE id = $1`,
              queryParams
            );

            const standingRow = rows[0];
            if (standingRow) {
              const rank = Number(standingRow.rank);
              const total = Number(standingRow.total_participants);
              const percentile = total > 1 ? Math.round(((total - rank) / (total - 1)) * 100) : 100;

              userStanding = {
                rank,
                percentile,
                totalScore: Number(standingRow.total_score),
                accuracy: Number(standingRow.accuracy),
                totalQuestions: Number(standingRow.total_questions),
                isExcluded: requestingUser.leaderboardPrivacy === 'EXCLUDE',
                privacy: requestingUser.leaderboardPrivacy,
                totalParticipants: total,
                scope,
              };
            }
          } catch (err) {
            console.error('[LEADERBOARD STANDING ERROR]:', err);
          }
        }
      }

      (maskedLeaders as any).userStanding = userStanding;
      return maskedLeaders;
    },

  // ===================================================
  // QUIZ HISTORY
  // ===================================================

  getUserQuizHistory:
    async (
      userId: string | number
    ): Promise<any[]> => {

      const results =
        await db
          .select({
            id:
              quizHistoryTable.id,

            userId:
              quizHistoryTable.userId,

            courseId:
              quizHistoryTable.courseId,

            quizType:
              quizHistoryTable.quizType,

            category:
              quizHistoryTable.category,

            score:
              quizHistoryTable.score,

            correctAnswers:
              quizHistoryTable.correctAnswers,

            totalQuestions:
              quizHistoryTable.totalQuestions,

            createdAt:
              quizHistoryTable.createdAt,

            courseCode:
              coursesTable.code,

            courseTitle:
              coursesTable.title,
          })
          .from(
            quizHistoryTable
          )
          .leftJoin(
            coursesTable,
            eq(
              quizHistoryTable.courseId,
              coursesTable.id
            )
          )
          .where(
            eq(
              quizHistoryTable.userId,
              userId as any
            )
          )
          .orderBy(
            desc(
              quizHistoryTable.createdAt
            )
          );

      return results.map(
        (quiz: any) => {

          const totalQuestions =
            Number(
              quiz.totalQuestions
            ) || 0;

          const score =
            Number(
              quiz.score
            ) || 0;

          const maximumScore =
            totalQuestions *
            POINTS_PER_QUESTION;

          const percentage =
            maximumScore > 0
              ? Number(
                  (
                    (
                      score /
                      maximumScore
                    ) *
                    100
                  ).toFixed(2)
                )
              : 0;

          const isMixed =
            String(quiz.category).toUpperCase() === 'MIXED' ||
            String(quiz.courseCode).toUpperCase() === 'MIXED';

          return {
            ...quiz,
            courseCode: isMixed ? 'MIXED' : quiz.courseCode,
            courseTitle: isMixed ? 'Mixed Faculties Question' : quiz.courseTitle,
            percentage,
          };
        }
      );
    },

  // ===================================================
  // TOKENS
  // ===================================================

  generateAuthTokens:
    async (payload: {
      id: string;
      email?: string | null;
      phoneNumber?: string | null;
      role?: string;
    }) => {

      const accessToken =
        jwt.sign(
          payload,
          JWT_SECRET,
          {
            expiresIn:
              '15m',
          }
        );

      const refreshToken =
        jwt.sign(
          payload,
          REFRESH_SECRET,
          {
            expiresIn:
              '7d',
          }
        );

      await db
        .insert(
          refreshTokensTable
        )
        .values({
          userId:
            payload.id,

          token:
            refreshToken,
        });

      return {
        accessToken,
        refreshToken,
      };
    },

  verifyRefreshToken:
    async (
      token: string
    ) => {

      try {

        const decoded =
          jwt.verify(
            token,
            REFRESH_SECRET
          ) as any;

        const [
          storedToken,
        ] = await db
          .select()
          .from(
            refreshTokensTable
          )
          .where(
            and(
              eq(
                refreshTokensTable.token,
                token
              ),

              eq(
                refreshTokensTable.userId,
                decoded.id
              )
            )
          );

        if (
          !storedToken
        ) {
          return null;
        }

        return decoded;

      } catch {

        return null;
      }
    },

  revokeRefreshToken:
    async (
      token: string
    ) => {

      await db
        .delete(
          refreshTokensTable
        )
        .where(
          eq(
            refreshTokensTable.token,
            token
          )
        );
    },
};
