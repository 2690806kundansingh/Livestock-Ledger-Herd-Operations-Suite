// File: frontend/src/App.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { AppSidebar } from './components/AppSidebar';

// Dedicated Separate Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { LivestockHubPage } from './pages/LivestockHubPage';
import { FarmMapPage } from './pages/FarmMapPage';
import { HerdRegistryPage } from './pages/HerdRegistryPage';
import { FeedInventoryPage } from './pages/FeedInventoryPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { VeterinaryPage } from './pages/VeterinaryPage';
import { BioEconomyPage } from './pages/BioEconomyPage';
import { NearbyFarmsPage } from './pages/NearbyFarmsPage';
import { FarmStarterPage } from './pages/FarmStarterPage';
import { ShedEngineeringPage } from './pages/ShedEngineeringPage';

// Shared Components & Dialog Modals
import { FooterWithRunningImages } from './components/FooterWithRunningImages';
import { CallVetModal } from './components/landing/CallVetModal';
import { BuySellModal } from './components/landing/BuySellModal';
import { FarmGuideSidePanel } from './components/farm2acre/FarmGuideSidePanel';
import { ActivityLogModal } from './components/ActivityLogModal';
import { AnimalRegisterModal } from './components/AnimalRegisterModal';
import { NotificationAuditDrawer } from './components/NotificationAuditDrawer';

import { Animal, FeedStock } from './types';
import { SpeciesType } from './types/farm2Acre';
import { api } from './services/api';
import { wsService } from './services/websocket';
import { ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const location = useLocation();
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesType>('cow');
  const [isGuideSidePanelOpen, setIsGuideSidePanelOpen] = useState<boolean>(false);

  // Sidebar visibility & collapse states
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

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

  // Direct dialog modals
  const [isCallVetOpen, setIsCallVetOpen] = useState<boolean>(false);
  const [isBuySellOpen, setIsBuySellOpen] = useState<boolean>(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
      console.warn('Initial data load completed with fallback:', err);
    } finally {
      setLoadingAnimals(false);
      setIsRefreshing(false);
    }
  }, []);

  // Connect STOMP WebSocket on mount
  useEffect(() => {
    wsService.connect((import.meta as any).env?.VITE_WS_URL || 'http://localhost:8085/ws');

    const unsubscribeStatus = wsService.subscribeConnectionStatus((status) => {
      setWsConnected(status);
    });

    loadData();

    return () => {
      unsubscribeStatus();
      wsService.disconnect();
    };
  }, [loadData]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenEventModal = (animal?: Animal) => {
    setSelectedAnimalForEvent(animal || animals[0] || null);
    setIsEventModalOpen(true);
  };

  const handleSOSDispatched = (details: any) => {
    showToast(`🚨 Emergency SOS logged for ${details.selectedAnimal}! Mobile vet unit dispatched.`);
  };

  // Human-readable title for header breadcrumb based on current URL path
  const getPageTitle = (): string => {
    const p = location.pathname;
    if (p === '/' || p === '/home') return 'Farm Overview & Operations Guide';
    if (p === '/dashboard') return 'Dashboard Overview';
    if (p.startsWith('/animals')) return `Livestock Care Hub • ${selectedSpecies.toUpperCase()}`;
    if (p.startsWith('/farm-map')) return '2-Acre Master Farm Map';
    if (p.startsWith('/registry')) return 'Herd Master Registry';
    if (p.startsWith('/feed-inventory')) return 'Feed Inventory & Runway Telemetry';
    if (p.startsWith('/financials')) return 'Parametric Financials & P&L Simulator';
    if (p.startsWith('/marketplace')) return 'Buy & Sell Certified Livestock';
    if (p.startsWith('/veterinary')) return 'Veterinary Care & 24/7 Emergency SOS';
    if (p.startsWith('/bio-economy')) return 'Circular Bio-Economy Resource Flow';
    if (p.startsWith('/nearby-farms')) return 'Nearby Farms Discovery';
    if (p.startsWith('/start-farming')) return 'Farm Starter & Setup Service Guide';
    if (p.startsWith('/shed-engineering')) return 'Shed Architecture & Mat Guidance';
    return 'Farm Operations';
  };

  const lowStockCount = feedStocks.filter((f) => f.isLowStock).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Clear, Uncluttered Top Navigation Bar */}
      <Header
        wsConnected={wsConnected}
        currentTitle={getPageTitle()}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* 2. Main Multi-Page Layout with Left Navigation Sidebar */}
      <div className="flex-1 flex w-full relative">
        {/* Navigation Sidebar */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          selectedSpecies={selectedSpecies}
          onSelectSpecies={(species) => setSelectedSpecies(species)}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenActivityLog={() => handleOpenEventModal()}
          onOpenCallVet={() => setIsCallVetOpen(true)}
          onOpenGuide={() => setIsGuideSidePanelOpen(true)}
          onOpenAudit={() => setIsAuditOpen(true)}
          onRefreshAll={loadData}
          isRefreshing={isRefreshing}
          animalsCount={animals.length}
          lowStockCount={lowStockCount}
          wsConnected={wsConnected}
        />

        {/* Content Body: Routes render separate, focused pages */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <Routes>
              {/* PAGE 0: Farm Home Page Overview & Detailing */}
              <Route
                path="/"
                element={
                  <HomePage
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                  />
                }
              />
              <Route
                path="/home"
                element={
                  <HomePage
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                  />
                }
              />

              {/* PAGE 1: Dashboard Overview */}
              <Route
                path="/dashboard"
                element={
                  <DashboardPage
                    onOpenRegister={() => setIsRegisterOpen(true)}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                    animalsCount={animals.length}
                    lowStockCount={lowStockCount}
                  />
                }
              />

              {/* PAGE 2: Livestock Care Hub */}
              <Route
                path="/animals"
                element={
                  <LivestockHubPage
                    selectedSpecies={selectedSpecies}
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                  />
                }
              />

              {/* PAGE 3: 2-Acre Master Farm Map */}
              <Route
                path="/farm-map"
                element={
                  <FarmMapPage
                    selectedSpecies={selectedSpecies}
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                  />
                }
              />

              {/* PAGE 4: Herd Master Registry */}
              <Route
                path="/registry"
                element={
                  <HerdRegistryPage
                    animals={animals}
                    loading={loadingAnimals}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                    onSelectAnimalForEvent={handleOpenEventModal}
                  />
                }
              />

              {/* PAGE 5: Feed Stock Inventory */}
              <Route
                path="/feed-inventory"
                element={
                  <FeedInventoryPage
                    feedStocks={feedStocks}
                    onRefresh={loadData}
                    isRefreshing={isRefreshing}
                  />
                }
              />

              {/* PAGE 6: Financials & P&L Simulator */}
              <Route
                path="/financials"
                element={<FinancialsPage />}
              />

              {/* PAGE 7: Certified Livestock Marketplace */}
              <Route
                path="/marketplace"
                element={
                  <MarketplacePage
                    onOpenBuySell={() => setIsBuySellOpen(true)}
                  />
                }
              />

              {/* PAGE 8: Veterinary Care & Emergency SOS */}
              <Route
                path="/veterinary"
                element={
                  <VeterinaryPage
                    onSOSDispatched={handleSOSDispatched}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                  />
                }
              />

              {/* PAGE 9: Circular Bio-Economy */}
              <Route
                path="/bio-economy"
                element={<BioEconomyPage />}
              />

              {/* PAGE 10: Nearby Farms Discovery */}
              <Route
                path="/nearby-farms"
                element={<NearbyFarmsPage />}
              />

              {/* PAGE 11: Start Your Own Farm Incubation Service */}
              <Route
                path="/start-farming"
                element={
                  <FarmStarterPage
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                }
              />

              {/* PAGE 12: Livestock Shed Architecture & Mat Guidance Service */}
              <Route
                path="/shed-engineering"
                element={
                  <ShedEngineeringPage
                    onSelectSpecies={(species) => setSelectedSpecies(species)}
                    onOpenCallVet={() => setIsCallVetOpen(true)}
                    onOpenRegister={() => setIsRegisterOpen(true)}
                  />
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>

          {/* Running Images Footer with Marquee Livestock Photography & System Links */}
          <FooterWithRunningImages />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-emerald-500/60 shadow-2xl text-xs text-white flex items-center space-x-2 animate-bounce">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Shared Modals & Dialogs (Open only on explicit user request) */}
      <CallVetModal
        isOpen={isCallVetOpen}
        onClose={() => setIsCallVetOpen(false)}
      />

      <BuySellModal
        isOpen={isBuySellOpen}
        onClose={() => setIsBuySellOpen(false)}
        onSelectCategoryFilter={() => {}}
        onAddNewListing={(newItem) => {
          showToast(`Listing "${newItem.title}" published!`);
        }}
      />

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

      {/* Farmer's Guide Slide-out Drawer */}
      <FarmGuideSidePanel
        isOpen={isGuideSidePanelOpen}
        onClose={() => setIsGuideSidePanelOpen(false)}
        onSelectSpecies={(species) => setSelectedSpecies(species)}
        onScrollToSection={() => {}}
      />
    </div>
  );
};

export default App;
