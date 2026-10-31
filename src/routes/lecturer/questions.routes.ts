import { Router } from 'express';
import {
  createQuestionDraftHandler,
  listLecturerQuestionsHandler,
  getLecturerQuestionDetailsHandler,
  updateQuestionDraftHandler,
  submitQuestionHandler,
  withdrawQuestionHandler,
  deleteQuestionDraftHandler,
  uploadQuestionImageHandler,
} from '../../controllers/lecturer/questions.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createQuestionDraftSchema,
  updateQuestionDraftSchema,
  listQuestionsQuerySchema,
} from '../../schemas/questionWorkflow.schemas.js';
import { uploadAttachment } from '../../services/storage/storageService.js';

const router = Router();

router.use(protectLecturer);

// Question image upload
router.post('/upload-image', uploadAttachment.single('file'), uploadQuestionImageHandler);

// Question drafts and listing
router.get('/', validate(listQuestionsQuerySchema), listLecturerQuestionsHandler);
router.post('/', validate(createQuestionDraftSchema), createQuestionDraftHandler);
router.post('/offerings/:offeringId', validate(createQuestionDraftSchema), createQuestionDraftHandler);

// Question item operations
router.get('/:questionId', getLecturerQuestionDetailsHandler);
router.patch('/:questionId', validate(updateQuestionDraftSchema), updateQuestionDraftHandler);
router.post('/:questionId/submit', submitQuestionHandler);
router.post('/:questionId/withdraw', withdrawQuestionHandler);
router.delete('/:questionId', deleteQuestionDraftHandler);

export default router;

