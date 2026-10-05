// src/seed/faculties/fmgs/mkt.ts
import type { SeedCourse } from '../../types.js';

export const mktCourses: SeedCourse[] = [
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
            { type: 'cbt', question: 'What is a Target Market?', options: ['The specific group of consumers toward which a firm directs its marketing efforts', 'All individuals living in a single city', 'The warehouse storing finished goods', 'The competitor corporate headquarters'], correctAnswer: 'The specific group of consumers toward which a firm directs its marketing efforts' },
            { type: 'cbt', question: 'What does Market Positioning mean in marketing strategy?', options: ['Arranging for a product to occupy a clear, distinctive, and desirable place relative to competing products in consumer minds', 'Placing boxes on warehouse shelves', 'Opening retail kiosks in shopping centers', 'Hiring delivery trucks'], correctAnswer: 'Arranging for a product to occupy a clear, distinctive, and desirable place relative to competing products in consumer minds' },
            { type: 'cbt', question: 'Which phase of the Product Life Cycle (PLC) typically features rapid sales growth and emerging competitors?', options: ['Introduction Stage', 'Growth Stage', 'Maturity Stage', 'Decline Stage'], correctAnswer: 'Growth Stage' },
            { type: 'cbt', question: 'What is Brand Equity?', options: ['The physical manufacturing cost of product packaging', 'The commercial value derived from consumer perception and reputation of a brand name', 'The bank interest owed by the marketing agency', 'The total number of employees in sales'], correctAnswer: 'The commercial value derived from consumer perception and reputation of a brand name' },
            { type: 'cbt', question: 'Which pricing strategy sets a high initial price to skim maximum revenues layer by layer before lowering it?', options: ['Market-Penetration Pricing', 'Price Skimming', 'Cost-Plus Pricing', 'Target-Return Pricing'], correctAnswer: 'Price Skimming' },
            { type: 'cbt', question: 'What is Intensive Distribution?', options: ['Stocking the product in as many retail outlets as possible (e.g., soft drinks, bread)', 'Selling exclusively through a single flagship boutique', 'Selling directly from factory gates only', 'Exporting goods only by air freight'], correctAnswer: 'Stocking the product in as many retail outlets as possible (e.g., soft drinks, bread)' },
            { type: 'cbt', question: 'What does the Promotional Mix consist of?', options: ['Advertising, Public Relations, Personal Selling, Sales Promotion, Direct Marketing', 'Packaging, Storing, Transporting, Assembling, Testing', 'Hiring, Training, Compensating, Appraising, Firing', 'Budgeting, Forecasting, Costing, Auditing, Taxing'], correctAnswer: 'Advertising, Public Relations, Personal Selling, Sales Promotion, Direct Marketing' },
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
            { type: 'cbt', question: 'What is cognitive dissonance in consumer behavior?', options: ['Excitement immediately upon purchasing a luxury item', 'Post-purchase psychological tension or doubt about whether the right decision was made', 'The desire to imitate friends shopping habits', 'Automatic repeat purchasing'], correctAnswer: 'Post-purchase psychological tension or doubt about whether the right decision was made' },
            { type: 'cbt', question: 'What is primary data in marketing research?', options: ['Data collected for the first time specifically for the research problem at hand', 'Data published in government census reports', 'Competitor financial balance sheets', 'Old company sales records'], correctAnswer: 'Data collected for the first time specifically for the research problem at hand' },
            { type: 'cbt', question: 'In consumer decision making, what is the Evoked Set (Consideration Set)?', options: ['The subset of brands that a consumer actively considers when making a purchase decision', 'All brands that exist in the global market', 'Brands that the consumer has rejected', 'Products displayed on the store checkout counter'], correctAnswer: 'The subset of brands that a consumer actively considers when making a purchase decision' },
            { type: 'cbt', question: 'Which qualitative research method gathers 6 to 10 consumers to discuss perceptions guided by a moderator?', options: ['Focus Group', 'Census Survey', 'Controlled Laboratory Experiment', 'Scanner Data Mining'], correctAnswer: 'Focus Group' },
            { type: 'cbt', question: 'What is a Reference Group in consumer sociology?', options: ['A group of individuals that serves as a point of comparison or influence for personal beliefs and buying behavior', 'The business board of directors', 'A directory of registered corporate phone numbers', 'A library catalog of marketing textbooks'], correctAnswer: 'A group of individuals that serves as a point of comparison or influence for personal beliefs and buying behavior' },
            { type: 'cbt', question: 'What sampling method gives every member of the target population a known and equal chance of selection?', options: ['Simple Random Sampling', 'Convenience Sampling', 'Judgmental Sampling', 'Quota Sampling'], correctAnswer: 'Simple Random Sampling' },
            { type: 'cbt', question: 'What is Perception in consumer psychology?', options: ['The process by which individuals select, organize, and interpret sensory stimuli into a meaningful worldview', 'The financial capability to buy luxury items', 'The legal age required to sign contracts', 'The memory capacity of smartphones'], correctAnswer: 'The process by which individuals select, organize, and interpret sensory stimuli into a meaningful worldview' },
            { type: 'cbt', question: 'Which question format in surveys provides respondents with a continuum between opposite adjectives (e.g., Reliable vs Unreliable)?', options: ['Semantic Differential Scale', 'Dichotomous (Yes/No) question', 'Open-ended narrative', 'Likert Agreement Scale'], correctAnswer: 'Semantic Differential Scale' },
            { type: 'cbt', question: 'What is Routine Response Behavior in consumer purchasing?', options: ['Low-involvement, frequent purchasing of familiar everyday goods with minimal search effort', 'Purchasing a house or automobile after six months of research', 'Bidding at fine art auctions', 'Negotiating commercial enterprise software contracts'], correctAnswer: 'Low-involvement, frequent purchasing of familiar everyday goods with minimal search effort' },
            { type: 'cbt', question: 'What is Secondary Data in marketing intelligence?', options: ['Pre-existing data collected previously by others for a purpose other than the current project', 'Data gathered directly from live user interviews', 'Fingerprint biometric scans of customers', 'Secret trade documents stolen from competitors'], correctAnswer: 'Pre-existing data collected previously by others for a purpose other than the current project' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'MKT 301',
          title: 'Product Planning & Pricing Strategy',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the four stages of the Product Life Cycle (PLC) and describe how marketing strategies adapt across each stage.',
              options: [],
              correctAnswer: 'The PLC stages are: 1. Introduction (slow sales, high launch costs, focus on building awareness and trial); 2. Growth (rapid sales growth, entering competitors, focus on brand preference and distribution expansion); 3. Maturity (sales peak, fierce price competition, focus on market modification, product differentiation, and customer retention); and 4. Decline (falling sales and profits, focus on harvesting, pruning weak SKUs, or divestment).',
              gradingPoints: [
                { concept: 'introduction growth maturity decline four stages', weight: 0.5, aliases: ['four plc stages', 'lifecycle phases'] },
                { concept: 'marketing strategy shifts from awareness to differentiation to harvesting', weight: 0.5, aliases: ['strategy adaptations', 'promotional and pricing changes across plc'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Market-Skimming Pricing and Market-Penetration Pricing, discussing appropriate conditions for each.',
              options: [],
              correctAnswer: 'Market-Skimming sets high initial prices to capture consumer surplus from early adopters with inelastic demand (requires premium brand prestige, high barriers to rival entry, and patented quality). Market-Penetration sets low initial prices to penetrate the market deeply and quickly capture large market share (requires price-sensitive elastic demand, economies of scale to lower unit costs, and capability to deter competitors).',
              gradingPoints: [
                { concept: 'skimming high initial price inelastic demand brand prestige barriers to entry', weight: 0.5, aliases: ['skimming strategy conditions', 'high initial price early adopters'] },
                { concept: 'penetration low initial price elastic demand economies of scale deterring rivals', weight: 0.5, aliases: ['penetration strategy conditions', 'low initial price volume capture'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the New Product Development (NPD) process through its eight sequential stages.',
              options: [],
              correctAnswer: 'The NPD process stages are: 1. Idea Generation (brainstorming concepts); 2. Idea Screening (filtering out weak ideas); 3. Concept Development & Testing (creating detailed product concepts and testing with consumers); 4. Marketing Strategy Development; 5. Business Analysis (evaluating sales, cost, and profit projections); 6. Product Development (building physical prototypes); 7. Test Marketing (testing in realistic market settings); and 8. Commercialization (full-scale rollout).',
              gradingPoints: [
                { concept: 'idea generation screening concept testing strategy development business analysis', weight: 0.5, aliases: ['first five npd stages', 'front end of innovation'] },
                { concept: 'product development prototyping test marketing commercialization rollout', weight: 0.5, aliases: ['latter npd stages', 'prototyping testing launching'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Psychological Pricing strategies: Reference Pricing, Odd-Even Pricing, and Price-Quality Signalling.',
              options: [],
              correctAnswer: 'Psychological pricing considers the psychological impact of prices rather than pure economics. Reference Pricing uses benchmark prices stored in consumer memory to make an offer seem like a discount. Odd-Even Pricing prices products just below a round number (e.g., ₦4,999 instead of ₦5,000) to convey a perception of significant savings. Price-Quality Signalling leverages the belief that higher price equates to superior quality, especially when consumers cannot assess technical attributes.',
              gradingPoints: [
                { concept: 'reference pricing uses memory comparison benchmarks to convey value', weight: 0.35, aliases: ['reference prices', 'internal reference anchors'] },
                { concept: 'odd even pricing pricing below round number to perceive bargains', weight: 0.35, aliases: ['odd pricing 99 endings', 'psychological discount perception'] },
                { concept: 'price quality signalling high price perceived as superior luxury quality', weight: 0.3, aliases: ['price as quality proxy', 'prestige pricing signal'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is a Product Line and what strategies are used for Product Line Stretching versus Product Line Filling?',
              options: [],
              correctAnswer: 'A product line is a group of closely related products that function similarly, are sold to the same customer groups, and fall within similar price ranges. Product Line Stretching lengthens the line beyond its current range: Downward stretch (adding lower-priced models to block competitors) or Upward stretch (adding premium models for prestige). Product Line Filling adds more items within the present range to plug gaps, satisfy distributors, and utilize excess manufacturing capacity.',
              gradingPoints: [
                { concept: 'product line group of closely related products targeting similar market', weight: 0.3, aliases: ['product line definition', 'closely related product group'] },
                { concept: 'line stretching expanding beyond range upward premium downward economy', weight: 0.35, aliases: ['upward downward stretching', 'lengthening beyond range'] },
                { concept: 'line filling adding items within existing range to plug gaps', weight: 0.35, aliases: ['filling product line', 'plugging internal range gaps'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Value-Based Pricing versus Cost-Plus (Cost-Based) Pricing.',
              options: [],
              correctAnswer: 'Cost-Plus Pricing calculates total production costs per unit and adds a standard markup margin to determine price (product-driven, often ignores customer demand and competitor alternatives). Value-Based Pricing determines customer perceived value of product benefits first, setting price to match that perceived value, and then designs costs backward to ensure profitability (customer-driven).',
              gradingPoints: [
                { concept: 'cost plus starts with costs adds markup product driven ignores demand', weight: 0.5, aliases: ['cost based markup', 'product driven cost plus'] },
                { concept: 'value based starts with customer perceived value designs costs backward customer driven', weight: 0.5, aliases: ['perceived value pricing', 'customer driven value pricing'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Brand Architecture and contrast Branded House versus House of Brands strategies.',
              options: [],
              correctAnswer: 'Brand Architecture is the organizational structure of an enterprise brand portfolio. A Branded House (Master Brand, e.g., Virgin, FedEx) uses a single overarching brand across all products and sub-categories; it maximizes brand equity leverage and lowers advertising costs, but a scandal in one sector tarnishes the entire enterprise. A House of Brands (e.g., Unilever, Procter & Gamble) manages individual, distinct brands that operate independently; it isolates brand risks and targets varied niches, but requires massive advertising expenditure for each separate brand.',
              gradingPoints: [
                { concept: 'branded house master brand single identity across all offerings virgin fedex', weight: 0.5, aliases: ['branded house master brand', 'monolithic brand architecture'] },
                { concept: 'house of brands individual independent brands unilever p&g isolated risks', weight: 0.5, aliases: ['house of brands standalone', 'portfolio of independent brand names'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Dynamic Pricing in digital markets and cite ethical concerns associated with personalized pricing.',
              options: [],
              correctAnswer: 'Dynamic pricing continuously adjusts prices in real time based on demand algorithms, inventory levels, competitor tracking, and customer behavioral browsing data. Ethical concerns arise from algorithmic price discrimination (charging wealthier or desperate consumers higher prices for essentials), lack of price transparency, and exploiting consumer urgency (e.g., surge pricing during natural emergencies).',
              gradingPoints: [
                { concept: 'continuous real time price adjustments using automated demand algorithms', weight: 0.5, aliases: ['dynamic algorithmic pricing', 'real time price fluctuation'] },
                { concept: 'ethical issues price discrimination transparency exploitation of urgent need', weight: 0.5, aliases: ['pricing ethics concerns', 'discrimination surge pricing exploitation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Boston Consulting Group (BCG) Growth-Share Matrix: Stars, Cash Cows, Question Marks, and Dogs.',
              options: [],
              correctAnswer: 'The BCG Matrix classifies strategic business units (SBUs) based on Market Growth Rate and Relative Market Share: Stars (High growth, High share; heavy investment needed to sustain leadership); Cash Cows (Low growth, High share; mature, generates abundant cash with minimal investment); Question Marks (High growth, Low share; requires heavy cash to build share or risk becoming dogs); and Dogs (Low growth, Low share; generates little profit, candidate for divestment).',
              gradingPoints: [
                { concept: 'market growth rate versus relative market share dimensions', weight: 0.3, aliases: ['bcg matrix axes', 'growth and market share grid'] },
                { concept: 'stars cash cows question marks dogs characteristics and cash flows', weight: 0.7, aliases: ['four bcg quadrants', 'stars cows question marks dogs'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Cannibalization in product line management and how can marketers minimize it?',
              options: [],
              correctAnswer: 'Cannibalization occurs when an enterprise new product takes sales and market share away from its own existing product line rather than capturing sales from competitors. Marketers minimize it by clearly differentiating target market segments, establishing distinct price-performance tiers, ensuring distinct value propositions, and targeting new customer segments previously unserved.',
              gradingPoints: [
                { concept: 'new product steals sales and profits from firm existing products', weight: 0.5, aliases: ['cannibalization definition', 'eating own product sales'] },
                { concept: 'minimized via clear segmentation distinct price tiers differentiated positioning', weight: 0.5, aliases: ['mitigating cannibalization', 'clear segmentation and distinct tiers'] },
              ],
            },
          ],
        },
        { code: 'MKT 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'MKT 401',
          title: 'Strategic Marketing Management & Global Marketing',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Porter Generic Strategies: Cost Leadership, Differentiation, and Focus within marketing contexts.',
              options: [],
              correctAnswer: 'In marketing, Cost Leadership aims to capture market share by offering the lowest prices enabled by scale efficiencies and lean logistics. Differentiation creates unique brand perceptions, premium features, and superior service that command price premiums. Focus concentrates marketing efforts on a narrow niche customer segment or geographic market, serving that specialized niche with tailored differentiation or tailored cost advantages.',
              gradingPoints: [
                { concept: 'cost leadership scale efficiencies lowest industry price', weight: 0.35, aliases: ['cost leadership strategy', 'lowest price market leader'] },
                { concept: 'differentiation unique brand features premium customer service', weight: 0.35, aliases: ['differentiation strategy', 'unique value proposition'] },
                { concept: 'focus narrow niche market specialized differentiation or cost focus', weight: 0.3, aliases: ['focus niche strategy', 'tailored niche marketing'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the Ansoff Product-Market Growth Matrix: Market Penetration, Market Development, Product Development, and Diversification.',
              options: [],
              correctAnswer: 'The Ansoff Matrix identifies four growth strategies: 1. Market Penetration (selling existing products in existing markets via promotions, aggressive pricing, or customer retention); 2. Market Development (taking existing products into new geographic or demographic markets); 3. Product Development (creating new products for existing markets); and 4. Diversification (introducing new products into completely new markets; highest risk strategy).',
              gradingPoints: [
                { concept: 'market penetration existing products existing markets market development existing products new markets', weight: 0.5, aliases: ['penetration and market development', 'existing products strategies'] },
                { concept: 'product development new products existing markets diversification new products new markets', weight: 0.5, aliases: ['product development and diversification', 'new products strategies'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Global Market Entry Modes: Exporting, Licensing/Franchising, Joint Ventures, and Wholly Owned Subsidiaries.',
              options: [],
              correctAnswer: 'Exporting involves manufacturing domestically and selling goods abroad (lowest financial risk and capital commitment, limited local control). Licensing/Franchising grants foreign entities rights to use intellectual property or business models for royalties (low capital, risk of creating competitors). Joint Ventures establish shared ownership and management with a local partner (shared risk, cultural insight, potential conflict). Wholly Owned Subsidiaries involve direct foreign investment establishing full local ownership (maximum control and profit retention, highest capital risk).',
              gradingPoints: [
                { concept: 'exporting low risk low capital limited market control', weight: 0.25, aliases: ['exporting entry mode', 'indirect direct exporting'] },
                { concept: 'licensing franchising royalty rights low capital risk of partner copying', weight: 0.25, aliases: ['licensing and franchising', 'intellectual property rights transfer'] },
                { concept: 'joint ventures shared ownership local insight potential partnership friction', weight: 0.25, aliases: ['joint venture alliances', 'shared capital local partner'] },
                { concept: 'wholly owned subsidiaries direct investment total control highest financial risk', weight: 0.25, aliases: ['foreign direct investment fdi', '100% owned subsidiaries'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Standardization (Global) and Adaptation (Localization) marketing strategies in international marketing.',
              options: [],
              correctAnswer: 'Standardization uses a uniform marketing mix (product, advertising, packaging) across all international countries, leveraging economies of scale and global brand consistency (e.g., iPhone). Adaptation customizes the marketing mix to accommodate local cultural values, consumer tastes, legal regulations, and economic realities of each foreign country (e.g., McDonald spicy menus in India), maximizing local market appeal at higher operating costs.',
              gradingPoints: [
                { concept: 'standardization uniform global marketing mix economies of scale brand consistency', weight: 0.5, aliases: ['global standardization', 'uniform worldwide mix'] },
                { concept: 'adaptation tailors marketing mix to local cultural regulatory economic differences', weight: 0.5, aliases: ['localization adaptation', 'customized regional marketing'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Customer Relationship Management (CRM) and how does it drive Customer Lifetime Value (CLV)?',
              options: [],
              correctAnswer: 'CRM is a strategic management philosophy and software platform that tracks, organizes, and manages all interactions with prospective and existing customers across their lifecycle. It drives CLV by analyzing purchasing patterns to deliver targeted cross-selling, automating customer support to resolve complaints rapidly, and personalizing loyalty rewards, thereby reducing churn and maximizing long-term cumulative revenue.',
              gradingPoints: [
                { concept: 'systematic tracking and management of customer lifecycle interactions', weight: 0.5, aliases: ['crm strategic definition', 'managing customer lifecycle'] },
                { concept: 'drives clv cross selling personalization retention churn reduction', weight: 0.5, aliases: ['clv enhancement mechanisms', 'retention loyalty cross sell'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Digital Marketing Attribution Models: First-Click, Last-Click, Linear, and Data-Driven Attribution.',
              options: [],
              correctAnswer: 'Attribution models assign financial credit to marketing touchpoints along a consumer conversion path. First-Click gives 100% credit to the initial touchpoint that created awareness. Last-Click gives 100% credit to the final touchpoint clicked immediately before purchase. Linear divides credit equally across all touchpoints in the journey. Data-Driven Attribution uses machine learning to analyze conversion data and assign dynamic proportional credit based on each touchpoint actual statistical influence.',
              gradingPoints: [
                { concept: 'first click initial touchpoint last click final conversion touchpoint', weight: 0.5, aliases: ['first touch vs last touch', 'single touchpoint attribution'] },
                { concept: 'linear equal distribution data driven machine learning algorithmic credit', weight: 0.5, aliases: ['multi touch attribution models', 'linear and algorithmic attribution'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Omnichannel Marketing and explain how unified brand experiences are achieved across online and offline touchpoints.',
              options: [],
              correctAnswer: 'Omnichannel marketing harmonizes all customer touchpoints (e-commerce, physical retail, mobile apps, social media, call centers) into a seamless, interconnected brand experience. Unified experiences are achieved by synchronizing master customer profiles, maintaining centralized real-time inventory visibility across warehouses and retail shelves, and enabling cross-channel fulfillment such as buy-online-pickup-in-store (BOPIS) and universal shopping carts.',
              gradingPoints: [
                { concept: 'harmonizes all physical and digital touchpoints into seamless unified journey', weight: 0.5, aliases: ['omnichannel marketing definition', 'unified customer experience'] },
                { concept: 'synchronized customer profiles unified inventory cross channel fulfillment bopis', weight: 0.5, aliases: ['omnichannel enablers', 'real time inventory cross channel fulfillment'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the concept of Sustainable / Green Marketing and the regulatory penalties associated with Greenwashing.',
              options: [],
              correctAnswer: 'Sustainable or Green Marketing is the development and promotion of products and practices that are environmentally safe, ethically sourced, and minimize carbon footprints. Greenwashing is the deceptive or unsubstantiated marketing practice of misleading consumers into believing a company or product is eco-friendly. Regulatory penalties include legal fines for false advertising, mandatory advertising retractions, and catastrophic brand reputational loss.',
              gradingPoints: [
                { concept: 'development and promotion of eco friendly ethically sourced products', weight: 0.4, aliases: ['green marketing definition', 'sustainable marketing practices'] },
                { concept: 'greenwashing deceptive eco claims leading to regulatory fines and brand loss', weight: 0.6, aliases: ['greenwashing definition and penalties', 'misleading environmental claims consequences'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is a Marketing Audit and what six major components does it examine?',
              options: [],
              correctAnswer: 'A Marketing Audit is a comprehensive, systematic, independent, and periodic examination of a company marketing environment, objectives, strategies, and activities to identify problem areas and opportunities. Its six components are: 1. Marketing Environment Audit; 2. Marketing Strategy Audit; 3. Marketing Organization Audit; 4. Marketing Systems Audit; 5. Marketing Productivity Audit; and 6. Marketing Function Audit.',
              gradingPoints: [
                { concept: 'systematic independent comprehensive periodic examination of marketing posture', weight: 0.4, aliases: ['marketing audit definition', 'strategic marketing health check'] },
                { concept: 'environment strategy organization systems productivity function six components', weight: 0.6, aliases: ['six audit components', 'marketing audit domains'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Viral Marketing and the core psychological triggers that drive Organic Brand Advocacy.',
              options: [],
              correctAnswer: 'Viral marketing utilizes social networks and digital word-of-mouth to achieve exponential message dissemination similar to a biological virus. Psychological triggers that drive organic brand advocacy include social currency (sharing to look knowledgeable or cool), high-arousal emotional connection (awe, humor, excitement), public visibility, practical value (useful life hacks), and compelling storytelling that embeds the brand naturally.',
              gradingPoints: [
                { concept: 'exponential digital word of mouth diffusion through social networks', weight: 0.4, aliases: ['viral marketing definition', 'exponential word of mouth'] },
                { concept: 'social currency high arousal emotion practical utility storytelling triggers', weight: 0.6, aliases: ['berger contagious triggers', 'social currency emotion practical value'] },
              ],
            },
          ],
        },
        { code: 'MKT 499', title: 'B.Sc. Final Year Project II', level: 400, semester: 'rain', questions: [] },
      ];
