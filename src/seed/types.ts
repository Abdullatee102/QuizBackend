// QuizBackend/src/seed/types.ts

export type GradingPoint = {
  concept: string;
  weight: number;
  aliases?: string[];
};

export type SeedQuestion = {
  type: 'cbt' | 'theory';
  question: string;
  options: string[];
  correctAnswer: string;
  gradingPoints?: GradingPoint[];
};

export type SeedCourse = {
  code: string;
  title: string;
  level: number;
  semester: string;
  questions: SeedQuestion[];
};

export type SeedDepartment = {
  deptName: string;
  code: string;
  courses: SeedCourse[];
};

export type SeedFaculty = {
  facultyName: string;
  code: string;
  departments: SeedDepartment[];
};
