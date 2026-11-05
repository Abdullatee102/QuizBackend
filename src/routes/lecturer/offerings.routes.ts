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
import { getOfferingGradebookHandler } from '../../controllers/lecturer/gradebook.controller.js';
import {
  createSessionHandler,
  updateSessionHandler,
  listSessionsHandler,
  getSessionDetailsHandler,
  recordBatchAttendanceHandler,
  updateAttendanceRecordHandler,
  getOfferingAttendanceSummaryHandler,
  getStudentAttendanceHistoryHandler,
} from '../../controllers/lecturer/attendance.controller.js';
import {
  uploadMaterialHandler,
  listOfferingMaterialsHandler,
  getMaterialDetailsHandler,
  updateMaterialHandler,
  deleteMaterialHandler,
  downloadMaterialHandler,
} from '../../controllers/lecturer/materials.controller.js';
import {
  createAnnouncementHandler,
  listOfferingAnnouncementsHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler,
} from '../../controllers/lecturer/announcements.controller.js';
import {
  listLecturerDiscussionsHandler,
  createLecturerDiscussionHandler,
  getLecturerDiscussionDetailsHandler,
  replyLecturerDiscussionHandler,
  moderateLecturerDiscussionHandler,
  deleteLecturerDiscussionHandler,
} from '../../controllers/lecturer/discussions.controller.js';
import {
  handleMaterialUploadMiddleware,
} from '../../services/storage/materialStorageService.js';
import { protectLecturer } from '../../middlewares/lecturerAuth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createQuestionDraftSchema } from '../../schemas/questionWorkflow.schemas.js';
import { createAssessmentSchema } from '../../schemas/assessment.schemas.js';
import {
  createAttendanceSessionSchema,
  updateAttendanceSessionSchema,
  recordAttendanceBatchSchema,
  updateAttendanceRecordSchema,
} from '../../schemas/attendance.schemas.js';
import {
  createMaterialSchema,
  updateMaterialSchema,
} from '../../schemas/material.schemas.js';
import {
  createAnnouncementSchema,
  updateAnnouncementSchema,
} from '../../schemas/announcement.schemas.js';
import {
  createDiscussionSchema,
  replyDiscussionSchema,
  moderateDiscussionSchema,
} from '../../schemas/discussion.schemas.js';

const router = Router();

router.use(protectLecturer);

router.get('/', listLecturerOfferingsHandler);
router.get('/:offeringId', getLecturerOfferingDetailsHandler);
router.get('/:offeringId/students', listLecturerOfferingStudentsHandler);
router.get('/:offeringId/questions', listLecturerQuestionsHandler);
router.post('/:offeringId/questions', validate(createQuestionDraftSchema), createQuestionDraftHandler);
router.get('/:offeringId/assessments', listOfferingAssessmentsHandler);
router.post('/:offeringId/assessments', validate(createAssessmentSchema), createAssessmentDraftHandler);
router.get('/:offeringId/gradebook', getOfferingGradebookHandler);

// Attendance routes (BB-07G)
router.get('/:offeringId/attendance/summary', getOfferingAttendanceSummaryHandler);
router.get('/:offeringId/attendance/sessions', listSessionsHandler);
router.post(
  '/:offeringId/attendance/sessions',
  validate(createAttendanceSessionSchema),
  createSessionHandler
);
router.get('/:offeringId/attendance/sessions/:sessionId', getSessionDetailsHandler);
router.patch(
  '/:offeringId/attendance/sessions/:sessionId',
  validate(updateAttendanceSessionSchema),
  updateSessionHandler
);
router.post(
  '/:offeringId/attendance/sessions/:sessionId/records',
  validate(recordAttendanceBatchSchema),
  recordBatchAttendanceHandler
);
router.patch(
  '/:offeringId/attendance/sessions/:sessionId/records/:recordId',
  validate(updateAttendanceRecordSchema),
  updateAttendanceRecordHandler
);
router.get('/:offeringId/attendance/students/:studentId/history', getStudentAttendanceHistoryHandler);

// Course Materials & Learning Resources (BB-07H)
router.get('/:offeringId/materials', listOfferingMaterialsHandler);
router.post(
  '/:offeringId/materials',
  handleMaterialUploadMiddleware,
  validate(createMaterialSchema),
  uploadMaterialHandler
);
router.get('/:offeringId/materials/:materialId', getMaterialDetailsHandler);
router.patch(
  '/:offeringId/materials/:materialId',
  validate(updateMaterialSchema),
  updateMaterialHandler
);
router.delete('/:offeringId/materials/:materialId', deleteMaterialHandler);
router.get('/:offeringId/materials/:materialId/download', downloadMaterialHandler);

// Course Announcements (BB-07I)
router.get('/:offeringId/announcements', listOfferingAnnouncementsHandler);
router.post(
  '/:offeringId/announcements',
  validate(createAnnouncementSchema),
  createAnnouncementHandler
);
router.patch(
  '/:offeringId/announcements/:announcementId',
  validate(updateAnnouncementSchema),
  updateAnnouncementHandler
);
router.delete('/:offeringId/announcements/:announcementId', deleteAnnouncementHandler);

// Course Discussions (BB-07I)
router.get('/:offeringId/discussions', listLecturerDiscussionsHandler);
router.post(
  '/:offeringId/discussions',
  validate(createDiscussionSchema),
  createLecturerDiscussionHandler
);
router.get('/:offeringId/discussions/:discussionId', getLecturerDiscussionDetailsHandler);
router.post(
  '/:offeringId/discussions/:discussionId/replies',
  validate(replyDiscussionSchema),
  replyLecturerDiscussionHandler
);
router.patch(
  '/:offeringId/discussions/:discussionId/moderate',
  validate(moderateDiscussionSchema),
  moderateLecturerDiscussionHandler
);
router.delete('/:offeringId/discussions/:discussionId', deleteLecturerDiscussionHandler);

export default router;


