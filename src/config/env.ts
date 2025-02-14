// src/config/env.ts
export interface EnvironmentConfig {
  resendApiKey: string;
  supabaseUrl: string;
  supabaseKey: string;
  appUrl: string;
}

export const getConfig = (): EnvironmentConfig => ({
  resendApiKey: process.env.RESEND_API_KEY || '',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || '',
});
