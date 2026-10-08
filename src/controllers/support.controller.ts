import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { supportService } from '../services/supportService.js';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { supportRequestsTable, supportAttachmentsTable } from '../db/schema.js';
import { storageProvider } from '../services/storage/storageService.js';
import { isAdminRole, hasPermission } from '../config/permissions.js';

// =====================================================
// CREATE SUPPORT REQUEST
// =====================================================

export const createSupportRequest = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const { subject, category, message, priority } = req.body;

  try {
    const newRequest = await supportService.createSupportRequest({
      userId,
      subject,
      category,
      message,
      priority,
    });

    logger.info(`[SUPPORT] Created ticket ${newRequest.id} for user ${userId}`);

    // Async AI Reply (non-blocking)
    import('../services/ai/index.js').then(({ aiProvider }) => {
      if (aiProvider.isAvailable()) {
        aiProvider.generateSupportResponse({ userMessage: message }).then(async (aiReply) => {
          const nextStatus = aiReply.needsHumanSupport ? 'WAITING_FOR_ADMIN' : 'WAITING_FOR_USER';

          await supportService.addSupportMessage({
            requestId: newRequest.id as string,
            userId,
            message: aiReply.answer,
            senderRole: 'ai_assistant',
          });

          await supportService.updateSupportStatus(newRequest.id as string, nextStatus);

          // Dispatch single in-app notification & update unread badge
          import('../services/notificationService.js').then(({ notificationService }) => {
            notificationService.createNotification({
              userId: String(userId),
              type: 'message',
              title: 'New Support AI Reply 🤖',
              body: aiReply.answer.substring(0, 100) + (aiReply.answer.length > 100 ? '...' : ''),
              data: { url: '/support', requestId: newRequest.id },
            }).catch(() => {});
          }).catch(() => {});
        }).catch((err) => logger.error(`AI Reply error: ${err}`));
      }
    }).catch((err) => logger.error(`AI module error: ${err}`));

    res.status(201).json({
      status: 'success',
      message: 'Support request submitted successfully',
      data: newRequest,
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ERROR]: ${error.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to create support request',
    });
  }
};

// =====================================================
// LIST USER SUPPORT REQUESTS
// =====================================================

export const listUserSupportRequests = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const requests = await supportService.listUserSupportRequests(userId);

    res.status(200).json({
      status: 'success',
      count: requests.length,
      data: requests,
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ERROR]: ${error.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch support requests',
    });
  }
};

// =====================================================
// GET SUPPORT REQUEST DETAILS
// =====================================================

export const getSupportRequestDetails = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const { requestId } = req.params;

  try {
    const requestDetails = await supportService.getSupportRequestDetails(
      requestId as string,
      userId
    );

    if (!requestDetails) {
      res.status(404).json({
        status: 'fail',
        message: 'Support request not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: requestDetails,
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ERROR]: ${error.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch support request details',
    });
  }
};

// =====================================================
// ADD MESSAGE TO SUPPORT REQUEST
// =====================================================

export const addSupportMessage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const { requestId } = req.params;
  const { message } = req.body;

  try {
    const newMessage = await supportService.addSupportMessage({
      requestId: requestId as string,
      userId,
      message,
    });

    // Async AI Reply (non-blocking)
    import('../services/ai/index.js').then(({ aiProvider }) => {
      if (aiProvider.isAvailable()) {
        aiProvider.generateSupportResponse({ userMessage: message }).then(async (aiReply) => {
          const nextStatus = aiReply.needsHumanSupport ? 'WAITING_FOR_ADMIN' : 'WAITING_FOR_USER';

          await supportService.addSupportMessage({
            requestId: requestId as string,
            userId,
            message: aiReply.answer,
            senderRole: 'ai_assistant',
          });

          await supportService.updateSupportStatus(requestId as string, nextStatus);
        }).catch((err) => logger.error(`AI Reply error: ${err}`));
      }
    }).catch((err) => logger.error(`AI module error: ${err}`));

    res.status(201).json({
      status: 'success',
      message: 'Reply sent successfully',
      data: newMessage,
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ERROR]: ${error.message || error}`);
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to send reply',
    });
  }
};

// =====================================================
// UPDATE SUPPORT STATUS
// =====================================================

export const updateSupportStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const [ticket] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!ticket) {
      res.status(404).json({
        status: 'fail',
        message: 'Support ticket not found',
      });
      return;
    }

    const userRole = (req.user?.role || 'STUDENT').toUpperCase();
    const isOwner = String(ticket.userId) === String(userId);
    const isAdmin = isAdminRole(userRole);

    const normalizedStatus = String(status).toUpperCase();
    const validCanonicalStatuses = [
      'OPEN',
      'AI_HANDLING',
      'WAITING_FOR_ADMIN',
      'IN_PROGRESS',
      'WAITING_FOR_USER',
      'RESOLVED',
      'CLOSED',
    ];

    if (!validCanonicalStatuses.includes(normalizedStatus)) {
      res.status(400).json({
        status: 'fail',
        message: `Invalid status: ${status}. Must be one of: ${validCanonicalStatuses.join(', ')}`,
      });
      return;
    }

    // Owner can mark ticket as RESOLVED or CLOSED; Admins can set any valid status
    if (!isAdmin && (!isOwner || !['RESOLVED', 'CLOSED'].includes(normalizedStatus))) {
      logger.warn(`[SUPPORT AUTH] Unauthorized status update attempt by user ${userId} with role ${userRole}`);
      res.status(403).json({
        status: 'fail',
        message: 'Forbidden: Students may only resolve or close their own tickets.',
      });
      return;
    }

    const updated = await supportService.updateSupportStatus(
      requestId as string,
      normalizedStatus
    );

    res.status(200).json({
      status: 'success',
      message: `Support status updated to ${normalizedStatus}`,
      data: updated,
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ERROR]: ${error.message || error}`);
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to update support status',
    });
  }
};

// =====================================================
// UPLOAD SUPPORT ATTACHMENT
// =====================================================

export const uploadSupportAttachment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }

  const { requestId } = req.params;
  const file = req.file;

  if (!file) {
    res.status(400).json({ status: 'fail', message: 'No file uploaded or invalid file format.' });
    return;
  }

  try {
    const [ticket] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!ticket) {
      res.status(404).json({ status: 'fail', message: 'Support ticket not found.' });
      return;
    }

    const userRole = (req.user?.role || 'STUDENT').toUpperCase();
    const isOwner = String(ticket.userId) === String(userId);
    const isAdmin = isAdminRole(userRole) && hasPermission(userRole, 'support.read');

    if (!isOwner && !isAdmin) {
      res.status(403).json({ status: 'fail', message: 'Forbidden: You cannot upload attachments to this ticket.' });
      return;
    }

    const storedFile = await storageProvider.saveFile(file);

    const attachment = await supportService.addSupportAttachment({
      requestId: requestId as string,
      uploadedBy: String(userId),
      fileName: storedFile.fileName,
      mimeType: storedFile.mimeType,
      size: storedFile.size,
      storageKey: storedFile.storageKey,
      url: `/api/support/requests/${requestId}/attachments/pending/file`,
      messageId: req.body?.messageId,
    });

    if (!attachment) {
      throw new Error('Failed to create attachment record in database.');
    }

    const directUrl = `/api/support/requests/${requestId}/attachments/${attachment.id}/file`;
    await db
      .update(supportAttachmentsTable)
      .set({ url: directUrl })
      .where(eq(supportAttachmentsTable.id, attachment.id));

    res.status(201).json({
      status: 'success',
      message: 'Attachment uploaded successfully',
      data: {
        attachment: {
          ...attachment,
          url: directUrl,
        },
      },
    });
  } catch (error: any) {
    logger.error(`[SUPPORT ATTACHMENT ERROR]: ${error.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Failed to upload attachment',
    });
  }
};

// =====================================================
// DOWNLOAD / SERVE SUPPORT ATTACHMENT
// =====================================================

export const downloadSupportAttachment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }

  const { requestId, attachmentId } = req.params;

  try {
    const attachment = await supportService.getSupportAttachment(attachmentId as string);

    if (!attachment || String(attachment.requestId) !== String(requestId)) {
      res.status(404).json({ status: 'fail', message: 'Attachment not found.' });
      return;
    }

    const [ticket] = await db
      .select()
      .from(supportRequestsTable)
      .where(eq(supportRequestsTable.id, requestId as any));

    if (!ticket) {
      res.status(404).json({ status: 'fail', message: 'Support ticket not found.' });
      return;
    }

    const userRole = (req.user?.role || 'STUDENT').toUpperCase();
    const isOwner = String(ticket.userId) === String(userId);
    const isAdmin = isAdminRole(userRole) && hasPermission(userRole, 'support.read');

    if (!isOwner && !isAdmin) {
      res.status(403).json({ status: 'fail', message: 'Forbidden: Access to this attachment is restricted.' });
      return;
    }

    const filePath = storageProvider.getFilePath(attachment.storageKey);
    const exists = await storageProvider.fileExists(attachment.storageKey);

    if (!exists) {
      res.status(404).json({ status: 'fail', message: 'Attachment file not found on disk.' });
      return;
    }

    res.setHeader('Content-Type', attachment.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${attachment.fileName}"`);
    res.sendFile(filePath);
  } catch (error: any) {
    logger.error(`[ATTACHMENT DOWNLOAD ERROR]: ${error.message || error}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to retrieve attachment',
    });
  }
};
