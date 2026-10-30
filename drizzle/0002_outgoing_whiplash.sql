CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" uuid,
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "broadcasts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_user_id" uuid,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"target_type" text NOT NULL,
	"target_filter" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"recipient_count" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'sent' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"sent_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"survey_version" text DEFAULT '1.0' NOT NULL,
	"overall_satisfaction" integer NOT NULL,
	"usage_frequency" text NOT NULL,
	"content_accuracy_rating" integer NOT NULL,
	"fairness_rating" integer NOT NULL,
	"technical_frictions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"friction_details" text,
	"feature_ratings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"structured_answers" jsonb NOT NULL,
	"suggestions" text,
	"academic_context" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"client_metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "feedback_user_survey_unique" UNIQUE("user_id","survey_version")
);
--> statement-breakpoint
CREATE TABLE "otps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"otp_hash" text NOT NULL,
	"purpose" text DEFAULT 'verification' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 5 NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "support_attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"message_id" uuid,
	"uploaded_by" uuid NOT NULL,
	"file_name" text NOT NULL,
	"mime_type" text NOT NULL,
	"size" integer NOT NULL,
	"storage_key" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "support_requests" ALTER COLUMN "status" SET DEFAULT 'OPEN';--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'STUDENT' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" text DEFAULT 'ACTIVE' NOT NULL;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "broadcasts" ADD CONSTRAINT "broadcasts_admin_user_id_users_id_fk" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_attachments" ADD CONSTRAINT "support_attachments_request_id_support_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."support_requests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_attachments" ADD CONSTRAINT "support_attachments_message_id_support_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."support_messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_attachments" ADD CONSTRAINT "support_attachments_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_logs_admin_user_id_idx" ON "audit_logs" USING btree ("admin_user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_logs_resource_type_idx" ON "audit_logs" USING btree ("resource_type");--> statement-breakpoint
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "broadcasts_admin_user_id_idx" ON "broadcasts" USING btree ("admin_user_id");--> statement-breakpoint
CREATE INDEX "broadcasts_status_idx" ON "broadcasts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "broadcasts_created_at_idx" ON "broadcasts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "feedback_survey_version_idx" ON "feedback" USING btree ("survey_version");--> statement-breakpoint
CREATE INDEX "feedback_created_at_idx" ON "feedback" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "feedback_satisfaction_idx" ON "feedback" USING btree ("overall_satisfaction");--> statement-breakpoint
CREATE INDEX "feedback_user_id_idx" ON "feedback" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "otps_identifier_idx" ON "otps" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "otps_purpose_idx" ON "otps" USING btree ("purpose");--> statement-breakpoint
CREATE INDEX "otps_is_used_idx" ON "otps" USING btree ("is_used");--> statement-breakpoint
CREATE INDEX "otps_expires_at_idx" ON "otps" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "support_attachments_request_id_idx" ON "support_attachments" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "support_attachments_uploaded_by_idx" ON "support_attachments" USING btree ("uploaded_by");--> statement-breakpoint
CREATE INDEX "courses_department_id_idx" ON "courses" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "courses_code_idx" ON "courses" USING btree ("code");--> statement-breakpoint
CREATE INDEX "courses_is_active_idx" ON "courses" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "questions_course_id_idx" ON "questions" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "questions_type_idx" ON "questions" USING btree ("type");--> statement-breakpoint
CREATE INDEX "questions_is_active_idx" ON "questions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "support_messages_request_id_idx" ON "support_messages" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "support_messages_sender_id_idx" ON "support_messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "support_requests_user_id_idx" ON "support_requests" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "support_requests_status_idx" ON "support_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "support_requests_priority_idx" ON "support_requests" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "support_requests_updated_at_idx" ON "support_requests" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_status_idx" ON "users" USING btree ("status");--> statement-breakpoint
CREATE INDEX "users_faculty_id_idx" ON "users" USING btree ("faculty_id");--> statement-breakpoint
CREATE INDEX "users_department_id_idx" ON "users" USING btree ("department_id");--> statement-breakpoint
CREATE INDEX "users_level_idx" ON "users" USING btree ("level");