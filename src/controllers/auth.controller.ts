import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';
import logger from '../config/logger.js';
import { authService } from '../services/authService.js';

export const sendOtp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { phoneNumber, email } = req.body;
  const identifier = phoneNumber || email;
  const otpCode = authService.generateOtp(identifier);
  
  logger.info(`[SEND OTP] Generated code ${otpCode} for target: ${identifier}`);
  res.status(200).json({ status: 'success', message: 'OTP sent successfully!', testOtp: otpCode });
};

export const verifyOtp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { phoneNumber, email, code, otp, username, fullName } = req.body;
  const identifier = phoneNumber || email;
  const inputCode = code || otp;

  if (!authService.verifyOtpCode(identifier, inputCode)) {
    logger.warn(`[VERIFY OTP] Failed attempt for target: ${identifier}`);
    res.status(400).json({ status: 'fail', message: 'Invalid or expired verification code.' });
    return;
  }

  let user = await authService.findUser(identifier);
  if (!user) {
    user = await authService.saveUser(identifier, {
      fullName: fullName || 'Verified User',
      username: username || null,
      email: identifier?.includes('@') ? identifier : null,
      phoneNumber: identifier && !identifier.includes('@') ? identifier : null,
      password: '',
    });
  }

  const payload = { id: user.id, email: user.email, phoneNumber: user.phoneNumber };
  const tokens = await authService.generateAuthTokens(payload);

  logger.info(`[VERIFY OTP] Success for target: ${identifier}`);
  res.status(200).json({ status: 'success', message: 'OTP verified successfully!', tokens, user });
};

export const signUp = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, password, fullName, phoneNumber, username } = req.body;
  const identifier = email || phoneNumber;

  const existingUser = await authService.findUser(identifier);
  if (existingUser) {
    logger.warn(`[SIGNUP] Conflict: User already exists for ${identifier}`);
    res.status(400).json({ status: 'fail', message: 'User already exists with this identifier.' });
    return;
  }

  const newUser = await authService.saveUser(identifier, {
    fullName,
    username,
    email: email || null,
    phoneNumber: phoneNumber || null,
    password,
  });

  const tokens = await authService.generateAuthTokens({ 
    id: newUser?.id, 
    email: newUser?.email, 
    phoneNumber: newUser?.phoneNumber 
  });

  logger.info(`[SIGNUP] Account created for: ${identifier}`);
  res.status(201).json({ status: 'success', message: 'Account created successfully!', tokens, user: newUser });
};

export const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, phoneNumber, password } = req.body;
  const identifier = email || phoneNumber;
  const user = await authService.findUser(identifier);

  if (!user || user.password !== password) {
    logger.warn(`[LOGIN] Unauthorized attempt for: ${identifier}`);
    res.status(401).json({ status: 'fail', message: 'Invalid email/phone or password.' });
    return;
  }

  const tokens = await authService.generateAuthTokens({ id: user.id, email: user.email, phoneNumber: user.phoneNumber });
  logger.info(`[LOGIN] User logged in: ${identifier}`);
  res.status(200).json({ status: 'success', message: 'Logged in successfully!', tokens, user });
};

export const googleAuth = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, fullName, username } = req.body;

  if (!email) {
    res.status(400).json({ status: 'fail', message: 'Email required from Google Auth payload' });
    return;
  }

  let user = await authService.findUser(email);
  if (!user) {
    user = await authService.saveUser(email, {
      fullName: fullName || 'Google User',
      username: username || null,
      email,
      phoneNumber: null,
      password: '',
    });
  }

  const tokens = await authService.generateAuthTokens({ id: user.id, email: user.email, phoneNumber: user.phoneNumber });
  logger.info(`[GOOGLE AUTH] Successful authentication for: ${email}`);
  res.status(200).json({ status: 'success', message: 'Google authentication successful', tokens, user });
};

export const refreshToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { refreshToken: token } = req.body;
  
  if (!token) {
    logger.warn(`[REFRESH TOKEN] Missing refresh token in request body`);
    res.status(400).json({ status: 'fail', message: 'Refresh token is required.' });
    return;
  }

  const decoded = await authService.verifyRefreshToken(token) as any;

  if (!decoded) {
    logger.warn(`[REFRESH TOKEN] Invalid, expired, or revoked refresh token presented`);
    res.status(403).json({ status: 'fail', message: 'Invalid or expired refresh token.' });
    return;
  }

  await authService.revokeRefreshToken(token);
  const tokens = await authService.generateAuthTokens({ id: decoded.id, email: decoded.email, phoneNumber: decoded.phoneNumber });
  
  logger.info(`[REFRESH TOKEN] Tokens successfully rotated for user ID: ${decoded.id}`);
  res.status(200).json({ status: 'success', tokens });
};

export const forgotPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, phoneNumber } = req.body;
  const identifier = email || phoneNumber;
  const otpCode = authService.generateOtp(identifier);
  
  logger.info(`[FORGOT PASSWORD] Reset OTP generated for: ${identifier}`);
  res.status(200).json({ status: 'success', message: 'Password reset OTP sent successfully!', testOtp: otpCode });
};

export const resetPassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, phoneNumber, newPassword } = req.body;
  const identifier = email || phoneNumber;
  const updatedUser = await authService.updateUserPassword(identifier, newPassword);
  
  if (!updatedUser) {
    logger.warn(`[RESET PASSWORD] User not found for: ${identifier}`);
    res.status(404).json({ status: 'fail', message: 'User not found.' });
    return;
  }
  
  logger.info(`[RESET PASSWORD] Password successfully updated for: ${identifier}`);
  res.status(200).json({ status: 'success', message: 'Password has been reset successfully!' });
};

export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const result = await authService.changePassword(userId, currentPassword, newPassword);
    if (!result.success) {
      logger.warn(`[CHANGE PASSWORD] Failed attempt for user ID: ${userId} - ${result.message}`);
      res.status(400).json({ status: 'fail', message: result.message });
      return;
    }

    logger.info(`[CHANGE PASSWORD] Password successfully updated for user ID: ${userId}`);
    res.status(200).json({ status: 'success', message: 'Password updated successfully!' });
  } catch (error: any) {
    logger.error(`[CHANGE PASSWORD ERROR]: ${error.message || error}`);
    res.status(500).json({ status: 'fail', message: 'Failed to update password' });
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;  
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  const user = await authService.findUserWithStats(userId);
  if (!user) {
    res.status(404).json({ status: 'fail', message: 'User not found' });
    return;
  }
  logger.info(`[GET PROFILE] Fetched profile with stats for user ID: ${userId}`);
  res.status(200).json({ status: 'success', data: user });
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;  
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ status: 'fail', message: 'No update values provided' });
    return;
  }
  try {
    const { fullName, username, phoneNumber, email, bio, photoURL } = req.body;
    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (username !== undefined) updateData.username = username;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (photoURL !== undefined) updateData.photoURL = photoURL;

    const updatedUser = await authService.updateUserProfile(userId, updateData);
    logger.info(`[UPDATE PROFILE] Updated user profile for ID: ${userId}`);
    res.status(200).json({ status: 'success', message: 'Profile updated successfully', data: updatedUser });
  } catch (error: any) {
    logger.error(`[UPDATE PROFILE ERROR]: ${error.message || error}`);
    res.status(400).json({ status: 'fail', message: error.message || 'Failed to update profile' });
  }
};

export const submitQuizHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  
  const history = await authService.saveQuizHistory(userId, req.body);
  
  // Evaluate all 6 achievements dynamically through the service layer
  await authService.evaluateAndUnlockAchievements(userId);

  logger.info(`[QUIZ HISTORY] Saved result and evaluated all achievements for user ID: ${userId}`);
  res.status(201).json({ status: 'success', message: 'Quiz history saved successfully', data: history });
};

export const getAchievements = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  try {
    const achievements = await authService.getUserAchievements(userId);
    logger.info(`[ACHIEVEMENTS] Fetched achievements for user ID: ${userId}`);
    res.status(200).json({ status: 'success', data: achievements });
  } catch (error) {
    logger.error(`[ACHIEVEMENTS ERROR]: ${error}`);
    res.status(500).json({ status: 'fail', message: 'Failed to fetch achievements' });
  }
};

export const unlockAchievement = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  
  try {
    const { key, title, description, icon } = req.body;
    const unlocked = await authService.unlockAchievement(userId, { key, title, description, icon });
    
    logger.info(`[UNLOCK ACHIEVEMENT] Achievement '${key}' unlocked for user ID: ${userId}`);
    res.status(200).json({ status: 'success', message: 'Achievement unlocked successfully', data: unlocked });
  } catch (error: any) {
    logger.error(`[UNLOCK ACHIEVEMENT ERROR]: ${error.message || error}`);
    res.status(500).json({ status: 'fail', message: 'Failed to unlock achievement' });
  }
};

export const getLeaderboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const leaders = await authService.getTopLeaderboard(20);
    logger.info(`[LEADERBOARD] Fetched top performers successfully`);
    res.status(200).json({ status: 'success', data: leaders });
  } catch (error) {
    logger.error(`[LEADERBOARD ERROR]: ${error}`);
    res.status(500).json({ status: 'fail', message: 'Failed to fetch leaderboard' });
  }
};

export const getQuizHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }
  try {
    const history = await authService.getUserQuizHistory(userId);
    logger.info(`[QUIZ HISTORY] Fetched history for user ID: ${userId}`);
    res.status(200).json({ status: 'success', data: history });
  } catch (error) {
    logger.error(`[QUIZ HISTORY ERROR]: ${error}`);
    res.status(500).json({ status: 'fail', message: 'Failed to fetch quiz history' });
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { refreshToken: token, keepBiometricSession } = req.body;
  
  if (token && !keepBiometricSession) {
    await authService.revokeRefreshToken(token);
  }
  
  logger.info(`[LOGOUT] User logged out successfully (Biometric preserved: ${!!keepBiometricSession})`);
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};