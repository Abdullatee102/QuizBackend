import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { messageService } from '../services/messageService.js';

// =====================================================
// GET ACADEMIC CHANNELS (FACULTY / DEPT / LEVEL)
// =====================================================

export const getAcademicChannels = async (
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const channels = await messageService.listAcademicChannels();
    res.status(200).json({
      status: 'success',
      data: channels,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error fetching academic channels: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch academic channels',
    });
  }
};

// =====================================================
// JOIN OR GET ACADEMIC CHANNEL CONVERSATION
// =====================================================

export const joinAcademicChannel = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { type, targetId, level, title, code } = req.body;
    const conversation = await messageService.getOrCreateAcademicChannel({
      type,
      targetId,
      level,
      title,
      code,
    });

    res.status(200).json({
      status: 'success',
      data: conversation,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error joining academic channel: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to access academic discussion channel',
    });
  }
};

// =====================================================
// GET RECENT CONVERSATIONS
// =====================================================

export const getRecentConversations = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id || req.user?.userId;
    const conversations = await messageService.listRecentConversations(userId);

    res.status(200).json({
      status: 'success',
      data: conversations,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error fetching recent conversations: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch conversations',
    });
  }
};

// =====================================================
// GET CONVERSATION BY ID
// =====================================================

export const getConversation = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const conversation = await messageService.getConversationById(conversationId as string);

    if (!conversation) {
      res.status(404).json({
        status: 'fail',
        message: 'Conversation not found',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: conversation,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error fetching conversation: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch conversation',
    });
  }
};

// =====================================================
// GET CONVERSATION MESSAGES
// =====================================================

export const getMessages = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const limit = parseInt(req.query.limit as string, 10) || 50;

    const messages = await messageService.getMessages(conversationId as string, limit);

    res.status(200).json({
      status: 'success',
      data: messages,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error fetching messages: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch messages',
    });
  }
};

// =====================================================
// SEND MESSAGE
// =====================================================

export const sendMessage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;
    const senderId = req.user?.id || req.user?.userId;

    if (!senderId) {
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized',
      });
      return;
    }

    const message = await messageService.sendMessage(
      conversationId as string,
      senderId,
      text
    );

    res.status(201).json({
      status: 'success',
      data: message,
    });
  } catch (error: any) {
    logger.error(`[MESSAGES] Error sending message: ${error.message}`);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to send message',
    });
  }
};

