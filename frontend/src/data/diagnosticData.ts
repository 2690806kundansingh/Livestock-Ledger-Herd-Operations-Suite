// File: frontend/src/data/diagnosticData.ts

import { SpeciesType } from '../types/farm2Acre';

export type TriageSeverity = 'CRITICAL' | 'MODERATE' | 'MILD';

export interface SymptomCondition {
  id: string;
  species: SpeciesType;
  conditionName: string;
  hindiName: string;
  severity: TriageSeverity;
  recognizedSymptoms: string[];
  immediateFirstAid: string[];
  veterinaryActionRequired: string;
  doNotDoWarning: string;
  audioSpeechText: string;
  photoUrl: string;
}

export const SPECIES_DIAGNOSTIC_DATABASE: SymptomCondition[] = [
  // --- COW CONDITIONS ---
  {
    id: 'cow-frothy-bloat',
    species: 'cow',
    conditionName: 'Acute Ruminal Tympany (Frothy Bloat)',
    hindiName: 'गौवंश अफरा (पेट फूलना / टिम्पैनी)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'Left flank visibly ballooned like a tight drum',
      'Rapid labored breathing with tongue extended',
      'Frequent grunting and kicking at the belly',
      'Reluctance to move and sudden collapse',
    ],
    immediateFirstAid: [
      'Drench 250ml of vegetable cooking oil or mustard oil mixed with 10g Hing (asafoetida) to break surface foam.',
      'Tie a wooden bit or thick rope horizontally across the mouth like a bridle to induce continuous chewing and belching.',
      'Walk the cow uphill so rumen pressure shifts away from diaphragm and lungs.',
      'Keep cow standing; never let a severely bloated cow lie flat on its side.',
    ],
    veterinaryActionRequired:
      'If breathing becomes asphyxiated, licensed vet will perform emergency puncture at left paralumbar fossa using a trocar and cannula.',
    doNotDoWarning: 'Never drench liquids forcefully when cow is lying down; liquid can enter the trachea causing fatal inhalation pneumonia.',
    audioSpeechText:
      'Emergency Alert: Acute Bloat. Drench 250ml mustard oil with hing immediately to break foam. Tie a wooden stick across mouth to induce belching. Keep cow standing.',
    photoUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cow-mastitis',
    species: 'cow',
    conditionName: 'Clinical Mastitis (Udder Inflammation)',
    hindiName: 'थनैला रोग (स्तन शोथ)',
    severity: 'MODERATE',
    recognizedSymptoms: [
      'Hot, swollen, painful, and hard udder quarter',
      'Milk contains watery clots, flakes, or blood streaks',
      'Cow kicks violently when milker touches teat',
      'Fever (>103°F) and refusal to eat concentrate feed',
    ],
    immediateFirstAid: [
      'Perform complete frequent stripping of infected teat every 2 hours into a disinfectant pot (never onto floor).',
      'Apply cold ice packs or water hose to the hot quarter for 15 minutes to reduce swelling.',
      'Prepare California Mastitis Test (CMT) or test strip to verify affected quarter.',
      'Quarantine cow to be milked dead last after all healthy cows are finished.',
    ],
    veterinaryActionRequired:
      'Intramammary antibiotic infusion (e.g. Cefuroxime or Amoxicillin-Clavulanate) following sterile teat dip + systemic anti-inflammatory injection.',
    doNotDoWarning: 'Never leave infected milk unstripped in the quarter; stagnant milk toxins can destroy the secretory tissue permanently.',
    audioSpeechText:
      'Mastitis Alert: Strip affected quarter dry every two hours into a waste bucket. Apply cold packs to relieve swelling. Milk this cow last to protect other herd animals.',
    photoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cow-milk-fever',
    species: 'cow',
    conditionName: 'Hypocalcemia (Milk Fever / Downer Cow)',
    hindiName: 'मिल्क फीवर (सूतक ज्वर / कैल्शियम की कमी)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'Occurs within 24–72 hours after calving in high-yielding cows',
      'Cow unable to stand, rests with head turned back toward flank (S-shaped neck)',
      'Ears, muzzle, and extremities cold to the touch',
      'Dilated pupils and absence of urination/dunging',
    ],
    immediateFirstAid: [
      'Prop cow up into a sternal sitting position using straw bales so she does not bloat.',
      'Rub legs and spine vigorously with dry gunny sacks to stimulate blood circulation.',
      'Keep cow well-covered with warm blankets.',
      'Do not attempt oral drenching as swallowing reflex is completely paralyzed.',
    ],
    veterinaryActionRequired:
      'Slow intravenous infusion of 450ml Calcium Borogluconate (CBG 25%) while monitoring heart rate via stethoscope.',
    doNotDoWarning: 'NEVER force liquids down the throat of an unconscious or downer cow; swallowing muscles are paralyzed and liquid will drown the lungs.',
    audioSpeechText:
      'Milk Fever Emergency: Cow cannot stand after calving. Prop cow upright with straw bales. Do not give oral liquid. Call vet for immediate intravenous calcium infusion.',
    photoUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
  },

  // --- GOAT CONDITIONS ---
  {
    id: 'goat-enterotoxemia',
    species: 'goat',
    conditionName: 'Enterotoxemia (Overeating Disease / Pulpy Kidney)',
    hindiName: 'बकरियों में फिड़किया रोग (एंटेरोटॉक्सीमिया)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'Sudden convulsions, tooth grinding, and head pulled backward',
      'Greenish or foul watery diarrhea with mucous',
      'Extreme belly pain; goat stands with hunched back',
      'Rapid death within 6 to 12 hours if untreated',
    ],
    immediateFirstAid: [
      'Immediately isolate affected goat in a warm dry nursery pen.',
      'Drench 10g activated charcoal slurry in 100ml water to absorb gut toxins.',
      'Withhold all grains and concentrate pellets; supply only dry roughage hay.',
      'Administer oral electrolyte rehydration solution (ORS) with sodium bicarbonate.',
    ],
    veterinaryActionRequired:
      'Administration of Clostridium perfringens type D antitoxin serum + broad-spectrum parenteral antibiotics.',
    doNotDoWarning: 'Never feed high-starch grains or sudden rich green fodder when enterotoxemia is suspected in the herd.',
    audioSpeechText:
      'Goat Critical Alert: Enterotoxemia. Isolate goat immediately. Drench activated charcoal slurry to neutralize gut toxins. Stop grain feed completely.',
    photoUrl: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'goat-sore-mouth',
    species: 'goat',
    conditionName: 'Contagious Ecthyma (Orf / Sore Mouth)',
    hindiName: 'संक्रामक एक्थिमा (बकरी के मुंह में छाले / पपड़ी)',
    severity: 'MODERATE',
    recognizedSymptoms: [
      'Thick crusty scabs and painful blisters on lips, gums, and muzzle',
      'Young kids refuse to nurse milk due to mouth pain',
      'Nursing mother does develop lesions on teats and kick kids away',
      'Loss of body condition and secondary bacterial infection',
    ],
    immediateFirstAid: [
      'Wear protective latex gloves (Orf is zoonotic and can transmit to human hands).',
      'Clean crusted scabs gently with mild potassium permanganate (KMnO₄ 1:1000) solution.',
      'Apply povidone iodine 5% ointment mixed with glycerin on mouth lesions twice daily.',
      'Bottle-feed baby kids with warm milk so they do not starve.',
    ],
    veterinaryActionRequired:
      'Topical antimicrobial dressing and analgesics. Provide live attenuated vaccine to remaining healthy herd.',
    doNotDoWarning: 'Never pull off dry scabs forcefully as this causes deep bleeding and spreads the viral particles to other stalls.',
    audioSpeechText:
      'Sore Mouth Care: Wear gloves. Gently clean lip scabs with mild pink potassium permanganate solution and apply iodine glycerin. Bottle-feed weak baby kids.',
    photoUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=800&q=80',
  },

  // --- FISH CONDITIONS ---
  {
    id: 'fish-hypoxia',
    species: 'fish',
    conditionName: 'Dissolved Oxygen Depletion (Asphyxiation / Hypoxia)',
    hindiName: 'तालाब में ऑक्सीजन की भारी कमी (मछलियों का हांफना)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'Fish gathering at water surface with mouths wide open (piping)',
      'Occurs predominantly in pre-dawn hours (4:00 AM – 6:00 AM)',
      'Larger surface carps (Catla) affected first, moving sluggishly',
      'Water turns dark brownish-black or foul smelling',
    ],
    immediateFirstAid: [
      'Turn on all paddlewheel aerators and water pumps instantly.',
      'Spray high-pressure water hoses into the air to aerate falling droplets back into the pond.',
      'Apply emergency chemical oxygen tablets (Sodium Percarbonate) at 2 to 3 kg per 0.5 acre.',
      'STOP all feed broadcasting immediately; digesting feed doubles fish oxygen consumption.',
    ],
    veterinaryActionRequired:
      'Water exchange: pump in 25% fresh oxygenated borewell water immediately to flush toxic ammonia.',
    doNotDoWarning: 'Never feed fish when they are gasping at the surface; uneaten pellets sink and consume whatever little oxygen remains.',
    audioSpeechText:
      'Fish Pond Emergency: Dissolved oxygen critically low. Turn on paddlewheel aerators immediately. Broadcast sodium percarbonate oxygen granules. Stop feeding today.',
    photoUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fish-white-spot',
    species: 'fish',
    conditionName: 'Ichthyophthiriasis (White Spot Disease / Ich)',
    hindiName: 'मछलियों में सफेद दाग बीमारी (इच)',
    severity: 'MODERATE',
    recognizedSymptoms: [
      'Tiny white granular salt-like cysts scattered across skin, gills, and fins',
      'Fish flash and scrape their bodies against pond embankments and dykes',
      'Clamped fins and excessive mucous production',
      'Loss of appetite and lethargy',
    ],
    immediateFirstAid: [
      'Apply agricultural grade unrefined rock salt at 50 kg per 0.5 acre pond to create mild osmotic pressure.',
      'Dip infected sample fish in a 2% salt bath (20g salt per 1 liter water) for 60 seconds before return.',
      'Boost aeration and raise water temperature if using covered nursery tanks.',
    ],
    veterinaryActionRequired:
      'Apply CIFAX or potassium permanganate bath under supervision of district fisheries specialist.',
    doNotDoWarning: 'Do not transfer fish nets from an infected pond to healthy ponds without dipping nets in boiling water or bleach.',
    audioSpeechText:
      'Fish White Spot: Apply rock salt to pond to break parasite cycle. Dip affected sampling fish in 2% salt bath for 60 seconds. Disinfect all fishing nets.',
    photoUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80',
  },

  // --- POULTRY CONDITIONS ---
  {
    id: 'hen-ranikhet',
    species: 'hen',
    conditionName: 'Newcastle Disease (Ranikhet Disease)',
    hindiName: 'मुर्गियों में रानीखेत बीमारी (न्यूकैसल रोग)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'Twisted neck, circling movements, and paralysis of legs/wings (torticolis)',
      'Greenish watery diarrhea with white chalky urates',
      'Severe respiratory gasping, rattling breath, and facial swelling',
      'Sudden drop in egg production and high sudden flock mortality (>50%)',
    ],
    immediateFirstAid: [
      'Strict quarantine: isolate all birds displaying neurological head-twisting immediately.',
      'Spray poultry coop with 2% Virkon-S or sodium hypochlorite disinfectant mist.',
      'Administer high-dose Vitamin E + Selenium and Vitamin AD3E in drinking water.',
      'Do not allow outside wild birds or stray dogs near poultry runs.',
    ],
    veterinaryActionRequired:
      'Emergency viral reporting to District Disease Diagnostic Lab. Vaccinate unexposed healthy birds with Lasota / RDV vaccine.',
    doNotDoWarning: 'Never throw dead poultry carcasses in open fields; bury deeply in a 4-foot lime pit to stop airborne spread.',
    audioSpeechText:
      'Poultry Emergency: Suspected Ranikhet Newcastle Disease. Isolate birds with twisted necks immediately. Disinfect coop with Virkon-S. Bury casualties in a lime pit.',
    photoUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'hen-coccidiosis',
    species: 'hen',
    conditionName: 'Flock Coccidiosis (Bloody Droppings)',
    hindiName: 'मुर्गियों में खूनी दस्त (कॉक्सीडियोसिस)',
    severity: 'MODERATE',
    recognizedSymptoms: [
      'Droppings containing bright red blood streaks or orange mucous',
      'Chicks huddle together with ruffled feathers and closed eyes',
      'Pale comb and wattles due to acute intestinal blood loss',
      'Wet, soggy deep-litter bedding around waterers',
    ],
    immediateFirstAid: [
      'Scrape off and remove all wet rice-husk litter around water drinkers immediately.',
      'Spread dry agricultural lime powder on damp floor patches and lay fresh dry bedding.',
      'Add Amprolium 20% soluble powder (1g per 2 Liters) or Toltrazuril in drinking water for 5 consecutive days.',
      'Provide Vitamin K supplement to aid intestinal blood clotting.',
    ],
    veterinaryActionRequired:
      'Fecal microscopic examination to identify Eimeria species + anticoccidial rotation protocol.',
    doNotDoWarning: 'Never allow deep-litter bedding to remain wet; damp warm litter is the breeding incubator for coccidial oocysts.',
    audioSpeechText:
      'Coccidiosis Alert: Bloody droppings detected. Remove all wet floor bedding immediately and replace with dry husk. Add Amprolium water medicine for 5 days.',
    photoUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  },

  // --- PIG CONDITIONS ---
  {
    id: 'pig-piglet-anemia',
    species: 'pig',
    conditionName: 'Piglet Nutritional Iron Deficiency Anemia',
    hindiName: 'सूअर के बच्चों में खून की कमी (पिगलेट एनीमिया)',
    severity: 'MODERATE',
    recognizedSymptoms: [
      'Affects nursing piglets at 1 to 3 weeks of age in concrete pens',
      'Pale white ears, gums, and skin instead of healthy pink color',
      'Rapid thumping heartbeat and laboured breathing upon slight exertion',
      'Stunted growth, roughness of coat, and watery yellowish scour diarrhea',
    ],
    immediateFirstAid: [
      'Inject 2ml Iron Dextran (200mg elemental iron) intramuscularly behind the ear on Day 3 of life.',
      'Place clean, unfertilized red soil or peat sod in a corner of the creep area for piglets to root and absorb minerals.',
      'Ensure lactating mother sow receives high-protein mineralized ration.',
    ],
    veterinaryActionRequired:
      'Repeat secondary Iron Dextran injection at Day 14 if piglets exhibit persistent pallor.',
    doNotDoWarning: 'Sow milk is naturally deficient in iron; piglets raised on concrete pens WITHOUT iron injections will suffer severe mortality.',
    audioSpeechText:
      'Piglet Care: Iron deficiency anemia. Administer 200mg Iron Dextran injection behind ear. Provide clean mineral soil in creep box.',
    photoUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pig-swine-fever',
    species: 'pig',
    conditionName: 'Classical Swine Fever (Hog Cholera)',
    hindiName: 'स्वाइन फीवर (सूअर का संक्रामक बुखार)',
    severity: 'CRITICAL',
    recognizedSymptoms: [
      'High continuous fever (>105°F / 40.5°C) with shivering and huddling',
      'Reddish-purple hemorrhages and blotches on skin of ears, snout, and belly',
      'Conjunctivitis with sticky purulent crusts gluing eyelids shut',
      'Severe staggering gait with hind leg weakness',
    ],
    immediateFirstAid: [
      'Enforce complete quarantine: block all entry/exit into the piggery unit.',
      'Disinfect pen perimeter with 2% sodium hydroxide (caustic soda) solution.',
      'Administer oral electrolytes and antipyretic (paracetamol) under vet instruction.',
      'Notify the district livestock veterinary disease surveillance officer immediately.',
    ],
    veterinaryActionRequired:
      'Mandatory reporting of suspected swine fever. Annual tissue culture CSF vaccination for all breeding stock.',
    doNotDoWarning: 'Never feed untreated hotel swill waste containing raw pork scraps; swill feeding is the #1 vector for swine fever outbreaks.',
    audioSpeechText:
      'Critical Pig Alert: Suspected Swine Fever. Purple skin blotches and high fever. Strict quarantine required. Disinfect with caustic soda and call vet immediately.',
    photoUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
  },
];
