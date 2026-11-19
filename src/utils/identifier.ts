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

export const CANONICAL_USER_MAP: Record<string, string> = {
  // Real Admin Accounts
  'opeabdullateef12@gmail.com': 'BB-ADMIN-001',
  'd2c331f7-ae9f-4a56-89ea-9114c382dd22': 'BB-ADMIN-001',
  'abdullateefpopoola12@gmail.com': 'BB-ADMIN-002',
  '91e62bbf-7916-4d0b-9612-ec3b05eaeba6': 'BB-ADMIN-002',

  // Real Lecturer Accounts
  'abdullateefpopoola@gmail.com': 'BB-LEC-001',
  'd235dba6-c98f-4e6f-9851-209bdacbdf24': 'BB-LEC-001',
  'abdullateefpopoola1@gmail.com': 'BB-LEC-002',
  '7465da86-26a6-4a82-a058-b1441f26fd9b': 'BB-LEC-002',
  'abdullateefope2007@gmail.com': 'BB-LEC-003',
  'f9cfebad-a5cd-4a29-8b91-cc9d9e680c04': 'BB-LEC-003',

  // Real Student Accounts
  'ibrahimpopoola@gmail.com': 'BB-STU-001',
  '4fdd17ea-9479-4eb2-81c9-f1d75496224f': 'BB-STU-001',
  'shineon816@gmail.com': 'BB-STU-002',
  'c30b6f17-8233-4bae-b725-20034a1a0287': 'BB-STU-002',
  'popoolabisolamorufat@gmail.com': 'BB-STU-003',
  'c32c7d6a-8730-415f-b651-f15d8e467f76': 'BB-STU-003',
  'muhammedpopoola947@gmail.com': 'BB-STU-004',
  '4f1d4fad-8134-4c6b-96dc-5ecfbf0029d6': 'BB-STU-004',
  'kolaisreal2005@gmail.com': 'BB-STU-005',
  'c266b4d5-8692-4bc1-8a9c-8608d8e10691': 'BB-STU-005',
  'kehindeadeyemo701@gmail.com': 'BB-STU-006',
  'f32d7a74-2db0-4c61-8998-aeb231a4c8e3': 'BB-STU-006',
  'opeyemiabdull07@gmail.com': 'BB-STU-007',
  '45a0ec0a-ea56-4620-814f-c3ef83330c10': 'BB-STU-007',
  'adeosunoluwapelumi34@gmail.com': 'BB-STU-008',
  '543c3632-df05-47ab-8631-5a9e315d75ac': 'BB-STU-008',
};

export function getAvatarInitial(name?: string | null | undefined, fallback = 'U'): string {
  if (!name) return fallback;
  const clean = String(name).replace(/^[@\s'"`\-_.]+/, '').trim();
  return (clean.charAt(0) || fallback).toUpperCase();
}

export function formatUserDisplayId(user?: {
  id?: string | null | undefined;
  email?: string | null | undefined;
  role?: string | null | undefined;
  displayId?: string | null | undefined;
  customId?: string | null | undefined;
  departmentCode?: string | null | undefined;
  username?: string | null | undefined;
  matricNumber?: string | null | undefined;
} | null | undefined): string {
  if (!user) return '—';

  // 1. Strictly prioritize canonical user map by email or ID
  if (user.email) {
    const canonical = CANONICAL_USER_MAP[user.email.toLowerCase()];
    if (canonical) return canonical;
  }
  if (user.id) {
    const canonical = CANONICAL_USER_MAP[user.id.toLowerCase()];
    if (canonical) return canonical;
  }

  // 2. Prioritize clean generic BB- sequential 3+ digit format (e.g. BB-STU-001, BB-LEC-002, BB-ADMIN-001)
  if (user.displayId && /^BB-(STU|LEC|ADMIN)-\d{3,}$/i.test(user.displayId)) {
    return user.displayId.toUpperCase();
  }
  if (user.customId && /^BB-(STU|LEC|ADMIN)-\d{3,}$/i.test(user.customId)) {
    return user.customId.toUpperCase();
  }

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
