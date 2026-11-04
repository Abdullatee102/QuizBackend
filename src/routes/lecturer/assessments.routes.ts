import { Router } from 'express';
import {
  createAssessmentDraftHandler,
  listOfferingAssessmentsHandler,
  getAssessmentDetailsHandler,
  updateAssessmentDraftHandler,
  assignQuestionsHandler,
  publishAssessmentHandler,
  rescheduleAssessmentHandler,
  extendAssessmentHandler,
  cancelAssessmentHandler,
  getAssessmentAuditLogsHandler,
} from '../../controllers/lecturer/assessments.controller.js';
import {
  getAssessmentMonitorHandler,
  forceSubmitAttemptHandler,
} from '../../controllers/lecturer/assessmentMonitor.controller.js';
import {
  getLecturerGradingOverviewHandler,
  getAttemptGradingDetailHandler,
  gradeTheoryQuestionsHandler,
  getAiTheorySuggestionHandler,
} from '../../controllers/lecturer/assessmentGrading.controller.js';
import {
  getAssessmentGradebookHandler,
  moderateGradeHandler,
  submitResultsApprovalHandler,
} from '../../controllers/lecturer/gradebook.controller.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createAssessmentSchema,
  updateAssessmentDraftSchema,
  assignQuestionsSchema,
  rescheduleAssessmentSchema,
  extendAssessmentSchema,
  cancelAssessmentSchema,
  submitResultsApprovalSchema,
  moderateGradeSchema,
} from '../../schemas/assessment.schemas.js';
import { forceSubmitSchema, gradeTheorySchema } from '../../schemas/assessmentAttempt.schemas.js';

const router = Router();

router.use(protectLecturer);

// Offering-scoped endpoints
router.post('/offerings/:offeringId', validate(createAssessmentSchema), createAssessmentDraftHandler);
router.get('/offerings/:offeringId', listOfferingAssessmentsHandler);

// Assessment-scoped endpoints
router.get('/:assessmentId', getAssessmentDetailsHandler);
router.put('/:assessmentId', validate(updateAssessmentDraftSchema), updateAssessmentDraftHandler);
router.post('/:assessmentId/questions', validate(assignQuestionsSchema), assignQuestionsHandler);
router.post('/:assessmentId/publish', publishAssessmentHandler);
router.post('/:assessmentId/reschedule', validate(rescheduleAssessmentSchema), rescheduleAssessmentHandler);
router.post('/:assessmentId/extend', validate(extendAssessmentSchema), extendAssessmentHandler);
router.post('/:assessmentId/cancel', validate(cancelAssessmentSchema), cancelAssessmentHandler);
router.get('/:assessmentId/audit-logs', getAssessmentAuditLogsHandler);

// Live Monitoring & Emergency Overrides (BB-07F.5)
router.get('/:assessmentId/monitor', getAssessmentMonitorHandler);
router.post(
  '/:assessmentId/attempts/:attemptId/force-submit',
  validate(forceSubmitSchema),
  forceSubmitAttemptHandler
);

// Formal Grading & Rubric Evaluation (BB-07F.6)
router.get('/:assessmentId/grading', getLecturerGradingOverviewHandler);
router.get('/:assessmentId/attempts/:attemptId/grading', getAttemptGradingDetailHandler);
router.post(
  '/:assessmentId/attempts/:attemptId/grade-theory',
  validate(gradeTheorySchema),
  gradeTheoryQuestionsHandler
);
router.post(
  '/:assessmentId/attempts/:attemptId/questions/:assessmentQuestionId/ai-assist',
  getAiTheorySuggestionHandler
);

// Gradebook, Moderation & Result Approval (BB-07F.7)
router.get('/:assessmentId/gradebook', getAssessmentGradebookHandler);
router.post(
  '/:assessmentId/submit-for-approval',
  validate(submitResultsApprovalSchema),
  submitResultsApprovalHandler
);
router.post(
  '/:assessmentId/grades/:gradeId/moderate',
  validate(moderateGradeSchema),
  moderateGradeHandler
);

export default router;

