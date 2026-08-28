import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{10,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const sendOtpSchema = z.object({
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
  path: ['phoneNumber'],
});

export const verifyOtpSchema = z.object({
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
  path: ['phoneNumber'],
})
.refine((data) => data.code || data.otp, {
  message: 'Verification code is required',
  path: ['code'],
});

export const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
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
});

export const loginSchema = z.object({
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
});

export const forgotPasswordSchema = z.object({
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
});

export const resetPasswordSchema = z.object({
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
});