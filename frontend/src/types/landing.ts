// File: frontend/src/types/landing.ts

export type LivestockCategory = 'Cattle' | 'Buffalo' | 'Goat' | 'Poultry';

export interface LivestockShowcaseItem {
  id: string;
  title: string;
  category: LivestockCategory;
  breed: string;
  tagNumber: string;
  price: number;
  originalPrice?: number;
  negotiable: boolean;
  age: string;
  weightKg: number;
  yieldMetric?: string; // e.g. "18.5 L/day" or "280 eggs/yr"
  healthStatus: 'CERTIFIED' | 'VACCINATED' | 'PREGNANT_VERIFIED' | 'TOP_PEDIGREE';
  healthScore: number; // 0 - 100
  vaccines: string[];
  dewormedDate: string;
  vetCertified: boolean;
  vetName: string;
  location: string;
  mediaUrl: string;
  reelBadge?: string;
  reelViews: number;
  likes: number;
  sellerName: string;
  sellerRating: number;
  sellerPhone: string;
  isVerifiedSeller: boolean;
  description: string;
}

export interface HealthStepPictogram {
  stepNumber: number;
  title: string;
  subtitle: string;
  pictogramEmoji: string;
  iconName: string;
  summary: string;
  keyMetric: string;
  detailedPoints: string[];
  dos: string[];
  donts: string[];
  color: string;
}

export interface VetDoctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  availability: 'ONLINE_NOW' | 'ON_CALL' | 'IN_SURGERY';
  phone: string;
  imageUrl: string;
  distanceKm: number;
}

export interface EmergencyTicket {
  id: string;
  farmerName: string;
  contactNumber: string;
  location: string;
  animalType: LivestockCategory;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  condition: string;
  reportedAt: string;
}
