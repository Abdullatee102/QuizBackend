// src/seed/faculties/fci/csc100.ts
import type { SeedCourse } from '../../types.js';

export const csc100Courses: SeedCourse[] = [
  // =========================================================================
  // 100 LEVEL HARMATTAN SEMESTER
  // =========================================================================

  // 1. CSC 101: Introduction to Computer Science
  {
    code: 'CSC 101',
    title: 'Introduction to Computer Science',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What does CPU stand for?',
        options: ['Central Process Unit', 'Computer Personal Unit', 'Central Processing Unit', 'Central Processor Unit'],
        correctAnswer: 'Central Processing Unit',
      },
      {
        type: 'cbt',
        question: 'Which of these is classified as volatile primary memory in a computer system?',
        options: ['ROM', 'Hard Drive', 'RAM', 'Flash Drive'],
        correctAnswer: 'RAM',
      },
      {
        type: 'cbt',
        question: 'What does HTML stand for in web computing?',
        options: ['Hyper Text Markup Language', 'High Tech Machine Learning', 'Hyper Transfer Markup Link', 'Hyperlink Text Management Language'],
        correctAnswer: 'Hyper Text Markup Language',
      },
      {
        type: 'cbt',
        question: 'Which hardware component is referred to as the brain of the computer responsible for executing instructions?',
        options: ['Hard Disk', 'CPU', 'RAM', 'Power Supply'],
        correctAnswer: 'CPU',
      },
      {
        type: 'cbt',
        question: 'Which generation of computers introduced integrated circuits (ICs) replacing discrete transistors?',
        options: ['First Generation', 'Second Generation', 'Third Generation', 'Fourth Generation'],
        correctAnswer: 'Third Generation',
      },
      {
        type: 'cbt',
        question: 'How many bits make up one byte?',
        options: ['4 bits', '8 bits', '16 bits', '32 bits'],
        correctAnswer: '8 bits',
      },
      {
        type: 'cbt',
        question: 'Which of the following is system software responsible for managing computer hardware and software resources?',
        options: ['Operating System', 'Web Browser', 'Database Management System', 'Word Processor'],
        correctAnswer: 'Operating System',
      },
      {
        type: 'cbt',
        question: 'What is the base of the hexadecimal number system?',
        options: ['Base 2', 'Base 8', 'Base 10', 'Base 16'],
        correctAnswer: 'Base 16',
      },
      {
        type: 'cbt',
        question: 'Which port is standardly used to connect external high-speed peripherals and flash drives?',
        options: ['VGA', 'USB', 'Serial Port', 'Parallel Port'],
        correctAnswer: 'USB',
      },
      {
        type: 'cbt',
        question: 'What type of software translates high-level source code into machine code all at once before execution?',
        options: ['Interpreter', 'Compiler', 'Assembler', 'Linker'],
        correctAnswer: 'Compiler',
      },
    ],
  },

  // 2. MTH 101: Elementary Mathematics I (Algebra & Trigonometry)
  {
    code: 'MTH 101',
    title: 'Elementary Mathematics I (Algebra & Trigonometry)',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What are the roots of the quadratic equation x^2 - 5x + 6 = 0?',
        options: ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = 5'],
        correctAnswer: 'x = 2 and x = 3',
      },
      {
        type: 'cbt',
        question: 'Evaluate log10(1000).',
        options: ['1', '2', '3', '10'],
        correctAnswer: '3',
      },
      {
        type: 'cbt',
        question: 'If the nth term of an Arithmetic Progression (AP) is given by Tn = a + (n - 1)d, find the 10th term when a = 3 and common difference d = 4.',
        options: ['36', '39', '40', '43'],
        correctAnswer: '39',
      },
      {
        type: 'cbt',
        question: 'What is the sum to infinity of a Geometric Progression (GP) with first term a = 6 and common ratio r = 1/3?',
        options: ['9', '12', '18', '2'],
        correctAnswer: '9',
      },
      {
        type: 'cbt',
        question: 'What is the value of sin^2(theta) + cos^2(theta) for any real angle theta?',
        options: ['0', '1', '-1', 'tan^2(theta)'],
        correctAnswer: '1',
      },
      {
        type: 'cbt',
        question: 'What is the modulus of the complex number z = 3 + 4i?',
        options: ['7', '5', '25', '1'],
        correctAnswer: '5',
      },
      {
        type: 'cbt',
        question: 'Calculate the number of permutations 5P3.',
        options: ['15', '20', '60', '120'],
        correctAnswer: '60',
      },
      {
        type: 'cbt',
        question: 'In the binomial expansion of (x + y)^n, how many terms are in the expansion?',
        options: ['n', 'n - 1', 'n + 1', '2n'],
        correctAnswer: 'n + 1',
      },
      {
        type: 'cbt',
        question: 'Simplify the expression (2^5 * 2^3) / 2^4.',
        options: ['4', '8', '16', '32'],
        correctAnswer: '16',
      },
      {
        type: 'cbt',
        question: 'Convert an angle of 180 degrees into radians.',
        options: ['pi / 2 radians', 'pi radians', '2 pi radians', '3 pi / 2 radians'],
        correctAnswer: 'pi radians',
      },
    ],
  },

  // 3. PHY 101: General Physics I (Mechanics & Properties of Matter)
  {
    code: 'PHY 101',
    title: 'General Physics I (Mechanics & Properties of Matter)',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the SI unit of force?',
        options: ['Joule', 'Watt', 'Newton', 'Pascal'],
        correctAnswer: 'Newton',
      },
      {
        type: 'cbt',
        question: 'Which of the following represents the dimensional formula for work or energy?',
        options: ['[M L T^-1]', '[M L^2 T^-2]', '[M L^-1 T^-2]', '[M L^2 T^-3]'],
        correctAnswer: '[M L^2 T^-2]',
      },
      {
        type: 'cbt',
        question: 'According to Newton second law of motion, force is equal to the rate of change of what quantity?',
        options: ['Velocity', 'Acceleration', 'Linear Momentum', 'Kinetic Energy'],
        correctAnswer: 'Linear Momentum',
      },
      {
        type: 'cbt',
        question: 'A projectile launched with initial velocity u at angle theta to the horizontal achieves maximum horizontal range at what launch angle?',
        options: ['30 degrees', '45 degrees', '60 degrees', '90 degrees'],
        correctAnswer: '45 degrees',
      },
      {
        type: 'cbt',
        question: 'Hooke Law states that within elastic limits, stress is directly proportional to what?',
        options: ['Strain', 'Force', 'Area', 'Young Modulus'],
        correctAnswer: 'Strain',
      },
      {
        type: 'cbt',
        question: 'What principle states that the upthrust exerted on an object immersed in a fluid equals the weight of the fluid displaced?',
        options: ['Bernoulli Principle', 'Archimedes Principle', 'Pascal Principle', 'Torricelli Theorem'],
        correctAnswer: 'Archimedes Principle',
      },
      {
        type: 'cbt',
        question: 'What is the acceleration due to gravity g at the Earth surface approximately equal to?',
        options: ['8.9 m/s^2', '9.8 m/s^2', '10.5 m/s^2', '11.2 m/s^2'],
        correctAnswer: '9.8 m/s^2',
      },
      {
        type: 'cbt',
        question: 'The centripetal acceleration of a body of mass m moving with uniform speed v in a circle of radius r is given by:',
        options: ['v / r', 'v^2 / r', 'm v^2 / r', 'v^2 * r'],
        correctAnswer: 'v^2 / r',
      },
      {
        type: 'cbt',
        question: 'Surface tension in liquids is primarily caused by which type of molecular force?',
        options: ['Adhesive forces', 'Cohesive forces', 'Gravitational forces', 'Electrostatic repulsive forces'],
        correctAnswer: 'Cohesive forces',
      },
      {
        type: 'cbt',
        question: 'What happens to the terminal velocity of a spherical body falling through a viscous fluid when the fluid viscosity increases?',
        options: ['It increases', 'It decreases', 'It remains constant', 'It drops to zero immediately'],
        correctAnswer: 'It decreases',
      },
    ],
  },

  // 4. CHM 101: General Chemistry I
  {
    code: 'CHM 101',
    title: 'General Chemistry I',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What is the principal quantum number (n) associated with?',
        options: ['Orbital shape', 'Main energy level or electron shell', 'Spatial orientation of orbital', 'Electron spin direction'],
        correctAnswer: 'Main energy level or electron shell',
      },
      {
        type: 'cbt',
        question: 'What is the value of Avogadro number of particles per mole?',
        options: ['6.022 x 10^23', '3.00 x 10^8', '1.602 x 10^-19', '9.11 x 10^-31'],
        correctAnswer: '6.022 x 10^23',
      },
      {
        type: 'cbt',
        question: 'Which gas law states that volume is inversely proportional to pressure at constant temperature (P1V1 = P2V2)?',
        options: ['Charles Law', 'Boyle Law', 'Gay-Lussac Law', 'Avogadro Law'],
        correctAnswer: 'Boyle Law',
      },
      {
        type: 'cbt',
        question: 'What is the oxidation state of sulfur in sulfuric acid (H2SO4)?',
        options: ['+2', '+4', '+6', '-2'],
        correctAnswer: '+6',
      },
      {
        type: 'cbt',
        question: 'Which type of chemical bond is formed by the complete transfer of valence electrons from one atom to another?',
        options: ['Covalent bond', 'Ionic bond', 'Hydrogen bond', 'Metallic bond'],
        correctAnswer: 'Ionic bond',
      },
      {
        type: 'cbt',
        question: 'What is the pH of a neutral aqueous solution at 25 degrees Celsius?',
        options: ['0', '7', '14', '1'],
        correctAnswer: '7',
      },
      {
        type: 'cbt',
        question: 'According to Le Chatelier principle, what happens to an exothermic equilibrium reaction if temperature is increased?',
        options: ['Equilibrium shifts to the right', 'Equilibrium shifts to the left', 'No change occurs', 'Reaction stops'],
        correctAnswer: 'Equilibrium shifts to the left',
      },
      {
        type: 'cbt',
        question: 'Which orbital has a spherical shape?',
        options: ['s orbital', 'p orbital', 'd orbital', 'f orbital'],
        correctAnswer: 's orbital',
      },
      {
        type: 'cbt',
        question: 'Which periodic trend generally increases across a period from left to right and decreases down a group?',
        options: ['Atomic radius', 'Electronegativity', 'Metallic character', 'Atomic volume'],
        correctAnswer: 'Electronegativity',
      },
      {
        type: 'cbt',
        question: 'What is the molar volume of an ideal gas at standard temperature and pressure (STP)?',
        options: ['22.4 dm^3', '24.0 dm^3', '11.2 dm^3', '1.0 dm^3'],
        correctAnswer: '22.4 dm^3',
      },
    ],
  },

  // 5. GST 111: Communication in English I
  {
    code: 'GST 111',
    title: 'Communication in English I',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'In English grammar, what is subject-verb concord?',
        options: ['Agreement between subject and verb in number and person', 'Agreement between adjective and noun', 'The order of words in a prepositional phrase', 'The choice of tense in reported speech'],
        correctAnswer: 'Agreement between subject and verb in number and person',
      },
      {
        type: 'cbt',
        question: 'Identify the sentence with correct grammatical concord:',
        options: ['Neither the teacher nor the students was present.', 'Either the boy or his friends are coming.', 'Every student have submitted their assignment.', 'The news are very alarming.'],
        correctAnswer: 'Either the boy or his friends are coming.',
      },
      {
        type: 'cbt',
        question: 'Which reading technique involves rapid reading to locate a specific piece of information like a name or date?',
        options: ['Skimming', 'Scanning', 'Intensive reading', 'Critical reading'],
        correctAnswer: 'Scanning',
      },
      {
        type: 'cbt',
        question: 'How many phonemic vowel sounds (monophthongs and diphthongs) exist in Standard British Received Pronunciation (RP)?',
        options: ['5', '12', '20', '26'],
        correctAnswer: '20',
      },
      {
        type: 'cbt',
        question: 'Which of the following words has the primary stress on the first syllable?',
        options: ['Ex\'port (verb)', '\'Export (noun)', 'Con\'duct (verb)', 'Re\'cord (verb)'],
        correctAnswer: '\'Export (noun)',
      },
      {
        type: 'cbt',
        question: 'What type of clause can stand alone as a grammatically complete sentence?',
        options: ['Dependent clause', 'Independent (main) clause', 'Relative clause', 'Subordinate adverbial clause'],
        correctAnswer: 'Independent (main) clause',
      },
      {
        type: 'cbt',
        question: 'Which figure of speech makes an explicit comparison between two dissimilar things using "like" or "as"?',
        options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'],
        correctAnswer: 'Simile',
      },
      {
        type: 'cbt',
        question: 'What is the function of an affix attached to the beginning of a root word?',
        options: ['Suffix', 'Prefix', 'Infix', 'Circumfix'],
        correctAnswer: 'Prefix',
      },
      {
        type: 'cbt',
        question: 'In academic writing, which register of language is strictly expected?',
        options: ['Slang and colloquialisms', 'Formal and objective register', 'Casual texting abbreviations', 'Idiomatic dialect'],
        correctAnswer: 'Formal and objective register',
      },
      {
        type: 'cbt',
        question: 'Which punctuation mark is used to join two closely related independent clauses without a coordinating conjunction?',
        options: ['Comma', 'Semicolon', 'Hyphen', 'Apostrophe'],
        correctAnswer: 'Semicolon',
      },
    ],
  },

  // 6. LIB 101: Use of Library and Study Skills
  {
    code: 'LIB 101',
    title: 'Use of Library and Study Skills',
    level: 100,
    semester: 'harmattan',
    questions: [
      {
        type: 'cbt',
        question: 'What does OPAC stand for in modern academic library services?',
        options: ['Online Public Access Catalogue', 'Official Publication Access Centre', 'Open Protocol Academic Catalog', 'Online Periodical Archives Collection'],
        correctAnswer: 'Online Public Access Catalogue',
      },
      {
        type: 'cbt',
        question: 'Which library classification system uses letters of the alphabet from A to Z to represent major subject disciplines?',
        options: ['Dewey Decimal Classification (DDC)', 'Library of Congress Classification (LCC)', 'Universal Decimal Classification (UDC)', 'Colon Classification'],
        correctAnswer: 'Library of Congress Classification (LCC)',
      },
      {
        type: 'cbt',
        question: 'In the Dewey Decimal Classification (DDC) scheme, which class number represents Computer Science, Information & General Works?',
        options: ['000', '100', '500', '600'],
        correctAnswer: '000',
      },
      {
        type: 'cbt',
        question: 'What is a Call Number on a library book?',
        options: ['The phone number of the library help desk', 'The barcode identifier for price', 'The unique shelf address consisting of class and author mark', 'The International Standard Book Number (ISBN)'],
        correctAnswer: 'The unique shelf address consisting of class and author mark',
      },
      {
        type: 'cbt',
        question: 'Which of the following is classified as a primary information source?',
        options: ['Encyclopedia', 'Original research journal article reporting new findings', 'Textbook summary', 'Bibliographic index'],
        correctAnswer: 'Original research journal article reporting new findings',
      },
      {
        type: 'cbt',
        question: 'Which reference book provides brief definitions, pronunciations, and etymologies of words?',
        options: ['Gazetteer', 'Dictionary', 'Almanac', 'Yearbook'],
        correctAnswer: 'Dictionary',
      },
      {
        type: 'cbt',
        question: 'Which Boolean operator narrows a library database search by requiring all search keywords to be present in the results?',
        options: ['OR', 'AND', 'NOT', 'NEAR'],
        correctAnswer: 'AND',
      },
      {
        type: 'cbt',
        question: 'What constitutes plagiarism in academic study?',
        options: ['Borrowing books from the university library', 'Paraphrasing concepts while providing accurate citations', 'Using another author ideas, words, or data without attribution', 'Reading multiple literature reviews'],
        correctAnswer: 'Using another author ideas, words, or data without attribution',
      },
      {
        type: 'cbt',
        question: 'What type of publication is issued in successive parts appearing at regular intervals (daily, monthly, quarterly)?',
        options: ['Monograph', 'Serial or Periodical', 'Manuscript', 'Atlas'],
        correctAnswer: 'Serial or Periodical',
      },
      {
        type: 'cbt',
        question: 'What is the purpose of an Abstract in a scholarly research paper?',
        options: ['Listing all references in alphabetical order', 'Providing a concise summary of the study problem, method, and results', 'Acknowledging the research grants', 'Listing the table of contents'],
        correctAnswer: 'Providing a concise summary of the study problem, method, and results',
      },
    ],
  },

  // =========================================================================
  // 100 LEVEL RAIN SEMESTER
  // =========================================================================

  // 7. CSC 102: Introduction to Problem Solving
  {
    code: 'CSC 102',
    title: 'Introduction to Problem Solving',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'Which data structure operates on a Last-In, First-Out (LIFO) principle?',
        options: ['Queue', 'Tree', 'Array', 'Stack'],
        correctAnswer: 'Stack',
      },
      {
        type: 'cbt',
        question: 'In binary, what is the decimal equivalent of the binary number "1010"?',
        options: ['8', '10', '12', '14'],
        correctAnswer: '10',
      },
      {
        type: 'cbt',
        question: 'What is an algorithm?',
        options: ['A programming language', 'A step-by-step procedure for solving a problem', 'A computer hardware part', 'A database management system'],
        correctAnswer: 'A step-by-step procedure for solving a problem',
      },
      {
        type: 'cbt',
        question: 'Which flowchart symbol represents a conditional decision branching?',
        options: ['Rectangle', 'Oval', 'Diamond', 'Parallelogram'],
        correctAnswer: 'Diamond',
      },
      {
        type: 'cbt',
        question: 'Which data structure operates strictly on a First-In, First-Out (FIFO) principle?',
        options: ['Stack', 'Queue', 'Graph', 'Binary Tree'],
        correctAnswer: 'Queue',
      },
      {
        type: 'cbt',
        question: 'What is pseudo-code in computer programming?',
        options: ['Executable assembly instructions', 'An informal high-level description of an algorithm using structured English', 'Binary machine code', 'A compiled programming library'],
        correctAnswer: 'An informal high-level description of an algorithm using structured English',
      },
      {
        type: 'cbt',
        question: 'In programming logic, what is a loop that never terminates called?',
        options: ['Recursive loop', 'Infinite loop', 'Nested loop', 'While loop'],
        correctAnswer: 'Infinite loop',
      },
      {
        type: 'cbt',
        question: 'Which algorithmic approach solves a problem by breaking it into smaller sub-problems of the same type until simple base cases are reached?',
        options: ['Recursion', 'Greedy approach', 'Brute force', 'Linear scanning'],
        correctAnswer: 'Recursion',
      },
      {
        type: 'cbt',
        question: 'What is the flowchart symbol used to represent input/output operations?',
        options: ['Rectangle', 'Parallelogram', 'Circle', 'Diamond'],
        correctAnswer: 'Parallelogram',
      },
      {
        type: 'cbt',
        question: 'Which of the following is an example of a logical operator used in conditional statements?',
        options: ['+', '*', 'AND', '='],
        correctAnswer: 'AND',
      },
    ],
  },

  // 8. MTH 102: Elementary Mathematics II (Calculus)
  {
    code: 'MTH 102',
    title: 'Elementary Mathematics II (Calculus)',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is the derivative of f(x) = x^3 with respect to x?',
        options: ['3x', '3x^2', 'x^2', '6x'],
        correctAnswer: '3x^2',
      },
      {
        type: 'cbt',
        question: 'Evaluate the limit of (sin x) / x as x approaches 0.',
        options: ['0', '1', 'Infinity', 'Undefined'],
        correctAnswer: '1',
      },
      {
        type: 'cbt',
        question: 'What is the derivative of sin(x) with respect to x?',
        options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'],
        correctAnswer: 'cos(x)',
      },
      {
        type: 'cbt',
        question: 'What is the indefinite integral of 2x with respect to x?',
        options: ['x^2 + C', '2x^2 + C', 'x + C', '2 + C'],
        correctAnswer: 'x^2 + C',
      },
      {
        type: 'cbt',
        question: 'Using the product rule, the derivative of u * v with respect to x is:',
        options: ['u\' * v\'', 'u * v\' + v * u\'', 'u * v\' - v * u\'', '(u\' + v\') / 2'],
        correctAnswer: 'u * v\' + v * u\'',
      },
      {
        type: 'cbt',
        question: 'What is the derivative of e^(3x) with respect to x?',
        options: ['e^(3x)', '3 * e^(3x)', '3x * e^(3x)', 'e^3'],
        correctAnswer: '3 * e^(3x)',
      },
      {
        type: 'cbt',
        question: 'At a stationary point of a differentiable curve y = f(x), what is the value of dy/dx?',
        options: ['1', '0', '-1', 'Infinity'],
        correctAnswer: '0',
      },
      {
        type: 'cbt',
        question: 'If d^2y/dx^2 > 0 at a stationary point, that point corresponds to a:',
        options: ['Local Maximum', 'Local Minimum', 'Point of Inflexion', 'Asymptote'],
        correctAnswer: 'Local Minimum',
      },
      {
        type: 'cbt',
        question: 'Evaluate the definite integral of 1 dx from x = 0 to x = 5.',
        options: ['0', '1', '5', '10'],
        correctAnswer: '5',
      },
      {
        type: 'cbt',
        question: 'What is the derivative of ln(x) for x > 0?',
        options: ['1 / x', '1 / x^2', 'e^x', 'x'],
        correctAnswer: '1 / x',
      },
    ],
  },

  // 9. PHY 102: General Physics II (Electricity & Magnetism)
  {
    code: 'PHY 102',
    title: 'General Physics II (Electricity & Magnetism)',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'Which law states that the electrostatic force between two point charges is inversely proportional to the square of the distance between them?',
        options: ['Ohm Law', 'Coulomb Law', 'Faraday Law', 'Ampere Law'],
        correctAnswer: 'Coulomb Law',
      },
      {
        type: 'cbt',
        question: 'What is the SI unit of electric capacitance?',
        options: ['Ohm', 'Henry', 'Farad', 'Tesla'],
        correctAnswer: 'Farad',
      },
      {
        type: 'cbt',
        question: 'Ohm Law states that electric current I flowing through a metallic conductor is directly proportional to potential difference V, provided what remains constant?',
        options: ['Resistance only', 'Temperature and physical conditions', 'Electric charge', 'Capacitance'],
        correctAnswer: 'Temperature and physical conditions',
      },
      {
        type: 'cbt',
        question: 'What is the total equivalent resistance of three 6-ohm resistors connected in parallel?',
        options: ['18 ohms', '6 ohms', '2 ohms', '3 ohms'],
        correctAnswer: '2 ohms',
      },
      {
        type: 'cbt',
        question: 'Kirchhoff First Rule (Current Law) at any electrical junction is based on the conservation of what quantity?',
        options: ['Energy', 'Electric Charge', 'Momentum', 'Magnetic Flux'],
        correctAnswer: 'Electric Charge',
      },
      {
        type: 'cbt',
        question: 'What is the SI unit of magnetic field strength (magnetic flux density B)?',
        options: ['Weber', 'Tesla', 'Henry', 'Gauss'],
        correctAnswer: 'Tesla',
      },
      {
        type: 'cbt',
        question: 'Which law states that the induced electromotive force (EMF) in a closed circuit opposes the change in magnetic flux that produces it?',
        options: ['Lenz Law', 'Faraday Law of Induction', 'Biot-Savart Law', 'Coulomb Law'],
        correctAnswer: 'Lenz Law',
      },
      {
        type: 'cbt',
        question: 'In an alternating current (AC) circuit, what is the opposition to current flow offered by an inductor called?',
        options: ['Resistance', 'Inductive Reactance', 'Capacitive Reactance', 'Admittance'],
        correctAnswer: 'Inductive Reactance',
      },
      {
        type: 'cbt',
        question: 'According to Snell Law of refraction, the ratio of the sine of the angle of incidence to the sine of the angle of refraction is:',
        options: ['Constant (Refractive Index)', 'Zero', 'Always 1', 'Variable with angle'],
        correctAnswer: 'Constant (Refractive Index)',
      },
      {
        type: 'cbt',
        question: 'What type of magnetic material is strongly attracted to magnets and exhibits magnetic hysteresis (e.g., Iron, Nickel)?',
        options: ['Diamagnetic', 'Paramagnetic', 'Ferromagnetic', 'Non-magnetic'],
        correctAnswer: 'Ferromagnetic',
      },
    ],
  },

  // 10. CHM 102: General Chemistry II
  {
    code: 'CHM 102',
    title: 'General Chemistry II',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is the general molecular formula for non-cyclic saturated hydrocarbons (alkanes)?',
        options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'],
        correctAnswer: 'CnH2n+2',
      },
      {
        type: 'cbt',
        question: 'What functional group characterizes an alcohol molecule?',
        options: ['-COOH', '-OH (hydroxyl group)', '-CHO', '-NH2'],
        correctAnswer: '-OH (hydroxyl group)',
      },
      {
        type: 'cbt',
        question: 'What type of isomerism exists between butane and 2-methylpropane (isobutane)?',
        options: ['Chain isomerism', 'Geometric (cis-trans) isomerism', 'Optical isomerism', 'Functional group isomerism'],
        correctAnswer: 'Chain isomerism',
      },
      {
        type: 'cbt',
        question: 'Which hybridization state is present in the carbon atoms of an alkene with a double bond (e.g., ethene)?',
        options: ['sp', 'sp^2', 'sp^3', 'sp^3d'],
        correctAnswer: 'sp^2',
      },
      {
        type: 'cbt',
        question: 'What is the product formed when primary alcohols are oxidized under controlled conditions?',
        options: ['Ketones', 'Aldehydes', 'Ethers', 'Esters'],
        correctAnswer: 'Aldehydes',
      },
      {
        type: 'cbt',
        question: 'What is the name of the reaction between a carboxylic acid and an alcohol in the presence of an acid catalyst?',
        options: ['Saponification', 'Esterification', 'Hydrogenation', 'Polymerization'],
        correctAnswer: 'Esterification',
      },
      {
        type: 'cbt',
        question: 'Which test reagent is used to distinguish aldehydes from ketones by producing a silver mirror on the test tube wall?',
        options: ['Biuret reagent', 'Tollens reagent', 'Benedict solution', 'Lucas reagent'],
        correctAnswer: 'Tollens reagent',
      },
      {
        type: 'cbt',
        question: 'Benzene is classified as what type of organic compound due to its stable delocalized pi-electron ring?',
        options: ['Aliphatic', 'Aromatic', 'Alicyclic', 'Heterocyclic'],
        correctAnswer: 'Aromatic',
      },
      {
        type: 'cbt',
        question: 'What type of reaction converts an alkene (unsaturated) into an alkane (saturated) in the presence of a Nickel catalyst?',
        options: ['Hydrogenation (addition)', 'Halogenation (substitution)', 'Dehydration', 'Cracking'],
        correctAnswer: 'Hydrogenation (addition)',
      },
      {
        type: 'cbt',
        question: 'What linkage connects individual amino acid residues together in a peptide or protein chain?',
        options: ['Glycosidic bond', 'Peptide bond (amide linkage)', 'Phosphodiester bond', 'Ester bond'],
        correctAnswer: 'Peptide bond (amide linkage)',
      },
    ],
  },

  // 11. GST 121: Use of English II & Logic
  {
    code: 'GST 121',
    title: 'Use of English II & Logic',
    level: 100,
    semester: 'rain',
    questions: [
      {
        type: 'cbt',
        question: 'What is logic primarily defined as in intellectual discourse?',
        options: ['The study of literary vocabulary', 'The systematic study of valid reasoning, inference, and arguments', 'The art of public oratory', 'The memorization of historical facts'],
        correctAnswer: 'The systematic study of valid reasoning, inference, and arguments',
      },
      {
        type: 'cbt',
        question: 'In deductive reasoning, if all premises are true and the argument form is valid, what must be true about the conclusion?',
        options: ['It is probably true', 'It must necessarily be true', 'It may be false', 'It requires empirical testing'],
        correctAnswer: 'It must necessarily be true',
      },
      {
        type: 'cbt',
        question: 'Which type of reasoning moves from specific observed instances to broad probabilistic generalizations?',
        options: ['Deductive reasoning', 'Inductive reasoning', 'Syllogistic logic', 'Formal deduction'],
        correctAnswer: 'Inductive reasoning',
      },
      {
        type: 'cbt',
        question: 'What logical fallacy occurs when an opponent attacks the person making an argument rather than the argument itself?',
        options: ['Straw Man', 'Argumentum Ad Hominem', 'Post Hoc Ergo Propter Hoc', 'Begging the Question'],
        correctAnswer: 'Argumentum Ad Hominem',
      },
      {
        type: 'cbt',
        question: 'In categorical logic, a classical syllogism consists of how many propositions in total?',
        options: ['One premise and one conclusion (2)', 'Two premises and one conclusion (3)', 'Three premises and two conclusions (5)', 'Four premises and one conclusion (5)'],
        correctAnswer: 'Two premises and one conclusion (3)',
      },
      {
        type: 'cbt',
        question: 'What is a proposition in formal logic?',
        options: ['A question or exclamation', 'A declarative statement that is either strictly true or false', 'A command or imperative sentence', 'A metaphorical idiom'],
        correctAnswer: 'A declarative statement that is either strictly true or false',
      },
      {
        type: 'cbt',
        question: 'Which fallacy assumes that because Event B followed Event A, Event A must have caused Event B?',
        options: ['False Dilemma', 'Post Hoc Ergo Propter Hoc', 'Red Herring', 'Slippery Slope'],
        correctAnswer: 'Post Hoc Ergo Propter Hoc',
      },
      {
        type: 'cbt',
        question: 'What is the logical connective represented by the symbol "v" (or word "OR") in propositional logic?',
        options: ['Conjunction', 'Disjunction', 'Conditional (implication)', 'Biconditional'],
        correctAnswer: 'Disjunction',
      },
      {
        type: 'cbt',
        question: 'Which fallacy artificially limits available choices to only two extremes when other viable alternatives exist?',
        options: ['False Dilemma (Either/Or Fallacy)', 'Circular Reasoning', 'Appeal to Ignorance', 'Equivocation'],
        correctAnswer: 'False Dilemma (Either/Or Fallacy)',
      },
      {
        type: 'cbt',
        question: 'In formal argument structure, the statements offered to provide justification or evidence for a claim are called:',
        options: ['Conclusions', 'Premises', 'Fallacies', 'Analogies'],
        correctAnswer: 'Premises',
      },
    ],
  },
];
