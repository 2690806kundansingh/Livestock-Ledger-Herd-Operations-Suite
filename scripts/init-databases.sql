-- ====================================================================
-- Livestock Ledger & Herd Operations Suite - Database Initialization
-- Target Host: localhost:5432 (PostgreSQL Default)
-- ====================================================================

-- 1. Livestock Ledger Service Database
SELECT 'CREATE DATABASE livestock_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'livestock_db')\gexec

-- 2. Feed & Inventory Service Database
SELECT 'CREATE DATABASE inventory_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'inventory_db')\gexec

-- 3. Forecasting & PnL Service Database
SELECT 'CREATE DATABASE forecast_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'forecast_db')\gexec

-- 4. Notification & Mailing Service Database
SELECT 'CREATE DATABASE notification_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'notification_db')\gexec
