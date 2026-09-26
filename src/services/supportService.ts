import { eq, desc, asc, and, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  supportRequestsTable,
  supportMessagesTable,
  usersTable,
} from '../db/schema.js';
import { socketService } from '../socket/index.js';

export const supportService = {
  // =====================================================
  // CREATE SUPPORT REQUEST
  // =====================================================
  createSupportRequest: async (params: {
    userId: string | number;
    subject: string;
    category: string;
    message: string;
    priority?: string;
  }) => {
    const { userId, subject, category, message, priority = 'medium' } = params;

    const [createdRequest] = await db
      .insert(supportRequestsTable)
      .values({
        userId: userId as any,
        subject,
        category,
        status: 'open',
        priority,
      })
      .returning();

    if (!createdRequest) {
      throw new Error('Failed to create support request record');
    }

    const [createdMsg] = await db
      .insert(supportMessagesTable)
      .values({
        requestId: createdRequest.id,
        senderId: userId as any,
        senderRole: 'user',
        message,
      })
      .returning();

    const [sender] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        photoURL: usersTable.photoURL,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    return {
      ...createdRequest,
      initialMessage: {
        ...createdMsg,
        sender: sender || null,
      },
    };
  },

  // =====================================================
  // LIST USER SUPPORT REQUESTS
  // =====================================================
  listUserSupportRequests: async (userId: string | number) => {
    const requests = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.userId, userId as any))
      .orderBy(desc(supportRequestsTable.updatedAt));

    const enriched = await Promise.all(
      requests.map(async (req) => {
        const [lastMsg] = await db
          .select({
            id: supportMessagesTable.id,
            message: supportMessagesTable.message,
            senderRole: supportMessagesTable.senderRole,
            createdAt: supportMessagesTable.createdAt,
            senderName: usersTable.fullName,
          })
          .from(supportMessagesTable)
          .leftJoin(usersTable, eq(supportMessagesTable.senderId, usersTable.id))
          .where(eq(supportMessagesTable.requestId, req.id))
          .orderBy(desc(supportMessagesTable.createdAt))
          .limit(1);

        const [countRow] = await db
          .select({
            count: sql<number>`count(${supportMessagesTable.id})`.mapWith(Number),
          })
          .from(supportMessagesTable)
          .where(eq(supportMessagesTable.requestId, req.id));

        return {
          ...req,
          lastMessage: lastMsg || null,
          messageCount: countRow?.count || 0,
        };
      })
    );

    return enriched;
  },

  // =====================================================
  // GET SUPPORT REQUEST DETAILS & MESSAGES
  // =====================================================
  getSupportRequestDetails: async (requestId: string, userId: string | number) => {
    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(
        and(
          eq(supportRequestsTable.id, requestId as any),
          eq(supportRequestsTable.userId, userId as any)
        )
      );

    if (!request) {
      return null;
    }

    const messages = await db
      .select({
        id: supportMessagesTable.id,
        requestId: supportMessagesTable.requestId,
        senderId: supportMessagesTable.senderId,
        senderRole: supportMessagesTable.senderRole,
        message: supportMessagesTable.message,
        createdAt: supportMessagesTable.createdAt,
        sender: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          username: usersTable.username,
          photoURL: usersTable.photoURL,
        },
      })
      .from(supportMessagesTable)
      .leftJoin(usersTable, eq(supportMessagesTable.senderId, usersTable.id))
      .where(eq(supportMessagesTable.requestId, requestId as any))
      .orderBy(asc(supportMessagesTable.createdAt));

    return {
      ...request,
      messages,
    };
  },

  // =====================================================
  // ADD MESSAGE TO SUPPORT REQUEST
  // =====================================================
  addSupportMessage: async (params: {
    requestId: string;
    userId: string | number;
    message: string;
    senderRole?: string;
  }) => {
    const { requestId, userId, message, senderRole = 'user' } = params;

    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      throw new Error('Support ticket not found.');
    }

    // Verify ownership
    if (String(request.userId) !== String(userId) && senderRole === 'user') {
      throw new Error('Unauthorized to reply to this support ticket.');
    }

    const [createdMsg] = await db
      .insert(supportMessagesTable)
      .values({
        requestId: requestId as any,
        senderId: userId as any,
        senderRole,
        message,
      })
      .returning();

    // Update timestamp on request
    await db
      .update(supportRequestsTable)
      .set({ updatedAt: new Date() })
      .where(eq(supportRequestsTable.id, requestId as any));

    const [sender] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        photoURL: usersTable.photoURL,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    const fullMessage = {
      ...createdMsg,
      sender: sender || null,
    };

    // Emit real-time event to support room
    try {
      socketService.emitToRoom(`support:${requestId}`, 'new_support_message', fullMessage);
    } catch {
      // Non-blocking if socket is not connected
    }

    return fullMessage;
  },

  // =====================================================
  // UPDATE SUPPORT STATUS
  // =====================================================
  updateSupportStatus: async (
    requestId: string,
    status: string
  ) => {
    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      throw new Error('Support ticket not found.');
    }

    const [updated] = await db
      .update(supportRequestsTable)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(supportRequestsTable.id, requestId as any))
      .returning();

    return updated;
  },
};
