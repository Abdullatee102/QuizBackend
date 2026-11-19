// scripts/build_full_curriculum.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { synthesizeCbtQuestions, synthesizeTheoryQuestions } from './build_curriculum_engine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src/seed/faculties');

// Import compiled curriculum tree
const { CURRICULUM_TREE } = await import('../dist/seed/faculties/index.js');

console.log(`Starting comprehensive curriculum & question bank expansion across all ${CURRICULUM_TREE.length} faculties...`);

// 1. Missing level course definitions to ensure every department has 100-500 levels
const DEPARTMENT_COMPLETIONS = {
  // FMGS
  'FMGS_ACC': [
    { code: 'ACC 501', title: 'Advanced Forensic Accounting and Fraud Examination', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ACC 503', title: 'International Accounting & Financial Reporting Standards (IFRS)', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ACC 502', title: 'Strategic Financial Management & Corporate Governance', level: 500, semester: 'rain', questions: [] },
    { code: 'ACC 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FMGS_MKT': [
    { code: 'MKT 501', title: 'Strategic Marketing Management & Brand Equity', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MKT 503', title: 'Global Marketing & International Trade Policy', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MKT 502', title: 'Digital Marketing Analytics & Consumer Insights', level: 500, semester: 'rain', questions: [] },
    { code: 'MKT 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FMGS_MGT': [
    { code: 'MGT 501', title: 'Strategic Management & Business Policy II', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MGT 503', title: 'Corporate Governance & Leadership Ethics', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MGT 502', title: 'Operations Research & Decision Analysis', level: 500, semester: 'rain', questions: [] },
    { code: 'MGT 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],

  // FES
  'FES_FAA': [
    { code: 'FAA 501', title: 'Advanced Studio Practice & Creative Direction I', level: 500, semester: 'harmattan', questions: [] },
    { code: 'FAA 503', title: 'Contemporary African Art & Art Criticism', level: 500, semester: 'harmattan', questions: [] },
    { code: 'FAA 502', title: 'Exhibition Design, Curation & Gallery Management', level: 500, semester: 'rain', questions: [] },
    { code: 'FAA 599', title: 'B.A. Final Year Exhibition & Creative Project', level: 500, semester: 'rain', questions: [] },
  ],

  // FPAS
  'FPAS_PAM': [
    { code: 'PAM 501', title: 'Functional Analysis & Operator Theory', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAM 503', title: 'Partial Differential Equations & Boundary Value Problems', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAM 502', title: 'Advanced Numerical Optimization & Fluid Dynamics', level: 500, semester: 'rain', questions: [] },
    { code: 'PAM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FPAS_PAP': [
    { code: 'PAP 501', title: 'Quantum Mechanics II & Solid State Physics', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAP 503', title: 'Nuclear and Particle Physics & Reactor Technology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAP 502', title: 'Statistical Mechanics & Materials Characterization', level: 500, semester: 'rain', questions: [] },
    { code: 'PAP 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FPAS_BCH': [
    { code: 'BCH 501', title: 'Advanced Molecular Biology & Genetic Engineering', level: 500, semester: 'harmattan', questions: [] },
    { code: 'BCH 503', title: 'Clinical Biochemistry & Biochemical Toxicology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'BCH 502', title: 'Industrial Biotechnology & Fermentation Biochemistry', level: 500, semester: 'rain', questions: [] },
    { code: 'BCH 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FPAS_PAB': [
    { code: 'PAB 501', title: 'Advanced Ecology, Conservation & Environmental Biology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAB 503', title: 'Molecular Genetics & Biosystematics', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAB 502', title: 'Applied Entomology & Parasitology', level: 500, semester: 'rain', questions: [] },
    { code: 'PAB 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FPAS_PAC': [
    { code: 'PAC 501', title: 'Advanced Spectroscopy & Instrumental Analysis', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAC 503', title: 'Heterocyclic Chemistry & Natural Products Synthesis', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PAC 502', title: 'Industrial Chemical Synthesis & Polymer Chemistry', level: 500, semester: 'rain', questions: [] },
    { code: 'PAC 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],
  'FPAS_STA': [
    { code: 'STA 501', title: 'Advanced Multivariate Analysis & Data Mining', level: 500, semester: 'harmattan', questions: [] },
    { code: 'STA 503', title: 'Stochastic Processes & Bayesian Inference', level: 500, semester: 'harmattan', questions: [] },
    { code: 'STA 502', title: 'Time Series Forecasting & Actuarial Statistics', level: 500, semester: 'rain', questions: [] },
    { code: 'STA 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
  ],

  // FASS
  'FASS_ELS': [
    { code: 'ELS 501', title: 'Advanced Critical Theory & Postcolonial Discourse', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ELS 503', title: 'Applied Linguistics & Discourse Analysis', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ELS 502', title: 'Stylistics & Modern African Literary Studies', level: 500, semester: 'rain', questions: [] },
    { code: 'ELS 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_HIS': [
    { code: 'HIS 501', title: 'Historiography & Philosophy of History', level: 500, semester: 'harmattan', questions: [] },
    { code: 'HIS 503', title: 'Diplomatic History & Contemporary Conflict Resolution', level: 500, semester: 'harmattan', questions: [] },
    { code: 'HIS 502', title: 'Decolonization & Political Transformations in West Africa', level: 500, semester: 'rain', questions: [] },
    { code: 'HIS 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_PHL': [
    { code: 'PHL 501', title: 'Advanced Epistemology & Metaphysics', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PHL 503', title: 'Contemporary Social and Political Philosophy', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PHL 502', title: 'Bioethics & Philosophy of Artificial Intelligence', level: 500, semester: 'rain', questions: [] },
    { code: 'PHL 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_POL': [
    { code: 'POL 501', title: 'Advanced Comparative Politics & Democratic Consolidation', level: 500, semester: 'harmattan', questions: [] },
    { code: 'POL 503', title: 'Public Policy Formulation, Implementation & Evaluation', level: 500, semester: 'harmattan', questions: [] },
    { code: 'POL 502', title: 'International Political Economy & Global Governance', level: 500, semester: 'rain', questions: [] },
    { code: 'POL 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_PSY': [
    { code: 'PSY 501', title: 'Advanced Clinical & Neuropsychology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PSY 503', title: 'Organizational Psychology & Psychometrics', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PSY 502', title: 'Forensic Psychology & Criminal Profiling', level: 500, semester: 'rain', questions: [] },
    { code: 'PSY 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_SOC': [
    { code: 'SOC 501', title: 'Contemporary Sociological Theories & Epistemology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'SOC 503', title: 'Urbanization, Demography & Social Development', level: 500, semester: 'harmattan', questions: [] },
    { code: 'SOC 502', title: 'Sociology of Deviance, Crime & Social Control', level: 500, semester: 'rain', questions: [] },
    { code: 'SOC 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_LIS': [
    { code: 'LIS 501', title: 'Digital Libraries, Repositories & Knowledge Architecture', level: 500, semester: 'harmattan', questions: [] },
    { code: 'LIS 503', title: 'Information Retrieval Systems & Semantic Web', level: 500, semester: 'harmattan', questions: [] },
    { code: 'LIS 502', title: 'Archival Science, Records Management & Digital Preservation', level: 500, semester: 'rain', questions: [] },
    { code: 'LIS 599', title: 'B.LIS. Final Year Project', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_MCM': [
    { code: 'MCM 501', title: 'Advanced Mass Communication Theories & Media Ecology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MCM 503', title: 'Digital Media Production & Investigative Journalism', level: 500, semester: 'harmattan', questions: [] },
    { code: 'MCM 502', title: 'Public Relations Campaigns & Crisis Communication', level: 500, semester: 'rain', questions: [] },
    { code: 'MCM 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],
  'FASS_ECO': [
    { code: 'ECO 501', title: 'Advanced Econometrics & Time Series Modeling', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ECO 503', title: 'Monetary Economics & Central Banking Operations', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ECO 502', title: 'Development Economics & Structural Transformation', level: 500, semester: 'rain', questions: [] },
    { code: 'ECO 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain', questions: [] },
  ],

  // FBMS
  'FBMS_ANA': [
    { code: 'ANA 501', title: 'Advanced Neuroanatomy & Clinical Teratology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ANA 503', title: 'Applied Surgical Anatomy & Microtechnique', level: 500, semester: 'harmattan', questions: [] },
    { code: 'ANA 502', title: 'Anthropological Anatomy & Forensic Osteology', level: 500, semester: 'rain', questions: [] },
    { code: 'ANA 599', title: 'B.Sc. Final Year Research Project', level: 500, semester: 'rain', questions: [] },
  ],
  'FBMS_PHS': [
    { code: 'PHS 501', title: 'Advanced Cardiovascular & Respiratory Physiology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PHS 503', title: 'Endocrine & Reproductive System Physiology', level: 500, semester: 'harmattan', questions: [] },
    { code: 'PHS 502', title: 'Exercise, Environmental & Altitude Physiology', level: 500, semester: 'rain', questions: [] },
    { code: 'PHS 599', title: 'B.Sc. Final Year Research Project', level: 500, semester: 'rain', questions: [] },
  ],

  // FBCS (Basic Clinical Sciences foundations)
  'FBCS_CPT': [
    { code: 'CPT 101', title: 'Introduction to Chemical Pathology & Clinical Chemistry', level: 100, semester: 'harmattan', questions: [] },
    { code: 'CPT 102', title: 'Principles of Medical Laboratory Measurements', level: 100, semester: 'rain', questions: [] },
    { code: 'CPT 201', title: 'General Pathology & Acid-Base Homeostasis', level: 200, semester: 'harmattan', questions: [] },
    { code: 'CPT 202', title: 'Clinical Enzymology & Plasma Protein Pathology', level: 200, semester: 'rain', questions: [] },
  ],
  'FBCS_HBT': [
    { code: 'HBT 101', title: 'Introduction to Haematology & Cellular Blood Elements', level: 100, semester: 'harmattan', questions: [] },
    { code: 'HBT 102', title: 'Blood Group Antigens & Transfusion Fundamentals', level: 100, semester: 'rain', questions: [] },
    { code: 'HBT 201', title: 'Haemopoiesis & Anaemias Classification', level: 200, semester: 'harmattan', questions: [] },
    { code: 'HBT 202', title: 'Haemostasis, Coagulation Cascade & Thrombosis', level: 200, semester: 'rain', questions: [] },
  ],
  'FBCS_MMP': [
    { code: 'MMP 101', title: 'Introduction to Medical Microbiology & Infection', level: 100, semester: 'harmattan', questions: [] },
    { code: 'MMP 102', title: 'Principles of Sterilization, Asepsis & Disinfection', level: 100, semester: 'rain', questions: [] },
    { code: 'MMP 201', title: 'Bacteriology & Bacterial Pathogenesis Mechanisms', level: 200, semester: 'harmattan', questions: [] },
    { code: 'MMP 202', title: 'Medical Virology & Clinical Parasitology', level: 200, semester: 'rain', questions: [] },
  ],
  'FBCS_MAH': [
    { code: 'MAH 101', title: 'Introduction to Morbid Anatomy & Histopathology', level: 100, semester: 'harmattan', questions: [] },
    { code: 'MAH 102', title: 'Cellular Pathology & Tissue Fixation Principles', level: 100, semester: 'rain', questions: [] },
    { code: 'MAH 201', title: 'Cellular Injury, Necrosis, Apoptosis & Inflammation', level: 200, semester: 'harmattan', questions: [] },
    { code: 'MAH 202', title: 'Hemodynamic Disorders, Thrombosis & Infarction', level: 200, semester: 'rain', questions: [] },
  ],
  'FBCS_PHT': [
    { code: 'PHT 101', title: 'Introduction to Pharmacology & Drug Discovery', level: 100, semester: 'harmattan', questions: [] },
    { code: 'PHT 102', title: 'Routes of Drug Administration & Dosage Formulations', level: 100, semester: 'rain', questions: [] },
    { code: 'PHT 201', title: 'General Pharmacokinetics & Pharmacodynamics', level: 200, semester: 'harmattan', questions: [] },
    { code: 'PHT 202', title: 'Autonomic Nervous System Pharmacology', level: 200, semester: 'rain', questions: [] },
  ],

  // FCS (Clinical Sciences foundations)
  'FCS_ANE': [
    { code: 'ANE 101', title: 'Introduction to Anaesthesiology & Critical Care', level: 100, semester: 'harmattan', questions: [] },
    { code: 'ANE 201', title: 'Pre-operative Patient Evaluation & Basic Airway Management', level: 200, semester: 'harmattan', questions: [] },
    { code: 'ANE 301', title: 'Principles of Local, Regional & General Anaesthesia', level: 300, semester: 'harmattan', questions: [] },
  ],
  'FCS_CMM': [
    { code: 'CMM 101', title: 'Introduction to Community Medicine & Global Public Health', level: 100, semester: 'harmattan', questions: [] },
    { code: 'CMM 201', title: 'Demography, Biostatistics & Environmental Health Sciences', level: 200, semester: 'rain', questions: [] },
  ],
  'FCS_ENT': [
    { code: 'ENT 101', title: 'Introduction to Otorhinolaryngology', level: 100, semester: 'harmattan', questions: [] },
    { code: 'ENT 201', title: 'Applied Anatomy & Physiology of the Ear, Nose and Throat', level: 200, semester: 'harmattan', questions: [] },
    { code: 'ENT 301', title: 'Clinical Examination & Diagnostic Techniques in Otolaryngology', level: 300, semester: 'rain', questions: [] },
  ],
  'FCS_MED': [
    { code: 'MED 201', title: 'Introduction to Clinical Medicine & Physical Diagnosis', level: 200, semester: 'rain', questions: [] },
  ],
  'FCS_OBG': [
    { code: 'OBG 101', title: 'Introduction to Obstetrics and Gynaecology', level: 100, semester: 'harmattan', questions: [] },
    { code: 'OBG 201', title: 'Anatomy and Physiology of the Female Reproductive System', level: 200, semester: 'rain', questions: [] },
    { code: 'OBG 301', title: 'Antenatal Care, Normal Labor and Puerperium', level: 300, semester: 'harmattan', questions: [] },
  ],
  'FCS_OPH': [
    { code: 'OPH 101', title: 'Introduction to Ophthalmology and Visual Sciences', level: 100, semester: 'harmattan', questions: [] },
    { code: 'OPH 201', title: 'Ocular Anatomy, Physiology and Optics', level: 200, semester: 'harmattan', questions: [] },
    { code: 'OPH 301', title: 'Clinical Examination of the Eye & Common Eye Disorders', level: 300, semester: 'rain', questions: [] },
  ],
  'FCS_PCH': [
    { code: 'PCH 101', title: 'Introduction to Child Health and Development', level: 100, semester: 'harmattan', questions: [] },
    { code: 'PCH 201', title: 'Growth, Development & Immunization in Infancy', level: 200, semester: 'rain', questions: [] },
    { code: 'PCH 301', title: 'Common Neonatal and Pediatric Infections', level: 300, semester: 'harmattan', questions: [] },
  ],
  'FCS_PCY': [
    { code: 'PCY 101', title: 'Introduction to Behavioral Sciences and Psychiatry', level: 100, semester: 'harmattan', questions: [] },
    { code: 'PCY 201', title: 'Psychopathology & Mental State Examination Fundamentals', level: 200, semester: 'harmattan', questions: [] },
    { code: 'PCY 301', title: 'Clinical Syndromes in Adult & Community Psychiatry', level: 300, semester: 'rain', questions: [] },
  ],
  'FCS_RAD': [
    { code: 'RAD 101', title: 'Introduction to Diagnostic Imaging & Radiation Physics', level: 100, semester: 'harmattan', questions: [] },
    { code: 'RAD 201', title: 'Radiation Protection, Radiobiology & X-Ray Technology', level: 200, semester: 'harmattan', questions: [] },
    { code: 'RAD 301', title: 'Ultrasound, Computed Tomography & MRI Imaging Principles', level: 300, semester: 'rain', questions: [] },
  ],
  'FCS_SUR': [
    { code: 'SUR 101', title: 'Introduction to Principles of Surgery & Wound Healing', level: 100, semester: 'harmattan', questions: [] },
    { code: 'SUR 201', title: 'Surgical Asepsis, Hemostasis & Shock Management', level: 200, semester: 'rain', questions: [] },
  ],
};

// Global canonical question registry
const globalQuestionRegistry = new Map();

// Helper to serialize an object cleanly as TypeScript code
function formatQuestionObject(q) {
  const jsonStr = JSON.stringify(q, null, 2);
  // Format for clean indentation inside arrays
  return jsonStr
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `    ${line}`))
    .join('\n');
}

function formatCourseObject(course) {
  const lines = [];
  lines.push(`  {`);
  lines.push(`    code: ${JSON.stringify(course.code)},`);
  lines.push(`    title: ${JSON.stringify(course.title)},`);
  lines.push(`    level: ${course.level},`);
  lines.push(`    semester: ${JSON.stringify(course.semester)},`);
  lines.push(`    questions: [`);
  for (let i = 0; i < course.questions.length; i++) {
    const q = course.questions[i];
    const comma = i === course.questions.length - 1 ? '' : ',';
    lines.push(`      ${formatQuestionObject(q)}${comma}`);
  }
  lines.push(`    ],`);
  lines.push(`  }`);
  return lines.join('\n');
}

// Process all faculties
let totalNewCbt = 0;
let totalNewTheory = 0;
let totalCoursesProcessed = 0;

for (const faculty of CURRICULUM_TREE) {
  console.log(`\nProcessing Faculty: ${faculty.code} — ${faculty.facultyName}`);

  for (const dept of faculty.departments) {
    const deptKey = `${faculty.code}_${dept.code}`;

    // 1. Add missing level courses if defined
    if (DEPARTMENT_COMPLETIONS[deptKey]) {
      const existingCodes = new Set(dept.courses.map((c) => c.code));
      for (const missingCourse of DEPARTMENT_COMPLETIONS[deptKey]) {
        if (!existingCodes.has(missingCourse.code)) {
          dept.courses.push({
            code: missingCourse.code,
            title: missingCourse.title,
            level: missingCourse.level,
            semester: missingCourse.semester,
            questions: missingCourse.questions || [],
          });
        }
      }
    }

    // 2. Expand every departmental course
    for (const course of dept.courses) {
      totalCoursesProcessed++;
      const currentQuestions = course.questions || [];
      const existingCbt = currentQuestions.filter((q) => q.type === 'cbt');
      const existingTheory = currentQuestions.filter((q) => q.type === 'theory');

      const targetCbt = course.level <= 200 ? 10 : 5;
      const targetTheory = course.level <= 200 ? 5 : 10;

      const cbtNeeded = Math.max(0, targetCbt - existingCbt.length);
      const theoryNeeded = Math.max(0, targetTheory - existingTheory.length);

      let newCbt = [];
      let newTheory = [];

      if (cbtNeeded > 0) {
        newCbt = synthesizeCbtQuestions(course.code, course.title, course.level, cbtNeeded, existingCbt.length);
        totalNewCbt += newCbt.length;
      }

      if (theoryNeeded > 0) {
        newTheory = synthesizeTheoryQuestions(course.code, course.title, course.level, theoryNeeded, existingTheory.length);
        totalNewTheory += newTheory.length;
      }

      // Combine: keep existing questions untouched, append synthesized ones
      course.questions = [...currentQuestions, ...newCbt, ...newTheory];

      // Register in global registry for cross-department reuse
      if (!globalQuestionRegistry.has(course.code)) {
        globalQuestionRegistry.set(course.code, course.questions);
      }
    }
    console.log(`  ✓ Completed Department [${dept.code}] with ${dept.courses.length} courses across 100-500 levels.`);
  }
}

console.log(`\nSynthesized ${totalNewCbt} new CBT questions and ${totalNewTheory} new Theory questions across ${totalCoursesProcessed} courses.`);

// 3. Write updated faculty files back to src/seed/faculties/
console.log('\nWriting updated TypeScript curriculum files...');

// Single-file faculties
const singleFileFaculties = ['fet', 'fes', 'fpas', 'fass', 'fbms', 'fbcs', 'fcs', 'fns', 'fag'];

for (const facCode of singleFileFaculties) {
  const facObj = CURRICULUM_TREE.find((f) => f.code.toLowerCase() === facCode.toLowerCase());
  if (!facObj) continue;

  const varName = `${facCode.toLowerCase()}Faculty`;
  const filePath = path.join(srcDir, `${facCode.toLowerCase()}.ts`);

  let codeOutput = `// src/seed/faculties/${facCode.toLowerCase()}.ts\n`;
  codeOutput += `import type { SeedFaculty } from '../types.js';\n\n`;
  codeOutput += `export const ${varName}: SeedFaculty = {\n`;
  codeOutput += `  facultyName: ${JSON.stringify(facObj.facultyName)},\n`;
  codeOutput += `  code: ${JSON.stringify(facObj.code)},\n`;
  codeOutput += `  departments: [\n`;

  for (const dept of facObj.departments) {
    codeOutput += `    {\n`;
    codeOutput += `      deptName: ${JSON.stringify(dept.deptName)},\n`;
    codeOutput += `      code: ${JSON.stringify(dept.code)},\n`;
    codeOutput += `      courses: [\n`;
    for (let i = 0; i < dept.courses.length; i++) {
      const c = dept.courses[i];
      const comma = i === dept.courses.length - 1 ? '' : ',';
      codeOutput += `${formatCourseObject(c)}${comma}\n`;
    }
    codeOutput += `      ],\n`;
    codeOutput += `    },\n`;
  }
  codeOutput += `  ],\n};\n`;

  fs.writeFileSync(filePath, codeOutput, 'utf8');
  console.log(`  ✓ Wrote ${filePath} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
}

// FFCS
const ffcsObj = CURRICULUM_TREE.find((f) => f.code === 'FFCS');
if (ffcsObj) {
  for (const dept of ffcsObj.departments) {
    const fileName = `${dept.code.toLowerCase()}.ts`;
    const varName = `${dept.code.toLowerCase()}Courses`;
    const filePath = path.join(srcDir, 'ffcs', fileName);

    let codeOutput = `// src/seed/faculties/ffcs/${fileName}\n`;
    codeOutput += `import type { SeedCourse } from '../../types.js';\n\n`;
    codeOutput += `export const ${varName}: SeedCourse[] = [\n`;
    for (let i = 0; i < dept.courses.length; i++) {
      const c = dept.courses[i];
      const comma = i === dept.courses.length - 1 ? '' : ',';
      codeOutput += `${formatCourseObject(c)}${comma}\n`;
    }
    codeOutput += `];\n`;

    fs.writeFileSync(filePath, codeOutput, 'utf8');
    console.log(`  ✓ Wrote ${filePath}`);
  }
}

// FMGS
const fmgsObj = CURRICULUM_TREE.find((f) => f.code === 'FMGS');
if (fmgsObj) {
  for (const dept of fmgsObj.departments) {
    const fileName = `${dept.code.toLowerCase()}.ts`;
    const varName = `${dept.code.toLowerCase()}Courses`;
    const filePath = path.join(srcDir, 'fmgs', fileName);

    let codeOutput = `// src/seed/faculties/fmgs/${fileName}\n`;
    codeOutput += `import type { SeedCourse } from '../../types.js';\n\n`;
    codeOutput += `export const ${varName}: SeedCourse[] = [\n`;
    for (let i = 0; i < dept.courses.length; i++) {
      const c = dept.courses[i];
      const comma = i === dept.courses.length - 1 ? '' : ',';
      codeOutput += `${formatCourseObject(c)}${comma}\n`;
    }
    codeOutput += `];\n`;

    fs.writeFileSync(filePath, codeOutput, 'utf8');
    console.log(`  ✓ Wrote ${filePath}`);
  }
}

// FRNR
const frnrObj = CURRICULUM_TREE.find((f) => f.code === 'FRNR');
if (frnrObj) {
  for (const dept of frnrObj.departments) {
    const fileName = `${dept.code.toLowerCase()}.ts`;
    const varName = `${dept.code.toLowerCase()}Courses`;
    const filePath = path.join(srcDir, 'frnr', fileName);

    let codeOutput = `// src/seed/faculties/frnr/${fileName}\n`;
    codeOutput += `import type { SeedCourse } from '../../types.js';\n\n`;
    codeOutput += `export const ${varName}: SeedCourse[] = [\n`;
    for (let i = 0; i < dept.courses.length; i++) {
      const c = dept.courses[i];
      const comma = i === dept.courses.length - 1 ? '' : ',';
      codeOutput += `${formatCourseObject(c)}${comma}\n`;
    }
    codeOutput += `];\n`;

    fs.writeFileSync(filePath, codeOutput, 'utf8');
    console.log(`  ✓ Wrote ${filePath}`);
  }
}

// FCI
const fciObj = CURRICULUM_TREE.find((f) => f.code === 'FCI');
if (fciObj) {
  for (const dept of fciObj.departments) {
    // Dept code in lowercase (csc, cyb, ins)
    const dLower = dept.code.toLowerCase();
    for (const lvl of [100, 200, 300, 400, 500]) {
      const fileName = `${dLower}${lvl}.ts`;
      const varName = `${dLower}${lvl}Courses`;
      const filePath = path.join(srcDir, 'fci', fileName);
      const lvlCourses = dept.courses.filter((c) => c.level === lvl);

      let codeOutput = `// src/seed/faculties/fci/${fileName}\n`;
      codeOutput += `import type { SeedCourse } from '../../types.js';\n\n`;
      codeOutput += `export const ${varName}: SeedCourse[] = [\n`;
      for (let i = 0; i < lvlCourses.length; i++) {
        const c = lvlCourses[i];
        const comma = i === lvlCourses.length - 1 ? '' : ',';
        codeOutput += `${formatCourseObject(c)}${comma}\n`;
      }
      codeOutput += `];\n`;

      fs.writeFileSync(filePath, codeOutput, 'utf8');
      console.log(`  ✓ Wrote ${filePath}`);
    }
  }
}

console.log('\n=============================================================');
console.log('Curriculum expansion and file emission completed successfully!');
console.log('=============================================================');
