// File: frontend/src/data/landingData.ts

import { LivestockCategory, LivestockShowcaseItem, HealthStepPictogram, VetDoctor } from '../types/landing';

export interface CategoryInfo {
  id: LivestockCategory;
  name: string;
  hindiName: string;
  scientificName: string;
  count: number;
  featuredBreeds: string[];
  imageUrl: string;
  soundType: 'cattle' | 'buffalo' | 'goat' | 'poultry';
  audioPrompt: string;
  accentColor: string;
  bgColor: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'Cattle',
    name: 'Cattle (Cow)',
    hindiName: 'गाय / गौवंश',
    scientificName: 'Bos taurus / Bos indicus',
    count: 1420,
    featuredBreeds: ['Gir', 'Sahiwal', 'Holstein-Friesian', 'Rathi', 'Tharparkar'],
    imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    soundType: 'cattle',
    audioPrompt: 'Play Cattle Moo sound & vocalization',
    accentColor: 'emerald',
    bgColor: 'from-emerald-950/40 to-slate-900',
  },
  {
    id: 'Buffalo',
    name: 'Buffalo',
    hindiName: 'भैंस / महिष',
    scientificName: 'Bubalus bubalis',
    count: 890,
    featuredBreeds: ['Murrah', 'Nili-Ravi', 'Jaffarabadi', 'Surti', 'Bhadawari'],
    imageUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    soundType: 'buffalo',
    audioPrompt: 'Play Buffalo Bellow rumble sound',
    accentColor: 'cyan',
    bgColor: 'from-cyan-950/40 to-slate-900',
  },
  {
    id: 'Goat',
    name: 'Goat',
    hindiName: 'बकरी / अजा',
    scientificName: 'Capra hircus',
    count: 2150,
    featuredBreeds: ['Sirohi', 'Barbari', 'Jamnapari', 'Boer', 'Black Bengal'],
    imageUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
    soundType: 'goat',
    audioPrompt: 'Play Goat Bleat sound',
    accentColor: 'amber',
    bgColor: 'from-amber-950/40 to-slate-900',
  },
  {
    id: 'Poultry',
    name: 'Poultry',
    hindiName: 'मुर्गी / कुक्कुट',
    scientificName: 'Gallus gallus domesticus',
    count: 5800,
    featuredBreeds: ['Kadaknath', 'Aseel', 'Rhode Island Red', 'Chabro', 'Broiler Hub'],
    imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    soundType: 'poultry',
    audioPrompt: 'Play Poultry Cluck & Crow sound',
    accentColor: 'rose',
    bgColor: 'from-rose-950/40 to-slate-900',
  },
];

export const SHOWCASE_ITEMS: LivestockShowcaseItem[] = [
  {
    id: 'SHOW-101',
    title: 'Purebred Gir Cow • 2nd Calving Peak Lactation',
    category: 'Cattle',
    breed: 'Gir (Vedic Dairy Line)',
    tagNumber: 'IN-GJ-4402',
    price: 78000,
    originalPrice: 84000,
    negotiable: true,
    age: '3.8 Years',
    weightKg: 430,
    yieldMetric: '18.5 L/day Milk Yield',
    healthStatus: 'CERTIFIED',
    healthScore: 99,
    vaccines: ['FMD Dual (Aug 2026)', 'HS/BQ (May 2026)', 'Lumpy Skin Shield'],
    dewormedDate: '12-Sep-2026',
    vetCertified: true,
    vetName: 'Dr. Rajesh Solanki, MVSc',
    location: 'Junagadh, Gujarat',
    mediaUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'LIVE REEL • 4K',
    reelViews: 4120,
    likes: 382,
    sellerName: 'Somnath Organics & Dairy Farm',
    sellerRating: 4.9,
    sellerPhone: '+91 98251 44021',
    isVerifiedSeller: true,
    description: 'High genetic merit Gir cow with calm temperament, high milk fat (4.8%), gentle hand-milking behavior and complete digital veterinary ledger.',
  },
  {
    id: 'SHOW-102',
    title: 'Murrah Black Gold Buffalo • Certified High Fat Bull Mother',
    category: 'Buffalo',
    breed: 'Murrah Champion Line',
    tagNumber: 'IN-HR-8819',
    price: 115000,
    originalPrice: 125000,
    negotiable: false,
    age: '4.2 Years',
    weightKg: 580,
    yieldMetric: '22.0 L/day (7.4% Fat)',
    healthStatus: 'TOP_PEDIGREE',
    healthScore: 98,
    vaccines: ['FMD Bi-Annual', 'Blackquarter', 'Haemorrhagic Septicaemia'],
    dewormedDate: '28-Aug-2026',
    vetCertified: true,
    vetName: 'Dr. Anita Malik, PhD Animal Genetics',
    location: 'Rohtak, Haryana',
    mediaUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'VIRAL REEL • 1080p',
    reelViews: 8940,
    likes: 819,
    sellerName: 'Choudhary Dairy Stud Farm',
    sellerRating: 5.0,
    sellerPhone: '+91 94160 88190',
    isVerifiedSeller: true,
    description: 'Elite Murrah buffalo with jet black curved horns, broad naval flap, wide pelvic bone and deep chest. Documented 22L daily milk yield.',
  },
  {
    id: 'SHOW-103',
    title: 'Sirohi Breeder Buck & Does Pair • Fast Weight Gain',
    category: 'Goat',
    breed: 'Sirohi Pureline',
    tagNumber: 'IN-RJ-3105',
    price: 24500,
    originalPrice: 28000,
    negotiable: true,
    age: '14 Months',
    weightKg: 62,
    yieldMetric: 'Daily Gain: 180g/day',
    healthStatus: 'VACCINATED',
    healthScore: 96,
    vaccines: ['PPR Vaccine (Annual)', 'Enterotoxaemia (ET)', 'Goat Pox'],
    dewormedDate: '05-Oct-2026',
    vetCertified: true,
    vetName: 'Dr. Vikram Rathore, B.V.Sc',
    location: 'Ajmer, Rajasthan',
    mediaUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'HD CLIP • ACTIVE',
    reelViews: 3290,
    likes: 244,
    sellerName: 'Aravalli Goat Herd Station',
    sellerRating: 4.8,
    sellerPhone: '+91 98290 31055',
    isVerifiedSeller: true,
    description: 'Distinctive brown coat with light patches, pendulous ears, and vigorous foraging vigor. Ideal for semi-intensive commercial meat herds.',
  },
  {
    id: 'SHOW-104',
    title: 'Original Kadaknath Organic Breeder Flock (10+2 Cock & Hens)',
    category: 'Poultry',
    breed: 'Kadaknath (Black Meat GI)',
    tagNumber: 'IN-MP-6012',
    price: 11200,
    originalPrice: 13500,
    negotiable: false,
    age: '6 Months (Point of Lay)',
    weightKg: 18,
    yieldMetric: 'High Melanin & Iron Rich',
    healthStatus: 'CERTIFIED',
    healthScore: 97,
    vaccines: ['Marek’s Disease', 'Ranikhet (ND F1 + R2B)', 'Infectious Bursal (IBD)'],
    dewormedDate: '15-Sep-2026',
    vetCertified: true,
    vetName: 'Dr. Sunita Patel, MVSc Avian Path',
    location: 'Jhabua, Madhya Pradesh',
    mediaUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'FARM REEL • VERIFIED',
    reelViews: 5410,
    likes: 612,
    sellerName: 'Jhabua Tribal Agri Cooperative',
    sellerRating: 4.9,
    sellerPhone: '+91 97550 60123',
    isVerifiedSeller: true,
    description: 'Authentic jet black plumage, beak, tongue, meat and bone marrow. Raised on organic open foraging and herbal feeding regimen.',
  },
  {
    id: 'SHOW-105',
    title: 'Holstein-Friesian Cross • 1st Lactation Heifer With Calf',
    category: 'Cattle',
    breed: 'HF Cross (F1 Commercial)',
    tagNumber: 'IN-PB-7721',
    price: 89000,
    originalPrice: 95000,
    negotiable: true,
    age: '2.9 Years',
    weightKg: 495,
    yieldMetric: '24.5 L/day Milk Yield',
    healthStatus: 'PREGNANT_VERIFIED',
    healthScore: 97,
    vaccines: ['FMD Bi-Annual', 'Brucellosis Screened Negative', 'Theileriosis'],
    dewormedDate: '20-Sep-2026',
    vetCertified: true,
    vetName: 'Dr. Gurpreet Singh, MVSc',
    location: 'Ludhiana, Punjab',
    mediaUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'LIVE REEL • PRO',
    reelViews: 6730,
    likes: 520,
    sellerName: 'Golden Fields Dairy Farm',
    sellerRating: 4.9,
    sellerPhone: '+91 98765 77210',
    isVerifiedSeller: true,
    description: 'High-yielding HF Cross with well-balanced square udder, prominent milk veins and strong teats. Complete lactation record included.',
  },
  {
    id: 'SHOW-106',
    title: 'Barbari Dairy & Meat Goats • Stall-Fed Docile Breed Trio',
    category: 'Goat',
    breed: 'Barbari City-Friendly',
    tagNumber: 'IN-UP-1194',
    price: 21000,
    originalPrice: 23500,
    negotiable: true,
    age: '11 Months',
    weightKg: 42,
    yieldMetric: 'Prolific: Twin Births 80%',
    healthStatus: 'CERTIFIED',
    healthScore: 99,
    vaccines: ['PPR Vaccine (Valid till 2029)', 'ET', 'FMD'],
    dewormedDate: '01-Oct-2026',
    vetCertified: true,
    vetName: 'Dr. Amit Tripathi, B.V.Sc',
    location: 'Mathura, Uttar Pradesh',
    mediaUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=900&q=85',
    reelBadge: 'REEL • 60 FPS',
    reelViews: 4320,
    likes: 310,
    sellerName: 'Brijwasi Caprine Farm',
    sellerRating: 4.7,
    sellerPhone: '+91 94120 11944',
    isVerifiedSeller: true,
    description: 'Compact size with spotted coat and erect ears. Best breed for zero-grazing stall feeding systems with high prolificacy.',
  },
];

export const HEALTH_STEP_PICTOGRAMS: HealthStepPictogram[] = [
  {
    stepNumber: 1,
    title: 'Daily Vital Check & Temperature',
    subtitle: 'Rumen movement & muzzle moisture',
    pictogramEmoji: '🌡️',
    iconName: 'Thermometer',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
    summary: 'Monitor rectal temperature (101.5°F - 102.5°F) every dawn before morning feeding.',
    keyMetric: 'Normal: 38.5°C - 39.2°C (101.5 - 102.5°F)',
    detailedPoints: [
      'Observe rumen motility: 2 to 3 strong rumen contractions every 2 minutes in left paralumbar fossa.',
      'Check muzzle: Moist with clear droplets indicates healthy hydration; dry cracked muzzle indicates fever/pain.',
      'Eye and gum mucous membranes: Should be salmon-pink, not pale porcelain (anemia/parasites) or congested red.',
    ],
    dos: [
      'Take temperature at the exact same hour daily',
      'Disinfect thermometer probe with alcohol between animals',
      'Log records into Livestock Ledger app immediately'
    ],
    donts: [
      'Do not evaluate temperature right after intense exercise or direct mid-day sun',
      'Never ignore sudden drops below 100°F (hypothermia/milk fever warning)'
    ]
  },
  {
    stepNumber: 2,
    title: 'Balanced Ration & Clean Hydration',
    subtitle: 'TMR, dry matter & mineral lick',
    pictogramEmoji: '🌾',
    iconName: 'Droplets',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    summary: 'Provide 10% body weight green fodder, 2% dry roughage, and fresh cool water ad-libitum.',
    keyMetric: 'Water: 60-100 Liters / head / day',
    detailedPoints: [
      'Total Mixed Ration (TMR): Blend legume fodder (berseem/lucerne) with non-legume (maize/sorghum) silage.',
      'Mineral mixture fortification: 50g chelated mineral mix + 30g iodized salt per adult milch animal daily.',
      'Fresh trough water: Water troughs must be shaded and scrubbed clean 3 times weekly to avoid biofilm.',
    ],
    dos: [
      'Gradually introduce any new feed changes over 7 to 10 days',
      'Provide dedicated salt/mineral lick blocks in the pen',
      'Check feed for musty mold or aflatoxin contamination before pouring'
    ],
    donts: [
      'Never feed damp or fermented urea-treated straw past recommended safety limits',
      'Do not allow stagnant water pools near feeding mangers'
    ]
  },
  {
    stepNumber: 3,
    title: 'Stall Biosecurity & Sanitization',
    subtitle: 'Lime dusting & tick control',
    pictogramEmoji: '🧼',
    iconName: 'ShieldCheck',
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
    summary: 'Dust floor with slaked lime and run footbaths at entrance to block pathogen transmission.',
    keyMetric: 'Disinfect Sheds Weekly • 4% Sodium Carbonate',
    detailedPoints: [
      'Shed entry footbath: 2% potassium permanganate or caustic soda solution changed every 48 hours.',
      'Floor hygiene: Clean dung channels every 4 hours; spread slaked lime powder (calcium hydroxide) weekly.',
      'Ectoparasite eradication: Regular Flumethrin/Deltamethrin wash or pour-on solutions for tick & fly control.',
    ],
    dos: [
      'Keep manure heaps at least 50 meters away from main milking and housing sheds',
      'Ensure cross-ventilation to remove ammonia fumes and dampness',
      'Sterilize milking cluster cups between each milking cycle'
    ],
    donts: [
      'Never allow unauthorized outside vehicles or footwear inside calving pens',
      'Do not leave puddles of stagnant urine in concrete cracks'
    ]
  },
  {
    stepNumber: 4,
    title: 'Immunization & Strategic Deworming',
    subtitle: 'FMD, HS/BQ, Brucellosis & PPR schedule',
    pictogramEmoji: '💉',
    iconName: 'Syringe',
    color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400',
    summary: 'Maintain 100% herd coverage against seasonal epizootics with ear-tag verified certificates.',
    keyMetric: 'Bi-Annual FMD & Rotational Deworming',
    detailedPoints: [
      'Foot-and-Mouth Disease (FMD): Administer polyvalent inactivated vaccine twice yearly (pre-monsoon & autumn).',
      'Haemorrhagic Septicaemia (HS) & Blackquarter (BQ): Vaccinate combined before the onset of monsoon rains.',
      'Rotational deworming: Rotate anthelmintic classes (Albendazole -> Ivermectin -> Oxyclozanide) to stop drug resistance.',
    ],
    dos: [
      'Maintain uninterrupted cold chain (+2°C to +8°C) until syringe aspiration',
      'Record every dose with batch number and expiration date in herd telemetry',
      'Deworm dams 3 weeks before calving and 3 weeks postpartum'
    ],
    donts: [
      'Never vaccinate an animal running a fever or in acute distress',
      'Do not reuse disposable needle tips between different animals'
    ]
  },
  {
    stepNumber: 5,
    title: 'Quarantine & Rapid Isolation',
    subtitle: '7-day new arrival observation bay',
    pictogramEmoji: '🛡️',
    iconName: 'AlertOctagon',
    color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
    summary: 'Isolate incoming purchases for 21 days; immediately triage any animal showing signs of illness.',
    keyMetric: '21-Day Strict Quarantine Buffer',
    detailedPoints: [
      'Dedicated isolation shed: Located minimum 30 meters downwind from the main herd population.',
      'Daily PCR / serological screening for Brucellosis, Tuberculosis (TB), and Johne’s Disease (JD).',
      'Separate handlers or designated boots/clothing when tending to quarantined animals.',
    ],
    dos: [
      'Monitor feed intake and stool consistency twice daily during quarantine',
      'Trigger Emergency Helpline alert if 2 or more animals show blister lesions or salivation'
    ],
    donts: [
      'Never mix newly purchased cattle directly into the milking herd on day 1',
      'Do not use shared water buckets across healthy and isolated pens'
    ]
  }
];

export const VET_DOCTORS_ROSTER: VetDoctor[] = [
  {
    id: 'VET-01',
    name: 'Dr. Anandvardhan Rao',
    qualification: 'MVSc (Veterinary Surgery & Gynaecology)',
    specialty: 'Bovine Reproduction & Dystocia Emergency',
    experienceYears: 14,
    rating: 4.95,
    reviewsCount: 312,
    availability: 'ONLINE_NOW',
    phone: '+91 98200 12345',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    distanceKm: 4.2
  },
  {
    id: 'VET-02',
    name: 'Dr. Priya Nambiar',
    qualification: 'PhD (Veterinary Medicine & Epidemiology)',
    specialty: 'Infectious Disease Control & Ruminant Nutrition',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 245,
    availability: 'ONLINE_NOW',
    phone: '+91 98450 67890',
    imageUrl: 'https://images.unsplash.com/photo-1594824813571-638f02614d3f?auto=format&fit=crop&w=300&q=80',
    distanceKm: 7.8
  },
  {
    id: 'VET-03',
    name: 'Dr. Harvinder K. Mann',
    qualification: 'MVSc (Animal Genetics & Breeding)',
    specialty: 'High-Fat Dairy Pedigree & AI Specialist',
    experienceYears: 18,
    rating: 4.98,
    reviewsCount: 520,
    availability: 'ON_CALL',
    phone: '+91 94170 33445',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    distanceKm: 12.0
  }
];

export const RUNNING_TICKER_ITEMS = [
  { type: 'PRICE', text: '🐄 Gir Cattle Avg: ₹78,500/head (+2.3% this week)' },
  { type: 'ALERT', text: '🟢 FMD Pre-Monsoon Booster Drive active across Sector 4 & 5' },
  { type: 'PRICE', text: '🐃 Murrah Buffalo (18L+ yield): ₹1,12,000/head steady demand' },
  { type: 'VET', text: '🩺 24/7 Mobile Veterinary Rapid Response Unit #4 on active patrol' },
  { type: 'PRICE', text: '🐐 Sirohi & Barbari Breeding Bucks: ₹18,000 - ₹26,000' },
  { type: 'WEATHER', text: '☀️ High Heat Index Forecast: Ensure water troughs remain shaded & electrolyte balanced' },
  { type: 'PRICE', text: '🐔 Kadaknath GI Chicks: ₹120/chick • Free range batch available' },
  { type: 'NOTICE', text: '🛡️ Blockchain-verified health passports enabled for all interstate transport' },
];
