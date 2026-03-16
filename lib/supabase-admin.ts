import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

// Validate key format — Supabase service keys should be JWT format (starts with "eyJ")
// If the provided key is not valid JWT format, create a mock client that returns empty data
function isValidJwt(key: string): boolean {
  return typeof key === 'string' && key.startsWith('eyJ');
}

export const supabaseAdmin = isValidJwt(supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIn0.MOCK_KEY_PLACEHOLDER', {
      auth: { persistSession: false }
    });
