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
  index,
} from 'drizzle-orm/pg-core';

// =====================================================
// USER ROLES & ACCOUNT STATUS
// =====================================================

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CONTENT_ADMIN: 'CONTENT_ADMIN',
  SUPPORT_AGENT: 'SUPPORT_AGENT',
  NOTIFICATION_ADMIN: 'NOTIFICATION_ADMIN',
  MODERATOR: 'MODERATOR',
  STUDENT: 'STUDENT',
  LECTURER: 'LECTURER',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ACCOUNT_STATUS = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DISABLED: 'DISABLED',
} as const;

export type AccountStatus = (typeof ACCOUNT_STATUS)[keyof typeof ACCOUNT_STATUS];

export const SUPPORT_STATUS = {
  OPEN: 'OPEN',
  AI_HANDLING: 'AI_HANDLING',
  WAITING_FOR_ADMIN: 'WAITING_FOR_ADMIN',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_USER: 'WAITING_FOR_USER',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;

export type SupportStatus = (typeof SUPPORT_STATUS)[keyof typeof SUPPORT_STATUS];

export const LEADERBOARD_PRIVACY = {
  FULL_NAME: 'FULL_NAME',
  USERNAME_ONLY: 'USERNAME_ONLY',
  ANONYMOUS: 'ANONYMOUS',
  EXCLUDE: 'EXCLUDE',
} as const;

export type LeaderboardPrivacy = (typeof LEADERBOARD_PRIVACY)[keyof typeof LEADERBOARD_PRIVACY];

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

export const usersTable = pgTable(
  'users',
  {
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

    role: text('role')
      .default('STUDENT')
      .notNull(),

    status: text('status')
      .default('ACTIVE')
      .notNull(),

    leaderboardPrivacy: text('leaderboard_privacy')
      .default('USERNAME_ONLY')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    roleIdx: index('users_role_idx').on(table.role),
    statusIdx: index('users_status_idx').on(table.status),
    leaderboardPrivacyIdx: index('users_leaderboard_privacy_idx').on(table.leaderboardPrivacy),
    facultyIdIdx: index('users_faculty_id_idx').on(table.facultyId),
    departmentIdIdx: index('users_department_id_idx').on(table.departmentId),
    levelIdx: index('users_level_idx').on(table.level),
  })
);

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

    isActive: boolean('is_active')
      .default(true)
      .notNull(),
  },
  (table) => ({
    departmentIdIdx: index('courses_department_id_idx').on(table.departmentId),
    codeIdx: index('courses_code_idx').on(table.code),
    isActiveIdx: index('courses_is_active_idx').on(table.isActive),
  })
);

// =====================================================
// QUESTIONS & WORKFLOW (BB-07F.3)
// =====================================================

export const QUESTION_STATUS = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  REVISION_REQUIRED: 'REVISION_REQUIRED',
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type QuestionStatus = (typeof QUESTION_STATUS)[keyof typeof QUESTION_STATUS];

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

    originOfferingId: uuid('origin_offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'set null',
      }),

    authorLecturerId: uuid('author_lecturer_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    status: text('status')
      .default('PUBLISHED')
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

    explanation: text('explanation'),

    points: integer('points')
      .default(1)
      .notNull(),

    imageUrl: text('image_url'),

    difficulty: text('difficulty')
      .default('medium')
      .notNull(),

    isPracticeEligible: boolean('is_practice_eligible')
      .default(true)
      .notNull(),

    isActive: boolean('is_active')
      .default(true)
      .notNull(),

    currentVersion: integer('current_version')
      .default(1)
      .notNull(),

    reviewedByAdminId: uuid('reviewed_by_admin_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    reviewedAt: timestamp('reviewed_at'),

    reviewFeedback: text('review_feedback'),

    rejectionReason: text('rejection_reason'),

    publishedByAdminId: uuid('published_by_admin_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    publishedAt: timestamp('published_at'),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseIdIdx: index('questions_course_id_idx').on(table.courseId),
    originOfferingIdIdx: index('questions_origin_offering_id_idx').on(table.originOfferingId),
    authorLecturerIdIdx: index('questions_author_lecturer_id_idx').on(table.authorLecturerId),
    statusIdx: index('questions_status_idx').on(table.status),
    typeIdx: index('questions_type_idx').on(table.type),
    isPracticeEligibleIdx: index('questions_is_practice_eligible_idx').on(table.isPracticeEligible),
    isActiveIdx: index('questions_is_active_idx').on(table.isActive),
  })
);

export const questionVersionsTable = pgTable(
  'question_versions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    questionId: uuid('question_id')
      .references(() => questionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    versionNumber: integer('version_number')
      .notNull(),

    type: text('type')
      .notNull(),

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

    explanation: text('explanation'),

    points: integer('points')
      .default(1)
      .notNull(),

    imageUrl: text('image_url'),

    difficulty: text('difficulty')
      .default('medium')
      .notNull(),

    submittedByUserId: uuid('submitted_by_user_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    questionIdIdx: index('question_versions_question_id_idx').on(table.questionId),
    questionVersionUnique: unique('question_versions_question_version_unique').on(
      table.questionId,
      table.versionNumber
    ),
  })
);

export const questionReviewsTable = pgTable(
  'question_reviews',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    questionId: uuid('question_id')
      .references(() => questionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    versionNumber: integer('version_number')
      .notNull(),

    action: text('action')
      .notNull(), // 'SUBMIT', 'WITHDRAW', 'BEGIN_REVIEW', 'REQUEST_REVISION', 'REJECT', 'APPROVE', 'PUBLISH', 'ARCHIVE', 'RESTORE'

    fromStatus: text('from_status')
      .notNull(),

    toStatus: text('to_status')
      .notNull(),

    performedByUserId: uuid('performed_by_user_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    feedback: text('feedback'),

    reason: text('reason'),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    questionIdIdx: index('question_reviews_question_id_idx').on(table.questionId),
    createdAtIdx: index('question_reviews_created_at_idx').on(table.createdAt),
  })
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

    earnedXp: integer('earned_xp')
      .default(0)
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userCourseCreatedIdx: index('quiz_history_user_course_created_idx').on(
      table.userId,
      table.courseId,
      table.createdAt
    ),
    createdAtEarnedXpIdx: index('quiz_history_created_at_earned_xp_idx').on(
      table.createdAt,
      table.earnedXp
    ),
  })
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
// CONVERSATION READ STATES
// =====================================================

/*
 * Tracks the last point a user has read in each
 * conversation.
 *
 * This is intentionally separate from conversationsTable
 * because read state belongs to a specific user.
 *
 * Example:
 *
 * Conversation A
 *  ├── User 1 → lastReadAt: 10:30
 *  ├── User 2 → lastReadAt: 10:45
 *  └── User 3 → lastReadAt: 11:00
 *
 * This allows each user to have their own unread count.
 */

export const conversationReadsTable = pgTable(
  'conversation_reads',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    conversationId: uuid('conversation_id')
      .references(() => conversationsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    lastReadAt: timestamp('last_read_at')
      .defaultNow()
      .notNull(),
  },

  (table) => ({
    userConversationUnique: unique(
      'conversation_reads_user_conversation_unique'
    ).on(
      table.userId,
      table.conversationId
    ),
  })
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
      .default('OPEN')
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
  },
  (table) => ({
    userIdIdx: index('support_requests_user_id_idx').on(table.userId),
    statusIdx: index('support_requests_status_idx').on(table.status),
    priorityIdx: index('support_requests_priority_idx').on(table.priority),
    updatedAtIdx: index('support_requests_updated_at_idx').on(table.updatedAt),
  })
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
  },
  (table) => ({
    requestIdIdx: index('support_messages_request_id_idx').on(table.requestId),
    senderIdIdx: index('support_messages_sender_id_idx').on(table.senderId),
  })
);

// =====================================================
// SUPPORT ATTACHMENTS
// =====================================================

export const supportAttachmentsTable = pgTable(
  'support_attachments',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    requestId: uuid('request_id')
      .references(() => supportRequestsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    messageId: uuid('message_id')
      .references(() => supportMessagesTable.id, {
        onDelete: 'cascade',
      }),

    uploadedBy: uuid('uploaded_by')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    fileName: text('file_name')
      .notNull(),

    mimeType: text('mime_type')
      .notNull(),

    size: integer('size')
      .notNull(),

    storageKey: text('storage_key')
      .notNull(),

    url: text('url')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    requestIdIdx: index('support_attachments_request_id_idx').on(table.requestId),
    uploadedByIdx: index('support_attachments_uploaded_by_idx').on(table.uploadedBy),
  })
);

// =====================================================
// AUDIT LOGS
// =====================================================

export const auditLogsTable = pgTable(
  'audit_logs',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    adminUserId: uuid('admin_user_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    action: text('action')
      .notNull(),

    resourceType: text('resource_type')
      .notNull(),

    resourceId: text('resource_id'),

    metadata: jsonb('metadata')
      .default({})
      .notNull(),

    ipAddress: text('ip_address'),

    userAgent: text('user_agent'),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    adminUserIdIdx: index('audit_logs_admin_user_id_idx').on(table.adminUserId),
    actionIdx: index('audit_logs_action_idx').on(table.action),
    resourceTypeIdx: index('audit_logs_resource_type_idx').on(table.resourceType),
    createdAtIdx: index('audit_logs_created_at_idx').on(table.createdAt),
  })
);

// =====================================================
// BROADCAST NOTIFICATIONS
// =====================================================

export const broadcastsTable = pgTable(
  'broadcasts',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    adminUserId: uuid('admin_user_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    title: text('title')
      .notNull(),

    body: text('body')
      .notNull(),

    targetType: text('target_type')
      .notNull(),

    targetFilter: jsonb('target_filter')
      .default({})
      .notNull(),

    recipientCount: integer('recipient_count')
      .default(0)
      .notNull(),

    status: text('status')
      .default('sent')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    sentAt: timestamp('sent_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    adminUserIdIdx: index('broadcasts_admin_user_id_idx').on(table.adminUserId),
    statusIdx: index('broadcasts_status_idx').on(table.status),
    createdAtIdx: index('broadcasts_created_at_idx').on(table.createdAt),
  })
);

// =====================================================
// OTPS (One-Time Passwords)
// =====================================================

export const otpsTable = pgTable(
  'otps',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    identifier: text('identifier')
      .notNull(),

    otpHash: text('otp_hash')
      .notNull(),

    purpose: text('purpose')
      .default('verification')
      .notNull(),

    expiresAt: timestamp('expires_at')
      .notNull(),

    attempts: integer('attempts')
      .default(0)
      .notNull(),

    maxAttempts: integer('max_attempts')
      .default(5)
      .notNull(),

    isUsed: boolean('is_used')
      .default(false)
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    identifierIdx: index('otps_identifier_idx').on(table.identifier),
    purposeIdx: index('otps_purpose_idx').on(table.purpose),
    isUsedIdx: index('otps_is_used_idx').on(table.isUsed),
    expiresAtIdx: index('otps_expires_at_idx').on(table.expiresAt),
  })
);

// =====================================================
// USER FEEDBACK & RESEARCH (BB-03)
// =====================================================

export const feedbackTable = pgTable(
  'feedback',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    surveyVersion: text('survey_version')
      .default('1.0')
      .notNull(),

    overallSatisfaction: integer('overall_satisfaction')
      .notNull(),

    usageFrequency: text('usage_frequency')
      .notNull(),

    contentAccuracyRating: integer('content_accuracy_rating')
      .notNull(),

    fairnessRating: integer('fairness_rating')
      .notNull(),

    technicalFrictions: jsonb('technical_frictions')
      .$type<string[]>()
      .default([])
      .notNull(),

    frictionDetails: text('friction_details'),

    featureRatings: jsonb('feature_ratings')
      .$type<Record<string, number>>()
      .default({})
      .notNull(),

    structuredAnswers: jsonb('structured_answers')
      .$type<{
        usageFrequency: string;
        featuresEvaluated: string[];
        courseDiscoveryScore: number;
        cbtSessionExperience: string;
        answerReviewScore: number;
        progressTrackingScore: number;
        technicalFrictions: string[];
        frictionDetails?: string | null;
        contentAccuracyScore: number;
        competitionFairnessScore: number;
        overallSatisfaction: number;
        featuresNotUsed: string[];
      }>()
      .notNull(),

    suggestions: text('suggestions'),

    academicContext: jsonb('academic_context')
      .$type<{
        facultyId: string | null;
        departmentId: string | null;
        level: number | null;
      }>()
      .default({
        facultyId: null,
        departmentId: null,
        level: null,
      })
      .notNull(),

    clientMetadata: jsonb('client_metadata')
      .$type<{
        appVersion: string;
        platform: 'android' | 'ios' | 'other';
        deviceModel?: string;
      }>()
      .default({
        appVersion: '1.0.0',
        platform: 'android',
      })
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userSurveyVersionUnique: unique('feedback_user_survey_unique').on(
      table.userId,
      table.surveyVersion
    ),
    surveyVersionIdx: index('feedback_survey_version_idx').on(table.surveyVersion),
    createdAtIdx: index('feedback_created_at_idx').on(table.createdAt),
    satisfactionIdx: index('feedback_satisfaction_idx').on(table.overallSatisfaction),
    userIdIdx: index('feedback_user_id_idx').on(table.userId),
  })
);

// =====================================================
// LECTURER COURSE ASSIGNMENTS (BB-07B)
// =====================================================

export const ASSIGNMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  INACTIVE: 'INACTIVE',
} as const;

export type AssignmentStatus = (typeof ASSIGNMENT_STATUS)[keyof typeof ASSIGNMENT_STATUS];

export const courseAssignmentsTable = pgTable(
  'course_assignments',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    lecturerId: uuid('lecturer_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    courseId: uuid('course_id')
      .references(() => coursesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    academicSession: text('academic_session')
      .notNull(),

    semester: text('semester')
      .notNull(),

    status: text('status')
      .default('ACTIVE')
      .notNull(),

    assignedBy: uuid('assigned_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    lecturerCourseSessionSemesterIdx: index('course_assignments_lecturer_course_session_semester_idx').on(
      table.lecturerId,
      table.courseId,
      table.academicSession,
      table.semester
    ),
    lecturerIdIdx: index('course_assignments_lecturer_id_idx').on(table.lecturerId),
    courseIdIdx: index('course_assignments_course_id_idx').on(table.courseId),
    statusIdx: index('course_assignments_status_idx').on(table.status),
    uniqueActiveAssignment: unique('course_assignments_lecturer_course_session_semester_unique').on(
      table.lecturerId,
      table.courseId,
      table.academicSession,
      table.semester
    ),
  })
);

// =====================================================
// ACADEMIC COURSE OFFERINGS & ENROLMENTS (BB-07F.2)
// =====================================================

export const OFFERING_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type OfferingStatus = (typeof OFFERING_STATUS)[keyof typeof OFFERING_STATUS];

export const ENROLLMENT_STATUS = {
  ENROLLED: 'ENROLLED',
  DROPPED: 'DROPPED',
  COMPLETED: 'COMPLETED',
  SUSPENDED: 'SUSPENDED',
} as const;

export type EnrollmentStatus = (typeof ENROLLMENT_STATUS)[keyof typeof ENROLLMENT_STATUS];

export const ENROLLMENT_SOURCE = {
  ADMIN_MANUAL: 'ADMIN_MANUAL',
  ADMIN_IMPORT: 'ADMIN_IMPORT',
  STUDENT_SELF: 'STUDENT_SELF',
  SYSTEM: 'SYSTEM',
} as const;

export type EnrollmentSource = (typeof ENROLLMENT_SOURCE)[keyof typeof ENROLLMENT_SOURCE];

export const OFFERING_LECTURER_ROLE = {
  PRIMARY: 'PRIMARY',
  CO_LECTURER: 'CO_LECTURER',
  ASSISTANT: 'ASSISTANT',
} as const;

export type OfferingLecturerRole = (typeof OFFERING_LECTURER_ROLE)[keyof typeof OFFERING_LECTURER_ROLE];

export const courseOfferingsTable = pgTable(
  'course_offerings',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    courseId: uuid('course_id')
      .references(() => coursesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    academicSession: text('academic_session')
      .notNull(),

    semester: text('semester')
      .notNull(),

    level: integer('level')
      .notNull(),

    section: text('section')
      .default('DEFAULT')
      .notNull(),

    status: text('status')
      .default('ACTIVE')
      .notNull(),

    maxCapacity: integer('max_capacity'),

    createdBy: uuid('created_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseSessionSemesterSectionUnique: unique('course_offerings_course_session_semester_section_unique').on(
      table.courseId,
      table.academicSession,
      table.semester,
      table.section
    ),
    courseSessionSemesterIdx: index('course_offerings_course_session_semester_idx').on(
      table.courseId,
      table.academicSession,
      table.semester
    ),
    courseIdIdx: index('course_offerings_course_id_idx').on(table.courseId),
    statusIdx: index('course_offerings_status_idx').on(table.status),
    academicSessionIdx: index('course_offerings_academic_session_idx').on(table.academicSession),
  })
);

export const offeringLecturersTable = pgTable(
  'offering_lecturers',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    lecturerId: uuid('lecturer_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    role: text('role')
      .default('PRIMARY')
      .notNull(),

    status: text('status')
      .default('ACTIVE')
      .notNull(),

    assignedBy: uuid('assigned_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    assignedAt: timestamp('assigned_at')
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    offeringLecturerUnique: unique('offering_lecturers_offering_lecturer_unique').on(
      table.offeringId,
      table.lecturerId
    ),
    offeringIdIdx: index('offering_lecturers_offering_id_idx').on(table.offeringId),
    lecturerIdIdx: index('offering_lecturers_lecturer_id_idx').on(table.lecturerId),
    statusIdx: index('offering_lecturers_status_idx').on(table.status),
  })
);

export const studentEnrollmentsTable = pgTable(
  'student_enrollments',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    status: text('status')
      .default('ENROLLED')
      .notNull(),

    source: text('source')
      .default('ADMIN_MANUAL')
      .notNull(),

    enrolledBy: uuid('enrolled_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    enrolledAt: timestamp('enrolled_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),

    droppedAt: timestamp('dropped_at'),
  },
  (table) => ({
    studentOfferingUnique: unique('student_enrollments_student_offering_unique').on(
      table.studentId,
      table.offeringId
    ),
    studentIdIdx: index('student_enrollments_student_id_idx').on(table.studentId),
    offeringIdIdx: index('student_enrollments_offering_id_idx').on(table.offeringId),
    statusIdx: index('student_enrollments_status_idx').on(table.status),
    studentOfferingStatusIdx: index('student_enrollments_student_offering_status_idx').on(
      table.studentId,
      table.offeringId,
      table.status
    ),
  })
);

// =====================================================
// ASSESSMENTS & ACADEMIC EVALUATIONS (BB-07F.4)
// =====================================================

export const ASSESSMENT_TYPES = {
  CBT: 'CBT',
  THEORY: 'THEORY',
  MIXED: 'MIXED',
  ASSIGNMENT: 'ASSIGNMENT',
} as const;

export type AssessmentType = (typeof ASSESSMENT_TYPES)[keyof typeof ASSESSMENT_TYPES];

export const ASSESSMENT_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  CANCELLED: 'CANCELLED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type AssessmentStatus = (typeof ASSESSMENT_STATUS)[keyof typeof ASSESSMENT_STATUS];

export const RESULT_RELEASE_POLICY = {
  IMMEDIATE: 'IMMEDIATE',
  SCHEDULED: 'SCHEDULED',
  MANUAL_AFTER_GRADING: 'MANUAL_AFTER_GRADING',
} as const;

export type ResultReleasePolicy =
  (typeof RESULT_RELEASE_POLICY)[keyof typeof RESULT_RELEASE_POLICY];

export const RESULTS_PUBLICATION_STATUS = {
  GRADING_IN_PROGRESS: 'GRADING_IN_PROGRESS',
  SUBMITTED_FOR_APPROVAL: 'SUBMITTED_FOR_APPROVAL',
  APPROVED: 'APPROVED',
  PUBLISHED: 'PUBLISHED',
  REJECTED: 'REJECTED',
} as const;

export type ResultsPublicationStatus =
  (typeof RESULTS_PUBLICATION_STATUS)[keyof typeof RESULTS_PUBLICATION_STATUS];

export interface QuestionSnapshot {
  type: string;
  question: string;
  options: string[] | null;
  correctAnswer: string;
  gradingPoints: Array<{ concept: string; weight: number; aliases?: string[] }>;
  explanation?: string | null;
  imageUrl?: string | null;
  points: number;
}

export const assessmentsTable = pgTable(
  'assessments',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    courseId: uuid('course_id')
      .references(() => coursesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    creatorLecturerId: uuid('creator_lecturer_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    title: text('title')
      .notNull(),

    description: text('description'),

    type: text('type')
      .default('CBT')
      .notNull(), // 'CBT' | 'THEORY' | 'MIXED' | 'ASSIGNMENT'

    status: text('status')
      .default('DRAFT')
      .notNull(), // 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'ARCHIVED'

    totalMarks: real('total_marks')
      .default(0)
      .notNull(),

    passMarks: real('pass_marks'),

    durationMinutes: integer('duration_minutes')
      .notNull(),

    startTime: timestamp('start_time', { withTimezone: true })
      .notNull(),

    endTime: timestamp('end_time', { withTimezone: true })
      .notNull(),

    maxAttempts: integer('max_attempts')
      .default(1)
      .notNull(),

    isRandomized: boolean('is_randomized')
      .default(false)
      .notNull(),

    allowLateSubmission: boolean('allow_late_submission')
      .default(false)
      .notNull(),

    lateSubmissionDeadline: timestamp('late_submission_deadline', { withTimezone: true }),

    resultReleasePolicy: text('result_release_policy')
      .default('MANUAL_AFTER_GRADING')
      .notNull(),

    resultsReleasedAt: timestamp('results_released_at', { withTimezone: true }),

    resultsPublicationStatus: text('results_publication_status')
      .default('GRADING_IN_PROGRESS')
      .notNull(),

    resultsSubmittedAt: timestamp('results_submitted_at', { withTimezone: true }),

    resultsSubmittedBy: uuid('results_submitted_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    resultsApprovedAt: timestamp('results_approved_at', { withTimezone: true }),

    resultsApprovedBy: uuid('results_approved_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    resultsRejectedAt: timestamp('results_rejected_at', { withTimezone: true }),

    resultsRejectedBy: uuid('results_rejected_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    resultsRejectionReason: text('results_rejection_reason'),

    resultsPublishedAt: timestamp('results_published_at', { withTimezone: true }),

    resultsPublishedBy: uuid('results_published_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    publishedAt: timestamp('published_at', { withTimezone: true }),

    publishedBy: uuid('published_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    cancelledAt: timestamp('cancelled_at', { withTimezone: true }),

    cancellationReason: text('cancellation_reason'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    offeringIdIdx: index('assessments_offering_id_idx').on(table.offeringId),
    courseIdIdx: index('assessments_course_id_idx').on(table.courseId),
    creatorLecturerIdx: index('assessments_creator_lecturer_idx').on(table.creatorLecturerId),
    statusIdx: index('assessments_status_idx').on(table.status),
    scheduleIdx: index('assessments_schedule_idx').on(table.startTime, table.endTime),
    resultsStatusIdx: index('assessments_results_status_idx').on(table.offeringId, table.resultsPublicationStatus),
  })
);

export const assessmentQuestionsTable = pgTable(
  'assessment_questions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    assessmentId: uuid('assessment_id')
      .references(() => assessmentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    questionId: uuid('question_id')
      .references(() => questionsTable.id, {
        onDelete: 'restrict',
      })
      .notNull(),

    questionVersion: integer('question_version')
      .default(1)
      .notNull(),

    orderIndex: integer('order_index')
      .default(0)
      .notNull(),

    allocatedMarks: real('allocated_marks')
      .default(1)
      .notNull(),

    snapshot: jsonb('snapshot')
      .$type<QuestionSnapshot>(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    assessmentQuestionUnique: unique('assessment_questions_unique').on(
      table.assessmentId,
      table.questionId
    ),
    assessmentOrderIdx: index('assessment_questions_order_idx').on(
      table.assessmentId,
      table.orderIndex
    ),
  })
);

export const assessmentAuditLogsTable = pgTable(
  'assessment_audit_logs',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    assessmentId: uuid('assessment_id')
      .references(() => assessmentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    actorId: uuid('actor_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    actorRole: text('actor_role')
      .notNull(), // 'LECTURER' | 'SUPER_ADMIN' | 'SYSTEM'

    action: text('action')
      .notNull(),

    previousState: jsonb('previous_state'),

    newState: jsonb('new_state'),

    reason: text('reason'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    assessmentAuditAssessmentIdx: index('assessment_audit_logs_assessment_idx').on(
      table.assessmentId
    ),
    assessmentAuditActorIdx: index('assessment_audit_logs_actor_idx').on(table.actorId),
  })
);

// =====================================================
// ASSESSMENT PARTICIPATION & ATTEMPTS (BB-07F.5)
// =====================================================

export const ATTEMPT_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  SUBMITTED: 'SUBMITTED',
  TIMED_OUT: 'TIMED_OUT',
  CANCELLED: 'CANCELLED',
} as const;

export type AttemptStatus = (typeof ATTEMPT_STATUS)[keyof typeof ATTEMPT_STATUS];

export const assessmentAttemptsTable = pgTable(
  'assessment_attempts',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    assessmentId: uuid('assessment_id')
      .references(() => assessmentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    attemptNumber: integer('attempt_number')
      .default(1)
      .notNull(),

    status: text('status')
      .default('IN_PROGRESS')
      .notNull(), // 'IN_PROGRESS' | 'SUBMITTED' | 'TIMED_OUT' | 'CANCELLED'

    startedAt: timestamp('started_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    submittedAt: timestamp('submitted_at', { withTimezone: true }),

    expiresAt: timestamp('expires_at', { withTimezone: true })
      .notNull(),

    lastHeartbeatAt: timestamp('last_heartbeat_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    isLate: boolean('is_late')
      .default(false)
      .notNull(),

    clientIp: text('client_ip'),

    userAgent: text('user_agent'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attemptAssessmentStudentUnique: unique('assessment_attempts_unique').on(
      table.assessmentId,
      table.studentId,
      table.attemptNumber
    ),
    attemptAssessmentIdx: index('assessment_attempts_assessment_idx').on(table.assessmentId),
    attemptStudentIdx: index('assessment_attempts_student_idx').on(table.studentId),
    attemptStatusIdx: index('assessment_attempts_status_idx').on(table.status),
    attemptAssessmentStudentIdx: index('assessment_attempts_assessment_student_idx').on(
      table.assessmentId,
      table.studentId
    ),
  })
);

export const assessmentAnswersTable = pgTable(
  'assessment_answers',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    attemptId: uuid('attempt_id')
      .references(() => assessmentAttemptsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    assessmentQuestionId: uuid('assessment_question_id')
      .references(() => assessmentQuestionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    questionId: uuid('question_id')
      .references(() => questionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    answer: text('answer'),

    isFlagged: boolean('is_flagged')
      .default(false)
      .notNull(),

    clientVersion: integer('client_version')
      .default(1)
      .notNull(),

    savedAt: timestamp('saved_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attemptQuestionUnique: unique('assessment_answers_unique').on(
      table.attemptId,
      table.assessmentQuestionId
    ),
    answerAttemptIdx: index('assessment_answers_attempt_idx').on(table.attemptId),
    answerQuestionIdx: index('assessment_answers_question_idx').on(table.assessmentQuestionId),
  })
);

export const assessmentAttemptEventsTable = pgTable(
  'assessment_attempt_events',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    attemptId: uuid('attempt_id')
      .references(() => assessmentAttemptsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    eventType: text('event_type')
      .notNull(), // 'ATTEMPT_STARTED' | 'HEARTBEAT' | 'ANSWER_SAVED' | 'ATTEMPT_SUBMITTED' | 'ATTEMPT_TIMED_OUT' | 'FORCE_SUBMITTED'

    eventData: jsonb('event_data'),

    clientTimestamp: timestamp('client_timestamp', { withTimezone: true }),

    serverTimestamp: timestamp('server_timestamp', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attemptEventsAttemptIdx: index('assessment_attempt_events_attempt_idx').on(table.attemptId),
    attemptEventsTypeIdx: index('assessment_attempt_events_type_idx').on(table.eventType),
  })
);

// =====================================================
// FORMAL ASSESSMENT GRADING & RUBRIC EVALUATION (BB-07F.6)
// =====================================================

export const GRADING_STATUS = {
  PENDING_GRADING: 'PENDING_GRADING',
  AUTO_GRADED: 'AUTO_GRADED',
  NEEDS_THEORY_GRADING: 'NEEDS_THEORY_GRADING',
  PARTIALLY_GRADED: 'PARTIALLY_GRADED',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

export type GradingStatus = (typeof GRADING_STATUS)[keyof typeof GRADING_STATUS];

export const GRADING_METHOD = {
  AUTO_CBT: 'AUTO_CBT',
  MANUAL_RUBRIC: 'MANUAL_RUBRIC',
  AI_ASSISTED_MANUAL: 'AI_ASSISTED_MANUAL',
} as const;

export type GradingMethodType = (typeof GRADING_METHOD)[keyof typeof GRADING_METHOD];

export interface RubricScoreItem {
  concept: string;
  maxWeight: number;
  awardedWeight: number;
  comment?: string;
}

export const assessmentGradesTable = pgTable(
  'assessment_grades',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    attemptId: uuid('attempt_id')
      .references(() => assessmentAttemptsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    assessmentId: uuid('assessment_id')
      .references(() => assessmentsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    cbtScore: real('cbt_score')
      .default(0)
      .notNull(),

    theoryScore: real('theory_score')
      .default(0)
      .notNull(),

    totalScore: real('total_score')
      .default(0)
      .notNull(),

    maxPossibleScore: real('max_possible_score')
      .default(0)
      .notNull(),

    percentage: real('percentage')
      .default(0)
      .notNull(),

    isPassing: boolean('is_passing'),

    status: text('status')
      .default('PENDING_GRADING')
      .notNull(), // 'PENDING_GRADING' | 'AUTO_GRADED' | 'NEEDS_THEORY_GRADING' | 'PARTIALLY_GRADED' | 'COMPLETED' | 'FAILED'

    cbtGradedAt: timestamp('cbt_graded_at', { withTimezone: true }),

    theoryGradedAt: timestamp('theory_graded_at', { withTimezone: true }),

    finalGradedAt: timestamp('final_graded_at', { withTimezone: true }),

    gradedBy: uuid('graded_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    isModerated: boolean('is_moderated')
      .default(false)
      .notNull(),

    moderatedBy: uuid('moderated_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    moderatedAt: timestamp('moderated_at', { withTimezone: true }),

    moderationNotes: text('moderation_notes'),

    isFlaggedForReview: boolean('is_flagged_for_review')
      .default(false)
      .notNull(),

    flagReason: text('flag_reason'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    gradeAttemptUnique: unique('assessment_grades_attempt_unique').on(table.attemptId),
    gradeAssessmentIdx: index('assessment_grades_assessment_idx').on(table.assessmentId),
    gradeStudentIdx: index('assessment_grades_student_idx').on(table.studentId),
    gradeStatusIdx: index('assessment_grades_status_idx').on(table.status),
  })
);

export const assessmentQuestionGradesTable = pgTable(
  'assessment_question_grades',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    attemptId: uuid('attempt_id')
      .references(() => assessmentAttemptsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    assessmentQuestionId: uuid('assessment_question_id')
      .references(() => assessmentQuestionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    answerId: uuid('answer_id')
      .references(() => assessmentAnswersTable.id, {
        onDelete: 'set null',
      }),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    questionType: text('question_type')
      .notNull(), // 'cbt' | 'theory' | 'multiple_choice' | 'boolean' etc.

    maxMarks: real('max_marks')
      .default(1)
      .notNull(),

    awardedMarks: real('awarded_marks')
      .default(0)
      .notNull(),

    isCorrect: boolean('is_correct'),

    gradingMethod: text('grading_method')
      .default('AUTO_CBT')
      .notNull(), // 'AUTO_CBT' | 'MANUAL_RUBRIC' | 'AI_ASSISTED_MANUAL'

    rubricScores: jsonb('rubric_scores')
      .$type<RubricScoreItem[]>(),

    feedback: text('feedback'),

    gradedBy: uuid('graded_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    isModerated: boolean('is_moderated')
      .default(false)
      .notNull(),

    moderatedBy: uuid('moderated_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    moderatedAt: timestamp('moderated_at', { withTimezone: true }),

    moderationNotes: text('moderation_notes'),

    isFlaggedForReview: boolean('is_flagged_for_review')
      .default(false)
      .notNull(),

    flagReason: text('flag_reason'),

    gradedAt: timestamp('graded_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    questionGradeUnique: unique('assessment_question_grades_unique').on(
      table.attemptId,
      table.assessmentQuestionId
    ),
    questionGradeAttemptIdx: index('assessment_question_grades_attempt_idx').on(table.attemptId),
    questionGradeQuestionIdx: index('assessment_question_grades_question_idx').on(
      table.assessmentQuestionId
    ),
  })
);

export const assessmentGradingAuditLogsTable = pgTable(
  'assessment_grading_audit_logs',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    assessmentId: uuid('assessment_id')
      .references(() => assessmentsTable.id, {
        onDelete: 'cascade',
      }),

    attemptId: uuid('attempt_id')
      .references(() => assessmentAttemptsTable.id, {
        onDelete: 'cascade',
      }),

    assessmentQuestionId: uuid('assessment_question_id')
      .references(() => assessmentQuestionsTable.id, {
        onDelete: 'set null',
      }),

    actorId: uuid('actor_id')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    actorRole: text('actor_role')
      .default('LECTURER')
      .notNull(), // 'LECTURER' | 'ADMIN' | 'SYSTEM'

    action: text('action')
      .notNull(), // 'CBT_AUTO_GRADED' | 'THEORY_GRADED' | 'GRADE_OVERRIDE' | 'FEEDBACK_UPDATED' | 'RE_EVALUATED' | 'GRADE_MODERATED' | 'FLAGGED_FOR_REVIEW' | 'FLAG_CLEARED' | 'SUBMITTED_FOR_APPROVAL' | 'RESULTS_APPROVED' | 'RESULTS_REJECTED' | 'RESULTS_PUBLISHED'

    previousScore: real('previous_score'),

    newScore: real('new_score'),

    previousStatus: text('previous_status'),

    newStatus: text('new_status'),

    reason: text('reason'),

    metadata: jsonb('metadata'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    gradingAuditAssessmentIdx: index('assessment_grading_audit_assessment_idx').on(table.assessmentId),
    gradingAuditAttemptIdx: index('assessment_grading_audit_attempt_idx').on(table.attemptId),
    gradingAuditActorIdx: index('assessment_grading_audit_actor_idx').on(table.actorId),
  })
);

// =====================================================
// ATTENDANCE MANAGEMENT (BB-07G)
// =====================================================

export const ATTENDANCE_SESSION_TYPES = {
  LECTURE: 'LECTURE',
  LAB: 'LAB',
  TUTORIAL: 'TUTORIAL',
  SEMINAR: 'SEMINAR',
  PRACTICAL: 'PRACTICAL',
} as const;

export type AttendanceSessionType = (typeof ATTENDANCE_SESSION_TYPES)[keyof typeof ATTENDANCE_SESSION_TYPES];

export const ATTENDANCE_SESSION_STATUSES = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  CANCELLED: 'CANCELLED',
} as const;

export type AttendanceSessionStatus = (typeof ATTENDANCE_SESSION_STATUSES)[keyof typeof ATTENDANCE_SESSION_STATUSES];

export const ATTENDANCE_RECORD_STATUSES = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED',
} as const;

export type AttendanceRecordStatus = (typeof ATTENDANCE_RECORD_STATUSES)[keyof typeof ATTENDANCE_RECORD_STATUSES];

export const attendanceSessionsTable = pgTable(
  'attendance_sessions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    createdBy: uuid('created_by')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    title: text('title')
      .notNull(),

    sessionType: text('session_type')
      .default('LECTURE')
      .notNull(),

    sessionDate: timestamp('session_date', { withTimezone: true })
      .notNull(),

    startTime: text('start_time'),

    endTime: text('end_time'),

    status: text('status')
      .default('OPEN')
      .notNull(),

    notes: text('notes'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attendanceSessionsOfferingIdx: index('attendance_sessions_offering_idx').on(table.offeringId),
    attendanceSessionsDateIdx: index('attendance_sessions_date_idx').on(table.sessionDate),
    attendanceSessionsStatusIdx: index('attendance_sessions_status_idx').on(table.status),
  })
);

export const attendanceRecordsTable = pgTable(
  'attendance_records',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    sessionId: uuid('session_id')
      .references(() => attendanceSessionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    status: text('status')
      .default('PRESENT')
      .notNull(),

    remarks: text('remarks'),

    markedBy: uuid('marked_by')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    markedAt: timestamp('marked_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedBy: uuid('updated_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attendanceRecordsSessionStudentUnique: unique('attendance_records_session_student_unique').on(
      table.sessionId,
      table.studentId
    ),
    attendanceRecordsSessionIdx: index('attendance_records_session_idx').on(table.sessionId),
    attendanceRecordsStudentIdx: index('attendance_records_student_idx').on(table.studentId),
    attendanceRecordsStatusIdx: index('attendance_records_status_idx').on(table.status),
  })
);

export const attendanceAuditLogsTable = pgTable(
  'attendance_audit_logs',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    recordId: uuid('record_id')
      .references(() => attendanceRecordsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    sessionId: uuid('session_id')
      .references(() => attendanceSessionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    studentId: uuid('student_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    previousStatus: text('previous_status')
      .notNull(),

    newStatus: text('new_status')
      .notNull(),

    reason: text('reason')
      .notNull(),

    performedBy: uuid('performed_by')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    attendanceAuditRecordIdx: index('attendance_audit_logs_record_idx').on(table.recordId),
    attendanceAuditSessionIdx: index('attendance_audit_logs_session_idx').on(table.sessionId),
    attendanceAuditStudentIdx: index('attendance_audit_logs_student_idx').on(table.studentId),
  })
);

// =====================================================
// COURSE MATERIALS & LEARNING RESOURCES (BB-07H)
// =====================================================

export const COURSE_MATERIAL_CATEGORIES = {
  LECTURE_NOTE: 'LECTURE_NOTE',
  SYLLABUS: 'SYLLABUS',
  SLIDE: 'SLIDE',
  ASSIGNMENT_BRIEF: 'ASSIGNMENT_BRIEF',
  LAB_MANUAL: 'LAB_MANUAL',
  READING: 'READING',
  OTHER: 'OTHER',
} as const;

export type CourseMaterialCategory = (typeof COURSE_MATERIAL_CATEGORIES)[keyof typeof COURSE_MATERIAL_CATEGORIES];

export const COURSE_MATERIAL_STATUSES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type CourseMaterialStatus = (typeof COURSE_MATERIAL_STATUSES)[keyof typeof COURSE_MATERIAL_STATUSES];

export const courseMaterialsTable = pgTable(
  'course_materials',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    uploadedBy: uuid('uploaded_by')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    title: text('title')
      .notNull(),

    description: text('description'),

    category: text('category')
      .default('LECTURE_NOTE')
      .notNull(),

    status: text('status')
      .default('PUBLISHED')
      .notNull(),

    originalFileName: text('original_file_name')
      .notNull(),

    fileSizeBytes: integer('file_size_bytes')
      .notNull(),

    mimeType: text('mime_type')
      .notNull(),

    storageKey: text('storage_key')
      .notNull(),

    downloadCount: integer('download_count')
      .default(0)
      .notNull(),

    publishedAt: timestamp('published_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseMaterialsOfferingIdx: index('course_materials_offering_idx').on(table.offeringId),
    courseMaterialsStatusIdx: index('course_materials_status_idx').on(table.status),
    courseMaterialsCategoryIdx: index('course_materials_category_idx').on(table.category),
  })
);

// =====================================================
// OPPORTUNITY HUB & CAMPUS ENGAGEMENT (BB-06)
// =====================================================

export const OPPORTUNITY_CATEGORIES = {
  SCHOLARSHIPS: 'SCHOLARSHIPS',
  ORGANISATIONS: 'ORGANISATIONS',
  TUTORIALS: 'TUTORIALS',
} as const;

export type OpportunityCategory =
  (typeof OPPORTUNITY_CATEGORIES)[keyof typeof OPPORTUNITY_CATEGORIES];

export const OPPORTUNITY_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type OpportunityStatus =
  (typeof OPPORTUNITY_STATUS)[keyof typeof OPPORTUNITY_STATUS];

export const OPPORTUNITY_VERIFICATION_STATUS = {
  VERIFIED: 'VERIFIED',
  COMMUNITY_SUBMITTED: 'COMMUNITY_SUBMITTED',
  UNVERIFIED: 'UNVERIFIED',
} as const;

export type OpportunityVerificationStatus =
  (typeof OPPORTUNITY_VERIFICATION_STATUS)[keyof typeof OPPORTUNITY_VERIFICATION_STATUS];

export const opportunitiesTable = pgTable(
  'opportunities',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    slug: text('slug')
      .notNull()
      .unique(),

    category: text('category')
      .notNull(),

    title: text('title')
      .notNull(),

    organization: text('organization')
      .notNull(),

    shortDescription: text('short_description')
      .notNull(),

    fullDescription: text('full_description')
      .notNull(),

    requirements: text('requirements'),

    benefits: text('benefits'),

    applicationUrl: text('application_url'),

    contactEmail: text('contact_email'),

    contactPhone: text('contact_phone'),

    logoUrl: text('logo_url'),

    bannerUrl: text('banner_url'),

    deadline: timestamp('deadline', { withTimezone: true }),

    status: text('status')
      .default(OPPORTUNITY_STATUS.DRAFT)
      .notNull(),

    verificationStatus: text('verification_status')
      .default(OPPORTUNITY_VERIFICATION_STATUS.UNVERIFIED)
      .notNull(),

    isFeatured: boolean('is_featured')
      .default(false)
      .notNull(),

    targetAudience: jsonb('target_audience')
      .$type<{
        isAll?: boolean;
        facultyIds?: string[];
        departmentIds?: string[];
        levels?: number[];
      }>()
      .default({ isAll: true })
      .notNull(),

    clicksCount: integer('clicks_count')
      .default(0)
      .notNull(),

    createdBy: uuid('created_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    updatedBy: uuid('updated_by')
      .references(() => usersTable.id, {
        onDelete: 'set null',
      }),

    publishedAt: timestamp('published_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    opportunitiesCategoryIdx: index('opportunities_category_idx').on(table.category),
    opportunitiesStatusIdx: index('opportunities_status_idx').on(table.status),
    opportunitiesPublishedAtIdx: index('opportunities_published_at_idx').on(table.publishedAt),
    opportunitiesDeadlineIdx: index('opportunities_deadline_idx').on(table.deadline),
    opportunitiesFeaturedIdx: index('opportunities_is_featured_idx').on(table.isFeatured),
  })
);

export const opportunitySubscriptionsTable = pgTable(
  'opportunity_subscriptions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    category: text('category')
      .notNull(),

    isEnabled: boolean('is_enabled')
      .default(true)
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    opportunitySubUserCategoryUnique: unique('opportunity_sub_user_category_unique').on(
      table.userId,
      table.category
    ),
    opportunitySubUserIdx: index('opportunity_sub_user_idx').on(table.userId),
  })
);

export const opportunityBookmarksTable = pgTable(
  'opportunity_bookmarks',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    opportunityId: uuid('opportunity_id')
      .references(() => opportunitiesTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    opportunityBookmarkUserOppUnique: unique('opportunity_bookmark_user_opp_unique').on(
      table.userId,
      table.opportunityId
    ),
    opportunityBookmarkUserIdx: index('opportunity_bookmark_user_idx').on(table.userId),
  })
);

export type Opportunity = typeof opportunitiesTable.$inferSelect;
export type NewOpportunity = typeof opportunitiesTable.$inferInsert;
export type OpportunitySubscription = typeof opportunitySubscriptionsTable.$inferSelect;
export type NewOpportunitySubscription = typeof opportunitySubscriptionsTable.$inferInsert;
export type OpportunityBookmark = typeof opportunityBookmarksTable.$inferSelect;
export type NewOpportunityBookmark = typeof opportunityBookmarksTable.$inferInsert;

// =====================================================
// COURSE ANNOUNCEMENTS & DISCUSSIONS ENGINE (BB-07I)
// =====================================================

export const ANNOUNCEMENT_PRIORITIES = {
  NORMAL: 'NORMAL',
  IMPORTANT: 'IMPORTANT',
  URGENT: 'URGENT',
} as const;

export type AnnouncementPriority =
  (typeof ANNOUNCEMENT_PRIORITIES)[keyof typeof ANNOUNCEMENT_PRIORITIES];

export const ANNOUNCEMENT_STATUSES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;

export type AnnouncementStatus =
  (typeof ANNOUNCEMENT_STATUSES)[keyof typeof ANNOUNCEMENT_STATUSES];

export const courseAnnouncementsTable = pgTable(
  'course_announcements',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    lecturerId: uuid('lecturer_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    title: text('title')
      .notNull(),

    content: text('content')
      .notNull(),

    priority: text('priority')
      .default(ANNOUNCEMENT_PRIORITIES.NORMAL)
      .notNull(),

    status: text('status')
      .default(ANNOUNCEMENT_STATUSES.PUBLISHED)
      .notNull(),

    attachmentUrl: text('attachment_url'),

    attachmentName: text('attachment_name'),

    publishedAt: timestamp('published_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseAnnouncementsOfferingIdx: index('course_announcements_offering_idx').on(table.offeringId),
    courseAnnouncementsStatusIdx: index('course_announcements_status_idx').on(table.status),
    courseAnnouncementsPriorityIdx: index('course_announcements_priority_idx').on(table.priority),
  })
);

export const courseDiscussionsTable = pgTable(
  'course_discussions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    offeringId: uuid('offering_id')
      .references(() => courseOfferingsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    announcementId: uuid('announcement_id')
      .references(() => courseAnnouncementsTable.id, {
        onDelete: 'cascade',
      }),

    authorId: uuid('author_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    authorRole: text('author_role')
      .notNull(), // 'LECTURER' | 'STUDENT'

    title: text('title')
      .notNull(),

    content: text('content')
      .notNull(),

    isPinned: boolean('is_pinned')
      .default(false)
      .notNull(),

    isLocked: boolean('is_locked')
      .default(false)
      .notNull(),

    replyCount: integer('reply_count')
      .default(0)
      .notNull(),

    lastActivityAt: timestamp('last_activity_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseDiscussionsOfferingIdx: index('course_discussions_offering_idx').on(table.offeringId),
    courseDiscussionsAnnouncementIdx: index('course_discussions_announcement_idx').on(table.announcementId),
    courseDiscussionsPinnedIdx: index('course_discussions_pinned_idx').on(table.isPinned),
    courseDiscussionsLastActivityIdx: index('course_discussions_last_activity_idx').on(table.lastActivityAt),
  })
);

export const courseDiscussionRepliesTable = pgTable(
  'course_discussion_replies',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    discussionId: uuid('discussion_id')
      .references(() => courseDiscussionsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    authorId: uuid('author_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    authorRole: text('author_role')
      .notNull(), // 'LECTURER' | 'STUDENT'

    content: text('content')
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    courseDiscussionRepliesDiscussionIdx: index('course_discussion_replies_discussion_idx').on(table.discussionId),
  })
);

export type CourseAnnouncement = typeof courseAnnouncementsTable.$inferSelect;
export type NewCourseAnnouncement = typeof courseAnnouncementsTable.$inferInsert;
export type CourseDiscussion = typeof courseDiscussionsTable.$inferSelect;
export type NewCourseDiscussion = typeof courseDiscussionsTable.$inferInsert;
export type CourseDiscussionReply = typeof courseDiscussionRepliesTable.$inferSelect;
export type NewCourseDiscussionReply = typeof courseDiscussionRepliesTable.$inferInsert;

// =====================================================
// BB-05B: PAYMENT CONSTANTS & ENUMS
// =====================================================

export const PAYMENT_ORDER_STATUS = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  ABANDONED: 'ABANDONED',
} as const;

export type PaymentOrderStatus = (typeof PAYMENT_ORDER_STATUS)[keyof typeof PAYMENT_ORDER_STATUS];

export const PAYMENT_TRANSACTION_STATUS = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  PENDING: 'PENDING',
  ABANDONED: 'ABANDONED',
  REVERSED: 'REVERSED',
} as const;

export type PaymentTransactionStatus = (typeof PAYMENT_TRANSACTION_STATUS)[keyof typeof PAYMENT_TRANSACTION_STATUS];

export const ENTITLEMENT_STATUS = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
  SUSPENDED: 'SUSPENDED',
} as const;

export type EntitlementStatus = (typeof ENTITLEMENT_STATUS)[keyof typeof ENTITLEMENT_STATUS];

export const WEBHOOK_PROCESSING_STATUS = {
  PENDING: 'PENDING',
  PROCESSED: 'PROCESSED',
  IGNORED: 'IGNORED',
  FAILED: 'FAILED',
  DUPLICATE: 'DUPLICATE',
} as const;

export type WebhookProcessingStatus = (typeof WEBHOOK_PROCESSING_STATUS)[keyof typeof WEBHOOK_PROCESSING_STATUS];

export const PAYMENT_GATEWAY = {
  PAYSTACK: 'PAYSTACK',
} as const;

export type PaymentGateway = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];

// =====================================================
// PAYMENT ORDERS
// =====================================================

export const paymentOrdersTable = pgTable(
  'payment_orders',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'restrict',
      })
      .notNull(),

    orderReference: text('order_reference')
      .notNull()
      .unique(),

    amount: integer('amount')
      .notNull(), // Amount in minor units (e.g. kobo: 1000 NGN = 100000)

    currency: text('currency')
      .default('NGN')
      .notNull(),

    purpose: text('purpose')
      .notNull(), // e.g. 'PREMIUM_SUBSCRIPTION', 'COURSE_PACK', 'EXAM_PRACTICE'

    productId: text('product_id')
      .notNull(), // Server-controlled product catalog identifier

    status: text('status')
      .default('PENDING')
      .notNull(), // PaymentOrderStatus

    metadata: jsonb('metadata')
      .default({})
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    paymentOrdersUserIdx: index('payment_orders_user_idx').on(table.userId),
    paymentOrdersReferenceIdx: index('payment_orders_reference_idx').on(table.orderReference),
    paymentOrdersStatusIdx: index('payment_orders_status_idx').on(table.status),
    paymentOrdersCreatedAtIdx: index('payment_orders_created_at_idx').on(table.createdAt),
  })
);

// =====================================================
// PAYMENT TRANSACTIONS
// =====================================================

export const paymentTransactionsTable = pgTable(
  'payment_transactions',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    orderId: uuid('order_id')
      .references(() => paymentOrdersTable.id, {
        onDelete: 'restrict',
      })
      .notNull(),

    gateway: text('gateway')
      .default('PAYSTACK')
      .notNull(),

    gatewayReference: text('gateway_reference')
      .notNull()
      .unique(),

    gatewayTransactionId: text('gateway_transaction_id'),

    amount: integer('amount')
      .notNull(), // Verified amount in minor currency units from gateway

    currency: text('currency')
      .default('NGN')
      .notNull(),

    channel: text('channel'), // 'card', 'bank', 'ussd', 'qr', 'bank_transfer', etc.

    status: text('status')
      .notNull(), // PaymentTransactionStatus

    gatewayResponse: text('gateway_response'),

    paidAt: timestamp('paid_at', { withTimezone: true }),

    metadata: jsonb('metadata')
      .default({})
      .notNull(),

    ipAddress: text('ip_address'),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    paymentTransactionsOrderIdx: index('payment_transactions_order_idx').on(table.orderId),
    paymentTransactionsGatewayRefIdx: index('payment_transactions_gateway_ref_idx').on(table.gatewayReference),
    paymentTransactionsStatusIdx: index('payment_transactions_status_idx').on(table.status),
    paymentTransactionsCreatedAtIdx: index('payment_transactions_created_at_idx').on(table.createdAt),
  })
);

// =====================================================
// PAYMENT PRODUCTS (BB-05C)
// =====================================================

export const paymentProductsTable = pgTable(
  'payment_products',
  {
    id: text('id')
      .primaryKey(), // e.g. 'SEMESTER_PASS_HARMATTAN_2026', 'EXAM_PREP_PASS_30'

    title: text('title')
      .notNull(),

    description: text('description')
      .notNull(),

    category: text('category')
      .notNull(), // 'SEMESTER_PASS' | 'EXAM_PREP' | 'OPTIONAL_PURCHASE'

    amount: integer('amount')
      .notNull(), // Integer minor currency units (kobo: 1000 NGN = 100000)

    currency: text('currency')
      .default('NGN')
      .notNull(),

    purpose: text('purpose')
      .notNull(), // 'SEMESTER_SUBSCRIPTION' | 'EXAM_PRACTICE' | 'AI_TUTORING'

    featureKey: text('feature_key')
      .notNull(), // 'SEMESTER_PREMIUM_ACCESS' | 'EXAM_PREP_ACCESS' | 'AI_EXPLANATIONS'

    durationDays: integer('duration_days'), // null = semester-specific or permanent

    academicSession: text('academic_session'), // e.g. '2026/2027'

    semester: text('semester'), // 'harmattan' | 'rain'

    benefits: jsonb('benefits')
      .$type<string[]>()
      .default([])
      .notNull(),

    isActive: boolean('is_active')
      .default(true)
      .notNull(),

    isTestProduct: boolean('is_test_product')
      .default(true)
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    paymentProductsCategoryIdx: index('payment_products_category_idx').on(table.category),
    paymentProductsActiveIdx: index('payment_products_active_idx').on(table.isActive),
    paymentProductsSessionSemesterIdx: index('payment_products_session_semester_idx').on(table.academicSession, table.semester),
  })
);

// =====================================================
// USER ENTITLEMENTS (BB-05C: Semester & Multi-Product Extensible)
// =====================================================

export const userEntitlementsTable = pgTable(
  'user_entitlements',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    userId: uuid('user_id')
      .references(() => usersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    orderId: uuid('order_id')
      .references(() => paymentOrdersTable.id, {
        onDelete: 'set null',
      }),

    productId: text('product_id'), // e.g. 'SEMESTER_PASS_HARMATTAN_2026'

    featureKey: text('feature_key')
      .notNull(), // e.g. 'SEMESTER_PREMIUM_ACCESS', 'EXAM_PREP_ACCESS', 'AI_EXPLANATIONS'

    academicSession: text('academic_session'), // e.g. '2026/2027'

    semester: text('semester'), // 'harmattan' | 'rain'

    status: text('status')
      .default('ACTIVE')
      .notNull(), // 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'REFUNDED'

    startDate: timestamp('start_date', { withTimezone: true })
      .defaultNow()
      .notNull(),

    expiryDate: timestamp('expiry_date', { withTimezone: true }), // null = lifetime/permanent

    metadata: jsonb('metadata')
      .default({})
      .notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userEntitlementsUserIdx: index('user_entitlements_user_idx').on(table.userId),
    userEntitlementsFeatureKeyIdx: index('user_entitlements_feature_key_idx').on(table.featureKey),
    userEntitlementsStatusIdx: index('user_entitlements_status_idx').on(table.status),
    userEntitlementsExpiryIdx: index('user_entitlements_expiry_idx').on(table.expiryDate),
    userEntitlementsProductIdx: index('user_entitlements_product_idx').on(table.productId),
    userEntitlementsUserFeatureStatusIdx: index('user_entitlements_user_feature_status_idx').on(table.userId, table.featureKey, table.status),
    userEntitlementsSessionSemesterIdx: index('user_entitlements_session_semester_idx').on(table.academicSession, table.semester),
  })
);

// =====================================================
// WEBHOOK EVENT LOGS
// =====================================================

export const webhookEventsTable = pgTable(
  'webhook_events',
  {
    id: uuid('id')
      .defaultRandom()
      .primaryKey(),

    gateway: text('gateway')
      .default('PAYSTACK')
      .notNull(),

    eventId: text('event_id')
      .notNull(),

    eventType: text('event_type')
      .notNull(), // e.g. 'charge.success'

    signature: text('signature')
      .notNull(),

    signatureValid: boolean('signature_valid')
      .default(false)
      .notNull(),

    processingStatus: text('processing_status')
      .default('PENDING')
      .notNull(), // WebhookProcessingStatus

    gatewayReference: text('gateway_reference'),

    payload: jsonb('payload')
      .notNull(),

    error: text('error'),

    processedAt: timestamp('processed_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    webhookEventsGatewayEventUnique: unique('webhook_events_gateway_event_unique').on(table.gateway, table.eventId),
    webhookEventsGatewayRefIdx: index('webhook_events_gateway_ref_idx').on(table.gatewayReference),
    webhookEventsStatusIdx: index('webhook_events_status_idx').on(table.processingStatus),
    webhookEventsCreatedAtIdx: index('webhook_events_created_at_idx').on(table.createdAt),
  })
);

// Payment Types
export type PaymentProductRecord = typeof paymentProductsTable.$inferSelect;
export type NewPaymentProductRecord = typeof paymentProductsTable.$inferInsert;
export type PaymentOrder = typeof paymentOrdersTable.$inferSelect;
export type NewPaymentOrder = typeof paymentOrdersTable.$inferInsert;
export type PaymentTransaction = typeof paymentTransactionsTable.$inferSelect;
export type NewPaymentTransaction = typeof paymentTransactionsTable.$inferInsert;
export type UserEntitlement = typeof userEntitlementsTable.$inferSelect;
export type NewUserEntitlement = typeof userEntitlementsTable.$inferInsert;
export type WebhookEvent = typeof webhookEventsTable.$inferSelect;
export type NewWebhookEvent = typeof webhookEventsTable.$inferInsert;









