import { z } from 'zod';

const academicSessionValidator = z
  .string()
  .min(1, 'Academic session is required')
  .trim()
  .regex(/^\d{4}\/\d{4}$/, 'Academic session must follow the YYYY/YYYY format (e.g. 2026/2027)')
  .refine((val) => {
    const parts = val.split('/');
    const start = Number(parts[0]);
    const end = Number(parts[1]);
    return !isNaN(start) && !isNaN(end) && end === start + 1;
  }, 'Academic session end year must be consecutive to start year (e.g. 2026/2027)');

const semesterValidator = z
  .string()
  .min(1, 'Semester is required')
  .trim()
  .toLowerCase()
  .refine((val) => val === 'harmattan' || val === 'rain', {
    message: 'Semester must be either "harmattan" or "rain"',
  });

export const createOfferingSchema = z.object({
  body: z.object({
    courseId: z.string().uuid('Invalid course ID'),
    academicSession: academicSessionValidator,
    semester: semesterValidator,
    level: z.coerce.number().int().min(100).max(900, 'Level must be between 100 and 900'),
    section: z.string().trim().min(1, 'Section name cannot be empty').default('DEFAULT'),
    status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).default('ACTIVE'),
    maxCapacity: z.coerce.number().int().positive('Max capacity must be positive').optional().nullable(),
  }),
});

export const updateOfferingSchema = z.object({
  body: z.object({
    level: z.coerce.number().int().min(100).max(900).optional(),
    section: z.string().trim().min(1).optional(),
    status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
    maxCapacity: z.coerce.number().int().positive().optional().nullable(),
  }),
});

export const updateOfferingStatusSchema = z.object({
  body: z.object({
    status: z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']),
  }),
});

export const queryOfferingsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    academicSession: z.string().optional(),
    semester: z.string().optional(),
    courseId: z.string().uuid().optional(),
    departmentId: z.string().uuid().optional(),
    level: z.coerce.number().int().optional(),
    status: z.string().optional(),
    search: z.string().optional(),
  }).optional(),
});

export const assignOfferingLecturerSchema = z.object({
  body: z.object({
    lecturerId: z.string().uuid('Invalid lecturer ID'),
    role: z.enum(['PRIMARY', 'CO_LECTURER', 'ASSISTANT']).default('PRIMARY'),
  }),
});

export const createEnrollmentSchema = z.object({
  body: z.object({
    studentId: z.string().uuid('Invalid student ID').optional(),
    studentIds: z.array(z.string().uuid('Invalid student ID')).optional(),
    source: z.enum(['ADMIN_MANUAL', 'ADMIN_IMPORT', 'STUDENT_SELF', 'SYSTEM']).default('ADMIN_MANUAL'),
  }).refine((data) => data.studentId || (data.studentIds && data.studentIds.length > 0), {
    message: 'Either studentId or non-empty studentIds array is required',
  }),
});

export const updateEnrollmentStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ENROLLED', 'DROPPED', 'COMPLETED', 'SUSPENDED']),
  }),
});

export const queryEnrollmentsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
    status: z.string().optional(),
    search: z.string().optional(),
  }).optional(),
});

