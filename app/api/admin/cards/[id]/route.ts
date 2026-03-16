import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { ALL_CARDS } from '@/data/cards';

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'jianshi-tarot-secret-2026'
);

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin-token')?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Try Supabase first
    const { data, error } = await supabaseAdmin
      .from('tarot_cards')
      .select('*')
      .eq('id', id)
      .single();

    if (!error && data) {
      return NextResponse.json(data);
    }
  } catch {
    // Supabase unavailable, fall through to local data
  }

  // Fallback: local cards.ts data
  const card = ALL_CARDS.find((c) => c.id === id);
  if (!card) {
    return NextResponse.json({ error: '牌卡不存在' }, { status: 404 });
  }

  return NextResponse.json({
    id: card.id,
    name_zh: card.name_zh,
    keywords: card.keywords,
    upright_meaning: card.upright.meaning,
    upright_love: card.upright.love,
    upright_career: card.upright.career,
    upright_advice: card.upright.advice,
    reversed_meaning: card.reversed.meaning,
    reversed_love: card.reversed.love,
    reversed_career: card.reversed.career,
    reversed_advice: card.reversed.advice,
    custom_image_url: null,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: '未授權' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const record = {
    id,
    name_zh: body.name_zh,
    keywords: body.keywords,
    upright_meaning: body.upright_meaning,
    upright_love: body.upright_love,
    upright_career: body.upright_career,
    upright_advice: body.upright_advice,
    reversed_meaning: body.reversed_meaning,
    reversed_love: body.reversed_love,
    reversed_career: body.reversed_career,
    reversed_advice: body.reversed_advice,
    custom_image_url: body.custom_image_url,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabaseAdmin
      .from('tarot_cards')
      .upsert(record, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: '儲存失敗' }, { status: 500 });
  }
}
