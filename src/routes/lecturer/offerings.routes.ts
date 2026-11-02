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
import {
  createAssessmentDraftHandler,
  listOfferingAssessmentsHandler,
} from '../../controllers/lecturer/assessments.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createQuestionDraftSchema } from '../../schemas/questionWorkflow.schemas.js';
import { createAssessmentSchema } from '../../schemas/assessment.schemas.js';

const router = Router();

router.use(protectLecturer);

router.get('/', listLecturerOfferingsHandler);
router.get('/:offeringId', getLecturerOfferingDetailsHandler);
router.get('/:offeringId/students', listLecturerOfferingStudentsHandler);
router.get('/:offeringId/questions', listLecturerQuestionsHandler);
router.post('/:offeringId/questions', validate(createQuestionDraftSchema), createQuestionDraftHandler);
router.get('/:offeringId/assessments', listOfferingAssessmentsHandler);
router.post('/:offeringId/assessments', validate(createAssessmentSchema), createAssessmentDraftHandler);

export default router;

