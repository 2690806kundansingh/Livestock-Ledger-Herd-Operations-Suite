// File: frontend/src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { CensusRibbon } from './components/CensusRibbon';
import { PnlForecastSimulator } from './components/PnlForecastSimulator';
import { AnimalDataGrid } from './components/AnimalDataGrid';
import { FeedInventoryWidget } from './components/FeedInventoryWidget';
import { ActivityLogModal } from './components/ActivityLogModal';
import { AnimalRegisterModal } from './components/AnimalRegisterModal';
import { NotificationAuditDrawer } from './components/NotificationAuditDrawer';
import { Animal, FeedStock } from './types';
import { api } from './services/api';
import { wsService } from './services/websocket';

export const App: React.FC = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [feedStocks, setFeedStocks] = useState<FeedStock[]>([]);
  const [loadingAnimals, setLoadingAnimals] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [wsConnected, setWsConnected] = useState<boolean>(false);

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isAuditOpen, setIsAuditOpen] = useState<boolean>(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [selectedAnimalForEvent, setSelectedAnimalForEvent] = useState<Animal | null>(null);

  // Fetch initial data
  const loadData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [fetchedAnimals, fetchedStocks] = await Promise.all([
        api.getAnimals(),
        api.getFeedStocks(),
      ]);
      setAnimals(fetchedAnimals);
      setFeedStocks(fetchedStocks);
    } catch (err) {
      console.warn('Initial data load completed with default/mock fallback:', err);
    } finally {
      setLoadingAnimals(false);
      setIsRefreshing(false);
    }
  }, []);

  // Connect STOMP WebSocket on application mount
  useEffect(() => {
    // Initialize STOMP connection to API Gateway -> Livestock Ledger Service
    wsService.connect('http://localhost:8080/ws');

    const unsubscribeStatus = wsService.subscribeConnectionStatus((status) => {
      setWsConnected(status);
    });

    loadData();

    return () => {
      unsubscribeStatus();
      wsService.disconnect();
    };
  }, [loadData]);

  const handleOpenEventModal = (animal?: Animal) => {
    setSelectedAnimalForEvent(animal || animals[0] || null);
    setIsEventModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        wsConnected={wsConnected}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAudit={() => setIsAuditOpen(true)}
        onRefreshAll={loadData}
        isRefreshing={isRefreshing}
      />

      {/* Main Operations Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. Real-Time Census Ribbon (Dynamic STOMP updates) */}
        <CensusRibbon />

        {/* 2. Parametric P&L Simulator & Waterfall Chart */}
        <PnlForecastSimulator />

        {/* 3. Feed Stock Inventory & Low Runway Warning Widget */}
        <FeedInventoryWidget
          feedStocks={feedStocks}
          onRefresh={loadData}
        />

        {/* 4. Herd Master Registry Data Grid */}
        <AnimalDataGrid
          animals={animals}
          loading={loadingAnimals}
          onSelectAnimalForEvent={handleOpenEventModal}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        Livestock Ledger & Herd Operations Suite • Production Spring Boot 3.3 & React Architecture
      </footer>

      {/* Modals & Drawers */}
      <AnimalRegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onAnimalRegistered={loadData}
      />

      <ActivityLogModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedAnimalForEvent(null);
        }}
        animals={animals}
        selectedAnimal={selectedAnimalForEvent}
        onEventLogged={loadData}
      />

      <NotificationAuditDrawer
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />
    </div>
  );
};

export default App;
