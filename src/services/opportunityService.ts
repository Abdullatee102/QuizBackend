import { db } from '../db/index.js';
import {
  opportunitiesTable,
  opportunitySubscriptionsTable,
  opportunityBookmarksTable,
  usersTable,
  facultiesTable,
  departmentsTable,
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_STATUS,
  OPPORTUNITY_VERIFICATION_STATUS,
  type Opportunity,
  type OpportunityCategory,
  type OpportunityStatus,
  type OpportunityVerificationStatus,
} from '../db/schema.js';
import { eq, and, or, desc, asc, sql, inArray, ilike } from 'drizzle-orm';
import { notificationService } from './notificationService.js';
import { auditService } from './admin/auditService.js';
import logger from '../config/logger.js';
import type {
  CreateOpportunityInput,
  UpdateOpportunityInput,
} from '../schemas/opportunity.schemas.js';

export interface StudentOpportunityFilters {
  category?: string | undefined;
  search?: string | undefined;
  filter?: 'all' | 'featured' | 'active' | 'closing_soon' | 'bookmarked' | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

export interface AdminOpportunityFilters {
  category?: string | undefined;
  status?: string | undefined;
  verificationStatus?: string | undefined;
  search?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}

/**
 * Generate a URL-safe lowercase slug from a string.
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export const opportunityService = {
  /**
   * Resolve academic audience filters into standardized IDs.
   * Supports human-readable codes (e.g. FBMS, ANA) in addition to UUIDs.
   */
  resolveAcademicAudience: async (targetAudience: any) => {
    if (!targetAudience || targetAudience.isAll) {
      return { isAll: true, facultyIds: [], departmentIds: [], levels: [] };
    }

    const facultyIds = new Set<string>(targetAudience.facultyIds || []);
    const departmentIds = new Set<string>(targetAudience.departmentIds || []);
    const levels = Array.isArray(targetAudience.levels)
      ? targetAudience.levels.map(Number).filter((l: number) => !isNaN(l))
      : [];

    if (Array.isArray(targetAudience.facultyCodes) && targetAudience.facultyCodes.length > 0) {
      const faculties = await db
        .select({ id: facultiesTable.id })
        .from(facultiesTable)
        .where(inArray(facultiesTable.code, targetAudience.facultyCodes));
      for (const f of faculties) facultyIds.add(f.id);
    }

    if (Array.isArray(targetAudience.departmentCodes) && targetAudience.departmentCodes.length > 0) {
      const depts = await db
        .select({ id: departmentsTable.id })
        .from(departmentsTable)
        .where(inArray(departmentsTable.code, targetAudience.departmentCodes));
      for (const d of depts) departmentIds.add(d.id);
    }

    return {
      isAll: facultyIds.size === 0 && departmentIds.size === 0 && levels.length === 0,
      facultyIds: Array.from(facultyIds),
      departmentIds: Array.from(departmentIds),
      levels,
    };
  },

  /**
   * Helper to ensure slug uniqueness by appending suffix if needed.
   */
  generateUniqueSlug: async (baseTitle: string, explicitSlug?: string): Promise<string> => {
    let slug = explicitSlug ? slugify(explicitSlug) : slugify(baseTitle);
    if (!slug) slug = `opp-${Date.now()}`;

    let candidate = slug;
    let counter = 1;
    while (true) {
      const existing = await db
        .select({ id: opportunitiesTable.id })
        .from(opportunitiesTable)
        .where(eq(opportunitiesTable.slug, candidate))
        .limit(1);

      if (existing.length === 0) return candidate;
      candidate = `${slug}-${counter}`;
      counter++;
    }
  },

  // =====================================================
  // STUDENT QUERIES & INTERACTIONS
  // =====================================================

  /**
   * List opportunities for student with academic targeting and bookmark indicators.
   */
  listOpportunitiesForStudent: async (studentId: string, filters: StudentOpportunityFilters = {}) => {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(filters.limit) || 20));
    const offset = (page - 1) * limit;

    // Retrieve student academic profile for audience matching
    const [student] = await db
      .select({
        id: usersTable.id,
        facultyId: usersTable.facultyId,
        departmentId: usersTable.departmentId,
        level: usersTable.level,
      })
      .from(usersTable)
      .where(eq(usersTable.id, studentId))
      .limit(1);

    const conditions = [
      eq(opportunitiesTable.status, OPPORTUNITY_STATUS.PUBLISHED),
    ];

    if (filters.category && Object.values(OPPORTUNITY_CATEGORIES).includes(filters.category as any)) {
      conditions.push(eq(opportunitiesTable.category, filters.category));
    }

    if (filters.search && filters.search.trim()) {
      const term = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(opportunitiesTable.title, term),
          ilike(opportunitiesTable.organization, term),
          ilike(opportunitiesTable.shortDescription, term)
        )!
      );
    }

    if (filters.filter === 'featured') {
      conditions.push(eq(opportunitiesTable.isFeatured, true));
    } else if (filters.filter === 'closing_soon') {
      const now = new Date();
      const inSevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      conditions.push(
        and(
          sql`${opportunitiesTable.deadline} IS NOT NULL`,
          sql`${opportunitiesTable.deadline} >= ${now}`,
          sql`${opportunitiesTable.deadline} <= ${inSevenDays}`
        )!
      );
    } else if (filters.filter === 'bookmarked') {
      // Subquery for bookmarked items
      const bookmarksSubquery = db
        .select({ oppId: opportunityBookmarksTable.opportunityId })
        .from(opportunityBookmarksTable)
        .where(eq(opportunityBookmarksTable.userId, studentId));

      conditions.push(inArray(opportunitiesTable.id, bookmarksSubquery));
    }

    // Fetch matching opportunities
    const rawOpportunities = await db
      .select()
      .from(opportunitiesTable)
      .where(and(...conditions))
      .orderBy(
        desc(opportunitiesTable.isFeatured),
        desc(opportunitiesTable.publishedAt),
        desc(opportunitiesTable.createdAt)
      );

    // Fetch bookmarks for this student
    const studentBookmarks = await db
      .select({ opportunityId: opportunityBookmarksTable.opportunityId })
      .from(opportunityBookmarksTable)
      .where(eq(opportunityBookmarksTable.userId, studentId));
    const bookmarkedSet = new Set(studentBookmarks.map((b) => b.opportunityId));

    // Audience filtering in memory or dynamic SQL
    const eligible = rawOpportunities.filter((opp) => {
      const audience = opp.targetAudience as any;
      if (!audience || audience.isAll) return true;
      if (!student) return true; // fallback if student profile is empty

      const matchFaculty =
        Array.isArray(audience.facultyIds) &&
        audience.facultyIds.length > 0 &&
        student.facultyId &&
        audience.facultyIds.includes(student.facultyId);

      const matchDepartment =
        Array.isArray(audience.departmentIds) &&
        audience.departmentIds.length > 0 &&
        student.departmentId &&
        audience.departmentIds.includes(student.departmentId);

      const matchLevel =
        Array.isArray(audience.levels) &&
        audience.levels.length > 0 &&
        student.level &&
        audience.levels.includes(student.level);

      // If specific audience parameters were defined, at least one dimension must match
      const hasRestrictions =
        (audience.facultyIds && audience.facultyIds.length > 0) ||
        (audience.departmentIds && audience.departmentIds.length > 0) ||
        (audience.levels && audience.levels.length > 0);

      if (!hasRestrictions) return true;
      return matchFaculty || matchDepartment || matchLevel;
    });

    const total = eligible.length;
    const paginated = eligible.slice(offset, offset + limit).map((opp) => {
      let daysRemaining: number | null = null;
      if (opp.deadline) {
        const diffMs = new Date(opp.deadline).getTime() - Date.now();
        daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
      }
      return {
        ...opp,
        isBookmarked: bookmarkedSet.has(opp.id),
        daysRemaining,
      };
    });

    return {
      opportunities: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Get student detail view for an opportunity.
   */
  getOpportunityForStudent: async (opportunityId: string, studentId: string) => {
    const [opp] = await db
      .select()
      .from(opportunitiesTable)
      .where(
        and(
          eq(opportunitiesTable.id, opportunityId),
          eq(opportunitiesTable.status, OPPORTUNITY_STATUS.PUBLISHED)
        )
      )
      .limit(1);

    if (!opp) return null;

    const [bookmark] = await db
      .select({ id: opportunityBookmarksTable.id })
      .from(opportunityBookmarksTable)
      .where(
        and(
          eq(opportunityBookmarksTable.userId, studentId),
          eq(opportunityBookmarksTable.opportunityId, opportunityId)
        )
      )
      .limit(1);

    let daysRemaining: number | null = null;
    if (opp.deadline) {
      const diffMs = new Date(opp.deadline).getTime() - Date.now();
      daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    }

    return {
      ...opp,
      isBookmarked: !!bookmark,
      daysRemaining,
    };
  },

  /**
   * Track outbound clicks atomically.
   */
  trackClick: async (opportunityId: string) => {
    const [updated] = await db
      .update(opportunitiesTable)
      .set({
        clicksCount: sql`${opportunitiesTable.clicksCount} + 1`,
      })
      .where(eq(opportunitiesTable.id, opportunityId))
      .returning({ id: opportunitiesTable.id, clicksCount: opportunitiesTable.clicksCount });

    return updated;
  },

  /**
   * Retrieve notification preferences for student.
   */
  getStudentPreferences: async (userId: string) => {
    const subs = await db
      .select({
        category: opportunitySubscriptionsTable.category,
        isEnabled: opportunitySubscriptionsTable.isEnabled,
      })
      .from(opportunitySubscriptionsTable)
      .where(eq(opportunitySubscriptionsTable.userId, userId));

    const result: Record<string, boolean> = {
      [OPPORTUNITY_CATEGORIES.SCHOLARSHIPS]: true,
      [OPPORTUNITY_CATEGORIES.ORGANISATIONS]: true,
      [OPPORTUNITY_CATEGORIES.TUTORIALS]: true,
    };

    for (const sub of subs) {
      result[sub.category] = sub.isEnabled;
    }

    return result;
  },

  /**
   * Upsert notification preference for student.
   */
  updateStudentPreference: async (userId: string, category: string, isEnabled: boolean) => {
    const now = new Date();
    const [sub] = await db
      .insert(opportunitySubscriptionsTable)
      .values({
        userId,
        category,
        isEnabled,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: [opportunitySubscriptionsTable.userId, opportunitySubscriptionsTable.category],
        set: {
          isEnabled,
          updatedAt: now,
        },
      })
      .returning();

    if (!sub) {
      throw new Error('Failed to update student preference');
    }

    return sub;
  },

  /**
   * Toggle bookmark for an opportunity.
   */
  toggleBookmark: async (userId: string, opportunityId: string) => {
    const existing = await db
      .select({ id: opportunityBookmarksTable.id })
      .from(opportunityBookmarksTable)
      .where(
        and(
          eq(opportunityBookmarksTable.userId, userId),
          eq(opportunityBookmarksTable.opportunityId, opportunityId)
        )
      )
      .limit(1);

    const firstBookmark = existing[0];
    if (firstBookmark) {
      await db
        .delete(opportunityBookmarksTable)
        .where(eq(opportunityBookmarksTable.id, firstBookmark.id));
      return { isBookmarked: false };
    }

    await db.insert(opportunityBookmarksTable).values({
      userId,
      opportunityId,
    });
    return { isBookmarked: true };
  },

  // =====================================================
  // ADMIN OPPORTUNITY MANAGEMENT
  // =====================================================

  /**
   * List opportunities for admin with metrics and status filtering.
   */
  listOpportunitiesForAdmin: async (filters: AdminOpportunityFilters = {}) => {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 20));
    const offset = (page - 1) * limit;

    const conditions = [];

    if (filters.category && filters.category !== 'ALL') {
      conditions.push(eq(opportunitiesTable.category, filters.category));
    }
    if (filters.status && filters.status !== 'ALL') {
      conditions.push(eq(opportunitiesTable.status, filters.status));
    }
    if (filters.verificationStatus && filters.verificationStatus !== 'ALL') {
      conditions.push(eq(opportunitiesTable.verificationStatus, filters.verificationStatus));
    }
    if (filters.search && filters.search.trim()) {
      const term = `%${filters.search.trim()}%`;
      conditions.push(
        or(
          ilike(opportunitiesTable.title, term),
          ilike(opportunitiesTable.organization, term),
          ilike(opportunitiesTable.shortDescription, term)
        )!
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(opportunitiesTable)
      .where(whereClause);

    const total = countResult?.count || 0;

    const items = await db
      .select({
        id: opportunitiesTable.id,
        slug: opportunitiesTable.slug,
        category: opportunitiesTable.category,
        title: opportunitiesTable.title,
        organization: opportunitiesTable.organization,
        shortDescription: opportunitiesTable.shortDescription,
        status: opportunitiesTable.status,
        verificationStatus: opportunitiesTable.verificationStatus,
        isFeatured: opportunitiesTable.isFeatured,
        deadline: opportunitiesTable.deadline,
        clicksCount: opportunitiesTable.clicksCount,
        publishedAt: opportunitiesTable.publishedAt,
        createdAt: opportunitiesTable.createdAt,
        updatedAt: opportunitiesTable.updatedAt,
      })
      .from(opportunitiesTable)
      .where(whereClause)
      .orderBy(desc(opportunitiesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      opportunities: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  },

  /**
   * Get full opportunity record for admin.
   */
  getOpportunityByIdForAdmin: async (opportunityId: string) => {
    const [opp] = await db
      .select()
      .from(opportunitiesTable)
      .where(eq(opportunitiesTable.id, opportunityId))
      .limit(1);

    if (!opp) return null;

    // Fetch bookmarks count
    const [bmCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(opportunityBookmarksTable)
      .where(eq(opportunityBookmarksTable.opportunityId, opportunityId));

    return {
      ...opp,
      bookmarksCount: bmCount?.count || 0,
    };
  },

  /**
   * Create new opportunity.
   */
  createOpportunity: async (adminUserId: string, input: CreateOpportunityInput) => {
    const slug = await opportunityService.generateUniqueSlug(input.title, input.slug);
    const audience = await opportunityService.resolveAcademicAudience(input.targetAudience);

    const now = new Date();
    const isPublishing = input.status === OPPORTUNITY_STATUS.PUBLISHED;

    const [opp] = await db
      .insert(opportunitiesTable)
      .values({
        slug,
        category: input.category,
        title: input.title,
        organization: input.organization,
        shortDescription: input.shortDescription,
        fullDescription: input.fullDescription,
        requirements: input.requirements || null,
        benefits: input.benefits || null,
        applicationUrl: input.applicationUrl || null,
        contactEmail: input.contactEmail || null,
        contactPhone: input.contactPhone || null,
        logoUrl: input.logoUrl || null,
        bannerUrl: input.bannerUrl || null,
        deadline: input.deadline ? new Date(input.deadline) : null,
        status: input.status || OPPORTUNITY_STATUS.DRAFT,
        verificationStatus: input.verificationStatus || OPPORTUNITY_VERIFICATION_STATUS.UNVERIFIED,
        isFeatured: input.isFeatured || false,
        targetAudience: audience,
        createdBy: adminUserId as any,
        updatedBy: adminUserId as any,
        publishedAt: isPublishing ? now : null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!opp) {
      throw new Error('Failed to create opportunity');
    }

    await auditService.logAdminAction({
      adminUserId,
      action: 'opportunity.create',
      resourceType: 'opportunity',
      resourceId: opp.id,
      metadata: { title: opp.title, category: opp.category, status: opp.status },
    });

    if (isPublishing && input.notifySubscribers) {
      opportunityService.fanOutOpportunityNotifications(opp).catch((err) => {
        logger.error(`[OPPORTUNITY NOTIFICATION ERROR] ${err.message}`);
      });
    }

    return opp;
  },

  /**
   * Update existing opportunity.
   */
  updateOpportunity: async (opportunityId: string, adminUserId: string, input: UpdateOpportunityInput) => {
    const [existing] = await db
      .select()
      .from(opportunitiesTable)
      .where(eq(opportunitiesTable.id, opportunityId))
      .limit(1);

    if (!existing) {
      throw new Error('Opportunity not found');
    }

    const updates: Partial<Opportunity> = {
      updatedBy: adminUserId as any,
      updatedAt: new Date(),
    };

    if (input.title !== undefined) updates.title = input.title;
    if (input.slug !== undefined && input.slug !== existing.slug) {
      updates.slug = await opportunityService.generateUniqueSlug(input.title || existing.title, input.slug);
    }
    if (input.category !== undefined) updates.category = input.category;
    if (input.organization !== undefined) updates.organization = input.organization;
    if (input.shortDescription !== undefined) updates.shortDescription = input.shortDescription;
    if (input.fullDescription !== undefined) updates.fullDescription = input.fullDescription;
    if (input.requirements !== undefined) updates.requirements = input.requirements || null;
    if (input.benefits !== undefined) updates.benefits = input.benefits || null;
    if (input.applicationUrl !== undefined) updates.applicationUrl = input.applicationUrl || null;
    if (input.contactEmail !== undefined) updates.contactEmail = input.contactEmail || null;
    if (input.contactPhone !== undefined) updates.contactPhone = input.contactPhone || null;
    if (input.logoUrl !== undefined) updates.logoUrl = input.logoUrl || null;
    if (input.bannerUrl !== undefined) updates.bannerUrl = input.bannerUrl || null;
    if (input.deadline !== undefined) updates.deadline = input.deadline ? new Date(input.deadline) : null;
    if (input.status !== undefined) updates.status = input.status;
    if (input.verificationStatus !== undefined) updates.verificationStatus = input.verificationStatus;
    if (input.isFeatured !== undefined) updates.isFeatured = input.isFeatured;
    if (input.targetAudience !== undefined) {
      updates.targetAudience = await opportunityService.resolveAcademicAudience(input.targetAudience);
    }

    if (input.status === OPPORTUNITY_STATUS.PUBLISHED && !existing.publishedAt) {
      updates.publishedAt = new Date();
    }

    const [updated] = await db
      .update(opportunitiesTable)
      .set(updates)
      .where(eq(opportunitiesTable.id, opportunityId))
      .returning();

    if (!updated) {
      throw new Error('Opportunity not found or update failed');
    }

    await auditService.logAdminAction({
      adminUserId,
      action: 'opportunity.update',
      resourceType: 'opportunity',
      resourceId: opportunityId,
      metadata: { changedFields: Object.keys(input) },
    });

    return updated;
  },

  /**
   * Publish an opportunity and optionally fan-out notifications to subscribed students.
   */
  publishOpportunity: async (opportunityId: string, adminUserId: string, notifySubscribers = true) => {
    const [existing] = await db
      .select()
      .from(opportunitiesTable)
      .where(eq(opportunitiesTable.id, opportunityId))
      .limit(1);

    if (!existing) throw new Error('Opportunity not found');

    const now = new Date();
    const [published] = await db
      .update(opportunitiesTable)
      .set({
        status: OPPORTUNITY_STATUS.PUBLISHED,
        publishedAt: existing.publishedAt || now,
        updatedBy: adminUserId as any,
        updatedAt: now,
      })
      .where(eq(opportunitiesTable.id, opportunityId))
      .returning();

    if (!published) {
      throw new Error('Failed to publish opportunity');
    }

    await auditService.logAdminAction({
      adminUserId,
      action: 'opportunity.publish',
      resourceType: 'opportunity',
      resourceId: opportunityId,
      metadata: { notifySubscribers },
    });

    if (notifySubscribers) {
      opportunityService.fanOutOpportunityNotifications(published).catch((err) => {
        logger.error(`[OPPORTUNITY NOTIFICATION ERROR] ${err.message}`);
      });
    }

    return published;
  },

  /**
   * Archive an opportunity.
   */
  archiveOpportunity: async (opportunityId: string, adminUserId: string) => {
    const [archived] = await db
      .update(opportunitiesTable)
      .set({
        status: OPPORTUNITY_STATUS.ARCHIVED,
        updatedBy: adminUserId as any,
        updatedAt: new Date(),
      })
      .where(eq(opportunitiesTable.id, opportunityId))
      .returning();

    if (!archived) throw new Error('Opportunity not found');

    await auditService.logAdminAction({
      adminUserId,
      action: 'opportunity.archive',
      resourceType: 'opportunity',
      resourceId: opportunityId,
    });

    return archived;
  },

  /**
   * Delete an opportunity.
   */
  deleteOpportunity: async (opportunityId: string, adminUserId: string) => {
    const [deleted] = await db
      .delete(opportunitiesTable)
      .where(eq(opportunitiesTable.id, opportunityId))
      .returning({ id: opportunitiesTable.id, title: opportunitiesTable.title });

    if (!deleted) throw new Error('Opportunity not found');

    await auditService.logAdminAction({
      adminUserId,
      action: 'opportunity.delete',
      resourceType: 'opportunity',
      resourceId: opportunityId,
      metadata: { title: deleted.title },
    });

    return deleted;
  },

  /**
   * Fan-out notifications to subscribed & eligible students asynchronously.
   */
  fanOutOpportunityNotifications: async (opportunity: Opportunity) => {
    try {
      const audience = opportunity.targetAudience as any;

      // Base query for active students who have NOT opted out of this category
      const targetConditions = [
        eq(usersTable.status, 'ACTIVE'),
        eq(usersTable.role, 'STUDENT'),
      ];

      // Exclude students who explicitly disabled notifications for this category
      const disabledUsersSubquery = db
        .select({ uid: opportunitySubscriptionsTable.userId })
        .from(opportunitySubscriptionsTable)
        .where(
          and(
            eq(opportunitySubscriptionsTable.category, opportunity.category),
            eq(opportunitySubscriptionsTable.isEnabled, false)
          )
        );

      // Academic audience filtering
      if (audience && !audience.isAll) {
        const orConditions = [];
        if (Array.isArray(audience.facultyIds) && audience.facultyIds.length > 0) {
          orConditions.push(inArray(usersTable.facultyId, audience.facultyIds));
        }
        if (Array.isArray(audience.departmentIds) && audience.departmentIds.length > 0) {
          orConditions.push(inArray(usersTable.departmentId, audience.departmentIds));
        }
        if (Array.isArray(audience.levels) && audience.levels.length > 0) {
          orConditions.push(inArray(usersTable.level, audience.levels));
        }
        if (orConditions.length > 0) {
          targetConditions.push(or(...orConditions)!);
        }
      }

      const eligibleStudents = await db
        .select({ id: usersTable.id })
        .from(usersTable)
        .where(
          and(
            ...targetConditions,
            sql`${usersTable.id} NOT IN (${disabledUsersSubquery})`
          )
        )
        .limit(1000); // Guarded batch limit

      logger.info(
        `[OPPORTUNITY NOTIFICATION] Dispatching new opportunity '${opportunity.title}' to ${eligibleStudents.length} eligible students`
      );

      const title = `New ${opportunity.category.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}: ${opportunity.title}`;
      const body = `${opportunity.organization}: ${opportunity.shortDescription.slice(0, 120)}...`;

      // Batch create notifications
      for (const student of eligibleStudents) {
        await notificationService.createNotification({
          userId: student.id,
          type: 'opportunity',
          title,
          body,
          data: {
            opportunityId: opportunity.id,
            category: opportunity.category,
            slug: opportunity.slug,
          },
        });
      }
    } catch (err: any) {
      logger.error(`[OPPORTUNITY NOTIFICATION FAN-OUT ERROR] ${err.message}`);
    }
  },

  /**
   * Lookup faculties and departments for admin UI dropdowns.
   */
  lookupAudienceOptions: async () => {
    const faculties = await db
      .select({
        id: facultiesTable.id,
        name: facultiesTable.name,
        code: facultiesTable.code,
      })
      .from(facultiesTable)
      .orderBy(facultiesTable.name);

    const departments = await db
      .select({
        id: departmentsTable.id,
        facultyId: departmentsTable.facultyId,
        name: departmentsTable.name,
        code: departmentsTable.code,
      })
      .from(departmentsTable)
      .orderBy(departmentsTable.name);

    return {
      faculties,
      departments,
      levels: [100, 200, 300, 400, 500, 600],
    };
  },
};

