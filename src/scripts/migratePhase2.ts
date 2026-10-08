import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function runPhase2Migration() {
  const client = await pool.connect();
  try {
    console.log('[MIGRATION] Applying Phase 2 database schema additions...');

    // 1. Add role and status columns to users table
    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role text DEFAULT 'STUDENT' NOT NULL,
      ADD COLUMN IF NOT EXISTS status text DEFAULT 'ACTIVE' NOT NULL;
    `);
    console.log('[MIGRATION] users table updated with role and status columns');

    // 2. Create audit_logs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        action text NOT NULL,
        resource_type text NOT NULL,
        resource_id text,
        metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
        ip_address text,
        user_agent text,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] audit_logs table verified');

    // Indexes for audit_logs
    await client.query(`
      CREATE INDEX IF NOT EXISTS audit_logs_admin_user_id_idx ON audit_logs (admin_user_id);
      CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON audit_logs (action);
      CREATE INDEX IF NOT EXISTS audit_logs_resource_type_idx ON audit_logs (resource_type);
      CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs (created_at);
    `);
    console.log('[MIGRATION] audit_logs indexes verified');

    // 3. Create broadcasts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS broadcasts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        admin_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        title text NOT NULL,
        body text NOT NULL,
        target_type text NOT NULL,
        target_filter jsonb NOT NULL DEFAULT '{}'::jsonb,
        recipient_count integer NOT NULL DEFAULT 0,
        status text NOT NULL DEFAULT 'sent',
        created_at timestamp NOT NULL DEFAULT now(),
        sent_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] broadcasts table verified');

    // Indexes for broadcasts
    await client.query(`
      CREATE INDEX IF NOT EXISTS broadcasts_admin_user_id_idx ON broadcasts (admin_user_id);
      CREATE INDEX IF NOT EXISTS broadcasts_created_at_idx ON broadcasts (created_at);
    `);
    console.log('[MIGRATION] broadcasts indexes verified');

    console.log('[MIGRATION] Phase 2 migration completed successfully without data loss!');
  } catch (error) {
    console.error('[MIGRATION ERROR]', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runPhase2Migration();

