import * as XLSX from 'xlsx';
import { eq, and, or, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import {
  questionsTable,
  questionVersionsTable,
  courseOfferingsTable,
  offeringLecturersTable,
  courseAssignmentsTable,
  usersTable,
  type GradingPoint,
} from '../db/schema.js';
import { questionWorkflowService, type CreateDraftInput } from './questionWorkflowService.js';
import { auditService } from './admin/auditService.js';
import type { AuditContextInput } from '../types/admin.types.js';
import logger from '../config/logger.js';

export interface ParsedImportRow {
  rowIndex: number;
  type: 'cbt' | 'theory';
  question: string;
  options?: string[] | undefined;
  correctAnswer: string;
  gradingPoints?: GradingPoint[] | undefined;
  explanation?: string | undefined;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  isValid: boolean;
  errors: string[];
  isDuplicateInFile?: boolean | undefined;
  isDuplicateInBank?: boolean | undefined;
  existingQuestionId?: string | undefined;
}

export interface ImportPreviewResult {
  totalRows: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
  canImport: boolean;
  rows: ParsedImportRow[];
  importedCount?: number;
  importedQuestions?: any[];
}

/**
 * Normalizes question text for duplicate detection (lowercase, remove excess punctuation & whitespace).
 */
export function normalizeQuestionText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export const questionImportService = {
  /**
   * Generates a structured Excel (.xlsx) template workbook.
   */
  generateExcelTemplate: (): Buffer => {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Questions Template
    const templateData = [
      {
        'Type*': 'cbt',
        'Question*': 'What is the primary function of an Operating System?',
        'Option A': 'Manage hardware resources',
        'Option B': 'Compile source code into binary',
        'Option C': 'Design web layouts and stylesheets',
        'Option D': 'Generate raster graphics',
        'Correct Answer*': 'Manage hardware resources',
        'Points': 2,
        'Difficulty': 'medium',
        'Explanation': 'The OS serves as an intermediary between user applications and system hardware.',
        'Theory Rubric': '',
      },
      {
        'Type*': 'theory',
        'Question*': 'Explain the difference between concurrency and parallelism.',
        'Option A': '',
        'Option B': '',
        'Option C': '',
        'Option D': '',
        'Correct Answer*': 'Concurrency is dealing with multiple tasks concurrently; parallelism is executing them simultaneously on multiple processor cores.',
        'Points': 5,
        'Difficulty': 'hard',
        'Explanation': 'Concurrency is about program structure; parallelism is about simultaneous execution.',
        'Theory Rubric': 'Definition of concurrency:2.5|Definition of parallelism:2.5',
      },
    ];

    const wsQuestions = XLSX.utils.json_to_sheet(templateData);

    // Set column widths for comfortable reading
    wsQuestions['!cols'] = [
      { wch: 10 }, // Type
      { wch: 45 }, // Question
      { wch: 25 }, // Option A
      { wch: 25 }, // Option B
      { wch: 25 }, // Option C
      { wch: 25 }, // Option D
      { wch: 30 }, // Correct Answer
      { wch: 8 },  // Points
      { wch: 12 }, // Difficulty
      { wch: 40 }, // Explanation
      { wch: 40 }, // Theory Rubric
    ];

    // Sheet 2: Detailed Instructions
    const instructionsData = [
      {
        'Field': 'Type*',
        'Required': 'YES',
        'Allowed Values': 'cbt OR theory',
        'Instructions': 'Specifies question evaluation type. "cbt" is auto-evaluated multiple choice; "theory" is open-ended.',
      },
      {
        'Field': 'Question*',
        'Required': 'YES',
        'Allowed Values': 'Plain text / Markdown',
        'Instructions': 'The prompt or question problem statement.',
      },
      {
        'Field': 'Option A - D',
        'Required': 'For CBT (min 2)',
        'Allowed Values': 'Text',
        'Instructions': 'Choices for CBT questions. Provide at least Option A and Option B. Leave empty for theory.',
      },
      {
        'Field': 'Correct Answer*',
        'Required': 'YES',
        'Allowed Values': 'Matching option (CBT) or model answer (Theory)',
        'Instructions': 'For CBT: MUST match one of the provided options verbatim. For Theory: Model answer or key points.',
      },
      {
        'Field': 'Points',
        'Required': 'NO (Default: 1)',
        'Allowed Values': 'Positive integer or decimal',
        'Instructions': 'Grading marks awarded for a completely correct answer.',
      },
      {
        'Field': 'Difficulty',
        'Required': 'NO (Default: medium)',
        'Allowed Values': 'easy, medium, hard',
        'Instructions': 'Question difficulty category.',
      },
      {
        'Field': 'Explanation',
        'Required': 'NO',
        'Allowed Values': 'Text',
        'Instructions': 'Pedagogical explanation or solution notes shown during review.',
      },
      {
        'Field': 'Theory Rubric',
        'Required': 'NO',
        'Allowed Values': 'Concept:Weight|Concept:Weight',
        'Instructions': 'For theory questions only. Pipe-separated concept criteria, e.g. "Definition:2|Examples:3".',
      },
    ];

    const wsInstructions = XLSX.utils.json_to_sheet(instructionsData);
    wsInstructions['!cols'] = [
      { wch: 18 },
      { wch: 15 },
      { wch: 30 },
      { wch: 65 },
    ];

    XLSX.utils.book_append_sheet(wb, wsQuestions, 'Questions Template');
    XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    return buffer as Buffer;
  },

  /**
   * Parses, validates, checks duplicates, and optionally imports questions from Excel, CSV, or JSON.
   */
  processImport: async (
    lecturerId: string,
    offeringId: string,
    fileBuffer: Buffer,
    fileType: 'xlsx' | 'csv' | 'json',
    options: {
      confirm?: boolean;
      allowPartial?: boolean;
      auditContext?: AuditContextInput;
    } = {}
  ): Promise<ImportPreviewResult> => {
    // 1. Verify offering and lecturer assignment
    const [offering] = await db
      .select({
        id: courseOfferingsTable.id,
        courseId: courseOfferingsTable.courseId,
        status: courseOfferingsTable.status,
      })
      .from(courseOfferingsTable)
      .where(eq(courseOfferingsTable.id, offeringId as any));

    if (!offering) {
      throw new Error('Course offering not found.');
    }

    // Check lecturer assignment
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
      // Fallback check course assignments
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
        throw new Error('Forbidden. Lecturer is not assigned to this course offering.');
      }
    }

    // 2. Fetch existing questions in this course offering / course bank for duplicate detection
    const existingQuestions = await db
      .select({
        id: questionsTable.id,
        question: questionsTable.question,
      })
      .from(questionsTable)
      .where(
        or(
          eq(questionsTable.originOfferingId, offeringId as any),
          eq(questionsTable.courseId, offering.courseId as any)
        )
      );

    const existingMap = new Map<string, string>();
    for (const eqRow of existingQuestions) {
      existingMap.set(normalizeQuestionText(eqRow.question), eqRow.id);
    }

    // 3. Extract raw rows according to file type
    let rawItems: any[] = [];

    if (fileType === 'xlsx') {
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const sheetName =
        workbook.SheetNames.find((s) => s.toLowerCase().includes('question')) ||
        workbook.SheetNames[0];

      if (!sheetName) {
        throw new Error('No sheets found in Excel workbook.');
      }
      const sheet = workbook.Sheets[sheetName];
      rawItems = XLSX.utils.sheet_to_json(sheet!, { defval: '' });
    } else if (fileType === 'csv') {
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]!];
      rawItems = XLSX.utils.sheet_to_json(firstSheet!, { defval: '' });
    } else if (fileType === 'json') {
      try {
        const text = fileBuffer.toString('utf-8');
        const parsed = JSON.parse(text);
        rawItems = Array.isArray(parsed) ? parsed : [parsed];
      } catch (e: any) {
        throw new Error(`Invalid JSON format: ${e.message}`);
      }
    }

    if (!rawItems.length) {
      return {
        totalRows: 0,
        validCount: 0,
        invalidCount: 0,
        duplicateCount: 0,
        canImport: false,
        rows: [],
      };
    }

    // 4. Parse, normalize, and validate each row
    const parsedRows: ParsedImportRow[] = [];
    const seenPromptsInFile = new Set<string>();
    let duplicateCount = 0;

    for (let i = 0; i < rawItems.length; i++) {
      const row = rawItems[i];
      const rowIndex = i + 1;
      const errors: string[] = [];

      // Extract raw properties with case/space tolerance
      const getVal = (...keys: string[]): string => {
        for (const k of keys) {
          for (const rowKey of Object.keys(row)) {
            if (rowKey.trim().toLowerCase() === k.toLowerCase()) {
              const val = row[rowKey];
              return val !== undefined && val !== null ? String(val).trim() : '';
            }
          }
        }
        return '';
      };

      const rawType = getVal('type*', 'type', 'questiontype', 'question_type').toLowerCase();
      const questionPrompt = getVal('question*', 'question', 'prompt', 'questiontext');
      const optA = getVal('option a', 'option_a', 'optiona', 'opt1', 'opta');
      const optB = getVal('option b', 'option_b', 'optionb', 'opt2', 'optb');
      const optC = getVal('option c', 'option_c', 'optionc', 'opt3', 'optc');
      const optD = getVal('option d', 'option_d', 'optiond', 'opt4', 'optd');
      const rawOptionsStr = getVal('options');
      const correctAnswer = getVal('correct answer*', 'correct answer', 'correctanswer', 'answer', 'model answer');
      const rawPoints = getVal('points', 'marks', 'maxmarks', 'max_marks');
      const rawDifficulty = getVal('difficulty', 'diff').toLowerCase();
      const explanation = getVal('explanation', 'solution', 'notes');
      const theoryRubric = getVal('theory rubric', 'theoryrubric', 'rubric', 'gradingpoints');

      // Validation
      const type: 'cbt' | 'theory' = rawType === 'theory' ? 'theory' : 'cbt';
      if (!['cbt', 'theory'].includes(rawType)) {
        errors.push(`Invalid question type "${rawType}". Must be "cbt" or "theory".`);
      }

      if (!questionPrompt) {
        errors.push('Question prompt is required.');
      }

      // Assemble options for CBT
      let optionsList: string[] | undefined = undefined;
      if (type === 'cbt') {
        const collected: string[] = [];
        if (optA) collected.push(optA);
        if (optB) collected.push(optB);
        if (optC) collected.push(optC);
        if (optD) collected.push(optD);

        if (collected.length === 0 && rawOptionsStr) {
          // Check for pipe-separated or comma-separated options
          const split = rawOptionsStr.includes('|')
            ? rawOptionsStr.split('|')
            : rawOptionsStr.split(',');
          collected.push(...split.map((s) => s.trim()).filter(Boolean));
        }

        if (Array.isArray(row.options)) {
          collected.push(...row.options.map((s: any) => String(s).trim()).filter(Boolean));
        }

        optionsList = Array.from(new Set(collected));

        if (optionsList.length < 2) {
          errors.push('CBT questions require at least 2 distinct options (e.g. Option A and Option B).');
        }

        if (!correctAnswer) {
          errors.push('Correct Answer is required for CBT questions.');
        } else {
          // Check matching option (case-insensitive)
          const matched = optionsList.find(
            (o) => o.toLowerCase() === correctAnswer.toLowerCase()
          );
          if (!matched) {
            errors.push(
              `Correct answer "${correctAnswer}" must match one of the provided options (${optionsList.join(', ')}).`
            );
          }
        }
      } else {
        // Theory
        if (!correctAnswer) {
          errors.push('Model answer / correct explanation is required for Theory questions.');
        }
      }

      // Points
      let points = 1;
      if (rawPoints) {
        const parsedP = parseFloat(rawPoints);
        if (isNaN(parsedP) || parsedP <= 0) {
          errors.push('Points must be a positive number.');
        } else {
          points = parsedP;
        }
      }

      // Difficulty
      let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
      if (rawDifficulty) {
        if (['easy', 'medium', 'hard'].includes(rawDifficulty)) {
          difficulty = rawDifficulty as any;
        } else {
          errors.push(`Difficulty "${rawDifficulty}" must be easy, medium, or hard.`);
        }
      }

      // Theory Rubric
      let gradingPoints: GradingPoint[] | undefined = undefined;
      if (type === 'theory') {
        if (Array.isArray(row.gradingPoints)) {
          gradingPoints = row.gradingPoints;
        } else if (Array.isArray(row.grading_points)) {
          gradingPoints = row.grading_points;
        } else if (theoryRubric && typeof theoryRubric === 'string' && theoryRubric.trim() !== '') {
          try {
            const trimmedRubric = theoryRubric.trim();
            if (trimmedRubric.startsWith('[') && trimmedRubric.endsWith(']')) {
              gradingPoints = JSON.parse(trimmedRubric);
            } else if (trimmedRubric.includes(':')) {
              // Parse pipe-separated format: Concept:Weight|Concept2:Weight
              const parts = trimmedRubric.split('|');
              gradingPoints = parts.map((part) => {
                const [c, w] = part.split(':');
                return {
                  concept: (c || '').trim(),
                  weight: parseFloat(w || '1') || 1,
                };
              });
            }
          } catch {
            errors.push('Failed to parse Theory Rubric. Expected "Concept:Weight|Concept:Weight".');
          }
        }
      }

      // Duplicate checks
      const normPrompt = normalizeQuestionText(questionPrompt);
      let isDuplicateInFile = false;
      let isDuplicateInBank = false;
      let existingQuestionId: string | undefined = undefined;

      if (normPrompt) {
        if (seenPromptsInFile.has(normPrompt)) {
          isDuplicateInFile = true;
          duplicateCount++;
          errors.push('Duplicate question prompt detected within this file.');
        } else {
          seenPromptsInFile.add(normPrompt);
        }

        if (existingMap.has(normPrompt)) {
          isDuplicateInBank = true;
          existingQuestionId = existingMap.get(normPrompt);
          duplicateCount++;
          // Warning rather than fatal error if user wants to allow
          errors.push('A question with very similar text already exists in this course question bank.');
        }
      }

      const isValid = errors.length === 0;

      parsedRows.push({
        rowIndex,
        type,
        question: questionPrompt,
        options: optionsList,
        correctAnswer,
        gradingPoints,
        explanation: explanation || undefined,
        points,
        difficulty,
        isValid,
        errors,
        isDuplicateInFile,
        isDuplicateInBank,
        existingQuestionId,
      });
    }

    const validCount = parsedRows.filter((r) => r.isValid).length;
    const invalidCount = parsedRows.length - validCount;
    const canImport = options.allowPartial ? validCount > 0 : invalidCount === 0 && validCount > 0;

    // 5. If confirm === true, execute bulk creation
    if (options.confirm && canImport) {
      const rowsToImport = options.allowPartial
        ? parsedRows.filter((r) => r.isValid)
        : parsedRows;

      const importedQuestions: any[] = [];

      for (const row of rowsToImport) {
        if (!row.isValid) continue;

        const draftInput: CreateDraftInput = {
          type: row.type,
          question: row.question,
          options: row.type === 'cbt' ? row.options : null,
          correctAnswer: row.correctAnswer,
          gradingPoints: row.type === 'theory' ? row.gradingPoints : undefined,
          explanation: row.explanation,
          points: row.points,
          difficulty: row.difficulty,
        };

        const created = await questionWorkflowService.createDraft(
          lecturerId,
          offeringId,
          draftInput,
          options.auditContext
        );

        importedQuestions.push(created);
      }

      logger.info(
        `[BULK IMPORT] Successfully imported ${importedQuestions.length} questions into offering ${offeringId} by lecturer ${lecturerId}`
      );

      return {
        totalRows: parsedRows.length,
        validCount,
        invalidCount,
        duplicateCount,
        canImport,
        rows: parsedRows,
        importedCount: importedQuestions.length,
        importedQuestions,
      };
    }

    return {
      totalRows: parsedRows.length,
      validCount,
      invalidCount,
      duplicateCount,
      canImport,
      rows: parsedRows,
    };
  },
};
