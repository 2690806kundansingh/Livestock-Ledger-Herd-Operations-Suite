// File: frontend/src/types/index.ts

export type AnimalStatus = 'ACTIVE' | 'QUARANTINE' | 'SOLD' | 'DECEASED';

export type LifeEventType = 'BIRTH' | 'MORTALITY' | 'TREATMENT' | 'TRANSFER' | 'SALE';

export interface Animal {
  id: number;
  tagNumber: string;
  species: string;
  status: AnimalStatus;
  penLocation: string;
  weightKg: number;
  birthDate: string;
  acquisitionCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface LifeEvent {
  id: number;
  animalId: number;
  eventType: LifeEventType;
  details: string;
  recordedBy: string;
  eventTimestamp: string;
}

export interface HeadcountSummary {
  totalHeadcount: number;
  activeCount: number;
  quarantineCount: number;
  soldCount: number;
  deceasedCount: number;
  juvenileCount: number;
  mortalityRatePercentage: number;
  calculatedAt: string;
}

export interface FeedStock {
  id: number;
  feedName: string;
  quantityKg: number;
  costPerKg: number;
  dailyConsumptionPerHeadKg: number;
  reorderThresholdKg: number;
  isLowStock: boolean;
  estimatedRunwayDays: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface WaterfallStep {
  name: string;
  amount: number;
  stepType: 'REVENUE' | 'EXPENSE' | 'SUMMARY';
  runningTotal: number;
}

export interface WaterfallForecast {
  simulationId: number;
  simulationName: string;
  startingHerdSize: number;
  survivingHeadcount: number;
  mortalityCount: number;
  grossRevenue: number;
  annualFeedExpense: number;
  veterinaryCare: number;
  mortalityDepreciation: number;
  operationalOverhead: number;
  totalExpenses: number;
  netProfit: number;
  profitMarginPercentage: number;
  isProfitable: boolean;
  waterfallSteps: WaterfallStep[];
  generatedAt: string;
}

export interface DeliveryLog {
  id: number;
  recipient: string;
  subject: string;
  templateUsed: string;
  status: 'SENT' | 'FAILED';
  errorMessage?: string;
  dispatchedAt: string;
}
