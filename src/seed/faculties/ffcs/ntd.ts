// src/seed/faculties/ffcs/ntd.ts
import type { SeedCourse } from '../../types.js';

export const ntdCourses: SeedCourse[] = [
        // 100 Level
        {
          code: 'NTD 101',
          title: 'Introduction to Human Nutrition',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'Which deficiency disease is caused by inadequate dietary intake of Vitamin C?', options: ['Rickets', 'Scurvy', 'Beriberi', 'Pellagra'], correctAnswer: 'Scurvy' },
            { type: 'cbt', question: 'What are the fat-soluble vitamins?', options: ['Vitamins B and C', 'Vitamins A, D, E, and K', 'Vitamins B1, B2, and B6', 'Vitamin C and Folic Acid'], correctAnswer: 'Vitamins A, D, E, and K' },
            { type: 'cbt', question: 'Which mineral deficiency is the primary cause of nutritional anemia worldwide?', options: ['Iron', 'Calcium', 'Sodium', 'Potassium'], correctAnswer: 'Iron' },
            { type: 'cbt', question: 'What is Kwashiorkor primarily caused by in infants?', options: ['Severe dietary protein deficiency despite adequate or moderate carbohydrate intake', 'Total calorie starvation', 'Lack of Vitamin A', 'Excess dietary fat consumption'], correctAnswer: 'Severe dietary protein deficiency despite adequate or moderate carbohydrate intake' },
            { type: 'cbt', question: 'What is Marasmus in pediatric nutrition?', options: ['Severe wasting caused by chronic deficiency of both total calories and protein', 'An allergic reaction to cow milk', 'Excess fluid accumulation in feet', 'Thyroid enlargement caused by iodine'], correctAnswer: 'Severe wasting caused by chronic deficiency of both total calories and protein' },
            { type: 'cbt', question: 'Which vitamin is synthesized in human skin upon exposure to sunlight ultraviolet B radiation?', options: ['Vitamin D', 'Vitamin E', 'Vitamin K', 'Vitamin B12'], correctAnswer: 'Vitamin D' },
            { type: 'cbt', question: 'What is the primary function of dietary fiber in the human digestive system?', options: ['Promoting bowel motility, preventing constipation, and feeding beneficial gut microbiota', 'Providing high calorie ATP energy', 'Building skeletal muscle tissue', 'Carrying oxygen in erythrocytes'], correctAnswer: 'Promoting bowel motility, preventing constipation, and feeding beneficial gut microbiota' },
            { type: 'cbt', question: 'Which deficiency disease is caused by inadequate dietary intake of Niacin (Vitamin B3)?', options: ['Pellagra (dermatitis, diarrhea, dementia)', 'Rickets', 'Goiter', 'Night blindness'], correctAnswer: 'Pellagra (dermatitis, diarrhea, dementia)' },
            { type: 'cbt', question: 'What mineral is essential for the synthesis of thyroid hormones (T3 and T4)?', options: ['Iodine', 'Zinc', 'Copper', 'Magnesium'], correctAnswer: 'Iodine' },
            { type: 'cbt', question: 'What is the physiological energy value of fat per gram compared to carbohydrates and proteins?', options: ['9 kcal/g (fat) vs 4 kcal/g (carbs/protein)', '4 kcal/g (fat) vs 9 kcal/g (carbs/protein)', '7 kcal/g across all nutrients', '2 kcal/g for all macronutrients'], correctAnswer: '9 kcal/g (fat) vs 4 kcal/g (carbs/protein)' },
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
            { type: 'cbt', question: 'Which hormone secreted by pancreatic beta cells stimulates glucose uptake into muscle and adipose tissues?', options: ['Insulin', 'Glucagon', 'Epinephrine', 'Cortisol'], correctAnswer: 'Insulin' },
            { type: 'cbt', question: 'What is the primary site of nutrient absorption in the human digestive system?', options: ['Small Intestine (jejunum and ileum)', 'Stomach', 'Large Intestine', 'Esophagus'], correctAnswer: 'Small Intestine (jejunum and ileum)' },
            { type: 'cbt', question: 'Which metabolic process breaks down fatty acids into Acetyl-CoA units inside the mitochondria?', options: ['Beta-Oxidation', 'Lipogenesis', 'Glycogenesis', 'Pentose Phosphate Pathway'], correctAnswer: 'Beta-Oxidation' },
            { type: 'cbt', question: 'What metabolic pathway synthesizes glucose from non-carbohydrate precursors like lactate, glycerol, and amino acids?', options: ['Gluconeogenesis', 'Glycogenolysis', 'Glycolysis', 'Ketogenesis'], correctAnswer: 'Gluconeogenesis' },
            { type: 'cbt', question: 'What is the primary nitrogenous waste product synthesized in the liver to dispose of toxic ammonia?', options: ['Urea', 'Uric acid', 'Creatinine', 'Bilirubin'], correctAnswer: 'Urea' },
            { type: 'cbt', question: 'Which lipoprotein is colloquially termed "good cholesterol" because it transports cholesterol from tissues back to the liver?', options: ['High-Density Lipoprotein (HDL)', 'Low-Density Lipoprotein (LDL)', 'Very Low-Density Lipoprotein (VLDL)', 'Chylomicrons'], correctAnswer: 'High-Density Lipoprotein (HDL)' },
            { type: 'cbt', question: 'What coenzyme derived from Vitamin B1 (Thiamine) is essential for the pyruvate dehydrogenase complex?', options: ['Thiamine Pyrophosphate (TPP)', 'Flavin Adenine Dinucleotide (FAD)', 'Nicotinamide Adenine Dinucleotide (NAD)', 'Coenzyme A'], correctAnswer: 'Thiamine Pyrophosphate (TPP)' },
            { type: 'cbt', question: 'During prolonged starvation, what alternative energy substrates does the brain adapt to utilize?', options: ['Ketone bodies (acetoacetate, beta-hydroxybutyrate)', 'Triglycerides directly', 'Free fatty acids directly', 'Glycogen granules'], correctAnswer: 'Ketone bodies (acetoacetate, beta-hydroxybutyrate)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        {
          code: 'NTD 301',
          title: 'Clinical Nutrition & Diet Therapy',
          level: 300,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain Medical Nutrition Therapy (MNT) for managing Type 2 Diabetes Mellitus, highlighting glycemic index and carbohydrate counting.',
              options: [],
              correctAnswer: 'MNT for Type 2 Diabetes aims to achieve target blood glucose levels, normalize lipid profiles, and prevent macrovascular/microvascular complications. Dietitians use Carbohydrate Counting to match insulin secretion with carbohydrate intake, and prioritize low-Glycemic Index (GI) and high-fiber complex carbohydrates (whole grains, legumes) that digest slowly, preventing postprandial glucose spikes.',
              gradingPoints: [
                { concept: 'aims to achieve glycemic control normalize lipids prevent complications', weight: 0.4, aliases: ['diabetes mnt goals', 'glycemic target control'] },
                { concept: 'carbohydrate counting low glycemic index high fiber foods avoiding spikes', weight: 0.6, aliases: ['carb counting low gi foods', 'complex carbs and postprandial control'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the DASH diet (Dietary Approaches to Stop Hypertension) and its dietary composition.',
              options: [],
              correctAnswer: 'The DASH diet is an evidence-based nutritional pattern designed to lower blood pressure. Its dietary composition emphasizes abundant consumption of fruits, vegetables, whole grains, and low-fat dairy products; rich in potassium, calcium, and magnesium; while strictly restricting sodium intake (to under 1,500-2,300 mg/day), saturated fats, red meat, and added sugars.',
              gradingPoints: [
                { concept: 'evidence based nutritional pattern to lower blood pressure and cardiovascular risk', weight: 0.4, aliases: ['dash diet definition', 'hypertension dietary management'] },
                { concept: 'high fruits vegetables whole grains low fat dairy potassium restriction of sodium saturated fat', weight: 0.6, aliases: ['dash dietary composition', 'low sodium high potassium minerals'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Enteral Nutrition and Parenteral Nutrition in hospitalized patients.',
              options: [],
              correctAnswer: 'Enteral nutrition delivers liquid nutritional formulas directly into the gastrointestinal tract via feeding tubes (nasogastric, gastrostomy PEG) when patients cannot ingest food orally but maintain a functioning GI tract (preserves gut mucosal barrier, lower cost, lower infection risk). Parenteral nutrition bypasses the gastrointestinal tract entirely, infusing specialized nutrient solutions directly into the bloodstream via peripheral or central intravenous catheters (used when the GI tract is non-functional or obstructed).',
              gradingPoints: [
                { concept: 'enteral tube feeding into functional gastrointestinal tract preserves gut mucosal integrity', weight: 0.5, aliases: ['enteral nutrition gi tract', 'tube feeding nasogastric peg'] },
                { concept: 'parenteral intravenous infusion bypassing non functional gi tract central line', weight: 0.5, aliases: ['parenteral nutrition intravenous', 'tpn central line catheter'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain nutritional management of Chronic Kidney Disease (CKD) stages 3-4 prior to dialysis.',
              options: [],
              correctAnswer: 'In CKD stages 3-4, diet therapy focuses on slowing disease progression and preventing uremic toxicity: restricting dietary protein (0.6-0.8 g/kg/day of high biological value protein to reduce urea burden); restricting sodium to control hypertension; monitoring and restricting potassium to prevent fatal cardiac arrhythmias; restricting dietary phosphorus (and prescribing phosphate binders) to prevent renal osteodystrophy; and monitoring fluid intake.',
              gradingPoints: [
                { concept: 'protein restriction 0.6 to 0.8 g per kg reducing nitrogenous uremic waste', weight: 0.4, aliases: ['protein restriction in ckd', 'reduced protein burden'] },
                { concept: 'sodium restriction potassium monitoring phosphorus restriction fluid balance', weight: 0.6, aliases: ['mineral and fluid management ckd', 'potassium phosphorus sodium control'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is the Nutrition Care Process (NCP) and what four steps comprise its standardized framework?',
              options: [],
              correctAnswer: 'The Nutrition Care Process (NCP) is a standardized model developed by dietitians to provide high-quality nutritional care. Its four steps are: 1. Nutrition Assessment (collecting dietary, biochemical, anthropometric, and clinical data); 2. Nutrition Diagnosis (identifying specific problem using PES statements: Problem, Etiology, Signs/Symptoms); 3. Nutrition Intervention (formulating goals and implementing diet therapy); and 4. Nutrition Monitoring & Evaluation (tracking progress and outcomes).',
              gradingPoints: [
                { concept: 'standardized framework providing systematic personalized nutritional care', weight: 0.3, aliases: ['ncp definition', 'nutrition care framework'] },
                { concept: 'assessment diagnosis pes intervention monitoring evaluation four steps', weight: 0.7, aliases: ['four ncp steps', 'adime assessment diagnosis intervention monitoring'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Celiac Disease, its autoimmune mechanism, and dietary management with a Gluten-Free Diet.',
              options: [],
              correctAnswer: 'Celiac Disease is an autoimmune enteropathy triggered by the ingestion of gluten (prolamin proteins in wheat, barley, rye) in genetically susceptible individuals. Gluten peptides trigger an immune response causing chronic inflammation, blunting of small intestinal villi, and malabsorption of nutrients. Dietary management requires strict, lifelong adherence to a 100% gluten-free diet, eliminating wheat, rye, barley, and non-certified oats, and verifying foods for cross-contact.',
              gradingPoints: [
                { concept: 'autoimmune enteropathy triggered by gluten causing intestinal villous atrophy and malabsorption', weight: 0.5, aliases: ['celiac disease mechanism', 'villous blunting gluten enteropathy'] },
                { concept: 'lifelong 100 percent gluten free diet eliminating wheat barley rye avoiding cross contact', weight: 0.5, aliases: ['gluten free diet management', 'eliminating gluten sources'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Refeeding Syndrome and how clinical dietitians prevent it in severely malnourished patients.',
              options: [],
              correctAnswer: 'Refeeding Syndrome is a potentially fatal metabolic disturbance that occurs when aggressive carbohydrate feeding is introduced to severely malnourished patients. Carbohydrate intake triggers massive insulin secretion, causing rapid cellular uptake of glucose, phosphate, potassium, and magnesium, resulting in severe hypophosphatemia, cardiac arrhythmias, and respiratory failure. Dietitians prevent it by starting caloric refeeding low and slow (10-15 kcal/kg/day), correcting electrolyte deficits before feeding, and supplementing thiamine.',
              gradingPoints: [
                { concept: 'metabolic disturbance from aggressive feeding triggering insulin surge hypophosphatemia', weight: 0.5, aliases: ['refeeding syndrome mechanism', 'hypophosphatemia insulin surge'] },
                { concept: 'prevented by starting low and slow 10 to 15 kcal per kg correcting electrolytes thiamine', weight: 0.5, aliases: ['preventing refeeding syndrome', 'gradual caloric titration thiamine'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe nutritional therapy for Liver Cirrhosis and hepatic encephalopathy.',
              options: [],
              correctAnswer: 'Nutritional therapy for cirrhosis provides high energy (30-35 kcal/kg/day) and adequate protein (1.2-1.5 g/kg/day, often utilizing branched-chain amino acids BCAAs) to prevent muscle wasting and sarcopenia. In hepatic encephalopathy, historical severe protein restriction is avoided; instead, vegetable and dairy proteins are emphasized over animal proteins, lactulose is administered to trap ammonia in the bowel, and late-evening carbohydrate snacks are prescribed to minimize overnight muscle catabolism.',
              gradingPoints: [
                { concept: 'high energy 30 to 35 kcal per kg adequate protein 1.2 to 1.5 g avoiding sarcopenia', weight: 0.5, aliases: ['cirrhosis energy protein requirements', 'high calorie adequate protein'] },
                { concept: 'vegetable dairy proteins bcaas lactulose late evening snack for encephalopathy', weight: 0.5, aliases: ['encephalopathy management', 'bcaas and evening snack to prevent catabolism'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain diet therapy in inflammatory bowel disease (IBD: Crohn Disease and Ulcerative Colitis) during acute flare versus remission.',
              options: [],
              correctAnswer: 'During acute IBD flares, diet therapy focuses on gut rest and reducing bowel irritation: low-residue, low-fiber, lactose-free diets, with exclusive enteral nutrition (EEN) formulas if necessary, and correcting iron/vitamin B12/zinc deficiencies. During clinical remission, patients gradually reintroduce fiber and varied whole foods, identifying personal trigger foods while maintaining high-protein, nutrient-dense anti-inflammatory nutrition.',
              gradingPoints: [
                { concept: 'acute flare low residue low fiber gut rest exclusive enteral nutrition correcting deficiencies', weight: 0.5, aliases: ['acute flare diet', 'low residue low fiber feeding'] },
                { concept: 'remission gradual fiber reintroduction nutrient dense anti inflammatory diet', weight: 0.5, aliases: ['remission diet plan', 'high protein whole food reintroduction'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss nutritional care in cancer cachexia and managing chemotherapy side effects.',
              options: [],
              correctAnswer: 'Cancer cachexia is a multifactorial wasting syndrome characterized by progressive loss of skeletal muscle mass driven by systemic pro-inflammatory cytokines. Nutritional care provides energy-dense and protein-dense foods, small frequent meals, and omega-3 fatty acids (EPA) to downregulate inflammation. Chemotherapy side effects are managed symptomatically: nausea (cold, non-greasy foods, ginger), dysgeusia/metallic taste (plastic utensils, tart citrus flavors), and mucositis (soft, non-acidic bland purees).',
              gradingPoints: [
                { concept: 'muscle wasting driven by systemic inflammation energy protein dense intake epa', weight: 0.5, aliases: ['cancer cachexia definition management', 'protein dense feeding and omega 3'] },
                { concept: 'symptom management nausea cold bland dysgeusia tart flavors mucositis soft purees', weight: 0.5, aliases: ['chemotherapy side effect diet', 'managing nausea dysgeusia and mouth sores'] },
              ],
            },
          ],
        },
        { code: 'NTD 399', title: 'SIWES Internship', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        {
          code: 'NTD 401',
          title: 'Community Nutrition & Assessment',
          level: 400,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the ABCD methods of nutritional assessment in community health.',
              options: [],
              correctAnswer: 'The ABCD methods are: 1. Anthropometry (physical body measurements: height, weight, BMI, mid-upper arm circumference MUAC, waist-to-hip ratio); 2. Biochemical assessment (laboratory testing of blood, serum, and urine for nutrient levels, e.g., hemoglobin, serum ferritin, albumin); 3. Clinical examination (detecting physical signs of nutrient deficiency on hair, eyes, skin, tongue, and nails); and 4. Dietary assessment (evaluating food intake via 24-hour recalls, food frequency questionnaires, and weighed food records).',
              gradingPoints: [
                { concept: 'anthropometric physical body measurements height weight muac', weight: 0.25, aliases: ['anthropometry', 'body measurements'] },
                { concept: 'biochemical laboratory tests blood urine hemoglobin ferritin', weight: 0.25, aliases: ['biochemical laboratory', 'serum and urine tests'] },
                { concept: 'clinical physical signs on skin eyes hair nails', weight: 0.25, aliases: ['clinical examination', 'physical deficiency signs'] },
                { concept: 'dietary 24 hour recall food frequency questionnaires food records', weight: 0.25, aliases: ['dietary evaluation', 'food intake surveys'] },
              ],
            },
            {
              type: 'theory',
              question: 'Differentiate between Stunting, Wasting, and Underweight in child malnutrition using WHO Z-scores.',
              options: [],
              correctAnswer: 'Using WHO growth standards: Stunting is low Height-for-Age (< -2 Z-scores), reflecting chronic, long-term malnutrition and cumulative growth failure. Wasting is low Weight-for-Height (< -2 Z-scores), reflecting acute, severe, recent nutritional deficit and rapid weight loss (severe acute malnutrition if < -3 Z-scores or MUAC < 11.5 cm). Underweight is low Weight-for-Age (< -2 Z-scores), a composite index reflecting either stunting, wasting, or both.',
              gradingPoints: [
                { concept: 'stunting low height for age chronic long term cumulative malnutrition', weight: 0.35, aliases: ['stunting definition', 'height for age deficit'] },
                { concept: 'wasting low weight for height acute severe recent deficit rapid loss', weight: 0.35, aliases: ['wasting definition', 'weight for height deficit'] },
                { concept: 'underweight low weight for age composite index of both', weight: 0.3, aliases: ['underweight definition', 'weight for age composite'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Mid-Upper Arm Circumference (MUAC) and explain its cut-off categories for screening child malnutrition.',
              options: [],
              correctAnswer: 'MUAC measures the circumference of the left upper arm midway between the olecranon process (elbow) and acromion process (shoulder). It is a rapid, proxy screening tool for mortality risk in children aged 6-59 months. Color-coded cut-offs are: Red (< 11.5 cm indicates Severe Acute Malnutrition SAM, requiring immediate therapeutic feeding); Yellow (11.5 cm to 12.4 cm indicates Moderate Acute Malnutrition MAM); and Green (>= 12.5 cm indicates normal nutritional status).',
              gradingPoints: [
                { concept: 'measures left upper arm circumference midpoint screening tool for children 6 to 59 months', weight: 0.4, aliases: ['muac measurement protocol', 'mid upper arm circumference screening'] },
                { concept: 'red under 11.5 cm sam yellow 11.5 to 12.4 cm mam green 12.5 cm or higher normal', weight: 0.6, aliases: ['muac cut off categories', 'color coded muac thresholds'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the 24-Hour Dietary Recall method and the Automated Multiple-Pass Method (AMPM).',
              options: [],
              correctAnswer: 'A 24-hour dietary recall asks a respondent to remember and report all food and drinks consumed during the preceding 24 hours. The USDA Automated Multiple-Pass Method (AMPM) reduces recall bias through five sequential passes: 1. Quick list (uninterrupted list of all foods consumed); 2. Forgotten foods probe (probing for commonly forgotten snacks, sweets, drinks); 3. Time and occasion (logging eating times and contexts); 4. Detail cycle (detailed descriptions, cooking methods, portion sizes using visual models); and 5. Final review probe.',
              gradingPoints: [
                { concept: 'interview collecting all food and beverage intake over preceding 24 hour day', weight: 0.4, aliases: ['24 hour recall definition', 'dietary intake interview'] },
                { concept: 'ampm five passes quick list forgotten foods time detail review', weight: 0.6, aliases: ['ampm five steps', 'automated multiple pass method'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Food Insecurity and explain the Household Food Insecurity Access Scale (HFIAS).',
              options: [],
              correctAnswer: 'Food insecurity exists when people lack physical, social, or economic access to sufficient, safe, and nutritious food that meets dietary needs for an active, healthy life. The HFIAS is an experience-based survey tool developed by USAID/FANTA that assesses household food insecurity across three universal domains through 9 standard occurrence questions: anxiety and uncertainty about food supply, insufficient quality of food, and insufficient food quantity/intake.',
              gradingPoints: [
                { concept: 'lack of physical social economic access to sufficient safe nutritious food', weight: 0.4, aliases: ['food insecurity definition', 'inadequate food access'] },
                { concept: 'hfias assesses anxiety food quality deficit and food quantity reduction over 9 questions', weight: 0.6, aliases: ['hfias scale domains', 'three household insecurity domains'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Double Burden of Malnutrition in developing countries.',
              options: [],
              correctAnswer: 'The Double Burden of Malnutrition is the coexistence of undernutrition (stunting, wasting, micronutrient deficiencies) alongside overnutrition (overweight, obesity, and diet-related non-communicable diseases like type 2 diabetes and hypertension). This paradox occurs simultaneously at national, community, household (stunted child with overweight mother), and individual levels, driven by rapid urbanization and the dietary transition toward cheap, ultra-processed, calorie-dense foods.',
              gradingPoints: [
                { concept: 'coexistence of undernutrition and overnutrition obesity within same population', weight: 0.5, aliases: ['double burden definition', 'undernutrition alongside obesity'] },
                { concept: 'manifests at community household and individual levels driven by dietary transition', weight: 0.5, aliases: ['manifestation levels', 'household and nutrition transition dynamics'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Community-Based Management of Acute Malnutrition (CMAM) and the role of Ready-to-Use Therapeutic Food (RUTF).',
              options: [],
              correctAnswer: 'CMAM is a decentralized public health model that treats severe acute malnutrition (SAM) predominantly in community outpatient settings rather than crowded hospitals. Children with SAM without medical complications are treated at home with Ready-to-Use Therapeutic Food (RUTF: lipid-based energy-dense peanut paste fortified with micronutrients that requires no cooking or water dilution, preventing waterborne bacterial contamination), reserving inpatient stabilization centers solely for complicated cases.',
              gradingPoints: [
                { concept: 'decentralized outpatient community treatment of sam without medical complications', weight: 0.5, aliases: ['cmam model definition', 'outpatient management of malnutrition'] },
                { concept: 'rutf lipid peanut paste fortified waterless no cooking prevents bacterial infection', weight: 0.5, aliases: ['rutf role characteristics', 'plumpy nut therapeutic paste'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain National Micronutrient Deficiency Control Programs in Nigeria (Vitamin A, Iodine, Iron/Folate).',
              options: [],
              correctAnswer: 'In Nigeria, micronutrient control employs three strategies: 1. Supplementation (semi-annual high-dose Vitamin A capsules given to children 6-59 months during Maternal Newborn and Child Health MNCH weeks; iron-folic acid IFA tablets given to pregnant women at antenatal care); 2. Food Fortification (mandatory fortification of wheat flour, vegetable oil, and sugar with Vitamin A, and salt with Iodine); and 3. Dietary Diversification through nutrition education and homestead gardening.',
              gradingPoints: [
                { concept: 'supplementation vitamin a mnch weeks ifa iron folate antenatal tablets', weight: 0.4, aliases: ['supplementation programs', 'mnch vitamin a and ifa tablets'] },
                { concept: 'mandatory food fortification salt with iodine flour oil sugar with vitamin a dietary diversity', weight: 0.6, aliases: ['fortification and diversification', 'mandatory fortification standards'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe the First 1,000 Days of Life concept and why it represents a critical window of opportunity in public health nutrition.',
              options: [],
              correctAnswer: 'The First 1,000 Days spans from conception through a child second birthday (270 pregnancy days + 365 year one + 365 year two). It represents a critical window because rapid brain development, neural myelination, linear skeletal growth, and metabolic immune programming occur during this period. Nutritional stunting incurred during this window causes irreversible cognitive deficits, reduced school achievement, and lifelong chronic disease risks that cannot be undone later.',
              gradingPoints: [
                { concept: 'period from conception to child second birthday 1000 days', weight: 0.4, aliases: ['first 1000 days timeline', 'conception to 2 years'] },
                { concept: 'rapid brain and linear growth stunting during window causes irreversible cognitive and health damage', weight: 0.6, aliases: ['critical neurodevelopment window', 'irreversible stunting and cognitive deficits'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Participatory Rural Appraisal (PRA) tools used in community nutrition planning.',
              options: [],
              correctAnswer: 'Participatory Rural Appraisal (PRA) enables community members to actively analyze their own nutritional conditions, resources, and priorities. Key PRA tools include: Community Mapping (locating water sources, farmlands, markets), Seasonal Calendars (mapping seasonal hunger gaps and disease outbreaks across months), Transect Walks (observing sanitation and agriculture across the village), and Focus Group Discussions to co-design culturally acceptable community nutrition interventions.',
              gradingPoints: [
                { concept: 'empowers community members to analyze own nutritional problems and resources', weight: 0.4, aliases: ['pra definition', 'participatory community assessment'] },
                { concept: 'community mapping seasonal hunger calendars transect walks focus groups', weight: 0.6, aliases: ['four pra tools', 'mapping seasonal calendars transect walks'] },
              ],
            },
          ],
        },

        // 500 Level
        {
          code: 'NTD 501',
          title: 'Public Health Nutrition & Dietetics Internship',
          level: 500,
          semester: 'harmattan',
          questions: [
            {
              type: 'theory',
              question: 'Explain the Global Nutrition Targets for 2025 endorsed by the World Health Assembly (WHA).',
              options: [],
              correctAnswer: 'The six WHA global nutrition targets are: 1. 40% reduction in the number of children under 5 who are stunted; 2. 50% reduction of anemia in women of reproductive age; 3. 30% reduction in low birth weight; 4. No increase in childhood overweight; 5. Increase the rate of exclusive breastfeeding in the first 6 months up to at least 50%; and 6. Reduce and maintain childhood wasting to less than 5%.',
              gradingPoints: [
                { concept: 'six wha targets stunting anemia low birth weight overweight breastfeeding wasting', weight: 0.7, aliases: ['six global nutrition targets', 'wha 2025 targets'] },
                { concept: 'specific percentage reduction benchmarks 40 percent stunting 50 percent anemia 50 percent breastfeeding', weight: 0.3, aliases: ['target numerical thresholds', 'percentage benchmarks wha'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Infant and Young Child Feeding (IYCF) guidelines: Exclusive Breastfeeding and Complementary Feeding.',
              options: [],
              correctAnswer: 'WHO/UNICEF IYCF guidelines mandate: early initiation of breastfeeding within one hour of birth; Exclusive Breastfeeding (EBF) for the first 6 months of life (no water, liquids, or teas; only breast milk and drops); timely introduction of safe, nutritionally adequate, age-appropriate semi-solid complementary foods at 6 months; and continued breastfeeding alongside complementary foods up to 2 years of age or beyond.',
              gradingPoints: [
                { concept: 'early initiation within 1 hour exclusive breastfeeding for first 6 months with zero water', weight: 0.5, aliases: ['exclusive breastfeeding ebf', 'initiation and 6 months ebf'] },
                { concept: 'timely complementary feeding introduced at 6 months continued breastfeeding to 2 years', weight: 0.5, aliases: ['complementary feeding at 6 months', 'continued breastfeeding to 2 years'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Nutrition Transition (Popkin) and its role in the global surge of non-communicable diseases (NCDs).',
              options: [],
              correctAnswer: 'Barry Popkin Nutrition Transition describes the structural shift in human dietary intake and physical activity patterns associated with economic development and urbanization. Populations transition from traditional, fiber-rich, plant-based diets to diets high in saturated fats, animal protein, refined sugars, and ultra-processed foods, accompanied by sedentary screen-based lifestyles, directly triggering the global epidemic of cardiovascular disease, obesity, and diabetes.',
              gradingPoints: [
                { concept: 'shift from traditional high fiber diets to ultra processed high fat sugar diets', weight: 0.5, aliases: ['nutrition transition popkin', 'dietary shift to processed foods'] },
                { concept: 'coupled with sedentary lifestyles driving surge in obesity type 2 diabetes cardiovascular ncds', weight: 0.5, aliases: ['sedentary shift ncd epidemic', 'drives obesity diabetes and hypertension'] },
              ],
            },
            {
              type: 'theory',
              question: 'What is Biofortification and how does it differ from Commercial Industrial Food Fortification?',
              options: [],
              correctAnswer: 'Commercial industrial fortification adds micronutrients to food vehicles during factory processing (e.g., adding Vitamin A to refined flour or vegetable oil). Biofortification uses conventional selective plant breeding or agronomic biotechnology to increase the nutritional density of staple food crops while they grow in the soil (e.g., Vitamin A-biofortified yellow cassava, orange-fleshed sweet potato, and iron-biofortified pearl millet), reaching remote rural subsistence farmers who buy minimal factory foods.',
              gradingPoints: [
                { concept: 'industrial fortification adds nutrients during factory processing post harvest', weight: 0.4, aliases: ['factory fortification', 'post harvest nutrient addition'] },
                { concept: 'biofortification breeds crops with higher nutrient density in soil reaching rural farmers', weight: 0.6, aliases: ['biofortification definition', 'yellow cassava orange sweet potato breeding'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain Emergency Nutrition interventions: SMART surveys and Cluster Feeding operations during humanitarian crises.',
              options: [],
              correctAnswer: 'During humanitarian crises (conflict, famine), SMART (Standardized Monitoring and Assessment of Relief and Transitions) methodology conducts rapid, standardized population surveys measuring acute malnutrition (GAM and SAM rates) and crude mortality rates to establish crisis severity. Emergency cluster feeding sets up Blanket Supplementary Feeding Programs (BSFP) for vulnerable populations and Targeted Supplementary Feeding (TSFP) alongside inpatient therapeutic care.',
              gradingPoints: [
                { concept: 'smart surveys standardized rapid methodology assessing gam sam and mortality', weight: 0.5, aliases: ['smart methodology in nutrition', 'rapid emergency surveys gam sam'] },
                { concept: 'cluster feeding blanket supplementary targeted supplementary and therapeutic inpatient feeding', weight: 0.5, aliases: ['cluster feeding interventions', 'bsfp and tsfp operations'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Behavioral Change Communication (BCC) strategies for maternal and child nutrition programs.',
              options: [],
              correctAnswer: 'BCC is a strategic interactive process with communities to develop tailored messages and approaches that foster positive nutritional practices. Strategies include: formative research identifying cultural barriers to exclusive breastfeeding, designing community support groups (Mother-to-Mother support groups), interpersonal counselling during antenatal visits, engaging grandmothers and male partners as influencers, and mass media radio dramas promoting diverse complementary feeding.',
              gradingPoints: [
                { concept: 'strategic interactive communication fostering sustained positive nutrition behaviors', weight: 0.4, aliases: ['bcc definition in nutrition', 'social and behavior change sbcc'] },
                { concept: 'mother to mother support groups interpersonal counselling male involvement radio dramas', weight: 0.6, aliases: ['bcc implementation tactics', 'peer groups counselling mass media'] },
              ],
            },
            {
              type: 'theory',
              question: 'What are Ready-to-Use Supplementary Foods (RUSF) and how do they differ from RUTF in nutrition programming?',
              options: [],
              correctAnswer: 'Ready-to-Use Therapeutic Food (RUTF) is an intensive, high-energy, nutrient-dense medical paste specifically formulated to treat Severe Acute Malnutrition (SAM) in children without complications until recovery. Ready-to-Use Supplementary Food (RUSF) is a lipid-based nutrient supplement formulated with lower nutrient concentrations to treat Moderate Acute Malnutrition (MAM) or prevent malnutrition in vulnerable populations during seasonal hunger gaps.',
              gradingPoints: [
                { concept: 'rutf intensive medical paste treating severe acute malnutrition sam', weight: 0.5, aliases: ['rutf for sam treatment', 'therapeutic food for severe malnutrition'] },
                { concept: 'rusf supplementary paste treating moderate acute malnutrition mam preventing decline', weight: 0.5, aliases: ['rusf for mam treatment', 'supplementary food moderate malnutrition'] },
              ],
            },
            {
              type: 'theory',
              question: 'Explain the Scaling Up Nutrition (SUN) movement and its multi-sectoral approach to reducing stunting.',
              options: [],
              correctAnswer: 'The SUN movement is a global multi-stakeholder partnership uniting governments, civil society, donors, and businesses to end malnutrition. Its multi-sectoral approach combines Nutrition-Specific interventions (direct actions: breastfeeding promotion, micronutrient supplementation, SAM treatment) with Nutrition-Sensitive interventions (underlying determinants: agriculture food security, water and sanitation WASH, female education, and social safety nets).',
              gradingPoints: [
                { concept: 'global multi stakeholder movement uniting partners to end malnutrition', weight: 0.4, aliases: ['sun movement definition', 'scaling up nutrition partnership'] },
                { concept: 'combines nutrition specific direct actions with nutrition sensitive wash agriculture education', weight: 0.6, aliases: ['nutrition specific vs nutrition sensitive', 'multi sectoral direct and indirect interventions'] },
              ],
            },
            {
              type: 'theory',
              question: 'Describe Food-Based Dietary Guidelines (FBDGs) and explain the Nigerian Food Guide pyramid.',
              options: [],
              correctAnswer: 'Food-Based Dietary Guidelines (FBDGs) provide science-based, culturally tailored dietary advice expressed in terms of everyday foods rather than abstract nutrients. The Nigerian Food Guide pyramid categorizes foods into consumption tiers: Bread, grains, and tubers at the wide base (eat most); Vegetables and fruits on the second tier (eat liberally); Meat, fish, eggs, dairy, and legumes on the third tier (eat moderately); and Fats, oils, and sweets at the narrow apex (eat least).',
              gradingPoints: [
                { concept: 'science based culturally tailored advice expressed in foods rather than nutrients', weight: 0.4, aliases: ['fbdg definition', 'food based guidelines'] },
                { concept: 'nigerian pyramid grains tubers base vegetables fruits middle animal legumes sweets apex', weight: 0.6, aliases: ['nigerian food pyramid tiers', 'base grains middle vegetables apex fats'] },
              ],
            },
            {
              type: 'theory',
              question: 'Discuss ethical dilemmas encountered by clinical dietitians during end-of-life care and artificial tube feeding withdrawal.',
              options: [],
              correctAnswer: 'In end-of-life palliative care, dietitians face ethical dilemmas balancing Autonomy (respecting patient or surrogate advance directives), Beneficence (desire to provide nourishment), and Non-Maleficence (avoiding harm). In terminal dementia or dying patients, artificial tube feeding does not prolong survival or improve comfort, and often causes fluid overload, aspiration pneumonia, and distress. Ethical practice prioritizes comfort feeding by mouth as tolerated and providing compassionate emotional support.',
              gradingPoints: [
                { concept: 'ethical balancing autonomy beneficence non maleficence advance directives', weight: 0.5, aliases: ['autonomy beneficence non maleficence', 'ethical principles in palliative feeding'] },
                { concept: 'tube feeding in terminal illness causes aspiration overload distress comfort feeding prioritized', weight: 0.5, aliases: ['futility of artificial nutrition', 'comfort feeding over tube feeding'] },
              ],
            },
          ],
        },
        { code: 'NTD 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ];
