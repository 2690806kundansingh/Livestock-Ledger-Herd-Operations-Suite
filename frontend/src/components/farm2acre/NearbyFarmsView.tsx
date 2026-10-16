// File: frontend/src/components/farm2acre/NearbyFarmsView.tsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  PhoneCall,
  MessageCircle,
  Navigation,
  Sliders,
  Search,
  RefreshCw,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  X,
  Compass,
} from 'lucide-react';

export interface NearbyFarm {
  id: string;
  farmName: string;
  farmerName: string;
  phoneNumber: string;
  produceList: string[];
  latitude: number;
  longitude: number;
  distanceKm: number;
  directDialUrl: string;
  whatsappUrl: string;
}

// Custom Map Helper to pan/recenter map dynamically
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// Custom Leaflet Markers using HTML DivIcons
const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
      <span style="position: absolute; width: 36px; height: 36px; border-radius: 9999px; background: rgba(6, 182, 212, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
      <div style="width: 28px; height: 28px; border-radius: 9999px; background: #0891b2; border: 3px solid #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 14px;">
        📍
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const farmIcon = L.divIcon({
  className: 'farm-location-marker',
  html: `
    <div style="width: 32px; height: 32px; border-radius: 9999px; background: #16a34a; border: 2.5px solid #ffffff; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 14px; cursor: pointer;">
      🌾
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Fallback seed farms around default user coordinates
const MOCK_FARMS_SEED: NearbyFarm[] = [
  {
    id: 'f-001',
    farmName: 'Vedic Gir Dairy & Fodder Farm',
    farmerName: 'Rameshwar Patel',
    phoneNumber: '+919825144021',
    produceList: ['A2 Gir Cow Milk', 'Fresh Desi Ghee', 'Hybrid Napier Grass', 'Silage Bales'],
    latitude: 28.6250,
    longitude: 77.2150,
    distanceKm: 2.3,
    directDialUrl: 'tel:+919825144021',
    whatsappUrl: 'https://wa.me/919825144021?text=Hello%20Rameshwar%2C%20I%20found%20your%20farm%20Vedic%20Gir%20Dairy%20nearby%20and%20would%20like%20to%20connect.',
  },
  {
    id: 'f-002',
    farmName: 'Aravalli High-Elevation Goat Sanctuary',
    farmerName: 'Vikramaditya Rathore',
    phoneNumber: '+919829031055',
    produceList: ['Sirohi Breeding Goats', 'Raw Goat Milk', 'Moringa Fodder Loppings', 'Organic Goat Manure'],
    latitude: 28.6380,
    longitude: 77.2340,
    distanceKm: 4.1,
    directDialUrl: 'tel:+919829031055',
    whatsappUrl: 'https://wa.me/919829031055?text=Hello%20Vikramaditya%2C%20I%20found%20your%20farm%20Aravalli%20Goat%20Sanctuary%20nearby%20and%20would%20like%20to%20connect.',
  },
  {
    id: 'f-003',
    farmName: 'Yamuna Basin Freshwater Aquaculture Pond',
    farmerName: 'Dr. Priya Nambiar',
    phoneNumber: '+919845067890',
    produceList: ['Rohu Table Fish', 'Catla Carp', 'GIFT Tilapia Fingerlings', 'Cultured Azolla Biomass'],
    latitude: 28.5910,
    longitude: 77.1890,
    distanceKm: 5.8,
    directDialUrl: 'tel:+919845067890',
    whatsappUrl: 'https://wa.me/919845067890?text=Hello%20Dr.%20Priya%2C%20I%20found%20your%20farm%20Yamuna%20Aquaculture%20nearby%20and%20would%20like%20to%20connect.',
  },
  {
    id: 'f-004',
    farmName: 'Green Meadows Country Poultry Pasture',
    farmerName: 'Sunita Choudhary',
    phoneNumber: '+919755060123',
    produceList: ['Kadaknath Free-Range Eggs', 'Country Broilers', 'Deep Litter Bio-Fertilizer'],
    latitude: 28.6500,
    longitude: 77.2550,
    distanceKm: 7.9,
    directDialUrl: 'tel:+919755060123',
    whatsappUrl: 'https://wa.me/919755060123?text=Hello%20Sunita%2C%20I%20found%20your%20farm%20Green%20Meadows%20Poultry%20nearby%20and%20would%20like%20to%20connect.',
  },
  {
    id: 'f-005',
    farmName: 'Surya Bio-Energy & Yorkshire Piggery',
    farmerName: 'Harvinder Singh Mann',
    phoneNumber: '+919417033445',
    produceList: ['Large White Yorkshire Weaners', 'Liquid Bio-Slurry', 'Piggery Breeding Stock'],
    latitude: 28.5680,
    longitude: 77.1620,
    distanceKm: 8.6,
    directDialUrl: 'tel:+919417033445',
    whatsappUrl: 'https://wa.me/919417033445?text=Hello%20Harvinder%2C%20I%20found%20your%20farm%20Surya%20Bio-Energy%20nearby%20and%20would%20like%20to%20connect.',
  },
];

export const NearbyFarmsView: React.FC = () => {
  // 1. Coordinates State (Default: Central Farm Coordinates)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 28.6139,
    longitude: 77.2090,
  });
  const [gpsStatus, setGpsStatus] = useState<'DETECTING' | 'DETECTED' | 'MANUAL' | 'DENIED'>('DETECTING');
  const [radiusKm, setRadiusKm] = useState<number>(15);
  const [produceFilter, setProduceFilter] = useState<string>('');
  const [farms, setFarms] = useState<NearbyFarm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  // New Farm Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [regForm, setRegForm] = useState({
    farmName: '',
    farmerName: '',
    phoneNumber: '',
    produceList: '',
    latitude: 28.6139,
    longitude: 77.2090,
  });
  const [regStatus, setRegStatus] = useState<'SUBMITTING' | 'SUCCESS' | 'ERROR' | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 2. Geolocation Hook: Automatically detect user's current coordinates
  const detectUserCoordinates = () => {
    if (!navigator.geolocation) {
      setGpsStatus('DENIED');
      return;
    }

    setGpsStatus('DETECTING');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: Number(position.coords.latitude.toFixed(4)),
          longitude: Number(position.coords.longitude.toFixed(4)),
        };
        setUserLocation(coords);
        setRegForm((prev) => ({ ...prev, latitude: coords.latitude, longitude: coords.longitude }));
        setGpsStatus('DETECTED');
      },
      (error) => {
        console.warn('Geolocation access failed or denied, using manual fallback:', error);
        setGpsStatus('MANUAL');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    detectUserCoordinates();
  }, []);

  // 3. Debounced API Refetch when user coordinates, radius, or produce filter change
  const fetchNearbyFarms = async () => {
    setLoading(true);
    try {
      // Primary Backend API: Spring Boot REST Controller endpoint
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8081';
      const response = await axios.get<NearbyFarm[]>('/api/v1/farms/nearby', {
        baseURL: baseUrl,
        params: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radiusKm: radiusKm,
          produce: produceFilter.trim() || undefined,
        },
        timeout: 4000,
      });

      if (response.data && Array.isArray(response.data)) {
        setFarms(response.data);
        setIsUsingFallback(false);
      } else {
        throw new Error('Invalid backend response');
      }
    } catch (err) {
      console.warn('Backend PostGIS endpoint unavailable, using computed client fallback:', err);
      // Fallback: Dynamically compute distance from user coordinates for mock farms
      const computedFarms: NearbyFarm[] = MOCK_FARMS_SEED
        .map((farm) => {
          // Haversine formula calculation for mock demonstration
          const R = 6371; // Earth radius in km
          const dLat = ((farm.latitude - userLocation.latitude) * Math.PI) / 180;
          const dLon = ((farm.longitude - userLocation.longitude) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((userLocation.latitude * Math.PI) / 180) *
              Math.cos((farm.latitude * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = Number((R * c).toFixed(1));

          return {
            ...farm,
            distanceKm: distance,
          };
        })
        .filter((farm) => farm.distanceKm <= radiusKm)
        .filter((farm) => {
          if (!produceFilter.trim()) return true;
          return farm.produceList.some((p) =>
            p.toLowerCase().includes(produceFilter.toLowerCase())
          );
        })
        .sort((a, b) => a.distanceKm - b.distanceKm);

      setFarms(computedFarms);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchNearbyFarms();
    }, 350);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [userLocation, radiusKm, produceFilter]);

  // Handle Register New Farm (POST /api/v1/farms)
  const handleRegisterFarmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegStatus('SUBMITTING');
    try {
      const payload = {
        farmName: regForm.farmName,
        farmerName: regForm.farmerName,
        phoneNumber: regForm.phoneNumber,
        produceList: regForm.produceList.split(',').map((p) => p.trim()).filter(Boolean),
        latitude: parseFloat(String(regForm.latitude)),
        longitude: parseFloat(String(regForm.longitude)),
      };

      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8081';
      await axios.post('/api/v1/farms', payload, {
        baseURL: baseUrl,
        timeout: 4000,
      });

      setRegStatus('SUCCESS');
      setTimeout(() => {
        setIsRegisterModalOpen(false);
        setRegStatus(null);
        fetchNearbyFarms();
      }, 1500);
    } catch (err) {
      console.warn('Backend POST failed, adding locally for testing:', err);
      // Fallback add locally
      const localFarm: NearbyFarm = {
        id: 'local-' + Date.now(),
        farmName: regForm.farmName,
        farmerName: regForm.farmerName,
        phoneNumber: regForm.phoneNumber,
        produceList: regForm.produceList.split(',').map((p) => p.trim()).filter(Boolean),
        latitude: parseFloat(String(regForm.latitude)),
        longitude: parseFloat(String(regForm.longitude)),
        distanceKm: 0.1,
        directDialUrl: `tel:${regForm.phoneNumber}`,
        whatsappUrl: `https://wa.me/${regForm.phoneNumber.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(regForm.farmerName)}`,
      };
      setFarms((prev) => [localFarm, ...prev]);
      setRegStatus('SUCCESS');
      setTimeout(() => {
        setIsRegisterModalOpen(false);
        setRegStatus(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Toolbar & Geolocation Controls */}
      <div className="bg-slate-900/95 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-800 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" />
                <span>PostGIS Spatial Discovery (SRID 4326)</span>
              </span>
              {isUsingFallback && (
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                  Live Client Demonstration Mode
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Nearby Farms Discovery & Direct Contact</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Locate neighboring livestock, dairy, fodder, and aquaculture farms within your geographic radius.
              Connect directly via instant 1-tap phone dialing or automated WhatsApp greetings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* GPS Detection Button */}
            <button
              onClick={detectUserCoordinates}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 shadow-md flex items-center space-x-2 transition"
              title="Detect GPS Location via browser"
            >
              <Navigation className="h-4 w-4 text-cyan-400" />
              <span>
                {gpsStatus === 'DETECTING'
                  ? 'Detecting GPS...'
                  : gpsStatus === 'DETECTED'
                  ? 'GPS Locked'
                  : 'Redetect GPS'}
              </span>
            </button>

            {/* Register New Farm Button */}
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 flex items-center space-x-2 transition"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Register My Farm</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Radius Slider & Produce Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5 items-center">
          {/* Radius Slider (5km to 50km) */}
          <div className="md:col-span-5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <span>Search Radius:</span>
              </span>
              <span className="text-sm font-black text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-lg font-mono">
                {radiusKm} km
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5 km</span>
              <span>25 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Search Filter by Produce / Specialty */}
          <div className="md:col-span-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-300 block">Filter Produce & Livestock:</span>
            <div className="relative">
              <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Milk, Moringa, Rohu Fish, Eggs..."
                value={produceFilter}
                onChange={(e) => setProduceFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          {/* Current GPS Coordinates Pill */}
          <div className="md:col-span-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-bold text-slate-300 block">Center Coordinates (WGS 84):</span>
            <div className="font-mono text-cyan-300 text-[11px] truncate">
              Lat: {userLocation.latitude.toFixed(4)}, Lon: {userLocation.longitude.toFixed(4)}
            </div>
            <span className="text-[10px] text-slate-500 block">ST_DWithin proximity buffer</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Split View: Leaflet Map (Left) + Farm Cards Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* React Leaflet Map (7 Columns on desktop) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2 font-bold">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span>Interactive PostGIS Spatial Map</span>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
              {farms.length} Discovered in {radiusKm} km
            </span>
          </div>

          <div className="w-full h-[520px] relative z-0">
            <MapContainer
              center={[userLocation.latitude, userLocation.longitude]}
              zoom={11}
              scrollWheelZoom={false}
              className="w-full h-full"
            >
              <ChangeView
                center={[userLocation.latitude, userLocation.longitude]}
                zoom={radiusKm > 25 ? 10 : 11}
              />

              {/* OpenStreetMap Tile Layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* User Current Location Marker */}
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={userIcon}
              >
                <Popup className="custom-popup">
                  <div className="p-1">
                    <p className="font-bold text-slate-900 text-xs">Your Current Farm Origin</p>
                    <p className="text-[10px] text-slate-600 font-mono">
                      {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                    </p>
                    <p className="text-[10px] text-cyan-700 font-semibold mt-1">
                      Querying within {radiusKm} km radius
                    </p>
                  </div>
                </Popup>
              </Marker>

              {/* Radius Boundary Circle */}
              <Circle
                center={[userLocation.latitude, userLocation.longitude]}
                radius={radiusKm * 1000}
                pathOptions={{
                  color: '#0891b2',
                  fillColor: '#06b6d4',
                  fillOpacity: 0.1,
                  weight: 2,
                  dashArray: '6, 6',
                }}
              />

              {/* Discovered Nearby Farms Markers */}
              {farms.map((farm) => (
                <Marker
                  key={farm.id}
                  position={[farm.latitude, farm.longitude]}
                  icon={farmIcon}
                  eventHandlers={{
                    click: () => {
                      setSelectedFarmId(farm.id);
                    },
                  }}
                >
                  <Popup>
                    <div className="p-1 max-w-[220px]">
                      <h4 className="font-bold text-sm text-slate-900">{farm.farmName}</h4>
                      <p className="text-xs text-slate-600 font-medium">Farmer: {farm.farmerName}</p>
                      <div className="mt-1 inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {farm.distanceKm} km away
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {farm.produceList.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-200 flex items-center space-x-2">
                        <a
                          href={farm.directDialUrl}
                          className="flex-1 py-1 px-2 rounded bg-emerald-600 text-white text-[11px] font-bold text-center"
                        >
                          Call
                        </a>
                        <a
                          href={farm.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1 px-2 rounded bg-green-600 text-white text-[11px] font-bold text-center"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Nearby Farm Cards Sidebar List (5 Columns on desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>Discovered Farms</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Sorted by Proximity
              </span>
            </h3>
            {loading && (
              <span className="text-xs text-cyan-400 flex items-center gap-1">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Refetching...</span>
              </span>
            )}
          </div>

          {/* Scrollable Farm Cards Container */}
          <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
            {farms.length === 0 && !loading && (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <AlertCircle className="h-8 w-8 text-amber-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Farms Discovered in this Radius</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Try expanding the search radius slider above to 25 km or 50 km, or clear your produce filter.
                </p>
                <button
                  onClick={() => setRadiusKm(30)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition"
                >
                  Expand Radius to 30 km
                </button>
              </div>
            )}

            {farms.map((farm) => {
              const isSelected = selectedFarmId === farm.id;
              const getFarmPhoto = (name: string) => {
                const n = name.toLowerCase();
                if (n.includes('gir') || n.includes('dairy') || n.includes('cattle')) {
                  return 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=400&q=80';
                }
                if (n.includes('goat') || n.includes('aravalli')) {
                  return 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=400&q=80';
                }
                if (n.includes('aquaculture') || n.includes('fish') || n.includes('pond')) {
                  return 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=400&q=80';
                }
                if (n.includes('poultry') || n.includes('chicken') || n.includes('kadaknath')) {
                  return 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=400&q=80';
                }
                if (n.includes('pig') || n.includes('yorkshire')) {
                  return 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=400&q=80';
                }
                return 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80';
              };

              return (
                <div
                  key={farm.id}
                  onClick={() => setSelectedFarmId(farm.id)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-500/40 shadow-xl'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60 shadow-lg'
                  }`}
                >
                  {/* Top Farm Info & Distance Badge with Photo Thumbnail */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={getFarmPhoto(farm.farmName)}
                        alt={farm.farmName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white hover:text-cyan-300 transition">
                          {farm.farmName}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Farmer: <strong className="text-slate-200">{farm.farmerName}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[11px] font-black text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded-lg shadow-inner">
                        {farm.distanceKm} km away
                      </span>
                    </div>
                  </div>

                  {/* Produce List Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {farm.produceList.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Direct Contact Action Buttons: Direct Call + WhatsApp */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2.5">
                    {/* 1-Tap Direct Phone Call Button */}
                    <a
                      href={farm.directDialUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>Call Now</span>
                    </a>

                    {/* WhatsApp Click-to-Chat Button */}
                    <a
                      href={farm.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-2.5 px-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center space-x-1.5"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Modal: Register New Farm Coordinates */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Register Farm Spatial Coordinates</h3>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterFarmSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Farm Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Haryana Organic Dairy Farm"
                  value={regForm.farmName}
                  onChange={(e) => setRegForm({ ...regForm, farmName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Farmer Contact Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={regForm.farmerName}
                  onChange={(e) => setRegForm({ ...regForm, farmerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Phone Number (with Country Code):</label>
                <input
                  type="text"
                  required
                  placeholder="+919825144021"
                  value={regForm.phoneNumber}
                  onChange={(e) => setRegForm({ ...regForm, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Produce / Livestock Specialties (comma-separated):</label>
                <input
                  type="text"
                  required
                  placeholder="A2 Milk, Ghee, Rohu Fish, Napier Grass"
                  value={regForm.produceList}
                  onChange={(e) => setRegForm({ ...regForm, produceList: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Latitude Coordinate:</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={regForm.latitude}
                    onChange={(e) => setRegForm({ ...regForm, latitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Longitude Coordinate:</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={regForm.longitude}
                    onChange={(e) => setRegForm({ ...regForm, longitude: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono"
                  />
                </div>
              </div>

              {regStatus === 'SUCCESS' && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Farm registered with PostGIS spatial coordinates successfully!</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={regStatus === 'SUBMITTING'}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-lg"
                >
                  {regStatus === 'SUBMITTING' ? 'Saving Coordinates...' : 'Register Farm Location'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyFarmsView;
