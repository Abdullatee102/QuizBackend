// src/seed/faculties/fci.ts
import type { SeedFaculty } from '../types.js';
import { csc100Courses } from './fci/csc100.js';
import { csc200Courses } from './fci/csc200.js';
import { csc300Courses } from './fci/csc300.js';
import { csc400Courses } from './fci/csc400.js';
import { csc500Courses } from './fci/csc500.js';
import { cyb100Courses } from './fci/cyb100.js';
import { cyb200Courses } from './fci/cyb200.js';
import { cyb300Courses } from './fci/cyb300.js';
import { cyb400Courses } from './fci/cyb400.js';
import { cyb500Courses } from './fci/cyb500.js';
import { ins100Courses } from './fci/ins100.js';
import { ins200Courses } from './fci/ins200.js';
import { ins300Courses } from './fci/ins300.js';
import { ins400Courses } from './fci/ins400.js';
import { ins500Courses } from './fci/ins500.js';

export const fciFaculty: SeedFaculty = {
  facultyName: 'Faculty of Computing and Informatics',
  code: 'FCI',
  departments: [
    {
      deptName: 'Computer Science',
      code: 'CSC',
      courses: [
        ...csc100Courses,
        ...csc200Courses,
        ...csc300Courses,
        ...csc400Courses,
        ...csc500Courses,
      ],
    },
    {
      deptName: 'Cyber Security Science',
      code: 'CYB',
      courses: [
        ...cyb100Courses,
        ...cyb200Courses,
        ...cyb300Courses,
        ...cyb400Courses,
        ...cyb500Courses,
      ],
    },
    {
      deptName: 'Information Systems',
      code: 'INS',
      courses: [
        ...ins100Courses,
        ...ins200Courses,
        ...ins300Courses,
        ...ins400Courses,
        ...ins500Courses,
      ],
    },
  ],
};
