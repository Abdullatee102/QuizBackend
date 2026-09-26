import jwt from 'jsonwebtoken';

import { db } from '../db/index.js';

import {
  usersTable,
  quizHistoryTable,
  refreshTokensTable,
  achievementsTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  questionsTable,
} from '../db/schema.js';

import {
  eq,
  or,
  sql,
  desc,
  and,
  gte,
} from 'drizzle-orm';

import { quizService } from './quizService.js';

import {
  notificationService,
} from './notificationService.js';

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'fallback-secret-key';

const REFRESH_SECRET =
  process.env.REFRESH_SECRET ||
  'fallback-refresh-secret';

const otpStore =
  new Map<string, string>();

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

  generateOtp: (
    identifier: string
  ): string => {

    const otpCode =
      Math.floor(
        100000 +
          Math.random() *
            900000
      ).toString();

    otpStore.set(
      identifier,
      otpCode
    );

    return otpCode;
  },

  verifyOtpCode: (
    identifier: string,
    inputCode: string
  ): boolean => {

    const storedOtp =
      otpStore.get(identifier);

    if (
      !storedOtp ||
      storedOtp !== inputCode
    ) {
      return false;
    }

    otpStore.delete(
      identifier
    );

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

    const [course] =
      await db
        .select({
          id:
            coursesTable.id,

          code:
            coursesTable.code,

          title:
            coursesTable.title,
        })
        .from(coursesTable)
        .where(
          eq(
            coursesTable.id,
            quizData.courseId
          )
        );

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

    const [result] =
      await db
        .insert(
          quizHistoryTable
        )
        .values({
          userId:
            userId as any,

          courseId:
            quizData.courseId,

          quizType,

          score:
            gradingResult.score,

          totalQuestions:
            gradingResult.totalQuestions,

          category:
            String(
              quizData.category ||
                course.code
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
      // 1. Fast Learner
      // =================================================

      if (
        totalQuizzes >= 5
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '1',

              title:
                'Fast Learner',

              description:
                'Complete 5 quizzes',

              icon:
                'speedometer',
            }
          );
      }

      // =================================================
      // 2. Perfect Score
      // =================================================

      const hasPerfectScore =
        history.some(
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

            if (
              maximumScore <= 0
            ) {
              return false;
            }

            const percentage =
              Number(
                (
                  (
                    score /
                    maximumScore
                  ) *
                  100
                ).toFixed(2)
              );

            return (
              percentage === 100
            );
          }
        );

      if (
        hasPerfectScore
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '2',

              title:
                'Perfect Score',

              description:
                'Get 100% in any quiz',

              icon:
                'trophy',
            }
          );
      }

      // =================================================
      // 3. Scholar Status
      // =================================================

      if (
        totalScore >= 1000
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '3',

              title:
                'Scholar Status',

              description:
                'Reach 1000 Total Pts',

              icon:
                'school',
            }
          );
      }

      // =================================================
      // 4. CSC Starter
      // =================================================

      const hasCompletedCSCQuiz =
        history.some(
          (quiz: any) => {

            const category =
              quiz.category
                ?.toLowerCase() ||
              '';

            return category.startsWith(
              'csc'
            );
          }
        );

      if (
        hasCompletedCSCQuiz
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '4',

              title:
                'CSC Starter',

              description:
                'Complete a Computer Science quiz',

              icon:
                'code-slash',
            }
          );
      }

      // =================================================
      // 5. Consistency
      // =================================================

      if (
        userStreak >= 7
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '5',

              title:
                'Consistency',

              description:
                'Achieve a 7-day streak',

              icon:
                'fire',
            }
          );
      }

      // =================================================
      // 6. Night Owl
      // =================================================

      const hasNightQuiz =
        history.some(
          (quiz: any) => {

            const dateObj =
              quiz.createdAt
                ? new Date(
                    quiz.createdAt
                  )
                : null;

            if (
              !dateObj ||
              isNaN(
                dateObj.getTime()
              )
            ) {
              return false;
            }

            const hour =
              dateObj.getHours();

            return (
              hour >= 22 ||
              hour <= 4
            );
          }
        );

      if (
        hasNightQuiz
      ) {

        await authService
          .unlockAchievement(
            userId,
            {
              key: '6',

              title:
                'Night Owl',

              description:
                'Take a quiz after 10PM',

              icon:
                'weather-moonset',
            }
          );
      }
    },

  // ===================================================
  // LEADERBOARD
  // ===================================================

  getTopLeaderboard:
    async (
      range: string = '24h',
      limit: number = 20
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

      const results =
        await db
          .select({
            id:
              usersTable.id,

            fullName:
              usersTable.fullName,

            username:
              usersTable.username,

            email:
              usersTable.email,

            photoURL:
              usersTable.photoURL,

            totalScore:
              sql<number>`
                coalesce(
                  sum(${quizHistoryTable.score}),
                  0
                )
              `.mapWith(Number),
          })
          .from(usersTable)
          .leftJoin(
            quizHistoryTable,
            and(
              eq(
                usersTable.id,
                quizHistoryTable.userId
              ),
              dateFilter
            )
          )
          .groupBy(
            usersTable.id,
            usersTable.fullName,
            usersTable.username,
            usersTable.email,
            usersTable.photoURL
          )
          .orderBy(
            desc(
              sql`
                coalesce(
                  sum(${quizHistoryTable.score}),
                  0
                )
              `
            )
          )
          .limit(limit);

      return results;
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

          return {
            ...quiz,
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