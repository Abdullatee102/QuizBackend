// src/seed/faculties/ffcs/cfs.ts
import type { SeedCourse } from '../../types.js';

export const cfsCourses: SeedCourse[] = [
        // 100 Level
        {
          code: 'CFS 101',
          title: 'Introduction to Consumer & Home Economics',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the core focus of Consumer and Home Economics?', options: ['Commercial banking', 'Improving the well-being of individuals, families, and communities through resource management', 'Stock market trading', 'Automobile repair'], correctAnswer: 'Improving the well-being of individuals, families, and communities through resource management' },
            { type: 'cbt', question: 'What are consumer rights designed to protect against?', options: ['Fair competition', 'Unfair business practices, hazardous products, and misleading advertising', 'Voluntary donations', 'Product warranties'], correctAnswer: 'Unfair business practices, hazardous products, and misleading advertising' },
            { type: 'cbt', question: 'Who proclaimed the Consumer Bill of Rights in 1962 establishing the rights to safety, information, choice, and being heard?', options: ['John F. Kennedy', 'Abraham Lincoln', 'Adam Smith', 'Nelson Mandela'], correctAnswer: 'John F. Kennedy' },
            { type: 'cbt', question: 'What is the Right to Safety in consumer protection?', options: ['Protection against hazardous products and production processes that endanger health or life', 'Guaranteed police bodyguard escort during shopping', 'Free locks on home doors', 'Bulletproof car windows'], correctAnswer: 'Protection against hazardous products and production processes that endanger health or life' },
            { type: 'cbt', question: 'What is Family Resource Management?', options: ['The decision-making process of allocating human and material family resources to achieve goals', 'Spending all salary within the first week', 'Refusing to buy food groceries', 'Hiring accounting firms for daily laundry'], correctAnswer: 'The decision-making process of allocating human and material family resources to achieve goals' },
            { type: 'cbt', question: 'Which of the following is classified as a Human Resource in family economics?', options: ['Knowledge, energy, skills, and time', 'Land, money, and furniture', 'Cars, houses, and bank savings', 'Gold jewelry and clothes'], correctAnswer: 'Knowledge, energy, skills, and time' },
            { type: 'cbt', question: 'Which agency is the primary federal consumer protection regulatory body in Nigeria?', options: ['FCCPC (Federal Competition and Consumer Protection Commission)', 'EFCC', 'NPA', 'CAC'], correctAnswer: 'FCCPC (Federal Competition and Consumer Protection Commission)' },
            { type: 'cbt', question: 'What is a Warranty in consumer product purchases?', options: ['A written guarantee by the manufacturer promising to repair or replace a defective product within a specified timeframe', 'A discount voucher for future purchases', 'An invoice receipt proving payment', 'A customs clearance stamp'], correctAnswer: 'A written guarantee by the manufacturer promising to repair or replace a defective product within a specified timeframe' },
            { type: 'cbt', question: 'What is Impulse Buying?', options: ['An unplanned, spontaneous purchase decision triggered by immediate emotional stimulus or promotional display', 'Purchasing after three months of comparative research', 'Buying wholesale inventory for a grocery store', 'Paying utility bills on time'], correctAnswer: 'An unplanned, spontaneous purchase decision triggered by immediate emotional stimulus or promotional display' },
            { type: 'cbt', question: 'What does consumer Redress mean?', options: ['Seeking fair compensation, refund, or repair for faulty goods or unsatisfactory services', 'Purchasing red clothing items', 'Decorating living rooms with red paint', 'Filing corporate bankruptcy forms'], correctAnswer: 'Seeking fair compensation, refund, or repair for faulty goods or unsatisfactory services' },
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
            { type: 'cbt', question: 'In family financial planning, what is an Emergency Fund?', options: ['Savings set aside to cover 3 to 6 months of living expenses during unforeseen crises like job loss or medical illness', 'A credit card with maximum borrowing limit', 'A casino gambling reserve', 'Money borrowed from neighbors'], correctAnswer: 'Savings set aside to cover 3 to 6 months of living expenses during unforeseen crises like job loss or medical illness' },
            { type: 'cbt', question: 'What is Engels Law in consumer expenditure economics?', options: ['As household income increases, the percentage of income spent on food decreases', 'Rich families spend 100% of income on food', 'Poor families buy luxury yachts', 'Food prices increase when income drops'], correctAnswer: 'As household income increases, the percentage of income spent on food decreases' },
            { type: 'cbt', question: 'Which family life cycle stage typically incurs peak financial expenses for education and healthcare?', options: ['Contracting family (empty nest)', 'Expanding family (school-age and adolescent children)', 'Beginning family (newly married couple)', 'Retirement stage'], correctAnswer: 'Expanding family (school-age and adolescent children)' },
            { type: 'cbt', question: 'What is conspicuous consumption (Thorstein Veblen)?', options: ['Purchasing luxury goods and services primarily to publicly display wealth and elevate social status', 'Buying essential groceries in bulk', 'Donating clothing anonymously to orphanages', 'Living in off-grid rural farming communes'], correctAnswer: 'Purchasing luxury goods and services primarily to publicly display wealth and elevate social status' },
            { type: 'cbt', question: 'What does Comparative Shopping involve?', options: ['Comparing prices, features, warranties, and quality of products across multiple vendors before purchasing', 'Buying from the very first shop without looking elsewhere', 'Purchasing only imported foreign items', 'Ordering items without checking prices'], correctAnswer: 'Comparing prices, features, warranties, and quality of products across multiple vendors before purchasing' },
            { type: 'cbt', question: 'In work simplification in home management, what are Gilbreth Therbligs?', options: ['Basic elemental motions required to perform manual work tasks', 'Cooking recipes for holiday festivals', 'Sewing stitch patterns on fabrics', 'Interior curtain measurements'], correctAnswer: 'Basic elemental motions required to perform manual work tasks' },
            { type: 'cbt', question: 'What is Net Worth of a household?', options: ['Total Assets minus Total Liabilities', 'Monthly Gross Salary', 'Cash held in checking accounts only', 'Market value of furniture'], correctAnswer: 'Total Assets minus Total Liabilities' },
            { type: 'cbt', question: 'What is Opportunity Cost in household resource allocation?', options: ['The value of the next best alternative foregone when deciding to allocate time or money to a specific pursuit', 'A store clearance coupon', 'The retail cost of buying home appliances', 'The electricity bill payment'], correctAnswer: 'The value of the next best alternative foregone when deciding to allocate time or money to a specific pursuit' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'CFS 301',
          title: 'Textiles, Clothing & Interior Design',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Classify textile fibers into Natural and Synthetic fibers, providing examples and performance characteristics of each.',
              options: [],
              correctAnswer: 'Textile fibers classify into: Natural fibers sourced from plants/animals (e.g., Cotton: cellulosic, breathable, absorbent, wrinkles easily; Wool: proteinaceous, crimped, flame-retardant, high thermal insulation; Silk: protein filament, lustrous, high tensile strength) and Synthetic fibers produced through petrochemical polymerization (e.g., Polyester: wrinkle-resistant, hydrophobic, durable; Nylon: exceptionally strong, abrasion-resistant; Acrylic: wool-like warmth, lightweight).',
              gradingPoints: [
                { concept: 'natural fibers plant animal origins cotton wool silk properties', weight: 0.5, aliases: ['natural fiber characteristics', 'plant animal cellulosic protein fibers'] },
                { concept: 'synthetic petrochemical polymers polyester nylon acrylic properties', weight: 0.5, aliases: ['synthetic fiber characteristics', 'petrochemical polymer fibers'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the three fundamental basic weave structures in fabric manufacturing: Plain, Twill, and Satin weaves.',
              options: [],
              correctAnswer: 'Plain Weave interlacing warp and weft yarns alternately in an over-one, under-one checkerboard pattern (most durable, reversible, e.g., muslin, calico). Twill Weave features diagonal surface wales created by passing weft yarns over two and under one or more warp yarns with a stepped progression (strong, tear-resistant, drapes well, e.g., denim, gabardine). Satin Weave utilizes long yarn floats over four or more yarns with staggered tie-points, producing a smooth, lustrous face with snag-prone characteristics.',
              gradingPoints: [
                { concept: 'plain weave over one under one checkerboard durable reversible', weight: 0.35, aliases: ['plain weave 1x1', 'checkerboard plain interlacing'] },
                { concept: 'twill weave diagonal wales stepped interlacing tear resistant denim', weight: 0.35, aliases: ['twill diagonal ridges', 'diagonal wale structure denim'] },
                { concept: 'satin weave long yarn floats lustrous smooth snag prone', weight: 0.3, aliases: ['satin long floats', 'lustrous smooth float weave'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Principles of Interior Design: Balance, Rhythm, Proportion/Scale, Emphasis, and Harmony/Unity.',
              options: [],
              correctAnswer: 'Principles of Interior Design organize spatial compositions: Balance creates equilibrium (symmetrical/formal, asymmetrical/informal, or radial). Proportion and Scale ensure furniture dimensions relate pleasantly to human size and room volume. Emphasis creates a dominant focal point (e.g., feature wall or artwork). Rhythm establishes visual movement across space via repetition, progression, or radiation. Harmony and Unity synthesize all elements through cohesive color schemes and textures.',
              gradingPoints: [
                { concept: 'balance proportion scale emphasis rhythm harmony unity principles', weight: 0.6, aliases: ['five interior design principles', 'principles of spatial design'] },
                { concept: 'concise architectural description of how each principle organizes spaces', weight: 0.4, aliases: ['application of interior principles', 'equilibrium focal points and unity'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Color Theory in interior spaces: Color Harmonies (Monochromatic, Complementary, Analogous, Triadic) and psychological spatial effects.',
              options: [],
              correctAnswer: 'Color harmonies define aesthetic combinations: Monochromatic uses tints and shades of a single hue (calming). Complementary pairs opposite wheel hues (e.g., blue and orange; high contrast dynamic). Analogous combines adjacent wheel hues (e.g., blue, blue-green, green; restful natural harmony). Triadic uses three equidistant hues. Psychologically, warm colors (red, yellow) visually advance, making rooms feel cozy or smaller, while cool colors (blue, green) visually recede, expanding perceived room size.',
              gradingPoints: [
                { concept: 'monochromatic complementary analogous triadic color harmonies', weight: 0.5, aliases: ['four color harmonies', 'color wheel combinations'] },
                { concept: 'warm colors advance cozier cool colors recede expand perceived space', weight: 0.5, aliases: ['psychological spatial color effects', 'advancing warm receding cool colors'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Ergonomics and Anthropometry in functional residential kitchen design, including the Kitchen Work Triangle.',
              options: [],
              correctAnswer: 'Ergonomics and anthropometry adapt kitchen spaces to human body dimensions to minimize physical fatigue, bending, and accidents. Countertop heights are calibrated to standing elbow levels (85-90 cm). The Kitchen Work Triangle connects the three primary activity centers: the Sink (prep/cleaning), the Refrigerator (food storage), and the Range/Cooktop (cooking), requiring total perimeter walking distance between 4.0 and 7.9 meters without intersecting cross-traffic.',
              gradingPoints: [
                { concept: 'adapts counter heights clearances to human body dimensions minimizing fatigue', weight: 0.4, aliases: ['anthropometric kitchen dimensions', 'ergonomic workspace adaptation'] },
                { concept: 'kitchen work triangle connects sink refrigerator range perimeter 4.0 to 7.9 meters', weight: 0.6, aliases: ['work triangle dimensions', 'sink fridge stove triangle'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain chemical finishes applied to textiles: Flame-Retardant, Water-Repellent, and Wrinkle-Resistant finishes.',
              options: [],
              correctAnswer: 'Textile chemical finishes alter fabric performance: Flame-Retardant finishes apply phosphorus or halogen compounds that promote protective charring and self-extinguish flames upon removal of ignition. Water-Repellent finishes coat yarn surfaces with fluorochemicals or silicones that lower surface energy, causing water droplets to bead up and roll off without blocking fabric air permeability. Wrinkle-Resistant finishes use cross-linking resin polymers that link cellulosic chains, preventing creasing after laundering.',
              gradingPoints: [
                { concept: 'flame retardant promotes charring self extinguishing mechanism', weight: 0.35, aliases: ['flame retardant finish', 'fire resistant chemical coating'] },
                { concept: 'water repellent fluorochemical coating beads water preserves breathability', weight: 0.35, aliases: ['water repellent finish', 'hydrophobic surface treatment'] },
                { concept: 'wrinkle resistant cross links cellulose polymers preventing laundering creases', weight: 0.3, aliases: ['wrinkle resistant finish', 'durable press resin treatment'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe sustainable apparel practices: Fast Fashion environmental impacts and Circular Fashion models.',
              options: [],
              correctAnswer: 'Fast fashion relies on rapid manufacturing of cheap, trendy clothing, generating severe environmental impacts: massive water consumption, toxic dye water pollution, microfiber synthetic shedding into oceans, and mountains of non-biodegradable landfill waste. Circular Fashion models eliminate waste through closed-loop recycling, designing durable garments for disassembly, upcycling textile remnants, apparel resale/rental platforms, and utilizing biodegradable organic fibers.',
              gradingPoints: [
                { concept: 'fast fashion water pollution microplastics landfill textile waste impacts', weight: 0.5, aliases: ['fast fashion environmental footprint', 'textile pollution and landfill waste'] },
                { concept: 'circular fashion design for disassembly closed loop recycling apparel resale', weight: 0.5, aliases: ['circular fashion model', 'closed loop textile recycling'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Lighting Design in residential interiors: Ambient, Task, and Accent lighting.',
              options: [],
              correctAnswer: 'A layered lighting design integrates three layers: 1. Ambient Lighting (general background illumination providing uniform visibility and safety across the entire room, e.g., recessed ceiling downlights); 2. Task Lighting (focused, glare-free directional illumination targeted at specific work surfaces, e.g., under-cabinet kitchen LED strips, desk reading lamps); and 3. Accent Lighting (high-intensity directional illumination creating visual drama by highlighting architectural features or artwork, e.g., wall sconces, spotlights).',
              gradingPoints: [
                { concept: 'ambient general background illumination uniform visibility', weight: 0.35, aliases: ['ambient lighting layer', 'general room lighting'] },
                { concept: 'task focused directional illumination on work surfaces kitchen desk', weight: 0.35, aliases: ['task lighting layer', 'functional work illumination'] },
                { concept: 'accent highlights architectural features artwork creating visual drama', weight: 0.3, aliases: ['accent lighting layer', 'decorative highlight illumination'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Space Planning in residential architecture and how does Bubble Diagramming inform layout development?',
              options: [],
              correctAnswer: 'Space planning is the allocation and arrangement of interior spaces and circulation pathways to ensure maximum functional utility, privacy, and aesthetic flow. Bubble Diagramming is an early conceptual sketching tool where functional zones (e.g., living, kitchen, bedrooms, bathrooms) are represented as freeform labeled bubbles connected by lines indicating spatial adjacencies, circulation paths, and noise separation before drawing rigid structural floorplans.',
              gradingPoints: [
                { concept: 'allocation arrangement of interior spaces circulation and functional zones', weight: 0.4, aliases: ['space planning definition', 'spatial flow and functional zoning'] },
                { concept: 'bubble diagramming conceptual sketches mapping adjacencies circulation acoustic buffers', weight: 0.6, aliases: ['bubble diagram role', 'mapping spatial adjacencies'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Universal Design principles in home interior architecture for aging populations and persons with disabilities.',
              options: [],
              correctAnswer: 'Universal Design creates living environments usable by all people regardless of age, size, or physical ability. Key residential adaptations include: step-free zero-threshold entrance doorways (minimum 36-inch clear door width for wheelchair clearance), non-slip textured flooring, lever-style door and faucet handles replacing rotating knobs, curbless walk-in showers with wall-anchored grab bars, and multi-level kitchen prep counters accessible from seated positions.',
              gradingPoints: [
                { concept: 'environments usable by all people regardless of age physical capability', weight: 0.4, aliases: ['universal design concept', 'barrier free accessible architecture'] },
                { concept: 'zero threshold doors 36 inch widths non slip floors grab bars lever handles curbless showers', weight: 0.6, aliases: ['accessible residential features', 'wheelchair clearances and lever hardware'] },
              ],
            },
          ],
        },
        { code: 'CFS 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'CFS 401',
          title: 'Consumer Rights, Economics & Child Development',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the United Nations Guidelines for Consumer Protection (UNGCP) and describe four internationally recognized consumer rights.',
              options: [],
              correctAnswer: 'The UNGCP establishes principles for governments to maintain effective consumer protection laws and redress mechanisms. Four recognized rights include: 1. Right to Safety (protection against products hazardous to health); 2. Right to be Informed (accurate information regarding ingredients, pricing, origin, and instructions); 3. Right to Choose (access to competitive goods at fair prices); and 4. Right to Redress (fair settlement of legitimate claims, including product refunds or damages).',
              gradingPoints: [
                { concept: 'ungcp framework guiding national consumer protection legislation', weight: 0.3, aliases: ['ungcp guidelines', 'un consumer principles'] },
                { concept: 'right to safety informed choice redress four recognized rights', weight: 0.7, aliases: ['four consumer rights', 'safety information choice redress'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Jean Piaget Four Stages of Cognitive Child Development and educational implications for home environments.',
              options: [],
              correctAnswer: 'Piaget stages are: 1. Sensorimotor (0-2 years: learning through sensory exploration, mastering object permanence); 2. Preoperational (2-7 years: symbolic thinking, language emergence, egocentrism); 3. Concrete Operational (7-11 years: logical reasoning about concrete events, mastering conservation of mass/volume); and 4. Formal Operational (12+ years: abstract thinking, hypothetical deductive reasoning). Home environments should provide sensory toys in infancy and open-ended exploratory problem-solving tools in childhood.',
              gradingPoints: [
                { concept: 'sensorimotor preoperational concrete operational formal operational four stages', weight: 0.7, aliases: ['piaget four cognitive stages', 'cognitive development stages'] },
                { concept: 'educational home environmental adaptations tailored to each stage', weight: 0.3, aliases: ['parental home learning applications', 'sensory and logical environmental stimulation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Diana Baumrind Parenting Styles: Authoritative, Authoritarian, Permissive, and Uninvolved, and their developmental outcomes.',
              options: [],
              correctAnswer: 'Baumrind identifies four parenting styles based on warmth and control: 1. Authoritative (high warmth, high expectations; clear boundaries with open communication; yields confident, socially competent, resilient children); 2. Authoritarian (low warmth, high strict control; punishment-focused; yields anxious, obedient, low-self-esteem children); 3. Permissive (high warmth, low control; few rules; yields impulsive, self-centered children); and 4. Uninvolved (low warmth, low control; neglectful; yields worst behavioral and academic outcomes).',
              gradingPoints: [
                { concept: 'authoritative authoritarian permissive uninvolved four parenting styles', weight: 0.5, aliases: ['baumrind parenting styles', 'four parenting typologies'] },
                { concept: 'warmth versus control dimensions and associated child behavioral developmental outcomes', weight: 0.5, aliases: ['child developmental consequences', 'resilience versus anxiety outcomes'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Deceptive Advertising in consumer law and what enforcement mechanisms does the FCCPC employ in Nigeria?',
              options: [],
              correctAnswer: 'Deceptive advertising involves false claims, misleading omission of material facts, or fabricated testimonials regarding product capabilities, price discounts, or health outcomes that deceive reasonable consumers. In Nigeria, the FCCPC enforces compliance by investigating complaints, issuing cease-and-desist orders, mandating corrective public advertisements, levying financial administrative penalties, and initiating criminal prosecution against corporate executives.',
              gradingPoints: [
                { concept: 'false misleading claims or omissions deceiving reasonable consumers', weight: 0.5, aliases: ['deceptive advertising definition', 'misleading commercial practices'] },
                { concept: 'fccpc enforcement investigations cease and desist corrective ads fines prosecution', weight: 0.5, aliases: ['fccpc statutory powers', 'administrative penalties and corrective orders'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Erik Erikson Psychosocial Stages of Development during childhood: Trust vs Mistrust, Autonomy vs Shame, Initiative vs Guilt, and Industry vs Inferiority.',
              options: [],
              correctAnswer: 'Erikson childhood psychosocial crises are: 1. Trust vs. Mistrust (infancy: consistent parental warmth builds basic trust in the world); 2. Autonomy vs. Shame/Doubt (toddlerhood: encouraging self-directed actions builds independence rather than self-doubt); 3. Initiative vs. Guilt (preschool: encouragement of imaginative play builds purpose without excessive guilt); and 4. Industry vs. Inferiority (school age: mastering academic and peer skills fosters pride and competence rather than feelings of inadequacy).',
              gradingPoints: [
                { concept: 'trust vs mistrust autonomy vs shame initiative vs guilt industry vs inferiority', weight: 0.7, aliases: ['erikson four childhood stages', 'psychosocial developmental crises'] },
                { concept: 'core virtues developed hope will purpose competence', weight: 0.3, aliases: ['psychosocial virtues', 'hope will purpose competence'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Consumer Credit: Credit Cards, Hire Purchase, and Payday Loans, discussing predatory lending risks.',
              options: [],
              correctAnswer: 'Consumer credit allows immediate acquisition of goods paid over time. Credit cards offer revolving credit lines with grace periods. Hire Purchase transfers ownership only after final installment payment is made. Payday loans provide short-term cash advances at exorbitant annualized interest rates (APRs exceeding 300%). Predatory lending risks trap low-income families in perpetual compounding debt cycles through hidden fees, aggressive balloon payments, and aggressive debt collection harassment.',
              gradingPoints: [
                { concept: 'credit cards revolving hire purchase installment title transfer payday loans short cash', weight: 0.5, aliases: ['three consumer credit instruments', 'credit cards hire purchase payday'] },
                { concept: 'predatory lending compounding interest hidden fees debt trap cycles harassment', weight: 0.5, aliases: ['predatory lending dangers', 'usurious interest and compounding debt traps'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Urie Bronfenbrenner Ecological Systems Theory of child development: Microsystem, Mesosystem, Exosystem, and Macrosystem.',
              options: [],
              correctAnswer: 'Bronfenbrenner models child development within nested environmental systems: 1. Microsystem (immediate direct interactions: family, school, peers); 2. Mesosystem (interconnections between microsystems: parent-teacher conferences); 3. Exosystem (external settings that indirectly affect child: parental workplace policies, community health clinics); 4. Macrosystem (overarching cultural values, socio-economic laws, and religious ideologies); and Chronosystem (socio-historical time dimension).',
              gradingPoints: [
                { concept: 'nested socio environmental layers influencing child development', weight: 0.3, aliases: ['ecological systems framework', 'bronfenbrenner theory'] },
                { concept: 'microsystem mesosystem exosystem macrosystem definitions and interconnections', weight: 0.7, aliases: ['four ecological systems', 'micro meso exo macro layers'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Consumer Socialization and how do peer groups, media advertising, and parental modeling shape child purchasing behaviors?',
              options: [],
              correctAnswer: 'Consumer socialization is the developmental process by which children acquire knowledge, skills, values, and attitudes relevant to their functioning as consumers in the marketplace. Parents model budget allocation and brand skepticism. Peer groups drive brand conformity, fashion adoption, and social identity. Digital media advertising stimulates product desire, impulse pestering ("nag factor"), and early materialistic aspirations.',
              gradingPoints: [
                { concept: 'developmental process acquiring skills attitudes to function as marketplace consumers', weight: 0.4, aliases: ['consumer socialization definition', 'learning consumer habits'] },
                { concept: 'parental budgeting modeling peer conformity digital media advertising influence', weight: 0.6, aliases: ['agents of socialization', 'parents peers media shaping child behavior'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Product Liability laws and consumer protections against defective, hazardous manufactured goods.',
              options: [],
              correctAnswer: 'Product liability law holds manufacturers, distributors, and retailers legally accountable for injuries, property damage, or death caused by defective products. Liability arises under: Manufacturing Defect (flaw during assembly diverging from design), Design Defect (inherently unsafe product blueprint), or Failure to Warn (inadequate hazard instructions or warnings). Under strict liability, plaintiffs need only prove the product was defective and caused injury, without proving manufacturer negligence.',
              gradingPoints: [
                { concept: 'legal accountability for injuries caused by defective commercial products', weight: 0.4, aliases: ['product liability definition', 'manufacturer liability for harm'] },
                { concept: 'manufacturing defect design defect failure to warn strict liability doctrine', weight: 0.6, aliases: ['three defect categories', 'strict liability without proving negligence'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Child Labor versus Child Work and legal protections under the Nigerian Child Rights Act (2003).',
              options: [],
              correctAnswer: 'Child work involves light, age-appropriate household chores or apprenticeship that contributes to positive socialization without interfering with education or health. Child labor is work that deprives children of their childhood, interferes with regular schooling, or is mentally, physically, or socially dangerous (e.g., street hawking, quarry mining). The Nigerian Child Rights Act 2003 strictly prohibits child labor, guaranteeing right to free basic education, protection from economic exploitation, and penalties for violators.',
              gradingPoints: [
                { concept: 'child work positive socialization chores vs child labor hazardous school deprivation', weight: 0.5, aliases: ['child work vs child labor', 'positive chores vs hazardous exploitation'] },
                { concept: 'nigerian child rights act 2003 bans exploitation mandates education penalizes violators', weight: 0.5, aliases: ['child rights act 2003', 'legal protections against child labor'] },
              ],
            },
          ],
        },

        // 500 Level
        {
          code: 'CFS 501',
          title: 'Family Studies & Community Development Seminar',
          level: 500,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Family Systems Theory and its core concepts: Interdependence, Subsystems, Boundaries, and Homeostasis.',
              options: [],
              correctAnswer: 'Family Systems Theory conceptualizes the family as an emotional, interconnected unit where individuals cannot be understood in isolation. Key concepts are: Interdependence (change in one member automatically affects all other members); Subsystems (smaller structural units: marital, parental, sibling subsystems); Boundaries (invisible physical and emotional borders defining identity: open, closed, or permeable); and Homeostasis (the family ongoing drive to maintain structural stability and equilibrium despite internal/external disruptions).',
              gradingPoints: [
                { concept: 'family as emotional interconnected unit where parts cannot be analyzed in isolation', weight: 0.4, aliases: ['family systems theory', 'systemic family view'] },
                { concept: 'interdependence subsystems boundaries homeostasis four core concepts', weight: 0.6, aliases: ['four family systems concepts', 'interdependence boundaries homeostasis'] },
              ],
            },
            {
              type: 'theory',
              question: 'Analyze structural shifts in traditional African Family Systems resulting from urbanization and globalization.',
              options: [],
              correctAnswer: 'Urbanization and globalization have spurred profound structural transformations: transition from extended communal kinship networks to isolated nuclear and single-parent households; migration of youths to urban cities weakening elder authority and informal childcare safety nets; increased female formal labor participation altering traditional gender roles; and the erosion of collective ancestral family landholding in favor of privatized individual ownership.',
              gradingPoints: [
                { concept: 'transition from extended communal kinship networks to nuclear single parent households', weight: 0.5, aliases: ['extended to nuclear family shift', 'erosion of extended family safety net'] },
                { concept: 'rural urban youth migration female labor force participation privatized land tenure', weight: 0.5, aliases: ['economic drivers of family shifts', 'gender role alterations and urban migration'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Community Needs Assessment (CNA) methodologies in rural community development programming.',
              options: [],
              correctAnswer: 'A Community Needs Assessment systematically identifies the strengths, resources, and critical deficiencies of a community to guide development programs. Methodologies combine quantitative primary surveys (demographic, income, health audits) and qualitative Participatory Rural Appraisal (PRA) tools: community town hall forums, key informant interviews with community elders, focus groups, and asset mapping to co-create sustainable development priorities.',
              gradingPoints: [
                { concept: 'systematic identification of community assets resources and unmet deficiencies', weight: 0.4, aliases: ['cna definition', 'community assessment purpose'] },
                { concept: 'mixed methods surveys pra tools town halls key informant interviews asset mapping', weight: 0.6, aliases: ['cna methodologies', 'surveys townhalls and asset mapping'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Social Capital Theory (Bourdieu, Putnam) and differentiate between Bonding, Bridging, and Linking social capital.',
              options: [],
              correctAnswer: 'Social Capital refers to the social networks, trust, and shared norms that enable collective action and cooperation for mutual benefit. Bonding social capital connects inward-looking, homogeneous groups sharing identical social identities (close family, tight-knit ethnic groups). Bridging social capital connects outward-looking, heterogeneous social groups across diverse backgrounds (inter-faith civic associations). Linking social capital connects community members vertically to people in authority, financial institutions, and political power.',
              gradingPoints: [
                { concept: 'social networks trust and norms facilitating collective community action', weight: 0.4, aliases: ['social capital definition', 'networks and trust for cooperation'] },
                { concept: 'bonding inward homogeneous bridging outward heterogeneous linking vertical authority', weight: 0.6, aliases: ['bonding bridging linking capital', 'three types of social capital'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Gender Mainstreaming in community development policy formulation.',
              options: [],
              correctAnswer: 'Gender Mainstreaming is the public policy concept of assessing the different implications for women and men of any planned community development action, legislation, or program. It ensures that women and men perspectives, needs, and resource access (land ownership, credit, agricultural inputs) are integral dimensions of project design, implementation, monitoring, and evaluation so that gender inequality is actively dismantled rather than perpetuated.',
              gradingPoints: [
                { concept: 'systematic assessment of development implications for women and men', weight: 0.5, aliases: ['gender mainstreaming definition', 'gender integration in policy'] },
                { concept: 'integrates gender perspectives ensuring equal resource access credit land decision making', weight: 0.5, aliases: ['dismantling gender inequality', 'equal access to credit land and governance'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Family Economic Resilience and strategies for mitigating macroeconomic inflation and currency devaluation shocks.',
              options: [],
              correctAnswer: 'Family Economic Resilience is a household capacity to absorb financial shocks, adapt to inflation, and recover without falling into permanent poverty. Mitigation strategies include: diversifying household income streams through home-based micro-enterprises, cultivating backyard subsistence vegetable gardens, participating in rotating savings credit associations (ROSCAs / Esusu), bulk purchasing non-perishable food commodities, and substituting expensive imported goods with nutritious local staples.',
              gradingPoints: [
                { concept: 'household capacity to absorb financial shocks adapt and recover from poverty', weight: 0.4, aliases: ['economic resilience definition', 'household shock absorption'] },
                { concept: 'income diversification roscas esusu homestead gardening bulk purchasing local substitution', weight: 0.6, aliases: ['inflation coping strategies', 'esusu savings gardening and substitution'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Microfinance and how do microcredit and financial literacy programs empower rural female entrepreneurs?',
              options: [],
              correctAnswer: 'Microfinance provides collateral-free financial services (small loans, micro-savings, micro-insurance) to low-income individuals excluded from traditional banking. It empowers rural women by providing capital to launch agricultural processing and trading micro-enterprises, while financial literacy training equips them with bookkeeping, pricing, and savings habits. This enhances female economic independence, elevates household nutrition spending, and strengthens female bargaining power in domestic decisions.',
              gradingPoints: [
                { concept: 'collateral free financial services small loans savings to unbanked individuals', weight: 0.4, aliases: ['microfinance definition', 'microcredit to unbanked'] },
                { concept: 'enables micro enterprise launch bookkeeping financial literacy elevates household welfare', weight: 0.6, aliases: ['empowering rural female entrepreneurs', 'business startup and domestic bargaining power'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Family Stress Theory (Reuben Hill ABC-X Model) and its application in family crisis counseling.',
              options: [],
              correctAnswer: 'The ABC-X model explains how families respond to acute crisis: A (the Stressor Event: e.g., sudden death, job loss); interacting with B (the Family Resources: coping skills, financial reserves, social support); interacting with C (the Family Perception/Definition of the stressor); produces X (the Crisis: catastrophic disruption or resilient adaptation). In family counseling, clinicians assist families by bolstering resources (B) and reframing cognitive perceptions (C) to prevent severe crisis disorganization.',
              gradingPoints: [
                { concept: 'abc x model explaining family crisis response and adaptation', weight: 0.4, aliases: ['reuben hill abc x model', 'family stress model'] },
                { concept: 'a stressor b resources c cognitive perception x resulting crisis outcome', weight: 0.6, aliases: ['four model components', 'stressor resources perception crisis'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Sustainable Livelihoods Framework (SLF) and its five asset capitals: Human, Natural, Financial, Social, and Physical capitals.',
              options: [],
              correctAnswer: 'The DFID Sustainable Livelihoods Framework analyzes how impoverished communities achieve secure livelihoods by mobilizing five core asset capitals: 1. Human Capital (skills, health, education, labor capability); 2. Natural Capital (clean water, arable land, timber, biodiversity); 3. Financial Capital (savings, cash income, credit access); 4. Social Capital (networks of trust, kinship, community groups); and 5. Physical Capital (roads, shelter, transport, irrigation, communication tools).',
              gradingPoints: [
                { concept: 'framework analyzing how households mobilize asset capitals for secure livelihoods', weight: 0.4, aliases: ['sustainable livelihoods framework', 'dfid slf model'] },
                { concept: 'human natural financial social physical five asset capitals', weight: 0.6, aliases: ['five asset capitals', 'human natural financial social physical'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Program Evaluation in community development: Formative Evaluation, Process Evaluation, and Summative/Impact Evaluation.',
              options: [],
              correctAnswer: 'Program evaluation assesses community development interventions: Formative Evaluation occurs during program design and early piloting to refine methods and test feasibility. Process Evaluation assesses implementation fidelity, tracking whether planned activities, staffing, and participant recruitments are operating as intended. Summative (Impact) Evaluation measures the final long-term outcomes and net changes attributable directly to the intervention (e.g., reductions in child malnutrition or increases in household income).',
              gradingPoints: [
                { concept: 'formative assesses design feasibility during early development', weight: 0.35, aliases: ['formative evaluation', 'early pilot testing'] },
                { concept: 'process tracks implementation fidelity operational delivery of activities', weight: 0.35, aliases: ['process evaluation', 'fidelity and implementation tracking'] },
                { concept: 'summative impact measures final long term outcomes and net attributable changes', weight: 0.3, aliases: ['summative impact evaluation', 'measuring final net program outcomes'] },
              ],
            },
          ],
        },
        { code: 'CFS 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ];
