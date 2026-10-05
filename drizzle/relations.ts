import { relations } from "drizzle-orm/relations";
import { courses, questions, users, refreshTokens, faculties, departments, achievements, quizHistory, supportRequests, supportMessages, userDevices, notifications, conversations, conversationReads, messages } from "./schema";

export const questionsRelations = relations(questions, ({one}) => ({
	course: one(courses, {
		fields: [questions.courseId],
		references: [courses.id]
	}),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	questions: many(questions),
	department: one(departments, {
		fields: [courses.departmentId],
		references: [departments.id]
	}),
	quizHistories: many(quizHistory),
}));

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
	user: one(users, {
		fields: [refreshTokens.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	refreshTokens: many(refreshTokens),
	achievements: many(achievements),
	quizHistories: many(quizHistory),
	faculty: one(faculties, {
		fields: [users.facultyId],
		references: [faculties.id]
	}),
	department: one(departments, {
		fields: [users.departmentId],
		references: [departments.id]
	}),
	supportRequests: many(supportRequests),
	supportMessages: many(supportMessages),
	userDevices: many(userDevices),
	notifications: many(notifications),
	conversationReads: many(conversationReads),
	messages: many(messages),
}));

export const departmentsRelations = relations(departments, ({one, many}) => ({
	faculty: one(faculties, {
		fields: [departments.facultyId],
		references: [faculties.id]
	}),
	courses: many(courses),
	users: many(users),
	conversations: many(conversations),
}));

export const facultiesRelations = relations(faculties, ({many}) => ({
	departments: many(departments),
	users: many(users),
	conversations: many(conversations),
}));

export const achievementsRelations = relations(achievements, ({one}) => ({
	user: one(users, {
		fields: [achievements.userId],
		references: [users.id]
	}),
}));

export const quizHistoryRelations = relations(quizHistory, ({one}) => ({
	user: one(users, {
		fields: [quizHistory.userId],
		references: [users.id]
	}),
	course: one(courses, {
		fields: [quizHistory.courseId],
		references: [courses.id]
	}),
}));

export const supportRequestsRelations = relations(supportRequests, ({one, many}) => ({
	user: one(users, {
		fields: [supportRequests.userId],
		references: [users.id]
	}),
	supportMessages: many(supportMessages),
}));

export const supportMessagesRelations = relations(supportMessages, ({one}) => ({
	supportRequest: one(supportRequests, {
		fields: [supportMessages.requestId],
		references: [supportRequests.id]
	}),
	user: one(users, {
		fields: [supportMessages.senderId],
		references: [users.id]
	}),
}));

export const userDevicesRelations = relations(userDevices, ({one}) => ({
	user: one(users, {
		fields: [userDevices.userId],
		references: [users.id]
	}),
}));

export const notificationsRelations = relations(notifications, ({one}) => ({
	user: one(users, {
		fields: [notifications.userId],
		references: [users.id]
	}),
}));

export const conversationReadsRelations = relations(conversationReads, ({one}) => ({
	conversation: one(conversations, {
		fields: [conversationReads.conversationId],
		references: [conversations.id]
	}),
	user: one(users, {
		fields: [conversationReads.userId],
		references: [users.id]
	}),
}));

export const conversationsRelations = relations(conversations, ({one, many}) => ({
	conversationReads: many(conversationReads),
	faculty: one(faculties, {
		fields: [conversations.facultyId],
		references: [faculties.id]
	}),
	department: one(departments, {
		fields: [conversations.departmentId],
		references: [departments.id]
	}),
	messages: many(messages),
}));

export const messagesRelations = relations(messages, ({one}) => ({
	conversation: one(conversations, {
		fields: [messages.conversationId],
		references: [conversations.id]
	}),
	user: one(users, {
		fields: [messages.senderId],
		references: [users.id]
	}),
}));