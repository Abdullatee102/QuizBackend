// src/seed/faculties/fmgs/trm.ts
import type { SeedCourse } from '../../types.js';

export const trmCourses: SeedCourse[] = [
        // 100 Level
        {
          code: 'TRM 101',
          title: 'Introduction to Transport Systems',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What does transport management primarily involve?', options: ['Manufacturing goods', 'Planning, coordinating, and optimizing the movement of passengers and freight', 'Designing roads only', 'Vehicle engine assembly'], correctAnswer: 'Planning, coordinating, and optimizing the movement of passengers and freight' },
            { type: 'cbt', question: 'Which mode of transport is most cost-effective for moving high-volume, bulk commodities over long international distances?', options: ['Air freight', 'Maritime (Sea) transport', 'Road trucking', 'Pipeline transport'], correctAnswer: 'Maritime (Sea) transport' },
            { type: 'cbt', question: 'Which transport mode offers the highest flexibility and door-to-door accessibility?', options: ['Road Transport', 'Rail Transport', 'Maritime Transport', 'Air Transport'], correctAnswer: 'Road Transport' },
            { type: 'cbt', question: 'What is Pipeline transport primarily used to convey?', options: ['Solid bulk container freight', 'Fluids, crude oil, petroleum products, and natural gas', 'Perishable fruits and vegetables', 'Passengers and commuters'], correctAnswer: 'Fluids, crude oil, petroleum products, and natural gas' },
            { type: 'cbt', question: 'Which transport mode has the highest speed and fastest transit time for high-value, perishable cargo?', options: ['Air Transport', 'Rail Transport', 'Inland Waterway', 'Road Haulage'], correctAnswer: 'Air Transport' },
            { type: 'cbt', question: 'What is a Transport Terminal?', options: ['A facility where passengers and freight are assembled, transferred between modes, or dispatched (e.g., port, airport, rail station)', 'A computer screen inside a taxi', 'The final traffic light on a highway', 'A ticket barcode printer'], correctAnswer: 'A facility where passengers and freight are assembled, transferred between modes, or dispatched (e.g., port, airport, rail station)' },
            { type: 'cbt', question: 'What is Containerization in modern freight transport?', options: ['A system of intermodal freight transport using standardized shipping containers that can be transferred across ships, trains, and trucks without repacking', 'Packing items in small cardboard boxes', 'Loading coal manually onto trucks', 'Sealing food in tin cans'], correctAnswer: 'A system of intermodal freight transport using standardized shipping containers that can be transferred across ships, trains, and trucks without repacking' },
            { type: 'cbt', question: 'What does TEU stand for in container shipping capacity measurement?', options: ['Twenty-foot Equivalent Unit', 'Transport Energy Usage', 'Tonnage Export Union', 'Total Engine Uptime'], correctAnswer: 'Twenty-foot Equivalent Unit' },
            { type: 'cbt', question: 'What is Transport Demand characterized as in transport economics?', options: ['A Direct Demand for traveling enjoyment only', 'A Derived Demand arising from the need to access employment, goods, markets, and activities', 'An inelastic fixed government quota', 'A luxury demand for wealthy citizens only'], correctAnswer: 'A Derived Demand arising from the need to access employment, goods, markets, and activities' },
            { type: 'cbt', question: 'What does Intermodal Freight Transport mean?', options: ['Transporting cargo in a single intermodal container using multiple transport modes without handling freight during transfers', 'Using horses and carts on highways', 'Transporting freight by air exclusively', 'Walking with backpacks'], correctAnswer: 'Transporting cargo in a single intermodal container using multiple transport modes without handling freight during transfers' },
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
            { type: 'cbt', question: 'What does Third-Party Logistics (3PL) refer to in freight operations?', options: ['Outsourcing logistics, warehousing, and transportation functions to specialized external service providers', 'Building government railways', 'Purchasing fuel at third-party stations', 'Manufacturing raw plastic containers'], correctAnswer: 'Outsourcing logistics, warehousing, and transportation functions to specialized external service providers' },
            { type: 'cbt', question: 'What is Reverse Logistics?', options: ['Driving delivery vehicles in reverse gear', 'Managing the backward flow of products, packaging, and materials from consumers for returns, repairs, recycling, or disposal', 'Shipping freight exclusively to rural areas', 'Returning empty shipping containers to factory floors'], correctAnswer: 'Managing the backward flow of products, packaging, and materials from consumers for returns, repairs, recycling, or disposal' },
            { type: 'cbt', question: 'What does Lead Time represent in logistics management?', options: ['The total time elapsed from order placement until the goods are received and ready for use', 'The time spent driving on high-speed expressways', 'The battery life of GPS vehicle trackers', 'The working shift hours of truck drivers'], correctAnswer: 'The total time elapsed from order placement until the goods are received and ready for use' },
            { type: 'cbt', question: 'What is Cross-Docking in freight logistics warehousing?', options: ['Transferring incoming inbound shipments directly onto outbound trucks with minimal or zero intermediate storage time', 'Storing pallets in refrigerated rooms for six months', 'Parking delivery vans in cross formations', 'Inspecting damaged boxes manually'], correctAnswer: 'Transferring incoming inbound shipments directly onto outbound trucks with minimal or zero intermediate storage time' },
            { type: 'cbt', question: 'What does a Bill of Lading (BoL) represent in shipping?', options: ['A legally binding document issued by a carrier detailing goods shipped, serving as receipt of cargo, contract of carriage, and document of title', 'An invoice for ship fuel consumption', 'A captain sailing license', 'A customs clearance stamp on passports'], correctAnswer: 'A legally binding document issued by a carrier detailing goods shipped, serving as receipt of cargo, contract of carriage, and document of title' },
            { type: 'cbt', question: 'What are Incoterms in international trade transport?', options: ['Standardized three-letter trade terms defining obligations, costs, and risks between buyers and sellers in international goods carriage (e.g., FOB, CIF)', 'International customs tax percentages', 'Immigration visa categories for sailors', 'Maritime insurance premium rates'], correctAnswer: 'Standardized three-letter trade terms defining obligations, costs, and risks between buyers and sellers in international goods carriage (e.g., FOB, CIF)' },
            { type: 'cbt', question: 'In Incoterms, what does CIF stand for?', options: ['Cost, Insurance, and Freight', 'Cargo Inspection Fee', 'Container Inbound Fleet', 'Commercial Invoice Filing'], correctAnswer: 'Cost, Insurance, and Freight' },
            { type: 'cbt', question: 'What is Safety Stock (Buffer Stock) in inventory logistics?', options: ['Extra inventory held to mitigate risk of stockouts caused by demand surges or delivery lead-time delays', 'Damaged items set aside for disposal', 'Hazardous chemicals stored in locked cages', 'Equipment used by safety officers'], correctAnswer: 'Extra inventory held to mitigate risk of stockouts caused by demand surges or delivery lead-time delays' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'TRM 301',
          title: 'Transport Economics & Infrastructure Planning',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the concept of Transport Demand as a Derived Demand and discuss factors determining demand elasticity.',
              options: [],
              correctAnswer: 'Transport demand is a derived demand because passenger and freight transport is rarely undertaken for its own sake, but rather as an intermediate input to satisfy fundamental socio-economic desires (e.g., traveling to workplace, shipping agricultural produce to urban markets). Factors determining demand elasticity include availability of alternative transport modes, trip urgency, proportion of transport cost in final product value, and income levels.',
              gradingPoints: [
                { concept: 'derived demand arises as intermediate input to satisfy socio economic activities', weight: 0.5, aliases: ['derived demand concept', 'transportation not consumed for own sake'] },
                { concept: 'elasticity determined by modal substitutes urgency cost proportion income', weight: 0.5, aliases: ['factors affecting transport elasticity', 'availability of substitutes and trip necessity'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Cost-Benefit Analysis (CBA) in public transport infrastructure planning, including tangible and intangible externalities.',
              options: [],
              correctAnswer: 'Cost-Benefit Analysis (CBA) evaluates whether the total socio-economic benefits of a public infrastructure project (e.g., new expressway or railway line) exceed its lifetime costs. Costs include capital construction, land acquisition, and ongoing maintenance. Benefits include travel time savings, reduced vehicle operating costs (VOC), and accident reductions. Externalities evaluated include intangible environmental emissions, noise pollution, and regional economic stimulation.',
              gradingPoints: [
                { concept: 'evaluates total socio economic benefits against lifetime project costs', weight: 0.4, aliases: ['cba definition', 'public investment appraisal'] },
                { concept: 'benefits travel time savings voc reduction accident decrease externalities emissions noise', weight: 0.6, aliases: ['travel time savings and externalities', 'tangible vs intangible benefits'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Congestion Pricing (Road Pricing) and explain its theoretical economic justification using Marginal Social Cost.',
              options: [],
              correctAnswer: 'Congestion pricing charges road users a fee during peak hours on congested highway corridors. In transport economics, an additional driver considers only their Private Marginal Cost (own travel time and fuel), ignoring the External Marginal Cost (delay imposed on all other drivers). Congestion pricing bridges this gap by internalizing the external social cost, incentivizing off-peak travel, carpooling, or public transit use.',
              gradingPoints: [
                { concept: 'charges peak hour fee to internalize negative externalities of traffic delay', weight: 0.5, aliases: ['congestion pricing mechanism', 'road user charging'] },
                { concept: 'bridges gap between marginal private cost and marginal social cost pigouvian tax', weight: 0.5, aliases: ['marginal social cost justification', 'internalizing external congestion costs'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Four-Step Travel Demand Forecasting Model: Trip Generation, Trip Distribution, Mode Choice, and Traffic Assignment.',
              options: [],
              correctAnswer: 'The traditional urban transportation planning four-step model consists of: 1. Trip Generation (calculates total trips produced by or attracted to each traffic analysis zone based on land use and demographics); 2. Trip Distribution (matches trip origins to destinations using the Gravity Model); 3. Mode Choice (calculates proportions of trips using car, bus, rail using logit utility models); and 4. Traffic Assignment (routes trips onto specific roadway networks using Wardrop equilibrium).',
              gradingPoints: [
                { concept: 'generation distribution mode choice assignment four steps', weight: 0.6, aliases: ['four step transport model', 'urban travel forecasting steps'] },
                { concept: 'operational models gravity model discrete choice logit traffic network equilibrium', weight: 0.4, aliases: ['gravity and logit models', 'trip distribution and modal split mechanics'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Infrastructure Fixed Costs and Vehicle Operational Variable Costs in transport operations.',
              options: [],
              correctAnswer: 'Infrastructure Fixed Costs are long-term capital investments that do not vary with short-term traffic volume, such as rights-of-way, rail tracks, highway bridges, signaling systems, and harbor docks. Vehicle Operational Variable Costs vary directly with transport output (kilometers driven or ton-miles), such as fuel consumption, tire wear, driver hourly wages, tolls, and routine vehicle servicing.',
              gradingPoints: [
                { concept: 'infrastructure fixed costs rights of way tracks docks capital overhead', weight: 0.5, aliases: ['fixed infrastructure costs', 'capital terminal and track costs'] },
                { concept: 'operational variable costs fuel tires wages maintenance varying with distance', weight: 0.5, aliases: ['variable vehicle costs', 'operating costs per kilometer'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Economies of Scale, Economies of Density, and Economies of Scope in transport network economics.',
              options: [],
              correctAnswer: 'Economies of Scale occur when unit transport cost declines as total firm capacity/fleet size expands. Economies of Density occur when unit cost declines as traffic volume increases over a fixed geographic network (higher load factors and vehicle utilization). Economies of Scope occur when unit cost declines by operating complementary passenger and cargo services across the same shared transport network.',
              gradingPoints: [
                { concept: 'economies of scale unit cost falls as total fleet capacity expands', weight: 0.35, aliases: ['scale economies', 'lower unit cost with fleet expansion'] },
                { concept: 'economies of density unit cost falls with higher traffic volume over fixed route', weight: 0.35, aliases: ['density economies', 'load factor utilization over fixed network'] },
                { concept: 'economies of scope cost advantage from shared multi service operations', weight: 0.3, aliases: ['scope economies', 'joint production advantages'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Public-Private Partnerships (PPP) in transport infrastructure, contrasting BOT and BOOT models.',
              options: [],
              correctAnswer: 'A PPP is a long-term contractual arrangement between a government agency and private sector consortium to finance, construct, and operate public transport assets. In Build-Operate-Transfer (BOT), the private entity finances and builds the asset, operates it for a concession period to recoup capital and profit via user tolls, and transfers ownership to the government. In Build-Own-Operate-Transfer (BOOT), the private entity retains legal ownership of the asset throughout the concession period before transferring it.',
              gradingPoints: [
                { concept: 'long term contract between public agency and private consortium financing infrastructure', weight: 0.4, aliases: ['ppp definition', 'public private partnership'] },
                { concept: 'bot operates during concession transfers boot owns during concession then transfers', weight: 0.6, aliases: ['bot vs boot concession models', 'build operate transfer mechanics'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Transit-Oriented Development (TOD) and how does it integrate urban land-use with mass transit networks?',
              options: [],
              correctAnswer: 'Transit-Oriented Development (TOD) is an urban planning strategy that creates high-density, mixed-use commercial and residential communities within easy walking distance (typically 500-800 meters) of high-capacity mass transit hubs (rail or BRT). It integrates land use and transport by reducing private automobile dependence, boosting public transit ridership, reducing carbon emissions, and creating vibrant pedestrian streetscapes.',
              gradingPoints: [
                { concept: 'high density mixed use development within walking distance of mass transit stations', weight: 0.5, aliases: ['tod definition', 'transit oriented urban planning'] },
                { concept: 'reduces car dependency boosts ridership lowers emissions pedestrian vitality', weight: 0.5, aliases: ['tod benefits', 'integrating land use and mass transit'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Peak-Load Pricing in public transportation and how it manages commuter crowding.',
              options: [],
              correctAnswer: 'Peak-load pricing charges higher transit fares during peak morning and evening rush hours when demand is inelastic and capacity is strained, and discounted fares during off-peak hours. It manages crowding by flattening the demand curve: incentivizing discretionary travelers to shift trips to off-peak periods, encouraging staggered workplace hours, and generating revenue to cover high peak-period rolling stock capacity costs.',
              gradingPoints: [
                { concept: 'higher fares during rush hours discounted fares off peak', weight: 0.5, aliases: ['peak load pricing', 'variable fare timing'] },
                { concept: 'flattens demand curve shifts discretionary travel funds peak capacity overhead', weight: 0.5, aliases: ['manages crowding', 'demand smoothing and capacity recovery'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Environmental Impact Assessment (EIA) requirements for major highway and airport transport projects.',
              options: [],
              correctAnswer: 'An EIA is a formal statutory study that evaluates the prospective environmental and social impacts of a proposed transport project before approval. It examines air pollutant emissions (NOx, PM2.5), noise contours affecting communities, wetland degradation and ecological habitat fragmentation, involuntary resettlement of residents, and mandates documented Environmental Management Plans (EMP) for mitigation.',
              gradingPoints: [
                { concept: 'statutory study assessing environmental social impacts before project approval', weight: 0.4, aliases: ['eia definition in transport', 'environmental impact assessment'] },
                { concept: 'air pollution noise contours habitat fragmentation resettlement mitigation plan emp', weight: 0.6, aliases: ['eia evaluation domains', 'emissions noise ecology and resettlement'] },
              ],
            },
          ],
        },
        { code: 'TRM 399', title: 'SIWES Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'TRM 401',
          title: 'Fleet Management & Aviation Operations',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the core functions of Fleet Management in commercial transport operations.',
              options: [],
              correctAnswer: 'Fleet management oversees commercial vehicles throughout their operational lifecycle: vehicle procurement and financing, predictive preventative maintenance scheduling, telematics GPS route tracking, fuel consumption monitoring, driver safety training and compliance management, insurance and accident claims handling, and residual asset disposal / remarketing.',
              gradingPoints: [
                { concept: 'procurement maintenance telematics tracking fuel management safety disposal', weight: 0.7, aliases: ['fleet management functions', 'vehicle lifecycle management'] },
                { concept: 'minimizes operational costs maximizes fleet availability and safety compliance', weight: 0.3, aliases: ['fleet management objectives', 'cost reduction and uptime'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the role of Vehicle Telematics and GPS tracking in real-time fleet operations.',
              options: [],
              correctAnswer: 'Telematics integrates telecommunications and vehicular informatics, using onboard GPS and OBD diagnostic sensors to transmit live data via cellular networks to fleet headquarters. It tracks live geographic location, monitors driver behavior (harsh braking, rapid acceleration, idling, speeding), diagnoses engine trouble codes in real time, automates geofence boundary alerts, and optimizes dispatch routing.',
              gradingPoints: [
                { concept: 'integrates telecommunications gps obd sensors transmitting live telemetry', weight: 0.5, aliases: ['telematics definition', 'gps tracking telemetry'] },
                { concept: 'tracks location monitors driver safety harsh braking engine diagnostics geofencing', weight: 0.5, aliases: ['telematics capabilities', 'safety diagnostics and geofencing'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Preventative Maintenance, Predictive Maintenance, and Corrective Maintenance in fleet engineering.',
              options: [],
              correctAnswer: 'Preventative maintenance performs scheduled inspections and part replacements at fixed intervals (e.g., every 10,000 km or 3 months) to prevent breakdowns. Predictive maintenance uses IoT sensor telemetry (oil viscosity sensors, vibration analysis, temperature monitors) to service components right before failure occurs, maximizing part lifespan. Corrective maintenance repairs components only after an unexpected breakdown occurs (highest operational cost and downtime).',
              gradingPoints: [
                { concept: 'preventative scheduled calendar distance intervals', weight: 0.35, aliases: ['scheduled preventative maintenance', 'routine interval servicing'] },
                { concept: 'predictive iot condition monitoring servicing just before failure', weight: 0.35, aliases: ['predictive condition based maintenance', 'telematics sensor servicing'] },
                { concept: 'corrective repairing after unexpected breakdown highest downtime', weight: 0.3, aliases: ['corrective run to failure', 'emergency breakdown repairs'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Hub-and-Spoke Network Architecture versus Point-to-Point Architecture in commercial airline operations.',
              options: [],
              correctAnswer: 'Hub-and-Spoke routes flights from outlying airports (spokes) into a central hub airport where passengers and baggage connect to flights to other spokes. It maximizes passenger load factors, connects thousands of city pairs with fewer aircraft, but causes hub congestion and vulnerability to cascading delays. Point-to-Point flies directly between destination pairs without hub stops (popular with low-cost carriers like Ryanair), reducing travel time and connection lost baggage, but requires sufficient passenger volume on every direct route.',
              gradingPoints: [
                { concept: 'hub and spoke routes into central hub for connections higher network connectivity', weight: 0.5, aliases: ['hub and spoke model', 'connecting hub network'] },
                { concept: 'point to point direct flights lower travel times requires high route density', weight: 0.5, aliases: ['point to point direct model', 'direct low cost carrier routing'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Airline Revenue Management (Yield Management) and how dynamic pricing and overbooking maximize flight profitability.',
              options: [],
              correctAnswer: 'Revenue management is the practice of selling the right seat to the right customer at the right time for the right price. Because airline seats are perishable assets (worth zero once the cabin door shuts), airlines use statistical yield models to dynamically adjust fare classes based on booking pace and customer price elasticity. Overbooking intentionally sells more tickets than physical seats to compensate for statistical passenger no-show and cancellation rates.',
              gradingPoints: [
                { concept: 'yield management optimizes revenue for perishable airline seat capacity', weight: 0.4, aliases: ['yield management definition', 'airline revenue management'] },
                { concept: 'dynamic fare class adjustments and statistical overbooking for no shows', weight: 0.6, aliases: ['overbooking and dynamic pricing', 'compensating for passenger no shows'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Airport Airside versus Landside operations and give examples of facilities in each zone.',
              options: [],
              correctAnswer: 'Airside encompasses airport areas beyond security checkpoints directly accessible by aircraft: runways, taxiways, aprons/ramps, aircraft hangars, air traffic control towers, and boarding gates. Landside encompasses airport public zones accessible prior to security screening: passenger check-in halls, ticketing counters, baggage drop, parking garages, car rental facilities, and ground transport interchanges.',
              gradingPoints: [
                { concept: 'airside restricted aircraft zones runways taxiways aprons hangars gates', weight: 0.5, aliases: ['airside definition and facilities', 'runway and apron operations'] },
                { concept: 'landside public passenger zones check in ticketing parking ground transport', weight: 0.5, aliases: ['landside definition and facilities', 'passenger terminal check in landside'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Air Traffic Management (ATM) and what three components compose it: ATS, ATFM, and ASM?',
              options: [],
              correctAnswer: 'Air Traffic Management (ATM) is the dynamic, integrated management of air traffic and airspace to ensure safe, economical, and efficient flight operations. Its three components are: 1. Air Traffic Services (ATS: air traffic control towers, radar separation, flight information, and alerting services); 2. Air Traffic Flow Management (ATFM: balancing traffic demand with airspace capacity to prevent airport congestion); and 3. Airspace Management (ASM: allocating airspace dynamically between civil and military users).',
              gradingPoints: [
                { concept: 'dynamic integrated management of air traffic and airspace safety efficiency', weight: 0.4, aliases: ['atm definition', 'air traffic management'] },
                { concept: 'air traffic services ats flow management atfm airspace management asm', weight: 0.6, aliases: ['three atm components', 'ats atfm asm definitions'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe aviation safety governance according to ICAO (International Civil Aviation Organization) Annexes and SMS (Safety Management Systems).',
              options: [],
              correctAnswer: 'ICAO establishes global Standards and Recommended Practices (SARPs) codified across 19 Annexes (e.g., Annex 13: Aircraft Accident Investigation; Annex 19: Safety Management). A Safety Management System (SMS) is an organized framework mandated by ICAO for airlines and airports to manage safety risks systematically, comprising Safety Policy and Objectives, Safety Risk Management (hazard identification), Safety Assurance (continuous safety monitoring), and Safety Promotion.',
              gradingPoints: [
                { concept: 'icao establishes global sarps standards across annexes accident investigation safety', weight: 0.4, aliases: ['icao sarps annexes', 'international aviation standards'] },
                { concept: 'sms four pillars policy risk management assurance promotion', weight: 0.6, aliases: ['safety management system sms', 'four pillars of aviation sms'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Cold Chain air cargo logistics for pharmaceuticals and perishable commodities.',
              options: [],
              correctAnswer: 'Cold Chain air cargo utilizes specialized temperature-controlled active containers (with battery-powered refrigeration units) and passive insulated packaging with phase-change materials to maintain pharmaceutical products (vaccines, biologics) within strict thermal bands (e.g., 2°C to 8°C or -20°C). Air terminals deploy temperature-monitored tarmac dollys and refrigerated cool-rooms (certified under IATA CEIV Pharma) to prevent excursions during aircraft loading.',
              gradingPoints: [
                { concept: 'maintains strict thermal bands for vaccines pharmaceuticals during flight', weight: 0.5, aliases: ['cold chain air cargo', 'temperature controlled pharmaceutical flight'] },
                { concept: 'active containers passive dry ice tarmac transfer cool rooms iata ceiv pharma', weight: 0.5, aliases: ['iata ceiv pharma cooling technologies', 'temperature monitored ramp transfer'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe sustainable aviation fuels (SAF) and airline carbon offsetting initiatives (CORSIA).',
              options: [],
              correctAnswer: 'Sustainable Aviation Fuels (SAF) are drop-in jet fuel replacements produced from non-fossil biological or synthetic feedstocks (used cooking oil, agricultural residues, captured carbon) that reduce lifecycle CO2 emissions by up to 80% without requiring engine modifications. CORSIA (Carbon Offsetting and Reduction Scheme for International Aviation) is an ICAO global market-based measure requiring airlines to purchase certified carbon offset credits for emissions exceeding a baseline.',
              gradingPoints: [
                { concept: 'saf drop in bio synthetic fuel reducing lifecycle carbon by up to 80 percent', weight: 0.5, aliases: ['sustainable aviation fuels saf', 'biojet drop in fuels'] },
                { concept: 'corsia icao market based measure purchasing certified carbon offsets', weight: 0.5, aliases: ['corsia offsetting scheme', 'icao carbon reduction framework'] },
              ],
            },
          ],
        },

        // 500 Level
        {
          code: 'TRM 501',
          title: 'Maritime Transport & International Logistics',
          level: 500,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the difference between Liner Shipping and Tramp Shipping in maritime freight operations.',
              options: [],
              correctAnswer: 'Liner shipping operates container and general cargo vessels on fixed, published schedules along set port rotations, charging standardized freight tariffs published in carrier books (like an ocean bus service). Tramp shipping operates bulk carriers and tankers on customized charter contracts, following no fixed schedule or set route, carrying full ship-loads of dry or liquid bulk commodities (grain, oil, iron ore) wherever cargo owners charter them (like an ocean taxi).',
              gradingPoints: [
                { concept: 'liner fixed published schedules set port rotations containerized cargo', weight: 0.5, aliases: ['liner shipping definition', 'scheduled container services'] },
                { concept: 'tramp chartered voyages on demand bulk cargo no fixed schedule', weight: 0.5, aliases: ['tramp shipping definition', 'charter bulk operations'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the three primary types of Charter Parties in tramp shipping: Voyage Charter, Time Charter, and Bareboat (Demise) Charter.',
              options: [],
              correctAnswer: 'In a Voyage Charter, the charterer hires the vessel for a single specific voyage between designated ports; the shipowner pays for fuel (bunkers), crew, and port fees. In a Time Charter, the charterer hires the vessel for a fixed time duration (e.g., 6 months); the owner provides ship and crew, while the charterer directs voyages and pays for fuel, port dues, and canal fees. In a Bareboat Charter, the charterer hires the vessel hull alone without crew or provisions, assuming total operational and financial control.',
              gradingPoints: [
                { concept: 'voyage charter single trip owner pays fuel crew port fees', weight: 0.35, aliases: ['voyage charter contract', 'single voyage terms'] },
                { concept: 'time charter fixed duration charterer pays fuel port fees owner provides crew', weight: 0.35, aliases: ['time charter contract', 'duration hire operational expenses'] },
                { concept: 'bareboat demise charter ship hull alone charterer provides crew total control', weight: 0.3, aliases: ['bareboat charter demise', 'bare hull hire without crew'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Container Terminal operations and the role of Ship-to-Shore (STS) Gantry Cranes and Automated Guided Vehicles (AGVs).',
              options: [],
              correctAnswer: 'A modern container terminal manages the high-speed transfer of containers between ocean vessels and landside transport (rail and trucking). Ship-to-Shore (STS) gantry cranes straddle container vessels at berth to lift containers on and off vessel cell guides at rates exceeding 30 moves per hour. AGVs or terminal tractors transport containers between the berth apron and the automated container yard stacks, where Rubber-Tired Gantry (RTG) cranes stack and sort containers.',
              gradingPoints: [
                { concept: 'terminal manages rapid transfer between ocean vessels and inland rail truck', weight: 0.4, aliases: ['container terminal role', 'quayside to yard transfer'] },
                { concept: 'sts gantry cranes lift from ship agvs transport to yard rtg stack containers', weight: 0.6, aliases: ['sts cranes agvs rtg stacks', 'quayside crane and yard automation'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Cabotage Law and explain the objectives of the Nigerian Cabotage Act (Coastal and Inland Shipping Act 2003).',
              options: [],
              correctAnswer: 'Cabotage law restricts the domestic coastal trade and shipping within a nation territorial waters to vessels registered, built, owned, and crewed by citizens of that nation. The Nigerian Coastal and Inland Shipping (Cabotage) Act 2003 aims to restrict domestic coastal shipping to Nigerian-flagged vessels built in Nigeria, owned by Nigerian citizens, and crewed by Nigerian seafarers, promoting domestic indigenous fleet ownership and maritime employment.',
              gradingPoints: [
                { concept: 'restricts domestic coastal trade to nationally owned crewed registered vessels', weight: 0.5, aliases: ['cabotage law definition', 'coastal shipping restrictions'] },
                { concept: 'nigerian act four pillars built owned registered crewed by nigerians', weight: 0.5, aliases: ['nigerian cabotage act 2003', 'indigenous maritime capacity development'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Maritime Conventions governed by IMO: SOLAS, MARPOL, and STCW.',
              options: [],
              correctAnswer: 'The International Maritime Organization (IMO) governs international maritime safety: 1. SOLAS (Safety of Life at Sea: mandates ship construction standards, fire safety, lifesaving equipment, and emergency communications); 2. MARPOL (International Convention for the Prevention of Pollution from Ships: regulates discharge of oil, noxious chemicals, sewage, garbage, and atmospheric emissions); and 3. STCW (Standards of Training, Certification and Watchkeeping: sets qualification benchmarks for seafarers).',
              gradingPoints: [
                { concept: 'solas safety of life at sea vessel construction lifesaving emergency equipment', weight: 0.35, aliases: ['solas convention', 'shipboard safety and construction'] },
                { concept: 'marpol prevention of maritime pollution oil sewage garbage emissions', weight: 0.35, aliases: ['marpol convention', 'marine environmental protection'] },
                { concept: 'stcw standards of training certification watchkeeping seafarer competency', weight: 0.3, aliases: ['stcw convention', 'seafarer training and certification'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Flag of Convenience (Open Registry) shipping versus National (Closed) Registry.',
              options: [],
              correctAnswer: 'A National Registry requires vessels to be owned by domestic citizens and crewed by national sailors, strictly subject to national labor and tax laws. A Flag of Convenience (FOC) or Open Registry (e.g., Panama, Liberia, Marshall Islands) registers ships owned by foreign shipowners with minimal residency requirements, offering low corporate taxes, light regulatory inspections, and freedom to hire inexpensive multinational crews.',
              gradingPoints: [
                { concept: 'national closed registry strict ownership domestic labor and tax enforcement', weight: 0.5, aliases: ['national registry', 'closed flag state rules'] },
                { concept: 'flag of convenience open registry low taxes foreign ownership flexible multinational crew', weight: 0.5, aliases: ['foc open registry', 'panama liberia tax and crew benefits'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the ISPS Code (International Ship and Port Facility Security Code) and its three security levels.',
              options: [],
              correctAnswer: 'The ISPS Code is a comprehensive mandatory maritime security framework established under SOLAS Chapter XI-2 to detect and deter maritime terrorism, piracy, and smuggling. It defines three security levels: Security Level 1 (Normal: minimum protective security measures maintained at all times); Security Level 2 (Heightened: additional protective measures implemented during heightened risk of incident); and Security Level 3 (Exceptional: specific protective measures for the duration when an incident is probable or imminent).',
              gradingPoints: [
                { concept: 'mandatory framework under solas detecting deterring terrorism piracy smuggling', weight: 0.4, aliases: ['isps code purpose', 'maritime security governance'] },
                { concept: 'security level 1 normal level 2 heightened level 3 exceptional imminent', weight: 0.6, aliases: ['three isps security levels', 'normal heightened exceptional levels'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Port Congestion, its economic causes in developing nations, and how Inland Dry Ports (ICDs) alleviate it.',
              options: [],
              correctAnswer: 'Port congestion occurs when vessel arrivals exceed berth throughput, causing ships to anchor offshore for weeks and incurring massive demurrage charges. In developing nations, causes include poor landside multimodal evacuation roads, manual customs inspection delays, and lack of port yard cranes. Inland Container Depots (ICDs) / Dry Ports alleviate congestion by acting as inland sea-ports, moving bonded containers immediately inland by rail for customs clearance away from congested coastal docks.',
              gradingPoints: [
                { concept: 'causes vessel queues offshore demurrage inadequate roads manual customs yard bottlenecks', weight: 0.5, aliases: ['causes of port congestion', 'berth delays and demurrage costs'] },
                { concept: 'inland dry ports icds evacuate bonded cargo inland by rail clearing cargo off docks', weight: 0.5, aliases: ['inland container depots icd role', 'decongesting seaports via dry ports'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is General Average in maritime law and marine insurance?',
              options: [],
              correctAnswer: 'General Average is an ancient maritime law principle where all cargo owners and the shipowner proportionally share a voluntary sacrifice or extraordinary expenditure intentionally incurred to preserve the vessel and cargo from total loss during a maritime peril (e.g., jettisoning heavy containers overboard to refloat a stranded ship during a storm).',
              gradingPoints: [
                { concept: 'proportional sharing of voluntary sacrifice or expense by all cargo and ship owners', weight: 0.5, aliases: ['general average definition', 'shared sacrifice principle'] },
                { concept: 'incurred intentionally to preserve vessel and remaining cargo from common peril', weight: 0.5, aliases: ['common peril preservation', 'jettisoning cargo to save ship'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Decarbonization in maritime transport: IMO 2050 greenhouse gas targets and alternative marine fuels.',
              options: [],
              correctAnswer: 'The IMO revised strategy mandates net-zero greenhouse gas emissions from international maritime shipping by or around 2050, with intermediate targets of 20-30% reduction by 2030 and 70-80% by 2040. Meeting these targets requires operational energy efficiency (wind-assisted propulsion, hull air lubrication) and transitioning from heavy fuel oil to zero/near-zero carbon alternative fuels: green methanol, green ammonia, liquefied natural gas (LNG as a transition fuel), and hydrogen fuel cells.',
              gradingPoints: [
                { concept: 'imo revised strategy net zero ghg emissions by or around 2050', weight: 0.4, aliases: ['imo net zero 2050 target', 'maritime decarbonization targets'] },
                { concept: 'alternative fuels green methanol green ammonia lng hydrogen wind propulsion', weight: 0.6, aliases: ['alternative marine fuels', 'methanol ammonia hydrogen wind assistance'] },
              ],
            },
          ],
        },
        { code: 'TRM 599', title: 'B.Sc. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ];
