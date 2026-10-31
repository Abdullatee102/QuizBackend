import type { Response } from 'express';
import { questionWorkflowService } from '../../services/questionWorkflowService.js';
import { storageProvider } from '../../services/storage/storageService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import type { QuestionStatus } from '../../db/schema.js';

export const createQuestionDraftHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId || req.body.offeringId);
    if (!offeringId || offeringId === 'undefined') {
      res.status(400).json({ status: 'fail', message: 'Course offering ID is required.' });
      return;
    }

    const question = await questionWorkflowService.createDraft(
      lecturerId,
      offeringId,
      req.body,
      {
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(201).json({
      status: 'success',
      message: 'Question draft created successfully.',
      data: { question },
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to create question draft.',
    });
  }
};

export const listLecturerQuestionsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const { offeringId, courseId, status, type, difficulty, search, page, limit } = req.query;

    const result = await questionWorkflowService.getLecturerQuestions(lecturerId, {
      offeringId: offeringId as string | undefined,
      courseId: courseId as string | undefined,
      status: status as QuestionStatus | undefined,
      type: type as string | undefined,
      difficulty: difficulty as string | undefined,
      search: search as string | undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to retrieve questions.',
    });
  }
};

export const getLecturerQuestionDetailsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const { questionId } = req.params;

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const question = await questionWorkflowService.getLecturerQuestionById(
      lecturerId,
      String(questionId)
    );

    res.status(200).json({
      status: 'success',
      data: { question },
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: error.message || 'Question not found.',
    });
  }
};

export const updateQuestionDraftHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const { questionId } = req.params;

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const updated = await questionWorkflowService.updateDraft(
      lecturerId,
      String(questionId),
      req.body,
      {
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question draft updated successfully.',
      data: { question: updated },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('cannot be edited') || error.message?.includes('status');
    const isForbidden = error.message?.includes('Forbidden');

    res.status(isNotFound ? 404 : isConflict ? 409 : isForbidden ? 403 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to update question draft.',
    });
  }
};

export const submitQuestionHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const { questionId } = req.params;

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const submitted = await questionWorkflowService.submitQuestion(
      lecturerId,
      String(questionId),
      {
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question successfully submitted for departmental review.',
      data: { question: submitted },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('Cannot submit');
    const isForbidden = error.message?.includes('Forbidden');

    res.status(isNotFound ? 404 : isConflict ? 409 : isForbidden ? 403 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to submit question.',
    });
  }
};

export const withdrawQuestionHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const { questionId } = req.params;

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const withdrawn = await questionWorkflowService.withdrawSubmission(
      lecturerId,
      String(questionId),
      {
        ipAddress: req.ip || req.socket.remoteAddress || undefined,
        userAgent: req.headers['user-agent'] || undefined,
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Question submission withdrawn back to draft.',
      data: { question: withdrawn },
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('already under active review') || error.message?.includes('Cannot withdraw');

    res.status(isNotFound ? 404 : isConflict ? 409 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to withdraw question submission.',
    });
  }
};

export const deleteQuestionDraftHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    const { questionId } = req.params;

    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    await questionWorkflowService.deleteDraft(lecturerId, String(questionId));

    res.status(200).json({
      status: 'success',
      message: 'Question draft deleted successfully.',
    });
  } catch (error: any) {
    const isNotFound = error.message?.includes('not found');
    const isConflict = error.message?.includes('Cannot delete');

    res.status(isNotFound ? 404 : isConflict ? 409 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to delete question draft.',
    });
  }
};

export const uploadQuestionImageHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ status: 'fail', message: 'No image file uploaded.' });
      return;
    }

    const stored = await storageProvider.saveFile(file);

    res.status(201).json({
      status: 'success',
      message: 'Question diagram/image uploaded successfully.',
      data: {
        url: stored.url,
        fileName: stored.fileName,
        size: stored.size,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: 'fail',
      message: error.message || 'Failed to upload image.',
    });
  }
};

