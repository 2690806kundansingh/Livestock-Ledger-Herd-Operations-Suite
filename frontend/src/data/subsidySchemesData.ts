// File: frontend/src/data/subsidySchemesData.ts

import { SpeciesType } from '../types/farm2Acre';

export interface GovtSchemeDetail {
  id: string;
  schemeCode: string;
  name: string;
  hindiName: string;
  nodalMinistry: string;
  targetSpecies: SpeciesType[];
  maxSubsidyPercentage: string;
  maxSubsidyAmount: string;
  eligibleBeneficiaries: string[];
  bannerImage: string;
  overview: string;
  eligibleComponents: string[];
  mandatoryDocuments: string[];
  applicationSteps: { stepNumber: number; title: string; instruction: string }[];
  nodalPortalUrl: string;
  officialHelpline: string;
}

export interface BankableDPRPreset {
  species: SpeciesType;
  unitScale: string;
  title: string;
  hindiTitle: string;
  shedCivilCost: number;
  animalStockCost: number;
  equipmentCost: number;
  feedReserveCost: number;
  insuranceMedicalCost: number;
  totalProjectCost: number;
  subsidyPercentage: number;
  subsidyAmount: number;
  farmerMarginPercentage: number;
  farmerMarginAmount: number;
  bankLoanAmount: number;
  annualGrossRevenue: number;
  annualOperatingCost: number;
  annualNetCashFlow: number;
  dscrRatio: string;
  paybackPeriodMonths: number;
  technicalAssumptions: string[];
}

export const GOVT_SCHEMES_LIST: GovtSchemeDetail[] = [
  {
    id: 'nabard-dairy',
    schemeCode: 'DEDS / NABARD',
    name: 'NABARD Dairy Entrepreneurship Development Scheme',
    hindiName: 'नाबार्ड डेयरी उद्यमिता विकास योजना',
    nodalMinistry: 'Department of Animal Husbandry and Dairying (DAHD) / NABARD',
    targetSpecies: ['cow'],
    maxSubsidyPercentage: '25% to 33.33%',
    maxSubsidyAmount: 'Up to ₹2.50 Lakhs (General) / ₹3.33 Lakhs (SC/ST/Women) per 10-animal unit',
    eligibleBeneficiaries: [
      'Individual Farmers & Agricultural Entrepreneurs',
      'Self Help Groups (SHGs) & Farmer Producer Organizations (FPOs)',
      'Dairy Cooperative Societies & Milk Unions',
    ],
    bannerImage: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Provides capital subsidy back-ended assistance through commercial and rural banks to establish modern crossbred or indigenous dairy farms with rubber mats, automatic milking machines, and chilling tanks.',
    eligibleComponents: [
      'Establishment of small dairy units from 2 to 10 crossbred/indigenous cows (Gir, Sahiwal, HF cross)',
      'Heifer calf rearing units up to 20 calves',
      'Purchase of milking machines, milk testers, and bulk milk coolers (BMCs)',
      'Establishment of private veterinary clinic or artificial insemination mobile unit',
    ],
    mandatoryDocuments: [
      'Aadhaar Card & PAN Card of applicant',
      'Proof of Land Title (7/12 Extract / Khasra-Khatauni / Registered Lease Agreement min 10 years)',
      'Detailed Project Report (DPR) prepared by bank empanelled veterinary/livestock consultant',
      'Bank Account Statement (last 6 months) with clean CIBIL score (>650)',
      'Quotation for livestock, shed building materials, and equipment from certified vendors',
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'DPR Preparation', instruction: 'Prepare a bankable Detailed Project Report with 5-year financial cash flow using our 1-click generator.' },
      { stepNumber: 2, title: 'Bank Submission', instruction: 'Submit the DPR along with land documents to your nearest commercial bank (SBI, PNB, BoB, or Regional Rural Bank).' },
      { stepNumber: 3, title: 'Sanction & NABARD Claim', instruction: 'Bank inspects site and sanctions 75% term loan; bank uploads subsidy claim to the NABARD ENSURE portal.' },
      { stepNumber: 4, title: 'Subsidy Reserve Fund Account', instruction: 'Subsidy is released directly by NABARD into the borrower’s Subsidy Reserve Fund Account (SRFA).' },
    ],
    nodalPortalUrl: 'https://www.nabard.org',
    officialHelpline: '1800-222-099 (NABARD Toll-Free)',
  },
  {
    id: 'nlm-goat-sheep',
    schemeCode: 'NLM-EDG',
    name: 'National Livestock Mission (NLM) — Goat & Sheep Breeding Scheme',
    hindiName: 'राष्ट्रीय पशुधन मिशन (NLM) — बकरी एवं भेड़ पालन',
    nodalMinistry: 'Ministry of Fisheries, Animal Husbandry & Dairying (Gol)',
    targetSpecies: ['goat'],
    maxSubsidyPercentage: '50% Capital Subsidy',
    maxSubsidyAmount: 'Up to ₹50 Lakhs for 500+25 Unit / ₹10 Lakhs for 100+5 Unit',
    eligibleBeneficiaries: [
      'Individual Rural Farmers & Educated Youth',
      'Section 8 Companies & Farmer Producer Organizations (FPOs)',
      'Joint Liability Groups (JLGs) & Cooperatives',
    ],
    bannerImage: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Offers a massive 50% direct capital subsidy to establish state-of-the-art goat breeding farms with elevated machan housing, slatted timber floors, fodder silage bunkers, and certified pedigree bucks.',
    eligibleComponents: [
      'Breeding unit construction (Elevated stilt machans, kid nurseries, quarantine pens)',
      'Purchase of 100 Does + 5 Certified Pedigree Bucks (Beetal, Sirohi, Barbari, Jamunapari)',
      'Solar fencing, feed storage godown, and automated lopping racks',
      '1 Year animal health and mortality insurance premium subsidy',
    ],
    mandatoryDocuments: [
      'Applicant KYC (Aadhaar, Voter ID, PAN)',
      'Land ownership proof (min 1 Acre for 100 goats; min 3 Acres for 500 goats)',
      'Training Certificate in Goat Husbandry from ICAR / Krishi Vigyan Kendra (KVK)',
      'Net Worth Certificate & 3-year ITR or Bank Statement',
      'Water availability certificate (Borewell test / Canal connection)',
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Online Portal Registration', instruction: 'Register on the National Livestock Mission online portal (nlm.udyamimitra.in) using your mobile and Aadhaar.' },
      { stepNumber: 2, title: 'Upload DPR & Loan In-Principle', instruction: 'Upload technical Detailed Project Report along with bank loan in-principle sanction letter.' },
      { stepNumber: 3, title: 'State Level Executive Committee (SLEC)', instruction: 'State Animal Husbandry Department inspects land and recommends the project to Gol Committee.' },
      { stepNumber: 4, title: 'Two-Tranche Direct Disbursement', instruction: 'Subsidy disbursed in two equal installments directly to bank account as physical milestones complete.' },
    ],
    nodalPortalUrl: 'https://nlm.udyamimitra.in',
    officialHelpline: '011-2338-3843 (NLM Control Room)',
  },
  {
    id: 'pmmsy-fisheries',
    schemeCode: 'PMMSY-AQUA',
    name: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY) — Freshwater Ponds',
    hindiName: 'प्रधानमंत्री मत्स्य संपदा योजना (PMMSY) — तालाब मत्स्य पालन',
    nodalMinistry: 'Department of Fisheries, Ministry of Fisheries, Animal Husbandry & Dairying',
    targetSpecies: ['fish'],
    maxSubsidyPercentage: '40% (General) / 60% (Women, SC, ST)',
    maxSubsidyAmount: 'Up to ₹4.20 Lakhs per Hectare for new pond construction and inputs',
    eligibleBeneficiaries: [
      'Fishers, Fish Farmers & Fish Workers',
      'Fish Farmer Producer Organizations (FFPOs)',
      'Self Help Groups (SHGs) with rural water bodies or private land',
    ],
    bannerImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Flags comprehensive funding for freshwater earthen pond excavation, solar paddlewheel aerators, high-quality fingerling stocking, biofloc units, and recirculating aquaculture systems (RAS).',
    eligibleComponents: [
      'Construction of new earthen ponds with clay dykes and inlet/outlet sluices (₹7.0 Lakhs/Ha unit cost)',
      'Input cost for 1st crop: 32% protein extruded floating pellets, fingerlings, lime, and organic manure (₹4.0 Lakhs/Ha)',
      'Installation of solar-powered floating paddlewheel aerators (₹50,000 unit cost)',
      'Live fish transport motorized insulated two-wheelers and ice boxes',
    ],
    mandatoryDocuments: [
      'Aadhaar Card and Land Records (Ownership / 10-Year Water Rights Lease)',
      'Soil and Water Test Report from recognized government or ICAR laboratory (checking pH 7.0–8.0 and soil clay content >20%)',
      'Bank Account details with Aadhaar seeding',
      'Detailed Technical Feasibility Report showing fingerling stocking ratio (Catla/Rohu/Mrigal)',
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'District Fisheries Office (DFO)', instruction: 'Submit proposal to District Fisheries Officer (DFO) or apply online via the PMMSY state fisheries portal.' },
      { stepNumber: 2, title: 'District Level Committee (DLC)', instruction: 'District Magistrate-chaired committee approves technical feasibility and land suitability.' },
      { stepNumber: 3, title: 'Pond Excavation Geo-Tagging', instruction: 'Pond excavation is physically geo-tagged by fisheries department officers before water filling.' },
      { stepNumber: 4, title: 'Direct Benefit Transfer (DBT)', instruction: 'Subsidy amount credited via DBT directly to bank account based on physical progress.' },
    ],
    nodalPortalUrl: 'https://pmmsy.dof.gov.in',
    officialHelpline: '1800-423-1634 (Fisheries Kisan Call Center)',
  },
  {
    id: 'nlm-piggery',
    schemeCode: 'NLM-PIG',
    name: 'National Livestock Mission (NLM) — Commercial Piggery Scheme',
    hindiName: 'राष्ट्रीय पशुधन मिशन — व्यावसायिक सुअर पालन फार्म',
    nodalMinistry: 'Department of Animal Husbandry and Dairying (DAHD)',
    targetSpecies: ['pig'],
    maxSubsidyPercentage: '50% Capital Subsidy',
    maxSubsidyAmount: 'Up to ₹30 Lakhs for 100 Sows + 10 Boars / ₹6 Lakhs for 20 Sows + 2 Boars',
    eligibleBeneficiaries: [
      'Individual Piggery Farmers & Entrepreneurs',
      'Self Help Groups (SHGs) and Cooperatives',
      'Private Breeders in North-Eastern & Central States',
    ],
    bannerImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Provides high-value capital assistance for setting up scientific pig breeding and fattening farms equipped with farrowing crates, cast-iron & plastic slats, bite-action water nipples, and biogas digesters.',
    eligibleComponents: [
      'Concrete pens with 1:30 slope, creep heating boxes, and farrowing crates with piglet anti-crush rails',
      'Purchase of certified Large White Yorkshire, Landrace, or Duroc breeding stock',
      'Automated high-pressure water washing systems and direct biogas manure lines',
      'Feed grinder, mixer, and pelleting machinery unit',
    ],
    mandatoryDocuments: [
      'Aadhaar, PAN, and Voter ID',
      'Land revenue document showing clear demarcation at least 200m away from human settlements',
      'NOC from local Gram Panchayat or Municipal Authority',
      'Bank Loan In-Principle Sanction Letter',
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on NLM Portal', instruction: 'Create profile on nlm.udyamimitra.in under the Piggery Entrepreneurship track.' },
      { stepNumber: 2, title: 'Bank Appraisal', instruction: 'Lending bank conducts credit evaluation and issues in-principle approval.' },
      { stepNumber: 3, title: 'SLEC Scrutiny', instruction: 'State-Level Executive Committee reviews environmental safety and biogas connectivity.' },
      { stepNumber: 4, title: 'Phased Disbursement', instruction: '50% capital subsidy released in two milestone-based installments.' },
    ],
    nodalPortalUrl: 'https://nlm.udyamimitra.in',
    officialHelpline: '011-2338-3843',
  },
  {
    id: 'ahidf-infrastructure',
    schemeCode: 'AHIDF-GOI',
    name: 'Animal Husbandry Infrastructure Development Fund (AHIDF)',
    hindiName: 'पशुपालन अवसंरचना विकास कोष (AHIDF)',
    nodalMinistry: 'Ministry of Fisheries, Animal Husbandry & Dairying (Gol)',
    targetSpecies: ['cow', 'goat', 'hen', 'pig'],
    maxSubsidyPercentage: '3% Interest Subvention + up to 90% Bank Loan',
    maxSubsidyAmount: 'Interest subvention of 3% for 8 years + Credit Guarantee up to 25%',
    eligibleBeneficiaries: [
      'Dairy & Meat Processing Units',
      'Animal Feed Plants & Total Mixed Ration (TMR) Facilities',
      'Silage Baling & Green Fodder Processing Enterprises',
    ],
    bannerImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Government fund of ₹15,000 Crores providing massive 90% bank loan backing with 3% interest discount for setting up processing plants, silage baling units, and cold storage chains.',
    eligibleComponents: [
      'Silage making, baling, and commercial fodder processing units',
      'Milk chilling centers, ghee processing, and paneer manufacturing units',
      'Meat packaging, cold storage, and cold chain logistics vehicles',
      'Poultry meat and modern layer egg grading and packaging lines',
    ],
    mandatoryDocuments: [
      'Company/FPO/Proprietorship registration certificate',
      'Detailed Project Report (DPR) with financial IRR >15%',
      'Environmental NOC / Pollution Control Board consent',
      'Bank sanction letter for 90% capital expenditure',
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Portal Application', instruction: 'Submit project DPR online via ahidf.udyamimitra.in.' },
      { stepNumber: 2, title: 'Scheduled Bank Loan', instruction: 'Preferred scheduled bank sanctions loan up to 90% of total outlay.' },
      { stepNumber: 3, title: 'DAHD Approval', instruction: 'Ministry evaluates value-addition potential and approves 3% interest discount.' },
      { stepNumber: 4, title: 'Interest Reimbursement', instruction: 'Interest subsidy credited directly to borrower’s loan account on quarterly basis.' },
    ],
    nodalPortalUrl: 'https://ahidf.udyamimitra.in',
    officialHelpline: '1800-180-1551 (AHIDF Portal Support)',
  },
];

export const BANKABLE_DPR_PRESETS: Record<SpeciesType, BankableDPRPreset> = {
  cow: {
    species: 'cow',
    unitScale: '10 Crossbred / Indigenous Dairy Cows (Gir / Sahiwal)',
    title: '10-Cow Commercial Dairy & Rubber Matting Project',
    hindiTitle: '10 दुधारू गायों की आधुनिक डेयरी परियोजना (DPR)',
    shedCivilCost: 220000,
    animalStockCost: 650000,
    equipmentCost: 85000,
    feedReserveCost: 120000,
    insuranceMedicalCost: 35000,
    totalProjectCost: 1110000,
    subsidyPercentage: 25,
    subsidyAmount: 277500,
    farmerMarginPercentage: 15,
    farmerMarginAmount: 166500,
    bankLoanAmount: 666000,
    annualGrossRevenue: 840000,
    annualOperatingCost: 480000,
    annualNetCashFlow: 360000,
    dscrRatio: '2.15 (High Bankability)',
    paybackPeriodMonths: 22,
    technicalAssumptions: [
      'Average milk yield: 14 Liters/day per cow over 300 days lactation cycle.',
      'Farm-gate milk sales price: ₹45/Liter (minimum 4.0% Fat & 8.5% SNF baseline).',
      'Green fodder produced on 1.0 Acre leased land using cow dung bio-slurry as sole fertilizer.',
      'Rubber matting reduces clinical mastitis cases to near zero, saving ₹15,000 annually in veterinary bills.',
      'Calf heifer valuation and dung manure sales generate supplementary ₹60,000 annual cash flow.',
    ],
  },
  goat: {
    species: 'goat',
    unitScale: '50 Does + 3 Certified Pedigree Bucks (Barbari / Sirohi)',
    title: '50+3 Elevated Machan Goat Breeding & Fattening Unit',
    hindiTitle: '50+3 उन्नत मचान बकरी पालन विस्तृत परियोजना (DPR)',
    shedCivilCost: 175000,
    animalStockCost: 450000,
    equipmentCost: 45000,
    feedReserveCost: 80000,
    insuranceMedicalCost: 25000,
    totalProjectCost: 775000,
    subsidyPercentage: 50,
    subsidyAmount: 387500,
    farmerMarginPercentage: 10,
    farmerMarginAmount: 77500,
    bankLoanAmount: 310000,
    annualGrossRevenue: 490000,
    annualOperatingCost: 190000,
    annualNetCashFlow: 300000,
    dscrRatio: '2.40 (Exceptional)',
    paybackPeriodMonths: 13,
    technicalAssumptions: [
      'Average kidding rate: 1.8 kids per doe per year with twinning genetics.',
      'Total kids produced annually: 80-90 kids, fattened to 30 kg live weight in 8 months.',
      'Sale price: ₹380 per kg live weight for breeding/Eid festival market.',
      'Elevated slatted machan eliminates worm parasitic re-infestation, keeping kid mortality under 5%.',
      'Goat pellets mixed with Azolla and tree loppings (Subabul/Sesbania) save 40% on commercial feed.',
    ],
  },
  fish: {
    species: 'fish',
    unitScale: '0.5 Acre Earthen Pond (Poly-Culture 3,200 Fingerlings)',
    title: '0.5 Acre Semi-Intensive Freshwater Aquaculture Farm',
    hindiTitle: '0.5 एकड़ मीठे पानी का तालाब मत्स्य पालन (DPR)',
    shedCivilCost: 140000, // Pond excavation & dykes
    animalStockCost: 25000,  // Fingerlings Catla/Rohu/Mrigal
    equipmentCost: 55000,   // Solar paddlewheel aerator
    feedReserveCost: 110000, // 32% Floating pellets
    insuranceMedicalCost: 15000,
    totalProjectCost: 345000,
    subsidyPercentage: 40,
    subsidyAmount: 138000,
    farmerMarginPercentage: 10,
    farmerMarginAmount: 34500,
    bankLoanAmount: 172500,
    annualGrossRevenue: 380000,
    annualOperatingCost: 150000,
    annualNetCashFlow: 230000,
    dscrRatio: '2.25 (Very Safe)',
    paybackPeriodMonths: 9,
    technicalAssumptions: [
      'Stocking density: 3,200 fingerlings of 100mm size in Catla:Rohu:Mrigal ratio (40:35:25).',
      'Harvest survival rate: 85% yielding ~2,700 marketable fish averaging 900g to 1.1kg.',
      'Farm-gate wholesale price: ₹140 to ₹160 per kg live fish.',
      'Solar paddlewheel aeration maintains dissolved oxygen >6 mg/L, accelerating growth by 30%.',
      'Biogas slurry water manuring promotes rich zooplankton blooms, cutting feed pellet expenses by 45%.',
    ],
  },
  hen: {
    species: 'hen',
    unitScale: '500 Free-Range Country Poultry (Kadaknath / Sonali)',
    title: '500-Bird Semi-Open Free-Range Desi Poultry Project',
    hindiTitle: '500 देशी मुर्गी पालन व प्राकृतिक अंडा उत्पादन (DPR)',
    shedCivilCost: 85000,
    animalStockCost: 35000,
    equipmentCost: 28000,
    feedReserveCost: 65000,
    insuranceMedicalCost: 12000,
    totalProjectCost: 225000,
    subsidyPercentage: 25,
    subsidyAmount: 56250,
    farmerMarginPercentage: 15,
    farmerMarginAmount: 33750,
    bankLoanAmount: 135000,
    annualGrossRevenue: 340000,
    annualOperatingCost: 145000,
    annualNetCashFlow: 195000,
    dscrRatio: '2.10 (Strong)',
    paybackPeriodMonths: 8,
    technicalAssumptions: [
      'Dual-purpose free-range desi birds produce 140-160 brown eggs per year each.',
      'Free-range brown desi eggs sell at premium farm-gate rate of ₹12 to ₹15 per egg.',
      'Surplus male cockerels sold at 5-6 months age for meat at ₹350 to ₹450 per bird.',
      'Pasture foraging on insects, moringa leaves, and azolla cuts feed grain consumption by 35%.',
      'Rice husk deep-litter bedding keeps coop warm and dry, preventing ammonia respiratory issues.',
    ],
  },
  pig: {
    species: 'pig',
    unitScale: '15 Fattening Piglets / 3 Sows + 1 Boar Breeding Unit',
    title: 'High-Conversion Yorkshire Piggery & Biogas Unit',
    hindiTitle: 'व्यावसायिक सुअर पालन एवं बायोगैस संयत्र (DPR)',
    shedCivilCost: 160000,
    animalStockCost: 110000,
    equipmentCost: 38000,
    feedReserveCost: 95000,
    insuranceMedicalCost: 18000,
    totalProjectCost: 421000,
    subsidyPercentage: 50,
    subsidyAmount: 210500,
    farmerMarginPercentage: 10,
    farmerMarginAmount: 42100,
    bankLoanAmount: 168400,
    annualGrossRevenue: 410000,
    annualOperatingCost: 175000,
    annualNetCashFlow: 235000,
    dscrRatio: '2.30 (High Margin)',
    paybackPeriodMonths: 11,
    technicalAssumptions: [
      'Fast biological food conversion (FCR 3.0:1); piglets reach 90 kg live weight in 7 months.',
      'Live weight sale price: ₹190 to ₹220 per kg at farm gate.',
      'Cast-iron slats and automated bite nipples maintain sanitary pens with zero standing water.',
      'Dung flushed directly into 25 m³ biogas digester generates continuous domestic cooking gas.',
      'Vegetable mandi surplus waste + wheat bran mash cuts commercial pellet feed cost by 50%.',
    ],
  },
};
