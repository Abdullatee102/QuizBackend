// src/seed/faculties/fet.ts
import type { SeedFaculty } from '../types.js';

export const fetFaculty: SeedFaculty = {
  facultyName: 'Faculty of Engineering and Technology',
  code: 'FET',
  departments: [
    {
      deptName: 'Computer Engineering',
      code: 'CPE',
      courses: [
        // 100 Level
        {
          code: 'CPE 101',
          title: 'Introduction to Computer Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which logic gate outputs TRUE only when both inputs are TRUE?', options: ['OR Gate', 'AND Gate', 'NOT Gate', 'XOR Gate'], correctAnswer: 'AND Gate' },
            { type: 'cbt', question: 'What is the binary representation of decimal 5?', options: ['100', '101', '110', '111'], correctAnswer: '101' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MEE 101', title: 'Engineering Drawing I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'CPE 201',
          title: 'Digital Logic & Design',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which theorem is used to simplify Boolean expressions?', options: ['Ohm\'s Law', 'De Morgan\'s Law', 'Thevenin\'s Theorem', 'Fourier Transform'], correctAnswer: 'De Morgan\'s Law' },
            { type: 'cbt', question: 'What is a Flip-Flop in digital electronics?', options: ['A combinational circuit', 'A sequential bistable multivibrator used as memory', 'An amplifier circuit', 'A voltage regulator'], correctAnswer: 'A sequential bistable multivibrator used as memory' },
          ],
        },
        { code: 'CPE 203', title: 'Circuit Analysis I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'STA 201', title: 'Statistics for Physical Sciences & Engineering', level: 200, semester: 'harmattan', questions: [] },

        { code: 'CPE 202', title: 'Computer Programming for Engineers', level: 200, semester: 'rain', questions: [] },
        { code: 'CPE 204', title: 'Signals and Systems', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'CPE 301',
          title: 'Microprocessor Systems and Networks',
          level: 300,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'How many pins does the standard 8086 microprocessor have?', options: ['16', '24', '40', '64'], correctAnswer: '40' },
            {
              type: 'theory',
              question: 'Explain the role of interrupts in microprocessor architecture.',
              options: [],
              correctAnswer: 'Interrupts allow external devices or software conditions to temporarily halt the current execution of the CPU, prompting it to service a time-critical routine called an Interrupt Service Routine (ISR) before returning to its prior state.',
              gradingPoints: [
                { concept: 'halts cpu execution temporarily', weight: 0.5, aliases: ['pauses processor', 'interrupts current program'] },
                { concept: 'executes interrupt service routine isr', weight: 0.5, aliases: ['runs isr', 'handles interrupt service routine'] },
              ],
            },
          ],
        },
        { code: 'CPE 303', title: 'Object-Oriented Software Design for Engineers', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CPE 305', title: 'Control Systems', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CPE 302', title: 'Computer Networks & Security', level: 300, semester: 'rain', questions: [] },
        { code: 'CPE 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CPE 401', title: 'Embedded Systems Engineering', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CPE 403', title: 'Digital Signal Processing', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CPE 402', title: 'VLSI Design & Hardware Description Languages', level: 400, semester: 'rain', questions: [] },
        { code: 'CPE 499', title: 'Engineering Project Proposal & Design', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'CPE 501', title: 'Computer Systems Architecture & Design', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CPE 503', title: 'Robotics and Autonomous Systems', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CPE 502', title: 'Fault-Tolerant Computing', level: 500, semester: 'rain', questions: [] },
        { code: 'CPE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Mechanical Engineering',
      code: 'MEE',
      courses: [
        // 100 Level
        {
          code: 'MEE 101',
          title: 'Applied Mechanics I',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 'Newton' },
            { type: 'cbt', question: 'What does Newton\'s First Law of Motion state?', options: ['Force equals mass times acceleration', 'An object at rest stays at rest unless acted upon by an external force', 'Every action has an equal and opposite reaction', 'Energy cannot be created or destroyed'], correctAnswer: 'An object at rest stays at rest unless acted upon by an external force' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MEE 102', title: 'Engineering Graphics & CAD', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MEE 201',
          title: 'Engineering Thermodynamics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does the First Law of Thermodynamics state?', options: ['Entropy of an isolated system always increases', 'Energy can neither be created nor destroyed, only transformed', 'Absolute zero cannot be reached', 'Pressure is inversely proportional to volume'], correctAnswer: 'Energy can neither be created nor destroyed, only transformed' },
            { type: 'cbt', question: 'What is an isobaric process?', options: ['A process occurring at constant temperature', 'A process occurring at constant pressure', 'A process occurring at constant volume', 'A process with no heat transfer'], correctAnswer: 'A process occurring at constant pressure' },
          ],
        },
        { code: 'MEE 203', title: 'Workshop Technology', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },

        { code: 'MEE 202', title: 'Fluid Mechanics I', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MEE 301', title: 'Fluid Mechanics II', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MEE 303', title: 'Mechanics of Machines', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MEE 305', title: 'Strength of Materials II', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MEE 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MEE 401', title: 'Heat and Mass Transfer', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MEE 403', title: 'Internal Combustion Engines', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MEE 402', title: 'Machine Component Design', level: 400, semester: 'rain', questions: [] },
        { code: 'MEE 499', title: 'Engineering Project Proposal', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'MEE 501', title: 'Mechanical Vibrations & Machine Design', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MEE 503', title: 'Power Plant Engineering', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MEE 502', title: 'Control Engineering & Automation', level: 500, semester: 'rain', questions: [] },
        { code: 'MEE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Civil Engineering',
      code: 'CVE',
      courses: [
        // 100 Level
        {
          code: 'CVE 101',
          title: 'Introduction to Civil Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which material is primarily formed by mixing cement, water, sand, and aggregates?', options: ['Timber', 'Concrete', 'Asphalt', 'Steel'], correctAnswer: 'Concrete' },
            { type: 'cbt', question: 'What is the primary function of a foundation in civil structures?', options: ['To provide aesthetic value', 'To safely transmit building loads to the supporting ground', 'To prevent roof leakage', 'To insulate against heat'], correctAnswer: 'To safely transmit building loads to the supporting ground' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'CVE 102', title: 'Surveying for Engineers', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        { code: 'CVE 201', title: 'Engineering Geology', level: 200, semester: 'harmattan', questions: [] },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },

        {
          code: 'CVE 202',
          title: 'Strength of Materials & Mechanics of Solids',
          level: 200,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What is the ratio of tensile stress to tensile strain called?', options: ['Poisson\'s ratio', 'Shear modulus', 'Young\'s modulus', 'Bulk modulus'], correctAnswer: 'Young\'s modulus' },
            { type: 'cbt', question: 'What is Hooke\'s Law valid up to?', options: ['Yield point', 'Elastic limit', 'Plastic range', 'Fracture point'], correctAnswer: 'Elastic limit' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CVE 301', title: 'Structural Analysis I', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CVE 303', title: 'Hydraulics & Hydrology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CVE 305', title: 'Civil Engineering Materials', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CVE 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CVE 401', title: 'Geotechnical Engineering & Soil Mechanics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CVE 403', title: 'Transportation Engineering', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CVE 402', title: 'Design of Steel and Timber Structures', level: 400, semester: 'rain', questions: [] },
        { code: 'CVE 499', title: 'Engineering Project Proposal', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'CVE 501', title: 'Reinforced Concrete & Foundation Design', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CVE 503', title: 'Water Resources & Environmental Health Engineering', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CVE 502', title: 'Highway Engineering & Pavement Design', level: 500, semester: 'rain', questions: [] },
        { code: 'CVE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Agricultural Engineering',
      code: 'AGE',
      courses: [
        // 100 Level
        {
          code: 'AGE 101',
          title: 'Introduction to Agricultural Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary role of agricultural engineering?', options: ['Crop harvesting by hand only', 'Application of engineering principles to agricultural production and processing', 'Animal medication diagnosis', 'Financial auditing of farms'], correctAnswer: 'Application of engineering principles to agricultural production and processing' },
            { type: 'cbt', question: 'Which machine is widely used for primary tillage in mechanized farming?', options: ['Combine harvester', 'Mouldboard plough', 'Grain dryer', 'Sprinkler'], correctAnswer: 'Mouldboard plough' },
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
          code: 'AGE 201',
          title: 'Farm Power and Machinery',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What component of a tractor delivers rotational mechanical power to attached implements?', options: ['Differential lock', 'Power Take-Off (PTO) shaft', 'Drawbar', 'Carburettor'], correctAnswer: 'Power Take-Off (PTO) shaft' },
            { type: 'cbt', question: 'Which engine cycle is standard for modern heavy farm tractors?', options: ['Four-stroke diesel cycle', 'Two-stroke petrol cycle', 'Rotary Wankel cycle', 'Steam Rankine cycle'], correctAnswer: 'Four-stroke diesel cycle' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'AGE 301', title: 'Soil and Water Engineering', level: 300, semester: 'harmattan', questions: [] },
        { code: 'AGE 303', title: 'Irrigation & Drainage Engineering', level: 300, semester: 'harmattan', questions: [] },
        { code: 'AGE 399', title: 'SIWES Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'AGE 401', title: 'Post-Harvest Processing Technology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'AGE 403', title: 'Agricultural Machinery Design', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'AGE 501', title: 'Farm Structures and Environmental Control', level: 500, semester: 'harmattan', questions: [] },
        { code: 'AGE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Chemical Engineering',
      code: 'CHE',
      courses: [
        // 100 Level
        {
          code: 'CHE 101',
          title: 'Introduction to Chemical Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary focus of Chemical Engineering?', options: ['Designing microchips', 'Transforming raw materials into useful chemical products at industrial scale', 'Constructing highways', 'Building residential structures'], correctAnswer: 'Transforming raw materials into useful chemical products at industrial scale' },
            { type: 'cbt', question: 'Which law forms the basis of material balance calculations?', options: ['Law of Conservation of Mass', 'Ohm\'s Law', 'Coulomb\'s Law', 'Bernoulli\'s Principle'], correctAnswer: 'Law of Conservation of Mass' },
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
          code: 'CHE 201',
          title: 'Chemical Process Principles & Stoichiometry',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What separation technique separates components based on differences in boiling points?', options: ['Filtration', 'Distillation', 'Centrifugation', 'Crystallization'], correctAnswer: 'Distillation' },
            { type: 'cbt', question: 'What is a steady-state process in chemical engineering?', options: ['Process where variables change rapidly over time', 'Process where system variables remain constant with respect to time', 'Process operating at absolute zero', 'Process with no mass input'], correctAnswer: 'Process where system variables remain constant with respect to time' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CHE 301', title: 'Chemical Engineering Thermodynamics', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CHE 303', title: 'Fluid Mechanics for Chemical Engineers', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CHE 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CHE 401', title: 'Unit Operations & Separation Processes', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CHE 403', title: 'Transport Phenomena', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'CHE 501', title: 'Chemical Reaction Engineering & Plant Design', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CHE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Electronic and Electrical Engineering',
      code: 'EEE',
      courses: [
        // 100 Level
        {
          code: 'EEE 101',
          title: 'Basic Electrical Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the unit of electrical potential difference?', options: ['Ampere', 'Volt', 'Ohm', 'Farad'], correctAnswer: 'Volt' },
            { type: 'cbt', question: 'According to Ohm\'s Law, current (I) equals:', options: ['V × R', 'V / R', 'R / V', 'V + R'], correctAnswer: 'V / R' },
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
          code: 'EEE 201',
          title: 'Circuit Theory and Electronics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which semiconductor device allows current to flow in only one direction?', options: ['Resistor', 'Diode', 'Inductor', 'Capacitor'], correctAnswer: 'Diode' },
            { type: 'cbt', question: 'What theorem states that algebraic sum of currents entering a node is zero?', options: ['Kirchhoff\'s Voltage Law (KVL)', 'Kirchhoff\'s Current Law (KCL)', 'Norton\'s Theorem', 'Superposition Theorem'], correctAnswer: 'Kirchhoff\'s Current Law (KCL)' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'EEE 301', title: 'Electromagnetic Fields and Waves', level: 300, semester: 'harmattan', questions: [] },
        { code: 'EEE 303', title: 'Electrical Machines I', level: 300, semester: 'harmattan', questions: [] },
        { code: 'EEE 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'EEE 401', title: 'Control Systems Engineering', level: 400, semester: 'harmattan', questions: [] },
        { code: 'EEE 403', title: 'Telecommunication Principles', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'EEE 501', title: 'Power System Analysis & High Voltage Engineering', level: 500, semester: 'harmattan', questions: [] },
        { code: 'EEE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Food Engineering',
      code: 'FDE',
      courses: [
        // 100 Level
        {
          code: 'FDE 101',
          title: 'Introduction to Food Engineering',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is food engineering?', options: ['Cooking in restaurants', 'Application of engineering principles to the processing, preservation, and packaging of food', 'Organic farming', 'Grocery retail management'], correctAnswer: 'Application of engineering principles to the processing, preservation, and packaging of food' },
            { type: 'cbt', question: 'Which thermal process is commonly used to eliminate pathogenic organisms in milk?', options: ['Fermentation', 'Pasteurization', 'Freezing', 'Milling'], correctAnswer: 'Pasteurization' },
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
          code: 'FDE 201',
          title: 'Food Process Engineering Principles',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is water activity (aw) in food preservation?', options: ['The total weight of water', 'The ratio of vapor pressure of water in food to pure water', 'The pH of food water', 'The boiling point of food'], correctAnswer: 'The ratio of vapor pressure of water in food to pure water' },
            { type: 'cbt', question: 'Which drying method relies on sublimation of ice under vacuum?', options: ['Spray drying', 'Freeze drying (Lyophilization)', 'Drum drying', 'Sun drying'], correctAnswer: 'Freeze drying (Lyophilization)' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'FDE 301', title: 'Heat and Mass Transfer in Food Processing', level: 300, semester: 'harmattan', questions: [] },
        { code: 'FDE 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'FDE 401', title: 'Food Processing Plant Machinery & Storage', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'FDE 501', title: 'Food Plant Design and Quality Assurance', level: 500, semester: 'harmattan', questions: [] },
        { code: 'FDE 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
