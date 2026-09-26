// src/seed/faculties/fns.ts
import type { SeedFaculty } from '../types.js';

export const fnsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Nursing Sciences',
  code: 'FNS',
  departments: [
    {
      deptName: 'Mental Health/Psychiatric Nursing',
      code: 'MHN',
      courses: [
        // 100 Level
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MHN 201',
          title: 'Foundations of Psychiatric Nursing',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary therapeutic goal in psychiatric mental health nursing?', options: ['Sedating all agitated patients', 'Establishing a therapeutic nurse-client relationship to promote optimal mental functioning', 'Administering electric shock without consent', 'Enforcing institutional isolation'], correctAnswer: 'Establishing a therapeutic nurse-client relationship to promote optimal mental functioning' },
            { type: 'cbt', question: 'Which communication technique is considered non-therapeutic in psychiatric nursing?', options: ['Active listening', 'Giving false reassurance ("Don\'t worry, everything will be fine")', 'Open-ended questioning', 'Reflecting feelings'], correctAnswer: 'Giving false reassurance ("Don\'t worry, everything will be fine")' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MHN 301', title: 'Therapeutic Communication & Psychosocial Interventions', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MHN 399', title: 'SIWES Hospital Clinical Practicum', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MHN 401', title: 'Care of Patients with Acute & Chronic Mental Disorders', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'MHN 501', title: 'Community Mental Health & Psychiatric Rehabilitation', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MHN 599', title: 'B.NSc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Medical/Surgical Nursing',
      code: 'MSN',
      courses: [
        // 100 Level
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MSN 201',
          title: 'Foundations of Medical-Surgical Nursing',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the priority nursing assessment in the immediate postoperative recovery period (PACU)?', options: ['Bowel sounds', 'Airway patency and respiratory adequacy', 'Urine output over 24 hours', 'Surgical scar appearance'], correctAnswer: 'Airway patency and respiratory adequacy' },
            { type: 'cbt', question: 'Which vital sign observation is an early warning sign of hypovolemic shock in surgical patients?', options: ['Bradycardia and hypertension', 'Tachycardia and falling blood pressure (hypotension)', 'Flushed dry skin', 'Decreased respiratory rate'], correctAnswer: 'Tachycardia and falling blood pressure (hypotension)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MSN 301', title: 'Nursing Care in Cardiovascular, Respiratory & GI Disorders', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MSN 399', title: 'SIWES Hospital Clinical Practicum', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MSN 401', title: 'Critical Care Nursing, Trauma & Oncology', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'MSN 501', title: 'Advanced Surgical Nursing & Perioperative Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MSN 599', title: 'B.NSc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Maternal and Child Health Nursing',
      code: 'MCN',
      courses: [
        // 100 Level
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MCN 201',
          title: 'Reproductive Health & Embryology in Nursing',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the normal fetal heart rate range during pregnancy and labor?', options: ['60 - 100 beats per minute', '110 - 160 beats per minute', '180 - 220 beats per minute', '40 - 80 beats per minute'], correctAnswer: '110 - 160 beats per minute' },
            { type: 'cbt', question: 'What is the Apgar score utilized for in neonatal nursing?', options: ['Assessing newborn physical transition immediately at 1 and 5 minutes after birth', 'Calculating breastmilk formula volume', 'Determining baby eye color', 'Estimating adult height'], correctAnswer: 'Assessing newborn physical transition immediately at 1 and 5 minutes after birth' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MCN 301', title: 'Midwifery & Antenatal Nursing Care', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MCN 399', title: 'SIWES Hospital Clinical Practicum', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MCN 401', title: 'Intrapartum, Postpartum & Neonatal Nursing', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'MCN 501', title: 'High-Risk Obstetric Nursing & Gynecologic Care', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MCN 599', title: 'B.NSc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Public/Community Health Nursing',
      code: 'PHN',
      courses: [
        // 100 Level
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PHN 201',
          title: 'Introduction to Community Health Nursing & Epidemiology',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What level of disease prevention is represented by childhood immunizations (e.g. BCG, Polio)?', options: ['Primary prevention', 'Secondary prevention', 'Tertiary prevention', 'Quaternary prevention'], correctAnswer: 'Primary prevention' },
            { type: 'cbt', question: 'What is endemic disease in community epidemiology?', options: ['A worldwide outbreak across continents', 'The constant habitual presence of a disease within a given geographic area', 'A single isolated case', 'A laboratory-created infection'], correctAnswer: 'The constant habitual presence of a disease within a given geographic area' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PHN 301', title: 'Primary Health Care & Environmental Health', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PHN 399', title: 'SIWES Community Health Practicum', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PHN 401', title: 'Family Health, School Health & Immunization Services', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'PHN 501', title: 'Public Health Administration & Community Health Practicum', level: 500, semester: 'harmattan', questions: [] },
        { code: 'PHN 599', title: 'B.NSc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
