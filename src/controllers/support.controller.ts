import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { supportService } from '../services/supportService.js';

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

  // Authorization check: Only support/admin roles are permitted to change support status
  const userRole = req.user?.role || req.user?.userRole;
  if (userRole !== 'admin' && userRole !== 'support' && userRole !== 'agent') {
    logger.warn(`[SUPPORT AUTH] Unauthorized status update attempt by user ${userId} with role ${userRole || 'student'}`);
    res.status(403).json({
      status: 'fail',
      message: 'Forbidden: Only support representatives or administrators can change support ticket status.',
    });
    return;
  }

  const { requestId } = req.params;
  const { status } = req.body;

  try {
    const updated = await supportService.updateSupportStatus(
      requestId as string,
      status
    );

    res.status(200).json({
      status: 'success',
      message: `Support status updated to ${status}`,
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
