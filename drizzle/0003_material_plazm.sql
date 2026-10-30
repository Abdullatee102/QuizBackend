ALTER TABLE "feedback" ALTER COLUMN "academic_context" SET DEFAULT '{"facultyId":null,"departmentId":null,"level":null}'::jsonb;--> statement-breakpoint
ALTER TABLE "feedback" ALTER COLUMN "client_metadata" SET DEFAULT '{"appVersion":"1.0.0","platform":"android"}'::jsonb;--> statement-breakpoint
ALTER TABLE "quiz_history" ADD COLUMN "earned_xp" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "leaderboard_privacy" text DEFAULT 'USERNAME_ONLY' NOT NULL;--> statement-breakpoint
CREATE INDEX "quiz_history_user_course_created_idx" ON "quiz_history" USING btree ("user_id","course_id","created_at");--> statement-breakpoint
CREATE INDEX "quiz_history_created_at_earned_xp_idx" ON "quiz_history" USING btree ("created_at","earned_xp");--> statement-breakpoint
CREATE INDEX "users_leaderboard_privacy_idx" ON "users" USING btree ("leaderboard_privacy");