import { db } from '../db/index.js';
import {
  attendanceSessionsTable,
  attendanceRecordsTable,
  attendanceAuditLogsTable,
  courseOfferingsTable,
  coursesTable,
  usersTable,
  studentEnrollmentsTable,
  departmentsTable,
  facultiesTable,
  ATTENDANCE_SESSION_STATUSES,
  ATTENDANCE_RECORD_STATUSES,
  type AttendanceSessionStatus,
  type AttendanceRecordStatus,
} from '../db/schema.js';
import { eq, and, sql, desc, asc, inArray } from 'drizzle-orm';
import { assessmentService } from './assessmentService.js';
import type {
  CreateAttendanceSessionInput,
  UpdateAttendanceSessionInput,
  RecordAttendanceBatchInput,
  UpdateAttendanceRecordInput,
} from '../schemas/attendance.schemas.js';
import logger from '../config/logger.js';

/**
 * Helper to determine if an attendance session's stipulated time has expired.
 */
export function isSessionTimeExpired(sessionDate: Date | string, endTime?: string | null): boolean {
  if (!endTime) return false;
  try {
    const sDate = new Date(sessionDate);
    if (isNaN(sDate.getTime())) return false;

    // Check if endTime is full ISO format
    if (endTime.includes('T') || (endTime.includes('-') && endTime.length > 8)) {
      const parsed = new Date(endTime);
      if (!isNaN(parsed.getTime())) {
        return Date.now() > parsed.getTime();
      }
    }

    // Parse HH:mm from endTime string
    const parts = endTime.trim().split(':');
    if (parts.length >= 2 && parts[0] !== undefined && parts[1] !== undefined) {
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (!isNaN(hours) && !isNaN(minutes)) {
        const deadline = new Date(sDate);
        deadline.setHours(hours, minutes, 59, 999);
        return Date.now() > deadline.getTime();
      }
    }
  } catch (err) {
    logger.warn(`[ATTENDANCE] Error calculating session expiration: ${err}`);
  }
  return false;
}

export const attendanceService = {
  /**
   * Create an attendance session for an authorized course offering.
   */
  createSession: async (
    lecturerId: string,
    offeringId: string,
    input: CreateAttendanceSessionInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [session] = await db
      .insert(attendanceSessionsTable)
      .values({
        offeringId: offeringId as any,
        createdBy: lecturerId as any,
        title: input.title,
        sessionType: input.sessionType || 'LECTURE',
        sessionDate: new Date(input.sessionDate),
        startTime: input.startTime || null,
        endTime: input.endTime || null,
        status: ATTENDANCE_SESSION_STATUSES.OPEN,
        notes: input.notes || null,
      })
      .returning();

    if (!session) {
      throw new Error('Failed to create attendance session.');
    }

    logger.info(`[ATTENDANCE] Session created: ${session.id} for offering: ${offeringId} by lecturer: ${lecturerId}`);
    return session;
  },

  /**
   * Update attendance session parameters or status (OPEN / CLOSED / CANCELLED).
   */
  updateSession: async (
    lecturerId: string,
    offeringId: string,
    sessionId: string,
    input: UpdateAttendanceSessionInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [existing] = await db
      .select()
      .from(attendanceSessionsTable)
      .where(
        and(
          eq(attendanceSessionsTable.id, sessionId as any),
          eq(attendanceSessionsTable.offeringId, offeringId as any)
        )
      );

    if (!existing) {
      throw new Error('Attendance session not found for this course offering.');
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) updatePayload.title = input.title;
    if (input.sessionType !== undefined) updatePayload.sessionType = input.sessionType;
    if (input.sessionDate !== undefined) updatePayload.sessionDate = new Date(input.sessionDate);
    if (input.startTime !== undefined) updatePayload.startTime = input.startTime;
    if (input.endTime !== undefined) updatePayload.endTime = input.endTime;
    if (input.status !== undefined) updatePayload.status = input.status;
    if (input.notes !== undefined) updatePayload.notes = input.notes;

    const [updated] = await db
      .update(attendanceSessionsTable)
      .set(updatePayload)
      .where(eq(attendanceSessionsTable.id, sessionId as any))
      .returning();

    // If session is closed, automatically record all unmarked enrolled students as ABSENT
    if (input.status === ATTENDANCE_SESSION_STATUSES.CLOSED) {
      try {
        const enrolled = await db
          .select({ studentId: studentEnrollmentsTable.studentId })
          .from(studentEnrollmentsTable)
          .where(
            and(
              eq(studentEnrollmentsTable.offeringId, offeringId as any),
              eq(studentEnrollmentsTable.status, 'ENROLLED')
            )
          );

        const existingRecords = await db
          .select({ studentId: attendanceRecordsTable.studentId })
          .from(attendanceRecordsTable)
          .where(eq(attendanceRecordsTable.sessionId, sessionId as any));

        const markedSet = new Set(existingRecords.map((r) => r.studentId));
        const unmarked = enrolled.filter((e) => !markedSet.has(e.studentId));

        if (unmarked.length > 0) {
          await db.insert(attendanceRecordsTable).values(
            unmarked.map((u) => ({
              sessionId: sessionId as any,
              studentId: u.studentId as any,
              status: ATTENDANCE_RECORD_STATUSES.ABSENT,
              markedBy: lecturerId as any,
              markedAt: new Date(),
              remarks: 'Auto-recorded as ABSENT (did not check in before session was closed)',
            }))
          );
          logger.info(
            `[ATTENDANCE] Auto-recorded ${unmarked.length} unmarked students as ABSENT on session close for session ${sessionId}`
          );
        }
      } catch (err) {
        logger.error(`[ATTENDANCE] Error populating absent records on session close: ${err}`);
      }
    }

    return updated;
  },

  /**
   * List all attendance sessions for an offering with summary status counts.
   */
  listSessions: async (
    lecturerId: string,
    offeringId: string,
    options: { status?: string | undefined; page?: number | undefined; limit?: number | undefined } = {}
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 20));
    const offset = (page - 1) * limit;

    const conditions = [eq(attendanceSessionsTable.offeringId, offeringId as any)];
    if (options.status) {
      conditions.push(eq(attendanceSessionsTable.status, options.status as any));
    }

    const whereClause = and(...conditions);

    // Count total sessions
    const [countResult] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(attendanceSessionsTable)
      .where(whereClause);

    const totalSessions = countResult?.count || 0;

    // Fetch sessions ordered by date descending
    const sessions = await db
      .select({
        id: attendanceSessionsTable.id,
        offeringId: attendanceSessionsTable.offeringId,
        title: attendanceSessionsTable.title,
        sessionType: attendanceSessionsTable.sessionType,
        sessionDate: attendanceSessionsTable.sessionDate,
        startTime: attendanceSessionsTable.startTime,
        endTime: attendanceSessionsTable.endTime,
        status: attendanceSessionsTable.status,
        notes: attendanceSessionsTable.notes,
        createdAt: attendanceSessionsTable.createdAt,
        updatedAt: attendanceSessionsTable.updatedAt,
      })
      .from(attendanceSessionsTable)
      .where(whereClause)
      .orderBy(desc(attendanceSessionsTable.sessionDate), desc(attendanceSessionsTable.createdAt))
      .limit(limit)
      .offset(offset);

    // Get stats for these sessions
    const sessionIds = sessions.map((s) => s.id);
    let statsMap: Record<string, { present: number; absent: number; late: number; excused: number; total: number }> = {};

    if (sessionIds.length > 0) {
      const records = await db
        .select({
          sessionId: attendanceRecordsTable.sessionId,
          status: attendanceRecordsTable.status,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(attendanceRecordsTable)
        .where(inArray(attendanceRecordsTable.sessionId, sessionIds as any))
        .groupBy(attendanceRecordsTable.sessionId, attendanceRecordsTable.status);

      for (const row of records) {
        if (!statsMap[row.sessionId]) {
          statsMap[row.sessionId] = { present: 0, absent: 0, late: 0, excused: 0, total: 0 };
        }
        const sStat = statsMap[row.sessionId]!;
        if (row.status === ATTENDANCE_RECORD_STATUSES.PRESENT) sStat.present = row.count;
        if (row.status === ATTENDANCE_RECORD_STATUSES.ABSENT) sStat.absent = row.count;
        if (row.status === ATTENDANCE_RECORD_STATUSES.LATE) sStat.late = row.count;
        if (row.status === ATTENDANCE_RECORD_STATUSES.EXCUSED) sStat.excused = row.count;
        sStat.total += row.count;
      }
    }

    const sessionsWithStats = sessions.map((s) => ({
      ...s,
      stats: statsMap[s.id] || { present: 0, absent: 0, late: 0, excused: 0, total: 0 },
    }));

    return {
      sessions: sessionsWithStats,
      pagination: {
        page,
        limit,
        total: totalSessions,
        totalPages: Math.ceil(totalSessions / limit),
      },
    };
  },

  /**
   * Get attendance session details and complete student roll-call roster.
   */
  getSessionDetails: async (
    lecturerId: string,
    offeringId: string,
    sessionId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [session] = await db
      .select({
        id: attendanceSessionsTable.id,
        offeringId: attendanceSessionsTable.offeringId,
        title: attendanceSessionsTable.title,
        sessionType: attendanceSessionsTable.sessionType,
        sessionDate: attendanceSessionsTable.sessionDate,
        startTime: attendanceSessionsTable.startTime,
        endTime: attendanceSessionsTable.endTime,
        status: attendanceSessionsTable.status,
        notes: attendanceSessionsTable.notes,
        createdAt: attendanceSessionsTable.createdAt,
        updatedAt: attendanceSessionsTable.updatedAt,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
      })
      .from(attendanceSessionsTable)
      .innerJoin(courseOfferingsTable, eq(attendanceSessionsTable.offeringId, courseOfferingsTable.id))
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(
        and(
          eq(attendanceSessionsTable.id, sessionId as any),
          eq(attendanceSessionsTable.offeringId, offeringId as any)
        )
      );

    if (!session) {
      throw new Error('Attendance session not found for this course offering.');
    }

    // Get all enrolled students for this offering
    const enrolledStudents = await db
      .select({
        studentId: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        level: usersTable.level,
        departmentName: departmentsTable.name,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .leftJoin(departmentsTable, eq(usersTable.departmentId, departmentsTable.id))
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      )
      .orderBy(asc(usersTable.fullName));

    // Get all recorded attendance for this session
    const recordedAttendance = await db
      .select({
        id: attendanceRecordsTable.id,
        studentId: attendanceRecordsTable.studentId,
        status: attendanceRecordsTable.status,
        remarks: attendanceRecordsTable.remarks,
        markedAt: attendanceRecordsTable.markedAt,
        markedBy: attendanceRecordsTable.markedBy,
        updatedAt: attendanceRecordsTable.updatedAt,
        updatedBy: attendanceRecordsTable.updatedBy,
      })
      .from(attendanceRecordsTable)
      .where(eq(attendanceRecordsTable.sessionId, sessionId as any));

    const recordsMap = new Map<string, typeof recordedAttendance[0]>();
    for (const rec of recordedAttendance) {
      recordsMap.set(rec.studentId, rec);
    }

    const isClosedOrExpired =
      session.status === ATTENDANCE_SESSION_STATUSES.CLOSED ||
      isSessionTimeExpired(session.sessionDate, session.endTime);

    // Merge student roster with attendance status
    const roster = enrolledStudents.map((st) => {
      const record = recordsMap.get(st.studentId);
      const computedStatus = record?.status
        ? (record.status as AttendanceRecordStatus)
        : isClosedOrExpired
        ? (ATTENDANCE_RECORD_STATUSES.ABSENT as AttendanceRecordStatus)
        : null;

      return {
        studentId: st.studentId,
        fullName: st.fullName,
        username: st.username,
        email: st.email,
        level: st.level,
        departmentName: st.departmentName,
        isMarked: Boolean(record) || isClosedOrExpired,
        recordId: record?.id || null,
        status: computedStatus,
        remarks:
          record?.remarks ||
          (isClosedOrExpired && !record
            ? 'Did not check in within stipulated time (ABSENT)'
            : null),
        markedAt: record?.markedAt || null,
        updatedAt: record?.updatedAt || null,
      };
    });

    const explicitPresent = recordedAttendance.filter((r) => r.status === ATTENDANCE_RECORD_STATUSES.PRESENT).length;
    const explicitLate = recordedAttendance.filter((r) => r.status === ATTENDANCE_RECORD_STATUSES.LATE).length;
    const explicitExcused = recordedAttendance.filter((r) => r.status === ATTENDANCE_RECORD_STATUSES.EXCUSED).length;
    const explicitAbsent = recordedAttendance.filter((r) => r.status === ATTENDANCE_RECORD_STATUSES.ABSENT).length;
    const unrecordedCount = Math.max(0, enrolledStudents.length - recordedAttendance.length);
    const absentCount = isClosedOrExpired ? explicitAbsent + unrecordedCount : explicitAbsent;

    const stats = {
      enrolledTotal: enrolledStudents.length,
      markedTotal: isClosedOrExpired ? enrolledStudents.length : recordedAttendance.length,
      present: explicitPresent,
      absent: absentCount,
      late: explicitLate,
      excused: explicitExcused,
    };

    return {
      session,
      stats,
      roster,
    };
  },

  /**
   * Batch record attendance for enrolled students in a session.
   */
  recordBatchAttendance: async (
    lecturerId: string,
    offeringId: string,
    sessionId: string,
    input: RecordAttendanceBatchInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [session] = await db
      .select()
      .from(attendanceSessionsTable)
      .where(
        and(
          eq(attendanceSessionsTable.id, sessionId as any),
          eq(attendanceSessionsTable.offeringId, offeringId as any)
        )
      );

    if (!session) {
      throw new Error('Attendance session not found for this course offering.');
    }

    if (session.status === ATTENDANCE_SESSION_STATUSES.CANCELLED) {
      throw new Error('Cannot record attendance for a cancelled session.');
    }

    // Verify all students are enrolled in this offering
    const studentIds = input.records.map((r) => r.studentId);
    const enrolledStudents = await db
      .select({ studentId: studentEnrollmentsTable.studentId })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED'),
          inArray(studentEnrollmentsTable.studentId, studentIds as any)
        )
      );

    const enrolledSet = new Set(enrolledStudents.map((e) => e.studentId));
    const ineligibleStudents = studentIds.filter((id) => !enrolledSet.has(id));

    if (ineligibleStudents.length > 0) {
      throw new Error(
        `Cannot record attendance. The following students are not actively enrolled in this offering: ${ineligibleStudents.join(', ')}`
      );
    }

    // Upsert attendance records
    let createdCount = 0;
    let updatedCount = 0;

    for (const rec of input.records) {
      const [existing] = await db
        .select({ id: attendanceRecordsTable.id, status: attendanceRecordsTable.status })
        .from(attendanceRecordsTable)
        .where(
          and(
            eq(attendanceRecordsTable.sessionId, sessionId as any),
            eq(attendanceRecordsTable.studentId, rec.studentId as any)
          )
        );

      if (existing) {
        await db
          .update(attendanceRecordsTable)
          .set({
            status: rec.status,
            remarks: rec.remarks || null,
            updatedBy: lecturerId as any,
            updatedAt: new Date(),
          })
          .where(eq(attendanceRecordsTable.id, existing.id));
        updatedCount++;
      } else {
        await db
          .insert(attendanceRecordsTable)
          .values({
            sessionId: sessionId as any,
            studentId: rec.studentId as any,
            status: rec.status,
            remarks: rec.remarks || null,
            markedBy: lecturerId as any,
            markedAt: new Date(),
            updatedAt: new Date(),
          });
        createdCount++;
      }
    }

    logger.info(
      `[ATTENDANCE] Recorded batch attendance for session ${sessionId}: ${createdCount} created, ${updatedCount} updated by lecturer ${lecturerId}`
    );

    return {
      sessionId,
      totalSubmitted: input.records.length,
      createdCount,
      updatedCount,
    };
  },

  /**
   * Correct an individual student's attendance record with mandatory audit reasoning.
   */
  updateAttendanceRecord: async (
    lecturerId: string,
    offeringId: string,
    sessionId: string,
    recordId: string,
    input: UpdateAttendanceRecordInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [record] = await db
      .select()
      .from(attendanceRecordsTable)
      .where(
        and(
          eq(attendanceRecordsTable.id, recordId as any),
          eq(attendanceRecordsTable.sessionId, sessionId as any)
        )
      );

    if (!record) {
      throw new Error('Attendance record not found for this session.');
    }

    const previousStatus = record.status;
    const newStatus = input.status;

    // Update attendance record
    const [updated] = await db
      .update(attendanceRecordsTable)
      .set({
        status: newStatus,
        remarks: input.remarks !== undefined ? input.remarks : record.remarks,
        updatedBy: lecturerId as any,
        updatedAt: new Date(),
      })
      .where(eq(attendanceRecordsTable.id, recordId as any))
      .returning();

    // Log immutable correction in attendance_audit_logs
    const [auditLog] = await db
      .insert(attendanceAuditLogsTable)
      .values({
        recordId: record.id,
        sessionId: sessionId as any,
        studentId: record.studentId,
        previousStatus,
        newStatus,
        reason: input.reason,
        performedBy: lecturerId as any,
      })
      .returning();

    logger.info(
      `[ATTENDANCE_CORRECTION] Record ${recordId} in session ${sessionId} updated from ${previousStatus} to ${newStatus} by lecturer ${lecturerId}. Reason: ${input.reason}`
    );

    return {
      record: updated,
      auditLog,
    };
  },

  /**
   * Get offering-level attendance summary (total sessions, enrolled students, average rate, per-student summary).
   */
  getOfferingAttendanceSummary: async (
    lecturerId: string,
    offeringId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        level: courseOfferingsTable.level,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        departmentName: departmentsTable.name,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // Total non-cancelled sessions
    const sessions = await db
      .select({
        id: attendanceSessionsTable.id,
        title: attendanceSessionsTable.title,
        sessionDate: attendanceSessionsTable.sessionDate,
        status: attendanceSessionsTable.status,
      })
      .from(attendanceSessionsTable)
      .where(
        and(
          eq(attendanceSessionsTable.offeringId, offeringId as any),
          sql`${attendanceSessionsTable.status} != ${ATTENDANCE_SESSION_STATUSES.CANCELLED}`
        )
      )
      .orderBy(asc(attendanceSessionsTable.sessionDate));

    const totalSessions = sessions.length;

    // Enrolled students
    const enrolledStudents = await db
      .select({
        studentId: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        level: usersTable.level,
      })
      .from(studentEnrollmentsTable)
      .innerJoin(usersTable, eq(studentEnrollmentsTable.studentId, usersTable.id))
      .where(
        and(
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      )
      .orderBy(asc(usersTable.fullName));

    // Get attendance records for all active sessions in this offering
    const activeSessionIds = sessions.map((s) => s.id);
    let studentStatsMap: Record<
      string,
      { present: number; absent: number; late: number; excused: number; attended: number }
    > = {};

    for (const st of enrolledStudents) {
      studentStatsMap[st.studentId] = { present: 0, absent: 0, late: 0, excused: 0, attended: 0 };
    }

    if (activeSessionIds.length > 0) {
      const records = await db
        .select({
          studentId: attendanceRecordsTable.studentId,
          status: attendanceRecordsTable.status,
          count: sql<number>`cast(count(*) as integer)`,
        })
        .from(attendanceRecordsTable)
        .where(inArray(attendanceRecordsTable.sessionId, activeSessionIds as any))
        .groupBy(attendanceRecordsTable.studentId, attendanceRecordsTable.status);

      for (const r of records) {
        if (!studentStatsMap[r.studentId]) {
          studentStatsMap[r.studentId] = { present: 0, absent: 0, late: 0, excused: 0, attended: 0 };
        }
        const stStat = studentStatsMap[r.studentId]!;
        if (r.status === ATTENDANCE_RECORD_STATUSES.PRESENT) stStat.present += r.count;
        if (r.status === ATTENDANCE_RECORD_STATUSES.ABSENT) stStat.absent += r.count;
        if (r.status === ATTENDANCE_RECORD_STATUSES.LATE) stStat.late += r.count;
        if (r.status === ATTENDANCE_RECORD_STATUSES.EXCUSED) stStat.excused += r.count;
        if (r.status === ATTENDANCE_RECORD_STATUSES.PRESENT || r.status === ATTENDANCE_RECORD_STATUSES.LATE) {
          stStat.attended += r.count;
        }
      }
    }

    const studentSummaries = enrolledStudents.map((st) => {
      const stats = studentStatsMap[st.studentId] || { present: 0, absent: 0, late: 0, excused: 0, attended: 0 };
      const percentage = totalSessions > 0 ? Math.round((stats.attended / totalSessions) * 100 * 10) / 10 : 0;
      return {
        ...st,
        presentCount: stats.present,
        absentCount: stats.absent,
        lateCount: stats.late,
        excusedCount: stats.excused,
        attendedCount: stats.attended,
        totalSessions,
        attendancePercentage: percentage,
      };
    });

    // Overall course metrics
    const totalPossibleAttendances = totalSessions * enrolledStudents.length;
    const totalAttended = studentSummaries.reduce((acc, curr) => acc + curr.attendedCount, 0);
    const overallAttendanceRate =
      totalPossibleAttendances > 0 ? Math.round((totalAttended / totalPossibleAttendances) * 100 * 10) / 10 : 0;

    return {
      offering,
      metrics: {
        totalSessions,
        enrolledStudentsCount: enrolledStudents.length,
        overallAttendanceRate,
        averageAttendedPerSession:
          totalSessions > 0 ? Math.round((totalAttended / totalSessions) * 10) / 10 : 0,
      },
      students: studentSummaries,
    };
  },

  /**
   * Get historical attendance for an individual student in an offering.
   */
  getStudentAttendanceHistory: async (
    lecturerId: string,
    offeringId: string,
    studentId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [student] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        username: usersTable.username,
        email: usersTable.email,
        level: usersTable.level,
      })
      .from(usersTable)
      .where(eq(usersTable.id, studentId as any));

    if (!student) {
      throw new Error('Student not found.');
    }

    const records = await db
      .select({
        recordId: attendanceRecordsTable.id,
        sessionId: attendanceSessionsTable.id,
        sessionTitle: attendanceSessionsTable.title,
        sessionType: attendanceSessionsTable.sessionType,
        sessionDate: attendanceSessionsTable.sessionDate,
        startTime: attendanceSessionsTable.startTime,
        endTime: attendanceSessionsTable.endTime,
        status: attendanceRecordsTable.status,
        remarks: attendanceRecordsTable.remarks,
        markedAt: attendanceRecordsTable.markedAt,
        updatedAt: attendanceRecordsTable.updatedAt,
      })
      .from(attendanceRecordsTable)
      .innerJoin(attendanceSessionsTable, eq(attendanceRecordsTable.sessionId, attendanceSessionsTable.id))
      .where(
        and(
          eq(attendanceSessionsTable.offeringId, offeringId as any),
          eq(attendanceRecordsTable.studentId, studentId as any)
        )
      )
      .orderBy(desc(attendanceSessionsTable.sessionDate));

    // Audit corrections for this student
    const auditLogs = await db
      .select({
        id: attendanceAuditLogsTable.id,
        recordId: attendanceAuditLogsTable.recordId,
        sessionId: attendanceAuditLogsTable.sessionId,
        previousStatus: attendanceAuditLogsTable.previousStatus,
        newStatus: attendanceAuditLogsTable.newStatus,
        reason: attendanceAuditLogsTable.reason,
        performedBy: usersTable.fullName,
        createdAt: attendanceAuditLogsTable.createdAt,
      })
      .from(attendanceAuditLogsTable)
      .innerJoin(usersTable, eq(attendanceAuditLogsTable.performedBy, usersTable.id))
      .where(
        and(
          eq(attendanceAuditLogsTable.studentId, studentId as any),
          inArray(attendanceAuditLogsTable.sessionId, records.map((r) => r.sessionId) as any)
        )
      )
      .orderBy(desc(attendanceAuditLogsTable.createdAt));

    return {
      student,
      records,
      auditLogs,
    };
  },

  /**
   * Student self-service: View own attendance records for an enrolled offering.
   */
  getStudentSelfAttendance: async (
    studentId: string,
    offeringId: string
  ) => {
    // 1. Verify student is enrolled in this offering
    const [enrollment] = await db
      .select({ id: studentEnrollmentsTable.id })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, studentId as any),
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      );

    if (!enrollment) {
      throw new Error('Forbidden. You are not actively enrolled in this course offering.');
    }

    // 2. Fetch offering info
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        level: courseOfferingsTable.level,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    // 3. Fetch all active sessions for this offering
    const sessions = await db
      .select({
        id: attendanceSessionsTable.id,
        title: attendanceSessionsTable.title,
        sessionType: attendanceSessionsTable.sessionType,
        sessionDate: attendanceSessionsTable.sessionDate,
        startTime: attendanceSessionsTable.startTime,
        endTime: attendanceSessionsTable.endTime,
        status: attendanceSessionsTable.status,
      })
      .from(attendanceSessionsTable)
      .where(
        and(
          eq(attendanceSessionsTable.offeringId, offeringId as any),
          sql`${attendanceSessionsTable.status} != ${ATTENDANCE_SESSION_STATUSES.CANCELLED}`
        )
      )
      .orderBy(desc(attendanceSessionsTable.sessionDate));

    // 4. Fetch student's attendance records
    const records = await db
      .select({
        sessionId: attendanceRecordsTable.sessionId,
        status: attendanceRecordsTable.status,
        remarks: attendanceRecordsTable.remarks,
        markedAt: attendanceRecordsTable.markedAt,
      })
      .from(attendanceRecordsTable)
      .where(
        and(
          eq(attendanceRecordsTable.studentId, studentId as any),
          inArray(attendanceRecordsTable.sessionId, sessions.map((s) => s.id) as any)
        )
      );

    const recordsMap = new Map<string, typeof records[0]>();
    for (const r of records) {
      recordsMap.set(r.sessionId, r);
    }

    const sessionHistory = sessions.map((s) => {
      const record = recordsMap.get(s.id);
      const isExpired = isSessionTimeExpired(s.sessionDate, s.endTime);
      const effectiveSessionStatus =
        s.status === ATTENDANCE_SESSION_STATUSES.OPEN && isExpired
          ? ATTENDANCE_SESSION_STATUSES.CLOSED
          : s.status;

      const isSessionOpen = effectiveSessionStatus === ATTENDANCE_SESSION_STATUSES.OPEN;

      let computedStatus: string;
      let computedRemarks: string | null = null;

      if (record) {
        computedStatus = record.status;
        computedRemarks = record.remarks;
      } else if (isSessionOpen) {
        // While session is active/open, student is pending check-in, NOT absent!
        computedStatus = 'PENDING';
        computedRemarks = 'Roll-call session is currently open. Mark your attendance now.';
      } else {
        // Only if session has closed/expired and student never checked in, they are absent
        computedStatus = ATTENDANCE_RECORD_STATUSES.ABSENT;
        computedRemarks = 'Did not check in within stipulated time (ABSENT)';
      }

      return {
        sessionId: s.id,
        title: s.title,
        sessionType: s.sessionType,
        sessionDate: s.sessionDate,
        startTime: s.startTime,
        endTime: s.endTime,
        sessionStatus: effectiveSessionStatus,
        status: computedStatus,
        remarks: computedRemarks,
        markedAt: record?.markedAt || null,
      };
    });

    const totalSessions = sessions.length;
    const closedOrRecordedSessions = sessionHistory.filter((s) => s.status !== 'PENDING');
    const presentCount = sessionHistory.filter((s) => s.status === ATTENDANCE_RECORD_STATUSES.PRESENT).length;
    const lateCount = sessionHistory.filter((s) => s.status === ATTENDANCE_RECORD_STATUSES.LATE).length;
    const excusedCount = sessionHistory.filter((s) => s.status === ATTENDANCE_RECORD_STATUSES.EXCUSED).length;
    const absentCount = sessionHistory.filter((s) => s.status === ATTENDANCE_RECORD_STATUSES.ABSENT).length;
    const pendingCount = sessionHistory.filter((s) => s.status === 'PENDING').length;
    const attendedCount = presentCount + lateCount;
    const applicableSessionsCount = closedOrRecordedSessions.length;
    const attendancePercentage =
      applicableSessionsCount > 0
        ? Math.round((attendedCount / applicableSessionsCount) * 100 * 10) / 10
        : (totalSessions > 0 ? 100 : 0);

    return {
      offering,
      summary: {
        totalSessions,
        attendedCount,
        presentCount,
        lateCount,
        excusedCount,
        absentCount,
        pendingCount,
        attendancePercentage,
      },
      history: sessionHistory,
    };
  },

  /**
   * Enrolled student marks their own attendance for an OPEN session.
   */
  studentSelfMarkAttendance: async (
    studentId: string,
    offeringId: string,
    sessionId: string
  ) => {
    // 1. Verify student is actively enrolled in offering
    const [enrollment] = await db
      .select({ id: studentEnrollmentsTable.id })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, studentId as any),
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      );

    if (!enrollment) {
      throw new Error('Forbidden. You are not actively enrolled in this course offering.');
    }

    // 2. Verify attendance session exists, belongs to offering, and is OPEN
    const [session] = await db
      .select()
      .from(attendanceSessionsTable)
      .where(
        and(
          eq(attendanceSessionsTable.id, sessionId as any),
          eq(attendanceSessionsTable.offeringId, offeringId as any)
        )
      );

    if (!session) {
      throw new Error('Attendance session not found for this course offering.');
    }

    if (session.status !== ATTENDANCE_SESSION_STATUSES.OPEN) {
      throw new Error(
        `Attendance session is ${session.status.toLowerCase()}. You can only mark attendance while the session is OPEN.`
      );
    }

    // Verify if stipulated endTime defined by lecturer has passed
    if (session.endTime && isSessionTimeExpired(session.sessionDate, session.endTime)) {
      // Auto-close expired session in background
      await db
        .update(attendanceSessionsTable)
        .set({ status: ATTENDANCE_SESSION_STATUSES.CLOSED, updatedAt: new Date() })
        .where(eq(attendanceSessionsTable.id, sessionId as any));

      // Record this student as ABSENT
      await db
        .insert(attendanceRecordsTable)
        .values({
          sessionId: sessionId as any,
          studentId: studentId as any,
          status: ATTENDANCE_RECORD_STATUSES.ABSENT,
          markedBy: studentId as any,
          markedAt: new Date(),
          remarks: `Late check-in attempt after stipulated end time (${session.endTime}) — Marked ABSENT`,
        })
        .onConflictDoNothing();

      throw new Error(
        `Attendance check-in deadline has passed. The stipulated time ended at ${session.endTime}. You are recorded as ABSENT.`
      );
    }

    // 3. Find or create attendance record
    const [existingRecord] = await db
      .select()
      .from(attendanceRecordsTable)
      .where(
        and(
          eq(attendanceRecordsTable.sessionId, sessionId as any),
          eq(attendanceRecordsTable.studentId, studentId as any)
        )
      );

    let record;
    if (existingRecord) {
      if (existingRecord.status === ATTENDANCE_RECORD_STATUSES.PRESENT) {
        return {
          record: existingRecord,
          alreadyMarked: true,
          message: 'Attendance already marked as Present.',
        };
      }

      [record] = await db
        .update(attendanceRecordsTable)
        .set({
          status: ATTENDANCE_RECORD_STATUSES.PRESENT,
          markedBy: studentId as any,
          markedAt: new Date(),
          remarks: 'Self-marked attendance via student mobile app',
          updatedAt: new Date(),
        })
        .where(eq(attendanceRecordsTable.id, existingRecord.id))
        .returning();
    } else {
      [record] = await db
        .insert(attendanceRecordsTable)
        .values({
          sessionId: sessionId as any,
          studentId: studentId as any,
          status: ATTENDANCE_RECORD_STATUSES.PRESENT,
          markedBy: studentId as any,
          markedAt: new Date(),
          remarks: 'Self-marked attendance via student mobile app',
        })
        .returning();
    }

    logger.info(
      `[ATTENDANCE_SELF_MARK] Student ${studentId} marked attendance PRESENT for session ${sessionId} in offering ${offeringId}`
    );

    return {
      record,
      alreadyMarked: false,
      message: 'Attendance successfully marked as Present!',
    };
  },
};
