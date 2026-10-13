# IntelliJ IDEA Setup & Run Guide
## Livestock Ledger & Herd Operations Suite

This project is architected as an enterprise-grade multi-module Spring Boot 3.3+ & Java 21 suite with an integrated React 19 / TypeScript frontend.

Follow this guide to import, configure, and run the complete suite inside **IntelliJ IDEA Ultimate or Community Edition**.

---

### Step 1: Open Project in IntelliJ IDEA
1. Launch **IntelliJ IDEA**.
2. Select **File** > **Open...** (or click **Open** on the Welcome screen).
3. Navigate to and select the root directory:
   `c:\Users\chand\Desktop\Livestock Ledger and Herd Operation Suit`
4. Choose **Trust Project**.
5. IntelliJ will automatically detect the parent `pom.xml` and import all 5 Maven sub-modules:
   - `api-gateway`
   - `livestock-ledger-service`
   - `feed-inventory-service`
   - `forecasting-pnl-service`
   - `notification-mail-service`

---

### Step 2: Configure Project SDK (Java 21)
1. Go to **File** > **Project Structure** (`Ctrl + Alt + Shift + S` or `Cmd + ;`).
2. Under **Project Settings** > **Project**:
   - **SDK**: Select **Java 21** (or Java 25 installed on host).
   - **Language Level**: Select **21 - Sealed types, always-strict floating-point, pattern matching, etc.**
3. Click **Apply** and **OK**.

---

### Step 3: Enable Annotation Processing (Lombok Support)
Lombok is used across all microservices for `@Getter`, `@Setter`, `@Builder`, and `@Slf4j`.
1. Go to **File** > **Settings** (`Ctrl + Alt + S`) on Windows/Linux or **Preferences** on macOS.
2. Navigate to **Build, Execution, Deployment** > **Compiler** > **Annotation Processors**.
3. Check the box: **Enable annotation processing**.
4. Click **Apply** and **OK**.

---

### Step 4: Local Infrastructure Initialization
Ensure PostgreSQL, Apache Kafka, and Redis are running locally on their standard ports:

| Infrastructure Component | Host / Port | Details |
|---|---|---|
| **PostgreSQL** | `localhost:5432` | Credentials: `postgres` / `postgres` |
| **Apache Kafka** | `localhost:9092` | Topics: `animal.events`, `inventory.events` |
| **Redis** | `localhost:6379` | Cache & Session Broker |

#### Create Required PostgreSQL Databases
Execute `scripts/init-databases.sql` using `psql` or IntelliJ Database Tool:
```sql
CREATE DATABASE livestock_db;
CREATE DATABASE inventory_db;
CREATE DATABASE forecast_db;
CREATE DATABASE notification_db;
```

---

### Step 5: Run Configurations in IntelliJ IDEA

You can run each microservice by navigating to its main class and clicking the green **Run** arrow next to `public static void main`:

#### Microservice Port Mapping & Entrypoints:
1. **`api-gateway`** (Port: `8080`)
   - Main Class: `com.farmoperations.gateway.ApiGatewayApplication`
   - Path: `api-gateway/src/main/java/com/farmoperations/gateway/ApiGatewayApplication.java`

2. **`livestock-ledger-service`** (Port: `8081`)
   - Main Class: `com.farmoperations.livestock.LivestockLedgerApplication`
   - Path: `livestock-ledger-service/src/main/java/com/farmoperations/livestock/LivestockLedgerApplication.java`

3. **`feed-inventory-service`** (Port: `8082`)
   - Main Class: `com.farmoperations.inventory.FeedInventoryApplication`
   - Path: `feed-inventory-service/src/main/java/com/farmoperations/inventory/FeedInventoryApplication.java`

4. **`forecasting-pnl-service`** (Port: `8083`)
   - Main Class: `com.farmoperations.forecast.ForecastingPnlApplication`
   - Path: `forecasting-pnl-service/src/main/java/com/farmoperations/forecast/ForecastingPnlApplication.java`

5. **`notification-mail-service`** (Port: `8084`)
   - Main Class: `com.farmoperations.notification.NotificationMailApplication`
   - Path: `notification-mail-service/src/main/java/com/farmoperations/notification/NotificationMailApplication.java`
   - Environment Variables (Optional for Gmail SMTP):
     - `GMAIL_USERNAME=your.email@gmail.com`
     - `GMAIL_APP_PASSWORD=your_16_char_app_password`

---

### Step 6: Launch React Frontend (Port 5173)

Open IntelliJ's built-in Terminal (`Alt + F12`):
```bash
cd frontend
npm install
npm run dev
```
The operations dashboard will launch at **`http://localhost:5173`**.

---

### Step 7: IntelliJ Compound Run Configuration (Optional)
To start all 5 services with a single click:
1. Go to **Run** > **Edit Configurations...**
2. Click **+** (Add New Configuration) and choose **Compound**.
3. Name it **"All Microservices"**.
4. Add all 5 Spring Boot run configurations to the list.
5. Click **Apply** and **OK**. Now click the Run button to start the entire distributed suite simultaneously!
