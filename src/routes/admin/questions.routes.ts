import { Router } from 'express';
import {
  listQuestions,
  getQuestionDetails,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../../controllers/admin/questions.controller.js';
import { protectAdmin, requirePermission } from '../../middlewares/adminAuth.middleware.js';
import { PERMISSIONS } from '../../config/permissions.js';

const router = Router();

router.use(protectAdmin);

router.get('/', requirePermission(PERMISSIONS.QUESTIONS_READ), listQuestions);
router.get('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_READ), getQuestionDetails);
router.post('/', requirePermission(PERMISSIONS.QUESTIONS_CREATE), createQuestion);
router.patch('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_UPDATE), updateQuestion);
router.delete('/:questionId', requirePermission(PERMISSIONS.QUESTIONS_DELETE), deleteQuestion);

export default router;

