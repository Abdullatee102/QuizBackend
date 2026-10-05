import { pgTable, unique, uuid, text, foreignKey, jsonb, timestamp, integer, real, serial, boolean, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const faculties = pgTable("faculties", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	code: text().notNull(),
}, (table) => [
	unique("faculties_name_unique").on(table.name),
	unique("faculties_code_unique").on(table.code),
]);

export const questions = pgTable("questions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	question: text().notNull(),
	options: text().array(),
	correctAnswer: text("correct_answer").notNull(),
	difficulty: text().default('medium').notNull(),
	courseId: uuid("course_id").notNull(),
	type: text().default('cbt').notNull(),
	gradingPoints: jsonb("grading_points").default([]).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "questions_course_id_courses_id_fk"
		}).onDelete("cascade"),
]);

export const refreshTokens = pgTable("refresh_tokens", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "refresh_tokens_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("refresh_tokens_token_unique").on(table.token),
]);

export const departments = pgTable("departments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	facultyId: uuid("faculty_id").notNull(),
	name: text().notNull(),
	code: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.facultyId],
			foreignColumns: [faculties.id],
			name: "departments_faculty_id_faculties_id_fk"
		}).onDelete("cascade"),
]);

export const achievements = pgTable("achievements", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	achievementKey: text("achievement_key").notNull(),
	title: text().notNull(),
	description: text(),
	icon: text(),
	unlockedAt: timestamp("unlocked_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "achievements_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("user_achievement_unique").on(table.userId, table.achievementKey),
]);

export const courses = pgTable("courses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	departmentId: uuid("department_id").notNull(),
	code: text().notNull(),
	title: text().notNull(),
	level: integer().notNull(),
	semester: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "courses_department_id_departments_id_fk"
		}).onDelete("cascade"),
]);

export const quizHistory = pgTable("quiz_history", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	category: text().notNull(),
	score: real().notNull(),
	correctAnswers: integer("correct_answers").notNull(),
	totalQuestions: integer("total_questions").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	courseId: uuid("course_id").notNull(),
	quizType: text("quiz_type").default('cbt').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "quiz_history_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.courseId],
			foreignColumns: [courses.id],
			name: "quiz_history_course_id_courses_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	email: text(),
	phoneNumber: text("phone_number"),
	password: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	username: text(),
	bio: text(),
	photoUrl: text("photo_url"),
	facultyId: uuid("faculty_id"),
	departmentId: uuid("department_id"),
	level: integer(),
}, (table) => [
	foreignKey({
			columns: [table.facultyId],
			foreignColumns: [faculties.id],
			name: "users_faculty_id_fkey"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "users_department_id_fkey"
		}).onDelete("set null"),
	unique("users_email_unique").on(table.email),
	unique("users_phone_number_unique").on(table.phoneNumber),
	unique("users_username_unique").on(table.username),
]);

export const supportRequests = pgTable("support_requests", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	subject: text().notNull(),
	category: text().notNull(),
	status: text().default('open').notNull(),
	priority: text().default('medium').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "support_requests_user_id_fkey"
		}).onDelete("cascade"),
]);

export const supportMessages = pgTable("support_messages", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	requestId: uuid("request_id").notNull(),
	senderId: uuid("sender_id").notNull(),
	senderRole: text("sender_role").default('user').notNull(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.requestId],
			foreignColumns: [supportRequests.id],
			name: "support_messages_request_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.id],
			name: "support_messages_sender_id_fkey"
		}).onDelete("cascade"),
]);

export const playingWithNeon = pgTable("playing_with_neon", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	value: real(),
});

export const userDevices = pgTable("user_devices", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	pushToken: text("push_token").notNull(),
	platform: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_devices_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("user_devices_push_token_unique").on(table.pushToken),
]);

export const notifications = pgTable("notifications", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	type: text().notNull(),
	title: text().notNull(),
	body: text().notNull(),
	data: jsonb().default({}).notNull(),
	isRead: boolean("is_read").default(false).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	readAt: timestamp("read_at", { mode: 'string' }),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "notifications_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const conversationReads = pgTable("conversation_reads", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	conversationId: uuid("conversation_id").notNull(),
	userId: uuid("user_id").notNull(),
	lastReadAt: timestamp("last_read_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.conversationId],
			foreignColumns: [conversations.id],
			name: "conversation_reads_conversation_id_conversations_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "conversation_reads_user_id_users_id_fk"
		}).onDelete("cascade"),
	unique("conversation_reads_user_conversation_unique").on(table.userId, table.conversationId),
]);

export const conversations = pgTable("conversations", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	type: text().notNull(),
	title: text().notNull(),
	code: text(),
	facultyId: uuid("faculty_id"),
	departmentId: uuid("department_id"),
	level: integer(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.facultyId],
			foreignColumns: [faculties.id],
			name: "conversations_faculty_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.departmentId],
			foreignColumns: [departments.id],
			name: "conversations_department_id_fkey"
		}).onDelete("cascade"),
]);

export const messages = pgTable("messages", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	conversationId: uuid("conversation_id").notNull(),
	senderId: uuid("sender_id").notNull(),
	text: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	index("idx_messages_conversation_id").using("btree", table.conversationId.asc().nullsLast().op("uuid_ops")),
	index("idx_messages_created_at").using("btree", table.createdAt.asc().nullsLast().op("timestamp_ops")),
	foreignKey({
			columns: [table.conversationId],
			foreignColumns: [conversations.id],
			name: "messages_conversation_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.senderId],
			foreignColumns: [users.id],
			name: "messages_sender_id_fkey"
		}).onDelete("cascade"),
]);
