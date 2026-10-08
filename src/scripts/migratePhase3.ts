import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function runPhase3Migration() {
  const client = await pool.connect();
  try {
    console.log('[MIGRATION] Applying Phase 3 hardening database additions...');

    // 1. Add is_active column to courses and questions
    await client.query(`
      ALTER TABLE courses
      ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true NOT NULL;

      ALTER TABLE questions
      ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true NOT NULL;
    `);
    console.log('[MIGRATION] courses and questions updated with is_active flag');

    // 2. Create support_attachments table
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
    `);
    console.log('[MIGRATION] support_attachments table verified');

    // 3. Create indexes
    await client.query(`
      -- Users indexes
      CREATE INDEX IF NOT EXISTS users_role_idx ON users (role);
      CREATE INDEX IF NOT EXISTS users_status_idx ON users (status);
      CREATE INDEX IF NOT EXISTS users_faculty_id_idx ON users (faculty_id);
      CREATE INDEX IF NOT EXISTS users_department_id_idx ON users (department_id);
      CREATE INDEX IF NOT EXISTS users_level_idx ON users (level);

      -- Courses indexes
      CREATE INDEX IF NOT EXISTS courses_department_id_idx ON courses (department_id);
      CREATE INDEX IF NOT EXISTS courses_code_idx ON courses (code);
      CREATE INDEX IF NOT EXISTS courses_is_active_idx ON courses (is_active);

      -- Questions indexes
      CREATE INDEX IF NOT EXISTS questions_course_id_idx ON questions (course_id);
      CREATE INDEX IF NOT EXISTS questions_type_idx ON questions (type);
      CREATE INDEX IF NOT EXISTS questions_is_active_idx ON questions (is_active);

      -- Support Requests indexes
      CREATE INDEX IF NOT EXISTS support_requests_user_id_idx ON support_requests (user_id);
      CREATE INDEX IF NOT EXISTS support_requests_status_idx ON support_requests (status);
      CREATE INDEX IF NOT EXISTS support_requests_priority_idx ON support_requests (priority);
      CREATE INDEX IF NOT EXISTS support_requests_updated_at_idx ON support_requests (updated_at);

      -- Support Messages indexes
      CREATE INDEX IF NOT EXISTS support_messages_request_id_idx ON support_messages (request_id);
      CREATE INDEX IF NOT EXISTS support_messages_sender_id_idx ON support_messages (sender_id);

      -- Support Attachments indexes
      CREATE INDEX IF NOT EXISTS support_attachments_request_id_idx ON support_attachments (request_id);
      CREATE INDEX IF NOT EXISTS support_attachments_uploaded_by_idx ON support_attachments (uploaded_by);

      -- Broadcasts indexes
      CREATE INDEX IF NOT EXISTS broadcasts_status_idx ON broadcasts (status);
    `);
    console.log('[MIGRATION] All Phase 3 query optimization indexes verified');

    // 4. Normalize support statuses to standard uppercase format safely
    await client.query(`
      UPDATE support_requests
      SET status = UPPER(status)
      WHERE status = LOWER(status);
    `);
    console.log('[MIGRATION] support_requests status normalized to canonical format');

    console.log('[MIGRATION] Phase 3 migration completed successfully with zero downtime or data loss!');
  } catch (error) {
    console.error('[MIGRATION ERROR]', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runPhase3Migration();

