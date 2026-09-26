// src/seed/faculties/fbms.ts
import type { SeedFaculty } from '../types.js';

export const fbmsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Basic Medical Sciences',
  code: 'FBMS',
  departments: [
    {
      deptName: 'Anatomy',
      code: 'ANA',
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
          code: 'ANA 201',
          title: 'Gross Anatomy of Upper & Lower Limbs',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which bone is the longest and strongest in the human body?', options: ['Humerus', 'Femur', 'Tibia', 'Fibula'], correctAnswer: 'Femur' },
            { type: 'cbt', question: 'Which major nerve passes through the carpal tunnel of the wrist?', options: ['Radial nerve', 'Median nerve', 'Ulnar nerve', 'Sciatic nerve'], correctAnswer: 'Median nerve' },
            { type: 'cbt', question: 'How many pairs of ribs are found in the normal human thoracic cage?', options: ['10 pairs', '12 pairs', '14 pairs', '24 pairs'], correctAnswer: '12 pairs' },
          ],
        },
        {
          code: 'ANA 202',
          title: 'General Embryology & Histology',
          level: 200,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What are the three primary germ layers formed during human gastrulation?', options: ['Ectoderm, Mesoderm, Endoderm', 'Epidermis, Dermis, Hypodermis', 'Cortex, Medulla, Stroma', 'Epithelium, Endothelium, Mesothelium'], correctAnswer: 'Ectoderm, Mesoderm, Endoderm' },
            { type: 'cbt', question: 'Which epithelial tissue type lines the alveoli of the lungs for rapid gas exchange?', options: ['Simple squamous epithelium', 'Stratified columnar epithelium', 'Transitional epithelium', 'Pseudostratified ciliated epithelium'], correctAnswer: 'Simple squamous epithelium' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ANA 301', title: 'Neuroanatomy & Head and Neck', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ANA 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ANA 401', title: 'Advanced Histochemistry & Anatomical Research', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ANA 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Physiology',
      code: 'PHS',
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
          code: 'PHS 201',
          title: 'Cardiovascular and Respiratory Physiology',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is recognized as the natural pacemaker of the human heart?', options: ['Atrioventricular (AV) node', 'Sinoatrial (SA) node', 'Bundle of His', 'Purkinje fibers'], correctAnswer: 'Sinoatrial (SA) node' },
            { type: 'cbt', question: 'What is the normal resting arterial blood pressure for a healthy young adult?', options: ['80/120 mmHg', '120/80 mmHg', '140/90 mmHg', '100/60 mmHg'], correctAnswer: '120/80 mmHg' },
            { type: 'cbt', question: 'What is the normal physiological pH range of arterial human blood?', options: ['6.80 - 7.00', '7.35 - 7.45', '7.80 - 8.00', '6.00 - 6.50'], correctAnswer: '7.35 - 7.45' },
          ],
        },
        {
          code: 'PHS 202',
          title: 'Renal, Gastrointestinal and Endocrine Physiology',
          level: 200,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is the basic functional structural unit of the human kidney?', options: ['Neuron', 'Nephron', 'Glomerulus only', 'Alveolus'], correctAnswer: 'Nephron' },
            { type: 'cbt', question: 'Which hormone produced by the beta cells of the pancreatic islets lowers blood glucose levels?', options: ['Glucagon', 'Insulin', 'Cortisol', 'Thyroxine'], correctAnswer: 'Insulin' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PHS 301', title: 'Neurophysiology & Sensory Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PHS 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PHS 401', title: 'Environmental & Exercise Physiology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PHS 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Medical Laboratory Science',
      code: 'MLS',
      courses: [
        // 100 Level
        {
          code: 'MLS 101',
          title: 'Introduction to Medical Laboratory Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary role of a Medical Laboratory Scientist?', options: ['Perform complex surgical operations', 'Analyze biological specimens (blood, urine, tissues) to aid medical diagnosis and treatment', 'Prescribe medications to patients', 'Manage hospital admissions'], correctAnswer: 'Analyze biological specimens (blood, urine, tissues) to aid medical diagnosis and treatment' },
            { type: 'cbt', question: 'Which anticoagulant is standard in purple/lavender-top blood collection tubes for Complete Blood Count (CBC)?', options: ['Sodium citrate', 'EDTA (Ethylenediaminetetraacetic acid)', 'Heparin', 'Sodium fluoride'], correctAnswer: 'EDTA (Ethylenediaminetetraacetic acid)' },
          ],
        },
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
          code: 'MLS 201',
          title: 'Clinical Chemistry & Haematology Techniques',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary iron-containing oxygen-transport metalloprotein in red blood cells?', options: ['Myoglobin', 'Hemoglobin', 'Albumin', 'Ferritin'], correctAnswer: 'Hemoglobin' },
            { type: 'cbt', question: 'Which staining technique is standard in hematology to differentiate peripheral blood cells under microscopy?', options: ['Gram stain', 'Leishman / Romanowsky stain', 'Acid-fast stain', 'Sudan black stain'], correctAnswer: 'Leishman / Romanowsky stain' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MLS 301', title: 'Medical Microbiology & Parasitology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MLS 399', title: 'SIWES Hospital Internship', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MLS 401', title: 'Histopathology & Immunohaematology', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'MLS 501', title: 'Clinical Diagnostic Practicum & Research Project', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MLS 599', title: 'B.MLS Final Year Research Project', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
