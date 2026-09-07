import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import { usersTable, quizHistoryTable, refreshTokensTable, achievementsTable, questionsTable } from '../db/schema.js';
import { eq, or, sql, desc, and } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'fallback-refresh-secret';

const otpStore = new Map<string, string>();

export const authService = {
  generateOtp: (identifier: string): string => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(identifier, otpCode);
    return otpCode;
  },

  verifyOtpCode: (identifier: string, inputCode: string): boolean => {
    const storedOtp = otpStore.get(identifier);
    if (!storedOtp || storedOtp !== inputCode) return false;
    otpStore.delete(identifier);
    return true;
  },

  findUser: async (identifier: string): Promise<any> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.email, identifier),
          eq(usersTable.phoneNumber, identifier)
        )
      );
    return user || null;
  },

  findUserById: async (userId: string | number): Promise<any> => {
    if (!userId) return null;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));
    return user || null;
  },

  findUserWithStats: async (userId: string | number): Promise<any> => {
    if (!userId) return null;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    if (!user) return null;

    const [stats] = await db
      .select({
        totalScore: sql<number>`coalesce(sum(${quizHistoryTable.score}), 0)`.mapWith(Number),
        quizzesCompleted: sql<number>`count(${quizHistoryTable.id})`.mapWith(Number),
        totalCorrect: sql<number>`coalesce(sum(${quizHistoryTable.correctAnswers}), 0)`.mapWith(Number),
      })
      .from(quizHistoryTable)
      .where(eq(quizHistoryTable.userId, userId as any));

    return { ...user, ...stats };
  },

  saveUser: async (identifier: string, userData: any): Promise<any> => {
    const isEmailSignup = identifier.includes('@');
    const result = await db
      .insert(usersTable)
      .values({
        fullName: userData.fullName || 'User',
        username: userData.username ? userData.username.trim().toLowerCase() : null,
        email: userData.email || (isEmailSignup ? identifier : null),
        phoneNumber: userData.phoneNumber || (!isEmailSignup ? identifier : null),
        bio: userData.bio || null,
        photoURL: userData.photoURL || null,
        password: userData.password || '',
      })
      .returning();
    return result[0];
  },

  updateUserPassword: async (identifier: string, newPassword: string): Promise<any> => {
    const [updatedUser] = await db
      .update(usersTable)
      .set({ password: newPassword })
      .where(
        or(
          eq(usersTable.email, identifier),
          eq(usersTable.phoneNumber, identifier)
        )
      )
      .returning();
    return updatedUser || null;
  },

  changePassword: async (userId: string | number, currentPassword: string, newPassword: string): Promise<any> => {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));
      
    if (!user) {
      return { success: false, message: 'User not found.' };
    }

    if (user.password !== currentPassword) {
      return { success: false, message: 'Incorrect current password.' };
    }

    const [updatedUser] = await db
      .update(usersTable)
      .set({ password: newPassword })
      .where(eq(usersTable.id, userId as any))
      .returning();

    return { success: true, data: updatedUser };
  },

  updateUserProfile: async (userId: string | number, updateData: any): Promise<any> => {
    const dataToUpdate: any = {};
  
    if (updateData.fullName !== undefined) dataToUpdate.fullName = updateData.fullName;
    if (updateData.bio !== undefined) dataToUpdate.bio = updateData.bio;
    if (updateData.photoURL !== undefined) dataToUpdate.photoURL = updateData.photoURL;

    if (updateData.username !== undefined) {
      const cleanUsername = updateData.username.trim().toLowerCase();
      const [existingUsername] = await db
        .select()
        .from(usersTable)
        .where(and(eq(usersTable.username, cleanUsername), sql`${usersTable.id} != ${userId}`));
      
      if (existingUsername) {
        throw new Error('This username is already taken by another account.');
      }
      dataToUpdate.username = cleanUsername;
    }

    if (updateData.email !== undefined) {
      const cleanEmail = updateData.email ? updateData.email.trim().toLowerCase() : null;
      if (cleanEmail) {
        const [existingEmail] = await db
          .select()
          .from(usersTable)
          .where(and(eq(usersTable.email, cleanEmail), sql`${usersTable.id} != ${userId}`));
        
        if (existingEmail) {
          throw new Error('This email address is already registered to another account.');
        }
      }
      dataToUpdate.email = cleanEmail;
    }

    if (updateData.phoneNumber !== undefined) {
      const cleanPhone = updateData.phoneNumber ? updateData.phoneNumber.trim() : null;
      if (cleanPhone) {
        const [existingPhone] = await db
          .select()
          .from(usersTable)
          .where(and(eq(usersTable.phoneNumber, cleanPhone), sql`${usersTable.id} != ${userId}`));
        
        if (existingPhone) {
          throw new Error('This phone number is already registered to another account.');
        }
      }
      dataToUpdate.phoneNumber = cleanPhone;
    }

    if (Object.keys(dataToUpdate).length === 0) return null;

    const [updatedUser] = await db
      .update(usersTable)
      .set(dataToUpdate)
      .where(eq(usersTable.id, userId as any))
      .returning();
    
    return updatedUser || null;
  },

  saveQuizHistory: async (userId: string | number, quizData: any): Promise<any> => {
    const result = await db
      .insert(quizHistoryTable)
      .values({
        userId: userId as any,
        score: Number(quizData.score),
        totalQuestions: Number(quizData.totalQuestions),
        category: String(quizData.category),
        correctAnswers: Number(quizData.correctAnswers || 0),
      } as any)
      .returning();
      
    return result[0];
  },

  getUserAchievements: async (userId: string | number): Promise<any[]> => {
    return await db
      .select()
      .from(achievementsTable)
      .where(eq(achievementsTable.userId, userId as any))
      .orderBy(desc(achievementsTable.unlockedAt));
  },

  unlockAchievement: async (userId: string | number, achievementData: { key: string; title: string; description?: string; icon?: string }): Promise<any> => {
    const [existing] = await db
      .select()
      .from(achievementsTable)
      .where(and(eq(achievementsTable.userId, userId as any), eq(achievementsTable.achievementKey, achievementData.key)));

    if (existing) return existing;

    const [inserted] = await db
      .insert(achievementsTable)
      .values({
        userId: userId as any,
        achievementKey: achievementData.key,
        title: achievementData.title,
        description: achievementData.description || null,
        icon: achievementData.icon || null,
      } as any)
      .returning();

    return inserted;
  },

  evaluateAndUnlockAchievements: async (userId: string | number): Promise<void> => {
    const history = await authService.getUserQuizHistory(userId);
    const stats = await authService.findUserWithStats(userId);
    
    const totalQuizzes = history.length;
    const totalScore = stats?.totalScore || 0;
    const userStreak = stats?.streak || 0;

    // ID 1: Fast Learner - Complete 5 quizzes
    if (totalQuizzes >= 5) {
      await authService.unlockAchievement(userId, {
        key: '1',
        title: 'Fast Learner',
        description: 'Complete 5 quizzes',
        icon: 'speedometer',
      });
    }

    // ID 2: Perfect Score - Get 100% in any quiz
    const hasPerfectScore = history.some((quiz: any) => {
      const total = quiz.totalQuestions || 1;
      const correct = quiz.correctAnswers || quiz.score || 0;
      const percentage = Math.round((correct / total) * 100);
      return percentage === 100 || quiz.score === 100;
    });
    if (hasPerfectScore) {
      await authService.unlockAchievement(userId, {
        key: '2',
        title: 'Perfect Score',
        description: 'Get 100% in any quiz',
        icon: 'trophy',
      });
    }

    // ID 3: Scholar Status - Reach 1000 Total Pts
    if (totalScore >= 1000) {
      await authService.unlockAchievement(userId, {
        key: '3',
        title: 'Scholar Status',
        description: 'Reach 1000 Total Pts',
        icon: 'school',
      });
    }

    // ID 4: Math Master - Complete 10 Math quizzes
    const mathQuizzesCount = history.filter((q: any) => {
      const category = q.category?.toLowerCase() || '';
      return category.includes('math');
    }).length;
    if (mathQuizzesCount >= 10) {
      await authService.unlockAchievement(userId, {
        key: '4',
        title: 'Math Master',
        description: 'Complete 10 Math quizzes',
        icon: 'calculator',
      });
    }

    // ID 5: Consistency - 7-day streak
    if (userStreak >= 7) {
      await authService.unlockAchievement(userId, {
        key: '5',
        title: 'Consistency',
        description: 'Achieve a 7-day streak',
        icon: 'fire',
      });
    }

    // ID 6: Night Owl - Take a quiz after 10 PM or before 4 AM
    const hasNightQuiz = history.some((quiz: any) => {
      const dateObj = quiz.createdAt ? new Date(quiz.createdAt) : null;
      if (!dateObj || isNaN(dateObj.getTime())) return false;
      const hour = dateObj.getHours();
      return hour >= 22 || hour <= 4;
    });
    if (hasNightQuiz) {
      await authService.unlockAchievement(userId, {
        key: '6',
        title: 'Night Owl',
        description: 'Take a quiz after 10PM',
        icon: 'weather-moonset',
      });
    }
  },

  getTopLeaderboard: async (limit: number = 20): Promise<any[]> => {
    const results = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        photoURL: usersTable.photoURL,
        totalScore: sql<number>`coalesce(sum(${quizHistoryTable.score}), 0)`.mapWith(Number),
      })
      .from(usersTable)
      .leftJoin(quizHistoryTable, eq(usersTable.id, quizHistoryTable.userId))
      .groupBy(usersTable.id, usersTable.fullName, usersTable.username, usersTable.email, usersTable.photoURL)
      .orderBy(desc(sql`coalesce(sum(${quizHistoryTable.score}), 0)`))
      .limit(limit);
    return results;
  },

  getUserQuizHistory: async (userId: string | number): Promise<any[]> => {
    const results = await db
      .select()
      .from(quizHistoryTable)
      .where(eq(quizHistoryTable.userId, userId as any))
      .orderBy(desc(quizHistoryTable.createdAt));
    return results;
  },

  generateAuthTokens: async (payload: { id: string; email?: string | null; phoneNumber?: string | null }) => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

    await db.insert(refreshTokensTable).values({
      userId: payload.id,
      token: refreshToken,
    });

    return { accessToken, refreshToken };
  },

  verifyRefreshToken: async (token: string) => {
    try {
      const decoded = jwt.verify(token, REFRESH_SECRET) as any;

      const [storedToken] = await db
        .select()
        .from(refreshTokensTable)
        .where(and(eq(refreshTokensTable.token, token), eq(refreshTokensTable.userId, decoded.id)));

      if (!storedToken) return null;

      return decoded;
    } catch {
      return null;
    }
  },

  revokeRefreshToken: async (token: string) => {
    await db.delete(refreshTokensTable).where(eq(refreshTokensTable.token, token));
  },
};