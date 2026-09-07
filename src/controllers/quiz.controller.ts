import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { quizService } from '../services/quizService.js';

export const getQuestionsByCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const rawCategoryId = req.params.categoryId;
  const category = Array.isArray(rawCategoryId) ? rawCategoryId[0] : rawCategoryId;

  if (!category) {
    res.status(400).json({ status: 'fail', message: 'Category ID is required.' });
    return;
  }

  try {
    logger.info(`[QUIZ] Fetching dynamic questions for category: ${category}`);
    const questions = await quizService.getDynamicQuestions(category, 5);

    if (!questions || questions.length === 0) {
      logger.warn(`[QUIZ] No questions found in database for category: ${category}`);
      res.status(404).json({ 
        status: 'fail', 
        message: `No questions found for category: ${category}` 
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      category,
      count: questions.length,
      data: questions,
    });
  } catch (error: any) {
    logger.error(`[QUIZ] Error fetching questions: ${error.message}`);
    res.status(500).json({ status: 'fail', message: 'Failed to fetch questions' });
  }
};