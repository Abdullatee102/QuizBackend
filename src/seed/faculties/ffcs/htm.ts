// src/seed/faculties/ffcs/htm.ts
import type { SeedCourse } from '../../types.js';

export const htmCourses: SeedCourse[] = [
        // 100 Level
        {
          code: 'HTM 101',
          title: 'Introduction to Hospitality & Tourism Management',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What are the main sectors of the hospitality industry?', options: ['Accommodation, food and beverage, travel, and recreation', 'Mining, forestry, and construction', 'Heavy manufacturing and chemical refining', 'Banking and telecommunications only'], correctAnswer: 'Accommodation, food and beverage, travel, and recreation' },
            { type: 'cbt', question: 'What is ecotourism?', options: ['Mass urban clubbing', 'Responsible travel to natural areas that conserves the environment and improves local well-being', 'High-end luxury gambling trips', 'Business corporate conferences'], correctAnswer: 'Responsible travel to natural areas that conserves the environment and improves local well-being' },
            { type: 'cbt', question: 'What does RevPAR stand for in hotel financial metrics?', options: ['Revenue Per Available Room', 'Revenue Percentage Across Retail', 'Reservation Price Average Rate', 'Room Evaluation Protocol Audit'], correctAnswer: 'Revenue Per Available Room' },
            { type: 'cbt', question: 'What is an Inbound Tourist in international tourism statistics?', options: ['A non-resident traveling into a given country from abroad', 'A resident traveling within their own country', 'A citizen traveling abroad to another nation', 'An international airline pilot on duty'], correctAnswer: 'A non-resident traveling into a given country from abroad' },
            { type: 'cbt', question: 'What does Front of House (FOH) refer to in hotel and restaurant operations?', options: ['Areas where employees directly interact with guests (lobby, dining room, reception)', 'The kitchen cooking stoves and pantries', 'The underground boiler and electrical rooms', 'The accounting payroll back offices'], correctAnswer: 'Areas where employees directly interact with guests (lobby, dining room, reception)' },
            { type: 'cbt', question: 'What is the Multiplier Effect in tourism economics?', options: ['The phenomenon where tourism expenditures circulate through the local economy, generating indirect and induced income beyond initial spending', 'A doubling of hotel room rates on weekends', 'Increasing airline flight frequency by 2x', 'Multiplying restaurant menu prices by tax rates'], correctAnswer: 'The phenomenon where tourism expenditures circulate through the local economy, generating indirect and induced income beyond initial spending' },
            { type: 'cbt', question: 'Which United Nations agency is responsible for the promotion of responsible, sustainable tourism globally?', options: ['UN Tourism (formerly UNWTO)', 'UNESCO', 'UNICEF', 'UNHCR'], correctAnswer: 'UN Tourism (formerly UNWTO)' },
            { type: 'cbt', question: 'What is Heritage Tourism?', options: ['Traveling to experience historic sites, cultural monuments, folklore, and traditions of a region', 'Visiting shopping malls exclusively', 'Traveling for high-tech computer exhibitions', 'Taking domestic luxury cruises'], correctAnswer: 'Traveling to experience historic sites, cultural monuments, folklore, and traditions of a region' },
            { type: 'cbt', question: 'What is Domestic Tourism?', options: ['Residents of a country traveling only within their own national borders', 'Traveling to overseas continents', 'Business travel across international borders', 'Booking space tourism flights'], correctAnswer: 'Residents of a country traveling only within their own national borders' },
            { type: 'cbt', question: 'What distinguishes a Boutique Hotel from a standard chain commercial hotel?', options: ['A small, stylish, intimate hotel with unique customized decor and personalized hospitality', 'A massive 2,000-room skyscraper hotel', 'A highway roadside truck motel', 'A youth hostel with dormitory bunk beds'], correctAnswer: 'A small, stylish, intimate hotel with unique customized decor and personalized hospitality' },
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
            { type: 'cbt', question: 'What is a "Table d Hote" menu?', options: ['A multi-course meal offered at a single fixed complete price with limited choices per course', 'An all-you-can-eat dessert station', 'A fast food drive-through combo', 'A customized wedding cake menu'], correctAnswer: 'A multi-course meal offered at a single fixed complete price with limited choices per course' },
            { type: 'cbt', question: 'What is Gueridon Service in fine dining restaurants?', options: ['Food finished, carved, or flambéed on a movable trolley at the guest tableside', 'Self-service buffet service', 'Takeout counter service', 'Fast casual cafeteria line'], correctAnswer: 'Food finished, carved, or flambéed on a movable trolley at the guest tableside' },
            { type: 'cbt', question: 'What is Food Cost Percentage in commercial restaurant management?', options: ['(Cost of Food Consumed / Total Food Sales Revenue) × 100', 'Total food sales divided by total staff hours', 'The price paid for kitchen knives', 'The daily electricity bill of refrigerators'], correctAnswer: '(Cost of Food Consumed / Total Food Sales Revenue) × 100' },
            { type: 'cbt', question: 'What is American Service (Plated Service) in banquet dining?', options: ['Food portioned and artistically plated in the kitchen, then served to guests from the right', 'Guests serving themselves from central bowls', 'Carving whole meats at the table', 'Serving raw ingredients for guests to cook on hot stones'], correctAnswer: 'Food portioned and artistically plated in the kitchen, then served to guests from the right' },
            { type: 'cbt', question: 'What is Cover in restaurant table management?', options: ['A place setting at a table laid with cutlery, glassware, and linen for one dining guest', 'The tablecloth covering the table surface', 'The umbrella over outdoor patio tables', 'The chef uniform jacket'], correctAnswer: 'A place setting at a table laid with cutlery, glassware, and linen for one dining guest' },
            { type: 'cbt', question: 'What is Mise en Place in professional culinary kitchen operations?', options: ['Organizing, measuring, and preparing all ingredients and equipment before cooking begins', 'Washing dining room floors after closing', 'Setting dining room chairs in straight rows', 'Balancing the cash register ledger'], correctAnswer: 'Organizing, measuring, and preparing all ingredients and equipment before cooking begins' },
            { type: 'cbt', question: 'What is Sommelier in fine dining restaurant service?', options: ['A trained wine professional specializing in wine service, cellar management, and food-wine pairings', 'The executive pastry chef', 'The restaurant general manager', 'The dishwasher and sanitation technician'], correctAnswer: 'A trained wine professional specializing in wine service, cellar management, and food-wine pairings' },
            { type: 'cbt', question: 'What temperature zone is recognized as the "Food Temperature Danger Zone" where foodborne bacteria multiply rapidly?', options: ['Between 5°C and 60°C (41°F to 140°F)', 'Below 0°C (32°F)', 'Above 100°C (212°F)', 'Between -10°C and -5°C'], correctAnswer: 'Between 5°C and 60°C (41°F to 140°F)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'HTM 301',
          title: 'Hotel Front Office & Accommodation Management',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the Guest Cycle in hotel front office management through its four distinct stages.',
              options: [],
              correctAnswer: 'The Guest Cycle comprises four sequential stages: 1. Pre-Arrival (room reservation, processing special requests, securing credit card pre-authorization); 2. Arrival (greeting, registration, assigning rooms, key card issuance, establishing credit); 3. Occupancy (guest coordination, concierge service, billing room charges to folio, maintaining security); and 4. Departure (reconciling guest folios, settlement of account, collecting keys, arranging airport transfer, and initiating housekeeping turn-over).',
              gradingPoints: [
                { concept: 'pre arrival arrival occupancy departure four stages', weight: 0.6, aliases: ['four guest cycle stages', 'hotel guest cycle phases'] },
                { concept: 'operational front office responsibilities across each stage from reservation to settlement', weight: 0.4, aliases: ['guest cycle operations', 'reservation registration folio departure'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain key hotel operational metrics: Average Daily Rate (ADR), Occupancy Rate (OCC), and RevPAR, providing formulas.',
              options: [],
              correctAnswer: 'Key hotel metrics are: 1. Occupancy Rate (OCC) = (Total Rooms Sold / Total Available Rooms) × 100; measures asset utilization. 2. Average Daily Rate (ADR) = Total Room Revenue / Total Rooms Sold; measures average price realized per occupied room. 3. Revenue Per Available Room (RevPAR) = Total Room Revenue / Total Available Rooms (or ADR × Occupancy Rate); provides the ultimate benchmark of operational and pricing performance.',
              gradingPoints: [
                { concept: 'occupancy rate formula rooms sold over available rooms times 100', weight: 0.3, aliases: ['occupancy rate formula', 'occ formula rooms sold available'] },
                { concept: 'adr formula room revenue over rooms sold', weight: 0.3, aliases: ['adr formula', 'average daily rate formula'] },
                { concept: 'revpar formula room revenue over available rooms or adr times occupancy', weight: 0.4, aliases: ['revpar formula', 'revenue per available room formula'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the Night Audit function in hotel financial management.',
              options: [],
              correctAnswer: 'The Night Audit is an operational accounting review conducted nightly by the front office team. Key functions include: auditing and reconciling all daily departmental financial transactions (restaurant, spa, room service postings against room folios); rolling the hotel business day forward; balancing guest ledgers and city ledgers; posting room and tax charges automatically; generating daily manager operating reports; and monitoring room status discrepancies between front office and housekeeping.',
              gradingPoints: [
                { concept: 'nightly accounting review reconciling all departmental postings against guest folios', weight: 0.5, aliases: ['night audit definition', 'reconciling daily transactions'] },
                { concept: 'rolls business day balances ledgers posts room tax generates daily manager report', weight: 0.5, aliases: ['night audit functions', 'rolling the day posting room charges'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Property Management Systems (PMS) and their core operational module integrations.',
              options: [],
              correctAnswer: 'A Property Management System (PMS) is the centralized software application that manages all hotel operations. Core integrations include: Front Desk & Reservations module, Housekeeping room-status tracking, Point of Sale (POS) dining integrations, Central Reservation Systems (CRS) and Online Travel Agency (OTA) channel managers, Electronic Key Card encoders, and Back-Office Accounting ledgers.',
              gradingPoints: [
                { concept: 'centralized software application managing comprehensive hotel operations', weight: 0.4, aliases: ['pms definition', 'property management system'] },
                { concept: 'reservations housekeeping pos channel manager keycards accounting modules', weight: 0.6, aliases: ['pms module integrations', 'pos ota channel manager housekeeping integration'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Housekeeping Management room status codes and communication protocols with Front Desk.',
              options: [],
              correctAnswer: 'Housekeeping and Front Desk communicate room status via standardized PMS codes: Clean & Inspected (ready for guest check-in), Clean & Vacant (cleaned but pending supervisor inspection), Dirty & Vacant (departed guest, awaiting cleaning), Occupied & Dirty (stay-over guest requiring daily service), Out of Order (OOO: room undergoing mechanical maintenance, removed from inventory). Room Status Discrepancies (e.g., front desk shows occupied while housekeeping shows vacant "Sleeper") are investigated immediately to prevent fraud.',
              gradingPoints: [
                { concept: 'standard room status codes clean inspected dirty vacant occupied dirty ooo', weight: 0.5, aliases: ['room status codes', 'housekeeping codes'] },
                { concept: 'real time pms communication investigating status discrepancies sleeper skipper', weight: 0.5, aliases: ['status discrepancy reconciliation', 'sleeper skipper room discrepancies'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Yield Management in hotel revenue optimization and strategies for high-demand versus low-demand periods.',
              options: [],
              correctAnswer: 'Yield Management dynamically prices hotel rooms to maximize revenue based on anticipated demand and booking pace. During High-Demand periods (major conferences, festivals), hotels enforce Minimum Length of Stay (MLOS) restrictions, eliminate discounts, close lower-tier rate categories, and charge premium rates. During Low-Demand periods, hotels stimulate volume by packaging value-adds (free breakfast/spa vouchers), opening discounted OTA channels, and offering group corporate rates.',
              gradingPoints: [
                { concept: 'dynamic pricing strategy maximizing revenue based on anticipated demand cycles', weight: 0.4, aliases: ['yield management hotel', 'hotel revenue optimization'] },
                { concept: 'high demand mlos premium rates restrict discounts low demand packages value adds ota discounts', weight: 0.6, aliases: ['high vs low demand tactics', 'mlos vs value adding packages'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe hotel Overbooking strategies, calculating walk cost risks and no-show probabilities.',
              options: [],
              correctAnswer: 'Overbooking is the deliberate practice of confirming reservations for more rooms than the hotel physical capacity to compensate for anticipated guest cancellations, early departures, and no-shows. The hotel calculates the optimal overbooking level by balancing the marginal revenue of selling an extra room against the marginal cost of "Walking" a guest (arranging alternative accommodation at competitor hotel, paid transportation, complimentary meal, and goodwill compensation).',
              gradingPoints: [
                { concept: 'deliberate reservation of excess rooms to compensate for cancellations no shows', weight: 0.5, aliases: ['hotel overbooking definition', 'hedging against no shows'] },
                { concept: 'balances marginal room revenue against walk cost alternative hotel transit compensation', weight: 0.5, aliases: ['walking guest cost trade off', 'calculating walking costs and compensation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Hotel Security protocols: Key Card encryption, Emergency Evacuation, and Asset Protection.',
              options: [],
              correctAnswer: 'Hotel security encompasses guest safety and asset protection: RFID/smart keycards programmed with encrypted temporal timestamps that expire automatically at checkout, elevator access restricted by room keycard readers, closed-circuit television (CCTV) coverage of corridors and public perimeters, discrete emergency fire evacuation plans with illuminated exit signage, in-room digital electronic safes, and strict guest anonymity protocols prohibiting sharing room numbers verbally at check-in.',
              gradingPoints: [
                { concept: 'encrypted rfid keycards expiring at checkout elevator access control', weight: 0.4, aliases: ['keycard access control', 'rfid lock encryption'] },
                { concept: 'cctv fire evacuation plans in room safes guest anonymity protection protocols', weight: 0.6, aliases: ['safety and evacuation measures', 'in room safes and guest privacy'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Green Hotel initiatives and environmental sustainability certifications (e.g., LEED, Green Key).',
              options: [],
              correctAnswer: 'Green hotel initiatives minimize environmental footprints through: linen and towel reuse programs that reduce laundry water and detergent consumption, motion-sensor LED lighting and keycard energy management systems, low-flow aerated showerheads and dual-flush toilets, comprehensive composting of kitchen food waste, elimination of single-use plastic toiletry bottles, and attaining independent green certifications (LEED for sustainable construction, Green Key for environmental management).',
              gradingPoints: [
                { concept: 'practices reducing environmental footprint water energy waste consumption', weight: 0.4, aliases: ['green hotel definition', 'sustainable hotel initiatives'] },
                { concept: 'linen reuse energy keycards low flow plumbing composting leed green key certification', weight: 0.6, aliases: ['specific green practices', 'leed certification linen reuse waste reduction'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Service Recovery in hospitality management: the Service Recovery Paradox and the LAST model.',
              options: [],
              correctAnswer: 'The Service Recovery Paradox describes the situation where a customer who experiences a service failure, but has it resolved exceptionally well by staff, ends up with higher brand loyalty than a customer who experienced zero failures. The LAST model guides frontline recovery: Listen (actively listening to guest complaint without interruption), Apologize (sincerely acknowledging frustration), Solve (offering immediate corrective action or compensatory upgrade), and Thank (thanking guest for bringing issue to light).',
              gradingPoints: [
                { concept: 'service recovery paradox exceptional resolution creates higher loyalty than zero failure', weight: 0.5, aliases: ['service recovery paradox definition', 'higher loyalty after successful resolution'] },
                { concept: 'last model listen apologize solve thank framework', weight: 0.5, aliases: ['last recovery framework', 'listen apologize solve thank'] },
              ],
            },
          ],
        },
        { code: 'HTM 399', title: 'SIWES Industrial Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'HTM 401',
          title: 'Tourism Planning & Sustainable Development',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Butler Tourism Area Life Cycle (TALC) model through its six sequential stages.',
              options: [],
              correctAnswer: 'The TALC model charts destination evolution over time: 1. Exploration (small number of adventurous visitors, virgin natural environment, minimal facilities); 2. Involvement (local community provides basic facilities, advertising begins); 3. Development (mass tourism arrivals, outside corporate investment, rapid infrastructure construction); 4. Consolidation (growth slows, tourism dominates local economy, carrying capacity strained); 5. Stagnation (peak visitors, environmental degradation, loss of original appeal); leading to either 6. Decline (loss of market share to rivals) or Rejuvenation (reinvention via new attractions/ecotourism).',
              gradingPoints: [
                { concept: 'exploration involvement development consolidation stagnation decline rejuvenation stages', weight: 0.7, aliases: ['six butler talc stages', 'destination lifecycle stages'] },
                { concept: 'evolution from adventurous visitors to mass tourism to capacity strain and renewal', weight: 0.3, aliases: ['destination evolution narrative', 'mass tourism to rejuvenation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Environmental, Socio-Cultural, and Economic Carrying Capacity of tourism destinations.',
              options: [],
              correctAnswer: 'Carrying capacity is the maximum level of visitor use an area can accommodate without unacceptable degradation: 1. Environmental/Physical Carrying Capacity (the limit beyond which the physical natural ecosystem suffers irreversible biological damage or trail erosion); 2. Socio-Cultural Carrying Capacity (the threshold where tourism arrivals disrupt local resident cultural traditions, causing resentment and hostility, e.g., Doxey Irridex); and 3. Economic Carrying Capacity (the point where tourism crowding crowds out local industries or causes hyper-inflation).',
              gradingPoints: [
                { concept: 'environmental ecosystem damage flora fauna trail erosion limits', weight: 0.35, aliases: ['physical environmental capacity', 'ecological degradation threshold'] },
                { concept: 'socio cultural resident resentment disruption of cultural traditions', weight: 0.35, aliases: ['cultural carrying capacity', 'resident tolerance threshold doxey'] },
                { concept: 'economic displacement of local industries and price inflation threshold', weight: 0.3, aliases: ['economic carrying capacity', 'economic displacement limit'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Doxey Irridex (Irritation Index) measuring host community attitudes toward tourism growth.',
              options: [],
              correctAnswer: 'George Doxey Irridex models resident sentiment across four progressive stages as tourism expands: 1. Euphoria (initial enthusiasm, visitors welcomed with open arms, economic optimism); 2. Apathy (tourists taken for granted, contact becomes commercial and formal); 3. Irritation (residents become annoyed by overcrowding, traffic congestion, and price inflation); and 4. Antagonism (open hostility and resentment toward tourists, blame tourists for all social problems).',
              gradingPoints: [
                { concept: 'euphoria apathy irritation antagonism four progressive stages', weight: 0.7, aliases: ['four doxey stages', 'doxey irritation index'] },
                { concept: 'shifts from initial warm welcome to commercial apathy to open resident hostility', weight: 0.3, aliases: ['host community attitude shift', 'resident sentiment progression'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Community-Based Tourism (CBT) and how does it ensure equitable distribution of economic benefits?',
              options: [],
              correctAnswer: 'Community-Based Tourism (CBT) is tourism owned, managed, and driven by local community residents. It ensures equitable benefit distribution by keeping revenues directly within the community (eliminating external corporate leakages), empowering local democratic committees to allocate tourism profits into collective public goods (clinics, boreholes, schools), and offering visitors authentic cultural heritage experiences managed by indigenous guides.',
              gradingPoints: [
                { concept: 'tourism owned managed and operated directly by local community residents', weight: 0.5, aliases: ['cbt definition', 'community owned tourism'] },
                { concept: 'prevents revenue leakage funds collective public goods schools boreholes empowerment', weight: 0.5, aliases: ['equitable benefit distribution', 'retention of tourism revenue locally'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Economic Leakage in international tourism and contrast Internal versus External Leakage.',
              options: [],
              correctAnswer: 'Economic leakage occurs when tourism revenue generated in a destination country flows out of the local economy to foreign entities. Internal Leakage occurs within the destination when domestic hotels import foreign luxury food, alcohol, and equipment rather than buying locally. External Leakage occurs when tourists pay foreign-owned airlines, foreign tour operators, and multinational booking agencies in their home countries before ever arriving at the destination.',
              gradingPoints: [
                { concept: 'tourism revenue flowing out of host economy to foreign entities', weight: 0.4, aliases: ['economic leakage definition', 'loss of tourism expenditure'] },
                { concept: 'internal importing foreign foods goods locally external foreign airlines tour operators', weight: 0.6, aliases: ['internal vs external leakage', 'import leakage vs pre payment overseas'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Destination Management Organizations (DMOs) and their role in brand marketing and stakeholder coordination.',
              options: [],
              correctAnswer: 'A Destination Management Organization (DMO) is a coordinating entity (often a public-private partnership or national tourism board) responsible for the holistic management and strategic marketing of a destination. Key roles include: formulating long-term tourism master plans, spearheading unified destination brand advertising, harmonizing diverse private stakeholders (hotels, airlines, restaurants, attractions), and managing visitor information centers.',
              gradingPoints: [
                { concept: 'coordinating entity managing and promoting a destination holistically', weight: 0.4, aliases: ['dmo definition', 'destination management organization'] },
                { concept: 'branding marketing stakeholder harmonization master planning visitor services', weight: 0.6, aliases: ['dmo strategic functions', 'unified destination branding and coordination'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Ecotourism principles according to The International Ecotourism Society (TIES).',
              options: [],
              correctAnswer: 'TIES defines ecotourism as responsible travel to natural areas that conserves the environment, sustains the well-being of the local people, and involves interpretation and education. Core principles include: minimizing physical, behavioral, and psychological impacts; building environmental and cultural awareness and respect; providing direct financial benefits for ecological conservation; generating financial benefits for local people; and delivering memorable interpretive experiences to visitors.',
              gradingPoints: [
                { concept: 'responsible travel to natural areas conserving environment sustaining local well being', weight: 0.5, aliases: ['ties ecotourism definition', 'responsible nature based travel'] },
                { concept: 'minimizes impacts builds awareness direct conservation funds local community benefits', weight: 0.5, aliases: ['ties core principles', 'environmental education and local benefit'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Pro-Poor Tourism (PPT) and what specific interventions unlock tourism benefits for marginalized populations?',
              options: [],
              correctAnswer: 'Pro-Poor Tourism (PPT) is an approach to tourism development that results in net increased benefits for poor, marginalized communities. Interventions include: linking local smallholder farmers to hotel supply chains (local food sourcing), training youth as certified cultural guides and artisans, establishing designated craft markets, developing pedestrian walking tours in traditional villages, and building microcredit schemes for local homestays.',
              gradingPoints: [
                { concept: 'tourism development delivering net increased economic benefits to poor populations', weight: 0.5, aliases: ['pro poor tourism definition', 'ppt framework'] },
                { concept: 'local food sourcing artisan markets guide training homestay microcredit interventions', weight: 0.5, aliases: ['ppt intervention mechanisms', 'linking poor producers to hotel chains'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Cultural Commodification in tourism and its impact on indigenous rituals and authenticity.',
              options: [],
              correctAnswer: 'Cultural commodification occurs when indigenous cultural traditions, sacred ceremonies, religious dances, and authentic art forms are repackaged, shortened, and commercialized as theatrical entertainment for tourist consumption. While it generates revenue and revives dying arts, it risks eroding spiritual meaning, fostering staged authenticity ("staged culture"), and transforming sacred communal rituals into trivialized monetary performances.',
              gradingPoints: [
                { concept: 'repackaging indigenous sacred traditions dances into commercial tourist entertainment', weight: 0.5, aliases: ['cultural commodification definition', 'commercialization of rituals'] },
                { concept: 'erodes spiritual meaning creates staged authenticity trivializes cultural identity', weight: 0.5, aliases: ['staged authenticity impacts', 'loss of cultural depth and commercial distortion'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Crisis Management Planning for tourism destinations facing natural disasters or political instability.',
              options: [],
              correctAnswer: 'Crisis management planning ensures destinations can prepare for, respond to, and recover from unforeseen shocks (pandemics, terrorism, floods). It follows four phases: 1. Reduction (identifying vulnerabilities, hazard mapping); 2. Readiness (establishing emergency communication centers, multi-agency protocols); 3. Response (rapid guest evacuation, real-time crisis press briefings, transparent updates); and 4. Recovery (post-crisis marketing campaigns, discounted fam-trips for travel agents, rebuilding infrastructure).',
              gradingPoints: [
                { concept: 'four crisis phases reduction readiness response recovery 4rs', weight: 0.6, aliases: ['four crisis management phases', '4rs crisis framework'] },
                { concept: 'hazard mapping communication hubs evacuation transparent pr recovery marketing', weight: 0.4, aliases: ['crisis operational interventions', 'evacuation pr and recovery campaigns'] },
              ],
            },
          ],
        },

        // 500 Level
        {
          code: 'HTM 501',
          title: 'Strategic Hospitality Management & Resort Planning',
          level: 500,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the Resort Master Planning process from initial site analysis through spatial zoning and environmental impact.',
              options: [],
              correctAnswer: 'Resort Master Planning is the comprehensive spatial and architectural layout of a self-contained destination resort. The process involves: 1. Site Analysis (topography, hydrology, viewsheds, prevailing winds, solar orientation); 2. Market Feasibility (identifying target demographics and capacity); 3. Spatial Land-Use Zoning (segregating guest lodging, high-energy recreation, back-of-house logistics, and protected nature preserves); 4. Circulation Planning (separating guest pedestrian pathways from golf carts and service delivery vehicles); and 5. Environmental & Infrastructure Impact mitigation (water treatment, renewable power).',
              gradingPoints: [
                { concept: 'site analysis topography hydrology viewsheds environmental characteristics', weight: 0.35, aliases: ['site analysis phase', 'topography and climate analysis'] },
                { concept: 'spatial land use zoning segregating lodging recreation back of house logistics', weight: 0.35, aliases: ['land use zoning', 'functional spatial segregation'] },
                { concept: 'circulation planning separating guest paths from service vehicles utilities infrastructure', weight: 0.3, aliases: ['circulation and infrastructure', 'service vehicle vs guest circulation'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Hotel Management Contracts, Franchise Agreements, and Real Estate Investment Trusts (REITs).',
              options: [],
              correctAnswer: 'Under a Management Contract, the property owner retains physical real estate ownership but hires a hotel operator (e.g., Marriott) to run daily operations for a base fee (2-4% of revenue) plus incentive fees. In a Franchise Agreement, the owner operates the property independently while paying royalties to license a recognized brand name, central reservation system, and operating standards. A Hospitality REIT is an investment trust that owns the real estate assets and leases them to operators, distributing rental income dividends to shareholders.',
              gradingPoints: [
                { concept: 'management contract operator runs property for management base incentive fee', weight: 0.35, aliases: ['management contract definition', 'operator runs hotel for owner'] },
                { concept: 'franchise agreement owner operates property licensing brand and crs systems', weight: 0.35, aliases: ['franchise agreement definition', 'licensing brand name and standards'] },
                { concept: 'reit investment trust owning physical real estate leasing to hotel operators', weight: 0.3, aliases: ['hospitality reit definition', 'real estate investment trust'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Asset-Light Strategy adopted by multinational hotel corporations (e.g., Hilton, Accor, Marriott).',
              options: [],
              correctAnswer: 'An Asset-Light strategy involves selling off heavy physical hotel brick-and-mortar real estate assets to institutional investors while retaining long-term management and franchise contracts. This strategy removes real estate debt and depreciation from the corporate balance sheet, drastically lowers capital expenditure, accelerates global geographic expansion pace, and yields predictable, high-margin management fee revenues with high Return on Equity (ROE).',
              gradingPoints: [
                { concept: 'divesting brick and mortar real estate retaining management and franchise contracts', weight: 0.5, aliases: ['asset light strategy definition', 'divesting real estate ownership'] },
                { concept: 'reduces balance sheet debt capex accelerates rapid global expansion high roe', weight: 0.5, aliases: ['asset light benefits', 'capital efficiency and predictable fee revenue'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Total Revenue Management (TRM) in integrated resorts beyond traditional room yield management.',
              options: [],
              correctAnswer: 'Total Revenue Management (TRM) expands revenue optimization from rooms to every revenue-generating asset in a resort: Food and Beverage (RevPASH: Revenue Per Available Seat Hour), Spa treatments (RevPATH: Revenue Per Available Treatment Hour), Championship Golf courses, Conference event halls, and Casino gaming floors. It synchronizes dynamic pricing across all departments to optimize total guest spend across the entire stay.',
              gradingPoints: [
                { concept: 'optimizes all resort revenue streams beyond rooms f&b spa golf conferencing', weight: 0.5, aliases: ['total revenue management trm', 'non room revenue optimization'] },
                { concept: 'revpash f&b seats revpath spa hours synchronizing total guest lifetime spend', weight: 0.5, aliases: ['revpash and revpath metrics', 'optimizing total stay revenue'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Integrated Resort (IR) Casino and Entertainment planning and the mix of gaming versus non-gaming amenities.',
              options: [],
              correctAnswer: 'An Integrated Resort (IR) combines a casino with massive non-gaming infrastructure: five-star luxury hotels, convention centers (MICE), high-end retail shopping malls, celebrity chef restaurants, and entertainment arenas. Planning focuses on maximizing non-gaming revenue (often 50-70% of total profits in Macau/Singapore), designing intuitive guest flows that route visitors naturally through retail and dining precincts before entering the casino gaming floor.',
              gradingPoints: [
                { concept: 'combines gaming casino with massive non gaming mice retail entertainment', weight: 0.5, aliases: ['integrated resort ir definition', 'gaming and non gaming mix'] },
                { concept: 'circulates visitors through retail dining precincts maximizing non gaming revenue', weight: 0.5, aliases: ['spatial circulation and non gaming spend', 'mice and entertainment anchors'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Sustainable Resort Architecture: Biophilic Design, Passive Solar cooling, and Net-Zero Water systems.',
              options: [],
              correctAnswer: 'Sustainable resort architecture minimizes environmental impact while enhancing luxury experience: Biophilic Design integrates natural elements (living green walls, natural daylight, indoor water courtyards, local bamboo/timber materials); Passive Solar and ventilation design utilizes building orientation, deep overhangs, and natural cross-breezes to slash air conditioning energy; Net-Zero Water systems deploy rainwater harvesting, blackwater reed-bed biological filtration, and greywater recycling for landscape irrigation.',
              gradingPoints: [
                { concept: 'biophilic design integrates natural elements living walls daylight local materials', weight: 0.35, aliases: ['biophilic architecture', 'natural connection in design'] },
                { concept: 'passive cooling building orientation deep overhangs natural ventilation breezes', weight: 0.35, aliases: ['passive solar design', 'natural ventilation and shading'] },
                { concept: 'net zero water rainwater harvesting greywater recycling blackwater biological reedbeds', weight: 0.3, aliases: ['sustainable water systems', 'rainwater harvesting and water recycling'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Customer Lifetime Experience (CLE) in luxury hospitality and how do predictive analytics personalize service?',
              options: [],
              correctAnswer: 'Customer Lifetime Experience (CLE) manages the emotional and experiential journey of high-net-worth guests across repeated visits over decades. Predictive analytics mines historical PMS profiles and guest feedback to anticipate implicit preferences before the guest asks: pre-stocking favorite wine vintages, configuring preferred pillow firmness, setting room temperature to prior preferences, and tailoring personalized excursions, creating high emotional switching barriers.',
              gradingPoints: [
                { concept: 'manages emotional experiential journey of luxury guests across repeated decades', weight: 0.4, aliases: ['cle definition in luxury', 'long term luxury guest loyalty'] },
                { concept: 'predictive analytics anticipates implicit preferences pillows wine room temperature excursions', weight: 0.6, aliases: ['hyper personalization predictive analytics', 'pre stocking and tailoring guest stay'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Spa and Wellness Tourism programming in destination resort development.',
              options: [],
              correctAnswer: 'Wellness tourism programs travel associated with maintaining or enhancing personal well-being, health, and mindfulness. Destination resorts plan specialized facilities: hydrotherapy thermal pools, meditation pavilions, Ayurvedic treatment suites, and fitness centers; programming includes multi-day sleep therapy retreats, detox nutritional meal plans, stress-reduction coaching, and integrating indigenous botanical therapies into signature spa treatments.',
              gradingPoints: [
                { concept: 'travel focused on maintaining enhancing physical mental spiritual well being', weight: 0.4, aliases: ['wellness tourism definition', 'health and mindfulness travel'] },
                { concept: 'hydrotherapy meditation pavilions multi day sleep detox retreats indigenous botanical therapies', weight: 0.6, aliases: ['wellness programming and facilities', 'thermal pools detox retreats and spa design'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Crisis Leadership and Business Continuity Planning in resort operations during extreme weather events (Hurricanes, Typhoons).',
              options: [],
              correctAnswer: 'Resort crisis leadership establishes detailed command structures: emergency hurricane hardening procedures (storm shutters, backup diesel generators, 7-day emergency potable water and food stockpiles); guest communication protocols with designated multi-lingual briefing coordinators; structured shelter-in-place procedures versus pre-storm airport evacuations; and comprehensive post-disaster insurance claim documentation and rapid beach debris restoration.',
              gradingPoints: [
                { concept: 'storm hardening shutters emergency generators 7 day water food stockpiles', weight: 0.5, aliases: ['hurricane preparation protocols', 'stockpiles shutters emergency power'] },
                { concept: 'multilingual guest briefing shelter in place vs evacuation post disaster recovery', weight: 0.5, aliases: ['guest safety and evacuation leadership', 'post storm restoration and communication'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Over-Tourism at world heritage resort destinations and regulatory de-marketing strategies.',
              options: [],
              correctAnswer: 'Over-tourism occurs when visitor volumes exceed physical, ecological, or socio-cultural carrying capacities, degrading local quality of life and historical monuments (e.g., Venice, Machu Picchu). De-marketing and regulatory solutions include: instituting daily mandatory visitor entry caps with timed reservation slots, levying steep tourist entry taxes, prohibiting mega cruise ship dockings, banning new short-term vacation rental conversions (Airbnbs), and marketing alternative off-peak seasonal travel.',
              gradingPoints: [
                { concept: 'visitor numbers exceeding carrying capacity degrading monuments and resident life', weight: 0.4, aliases: ['over tourism definition', 'destination crowding impact'] },
                { concept: 'de marketing visitor caps timed slots tourist taxes cruise bans airbnb restrictions', weight: 0.6, aliases: ['de marketing and regulatory caps', 'timed entry quotas and tourist taxes'] },
              ],
            },
          ],
        },
        { code: 'HTM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ];
