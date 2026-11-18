import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { ilike } from 'drizzle-orm';

/**
 * Human-readable Unique Identifier Utility
 * Formats database UUIDs into clean, generic user-friendly identifiers:
 * - Students: BB-STU-001, BB-STU-002, ... (or BB-STU-<SHORT_HEX> fallback)
 * - Lecturers: BB-LEC-001, BB-LEC-002, ... (or BB-LEC-<SHORT_HEX> fallback)
 * - Administrators: BB-ADMIN-001, BB-ADMIN-002, ... (or BB-ADMIN-<SHORT_HEX> fallback)
 */

export function formatUserDisplayId(user?: {
  id?: string | null | undefined;
  role?: string | null | undefined;
  displayId?: string | null | undefined;
  customId?: string | null | undefined;
  departmentCode?: string | null | undefined;
  username?: string | null | undefined;
  matricNumber?: string | null | undefined;
} | null | undefined): string {
  if (!user) return '—';
  // Strictly prioritize new generic BB- format
  if (user.displayId && user.displayId.startsWith('BB-')) return user.displayId;
  if (user.customId && user.customId.startsWith('BB-')) return user.customId;
  if (!user.id) return '—';

  const shortHex = user.id.replace(/-/g, '').slice(-4).toUpperCase();
  const role = (user.role || '').toUpperCase();

  if (role === 'LECTURER') {
    return `BB-LEC-${shortHex}`;
  }
  if (
    role === 'SUPER_ADMIN' ||
    role === 'CONTENT_ADMIN' ||
    role === 'SUPPORT_AGENT' ||
    role === 'NOTIFICATION_ADMIN' ||
    role === 'MODERATOR' ||
    role.includes('ADMIN')
  ) {
    return `BB-ADMIN-${shortHex}`;
  }
  return `BB-STU-${shortHex}`;
}

/**
 * Generates the next sequential Brain Buzz Display ID for a role:
 * - Students: BB-STU-001, BB-STU-002, ...
 * - Lecturers: BB-LEC-001, BB-LEC-002, ...
 * - Administrators: BB-ADMIN-001, BB-ADMIN-002, ...
 */
export async function generateNextDisplayId(role?: string | null): Promise<string> {
  const normalizedRole = (role || 'STUDENT').toUpperCase();
  let prefix = 'BB-STU';
  if (normalizedRole === 'LECTURER') {
    prefix = 'BB-LEC';
  } else if (
    normalizedRole.includes('ADMIN') ||
    normalizedRole === 'SUPPORT_AGENT' ||
    normalizedRole === 'MODERATOR'
  ) {
    prefix = 'BB-ADMIN';
  }

  try {
    const rows = await db
      .select({ displayId: usersTable.displayId })
      .from(usersTable)
      .where(ilike(usersTable.displayId, `${prefix}-%`));

    let maxNum = 0;
    for (const r of rows) {
      if (r.displayId) {
        const match = r.displayId.match(new RegExp(`^${prefix}-(\\d+)`));
        if (match && match[1]) {
          const n = parseInt(match[1], 10);
          if (n > maxNum) maxNum = n;
        }
      }
    }

    const nextNum = maxNum + 1;
    return `${prefix}-${String(nextNum).padStart(3, '0')}`;
  } catch {
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    return `${prefix}-${randomHex}`;
  }
}
