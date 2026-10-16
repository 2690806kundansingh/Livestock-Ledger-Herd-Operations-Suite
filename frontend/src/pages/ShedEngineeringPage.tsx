// File: frontend/src/pages/ShedEngineeringPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFarmVoice } from '../utils/speechVoice';
import {
  ArrowRight,
  Volume2,
  VolumeX,
  PhoneCall,
  CheckCircle2,
  Calculator,
  Send,
  Layers,
  PlusCircle,
  Wind,
  Sun,
  Ruler,
  Grid,
} from 'lucide-react';
import { SpeciesType } from '../types/farm2Acre';
import { MultiImageInstructionGallery } from '../components/MultiImageInstructionGallery';

interface ShedEngineeringPageProps {
  onSelectSpecies?: (species: SpeciesType) => void;
  onOpenCallVet?: () => void;
  onOpenRegister?: () => void;
}

interface ShedBlueprint {
  species: SpeciesType;
  title: string;
  hindiTitle: string;
  tagline: string;
  bestStructureType: string;
  whyBest: string;
  photo: string;
  blueprintDiagramPhoto: string;
  roofDesign: string;
  orientation: string;
  coveredSqFtPerHead: number;
  openRunSqFtPerHead: number;
  ceilingRidgeHeight: string;
  drainageSlope: string;
  bestMatType: string;
  matThickness: string;
  matPhoto: string;
  matBenefits: string[];
  structuralMaterials: { component: string; spec: string }[];
  ventilationGuidelines: string[];
}

export const ShedEngineeringPage: React.FC<ShedEngineeringPageProps> = ({
  onSelectSpecies,
  onOpenCallVet,
  onOpenRegister,
}) => {
  const navigate = useNavigate();
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  const [activeSpecies, setActiveSpecies] = useState<SpeciesType>('cow');
  const [activeTab, setActiveTab] = useState<'structure' | 'flooring' | 'gallery' | 'calculator'>('structure');

  // Calculator states
  const [calcAnimal, setCalcAnimal] = useState<SpeciesType>('cow');
  const [calcAnimalCount, setCalcAnimalCount] = useState<number>(10);

  // Structural blueprint consultation modal
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultLandArea, setConsultLandArea] = useState<string>('0.5 Acre');
  const [consultMessage, setConsultMessage] = useState<string | null>(null);

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const introSpeech =
    'Welcome to the Livestock Shed Engineering and Flooring Mat Service. Learn which architectural structure and rubber or slatted mat is scientifically proven best for cattle, goats, pigs, poultry, and fish.';

  // 5 Species Blueprints Data
  const shedBlueprints: { [key in SpeciesType]: ShedBlueprint } = {
    cow: {
      species: 'cow',
      title: 'Open-Ridge Ventilated Dairy Barn & Rubber Matting',
      hindiTitle: 'गौशाला शेड व रबर मैट गाइड',
      tagline: 'High-comfort loose housing with convective thermal chimney and 24mm interlocking vulcanized cow mats.',
      bestStructureType: 'Open-Ridge Loose Housing with Tail-to-Tail Central Dung Alley',
      whyBest: 'Removes 80% of airborne ammonia gas, lowers ambient shed temperature by 4 to 6°C during peak summer, and allows easy mechanized or manual dung scraping without disturbing cows.',
      photo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      blueprintDiagramPhoto: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
      roofDesign: 'Gable roof with a 1.5-foot open continuous ridge monitor at the peak; 1:3 roof pitch with 3-foot rainwater overhangs.',
      orientation: 'Strictly East-to-West along the long axis so side eaves shade interior pens from direct solar radiation.',
      coveredSqFtPerHead: 50,
      openRunSqFtPerHead: 100,
      ceilingRidgeHeight: '14 Feet at ridge peak, 10 Feet at side eaves',
      drainageSlope: '1:40 (1.5-inch drop every 5 feet) sloping towards central dung gutter',
      bestMatType: 'Heavy-Duty 24mm Vulcanized Interlocking Rubber Cow Mats',
      matThickness: '24mm to 25mm High-Density Non-Porous Vulcanized Rubber',
      matPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
      matBenefits: [
        'Cushions knee joints: Reduces bovine lameness, swollen hocks, and hygroma by over 60%.',
        'Increases resting time: Stimulates cows to lie down 12 to 14 hours daily; every extra hour of rest yields +1.2 Liters milk!',
        'Thermal Barrier: Shields udder from freezing concrete in winter, dramatically lowering mastitis risk.',
        'Diamond-grip surface: Non-slip textured top prevents costly hip dislocations during heat mounting.',
      ],
      structuralMaterials: [
        { component: 'Pillars & Trusses', spec: 'Hot-dipped Galvanized Iron (GI) round/square tubular pipes (3-inch diameter).' },
        { component: 'Roofing Sheets', spec: 'PPGI color-coated corrugated sheets with underside polyurethane thermal insulation foam.' },
        { component: 'Feed Manger', spec: 'Curved parabolic glazed ceramic or polished terrazzo trough (2.5-ft width).' },
        { component: 'Dung Channel', spec: '18-inch wide x 4-inch deep channel with continuous slope to biogas digester inlet.' },
      ],
      ventilationGuidelines: [
        'Side walls must be open: Keep walls no higher than 3.5 feet, with the remaining 6.5 feet covered by bird-proof wire mesh.',
        'Install 36-inch industrial high-volume low-speed (HVLS) fans spaced every 25 feet angled downward at 20 degrees.',
        'High-pressure fogger misters (200 PSI) with 10-micron nozzles for evaporative cooling during dry heat months.',
      ],
    },
    goat: {
      species: 'goat',
      title: 'Elevated Machan Stilt House & HDPE Slatted Flooring',
      hindiTitle: 'मचान बकरी शेड व प्लास्टिक स्लेटेड फ्लोरिंग',
      tagline: '1.5-meter elevated wooden/plastic slatted house preventing hoof rot and pneumonia in stall-fed herds.',
      bestStructureType: 'Elevated Stilt House (Machan System) with Exterior Hanging Feeders',
      whyBest: 'Goats are exceptionally prone to foot rot and internal lung parasites if they stand on damp manure. An elevated slatted floor drops dung pellets and urine through floor gaps instantly, keeping hooves 100% dry.',
      photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
      blueprintDiagramPhoto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      roofDesign: 'Lean-to or Gable roof with double-layer thatch or GI sheets lined with bamboo mat insulation.',
      orientation: 'North-to-South to maximize cross-breeze across the elevated deck.',
      coveredSqFtPerHead: 14,
      openRunSqFtPerHead: 25,
      ceilingRidgeHeight: '10 Feet from elevated floor, 15 Feet from ground level',
      drainageSlope: 'Ground beneath stilt floor sloped 1:30 towards perimeter compost collection trench',
      bestMatType: 'Virgin HDPE Interlocking Slatted Panels (or Seasoned Teak Battens)',
      matThickness: '30mm Heavy-Duty Virgin Polypropylene with 14mm to 16mm drain slots',
      matPhoto: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
      matBenefits: [
        'Zero Hoof Rot: Cloven hooves remain completely dry and dry pellets drop down without clinging.',
        'Hygienic & Mite-Free: Virgin plastic does not absorb urine, tick larvae, or ammonia odor unlike damp wood.',
        'Easy Dung Collection: High-value dry goat manure pellets can be swept from beneath the floor for premium sale (₹12/kg).',
        'Anti-Slip Embossed Studs: Prevents slipping when pregnant does walk or kids play.',
      ],
      structuralMaterials: [
        { component: 'Stilt Support Posts', spec: 'Treated sal/teak wooden logs or concrete RCC pillars embedded 2.5 ft into ground.' },
        { component: 'Flooring Joists', spec: '2x4 inch steel hollow rectangular sections (RHS) spaced 2 feet on center.' },
        { component: 'Perimeter Mesh', spec: '10-gauge galvanized chain-link wire mesh (1x1 inch) to keep foxes and dogs out.' },
        { component: 'Feed Troughs', spec: 'External hanging V-shaped wooden/PVC racks to prevent goats from soiling fodder with hooves.' },
      ],
      ventilationGuidelines: [
        'Elevated structure catches natural cooling breeze 5 feet above stagnant ground air currents.',
        'In winter nights, install roll-up heavy tarpaulin curtains on the north and west sides to block cold drafts.',
        'Keep kid creep nurseries warm with 100W infrared heating lamps suspended 2 feet above bedding.',
      ],
    },
    fish: {
      species: 'fish',
      title: 'Earthen Poly-Culture Pond with 500-Micron Geomembrane Liner',
      hindiTitle: 'मछली पालन तालाब व जियोमेम्ब्रेन लाइनर',
      tagline: 'Trapezoidal earthen dykes with anti-seepage HDPE liner, central monk drain, and solar paddlewheel aeration.',
      bestStructureType: 'Rectangular Earthen Excavated Pond with 2:1 Dyke Slope and Clay Core',
      whyBest: 'A 3:1 length-to-width ratio optimizes wind-driven natural surface wave aeration. Clay core dykes prevent subterranean water piping leaks.',
      photo: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
      blueprintDiagramPhoto: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
      roofDesign: 'Open sky for sunlight plankton photosynthesis with perimeter bird-scare nylon monofilament grid (10x10 ft spacing).',
      orientation: 'Long axis aligned with prevailing wind direction (South-West to North-East) for natural wind aeration.',
      coveredSqFtPerHead: 7, // 7 sq ft per fingerling in a 0.5 acre pond
      openRunSqFtPerHead: 7,
      ceilingRidgeHeight: 'Water Depth: 1.5 to 1.8 Meters (5 to 6 Feet); Freeboard: 1.5 Feet above high water mark',
      drainageSlope: 'Pond bottom graded 1:100 towards central harvesting sump and drain monk',
      bestMatType: '500-Micron (0.5mm) UV-Stabilized HDPE Geomembrane Liner Mat',
      matThickness: '500 Micron (0.5mm) Virgin Polyethylene with Thermal Hot-Wedge Seams',
      matPhoto: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      matBenefits: [
        'Stops 99% Water Loss: Eliminates ground water percolation in sandy or porous soil, saving thousands in diesel pumping.',
        'Rapid Harvest & Cleaning: Pond floor can be completely drained, pressure-washed, and sun-dried in 48 hours between fish crops.',
        'Zero Mud Turbidity: Prevents bottom detritus from fouling water clarity, keeping dissolved oxygen (DO) above 6 ppm.',
        'Disease Disinfection: Smooth impermeable surface eliminates bottom parasites, pathogens, and leech infestations.',
      ],
      structuralMaterials: [
        { component: 'Dyke Embankment', spec: 'Trapezoidal earthen bunds with 6-ft top width, stabilized with Super Napier fodder roots.' },
        { component: 'Water Inlet Filter', spec: '4-inch PVC inlet pipe with double 80-mesh nylon filter sock to keep wild fish out.' },
        { component: 'Overflow Spillway', spec: 'Brick masonry spillway with stainless steel fine-mesh screen to prevent fish escape during heavy rain.' },
        { component: 'Aeration Unit', spec: '1 HP Solar 4-impeller paddlewheel aerator anchored diagonally in center of pond.' },
      ],
      ventilationGuidelines: [
        'Avoid tall trees on southern and western banks which block sunlight and wind contact with water surface.',
        'Maintain minimum 5.0 ppm Dissolved Oxygen by running aerators between 3:00 AM and 6:00 AM when algal oxygen drops.',
        'Keep water Secchi disc transparency between 30 and 40 cm to indicate healthy natural plankton blooms.',
      ],
    },
    hen: {
      species: 'hen',
      title: 'Deep-Litter Semi-Open Poultry House & Organic Rice Husk Bedding',
      hindiTitle: 'मुर्गी फार्म शेड व डीप-लीटर बेडिंग',
      tagline: 'Predator-proof cross-ventilated coop with 4-tier dark nest boxes and moisture-absorbent rice husk bedding mat.',
      bestStructureType: 'Semi-Open Gable Shed with 3-Ft Dwarf Wall, 7-Ft Wire Mesh & Predator Apron',
      whyBest: 'Poultry generate extreme heat and moisture. A 3-ft dwarf brick wall with 7-ft open wire mesh ensures gale-force ammonia removal while keeping driving rain and predators out.',
      photo: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      blueprintDiagramPhoto: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      roofDesign: 'Gable or monitor roof with 3.5-foot overhangs to keep driving monsoon rain off the wire mesh.',
      orientation: 'East-to-West long axis to ensure direct sun hits only the narrow end walls and never reaches inside pens.',
      coveredSqFtPerHead: 2.0,
      openRunSqFtPerHead: 10.0,
      ceilingRidgeHeight: '12 Feet at peak ridge, 8 Feet at side eaves',
      drainageSlope: '1:50 concrete floor slope to perimeter wash gutter; dry floor during production',
      bestMatType: 'Organic Deep-Litter Bedding Mat (Rice Husk + Wood Shavings + 5% Lime)',
      matThickness: '3 to 4 Inches (75mm to 100mm) of dry, dust-free rice husk and softwood flakes',
      matPhoto: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      matBenefits: [
        'Moisture & Droppings Absorption: Absorbs water from chicken manure rapidly, keeping litter dry and friable.',
        'Inhibits Coccidiosis: Addition of 5% agricultural slaked lime powder creates an alkaline pH hostile to oocysts.',
        'Insulates Chick Feet: Provides thermal warmth from beneath in winter, preventing chilling and crowding mortalities.',
        'Yields High-NPK Manure: Once every 6 months, spent litter is scooped out as premium nitrogen fertilizer (3% N).',
      ],
      structuralMaterials: [
        { component: 'Foundation & Dwarf Wall', spec: '1.5-ft deep concrete foundation with 3-ft high 9-inch brick wall plastered smooth.' },
        { component: 'Upper Wire Mesh', spec: '1-inch galvanized hexagonal wire netting (18-gauge) securely nailed to angle iron frames.' },
        { component: 'Perch Roosts', spec: '2-inch rounded wooden battens placed 14 inches above floor and 12 inches apart.' },
        { component: 'Predator Apron', spec: 'Wire mesh buried 1 foot down and bent 1 foot outward underground to prevent digging dogs/rats.' },
      ],
      ventilationGuidelines: [
        'Never enclose poultry in solid airtight walls; ammonia levels above 15 ppm cause severe eye inflammation and respiratory CRD.',
        'Litter must be raked once every 3 days using a hand rake to prevent caking and encourage aerobic drying.',
        'Install 4-tier dark laying nest boxes on the coolest wall (North-East) with black cotton curtains for privacy.',
      ],
    },
    pig: {
      species: 'pig',
      title: 'Sloped Concrete Piggery Shed & Cast-Iron / Plastic Farrowing Mats',
      hindiTitle: 'सूअर बाड़ा शेड व स्लेटेड फ्लोरिंग',
      tagline: 'Separate dry feeding/lying bay and sloped wet dunging alley with cooling wallow linked to biogas.',
      bestStructureType: 'Solid Concrete Sloped Pen with Open Wallow Run & Separate Defecation Alley',
      whyBest: 'Pigs are naturally clean and will never defecate where they sleep if the pen is engineered properly with a stepped 1:30 sloped dunging channel connected directly to the anaerobic biogas digester.',
      photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      blueprintDiagramPhoto: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
      roofDesign: 'Shed or monitor roof with high thermal reflectance aluminum sheets and open side eaves.',
      orientation: 'East-to-West to shelter pigs from intense afternoon solar radiation.',
      coveredSqFtPerHead: 30,
      openRunSqFtPerHead: 40,
      ceilingRidgeHeight: '11 Feet at center, 8 Feet at rear',
      drainageSlope: '1:30 steep fall from lying area down to the continuous 4-inch biogas dung gutter',
      bestMatType: 'Cast-Iron Slats (for Sows) & Polypropylene Plastic Slats (for Piglets)',
      matThickness: 'Modular Interlocking Panels (Cast-iron 15mm slats, plastic creep panels 30mm)',
      matPhoto: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
      matBenefits: [
        'Prevents Piglet Crushing: Anti-slip cast iron provides steady traction for the 200 kg mother sow when lying down.',
        'Warm Creep Area: Plastic slats with low thermal conductivity keep piglets warm, avoiding joint abrasions and diarrhea.',
        'Effortless Dung Flushing: Manure drops through the slats directly into the drain channel, cutting daily cleaning labor by 70%.',
        'Resistant to Rooting: Pigs cannot chew or tear up heavy cast-iron and virgin industrial-grade polypropylene.',
      ],
      structuralMaterials: [
        { component: 'Pen Partition Walls', spec: '3.5-ft high 9-inch solid brick masonry plastered with 1:3 cement mortar or heavy steel rails.' },
        { component: 'Farrowing Rails', spec: '1.5-inch GI pipes fixed 8 inches from walls and 8 inches above floor to protect nursing piglets.' },
        { component: 'Water Nipples', spec: 'Stainless steel 304 bite-valves with splash-guard bowls mounted at pig shoulder height.' },
        { component: 'Cooling Wallow', spec: 'Concrete plunge pool (6-inch water depth) in outdoor yard to allow evaporative skin cooling.' },
      ],
      ventilationGuidelines: [
        'Pigs cannot perspire; above 28°C ambient temperature, feed consumption drops by 30%.',
        'Install sprinkler mist lines over the outdoor dunging area operating for 2 minutes every 30 minutes in hot weather.',
        'Continuous high-volume low-static roof vents ensure air turnover every 90 seconds.',
      ],
    },
  };

  const current = shedBlueprints[activeSpecies];

  // Mat & Shed Estimator
  const calculateEstimates = () => {
    const coveredArea = current.coveredSqFtPerHead * calcAnimalCount;
    const openRunArea = current.openRunSqFtPerHead * calcAnimalCount;
    
    // Mat calculation
    let matName = 'Rubber Mat Sheets (6x4 ft)';
    let matsNeeded = Math.ceil(coveredArea / 24);
    let matCostPerUnit = 2200;

    if (calcAnimal === 'goat') {
      matName = 'HDPE Slatted Panels (2x2 ft)';
      matsNeeded = Math.ceil(coveredArea / 4);
      matCostPerUnit = 380;
    } else if (calcAnimal === 'fish') {
      matName = '500-Micron Geomembrane (Sq Meters)';
      matsNeeded = Math.ceil(coveredArea * 0.0929);
      matCostPerUnit = 120;
    } else if (calcAnimal === 'hen') {
      matName = 'Rice Husk Bedding Bags (50 kg)';
      matsNeeded = Math.ceil(coveredArea / 50);
      matCostPerUnit = 180;
    } else if (calcAnimal === 'pig') {
      matName = 'Cast-Iron & Plastic Slatted Modules';
      matsNeeded = Math.ceil(coveredArea / 12);
      matCostPerUnit = 1600;
    }

    const totalMatCost = matsNeeded * matCostPerUnit;
    const steelFramingCost = Math.round(coveredArea * 180); // ₹180 per sq ft for GI pipes & roofing
    const masonryFloorCost = Math.round(coveredArea * 140); // ₹140 per sq ft for concrete & gutters
    const totalShedInvestment = totalMatCost + steelFramingCost + masonryFloorCost;

    return {
      coveredArea,
      openRunArea,
      matName,
      matsNeeded,
      totalMatCost,
      steelFramingCost,
      masonryFloorCost,
      totalShedInvestment,
    };
  };

  const estimates = calculateEstimates();

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;

    setConsultMessage(
      `Thank you ${consultName}! Your custom Shed Structural Blueprint request for ${current.title} has been received. Our Agricultural Structural Engineer will contact ${consultPhone} within 24 hours with CAD dimensions and material estimates.`
    );

    setTimeout(() => {
      setIsConsultModalOpen(false);
      setConsultMessage(null);
      setConsultName('');
      setConsultPhone('');
    }, 4500);
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-16">
      {/* 1. HERO BANNER WITH VOICE READOUT */}
      <section className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-950 p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" />
                <span>Specialized Engineering Service</span>
              </span>
              <span className="text-xs text-teal-300 font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-teal-800/80">
                🏗️ Shed Architecture & Floor Matting
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Livestock Shed Engineering & Flooring Mat Guide
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Scientific architectural guidance for cattle, goats, pigs, poultry, and fish. Discover why open-ridge ventilated structures and specialized vulcanized rubber or slatted mats are critical for preventing disease and maximizing yield.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Summer Cooling</span>
                <span className="text-sm font-black text-emerald-400">-4°C to -6°C</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Lameness Drop</span>
                <span className="text-sm font-black text-cyan-400">&gt;60% on Mats</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Roof Overhang</span>
                <span className="text-sm font-black text-amber-400">3.5 Feet Min</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Ammonia Vent</span>
                <span className="text-sm font-black text-white">Open Ridge</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => handleSpeech(introSpeech)}
                className={`px-4 py-3 rounded-2xl border font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-lg ${
                  isSpeaking && currentText === introSpeech
                    ? 'bg-emerald-500 text-slate-950 animate-pulse border-emerald-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
              >
                {isSpeaking && currentText === introSpeech ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400" />
                    <span>🔊 Listen Engineering Audio</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsConsultModalOpen(true)}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center space-x-2"
              >
                <span>📐 Request Custom Shed CAD Plan</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Hero Architecture Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80"
                alt="Open-Ridge Dairy Shed Architecture"
                className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Structural Recommendation</span>
                    <span className="text-sm font-black text-white">Open-Ridge High-Convection Barn</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                    Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPECIES SELECTOR BAR */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Select Domestic Animal for Structural & Matting Blueprint
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Switch species to compare roof height, ventilation, flooring slope, and specialized bedding mats.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'structure' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🏛️ Shed Structure
            </button>
            <button
              onClick={() => setActiveTab('flooring')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'flooring' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🛡️ Mats & Flooring
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'gallery' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              📸 Multi-Image Photo Guide
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              📐 Cost Estimator
            </button>
          </div>
        </div>

        {/* 5-Animal Switcher Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'cow' as SpeciesType, label: 'Cattle Dairy', icon: '🐄', sub: 'Open-Ridge Barn' },
            { id: 'goat' as SpeciesType, label: 'Elevated Goat', icon: '🐐', sub: '1.5m Stilt Machan' },
            { id: 'fish' as SpeciesType, label: 'Fish Pond', icon: '🐟', sub: 'HDPE Lined Dyke' },
            { id: 'hen' as SpeciesType, label: 'Poultry Coop', icon: '🐔', sub: 'Deep-Litter Shed' },
            { id: 'pig' as SpeciesType, label: 'Piggery Pen', icon: '🐖', sub: 'Sloped Concrete' },
          ].map((item) => {
            const isSelected = activeSpecies === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSpecies(item.id);
                  setCalcAnimal(item.id);
                  if (onSelectSpecies) onSelectSpecies(item.id);
                }}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-xl shadow-emerald-950/60 font-bold scale-[1.02]'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold leading-tight">{item.label}</span>
                <span className="text-[10px] text-emerald-300/80 font-mono hidden sm:inline">{item.sub}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. TAB CONTENT 1: SHED STRUCTURE GUIDANCE */}
      {activeTab === 'structure' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-8 animate-fadeIn">
          {/* Header Title with Audio */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {current.hindiTitle}
                </span>
                <span className="text-xs text-slate-400">
                  Optimal Design: {current.bestStructureType}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {current.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {current.tagline}
              </p>
            </div>

            <button
              onClick={() => handleSpeech(`${current.title}. Optimal structure is ${current.bestStructureType}. Reason: ${current.whyBest}`)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              <Volume2 className="h-4 w-4 text-emerald-400" />
              <span>🔊 Listen Structural Reason</span>
            </button>
          </div>

          {/* 2-Column: Photo vs Engineering Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Photo Card */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl group">
                <img
                  src={current.photo}
                  alt={current.title}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">Field Verification</span>
                  <span className="text-xs font-bold text-white">{current.bestStructureType}</span>
                </div>
              </div>

              {/* Pro-Reason Callout */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-200 space-y-1">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                  Why This Structure Is Scientifically Best:
                </span>
                <p className="leading-relaxed">{current.whyBest}</p>
              </div>
            </div>

            {/* Detailed Engineering Parameters */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Covered Area / Head</span>
                  <span className="text-sm font-black text-white">{current.coveredSqFtPerHead} Sq Ft</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Open Yard / Head</span>
                  <span className="text-sm font-black text-emerald-400">{current.openRunSqFtPerHead} Sq Ft</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Ceiling Height</span>
                  <span className="text-xs font-bold text-amber-400">{current.ceilingRidgeHeight}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Floor Slope</span>
                  <span className="text-xs font-bold text-cyan-400">{current.drainageSlope}</span>
                </div>
              </div>

              {/* Roof & Orientation Rules */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-start space-x-3">
                  <Sun className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Shed Orientation & Solar Protection:</span>
                    <p className="text-slate-300 leading-relaxed">{current.orientation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 pt-2 border-t border-slate-800">
                  <Wind className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Roof Ventilation & Overhang Geometry:</span>
                    <p className="text-slate-300 leading-relaxed">{current.roofDesign}</p>
                  </div>
                </div>
              </div>

              {/* Structural Bill of Materials (BOM) */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Ruler className="h-4 w-4 text-emerald-400" />
                  <span>Structural Framing & Material Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {current.structuralMaterials.map((mat, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">{mat.component}</span>
                      <p className="text-slate-400 leading-tight">{mat.spec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ventilation Guidelines */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Airflow & Climate Control Rules:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {current.ventilationGuidelines.map((g, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 transition flex items-center justify-center gap-2"
                >
                  <span>📸 Open 6-Image Step-by-Step Facility Tour for {current.title.split(' ')[0]}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. TAB CONTENT 2: FLOORING & MAT GUIDANCE ("which type of mat we use") */}
      {activeTab === 'flooring' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Flooring & Bedding Technology
                </span>
                <span className="text-xs text-slate-400">
                  Recommended: {current.bestMatType}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Which Type of Mat to Use for {current.title.split(' ')[0]}?
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Flooring accounts for 40% of all livestock health issues. Using the correct mat prevents lameness, mastitis, and parasitic larval infections.
              </p>
            </div>

            <button
              onClick={() => handleSpeech(`For ${current.title.split(' ')[0]}, the recommended matting is ${current.bestMatType}. Thickness: ${current.matThickness}. It prevents lameness and keeps animals dry.`)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center space-x-2 shrink-0 self-start md:self-auto"
            >
              <Volume2 className="h-4 w-4 text-cyan-400" />
              <span>🔊 Listen Mat Specification</span>
            </button>
          </div>

          {/* Mat Deep-Dive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Mat Photograph & Specs */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl group">
                <img
                  src={current.matPhoto}
                  alt={current.bestMatType}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase block">Material Standard</span>
                  <span className="text-xs font-bold text-white">{current.bestMatType}</span>
                </div>
              </div>

              {/* Mat Thickness Badge */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Standard Thickness & Density</span>
                  <span className="text-sm font-black text-cyan-300">{current.matThickness}</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-400 font-bold border border-cyan-800">
                  Certified
                </span>
              </div>
            </div>

            {/* Mat Benefits & Installation Guidelines */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Clinical Benefits of This Matting System</span>
                </h4>
                <div className="space-y-2.5 text-xs text-slate-200">
                  {current.matBenefits.map((benefit, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation & Maintenance Protocol */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 text-xs">
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Grid className="h-4 w-4 text-amber-400" />
                  <span>Installation & Cleaning Protocol:</span>
                </h4>
                <ul className="space-y-2 text-slate-300 leading-relaxed">
                  <li>
                    <strong className="text-white">Slope Alignment:</strong> Install mats with continuous drainage grooves pointing downhill along the 1:40 concrete slope.
                  </li>
                  <li>
                    <strong className="text-white">Fastening:</strong> Secure front edges with stainless steel drive anchors to prevent curl-up while leaving rear edges unanchored for daily pressure-wash flushing.
                  </li>
                  <li>
                    <strong className="text-white">Disinfection:</strong> Spray mats weekly with a 1% potassium peroxymonosulfate or iodophor solution to eliminate fungal spores.
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 font-bold text-xs border border-cyan-500/30 transition flex items-center justify-center gap-2"
                >
                  <span>📸 Inspect High-Resolution Photos of Flooring, Ponds & Sheds</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB CONTENT: MULTI-IMAGE PHOTO WALKTHROUGH */}
      {activeTab === 'gallery' && (
        <section className="animate-fadeIn">
          <MultiImageInstructionGallery
            initialSpecies={activeSpecies}
            showSpeciesSelector={false}
            onSpeciesChange={(sp) => {
              setActiveSpecies(sp);
              setCalcAnimal(sp);
            }}
            title={`${current.title} — Multi-Angle Construction & Facility Tour`}
            subtitle="Step-by-step photographic inspection across earthen pond excavation, solar paddlewheel aerators, slatted machans, vulcanized rubber mats, and deep-litter bedding."
          />
        </section>
      )}

      {/* 5. TAB CONTENT 3: INTERACTIVE SHED & MAT COST ESTIMATOR */}
      {activeTab === 'calculator' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <Calculator className="h-4 w-4" />
                <span>Structural Cost Calculator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Shed Footprint & Turnkey Material Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Compute total covered square footage, roofing steel, and total number of rubber mats or slatted panels needed.
              </p>
            </div>

            <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold self-start sm:self-auto">
              📐 Turnkey Estimates (INR ₹)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-5 bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Select Animal Type:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'cow' as SpeciesType, label: 'Cow', icon: '🐄' },
                    { id: 'goat' as SpeciesType, label: 'Goat', icon: '🐐' },
                    { id: 'fish' as SpeciesType, label: 'Fish', icon: '🐟' },
                    { id: 'hen' as SpeciesType, label: 'Poultry', icon: '🐔' },
                    { id: 'pig' as SpeciesType, label: 'Pig', icon: '🐖' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCalcAnimal(item.id);
                        setActiveSpecies(item.id);
                        if (item.id === 'cow') setCalcAnimalCount(10);
                        else if (item.id === 'goat') setCalcAnimalCount(25);
                        else if (item.id === 'fish') setCalcAnimalCount(3000);
                        else if (item.id === 'hen') setCalcAnimalCount(200);
                        else if (item.id === 'pig') setCalcAnimalCount(12);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                        calcAnimal === item.id
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

              {/* Herd Headcount Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Herd / Flock Size:</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    {calcAnimalCount.toLocaleString()} {calcAnimal === 'fish' ? 'Fingerlings' : calcAnimal === 'hen' ? 'Birds' : 'Heads'}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcAnimal === 'fish' ? 500 : calcAnimal === 'hen' ? 50 : 2}
                  max={calcAnimal === 'fish' ? 8000 : calcAnimal === 'hen' ? 800 : 40}
                  step={calcAnimal === 'fish' ? 500 : calcAnimal === 'hen' ? 25 : 1}
                  value={calcAnimalCount}
                  onChange={(e) => setCalcAnimalCount(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Output Calculation Results */}
            <div className="lg:col-span-7 space-y-4 bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-emerald-500/40 shadow-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>📊 Structural Bill of Quantities (BOQ)</span>
                <span className="text-xs font-mono text-emerald-400">{current.title.split(' ')[0]} Housing</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Total Covered Shed Footprint</span>
                  <span className="font-mono font-bold text-white">{estimates.coveredArea.toLocaleString()} Sq. Ft.</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Open Exercise Paddock Area</span>
                  <span className="font-mono font-bold text-white">{estimates.openRunArea.toLocaleString()} Sq. Ft.</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Flooring / Mat Requirement</span>
                  <span className="font-mono font-bold text-cyan-400">{estimates.matsNeeded} {estimates.matName}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Estimated Mat / Bedding Investment</span>
                  <span className="font-mono font-bold text-white">₹{estimates.totalMatCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">GI Tubular Truss & Roofing Cost</span>
                  <span className="font-mono font-bold text-white">₹{estimates.steelFramingCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Concrete Plinth, Slopes & Gutters</span>
                  <span className="font-mono font-bold text-white">₹{estimates.masonryFloorCost.toLocaleString()}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs font-black text-white block">Total Estimated Shed Investment:</span>
                    <span className="text-[10px] text-slate-300">Turnkey civil, roofing & certified matting</span>
                  </div>
                  <span className="font-mono text-xl font-black text-emerald-400">
                    ₹{estimates.totalShedInvestment.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. CALLOUT TO LAUNCH DASHBOARD & LOG ANIMAL */}
      <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-950 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
            Ready to Build Your Shed?
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Download Detailed Architectural CAD Drawings & Blueprints
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Submit your plot dimensions to receive certified structural plans with exact GI pipe gauge specs, manger curves, and rubber mat layouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenCallVet && (
            <button
              onClick={onOpenCallVet}
              className="px-4 py-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 font-bold text-xs sm:text-sm border border-rose-800/60 transition flex items-center space-x-1.5"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Emergency Vet</span>
            </button>
          )}
          {onOpenRegister && (
            <button
              onClick={onOpenRegister}
              className="px-4 py-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs sm:text-sm border border-emerald-500/40 transition flex items-center space-x-1.5"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Register Animal</span>
            </button>
          )}
          <button
            onClick={() => setIsConsultModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center space-x-2"
          >
            <span>Request Custom CAD Blueprint</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate('/start-farming')}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
          >
            Back to Starter Service
          </button>
        </div>
      </section>

      {/* 7. CAD BLUEPRINT MODAL */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                  🏗️
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Shed Engineering Blueprint Consultation</h3>
                  <p className="text-[11px] text-slate-400">Receive certified structural drawing & mat layout</p>
                </div>
              </div>
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {consultMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-xs text-emerald-200 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Blueprint Request Dispatched</span>
                </div>
                <p>{consultMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Farmer / Engineer Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Patel"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">WhatsApp Phone Number:</label>
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
                    <label className="block text-slate-300 font-bold mb-1">Plot Area Available:</label>
                    <input
                      type="text"
                      placeholder="e.g. 5,000 Sq Ft or 0.5 Acre"
                      value={consultLandArea}
                      onChange={(e) => setConsultLandArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Selected Animal & Shed Type:</label>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold flex items-center justify-between">
                    <span>{current.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{current.coveredSqFtPerHead} Sq Ft / head</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 transition flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Blueprint & Mat Layout Request</span>
                  </button>
                  <p className="text-[10px] text-slate-500 text-center mt-2">
                    Free agricultural extension service supported by Livestock Ledger Suit.
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

export default ShedEngineeringPage;
