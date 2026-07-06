import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ResumeDownload = {
  id: string;
  name: string | null;
  company: string | null;
  designation: string | null;
  email: string | null;
  linkedin: string | null;
  message: string | null;
  country: string | null;
  device: string | null;
  browser: string | null;
  skipped: boolean;
  created_at: string;
};
