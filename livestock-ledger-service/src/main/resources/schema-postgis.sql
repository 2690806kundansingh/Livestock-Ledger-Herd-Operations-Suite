-- File: livestock-ledger-service/src/main/resources/schema-postgis.sql
-- Description: PostGIS Extension setup, Farms spatial table, and GiST Spatial Index (SRID 4326)

-- 1. Enable UUID and PostGIS extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. Create the farms table with PostGIS geometry column
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_name VARCHAR(150) NOT NULL,
    farmer_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    produce_list TEXT[] NOT NULL DEFAULT '{}',
    location GEOMETRY(Point, 4326) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create GiST spatial index on the location geometry column for O(log N) proximity lookups
CREATE INDEX IF NOT EXISTS idx_farms_location_gist ON farms USING GIST (location);

-- 4. Seed initial nearby farms data around typical agricultural centers (e.g. Haryana / NCR / Punjab agricultural belts)
INSERT INTO farms (farm_name, farmer_name, phone_number, produce_list, location)
VALUES 
    (
        'Vedic Gir Dairy & Fodder Farm', 
        'Rameshwar Patel', 
        '+919825144021', 
        ARRAY['A2 Gir Cow Milk', 'Fresh Desi Ghee', 'Hybrid Napier Grass', 'Silage'], 
        ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326)
    ),
    (
        'Aravalli High-Elevation Goat Farm', 
        'Vikram Rathore', 
        '+919829031055', 
        ARRAY['Sirohi Goats', 'Goat Milk', 'Moringa Fodder', 'Organic Goat Manure'], 
        ST_SetSRID(ST_MakePoint(77.2300, 28.6250), 4326)
    ),
    (
        'Yamuna Basin Freshwater Aquaculture', 
        'Priya Nambiar', 
        '+919845067890', 
        ARRAY['Rohu Fish', 'Catla Fish', 'Tilapia Fingerlings', 'Bio-Floc Feed'], 
        ST_SetSRID(ST_MakePoint(77.1850, 28.5900), 4326)
    ),
    (
        'Green Pastures Country Poultry Run', 
        'Sunita Choudhary', 
        '+919755060123', 
        ARRAY['Kadaknath Country Eggs', 'Free-Range Broilers', 'Deep Litter Compost'], 
        ST_SetSRID(ST_MakePoint(77.2500, 28.6400), 4326)
    ),
    (
        'Surya Bio-Energy & Pig Breeding Station', 
        'Harvinder Mann', 
        '+919417033445', 
        ARRAY['Yorkshire Weaners', 'Biogas Liquid Slurry', 'Breeder Stock'], 
        ST_SetSRID(ST_MakePoint(77.1600, 28.5700), 4326)
    )
ON CONFLICT DO NOTHING;
