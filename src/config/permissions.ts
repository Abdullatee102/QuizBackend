import { USER_ROLES, type UserRole } from '../db/schema.js';

export const ADMIN_ROLES: UserRole[] = [
  USER_ROLES.SUPER_ADMIN,
  USER_ROLES.CONTENT_ADMIN,
  USER_ROLES.SUPPORT_AGENT,
  USER_ROLES.NOTIFICATION_ADMIN,
  USER_ROLES.MODERATOR,
];

export const isAdminRole = (role?: string | null): boolean => {
  if (!role) return false;
  return ADMIN_ROLES.includes(role as UserRole);
};

export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_READ: 'dashboard.read',

  // Users
  USERS_READ: 'users.read',
  USERS_UPDATE: 'users.update',
  USERS_SUSPEND: 'users.suspend',

  // Admin accounts management
  ADMINS_READ: 'admins.read',
  ADMINS_CREATE: 'admins.create',
  ADMINS_UPDATE: 'admins.update',
  ADMINS_DELETE: 'admins.delete',

  // Courses
  COURSES_READ: 'courses.read',
  COURSES_CREATE: 'courses.create',
  COURSES_UPDATE: 'courses.update',
  COURSES_DELETE: 'courses.delete',

  // Questions
  QUESTIONS_READ: 'questions.read',
  QUESTIONS_CREATE: 'questions.create',
  QUESTIONS_UPDATE: 'questions.update',
  QUESTIONS_DELETE: 'questions.delete',
  QUESTIONS_REVIEW: 'questions.review',
  QUESTIONS_APPROVE: 'questions.approve',
  QUESTIONS_PUBLISH: 'questions.publish',

  // Support
  SUPPORT_READ: 'support.read',
  SUPPORT_REPLY: 'support.reply',
  SUPPORT_STATUS: 'support.status',

  // Notifications & Broadcasts
  NOTIFICATIONS_READ: 'notifications.read',
  NOTIFICATIONS_CREATE: 'notifications.create',
  NOTIFICATIONS_BROADCAST: 'notifications.broadcast',

  // Moderation
  MODERATION_READ: 'moderation.read',
  MODERATION_UPDATE: 'moderation.update',

  // Audit Logs
  AUDIT_LOGS_READ: 'audit_logs.read',

  // Feedback & Research (BB-03)
  FEEDBACK_READ: 'feedback.read',

  // Lecturer Management & Course Assignments (BB-07B)
  LECTURERS_READ: 'lecturers.read',
  LECTURERS_CREATE: 'lecturers.create',
  LECTURERS_UPDATE: 'lecturers.update',
  LECTURER_ASSIGNMENTS_MANAGE: 'lecturer_assignments.manage',

  // Course Offerings & Student Enrolments (BB-07F.2)
  OFFERINGS_READ: 'offerings.read',
  OFFERINGS_CREATE: 'offerings.create',
  OFFERINGS_UPDATE: 'offerings.update',
  OFFERINGS_DELETE: 'offerings.delete',
  OFFERING_LECTURERS_MANAGE: 'offering_lecturers.manage',
  ENROLLMENTS_READ: 'enrollments.read',
  ENROLLMENTS_CREATE: 'enrollments.create',
  ENROLLMENTS_UPDATE: 'enrollments.update',
  ENROLLMENTS_DELETE: 'enrollments.delete',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS] | string;

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [USER_ROLES.SUPER_ADMIN]: ['*'],

  [USER_ROLES.CONTENT_ADMIN]: [
    PERMISSIONS.DASHBOARD_READ,
    'courses.*',
    PERMISSIONS.COURSES_READ,
    PERMISSIONS.COURSES_CREATE,
    PERMISSIONS.COURSES_UPDATE,
    PERMISSIONS.COURSES_DELETE,
    'questions.*',
    PERMISSIONS.QUESTIONS_READ,
    PERMISSIONS.QUESTIONS_CREATE,
    PERMISSIONS.QUESTIONS_UPDATE,
    PERMISSIONS.QUESTIONS_DELETE,
    PERMISSIONS.QUESTIONS_REVIEW,
    PERMISSIONS.QUESTIONS_APPROVE,
    PERMISSIONS.QUESTIONS_PUBLISH,
    'curriculum.*',
    PERMISSIONS.LECTURERS_READ,
    PERMISSIONS.LECTURER_ASSIGNMENTS_MANAGE,
    'offerings.*',
    PERMISSIONS.OFFERINGS_READ,
    PERMISSIONS.OFFERINGS_CREATE,
    PERMISSIONS.OFFERINGS_UPDATE,
    PERMISSIONS.OFFERINGS_DELETE,
    PERMISSIONS.OFFERING_LECTURERS_MANAGE,
    'enrollments.*',
    PERMISSIONS.ENROLLMENTS_READ,
    PERMISSIONS.ENROLLMENTS_CREATE,
    PERMISSIONS.ENROLLMENTS_UPDATE,
    PERMISSIONS.ENROLLMENTS_DELETE,
  ],

  [USER_ROLES.SUPPORT_AGENT]: [
    PERMISSIONS.DASHBOARD_READ,
    'support.*',
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_REPLY,
    PERMISSIONS.SUPPORT_STATUS,
  ],

  [USER_ROLES.NOTIFICATION_ADMIN]: [
    PERMISSIONS.DASHBOARD_READ,
    'notifications.*',
    PERMISSIONS.NOTIFICATIONS_READ,
    PERMISSIONS.NOTIFICATIONS_CREATE,
    PERMISSIONS.NOTIFICATIONS_BROADCAST,
  ],

  [USER_ROLES.MODERATOR]: [
    PERMISSIONS.DASHBOARD_READ,
    'moderation.*',
    PERMISSIONS.MODERATION_READ,
    PERMISSIONS.MODERATION_UPDATE,
    PERMISSIONS.USERS_READ,
  ],

  [USER_ROLES.STUDENT]: [],
  [USER_ROLES.LECTURER]: [],
};

export const hasPermission = (role: string, requiredPermission: string): boolean => {
  const permissions = ROLE_PERMISSIONS[role as UserRole] || [];

  if (permissions.includes('*')) {
    return true;
  }

  if (permissions.includes(requiredPermission)) {
    return true;
  }

  // Check prefix wildcard like courses.*
  for (const perm of permissions) {
    if (perm.endsWith('.*')) {
      const prefix = perm.slice(0, -2);
      if (requiredPermission.startsWith(prefix + '.')) {
        return true;
      }
    }
  }

  return false;
};

export const getRolePermissions = (role: string): string[] => {
  if (role === USER_ROLES.SUPER_ADMIN) {
    return Object.values(PERMISSIONS);
  }
  return ROLE_PERMISSIONS[role as UserRole] || [];
};

