import type { Response } from 'express';
import { eq, desc, asc, and, ilike, or, sql } from 'drizzle-orm';
import { db } from '../../db/index.js';
import {
  supportRequestsTable,
  supportMessagesTable,
  supportAttachmentsTable,
  usersTable,
} from '../../db/schema.js';
import { socketService } from '../../socket/index.js';
import { notificationService } from '../../services/notificationService.js';
import { auditService } from '../../services/admin/auditService.js';
import type { AdminAuthenticatedRequest } from '../../types/admin.types.js';

export const listAdminSupportRequests = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const offset = (page - 1) * limit;

    const status = req.query.status as string | undefined;
    const priority = req.query.priority as string | undefined;
    const category = req.query.category as string | undefined;
    const search = req.query.search || req.query.q;

    const conditions = [];

    if (status) {
      conditions.push(eq(supportRequestsTable.status, status.toLowerCase()));
    }
    if (priority) {
      conditions.push(eq(supportRequestsTable.priority, priority.toLowerCase()));
    }
    if (category) {
      conditions.push(eq(supportRequestsTable.category, category));
    }
    if (search && typeof search === 'string') {
      const pattern = `%${search.trim()}%`;
      conditions.push(
        or(
          ilike(supportRequestsTable.subject, pattern),
          ilike(usersTable.fullName, pattern),
          ilike(usersTable.email, pattern)
        )
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const requestsQuery = db
      .select({
        id: supportRequestsTable.id,
        userId: supportRequestsTable.userId,
        subject: supportRequestsTable.subject,
        category: supportRequestsTable.category,
        status: supportRequestsTable.status,
        priority: supportRequestsTable.priority,
        createdAt: supportRequestsTable.createdAt,
        updatedAt: supportRequestsTable.updatedAt,
        user: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
          username: usersTable.username,
          photoURL: usersTable.photoURL,
        },
      })
      .from(supportRequestsTable)
      .innerJoin(usersTable, eq(supportRequestsTable.userId, usersTable.id))
      .orderBy(desc(supportRequestsTable.updatedAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(supportRequestsTable)
      .innerJoin(usersTable, eq(supportRequestsTable.userId, usersTable.id));

    const [requests, countResult] = await Promise.all([
      whereClause ? requestsQuery.where(whereClause) : requestsQuery,
      whereClause ? countQuery.where(whereClause) : countQuery,
    ]);

    const total = countResult[0]?.count || 0;

    // Attach latest message and total message count
    const enriched = await Promise.all(
      requests.map(async (item) => {
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
          .where(eq(supportMessagesTable.requestId, item.id))
          .orderBy(desc(supportMessagesTable.createdAt))
          .limit(1);

        const [msgCount] = await db
          .select({ count: sql<number>`count(*)`.mapWith(Number) })
          .from(supportMessagesTable)
          .where(eq(supportMessagesTable.requestId, item.id));

        return {
          ...item,
          lastMessage: lastMsg || null,
          messageCount: msgCount?.count || 0,
        };
      })
    );

    res.status(200).json({
      status: 'success',
      data: {
        tickets: enriched,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch support requests: ${error.message}`,
    });
  }
};

export const getAdminSupportDetails = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { requestId } = req.params;

    const [request] = await db
      .select({
        id: supportRequestsTable.id,
        userId: supportRequestsTable.userId,
        subject: supportRequestsTable.subject,
        category: supportRequestsTable.category,
        status: supportRequestsTable.status,
        priority: supportRequestsTable.priority,
        createdAt: supportRequestsTable.createdAt,
        updatedAt: supportRequestsTable.updatedAt,
        user: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
          username: usersTable.username,
          phoneNumber: usersTable.phoneNumber,
          photoURL: usersTable.photoURL,
        },
      })
      .from(supportRequestsTable)
      .innerJoin(usersTable, eq(supportRequestsTable.userId, usersTable.id))
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      res.status(404).json({
        status: 'fail',
        message: 'Support ticket not found.',
      });
      return;
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
          email: usersTable.email,
          photoURL: usersTable.photoURL,
        },
      })
      .from(supportMessagesTable)
      .leftJoin(usersTable, eq(supportMessagesTable.senderId, usersTable.id))
      .where(eq(supportMessagesTable.requestId, requestId as any))
      .orderBy(asc(supportMessagesTable.createdAt));

    const attachments = await db
      .select({
        id: supportAttachmentsTable.id,
        requestId: supportAttachmentsTable.requestId,
        messageId: supportAttachmentsTable.messageId,
        uploadedBy: supportAttachmentsTable.uploadedBy,
        fileName: supportAttachmentsTable.fileName,
        mimeType: supportAttachmentsTable.mimeType,
        size: supportAttachmentsTable.size,
        url: supportAttachmentsTable.url,
        createdAt: supportAttachmentsTable.createdAt,
      })
      .from(supportAttachmentsTable)
      .where(eq(supportAttachmentsTable.requestId, requestId as any))
      .orderBy(desc(supportAttachmentsTable.createdAt));

    res.status(200).json({
      status: 'success',
      data: {
        ticket: {
          ...request,
          messages,
          attachments,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to fetch support ticket details: ${error.message}`,
    });
  }
};

export const replyToSupportRequest = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { requestId } = req.params;
    const { message } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({
        status: 'fail',
        message: 'Reply message is required.',
      });
      return;
    }

    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      res.status(404).json({
        status: 'fail',
        message: 'Support ticket not found.',
      });
      return;
    }

    const adminId = req.adminUser!.id;

    const [createdMsg] = await db
      .insert(supportMessagesTable)
      .values({
        requestId: requestId as any,
        senderId: adminId as any,
        senderRole: 'admin',
        message: message.trim(),
      })
      .returning();

    // Mark as in_progress if currently open
    const newStatus = request.status === 'open' ? 'in_progress' : request.status;

    await db
      .update(supportRequestsTable)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(supportRequestsTable.id, requestId as any));

    const fullMessage = {
      ...createdMsg,
      sender: {
        id: adminId,
        fullName: req.adminUser?.fullName || 'Support Team',
        email: req.adminUser?.email,
      },
    };

    // Emit live Socket.IO update
    try {
      socketService.emitToRoom(`support:${requestId}`, 'new_support_message', fullMessage);
    } catch {
      // non-blocking
    }

    // Send push notification & in-app notification to the ticket creator
    try {
      await notificationService.sendToUser(
        String(request.userId),
        'Support Ticket Update',
        `A support agent replied to your ticket: "${request.subject}"`,
        { ticketId: requestId }
      );
      await notificationService.createNotification({
        userId: String(request.userId),
        type: 'support_update',
        title: 'Support Ticket Update',
        body: `Support response received for "${request.subject}"`,
        data: { ticketId: requestId },
      });
    } catch {
      // non-blocking
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: adminId,
      action: 'SUPPORT_REPLY',
      resourceType: 'support',
      resourceId: String(requestId),
      metadata: {
        ticketSubject: request.subject,
        ticketOwnerId: request.userId,
      },
      ipAddress,
      userAgent,
    });

    res.status(201).json({
      status: 'success',
      message: 'Support reply dispatched successfully.',
      data: { message: fullMessage },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to reply to support ticket: ${error.message}`,
    });
  }
};

export const updateSupportStatus = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const validCanonicalStatuses = [
      'OPEN',
      'AI_HANDLING',
      'WAITING_FOR_ADMIN',
      'IN_PROGRESS',
      'WAITING_FOR_USER',
      'RESOLVED',
      'CLOSED',
    ];

    const normalizedStatus = String(status || '').toUpperCase();
    if (!normalizedStatus || !validCanonicalStatuses.includes(normalizedStatus)) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid status. Must be one of: ${validCanonicalStatuses.join(', ')}`,
      });
      return;
    }

    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      res.status(404).json({
        status: 'fail',
        message: 'Support ticket not found.',
      });
      return;
    }

    const [updated] = await db
      .update(supportRequestsTable)
      .set({
        status: normalizedStatus,
        updatedAt: new Date(),
      })
      .where(eq(supportRequestsTable.id, requestId as any))
      .returning();

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'SUPPORT_STATUS_UPDATE',
      resourceType: 'support',
      resourceId: String(requestId),
      metadata: {
        previousStatus: request.status,
        newStatus: normalizedStatus,
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: `Ticket status updated to ${normalizedStatus}.`,
      data: { ticket: updated },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update support status: ${error.message}`,
    });
  }
};

export const updateSupportPriority = async (
  req: AdminAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { requestId } = req.params;
    const { priority } = req.body;

    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    if (!priority || !validPriorities.includes(priority.toLowerCase())) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid priority. Must be one of: ${validPriorities.join(', ')}`,
      });
      return;
    }

    const [request] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!request) {
      res.status(404).json({
        status: 'fail',
        message: 'Support ticket not found.',
      });
      return;
    }

    const [updated] = await db
      .update(supportRequestsTable)
      .set({
        priority: priority.toLowerCase(),
        updatedAt: new Date(),
      })
      .where(eq(supportRequestsTable.id, requestId as any))
      .returning();

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || null;
    const userAgent = req.headers['user-agent'] || null;

    await auditService.logAdminAction({
      adminUserId: req.adminUser!.id,
      action: 'SUPPORT_PRIORITY_UPDATE',
      resourceType: 'support',
      resourceId: String(requestId),
      metadata: {
        previousPriority: request.priority,
        newPriority: priority.toLowerCase(),
      },
      ipAddress,
      userAgent,
    });

    res.status(200).json({
      status: 'success',
      message: `Ticket priority updated to ${priority}.`,
      data: { ticket: updated },
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: `Failed to update support priority: ${error.message}`,
    });
  }
};

