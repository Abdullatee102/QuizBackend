import { z } from 'zod';
import {
  ATTENDANCE_SESSION_TYPES,
  ATTENDANCE_SESSION_STATUSES,
  ATTENDANCE_RECORD_STATUSES,
} from '../db/schema.js';

export const createAttendanceSessionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Session title must be at least 3 characters')
      .max(255, 'Session title cannot exceed 255 characters'),
    sessionType: z
      .enum([
        ATTENDANCE_SESSION_TYPES.LECTURE,
        ATTENDANCE_SESSION_TYPES.LAB,
        ATTENDANCE_SESSION_TYPES.TUTORIAL,
        ATTENDANCE_SESSION_TYPES.SEMINAR,
        ATTENDANCE_SESSION_TYPES.PRACTICAL,
      ])
      .default(ATTENDANCE_SESSION_TYPES.LECTURE),
    sessionDate: z
      .string()
      .trim()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'sessionDate must be a valid date or ISO string',
      }),
    startTime: z.string().trim().max(50).optional().nullable(),
    endTime: z.string().trim().max(50).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
  }),
});

export const updateAttendanceSessionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, 'Session title must be at least 3 characters')
      .max(255, 'Session title cannot exceed 255 characters')
      .optional(),
    sessionType: z
      .enum([
        ATTENDANCE_SESSION_TYPES.LECTURE,
        ATTENDANCE_SESSION_TYPES.LAB,
        ATTENDANCE_SESSION_TYPES.TUTORIAL,
        ATTENDANCE_SESSION_TYPES.SEMINAR,
        ATTENDANCE_SESSION_TYPES.PRACTICAL,
      ])
      .optional(),
    sessionDate: z
      .string()
      .trim()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'sessionDate must be a valid date or ISO string',
      })
      .optional(),
    startTime: z.string().trim().max(50).optional().nullable(),
    endTime: z.string().trim().max(50).optional().nullable(),
    status: z
      .enum([
        ATTENDANCE_SESSION_STATUSES.OPEN,
        ATTENDANCE_SESSION_STATUSES.CLOSED,
        ATTENDANCE_SESSION_STATUSES.CANCELLED,
      ])
      .optional(),
    notes: z.string().trim().max(2000).optional().nullable(),
  }),
});

export const recordAttendanceBatchSchema = z.object({
  body: z.object({
    records: z
      .array(
        z.object({
          studentId: z.string().uuid('Invalid student ID format'),
          status: z.enum([
            ATTENDANCE_RECORD_STATUSES.PRESENT,
            ATTENDANCE_RECORD_STATUSES.ABSENT,
            ATTENDANCE_RECORD_STATUSES.LATE,
            ATTENDANCE_RECORD_STATUSES.EXCUSED,
          ]),
          remarks: z.string().trim().max(500).optional().nullable(),
        })
      )
      .min(1, 'At least one attendance record must be provided'),
  }),
});

export const updateAttendanceRecordSchema = z.object({
  body: z.object({
    status: z.enum([
      ATTENDANCE_RECORD_STATUSES.PRESENT,
      ATTENDANCE_RECORD_STATUSES.ABSENT,
      ATTENDANCE_RECORD_STATUSES.LATE,
      ATTENDANCE_RECORD_STATUSES.EXCUSED,
    ]),
    remarks: z.string().trim().max(500).optional().nullable(),
    reason: z
      .string()
      .trim()
      .min(5, 'Correction reason must be at least 5 characters')
      .max(500, 'Correction reason cannot exceed 500 characters'),
  }),
});

export type CreateAttendanceSessionInput = z.infer<typeof createAttendanceSessionSchema>['body'];
export type UpdateAttendanceSessionInput = z.infer<typeof updateAttendanceSessionSchema>['body'];
export type RecordAttendanceBatchInput = z.infer<typeof recordAttendanceBatchSchema>['body'];
export type UpdateAttendanceRecordInput = z.infer<typeof updateAttendanceRecordSchema>['body'];

