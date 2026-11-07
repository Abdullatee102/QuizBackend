import dotenv from 'dotenv';
dotenv.config();

import { db, pool } from '../db/index.js';
import {
  usersTable,
  auditLogsTable,
  broadcastsTable,
  paymentOrdersTable,
  paymentTransactionsTable,
  userEntitlementsTable,
  webhookEventsTable,
} from '../db/schema.js';

async function verify() {
  try {
    const users = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
        role: usersTable.role,
        status: usersTable.status,
        departmentId: usersTable.departmentId,
        facultyId: usersTable.facultyId,
        level: usersTable.level,
      })
      .from(usersTable);

    console.log('[VERIFY DB] Total users count:', users.length);

    const auditLogs = await db.select().from(auditLogsTable).limit(1);
    console.log('[VERIFY DB] audit_logs table accessible, count:', auditLogs.length);

    const broadcasts = await db.select().from(broadcastsTable).limit(1);
    console.log('[VERIFY DB] broadcasts table accessible, count:', broadcasts.length);

    const orders = await db.select().from(paymentOrdersTable).limit(1);
    console.log('[VERIFY DB] payment_orders table accessible, count:', orders.length);

    const transactions = await db.select().from(paymentTransactionsTable).limit(1);
    console.log('[VERIFY DB] payment_transactions table accessible, count:', transactions.length);

    const entitlements = await db.select().from(userEntitlementsTable).limit(1);
    console.log('[VERIFY DB] user_entitlements table accessible, count:', entitlements.length);

    const webhooks = await db.select().from(webhookEventsTable).limit(1);
    console.log('[VERIFY DB] webhook_events table accessible, count:', webhooks.length);

    console.log('[VERIFY DB] All schema validations passed successfully!');
  } catch (error) {
    console.error('[VERIFY DB ERROR]', error);
  } finally {
    await pool.end();
  }
}

verify();

