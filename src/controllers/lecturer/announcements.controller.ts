import type { Response } from 'express';
import { announcementService } from '../../services/announcementService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import logger from '../../config/logger.js';

export const createAnnouncementHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const announcement = await announcementService.createAnnouncement(
      lecturerId,
      offeringId,
      req.body
    );

    res.status(201).json({
      status: 'success',
      data: announcement,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to create course announcement.',
    });
  }
};

export const listOfferingAnnouncementsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const { status, priority } = req.query;

    const data = await announcementService.listOfferingAnnouncementsForLecturer(
      lecturerId,
      offeringId,
      {
        status: typeof status === 'string' ? status : undefined,
        priority: typeof priority === 'string' ? priority : undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 500;

    res.status(statusCode).json({
      status: statusCode === 500 ? 'error' : 'fail',
      message: error.message || 'Failed to list course announcements.',
    });
  }
};

export const updateAnnouncementHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const announcementId = String(req.params.announcementId);

    const updated = await announcementService.updateAnnouncement(
      lecturerId,
      offeringId,
      announcementId,
      req.body
    );

    res.status(200).json({
      status: 'success',
      data: updated,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to update course announcement.',
    });
  }
};

export const deleteAnnouncementHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId);
    const announcementId = String(req.params.announcementId);

    const result = await announcementService.deleteAnnouncement(
      lecturerId,
      offeringId,
      announcementId
    );

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : 400;

    res.status(statusCode).json({
      status: 'fail',
      message: error.message || 'Failed to delete course announcement.',
    });
  }
};

