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

    // 12. Ensure otps table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        identifier text NOT NULL,
        otp_hash text NOT NULL,
        purpose text NOT NULL DEFAULT 'verification',
        expires_at timestamp NOT NULL,
        attempts integer NOT NULL DEFAULT 0,
        max_attempts integer NOT NULL DEFAULT 5,
        is_used boolean NOT NULL DEFAULT false,
        created_at timestamp NOT NULL DEFAULT now()
      );
      CREATE INDEX IF NOT EXISTS otps_identifier_idx ON otps (identifier);
      CREATE INDEX IF NOT EXISTS otps_purpose_idx ON otps (purpose);
      CREATE INDEX IF NOT EXISTS otps_is_used_idx ON otps (is_used);
      CREATE INDEX IF NOT EXISTS otps_expires_at_idx ON otps (expires_at);
    `);
    console.log('[MIGRATION] otps table and indexes verified');

    // 13. Ensure feedback table exists (BB-03)
    await client.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        survey_version text NOT NULL DEFAULT '1.0',
        overall_satisfaction integer NOT NULL,
        usage_frequency text NOT NULL,
        content_accuracy_rating integer NOT NULL,
        fairness_rating integer NOT NULL,
        technical_frictions jsonb NOT NULL DEFAULT '[]'::jsonb,
        friction_details text,
        feature_ratings jsonb NOT NULL DEFAULT '{}'::jsonb,
        structured_answers jsonb NOT NULL,
        suggestions text,
        academic_context jsonb NOT NULL DEFAULT '{}'::jsonb,
        client_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
        created_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT feedback_user_survey_unique UNIQUE (user_id, survey_version)
      );
      CREATE INDEX IF NOT EXISTS feedback_survey_version_idx ON feedback (survey_version);
      CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON feedback (created_at);
      CREATE INDEX IF NOT EXISTS feedback_satisfaction_idx ON feedback (overall_satisfaction);
      CREATE INDEX IF NOT EXISTS feedback_user_id_idx ON feedback (user_id);
    `);
    console.log('[MIGRATION] feedback table, unique constraint and indexes verified (BB-03)');

    // 14. Ensure leaderboard_privacy and earned_xp exist with safe backfill (BB-04 Batch 1)
    await client.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS leaderboard_privacy text DEFAULT 'USERNAME_ONLY' NOT NULL;
      UPDATE users SET leaderboard_privacy = 'USERNAME_ONLY' WHERE leaderboard_privacy IS NULL;
      CREATE INDEX IF NOT EXISTS users_leaderboard_privacy_idx ON users (leaderboard_privacy);

      ALTER TABLE quiz_history ADD COLUMN IF NOT EXISTS earned_xp integer DEFAULT 0 NOT NULL;
      UPDATE quiz_history SET earned_xp = ROUND(score)::integer WHERE (earned_xp IS NULL OR earned_xp = 0) AND score > 0;
      CREATE INDEX IF NOT EXISTS quiz_history_user_course_created_idx ON quiz_history (user_id, course_id, created_at);
      CREATE INDEX IF NOT EXISTS quiz_history_created_at_earned_xp_idx ON quiz_history (created_at, earned_xp);
    `);
    console.log('[MIGRATION] leaderboard_privacy and earned_xp columns, indexes and backfills verified (BB-04)');

    // 15. Ensure course_assignments table exists (BB-07B Lecturer Course Assignments)
    await client.query(`
      CREATE TABLE IF NOT EXISTS course_assignments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        lecturer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        academic_session text NOT NULL,
        semester text NOT NULL,
        status text NOT NULL DEFAULT 'ACTIVE',
        assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT course_assignments_lecturer_course_session_semester_unique UNIQUE (lecturer_id, course_id, academic_session, semester)
      );
      CREATE INDEX IF NOT EXISTS course_assignments_lecturer_course_session_semester_idx ON course_assignments (lecturer_id, course_id, academic_session, semester);
      CREATE INDEX IF NOT EXISTS course_assignments_lecturer_id_idx ON course_assignments (lecturer_id);
      CREATE INDEX IF NOT EXISTS course_assignments_course_id_idx ON course_assignments (course_id);
      CREATE INDEX IF NOT EXISTS course_assignments_status_idx ON course_assignments (status);
    `);
    console.log('[MIGRATION] course_assignments table, unique constraint and indexes verified (BB-07B)');

    // 16. Remediate course_assignments constraints and defaults (BB-07D)
    // COURSE-02: Remove hardcoded default on academic_session
    // COURSE-03: Update uniqueness rule to (lecturer_id, course_id, academic_session, semester)
    await client.query(`
      ALTER TABLE course_assignments ALTER COLUMN academic_session DROP DEFAULT;

      ALTER TABLE course_assignments DROP CONSTRAINT IF EXISTS course_assignments_lecturer_course_session_unique;
      DROP INDEX IF EXISTS course_assignments_lecturer_course_session_idx;

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'course_assignments_lecturer_course_session_semester_unique'
        ) THEN
          ALTER TABLE course_assignments ADD CONSTRAINT course_assignments_lecturer_course_session_semester_unique UNIQUE (lecturer_id, course_id, academic_session, semester);
        END IF;
      END $$;

      CREATE INDEX IF NOT EXISTS course_assignments_lecturer_course_session_semester_idx ON course_assignments (lecturer_id, course_id, academic_session, semester);
    `);
    console.log('[MIGRATION] course_assignments unique constraint and session defaults remediated (BB-07D)');

    // 17. Course Offerings, Offering Lecturers, and Student Enrolments (BB-07F.2)
    await client.query(`
      CREATE TABLE IF NOT EXISTS course_offerings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        academic_session text NOT NULL,
        semester text NOT NULL,
        level integer NOT NULL,
        section text NOT NULL DEFAULT 'DEFAULT',
        status text NOT NULL DEFAULT 'ACTIVE',
        max_capacity integer,
        created_by uuid REFERENCES users(id) ON DELETE SET NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT course_offerings_course_session_semester_section_unique UNIQUE (course_id, academic_session, semester, section)
      );
      CREATE INDEX IF NOT EXISTS course_offerings_course_session_semester_idx ON course_offerings (course_id, academic_session, semester);
      CREATE INDEX IF NOT EXISTS course_offerings_course_id_idx ON course_offerings (course_id);
      CREATE INDEX IF NOT EXISTS course_offerings_status_idx ON course_offerings (status);
      CREATE INDEX IF NOT EXISTS course_offerings_academic_session_idx ON course_offerings (academic_session);

      CREATE TABLE IF NOT EXISTS offering_lecturers (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        offering_id uuid NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
        lecturer_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        role text NOT NULL DEFAULT 'PRIMARY',
        status text NOT NULL DEFAULT 'ACTIVE',
        assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
        assigned_at timestamp NOT NULL DEFAULT now(),
        CONSTRAINT offering_lecturers_offering_lecturer_unique UNIQUE (offering_id, lecturer_id)
      );
      CREATE INDEX IF NOT EXISTS offering_lecturers_offering_id_idx ON offering_lecturers (offering_id);
      CREATE INDEX IF NOT EXISTS offering_lecturers_lecturer_id_idx ON offering_lecturers (lecturer_id);
      CREATE INDEX IF NOT EXISTS offering_lecturers_status_idx ON offering_lecturers (status);

      CREATE TABLE IF NOT EXISTS student_enrollments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        offering_id uuid NOT NULL REFERENCES course_offerings(id) ON DELETE CASCADE,
        status text NOT NULL DEFAULT 'ENROLLED',
        source text NOT NULL DEFAULT 'ADMIN_MANUAL',
        enrolled_by uuid REFERENCES users(id) ON DELETE SET NULL,
        enrolled_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        dropped_at timestamp,
        CONSTRAINT student_enrollments_student_offering_unique UNIQUE (student_id, offering_id)
      );
      CREATE INDEX IF NOT EXISTS student_enrollments_student_id_idx ON student_enrollments (student_id);
      CREATE INDEX IF NOT EXISTS student_enrollments_offering_id_idx ON student_enrollments (offering_id);
      CREATE INDEX IF NOT EXISTS student_enrollments_status_idx ON student_enrollments (status);
      CREATE INDEX IF NOT EXISTS student_enrollments_student_offering_status_idx ON student_enrollments (student_id, offering_id, status);
    `);
    console.log('[MIGRATION] course_offerings, offering_lecturers, and student_enrollments tables and indexes verified (BB-07F.2)');

    // 18. Question-Bank Authoring & Approval Workflow (BB-07F.3)
    await client.query(`
      ALTER TABLE questions
        ADD COLUMN IF NOT EXISTS status text DEFAULT 'PUBLISHED' NOT NULL,
        ADD COLUMN IF NOT EXISTS origin_offering_id uuid REFERENCES course_offerings(id) ON DELETE SET NULL,
        ADD COLUMN IF NOT EXISTS author_lecturer_id uuid REFERENCES users(id) ON DELETE SET NULL,
        ADD COLUMN IF NOT EXISTS explanation text,
        ADD COLUMN IF NOT EXISTS points integer DEFAULT 1 NOT NULL,
        ADD COLUMN IF NOT EXISTS image_url text,
        ADD COLUMN IF NOT EXISTS is_practice_eligible boolean DEFAULT true NOT NULL,
        ADD COLUMN IF NOT EXISTS current_version integer DEFAULT 1 NOT NULL,
        ADD COLUMN IF NOT EXISTS reviewed_by_admin_id uuid REFERENCES users(id) ON DELETE SET NULL,
        ADD COLUMN IF NOT EXISTS reviewed_at timestamp,
        ADD COLUMN IF NOT EXISTS review_feedback text,
        ADD COLUMN IF NOT EXISTS rejection_reason text,
        ADD COLUMN IF NOT EXISTS published_by_admin_id uuid REFERENCES users(id) ON DELETE SET NULL,
        ADD COLUMN IF NOT EXISTS published_at timestamp,
        ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT now() NOT NULL,
        ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT now() NOT NULL;

      ALTER TABLE questions ALTER COLUMN status SET DEFAULT 'PUBLISHED';
      ALTER TABLE questions ALTER COLUMN is_practice_eligible SET DEFAULT true;

      -- Backfill legacy questions: all existing questions with no author are designated PUBLISHED and practice-eligible
      UPDATE questions
      SET status = 'PUBLISHED', is_practice_eligible = true, published_at = COALESCE(published_at, now())
      WHERE author_lecturer_id IS NULL AND (status IS NULL OR status = 'DRAFT');

      CREATE INDEX IF NOT EXISTS questions_origin_offering_id_idx ON questions (origin_offering_id);
      CREATE INDEX IF NOT EXISTS questions_author_lecturer_id_idx ON questions (author_lecturer_id);
      CREATE INDEX IF NOT EXISTS questions_status_idx ON questions (status);
      CREATE INDEX IF NOT EXISTS questions_is_practice_eligible_idx ON questions (is_practice_eligible);

      CREATE TABLE IF NOT EXISTS question_versions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        version_number integer NOT NULL,
        type text NOT NULL,
        question text NOT NULL,
        options text[],
        correct_answer text NOT NULL,
        grading_points jsonb DEFAULT '[]'::jsonb NOT NULL,
        explanation text,
        points integer DEFAULT 1 NOT NULL,
        image_url text,
        difficulty text DEFAULT 'medium' NOT NULL,
        submitted_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        created_at timestamp DEFAULT now() NOT NULL,
        CONSTRAINT question_versions_question_version_unique UNIQUE (question_id, version_number)
      );
      CREATE INDEX IF NOT EXISTS question_versions_question_id_idx ON question_versions (question_id);

      CREATE TABLE IF NOT EXISTS question_reviews (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        version_number integer NOT NULL,
        action text NOT NULL,
        from_status text NOT NULL,
        to_status text NOT NULL,
        performed_by_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        feedback text,
        reason text,
        created_at timestamp DEFAULT now() NOT NULL
      );
      CREATE INDEX IF NOT EXISTS question_reviews_question_id_idx ON question_reviews (question_id);
      CREATE INDEX IF NOT EXISTS question_reviews_created_at_idx ON question_reviews (created_at);
    `);
    console.log('[MIGRATION] Question-Bank Authoring & Approval tables, versions, reviews, and legacy backfill verified (BB-07F.3)');

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
