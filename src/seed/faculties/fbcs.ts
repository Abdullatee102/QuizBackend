// src/seed/faculties/fbcs.ts
import type { SeedFaculty } from '../types.js';

export const fbcsFaculty: SeedFaculty = {
    facultyName: 'Faculty of Basic Clinical Sciences',
    code: 'FBCS',
    departments: [
      {
        deptName: 'Chemical Pathology',
        code: 'CPT',
        courses: [
          { code: 'CPT 301', title: 'Clinical Chemistry & Metabolic Disorders', level: 300, semester: 'harmattan', questions: [] },
          { code: 'CPT 401', title: 'Endocrinology, Toxicology & Diagnostic Enzymology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'CPT 501', title: 'Advanced Chemical Pathology & Quality Assurance', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Haematology and Blood Transfusion',
        code: 'HBT',
        courses: [
          { code: 'HBT 301', title: 'Basic Haematology & Hemostasis', level: 300, semester: 'harmattan', questions: [] },
          { code: 'HBT 401', title: 'Blood Transfusion Science & Immunohematology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'HBT 501', title: 'Haematological Malignancies & Advanced Hemostasis', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Medical Microbiology and Parasitology',
        code: 'MMP',
        courses: [
          { code: 'MMP 301', title: 'Bacteriology & Medical Mycology', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MMP 401', title: 'Medical Virology & Parasitology', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MMP 501', title: 'Antimicrobial Chemotherapy & Public Health Microbiology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Morbid Anatomy & Histopathology',
        code: 'MAH',
        courses: [
          { code: 'MAH 301', title: 'General Pathology & Cellular Adaptations', level: 300, semester: 'harmattan', questions: [] },
          { code: 'MAH 401', title: 'Systemic Pathology & Autopsy Techniques', level: 400, semester: 'harmattan', questions: [] },
          { code: 'MAH 501', title: 'Diagnostic Cytopathology & Forensic Pathology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
      {
        deptName: 'Pharmacology & Therapeutics',
        code: 'PHT',
        courses: [
          { code: 'PHT 301', title: 'General Pharmacology & Autonomic Nervous System Drugs', level: 300, semester: 'harmattan', questions: [] },
          { code: 'PHT 401', title: 'Cardiovascular, CNS & Chemotherapeutic Agents', level: 400, semester: 'harmattan', questions: [] },
          { code: 'PHT 501', title: 'Clinical Pharmacology & Toxicology', level: 500, semester: 'harmattan', questions: [] },
        ],
      },
    ],
  };
