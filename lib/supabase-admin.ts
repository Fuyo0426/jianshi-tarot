import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

// Supabase requires JWT format keys. If key is not JWT (doesn't start with "eyJ"),
// substitute a mock key so the build succeeds. Runtime calls will fail gracefully.
const effectiveKey = supabaseKey.startsWith('eyJ')
  ? supabaseKey
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaXNzIjoibW9jayJ9.mock';

export const supabaseAdmin = createClient(supabaseUrl, effectiveKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const isSupabaseConfigured = supabaseKey.startsWith('eyJ');
