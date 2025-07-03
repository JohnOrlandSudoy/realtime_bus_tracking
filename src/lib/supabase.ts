import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>>;
      };
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
          stops: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          name: string;
          start_terminal_id?: string;
          end_terminal_id?: string;
          stops?: any;
        };
        Update: Partial<{
          name: string;
          start_terminal_id: string;
          end_terminal_id: string;
          stops: any;
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