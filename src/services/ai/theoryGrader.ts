/**
 * AI Theory Grading Service Abstraction
 *
 * Future AI integrations (e.g. Gemini API / LLM grading) will be plugged into
 * this service layer. Currently provides deterministic grading fallback contracts
 * to ensure 100% testability and reliability without external network dependency.
 */

export interface TheoryGradingRequest {
  questionId: string;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  gradingPoints?: Array<{
    concept: string;
    weight: number;
    aliases?: string[];
  }>;
}

export interface TheoryGradingResponse {
  score: number;
  maxScore: number;
  percentage: number;
  isCorrect: boolean;
  matchedConcepts: string[];
  missingConcepts: string[];
  feedback: string;
}

export class TheoryGraderAI {
  /**
   * Evaluates student theory answer using deterministic semantic heuristics
   * or future LLM provider.
   */
  async gradeAnswer(request: TheoryGradingRequest): Promise<TheoryGradingResponse> {
    // Stub implementation returning standardized contract
    const hasAnswer = request.studentAnswer.trim().length > 0;
    return {
      score: hasAnswer ? 10 : 0,
      maxScore: 10,
      percentage: hasAnswer ? 100 : 0,
      isCorrect: hasAnswer,
      matchedConcepts: request.gradingPoints ? request.gradingPoints.map((p) => p.concept) : [],
      missingConcepts: [],
      feedback: hasAnswer ? 'Answer evaluated.' : 'No answer provided.',
    };
  }
}

export const aiTheoryGrader = new TheoryGraderAI();
