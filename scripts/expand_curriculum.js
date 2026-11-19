// scripts/expand_curriculum.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const facultiesDir = path.resolve(__dirname, '../src/seed/faculties');

// Import compiled curriculum tree
const { CURRICULUM_TREE } = await import('../dist/seed/faculties/index.js');

console.log(`Loaded ${CURRICULUM_TREE.length} faculties from compiled seed.`);

// Define missing level courses for departments that currently lack 100-500 levels
const DEPARTMENT_LEVEL_COMPLETIONS = {
  // FMGS
  'FMGS_ACC': [
    { code: 'ACC 501', title: 'Advanced Forensic Accounting and Fraud Examination', level: 500, semester: 'harmattan' },
    { code: 'ACC 503', title: 'International Accounting & Financial Reporting Standards (IFRS)', level: 500, semester: 'harmattan' },
    { code: 'ACC 502', title: 'Strategic Financial Management & Corporate Governance', level: 500, semester: 'rain' },
    { code: 'ACC 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FMGS_MKT': [
    { code: 'MKT 501', title: 'Strategic Marketing Management & Brand Equity', level: 500, semester: 'harmattan' },
    { code: 'MKT 503', title: 'Global Marketing & International Trade Policy', level: 500, semester: 'harmattan' },
    { code: 'MKT 502', title: 'Digital Marketing Analytics & Consumer Insights', level: 500, semester: 'rain' },
    { code: 'MKT 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FMGS_MGT': [
    { code: 'MGT 501', title: 'Strategic Management & Business Policy II', level: 500, semester: 'harmattan' },
    { code: 'MGT 503', title: 'Corporate Governance & Leadership Ethics', level: 500, semester: 'harmattan' },
    { code: 'MGT 502', title: 'Operations Research & Decision Analysis', level: 500, semester: 'rain' },
    { code: 'MGT 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain' },
  ],

  // FES
  'FES_FAA': [
    { code: 'FAA 501', title: 'Advanced Studio Practice & Creative Direction I', level: 500, semester: 'harmattan' },
    { code: 'FAA 503', title: 'Contemporary African Art & Art Criticism', level: 500, semester: 'harmattan' },
    { code: 'FAA 502', title: 'Exhibition Design, Curation & Gallery Management', level: 500, semester: 'rain' },
    { code: 'FAA 599', title: 'B.A. Final Year Exhibition & Creative Project', level: 500, semester: 'rain' },
  ],

  // FPAS
  'FPAS_PAM': [
    { code: 'PAM 501', title: 'Functional Analysis & Operator Theory', level: 500, semester: 'harmattan' },
    { code: 'PAM 503', title: 'Partial Differential Equations & Boundary Value Problems', level: 500, semester: 'harmattan' },
    { code: 'PAM 502', title: 'Advanced Numerical Optimization & Fluid Dynamics', level: 500, semester: 'rain' },
    { code: 'PAM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FPAS_PAP': [
    { code: 'PAP 501', title: 'Quantum Mechanics II & Solid State Physics', level: 500, semester: 'harmattan' },
    { code: 'PAP 503', title: 'Nuclear and Particle Physics & Reactor Technology', level: 500, semester: 'harmattan' },
    { code: 'PAP 502', title: 'Statistical Mechanics & Materials Characterization', level: 500, semester: 'rain' },
    { code: 'PAP 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FPAS_BCH': [
    { code: 'BCH 501', title: 'Advanced Molecular Biology & Genetic Engineering', level: 500, semester: 'harmattan' },
    { code: 'BCH 503', title: 'Clinical Biochemistry & Biochemical Toxicology', level: 500, semester: 'harmattan' },
    { code: 'BCH 502', title: 'Industrial Biotechnology & Fermentation Biochemistry', level: 500, semester: 'rain' },
    { code: 'BCH 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FPAS_PAB': [
    { code: 'PAB 501', title: 'Advanced Ecology, Conservation & Environmental Biology', level: 500, semester: 'harmattan' },
    { code: 'PAB 503', title: 'Molecular Genetics & Biosystematics', level: 500, semester: 'harmattan' },
    { code: 'PAB 502', title: 'Applied Entomology & Parasitology', level: 500, semester: 'rain' },
    { code: 'PAB 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FPAS_PAC': [
    { code: 'PAC 501', title: 'Advanced Spectroscopy & Instrumental Analysis', level: 500, semester: 'harmattan' },
    { code: 'PAC 503', title: 'Heterocyclic Chemistry & Natural Products Synthesis', level: 500, semester: 'harmattan' },
    { code: 'PAC 502', title: 'Industrial Chemical Synthesis & Polymer Chemistry', level: 500, semester: 'rain' },
    { code: 'PAC 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],
  'FPAS_STA': [
    { code: 'STA 501', title: 'Advanced Multivariate Analysis & Data Mining', level: 500, semester: 'harmattan' },
    { code: 'STA 503', title: 'Stochastic Processes & Bayesian Inference', level: 500, semester: 'harmattan' },
    { code: 'STA 502', title: 'Time Series Forecasting & Actuarial Statistics', level: 500, semester: 'rain' },
    { code: 'STA 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain' },
  ],

  // FASS
  'FASS_ELS': [
    { code: 'ELS 501', title: 'Advanced Critical Theory & Postcolonial Discourse', level: 500, semester: 'harmattan' },
    { code: 'ELS 503', title: 'Applied Linguistics & Discourse Analysis', level: 500, semester: 'harmattan' },
    { code: 'ELS 502', title: 'Stylistics & Modern African Literary Studies', level: 500, semester: 'rain' },
    { code: 'ELS 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_HIS': [
    { code: 'HIS 501', title: 'Historiography & Philosophy of History', level: 500, semester: 'harmattan' },
    { code: 'HIS 503', title: 'Diplomatic History & Contemporary Conflict Resolution', level: 500, semester: 'harmattan' },
    { code: 'HIS 502', title: 'Decolonization & Political Transformations in West Africa', level: 500, semester: 'rain' },
    { code: 'HIS 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_PHL': [
    { code: 'PHL 501', title: 'Advanced Epistemology & Metaphysics', level: 500, semester: 'harmattan' },
    { code: 'PHL 503', title: 'Contemporary Social and Political Philosophy', level: 500, semester: 'harmattan' },
    { code: 'PHL 502', title: 'Bioethics & Philosophy of Artificial Intelligence', level: 500, semester: 'rain' },
    { code: 'PHL 599', title: 'B.A. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_POL': [
    { code: 'POL 501', title: 'Advanced Comparative Politics & Democratic Consolidation', level: 500, semester: 'harmattan' },
    { code: 'POL 503', title: 'Public Policy Formulation, Implementation & Evaluation', level: 500, semester: 'harmattan' },
    { code: 'POL 502', title: 'International Political Economy & Global Governance', level: 500, semester: 'rain' },
    { code: 'POL 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_PSY': [
    { code: 'PSY 501', title: 'Advanced Clinical & Neuropsychology', level: 500, semester: 'harmattan' },
    { code: 'PSY 503', title: 'Organizational Psychology & Psychometrics', level: 500, semester: 'harmattan' },
    { code: 'PSY 502', title: 'Forensic Psychology & Criminal Profiling', level: 500, semester: 'rain' },
    { code: 'PSY 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_SOC': [
    { code: 'SOC 501', title: 'Contemporary Sociological Theories & Epistemology', level: 500, semester: 'harmattan' },
    { code: 'SOC 503', title: 'Urbanization, Demography & Social Development', level: 500, semester: 'harmattan' },
    { code: 'SOC 502', title: 'Sociology of Deviance, Crime & Social Control', level: 500, semester: 'rain' },
    { code: 'SOC 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_LIS': [
    { code: 'LIS 501', title: 'Digital Libraries, Repositories & Knowledge Architecture', level: 500, semester: 'harmattan' },
    { code: 'LIS 503', title: 'Information Retrieval Systems & Semantic Web', level: 500, semester: 'harmattan' },
    { code: 'LIS 502', title: 'Archival Science, Records Management & Digital Preservation', level: 500, semester: 'rain' },
    { code: 'LIS 599', title: 'B.LIS. Final Year Project', level: 500, semester: 'rain' },
  ],
  'FASS_MCM': [
    { code: 'MCM 501', title: 'Advanced Mass Communication Theories & Media Ecology', level: 500, semester: 'harmattan' },
    { code: 'MCM 503', title: 'Digital Media Production & Investigative Journalism', level: 500, semester: 'harmattan' },
    { code: 'MCM 502', title: 'Public Relations Campaigns & Crisis Communication', level: 500, semester: 'rain' },
    { code: 'MCM 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain' },
  ],
  'FASS_ECO': [
    { code: 'ECO 501', title: 'Advanced Econometrics & Time Series Modeling', level: 500, semester: 'harmattan' },
    { code: 'ECO 503', title: 'Monetary Economics & Central Banking Operations', level: 500, semester: 'harmattan' },
    { code: 'ECO 502', title: 'Development Economics & Structural Transformation', level: 500, semester: 'rain' },
    { code: 'ECO 599', title: 'B.Sc. Final Year Dissertation', level: 500, semester: 'rain' },
  ],

  // FBMS
  'FBMS_ANA': [
    { code: 'ANA 501', title: 'Advanced Neuroanatomy & Clinical Teratology', level: 500, semester: 'harmattan' },
    { code: 'ANA 503', title: 'Applied Surgical Anatomy & Microtechnique', level: 500, semester: 'harmattan' },
    { code: 'ANA 502', title: 'Anthropological Anatomy & Forensic Osteology', level: 500, semester: 'rain' },
    { code: 'ANA 599', title: 'B.Sc. Final Year Research Project', level: 500, semester: 'rain' },
  ],
  'FBMS_PHS': [
    { code: 'PHS 501', title: 'Advanced Cardiovascular & Respiratory Physiology', level: 500, semester: 'harmattan' },
    { code: 'PHS 503', title: 'Endocrine & Reproductive System Physiology', level: 500, semester: 'harmattan' },
    { code: 'PHS 502', title: 'Exercise, Environmental & Altitude Physiology', level: 500, semester: 'rain' },
    { code: 'PHS 599', title: 'B.Sc. Final Year Research Project', level: 500, semester: 'rain' },
  ],

  // FBCS (Basic Clinical Sciences - 100, 200 foundations)
  'FBCS_CPT': [
    { code: 'CPT 101', title: 'Introduction to Chemical Pathology & Clinical Chemistry', level: 100, semester: 'harmattan' },
    { code: 'CPT 102', title: 'Principles of Medical Laboratory Measurements', level: 100, semester: 'rain' },
    { code: 'CPT 201', title: 'General Pathology & Acid-Base Homeostasis', level: 200, semester: 'harmattan' },
    { code: 'CPT 202', title: 'Clinical Enzymology & Plasma Protein Pathology', level: 200, semester: 'rain' },
  ],
  'FBCS_HBT': [
    { code: 'HBT 101', title: 'Introduction to Haematology & Cellular Blood Elements', level: 100, semester: 'harmattan' },
    { code: 'HBT 102', title: 'Blood Group Antigens & Transfusion Fundamentals', level: 100, semester: 'rain' },
    { code: 'HBT 201', title: 'Haemopoiesis & Anaemias Classification', level: 200, semester: 'harmattan' },
    { code: 'HBT 202', title: 'Haemostasis, Coagulation Cascade & Thrombosis', level: 200, semester: 'rain' },
  ],
  'FBCS_MMP': [
    { code: 'MMP 101', title: 'Introduction to Medical Microbiology & Infection', level: 100, semester: 'harmattan' },
    { code: 'MMP 102', title: 'Principles of Sterilization, Asepsis & Disinfection', level: 100, semester: 'rain' },
    { code: 'MMP 201', title: 'Bacteriology & Bacterial Pathogenesis Mechanisms', level: 200, semester: 'harmattan' },
    { code: 'MMP 202', title: 'Medical Virology & Clinical Parasitology', level: 200, semester: 'rain' },
  ],
  'FBCS_MAH': [
    { code: 'MAH 101', title: 'Introduction to Morbid Anatomy & Histopathology', level: 100, semester: 'harmattan' },
    { code: 'MAH 102', title: 'Cellular Pathology & Tissue Fixation Principles', level: 100, semester: 'rain' },
    { code: 'MAH 201', title: 'Cellular Injury, Necrosis, Apoptosis & Inflammation', level: 200, semester: 'harmattan' },
    { code: 'MAH 202', title: 'Hemodynamic Disorders, Thrombosis & Infarction', level: 200, semester: 'rain' },
  ],
  'FBCS_PHT': [
    { code: 'PHT 101', title: 'Introduction to Pharmacology & Drug Discovery', level: 100, semester: 'harmattan' },
    { code: 'PHT 102', title: 'Routes of Drug Administration & Dosage Formulations', level: 100, semester: 'rain' },
    { code: 'PHT 201', title: 'General Pharmacokinetics & Pharmacodynamics', level: 200, semester: 'harmattan' },
    { code: 'PHT 202', title: 'Autonomic Nervous System Pharmacology', level: 200, semester: 'rain' },
  ],

  // FCS (Clinical Sciences foundations - 100, 200, 300)
  'FCS_ANE': [
    { code: 'ANE 101', title: 'Introduction to Anaesthesiology & Critical Care', level: 100, semester: 'harmattan' },
    { code: 'ANE 201', title: 'Pre-operative Patient Evaluation & Basic Airway Management', level: 200, semester: 'harmattan' },
    { code: 'ANE 301', title: 'Principles of Local, Regional & General Anaesthesia', level: 300, semester: 'harmattan' },
  ],
  'FCS_CMM': [
    { code: 'CMM 101', title: 'Introduction to Community Medicine & Global Public Health', level: 100, semester: 'harmattan' },
    { code: 'CMM 201', title: 'Demography, Biostatistics & Environmental Health Sciences', level: 200, semester: 'rain' },
  ],
  'FCS_ENT': [
    { code: 'ENT 101', title: 'Introduction to Otorhinolaryngology', level: 100, semester: 'harmattan' },
    { code: 'ENT 201', title: 'Applied Anatomy & Physiology of the Ear, Nose and Throat', level: 200, semester: 'harmattan' },
    { code: 'ENT 301', title: 'Clinical Examination & Diagnostic Techniques in Otolaryngology', level: 300, semester: 'rain' },
  ],
  'FCS_MED': [
    { code: 'MED 201', title: 'Introduction to Clinical Medicine & Physical Diagnosis', level: 200, semester: 'rain' },
  ],
  'FCS_OBG': [
    { code: 'OBG 101', title: 'Introduction to Obstetrics and Gynaecology', level: 100, semester: 'harmattan' },
    { code: 'OBG 201', title: 'Anatomy and Physiology of the Female Reproductive System', level: 200, semester: 'rain' },
    { code: 'OBG 301', title: 'Antenatal Care, Normal Labor and Puerperium', level: 300, semester: 'harmattan' },
  ],
  'FCS_OPH': [
    { code: 'OPH 101', title: 'Introduction to Ophthalmology and Visual Sciences', level: 100, semester: 'harmattan' },
    { code: 'OPH 201', title: 'Ocular Anatomy, Physiology and Optics', level: 200, semester: 'harmattan' },
    { code: 'OPH 301', title: 'Clinical Examination of the Eye & Common Eye Disorders', level: 300, semester: 'rain' },
  ],
  'FCS_PCH': [
    { code: 'PCH 101', title: 'Introduction to Child Health and Development', level: 100, semester: 'harmattan' },
    { code: 'PCH 201', title: 'Growth, Development & Immunization in Infancy', level: 200, semester: 'rain' },
    { code: 'PCH 301', title: 'Common Neonatal and Pediatric Infections', level: 300, semester: 'harmattan' },
  ],
  'FCS_PCY': [
    { code: 'PCY 101', title: 'Introduction to Behavioral Sciences and Psychiatry', level: 100, semester: 'harmattan' },
    { code: 'PCY 201', title: 'Psychopathology & Mental State Examination Fundamentals', level: 200, semester: 'harmattan' },
    { code: 'PCY 301', title: 'Clinical Syndromes in Adult & Community Psychiatry', level: 300, semester: 'rain' },
  ],
  'FCS_RAD': [
    { code: 'RAD 101', title: 'Introduction to Diagnostic Imaging & Radiation Physics', level: 100, semester: 'harmattan' },
    { code: 'RAD 201', title: 'Radiation Protection, Radiobiology & X-Ray Technology', level: 200, semester: 'harmattan' },
    { code: 'RAD 301', title: 'Ultrasound, Computed Tomography & MRI Imaging Principles', level: 300, semester: 'rain' },
  ],
  'FCS_SUR': [
    { code: 'SUR 101', title: 'Introduction to Principles of Surgery & Wound Healing', level: 100, semester: 'harmattan' },
    { code: 'SUR 201', title: 'Surgical Asepsis, Hemostasis & Shock Management', level: 200, semester: 'rain' },
  ],
};

console.log('Defined structural completions for all faculties.');
