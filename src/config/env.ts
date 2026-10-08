import dotenv from 'dotenv';
dotenv.config();

import logger from './logger.js';

export interface EnvConfig {
  NODE_ENV: string;
  isProduction: boolean;
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
  BREVO_API_KEY: string;
  MAIL_FROM_EMAIL: string;
  MAIL_FROM_NAME: string;
  CORS_ORIGIN: string;
  ADMIN_WEB_ORIGIN: string | undefined;
  GOOGLE_WEB_CLIENT_ID: string | undefined;
  EXPO_ACCESS_TOKEN: string | undefined;
  GEMINI_API_KEY: string | undefined;
  GEMINI_MODEL: string;
  GEMINI_TIMEOUT_MS: number;
}

let validatedEnv: EnvConfig | null = null;

export function validateEnvironment(): EnvConfig {
  const missingVariables: string[] = [];

  const DATABASE_URL = process.env.DATABASE_URL?.trim();
  if (!DATABASE_URL) {
    missingVariables.push('DATABASE_URL');
  }

  const JWT_SECRET = process.env.JWT_SECRET?.trim();
  if (!JWT_SECRET || JWT_SECRET === 'fallback-secret-key') {
    missingVariables.push('JWT_SECRET');
  }

  const REFRESH_SECRET = process.env.REFRESH_SECRET?.trim();
  if (!REFRESH_SECRET || REFRESH_SECRET === 'fallback-refresh-secret') {
    missingVariables.push('REFRESH_SECRET');
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
  if (!BREVO_API_KEY) {
    missingVariables.push('BREVO_API_KEY');
  }

  if (missingVariables.length > 0) {
    const errorMsg = `[STARTUP ERROR] Missing or insecure required environment variables: ${missingVariables.join(', ')}`;
    logger.error(errorMsg);
    throw new Error(errorMsg);
  }

  const NODE_ENV = process.env.NODE_ENV?.trim() || 'development';
  const isProduction = NODE_ENV === 'production';
  const PORT = parseInt(process.env.PORT || '5000', 10);
  const MAIL_FROM_EMAIL = process.env.MAIL_FROM_EMAIL?.trim() || 'opeabdullateef12@gmail.com';
  const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME?.trim() || 'QuizApp';
  const CORS_ORIGIN = process.env.CORS_ORIGIN?.trim() || '*';
  const ADMIN_WEB_ORIGIN = process.env.ADMIN_WEB_ORIGIN?.trim();
  const GOOGLE_WEB_CLIENT_ID = process.env.GOOGLE_WEB_CLIENT_ID?.trim();
  const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN?.trim();
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY?.trim();
  const GEMINI_MODEL = process.env.GEMINI_MODEL?.trim() || 'gemini-3.8-flash';
  const GEMINI_TIMEOUT_MS = parseInt(process.env.GEMINI_TIMEOUT_MS || '15000', 10);

  const config: EnvConfig = {
    NODE_ENV,
    isProduction,
    PORT,
    DATABASE_URL: DATABASE_URL!,
    JWT_SECRET: JWT_SECRET!,
    REFRESH_SECRET: REFRESH_SECRET!,
    BREVO_API_KEY: BREVO_API_KEY!,
    MAIL_FROM_EMAIL,
    MAIL_FROM_NAME,
    CORS_ORIGIN,
    ADMIN_WEB_ORIGIN,
    GOOGLE_WEB_CLIENT_ID,
    EXPO_ACCESS_TOKEN,
    GEMINI_API_KEY,
    GEMINI_MODEL,
    GEMINI_TIMEOUT_MS,
  };

  validatedEnv = config;
  return config;
}

export function getEnv(): EnvConfig {
  if (!validatedEnv) {
    validatedEnv = validateEnvironment();
  }
  return validatedEnv;
}
