// src/seed/faculties/frnr.ts
import type { SeedFaculty } from '../types.js';

export const frnrFaculty: SeedFaculty = {
  facultyName: 'Faculty of Renewable Natural Resources',
  code: 'FRNR',
  departments: [
    {
      deptName: 'Forest Resource Management',
      code: 'FRM',
      courses: [
        // 100 Level
        {
          code: 'FRM 101',
          title: 'Introduction to Forest Resources',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is silviculture in forestry?', options: ['The mining of silver minerals', 'The art and science of controlling the establishment, growth, composition, health, and quality of forests', 'The manufacturing of paper furniture', 'The hunting of wild animals'], correctAnswer: 'The art and science of controlling the establishment, growth, composition, health, and quality of forests' },
            { type: 'cbt', question: 'What vital ecological role do tropical rainforests play in global climate regulation?', options: ['Acting as major carbon sinks through photosynthesis', 'Reflecting 100% of solar radiation', 'Depleting atmospheric oxygen', 'Preventing groundwater recharge'], correctAnswer: 'Acting as major carbon sinks through photosynthesis' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'MTH 101', title: 'Elementary Mathematics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'FRM 201',
          title: 'Silviculture & Dendrology',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is dendrology?', options: ['The study of ocean currents', 'The botanical identification and systematic study of trees and woody plants', 'The carbon dating of dinosaur bones', 'The chemical analysis of soil pH'], correctAnswer: 'The botanical identification and systematic study of trees and woody plants' },
            { type: 'cbt', question: 'What is standard Diameter at Breast Height (DBH) measurement height in forest mensuration?', options: ['0.5 meters above ground', '1.3 meters (4.5 feet) above ground', '2.5 meters above ground', '3.0 meters above ground'], correctAnswer: '1.3 meters (4.5 feet) above ground' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'FRM 301', title: 'Forest Mensuration & Inventory', level: 300, semester: 'harmattan', questions: [] },
        { code: 'FRM 399', title: 'SIWES Practical Field Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'FRM 401', title: 'Wood Science & Forest Economics', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'FRM 501', title: 'Forest Policy, Law & Agroforestry Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'FRM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Wildlife and Ecotourism Management',
      code: 'WEM',
      courses: [
        // 100 Level
        {
          code: 'WEM 101',
          title: 'Introduction to Wildlife Management',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What constitutes the wildlife habitat triad essential for animal survival?', options: ['Food, Water, and Cover/Shelter', 'Cages, Lights, and Heaters', 'Fences, Gates, and Guards', 'Roads, Trails, and Signs'], correctAnswer: 'Food, Water, and Cover/Shelter' },
            { type: 'cbt', question: 'What is the IUCN Red List used for globally?', options: ['Listing prohibited hunting weapons', 'Assessing the global extinction risk and conservation status of biological species', 'Recording revenue from national park tickets', 'Certifying zoo animal breeders'], correctAnswer: 'Assessing the global extinction risk and conservation status of biological species' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'WEM 201',
          title: 'Wildlife Ecology and Habitats',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is the carrying capacity (K) of a wildlife habitat?', options: ['The maximum number of tourists allowed per vehicle', 'The maximum population size of a species that the environment can sustain indefinitely', 'The physical weight of animal cages', 'The total area of a national park'], correctAnswer: 'The maximum population size of a species that the environment can sustain indefinitely' },
            { type: 'cbt', question: 'What is a keystone species in ecology?', options: ['The most numerous species in an ecosystem', 'A species that has a disproportionately large effect on its natural environment relative to its abundance', 'Any newly introduced exotic species', 'Species raised exclusively in captivity'], correctAnswer: 'A species that has a disproportionately large effect on its natural environment relative to its abundance' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'WEM 301', title: 'Ecotourism Principles & Protected Area Management', level: 300, semester: 'harmattan', questions: [] },
        { code: 'WEM 399', title: 'SIWES Practical Field Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'WEM 401', title: 'Wildlife Population Dynamics & Conservation', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'WEM 501', title: 'Park Planning & Wildlife Enterprise Management', level: 500, semester: 'harmattan', questions: [] },
        { code: 'WEM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
    {
      deptName: 'Aquaculture and Fisheries Management',
      code: 'AFM',
      courses: [
        // 100 Level
        {
          code: 'AFM 101',
          title: 'Introduction to Fisheries & Aquatic Sciences',
          level: 100,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What is aquaculture?', options: ['Ocean mineral extraction', 'The breeding, rearing, and harvesting of fish, shellfish, and aquatic plants in controlled aquatic environments', 'Commercial deep-sea ship manufacturing', 'Water bottling for human consumption'], correctAnswer: 'The breeding, rearing, and harvesting of fish, shellfish, and aquatic plants in controlled aquatic environments' },
            { type: 'cbt', question: 'Which species is the most widely cultivated commercial catfish in Nigerian aquaculture?', options: ['Clarias gariepinus (African Sharptooth Catfish)', 'Salmo salar (Atlantic Salmon)', 'Gadus morhua (Atlantic Cod)', 'Thunnus thynnus (Bluefin Tuna)'], correctAnswer: 'Clarias gariepinus (African Sharptooth Catfish)' },
          ],
        },
        { code: 'BIO 101', title: 'General Biology I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'CHM 101', title: 'General Chemistry I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'PHY 101', title: 'General Physics I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'GST 111', title: 'Communication in English I', level: 100, semester: 'harmattan', questions: [] },
        { code: 'LIB 101', title: 'Use of Library and Study Skills', level: 100, semester: 'harmattan', questions: [] },

        { code: 'BIO 102', title: 'General Biology II', level: 100, semester: 'rain', questions: [] },
        { code: 'CHM 102', title: 'General Chemistry II', level: 100, semester: 'rain', questions: [] },
        { code: 'GST 121', title: 'Use of English II & Logic', level: 100, semester: 'rain', questions: [] },

        // 200 Level
        {
          code: 'AFM 201',
          title: 'Fish Biology, Anatomy and Taxonomy',
          level: 200,
          semester: 'harmattan',
          questions: [
            { type: 'cbt', question: 'What primary organ do fish utilize for dissolved oxygen respiration in water?', options: ['Lungs', 'Gills', 'Spiracles', 'Tracheae'], correctAnswer: 'Gills' },
            { type: 'cbt', question: 'What critical water quality parameter must be continuously maintained above 4-5 mg/L for healthy warm-water fish ponds?', options: ['Dissolved Oxygen (DO)', 'Salinity level', 'Water hardness', 'Turbidity'], correctAnswer: 'Dissolved Oxygen (DO)' },
          ],
        },
        { code: 'GST 201', title: 'Entrepreneurship Studies I', level: 200, semester: 'rain', questions: [] },

        // 300 Level
        { code: 'AFM 301', title: 'Aquaculture Systems & Fish Nutrition', level: 300, semester: 'harmattan', questions: [] },
        { code: 'AFM 399', title: 'SIWES Practical Field Training', level: 300, semester: 'rain', questions: [] },

        // 400 Level
        { code: 'AFM 401', title: 'Fish Health Management & Water Quality Analysis', level: 400, semester: 'harmattan', questions: [] },

        // 500 Level
        { code: 'AFM 501', title: 'Fisheries Economics, Extension & Post-Harvest Technology', level: 500, semester: 'harmattan', questions: [] },
        { code: 'AFM 599', title: 'B.Tech. Final Year Project II', level: 500, semester: 'rain', questions: [] },
      ],
    },
  ],
};
