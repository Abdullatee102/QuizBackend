// src/seed/faculties/frnr.ts
import type { SeedFaculty } from '../types.js';
import { frmCourses } from './frnr/frm.js';
import { wemCourses } from './frnr/wem.js';
import { afmCourses } from './frnr/afm.js';

export const frnrFaculty: SeedFaculty = {
  facultyName: 'Faculty of Renewable Natural Resources',
  code: 'FRNR',
  departments: [
    {
      deptName: 'Forest Resource Management',
      code: 'FRM',
      courses: frmCourses,
    },
    {
      deptName: 'Wildlife and Ecotourism Management',
      code: 'WEM',
      courses: wemCourses,
    },
    {
      deptName: 'Aquaculture and Fisheries Management',
      code: 'AFM',
      courses: afmCourses,
    },
  ],
};
