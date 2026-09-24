import { Router } from 'express';
import {
  getAcademicChannels,
  joinAcademicChannel,
  getRecentConversations,
  getConversation,
  getMessages,
  sendMessage,
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

export default router;

