// src/seed/faculties/fpas.ts
import type { SeedFaculty } from '../types.js';

export const fpasFaculty: SeedFaculty = {
  facultyName: 'Faculty of Pure and Applied Sciences',
  code: 'FPAS',
  departments: [
    {
      deptName: 'Pure and Applied Mathematics',
      code: 'PAM',
      courses: [
        // 100 Level
        {
          code: 'PAM 101',
          title: 'Elementary Mathematics I (Algebra & Trigonometry)',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the roots of the quadratic equation x^2 - 5x + 6 = 0?', options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = 0, 5'], correctAnswer: 'x = 2, 3' },
            { type: 'cbt', question: 'What is the value of sin(90°)?', options: ['0', '0.5', '1', 'Undefined'], correctAnswer: '1' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        {
          code: 'MTH 102',
          title: 'Elementary Mathematics II (Calculus)',
          level: 100,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is the derivative of f(x) = x^3 with respect to x?', options: ['3x', '3x^2', 'x^2', '6x'], correctAnswer: '3x^2' },
            {
              type: 'theory',
              question: 'Explain the basic geometric definition of a definite integral using area under a curve.',
              options: [],
              correctAnswer: 'A definite integral represents the net signed area bounded by the function graph, the x-axis, and vertical lines at the limits of integration.',
              gradingPoints: [
                { concept: 'represents net signed area', weight: 0.5, aliases: ['area under curve', 'bounded area'] },
                { concept: 'between function and x-axis over limits', weight: 0.5, aliases: ['from a to b', 'limits of integration'] },
              ],
            },
          ],
        },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PAM 201',
          title: 'Mathematical Methods & Real Analysis',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the limit of (sin x)/x as x approaches 0?', options: ['0', '1', 'Infinity', '-1'], correctAnswer: '1' },
            { type: 'cbt', question: 'A sequence is said to be convergent if it:', options: ['Increases infinitely', 'Approaches a finite limit as n approaches infinity', 'Alternates between positive and negative numbers', 'Has all elements equal to zero'], correctAnswer: 'Approaches a finite limit as n approaches infinity' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PAM 301', title: 'Abstract Algebra & Complex Analysis', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PAM 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PAM 401', title: 'Functional Analysis & Differential Equations', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PAM 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Pure and Applied Physics',
      code: 'PAP',
      courses: [
        // 100 Level
        {
          code: 'PAP 101',
          title: 'General Physics I (Mechanics & Thermal Physics)',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the acceleration due to gravity (g) at standard sea level on Earth?', options: ['8.9 m/s^2', '9.8 m/s^2', '10.8 m/s^2', '12.0 m/s^2'], correctAnswer: '9.8 m/s^2' },
            { type: 'cbt', question: 'What is kinetic energy given by for an object of mass m and velocity v?', options: ['m × v', '0.5 × m × v^2', 'm × g × h', 'm × v^2'], correctAnswer: '0.5 × m × v^2' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PAP 201',
          title: 'Modern Physics & Electromagnetism',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What phenomenon proves the particle nature of light?', options: ['Interference', 'Diffraction', 'Photoelectric effect', 'Refraction'], correctAnswer: 'Photoelectric effect' },
            { type: 'cbt', question: 'What is Planck\'s constant (h) approximately equal to?', options: ['6.626 × 10^-34 J·s', '3.00 × 10^8 m/s', '1.602 × 10^-19 C', '9.109 × 10^-31 kg'], correctAnswer: '6.626 × 10^-34 J·s' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PAP 301', title: 'Quantum Mechanics & Solid State Physics', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PAP 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PAP 401', title: 'Nuclear Physics & Computational Physics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PAP 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Biochemistry',
      code: 'BCH',
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
          code: 'BCH 201',
          title: 'General Biochemistry I (Biomolecules)',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the monomeric building blocks of proteins?', options: ['Fatty acids', 'Nucleotides', 'Amino acids', 'Monosaccharides'], correctAnswer: 'Amino acids' },
            { type: 'cbt', question: 'Which bond links amino acids together in a polypeptide chain?', options: ['Glycosidic bond', 'Peptide bond', 'Phosphodiester bond', 'Hydrogen bond'], correctAnswer: 'Peptide bond' },
            { type: 'cbt', question: 'Which biomolecule carries the primary genetic blueprint in human cells?', options: ['Lipids', 'Carbohydrates', 'DNA (Deoxyribonucleic acid)', 'Proteins'], correctAnswer: 'DNA (Deoxyribonucleic acid)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'BCH 301', title: 'Enzymology & Intermediary Metabolism', level: 300, semester: 'harmattan', questions: [] },
        { code: 'BCH 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'BCH 401', title: 'Molecular Biology & Genetic Engineering', level: 400, semester: 'harmattan', questions: [] },
        { code: 'BCH 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Earth Sciences',
      code: 'EAS',
      courses: [
        // 100 Level
        {
          code: 'EAS 101',
          title: 'Introduction to Physical Geology',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which of the following is the liquid layer of the Earth\'s interior?', options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'], correctAnswer: 'Outer Core' },
            { type: 'cbt', question: 'What type of rock forms from the cooling and solidification of molten magma?', options: ['Sedimentary rock', 'Igneous rock', 'Metamorphic rock', 'Fossiliferous rock'], correctAnswer: 'Igneous rock' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'EAS 201',
          title: 'Mineralogy & Petrology',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What scale is standard for measuring the relative hardness of minerals?', options: ['Richter scale', 'Mohs scale', 'Kelvin scale', 'Beaufort scale'], correctAnswer: 'Mohs scale' },
            { type: 'cbt', question: 'What is the hardest naturally occurring mineral on Mohs scale (hardness 10)?', options: ['Quartz', 'Corundum', 'Topaz', 'Diamond'], correctAnswer: 'Diamond' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'EAS 301', title: 'Structural Geology & Stratigraphy', level: 300, semester: 'harmattan', questions: [] },
        { code: 'EAS 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'EAS 401', title: 'Applied Geophysics & Hydrogeology', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'EAS 501', title: 'Economic Geology & Petroleum Exploration', level: 500, semester: 'harmattan', questions: [] },
        { code: 'EAS 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'General Studies',
      code: 'GST',
      courses: [
        // 100 Level
        {
          code: 'GST 101',
          title: 'Use of English & Communication Skills',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which part of speech is used to connect words, phrases, or clauses?', options: ['Preposition', 'Conjunction', 'Interjection', 'Adverb'], correctAnswer: 'Conjunction' },
            { type: 'cbt', question: 'What is a topic sentence in paragraph writing?', options: ['The final closing sentence of an essay', 'The sentence that expresses the main idea of the paragraph', 'A footnote citation', 'A list of references'], correctAnswer: 'The sentence that expresses the main idea of the paragraph' },
          ],
        },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        {
          code: 'GST 102',
          title: 'Philosophy and Logic',
          level: 100,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is a deductive argument?', options: ['An argument where the conclusion necessarily follows from true premises', 'A guess based on intuition', 'An appeal to popular emotion', 'A fallacy with false conclusions'], correctAnswer: 'An argument where the conclusion necessarily follows from true premises' },
            { type: 'cbt', question: 'What is the ad hominem fallacy?', options: ['Arguing in a circle', 'Attacking the person making the argument rather than addressing the argument itself', 'Appealing to ignorance', 'Assuming correlation implies causation'], correctAnswer: 'Attacking the person making the argument rather than addressing the argument itself' },
          ],
        },

        // 200 Level
        {
          code: 'GST 201',
          title: 'Nigerian Peoples and Culture',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which region of Nigeria was historically characterized by acephalous (segmentary) political systems?', options: ['Old Oyo Empire', 'Pre-colonial Igbo society', 'Sokoto Caliphate', 'Borno Empire'], correctAnswer: 'Pre-colonial Igbo society' },
          ],
        },
        {
          code: 'GST 202',
          title: 'Peace and Conflict Resolution',
          level: 200,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is mediation in conflict resolution?', options: ['Using military force to enforce a ceasefire', 'A voluntary process where an impartial third party assists disputing parties in reaching a settlement', 'Imposing a binding judicial verdict', 'Ignoring the dispute until it fades'], correctAnswer: 'A voluntary process where an impartial third party assists disputing parties in reaching a settlement' },
          ],
        },
      ],
    },
    {
      deptName: 'Pure and Applied Biology',
      code: 'PAB',
      courses: [
        // 100 Level
        {
          code: 'PAB 101',
          title: 'General Biology I (Plant and Animal Biology)',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the powerhouse organelle of the eukaryotic cell responsible for ATP production?', options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Endoplasmic reticulum'], correctAnswer: 'Mitochondrion' },
            { type: 'cbt', question: 'What green pigment in chloroplasts is essential for photosynthesis?', options: ['Carotenoid', 'Chlorophyll', 'Anthocyanin', 'Melanin'], correctAnswer: 'Chlorophyll' },
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
          code: 'PAB 201',
          title: 'Cell Biology & Genetics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What stage of mitosis is characterized by chromosomes aligning at the cell equator?', options: ['Prophase', 'Metaphase', 'Anaphase', 'Telophase'], correctAnswer: 'Metaphase' },
            { type: 'cbt', question: 'According to Mendelian genetics, what is the expected phenotypic ratio in a monohybrid cross of heterozygous parents (Aa × Aa)?', options: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correctAnswer: '3:1' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PAB 301', title: 'Ecology & Developmental Biology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PAB 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PAB 401', title: 'Evolutionary Biology & Biotechnology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PAB 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Pure and Applied Chemistry',
      code: 'PAC',
      courses: [
        // 100 Level
        {
          code: 'PAC 101',
          title: 'General Chemistry I (Physical & Inorganic)',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the atomic number of Carbon?', options: ['6', '8', '12', '14'], correctAnswer: '6' },
            { type: 'cbt', question: 'What type of chemical bond involves the sharing of electron pairs between atoms?', options: ['Ionic bond', 'Covalent bond', 'Metallic bond', 'Hydrogen bond'], correctAnswer: 'Covalent bond' },
          ],
        },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PAC 201',
          title: 'Organic Chemistry I & Analytical Methods',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What functional group characterizes alcohols?', options: ['-COOH (Carboxyl)', '-OH (Hydroxyl)', '-CHO (Aldehyde)', '-NH2 (Amine)'], correctAnswer: '-OH (Hydroxyl)' },
            { type: 'cbt', question: 'What is the general molecular formula for alkanes (saturated hydrocarbons)?', options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'], correctAnswer: 'CnH2n+2' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PAC 301', title: 'Instrumental Methods of Chemical Analysis', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PAC 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PAC 401', title: 'Advanced Physical & Polymer Chemistry', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PAC 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Science Laboratory Technology',
      code: 'SLT',
      courses: [
        // 100 Level
        {
          code: 'SLT 101',
          title: 'Laboratory Techniques & Safety Measures',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary personal protective equipment (PPE) required when handling volatile acids in a laboratory?', options: ['Sunglasses', 'Lab coat, safety goggles, gloves, and working under a fume hood', 'Winter jacket', 'Dust mask only'], correctAnswer: 'Lab coat, safety goggles, gloves, and working under a fume hood' },
            { type: 'cbt', question: 'Which laboratory glassware is specifically calibrated to deliver exact variable volumes of liquid during titration?', options: ['Beaker', 'Burette', 'Conical flask', 'Graduated cylinder'], correctAnswer: 'Burette' },
          ],
        },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'SLT 201',
          title: 'Instrumentation & Analytical Chemistry',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What principle governs the operation of a UV-Visible spectrophotometer?', options: ['Ohm\'s Law', 'Beer-Lambert Law (Absorbance is proportional to concentration)', 'Bernoulli\'s Principle', 'Newton\'s Law of Cooling'], correctAnswer: 'Beer-Lambert Law (Absorbance is proportional to concentration)' },
            { type: 'cbt', question: 'What device is used to separate particles from a solution according to size and density by spinning at high speed?', options: ['Spectrophotometer', 'Centrifuge', 'Autoclave', 'Refractometer'], correctAnswer: 'Centrifuge' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'SLT 301', title: 'Biological & Chemical Laboratory Technology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'SLT 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'SLT 401', title: 'Quality Control & Laboratory Management', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'SLT 501', title: 'Advanced Instrumentation & Project Seminar', level: 500, semester: 'harmattan', questions: [] },
        { code: 'SLT 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Statistics',
      code: 'STA',
      courses: [
        // 100 Level
        {
          code: 'STA 101',
          title: 'Descriptive Statistics & Probability',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the arithmetic mean of the dataset {4, 8, 6, 10, 12}?', options: ['6', '7', '8', '9'], correctAnswer: '8' },
            { type: 'cbt', question: 'What measure of central tendency represents the most frequently occurring score in a distribution?', options: ['Mean', 'Median', 'Mode', 'Standard Deviation'], correctAnswer: 'Mode' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'STA 201',
          title: 'Statistical Inference & Probability Distributions',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a Type I error in hypothesis testing?', options: ['Accepting a false null hypothesis', 'Rejecting a true null hypothesis (false positive)', 'Calculating the wrong sample size', 'Dividing by zero'], correctAnswer: 'Rejecting a true null hypothesis (false positive)' },
            { type: 'cbt', question: 'What is the mean and variance of a standard normal distribution (Z)?', options: ['Mean = 1, Variance = 0', 'Mean = 0, Variance = 1', 'Mean = 0, Variance = 0', 'Mean = 1, Variance = 1'], correctAnswer: 'Mean = 0, Variance = 1' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'STA 301', title: 'Design and Analysis of Experiments', level: 300, semester: 'harmattan', questions: [] },
        { code: 'STA 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'STA 401', title: 'Time Series Analysis & Econometrics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'STA 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
  ],
};
