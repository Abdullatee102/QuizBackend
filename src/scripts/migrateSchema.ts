import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function runMigration() {
  const client = await pool.connect();
  try {
    console.log('[MIGRATION] Applying database updates...');

    // 1. Update users table with academic profile columns
    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS faculty_id uuid REFERENCES faculties(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
      ADD COLUMN IF NOT EXISTS level integer;
    `);
    console.log('[MIGRATION] users table updated with academic columns');

    // 2. Ensure conversations table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        type text NOT NULL,
        title text NOT NULL,
        code text,
        faculty_id uuid REFERENCES faculties(id) ON DELETE CASCADE,
        department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
        level integer,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] conversations table verified');

    // 3. Ensure messages table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        text text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] messages table verified');

    // 4. Ensure support_requests table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_requests (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        subject text NOT NULL,
        category text NOT NULL,
        status text NOT NULL DEFAULT 'open',
        priority text NOT NULL DEFAULT 'medium',
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] support_requests table verified');

    // 5. Ensure support_messages table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_messages (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id uuid NOT NULL REFERENCES support_requests(id) ON DELETE CASCADE,
        sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        sender_role text NOT NULL DEFAULT 'user',
        message text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    console.log('[MIGRATION] support_messages table verified');

    // 6. Ensure users table has role and status columns
    await client.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS role text DEFAULT 'STUDENT' NOT NULL,
      ADD COLUMN IF NOT EXISTS status text DEFAULT 'ACTIVE' NOT NULL;
    `);
    console.log('[MIGRATION] users role and status columns verified');

    // 7. Ensure audit_logs table exists
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
      CREATE INDEX IF NOT EXISTS audit_logs_admin_user_id_idx ON audit_logs (admin_user_id);
      CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON audit_logs (action);
      CREATE INDEX IF NOT EXISTS audit_logs_resource_type_idx ON audit_logs (resource_type);
      CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs (created_at);
    `);
    console.log('[MIGRATION] audit_logs table and indexes verified');

    // 8. Ensure broadcasts table exists
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
      CREATE INDEX IF NOT EXISTS broadcasts_admin_user_id_idx ON broadcasts (admin_user_id);
      CREATE INDEX IF NOT EXISTS broadcasts_status_idx ON broadcasts (status);
      CREATE INDEX IF NOT EXISTS broadcasts_created_at_idx ON broadcasts (created_at);
    `);
    console.log('[MIGRATION] broadcasts table and indexes verified');

    // 9. Ensure courses and questions have is_active flag
    await client.query(`
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true NOT NULL;
      ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true NOT NULL;
    `);
    console.log('[MIGRATION] courses and questions is_active flag verified');

    // 10. Ensure support_attachments table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS support_attachments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        request_id uuid NOT NULL REFERENCES support_requests(id) ON DELETE CASCADE,
        message_id uuid REFERENCES support_messages(id) ON DELETE CASCADE,
        uploaded_by uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        file_name text NOT NULL,
        mime_type text NOT NULL,
        size integer NOT NULL,
        storage_key text NOT NULL,
        url text NOT NULL,
        created_at timestamp NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS support_attachments_request_id_idx ON support_attachments (request_id);
      CREATE INDEX IF NOT EXISTS support_attachments_uploaded_by_idx ON support_attachments (uploaded_by);
    `);
    console.log('[MIGRATION] support_attachments table and indexes verified');

    // 11. Ensure comprehensive query indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS users_role_idx ON users (role);
      CREATE INDEX IF NOT EXISTS users_status_idx ON users (status);
      CREATE INDEX IF NOT EXISTS courses_department_id_idx ON courses (department_id);
      CREATE INDEX IF NOT EXISTS courses_is_active_idx ON courses (is_active);
      CREATE INDEX IF NOT EXISTS questions_course_id_idx ON questions (course_id);
      CREATE INDEX IF NOT EXISTS questions_is_active_idx ON questions (is_active);
      CREATE INDEX IF NOT EXISTS support_requests_status_idx ON support_requests (status);
      CREATE INDEX IF NOT EXISTS support_requests_updated_at_idx ON support_requests (updated_at);
    `);
    console.log('[MIGRATION] query performance indexes verified');

    console.log('[MIGRATION] All database schema migrations successfully completed!');
  } catch (error) {
    console.error('[MIGRATION ERROR]', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
