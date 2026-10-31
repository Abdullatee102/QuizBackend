import { Router } from 'express';
import {
  listLecturerOfferingsHandler,
  getLecturerOfferingDetailsHandler,
  listLecturerOfferingStudentsHandler,
} from '../../controllers/lecturer/offerings.controller.js';
import {
  createQuestionDraftHandler,
  listLecturerQuestionsHandler,
} from '../../controllers/lecturer/questions.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createQuestionDraftSchema } from '../../schemas/questionWorkflow.schemas.js';

const router = Router();

router.use(protectLecturer);

router.get('/', listLecturerOfferingsHandler);
router.get('/:offeringId', getLecturerOfferingDetailsHandler);
router.get('/:offeringId/students', listLecturerOfferingStudentsHandler);
router.get('/:offeringId/questions', listLecturerQuestionsHandler);
router.post('/:offeringId/questions', validate(createQuestionDraftSchema), createQuestionDraftHandler);

export default router;

