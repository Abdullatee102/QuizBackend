import type { Response } from 'express';
import multer from 'multer';
import { questionWorkflowService } from '../../services/questionWorkflowService.js';
import { questionImportService } from '../../services/questionImportService.js';
import { questionPaperService, type ExamPaperConfig } from '../../services/questionPaperService.js';
import { storageProvider } from '../../services/storage/storageService.js';
import type { LecturerAuthenticatedRequest } from '../../types/lecturer.types.js';
import type { QuestionStatus } from '../../db/schema.js';

export const uploadWorkbook = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

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

/**
 * Downloads the standardized Excel question template (.xlsx) with sample rows & instructions.
 */
export const downloadQuestionTemplateHandler = async (
  _req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const buffer = questionImportService.generateExcelTemplate();

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Brain_Buzz_Questions_Template.xlsx"'
    );
    res.send(buffer);
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to generate Excel template.',
    });
  }
};

/**
 * Handles bulk parsing, row-level validation, duplicate detection, and import of questions.
 * Supports .xlsx, .csv, and .json files.
 */
export const bulkImportQuestionsHandler = async (
  req: LecturerAuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const lecturerId = req.lecturerUser?.id;
    if (!lecturerId) {
      res.status(401).json({ status: 'fail', message: 'Unauthorized' });
      return;
    }

    const offeringId = String(req.params.offeringId || req.body.offeringId || req.query.offeringId);
    if (!offeringId || offeringId === 'undefined') {
      res.status(400).json({ status: 'fail', message: 'Course offering ID is required.' });
      return;
    }

    const confirm = req.query.confirm === 'true' || req.body.confirm === true;
    const allowPartial = req.query.allowPartial === 'true' || req.body.allowPartial === true;

    let fileBuffer: Buffer | undefined;
    let fileType: 'xlsx' | 'csv' | 'json' = 'xlsx';

    if (req.file) {
      fileBuffer = req.file.buffer;
      const originalName = req.file.originalname.toLowerCase();
      if (originalName.endsWith('.csv')) {
        fileType = 'csv';
      } else if (originalName.endsWith('.json')) {
        fileType = 'json';
      } else {
        fileType = 'xlsx';
      }
    } else if (req.body.questions && Array.isArray(req.body.questions)) {
      fileBuffer = Buffer.from(JSON.stringify(req.body.questions), 'utf-8');
      fileType = 'json';
    } else if (req.body.rawContent && typeof req.body.rawContent === 'string') {
      fileBuffer = Buffer.from(req.body.rawContent, 'utf-8');
      fileType = req.body.format === 'csv' ? 'csv' : 'json';
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'No file or question payload provided. Upload an .xlsx, .csv, or .json file.',
      });
      return;
    }

    const result = await questionImportService.processImport(
      lecturerId,
      offeringId,
      fileBuffer,
      fileType,
      {
        confirm,
        allowPartial,
        auditContext: {
          ipAddress: req.ip || req.socket.remoteAddress || undefined,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: confirm
        ? `Successfully imported ${result.importedCount || 0} questions.`
        : 'File parsed and validated successfully.',
      data: result,
    });
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to process bulk question import.',
    });
  }
};

/**
 * Generates and downloads a clean, printable A4 academic examination paper or marking guide.
 */
export const generateQuestionPaperPdfHandler = async (
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

    const { questionIds, config = {} } = req.body;
    if (!Array.isArray(questionIds) || questionIds.length === 0) {
      res.status(400).json({
        status: 'fail',
        message: 'Please provide an array of questionIds to include in the paper.',
      });
      return;
    }

    const pdfBuffer = await questionPaperService.generatePaperPdf(
      lecturerId,
      offeringId,
      questionIds,
      config as ExamPaperConfig
    );

    const filename = config.withAnswerKey
      ? 'Examination_Marking_Guide.pdf'
      : 'Printable_Question_Paper.pdf';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error: any) {
    const isForbidden = error.message?.includes('Forbidden');
    const isNotFound = error.message?.includes('not found');
    res.status(isForbidden ? 403 : isNotFound ? 404 : 400).json({
      status: 'fail',
      message: error.message || 'Failed to generate question paper PDF.',
    });
  }
};


