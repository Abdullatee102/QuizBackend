import { GoogleGenAI } from '@google/genai';
import { AI_CONFIG } from '../../config/ai.js';
import logger from '../../config/logger.js';

export interface GeminiCallResult<T> {
  success: boolean;
  data?: T;
  rawText?: string;
  error?: string;
  statusCode?: number;
  durationMs?: number;
}

export class GeminiClient {
  private client: GoogleGenAI | null = null;
  private lastInitializedKey: string = '';

  /**
   * Safe getter for GoogleGenAI client instance.
   * Lazily initializes or reinitializes if the API key in environment changes.
   */
  private getClient(): GoogleGenAI | null {
    const currentKey = AI_CONFIG.apiKey;
    if (!currentKey) {
      this.client = null;
      this.lastInitializedKey = '';
      return null;
    }

    if (!this.client || this.lastInitializedKey !== currentKey) {
      this.client = new GoogleGenAI({ apiKey: currentKey });
      this.lastInitializedKey = currentKey;
    }

    return this.client;
  }

  /**
   * Check if Gemini AI is available and configured.
   */
  public isAvailable(): boolean {
    return AI_CONFIG.isConfigured;
  }

  /**
   * Current model name configured in environment.
   */
  public getModelName(): string {
    return AI_CONFIG.model;
  }

  /**
   * Executes a structured JSON content generation request to Gemini with timeout and error handling.
   */
  public async generateStructuredContent<T>(params: {
    systemInstruction: string;
    prompt: string;
    featureName: string;
    responseSchema?: any;
  }): Promise<GeminiCallResult<T>> {
    const { systemInstruction, prompt, featureName, responseSchema } = params;

    if (!this.isAvailable()) {
      logger.info(`[AI] ${featureName} called but Gemini AI is not configured (missing GEMINI_API_KEY).`);
      return {
        success: false,
        error: 'AI_UNAVAILABLE_MISSING_KEY',
      };
    }

    const ai = this.getClient();
    if (!ai) {
      return {
        success: false,
        error: 'AI_UNAVAILABLE_CLIENT_FAILED',
      };
    }

    const model = this.getModelName();
    const startTime = Date.now();

    logger.info(`[AI] ${featureName} request started with model: ${model}`);

    try {
      const timeoutMs = AI_CONFIG.timeoutMs;
      
      const config: any = {
        responseMimeType: 'application/json',
        systemInstruction,
      };

      if (responseSchema) {
        config.responseSchema = responseSchema;
      }

      // Execute request with strict timeout protection
      const apiCall = ai.models.generateContent({
        model,
        contents: prompt,
        config,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`AI_REQUEST_TIMEOUT after ${timeoutMs}ms`)), timeoutMs)
      );

      const response: any = await Promise.race([apiCall, timeoutPromise]);
      const durationMs = Date.now() - startTime;
      const rawText = response?.text || '';

      if (!rawText) {
        logger.warn(`[AI] ${featureName} received empty response text from Gemini in ${durationMs}ms`);
        return {
          success: false,
          error: 'EMPTY_AI_RESPONSE',
          durationMs,
        };
      }

      // Safe JSON parsing
      let parsed: T;
      try {
        // Strip markdown code fences if model accidentally wrapped output
        const cleanJson = rawText
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();
        parsed = JSON.parse(cleanJson);
      } catch (parseError: any) {
        logger.warn(`[AI] ${featureName} failed to parse JSON output: ${parseError.message}`);
        return {
          success: false,
          rawText,
          error: 'MALFORMED_JSON_RESPONSE',
          durationMs,
        };
      }

      logger.info(`[AI] ${featureName} completed successfully in ${durationMs}ms`);
      return {
        success: true,
        data: parsed,
        rawText,
        durationMs,
      };
    } catch (error: any) {
      const durationMs = Date.now() - startTime;
      const statusCode = error?.status || error?.code || undefined;
      const errorMsg = error?.message || String(error);

      // Clean, safe logging (NEVER log keys or tokens)
      const sanitizedError = errorMsg.replace(/key=[^&\s]+/gi, 'key=REDACTED');
      logger.error(`[AI] ${featureName} request failed in ${durationMs}ms: ${sanitizedError}`);

      return {
        success: false,
        error: sanitizedError,
        statusCode,
        durationMs,
      };
    }
  }
}

export const geminiClient = new GeminiClient();
