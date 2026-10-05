// src/seed/faculties/fmgs.ts
import type { SeedFaculty } from '../types.js';
import { accCourses } from './fmgs/acc.js';
import { mktCourses } from './fmgs/mkt.js';
import { mgtCourses } from './fmgs/mgt.js';
import { trmCourses } from './fmgs/trm.js';

export const fmgsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Management Sciences',
  code: 'FMGS',
  departments: [
    {
      deptName: 'Accounting',
      code: 'ACC',
      courses: accCourses,
    },
    {
      deptName: 'Marketing',
      code: 'MKT',
      courses: mktCourses,
    },
    {
      deptName: 'Management and Accounting',
      code: 'MGT',
      courses: mgtCourses,
    },
    {
      deptName: 'Transport Management',
      code: 'TRM',
      courses: trmCourses,
    },
  ],
};
