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


