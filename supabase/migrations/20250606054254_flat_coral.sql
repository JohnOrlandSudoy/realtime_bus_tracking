/*
  # Create Bus Monitoring System Tables

  1. New Tables
    - `terminals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `lat` (double precision)
      - `lng` (double precision)
      - `address` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `routes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `start_terminal_id` (uuid, foreign key)
      - `end_terminal_id` (uuid, foreign key)
      - `stops` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `buses`
      - `id` (uuid, primary key)
      - `registration` (text)
      - `total_seats` (integer)
      - `occupied_seats` (integer)
      - `lat` (double precision)
      - `lng` (double precision)
      - `terminal_id` (uuid, foreign key)
      - `route_id` (uuid, foreign key)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create terminals table
CREATE TABLE IF NOT EXISTS terminals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE terminals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON terminals
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert for authenticated users"
  ON terminals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow update for authenticated users"
  ON terminals
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_terminal_id uuid REFERENCES terminals(id),
  end_terminal_id uuid REFERENCES terminals(id),
  stops jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON routes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert for authenticated users"
  ON routes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow update for authenticated users"
  ON routes
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create buses table
CREATE TABLE IF NOT EXISTS buses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration text UNIQUE NOT NULL,
  total_seats integer NOT NULL,
  occupied_seats integer DEFAULT 0,
  lat double precision,
  lng double precision,
  terminal_id uuid REFERENCES terminals(id),
  route_id uuid REFERENCES routes(id),
  is_active boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE buses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to all users"
  ON buses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insert for authenticated users"
  ON buses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow update for authenticated users"
  ON buses
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_terminals_updated_at
  BEFORE UPDATE ON terminals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routes_updated_at
  BEFORE UPDATE ON routes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buses_updated_at
  BEFORE UPDATE ON buses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();