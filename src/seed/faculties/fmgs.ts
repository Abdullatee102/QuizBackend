// src/seed/faculties/fmgs.ts
import type { SeedFaculty } from '../types.js';

export const fmgsFaculty: SeedFaculty = {
  facultyName: 'Faculty of Management Sciences',
  code: 'FMGS',
  departments: [
    {
      deptName: 'Accounting',
      code: 'ACC',
      courses: [
        // 100 Level
        {
          code: 'ACC 101',
          title: 'Financial Accounting I',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the fundamental accounting equation?', options: ['Assets = Liabilities - Equity', 'Assets = Liabilities + Equity', 'Equity = Assets + Liabilities', 'Liabilities = Assets + Equity'], correctAnswer: 'Assets = Liabilities + Equity' },
            { type: 'cbt', question: 'In double-entry bookkeeping, an increase in an asset is recorded as a:', options: ['Credit', 'Debit', 'Liability', 'Revenue'], correctAnswer: 'Debit' },
            { type: 'cbt', question: 'Which financial statement shows a company\'s financial position at a specific point in time?', options: ['Income Statement', 'Cash Flow Statement', 'Balance Sheet (Statement of Financial Position)', 'Statement of Changes in Equity'], correctAnswer: 'Balance Sheet (Statement of Financial Position)' },
          ],
        },
        { code: 'ECO 101', title: 'Principles of Economics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'ECO 102', title: 'Principles of Economics II', level: 100, semester: 'rain', questions: [] },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ACC 201',
          title: 'Cost & Management Accounting',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is a fixed cost in managerial accounting?', options: ['A cost that changes directly with production volume', 'A cost that remains constant in total regardless of output level within a relevant range', 'The cost of direct materials', 'The sales commission paid to agents'], correctAnswer: 'A cost that remains constant in total regardless of output level within a relevant range' },
            { type: 'cbt', question: 'What is the break-even point?', options: ['The point where profit equals total cost', 'The sales volume where total revenue equals total costs (zero profit/loss)', 'The maximum possible production capacity', 'The point of highest dividend payment'], correctAnswer: 'The sales volume where total revenue equals total costs (zero profit/loss)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ACC 301', title: 'Auditing & Assurance Services', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ACC 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ACC 401', title: 'Advanced Financial Accounting & Reporting', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ACC 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Marketing',
      code: 'MKT',
      courses: [
        // 100 Level
        {
          code: 'MKT 101',
          title: 'Fundamentals of Marketing',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the traditional 4 Ps of the marketing mix?', options: ['Price, Production, People, Policy', 'Product, Price, Place, Promotion', 'Plan, Package, Perform, Profit', 'People, Process, Physical evidence, Position'], correctAnswer: 'Product, Price, Place, Promotion' },
            { type: 'cbt', question: 'What is market segmentation?', options: ['Dividing a broad market into distinct subsets of consumers with common needs', 'Setting the final retail price', 'Terminating unprofitable products', 'Exporting products overseas'], correctAnswer: 'Dividing a broad market into distinct subsets of consumers with common needs' },
            { type: 'cbt', question: 'Which marketing orientation focuses on meeting customer needs better than competitors?', options: ['Production Concept', 'Product Concept', 'Marketing Concept', 'Selling Concept'], correctAnswer: 'Marketing Concept' },
          ],
        },
        { code: 'ECO 101', title: 'Principles of Economics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'ECO 102', title: 'Principles of Economics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MKT 201',
          title: 'Consumer Behavior & Market Research',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is cognitive dissonance in consumer behavior?', options: ['Excitement immediately upon purchasing a luxury item', 'Post-purchase psychological tension or doubt about whether the right decision was made', 'The desire to imitate friends\' shopping habits', 'Automatic repeat purchasing'], correctAnswer: 'Post-purchase psychological tension or doubt about whether the right decision was made' },
            { type: 'cbt', question: 'What is primary data in marketing research?', options: ['Data collected for the first time specifically for the research problem at hand', 'Data published in government census reports', 'Competitor financial balance sheets', 'Old company sales records'], correctAnswer: 'Data collected for the first time specifically for the research problem at hand' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MKT 301', title: 'Product Planning & Pricing Strategy', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MKT 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MKT 401', title: 'Strategic Marketing Management & Global Marketing', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MKT 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Business Management',
      code: 'MGT',
      courses: [
        // 100 Level
        {
          code: 'MGT 101',
          title: 'Introduction to Business Management',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the four primary functions of management?', options: ['Planning, Organizing, Leading, Controlling', 'Hiring, Firing, Selling, Accounting', 'Buying, Producing, Marketing, Financing', 'Strategizing, Budgeting, Advertising, Delivering'], correctAnswer: 'Planning, Organizing, Leading, Controlling' },
            { type: 'cbt', question: 'Who is recognized as the father of Scientific Management?', options: ['Henri Fayol', 'Max Weber', 'Frederick W. Taylor', 'Peter Drucker'], correctAnswer: 'Frederick W. Taylor' },
            { type: 'cbt', question: 'What is a SWOT analysis used for in strategic planning?', options: ['Calculating income tax', 'Assessing Strengths, Weaknesses, Opportunities, and Threats', 'Monitoring employee attendance', 'Auditing inventory count'], correctAnswer: 'Assessing Strengths, Weaknesses, Opportunities, and Threats' },
          ],
        },
        { code: 'ECO 101', title: 'Principles of Economics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'ECO 102', title: 'Principles of Economics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MGT 201',
          title: 'Organizational Behavior & Theory',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is at the base (lowest level) of Maslow\'s Hierarchy of Needs?', options: ['Self-actualization', 'Safety needs', 'Physiological needs', 'Esteem needs'], correctAnswer: 'Physiological needs' },
            { type: 'cbt', question: 'What does Douglas McGregor\'s Theory Y assume about employees?', options: ['Employees naturally dislike work and must be coerced', 'Employees are self-motivated, enjoy work, and seek responsibility', 'Employees only care about monetary bonuses', 'Employees cannot be trained'], correctAnswer: 'Employees are self-motivated, enjoy work, and seek responsibility' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MGT 301', title: 'Human Resource Management', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MGT 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MGT 401', title: 'Strategic Management & Business Policy', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MGT 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Transport Management',
      code: 'TRM',
      courses: [
        // 100 Level
        {
          code: 'TRM 101',
          title: 'Introduction to Transport Systems',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does transport management primarily involve?', options: ['Manufacturing goods', 'Planning, coordinating, and optimizing the movement of passengers and freight', 'Designing roads only', 'Vehicle engine assembly'], correctAnswer: 'Planning, coordinating, and optimizing the movement of passengers and freight' },
            { type: 'cbt', question: 'Which mode of transport is most cost-effective for moving high-volume, bulk commodities over long international distances?', options: ['Air freight', 'Maritime (Sea) transport', 'Road trucking', 'Pipeline transport'], correctAnswer: 'Maritime (Sea) transport' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'TRM 201',
          title: 'Logistics & Supply Chain Management',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is multimodal transportation?', options: ['Using only one type of vehicle', 'The transportation of goods using two or more different modes under a single contract', 'Pedestrian walking routes', 'Bicycle courier delivery'], correctAnswer: 'The transportation of goods using two or more different modes under a single contract' },
            { type: 'cbt', question: 'What is the bullwhip effect in supply chain logistics?', options: ['A physical whip used in horse transport', 'Increasing fluctuation in inventory demand as one moves further up the supply chain from consumer to supplier', 'Sudden discounts on shipping freight', 'Fast port clearance speeds'], correctAnswer: 'Increasing fluctuation in inventory demand as one moves further up the supply chain from consumer to supplier' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'TRM 301', title: 'Transport Economics & Infrastructure Planning', level: 300, semester: 'harmattan', questions: [] },
        { code: 'TRM 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'TRM 401', title: 'Fleet Management & Aviation Operations', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'TRM 501', title: 'Maritime Transport & International Logistics', level: 500, semester: 'harmattan', questions: [] },
        { code: 'TRM 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
