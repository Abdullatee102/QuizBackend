// src/seed/faculties/fes.ts
import type { SeedFaculty } from '../types.js';

export const fesFaculty: SeedFaculty = {
  facultyName: 'Faculty of Environmental Sciences',
  code: 'FES',
  departments: [
    {
      deptName: 'Architecture',
      code: 'ARC',
      courses: [
        // 100 Level
        {
          code: 'ARC 101',
          title: 'Introduction to Architectural Design',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the three core principles of architecture identified by Vitruvius?', options: ['Speed, Cost, Size', 'Durability, Utility, Beauty (Firmitas, Utilitas, Venustas)', 'Height, Depth, Volume', 'Color, Shadow, Texture'], correctAnswer: 'Durability, Utility, Beauty (Firmitas, Utilitas, Venustas)' },
            { type: 'cbt', question: 'What is an orthographic projection used for in architectural drafting?', options: ['Creating 3D artistic rendering', 'Representing a 3D object in two dimensions using parallel projection lines', 'Recording sound acoustic reflections', 'Measuring soil load capacity'], correctAnswer: 'Representing a 3D object in two dimensions using parallel projection lines' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'ARC 102', title: 'Architectural Graphics & Freehand Drawing', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ARC 201',
          title: 'Architectural Graphics & Studio',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a building elevation in architectural drawings?', options: ['A horizontal cut through a building', 'A view of a building seen from one side (exterior facade)', 'A view from directly above', 'A structural foundation diagram'], correctAnswer: 'A view of a building seen from one side (exterior facade)' },
            { type: 'cbt', question: 'What standard scale is commonly used for residential floor plans in Nigeria?', options: ['1:1', '1:50 or 1:100', '1:1000', '1:5000'], correctAnswer: '1:50 or 1:100' },
          ],
        },
        { code: 'ARC 202', title: 'History of Architecture I', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ARC 301', title: 'Building Climatology & Advanced Design', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ARC 302', title: 'Building Structures & Construction Technology', level: 300, semester: 'rain', questions: [] },
        { code: 'ARC 399', title: 'SIWES Architectural Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ARC 401', title: 'Urban Design & Housing', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ARC 402', title: 'Landscape Architecture & Site Planning', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'ARC 501', title: 'Professional Practice & Thesis', level: 500, semester: 'harmattan', questions: [] },
        { code: 'ARC 599', title: 'B.Tech. Final Architectural Project', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Building',
      code: 'BLD',
      courses: [
        // 100 Level
        {
          code: 'BLD 101',
          title: 'Introduction to Building Technology',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the substructure of a building?', options: ['The roof and ceiling', 'The part of the building below ground level including the foundation', 'The windows and doors', 'The interior wall finishes'], correctAnswer: 'The part of the building below ground level including the foundation' },
            { type: 'cbt', question: 'What is the primary function of damp proof course (DPC)?', options: ['To increase wall strength', 'To prevent rising damp from ground into walls', 'To provide thermal insulation', 'To anchor roof trusses'], correctAnswer: 'To prevent rising damp from ground into walls' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BLD 102', title: 'Building Science & Environment', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'BLD 201',
          title: 'Building Construction & Materials',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is curing of concrete?', options: ['Painting the surface', 'Maintaining adequate moisture and temperature during early hardening to achieve target strength', 'Mixing sand and gravel', 'Demolishing defective structural members'], correctAnswer: 'Maintaining adequate moisture and temperature during early hardening to achieve target strength' },
            { type: 'cbt', question: 'Which bond in bricklaying consists of alternate headers and stretchers in every course?', options: ['English Bond', 'Flemish Bond', 'Stretcher Bond', 'Header Bond'], correctAnswer: 'Flemish Bond' },
          ],
        },
        { code: 'BLD 202', title: 'Principles of Measurement & Estimation', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'BLD 301', title: 'Structural Mechanics & Building Services', level: 300, semester: 'harmattan', questions: [] },
        { code: 'BLD 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'BLD 401', title: 'Construction Management & Economics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'BLD 402', title: 'Building Surveying & Maintenance Technology', level: 400, semester: 'rain', questions: [] },

        // 500 Level
        { code: 'BLD 501', title: 'Advanced Building Maintenance & Project Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'BLD 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Estate Management',
      code: 'ESM',
      courses: [
        // 100 Level
        {
          code: 'ESM 101',
          title: 'Introduction to Estate Management',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is real property in estate management?', options: ['Moveable household furniture', 'Land and all permanently attached structures', 'Bank cash reserves', 'Intellectual patents'], correctAnswer: 'Land and all permanently attached structures' },
            { type: 'cbt', question: 'What constitutes a freehold estate?', options: ['An estate with indefinite duration of ownership', 'A tenancy lasting strictly 1 year', 'A government leasehold of 99 years', 'A monthly rental contract'], correctAnswer: 'An estate with indefinite duration of ownership' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'ESM 102', title: 'Principles of Land Economics', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ESM 201',
          title: 'Principles of Valuation I',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which method of valuation is based on comparing sales prices of similar properties in the area?', options: ['Cost Method', 'Investment Method', 'Comparable Sales (Market) Method', 'Residual Method'], correctAnswer: 'Comparable Sales (Market) Method' },
            { type: 'cbt', question: 'What is Years Purchase (YP) in property valuation?', options: ['The calendar year a house was purchased', 'The present value of a periodic income of 1 Naira for a specified period', 'The mortgage repayment period', 'The depreciation rate per year'], correctAnswer: 'The present value of a periodic income of 1 Naira for a specified period' },
          ],
        },
        { code: 'ESM 202', title: 'Building Construction for Valuation', level: 200, semester: 'rain', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ESM 301', title: 'Property Development & Finance', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ESM 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ESM 401', title: 'Urban Land Economics', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'ESM 501', title: 'Property Rating & Taxation', level: 500, semester: 'harmattan', questions: [] },
        { code: 'ESM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Fine and Applied Arts',
      code: 'FAA',
      courses: [
        // 100 Level
        {
          code: 'FAA 101',
          title: 'Basic Drawing and Design',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which of the following are the primary colors in traditional art?', options: ['Green, Orange, Violet', 'Red, Yellow, Blue', 'Black, White, Gray', 'Cyan, Magenta, Yellow'], correctAnswer: 'Red, Yellow, Blue' },
            { type: 'cbt', question: 'What is chiaroscuro in drawing and painting?', options: ['The use of strong contrasts between light and dark to give volume', 'Sculpting with plaster', 'Weaving textile patterns', 'Firing clay in a kiln'], correctAnswer: 'The use of strong contrasts between light and dark to give volume' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'FAA 201',
          title: 'History of African Art & Studio Practice',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which ancient Nigerian civilization is famous for its terracotta sculptures dating back to 500 BC?', options: ['Nok culture', 'Igbo-Ukwu bronze', 'Benin kingdom', 'Oyo Empire'], correctAnswer: 'Nok culture' },
            { type: 'cbt', question: 'What traditional medium was extensively utilized in the historical brass castings of ancient Benin?', options: ['Direct stone carving', 'Lost-wax (cire perdue) casting technique', 'Welded steel assembly', 'Plaster molding'], correctAnswer: 'Lost-wax (cire perdue) casting technique' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'FAA 301', title: 'Painting, Sculpture & Ceramics', level: 300, semester: 'harmattan', questions: [] },

        // 400 Level
        { code: 'FAA 401', title: 'Advanced Studio Exploration & Exhibition', level: 400, semester: 'harmattan', questions: [] },
        { code: 'FAA 499', title: 'B.Tech. Final Studio Exhibition Project', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Surveying and Geoinformatics',
      code: 'SVG',
      courses: [
        // 100 Level
        {
          code: 'SVG 101',
          title: 'Introduction to Surveying',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary objective of land surveying?', options: ['Designing interior rooms', 'Determining the terrestrial positions of points and distances/angles between them', 'Manufacturing concrete blocks', 'Estimating building construction cost'], correctAnswer: 'Determining the terrestrial positions of points and distances/angles between them' },
            { type: 'cbt', question: 'Which instrument is primarily used for measuring horizontal and vertical angles in surveying?', options: ['Theodolite', 'Hydrometer', 'Barometer', 'Anemometer'], correctAnswer: 'Theodolite' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'SVG 201',
          title: 'Basic Land Surveying & Levelling',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a Bench Mark (BM) in levelling operations?', options: ['A temporary station for equipment storage', 'A permanent reference point of known elevation above sea level', 'A tripod locking mechanism', 'A compass bearing error'], correctAnswer: 'A permanent reference point of known elevation above sea level' },
            { type: 'cbt', question: 'What does GPS stand for in satellite geoinformatics?', options: ['Geodetic Position Scanner', 'Global Positioning System', 'General Photogrammetry Satellite', 'Geographic Planning Survey'], correctAnswer: 'Global Positioning System' },
          ],
        },
        { code: 'MTH 201', title: 'Mathematical Methods I', level: 200, semester: 'harmattan', questions: [] },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'SVG 301', title: 'Geodesy & Photogrammetry', level: 300, semester: 'harmattan', questions: [] },
        { code: 'SVG 399', title: 'SIWES Industrial Surveying Camp', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'SVG 401', title: 'Geographic Information Systems & Remote Sensing', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'SVG 501', title: 'Hydrographic & Engineering Surveying', level: 500, semester: 'harmattan', questions: [] },
        { code: 'SVG 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Urban and Regional Planning',
      code: 'URP',
      courses: [
        // 100 Level
        {
          code: 'URP 101',
          title: 'Introduction to City & Regional Planning',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is zoning in urban planning?', options: ['Constructing boundary fences', 'Dividing urban land into zones designated for specific uses like residential, commercial, or industrial', 'Measuring road speeds', 'Allocating water pipes'], correctAnswer: 'Dividing urban land into zones designated for specific uses like residential, commercial, or industrial' },
            { type: 'cbt', question: 'What is urban sprawl?', options: ['The rapid, uncontrolled expansion of urban areas into surrounding rural land', 'Vertical building of skyscrapers', 'Subway train construction', 'Planting of city trees'], correctAnswer: 'The rapid, uncontrolled expansion of urban areas into surrounding rural land' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'URP 201',
          title: 'Planning Studio & Site Planning',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a master plan in urban development?', options: ['A blueprint for a single family house', 'A comprehensive long-term planning document guiding the physical and economic growth of an entire city', 'A daily traffic schedule', 'A tax billing system'], correctAnswer: 'A comprehensive long-term planning document guiding the physical and economic growth of an entire city' },
            { type: 'cbt', question: 'What is the purpose of an Environmental Impact Assessment (EIA) in planning?', options: ['To determine contractor wages', 'To evaluate the likely environmental consequences of a proposed development project', 'To design electrical wiring', 'To market real estate properties'], correctAnswer: 'To evaluate the likely environmental consequences of a proposed development project' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'URP 301', title: 'Regional Planning Techniques & Transportation', level: 300, semester: 'harmattan', questions: [] },
        { code: 'URP 399', title: 'SIWES Planning Studio Internship', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'URP 401', title: 'Environmental Impact Assessment & Urban Renewal', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'URP 501', title: 'Planning Law, Administration & Governance', level: 500, semester: 'harmattan', questions: [] },
        { code: 'URP 599', title: 'B.Tech. Final Year Planning Thesis', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
