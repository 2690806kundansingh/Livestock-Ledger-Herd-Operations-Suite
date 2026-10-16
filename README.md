# Livestock Ledger & Herd Operations Suite

> Distributed enterprise farm management and parametric financial modeling platform inspired by Farmbrite and CattleMax.

[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.org/projects/jdk/21/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-2023.0.3-blue.svg)](https://spring.io/projects/spring-cloud)
[![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-3.7+-black.svg)](https://kafka.apache.org/)
[![React](https://img.shields.io/badge/React-18%2F19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌾 Overview & System Architecture

The **Livestock Ledger & Herd Operations Suite** is an autonomous distributed microservices platform engineered for enterprise feedlots, ranches, and livestock operations. The system coordinates real-time animal telemetry, feed runway forecasting, multi-variable financial simulations, and automated emergency alert dispatching across high-throughput Kafka pipelines and reactive WebSockets.

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
- **Templates**: High-contrast, responsive HTML emails (`mortality-alert.html`, `inventory-alert.html`, `weekly-digest.html`).

---

## 🎨 Modern React 19 Frontend (`/frontend`)

- **STOMP over SockJS (`src/services/websocket.ts`)**: Auto-reconnecting real-time subscriber to `/topic/headcount`.
- **Census Ribbon (`src/components/CensusRibbon.tsx`)**: Live headcount status cards with dynamic delta animations.
- **P&L Simulator (`src/components/PnlForecastSimulator.tsx`)**: Parametric range sliders and synchronized Recharts waterfall visualizations.
- **Activity Log Modal (`src/components/ActivityLogModal.tsx`)**: Interactive logging for Birth, Mortality, Treatment, Transfer, and Sale events.
- **Feed Inventory Widget (`src/components/FeedInventoryWidget.tsx`)**: Visual runway monitors and delivery logging.

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

### 2. Run Backend Services (in IntelliJ IDEA or Terminal)
Run each microservice using IntelliJ IDEA (see [INTELLIJ_SETUP.md](file:///c:/Users/chand/Desktop/Livestock%20Ledger%20and%20Herd%20Operation%20Suit/INTELLIJ_SETUP.md)):
```bash
# Gateway
cd api-gateway && mvn spring-boot:run

# Livestock Service
cd livestock-ledger-service && mvn spring-boot:run

# Inventory Service
cd feed-inventory-service && mvn spring-boot:run

# Forecasting Service
cd forecasting-pnl-service && mvn spring-boot:run

# Notification Service
cd notification-mail-service && mvn spring-boot:run
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 🛠️ GitHub Repository Integration
This codebase is maintained and synced with:
[https://github.com/2690806kundansingh/Livestock-Ledger-Herd-Operations-Suite.git](https://github.com/2690806kundansingh/Livestock-Ledger-Herd-Operations-Suite.git)
