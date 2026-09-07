import { db } from '../db/index.js';
import { questionsTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const quizService = {
  getDynamicQuestions: async (category: string, limit: number = 10): Promise<any[]> => {
    return await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.category, category.toLowerCase()))
      .limit(limit);
  }
};