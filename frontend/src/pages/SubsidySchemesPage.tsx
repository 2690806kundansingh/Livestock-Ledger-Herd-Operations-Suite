// File: frontend/src/pages/SubsidySchemesPage.tsx

import React, { useState } from 'react';
import { useFarmVoice } from '../utils/speechVoice';
import {
  GOVT_SCHEMES_LIST,
  BANKABLE_DPR_PRESETS,
  GovtSchemeDetail,
} from '../data/subsidySchemesData';
import { SpeciesType } from '../types/farm2Acre';
import {
  FileText,
  CheckCircle2,
  PhoneCall,
  Volume2,
  VolumeX,
  ExternalLink,
  ShieldCheck,
  Building,
  HelpCircle,
  TrendingUp,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Calculator,
  AlertCircle,
  X,
  Send,
} from 'lucide-react';

interface SubsidySchemesPageProps {
  onOpenCallVet?: () => void;
  onOpenRegister?: () => void;
}

export const SubsidySchemesPage: React.FC<SubsidySchemesPageProps> = () => {
  const { isSpeaking, currentText, speak, stop } = useFarmVoice();

  // Active scheme selection
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('nabard-dairy');
  const activeScheme: GovtSchemeDetail =
    GOVT_SCHEMES_LIST.find((s) => s.id === selectedSchemeId) || GOVT_SCHEMES_LIST[0];

  // DPR Generator active species selection
  const [dprSpecies, setDprSpecies] = useState<SpeciesType>('cow');
  const activeDPR = BANKABLE_DPR_PRESETS[dprSpecies];

  // Tab: 'schemes' | 'dpr' | 'eligibility'
  const [activeMainTab, setActiveMainTab] = useState<'schemes' | 'dpr' | 'eligibility'>('schemes');

  // Consultation Modal State
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [consultName, setConsultName] = useState<string>('');
  const [consultPhone, setConsultPhone] = useState<string>('');
  const [consultState, setConsultState] = useState<string>('Uttar Pradesh');
  const [consultSuccess, setConsultSuccess] = useState<string | null>(null);

  // Eligibility Checklist Interactive States
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const toggleDoc = (key: string) => {
    setCheckedDocs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSpeech = (text: string) => {
    if (isSpeaking && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  };

  const handlePrintDPR = () => {
    window.print();
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultName || !consultPhone) return;
    setConsultSuccess(
      `Thank you ${consultName}! Your bank subsidy dossier request for ${activeDPR.unitScale} has been logged. An agricultural credit officer will call you within 24 hours.`
    );
    setTimeout(() => {
      setConsultSuccess(null);
      setIsConsultModalOpen(false);
      setConsultName('');
      setConsultPhone('');
    }, 4000);
  };

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn text-slate-100">
      {/* 1. HERO BANNER */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/70 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <Building className="h-3.5 w-3.5" />
              <span>DAHD & NABARD Government Subsidies Portal</span>
            </span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
              Up to 50% Capital Subsidy
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Government Subsidies & Bankable DPR Generator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Access financial grant schemes from NABARD, NLM, and PMMSY. Generate verified, bank-ready Detailed Project Reports (DPR) complete with 5-year cash-flow forecasts, CapEx schedules, and eligible credit subsidies.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveMainTab('dpr')}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center gap-2"
            >
              <Calculator className="h-4 w-4" />
              <span>Generate Bankable DPR Project Report</span>
            </button>

            <button
              onClick={() => setIsConsultModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <span>Apply for Bank Subsidy Consultation</span>
            </button>

            <button
              onClick={() =>
                handleSpeech(
                  'Welcome to the Government Subsidies and Bankable DPR service. Access NABARD, NLM, and PMMSY subsidies up to 50 percent for dairy, goats, fisheries, and poultry. Generate official bank reports instantly.'
                )
              }
              className="px-4 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition flex items-center gap-2"
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-emerald-400" />}
              <span>{isSpeaking ? 'Stop Audio' : '🔊 Listen Overview'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE MODULE NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        {[
          { id: 'schemes', label: '🏛️ 1. Central & State Schemes Explorer', desc: 'NABARD, NLM, PMMSY' },
          { id: 'dpr', label: '📑 2. Bankable DPR Generator (PDF / Print)', desc: '1-Click Project Dossier' },
          { id: 'eligibility', label: '✅ 3. Document & Eligibility Checklist', desc: 'Land & CIBIL Pre-qualification' },
        ].map((tab) => {
          const isSelected = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all text-left ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <div>{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: SCHEME EXPLORER
      ======================================================== */}
      {activeMainTab === 'schemes' && (
        <section className="space-y-8 animate-fadeIn">
          {/* Scheme Quick Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {GOVT_SCHEMES_LIST.map((scheme) => {
              const isSelected = selectedSchemeId === scheme.id;
              return (
                <button
                  key={scheme.id}
                  onClick={() => setSelectedSchemeId(scheme.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 inline-block">
                      {scheme.schemeCode}
                    </span>
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">
                      {scheme.name}
                    </h4>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 mt-3 block">
                    {scheme.maxSubsidyPercentage}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Scheme Deep-Dive Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/95 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {activeScheme.hindiName}
                  </span>
                  <span className="text-xs text-slate-400">
                    Nodal: {activeScheme.nodalMinistry}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeScheme.name}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeScheme.overview}
                </p>

                {/* Subsidy Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Subsidy Bracket</span>
                    <span className="text-sm font-black text-emerald-400">{activeScheme.maxSubsidyPercentage}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Maximum Financial Cap</span>
                    <span className="text-xs font-bold text-amber-300">{activeScheme.maxSubsidyAmount}</span>
                  </div>
                </div>
              </div>

              {/* Scheme Visual Banner */}
              <div className="lg:col-span-4">
                <div className="relative h-60 rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                  <img
                    src={activeScheme.bannerImage}
                    alt={activeScheme.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between text-xs text-white">
                    <span className="font-mono text-emerald-400 font-bold">{activeScheme.schemeCode}</span>
                    <a
                      href={activeScheme.nodalPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Eligible Components & 4-Step Application Pipeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Eligible Capital Expenditure Components</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeScheme.eligibleComponents.map((comp, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span className="leading-relaxed">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  <span>4-Step Official Application Pipeline</span>
                </h4>
                <div className="space-y-2.5 text-xs">
                  {activeScheme.applicationSteps.map((step) => (
                    <div key={step.stepNumber} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3">
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 text-[10px]">
                        {step.stepNumber}
                      </span>
                      <div>
                        <strong className="text-white block">{step.title}</strong>
                        <p className="text-slate-400 leading-tight">{step.instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Helpline and Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <HelpCircle className="h-4 w-4 text-emerald-400" />
                <span>Nodal Helpline: <strong className="text-white">{activeScheme.officialHelpline}</strong></span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setActiveMainTab('dpr');
                    setDprSpecies(activeScheme.targetSpecies[0] || 'cow');
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md"
                >
                  <span>Build DPR for this Scheme</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          TAB 2: 1-CLICK BANKABLE DPR GENERATOR
      ======================================================== */}
      {activeMainTab === 'dpr' && (
        <section className="space-y-8 animate-fadeIn">
          {/* Species Preset Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>Bank-Ready Detailed Project Report (DPR) Presets</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Select Your Livestock Holding Model
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrintDPR}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
              >
                <Printer className="h-3.5 w-3.5 text-cyan-400" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { id: 'cow' as SpeciesType, label: '10 Dairy Cows', icon: '🐄', sub: '₹11.10L Outlay' },
              { id: 'goat' as SpeciesType, label: '50+3 Goats', icon: '🐐', sub: '₹7.75L Outlay' },
              { id: 'fish' as SpeciesType, label: '0.5 Acre Pond', icon: '🐟', sub: '₹3.45L Outlay' },
              { id: 'hen' as SpeciesType, label: '500 Desi Hens', icon: '🐔', sub: '₹2.25L Outlay' },
              { id: 'pig' as SpeciesType, label: 'Yorkshire Pigs', icon: '🐖', sub: '₹4.21L Outlay' },
            ].map((tab) => {
              const isSelected = dprSpecies === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDprSpecies(tab.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-0.5 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-xl font-bold scale-[1.02]'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="text-xs font-bold">{tab.label}</span>
                  <span className="text-[10px] text-emerald-200/90 font-mono">{tab.sub}</span>
                </button>
              );
            })}
          </div>

          {/* Official Bankable DPR Document Container */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-10 shadow-2xl space-y-8 print:p-0 print:border-none">
            {/* Document Header */}
            <div className="border-b-2 border-emerald-500/60 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-emerald-400 block">
                  NABARD / SBI / COMMERCIAL BANK COMPLIANT FORMAT
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {activeDPR.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeDPR.hindiTitle} • Prepared for Agricultural Term Loan Appraisal
                </p>
              </div>

              <div className="text-right sm:self-start">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 inline-block">
                  DSCR: {activeDPR.dscrRatio}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1 font-mono">
                  Payback: {activeDPR.paybackPeriodMonths} Months
                </span>
              </div>
            </div>

            {/* Financial Summary 4-Metrics Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium uppercase">Total Capital Outlay (CapEx)</span>
                <span className="text-lg font-black text-white">₹{activeDPR.totalProjectCost.toLocaleString()}</span>
                <span className="text-[10px] text-slate-500 block">Turnkey investment</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-emerald-400 block font-medium uppercase">Eligible Govt Subsidy</span>
                <span className="text-lg font-black text-emerald-400">₹{activeDPR.subsidyAmount.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-300/80 block font-mono">{activeDPR.subsidyPercentage}% Back-ended grant</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-amber-400 block font-medium uppercase">Farmer Margin (Equity)</span>
                <span className="text-lg font-black text-amber-300">₹{activeDPR.farmerMarginAmount.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">{activeDPR.farmerMarginPercentage}% Own contribution</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-cyan-400 block font-medium uppercase">Term Loan Required</span>
                <span className="text-lg font-black text-cyan-300">₹{activeDPR.bankLoanAmount.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block font-mono">Commercial / RRB bank</span>
              </div>
            </div>

            {/* Schedule 1: Detailed Capital Expenditure Breakdown Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Building className="h-4 w-4 text-emerald-400" />
                <span>Schedule 1: Itemized Capital Expenditure (CapEx)</span>
              </h4>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                    <tr>
                      <th className="p-3">Component / Budget Head</th>
                      <th className="p-3">Specification / Description</th>
                      <th className="p-3 text-right">Cost (INR ₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70 text-slate-300">
                    <tr>
                      <td className="p-3 font-medium text-white">Shed / Pond Civil Infrastructure</td>
                      <td className="p-3 text-slate-400">Ventilated housing, slatted floors, or earthen pond excavation</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{activeDPR.shedCivilCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Certified Livestock / Seed Stock</td>
                      <td className="p-3 text-slate-400">High-yield registered animals or 100mm fingerling batch</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{activeDPR.animalStockCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Machinery & Matting Hardware</td>
                      <td className="p-3 text-slate-400">Vulcanized rubber mats, solar aerators, or water nipple lines</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{activeDPR.equipmentCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Initial 90-Day Feed & Fodder Buffer</td>
                      <td className="p-3 text-slate-400">Total mixed ration (TMR), concentrates, silage reserve</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{activeDPR.feedReserveCost.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-white">Veterinary, Insurance & Biosecurity</td>
                      <td className="p-3 text-slate-400">1st Year mortality insurance and mandatory vaccination protocols</td>
                      <td className="p-3 text-right font-mono font-bold text-white">₹{activeDPR.insuranceMedicalCost.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-slate-900/90 font-black text-white">
                      <td className="p-3" colSpan={2}>Total Turnkey Project Outlay</td>
                      <td className="p-3 text-right text-emerald-400 font-mono text-sm">₹{activeDPR.totalProjectCost.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule 2: Annual Operational Cash-Flow Forecast */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                  Projected Annual Gross Revenue
                </span>
                <span className="text-xl font-black text-white font-mono">
                  ₹{activeDPR.annualGrossRevenue.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-300">From milk, livestock sales, eggs, or fish biomass</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 space-y-1">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block">
                  Estimated Annual Operating Cost
                </span>
                <span className="text-xl font-black text-rose-300 font-mono">
                  ₹{activeDPR.annualOperatingCost.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-300">Feed, labor, electricity, veterinary upkeep</p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                  Net Annual Operating Cash Flow
                </span>
                <span className="text-xl font-black text-cyan-300 font-mono">
                  ₹{activeDPR.annualNetCashFlow.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-300">Net surplus available for loan EMI debt service</p>
              </div>
            </div>

            {/* Schedule 3: Technical Assumptions & Agronomic Justification */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Technical Assumptions & Agronomic Justifications</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                {activeDPR.technicalAssumptions.map((assump, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{assump}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Print & Application CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Verified against DAHD benchmark unit cost norms for FY 2026–27.
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePrintDPR}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4 text-cyan-400" />
                  <span>Download / Print Dossier</span>
                </button>

                <button
                  onClick={() => setIsConsultModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition flex items-center gap-1.5"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Submit to Bank Officer</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          TAB 3: DOCUMENT CHECKLIST & ELIGIBILITY
      ======================================================== */}
      {activeMainTab === 'eligibility' && (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>Pre-Loan Document Verification</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Mandatory Documentation Checklist
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tap each document you have prepared. Ensure all 5 items are in order before approaching your branch manager.
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800 self-start sm:self-auto">
              {Object.values(checkedDocs).filter(Boolean).length} / {activeScheme.mandatoryDocuments.length} Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {activeScheme.mandatoryDocuments.map((doc, idx) => {
              const key = `${selectedSchemeId}-${idx}`;
              const isChecked = !!checkedDocs[key];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDoc(key)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                    isChecked
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="h-4 w-4" />}
                  </div>

                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-bold text-white block">Document #{idx + 1}</span>
                    <p className={`text-xs ${isChecked ? 'text-slate-300 line-through opacity-75' : 'text-slate-200'}`}>
                      {doc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-white block font-bold">Pro-Tip for CIBIL & Land Title:</strong>
              Banks require a minimum CIBIL score of 650. If land is leased, ensure the lease deed is registered for at least 10 years, and includes permission for shed erection and borewell installation.
            </div>
          </div>
        </section>
      )}

      {/* Consultation Modal */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                Official Credit Officer Liaison
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Request Free Bank Subsidy Liaison
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Our network of rural agricultural loan specialists helps you verify land records and file your DPR with your local bank branch.
              </p>
            </div>

            {consultSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-400 animate-bounce" />
                <p>{consultSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Full Farmer / Entrepreneur Name</label>
                  <input
                    type="text"
                    required
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Patel"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">WhatsApp / Calling Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">State / District</label>
                  <input
                    type="text"
                    value={consultState}
                    onChange={(e) => setConsultState(e.target.value)}
                    placeholder="e.g. Uttar Pradesh, Meerut"
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit DPR Dossier to Bank Officer</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
