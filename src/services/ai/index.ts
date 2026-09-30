import type {
  AIProvider,
  TheoryGradingInput,
  TheoryGradingOutput,
  SupportAssistantInput,
  SupportAssistantOutput,
} from './types.js';
import { geminiClient } from './geminiClient.js';
import { aiTheoryGrader } from './theoryGrader.js';
import { aiSupportAssistant } from './supportAssistant.js';

/**
 * Standardized AI Provider Implementation for Google Gemini
 */
export class GeminiAIProvider implements AIProvider {
  public isAvailable(): boolean {
    return geminiClient.isAvailable();
  }

  public getModelName(): string {
    return geminiClient.getModelName();
  }

  public async gradeTheoryAnswer(input: TheoryGradingInput): Promise<TheoryGradingOutput> {
    return aiTheoryGrader.gradeAnswer(input);
  }

  public async generateSupportResponse(
    input: SupportAssistantInput
  ): Promise<SupportAssistantOutput> {
    return aiSupportAssistant.generateSupportResponse(input);
  }
}

export const aiProvider: AIProvider = new GeminiAIProvider();

export * from './types.js';
export * from './geminiClient.js';
export * from './theoryGrader.js';
export * from './supportAssistant.js';
export * from './prompts.js';
