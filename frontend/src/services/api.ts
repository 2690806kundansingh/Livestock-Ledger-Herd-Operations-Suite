// File: frontend/src/services/api.ts

import { Animal, AnimalStatus, HeadcountSummary, LifeEvent, FeedStock, WaterfallForecast, DeliveryLog } from '../types';

const API_BASE_URL = 'http://localhost:8080';

export const api = {
  // Animals & Census
  async getAnimals(status?: AnimalStatus): Promise<Animal[]> {
    const url = status 
      ? `${API_BASE_URL}/api/v1/animals?status=${status}` 
      : `${API_BASE_URL}/api/v1/animals`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch animals');
    return res.json();
  },

  async registerAnimal(data: {
    tagNumber: string;
    species: string;
    penLocation: string;
    weightKg: number;
    birthDate: string;
    acquisitionCost: number;
  }): Promise<Animal> {
    const res = await fetch(`${API_BASE_URL}/api/v1/animals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to register animal');
    }
    return res.json();
  },

  async recordLifeEvent(data: {
    animalId: number;
    eventType: string;
    details?: string;
    recordedBy: string;
    newPenLocation?: string;
    causeOfDeath?: string;
    treatmentNotes?: string;
    salePrice?: number;
  }): Promise<LifeEvent> {
    const res = await fetch(`${API_BASE_URL}/api/v1/animals/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to record life event');
    }
    return res.json();
  },

  async getCensus(): Promise<HeadcountSummary> {
    const res = await fetch(`${API_BASE_URL}/api/v1/animals/census`);
    if (!res.ok) throw new Error('Failed to fetch census data');
    return res.json();
  },

  async getAnimalEvents(animalId: number): Promise<LifeEvent[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/animals/${animalId}/events`);
    if (!res.ok) throw new Error('Failed to fetch animal history');
    return res.json();
  },

  // Feed Inventory
  async getFeedStocks(): Promise<FeedStock[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/inventory/stocks`);
    if (!res.ok) throw new Error('Failed to fetch feed stocks');
    return res.json();
  },

  async recordFeedDelivery(data: {
    feedStockId: number;
    quantityKg: number;
    updatedCostPerKg?: number;
    supplierNotes?: string;
  }): Promise<FeedStock> {
    const res = await fetch(`${API_BASE_URL}/api/v1/inventory/deliveries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to record delivery');
    return res.json();
  },

  async recordFeedConsumption(data: {
    feedStockId: number;
    penLocation: string;
    quantityConsumedKg: number;
    currentActiveHeadcount?: number;
  }): Promise<FeedStock> {
    const res = await fetch(`${API_BASE_URL}/api/v1/inventory/consumption`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to log consumption');
    return res.json();
  },

  // Forecasting PnL
  async simulateForecast(params: {
    startingHerdSize: number;
    projectedMortalityRate: number;
    feedCostPerHead: number;
    feedInflationRate: number;
    vetCostPerHead: number;
    targetSalePrice: number;
    simulationName?: string;
  }): Promise<WaterfallForecast> {
    const res = await fetch(`${API_BASE_URL}/api/v1/forecast/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Failed to simulate forecast');
    return res.json();
  },

  // Notifications
  async getDeliveryLogs(): Promise<DeliveryLog[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/notifications/logs`);
    if (!res.ok) throw new Error('Failed to fetch notification logs');
    return res.json();
  },

  async triggerTestAlert(data: {
    recipient?: string;
    alertType: 'MORTALITY' | 'INVENTORY';
    tagNumber?: string;
    penLocation?: string;
    details?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/api/v1/notifications/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to trigger test alert');
    return res.json();
  }
};
