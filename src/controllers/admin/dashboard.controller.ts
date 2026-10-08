import type { Response } from 'express';
import { sql } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  usersTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  questionsTable,
  supportRequestsTable,
  quizHistoryTable,
} from '../../db/schema.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const getAdminDashboard = async (
  _req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const [
      userStats,
      curriculumStats,
      questionsStats,
      supportStats,
      quizStats,
    ] = await Promise.all([
      // 1. Users Breakdown
      db.select({
        total: sql<number>`count(*)`.mapWith(Number),
        active: sql<number>`count(case when ${usersTable.status} = 'ACTIVE' then 1 end)`.mapWith(Number),
        suspended: sql<number>`count(case when ${usersTable.status} = 'SUSPENDED' then 1 end)`.mapWith(Number),
        disabled: sql<number>`count(case when ${usersTable.status} = 'DISABLED' then 1 end)`.mapWith(Number),
        students: sql<number>`count(case when ${usersTable.role} = 'STUDENT' then 1 end)`.mapWith(Number),
        superAdmins: sql<number>`count(case when ${usersTable.role} = 'SUPER_ADMIN' then 1 end)`.mapWith(Number),
        contentAdmins: sql<number>`count(case when ${usersTable.role} = 'CONTENT_ADMIN' then 1 end)`.mapWith(Number),
        supportAgents: sql<number>`count(case when ${usersTable.role} = 'SUPPORT_AGENT' then 1 end)`.mapWith(Number),
        notificationAdmins: sql<number>`count(case when ${usersTable.role} = 'NOTIFICATION_ADMIN' then 1 end)`.mapWith(Number),
        moderators: sql<number>`count(case when ${usersTable.role} = 'MODERATOR' then 1 end)`.mapWith(Number),
      }).from(usersTable),

      // 2. Faculties, Departments, Courses
      Promise.all([
        db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(facultiesTable),
        db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(departmentsTable),
        db.select({ count: sql<number>`count(*)`.mapWith(Number) }).from(coursesTable),
      ]),

      // 3. Questions Breakdown
      db.select({
        total: sql<number>`count(*)`.mapWith(Number),
        cbt: sql<number>`count(case when ${questionsTable.type} = 'cbt' then 1 end)`.mapWith(Number),
        theory: sql<number>`count(case when ${questionsTable.type} = 'theory' then 1 end)`.mapWith(Number),
      }).from(questionsTable),

      // 4. Support Tickets Breakdown
      db.select({
        total: sql<number>`count(*)`.mapWith(Number),
        open: sql<number>`count(case when ${supportRequestsTable.status} = 'open' then 1 end)`.mapWith(Number),
        inProgress: sql<number>`count(case when ${supportRequestsTable.status} = 'in_progress' then 1 end)`.mapWith(Number),
        closed: sql<number>`count(case when ${supportRequestsTable.status} = 'closed' then 1 end)`.mapWith(Number),
        urgent: sql<number>`count(case when ${supportRequestsTable.priority} = 'urgent' then 1 end)`.mapWith(Number),
      }).from(supportRequestsTable),

      // 5. Quiz Activity
      db.select({
        totalQuizzes: sql<number>`count(*)`.mapWith(Number),
        averageScore: sql<number>`coalesce(round(avg(${quizHistoryTable.score})::numeric, 1), 0)`.mapWith(Number),
      }).from(quizHistoryTable),
    ]);

    const users = userStats[0] || {
      total: 0,
      active: 0,
      suspended: 0,
      disabled: 0,
      students: 0,
      superAdmins: 0,
      contentAdmins: 0,
      supportAgents: 0,
      notificationAdmins: 0,
      moderators: 0,
    };

    const curriculum = {
      facultiesCount: curriculumStats[0][0]?.count || 0,
      departmentsCount: curriculumStats[1][0]?.count || 0,
      coursesCount: curriculumStats[2][0]?.count || 0,
    };

    const questions = questionsStats[0] || {
      total: 0,
      cbt: 0,
      theory: 0,
    };

    const support = supportStats[0] || {
      total: 0,
      open: 0,
      inProgress: 0,
      closed: 0,
      urgent: 0,
    };

    const quiz = quizStats[0] || {
      totalQuizzes: 0,
      averageScore: 0,
    };

    res.status(200).json({
      status: 'success',
      data: {
        users,
        curriculum,
        questions,
        support,
        quiz,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to load admin dashboard: ${error.message}`,
    });
  }
};

