-- StayGuide — Supabase Schema
-- Run this in the Supabase SQL editor

-- Hotels (tenants)
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#1a3a5c',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  name_ru TEXT NOT NULL,
  name_en TEXT,
  description_ru TEXT,
  description_en TEXT,
  photo_url TEXT,
  opening_hours_ru TEXT,
  opening_hours_en TEXT,
  dress_code TEXT,
  is_reservation_required BOOLEAN DEFAULT FALSE,
  is_included BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Package items (what's included)
CREATE TABLE package_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT,
  is_included BOOLEAN NOT NULL DEFAULT TRUE,
  note_ru TEXT,
  note_en TEXT,
  sort_order INTEGER DEFAULT 0
);

-- Daily schedule
CREATE TABLE schedule_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time_start TIME,
  title_ru TEXT NOT NULL,
  title_en TEXT,
  location_ru TEXT,
  location_en TEXT,
  category TEXT DEFAULT 'animation',
  is_active BOOLEAN DEFAULT TRUE
);

-- Spa services
CREATE TABLE spa_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  name_ru TEXT NOT NULL,
  name_en TEXT,
  description_ru TEXT,
  description_en TEXT,
  price_usd INTEGER,
  duration_minutes INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0
);

-- Guest requests
CREATE TABLE guest_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  room_number TEXT NOT NULL,
  request_type TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  title_ru TEXT NOT NULL,
  title_en TEXT,
  body_ru TEXT,
  body_en TEXT,
  is_urgent BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE spa_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "public_read_hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "public_read_restaurants" ON restaurants FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_package" ON package_items FOR SELECT USING (true);
CREATE POLICY "public_read_schedule" ON schedule_items FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_spa" ON spa_services FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_announcements" ON announcements FOR SELECT
  USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));

-- Guests can submit and read requests
CREATE POLICY "guests_insert_requests" ON guest_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "guests_read_requests" ON guest_requests FOR SELECT USING (true);

-- Enable realtime for guest_requests
ALTER PUBLICATION supabase_realtime ADD TABLE guest_requests;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER guest_requests_updated_at
  BEFORE UPDATE ON guest_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
