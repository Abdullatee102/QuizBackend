import type { Request } from 'express';
import type { UserRole, AccountStatus } from '../db/schema.js';

export interface AdminUserPayload {
  id: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  fullName?: string;
  username?: string | null;
  permissions?: string[];
}

export interface AdminAuthenticatedRequest extends Request {
  adminUser?: AdminUserPayload;
}

export interface AuditLogEntryInput {
  adminUserId?: string | null;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  metadata?: Record<string, any>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

