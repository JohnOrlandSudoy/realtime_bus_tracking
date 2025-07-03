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
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  // Create a mock client for development
  if (import.meta.env.DEV) {
    console.warn('⚠️ Using mock Supabase client for development');
    supabase = {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
      }),
    };
  } else {
    throw new Error('Missing Supabase environment variables. Please check your .env file.');
  }
} else {
  console.log('✅ Supabase environment variables loaded successfully');
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

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