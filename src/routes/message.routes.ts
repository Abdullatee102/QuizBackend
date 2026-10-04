import { Router } from 'express';
import {
  getAcademicChannels,
  joinAcademicChannel,
  getRecentConversations,
  getConversation,
  getMessages,
  sendMessage,
  markConversationAsRead,
  getUnreadConversationsCount,
} from '../controllers/message.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  sendMessageSchema,
  joinAcademicChannelSchema,
} from '../schemas/message.schemas.js';

const router = Router();

// Academic discussion channels
router.get('/academic-channels', protect, getAcademicChannels);
router.post(
  '/academic-channels/join',
  protect,
  validate(joinAcademicChannelSchema),
  joinAcademicChannel
);

// Unread count
router.get('/conversations/unread-count', protect, getUnreadConversationsCount);

// Conversations (Recent chats)
router.get('/conversations', protect, getRecentConversations);
router.get('/conversations/:conversationId', protect, getConversation);

// Messages in a conversation
router.get('/conversations/:conversationId/messages', protect, getMessages);
router.post(
  '/conversations/:conversationId/messages',
  protect,
  validate(sendMessageSchema),
  sendMessage
);
router.post(
  '/conversations/:conversationId/read',
  protect,
  markConversationAsRead
);

export default router;

