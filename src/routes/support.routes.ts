import { Router } from 'express';
import {
  createSupportRequest,
  listUserSupportRequests,
  getSupportRequestDetails,
  addSupportMessage,
  updateSupportStatus,
} from '../controllers/support.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createSupportRequestSchema,
  addSupportMessageSchema,
  updateSupportStatusSchema,
} from '../schemas/support.schemas.js';

const router = Router();

// List user's tickets & Create a ticket
router.get('/requests', protect, listUserSupportRequests);
router.post(
  '/requests',
  protect,
  validate(createSupportRequestSchema),
  createSupportRequest
);

// Get specific ticket & add reply
router.get('/requests/:requestId', protect, getSupportRequestDetails);
router.post(
  '/requests/:requestId/messages',
  protect,
  validate(addSupportMessageSchema),
  addSupportMessage
);

// Update status (e.g. resolve/close ticket)
router.patch(
  '/requests/:requestId/status',
  protect,
  validate(updateSupportStatusSchema),
  updateSupportStatus
);

export default router;
