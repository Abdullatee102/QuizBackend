import type { Request } from 'express';
import type { UserRole, AccountStatus, AssignmentStatus } from '../db/schema.js';

export interface LecturerUserPayload {
  id: string;
  email: string;
  fullName: string;
  username?: string | null;
  role: UserRole;
  status: AccountStatus;
  facultyId?: string | null;
  departmentId?: string | null;
}

export interface LecturerAuthenticatedRequest extends Request {
  lecturerUser?: LecturerUserPayload;
  assignedCourse?: any;
}

export interface LecturerDashboardOverview {
  lecturer: {
    id: string;
    fullName: string;
    email: string | null;
    username: string | null;
    facultyName: string | null;
    departmentName: string | null;
  };
  metrics: {
    assignedCoursesCount: number;
    activeSessionsCount: number;
    activeSessions: string[];
  };
  recentAssignments: Array<{
    assignmentId: string;
    courseId: string;
    courseCode: string;
    courseTitle: string;
    level: number;
    semester: string;
    catalogueSemester?: string | null;
    academicSession: string;
    assignedAt: Date;
  }>;
}

export interface CourseAssignmentRecord {
  id: string;
  lecturerId: string;
  courseId: string;
  academicSession: string;
  semester: string;
  status: AssignmentStatus;
  assignedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}
