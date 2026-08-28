import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

const otpStore = new Map<string, string>();
const userStore = new Map<string, any>(); 

export const sendOtp = (req: Request, res: Response): void => {
  const { phoneNumber, email } = req.body;
  const identifier = phoneNumber || email;

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(identifier, otpCode);

  console.log(`[TEST OTP] Generated code ${otpCode} for target: ${identifier}`);

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully!',
    testOtp: otpCode,
  });
};

export const verifyOtp = (req: Request, res: Response): void => {
  const { phoneNumber, email, code, otp } = req.body;
  const identifier = phoneNumber || email;
  const inputCode = code || otp;

  const storedOtp = otpStore.get(identifier);

  if (!storedOtp || storedOtp !== inputCode) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid or expired verification code.',
    });
    return;
  }

  otpStore.delete(identifier);

  const tokenPayload = phoneNumber ? { phoneNumber } : { email };
  const token = jwt.sign(
    tokenPayload,
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.status(200).json({
    status: 'success',
    message: 'OTP verified successfully!',
    token,
  });
};

export const signup = (req: Request, res: Response): void => {
  const { email, password, fullName, phoneNumber } = req.body;
  const identifier = email || phoneNumber;

  if (!identifier || !password) {
    res.status(400).json({
      status: 'fail',
      message: 'Email/Phone and password are required.',
    });
    return;
  }

  if (userStore.has(identifier)) {
    res.status(400).json({
      status: 'fail',
      message: 'User already exists with this identifier.',
    });
    return;
  }

  const newUser = {
    fullName,
    email: email || null,
    phoneNumber: phoneNumber || null,
    password, 
    createdAt: new Date().toISOString(),
  };

  userStore.set(identifier, newUser);

  const token = jwt.sign({ email, phoneNumber }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({
    status: 'success',
    message: 'Account created successfully!',
    token,
    user: newUser,
  });
};

export const login = (req: Request, res: Response): void => {
  const { email, phoneNumber, password } = req.body;
  const identifier = email || phoneNumber;

  const user = userStore.get(identifier);

  if (!user || user.password !== password) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid email/phone or password.',
    });
    return;
  }

  const token = jwt.sign({ email: user.email, phoneNumber: user.phoneNumber }, JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully!',
    token,
    user,
  });
};

export const forgotPassword = (req: Request, res: Response): void => {
  const { email, phoneNumber } = req.body;
  const identifier = email || phoneNumber;

  if (!identifier) {
    res.status(400).json({
      status: 'fail',
      message: 'Email or phone number is required.',
    });
    return;
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(identifier, otpCode);

  console.log(`[PASSWORD RESET OTP] Generated code ${otpCode} for target: ${identifier}`);

  res.status(200).json({
    status: 'success',
    message: 'Password reset OTP sent successfully!',
    testOtp: otpCode,
  });
};

export const resetPassword = (req: Request, res: Response): void => {
  const { email, phoneNumber, newPassword } = req.body;
  const identifier = email || phoneNumber;

  if (!identifier || !newPassword) {
    res.status(400).json({
      status: 'fail',
      message: 'Identifier and new password are required.',
    });
    return;
  }

  const user = userStore.get(identifier);
  if (!user) {
    res.status(404).json({
      status: 'fail',
      message: 'User not found.',
    });
    return;
  }

  user.password = newPassword;
  userStore.set(identifier, user);

  res.status(200).json({
    status: 'success',
    message: 'Password has been reset successfully!',
  });
};