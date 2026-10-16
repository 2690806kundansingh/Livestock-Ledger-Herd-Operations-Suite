// File: frontend/src/pages/FarmStarterPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarmVoice } from '../utils/speechVoice';
import {
  ArrowRight,
  BookOpen,
  Volume2,
  VolumeX,
  PhoneCall,
  CheckCircle2,
  Calculator,
  AlertTriangle,
  Clock,
  FileText,
  Sparkles,
  Check,
  Send,
  Layers,
  PlusCircle,
} from 'lucide-react';
import { SpeciesType } from '../types/farm2Acre';
import { MultiImageInstructionGallery } from '../components/MultiImageInstructionGallery';

interface FarmStarterPageProps {
  onSelectSpecies?: (species: SpeciesType) => void;
  onOpenCallVet?: () => void;
  onOpenRegister?: () => void;
}

interface SpeciesGuideDetail {
  species: SpeciesType;
  name: string;
  hindiName: string;
  tagline: string;
  photo: string;
  recommendedStarterScale: string;
  minLandRequired: string;
  coveredSpacePerAnimal: string;
  openRunPerAnimal: string;
  recommendedBreeds: { breed: string; reason: string }[];
  approxInitialCapital: string;
  estimatedMonthlyProfit: string;
  paybackPeriod: string;
  subsidyAvailable: string;
  dailyRoutine: { time: string; task: string }[];
  first30DaysMilestones: { day: string; task: string; tip: string }[];
  keyEquipment: string[];
}

export const FarmStarterPage: React.FC<FarmStarterPageProps> = ({
  onSelectSpecies,
  onOpenCallVet,
  onOpenRegister,
}) => {
  const navigate = useNavigate();
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  // Active species tab for deep-dive guide
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType>('cow');

  // Interactive Checklist states
  const [checkedMilestones, setCheckedMilestones] = useState<{ [key: string]: boolean }>({});

  // Calculator states
  const [calcSpecies, setCalcSpecies] = useState<SpeciesType>('cow');
  const [calcHeadcount, setCalcHeadcount] = useState<number>(10);
  const [calcLandAcres, setCalcLandAcres] = useState<number>(1.0);

  // Consultation modal / form state
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState<boolean>(false);
  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultLocation, setConsultLocation] = useState<string>('');
  const [consultLandSize, setConsultLandSize] = useState<string>('1.0 Acre');
  const [consultTargetSpecies, setConsultTargetSpecies] = useState<string>('Gir Dairy Cattle');
  const [consultSuccessMessage, setConsultSuccessMessage] = useState<string | null>(null);

  const toggleMilestone = (key: string) => {
    setCheckedMilestones((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const introAudioSpeech =
    'Welcome to the Farm Starter Service. Here is your step by step incubation blueprint to launch a profitable domestic livestock holding. Explore land zoning, shed construction, breed selection, feeding setup, and government subsidies.';

  // Universal 6-Step Setup Roadmap
  const universalSteps = [
    {
      step: 1,
      title: 'Land Evaluation & Zoning Layout',
      timeline: 'Days 1 to 15',
      summary: 'Conduct water TDS and soil testing, secure perimeter fencing, and orient the shed east-to-west.',
      photo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80',
      actions: [
        'Water Testing: Ensure Total Dissolved Solids (TDS) is under 1,000 ppm and pH is between 6.5 and 8.0.',
        'Shed Orientation: Align long axis East-to-West to avoid harsh direct afternoon sunlight and catch prevailing summer winds.',
        'Slope & Drainage: Grade land with a 1:40 gradient away from the shed toward the central manure pit or biogas digester.',
        'Perimeter Bio-Fence: Plant thorny subabul or cactus along boundary wire to prevent feral dogs and wild boars.',
      ],
      proTip: 'Never build a livestock shed in a depression where rainwater collects. High ground with natural drainage saves lakhs in foot rot treatments.',
    },
    {
      step: 2,
      title: 'Ventilated Shed & Floor Construction',
      timeline: 'Days 16 to 45',
      summary: 'Build high-roof open-ridge structures with durable non-slip flooring suited to your chosen animal species.',
      photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=700&q=80',
      actions: [
        'Cattle & Pigs: Grooved concrete floor with 1.5-inch slope toward dung gutter; roof height minimum 12-14 feet at ridge.',
        'Goats: Elevated wooden slatted flooring 1.5 meters above ground to allow urine and pellets to drop through clean.',
        'Poultry: Deep-litter floor with 3 to 4 inches of dry rice husk or groundnut shells under wire-mesh side walls.',
        'Mangers & Drinkers: Curved ceramic or polished cement feed troughs with continuous automated water float nipples.',
      ],
      proTip: 'Open ridge vents at the roof peak allow hot ammonia gas to escape continuously through natural convection.',
    },
    {
      step: 3,
      title: 'Fodder Plots & Silage Establishment',
      timeline: 'Days 30 to 60 (Prior to Herd Arrival)',
      summary: 'Plant high-yielding green fodder 60 days before animals arrive so fresh feed is ready on Day 1.',
      photo: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
      actions: [
        'Super Napier / CO-5: Plant stem cuttings along pond bunds and open plots; first cut ready in 65 days with 150 tonnes/acre/year.',
        'Silage Pit Bunker: Excavate a 15x8x6 ft trench silo with plastic lining to preserve 30 tonnes of corn fodder for drought periods.',
        'Dry Fodder Store: Build an elevated, rainproof dry store for chopped wheat straw and paddy straw bales.',
        'Azolla Cultivation: Set up two 10x4 ft polythene shadow pits to harvest 2 kg of high-protein azolla fern daily.',
      ],
      proTip: 'The number one reason first-time livestock farms fail is lack of green fodder. Never bring animals to the farm until your fodder is knee-high.',
    },
    {
      step: 4,
      title: 'Certified Breed Procurement & Quarantine',
      timeline: 'Days 61 to 75',
      summary: 'Source genetically verified, vaccinated stock from certified government or private breeding farms with 21-day quarantine.',
      photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=700&q=80',
      actions: [
        'Physical Health Check: Clear eyes, alert stance, moist muzzle, clean tail, and symmetrical udder/teats without scar tissue.',
        '12-Digit RFID Ear-Tagging: Verify official INAPH/Bharat Pashudhan identification tag and complete vaccination booklet.',
        'Quarantine Bay (21 Days): Keep newly purchased animals strictly isolated in a separate shed 100 meters from main pens.',
        'Preventative Regimen: Broad-spectrum deworming on Day 2, mineral mixture integration, and booster vaccinations on Day 14.',
      ],
      proTip: 'Never buy pregnant cattle in the 9th month of gestation for long road transport; transport stress triggers premature calving and uterine infections.',
    },
    {
      step: 5,
      title: 'Closed-Loop Bio-Waste & Biogas Setup',
      timeline: 'Days 70 to 85',
      summary: 'Direct manure into anaerobic digesters to generate free cooking/heating methane and nutrient-rich organic bio-slurry.',
      photo: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=700&q=80',
      actions: [
        '25 m³ Fixed-Dome Biogas: Connect cow and pig dung gutters with 4-inch PVC pipes directly into the digester inlet mixing tank.',
        'Slurry Drying Beds: Run effluent from digester outlet into brick-lined drying beds to yield dry odourless organic manure.',
        'Vermicompost Beds: Layer slurry with dry leaves and Eisenia fetida earthworms to produce premium vermicompost in 45 days.',
        'Fish Pond Loop: Channel 5% diluted bio-slurry into freshwater pond to stimulate zooplankton blooms without buying commercial feed.',
      ],
      proTip: 'Biogas eliminates 100% of farm cooking gas costs and slurry replaces 70% of chemical fertilizer needed for fodder plots.',
    },
    {
      step: 6,
      title: 'Subsidies, Licenses & Financial Auditing',
      timeline: 'Days 80 to 90',
      summary: 'Apply for NABARD subsidies, Pashu Kisan Credit Card, panchayat permits, and start digital bookkeeping.',
      photo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
      actions: [
        'Pashu Kisan Credit Card (PKCC): Get up to ₹3,00,000 credit limit at subsidized 4% interest rate for working capital.',
        'NABARD / AHIDF Subsidy: Claim 25% (general) or 33.3% (SC/ST/Women/Hill States) capital subsidy on shed and equipment.',
        'Local NOC & Veterinary Inspection: Obtain village panchayat NOC and register with District Veterinary Officer for free seasonal vaccines.',
        'Digital Registry Onboarding: Log every animal, ear-tag, birthdate, and daily feed ration inside this Livestock Ledger Suite.',
      ],
      proTip: 'Apply for the bank sanction letter BEFORE starting shed construction, as many government subsidies require pre-sanction inspection.',
    },
  ];

  // Species-Specific Deep-Dive Guides
  const speciesGuides: { [key in SpeciesType]: SpeciesGuideDetail } = {
    cow: {
      species: 'cow',
      name: 'Gir & Sahiwal Dairy Cattle',
      hindiName: 'डेयरी गौशाला फार्म',
      tagline: 'High-fat A2 milk production with long lactation cycles and maximum organic dung yield.',
      photo: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
      recommendedStarterScale: '6 to 10 Milking Cows + 2 Calves',
      minLandRequired: '1.0 to 1.5 Acres (0.75 Acre dedicated for Super Napier fodder)',
      coveredSpacePerAnimal: '45 to 55 Sq. Ft. covered shed',
      openRunPerAnimal: '80 to 100 Sq. Ft. open paddock',
      recommendedBreeds: [
        { breed: 'Sahiwal', reason: 'Hardy indigenous breed, ticks resistant, gives 12-18 L/day of 4.5% fat milk.' },
        { breed: 'Gir', reason: 'High heat endurance, gentle temperament, gives 14-20 L/day, strong A2 market value.' },
        { breed: 'HF Cross (50-62%)', reason: 'Ideal for temperate zones with 20-25 L/day yield, requires cooling fans in summer.' },
      ],
      approxInitialCapital: '₹6,50,000 – ₹9,00,000 (10 Cows @ ₹65k each + ₹2L Shed + ₹50k Fodder prep)',
      estimatedMonthlyProfit: '₹45,000 – ₹72,000 Net (from milk @ ₹45/L + dung/slurry)',
      paybackPeriod: '16 to 20 Months',
      subsidyAvailable: '25% to 33.33% through National Dairy Development Board & NABARD DEDS',
      dailyRoutine: [
        { time: '05:00 AM', task: 'Pre-milking udder wash with potassium permanganate solution, teat wipe, milking.' },
        { time: '06:30 AM', task: 'Feed fresh green fodder (15 kg) + balanced dairy concentrate mash (2 kg).' },
        { time: '10:00 AM', task: 'Manger cleanout, fresh drinking water check, body brushing for parasite inspection.' },
        { time: '01:00 PM', task: 'Afternoon dry wheat straw fiber ration (4 kg) + shade relaxation.' },
        { time: '04:30 PM', task: 'Second milking session with teat dipping in iodophor antiseptic.' },
        { time: '06:00 PM', task: 'Evening green fodder (10 kg) + concentrate mash (2 kg) + mineral mixture (50g).' },
        { time: '08:00 PM', task: 'Night water trough refill and shed inspection.' },
      ],
      first30DaysMilestones: [
        { day: 'Day 1–3', task: 'Incoming quarantine isolation; administer electrolyte water and dry straw only for 24 hrs.', tip: 'Do not feed heavy concentrate mash on day 1 to prevent acidosis.' },
        { day: 'Day 4–7', task: 'Gradual transition from dry straw to green Napier grass (start 5 kg, step up daily).', tip: 'Mix dry straw to ensure rumen rumination stays active.' },
        { day: 'Day 8', task: 'Broad-spectrum deworming (Albendazole or Ivermectin oral suspension).', tip: 'Deworm early morning on empty stomach.' },
        { day: 'Day 15', task: 'California Mastitis Test (CMT) on all milking quarters.', tip: 'Discard milk with high somatic cell count.' },
        { day: 'Day 21', task: 'Transfer from quarantine to main herd barn; RFID ear tags logged into system.', tip: 'Introduce animals in daylight to prevent territorial head-butting.' },
        { day: 'Day 30', task: 'First 30-day milk yield record analysis and individual cow ration calibration.', tip: 'Adjust feed: 1 kg extra concentrate per 2.5 L milk above maintenance.' },
      ],
      keyEquipment: [
        'Chaff cutter machine (2 HP motor)',
        'Stainless steel 304 milk transport cans (20 L)',
        'Teat dip cups & California Mastitis Test paddle',
        'Rubber cow mats (25mm high density) for hoof health',
        'Electronic milk fat testing analyzer',
      ],
    },
    goat: {
      species: 'goat',
      name: 'Sirohi & Barbari Elevated Goats',
      hindiName: 'उन्नत बकरी पालन फार्म',
      tagline: 'Fast reproduction, low water footprint, premium meat value, and twin/triplet kidding.',
      photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
      recommendedStarterScale: '20 Does (Females) + 1 Purebred Buck (Male) (20+1 Unit)',
      minLandRequired: '0.5 Acre (0.35 Acre for Moringa & Subabul tree plantation)',
      coveredSpacePerAnimal: '12 to 15 Sq. Ft. elevated floor',
      openRunPerAnimal: '20 to 25 Sq. Ft. exercise paddock',
      recommendedBreeds: [
        { breed: 'Sirohi', reason: 'Native to dry zones, rapid weight gain, excellent stall-feeding adaptability.' },
        { breed: 'Barbari', reason: 'Compact size, very high twinning rate (70%), delivers kid crop every 8 months.' },
        { breed: 'Beetal / Jamunapari', reason: 'Dual purpose milk (2-3 L) and heavy meat frames; ideal for North India.' },
      ],
      approxInitialCapital: '₹2,60,000 – ₹3,60,000 (20 Does @ ₹8k + 1 Buck @ ₹15k + Elevated Shed ₹80k)',
      estimatedMonthlyProfit: '₹28,000 – ₹42,000 Net (annualized from live weight sales @ ₹380-450/kg)',
      paybackPeriod: '12 to 14 Months',
      subsidyAvailable: '25% - 33% capital subsidy under National Livestock Mission (NLM)',
      dailyRoutine: [
        { time: '06:00 AM', task: 'Sweep elevated slatted floor; collect dry droppings (goat pellets) for vermicompost.' },
        { time: '07:30 AM', task: 'Feed chopped green fodder + fresh tree loppings (Moringa/Subabul) (2.5 kg/head).' },
        { time: '11:00 AM', task: 'Clean trough watering with added mineral salt licks.' },
        { time: '01:00 PM', task: 'Release herd into open exercise yard for natural movement and sunbathing.' },
        { time: '04:00 PM', task: 'Concentrate goat pellet ration (250g per adult doe, 400g for breeding buck).' },
        { time: '06:30 PM', task: 'Herding back into elevated predator-proof night shelter; lock doors securely.' },
      ],
      first30DaysMilestones: [
        { day: 'Day 1–3', task: 'Arrival in quarantine pen; administer anti-stress electrolyte vitamins in water.', tip: 'Inspect hooves immediately for foot rot or ticks.' },
        { day: 'Day 5', task: 'Enterotoxemia (ET) vaccination to prevent Sudden Pulpy Kidney disease.', tip: 'Must be given prior to feeding lush greens.' },
        { day: 'Day 12', task: 'PPR (Peste des Petits Ruminants / Goat Plague) vaccination.', tip: 'Provides 3-year immunity.' },
        { day: 'Day 18', task: 'Hoof trimming using curved shears to prevent bacterial accumulation.', tip: 'Trim parallel to the sole lines.' },
        { day: 'Day 24', task: 'Ear tagging and body weight indexing into herd registry.', tip: 'Identify top performers for future breeding pool.' },
        { day: 'Day 30', task: 'Integrate buck with breeding does following reproductive schedule.', tip: 'Maintain 1 buck for maximum 25 does to avoid buck exhaustion.' },
      ],
      keyEquipment: [
        'Wooden slatted floor modules (1.5m height)',
        'Curved goat hoof trimming shears',
        'Hanging mineral block holders',
        'Digital hanging weight scale (100 kg capacity)',
        'Automatic goat ball-valve drinking nipples',
      ],
    },
    fish: {
      species: 'fish',
      name: 'Freshwater Rohu & Catla Poly-Aquaculture',
      hindiName: 'मीठे पानी की मछली पालन',
      tagline: 'Multi-depth poly-culture converting organic farm nutrients into high-protein fish biomass.',
      photo: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
      recommendedStarterScale: '0.5 Acre Earthen Pond (3,000 to 4,000 Fingerlings)',
      minLandRequired: '0.5 Acre water surface (depth 1.5 to 1.8 meters)',
      coveredSpacePerAnimal: 'Water volume: 3,000 m³ for 3,000 fingerlings',
      openRunPerAnimal: 'Full water column (surface, column, bottom zones)',
      recommendedBreeds: [
        { breed: 'Catla (Surface)', reason: 'Consumes surface zooplankton, grows to 1.2 kg in 10 months.' },
        { breed: 'Rohu (Column)', reason: 'Feeds on middle-depth phytoplankton, premium market price in all Indian states.' },
        { breed: 'Mrigal / Grass Carp (Bottom)', reason: 'Feeds on bottom detritus and aquatic vegetation, keeping pond floor clean.' },
      ],
      approxInitialCapital: '₹1,90,000 – ₹2,80,000 (Pond excavation ₹90k + Fingerlings ₹20k + Solar aerator ₹60k)',
      estimatedMonthlyProfit: '₹25,000 – ₹38,000 Net (annual harvest 3,200 kg @ ₹140-180/kg)',
      paybackPeriod: '10 to 12 Months',
      subsidyAvailable: '40% (General) to 60% (Women/SC/ST) under PM Matsya Sampada Yojana (PMMSY)',
      dailyRoutine: [
        { time: '06:00 AM', task: 'Early morning pond surface visual inspection; check if fish are gasping for air.' },
        { time: '07:30 AM', task: 'Activate solar paddlewheel aerator for 2 hours to replenish Dissolved Oxygen (DO).' },
        { time: '09:00 AM', task: 'First floating pellet feed broadcast (1.5% of body biomass) across 4 feeding corners.' },
        { time: '02:00 PM', task: 'Water transparency Secchi disc reading (optimal: 30 to 40 cm visibility).' },
        { time: '05:00 PM', task: 'Second feeding session with supplemented rice bran & mustard oil cake mash.' },
        { time: '08:00 PM', task: 'Night aeration cycle check and inlet filter mesh debris clearance.' },
      ],
      first30DaysMilestones: [
        { day: 'Day 1–7', task: 'Pond dry-out and agricultural lime application (200 kg lime per 0.5 acre) to disinfect soil.', tip: 'Sun-dry pond bottom until cracks appear.' },
        { day: 'Day 8–14', task: 'Fill pond with fresh borewell water to 1.5m depth; let settle for 48 hours.', tip: 'Use fine wire mesh on inlet to keep wild predatory fish out.' },
        { day: 'Day 15', task: 'Primary fertilization: add 300 kg cured cow dung slurry to bloom natural plankton.', tip: 'Water should develop a light green tint.' },
        { day: 'Day 22', task: 'Acclimatize fingerling oxygenated transport bags floating in pond for 45 minutes.', tip: 'Never dump fingerlings immediately; equalize water temperature first.' },
        { day: 'Day 25', task: 'Begin supplementary feeding with 1mm starter sinking pellets.', tip: 'Feed at fixed timings every day.' },
        { day: 'Day 30', task: 'Sample net cast to measure weight gain and verify 95%+ survival rate.', tip: 'Weigh 20 fish to compute total pond biomass.' },
      ],
      keyEquipment: [
        '1 HP Solar paddlewheel pond aerator',
        'Water testing kit (Dissolved Oxygen, pH, Ammonia, Alkalinity)',
        'Secchi transparency disc',
        'Cast net and soft-mesh handling net',
        'Borewell water flow pipe with 80-mesh filter sock',
      ],
    },
    hen: {
      species: 'hen',
      name: 'Kadaknath & Country Free-Range Poultry',
      hindiName: 'मुक्त-चारा देशी मुर्गी पालन',
      tagline: 'High disease resistance, premium black meat prices, daily brown eggs, and natural pest grazing.',
      photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      recommendedStarterScale: '150 to 250 Birds (130 Layers + 20 Cockerels)',
      minLandRequired: '0.25 to 0.5 Acre (0.3 Acre fenced foraging pasture)',
      coveredSpacePerAnimal: '1.5 to 2.0 Sq. Ft. indoor night shelter',
      openRunPerAnimal: '8 to 12 Sq. Ft. predator-proof foraging yard',
      recommendedBreeds: [
        { breed: 'Kadaknath (Madhya Pradesh)', reason: 'Pure black meat (high protein, low cholesterol), sells for ₹700-1000/kg.' },
        { breed: 'Aseel / Country Cross', reason: 'Supreme disease immunity, aggressive predator evasion, delicious meat texture.' },
        { breed: 'Rhode Island Red (RIR)', reason: 'Outstanding brown egg layer producing 220-250 eggs/year on backyard forage.' },
      ],
      approxInitialCapital: '₹75,000 – ₹1,20,000 (200 Chicks @ ₹50 + Wire mesh shed ₹40k + Feeders ₹10k)',
      estimatedMonthlyProfit: '₹18,000 – ₹30,000 Net (from eggs @ ₹12-15/egg + culled birds)',
      paybackPeriod: '8 to 10 Months',
      subsidyAvailable: 'Small poultry incubation grant up to 25% under State Backyard Poultry Schemes',
      dailyRoutine: [
        { time: '06:00 AM', task: 'Open coop hatches; release flock into fenced outdoor foraging pasture.' },
        { time: '07:30 AM', task: 'Collect morning fresh brown eggs from dark 4-tier nesting boxes.' },
        { time: '09:00 AM', task: 'Clean water drinkers; replenish with vitamin C & mineral enriched water.' },
        { time: '12:00 PM', task: 'Feed fresh green azolla fern (1 kg/50 birds) + crushed corn grains.' },
        { time: '04:00 PM', task: 'Second egg collection round; check for broody hens and separate them.' },
        { time: '06:30 PM', task: 'Sound buzzer/feeder call; herd all birds into secure night shelter; latch padlock.' },
      ],
      first30DaysMilestones: [
        { day: 'Day 1', task: 'Chicks arrive; place in warm brooder (95°F temperature with infrared heat bulb).', tip: 'Provide 10% jaggery/glucose water for initial 12 hours.' },
        { day: 'Day 3', task: 'Marek’s Disease subcutaneous injection (usually done at hatchery).', tip: 'Verify hatchery certificate.' },
        { day: 'Day 7', task: 'Ranikhet / Newcastle Disease (F1 / Lasota strain) eye drop vaccination.', tip: 'One drop per chick in the left eye.' },
        { day: 'Day 14', task: 'Gumboro (Infectious Bursal Disease - IBD) eye drop vaccine.', tip: 'Do not withhold water before vaccination.' },
        { day: 'Day 21', task: 'Gradually lower brooder heat; transition from chick starter mash to grower crumbs.', tip: 'Reduce temperature by 5°F each week.' },
        { day: 'Day 30', task: 'First supervised outdoor foraging release for 2 hours in the morning.', tip: 'Ensure wire netting has zero holes larger than 1 inch.' },
      ],
      keyEquipment: [
        'Infrared chick brooding heating lamps',
        'Automatic bell drinkers with anti-drown rims',
        'Galvanized circular hanging feed hoppers (8 kg)',
        '4-Tier wooden dark laying nest boxes with rice husk bedding',
        'Solar predator scare strobe lights for nocturnal foxes and cats',
      ],
    },
    pig: {
      species: 'pig',
      name: 'Large White Yorkshire Piggery',
      hindiName: 'व्यावसायिक सूअर पालन फार्म',
      tagline: 'Fastest biological food-to-meat conversion ratio, 10-12 piglets per farrowing, biogas linked.',
      photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      recommendedStarterScale: '3 Sows + 1 Boar (Breeding Unit) or 15 Fattening Piglets',
      minLandRequired: '0.25 to 0.5 Acre (connected to 25 m³ biogas digester)',
      coveredSpacePerAnimal: '25 to 30 Sq. Ft. covered concrete pen',
      openRunPerAnimal: '30 to 40 Sq. Ft. exercise and wallow run',
      recommendedBreeds: [
        { breed: 'Large White Yorkshire', reason: 'Global standard for lean bacon, docile, rapid growth reaching 90 kg in 7 months.' },
        { breed: 'Landrace', reason: 'Exceptional maternal farrowing instinct, long carcass length, high milk yield for piglets.' },
        { breed: 'Duroc (Terminal Sire)', reason: 'High muscle marbling, fast feed conversion, rugged constitution.' },
      ],
      approxInitialCapital: '₹1,80,000 – ₹2,60,000 (4 Breeders @ ₹12k + Concrete shed ₹1.1L + Biogas drain ₹25k)',
      estimatedMonthlyProfit: '₹32,000 – ₹48,000 Net (annualized batch sales @ ₹180-220/kg live weight)',
      paybackPeriod: '11 to 14 Months',
      subsidyAvailable: '25% - 33.3% subsidy under National Livestock Mission (NLM Piggery Scheme)',
      dailyRoutine: [
        { time: '06:00 AM', task: 'High-pressure water pen washdown; flush dung directly into biogas digester inlet.' },
        { time: '07:30 AM', task: 'Feed cooked hotel/vegetable waste mash mixed with wheat bran & mineral premix.' },
        { time: '10:30 AM', task: 'Check automatic bite-action water nipples; verify water pressure is steady.' },
        { time: '01:00 PM', task: 'Turn on water sprinkler / fill cooling wallow bath to prevent heat stress.' },
        { time: '04:30 PM', task: 'Evening concentrate pellet feed (1.5 kg per growing piglet, 2.5 kg for nursing sow).' },
        { time: '06:30 PM', task: 'Final dry bedding inspection in farrowing creep area for nursing piglets.' },
      ],
      first30DaysMilestones: [
        { day: 'Day 1–3', task: 'Pen disinfection with 2% caustic soda wash prior to weaner piglet arrival.', tip: 'Let pens dry completely before stocking.' },
        { day: 'Day 4', task: 'Arrival of 60-day-old weaned piglets (12–15 kg weight); provide lukewarm glucose water.', tip: 'Keep pen temperature at 75°F.' },
        { day: 'Day 8', task: 'Iron dextran injection (if not administered at birth) to prevent piglet anemia.', tip: 'Administer behind the ear.' },
        { day: 'Day 15', task: 'Classical Swine Fever (CSF) tissue culture vaccine.', tip: 'Mandatory annual immunization.' },
        { day: 'Day 22', task: 'Broad-spectrum deworming with Ivermectin injection or Fenbendazole feed mix.', tip: 'Eliminates internal roundworms.' },
        { day: 'Day 30', task: 'Weighing & grouping into size-matched pens to avoid bullying and feed competition.', tip: 'Keep maximum 8-10 pigs per fattening pen.' },
      ],
      keyEquipment: [
        'Stainless steel bite-action water nipples (1/2 inch thread)',
        'Creep heating box with infrared bulb for baby piglets',
        'Farrowing crate with piglet safety anti-crush guard rails',
        'Heavy-duty platform dial weight scale (200 kg capacity)',
        'High-pressure water washing hose with brass spray nozzle',
      ],
    },
  };

  // Calculator Logic
  const calculateBudget = () => {
    let baseShedPerHead = 12000;
    let baseStockPerHead = 65000;
    let base90DayFeed = 14000;
    let baseMonthlyRevenue = 6500;

    if (calcSpecies === 'goat') {
      baseShedPerHead = 3500;
      baseStockPerHead = 8500;
      base90DayFeed = 2200;
      baseMonthlyRevenue = 1500;
    } else if (calcSpecies === 'fish') {
      baseShedPerHead = 25; // Pond cost per fingerling
      baseStockPerHead = 6;
      base90DayFeed = 18;
      baseMonthlyRevenue = 14;
    } else if (calcSpecies === 'hen') {
      baseShedPerHead = 200;
      baseStockPerHead = 60;
      base90DayFeed = 150;
      baseMonthlyRevenue = 120;
    } else if (calcSpecies === 'pig') {
      baseShedPerHead = 7000;
      baseStockPerHead = 6000;
      base90DayFeed = 4500;
      baseMonthlyRevenue = 3200;
    }

    const shedCost = Math.round(baseShedPerHead * calcHeadcount);
    const stockCost = Math.round(baseStockPerHead * calcHeadcount);
    const feedBufferCost = Math.round(base90DayFeed * calcHeadcount);
    const bioSetupCost = 45000; // Standard biogas or composting facility

    const totalGrossCapital = shedCost + stockCost + feedBufferCost + bioSetupCost;
    const estSubsidy = Math.round(totalGrossCapital * 0.25); // 25% NABARD baseline
    const netFarmerOutlay = totalGrossCapital - estSubsidy;
    const estMonthlyGrossProfit = Math.round(baseMonthlyRevenue * calcHeadcount);
    const paybackMonths = Math.max(8, Math.round(netFarmerOutlay / (estMonthlyGrossProfit || 1)));

    return {
      shedCost,
      stockCost,
      feedBufferCost,
      bioSetupCost,
      totalGrossCapital,
      estSubsidy,
      netFarmerOutlay,
      estMonthlyGrossProfit,
      paybackMonths,
    };
  };

  const budget = calculateBudget();

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;

    // Simulate advisory application registration
    setConsultSuccessMessage(
      `Congratulations ${consultName}! Your New Farm Setup Consultation has been booked. A Senior Livestock Advisor will call ${consultPhone} within 24 hours with your customized ${consultTargetSpecies} blueprint.`
    );

    setTimeout(() => {
      setIsConsultationModalOpen(false);
      setConsultSuccessMessage(null);
      setConsultName('');
      setConsultPhone('');
    }, 4000);
  };

  const currentGuide = speciesGuides[selectedSpecies];

  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      {/* 1. HERO BANNER WITH BILINGUAL VOICE & ACTIONS */}
      <section className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>New Farmer Incubation Service</span>
              </span>
              <span className="text-xs text-emerald-300 font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-emerald-800/80">
                🌱 From Bare Land to Full Production
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              How to Start Your Own Livestock Farm
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              A comprehensive step-by-step master service and operational blueprint for aspiring domestic livestock farmers. Master land zoning, shed construction, breed procurement, green fodder cultivation, and government subsidies.
            </p>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Starter Species</span>
                <span className="text-sm font-black text-white">5 Animals</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Govt Subsidy</span>
                <span className="text-sm font-black text-emerald-400">25% – 33.3%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Fodder Lead Time</span>
                <span className="text-sm font-black text-amber-400">60 Days</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Bio-Economy</span>
                <span className="text-sm font-black text-cyan-400">Zero Waste</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#roadmap-steps"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center space-x-2"
              >
                <span>🚀 Explore 6-Step Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => handleSpeech(introAudioSpeech)}
                className={`px-4 py-3 rounded-2xl border font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-lg ${
                  isSpeaking && currentText === introAudioSpeech
                    ? 'bg-emerald-500 text-slate-950 animate-pulse border-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title="Listen to audio overview"
              >
                {isSpeaking && currentText === introAudioSpeech ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>🔊 Listen Audio Guide</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsConsultationModalOpen(true)}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center space-x-1.5"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Book Free Setup Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="New Farm Land Setup"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Starter Recommendation</span>
                    <span className="text-sm font-black text-white">Phase 1: Fodder First, Animals Second</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                    Day 1 Rule
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 6-STEP MASTER SETUP ROADMAP ("step by step with images & preper instruction") */}
      <section id="roadmap-steps" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <BookOpen className="h-4 w-4" />
              <span>Universal Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              The 6-Step Farm Launch Sequence
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Follow these sequential phases to avoid the costly pitfalls that cause 70% of beginner livestock farms to struggle in their first year.
            </p>
          </div>

          <button
            onClick={() => handleSpeech('Universal 6 step roadmap. Land testing, ventilated shed building, fodder cultivation, breed selection, bio-economy, and government subsidies.')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
          >
            <Volume2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>🔊 Read All Steps</span>
          </button>
        </div>

        {/* 6 Step Cards with Images & Detailed Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universalSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={s.photo}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Step Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-emerald-500/40 text-xs font-black text-emerald-400 shadow-md">
                    <span>STEP 0{s.step}</span>
                  </div>

                  {/* Timeline Badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-800 text-[10px] font-bold text-emerald-300">
                    <Clock className="h-3 w-3" />
                    <span>{s.timeline}</span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3">
                    <h3 className="text-base font-black text-white leading-snug">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Content & Actions */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {s.summary}
                  </p>

                  <div className="space-y-2 pt-1 border-t border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Execution Checklist:
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {s.actions.map((act, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pro Tip Box & Audio Button */}
              <div className="p-5 pt-0">
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 flex items-start space-x-2.5">
                  <span className="text-sm shrink-0">💡</span>
                  <div className="leading-relaxed">
                    <span className="font-bold text-emerald-400">Pro-Tip: </span>
                    {s.proTip}
                  </div>
                </div>

                {s.step === 2 && (
                  <button
                    onClick={() => navigate('/shed-engineering')}
                    className="w-full mt-2.5 py-2 px-3 rounded-xl bg-teal-600/30 hover:bg-teal-600/40 text-teal-300 font-bold text-[11px] border border-teal-500/40 transition flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Shed & Mat Guidance Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}

                <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => handleSpeech(`${s.title}. ${s.summary}. Pro-Tip: ${s.proTip}`)}
                    className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Listen Step 0{s.step}</span>
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Phase {s.step} of 6
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SPECIES-BY-SPECIES DETAILED SETUP GUIDES */}
      <section className="space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Layers className="h-4 w-4" />
              <span>Species-Specific Incubation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Domestic Animal Setup Blueprints
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select an animal below to inspect tailored housing dimensions, breed recommendations, daily schedules, and the critical first 30-day checklist.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Current Guide:</span>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {currentGuide.name}
            </span>
          </div>
        </div>

        {/* 5-Animal Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { id: 'cow' as SpeciesType, label: 'Cattle Dairy', icon: '🐄' },
            { id: 'goat' as SpeciesType, label: 'Elevated Goats', icon: '🐐' },
            { id: 'fish' as SpeciesType, label: 'Freshwater Fish', icon: '🐟' },
            { id: 'hen' as SpeciesType, label: 'Country Poultry', icon: '🐔' },
            { id: 'pig' as SpeciesType, label: 'Yorkshire Piggery', icon: '🐖' },
          ].map((tab) => {
            const isSelected = selectedSpecies === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedSpecies(tab.id);
                  if (onSelectSpecies) onSelectSpecies(tab.id);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-xl shadow-emerald-950/60 font-bold scale-[1.02]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span className="text-xs font-bold leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Animal Deep-Dive Panel */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-8">
          {/* Header Info with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {currentGuide.hindiName}
                </span>
                <span className="text-xs text-slate-400">
                  Target Scale: {currentGuide.recommendedStarterScale}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {currentGuide.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentGuide.tagline}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Land Required</span>
                  <span className="text-xs font-bold text-white">{currentGuide.minLandRequired}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Covered Shed Space</span>
                  <span className="text-xs font-bold text-emerald-400">{currentGuide.coveredSpacePerAnimal}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Estimated Capital</span>
                  <span className="text-xs font-bold text-amber-400">{currentGuide.approxInitialCapital}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Payback Period</span>
                  <span className="text-xs font-bold text-cyan-400">{currentGuide.paybackPeriod}</span>
                </div>
              </div>
            </div>

            {/* Farm Animal Photo */}
            <div className="lg:col-span-4">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                <img
                  src={currentGuide.photo}
                  alt={currentGuide.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <span className="font-bold">Govt Subsidy:</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentGuide.subsidyAvailable.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Beginner Breeds */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>🏆 Recommended Beginner Breeds</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentGuide.recommendedBreeds.map((b, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-black text-emerald-400 block">{b.breed}</span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{b.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Operational Routine */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>Daily 24-Hour Operational Schedule</span>
              </h4>
              <button
                onClick={() => handleSpeech(`Daily schedule for ${currentGuide.name}. Starts at 5 AM with milking or cleaning, followed by green fodder, watering, and evening check.`)}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Listen Schedule</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentGuide.dailyRoutine.map((r, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
                  <span className="px-2 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-mono text-[11px] font-bold shrink-0">
                    {r.time}
                  </span>
                  <span className="text-xs text-slate-300 leading-relaxed">{r.task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* First 30 Days Launch Checklist */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span>The Critical First 30 Days Onboarding Checklist</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Tap checkboxes as you complete each onboarding phase for your incoming stock.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/80 self-start">
                {Object.values(checkedMilestones).filter(Boolean).length} / {currentGuide.first30DaysMilestones.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentGuide.first30DaysMilestones.map((m, idx) => {
                const key = `${selectedSpecies}-${idx}`;
                const isChecked = !!checkedMilestones[key];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMilestone(key)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start space-x-3 ${
                      isChecked
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {isChecked && <Check className="h-3.5 w-3.5" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-white">{m.day}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Pro Tip</span>
                      </div>
                      <p className={`text-xs ${isChecked ? 'text-slate-300 line-through opacity-75' : 'text-slate-200'}`}>
                        {m.task}
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        💡 {m.tip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Essential Equipment Checklist */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              <span>Must-Have Equipment & Hardware Before Stocking</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {currentGuide.keyEquipment.map((eq, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-2 text-xs text-slate-300">
                  <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-Image Photo Instruction Tour */}
          <div className="pt-6 border-t border-slate-800">
            <MultiImageInstructionGallery
              initialSpecies={selectedSpecies}
              showSpeciesSelector={false}
              onSpeciesChange={(sp) => setSelectedSpecies(sp)}
              title={`${currentGuide.name} — Multi-Image Operational & Facility Tour`}
              subtitle="Detailed photographic inspection across ponds, ventilation ridges, bedding mats, precision feeding, and day-to-day husbandry."
            />
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE STARTUP BUDGET & ROI CALCULATOR */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Calculator className="h-4 w-4" />
              <span>Financial Feasibility Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Interactive Farm Startup Budget Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Estimate your initial capital requirements, eligible NABARD government subsidy, and projected payback timeline based on scale.
            </p>
          </div>

          <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold self-start sm:self-auto">
            💰 Realistic 2026 Indian Ag-Economics
          </span>
        </div>

        {/* Calculator Inputs & Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
            {/* 1. Animal Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                1. Select Target Domestic Livestock:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { id: 'cow' as SpeciesType, label: 'Cattle', icon: '🐄' },
                  { id: 'goat' as SpeciesType, label: 'Goat', icon: '🐐' },
                  { id: 'fish' as SpeciesType, label: 'Fish', icon: '🐟' },
                  { id: 'hen' as SpeciesType, label: 'Poultry', icon: '🐔' },
                  { id: 'pig' as SpeciesType, label: 'Swine', icon: '🐖' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCalcSpecies(item.id);
                      if (item.id === 'cow') setCalcHeadcount(10);
                      else if (item.id === 'goat') setCalcHeadcount(25);
                      else if (item.id === 'fish') setCalcHeadcount(3000);
                      else if (item.id === 'hen') setCalcHeadcount(200);
                      else if (item.id === 'pig') setCalcHeadcount(15);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                      calcSpecies === item.id
                        ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[11px] font-bold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Number of Animals Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">2. Planned Starting Herd / Flock Size:</span>
                <span className="font-mono font-black text-emerald-400 text-sm">
                  {calcHeadcount.toLocaleString()} {calcSpecies === 'fish' ? 'Fingerlings' : calcSpecies === 'hen' ? 'Birds' : 'Heads'}
                </span>
              </div>
              <input
                type="range"
                min={calcSpecies === 'fish' ? 500 : calcSpecies === 'hen' ? 50 : 2}
                max={calcSpecies === 'fish' ? 10000 : calcSpecies === 'hen' ? 1000 : 50}
                step={calcSpecies === 'fish' ? 500 : calcSpecies === 'hen' ? 50 : 1}
                value={calcHeadcount}
                onChange={(e) => setCalcHeadcount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* 3. Land Size Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">3. Available Land Holding:</span>
                <span className="font-mono font-black text-cyan-400 text-sm">
                  {calcLandAcres} Acre{calcLandAcres > 1 ? 's' : ''} ({Math.round(calcLandAcres * 43560).toLocaleString()} Sq Ft)
                </span>
              </div>
              <input
                type="range"
                min={0.25}
                max={5.0}
                step={0.25}
                value={calcLandAcres}
                onChange={(e) => setCalcLandAcres(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results Breakdown Column */}
          <div className="lg:col-span-6 space-y-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-emerald-500/40 shadow-xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>📊 Estimated Budget Breakdown</span>
              <span className="text-xs font-mono text-emerald-400">INR (₹)</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Shed Construction & Flooring</span>
                <span className="font-mono font-bold text-white">₹{budget.shedCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Animal Stock Procurement</span>
                <span className="font-mono font-bold text-white">₹{budget.stockCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Initial 90-Day Feed & Health Buffer</span>
                <span className="font-mono font-bold text-white">₹{budget.feedBufferCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Biogas Digester & Waste Setup</span>
                <span className="font-mono font-bold text-white">₹{budget.bioSetupCost.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between py-2 text-sm font-bold">
                <span className="text-slate-300">Total Gross Capital:</span>
                <span className="font-mono text-amber-400">₹{budget.totalGrossCapital.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-emerald-400 font-bold block">NABARD / Govt Subsidy (25% est.)</span>
                  <span className="text-[10px] text-slate-400">Capital reimbursement upon inspection</span>
                </div>
                <span className="font-mono font-black text-emerald-300 text-sm">
                  - ₹{budget.estSubsidy.toLocaleString()}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-white block">Net Out-of-Pocket Outlay:</span>
                  <span className="text-[10px] text-slate-300">Farmer initial equity required</span>
                </div>
                <span className="font-mono text-xl font-black text-emerald-400">
                  ₹{budget.netFarmerOutlay.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Projected Payback */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Est. Monthly Profit</span>
                <span className="text-base font-black text-emerald-400">₹{budget.estMonthlyGrossProfit.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 block font-medium">Payback Horizon</span>
                <span className="text-base font-black text-cyan-400">{budget.paybackMonths} Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BIOSECURITY & TOP 5 BEGINNER MISTAKES TO AVOID */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Risk Management & Biosecurity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            5 Common Mistakes That Ruin Beginner Farms
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review these hard-learned industry lessons to safeguard your initial capital and maintain zero herd mortality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>❌ Mistake #1</span>
            </div>
            <h4 className="font-bold text-white text-sm">Buying Animals Before Growing Fodder</h4>
            <p className="text-slate-300 leading-relaxed">
              Purchasing commercial market fodder daily burns cash reserves rapidly. Always have Super Napier ready to harvest on Day 1 before any animals step on the farm.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>❌ Mistake #2</span>
            </div>
            <h4 className="font-bold text-white text-sm">Skipping the 21-Day Quarantine</h4>
            <p className="text-slate-300 leading-relaxed">
              Introducing new animals directly into an existing herd risks transmitting Foot & Mouth Disease or Goat Plague (PPR), causing catastrophic herd losses.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>❌ Mistake #3</span>
            </div>
            <h4 className="font-bold text-white text-sm">Poor Floor Slopes & Ammonia Build-up</h4>
            <p className="text-slate-300 leading-relaxed">
              Flat concrete floors retain stagnant urine, producing noxious ammonia that causes chronic pneumonia in calves and painful foot rot in goats and sheep.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>❌ Mistake #4</span>
            </div>
            <h4 className="font-bold text-white text-sm">Relying Solely on a Single Revenue Stream</h4>
            <p className="text-slate-300 leading-relaxed">
              A dairy farm that only sells raw milk leaves 40% of its potential profit uncollected. Convert manure into bottled vermicompost and use biogas to eliminate energy bills.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 font-bold">
              <span>❌ Mistake #5</span>
            </div>
            <h4 className="font-bold text-white text-sm">Operating Without an Assigned Veterinarian</h4>
            <p className="text-slate-300 leading-relaxed">
              Searching for a doctor during a midnight dystocia (difficult calving) is too late. Establish an on-call relationship with a licensed vet surgeon before stocking.
            </p>
          </div>

          {/* Golden Rule Card */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                <span>✅ The Golden Rule of Livestock</span>
              </div>
              <h4 className="font-bold text-white text-sm">Observation Beats Medication</h4>
              <p className="text-slate-300 leading-relaxed">
                Spend 20 minutes every morning quietly observing animal rumination, eye moisture, and gait. Catching an infection 12 hours early reduces recovery time by 80%.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenCallVet}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Contact Registered Farm Vet</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALLOUT TO LAUNCH DASHBOARD & LOG FIRST ANIMAL */}
      <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
            Ready to Begin?
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Register Your Livestock & Manage Daily Operations
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Once your shed and fodder are ready, register your first ear-tagged animals into this suite to automate feeding schedules, vaccination alerts, and P&L accounting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-4 py-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition flex items-center space-x-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Register Stock</span>
            </button>
          )}
          <button
            onClick={() => navigate('/dashboard')}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center space-x-2"
          >
            <span>Enter Operations Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsConsultationModalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
          >
            Request Site Inspection
          </button>
        </div>
      </section>

      {/* 7. SETUP CONSULTATION MODAL */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  🌱
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Farm Setup Advisory Booking</h3>
                  <p className="text-[11px] text-slate-400">Get a 1-on-1 blueprint review with a livestock specialist</p>
                </div>
              </div>
              <button
                onClick={() => setIsConsultationModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {consultSuccessMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-200 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Consultation Request Received</span>
                </div>
                <p>{consultSuccessMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Phone Number (WhatsApp):</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">District / State:</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand, Gujarat"
                      value={consultLocation}
                      onChange={(e) => setConsultLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Available Land Size:</label>
                    <select
                      value={consultLandSize}
                      onChange={(e) => setConsultLandSize(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="0.25 to 0.5 Acre">0.25 to 0.5 Acre</option>
                      <option value="1.0 Acre">1.0 Acre</option>
                      <option value="2.0 Acres">2.0 Acres (Recommended)</option>
                      <option value="3+ Acres">3+ Acres</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Target Primary Animal:</label>
                    <select
                      value={consultTargetSpecies}
                      onChange={(e) => setConsultTargetSpecies(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Gir Dairy Cattle">Gir Dairy Cattle</option>
                      <option value="Sirohi Elevated Goats">Sirohi Elevated Goats</option>
                      <option value="Freshwater Fish Aquaculture">Freshwater Fish Aquaculture</option>
                      <option value="Kadaknath Country Poultry">Kadaknath Country Poultry</option>
                      <option value="Yorkshire Swine Piggery">Yorkshire Swine Piggery</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Free service provided by Livestock Ledger Agricultural Extension Division.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmStarterPage;
