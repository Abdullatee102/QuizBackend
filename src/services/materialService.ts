import { db } from '../db/index.js';
import {
  courseMaterialsTable,
  courseOfferingsTable,
  coursesTable,
  studentEnrollmentsTable,
  usersTable,
  COURSE_MATERIAL_STATUSES,
  type CourseMaterialStatus,
  type CourseMaterialCategory,
} from '../db/schema.js';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import { assessmentService } from './assessmentService.js';
import { materialStorageProvider } from './storage/materialStorageService.js';
import type {
  CreateMaterialInput,
  UpdateMaterialInput,
} from '../schemas/material.schemas.js';
import logger from '../config/logger.js';

export const materialService = {
  /**
   * Upload and persist a course learning material for an assigned course offering.
   */
  uploadMaterial: async (
    lecturerId: string,
    offeringId: string,
    file: Express.Multer.File,
    input: CreateMaterialInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    if (!file) {
      throw new Error('No learning material file payload provided.');
    }

    const stored = await materialStorageProvider.saveFile(file);

    const isPublished = input.status === COURSE_MATERIAL_STATUSES.PUBLISHED;

    const [material] = await db
      .insert(courseMaterialsTable)
      .values({
        offeringId: offeringId as any,
        uploadedBy: lecturerId as any,
        title: input.title,
        description: input.description || null,
        category: input.category || 'LECTURE_NOTE',
        status: input.status || COURSE_MATERIAL_STATUSES.PUBLISHED,
        originalFileName: stored.originalFileName,
        fileSizeBytes: stored.fileSizeBytes,
        mimeType: stored.mimeType,
        storageKey: stored.storageKey,
        downloadCount: 0,
        publishedAt: isPublished ? new Date() : null,
      })
      .returning();

    if (!material) {
      throw new Error('Failed to persist course material record.');
    }

    logger.info(
      `[COURSE_MATERIAL] Uploaded material ${material.id} (${material.title}) for offering ${offeringId} by lecturer ${lecturerId}`
    );

    return material;
  },

  /**
   * List materials for an authorized lecturer with counts and category breakdown.
   */
  listOfferingMaterialsForLecturer: async (
    lecturerId: string,
    offeringId: string,
    options: { category?: string | undefined; status?: string | undefined } = {}
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const conditions = [eq(courseMaterialsTable.offeringId, offeringId as any)];
    if (options.category) {
      conditions.push(eq(courseMaterialsTable.category, options.category as any));
    }
    if (options.status) {
      conditions.push(eq(courseMaterialsTable.status, options.status as any));
    }

    const materials = await db
      .select({
        id: courseMaterialsTable.id,
        offeringId: courseMaterialsTable.offeringId,
        uploadedBy: courseMaterialsTable.uploadedBy,
        title: courseMaterialsTable.title,
        description: courseMaterialsTable.description,
        category: courseMaterialsTable.category,
        status: courseMaterialsTable.status,
        originalFileName: courseMaterialsTable.originalFileName,
        fileSizeBytes: courseMaterialsTable.fileSizeBytes,
        mimeType: courseMaterialsTable.mimeType,
        downloadCount: courseMaterialsTable.downloadCount,
        publishedAt: courseMaterialsTable.publishedAt,
        createdAt: courseMaterialsTable.createdAt,
        updatedAt: courseMaterialsTable.updatedAt,
        uploaderName: usersTable.fullName,
      })
      .from(courseMaterialsTable)
      .innerJoin(usersTable, eq(courseMaterialsTable.uploadedBy, usersTable.id))
      .where(and(...conditions))
      .orderBy(desc(courseMaterialsTable.createdAt));

    // Stats across offering
    const allOfferingMaterials = await db
      .select({
        status: courseMaterialsTable.status,
        downloadCount: courseMaterialsTable.downloadCount,
      })
      .from(courseMaterialsTable)
      .where(eq(courseMaterialsTable.offeringId, offeringId as any));

    const stats = {
      total: allOfferingMaterials.length,
      published: allOfferingMaterials.filter((m) => m.status === COURSE_MATERIAL_STATUSES.PUBLISHED).length,
      draft: allOfferingMaterials.filter((m) => m.status === COURSE_MATERIAL_STATUSES.DRAFT).length,
      archived: allOfferingMaterials.filter((m) => m.status === COURSE_MATERIAL_STATUSES.ARCHIVED).length,
      totalDownloads: allOfferingMaterials.reduce((acc, curr) => acc + curr.downloadCount, 0),
    };

    return {
      materials,
      stats,
    };
  },

  /**
   * Get material details.
   */
  getMaterialDetailsForLecturer: async (
    lecturerId: string,
    offeringId: string,
    materialId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [material] = await db
      .select()
      .from(courseMaterialsTable)
      .where(
        and(
          eq(courseMaterialsTable.id, materialId as any),
          eq(courseMaterialsTable.offeringId, offeringId as any)
        )
      );

    if (!material) {
      throw new Error('Course material not found for this offering.');
    }

    return material;
  },

  /**
   * Update material metadata or change publication state (DRAFT <-> PUBLISHED <-> ARCHIVED).
   */
  updateMaterial: async (
    lecturerId: string,
    offeringId: string,
    materialId: string,
    input: UpdateMaterialInput
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [existing] = await db
      .select()
      .from(courseMaterialsTable)
      .where(
        and(
          eq(courseMaterialsTable.id, materialId as any),
          eq(courseMaterialsTable.offeringId, offeringId as any)
        )
      );

    if (!existing) {
      throw new Error('Course material not found for this offering.');
    }

    const updatePayload: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) updatePayload.title = input.title;
    if (input.description !== undefined) updatePayload.description = input.description;
    if (input.category !== undefined) updatePayload.category = input.category;
    if (input.status !== undefined) {
      updatePayload.status = input.status;
      if (input.status === COURSE_MATERIAL_STATUSES.PUBLISHED && !existing.publishedAt) {
        updatePayload.publishedAt = new Date();
      }
    }

    const [updated] = await db
      .update(courseMaterialsTable)
      .set(updatePayload)
      .where(eq(courseMaterialsTable.id, materialId as any))
      .returning();

    logger.info(
      `[COURSE_MATERIAL] Updated material ${materialId} for offering ${offeringId} by lecturer ${lecturerId}`
    );

    return updated;
  },

  /**
   * Delete material and remove associated file from disk.
   */
  deleteMaterial: async (
    lecturerId: string,
    offeringId: string,
    materialId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [existing] = await db
      .select()
      .from(courseMaterialsTable)
      .where(
        and(
          eq(courseMaterialsTable.id, materialId as any),
          eq(courseMaterialsTable.offeringId, offeringId as any)
        )
      );

    if (!existing) {
      throw new Error('Course material not found for this offering.');
    }

    // Delete database record
    await db
      .delete(courseMaterialsTable)
      .where(eq(courseMaterialsTable.id, materialId as any));

    // Delete file from disk safely
    await materialStorageProvider.deleteFile(existing.storageKey);

    logger.info(
      `[COURSE_MATERIAL] Deleted material ${materialId} (${existing.title}) from offering ${offeringId} by lecturer ${lecturerId}`
    );

    return { id: materialId, deleted: true };
  },

  /**
   * Prepare material file download for lecturer.
   */
  downloadMaterialForLecturer: async (
    lecturerId: string,
    offeringId: string,
    materialId: string
  ) => {
    await assessmentService.verifyLecturerAssignment(lecturerId, offeringId);

    const [material] = await db
      .select()
      .from(courseMaterialsTable)
      .where(
        and(
          eq(courseMaterialsTable.id, materialId as any),
          eq(courseMaterialsTable.offeringId, offeringId as any)
        )
      );

    if (!material) {
      throw new Error('Course material not found.');
    }

    const exists = await materialStorageProvider.fileExists(material.storageKey);
    if (!exists) {
      throw new Error('Underlying resource file is missing from server storage.');
    }

    const filePath = materialStorageProvider.getFilePath(material.storageKey);

    return {
      filePath,
      originalFileName: material.originalFileName,
      mimeType: material.mimeType,
    };
  },

  /**
   * Student: List published materials for an enrolled offering.
   */
  listOfferingMaterialsForStudent: async (
    studentId: string,
    offeringId: string,
    options: { category?: string | undefined } = {}
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

    // 3. Query only PUBLISHED materials
    const conditions = [
      eq(courseMaterialsTable.offeringId, offeringId as any),
      eq(courseMaterialsTable.status, COURSE_MATERIAL_STATUSES.PUBLISHED),
    ];
    if (options.category) {
      conditions.push(eq(courseMaterialsTable.category, options.category as any));
    }

    const materials = await db
      .select({
        id: courseMaterialsTable.id,
        title: courseMaterialsTable.title,
        description: courseMaterialsTable.description,
        category: courseMaterialsTable.category,
        status: courseMaterialsTable.status,
        originalFileName: courseMaterialsTable.originalFileName,
        fileSizeBytes: courseMaterialsTable.fileSizeBytes,
        mimeType: courseMaterialsTable.mimeType,
        downloadCount: courseMaterialsTable.downloadCount,
        publishedAt: courseMaterialsTable.publishedAt,
        createdAt: courseMaterialsTable.createdAt,
        uploaderName: usersTable.fullName,
      })
      .from(courseMaterialsTable)
      .innerJoin(usersTable, eq(courseMaterialsTable.uploadedBy, usersTable.id))
      .where(and(...conditions))
      .orderBy(desc(courseMaterialsTable.publishedAt), desc(courseMaterialsTable.createdAt));

    return {
      offering,
      materials,
    };
  },

  /**
   * Student: Download a published material file.
   */
  downloadMaterialForStudent: async (
    studentId: string,
    offeringId: string,
    materialId: string
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

    // 2. Fetch material (strictly must be PUBLISHED)
    const [material] = await db
      .select()
      .from(courseMaterialsTable)
      .where(
        and(
          eq(courseMaterialsTable.id, materialId as any),
          eq(courseMaterialsTable.offeringId, offeringId as any),
          eq(courseMaterialsTable.status, COURSE_MATERIAL_STATUSES.PUBLISHED)
        )
      );

    if (!material) {
      throw new Error('Course material not found or is not currently published.');
    }

    const exists = await materialStorageProvider.fileExists(material.storageKey);
    if (!exists) {
      throw new Error('Underlying resource file is missing from server storage.');
    }

    // 3. Atomically increment downloadCount
    await db
      .update(courseMaterialsTable)
      .set({
        downloadCount: sql`${courseMaterialsTable.downloadCount} + 1`,
      })
      .where(eq(courseMaterialsTable.id, materialId as any));

    const filePath = materialStorageProvider.getFilePath(material.storageKey);

    return {
      filePath,
      originalFileName: material.originalFileName,
      mimeType: material.mimeType,
    };
  },
};
