# Livestock Ledger & Herd Operations Suite

> Enterprise 2-Acre Domestic Livestock Management, Parametric Financial Modeling, Government Subsidies & Bankable DPR Generator, AI Health Triage, and Commercial Production Ledger.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-2023.0.3-blue.svg)](https://spring.io/projects/spring-cloud)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-3.7+-black.svg)](https://kafka.apache.org/)
[![React](https://img.shields.io/badge/React-18%2F19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌾 Overview & System Architecture

The **Livestock Ledger & Herd Operations Suite** is a full-featured agricultural operating platform engineered for 2-acre diversified domestic livestock holdings (Dairy Cattle, Elevated Goats, Freshwater Fish Ponds, Free-Range Country Poultry, and Yorkshire Swine). 

The platform combines distributed microservices, real-time STOMP WebSockets, and Kafka event buses with an intuitive, multi-page frontend offering rural text-to-speech audio guidance, 50% government subsidy DPR generators, daily milk Fat/SNF billing ledgers, and emergency veterinary first-aid triage.

```
                                  [ Browser / Client ]
                                           │
                           HTTP / REST     │     STOMP / SockJS
                       (http://localhost:8085)  (ws://localhost:8085/ws)
                                           ▼
                            ┌─────────────────────────────┐
                            │    Spring Cloud Gateway     │
                            │         (Port 8085)         │
                            └──────────────┬──────────────┘
                                           │
         ┌───────────────────┬─────────────┴───────┬───────────────────┐
         ▼                   ▼                     ▼                   ▼
┌──────────────────┐┌──────────────────┐┌──────────────────┐┌──────────────────┐
│ livestock-ledger ││  feed-inventory  ││ forecasting-pnl  ││ notification-mail│
│   (Port 8081)    ││   (Port 8082)    ││   (Port 8083)    ││   (Port 8084)    │
│  [livestock_db]  ││  [inventory_db]  ││  [forecast_db]   ││[notification_db] │
└────────┬─────────┘└────────┬─────────┘└────────┬─────────┘└────────▲─────────┘
         │                   │                   │                   │
         │ (animal.events)   │ (inventory.events)│                   │
         └─────────────►┌────┴───────────────────┴────┐──────────────┘
                        │     Apache Kafka Broker     │
                        │      (localhost:9092)       │
                        └─────────────────────────────┘
```

---

## 🕒 Chronological Feature Evolution (Time-to-Time Progress Log)

This project has continuously evolved to meet the real-world operational and economic needs of modern livestock farmers:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   PROJECT PROGRESS TIMELINE                                      │
├─────────────────┬──────────────────────────────────────────┬─────────────────────────────────────┤
│ Milestone       │ Features Added                           │ Purpose / Value                     │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 1         │ Spring Cloud Microservices + Kafka +     │ High-throughput telemetry, real-    │
│                 │ PostgreSQL + P&L Waterfall Simulator     │ time headcount sync & alerts.       │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 2         │ 2-Acre Domestic Livestock Hub + Leaflet  │ 5 Species (Cow, Goat, Fish, Hen,    │
│                 │ Spatial Master Map + RFID Ledger         │ Pig) with calibrated zones A to E.  │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 3         │ UI Decluttering + Multi-Page Navigation  │ Clean separate pages, mobile        │
│                 │ + Home Farm Tour + Marquee Running Strip │ drawer, and audio narration.        │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 4         │ Start Your Own Farm Incubation Service   │ 6-Step roadmap, 30-day onboarding   │
│                 │ (`/start-farming`)                       │ checklist & initial CapEx tool.     │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 5         │ Shed Engineering & Flooring Mat Guide    │ Natural convection sheds, 24mm cow  │
│                 │ (`/shed-engineering`)                    │ mats vs slatted floors analysis.    │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 6         │ Multi-Image Operational & Housing Tours  │ 6 High-res photo stages per animal: │
│                 │ (Ponds, Aerators, Mats, Husbandry)       │ ponds, dykes, aerators, zoom modal. │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 7         │ Government Subsidies & Bankable DPR      │ NABARD, NLM, PMMSY 50% grants with  │
│                 │ Generator (`/subsidy-schemes`)           │ 1-click printable bank dossiers.    │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 8         │ Daily Production & Milk / Egg / Meat     │ Morning/Evening milk, Fat-SNF auto- │
│                 │ Billing Ledger (`/production-ledger`)    │ billing rate formula & egg crates.  │
├─────────────────┼──────────────────────────────────────────┼─────────────────────────────────────┤
│ Phase 9         │ AI Symptom Diagnostic & Emergency First- │ 🔴 Critical / 🟡 Moderate triage    │
│                 │ Aid Triage Guide (`/symptom-diagnostic`) │ with golden-hour first-aid & SOS.   │
└─────────────────┴──────────────────────────────────────────┴─────────────────────────────────────┘
```

---

## 📖 Step-by-Step Instructions for Using Each Service

### 1. 🏛️ Government Subsidies & Bankable DPR Generator (`/subsidy-schemes`)
- **How to Use:**
  1. Navigate to **Govt Subsidies & DPR** from the sidebar or home page.
  2. Explore central and state schemes:
     - **NABARD DEDS**: 25%–33.3% subsidy for dairy cow units, milking machines, and chilling tanks.
     - **NLM Goat & Sheep Scheme**: 50% capital subsidy (up to ₹50 Lakhs) for 100+5 or 500+25 breeding units.
     - **PMMSY Freshwater Fisheries**: 40%–60% subsidy for earthen pond excavation, solar aerators, and feed inputs.
     - **NLM Piggery Scheme**: 50% capital subsidy for breeding pens, slatted floors, and biogas flush lines.
     - **AHIDF**: 3% interest subvention for silage baling and milk chilling infrastructure.
  3. Switch to **📑 2. Bankable DPR Generator**:
     - Select your species (e.g. 10 Dairy Cows, 50+3 Goats, 0.5 Acre Fish Pond).
     - Inspect the turnkey CapEx schedule, government subsidy grant, farmer equity margin, and bank term loan requirement.
     - Review the 5-year operating cash-flow forecast and Debt Service Coverage Ratio (DSCR).
     - Tap **"Print / Save as PDF"** to generate an official document formatted for your bank branch manager.
  4. Use the **Document Checklist** tab to verify land title (7/12 extract), Aadhaar, water test reports, and CIBIL eligibility (>650).

---

### 2. 🥛 Daily Production & Milk / Egg / Meat Ledger (`/production-ledger`)
- **How to Use:**
  1. Navigate to **Production & Milk Billing** (`/production-ledger`).
  2. Tap **"Record Morning / Evening Milk Collection"**:
     - Choose session (*Morning* or *Evening*).
     - Select animal species (*Cow* or *Goat*).
     - Enter volume in Liters, Fat %, and SNF %.
     - The system automatically calculates the price per liter and total collection payout using standard cooperative dairy pricing:
       $$\text{Rate (₹/L)} = (\text{Fat} \times 6.8) + (\text{SNF} \times 4.2)$$
     - Save the entry to immediately update daily totals and averages.
  3. Switch to **🥚 Poultry Egg Crates** to track daily good eggs, cracked eggs, 30-egg crate counts, and revenue.
  4. Switch to **🐟 Fish Net Sampling** to log sample counts, average fingerling weight in grams, Feed Conversion Ratio (FCR), and estimated pond biomass.
  5. Tap **"Print Daily Settlement Slips"** for milk buyers or accounting records.

---

### 3. 🩺 AI Animal Health Diagnostic & Emergency First-Aid Triage (`/symptom-diagnostic`)
- **How to Use:**
  1. Navigate to **AI Health & Triage Guide** (`/symptom-diagnostic`).
  2. Select your domestic animal (Cattle Cow, Goat, Fish Pond, Country Poultry, Yorkshire Pig).
  3. Filter by triage severity or type symptoms in the search bar (e.g. *"bloat"*, *"swollen udder"*, *"gasping"*, *"limping"*).
  4. Tap on any condition to expand its emergency dossier:
     - **Recognized Clinical Symptoms**: Bulleted signs to confirm diagnosis.
     - **Golden-Hour Immediate First-Aid**: Step-by-step actions to execute in the first 30 minutes before the doctor arrives (e.g., drenching mustard oil + hing for acute bloat; sodium percarbonate for pond oxygen deficit; Virkon-S for poultry).
     - **⚠️ Critical Warnings (What NOT to do)**: Essential precautions to prevent fatal errors.
     - **Licensed Veterinary Protocol**: Clinical injections and prescriptions required from a doctor.
  5. Tap **"🔊 Listen"** to hear voice instructions in clear Hindi/English.
  6. Tap **"SOS Dispatch"** to transmit the animal's ear tag, pen location, and symptom notes directly to the on-call veterinary mobile unit.

---

### 4. 📸 Multi-Image Pond & Shed Operational Galleries
- **Available on:**
  - [FarmStarterPage.tsx](file:///frontend/src/pages/FarmStarterPage.tsx) (in the Species Incubation Deep-Dive)
  - [ShedEngineeringPage.tsx](file:///frontend/src/pages/ShedEngineeringPage.tsx) (in the `📸 Multi-Image Photo Guide` tab)
  - [SpeciesManagementModule.tsx](file:///frontend/src/components/farm2acre/SpeciesManagementModule.tsx) (in the `📸 5. मल्टी-फोटो गाइड` tab)
- **Features:**
  - 6 photographic operational stages per animal:
    - **Fish**: Earthen pond excavation, paddlewheel aerators, fingerling acclimatization, plankton Secchi testing, extruded pellet feeding, and drag net harvesting.
    - **Cow**: Open-ridge barn, vulcanized rubber mats, mangers, herringbone milking parlor, exercise paddock, and silage bunker.
    - **Goat**: Elevated stilt machan, slatted timber floors, suspended loppings racks, kid nursery, and manure conveyors.
    - **Poultry**: Free-range run, deep-litter rice husk coop, 4-tier dark nest boxes, chick brooder lamps, and bell drinkers.
    - **Pig**: Sloped self-cleaning concrete pens, cooling wallows, farrowing crates with anti-crush rails, bite nipples, and biogas flush.
  - Click any thumbnail in the 6-image strip to jump to that operational step.
  - Tap **Zoom In** for full-screen inspection of engineering angles and construction materials.
  - Listen to step-by-step SOPs with integrated audio voice assistance.

---

### 5. 🚀 Start Your Own Farm Incubation Service (`/start-farming`)
- **How to Use:**
  1. Access the universal **6-Step Incubation Roadmap**:
     - Land Zoning & Environmental Orientation
     - Shed Construction & Biosecure Paddock
     - Procurement of Certified Pedigree Stock
     - Year-Round Green Fodder & Silage Bank
     - Cold-Chain Storage & Milk/Meat Aggregation
     - Bank Subsidies & Livestock Insurance
  2. Switch between the 5 domestic species to inspect covered space per animal, open run yard requirements, recommended starter breeds, and estimated monthly net profits.
  3. Track your stock arrival using the **First 30 Days Interactive Checklist**.
  4. Use the **Financial Feasibility Simulator** to calculate gross capital, eligible subsidy, and net farmer outlay based on custom headcount.

---

### 6. 🏛️ Shed Engineering & Flooring Mat Architecture (`/shed-engineering`)
- **How to Use:**
  1. Inspect **🏛️ Shed Structure**: Orientation rules (East-West axis), ridge monitor ventilation heights, roof overhang pitch, and Bill of Materials (BOM).
  2. Inspect **🛡️ Mats & Flooring**:
     - Scientifically proven flooring: 24mm interlocking vulcanized rubber cow mats, 1.5m elevated slatted composite timber for goats, HDPE pond liners, and cast-iron piglet creep slats.
     - Clinical benefits: 40% reduction in lameness, prevention of subclinical mastitis, and elimination of parasitic soil worms.
  3. Use the **📐 Cost Estimator** to compute covered square footage, roofing sheet count, and total mats needed.

---

## 📦 Microservices Breakdown

### 1. `api-gateway` (Port 8085)
- **Role**: Central entrypoint, reactive CORS management, and reverse proxy routing.
- **Routes**:
  - `/api/v1/animals/**` ➔ `http://localhost:8081`
  - `/api/v1/inventory/**` ➔ `http://localhost:8082`
  - `/api/v1/forecast/**` ➔ `http://localhost:8083`
  - `/api/v1/notifications/**` ➔ `http://localhost:8084`
  - `/ws/**` ➔ `ws://localhost:8081` (STOMP WebSocket proxying)

### 2. `livestock-ledger-service` (Port 8081 - DB: `livestock_db`)
- **Entities**:
  - `Animal`: Tag Number, Species, Status (`ACTIVE`, `QUARANTINE`, `SOLD`, `DECEASED`), Pen Location, Weight (kg), Birth Date, Acquisition Cost.
  - `LifeEvent`: Event Type (`BIRTH`, `MORTALITY`, `TREATMENT`, `TRANSFER`, `SALE`), Details, Recorded By, Event Timestamp.
- **Event Bus Pipeline**:
  - Dispatches `AnimalEvent` to Kafka topic `animal.events`.
  - Pushes live headcount deltas to STOMP topic `/topic/headcount` via `SimpMessagingTemplate`.

### 3. `feed-inventory-service` (Port 8082 - DB: `inventory_db`)
- **Entities**:
  - `FeedStock`: Feed Name, Quantity (kg), Cost/kg, Daily Consumption/Head, Reorder Threshold.
  - `ConsumptionLog`: Feed Stock ID, Pen Location, Quantity Consumed, Logged Timestamp.
- **Runway & Alert Logic**:
  - Real-time runway estimation: $\text{Runway (Days)} = \frac{\text{Quantity (kg)}}{\text{Daily Burn Rate} \times \text{Active Headcount}}$.
  - Emits `StockLowEvent` to Kafka topic `inventory.events` when stock drops below threshold.

### 4. `forecasting-pnl-service` (Port 8083 - DB: `forecast_db`)
- **Parametric Financial Model**:
  $$\text{Net Profit} = (\text{Surviving Headcount} \times \text{Market Price}) - (\text{Feed Expense} + \text{Veterinary Care} + \text{Mortality Depreciation} + \text{Operational Overhead})$$
- Generates waterfall accounting objects partitioned into Revenue, Feed, Vet, Mortality Losses, and Overhead.

### 5. `notification-mail-service` (Port 8084 - DB: `notification_db`)
- **Kafka Consumers**:
  - Listens to `animal.events`: Tracks 24-hour mortality rate. If casualties $\ge 3$, immediately triggers high-priority email via `JavaMailSender` and Thymeleaf.
  - Listens to `inventory.events`: Dispatches feed restock alert emails to the procurement officer.
- **Scheduled Job**:
  - `@Scheduled(cron = "0 0 8 * * MON")` to compile and send weekly executive digests to farm managers.

---

## 🎨 Modern React 19 Frontend (`/frontend`)

- **Full Client-Side Routing (`src/App.tsx`)**:
  - `/` — Integrated Home Farm Tour with Marquee Running Strip & Footer
  - `/dashboard` — Live Headcount Telemetry & Sensor Dashboard
  - `/start-farming` — Step-by-Step New Farm Setup Incubation Service
  - `/shed-engineering` — Shed Architecture & Flooring Mat Guidance
  - `/subsidy-schemes` — NABARD & NLM Subsidies & Bankable DPR Generator
  - `/production-ledger` — Daily Milk Fat/SNF Billing & Harvest Ledger
  - `/symptom-diagnostic` — AI Animal Health Diagnostic & First-Aid Triage Guide
  - `/animals` — Species Management Hub (Cow, Goat, Fish, Hen, Pig)
  - `/farm-map` — 2-Acre Master Zone Spatial Layout
  - `/registry` — RFID Master Animal Database & Life Events
  - `/feed-inventory` — Feed Stock Runway & Delivery Logging
  - `/financials` — Waterfall P&L Simulator
  - `/marketplace` — Certified Ear-Tagged Livestock Trading
  - `/veterinary` — Doctor Directory & 24/7 Helpline
  - `/bio-economy` — Zero-Waste Biogas & Bio-Slurry Circular Loop
  - `/nearby-farms` — Leaflet Local Farm Discovery Map
- **Speech Audio Engine (`src/utils/speechVoice.ts`)**: Rural Web Speech API text-to-speech for all operational guides.

---

## 🚀 Quickstart & Local Execution

### 1. Database Initialization
Execute `scripts/init-databases.sql` against your local PostgreSQL instance:
```sql
CREATE DATABASE livestock_db;
CREATE DATABASE inventory_db;
CREATE DATABASE forecast_db;
CREATE DATABASE notification_db;
```

### 2. Run Backend Microservices
Run each microservice using IntelliJ IDEA or Terminal:
```bash
# 1. Gateway
cd api-gateway && mvn spring-boot:run

# 2. Livestock Service
cd livestock-ledger-service && mvn spring-boot:run

# 3. Inventory Service
cd feed-inventory-service && mvn spring-boot:run

# 4. Forecasting Service
cd forecasting-pnl-service && mvn spring-boot:run

# 5. Notification Service
cd notification-mail-service && mvn spring-boot:run
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

To verify production build:
```bash
cd frontend
npm run build
```

---

## 🛠️ GitHub Repository Integration
This codebase is maintained and pushed to:
[https://github.com/2690806kundansingh/Livestock-Ledger-Herd-Operations-Suite.git](https://github.com/2690806kundansingh/Livestock-Ledger-Herd-Operations-Suite.git) on branch `main`.
