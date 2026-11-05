import { db } from '../db/index.js';
import {
  courseAnnouncementsTable,
  courseOfferingsTable,
  coursesTable,
  studentEnrollmentsTable,
  usersTable,
  ANNOUNCEMENT_STATUSES,
  ANNOUNCEMENT_PRIORITIES,
  type AnnouncementStatus,
  type AnnouncementPriority,
} from '../db/schema.js';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import { assessmentService } from './assessmentService.js';
import { notificationService } from './notificationService.js';
import type {
  CreateAnnouncementInput,
  UpdateAnnouncementInput,
} from '../schemas/announcement.schemas.js';
import logger from '../config/logger.js';

export const announcementService = {
  /**
   * Helper: Dispatch notifications to all actively enrolled students of a course offering.
   */
  notifyEnrolledStudents: async (
    offeringId: string,
    announcement: {
      id: string;
      title: string;
      content: string;
      priority: string;
    }
  ) => {
    try {
      // 1. Fetch course details
      const [offering] = await db
        .select({
          id: courseOfferingsTable.id,
          code: coursesTable.code,
          title: coursesTable.title,
        })
        .from(courseOfferingsTable)
        .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
        .where(eq(courseOfferingsTable.id, offeringId as any));

      const courseCode = offering?.code || 'COURSE';

      // 2. Query all actively enrolled students
      const enrollments = await db
        .select({
          studentId: studentEnrollmentsTable.studentId,
        })
        .from(studentEnrollmentsTable)
        .where(
          and(
            eq(studentEnrollmentsTable.offeringId, offeringId as any),
            eq(studentEnrollmentsTable.status, 'ENROLLED')
          )
        );

      if (!enrollments.length) {
        return;
      }

      const priorityPrefix =
        announcement.priority === ANNOUNCEMENT_PRIORITIES.URGENT
          ? '🚨 [URGENT] '
          : announcement.priority === ANNOUNCEMENT_PRIORITIES.IMPORTANT
          ? '⚠️ [IMPORTANT] '
          : '';

      const notifTitle = `${priorityPrefix}${courseCode}: ${announcement.title}`;
      const notifBody =
        announcement.content.length > 140
          ? `${announcement.content.slice(0, 137)}...`
          : announcement.content;

      // Dispatch notifications in parallel with settled promise
      const promises = enrollments.map((enr) =>
        notificationService.createNotification({
          userId: enr.studentId,
          type: 'COURSE_ANNOUNCEMENT',
          title: notifTitle,
          body: notifBody,
          data: {
            offeringId,
            announcementId: announcement.id,
            priority: announcement.priority,
            courseCode,
          },
        })
      );

      await Promise.allSettled(promises);
      logger.info(
        `[ANNOUNCEMENT] Dispatched notifications to ${enrollments.length} enrolled students for announcement ${announcement.id}`
      );
    } catch (err: any) {
      logger.error(`[ANNOUNCEMENT] Failed to dispatch notifications: ${err.message}`);
    }
  },

  /**
   * Create an announcement for an offering as an authorized lecturer.
   */
  createAnnouncement: async (
    lecturerId: string,
    offeringId: string,
    input: CreateAnnouncementInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const isPublished = input.status === ANNOUNCEMENT_STATUSES.PUBLISHED;

    const [announcement] = await db
      .insert(courseAnnouncementsTable)
      .values({
        offeringId: offeringId as any,
        lecturerId: lecturerId as any,
        title: input.title,
        content: input.content,
        priority: input.priority || ANNOUNCEMENT_PRIORITIES.NORMAL,
        status: input.status || ANNOUNCEMENT_STATUSES.PUBLISHED,
        attachmentUrl: input.attachmentUrl || null,
        attachmentName: input.attachmentName || null,
        publishedAt: isPublished ? new Date() : null,
      })
      .returning();

    if (!announcement) {
      throw new Error('Failed to create course announcement.');
    }

    logger.info(
      `[ANNOUNCEMENT] Created announcement ${announcement.id} (${announcement.title}) status: ${announcement.status} by lecturer ${lecturerId}`
    );

    // If published immediately, notify students
    if (isPublished) {
      await announcementService
        .notifyEnrolledStudents(offeringId, {
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          priority: announcement.priority,
        })
        .catch((e) => logger.error(`[ANNOUNCEMENT] Notification dispatch error: ${e.message}`));
    }

    return announcement;
  },

  /**
   * List announcements for a lecturer with overview metrics.
   */
  listOfferingAnnouncementsForLecturer: async (
    lecturerId: string,
    offeringId: string,
    options: { status?: string | undefined; priority?: string | undefined } = {}
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    // 1. Fetch offering details
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // 2. Build conditions
    const conditions = [eq(courseAnnouncementsTable.offeringId, offeringId as any)];
    if (options.status) {
      conditions.push(eq(courseAnnouncementsTable.status, options.status as any));
    }
    if (options.priority) {
      conditions.push(eq(courseAnnouncementsTable.priority, options.priority as any));
    }

    const announcements = await db
      .select({
        id: courseAnnouncementsTable.id,
        offeringId: courseAnnouncementsTable.offeringId,
        lecturerId: courseAnnouncementsTable.lecturerId,
        title: courseAnnouncementsTable.title,
        content: courseAnnouncementsTable.content,
        priority: courseAnnouncementsTable.priority,
        status: courseAnnouncementsTable.status,
        attachmentUrl: courseAnnouncementsTable.attachmentUrl,
        attachmentName: courseAnnouncementsTable.attachmentName,
        publishedAt: courseAnnouncementsTable.publishedAt,
        createdAt: courseAnnouncementsTable.createdAt,
        updatedAt: courseAnnouncementsTable.updatedAt,
        author: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          avatarUrl: usersTable.photoURL,
        },
      })
      .from(courseAnnouncementsTable)
      .innerJoin(usersTable, eq(courseAnnouncementsTable.lecturerId, usersTable.id))
      .where(and(...conditions))
      .orderBy(desc(courseAnnouncementsTable.createdAt));

    // 3. Compute metrics across all offering announcements
    const allOfferingAnnouncements = await db
      .select({
        id: courseAnnouncementsTable.id,
        status: courseAnnouncementsTable.status,
        priority: courseAnnouncementsTable.priority,
      })
      .from(courseAnnouncementsTable)
      .where(eq(courseAnnouncementsTable.offeringId, offeringId as any));

    const metrics = {
      total: allOfferingAnnouncements.length,
      published: allOfferingAnnouncements.filter((a) => a.status === ANNOUNCEMENT_STATUSES.PUBLISHED).length,
      draft: allOfferingAnnouncements.filter((a) => a.status === ANNOUNCEMENT_STATUSES.DRAFT).length,
      archived: allOfferingAnnouncements.filter((a) => a.status === ANNOUNCEMENT_STATUSES.ARCHIVED).length,
      urgent: allOfferingAnnouncements.filter(
        (a) => a.priority === ANNOUNCEMENT_PRIORITIES.URGENT || a.priority === ANNOUNCEMENT_PRIORITIES.IMPORTANT
      ).length,
    };

    return {
      offering,
      announcements,
      metrics,
    };
  },

  /**
   * Update an existing announcement.
   */
  updateAnnouncement: async (
    lecturerId: string,
    offeringId: string,
    announcementId: string,
    input: UpdateAnnouncementInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [existing] = await db
      .select()
      .from(courseAnnouncementsTable)
      .where(
        and(
          eq(courseAnnouncementsTable.id, announcementId as any),
          eq(courseAnnouncementsTable.offeringId, offeringId as any)
        )
      );

    if (!existing) {
      throw new Error('Announcement not found for this offering.');
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) updatePayload.title = input.title;
    if (input.content !== undefined) updatePayload.content = input.content;
    if (input.priority !== undefined) updatePayload.priority = input.priority;
    if (input.attachmentUrl !== undefined) updatePayload.attachmentUrl = input.attachmentUrl;
    if (input.attachmentName !== undefined) updatePayload.attachmentName = input.attachmentName;

    let willPublish = false;
    if (input.status !== undefined) {
      updatePayload.status = input.status;
      if (input.status === ANNOUNCEMENT_STATUSES.PUBLISHED && existing.status !== ANNOUNCEMENT_STATUSES.PUBLISHED) {
        updatePayload.publishedAt = new Date();
        willPublish = true;
      }
    }

    const [updated] = await db
      .update(courseAnnouncementsTable)
      .set(updatePayload)
      .where(eq(courseAnnouncementsTable.id, announcementId as any))
      .returning();

    if (!updated) {
      throw new Error('Failed to update course announcement.');
    }

    logger.info(
      `[ANNOUNCEMENT] Updated announcement ${announcementId} for offering ${offeringId} by lecturer ${lecturerId}`
    );

    if (willPublish) {
      await announcementService
        .notifyEnrolledStudents(offeringId, {
          id: updated.id,
          title: updated.title,
          content: updated.content,
          priority: updated.priority,
        })
        .catch((e) => logger.error(`[ANNOUNCEMENT] Notification dispatch error: ${e.message}`));
    }

    return updated;
  },

  /**
   * Delete an announcement.
   */
  deleteAnnouncement: async (
    lecturerId: string,
    offeringId: string,
    announcementId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [existing] = await db
      .select()
      .from(courseAnnouncementsTable)
      .where(
        and(
          eq(courseAnnouncementsTable.id, announcementId as any),
          eq(courseAnnouncementsTable.offeringId, offeringId as any)
        )
      );

    if (!existing) {
      throw new Error('Announcement not found for this offering.');
    }

    await db
      .delete(courseAnnouncementsTable)
      .where(eq(courseAnnouncementsTable.id, announcementId as any));

    logger.info(
      `[ANNOUNCEMENT] Deleted announcement ${announcementId} from offering ${offeringId} by lecturer ${lecturerId}`
    );

    return { id: announcementId, deleted: true };
  },

  /**
   * Student: List published announcements for an enrolled course offering.
   */
  listOfferingAnnouncementsForStudent: async (
    studentId: string,
    offeringId: string
  ) => {
    // 1. Verify student enrollment
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

    // 2. Fetch offering details
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        code: coursesTable.code,
        title: coursesTable.title,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    // 3. Fetch PUBLISHED announcements only
    const announcements = await db
      .select({
        id: courseAnnouncementsTable.id,
        offeringId: courseAnnouncementsTable.offeringId,
        title: courseAnnouncementsTable.title,
        content: courseAnnouncementsTable.content,
        priority: courseAnnouncementsTable.priority,
        attachmentUrl: courseAnnouncementsTable.attachmentUrl,
        attachmentName: courseAnnouncementsTable.attachmentName,
        publishedAt: courseAnnouncementsTable.publishedAt,
        author: {
          fullName: usersTable.fullName,
          avatarUrl: usersTable.photoURL,
        },
      })
      .from(courseAnnouncementsTable)
      .innerJoin(usersTable, eq(courseAnnouncementsTable.lecturerId, usersTable.id))
      .where(
        and(
          eq(courseAnnouncementsTable.offeringId, offeringId as any),
          eq(courseAnnouncementsTable.status, ANNOUNCEMENT_STATUSES.PUBLISHED)
        )
      )
      .orderBy(desc(courseAnnouncementsTable.publishedAt));

    return {
      offering,
      announcements,
    };
  },
};
