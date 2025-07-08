import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
  console.error('Please create a .env file with your Supabase credentials');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };

// Simplified database types (only what you actually need)
export interface Database {
  public: {
    Tables: {
      terminals: {
        Row: {
          id: string;
          name: string;
          lat: number;
          lng: number;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          lat: number;
          lng: number;
          address: string;
        };
        Update: Partial<{
          name: string;
          lat: number;
          lng: number;
          address: string;
        }>;
      };
      routes: {
        Row: {
          id: string;
          name: string;
          start_terminal_id: string | null;
          end_terminal_id: string | null;
          stops: unknown;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          start_terminal_id?: string;
          end_terminal_id?: string;
          stops?: unknown;
        };
        Update: Partial<{
          name: string;
          start_terminal_id: string;
          end_terminal_id: string;
          stops: unknown;
        }>;
      };
      buses: {
        Row: {
          id: string;
          registration: string;
          total_seats: number;
          occupied_seats: number;
          lat: number | null;
          lng: number | null;
          terminal_id: string | null;
          route_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          registration: string;
          total_seats: number;
          occupied_seats?: number;
          lat?: number;
          lng?: number;
          terminal_id?: string;
          route_id?: string;
          is_active?: boolean;
        };
        Update: Partial<{
          registration: string;
          total_seats: number;
          occupied_seats: number;
          lat: number;
          lng: number;
          terminal_id: string;
          route_id: string;
          is_active: boolean;
        }>;
      };
    };
  };
} 