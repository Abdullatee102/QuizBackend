// src/seed/faculties/ffcs.ts
import type { SeedFaculty } from '../types.js';
import { fstCourses } from './ffcs/fst.js';
import { ntdCourses } from './ffcs/ntd.js';
import { cfsCourses } from './ffcs/cfs.js';
import { htmCourses } from './ffcs/htm.js';

export const ffcsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Food and Consumer Sciences',
  code: 'FFCS',
  departments: [
    {
      deptName: 'Food Science',
      code: 'FST',
      courses: fstCourses,
    },
    {
      deptName: 'Nutrition and Dietetics',
      code: 'NTD',
      courses: ntdCourses,
    },
    {
      deptName: 'Consumer and Food Science',
      code: 'CFS',
      courses: cfsCourses,
    },
    {
      deptName: 'Hospitality and Tourism Management',
      code: 'HTM',
      courses: htmCourses,
    },
  ],
};
