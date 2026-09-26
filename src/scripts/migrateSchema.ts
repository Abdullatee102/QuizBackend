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
