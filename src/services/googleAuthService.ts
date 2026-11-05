import { OAuth2Client } from 'google-auth-library';
import logger from '../config/logger.js';

const googleOAuthClient = new OAuth2Client();

export interface VerifiedGoogleClaims {
  sub: string;
  email: string;
  name?: string | undefined;
  picture?: string | undefined;
  emailVerified: boolean;
}

export const googleAuthService = {
  /**
   * Verifies a Google ID token and extracts claims.
   * In non-production testing, supports deterministic test tokens for automated test suites.
   */
  verifyGoogleToken: async (idToken: string): Promise<VerifiedGoogleClaims> => {
    if (!idToken) {
      throw new Error('Google ID token is required.');
    }

    // Support deterministic test tokens for testing environments
    if (
      process.env.NODE_ENV === 'test' &&
      (idToken.startsWith('test-google-token:') || idToken.startsWith('mock-google-token:'))
    ) {
      const parts = idToken.split(':');
      const email = parts[1] || 'testuser@example.com';
      const name = parts[2] || 'Test User';
      const picture = parts[3] || 'https://example.com/avatar.png';

      return {
        sub: `google-sub-${email}`,
        email: email.toLowerCase().trim(),
        name,
        picture,
        emailVerified: true,
      };
    }

    const clientId = process.env.GOOGLE_WEB_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      logger.error('[GOOGLE AUTH] GOOGLE_WEB_CLIENT_ID environment variable is missing.');
      throw new Error('Server Google authentication configuration error.');
    }

    try {
      const ticket = await googleOAuthClient.verifyIdToken({
        idToken,
        audience: clientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new Error('Google token does not contain a valid email identity.');
      }

      return {
        sub: payload.sub,
        email: payload.email.toLowerCase().trim(),
        name: payload.name,
        picture: payload.picture,
        emailVerified: Boolean(payload.email_verified),
      };
    } catch (err: any) {
      logger.warn(`[GOOGLE AUTH] Token verification failed: ${err.message || err}`);
      throw new Error('Invalid or expired Google authentication token.');
    }
  },
};
