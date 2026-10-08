import dotenv from 'dotenv';
dotenv.config();

import { eq } from 'drizzle-orm';
import { db, pool } from '../db/index.js';
import { usersTable, USER_ROLES, ACCOUNT_STATUS, refreshTokensTable } from '../db/schema.js';
import { auditService } from '../services/admin/auditService.js';

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    const current = args[i];
    if (current && current.startsWith('--')) {
      const key = current.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        parsed[key] = next;
        i++;
      } else {
        parsed[key] = 'true';
      }
    }
  }
  return parsed;
}

async function bootstrapAdmin() {
  const args = parseArgs();

  const adminEmail = (args.email || process.env.ADMIN_BOOTSTRAP_EMAIL || '').trim().toLowerCase();
  const adminPassword = args.password || process.env.ADMIN_BOOTSTRAP_PASSWORD || '';
  const adminName = args.name || process.env.ADMIN_BOOTSTRAP_NAME || 'Super Administrator';
  const adminUsername = args.username || (adminEmail ? adminEmail.split('@')[0] : 'superadmin');

  if (!adminEmail) {
    console.error('[BOOTSTRAP ERROR] Admin email is required. Provide --email <email> or set ADMIN_BOOTSTRAP_EMAIL.');
    process.exit(1);
  }

  console.log(`[BOOTSTRAP] Checking Super Admin account for: ${adminEmail}`);

  try {
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, adminEmail));

    let adminId: string;

    if (existingUser) {
      console.log(`[BOOTSTRAP] Existing user found: ${adminEmail} (Current Role: ${existingUser.role}, Status: ${existingUser.status})`);

      const updateData: Partial<typeof usersTable.$inferInsert> = {
        role: USER_ROLES.SUPER_ADMIN,
        status: ACCOUNT_STATUS.ACTIVE,
      };

      if (adminPassword) {
        updateData.password = adminPassword;
        console.log(`[BOOTSTRAP] Password update requested for ${adminEmail}. Updating password...`);
      } else {
        console.log(`[BOOTSTRAP] No new password specified; preserving existing credentials for ${adminEmail}.`);
      }

      const [updated] = await db
        .update(usersTable)
        .set(updateData)
        .where(eq(usersTable.id, existingUser.id))
        .returning();

      if (!updated) throw new Error('Failed to update admin user');
      adminId = String(updated.id);
      console.log(`[BOOTSTRAP] Successfully promoted/verified ${adminEmail} as SUPER_ADMIN (ACTIVE).`);
    } else {
      if (!adminPassword) {
        console.error('[BOOTSTRAP ERROR] Password is required to create a new admin account. Provide --password <secret> or set ADMIN_BOOTSTRAP_PASSWORD.');
        process.exit(1);
      }

      console.log(`[BOOTSTRAP] Creating new SUPER_ADMIN user: ${adminEmail}`);
      const [created] = await db
        .insert(usersTable)
        .values({
          fullName: adminName,
          email: adminEmail,
          username: adminUsername,
          password: adminPassword,
          role: USER_ROLES.SUPER_ADMIN,
          status: ACCOUNT_STATUS.ACTIVE,
        })
        .returning();

      if (!created) throw new Error('Failed to create admin user');
      adminId = String(created.id);
      console.log(`[BOOTSTRAP] Successfully created new SUPER_ADMIN account (${adminEmail}) with ID: ${adminId}`);
    }

    // Log the bootstrap action to audit logs
    await auditService.logAdminAction({
      adminUserId: adminId,
      action: 'SYSTEM_BOOTSTRAP',
      resourceType: 'system',
      resourceId: adminId,
      metadata: {
        email: adminEmail,
        role: USER_ROLES.SUPER_ADMIN,
        wasPromoted: Boolean(existingUser),
      },
      userAgent: 'BootstrapScript/1.0',
    });

    console.log('[BOOTSTRAP] Admin bootstrap completed successfully!');
  } catch (error: any) {
    console.error('[BOOTSTRAP ERROR] Failed to bootstrap admin:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

bootstrapAdmin();
