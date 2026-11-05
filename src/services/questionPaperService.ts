import PDFDocument from 'pdfkit';
import { eq, and, inArray, or } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  questionsTable,
  courseOfferingsTable,
  offeringLecturersTable,
  courseAssignmentsTable,
  coursesTable,
  facultiesTable,
  departmentsTable,
  usersTable,
} from '../db/schema.js';
import logger from '../config/logger.js';

export interface ExamPaperConfig {
  institutionName?: string;
  facultyName?: string;
  departmentName?: string;
  courseCode?: string;
  courseTitle?: string;
  examinationTitle?: string;
  academicSession?: string;
  date?: string;
  durationMinutes?: number;
  totalMarks?: number;
  instructions?: string;
  shuffleQuestions?: boolean;
  withAnswerKey?: boolean; // STRICT: Only true for authorized lecturer marking guide
  writingSpaceLines?: number;
}

export const questionPaperService = {
  /**
   * Generates an academic examination PDF or marking guide.
   */
  generatePaperPdf: async (
    lecturerId: string,
    offeringId: string,
    questionIds: string[],
    config: ExamPaperConfig = {}
  ): Promise<Buffer> => {
    // 1. Verify lecturer assignment
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        academicSession: courseOfferingsTable.academicSession,
        semester: courseOfferingsTable.semester,
        courseCode: coursesTable.code,
        courseTitle: coursesTable.title,
        facultyName: facultiesTable.name,
        departmentName: departmentsTable.name,
      })
      .from(courseOfferingsTable)
      .innerJoin(coursesTable, eq(courseOfferingsTable.courseId, coursesTable.id))
      .leftJoin(departmentsTable, eq(coursesTable.departmentId, departmentsTable.id))
      .leftJoin(facultiesTable, eq(departmentsTable.facultyId, facultiesTable.id))
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // Verify lecturer assignment
    const [assignment] = await db
      .select({ id: offeringLecturersTable.id })
      .from(offeringLecturersTable)
      .where(
        and(
          eq(offeringLecturersTable.offeringId, offeringId as any),
          eq(offeringLecturersTable.lecturerId, lecturerId as any)
        )
      );

    if (!assignment) {
      const [courseAssign] = await db
        .select({ id: courseAssignmentsTable.id })
        .from(courseAssignmentsTable)
        .where(
          and(
            eq(courseAssignmentsTable.courseId, offering.courseId as any),
            eq(courseAssignmentsTable.lecturerId, lecturerId as any),
            eq(courseAssignmentsTable.status, 'ACTIVE')
          )
        );

      if (!courseAssign) {
        // Also allow admin override
        const [adminUser] = await db
          .select({ id: usersTable.id, role: usersTable.role })
          .from(usersTable)
          .where(eq(usersTable.id, lecturerId as any));

        if (!adminUser || !['SUPER_ADMIN', 'FACULTY_ADMIN', 'CONTENT_ADMIN'].includes(adminUser.role)) {
          throw new Error('Forbidden. Not authorized to generate question papers for this offering.');
        }
      }
    }

    if (!questionIds || questionIds.length === 0) {
      throw new Error('At least one question must be selected for the question paper.');
    }

    // 2. Fetch questions from database, strictly scoped to this course offering
    const fetchedQuestions = await db
      .select({
        id: questionsTable.id,
        type: questionsTable.type,
        question: questionsTable.question,
        options: questionsTable.options,
        correctAnswer: questionsTable.correctAnswer,
        gradingPoints: questionsTable.gradingPoints,
        explanation: questionsTable.explanation,
        points: questionsTable.points,
        difficulty: questionsTable.difficulty,
      })
      .from(questionsTable)
      .where(
        and(
          inArray(questionsTable.id, questionIds as any),
          or(
            eq(questionsTable.courseId, offering.courseId as any),
            eq(questionsTable.originOfferingId, offeringId as any)
          )
        )
      );

    if (fetchedQuestions.length === 0) {
      throw new Error('No matching questions found for the supplied IDs.');
    }

    // Maintain requested order or shuffle if specified
    let orderedQuestions = questionIds
      .map((id) => fetchedQuestions.find((q) => q.id === id))
      .filter(Boolean) as typeof fetchedQuestions;

    if (config.shuffleQuestions) {
      orderedQuestions = [...orderedQuestions].sort(() => Math.random() - 0.5);
    }

    // Compute marks
    const computedTotalMarks = orderedQuestions.reduce((sum, q) => sum + (q.points || 1), 0);
    const finalTotalMarks = config.totalMarks || computedTotalMarks;

    // Header info
    const institution = config.institutionName || 'BRAIN BUZZ UNIVERSITY';
    const faculty = config.facultyName || offering.facultyName || 'FACULTY OF COMPUTING & INFORMATICS';
    const department = config.departmentName || offering.departmentName || 'DEPARTMENT OF COMPUTER SCIENCE';
    const courseCode = config.courseCode || offering.courseCode || 'CSC';
    const courseTitle = config.courseTitle || offering.courseTitle || 'Course Assessment';
    const examTitle = config.examinationTitle || 'SEMESTER EXAMINATION';
    const session = config.academicSession || offering.academicSession || '2025/2026 SESSION';
    const examDate = config.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const duration = config.durationMinutes ? `${config.durationMinutes} Minutes` : '2 Hours';
    const instructions =
      config.instructions ||
      'INSTRUCTIONS: Answer all questions in the spaces provided. Ensure your details are written legibly. Unauthorized materials and electronic communication devices are strictly prohibited.';
    const isAnswerKey = Boolean(config.withAnswerKey);

    // 3. Generate PDF using PDFKit
    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margins: { top: 40, bottom: 45, left: 45, right: 45 },
          bufferPages: true,
        });

        const buffers: Buffer[] = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', (err) => reject(err));

        const pageWidth = doc.page.width - 90; // margin left+right = 90

        // ================= HEADER =================
        doc
          .font('Helvetica-Bold')
          .fontSize(14)
          .text(institution.toUpperCase(), { align: 'center' });

        doc
          .font('Helvetica')
          .fontSize(10)
          .text(`${faculty.toUpperCase()} • ${department.toUpperCase()}`, { align: 'center' });

        doc.moveDown(0.2);
        doc
          .font('Helvetica-Bold')
          .fontSize(12)
          .text(`${examTitle.toUpperCase()} (${session})`, { align: 'center' });

        if (isAnswerKey) {
          doc.moveDown(0.2);
          doc
            .font('Helvetica-Bold')
            .fontSize(11)
            .fillColor('#b91c1c')
            .text('*** CONFIDENTIAL — LECTURER MARKING GUIDE & ANSWER KEY ***', { align: 'center' })
            .fillColor('#000000');
        }

        doc.moveDown(0.4);

        // Course details table / bar
        const startY = doc.y;
        doc.rect(45, startY, pageWidth, 24).fillAndStroke('#f1f5f9', '#94a3b8');
        doc
          .fillColor('#0f172a')
          .font('Helvetica-Bold')
          .fontSize(10)
          .text(`COURSE: ${courseCode} — ${courseTitle}`, 52, startY + 7);

        doc.moveDown(0.8);

        // Examination Metadata Box (Date, Duration, Total Marks)
        const metaY = doc.y;
        doc.rect(45, metaY, pageWidth, 22).stroke('#cbd5e1');
        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .text(`DATE: ${examDate}`, 52, metaY + 6);
        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .text(`DURATION: ${duration}`, 52 + pageWidth / 3, metaY + 6);
        doc
          .font('Helvetica-Bold')
          .fontSize(9)
          .text(`TOTAL MARKS: ${finalTotalMarks}`, 52 + (pageWidth * 2) / 3, metaY + 6);

        doc.moveDown(0.8);

        // Candidate Identification Fields (only if NOT answer key)
        if (!isAnswerKey) {
          const studentBoxY = doc.y;
          doc.rect(45, studentBoxY, pageWidth, 42).stroke('#cbd5e1');
          doc
            .font('Helvetica')
            .fontSize(9)
            .text('CANDIDATE NAME: __________________________________________________', 52, studentBoxY + 8);
          doc
            .font('Helvetica')
            .fontSize(9)
            .text('MATRIC / ID NO: __________________________', 52 + pageWidth * 0.62, studentBoxY + 8);

          doc
            .font('Helvetica')
            .fontSize(9)
            .text('SIGNATURE: ________________________________________________________', 52, studentBoxY + 24);
          doc
            .font('Helvetica')
            .fontSize(9)
            .text('SEAT / DESK NO: __________________________', 52 + pageWidth * 0.62, studentBoxY + 24);

          doc.moveDown(1.5);
        }

        // Instructions
        const instrY = doc.y;
        doc.rect(45, instrY, pageWidth, 28).fillAndStroke('#f8fafc', '#e2e8f0');
        doc
          .fillColor('#334155')
          .font('Helvetica-Oblique')
          .fontSize(8.5)
          .text(instructions, 52, instrY + 6, { width: pageWidth - 14 });

        doc.fillColor('#000000');
        doc.moveDown(1.2);

        // ================= QUESTIONS SECTION =================
        let questionNumber = 1;

        for (const q of orderedQuestions) {
          // Check page break safety
          if (doc.y > doc.page.height - 110) {
            doc.addPage();
          }

          const qStartY = doc.y;

          // Question Prompt & Marks
          doc
            .font('Helvetica-Bold')
            .fontSize(10)
            .text(`${questionNumber}. `, 45, qStartY, { continued: true });

          doc
            .font('Helvetica')
            .fontSize(10)
            .text(q.question, { continued: false });

          // Points indicator
          doc
            .font('Helvetica-Bold')
            .fontSize(8.5)
            .fillColor('#475569')
            .text(`[${q.points || 1} Mark${(q.points || 1) !== 1 ? 's' : ''}]`, { align: 'right' })
            .fillColor('#000000');

          doc.moveDown(0.3);

          if (q.type === 'cbt') {
            // CBT Options
            const options = q.options || [];
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

            for (let optIdx = 0; optIdx < options.length; optIdx++) {
              const optLetter = letters[optIdx] || `${optIdx + 1}`;
              const optText = options[optIdx];

              const isCorrect =
                isAnswerKey &&
                q.correctAnswer &&
                q.correctAnswer.trim().toLowerCase() === optText?.trim().toLowerCase();

              if (isCorrect) {
                doc
                  .font('Helvetica-Bold')
                  .fontSize(9.5)
                  .fillColor('#15803d')
                  .text(`(${optLetter}) ${optText}   ✓ [CORRECT ANSWER]`, 65)
                  .fillColor('#000000');
              } else {
                doc
                  .font('Helvetica')
                  .fontSize(9.5)
                  .text(`(${optLetter}) ${optText}`, 65);
              }
              doc.moveDown(0.15);
            }

            if (isAnswerKey && q.explanation) {
              doc.moveDown(0.2);
              doc
                .font('Helvetica-Oblique')
                .fontSize(8.5)
                .fillColor('#0369a1')
                .text(`Explanation: ${q.explanation}`, 65)
                .fillColor('#000000');
            }
          } else {
            // Theory Question
            if (isAnswerKey) {
              // Answer Key / Marking Rubric
              doc.moveDown(0.3);
              doc
                .font('Helvetica-Bold')
                .fontSize(9)
                .fillColor('#b91c1c')
                .text('MODEL ANSWER / MARKING CRITERIA:', 65)
                .fillColor('#000000');

              doc
                .font('Helvetica')
                .fontSize(9)
                .text(q.correctAnswer, 65);

              const rubrics = q.gradingPoints as any[];
              if (rubrics && rubrics.length > 0) {
                doc.moveDown(0.2);
                doc
                  .font('Helvetica-Bold')
                  .fontSize(8.5)
                  .text('Grading Rubric Breakdown:', 65);

                for (const r of rubrics) {
                  doc
                    .font('Helvetica')
                    .fontSize(8.5)
                    .text(`• ${r.concept}: ${r.weight} marks`, 75);
                }
              }

              if (q.explanation) {
                doc.moveDown(0.2);
                doc
                  .font('Helvetica-Oblique')
                  .fontSize(8.5)
                  .fillColor('#0369a1')
                  .text(`Grading Notes: ${q.explanation}`, 65)
                  .fillColor('#000000');
              }
            } else {
              // Student paper: render designated lined blank writing space
              const lines = config.writingSpaceLines || 5;
              doc.moveDown(0.4);
              for (let line = 0; line < lines; line++) {
                const lineY = doc.y + 14;
                if (lineY > doc.page.height - 50) {
                  doc.addPage();
                }
                doc
                  .strokeColor('#cbd5e1')
                  .lineWidth(0.5)
                  .moveTo(65, doc.y + 14)
                  .lineTo(pageWidth + 45, doc.y + 14)
                  .stroke();
                doc.moveDown(0.65);
              }
              doc.strokeColor('#000000');
            }
          }

          doc.moveDown(0.8);
          questionNumber++;
        }

        // ================= PAGE NUMBERING =================
        const pageRange = doc.bufferedPageRange();
        for (let i = 0; i < pageRange.count; i++) {
          doc.switchToPage(i);
          doc
            .font('Helvetica')
            .fontSize(8)
            .fillColor('#64748b')
            .text(
              `Brain Buzz Academic System — Page ${i + 1} of ${pageRange.count}`,
              45,
              doc.page.height - 30,
              { align: 'center', width: pageWidth }
            );
        }

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  },
};
