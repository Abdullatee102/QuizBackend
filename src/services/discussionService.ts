import { db } from '../db/index.js';
import {
  courseDiscussionsTable,
  courseDiscussionRepliesTable,
  courseOfferingsTable,
  coursesTable,
  studentEnrollmentsTable,
  usersTable,
  courseAnnouncementsTable,
} from '../db/schema.js';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import { assessmentService } from './assessmentService.js';
import type {
  CreateDiscussionInput,
  ReplyDiscussionInput,
  ModerateDiscussionInput,
} from '../schemas/discussion.schemas.js';
import logger from '../config/logger.js';

export const discussionService = {
  /**
   * Helper: Check if user has read/participate access to this course offering.
   */
  verifyAccess: async (userId: string, userRole: string, offeringId: string) => {
    if (userRole === 'ADMIN') {
      return true;
    }

    if (userRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(userId, offeringId);
      return true;
    }

    // STUDENT
    const [enrollment] = await db
      .select({ id: studentEnrollmentsTable.id })
      .from(studentEnrollmentsTable)
      .where(
        and(
          eq(studentEnrollmentsTable.studentId, userId as any),
          eq(studentEnrollmentsTable.offeringId, offeringId as any),
          eq(studentEnrollmentsTable.status, 'ENROLLED')
        )
      );

    if (!enrollment) {
      throw new Error('Forbidden. You are not actively enrolled in this course offering.');
    }

    return true;
  },

  /**
   * List discussions for an offering.
   */
  listDiscussions: async (userId: string, userRole: string, offeringId: string) => {
    await discussionService.verifyAccess(userId, userRole, offeringId);

    // 1. Fetch offering summary
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

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // 2. Fetch discussions
    const discussions = await db
      .select({
        id: courseDiscussionsTable.id,
        offeringId: courseDiscussionsTable.offeringId,
        announcementId: courseDiscussionsTable.announcementId,
        title: courseDiscussionsTable.title,
        content: courseDiscussionsTable.content,
        authorRole: courseDiscussionsTable.authorRole,
        isPinned: courseDiscussionsTable.isPinned,
        isLocked: courseDiscussionsTable.isLocked,
        replyCount: courseDiscussionsTable.replyCount,
        lastActivityAt: courseDiscussionsTable.lastActivityAt,
        createdAt: courseDiscussionsTable.createdAt,
        updatedAt: courseDiscussionsTable.updatedAt,
        author: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          email: usersTable.email,
          avatarUrl: usersTable.photoURL,
          role: usersTable.role,
        },
      })
      .from(courseDiscussionsTable)
      .innerJoin(usersTable, eq(courseDiscussionsTable.authorId, usersTable.id))
      .where(eq(courseDiscussionsTable.offeringId, offeringId as any))
      .orderBy(desc(courseDiscussionsTable.isPinned), desc(courseDiscussionsTable.lastActivityAt));

    return {
      offering,
      discussions,
    };
  },

  /**
   * Create a new discussion thread.
   */
  createDiscussion: async (
    userId: string,
    userRole: string,
    offeringId: string,
    input: CreateDiscussionInput
  ) => {
    await discussionService.verifyAccess(userId, userRole, offeringId);

    // Optional verification of announcement if attached
    if (input.announcementId) {
      const [announcement] = await db
        .select({ id: courseAnnouncementsTable.id })
        .from(courseAnnouncementsTable)
        .where(
          and(
            eq(courseAnnouncementsTable.id, input.announcementId as any),
            eq(courseAnnouncementsTable.offeringId, offeringId as any)
          )
        );
      if (!announcement) {
        throw new Error('Attached announcement does not exist in this course offering.');
      }
    }

    const [discussion] = await db
      .insert(courseDiscussionsTable)
      .values({
        offeringId: offeringId as any,
        authorId: userId as any,
        authorRole: userRole,
        announcementId: (input.announcementId as any) || null,
        title: input.title,
        content: input.content,
        isPinned: false,
        isLocked: false,
        replyCount: 0,
        lastActivityAt: new Date(),
      })
      .returning();

    if (!discussion) {
      throw new Error('Failed to create discussion thread.');
    }

    logger.info(
      `[DISCUSSION] Created thread ${discussion.id} ("${discussion.title}") by user ${userId} (${userRole}) in offering ${offeringId}`
    );

    return discussion;
  },

  /**
   * Get thread details with all replies.
   */
  getDiscussionDetails: async (
    userId: string,
    userRole: string,
    offeringId: string,
    discussionId: string
  ) => {
    await discussionService.verifyAccess(userId, userRole, offeringId);

    const [discussion] = await db
      .select({
        id: courseDiscussionsTable.id,
        offeringId: courseDiscussionsTable.offeringId,
        announcementId: courseDiscussionsTable.announcementId,
        title: courseDiscussionsTable.title,
        content: courseDiscussionsTable.content,
        authorRole: courseDiscussionsTable.authorRole,
        isPinned: courseDiscussionsTable.isPinned,
        isLocked: courseDiscussionsTable.isLocked,
        replyCount: courseDiscussionsTable.replyCount,
        lastActivityAt: courseDiscussionsTable.lastActivityAt,
        createdAt: courseDiscussionsTable.createdAt,
        updatedAt: courseDiscussionsTable.updatedAt,
        author: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          avatarUrl: usersTable.photoURL,
          role: usersTable.role,
        },
      })
      .from(courseDiscussionsTable)
      .innerJoin(usersTable, eq(courseDiscussionsTable.authorId, usersTable.id))
      .where(
        and(
          eq(courseDiscussionsTable.id, discussionId as any),
          eq(courseDiscussionsTable.offeringId, offeringId as any)
        )
      );

    if (!discussion) {
      throw new Error('Discussion thread not found in this course offering.');
    }

    // Fetch replies
    const replies = await db
      .select({
        id: courseDiscussionRepliesTable.id,
        discussionId: courseDiscussionRepliesTable.discussionId,
        authorRole: courseDiscussionRepliesTable.authorRole,
        content: courseDiscussionRepliesTable.content,
        createdAt: courseDiscussionRepliesTable.createdAt,
        updatedAt: courseDiscussionRepliesTable.updatedAt,
        author: {
          id: usersTable.id,
          fullName: usersTable.fullName,
          avatarUrl: usersTable.photoURL,
          role: usersTable.role,
        },
      })
      .from(courseDiscussionRepliesTable)
      .innerJoin(usersTable, eq(courseDiscussionRepliesTable.authorId, usersTable.id))
      .where(eq(courseDiscussionRepliesTable.discussionId, discussionId as any))
      .orderBy(asc(courseDiscussionRepliesTable.createdAt));

    return {
      discussion,
      replies,
    };
  },

  /**
   * Post a reply to a discussion thread.
   */
  replyToDiscussion: async (
    userId: string,
    userRole: string,
    offeringId: string,
    discussionId: string,
    input: ReplyDiscussionInput
  ) => {
    await discussionService.verifyAccess(userId, userRole, offeringId);

    const [discussion] = await db
      .select()
      .from(courseDiscussionsTable)
      .where(
        and(
          eq(courseDiscussionsTable.id, discussionId as any),
          eq(courseDiscussionsTable.offeringId, offeringId as any)
        )
      );

    if (!discussion) {
      throw new Error('Discussion thread not found.');
    }

    if (discussion.isLocked) {
      throw new Error('This discussion thread has been locked by the lecturer. Replies are disabled.');
    }

    // Insert reply
    const [reply] = await db
      .insert(courseDiscussionRepliesTable)
      .values({
        discussionId: discussionId as any,
        authorId: userId as any,
        authorRole: userRole,
        content: input.content,
      })
      .returning();

    if (!reply) {
      throw new Error('Failed to create reply.');
    }

    // Increment reply count and bump lastActivityAt
    await db
      .update(courseDiscussionsTable)
      .set({
        replyCount: sql`${courseDiscussionsTable.replyCount} + 1`,
        lastActivityAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(courseDiscussionsTable.id, discussionId as any));

    // Fetch author info to return complete reply item
    const [author] = await db
      .select({
        id: usersTable.id,
        fullName: usersTable.fullName,
        avatarUrl: usersTable.photoURL,
        role: usersTable.role,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId as any));

    logger.info(
      `[DISCUSSION] Reply ${reply.id} added to thread ${discussionId} by user ${userId} (${userRole})`
    );

    return {
      ...reply,
      author,
    };
  },

  /**
   * Lecturer moderation: pin or lock a discussion thread.
   */
  moderateDiscussion: async (
    lecturerId: string,
    offeringId: string,
    discussionId: string,
    input: ModerateDiscussionInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [discussion] = await db
      .select()
      .from(courseDiscussionsTable)
      .where(
        and(
          eq(courseDiscussionsTable.id, discussionId as any),
          eq(courseDiscussionsTable.offeringId, offeringId as any)
        )
      );

    if (!discussion) {
      throw new Error('Discussion thread not found.');
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.isPinned !== undefined) updatePayload.isPinned = input.isPinned;
    if (input.isLocked !== undefined) updatePayload.isLocked = input.isLocked;

    const [updated] = await db
      .update(courseDiscussionsTable)
      .set(updatePayload)
      .where(eq(courseDiscussionsTable.id, discussionId as any))
      .returning();

    if (!updated) {
      throw new Error('Failed to moderate discussion thread.');
    }

    logger.info(
      `[DISCUSSION] Moderated thread ${discussionId} (pinned: ${updated.isPinned}, locked: ${updated.isLocked}) by lecturer ${lecturerId}`
    );

    return updated;
  },

  /**
   * Delete a discussion thread.
   */
  deleteDiscussion: async (
    userId: string,
    userRole: string,
    offeringId: string,
    discussionId: string
  ) => {
    const [discussion] = await db
      .select()
      .from(courseDiscussionsTable)
      .where(
        and(
          eq(courseDiscussionsTable.id, discussionId as any),
          eq(courseDiscussionsTable.offeringId, offeringId as any)
        )
      );

    if (!discussion) {
      throw new Error('Discussion thread not found.');
    }

    if (userRole === 'ADMIN') {
      // Allowed
    } else if (userRole === 'LECTURER') {
      await assessmentService.verifyLecturerAssignment(userId, offeringId);
    } else if (discussion.authorId !== userId) {
      throw new Error('Forbidden. You can only delete your own discussion thread.');
    }

    await db
      .delete(courseDiscussionsTable)
      .where(eq(courseDiscussionsTable.id, discussionId as any));

    logger.info(
      `[DISCUSSION] Deleted thread ${discussionId} from offering ${offeringId} by user ${userId}`
    );

    return { id: discussionId, deleted: true };
  },
};
