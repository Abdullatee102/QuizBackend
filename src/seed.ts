import { db } from './db/index.js';

import {
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
} from './db/schema.js';

import { and, eq, or } from 'drizzle-orm';
import { CURRICULUM_TREE } from './seed/faculties/index.js';
import type { SeedQuestion } from './seed/types.js';

// Re-export types and CURRICULUM_TREE for consumers
export * from './seed/types.js';
export { CURRICULUM_TREE };

// =====================================================
// SEED DATABASE
// =====================================================

export const seedDatabase = async () => {
  try {
    console.log('[SEED] Starting full relational curriculum insertion...');

    // Pre-aggregate questions by course code from the curriculum tree
    const questionsByCodeMap = new Map<string, SeedQuestion[]>();
    for (const fac of CURRICULUM_TREE) {
      for (const dept of fac.departments) {
        for (const crs of dept.courses) {
          if (crs.questions && crs.questions.length > 0) {
            const existing = questionsByCodeMap.get(crs.code) ?? [];
            for (const q of crs.questions) {
              if (!existing.some((e) => e.question === q.question)) {
                existing.push(q);
              }
            }
            questionsByCodeMap.set(crs.code, existing);
          }
        }
      }
    }

    for (const fac of CURRICULUM_TREE) {
      // =================================================
      // FACULTY (Reconcile legacy codes e.g. FMS->FMGS, FAS->FAG)
      // =================================================
      const legacyConditions = [];
      if (fac.code === 'FMGS') {
        legacyConditions.push(eq(facultiesTable.code, 'FMS'));
      }
      if (fac.code === 'FAG') {
        legacyConditions.push(eq(facultiesTable.code, 'FAS'));
      }

      const existingFaculties = await db
        .select()
        .from(facultiesTable)
        .where(
          or(
            eq(facultiesTable.code, fac.code),
            eq(facultiesTable.name, fac.facultyName),
            ...legacyConditions
          )
        )
        .limit(1);

      let insertedFaculty = existingFaculties[0];

      if (!insertedFaculty) {
        const [created] = await db
          .insert(facultiesTable)
          .values({
            name: fac.facultyName,
            code: fac.code,
          })
          .returning();

        insertedFaculty = created;
      } else {
        const [updated] = await db
          .update(facultiesTable)
          .set({
            name: fac.facultyName,
            code: fac.code,
          })
          .where(eq(facultiesTable.id, insertedFaculty.id))
          .returning();

        if (updated) {
          insertedFaculty = updated;
        }
      }

      if (!insertedFaculty) {
        console.warn(`[SEED] Could not create/find faculty: ${fac.facultyName}`);
        continue;
      }

      // =================================================
      // DEPARTMENTS
      // =================================================
      for (const dept of fac.departments) {
        const existingDepartments = await db
          .select()
          .from(departmentsTable)
          .where(
            and(
              eq(departmentsTable.facultyId, insertedFaculty.id),
              eq(departmentsTable.code, dept.code)
            )
          )
          .limit(1);

        let deptRecord = existingDepartments[0];

        if (!deptRecord) {
          const [newDepartment] = await db
            .insert(departmentsTable)
            .values({
              facultyId: insertedFaculty.id,
              name: dept.deptName,
              code: dept.code,
            })
            .returning();

          if (!newDepartment) {
            console.warn(`[SEED] Could not create department: ${dept.deptName}`);
            continue;
          }

          deptRecord = newDepartment;
        } else {
          const [updatedDepartment] = await db
            .update(departmentsTable)
            .set({
              name: dept.deptName,
            })
            .where(eq(departmentsTable.id, deptRecord.id))
            .returning();

          if (updatedDepartment) {
            deptRecord = updatedDepartment;
          }
        }

        // =================================================
        // COURSES
        // =================================================
        for (const course of dept.courses) {
          const existingCourses = await db
            .select()
            .from(coursesTable)
            .where(
              and(
                eq(coursesTable.departmentId, deptRecord.id),
                eq(coursesTable.code, course.code)
              )
            )
            .limit(1);

          let courseRecord = existingCourses[0];

          if (!courseRecord) {
            const [newCourse] = await db
              .insert(coursesTable)
              .values({
                departmentId: deptRecord.id,
                code: course.code,
                title: course.title,
                level: course.level,
                semester: course.semester,
              })
              .returning();

            if (!newCourse) {
              console.warn(`[SEED] Could not create course: ${course.code}`);
              continue;
            }

            courseRecord = newCourse;
          } else {
            const [updatedCourse] = await db
              .update(coursesTable)
              .set({
                title: course.title,
                level: course.level,
                semester: course.semester,
              })
              .where(eq(coursesTable.id, courseRecord.id))
              .returning();

            if (updatedCourse) {
              courseRecord = updatedCourse;
            }
          }

          // =================================================
          // QUESTIONS (Propagate canonical questions for this course code)
          // =================================================
          const questionsToSeed = course.questions && course.questions.length > 0
            ? course.questions
            : (questionsByCodeMap.get(course.code) ?? []);

          for (const qItem of questionsToSeed) {
            const existingQuestions = await db
              .select()
              .from(questionsTable)
              .where(
                and(
                  eq(questionsTable.courseId, courseRecord.id),
                  eq(questionsTable.question, qItem.question)
                )
              )
              .limit(1);

            const existingQuestion = existingQuestions[0];
            const gradingPoints = qItem.gradingPoints ?? [];

            // UPDATE EXISTING QUESTION
            if (existingQuestion) {
              await db
                .update(questionsTable)
                .set({
                  type: qItem.type,
                  options: qItem.options,
                  correctAnswer: qItem.correctAnswer,
                  gradingPoints,
                  difficulty: 'medium',
                })
                .where(eq(questionsTable.id, existingQuestion.id));
            }
            // INSERT NEW QUESTION
            else {
              await db
                .insert(questionsTable)
                .values({
                  courseId: courseRecord.id,
                  type: qItem.type,
                  question: qItem.question,
                  options: qItem.options,
                  correctAnswer: qItem.correctAnswer,
                  gradingPoints,
                  difficulty: 'medium',
                });
            }
          }
        }
      }
    }

    console.log('[SEED] Successfully seeded LAUTECH curriculum, questions, and theory grading rubrics!');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();
