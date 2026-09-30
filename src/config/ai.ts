import dotenv from 'dotenv';
dotenv.config();

/**
 * Centralized AI Configuration
 * 
 * Ensures model and timeout options are configurable via environment variables
 * and never hardcoded in multiple locations.
 */
export const AI_CONFIG = {
  get apiKey(): string {
    return process.env.GEMINI_API_KEY?.trim() || '';
  },

  get model(): string {
    return process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash';
  },

  get timeoutMs(): number {
    const parsed = Number(process.env.GEMINI_TIMEOUT_MS);
    return !isNaN(parsed) && parsed > 0 ? parsed : 15000;
  },

  get isConfigured(): boolean {
    return this.apiKey.length > 0;
  },
};
