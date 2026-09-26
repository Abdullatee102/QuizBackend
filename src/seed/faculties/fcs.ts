// src/seed/faculties/fcs.ts
import type { SeedFaculty } from '../types.js';

export const fcsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Clinical Sciences',
  code: 'FCS',
  departments: [
    {
      deptName: 'Anaesthesia',
      code: 'ANE',
      courses: [
        { code: 'ANE 401', title: 'Principles of Anaesthesia & Perioperative Care', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ANE 501', title: 'Intensive Care Medicine, Resuscitation & Pain Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'ANE 601', title: 'Advanced Clinical Anaesthesia & Critical Care Posting', level: 600, semester: 'harmattan', questions: [] },
      ],
    },
    {
      deptName: 'Community Medicine',
      code: 'CMM',
      courses: [
        { code: 'CMM 301', title: 'Epidemiology, Biostatistics & Public Health', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CMM 401', title: 'Occupational Health, Maternal & Child Health', level: 400, semester: 'harmattan', questions: [] },
        { code: 'CMM 501', title: 'Primary Health Care & Health Systems Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CMM 601', title: 'Fieldwork Posting & Public Health Practice II', level: 600, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Ear, Nose and Throat',
      code: 'ENT',
      courses: [
        { code: 'ENT 401', title: 'Basic Otolaryngology & Head-Neck Examination', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ENT 501', title: 'Clinical Otorhinolaryngology & Surgical Interventions', level: 500, semester: 'harmattan', questions: [] },
        { code: 'ENT 601', title: 'Senior Otorhinolaryngology Clinical Clerkship', level: 600, semester: 'harmattan', questions: [] },
      ],
    },
    {
      deptName: 'Medicine',
      code: 'MED',
      courses: [
        // 100 Level Pre-Clinical
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // Clinical Years
        { code: 'MED 301', title: 'Foundations of Clinical Medicine & History Taking', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MED 401', title: 'Cardiology, Pulmonology & Gastroenterology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MED 501', title: 'Nephrology, Neurology & Infectious Diseases', level: 500, semester: 'harmattan', questions: [] },
        { code: 'MED 601', title: 'Senior Clinical Medicine Clerkship & Revision', level: 600, semester: 'harmattan', questions: [] },
        { code: 'MED 602', title: 'MBBS Final Professional Examination in Medicine', level: 600, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Obstetrics and Gynaecology',
      code: 'OBG',
      courses: [
        { code: 'OBG 401', title: 'Antenatal Care, Normal Labour & Puerperium', level: 400, semester: 'harmattan', questions: [] },
        { code: 'OBG 501', title: 'High-Risk Obstetrics, Gynaecological Oncology & Reproductive Health', level: 500, semester: 'harmattan', questions: [] },
        { code: 'OBG 601', title: 'Senior Obstetrics & Gynaecology Clinical Posting', level: 600, semester: 'harmattan', questions: [] },
        { code: 'OBG 602', title: 'MBBS Final Professional Examination in O&G', level: 600, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Ophthalmology',
      code: 'OPH',
      courses: [
        { code: 'OPH 401', title: 'Clinical Ophthalmology & Vision Science', level: 400, semester: 'harmattan', questions: [] },
        { code: 'OPH 501', title: 'Ophthalmic Surgery & Blindness Prevention', level: 500, semester: 'harmattan', questions: [] },
        { code: 'OPH 601', title: 'Senior Ophthalmic Clinical Clerkship', level: 600, semester: 'harmattan', questions: [] },
      ],
    },
    {
      deptName: 'Pediatrics and Child Health',
      code: 'PCH',
      courses: [
        { code: 'PCH 401', title: 'Neonatology & Child Development', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PCH 501', title: 'Pediatric Infectious Diseases, Nutrition & Pediatric Emergencies', level: 500, semester: 'harmattan', questions: [] },
        { code: 'PCH 601', title: 'Senior Pediatrics Clinical Posting', level: 600, semester: 'harmattan', questions: [] },
        { code: 'PCH 602', title: 'MBBS Final Professional Examination in Pediatrics', level: 600, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Psychiatry',
      code: 'PCY',
      courses: [
        { code: 'PCY 401', title: 'General Psychopathology & Psychiatric Assessment', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PCY 501', title: 'Clinical Psychiatry, Psychopharmacology & Psychotherapy', level: 500, semester: 'harmattan', questions: [] },
        { code: 'PCY 601', title: 'Senior Psychiatric Clinical Clerkship', level: 600, semester: 'harmattan', questions: [] },
      ],
    },
    {
      deptName: 'Radiology',
      code: 'RAD',
      courses: [
        { code: 'RAD 401', title: 'Principles of Diagnostic Imaging & X-Ray Interpretation', level: 400, semester: 'harmattan', questions: [] },
        { code: 'RAD 501', title: 'Advanced Imaging: CT, MRI, Ultrasound & Interventional Radiology', level: 500, semester: 'harmattan', questions: [] },
        { code: 'RAD 601', title: 'Clinical Radiological Clerkship', level: 600, semester: 'harmattan', questions: [] },
      ],
    },
    {
      deptName: 'Surgery',
      code: 'SUR',
      courses: [
        { code: 'SUR 301', title: 'Principles of Surgery, Asepsis & Wound Healing', level: 300, semester: 'harmattan', questions: [] },
        { code: 'SUR 401', title: 'General Surgery, Orthopaedics & Trauma', level: 400, semester: 'harmattan', questions: [] },
        { code: 'SUR 501', title: 'Urology, Neurosurgery, Cardiothoracic & Pediatric Surgery', level: 500, semester: 'harmattan', questions: [] },
        { code: 'SUR 601', title: 'Senior Surgery Clinical Clerkship', level: 600, semester: 'harmattan', questions: [] },
        { code: 'SUR 602', title: 'MBBS Final Professional Examination in Surgery', level: 600, semester: 'rain', questions: [] },
      ],
    },
  ],
};
