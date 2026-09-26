// src/seed/faculties/fag.ts
import type { SeedFaculty } from '../types.js';

export const fagFaculty: SeedFaculty = {
  facultyName: 'Faculty of Agricultural Sciences',
  code: 'FAG',
  departments: [
    {
      deptName: 'Agricultural Extension and Rural Development',
      code: 'AER',
      courses: [
        // 100 Level
        {
          code: 'AER 101',
          title: 'Introduction to Agricultural Extension',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the primary mission of Agricultural Extension services?', options: ['Levying farm taxes', 'Disseminating research-proven agricultural technologies and improved practices to farmers and rural communities', 'Managing commercial fertilizer sales monopolies', 'Enforcing government land seizure'], correctAnswer: 'Disseminating research-proven agricultural technologies and improved practices to farmers and rural communities' },
            { type: 'cbt', question: 'What extension teaching method involves demonstrating a new farming technique step-by-step on a farmer\'s field?', options: ['Radio broadcast', 'Method demonstration / Result demonstration', 'Mass newspaper advert', 'Lecture in a classroom'], correctAnswer: 'Method demonstration / Result demonstration' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'PHY 102', title: 'General Physics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'AER 201',
          title: 'Rural Sociology & Community Development',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'According to Everett Rogers\' Diffusion of Innovations model, which adopter category is first to try new agricultural technologies?', options: ['Laggards', 'Innovators', 'Late Majority', 'Early Majority'], correctAnswer: 'Innovators' },
            { type: 'cbt', question: 'What is the participatory bottom-up approach in rural agricultural development?', options: ['Directives issued solely from federal headquarters', 'Actively involving local rural farmers in identifying problems, planning, and executing agricultural projects', 'Ignoring local knowledge completely', 'Importing foreign labor for farm work'], correctAnswer: 'Actively involving local rural farmers in identifying problems, planning, and executing agricultural projects' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'AER 301', title: 'Extension Communication Methods & Audio-Visuals', level: 300, semester: 'harmattan', questions: [] },
        { code: 'AER 399', title: 'SIWES Practical Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'AER 401', title: 'Programme Planning & Evaluation in Agriculture', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'AER 501', title: 'Administration, Supervision & Youth in Agriculture', level: 500, semester: 'harmattan', questions: [] },
        { code: 'AER 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Animal Nutrition and Biotechnology',
      code: 'ANB',
      courses: [
        // 100 Level
        {
          code: 'ANB 101',
          title: 'Introductory Animal Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which of the following farm animals is classified as a ruminant with a four-compartment stomach?', options: ['Pig', 'Cow (Cattle)', 'Chicken (Poultry)', 'Horse'], correctAnswer: 'Cow (Cattle)' },
            { type: 'cbt', question: 'What are the four compartments of the ruminant stomach in anatomical order?', options: ['Rumen, Reticulum, Omasum, Abomasum', 'Stomach, Gizzard, Crop, Intestine', 'Duodenum, Jejunum, Ileum, Cecum', 'Proventriculus, Ventriculus, Cloaca, Colon'], correctAnswer: 'Rumen, Reticulum, Omasum, Abomasum' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ANB 201',
          title: 'Principles of Animal Nutrition & Feedstuffs',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which major feed ingredient serves as the primary protein source in poultry and livestock feed formulations in Nigeria?', options: ['Maize grain', 'Soybean meal (or Groundnut cake - GNC)', 'Wheat offal', 'Limestone'], correctAnswer: 'Soybean meal (or Groundnut cake - GNC)' },
            { type: 'cbt', question: 'What is crude fiber in proximate feed analysis?', options: ['The fat content soluble in ether', 'The insoluble carbohydrate fraction consisting primarily of cellulose, hemicellulose, and lignin', 'The total moisture content', 'The inorganic mineral ash'], correctAnswer: 'The insoluble carbohydrate fraction consisting primarily of cellulose, hemicellulose, and lignin' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ANB 301', title: 'Ruminant and Non-Ruminant Nutrition', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ANB 399', title: 'SIWES Farm Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ANB 401', title: 'Applied Feed Formulation & Feed Milling', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'ANB 501', title: 'Animal Biotechnology & Molecular Nutrition', level: 500, semester: 'harmattan', questions: [] },
        { code: 'ANB 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Animal Production and Health',
      code: 'APH',
      courses: [
        // 100 Level
        {
          code: 'APH 101',
          title: 'Introduction to Livestock Production',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is colostrum in mammalian livestock management?', options: ['The first milk produced by the mother after birth, rich in maternal antibodies and nutrients', 'Processed commercial powdered milk', 'Spoiled sour milk', 'A synthetic vaccine shot'], correctAnswer: 'The first milk produced by the mother after birth, rich in maternal antibodies and nutrients' },
            { type: 'cbt', question: 'What is the standard gestation period for cattle (cows)?', options: ['114 days', '150 days', 'Approximately 283 days (9 months)', '365 days'], correctAnswer: 'Approximately 283 days (9 months)' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'APH 201',
          title: 'Anatomy & Physiology of Farm Animals',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which viral disease in poultry is characterized by high mortality, respiratory distress, and green diarrhea?', options: ['Coccidiosis', 'Newcastle Disease', 'Fowl Cholera', 'Favus'], correctAnswer: 'Newcastle Disease' },
            { type: 'cbt', question: 'What management practice involves cutting the sharp tip of a chick\'s beak to prevent cannibalism and egg pecking?', options: ['Debeaking (Beak trimming)', 'Castration', 'Dehorning', 'Docking'], correctAnswer: 'Debeaking (Beak trimming)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'APH 301', title: 'Poultry, Swine & Ruminant Production', level: 300, semester: 'harmattan', questions: [] },
        { code: 'APH 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'APH 401', title: 'Livestock Diseases, Prevention & Herd Health', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'APH 501', title: 'Livestock Processing Technology & Farm Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'APH 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Crop and Environmental Protection',
      code: 'CEP',
      courses: [
        // 100 Level
        {
          code: 'CEP 101',
          title: 'Introduction to Crop Protection',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the three core components of the Plant Disease Triangle required for infectious disease development?', options: ['Susceptible Host, Virulent Pathogen, and Favorable Environment', 'Sunlight, Fertilizer, and High Tractor Speed', 'Chemical Spray, Dry Soil, and Acid Rain', 'Cold Storage, Seed Coating, and Packaging'], correctAnswer: 'Susceptible Host, Virulent Pathogen, and Favorable Environment' },
            { type: 'cbt', question: 'What type of chemical pesticide is specifically formulated to control unwanted weed vegetation?', options: ['Insecticide', 'Herbicide', 'Fungicide', 'Nematicide'], correctAnswer: 'Herbicide' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'CEP 201',
          title: 'Agricultural Entomology & Plant Pathology',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What insect pest is a notorious vector for transmitting the African Cassava Mosaic Virus (ACMV)?', options: ['Stem borer', 'Whitefly (Bemisia tabaci)', 'Armyworm', 'Termite'], correctAnswer: 'Whitefly (Bemisia tabaci)' },
            { type: 'cbt', question: 'What is Integrated Pest Management (IPM)?', options: ['Exclusive heavy spraying of synthetic chemicals daily', 'An ecosystem-based strategy combining biological, cultural, physical, and chemical tools to minimize pest damage economically and safely', 'Abandoning infected crops completely', 'Burning all farmland yearly'], correctAnswer: 'An ecosystem-based strategy combining biological, cultural, physical, and chemical tools to minimize pest damage economically and safely' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CEP 301', title: 'Weed Science & Pesticide Application Technology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CEP 399', title: 'SIWES Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CEP 401', title: 'Integrated Pest Management & Plant Disease Control', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'CEP 501', title: 'Environmental Toxicology & Post-Harvest Pest Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CEP 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Crop Production & Soil Science',
      code: 'CPS',
      courses: [
        // 100 Level
        {
          code: 'CPS 101',
          title: 'Introduction to Crop Production',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which three primary macronutrients are supplied in standard commercial inorganic NPK fertilizers?', options: ['Nitrogen (N), Phosphorus (P), and Potassium (K)', 'Nickel (Ni), Platinum (Pt), and Krypton (Kr)', 'Sodium (Na), Lead (Pb), and Calcium (Ca)', 'Iron (Fe), Zinc (Zn), and Copper (Cu)'], correctAnswer: 'Nitrogen (N), Phosphorus (P), and Potassium (K)' },
            { type: 'cbt', question: 'What agricultural practice involves growing two or more crops simultaneously in the same field during the same season?', options: ['Monoculture', 'Intercropping (Mixed cropping)', 'Clean fallowing', 'Strip mining'], correctAnswer: 'Intercropping (Mixed cropping)' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'CPS 201',
          title: 'Fundamentals of Soil Science & Soil Chemistry',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the three fundamental mineral particle size classes that determine soil texture?', options: ['Gravel, Boulder, and Cobble', 'Sand, Silt, and Clay', 'Humus, Peat, and Compost', 'Nitrate, Phosphate, and Potash'], correctAnswer: 'Sand, Silt, and Clay' },
            { type: 'cbt', question: 'What soil pH value is considered neutral for agricultural soils?', options: ['pH 4.0', 'pH 7.0', 'pH 9.5', 'pH 14.0'], correctAnswer: 'pH 7.0' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CPS 301', title: 'Arable and Tree Crop Production', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CPS 399', title: 'SIWES Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CPS 401', title: 'Soil Fertility, Fertilizer Management & Soil Survey', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'CPS 501', title: 'Seed Technology & Advanced Soil Conservation', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CPS 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Agricultural Economics',
      code: 'AEC',
      courses: [
        // 100 Level
        {
          code: 'AEC 101',
          title: 'Introduction to Agricultural Economics',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the classical four factors of agricultural production?', options: ['Tractors, Diesel, Seeds, and Rain', 'Land, Labor, Capital, and Management (Entrepreneurship)', 'Banks, Markets, Roads, and Stores', 'Fertilizer, Insecticide, Hoe, and Cutlass'], correctAnswer: 'Land, Labor, Capital, and Management (Entrepreneurship)' },
            { type: 'cbt', question: 'What economic law states that adding more of one factor of production while holding others constant will eventually yield smaller per-unit increases in output?', options: ['Law of Demand', 'Law of Diminishing Marginal Returns', 'Law of Comparative Advantage', 'Gresham\'s Law'], correctAnswer: 'Law of Diminishing Marginal Returns' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'AEC 201',
          title: 'Principles of Farm Management & Production Economics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is depreciation in agricultural asset management?', options: ['Sudden increase in market land value', 'The loss in value of a farm asset over time due to wear, tear, age, and obsolescence', 'Farm loan interest rate', 'The cost of hired manual labor'], correctAnswer: 'The loss in value of a farm asset over time due to wear, tear, age, and obsolescence' },
            { type: 'cbt', question: 'What is a farm enterprise budget?', options: ['An estimate of the expected costs and returns for a specific single agricultural enterprise (e.g. 1 hectare of maize)', 'The total national agricultural budget of Nigeria', 'A commercial bank savings passbook', 'A list of agricultural subsidy grants'], correctAnswer: 'An estimate of the expected costs and returns for a specific single agricultural enterprise (e.g. 1 hectare of maize)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'AEC 301', title: 'Agricultural Marketing & Prices', level: 300, semester: 'harmattan', questions: [] },
        { code: 'AEC 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'AEC 401', title: 'Agricultural Finance & Project Analysis', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'AEC 501', title: 'Resource Economics & Agricultural Policy', level: 500, semester: 'harmattan', questions: [] },
        { code: 'AEC 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
