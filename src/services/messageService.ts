import { eq, desc, asc, and, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  conversationsTable,
  messagesTable,
  usersTable,
  facultiesTable,
  departmentsTable,
} from '../db/schema.js';

export const messageService = {
  // =====================================================
  // GET OR CREATE CONVERSATION FOR ACADEMIC CONTEXT
  // =====================================================
  getOrCreateAcademicChannel: async (params: {
    type: 'faculty' | 'department' | 'level';
    targetId?: string;
    level?: number;
    title: string;
    code?: string;
  }) => {
    const { type, targetId, level, title, code } = params;

    let condition;
    if (type === 'faculty' && targetId) {
      condition = and(
        eq(conversationsTable.type, 'faculty'),
        eq(conversationsTable.facultyId, targetId as any)
      );
    } else if (type === 'department' && targetId) {
      condition = and(
        eq(conversationsTable.type, 'department'),
        eq(conversationsTable.departmentId, targetId as any)
      );
    } else if (type === 'level' && level) {
      condition = and(
        eq(conversationsTable.type, 'level'),
        eq(conversationsTable.level, level)
      );
    } else {
      condition = and(
        eq(conversationsTable.type, type),
        eq(conversationsTable.title, title)
      );
    }

    const [existing] = await db
      .select()
      .from(conversationsTable)
      .where(condition);

    if (existing) {
      return existing;
    }

    const [created] = await db
      .insert(conversationsTable)
      .values({
        type,
        title,
        code: code || null,
        facultyId: type === 'faculty' ? (targetId as any) : null,
        departmentId: type === 'department' ? (targetId as any) : null,
        level: type === 'level' ? level : null,
      })
      .returning();

    return created;
  },

  // =====================================================
  // LIST ACADEMIC CHANNELS (FACULTY, DEPARTMENT, LEVEL)
  // =====================================================
  listAcademicChannels: async () => {
    // 1. Faculties
    const faculties = await db
      .select({
        id: facultiesTable.id,
        name: facultiesTable.name,
        code: facultiesTable.code,
      })
      .from(facultiesTable);

    // 2. Sample key departments
    const departments = await db
      .select({
        id: departmentsTable.id,
        name: departmentsTable.name,
        code: departmentsTable.code,
        facultyId: departmentsTable.facultyId,
      })
      .from(departmentsTable);

    // 3. Levels
    const levels = [100, 200, 300, 400, 500];

    return {
      faculties: faculties.map((f) => ({
        type: 'faculty' as const,
        id: f.id,
        title: f.name,
        code: f.code,
        description: `${f.code} Academic Community & Discussion`,
      })),
      departments: departments.map((d) => ({
        type: 'department' as const,
        id: d.id,
        title: d.name,
        code: d.code,
        facultyId: d.facultyId,
        description: `${d.code} Departmental Academic Forum`,
      })),
      levels: levels.map((lvl) => ({
        type: 'level' as const,
        level: lvl,
        title: `${lvl} Level Scholars`,
        code: `${lvl}L`,
        description: `General discussion & study group for ${lvl} level students`,
      })),
    };
  },

  // =====================================================
  // LIST ACTIVE CONVERSATIONS (RECENT CHATS)
  // =====================================================
  listRecentConversations: async (_userId?: string | number) => {
    const conversations = await db
      .select({
        id: conversationsTable.id,
        type: conversationsTable.type,
        title: conversationsTable.title,
        code: conversationsTable.code,
        level: conversationsTable.level,
        facultyId: conversationsTable.facultyId,
        departmentId: conversationsTable.departmentId,
        createdAt: conversationsTable.createdAt,
        updatedAt: conversationsTable.updatedAt,
      })
      .from(conversationsTable)
      .orderBy(desc(conversationsTable.updatedAt))
      .limit(30);

    // For each conversation, fetch the last message and total message count
    const enriched = await Promise.all(
      conversations.map(async (conv) => {
        const [lastMsg] = await db
          .select({
            id: messagesTable.id,
            text: messagesTable.text,
            createdAt: messagesTable.createdAt,
            senderId: messagesTable.senderId,
            senderName: usersTable.fullName,
          })
          .from(messagesTable)
          .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id))
          .where(eq(messagesTable.conversationId, conv.id))
          .orderBy(desc(messagesTable.createdAt))
          .limit(1);

        const [countRow] = await db
          .select({
            count: sql<number>`count(${messagesTable.id})`.mapWith(Number),
          })
          .from(messagesTable)
          .where(eq(messagesTable.conversationId, conv.id));

        return {
          ...conv,
          lastMessage: lastMsg || null,
          messageCount: countRow?.count || 0,
        };
      })
    );

    // Only return conversations that have at least 1 message or are active
    return enriched.filter((c) => c.messageCount > 0);
  },

  // =====================================================
  // GET CONVERSATION DETAILS
  // =====================================================
  getConversationById: async (conversationId: string) => {
    const [conv] = await db
      .select()
      .from(conversationsTable)
      .where(eq(conversationsTable.id, conversationId as any));

    return conv || null;
  },

  // =====================================================
  // GET CONVERSATION MESSAGES
  // =====================================================
  getMessages: async (conversationId: string, limit = 50) => {
    const messages = await db
      .select({
        id: messagesTable.id,
        conversationId: messagesTable.conversationId,
        senderId: messagesTable.senderId,
        text: messagesTable.text,
        createdAt: messagesTable.createdAt,
        sender: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          username: usersTable.username,
          photoURL: usersTable.photoURL,
        },
      })
      .from(messagesTable)
      .leftJoin(usersTable, eq(messagesTable.senderId, usersTable.id))
      .where(eq(messagesTable.conversationId, conversationId as any))
      .orderBy(asc(messagesTable.createdAt))
      .limit(limit);

    return messages;
  },

  // =====================================================
  // SEND MESSAGE
  // =====================================================
  sendMessage: async (
    conversationId: string,
    senderId: string | number,
    text: string
  ) => {
    const [createdMsg] = await db
      .insert(messagesTable)
      .values({
        conversationId: conversationId as any,
        senderId: senderId as any,
        text,
      })
      .returning();

    // Update conversation updatedAt timestamp
    await db
      .update(conversationsTable)
      .set({ updatedAt: new Date() })
      .where(eq(conversationsTable.id, conversationId as any));

    // Fetch sender info
    const [sender] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        photoURL: usersTable.photoURL,
      })
      .from(usersTable)
      .where(eq(usersTable.id, senderId as any));

    return {
      ...createdMsg,
      sender: sender || null,
    };
  },
};
