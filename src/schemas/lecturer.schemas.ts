import { z } from 'zod';

export const lecturerLoginSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email or username is required').trim(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const provisionLecturerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').trim(),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    username: z.string().min(2).trim().optional(),
    phoneNumber: z.string().min(5).trim().optional(),
    facultyId: z.string().uuid('Invalid faculty ID').optional(),
    departmentId: z.string().uuid('Invalid department ID').optional(),
  }),
});

export const assignCourseSchema = z.object({
  params: z.object({
    lecturerId: z.string().uuid('Invalid lecturer ID'),
  }).optional(),
  body: z.object({
    courseId: z.string().uuid('Invalid course ID'),
    academicSession: z
      .string()
      .min(1, 'Academic session is required')
      .trim()
      .regex(/^\d{4}\/\d{4}$/, 'Academic session must follow the YYYY/YYYY format (e.g. 2025/2026)')
      .refine((val) => {
        const parts = val.split('/');
        const start = Number(parts[0]);
        const end = Number(parts[1]);
        return !isNaN(start) && !isNaN(end) && end === start + 1;
      }, 'Academic session end year must be consecutive to start year (e.g. 2025/2026)'),
    semester: z
      .string()
      .min(1, 'Semester is required')
      .trim()
      .toLowerCase()
      .refine((val) => val === 'harmattan' || val === 'rain', {
        message: 'Semester must be either "harmattan" or "rain"',
      }),
  }),
});

export const queryAssignedCoursesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    search: z.string().optional(),
    semester: z.string().optional(),
    academicSession: z.string().optional(),
  }).optional(),
});
