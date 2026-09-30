/**
 * Shared Type Definitions for the QuizBackend AI Subsystem
 */

export interface GradingPoint {
  concept: string;
  weight: number;
  aliases?: string[] | undefined;
}

export interface TheoryGradingInput {
  questionId?: string | undefined;
  questionText: string;
  questionType: 'theory';
  maxScore?: number | undefined;
  referenceAnswer?: string | undefined;
  gradingPoints?: GradingPoint[] | undefined;
  studentAnswer: string;
  courseContext?: {
    code?: string | undefined;
    title?: string | undefined;
    level?: number | undefined;
  } | undefined;
}

export type TheoryGradingStatus = 'graded' | 'ai_unavailable' | 'needs_review' | 'pending';
export type GradingMethod = 'ai' | 'deterministic' | 'deterministic_fallback' | 'manual_review' | 'rubric';

export interface TheoryGradingOutput {
  score: number;
  maxScore: number;
  percentage: number;
  feedback: string;
  strengths: string[];
  missingPoints: string[];
  gradingNotes: string;
  status: TheoryGradingStatus;
  gradingMethod: GradingMethod;
}

export interface SupportAssistantInput {
  userMessage: string;
  userContext?: {
    userId?: string | undefined;
    fullName?: string | undefined;
    faculty?: string | undefined;
    department?: string | undefined;
    level?: number | undefined;
  } | undefined;
}

export interface SupportAssistantOutput {
  answer: string;
  needsHumanSupport: boolean;
  suggestedAction: string | null;
  status: 'success' | 'ai_unavailable';
}

export interface AIProvider {
  isAvailable(): boolean;
  getModelName(): string;
  gradeTheoryAnswer(input: TheoryGradingInput): Promise<TheoryGradingOutput>;
  generateSupportResponse(input: SupportAssistantInput): Promise<SupportAssistantOutput>;
}
