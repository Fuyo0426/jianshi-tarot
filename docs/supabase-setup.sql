-- Run this in Supabase SQL editor
CREATE TABLE IF NOT EXISTS tarot_cards (
  id TEXT PRIMARY KEY,
  name_zh TEXT,
  keywords TEXT[],
  upright_meaning TEXT,
  upright_love TEXT,
  upright_career TEXT,
  upright_advice TEXT,
  reversed_meaning TEXT,
  reversed_love TEXT,
  reversed_career TEXT,
  reversed_advice TEXT,
  custom_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE tarot_cards ENABLE ROW LEVEL SECURITY;

-- Policy: service role can do everything (used by admin backend)
CREATE POLICY "service_role_all" ON tarot_cards
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Storage bucket (create manually in Supabase dashboard):
-- Bucket name: tarot-images
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp
