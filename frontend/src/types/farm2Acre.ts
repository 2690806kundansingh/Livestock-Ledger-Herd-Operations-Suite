// File: frontend/src/types/farm2Acre.ts

export type SpeciesType = 'cow' | 'goat' | 'fish' | 'hen' | 'pig';

export type ZoneId = 'zone-a' | 'zone-b' | 'zone-c' | 'zone-d' | 'zone-e';

export interface FarmZone {
  id: ZoneId;
  species: SpeciesType;
  zoneLetter: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  hindiName: string;
  areaSqFt: number;
  areaPercentage: string;
  gridCoords: string;
  summary: string;
  keyFeatures: string[];
  color: {
    bg: string;
    border: string;
    text: string;
    glow: string;
    fill: string;
  };
}

export interface HousingItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keyFeature: string;
  imageUrl: string;
}

export interface FeedItem {
  name: string;
  ratio: string;
  percentage: number;
  iconType: 'green' | 'dry' | 'concentrate' | 'pellet' | 'leaves' | 'mineral' | 'protein';
  details: string;
  recommendedTime: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  regNumber: string;
  phone: string;
  portraitUrl: string;
  nextCheckup: string;
  vaccineStatus: 'UP_TO_DATE' | 'DUE_SOON' | 'ACTIVE_CAMP';
  rating: number;
  specialty: string;
  clinicName: string;
}

export interface MarketplaceAnimal {
  id: string;
  species: SpeciesType;
  breedName: string;
  earTagId: string;
  dockerNumber: string;
  age: string;
  metric: string;
  price: number;
  imageUrl: string;
  status: 'AVAILABLE' | 'VACCINATED' | 'HEALTH_VERIFIED';
  contactPhone: string;
  location: string;
  notes: string;
}

export interface MarqueeAnimal {
  species: SpeciesType;
  name: string;
  actionText: string;
  imageUrl: string;
  headcount: number;
  audioAnnouncement: string;
}

export interface SpeciesModuleData {
  species: SpeciesType;
  commonName: string;
  scientificName: string;
  vernacularName: string;
  headcount: number;
  zoneId: ZoneId;
  zoneName: string;
  housingGallery: HousingItem[];
  feedingGuide: {
    summary: string;
    dailyIntake: string;
    speechText: string;
    feeds: FeedItem[];
  };
  doctorOnCall: DoctorProfile;
  marketplace: MarketplaceAnimal[];
}
