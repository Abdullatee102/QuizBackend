/**
 * Human-readable Unique Identifier Utility
 * Formats database UUIDs into user-friendly identifiers:
 * - Lecturers: LECTURER-<DEPT>-<SHORT_HEX> (e.g. LECTURER-CSC-75AC)
 * - Students: Matriculation Number (if present) or STUDENT-<DEPT>-<SHORT_HEX>
 * - Administrators: ADMIN-<SHORT_HEX> (e.g. ADMIN-13AB)
 */
export function formatUserDisplayId(user: {
  id: string;
  role?: string | null;
  departmentCode?: string | null;
  username?: string | null;
  matricNumber?: string | null;
}): string {
  if (!user || !user.id) return 'UNKNOWN-ID';
  const shortHex = user.id.replace(/-/g, '').slice(-4).toUpperCase();
  const dept = (user.departmentCode || 'GEN').toUpperCase();

  if (user.role === 'LECTURER') {
    return `LECTURER-${dept}-${shortHex}`;
  }
  if (user.role === 'STUDENT') {
    if (user.matricNumber) return user.matricNumber;
    if (user.username && /^\d{5,9}$/.test(user.username)) return user.username;
    return `STUDENT-${dept}-${shortHex}`;
  }
  if (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN' || (user.role && user.role.includes('ADMIN'))) {
    return `ADMIN-${shortHex}`;
  }
  return `USER-${shortHex}`;
}

