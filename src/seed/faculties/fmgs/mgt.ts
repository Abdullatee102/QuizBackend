// src/seed/faculties/fmgs/mgt.ts
import type { SeedCourse } from '../../types.js';

export const mgtCourses: SeedCourse[] = [
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
            { type: 'cbt', question: 'According to Henri Fayol, what principle states that an employee should receive orders from one and only one superior?', options: ['Unity of Command', 'Unity of Direction', 'Division of Labor', 'Scalar Chain'], correctAnswer: 'Unity of Command' },
            { type: 'cbt', question: 'What is a Sole Proprietorship in business organization?', options: ['A business owned, financed, and operated by a single individual who bears unlimited personal liability', 'A corporation owned by government ministries', 'A partnership with minimum 50 shareholders', 'A non-profit foundation'], correctAnswer: 'A business owned, financed, and operated by a single individual who bears unlimited personal liability' },
            { type: 'cbt', question: 'What does Limited Liability mean for corporate shareholders?', options: ['Shareholders financial loss is limited to the amount they invested in shares', 'Shareholders can only vote on limited company matters', 'The company cannot borrow money from banks', 'The company has a legal lifespan of five years'], correctAnswer: 'Shareholders financial loss is limited to the amount they invested in shares' },
            { type: 'cbt', question: 'In the managerial hierarchy, what role do First-Line Managers perform?', options: ['Supervising day-to-day operational employees and task workflows', 'Formulating 10-year corporate vision', 'Authorizing multi-million-dollar acquisitions', 'Meeting with international ambassadors'], correctAnswer: 'Supervising day-to-day operational employees and task workflows' },
            { type: 'cbt', question: 'What is an Organizational Structure?', options: ['The formal arrangement of jobs, reporting relationships, and authority lines within an organization', 'The physical concrete architectural design of company headquarters', 'The computer server room layout', 'The office parking lot schedule'], correctAnswer: 'The formal arrangement of jobs, reporting relationships, and authority lines within an organization'
            },
            { type: 'cbt', question: 'What does MBO stand for in management goal-setting systems?', options: ['Management by Objectives', 'Monitoring Business Operations', 'Manufacturing Bureau Order', 'Managing Board Oversight'], correctAnswer: 'Management by Objectives' },
            { type: 'cbt', question: 'Which form of authority originates from an individual charismatic personality and persuasive vision rather than formal title?', options: ['Charismatic / Referent Authority', 'Coercive Authority', 'Legitimate / Positional Authority', 'Bureaucratic Mandate'], correctAnswer: 'Charismatic / Referent Authority' },
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
            { type: 'cbt', question: 'What is at the base (lowest level) of Maslow Hierarchy of Needs?', options: ['Self-actualization', 'Safety needs', 'Physiological needs', 'Esteem needs'], correctAnswer: 'Physiological needs' },
            { type: 'cbt', question: 'What does Douglas McGregor Theory Y assume about employees?', options: ['Employees naturally dislike work and must be coerced', 'Employees are self-motivated, enjoy work, and seek responsibility', 'Employees only care about monetary bonuses', 'Employees cannot be trained'], correctAnswer: 'Employees are self-motivated, enjoy work, and seek responsibility' },
            { type: 'cbt', question: 'In Herzberg Two-Factor Theory, which of the following is considered a Motivator factor?', options: ['Challenging work and personal achievement', 'Working conditions and lighting', 'Company administrative policies', 'Basic salary and job security'], correctAnswer: 'Challenging work and personal achievement' },
            { type: 'cbt', question: 'What is Span of Control in organizational design?', options: ['The physical square footage of the executive office', 'The number of subordinates directly supervised by a single manager', 'The maximum legal duration of an executive contract', 'The financial budget granted to a department'], correctAnswer: 'The number of subordinates directly supervised by a single manager' },
            { type: 'cbt', question: 'According to Max Weber, what are the primary characteristics of an Ideal Bureaucracy?', options: ['Clear division of labor, formal hierarchy, explicit rules, and impersonal merit-based relationships', 'Spontaneous leadership, informal rules, and family favoritism', 'Decentralized autonomous pods without supervision', 'Daily voting on all corporate actions'], correctAnswer: 'Clear division of labor, formal hierarchy, explicit rules, and impersonal merit-based relationships' },
            { type: 'cbt', question: 'What are the five stages of group development according to Bruce Tuckman model?', options: ['Forming, Storming, Norming, Performing, Adjourning', 'Planning, Budgeting, Staffing, Leading, Auditing', 'Initiating, Developing, Expanding, Declining, Dissolving', 'Hiring, Training, Appraising, Promoting, Retiring'], correctAnswer: 'Forming, Storming, Norming, Performing, Adjourning' },
            { type: 'cbt', question: 'What is Organizational Culture?', options: ['The shared values, beliefs, rituals, and norms that govern how members behave in an organization', 'The national ethnicity of the majority shareholders', 'The software applications installed on office laptops', 'The dress code policy enforced on casual Fridays'], correctAnswer: 'The shared values, beliefs, rituals, and norms that govern how members behave in an organization' },
            { type: 'cbt', question: 'In conflict management, what style seeks a win-win outcome satisfying concerns of all parties?', options: ['Collaborating (Integrating)', 'Avoiding', 'Competing (Dominating)', 'Accommodating'], correctAnswer: 'Collaborating (Integrating)' },
            { type: 'cbt', question: 'What is Transformational Leadership?', options: ['Leadership that inspires, stimulates intellect, and motivates followers to exceed self-interest for the organization vision', 'Leadership that relies strictly on routine rewards and disciplinary punishments', 'Passive leadership that refuses to intervene until crisis occurs', 'Micromanaging employees clerical keystrokes'], correctAnswer: 'Leadership that inspires, stimulates intellect, and motivates followers to exceed self-interest for the organization vision' },
            { type: 'cbt', question: 'What is Groupthink in organizational decision making?', options: ['A psychological phenomenon where the desire for group conformity suppresses dissenting opinions, leading to flawed decisions', 'Effective brainstorming that produces innovative patents', 'Training teams through online webinars', 'Democratic voting on company policies'], correctAnswer: 'A psychological phenomenon where the desire for group conformity suppresses dissenting opinions, leading to flawed decisions' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'MGT 301',
          title: 'Human Resource Management',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Job Analysis and differentiate between a Job Description and a Job Specification.',
              options: [],
              correctAnswer: 'Job Analysis is the systematic process of collecting and examining information about the responsibilities, duties, and work environment of a specific job. A Job Description outlines the tasks, reporting lines, responsibilities, and operational duties of the job (what the job entails). A Job Specification defines the minimum human qualifications, skills, education, experience, and competencies a candidate must possess to perform the job successfully (who is qualified).',
              gradingPoints: [
                { concept: 'job analysis systematic process gathering information about job duties and environment', weight: 0.4, aliases: ['job analysis definition', 'analyzing job responsibilities'] },
                { concept: 'job description outlines duties tasks responsibilities what job entails', weight: 0.3, aliases: ['job description definition', 'tasks and responsibilities document'] },
                { concept: 'job specification outlines qualifications skills competencies required of candidate', weight: 0.3, aliases: ['job specification definition', 'candidate qualifications and skills'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Internal Recruitment and External Recruitment, discussing pros and cons of each.',
              options: [],
              correctAnswer: 'Internal recruitment fills vacancies from within existing staff (pros: boosts morale, shorter onboarding, lower cost, proven track record; cons: limits fresh ideas, causes internal rivalry, creates another vacancy). External recruitment attracts candidates outside the organization (pros: brings innovative perspectives, wider talent pool, specialized skills; cons: higher advertising/recruiting costs, longer onboarding, cultural fit risk).',
              gradingPoints: [
                { concept: 'internal recruitment pros morale low cost proven record cons insularity vacancy', weight: 0.5, aliases: ['internal hiring trade offs', 'internal recruitment pros cons'] },
                { concept: 'external recruitment pros fresh ideas specialized skills cons high cost onboarding risk', weight: 0.5, aliases: ['external hiring trade offs', 'external recruitment pros cons'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Performance Appraisal process and describe 360-degree feedback evaluation.',
              options: [],
              correctAnswer: 'Performance Appraisal is the periodic formal assessment of an employee job performance, accomplishments, and developmental needs against predetermined benchmarks. In 360-degree feedback, performance evaluations are collected anonymously from all around the employee: their supervisor, direct peers, subordinates, customers, as well as a self-appraisal, delivering a comprehensive holistic assessment of strengths and blind spots.',
              gradingPoints: [
                { concept: 'periodic formal evaluation of performance against predetermined standards', weight: 0.4, aliases: ['performance appraisal definition', 'employee evaluation process'] },
                { concept: '360 degree feedback gathers input from supervisor peers subordinates customers self', weight: 0.6, aliases: ['360 degree evaluation', 'multi source feedback system'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe standard Training Needs Assessment (TNA) and the ADDIE instructional design model.',
              options: [],
              correctAnswer: 'A Training Needs Assessment (TNA) analyzes discrepancies between current employee skills and required organizational competencies across organizational, task, and individual levels. The ADDIE instructional model guides training development: Analysis (identifying skill gaps); Design (setting learning objectives); Development (creating training materials); Implementation (delivering workshops); and Evaluation (measuring effectiveness via Kirkpatrick levels).',
              gradingPoints: [
                { concept: 'tna analyzes skill gaps across organizational task individual levels', weight: 0.4, aliases: ['training needs assessment', 'identifying competency gaps'] },
                { concept: 'addie analysis design development implementation evaluation stages', weight: 0.6, aliases: ['addie framework', 'instructional design stages'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Collective Bargaining and the dispute resolution process in industrial labor relations.',
              options: [],
              correctAnswer: 'Collective Bargaining is the formal negotiation process between labor unions representing employees and management to determine employment terms, wages, benefits, and working conditions. When an impasse occurs, dispute resolution progresses through: Negotiation (direct talks), Mediation (neutral third-party advisory facilitator), Conciliation, Arbitration (binding decision by neutral arbitrator), and adjudication via the Industrial Court.',
              gradingPoints: [
                { concept: 'negotiation between labor unions and management over terms wages conditions', weight: 0.5, aliases: ['collective bargaining definition', 'union management negotiations'] },
                { concept: 'dispute escalation negotiation mediation conciliation arbitration industrial court', weight: 0.5, aliases: ['labor dispute resolution', 'mediation and arbitration stages'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Human Resource Planning (HRP) and how do organizations balance labor supply and labor demand?',
              options: [],
              correctAnswer: 'Human Resource Planning (HRP) is the strategic forecasting of an organization future human talent requirements and availability. Organizations forecast labor demand (via trend analysis, Delphi technique) and internal labor supply (via Markov analysis, skill inventories). If demand exceeds supply, they hire, train, or outsource. If supply exceeds demand, they freeze hiring, offer voluntary retirement, or downsize.',
              gradingPoints: [
                { concept: 'strategic forecasting of future human talent requirements and availability', weight: 0.4, aliases: ['hrp definition', 'workforce planning'] },
                { concept: 'balances demand vs supply hiring training vs attrition retirement downsizing', weight: 0.6, aliases: ['balancing workforce deficits and surpluses', 'labor surplus and shortage reconciliation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Total Rewards Strategy: Direct Compensation, Indirect Benefits, and Non-Financial Recognition.',
              options: [],
              correctAnswer: 'A Total Rewards Strategy encompasses everything an employee values in the employment relationship. Direct Financial Compensation includes base salary, overtime, commissions, and performance bonuses. Indirect Financial Compensation (Benefits) includes health insurance, pensions, paid parental leave, and company housing. Non-Financial Rewards include professional development opportunities, work-life balance flexibility, and public achievement recognition.',
              gradingPoints: [
                { concept: 'direct financial compensation base salary commissions bonuses', weight: 0.35, aliases: ['direct compensation', 'salary and cash bonuses'] },
                { concept: 'indirect financial benefits health insurance pensions leave housing', weight: 0.35, aliases: ['employee benefits perks', 'insurance pensions leave'] },
                { concept: 'non financial rewards growth flexibility work life balance public recognition', weight: 0.3, aliases: ['non monetary recognition', 'career growth recognition'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Succession Planning and why is it vital for organizational continuity?',
              options: [],
              correctAnswer: 'Succession Planning is the systematic identification and development of internal employees to fill key executive and leadership roles as incumbents retire, resign, or advance. It is vital for continuity because it prevents catastrophic leadership vacuums, retains high-potential talent through planned career trajectories, and reduces expensive external executive headhunting costs.',
              gradingPoints: [
                { concept: 'systematic identification and grooming of internal talent for key leadership roles', weight: 0.5, aliases: ['succession planning definition', 'leadership pipeline grooming'] },
                { concept: 'prevents leadership vacuums preserves continuity retains high potential talent', weight: 0.5, aliases: ['organizational continuity importance', 'retains high potential leaders'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Employee Onboarding (Induction) and how it influences new-hire retention.',
              options: [],
              correctAnswer: 'Onboarding is the structured process of integrating new hires into an organization, familiarizing them with corporate culture, operational tools, compliance standards, and team roles. Effective onboarding accelerates time-to-productivity, alleviates anxiety, clarifies expectations, and fosters early social belonging, which significantly decreases first-year employee turnover.',
              gradingPoints: [
                { concept: 'structured integration of new hires into culture tools processes team roles', weight: 0.5, aliases: ['onboarding induction definition', 'integrating new employees'] },
                { concept: 'accelerates productivity clarifies expectations reduces early turnover', weight: 0.5, aliases: ['onboarding retention impact', 'lowers first year employee churn'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Diversity, Equity, and Inclusion (DEI) initiatives and their strategic benefits for enterprise management.',
              options: [],
              correctAnswer: 'Diversity encompasses hiring across diverse demographics (gender, ethnicity, age, background). Equity ensures fair access, opportunity, and compensation tailored to individual needs. Inclusion creates a workplace culture where all voices are welcomed and respected. Strategic benefits include richer problem-solving perspectives, higher creative innovation, improved employer brand reputation, and better understanding of diverse customer markets.',
              gradingPoints: [
                { concept: 'diversity representation equity fair treatment inclusion belonging', weight: 0.5, aliases: ['dei definitions', 'diversity equity inclusion pillars'] },
                { concept: 'strategic benefits superior innovation problem solving employer brand market empathy', weight: 0.5, aliases: ['dei strategic advantages', 'diverse creative perspectives and brand reputation'] },
              ],
            },
          ],
        },
        { code: 'MGT 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'MGT 401',
          title: 'Strategic Management & Business Policy',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the Strategic Management Process: Environmental Scanning, Strategy Formulation, Strategy Implementation, and Strategy Evaluation.',
              options: [],
              correctAnswer: 'The strategic management process comprises four continuous phases: 1. Environmental Scanning (analyzing external PESTEL/industry trends and internal SWOT strengths/weaknesses); 2. Strategy Formulation (establishing corporate vision, long-term goals, and choosing competitive strategies); 3. Strategy Implementation (executing strategy through organizational structure, budgets, policies, and resource allocation); and 4. Strategy Evaluation & Control (monitoring performance against benchmarks and initiating corrective adjustments).',
              gradingPoints: [
                { concept: 'environmental scanning formulation implementation evaluation four phases', weight: 0.6, aliases: ['four strategic management phases', 'strategic management lifecycle'] },
                { concept: 'clear operational description of each phase from vision to corrective control', weight: 0.4, aliases: ['descriptions of strategic phases', 'scanning formulation execution control'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Corporate-Level Strategy, Business-Level Strategy, and Functional-Level Strategy.',
              options: [],
              correctAnswer: 'Corporate-Level Strategy defines the overall scope and direction of the entire corporation, determining which industries to compete in (e.g., conglomerate diversification, mergers, divestment). Business-Level Strategy determines how a specific strategic business unit (SBU) competes successfully within its particular industry (e.g., cost leadership vs differentiation). Functional-Level Strategy coordinates specific operational departments (marketing, finance, operations, HR) to execute the business-level strategy effectively.',
              gradingPoints: [
                { concept: 'corporate level overall scope industries portfolio choices', weight: 0.35, aliases: ['corporate strategy', 'diversification and portfolio'] },
                { concept: 'business level competitive posture within single industry sbu', weight: 0.35, aliases: ['business unit strategy', 'competitive advantage posture'] },
                { concept: 'functional level departmental execution operations marketing finance hr', weight: 0.3, aliases: ['functional strategy', 'departmental tactical alignment'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is a PESTEL Analysis and what environmental macro-forces does it examine in corporate strategic planning?',
              options: [],
              correctAnswer: 'PESTEL Analysis is a strategic tool used to identify and evaluate external macro-environmental forces impacting an enterprise: Political (government policies, political stability, trade tariffs), Economic (interest rates, inflation, exchange rates, unemployment), Sociocultural (demographics, lifestyle trends, consumer values), Technological (automation, R&D innovations, digital disruption), Environmental (climate change, carbon regulations, sustainability), and Legal (labor laws, consumer protection, health regulations).',
              gradingPoints: [
                { concept: 'political economic sociocultural technological environmental legal macro forces', weight: 0.7, aliases: ['pestel forces', 'six macro environmental factors'] },
                { concept: 'evaluates external opportunities and threats in strategic planning', weight: 0.3, aliases: ['macro environmental evaluation', 'scanning external environment'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Core Competencies (Prahalad and Hamel) and the three tests to identify them.',
              options: [],
              correctAnswer: 'Core Competencies are an organization unique bundle of integrated technical skills, technologies, and collective learning that distinguish it from rivals. Prahalad and Hamel provide three tests: 1. Potential access to a wide variety of markets (reusable across multiple product categories); 2. Significant contribution to perceived customer value and benefits; and 3. Difficult for competitors to imitate because it is complex and deeply embedded in organizational culture.',
              gradingPoints: [
                { concept: 'unique bundle of integrated skills technologies providing competitive advantage', weight: 0.4, aliases: ['core competencies definition', 'collective organizational learning'] },
                { concept: 'three tests access to multiple markets customer value contribution difficulty to imitate', weight: 0.6, aliases: ['prahalad hamel three tests', 'market access customer value inimitability'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Mergers, Acquisitions (Takeovers), and Strategic Alliances.',
              options: [],
              correctAnswer: 'A Merger is a mutual agreement where two independent firms of relatively equal size consolidate into a single new legal entity. An Acquisition occurs when one purchasing firm buys out and absorbs another target company (which may be friendly or hostile). A Strategic Alliance is a cooperative partnership where independent firms collaborate and share resources on specific ventures while retaining their separate corporate identities.',
              gradingPoints: [
                { concept: 'merger consolidation of two equals into new entity', weight: 0.35, aliases: ['merger definition', 'consolidation of equals'] },
                { concept: 'acquisition one firm purchases and absorbs target company', weight: 0.35, aliases: ['acquisition definition', 'takeover absorption'] },
                { concept: 'strategic alliance cooperative partnership sharing resources retaining autonomy', weight: 0.3, aliases: ['strategic alliance definition', 'collaborative venture independent entities'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Organizational Inertia and how does McKinsey 7S Framework facilitate corporate strategic realignment?',
              options: [],
              correctAnswer: 'Organizational inertia is the resistance of an established enterprise to change its existing structures, processes, and culture despite shifting external environments. The McKinsey 7S Framework facilitates realignment by assessing seven interdependent organizational elements: Hard elements (Strategy, Structure, Systems) and Soft elements (Shared Values, Style, Staff, Skills), demonstrating that changing strategy requires harmonizing all other six elements.',
              gradingPoints: [
                { concept: 'organizational inertia resistance to changing established routines and culture', weight: 0.4, aliases: ['organizational inertia definition', 'structural resistance to change'] },
                { concept: 'mckinsey 7s strategy structure systems shared values style staff skills', weight: 0.6, aliases: ['7s elements', 'hard and soft 7s elements realignment'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Vertical Integration (Backward and Forward) versus Horizontal Integration.',
              options: [],
              correctAnswer: 'Vertical Integration occurs when an enterprise expands into different stages of its own value chain. Backward integration moves upstream toward raw materials/suppliers (e.g., bread manufacturer purchasing wheat flour mill). Forward integration moves downstream toward distributors/retailers (e.g., shoe maker opening retail shoe stores). Horizontal Integration occurs when an enterprise acquires or merges with competitor firms operating at the same stage of the supply chain to boost market share.',
              gradingPoints: [
                { concept: 'backward vertical integration upstream toward suppliers raw materials', weight: 0.35, aliases: ['backward integration', 'upstream supplier acquisition'] },
                { concept: 'forward vertical integration downstream toward distribution retailers', weight: 0.35, aliases: ['forward integration', 'downstream distribution capture'] },
                { concept: 'horizontal integration acquires rivals operating at same supply chain stage', weight: 0.3, aliases: ['horizontal integration', 'merging with competitors at same level'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Corporate Social Responsibility (CSR) according to Carroll CSR Pyramid.',
              options: [],
              correctAnswer: 'Carroll CSR Pyramid depicts four levels of corporate social obligations: 1. Economic Responsibilities (base: be profitable, produce goods consumers desire; foundation); 2. Legal Responsibilities (obey laws, regulations, and tax codes); 3. Ethical Responsibilities (do what is right, just, and fair beyond legal minimums); and 4. Philanthropic Responsibilities (apex: be a good corporate citizen, contribute resources to community welfare).',
              gradingPoints: [
                { concept: 'economic base legal ethical philanthropic apex four pyramid levels', weight: 0.7, aliases: ['carroll four responsibilities', 'economic legal ethical philanthropic'] },
                { concept: 'progression from foundational profitability to voluntary community contributions', weight: 0.3, aliases: ['pyramid hierarchy', 'foundation to apex progression'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Strategy Implementation Failure and why does execution frequently stumble according to Kaplan and Norton?',
              options: [],
              correctAnswer: 'Strategy implementation failure occurs when sound corporate strategies fail to achieve projected results due to poor execution. Execution stumbles due to four barriers: 1. Vision Barrier (only 5% of workforce understands strategy); 2. People Barrier (incentives and career rewards not linked to strategic goals); 3. Resource Barrier (budgets allocated to short-term fires rather than strategic programs); and 4. Management Barrier (executive meetings spend 85% of time on tactical operations rather than strategy).',
              gradingPoints: [
                { concept: 'failure of execution despite sound formulated strategy', weight: 0.4, aliases: ['implementation failure', 'strategy execution breakdown'] },
                { concept: 'vision barrier people barrier resource barrier management barrier', weight: 0.6, aliases: ['four execution barriers', 'kaplan norton execution barriers'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Corporate Governance mechanisms that resolve the Principal-Agent Problem between shareholders and executive managers.',
              options: [],
              correctAnswer: 'The Principal-Agent problem arises when self-interested managers (agents) pursue personal enrichment at the expense of shareholder (principal) wealth. Corporate governance mechanisms resolve this through: an independent Board of Directors with outside oversight committees, performance-contingent executive compensation (stock options vesting over time), mandatory external statutory financial audits, and threat of hostile takeovers if management destroys market capitalization.',
              gradingPoints: [
                { concept: 'principal agent conflict between shareholder wealth and managerial self interest', weight: 0.4, aliases: ['agency problem definition', 'principal agent misalignment'] },
                { concept: 'independent board stock options vesting external audits takeover threat', weight: 0.6, aliases: ['governance mitigation mechanisms', 'board oversight stock incentives audits'] },
              ],
            },
          ],
        },
        { code: 'MGT 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ];
