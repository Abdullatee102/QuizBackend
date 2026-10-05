// src/seed/faculties/ffcs/fst.ts
import type { SeedCourse } from '../../types.js';

export const fstCourses: SeedCourse[] = [
        // 100 Level
        {
          code: 'FST 101',
          title: 'Introduction to Food Science',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is food science?', options: ['Agricultural crop planting', 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing', 'Culinary menu pricing', 'Supermarket shelf arrangement'], correctAnswer: 'The study of the physical, chemical, and biological makeup of food and the concepts underlying food processing' },
            { type: 'cbt', question: 'Which nutrient group is the primary source of immediate energy for the human body?', options: ['Proteins', 'Carbohydrates', 'Vitamins', 'Minerals'], correctAnswer: 'Carbohydrates' },
            { type: 'cbt', question: 'What is water activity (aw) in food preservation?', options: ['The total moisture content of food', 'The ratio of vapor pressure of water in food to vapor pressure of pure water at the same temperature', 'The volume of drinking water consumed daily', 'The speed at which food dissolves in water'], correctAnswer: 'The ratio of vapor pressure of water in food to vapor pressure of pure water at the same temperature' },
            { type: 'cbt', question: 'Which microorganism is predominantly used in bread leavening and brewing fermentation?', options: ['Saccharomyces cerevisiae (yeast)', 'Escherichia coli', 'Lactobacillus acidophilus', 'Penicillium chrysogenum'], correctAnswer: 'Saccharomyces cerevisiae (yeast)' },
            { type: 'cbt', question: 'What process heats liquids to a specific temperature for a specified time to destroy vegetative pathogens?', options: ['Pasteurization', 'Sterilization', 'Blanching', 'Fermentation'], correctAnswer: 'Pasteurization' },
            { type: 'cbt', question: 'What is Blanching in vegetable food processing?', options: ['Freezing vegetables to -18°C', 'A brief mild heat treatment in boiling water or steam to inactivate degrading enzymes', 'Adding artificial food coloring', 'Drying vegetables under direct sunlight'], correctAnswer: 'A brief mild heat treatment in boiling water or steam to inactivate degrading enzymes' },
            { type: 'cbt', question: 'Which enzyme is responsible for enzymatic browning in cut fruits like apples and bananas?', options: ['Polyphenol oxidase (PPO)', 'Alpha-amylase', 'Lipase', 'Protease'], correctAnswer: 'Polyphenol oxidase (PPO)' },
            { type: 'cbt', question: 'What is food spoilage?', options: ['Improving the nutritional quality of canned meat', 'Any sensory change (odor, flavor, texture, appearance) that makes food unacceptable for consumption', 'Packaging food in vacuum pouches', 'Fortifying cereal with minerals'], correctAnswer: 'Any sensory change (odor, flavor, texture, appearance) that makes food unacceptable for consumption' },
            { type: 'cbt', question: 'Which vitamins are classified as fat-soluble?', options: ['Vitamins A, D, E, and K', 'Vitamins B and C', 'Vitamins B1, B6, and B12', 'Folic acid and Biotin'], correctAnswer: 'Vitamins A, D, E, and K' },
            { type: 'cbt', question: 'What is the purpose of food additives?', options: ['To intentionally add substances to preserve flavor, enhance appearance, improve texture, or extend shelf life', 'To increase water weight illegally', 'To replace all natural nutrients with chemicals', 'To cause food to ferment instantly'], correctAnswer: 'To intentionally add substances to preserve flavor, enhance appearance, improve texture, or extend shelf life' },
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
            { type: 'cbt', question: 'What is lipid rancidity?', options: ['The sweetening of milk sugars', 'The spoilage of fats and oils resulting in unpleasant odors and flavors due to oxidation or hydrolysis', 'The hardening of saturated margarine', 'The synthesis of glycerol molecules'], correctAnswer: 'The spoilage of fats and oils resulting in unpleasant odors and flavors due to oxidation or hydrolysis' },
            { type: 'cbt', question: 'Which protein fraction in wheat flour gives dough its viscoelastic extensibility and structure?', options: ['Gluten (gliadin and glutenin)', 'Casein', 'Albumin', 'Gelatin'], correctAnswer: 'Gluten (gliadin and glutenin)' },
            { type: 'cbt', question: 'What is Caramelization in carbohydrate chemistry?', options: ['The pyrolysis of sugars when heated above their melting points in the absence of amino compounds', 'The reaction of reducing sugars with amino acids', 'The enzymatic breakdown of pectin', 'The curdling of milk proteins with rennet'], correctAnswer: 'The pyrolysis of sugars when heated above their melting points in the absence of amino compounds' },
            { type: 'cbt', question: 'What is the principal carbohydrate found in mammalian milk?', options: ['Sucrose', 'Lactose', 'Maltose', 'Fructose'], correctAnswer: 'Lactose' },
            { type: 'cbt', question: 'Which antioxidant is commonly added to vegetable oils to prevent oxidative rancidity?', options: ['Tocopherols (Vitamin E) / BHT', 'Sodium chloride', 'Citric acid crystals', 'Monosodium glutamate (MSG)'], correctAnswer: 'Tocopherols (Vitamin E) / BHT' },
            { type: 'cbt', question: 'What is Starch Gelatinization?', options: ['The disruption of molecular order within starch granules when heated in excess water, causing swelling and paste formation', 'The crystallization of sugar candies', 'The freezing of liquid starch gels', 'The drying of cassava chips'], correctAnswer: 'The disruption of molecular order within starch granules when heated in excess water, causing swelling and paste formation' },
            { type: 'cbt', question: 'What is denaturation of proteins in food processing?', options: ['The alteration of a protein tertiary/secondary structure without breaking peptide bonds, caused by heat or acid', 'The synthesis of new amino acid chains', 'The complete combustion of protein into ash', 'The freezing of muscle meat'], correctAnswer: 'The alteration of a protein tertiary/secondary structure without breaking peptide bonds, caused by heat or acid' },
            { type: 'cbt', question: 'Which natural pigment gives tomatoes and watermelons their red color?', options: ['Chlorophyll', 'Lycopene (carotenoid)', 'Anthocyanin', 'Myoglobin'], correctAnswer: 'Lycopene (carotenoid)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'FST 301',
          title: 'Food Microbiology & Preservation',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the microbial hurdle technology concept in food preservation and cite four hurdle parameters.',
              options: [],
              correctAnswer: 'Hurdle Technology combines multiple preservation factors (hurdles) at sub-lethal levels to inhibit microbial growth without compromising sensory quality. Four hurdle parameters include: high temperature (pasteurization), low temperature (refrigeration/chilling), reduced water activity (aw via dehydration or salting), reduced pH (acidification), redox potential (vacuum packaging), and chemical preservatives (sorbates/nitrites).',
              gradingPoints: [
                { concept: 'combines multiple sub lethal preservation barriers to inhibit microbial growth', weight: 0.5, aliases: ['hurdle technology definition', 'multiple barrier preservation concept'] },
                { concept: 'temperature water activity aw ph redox potential preservatives four hurdles', weight: 0.5, aliases: ['four hurdle parameters', 'temperature aw ph preservatives'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Food Infection and Food Intoxication with representative pathogenic microorganisms.',
              options: [],
              correctAnswer: 'Food Infection occurs when viable pathogenic microorganisms are ingested with food, colonize the gastrointestinal tract, and cause illness (e.g., Salmonella enterica, Listeria monocytogenes). Food Intoxication occurs when preformed toxic chemical metabolites produced by bacteria growing in food are ingested, causing illness even if the bacteria are killed (e.g., Clostridium botulinum botulinum toxin, Staphylococcus aureus enterotoxin).',
              gradingPoints: [
                { concept: 'food infection ingestion colonization of live pathogens salmonella listeria', weight: 0.5, aliases: ['food infection live microbes', 'viable bacteria ingestion salmonella'] },
                { concept: 'food intoxication ingestion of preformed bacterial toxins botulinum staph aureus', weight: 0.5, aliases: ['food intoxication preformed toxins', 'toxin ingestion clostridium staphylococcus'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain thermal death time concepts in canning: D-value, z-value, and the 12D concept for Clostridium botulinum.',
              options: [],
              correctAnswer: 'The D-value (Decimal Reduction Time) is the time in minutes at a given temperature required to destroy 90% (one log cycle) of a microbial population. The z-value is the temperature change in °C required to achieve a ten-fold change in the D-value. The 12D Concept represents commercial sterility in low-acid canning: applying sufficient thermal heat to achieve a 12-decimal reduction in heat-resistant Clostridium botulinum spores, reducing risk to one spore surviving in one trillion cans.',
              gradingPoints: [
                { concept: 'd value time at set temperature reducing microbial population by 90 percent', weight: 0.35, aliases: ['d value definition', 'decimal reduction time 90%'] },
                { concept: 'z value temperature increase required to change d value tenfold', weight: 0.25, aliases: ['z value definition', 'temperature change for 10x d value'] },
                { concept: '12d concept thermal treatment achieving 12 log reductions of botulinum spores', weight: 0.4, aliases: ['12d botulinum concept', 'commercial sterility 12 decimal reduction'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Lactic Acid Fermentation in indigenous food processing (e.g., gari, ogi, fufu).',
              options: [],
              correctAnswer: 'Lactic acid fermentation uses indigenous lactic acid bacteria (e.g., Lactobacillus plantarum, Leuconostoc mesenteroides) to ferment carbohydrate substrates anaerobically. In cassava (gari/fufu) and maize (ogi), fermentation lowers mash pH to below 4.0, which inhibits spoilage and pathogenic bacteria, detoxifies cyanogenic glucosides (linamarin) in cassava, and develops characteristic sour aroma and extended shelf stability.',
              gradingPoints: [
                { concept: 'anaerobic conversion of carbohydrates by lactic acid bacteria lowering ph', weight: 0.5, aliases: ['lab fermentation mechanisms', 'lactic acid production ph drop'] },
                { concept: 'inhibits pathogens detoxifies cassava cyanogenic glucosides enhances flavor shelf life', weight: 0.5, aliases: ['detoxification of linamarin in gari', 'pathogen inhibition and sour flavor'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Freeze-Drying (Lyophilization) in food preservation and its primary quality advantages.',
              options: [],
              correctAnswer: 'Freeze-drying preserves food through sublimation: freezing the food below its triple point, followed by vacuum drying where ice sublimates directly from solid to vapor without passing through a liquid phase. Its primary quality advantages include preserving delicate heat-sensitive nutrients and flavor volatiles, maintaining original food structure and shape, and enabling instant rapid rehydration.',
              gradingPoints: [
                { concept: 'freezes food then sublimates ice directly to vapor under high vacuum', weight: 0.5, aliases: ['sublimation under vacuum', 'freeze drying sublimation principle'] },
                { concept: 'preserves nutrients flavors shape minimizes shrinkage rapid rehydration', weight: 0.5, aliases: ['quality advantages of lyophilization', 'retains volatile flavors and porosity'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Modified Atmosphere Packaging (MAP) and what gas mixtures are commonly employed?',
              options: [],
              correctAnswer: 'Modified Atmosphere Packaging (MAP) alters the internal gaseous atmosphere within a sealed food package to suppress microbial respiration and enzymatic spoilage. Common gas mixtures combine Nitrogen (N2: inert filler preventing package collapse), Carbon Dioxide (CO2: antimicrobial agent inhibiting aerobic molds and pseudomonads), and Oxygen (O2: retained at low levels in red meat to maintain oxymyoglobin red bloom or excluded to prevent lipid oxidation).',
              gradingPoints: [
                { concept: 'alters internal gaseous atmosphere inside sealed pack suppressing spoilage', weight: 0.4, aliases: ['map packaging definition', 'protective gas flush packaging'] },
                { concept: 'nitrogen filler co2 antimicrobial oxygen meat bloom or excluded gas roles', weight: 0.6, aliases: ['n2 co2 o2 gas mixtures', 'roles of nitrogen carbon dioxide oxygen'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Aflatoxins, the fungal species producing them, and mitigation strategies in grain storage.',
              options: [],
              correctAnswer: 'Aflatoxins are potent, carcinogenic mycotoxins produced by the molds Aspergillus flavus and Aspergillus parasiticus on maize, groundnuts, and grains under warm, humid conditions. Mitigation strategies include rapid grain drying to safe moisture below 12-13%, cleaning and sorting to remove broken discolored kernels, maintaining hermetic storage (e.g., PICS bags), and applying biocontrol agents (Aflasafe) in crop fields.',
              gradingPoints: [
                { concept: 'carcinogenic mycotoxins produced by aspergillus flavus on grains nuts', weight: 0.5, aliases: ['aflatoxin definition', 'aspergillus mold toxins'] },
                { concept: 'mitigation drying below 13 percent sorting hermetic pics bags biocontrol aflasafe', weight: 0.5, aliases: ['aflatoxin control measures', 'rapid drying hermetic storage aflasafe'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain High-Pressure Processing (HPP) as a non-thermal food preservation technology.',
              options: [],
              correctAnswer: 'High-Pressure Processing (HPP or Pascalization) subjects packaged foods to intense hydrostatic pressures (400-600 MPa) using water as the transmitting medium. The immense pressure instantaneously inactivates vegetative bacteria, yeasts, and molds by disrupting cell membranes and denaturing critical enzymes, while leaving covalent bonds untouched, thereby preserving fresh taste, color, and heat-labile vitamins.',
              gradingPoints: [
                { concept: 'non thermal preservation using hydrostatic pressure 400 to 600 mpa in water', weight: 0.5, aliases: ['hpp pascalization', 'high hydrostatic pressure processing'] },
                { concept: 'inactivates vegetative microbes without breaking covalent bonds preserving flavor vitamins', weight: 0.5, aliases: ['microbial inactivation mechanism', 'preserves vitamins and raw fresh taste'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the role of Biofilms in food processing plants and how they contribute to cross-contamination.',
              options: [],
              correctAnswer: 'A biofilm is a structured community of bacterial cells (e.g., Listeria, Pseudomonas) embedded within a self-produced matrix of extracellular polymeric substances (EPS) adhered to stainless steel surfaces. Biofilms shield bacteria from standard chemical sanitizers and heat, releasing continuous planktonic bacterial cells into processing lines that cross-contaminate finished food products.',
              gradingPoints: [
                { concept: 'bacterial community embedded in self produced extracellular polymeric matrix eps on surfaces', weight: 0.5, aliases: ['biofilm definition in food plants', 'eps matrix bacterial adhesion'] },
                { concept: 'resists sanitizers detaches cells causing chronic cross contamination of food', weight: 0.5, aliases: ['sanitizer resistance cross contamination', 'persistent contamination source'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the principles of HACCP in food manufacturing and name the seven core principles.',
              options: [],
              correctAnswer: 'HACCP (Hazard Analysis Critical Control Point) is a systematic preventative approach to food safety that identifies biological, chemical, and physical hazards. The 7 principles are: 1. Conduct a hazard analysis; 2. Determine Critical Control Points (CCPs); 3. Establish critical limits; 4. Establish monitoring procedures; 5. Establish corrective actions; 6. Establish verification procedures; and 7. Establish record-keeping and documentation.',
              gradingPoints: [
                { concept: 'preventative food safety management identifying biological chemical physical hazards', weight: 0.3, aliases: ['haccp definition', 'preventative hazard control'] },
                { concept: 'hazard analysis ccps critical limits monitoring corrective actions verification documentation 7 principles', weight: 0.7, aliases: ['seven haccp principles', 'hazard ccp limits monitoring corrective verification records'] },
              ],
            },
          ],
        },
        { code: 'FST 399', title: 'SIWES Industrial Attachment', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'FST 401',
          title: 'Sensory Evaluation & Food Analysis',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Sensory Evaluation and differentiate between Discriminative, Descriptive, and Affective sensory tests.',
              options: [],
              correctAnswer: 'Sensory evaluation is a scientific discipline that measures, analyzes, and interprets human sensory reactions to food via sight, smell, taste, touch, and hearing. Discriminative tests determine if an identifiable difference exists between samples (e.g., Triangle Test, Duo-Trio). Descriptive tests quantify the specific sensory attributes and intensities using trained panelists (e.g., Quantitative Descriptive Analysis QDA). Affective (Hedonic) tests measure consumer liking, acceptance, and preference using untrained consumers.',
              gradingPoints: [
                { concept: 'scientific measurement of human sensory reactions to food attributes', weight: 0.3, aliases: ['sensory evaluation definition', 'sensory science discipline'] },
                { concept: 'discriminative detect difference descriptive quantify attributes affective measure liking', weight: 0.7, aliases: ['three sensory test categories', 'discriminative descriptive affective hedonic'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the Triangle Test protocol in sensory discrimination testing.',
              options: [],
              correctAnswer: 'In a Triangle Test, panelists receive three coded samples simultaneously (two identical and one odd/different) presented in randomized orders (e.g., AAB, ABA, BAA, BBA, BAB, ABB). The panelist is instructed to taste each from left to right and identify the odd sample. Statistical tables based on binomial probability determine if the number of correct selections exceeds chance (1/3 probability) at a chosen significance level (p < 0.05).',
              gradingPoints: [
                { concept: 'three coded samples presented simultaneously two identical one odd', weight: 0.5, aliases: ['triangle test setup', 'two identical one odd sample'] },
                { concept: 'panelist selects odd sample evaluated via binomial probability tables chance 1 over 3', weight: 0.5, aliases: ['identifies odd sample', 'statistical binomial significance tables'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain proximate analysis of food and describe methods for determining Moisture, Crude Protein, and Crude Fat.',
              options: [],
              correctAnswer: 'Proximate analysis quantifies the major nutritional macronutrients in a food sample. Moisture is determined by drying sample in a forced-air oven at 105°C to constant weight. Crude Protein is determined via the Kjeldahl method: digesting sample in concentrated H2SO4, distilling ammonia, titrating, and multiplying nitrogen by 6.25. Crude Fat is determined via Soxhlet solvent extraction using petroleum ether to extract non-polar lipids.',
              gradingPoints: [
                { concept: 'quantifies major macronutrient constituents in food samples', weight: 0.25, aliases: ['proximate analysis definition', 'standard nutritional composition'] },
                { concept: 'moisture oven drying 105c protein kjeldahl nitrogen digestion times 6.25 fat soxhlet extraction', weight: 0.75, aliases: ['moisture protein fat methods', 'oven kjeldahl soxhlet extraction principles'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the Kjeldahl method for nitrogen determination and explain the rationale for the 6.25 conversion factor.',
              options: [],
              correctAnswer: 'The Kjeldahl method comprises three steps: 1. Digestion (heating food with concentrated H2SO4 and catalyst converting organic nitrogen to ammonium sulfate (NH4)2SO4); 2. Distillation (adding NaOH to release volatile NH3, which distills into boric acid solution); and 3. Titration (titrating with standardized HCl). The 6.25 factor is derived because general food proteins contain an average of 16% nitrogen (100 / 16 = 6.25).',
              gradingPoints: [
                { concept: 'digestion with sulfuric acid distillation of ammonia into boric acid titration with hcl', weight: 0.6, aliases: ['three kjeldahl steps', 'digestion distillation titration'] },
                { concept: '6.25 factor based on average 16 percent nitrogen content in food proteins', weight: 0.4, aliases: ['16% nitrogen basis', '100 divided by 16 gives 6.25'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain High-Performance Liquid Chromatography (HPLC) in food analysis and cite two food applications.',
              options: [],
              correctAnswer: 'HPLC is an analytical separation technique where liquid mobile phase carries dissolved food analytes under high pressure through a column packed with stationary phase material, separating compounds based on polarity and chemical affinity before detection. Applications include: quantifying water-soluble vitamins (B-complex, Vitamin C), identifying mycotoxins (aflatoxins), and profiling sugars in fruit juices.',
              gradingPoints: [
                { concept: 'liquid chromatography separating analytes under high pressure through column based on polarity', weight: 0.5, aliases: ['hplc mechanism', 'liquid phase high pressure separation'] },
                { concept: 'applications quantifying vitamins mycotoxin detection sugar profiling in beverages', weight: 0.5, aliases: ['hplc food applications', 'vitamin analysis aflatoxin detection'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Gas Chromatography (GC) and why is it preferred for fatty acid profiling and volatile aroma analysis?',
              options: [],
              correctAnswer: 'Gas Chromatography (GC) vaporizes volatile compounds and carries them with an inert carrier gas (helium/nitrogen) through a capillary column coated with stationary phase. It is preferred for fatty acids (derivatized into volatile fatty acid methyl esters FAMEs) and food volatile aroma compounds because of its exceptional resolution in separating volatile, thermally stable low-molecular-weight organic molecules.',
              gradingPoints: [
                { concept: 'vaporizes volatile compounds carried by inert gas through capillary column', weight: 0.5, aliases: ['gc mechanism', 'gas mobile phase separation'] },
                { concept: 'exceptional resolution for volatile aroma compounds and fame fatty acid methyl esters', weight: 0.5, aliases: ['volatile aromas and fame analysis', 'fatty acid profiling in oils'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the 9-point Hedonic Scale in consumer sensory acceptance testing.',
              options: [],
              correctAnswer: 'The 9-point Hedonic Scale is a balanced bipolar rating scale used to quantify consumer liking of a product: 1 = Dislike Extremely, 2 = Dislike Very Much, 3 = Dislike Moderately, 4 = Dislike Slightly, 5 = Neither Like nor Dislike, 6 = Like Slightly, 7 = Like Moderately, 8 = Like Very Much, and 9 = Like Extremely. Responses are converted to numerical scores (1-9) for analysis of variance (ANOVA).',
              gradingPoints: [
                { concept: 'balanced bipolar 9 point rating scale measuring degree of liking acceptance', weight: 0.5, aliases: ['9 point scale definition', 'hedonic consumer liking scale'] },
                { concept: 'endpoints dislike extremely 1 neutral 5 like extremely 9 converted to anova scores', weight: 0.5, aliases: ['scale structure 1 to 9', 'hedonic anchors and anova'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Atomic Absorption Spectroscopy (AAS) in heavy metal food contaminant testing.',
              options: [],
              correctAnswer: 'AAS measures the concentration of elemental metal atoms in food by aspirating mineralized sample solution into a high-temperature flame, atomizing it into ground-state atoms, and measuring the absorption of light at a specific resonance wavelength emitted by a hollow cathode lamp. It is used to detect toxic trace heavy metals (Lead Pb, Cadmium Cd, Arsenic As, Mercury Hg) at parts-per-billion levels.',
              gradingPoints: [
                { concept: 'atomizes sample in flame measuring light absorption at characteristic element wavelength', weight: 0.5, aliases: ['aas principle', 'flame atomization light absorption'] },
                { concept: 'quantifies toxic heavy metals lead cadmium arsenic mercury at trace levels', weight: 0.5, aliases: ['heavy metal contaminant detection', 'pb cd as hg quantification'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Rheology in food science and differentiate between Newtonian and Non-Newtonian food fluids.',
              options: [],
              correctAnswer: 'Food rheology is the study of the flow and deformation of food materials under applied shear forces. Newtonian fluids maintain a constant viscosity regardless of applied shear rate (e.g., water, vegetable oils, clear honey). Non-Newtonian fluids exhibit viscosity changes as shear rate varies: Shear-thinning/Pseudoplastic (viscosity drops with shear, e.g., tomato ketchup, salad dressing) and Shear-thickening/Dilatant (viscosity increases with shear, e.g., concentrated cornstarch slurry).',
              gradingPoints: [
                { concept: 'study of flow and deformation of food under shear forces', weight: 0.3, aliases: ['rheology definition', 'food flow and deformation'] },
                { concept: 'newtonian constant viscosity water oil non newtonian viscosity changes with shear ketchup', weight: 0.7, aliases: ['newtonian vs non newtonian', 'constant vs shear dependent viscosity'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe environmental controls and panelist isolation booths in a standard Sensory Evaluation Laboratory.',
              options: [],
              correctAnswer: 'A sensory lab requires individual partition booths to prevent panelist interaction and facial cue bias. Environmental controls include: controlled positive-pressure ventilation to evacuate food cooking odors, neutral off-white booth walls to avoid visual bias, specialized lighting (red lighting to mask color differences when evaluating texture/flavor alone), constant temperature (20-22°C), and soundproofing to ensure quiet concentration.',
              gradingPoints: [
                { concept: 'individual booths isolating panelists to eliminate peer interaction and bias', weight: 0.5, aliases: ['sensory booth isolation', 'prevents panelist visual cues'] },
                { concept: 'odor evacuation ventilation colored masking lights constant temperature soundproofing', weight: 0.5, aliases: ['sensory lab environmental controls', 'lighting ventilation temperature controls'] },
              ],
            },
          ],
        },

        // 500 Level
        {
          code: 'FST 501',
          title: 'Food Quality Control & Product Development',
          level: 500,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Differentiate between Quality Control (QC) and Quality Assurance (QA) in the food processing industry.',
              options: [],
              correctAnswer: 'Quality Control (QC) is a reactive, operational inspection process focused on testing, measuring, and inspecting raw materials and finished products to identify and reject defective items before shipment (product-oriented). Quality Assurance (QA) is a proactive, systemic management framework focused on designing, documenting, and auditing processes to prevent defects from occurring in the first place (process-oriented).',
              gradingPoints: [
                { concept: 'qc reactive product oriented inspection testing rejecting defects', weight: 0.5, aliases: ['qc inspection focus', 'testing finished products'] },
                { concept: 'qa proactive process oriented system preventing defects through standard procedures', weight: 0.5, aliases: ['qa prevention focus', 'quality assurance systems'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the ISO 22000 Food Safety Management System standard and its integration with HACCP and PRP.',
              options: [],
              correctAnswer: 'ISO 22000 is an international food safety management standard that integrates the principles of HACCP with Prerequisite Programs (PRPs) under an ISO 9001 management framework. It establishes interactive communication along the supply chain, systemic management review, hazard control plans combining Operational PRPs (oPRPs) and Critical Control Points (CCPs), and continual improvement cycles.',
              gradingPoints: [
                { concept: 'international food safety standard integrating haccp with prerequisite programs prps', weight: 0.5, aliases: ['iso 22000 standard definition', 'combines haccp and prps'] },
                { concept: 'interactive supply chain communication oprps ccps continual improvement', weight: 0.5, aliases: ['iso 22000 core pillars', 'operational prps and ccp management'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the Stage-Gate process for New Product Development (NPD) in commercial food companies.',
              options: [],
              correctAnswer: 'The Stage-Gate process divides NPD into distinct Stages (where development work occurs) separated by decision Gates (where cross-functional executives review deliverables and decide to Go, Kill, Hold, or Recycle): Idea Discovery -> Gate 1 -> Scoping -> Gate 2 -> Business Case Formulation -> Gate 3 -> Kitchen/Pilot Development -> Gate 4 -> Factory Scale-up Testing -> Gate 5 -> Commercial Launch.',
              gradingPoints: [
                { concept: 'staged innovation framework with operational stages and executive decision gates', weight: 0.5, aliases: ['stage gate process definition', 'cooper stage gate model'] },
                { concept: 'gates evaluate criteria deciding go kill hold or recycle at each milestone', weight: 0.5, aliases: ['gate decision criteria', 'go kill decisions across npd lifecycle'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Statistical Process Control (SPC) and the use of Shewhart Control Charts in food canning operations.',
              options: [],
              correctAnswer: 'Statistical Process Control (SPC) uses statistical methods to monitor and control a production process to ensure it operates at its full potential without variation. Shewhart Control Charts (e.g., X-bar and R charts) plot sample metrics (can fill weight, seam thickness) over time between an Upper Control Limit (UCL) and Lower Control Limit (LCL). Points drifting outside control limits signal assignable cause variation, prompting immediate machine recalibration before out-of-spec cans are produced.',
              gradingPoints: [
                { concept: 'statistical monitoring of process metrics to detect abnormal variation', weight: 0.4, aliases: ['spc definition', 'statistical process control'] },
                { concept: 'shewhart charts plot metrics between ucl and lcl detecting out of control trends', weight: 0.6, aliases: ['control charts ucl lcl', 'x bar and r charts detecting drifts'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Total Quality Management (TQM) and how do Deming 14 Points apply to food processing plants?',
              options: [],
              correctAnswer: 'TQM is an organization-wide management philosophy dedicated to continuous improvement of all processes, products, and services with complete customer satisfaction as the target. Deming 14 points apply by: ceasing dependence on mass inspection (building quality into processes), breaking down departmental barriers between R&D, production, and marketing, driving out fear of reporting hygiene issues, and instituting continuous worker training in food safety.',
              gradingPoints: [
                { concept: 'organization wide philosophy dedicated to continuous quality improvement customer focus', weight: 0.4, aliases: ['tqm definition', 'total quality management'] },
                { concept: 'deming points building quality in breaking silos continuous training reporting safety', weight: 0.6, aliases: ['deming 14 points in food', 'ceasing mass inspection continuous training'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the role of NAFDAC and SON in food quality regulation and enforcement in Nigeria.',
              options: [],
              correctAnswer: 'NAFDAC (National Agency for Food and Drug Administration and Control) regulates and controls the manufacture, importation, exportation, advertisement, distribution, sale, and use of food, drugs, and chemicals in Nigeria, issuing mandatory NAFDAC registration numbers. SON (Standards Organisation of Nigeria) establishes mandatory Nigerian Industrial Standards (NIS) for food commodities, inspecting factories and issuing MANCAP quality certification stamps.',
              gradingPoints: [
                { concept: 'nafdac regulates safety import distribution sale issuing registration numbers', weight: 0.5, aliases: ['nafdac statutory role', 'nafdac food safety enforcement'] },
                { concept: 'son establishes industrial standards nis inspects factories issues mancap certification', weight: 0.5, aliases: ['son statutory role', 'standards organisation of nigeria mancap'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Shelf-Life Testing protocols: Real-Time Storage versus Accelerated Shelf-Life Testing (ASLT).',
              options: [],
              correctAnswer: 'Real-Time shelf-life testing stores food packages under actual commercial conditions (e.g., 25°C, 65% RH) and periodically samples them for chemical, microbiological, and sensory degradation until failure occurs (accurate but time-consuming). Accelerated Shelf-Life Testing (ASLT) stores food under elevated environmental stress (e.g., 40°C, 85% RH) to speed up kinetic degradation rates, using the Arrhenius kinetic equation (Q10 temperature coefficient) to extrapolate real-time shelf life rapidly.',
              gradingPoints: [
                { concept: 'real time testing under actual ambient conditions periodically sampling to failure', weight: 0.4, aliases: ['real time shelf life', 'ambient condition storage testing'] },
                { concept: 'aslt stores under elevated stress using arrhenius kinetics q10 to extrapolate shelf life', weight: 0.6, aliases: ['accelerated testing aslt', 'arrhenius equation q10 temperature factor'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Good Manufacturing Practice (GMP) and Good Hygiene Practice (GHP) in food factory design?',
              options: [],
              correctAnswer: 'GMP and GHP provide foundational hygiene and operational guidelines that prevent contamination in food manufacture: facility layout ensuring linear forward workflow without cross-traffic between raw and cooked zones; rounded coving between walls and floors to facilitate sanitization; food-grade non-corrosive stainless steel contact surfaces; automated handwashing stations; and strict employee hairnets and protective uniform protocols.',
              gradingPoints: [
                { concept: 'foundational guidelines for hygiene and sanitary operations preventing contamination', weight: 0.4, aliases: ['gmp ghp definition', 'sanitary manufacturing prerequisites'] },
                { concept: 'linear layout segregation of raw cooked coved walls stainless steel surfaces hygiene stations', weight: 0.6, aliases: ['factory design principles', 'hygienic design stainless steel coving'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Traceability and Recall Systems in industrial food supply chains.',
              options: [],
              correctAnswer: 'Food traceability is the ability to track a food product, its ingredients, and packaging materials through all stages of production, processing, and distribution (one-step-forward, one-step-back rule). A Recall System uses batch lot numbers printed on packaging to rapidly identify, quarantine, and retrieve contaminated or mislabeled food from retail shelves and consumer distribution channels, mitigating public health catastrophes.',
              gradingPoints: [
                { concept: 'ability to trace ingredients and finished products through all supply chain stages', weight: 0.5, aliases: ['traceability definition', 'one step forward one step back tracking'] },
                { concept: 'recall system uses batch lot numbers to rapidly quarantine and retrieve defective product', weight: 0.5, aliases: ['product recall protocols', 'batch lot retrieval from shelves'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss Food Fraud and Economically Motivated Adulteration (EMA) with historical examples.',
              options: [],
              correctAnswer: 'Food fraud / EMA is the intentional deception of consumers by substituting, diluting, tampering, or misrepresenting food products or ingredients for illicit financial gain. Prominent examples include: diluting milk and adding toxic melamine to artificially inflate Kjeldahl protein readings (2008 scandal), diluting extra virgin olive oil with cheap hazelnut/canola oil, and injecting industrial Sudan dye into palm oil to enhance red coloration.',
              gradingPoints: [
                { concept: 'intentional substitution dilution or adulteration of food for financial gain', weight: 0.5, aliases: ['food fraud ema definition', 'economically motivated adulteration'] },
                { concept: 'melanine in milk olive oil dilution sudan dye in palm oil examples', weight: 0.5, aliases: ['historical food fraud examples', 'melamine sudan dye olive oil fraud'] },
              ],
            },
          ],
        },
        { code: 'FST 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ];
