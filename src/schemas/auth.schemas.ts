// 3. ZOD VALIDATION SCHEMA (authValidation.ts)
import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{10,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const sendOtpSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional(),
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional(),
  }).refine((data) => data.phoneNumber || data.email, {
    message: 'Either phone number or email is required',
    path: ['email'],
  }),
});

export const verifyOtpSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional(),
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional(),
    code: z
      .string()
      .length(6, 'Verification code must be exactly 6 digits')
      .optional(),
    otp: z
      .string()
      .length(6, 'Verification code must be exactly 6 digits')
      .optional(),
  })
  .refine((data) => data.phoneNumber || data.email, {
    message: 'Either phone number or email is required',
    path: ['email'],
  })
  .refine((data) => data.code || data.otp, {
    message: 'Verification code is required',
    path: ['code'],
  }),
});

export const signUpSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional()
      .or(z.literal('')),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }).refine((data) => data.email || data.phoneNumber, {
    message: 'Either email or phone number is required',
    path: ['email'],
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional()
      .or(z.literal('')),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
    password: z.string().min(1, 'Password is required'),
  }).refine((data) => data.email || data.phoneNumber, {
    message: 'Email or phone number is required',
    path: ['email'],
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional()
      .or(z.literal('')),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
  }).refine((data) => data.email || data.phoneNumber, {
    message: 'Email or phone number is required',
    path: ['email'],
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(emailRegex, 'Invalid email address format')
      .optional()
      .or(z.literal('')),
    phoneNumber: z
      .string()
      .regex(phoneRegex, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  }).refine((data) => data.email || data.phoneNumber, {
    message: 'Email or phone number is required',
    path: ['email'],
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  }),
});

export const submitQuizHistorySchema = z.object({
  body: z.object({
    score: z.number().min(0, 'Score cannot be negative'),
    totalQuestions: z.number().min(1, 'Total questions must be at least 1'),
    category: z.string().min(1, 'Category is required'),
    correctAnswers: z.number().min(0, 'Correct answers cannot be negative'),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
    username: z.string().min(3, 'Username must be at least 3 characters').optional().or(z.literal('')),
    email: z.string().regex(emailRegex, 'Invalid email address format').optional().or(z.literal('')),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number format').optional().or(z.literal('')),
    bio: z.string().max(300, 'Bio must be under 300 characters').optional().or(z.literal('')),
    photoURL: z.string().url('Invalid image URL format').optional().or(z.literal('')),
  }),
});

export const unlockAchievementSchema = z.object({
  body: z.object({
    key: z.string().min(1, 'Achievement key is required'),
    title: z.string().min(1, 'Achievement title is required'),
    description: z.string().optional(),
    icon: z.string().optional(),
  }),
});