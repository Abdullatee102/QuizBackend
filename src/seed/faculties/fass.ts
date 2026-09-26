// src/seed/faculties/fass.ts
import type { SeedFaculty } from '../types.js';

export const fassFaculty: SeedFaculty = {
  facultyName: 'Faculty of Arts and Social Sciences',
  code: 'FASS',
  departments: [
    {
      deptName: 'English and Literary Studies',
      code: 'ELS',
      courses: [
        // 100 Level
        {
          code: 'ELS 101',
          title: 'Introduction to English Grammar and Composition',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which figure of speech makes an explicit comparison using the words "like" or "as"?', options: ['Metaphor', 'Simile', 'Hyperbole', 'Personification'], correctAnswer: 'Simile' },
            { type: 'cbt', question: 'Who is the author of the celebrated African novel "Things Fall Apart"?', options: ['Wole Soyinka', 'Chinua Achebe', 'Ngugi wa Thiong\'o', 'Chimamanda Ngozi Adichie'], correctAnswer: 'Chinua Achebe' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ELS 201',
          title: 'Introduction to African Prose and Poetry',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What literary device is characterized by the repetition of initial consonant sounds in neighboring words?', options: ['Assonance', 'Alliteration', 'Onomatopoeia', 'Oxymoron'], correctAnswer: 'Alliteration' },
            { type: 'cbt', question: 'Who was the first African to win the Nobel Prize in Literature (1986)?', options: ['Chinua Achebe', 'Wole Soyinka', 'Naguib Mahfouz', 'Nadine Gordimer'], correctAnswer: 'Wole Soyinka' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ELS 301', title: 'Phonology and Applied Linguistics', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ELS 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ELS 401', title: 'Literary Theory and Modernism', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ELS 499', title: 'B.A. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'History and International Studies',
      code: 'HIS',
      courses: [
        // 100 Level
        {
          code: 'HIS 101',
          title: 'Nigeria from Earliest Times to 1800',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'On what date did Nigeria formally gain independence from British colonial rule?', options: ['October 1, 1960', 'January 1, 1914', 'October 1, 1963', 'May 29, 1999'], correctAnswer: 'October 1, 1960' },
            { type: 'cbt', question: 'Who was the British colonial administrator that orchestrated the 1914 Amalgamation of Northern and Southern Nigeria?', options: ['Lord Frederick Lugard', 'Sir Arthur Richards', 'John Macpherson', 'Hugh Clifford'], correctAnswer: 'Lord Frederick Lugard' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'HIS 201',
          title: 'Evolution of Modern International System',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which treaty signed in 1648 established the modern concept of sovereign nation-states?', options: ['Treaty of Versailles', 'Peace of Westphalia', 'Treaty of Utrecht', 'Congress of Vienna'], correctAnswer: 'Peace of Westphalia' },
            { type: 'cbt', question: 'Which global intergovernmental organization was founded in 1945 following World War II to maintain international peace?', options: ['League of Nations', 'United Nations (UN)', 'African Union (AU)', 'European Union (EU)'], correctAnswer: 'United Nations (UN)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'HIS 301', title: 'Diplomatic History of Africa', level: 300, semester: 'harmattan', questions: [] },
        { code: 'HIS 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'HIS 401', title: 'International Law and Organizations', level: 400, semester: 'harmattan', questions: [] },
        { code: 'HIS 499', title: 'B.A. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Philosophy',
      code: 'PHL',
      courses: [
        // 100 Level
        {
          code: 'PHL 101',
          title: 'Introduction to Philosophy & Logic',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the literal Greek etymology of the word "Philosophy"?', options: ['Study of nature', 'Love of wisdom (Philos + Sophia)', 'Search for numbers', 'Art of debate'], correctAnswer: 'Love of wisdom (Philos + Sophia)' },
            { type: 'cbt', question: 'Which ancient Greek philosopher was sentenced to death in Athens for corrupting the youth and impiety?', options: ['Plato', 'Socrates', 'Aristotle', 'Pythagoras'], correctAnswer: 'Socrates' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PHL 201',
          title: 'Epistemology & Theories of Knowledge',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What branch of philosophy is primarily concerned with the nature, origin, and scope of human knowledge?', options: ['Ethics', 'Epistemology', 'Aesthetics', 'Metaphysics'], correctAnswer: 'Epistemology' },
            { type: 'cbt', question: 'What philosophical school of thought argues that sensory experience is the primary source of all knowledge?', options: ['Rationalism', 'Empiricism', 'Idealism', 'Existentialism'], correctAnswer: 'Empiricism' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PHL 301', title: 'Ethics and Moral Philosophy', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PHL 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PHL 401', title: 'African Philosophy & Contemporary Trends', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PHL 499', title: 'B.A. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Political Science',
      code: 'POL',
      courses: [
        // 100 Level
        {
          code: 'POL 101',
          title: 'Introduction to Political Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the supreme, absolute power of a state to govern its territory free from external control called?', options: ['Authority', 'Sovereignty', 'Legitimacy', 'Hegemony'], correctAnswer: 'Sovereignty' },
            { type: 'cbt', question: 'Which of the following is NOT one of the three classic arms of government?', options: ['Executive', 'Legislature', 'Judiciary', 'Military'], correctAnswer: 'Military' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        {
          code: 'POL 102',
          title: 'Citizen and the State',
          level: 100,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What form of government is defined as rule by the people through freely elected representatives?', options: ['Autocracy', 'Oligarchy', 'Democracy', 'Theocracy'], correctAnswer: 'Democracy' },
            { type: 'cbt', question: 'What political concept divides governmental powers between a central authority and regional component units?', options: ['Unitary system', 'Federalism', 'Feudalism', 'Confederation only'], correctAnswer: 'Federalism' },
          ],
        },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'POL 201',
          title: 'Nigerian Government and Politics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'In which year was Nigeria declared a Federal Republic with a President as Head of State?', options: ['1960', '1963', '1979', '1999'], correctAnswer: '1963' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'POL 301', title: 'Comparative Politics & Political Thought', level: 300, semester: 'harmattan', questions: [] },
        { code: 'POL 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'POL 401', title: 'Public Policy Analysis & International Relations', level: 400, semester: 'harmattan', questions: [] },
        { code: 'POL 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Psychology',
      code: 'PSY',
      courses: [
        // 100 Level
        {
          code: 'PSY 101',
          title: 'Basic Concepts in Psychology',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the scientific definition of Psychology?', options: ['The study of paranormal phenomena', 'The scientific study of behavior and mental processes', 'The biological analysis of brain cells only', 'The medical treatment of physical illness'], correctAnswer: 'The scientific study of behavior and mental processes' },
            { type: 'cbt', question: 'Who founded the first formal psychology laboratory in Leipzig, Germany in 1879?', options: ['Sigmund Freud', 'Wilhelm Wundt', 'B.F. Skinner', 'Ivan Pavlov'], correctAnswer: 'Wilhelm Wundt' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'PSY 201',
          title: 'Developmental Psychology & Personality Theory',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'According to Sigmund Freud\'s psychoanalytic model, which component of personality operates entirely on the pleasure principle?', options: ['The Ego', 'The Id', 'The Superego', 'The Conscious'], correctAnswer: 'The Id' },
            { type: 'cbt', question: 'In Pavlov\'s classical conditioning experiment with dogs, what was the meat powder initially serving as?', options: ['Conditioned stimulus (CS)', 'Unconditioned stimulus (UCS)', 'Conditioned response (CR)', 'Neutral stimulus (NS)'], correctAnswer: 'Unconditioned stimulus (UCS)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'PSY 301', title: 'Cognitive & Physiological Psychology', level: 300, semester: 'harmattan', questions: [] },
        { code: 'PSY 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'PSY 401', title: 'Clinical & Abnormal Psychology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'PSY 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Sociology',
      code: 'SOC',
      courses: [
        // 100 Level
        {
          code: 'SOC 101',
          title: 'Introduction to Sociology & Social Institutions',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Who is widely regarded as the founding father of Sociology who coined the term in 1838?', options: ['Karl Marx', 'Auguste Comte', 'Max Weber', 'Emile Durkheim'], correctAnswer: 'Auguste Comte' },
            { type: 'cbt', question: 'What is the primary agent of socialization in human society?', options: ['Mass media', 'The Family', 'Peer group', 'Workplace'], correctAnswer: 'The Family' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'SOC 201',
          title: 'Social Change and Development in Africa',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is social stratification?', options: ['The physical building of roads', 'The hierarchical arrangement of individuals and groups into strata or social classes in society', 'The extinction of ancient languages', 'The migration of rural workers to farms'], correctAnswer: 'The hierarchical arrangement of individuals and groups into strata or social classes in society' },
            { type: 'cbt', question: 'Which sociological concept refers to the movement of individuals or groups between different social and economic positions?', options: ['Social mobility', 'Cultural diffusion', 'Social entropy', 'Deviance'], correctAnswer: 'Social mobility' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'SOC 301', title: 'Sociological Theory & Social Stratification', level: 300, semester: 'harmattan', questions: [] },
        { code: 'SOC 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'SOC 401', title: 'Criminology & Medical Sociology', level: 400, semester: 'harmattan', questions: [] },
        { code: 'SOC 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Library and Information Science',
      code: 'LIS',
      courses: [
        // 100 Level
        {
          code: 'LIS 101',
          title: 'Introduction to Library & Information Resources',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the Dewey Decimal Classification (DDC) system?', options: ['A monetary tax system', 'A proprietary library classification system used to organize books by subject on library shelves', 'A database programming syntax', 'A postal zip code format'], correctAnswer: 'A proprietary library classification system used to organize books by subject on library shelves' },
            { type: 'cbt', question: 'What is an academic bibliography?', options: ['A personal memoir of an author', 'A comprehensive list of books, articles, and sources used or referred to in a scholarly work', 'A dictionary of foreign terms', 'A library borrower\'s card'], correctAnswer: 'A comprehensive list of books, articles, and sources used or referred to in a scholarly work' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'LIS 201',
          title: 'Cataloguing, Classification & Indexing',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does OPAC stand for in modern library systems?', options: ['Online Public Access Catalog', 'Open Publishing Academic Center', 'Official Postal Archive Code', 'Optical Photocopy Automated Core'], correctAnswer: 'Online Public Access Catalog' },
            { type: 'cbt', question: 'What standard international 13-digit code uniquely identifies commercially published books?', options: ['ISSN', 'ISBN', 'DOI', 'URL'], correctAnswer: 'ISBN' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'LIS 301', title: 'Information Retrieval & Database Management', level: 300, semester: 'harmattan', questions: [] },
        { code: 'LIS 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'LIS 401', title: 'Digital Libraries & Archives Management', level: 400, semester: 'harmattan', questions: [] },
        { code: 'LIS 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Mass Communication',
      code: 'MCM',
      courses: [
        // 100 Level
        {
          code: 'MCM 101',
          title: 'Introduction to Mass Communication & Media',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is mass communication?', options: ['A confidential face-to-face talk', 'The transmission of messages to large, widespread, and heterogeneous audiences through mass media', 'Writing a personal diary', 'A telephone call between two people'], correctAnswer: 'The transmission of messages to large, widespread, and heterogeneous audiences through mass media' },
            { type: 'cbt', question: 'Which of the following is considered broadcast media?', options: ['Billboards', 'Television and Radio', 'Magazines', 'Direct postal mail'], correctAnswer: 'Television and Radio' },
          ],
        },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'MCM 201',
          title: 'News Writing & Reporting',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What journalism structural model presents the most critical facts at the very beginning of a news story?', options: ['Inverted Pyramid structure', 'Chronological narrative', 'Diamond model', 'Hourglass style'], correctAnswer: 'Inverted Pyramid structure' },
            { type: 'cbt', question: 'What are the classic 5 Ws and 1 H in news reporting?', options: ['Who, What, Where, When, Why, and How', 'Work, Write, Win, Warn, Wait, and Hear', 'Words, Wealth, Wire, Web, World, and Hope', 'Where, When, Which, Will, Way, and Help'], correctAnswer: 'Who, What, Where, When, Why, and How' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'MCM 301', title: 'Broadcast Production & Media Law', level: 300, semester: 'harmattan', questions: [] },
        { code: 'MCM 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'MCM 401', title: 'Public Relations, Advertising & Media Ethics', level: 400, semester: 'harmattan', questions: [] },
        { code: 'MCM 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Economics',
      code: 'ECO',
      courses: [
        // 100 Level
        {
          code: 'ECO 101',
          title: 'Principles of Microeconomics',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'The fundamental economic problem facing all human societies is:', options: ['Poverty', 'Scarcity of resources relative to unlimited human wants', 'Inflation', 'Unemployment'], correctAnswer: 'Scarcity of resources relative to unlimited human wants' },
            { type: 'cbt', question: 'The responsiveness of quantity demanded to a change in price is called:', options: ['Price Ceiling', 'Price Elasticity of Demand', 'Price Floor', 'Opportunity Cost'], correctAnswer: 'Price Elasticity of Demand' },
            { type: 'cbt', question: 'What is opportunity cost?', options: ['The financial purchase cost of a good', 'The value of the next best alternative foregone when making a choice', 'The cost of advertising', 'Government taxation'], correctAnswer: 'The value of the next best alternative foregone when making a choice' },
          ],
        },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        {
          code: 'ECO 102',
          title: 'Principles of Macroeconomics',
          level: 100,
          semester: 'rain',
          questions: [
            { type: 'cbt', question: 'What does GDP stand for in macroeconomic analysis?', options: ['Global Data Production', 'Gross Domestic Product', 'Government Debt Policy', 'General Distribution Plan'], correctAnswer: 'Gross Domestic Product' },
            { type: 'cbt', question: 'What is inflation?', options: ['A sustained increase in the general price level of goods and services in an economy over time', 'A decrease in currency supply', 'An increase in export tariffs', 'A decrease in unemployment rates'], correctAnswer: 'A sustained increase in the general price level of goods and services in an economy over time' },
          ],
        },
        { code: 'MTH 102', title: 'Elementary Mathematics II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'ECO 201',
          title: 'Intermediate Microeconomics',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does the Law of Supply state?', options: ['As price rises, quantity supplied falls', 'As price rises, quantity supplied increases, ceteris paribus', 'Supply is independent of market price', 'Consumers dictate production costs'], correctAnswer: 'As price rises, quantity supplied increases, ceteris paribus' },
            { type: 'cbt', question: 'What type of market structure is characterized by a single seller with no close substitutes and high barriers to entry?', options: ['Perfect competition', 'Monopoly', 'Oligopoly', 'Monopolistic competition'], correctAnswer: 'Monopoly' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'ECO 301', title: 'Applied Econometrics & Development Economics', level: 300, semester: 'harmattan', questions: [] },
        { code: 'ECO 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'ECO 401', title: 'Monetary Economics & Public Finance', level: 400, semester: 'harmattan', questions: [] },
        { code: 'ECO 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ],
    },
  ],
};
