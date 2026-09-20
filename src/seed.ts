import { db } from './db/index.js';

import {
  facultiesTable,
  departmentsTable,
  coursesTable,
  questionsTable,
} from './db/schema.js';

import { and, eq } from 'drizzle-orm';

// =====================================================
// TYPES
// =====================================================

type GradingPoint = {
  concept: string;
  weight: number;
  aliases?: string[];
};

type SeedQuestion = {
  type: 'cbt' | 'theory';
  question: string;
  options: string[];
  correctAnswer: string;
  gradingPoints?: GradingPoint[];
};

type SeedCourse = {
  code: string;
  title: string;
  level: number;
  semester: string;
  questions: SeedQuestion[];
};

type SeedDepartment = {
  deptName: string;
  code: string;
  courses: SeedCourse[];
};

type SeedFaculty = {
  facultyName: string;
  code: string;
  departments: SeedDepartment[];
};

// =====================================================
// CURRICULUM TREE
// =====================================================

const CURRICULUM_TREE: SeedFaculty[] = [
  {
    facultyName: 'Faculty of Computing and Informatics',
    code: 'FCI',

    departments: [
      {
        deptName: 'Computer Science',
        code: 'CSC',

        courses: [
          {
            code: 'CSC 101',
            title: 'Introduction to Computer Science',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question: 'What does CPU stand for?',
                options: [
                  'Central Process Unit',
                  'Computer Personal Unit',
                  'Central Processing Unit',
                  'Central Processor Unit',
                ],
                correctAnswer: 'Central Processing Unit',
              },

              {
                type: 'cbt',
                question: 'Which of these is a volatile memory?',
                options: [
                  'ROM',
                  'Hard Drive',
                  'RAM',
                  'Flash Drive',
                ],
                correctAnswer: 'RAM',
              },

              {
                type: 'cbt',
                question: 'What does HTML stand for?',
                options: [
                  'Hyper Text Markup Language',
                  'High Tech Machine Learning',
                  'Hyper Transfer Markup Link',
                  'Hyperlink Text Management Language',
                ],
                correctAnswer: 'Hyper Text Markup Language',
              },
              // Added New Question 1 (CBT)
              {
                type: 'cbt',
                question: 'Which component is considered the brain of the computer?',
                options: [
                  'Hard Disk',
                  'CPU',
                  'RAM',
                  'Power Supply',
                ],
                correctAnswer: 'CPU',
              },
            ],
          },

          {
            code: 'CSC 102',
            title: 'Introduction to Problem Solving',
            level: 100,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
                options: [
                  'Queue',
                  'Tree',
                  'Array',
                  'Stack',
                ],
                correctAnswer: 'Stack',
              },

              {
                type: 'cbt',
                question:
                  "In binary, what is the decimal equivalent of '1010'?",
                options: [
                  '8',
                  '10',
                  '12',
                  '14',
                ],
                correctAnswer: '10',
              },
              // Added New Question 2 (CBT)
              {
                type: 'cbt',
                question: 'Which sorting algorithm has a best-case time complexity of O(n log n)?',
                options: [
                  'Bubble Sort',
                  'Selection Sort',
                  'Merge Sort',
                  'Insertion Sort',
                ],
                correctAnswer: 'Merge Sort',
              },
            ],
          },

          {
            code: 'CSC 301',
            title: 'Data Structures & Algorithms',
            level: 300,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the worst-case time complexity of binary search?',
                options: [
                  'O(n)',
                  'O(log n)',
                  'O(n^2)',
                  'O(1)',
                ],
                correctAnswer: 'O(log n)',
              },

              {
                type: 'theory',
                question:
                  'Discuss the time complexity difference between Merge Sort and Quick Sort.',
                options: [],
                correctAnswer:
                  'Merge sort guarantees O(n log n) worst-case time complexity, whereas Quick sort has O(n^2) worst-case due to poor pivot selections.',

                gradingPoints: [
                  {
                    concept: 'Merge Sort',
                    weight: 20,
                    aliases: [
                      'merge sort algorithm',
                      'merge sorting',
                    ],
                  },

                  {
                    concept: 'O(n log n)',
                    weight: 25,
                    aliases: [
                      'O(nlogn)',
                      'O(n log n) time',
                      'n log n',
                      'linearithmic time',
                    ],
                  },

                  {
                    concept: 'Quick Sort',
                    weight: 20,
                    aliases: [
                      'quick sort algorithm',
                      'quick sorting',
                    ],
                  },

                  {
                    concept: 'O(n^2)',
                    weight: 25,
                    aliases: [
                      'O(n2)',
                      'O(n²)',
                      'n squared',
                      'quadratic time',
                    ],
                  },

                  {
                    concept: 'poor pivot selection',
                    weight: 10,
                    aliases: [
                      'poor pivot selections',
                      'poor pivot choice',
                      'poor pivot choices',
                      'bad pivot selection',
                      'bad pivot choice',
                    ],
                  },
                ],
              },
              // Added New Question 3 (Theory)
              {
                type: 'theory',
                question: 'Explain the concept of graph traversal using Breadth-First Search (BFS).',
                options: [],
                correctAnswer: 'BFS explores graph nodes level by level using a queue data structure, visiting all neighbors of a node before moving to the next level.',
                gradingPoints: [
                  {
                    concept: 'level by level',
                    weight: 40,
                    aliases: ['breadth-wise', 'level-order', 'tiers'],
                  },
                  {
                    concept: 'queue data structure',
                    weight: 60,
                    aliases: ['FIFO queue', 'queue'],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Cyber Security',
        code: 'CYB',

        courses: [
          {
            code: 'CYB 201',
            title: 'Introduction to Information Security',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  "What does the 'C' in the CIA triad stand for?",
                options: [
                  'Control',
                  'Confidentiality',
                  'Computation',
                  'Consistency',
                ],
                correctAnswer: 'Confidentiality',
              },

              {
                type: 'cbt',
                question:
                  'Which attack floods a network or server with traffic to crash it?',
                options: [
                  'Phishing',
                  'Man-in-the-Middle',
                  'DDoS',
                  'SQL Injection',
                ],
                correctAnswer: 'DDoS',
              },
              // Added New Question 4 (CBT)
              {
                type: 'cbt',
                question: 'What type of malware locks user data until a ransom is paid?',
                options: [
                  'Spyware',
                  'Adware',
                  'Ransomware',
                  'Trojan',
                ],
                correctAnswer: 'Ransomware',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Information Systems',
        code: 'INS',

        courses: [
          {
            code: 'INS 202',
            title: 'Management Information Systems',
            level: 200,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'What type of system is designed to support organizational decision-making?',
                options: [
                  'TPS',
                  'DSS',
                  'OS',
                  'BIOS',
                ],
                correctAnswer: 'DSS',
              },

              {
                type: 'cbt',
                question: 'What does ERP stand for?',
                options: [
                  'Enterprise Resource Planning',
                  'Enterprise Relationship Process',
                  'External Resource Planning',
                  'Effective Resource Planning',
                ],
                correctAnswer: 'Enterprise Resource Planning',
              },

              {
                type: 'cbt',
                question: 'Which component of an Information System provides instructions for hardware?',
                options: [
                  'Hardware',
                  'Software',
                  'Network',
                  'Data',
                ],
                correctAnswer: 'Software',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF ENGINEERING AND TECHNOLOGY
  // =====================================================

  {
    facultyName: 'Faculty of Engineering and Technology',
    code: 'FET',

    departments: [
      {
        deptName: 'Computer Engineering',
        code: 'CPE',

        courses: [
          {
            code: 'CPE 101',
            title: 'Engineering Drawing & Design I',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question: 'Which pencil grade is hardest?',
                options: [
                  '2B',
                  'HB',
                  '4H',
                  'B',
                ],
                correctAnswer: '4H',
              },

              {
                type: 'cbt',
                question:
                  'What type of line is used for hidden details?',
                options: [
                  'Continuous thick',
                  'Short dashes',
                  'Chain thin',
                  'Continuous thin',
                ],
                correctAnswer: 'Short dashes',
              },
            ],
          },

          {
            code: 'CPE 301',
            title: 'Microprocessor Systems and Networks',
            level: 300,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'How many pins does the standard 8086 microprocessor have?',
                options: [
                  '28',
                  '40',
                  '64',
                  '80',
                ],
                correctAnswer: '40',
              },

              {
                type: 'theory',
                question:
                  'Explain the role of interrupts in microprocessor architecture.',
                options: [],
                correctAnswer:
                  'Interrupts allow peripheral devices to signal the CPU to suspend current execution and handle a high-priority event.',

                gradingPoints: [
                  {
                    concept:
                      'peripheral devices signal the CPU',
                    weight: 20,
                    aliases: [
                      'peripheral devices notify the CPU',
                      'devices signal the CPU',
                      'external devices signal the CPU',
                      'peripherals signal the processor',
                    ],
                  },

                  {
                    concept:
                      'CPU suspends current execution',
                    weight: 25,
                    aliases: [
                      'CPU pauses current execution',
                      'processor suspends current execution',
                      'processor pauses execution',
                      'CPU stops the current execution temporarily',
                    ],
                  },

                  {
                    concept: 'high-priority event',
                    weight: 20,
                    aliases: [
                      'important event',
                      'urgent event',
                      'high priority task',
                      'important request',
                    ],
                  },

                  {
                    concept: 'handles the event',
                    weight: 25,
                    aliases: [
                      'handles the interrupt',
                      'services the interrupt',
                      'handles the request',
                      'responds to the event',
                      'processes the event',
                    ],
                  },

                  {
                    concept:
                      'resumes previous execution',
                    weight: 10,
                    aliases: [
                      'resumes normal execution',
                      'continues previous execution',
                      'returns to the previous task',
                      'continues the interrupted program',
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Mechanical Engineering',
        code: 'MEE',

        courses: [
          {
            code: 'MEE 201',
            title: 'Applied Mechanics (Statics)',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the condition for a rigid body to be in static equilibrium?',
                options: [
                  'Sum of forces equals zero',
                  'Sum of moments equals zero',
                  'Both forces and moments equal zero',
                  'Velocity is constant',
                ],
                correctAnswer:
                  'Both forces and moments equal zero',
              },

              {
                type: 'cbt',
                question: 'The unit of moment of a force in the SI system is?',
                options: [
                  'N/m',
                  'N.m',
                  'N.s',
                  'kg.m',
                ],
                correctAnswer: 'N.m',
              },

              {
                type: 'cbt',
                question: 'Two equal, opposite and parallel non-collinear forces form a?',
                options: [
                  'Moment',
                  'Couple',
                  'Torque',
                  'Resultant',
                ],
                correctAnswer: 'Couple',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Civil Engineering',
        code: 'CVE',

        courses: [
          {
            code: 'CVE 202',
            title: 'Strength of Materials',
            level: 200,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'In mechanics, what is defined as force per unit area?',
                options: [
                  'Strain',
                  'Work',
                  'Power',
                  'Stress',
                ],
                correctAnswer: 'Stress',
              },

              {
                type: 'cbt',
                question: 'The ratio of lateral strain to linear strain is called?',
                options: [
                  "Young's Modulus",
                  "Poisson's Ratio",
                  "Bulk Modulus",
                  "Shear Modulus",
                ],
                correctAnswer: "Poisson's Ratio",
              },

              {
                type: 'cbt',
                question: "Hooke's Law holds good up to?",
                options: [
                  'Yield point',
                  'Elastic limit',
                  'Breaking point',
                  'Plastic limit',
                ],
                correctAnswer: 'Elastic limit',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF BASIC MEDICAL SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Basic Medical Sciences',
    code: 'FBMS',

    departments: [
      {
        deptName: 'Anatomy',
        code: 'ANA',

        courses: [
          {
            code: 'ANA 201',
            title: 'Gross Anatomy of the Upper Limb',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which nerve is primarily affected in Carpal Tunnel Syndrome?',
                options: [
                  'Ulnar nerve',
                  'Radial nerve',
                  'Median nerve',
                  'Musculocutaneous nerve',
                ],
                correctAnswer: 'Median nerve',
              },

              {
                type: 'cbt',
                question: 'Which bone is located on the lateral side of the forearm?',
                options: [
                  'Ulna',
                  'Radius',
                  'Humerus',
                  'Clavicle',
                ],
                correctAnswer: 'Radius',
              },

              {
                type: 'cbt',
                question: 'The brachial plexus is formed by the ventral rami of which spinal nerves?',
                options: [
                  'C5-T1',
                  'C3-C7',
                  'T1-T5',
                  'L1-L5',
                ],
                correctAnswer: 'C5-T1',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Physiology',
        code: 'PHS',

        courses: [
          {
            code: 'PHS 201',
            title: 'Medical Physiology - Cell & Blood',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the normal lifespan of a human red blood cell in days?',
                options: [
                  '60 days',
                  '120 days',
                  '180 days',
                  '365 days',
                ],
                correctAnswer: '120 days',
              },

              {
                type: 'cbt',
                question: 'What is the primary function of white blood cells?',
                options: [
                  'Oxygen transport',
                  'Blood clotting',
                  'Defense against infection',
                  'Nutrient distribution',
                ],
                correctAnswer: 'Defense against infection',
              },

              {
                type: 'cbt',
                question: 'Which organ is primarily responsible for the production of red blood cells in adults?',
                options: [
                  'Liver',
                  'Spleen',
                  'Bone marrow',
                  'Kidney',
                ],
                correctAnswer: 'Bone marrow',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Nursing Science',
        code: 'NSC',

        courses: [
          {
            code: 'NSC 101',
            title: 'Introduction to Professional Nursing',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Who is widely considered the founder of modern nursing?',
                options: [
                  'Clara Barton',
                  'Florence Nightingale',
                  'Mary Seacole',
                  'Virginia Henderson',
                ],
                correctAnswer: 'Florence Nightingale',
              },

              {
                type: 'cbt',
                question: 'Which ethical principle refers to the duty to do good?',
                options: [
                  'Autonomy',
                  'Beneficence',
                  'Nonmaleficence',
                  'Justice',
                ],
                correctAnswer: 'Beneficence',
              },

              {
                type: 'cbt',
                question: 'The nursing process consists of how many primary steps?',
                options: [
                  '3',
                  '4',
                  '5',
                  '6',
                ],
                correctAnswer: '5',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF MANAGEMENT SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Management Sciences',
    code: 'FMS',

    departments: [
      {
        deptName: 'Accounting',
        code: 'ACC',

        courses: [
          {
            code: 'ACC 101',
            title:
              'Introduction to Financial Accounting I',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the fundamental accounting equation?',
                options: [
                  'Assets = Liabilities + Equity',
                  'Assets = Revenue - Expenses',
                  'Assets + Equity = Liabilities',
                  'Revenue = Assets + Liabilities',
                ],
                correctAnswer:
                  'Assets = Liabilities + Equity',
              },

              {
                type: 'cbt',
                question: "Which financial statement shows a company's financial position at a specific point in time?",
                options: [
                  'Income Statement',
                  'Statement of Cash Flows',
                  'Balance Sheet',
                  'Statement of Retained Earnings',
                ],
                correctAnswer: 'Balance Sheet',
              },

              {
                type: 'cbt',
                question: "In accounting, what does the term 'debit' mean?",
                options: [
                  'Increase in liability',
                  'Decrease in asset',
                  'Left side of an account',
                  'Right side of an account',
                ],
                correctAnswer: 'Left side of an account',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Marketing',
        code: 'MKT',

        courses: [
          {
            code: 'MKT 201',
            title: 'Principles of Marketing',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What are the 4 Ps of the marketing mix?',
                options: [
                  'Product, Price, Place, Promotion',
                  'People, Process, Physical Evidence, Product',
                  'Public, Price, Packaging, Placement',
                  'Planning, Production, Price, Profit',
                ],
                correctAnswer:
                  'Product, Price, Place, Promotion',
              },

              {
                type: 'cbt',
                question: 'The process of dividing a market into distinct groups of buyers with different needs is known as?',
                options: [
                  'Market Targeting',
                  'Market Segmentation',
                  'Market Positioning',
                  'Market Penetration',
                ],
                correctAnswer: 'Market Segmentation',
              },

              {
                type: 'cbt',
                question: 'Which of the following is NOT a stage in the Product Life Cycle?',
                options: [
                  'Introduction',
                  'Growth',
                  'Maturity',
                  'Innovation',
                ],
                correctAnswer: 'Innovation',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Management',
        code: 'MGT',

        courses: [
          {
            code: 'MGT 101',
            title: 'Principles of Management',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Who proposed the 14 principles of management?',
                options: [
                  'Max Weber',
                  'Henri Fayol',
                  'Frederick Taylor',
                  'Elton Mayo',
                ],
                correctAnswer: 'Henri Fayol',
              },

              {
                type: 'cbt',
                question: 'Which level of management is responsible for establishing the overall goals and strategy of an organization?',
                options: [
                  'Top Management',
                  'Middle Management',
                  'First-line Management',
                  'Operational Management',
                ],
                correctAnswer: 'Top Management',
              },

              {
                type: 'cbt',
                question: 'The Hawthorne studies are associated with which management approach?',
                options: [
                  'Scientific Management',
                  'Behavioral Approach',
                  'Quantitative Approach',
                  'Systems Approach',
                ],
                correctAnswer: 'Behavioral Approach',
              },
            ],
          },
        ],
      },
    ],
  },

  // =====================================================
  // FACULTY OF PURE AND APPLIED SCIENCES
  // =====================================================

  {
    facultyName: 'Faculty of Pure and Applied Sciences',
    code: 'FPAS',

    departments: [
      {
        deptName: 'Mathematics',
        code: 'MTH',

        courses: [
          {
            code: 'MTH 101',
            title:
              'Elementary Mathematics I (Algebra & Trigonometry)',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the value of log10(1000)?',
                options: [
                  '1',
                  '2',
                  '3',
                  '10',
                ],
                correctAnswer: '3',
              },

              {
                type: 'cbt',
                question:
                  'What is the sum of angles in a triangle?',
                options: [
                  '90 degrees',
                  '180 degrees',
                  '270 degrees',
                  '360 degrees',
                ],
                correctAnswer: '180 degrees',
              },
            ],
          },

          {
            code: 'MTH 102',
            title:
              'Elementary Mathematics II (Calculus)',
            level: 100,
            semester: 'rain',

            questions: [
              {
                type: 'cbt',
                question:
                  'What is the derivative of x^2?',
                options: [
                  'x',
                  '2x',
                  'x^2 / 2',
                  '2',
                ],
                correctAnswer: '2x',
              },
              // Added New Question 5 (Theory)
              {
                type: 'theory',
                question: 'Explain the basic geometric definition of a definite integral using area under a curve.',
                options: [],
                correctAnswer: 'A definite integral represents the net signed area bounded by the function graph, the x-axis, and vertical lines at the integration limits a and b.',
                gradingPoints: [
                  {
                    concept: 'signed area',
                    weight: 50,
                    aliases: ['net area', 'area under the curve'],
                  },
                  {
                    concept: 'integration limits',
                    weight: 50,
                    aliases: ['bounds', 'limits a and b', 'intervals'],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        deptName: 'Physics',
        code: 'PHY',

        courses: [
          {
            code: 'PHY 101',
            title:
              'General Physics I (Mechanics)',
            level: 100,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which law states that current is proportional to voltage?',
                options: [
                  "Newton's Law",
                  "Faraday's Law",
                  "Ohm's Law",
                  "Hooke's Law",
                ],
                correctAnswer: "Ohm's Law",
              },

              {
                type: 'cbt',
                question:
                  'What is the SI unit of force?',
                options: [
                  'Joule',
                  'Watt',
                  'Newton',
                  'Pascal',
                ],
                correctAnswer: 'Newton',
              },
            ],
          },
        ],
      },

      {
        deptName: 'Biochemistry',
        code: 'BCH',

        courses: [
          {
            code: 'BCH 201',
            title: 'General Biochemistry I',
            level: 200,
            semester: 'harmattan',

            questions: [
              {
                type: 'cbt',
                question:
                  'Which bond links amino acids together in a protein chain?',
                options: [
                  'Glycosidic bond',
                  'Peptide bond',
                  'Phosphodiester bond',
                  'Hydrogen bond',
                ],
                correctAnswer: 'Peptide bond',
              },

              {
                type: 'cbt',
                question: 'What is the primary storage form of glucose in animals?',
                options: [
                  'Starch',
                  'Glycogen',
                  'Cellulose',
                  'Chitin',
                ],
                correctAnswer: 'Glycogen',
              },

              {
                type: 'cbt',
                question: 'Enzymes are biological catalysts composed primarily of?',
                options: [
                  'Lipids',
                  'Carbohydrates',
                  'Proteins',
                  'Nucleic acids',
                ],
                correctAnswer: 'Proteins',
              },
            ],
          },
        ],
      },
    ],
  },
];

// =====================================================
// SEED DATABASE
// =====================================================

export const seedDatabase = async () => {
  try {
    console.log(
      '[SEED] Starting full relational curriculum insertion...'
    );

    for (const fac of CURRICULUM_TREE) {
      // =================================================
      // FACULTY
      // =================================================

      const [insertedFaculty] = await db
        .insert(facultiesTable)
        .values({
          name: fac.facultyName,
          code: fac.code,
        })
        .onConflictDoUpdate({
          target: facultiesTable.code,

          set: {
            name: fac.facultyName,
          },
        })
        .returning();

      if (!insertedFaculty) {
        console.warn(
          `[SEED] Could not create/find faculty: ${fac.facultyName}`
        );

        continue;
      }

      // =================================================
      // DEPARTMENTS
      // =================================================

      for (const dept of fac.departments) {
        const existingDepartments = await db
          .select()
          .from(departmentsTable)
          .where(
            and(
              eq(
                departmentsTable.facultyId,
                insertedFaculty.id
              ),

              eq(
                departmentsTable.code,
                dept.code
              )
            )
          )
          .limit(1);

        // IMPORTANT:
        // Store the first result in a separate variable.
        // This avoids "Object is possibly undefined".
        let deptRecord =
          existingDepartments[0];

        if (!deptRecord) {
          const [newDepartment] =
            await db
              .insert(departmentsTable)
              .values({
                facultyId:
                  insertedFaculty.id,

                name:
                  dept.deptName,

                code:
                  dept.code,
              })
              .returning();

          if (!newDepartment) {
            console.warn(
              `[SEED] Could not create department: ${dept.deptName}`
            );

            continue;
          }

          deptRecord = newDepartment;
        } else {
          const [updatedDepartment] =
            await db
              .update(departmentsTable)
              .set({
                name:
                  dept.deptName,
              })
              .where(
                eq(
                  departmentsTable.id,
                  deptRecord.id
                )
              )
              .returning();

          if (updatedDepartment) {
            deptRecord = updatedDepartment;
          }
        }

        // =================================================
        // COURSES
        // =================================================

        for (const course of dept.courses) {
          const existingCourses =
            await db
              .select()
              .from(coursesTable)
              .where(
                and(
                  eq(
                    coursesTable.departmentId,
                    deptRecord.id
                  ),

                  eq(
                    coursesTable.code,
                    course.code
                  )
                )
              )
              .limit(1);

          let courseRecord =
            existingCourses[0];

          if (!courseRecord) {
            const [newCourse] =
              await db
                .insert(coursesTable)
                .values({
                  departmentId:
                    deptRecord.id,

                  code:
                    course.code,

                  title:
                    course.title,

                  level:
                    course.level,

                  semester:
                    course.semester,
                })
                .returning();

            if (!newCourse) {
              console.warn(
                `[SEED] Could not create course: ${course.code}`
              );

              continue;
            }

            courseRecord = newCourse;
          } else {
            const [updatedCourse] =
              await db
                .update(coursesTable)
                .set({
                  title:
                    course.title,

                  level:
                    course.level,

                  semester:
                    course.semester,
                })
                .where(
                  eq(
                    coursesTable.id,
                    courseRecord.id
                  )
                )
                .returning();

            if (updatedCourse) {
              courseRecord = updatedCourse;
            }
          }

          // =================================================
          // QUESTIONS
          // =================================================

          for (const q of course.questions) {
            const existingQuestions =
              await db
                .select()
                .from(questionsTable)
                .where(
                  and(
                    eq(
                      questionsTable.courseId,
                      courseRecord.id
                    ),

                    eq(
                      questionsTable.question,
                      q.question
                    )
                  )
                )
                .limit(1);

            const existingQuestion =
              existingQuestions[0];

            const gradingPoints =
              q.gradingPoints ?? [];

            // =============================================
            // UPDATE EXISTING QUESTION
            // =============================================

            if (existingQuestion) {
              await db
                .update(questionsTable)
                .set({
                  type:
                    q.type,

                  options:
                    q.options,

                  correctAnswer:
                    q.correctAnswer,

                  gradingPoints,

                  difficulty:
                    'medium',
                })
                .where(
                  eq(
                    questionsTable.id,
                    existingQuestion.id
                  )
                );

              console.log(
                `[SEED] Updated question: ${course.code} - ${q.question}`
              );
            }

            // =============================================
            // INSERT NEW QUESTION
            // =============================================

            else {
              await db
                .insert(questionsTable)
                .values({
                  courseId:
                    courseRecord.id,

                  type:
                    q.type,

                  question:
                    q.question,

                  options:
                    q.options,

                  correctAnswer:
                    q.correctAnswer,

                  gradingPoints,

                  difficulty:
                    'medium',
                });

              console.log(
                `[SEED] Inserted question: ${course.code} - ${q.question}`
              );
            }
          }
        }
      }
    }

    console.log(
      '[SEED] Successfully seeded curriculum, questions, and theory grading rubrics!'
    );

    process.exit(0);
  } catch (error) {
    console.error(
      '[SEED] Error seeding data:',
      error
    );

    process.exit(1);
  }
};

seedDatabase();