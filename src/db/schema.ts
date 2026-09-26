import {
  pgTable,
  text,
  timestamp,
  integer,
  real,
  uuid,
  jsonb,
  boolean,
  unique,
} from 'drizzle-orm/pg-core';

// =====================================================
// GRADING POINT TYPE
// =====================================================

export type GradingPoint = {
  concept: string;
  weight: number;
  aliases?: string[];
};

// =====================================================
// USERS
// =====================================================

export const usersTable = pgTable('users', {
  id: uuid('id')
    .defaultRandom()
    .primaryKey(),

  fullName: text('full_name')
    .notNull(),

  username: text('username')
    .unique(),

  email: text('email')
    .unique(),

  phoneNumber: text('phone_number')
    .unique(),

  bio: text('bio'),

  photoURL: text('photo_url'),

  password: text('password')
    .notNull(),

  facultyId: uuid('faculty_id')
    .references(() => facultiesTable.id, {
      onDelete: 'set null',
    }),

  departmentId: uuid('department_id')
    .references(() => departmentsTable.id, {
      onDelete: 'set null',
    }),

  level: integer('level'),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});

// =====================================================
// REFRESH TOKENS
// =====================================================

export const refreshTokensTable = pgTable(
  'refresh_tokens',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    token: text('token')
      .notNull()
      .unique(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  }
);

// =====================================================
// USER DEVICES
// =====================================================

/*
 * Stores Expo push tokens for the user's devices.
 *
 * A user can have multiple devices:
 *
 * User
 *  ├── Android phone
 *  ├── iPhone
 *  └── Tablet
 *
 * Each device therefore has its own push token.
 */

export const userDevicesTable = pgTable(
  'user_devices',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    pushToken: text('push_token')
      .notNull()
      .unique(),

    platform: text('platform')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  }
);

// =====================================================
// NOTIFICATIONS
// =====================================================

/*
 * In-app notification inbox.
 *
 * Push notifications are delivered through Expo.
 * This table keeps a permanent record so the user
 * can still see the notification inside the app.
 */

export const notificationsTable = pgTable(
  'notifications',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    type: text('type')
      .notNull(),

    title: text('title')
      .notNull(),

    body: text('body')
      .notNull(),

    data: jsonb('data')
      .$type<Record<string, any>>()
      .default({})
      .notNull(),

    isRead: boolean('is_read')
      .default(false)
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    readAt: timestamp('read_at'),
  }
);

// =====================================================
// FACULTIES
// =====================================================

export const facultiesTable = pgTable(
  'faculties',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    name: text('name')
      .notNull()
      .unique(),

    code: text('code')
      .notNull()
      .unique(),
  }
);

// =====================================================
// DEPARTMENTS
// =====================================================

export const departmentsTable = pgTable(
  'departments',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    facultyId: uuid('faculty_id')
      .references(() => facultiesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    name: text('name')
      .notNull(),

    code: text('code')
      .notNull(),
  }
);

// =====================================================
// COURSES
// =====================================================

export const coursesTable = pgTable(
  'courses',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    departmentId: uuid('department_id')
      .references(() => departmentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    code: text('code')
      .notNull(),

    title: text('title')
      .notNull(),

    level: integer('level')
      .notNull(),

    semester: text('semester')
      .notNull(),
  }
);

// =====================================================
// QUESTIONS
// =====================================================

export const questionsTable = pgTable(
  'questions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    courseId: uuid('course_id')
      .references(() => coursesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    type: text('type')
      .default('cbt')
      .notNull(),

    // cbt or theory

    question: text('question')
      .notNull(),

    options: text('options')
      .array(),

    correctAnswer: text('correct_answer')
      .notNull(),

    gradingPoints: jsonb('grading_points')
      .$type<GradingPoint[]>()
      .default([])
      .notNull(),

    difficulty: text('difficulty')
      .default('medium')
      .notNull(),
  }
);

// =====================================================
// QUIZ HISTORY
// =====================================================

export const quizHistoryTable = pgTable(
  'quiz_history',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    courseId: uuid('course_id')
      .references(() => coursesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    quizType: text('quiz_type')
      .default('cbt')
      .notNull(),

    category: text('category')
      .notNull(),

    score: real('score')
      .notNull(),

    correctAnswers: integer('correct_answers')
      .notNull(),

    totalQuestions: integer('total_questions')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  }
);

// =====================================================
// ACHIEVEMENTS
// =====================================================

export const achievementsTable = pgTable(
  'achievements',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    achievementKey: text('achievement_key')
      .notNull(),

    title: text('title')
      .notNull(),

    description: text('description'),

    icon: text('icon'),

    unlockedAt: timestamp('unlocked_at')
      .defaultNow()
      .notNull(),
  },

  (table) => ({
    userAchievementUnique: unique(
      'user_achievement_unique'
    ).on(
      table.userId,
      table.achievementKey
    ),
  })
);

// =====================================================
// CONVERSATIONS (Academic Discussions & Messaging)
// =====================================================

export const conversationsTable = pgTable(
  'conversations',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    // 'faculty' | 'department' | 'level' | 'direct'
    type: text('type')
      .notNull(),

    title: text('title')
      .notNull(),

    code: text('code'),

    facultyId: uuid('faculty_id')
      .references(() => facultiesTable.id, {
        onDelete: 'cascade',
      }),

    departmentId: uuid('department_id')
      .references(() => departmentsTable.id, {
        onDelete: 'cascade',
      }),

    level: integer('level'),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  }
);

// =====================================================
// MESSAGES
// =====================================================

export const messagesTable = pgTable(
  'messages',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    conversationId: uuid('conversation_id')
      .references(() => conversationsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    senderId: uuid('sender_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    text: text('text')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  }
);

// =====================================================
// SUPPORT REQUESTS & MESSAGES
// =====================================================

export const supportRequestsTable = pgTable(
  'support_requests',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    subject: text('subject')
      .notNull(),

    category: text('category')
      .notNull(),

    status: text('status')
      .default('open')
      .notNull(),

    priority: text('priority')
      .default('medium')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  }
);

export const supportMessagesTable = pgTable(
  'support_messages',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    requestId: uuid('request_id')
      .references(() => supportRequestsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    senderId: uuid('sender_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    senderRole: text('sender_role')
      .default('user')
      .notNull(),

    message: text('message')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  }
);
