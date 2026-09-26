// src/seed/faculties/ffcs.ts
import type { SeedFaculty } from '../types.js';

export const ffcsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Food and Consumer Sciences',
  code: 'FFCS',
  departments: [
    {
      deptName: 'Food Science',
      code: 'FST',
      courses: [
        // 100 Level
        {
          code: 'FST 101',
          title: 'Introduction to Food Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is food science?', options: ['Agricultural crop planting', 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing', 'Culinary menu pricing', 'Supermarket shelf arrangement'], correctAnswer: 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing' },
            { type: 'cbt', question: 'Which nutrient group is the primary source of immediate energy for the human body?', options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Minerals'], correctAnswer: 'Carbohydrates' },
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
          code: 'FST 201',
          title: 'Food Chemistry & Biochemistry',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What reaction causes non-enzymatic browning in cooked foods involving amino acids and reducing sugars?', options: ['Photosynthesis', 'Maillard reaction', 'Hydrolysis', 'Saponification'], correctAnswer: 'Maillard reaction' },
            { type: 'cbt', question: 'What is retrogradation in starchy food systems?', options: ['The breakdown of lipids', 'The realignment of amylose and amylopectin molecules upon cooling of gelatinized starch', 'The fermentation of sugars by yeast', 'The oxidation of ascorbic acid'], correctAnswer: 'The realignment of amylose and amylopectin molecules upon cooling of gelatinized starch' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'FST 301', title: 'Food Microbiology & Preservation', level: 300, semester: 'harmattan', questions: [] },
        { code: 'FST 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'FST 401', title: 'Sensory Evaluation & Food Analysis', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'FST 501', title: 'Food Quality Control & Product Development', level: 500, semester: 'harmattan', questions: [] },
        { code: 'FST 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Nutrition and Dietetics',
      code: 'NTD',
      courses: [
        // 100 Level
        {
          code: 'NTD 101',
          title: 'Introduction to Human Nutrition',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which deficiency disease is caused by inadequate dietary intake of Vitamin C?', options: ['Rickets', 'Scurvy', 'Beriberi', 'Pellagra'], correctAnswer: 'Scurvy' },
            { type: 'cbt', question: 'What are the fat-soluble vitamins?', options: ['Vitamins B and C', 'Vitamins A, D, E, and K', 'Vitamins B1, B2, and B6', 'Vitamin C and Folic Acid'], correctAnswer: 'Vitamins A, D, E, and K' },
          ],
        },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'NTD 201',
          title: 'Nutritional Biochemistry & Human Metabolism',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What metabolic pathway converts glucose into pyruvate to yield ATP?', options: ['Gluconeogenesis', 'Glycolysis', 'Beta-oxidation', 'Urea cycle'], correctAnswer: 'Glycolysis' },
            { type: 'cbt', question: 'What is Basal Metabolic Rate (BMR)?', options: ['Energy expended during vigorous exercise', 'The minimum amount of energy required to sustain vital bodily functions at complete rest', 'Total daily caloric intake', 'Energy used for digesting food'], correctAnswer: 'The minimum amount of energy required to sustain vital bodily functions at complete rest' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'NTD 301', title: 'Clinical Nutrition & Diet Therapy', level: 300, semester: 'harmattan', questions: [] },
        { code: 'NTD 399', title: 'SIWES Internship', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'NTD 401', title: 'Community Nutrition & Assessment', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'NTD 501', title: 'Public Health Nutrition & Dietetics Internship', level: 500, semester: 'harmattan', questions: [] },
        { code: 'NTD 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Consumer and Home Economics',
      code: 'CFS',
      courses: [
        // 100 Level
        {
          code: 'CFS 101',
          title: 'Introduction to Consumer & Home Economics',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the core focus of Consumer and Home Economics?', options: ['Commercial banking', 'Improving the well-being of individuals, families, and communities through resource management', 'Stock market trading', 'Automobile repair'], correctAnswer: 'Improving the well-being of individuals, families, and communities through resource management' },
            { type: 'cbt', question: 'What are consumer rights designed to protect against?', options: ['Fair competition', 'Unfair business practices, hazardous products, and misleading advertising', 'Voluntary donations', 'Product warranties'], correctAnswer: 'Unfair business practices, hazardous products, and misleading advertising' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'CFS 201',
          title: 'Family Resource Management & Consumer Behavior',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a family budget?', options: ['A list of family groceries only', 'A planned financial statement balancing expected income and expenditures over a given period', 'A tax penalty notice', 'A bank loan application'], correctAnswer: 'A planned financial statement balancing expected income and expenditures over a given period' },
            { type: 'cbt', question: 'Which factor most heavily influences consumer decision-making during purchasing?', options: ['Income, price, perceived quality, and personal preferences', 'Only the weather forecast', 'Store paint color', 'The date of company registration'], correctAnswer: 'Income, price, perceived quality, and personal preferences' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'CFS 301', title: 'Textiles, Clothing & Interior Design', level: 300, semester: 'harmattan', questions: [] },
        { code: 'CFS 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'CFS 401', title: 'Consumer Rights, Economics & Child Development', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'CFS 501', title: 'Family Studies & Community Development Seminar', level: 500, semester: 'harmattan', questions: [] },
        { code: 'CFS 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Hospitality and Tourism',
      code: 'HTM',
      courses: [
        // 100 Level
        {
          code: 'HTM 101',
          title: 'Introduction to Hospitality & Tourism Management',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the main sectors of the hospitality industry?', options: ['Accommodation, food and beverage, travel, and recreation', 'Mining, forestry, and construction', 'Heavy manufacturing and chemical refining', 'Banking and telecommunications only'], correctAnswer: 'Accommodation, food and beverage, travel, and recreation' },
            { type: 'cbt', question: 'What is ecotourism?', options: ['Mass urban clubbing', 'Responsible travel to natural areas that conserves the environment and improves local well-being', 'High-end luxury gambling trips', 'Business corporate conferences'], correctAnswer: 'Responsible travel to natural areas that conserves the environment and improves local well-being' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'HTM 201',
          title: 'Food and Beverage Operations',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is an "A la carte" menu?', options: ['A fixed price multi-course meal', 'A menu where each item is ordered and priced separately', 'A free buffet service', 'A staff-only cafeteria list'], correctAnswer: 'A menu where each item is ordered and priced separately' },
            { type: 'cbt', question: 'What does FIFO stand for in hospitality inventory management?', options: ['First In, First Out', 'Fast Income, Fast Output', 'Fixed In, Flexible Out', 'Final Invoice, Final Order'], correctAnswer: 'First In, First Out' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'HTM 301', title: 'Hotel Front Office & Accommodation Management', level: 300, semester: 'harmattan', questions: [] },
        { code: 'HTM 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'HTM 401', title: 'Tourism Planning & Sustainable Development', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'HTM 501', title: 'Strategic Hospitality Management & Resort Planning', level: 500, semester: 'harmattan', questions: [] },
        { code: 'HTM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
