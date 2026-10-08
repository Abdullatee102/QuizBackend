import dotenv from 'dotenv';
dotenv.config();

import { db, pool } from '../db/index.js';
import { usersTable, auditLogsTable, broadcastsTable } from '../db/schema.js';

async function verify() {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        role: usersTable.role,
        status: usersTable.status,
      })
      .from(usersTable)
      .limit(5);

    console.log('[VERIFY DB] Existing users count sample:', users.length);
    console.log('[VERIFY DB] Users:', users);

    const auditLogs = await db.select().from(auditLogsTable).limit(1);
    console.log('[VERIFY DB] audit_logs table accessible, count:', auditLogs.length);

    const broadcasts = await db.select().from(broadcastsTable).limit(1);
    console.log('[VERIFY DB] broadcasts table accessible, count:', broadcasts.length);

    console.log('[VERIFY DB] All schema validations passed successfully!');
  } catch (error) {
    console.error('[VERIFY DB ERROR]', error);
  } finally {
    await pool.end();
  }
}

verify();

