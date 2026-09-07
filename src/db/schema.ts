import { pgTable, text, timestamp, integer, real, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullName: text('full_name').notNull(),
  username: text('username').unique(),
  email: text('email').unique(),
  phoneNumber: text('phone_number').unique(),
  bio: text('bio'),
  photoURL: text('photo_url'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const refreshTokensTable = pgTable('refresh_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete:"cascade" }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const quizHistoryTable = pgTable('quiz_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  category: text('category').notNull(),
  score: real('score').notNull(),
  correctAnswers: integer('correct_answers').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const achievementsTable = pgTable('achievements', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
  achievementKey: text('achievement_key').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  icon: text('icon'),
  unlockedAt: timestamp('created_at').defaultNow().notNull(),
});

export const questionsTable = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  category: text('category').notNull(),
  question: text('question').notNull(),
  options: text('options').array().notNull(), 
  correctAnswer: text('correct_answer').notNull(),
  difficulty: text('difficulty').default('medium').notNull(),
});