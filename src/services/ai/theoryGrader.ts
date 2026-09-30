/**
 * AI Theory Grading Service Abstraction
 */
import type { GradingMethod, TheoryGradingStatus } from './types.js';

export interface TheoryGradingRequest {
  questionId?: string | undefined;
  question?: string | undefined;
  questionText?: string | undefined;
  questionType?: string | undefined;
  studentAnswer: string;
  correctAnswer?: string | undefined;
  referenceAnswer?: string | undefined;
  maxScore?: number | undefined;
  gradingPoints?: Array<{
    concept: string;
    weight: number;
    aliases?: string[] | undefined;
  }> | undefined;
}

export interface TheoryGradingResponse {
  score: number;
  maxScore: number;
  percentage: number;
  isCorrect: boolean;
  matchedConcepts: string[];
  missingConcepts: string[];
  feedback: string;
  status: TheoryGradingStatus;
  gradingMethod: GradingMethod;
  strengths: string[];
  missingPoints: string[];
  gradingNotes: string;
}

function matchesConcept(studentAnswer: string, concept: string, aliases: string[] = []): boolean {
  const normStudent = studentAnswer
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normStudent) return false;

  const studentTokens = new Set(normStudent.split(' ').filter((w) => w.length > 1));
  const candidates = [concept, ...aliases];

  for (const candidate of candidates) {
    const normCand = candidate
      .toLowerCase()
      .normalize('NFKC')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!normCand) continue;
    if (normStudent.includes(normCand)) return true;

    const candTokens = normCand.split(' ').filter((w) => w.length > 1);
    if (candTokens.length === 0) continue;

    const matchedCount = candTokens.filter((token) => studentTokens.has(token)).length;
    const matchRatio = matchedCount / candTokens.length;

    if (matchRatio >= 0.5 || (matchedCount >= 2 && candTokens.length >= 3)) {
      return true;
    }
  }

  return false;
}

export function evaluateTheoryDeterministically(
  request: TheoryGradingRequest
): TheoryGradingResponse {
  const student = (request.studentAnswer || '').trim().toLowerCase();
  const maxScore = request.maxScore || 10;
  const hasAnswer = student.length > 0;

  let matched: string[] = [];
  let missing: string[] = [];

  if (request.gradingPoints && request.gradingPoints.length > 0) {
    for (const point of request.gradingPoints) {
      if (matchesConcept(student, point.concept, point.aliases || [])) {
        matched.push(point.concept);
      } else {
        missing.push(point.concept);
      }
    }
  }

  const scoreRatio =
    request.gradingPoints && request.gradingPoints.length > 0
      ? matched.length / request.gradingPoints.length
      : hasAnswer
      ? 1
      : 0;

  const score = Number((scoreRatio * maxScore).toFixed(2));
  const percentage = Number((scoreRatio * 100).toFixed(2));
  const isCorrect = scoreRatio >= 0.7;

  return {
    score,
    maxScore,
    percentage,
    isCorrect,
    matchedConcepts: matched,
    missingConcepts: missing,
    strengths: matched, gradingNotes: '',
    missingPoints: missing,
    status: 'graded',
    gradingMethod: 'rubric',
    feedback: hasAnswer
      ? matched.length > 0
        ? `Accurately matched: ${matched.join(', ')}.`
        : 'Answer submitted. Review course materials for key concept details.'
      : 'No answer provided.',
  };
}

export class TheoryGraderAI {
  async gradeAnswer(request: TheoryGradingRequest): Promise<TheoryGradingResponse> {
    return evaluateTheoryDeterministically(request);
  }
}

export const aiTheoryGrader = new TheoryGraderAI();
