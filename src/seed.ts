import { db, pool } from './db/index.js';

import {
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
} from './db/schema.js';

import { eq, inArray } from 'drizzle-orm';
import { CURRICULUM_TREE } from './seed/faculties/index.js';
import type { SeedQuestion } from './seed/types.js';

// Re-export types and CURRICULUM_TREE for consumers
export * from './seed/types.js';
export { CURRICULUM_TREE };

// =====================================================
// SEED DATABASE (HIGH-PERFORMANCE BATCH SYNCHRONIZATION)
// =====================================================

export const seedDatabase = async () => {
  const startTime = Date.now();
  try {
    console.log('[SEED] Starting high-speed curriculum & verified question synchronization...');

    // 1. Pre-aggregate canonical questions by course code across the entire curriculum
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

    // 2. Pre-load all faculties, departments, and courses in 3 fast queries to avoid thousands of round-trips
    const dbFaculties = await db.select().from(facultiesTable);
    const facultyMap = new Map<string, typeof dbFaculties[0]>();
    for (const f of dbFaculties) {
      facultyMap.set(f.code, f);
      // Map legacy abbreviations
      if (f.code === 'FMS') facultyMap.set('FMGS', f);
      if (f.code === 'FAS') facultyMap.set('FAG', f);
    }

    const dbDepartments = await db.select().from(departmentsTable);
    const departmentMap = new Map<string, typeof dbDepartments[0]>();
    for (const d of dbDepartments) {
      departmentMap.set(`${d.facultyId}_${d.code}`, d);
    }

    const dbCourses = await db.select().from(coursesTable);
    const courseMap = new Map<string, typeof dbCourses[0]>();
    for (const c of dbCourses) {
      courseMap.set(`${c.departmentId}_${c.code}`, c);
    }

    console.log(`[SEED] Pre-loaded cache in ${Date.now() - startTime}ms (${dbFaculties.length} faculties, ${dbDepartments.length} departments, ${dbCourses.length} courses).`);

    let totalCoursesSynced = 0;
    let totalQuestionsSynced = 0;
    let fCount = 0;

    for (const fac of CURRICULUM_TREE) {
      fCount++;
      console.log(`\n[SEED] [${fCount}/${CURRICULUM_TREE.length}] Processing ${fac.code} — ${fac.facultyName}...`);

      // Ensure Faculty
      let insertedFaculty = facultyMap.get(fac.code);
      if (!insertedFaculty) {
        const [created] = await db
          .insert(facultiesTable)
          .values({ name: fac.facultyName, code: fac.code })
          .returning();
        if (created) {
          insertedFaculty = created;
          facultyMap.set(fac.code, created);
        }
      } else if (insertedFaculty.name !== fac.facultyName || insertedFaculty.code !== fac.code) {
        const [updated] = await db
          .update(facultiesTable)
          .set({ name: fac.facultyName, code: fac.code })
          .where(eq(facultiesTable.id, insertedFaculty.id))
          .returning();
        if (updated) {
          insertedFaculty = updated;
          facultyMap.set(fac.code, updated);
        }
      }

      if (!insertedFaculty) {
        console.warn(`[SEED] Could not find or create faculty: ${fac.code}`);
        continue;
      }

      const facultyId = insertedFaculty.id;

      for (const dept of fac.departments) {
        const deptKey = `${facultyId}_${dept.code}`;
        let deptRecord = departmentMap.get(deptKey);

        if (!deptRecord) {
          const [newDept] = await db
            .insert(departmentsTable)
            .values({
              facultyId,
              name: dept.deptName,
              code: dept.code,
            })
            .returning();
          if (newDept) {
            deptRecord = newDept;
            departmentMap.set(deptKey, newDept);
          }
        } else if (deptRecord.name !== dept.deptName) {
          const [updatedDept] = await db
            .update(departmentsTable)
            .set({ name: dept.deptName })
            .where(eq(departmentsTable.id, deptRecord.id))
            .returning();
          if (updatedDept) {
            deptRecord = updatedDept;
            departmentMap.set(deptKey, updatedDept);
          }
        }

        if (!deptRecord) {
          console.warn(`[SEED] Could not find or create department: ${dept.code}`);
          continue;
        }

        const currentDeptId = deptRecord.id;

        // Collect all department courses and ensure each course exists & is updated
        const courseIdsToRefresh: string[] = [];
        const questionsToInsert: Array<{
          courseId: string;
          type: 'cbt' | 'theory';
          question: string;
          options: string[];
          correctAnswer: string;
          gradingPoints: any;
          difficulty: string;
        }> = [];

        for (const course of dept.courses) {
          const courseKey = `${currentDeptId}_${course.code}`;
          let courseRecord = courseMap.get(courseKey);

          if (!courseRecord) {
            const [newCourse] = await db
              .insert(coursesTable)
              .values({
                departmentId: currentDeptId,
                code: course.code,
                title: course.title,
                level: course.level,
                semester: course.semester,
              })
              .returning();
            if (newCourse) {
              courseRecord = newCourse;
              courseMap.set(courseKey, newCourse);
            }
          } else if (
            courseRecord.title !== course.title ||
            courseRecord.level !== course.level ||
            courseRecord.semester !== course.semester
          ) {
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
              courseMap.set(courseKey, updatedCourse);
            }
          }

          if (!courseRecord) continue;
          totalCoursesSynced++;

          const courseQuestions = course.questions && course.questions.length > 0
            ? course.questions
            : (questionsByCodeMap.get(course.code) ?? []);

          if (courseQuestions.length > 0) {
            courseIdsToRefresh.push(courseRecord.id);
            for (const q of courseQuestions) {
              questionsToInsert.push({
                courseId: courseRecord.id,
                type: q.type,
                question: q.question,
                options: q.options || [],
                correctAnswer: q.correctAnswer,
                gradingPoints: q.gradingPoints || [],
                difficulty: 'medium',
              });
            }
          }
        }

        // Clean replacement: delete old questions and batch-insert verified questions for the department
        if (courseIdsToRefresh.length > 0) {
          // Chunk deletions if large
          for (let i = 0; i < courseIdsToRefresh.length; i += 100) {
            const chunk = courseIdsToRefresh.slice(i, i + 100);
            await db
              .delete(questionsTable)
              .where(inArray(questionsTable.courseId, chunk));
          }

          // Chunk insertions to prevent PostgreSQL query parameter limits
          for (let i = 0; i < questionsToInsert.length; i += 300) {
            const chunk = questionsToInsert.slice(i, i + 300);
            await db.insert(questionsTable).values(chunk);
          }

          totalQuestionsSynced += questionsToInsert.length;
        }

        console.log(
          `  ✓ [${dept.code.padEnd(4)}] ${dept.deptName.padEnd(38)} -> ${dept.courses.length.toString().padStart(3)} courses, ${questionsToInsert.length.toString().padStart(4)} verified questions`
        );
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n=============================================================`);
    console.log(`[SEED COMPLETE] Successfully synchronized ${totalCoursesSynced} courses and ${totalQuestionsSynced} verified questions in ${duration}s!`);
    console.log(`=============================================================`);

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('[SEED ERROR] Error seeding data:', error);
    await pool.end();
    process.exit(1);
  }
};

seedDatabase();
