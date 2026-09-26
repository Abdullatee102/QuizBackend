import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import { OAuth2Client } from 'google-auth-library';
import logger from '../config/logger.js';
import { authService } from '../services/authService.js';

const googleOAuthClient = new OAuth2Client();

// =====================================================
// OTP
// =====================================================

export const sendOtp = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    phoneNumber,
    email,
  } = req.body;

  const identifier =
    phoneNumber || email;

  const otpCode =
    authService.generateOtp(
      identifier
    );

  logger.info(
    `[SEND OTP] Generated code ${otpCode} for target: ${identifier}`
  );

  res.status(200).json({
    status: 'success',
    message:
      'OTP sent successfully!',
    testOtp: otpCode,
  });
};

export const verifyOtp = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    phoneNumber,
    email,
    code,
    otp,
    username,
    fullName,
  } = req.body;

  const identifier =
    phoneNumber || email;

  const inputCode =
    code || otp;

  if (
    !authService.verifyOtpCode(
      identifier,
      inputCode
    )
  ) {
    logger.warn(
      `[VERIFY OTP] Failed attempt for target: ${identifier}`
    );

    res.status(400).json({
      status: 'fail',
      message:
        'Invalid or expired verification code.',
    });

    return;
  }

  let user =
    await authService.findUser(
      identifier
    );

  if (!user) {
    user =
      await authService.saveUser(
        identifier,
        {
          fullName:
            fullName ||
            'Scholar',

          username:
            username || null,

          email:
            identifier?.includes(
              '@'
            )
              ? identifier
              : null,

          phoneNumber:
            identifier &&
            !identifier.includes(
              '@'
            )
              ? identifier
              : null,

          password: '',
        }
      );
  }

  const payload = {
    id: user.id,
    email: user.email,
    phoneNumber:
      user.phoneNumber,
  };

  const tokens =
    await authService.generateAuthTokens(
      payload
    );

  logger.info(
    `[VERIFY OTP] Success for target: ${identifier}`
  );

  res.status(200).json({
    status: 'success',
    message:
      'OTP verified successfully!',
    tokens,
    user,
  });
};

// =====================================================
// SIGN UP
// =====================================================

export const signUp = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    email,
    password,
    fullName,
    phoneNumber,
    username,
  } = req.body;

  const identifier =
    email || phoneNumber;

  const existingUser =
    await authService.findUser(
      identifier
    );

  if (existingUser) {
    logger.warn(
      `[SIGNUP] Conflict: User already exists for ${identifier}`
    );

    res.status(400).json({
      status: 'fail',
      message:
        'User already exists with this identifier.',
    });

    return;
  }

  const newUser =
    await authService.saveUser(
      identifier,
      {
        fullName,
        username,
        email:
          email || null,
        phoneNumber:
          phoneNumber || null,
        password,
      }
    );

  const tokens =
    await authService.generateAuthTokens(
      {
        id: newUser?.id,
        email:
          newUser?.email,
        phoneNumber:
          newUser?.phoneNumber,
      }
    );

  logger.info(
    `[SIGNUP] Account created for: ${identifier}`
  );

  res.status(201).json({
    status: 'success',
    message:
      'Account created successfully!',
    tokens,
    user: newUser,
  });
};

// =====================================================
// LOGIN
// =====================================================

export const login = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    email,
    phoneNumber,
    password,
  } = req.body;

  const identifier =
    email || phoneNumber;

  const user =
    await authService.findUser(
      identifier
    );

  if (
    !user ||
    user.password !== password
  ) {
    logger.warn(
      `[LOGIN] Unauthorized attempt for: ${identifier}`
    );

    res.status(401).json({
      status: 'fail',
      message:
        'Invalid email/phone or password.',
    });

    return;
  }

  const tokens =
    await authService.generateAuthTokens(
      {
        id: user.id,
        email:
          user.email,
        phoneNumber:
          user.phoneNumber,
      }
    );

  logger.info(
    `[LOGIN] User logged in: ${identifier}`
  );

  res.status(200).json({
    status: 'success',
    message:
      'Logged in successfully!',
    tokens,
    user,
  });
};

// =====================================================
// GOOGLE AUTH
// =====================================================

export const googleAuth = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { idToken } = req.body;

  if (!idToken) {
    res.status(400).json({
      status: 'fail',
      message: 'Google ID token required',
    });
    return;
  }

  const clientId = process.env.GOOGLE_WEB_CLIENT_ID;
  if (!clientId) {
    logger.error('[GOOGLE AUTH] GOOGLE_WEB_CLIENT_ID environment variable is missing.');
    res.status(500).json({
      status: 'error',
      message: 'Server Google authentication configuration error',
    });
    return;
  }

  let payload;
  try {
    const ticket = await googleOAuthClient.verifyIdToken({
      idToken,
      audience: clientId,
    });
    payload = ticket.getPayload();
  } catch (error: any) {
    logger.warn(`[GOOGLE AUTH] Token verification failed: ${error?.message || error}`);
    res.status(401).json({
      status: 'fail',
      message: 'Invalid or expired Google authentication token',
    });
    return;
  }

  if (!payload || !payload.email) {
    res.status(401).json({
      status: 'fail',
      message: 'Google token does not contain a verified email identity',
    });
    return;
  }

  const { sub, email, name, picture } = payload;
  const userEmail = email as string;

  let user = await authService.findUser(userEmail);

  if (!user) {
    const emailPrefix = userEmail.split('@')[0] || 'user';
    const uniqueUsername = `${emailPrefix.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Math.floor(1000 + Math.random() * 9000)}`;

    user = await authService.saveUser(userEmail, {
      fullName: name || 'Google User',
      username: uniqueUsername,
      email: userEmail,
      phoneNumber: null,
      photoURL: picture || null,
      password: '',
    });
  } else if (picture && !user.photoURL) {
    try {
      await authService.updateUserProfile(user.id, { photoURL: picture });
      user.photoURL = picture;
    } catch (e) {
      logger.warn(`[GOOGLE AUTH] Failed to update user photoURL: ${e}`);
    }
  }

  const tokens = await authService.generateAuthTokens({
    id: user.id,
    email: user.email || '',
    phoneNumber: user.phoneNumber,
  });

  logger.info(`[GOOGLE AUTH] Successful verification & login for Google user (${sub}): ${email}`);

  res.status(200).json({
    status: 'success',
    message: 'Google authentication successful',
    tokens,
    user,
  });
};

// =====================================================
// REFRESH TOKEN
// =====================================================

export const refreshToken = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    refreshToken: token,
  } = req.body;

  if (!token) {
    logger.warn(
      `[REFRESH TOKEN] Missing refresh token in request body`
    );

    res.status(400).json({
      status: 'fail',
      message:
        'Refresh token is required.',
    });

    return;
  }

  const decoded =
    (await authService.verifyRefreshToken(
      token
    )) as any;

  if (!decoded) {
    logger.warn(
      `[REFRESH TOKEN] Invalid, expired, or revoked refresh token presented`
    );

    res.status(403).json({
      status: 'fail',
      message:
        'Invalid or expired refresh token.',
    });

    return;
  }

  await authService.revokeRefreshToken(
    token
  );

  const tokens =
    await authService.generateAuthTokens(
      {
        id: decoded.id,
        email:
          decoded.email,
        phoneNumber:
          decoded.phoneNumber,
      }
    );

  logger.info(
    `[REFRESH TOKEN] Tokens successfully rotated for user ID: ${decoded.id}`
  );

  res.status(200).json({
    status: 'success',
    tokens,
  });
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const {
      email,
      phoneNumber,
    } = req.body;

    const identifier =
      email || phoneNumber;

    const otpCode =
      authService.generateOtp(
        identifier
      );

    logger.info(
      `[FORGOT PASSWORD] Reset OTP generated for: ${identifier}`
    );

    res.status(200).json({
      status: 'success',
      message:
        'Password reset OTP sent successfully!',
      testOtp: otpCode,
    });
  };

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const {
      email,
      phoneNumber,
      newPassword,
    } = req.body;

    const identifier =
      email || phoneNumber;

    const updatedUser =
      await authService.updateUserPassword(
        identifier,
        newPassword
      );

    if (!updatedUser) {
      logger.warn(
        `[RESET PASSWORD] User not found for: ${identifier}`
      );

      res.status(404).json({
        status: 'fail',
        message:
          'User not found.',
      });

      return;
    }

    logger.info(
      `[RESET PASSWORD] Password successfully updated for: ${identifier}`
    );

    res.status(200).json({
      status: 'success',
      message:
        'Password has been reset successfully!',
    });
  };

// =====================================================
// CHANGE PASSWORD
// =====================================================

export const changePassword =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    const {
      currentPassword,
      newPassword,
    } = req.body;

    try {
      const result =
        await authService.changePassword(
          userId,
          currentPassword,
          newPassword
        );

      if (!result.success) {
        logger.warn(
          `[CHANGE PASSWORD] Failed attempt for user ID: ${userId} - ${result.message}`
        );

        res.status(400).json({
          status: 'fail',
          message:
            result.message,
        });

        return;
      }

      logger.info(
        `[CHANGE PASSWORD] Password successfully updated for user ID: ${userId}`
      );

      res.status(200).json({
        status: 'success',
        message:
          'Password updated successfully!',
      });
    } catch (error: any) {
      logger.error(
        `[CHANGE PASSWORD ERROR]: ${
          error.message || error
        }`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to update password',
      });
    }
  };

// =====================================================
// PROFILE
// =====================================================

export const getProfile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId =
    req.user?.id ||
    req.user?.userId;

  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message:
        'Unauthorized',
    });

    return;
  }

  const user =
    await authService.findUserWithStats(
      userId
    );

  if (!user) {
    res.status(404).json({
      status: 'fail',
      message:
        'User not found',
    });

    return;
  }

  logger.info(
    `[GET PROFILE] Fetched profile with stats for user ID: ${userId}`
  );

  res.status(200).json({
    status: 'success',
    data: user,
  });
};

export const updateProfile =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    if (
      !req.body ||
      Object.keys(req.body).length ===
        0
    ) {
      res.status(400).json({
        status: 'fail',
        message:
          'No update values provided',
      });

      return;
    }

    try {
      const {
        fullName,
        username,
        phoneNumber,
        email,
        bio,
        photoURL,
        facultyId,
        departmentId,
        level,
      } = req.body;

      const updateData: any =
        {};

      if (
        fullName !== undefined
      ) {
        updateData.fullName =
          fullName;
      }

      if (
        username !== undefined
      ) {
        updateData.username =
          username;
      }

      if (
        phoneNumber !== undefined
      ) {
        updateData.phoneNumber =
          phoneNumber;
      }

      if (
        email !== undefined
      ) {
        updateData.email =
          email;
      }

      if (
        bio !== undefined
      ) {
        updateData.bio = bio;
      }

      if (
        photoURL !== undefined
      ) {
        updateData.photoURL =
          photoURL;
      }

      if (
        facultyId !== undefined
      ) {
        updateData.facultyId =
          facultyId;
      }

      if (
        departmentId !== undefined
      ) {
        updateData.departmentId =
          departmentId;
      }

      if (
        level !== undefined
      ) {
        updateData.level = level;
      }

      const updatedUser =
        await authService.updateUserProfile(
          userId,
          updateData
        );

      logger.info(
        `[UPDATE PROFILE] Updated user profile for ID: ${userId}`
      );

      res.status(200).json({
        status: 'success',
        message:
          'Profile updated successfully',
        data: updatedUser,
      });
    } catch (error: any) {
      logger.error(
        `[UPDATE PROFILE ERROR]: ${
          error.message || error
        }`
      );

      res.status(400).json({
        status: 'fail',
        message:
          error.message ||
          'Failed to update profile',
      });
    }
  };

  // =====================================================
// DELETE ACCOUNT
// =====================================================

export const deleteAccount = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {

  const userId =
    req.user?.id ||
    req.user?.userId;

  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message:
        'Unauthorized',
    });

    return;
  }

  try {

    const deleted =
      await authService.deleteAccount(
        userId
      );

    if (!deleted) {

      logger.warn(
        `[DELETE ACCOUNT] User not found for ID: ${userId}`
      );

      res.status(404).json({
        status: 'fail',
        message:
          'User account not found',
      });

      return;
    }

    logger.info(
      `[DELETE ACCOUNT] Account permanently deleted for user ID: ${userId}`
    );

    res.status(200).json({
      status: 'success',
      message:
        'Account deleted successfully',
    });

  } catch (error: any) {

    logger.error(
      `[DELETE ACCOUNT ERROR]: ${
        error.message || error
      }`
    );

    res.status(500).json({
      status: 'fail',
      message:
        'Failed to delete account',
    });
  }
};

// =====================================================
// QUIZ HISTORY
// SUBMIT → GRADE → RETURN → SAVE HISTORY
// =====================================================

export const submitQuizHistory =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    try {
      console.log(
        '===================================='
      );

      console.log(
        '[BACKEND QUIZ SUBMIT]'
      );

      console.log(
        'User ID:',
        userId
      );

      console.log(
        'Quiz submission:',
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      console.log(
        '===================================='
      );

      /*
       * IMPORTANT:
       *
       * The client does NOT send:
       *
       * - score
       * - correctAnswers
       * - totalQuestions
       *
       * Those values are calculated by the
       * backend from the real answer key.
       */

      const savedResult =
        await authService.saveQuizHistory(
          userId,
          req.body
        );

      /*
       * At this point grading has already
       * completed and the history has already
       * been saved.
       *
       * The result can therefore be returned
       * immediately to the frontend.
       */

      await authService.evaluateAndUnlockAchievements(
        userId
      );

      logger.info(
        `[QUIZ HISTORY] Quiz graded and saved successfully for user ID: ${userId}`
      );

      res.status(201).json({
        status: 'success',

        message:
          'Quiz graded and history saved successfully',

        /*
         * Saved database record.
         */
        data:
          savedResult.history,

        /*
         * Immediate grading result.
         *
         * The frontend should use this
         * object to display the result screen.
         */
        grading:
          savedResult.grading,
      });
    } catch (error: any) {
      logger.error(
        `[QUIZ HISTORY ERROR]: ${
          error.message || error
        }`
      );

      res.status(400).json({
        status: 'fail',
        message:
          error.message ||
          'Failed to grade and save quiz',
      });
    }
  };

// =====================================================
// ACHIEVEMENTS
// =====================================================

export const getAchievements =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    try {
      const achievements =
        await authService.getUserAchievements(
          userId
        );

      logger.info(
        `[ACHIEVEMENTS] Fetched achievements for user ID: ${userId}`
      );

      res.status(200).json({
        status: 'success',
        data: achievements,
      });
    } catch (error) {
      logger.error(
        `[ACHIEVEMENTS ERROR]: ${error}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch achievements',
      });
    }
  };

export const unlockAchievement =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    try {
      const {
        key,
        title,
        description,
        icon,
      } = req.body;

      const unlocked =
        await authService.unlockAchievement(
          userId,
          {
            key,
            title,
            description,
            icon,
          }
        );

      logger.info(
        `[UNLOCK ACHIEVEMENT] Achievement '${key}' unlocked for user ID: ${userId}`
      );

      res.status(200).json({
        status: 'success',
        message:
          'Achievement unlocked successfully',
        data: unlocked,
      });
    } catch (error: any) {
      logger.error(
        `[UNLOCK ACHIEVEMENT ERROR]: ${
          error.message || error
        }`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to unlock achievement',
      });
    }
  };

// =====================================================
// LEADERBOARD
// =====================================================

export const getLeaderboard =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    try {
      const range =
        (req.query.range as string) ||
        '24h';

      const leaders =
        await authService.getTopLeaderboard(
          range,
          20
        );

      logger.info(
        `[LEADERBOARD] Fetched top performers successfully for range: ${range}`
      );

      res.status(200).json({
        status: 'success',
        data: leaders,
      });
    } catch (error) {
      logger.error(
        `[LEADERBOARD ERROR]: ${error}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch leaderboard',
      });
    }
  };

// =====================================================
// QUIZ HISTORY
// =====================================================

export const getQuizHistory =
  async (
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const userId =
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      res.status(401).json({
        status: 'fail',
        message:
          'Unauthorized',
      });

      return;
    }

    try {
      const history =
        await authService.getUserQuizHistory(
          userId
        );

      logger.info(
        `[QUIZ HISTORY] Fetched history for user ID: ${userId}`
      );

      res.status(200).json({
        status: 'success',
        data: history,
      });
    } catch (error) {
      logger.error(
        `[QUIZ HISTORY ERROR]: ${error}`
      );

      res.status(500).json({
        status: 'fail',
        message:
          'Failed to fetch quiz history',
      });
    }
  };

// =====================================================
// LOGOUT
// =====================================================

export const logout = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const {
    refreshToken: token,
    keepBiometricSession,
  } = req.body;

  if (
    token &&
    !keepBiometricSession
  ) {
    await authService.revokeRefreshToken(
      token
    );
  }

  logger.info(
    `[LOGOUT] User logged out successfully (Biometric preserved: ${!!keepBiometricSession})`
  );

  res.status(200).json({
    status: 'success',
    message:
      'Logged out successfully',
  });
};

// =====================================================
// RECOMMENDED COURSES
// =====================================================

export const getRecommendedCourses = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const userId =
    req.user?.id ||
    req.user?.userId;

  if (!userId) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const semester =
      typeof req.query.semester === 'string'
        ? req.query.semester
        : undefined;

    logger.info(
      `[RECOMMENDED COURSES] Fetching for user ID: ${userId}, semester: ${semester || 'all'}`
    );

    const result = await authService.getRecommendedCourses(
      userId,
      semester
    );

    res.status(200).json({
      status: 'success',
      ...result,
    });
  } catch (error: any) {
    logger.error(
      `[RECOMMENDED COURSES ERROR]: ${error.message || error}`
    );

    res.status(500).json({
      status: 'fail',
      message: 'Failed to fetch recommended courses',
    });
  }
};