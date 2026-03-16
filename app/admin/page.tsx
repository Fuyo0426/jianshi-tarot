import { ALL_CARDS, TarotCard } from '@/data/cards';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const CATEGORIES = [
  { key: 'all', label: '全部 (78)' },
  { key: 'major', label: '大阿爾克那 (22)' },
  { key: 'cups', label: '聖杯 (14)' },
  { key: 'wands', label: '權杖 (14)' },
  { key: 'swords', label: '寶劍 (14)' },
  { key: 'pentacles', label: '星幣 (14)' },
];

function filterCards(cards: TarotCard[], category: string): TarotCard[] {
  if (category === 'all') return cards;
  if (category === 'major') return cards.filter((c) => c.arcana === 'major');
  return cards.filter((c) => c.suit === category);
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || 'all';
  const cards = filterCards(ALL_CARDS, category);

  return (
    <div
      style={{ background: '#0B0D1A', minHeight: '100vh', color: '#EBE5D9' }}
      className="flex"
    >
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full flex flex-col"
        style={{
          width: '220px',
          background: 'rgba(17,21,34,0.95)',
          borderRight: '1px solid rgba(196,144,45,0.15)',
          zIndex: 10,
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(196,144,45,0.15)' }}>
          <div style={{ color: '#C4902D', fontSize: '18px', fontFamily: 'serif' }}>
            ✦ 劍石塔羅
          </div>
          <div style={{ color: '#7A7260', fontSize: '12px', marginTop: '4px' }}>
            後台管理
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/admin?category=${cat.key}`}
              style={{
                display: 'block',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                textDecoration: 'none',
                background:
                  category === cat.key
                    ? 'rgba(196,144,45,0.15)'
                    : 'transparent',
                color: category === cat.key ? '#C4902D' : '#7A7260',
                border:
                  category === cat.key
                    ? '1px solid rgba(196,144,45,0.3)'
                    : '1px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(196,144,45,0.15)' }}>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '220px', padding: '32px', flex: 1 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#EBE5D9' }}>
            牌卡管理
          </h1>
          <span style={{ color: '#7A7260', fontSize: '13px' }}>
            共 {cards.length} 張
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px',
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/admin/cards/${card.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="glass-panel"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                {/* Card image */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '2/3',
                    background: 'rgba(196,144,45,0.05)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={`/cards/rider-waite/${card.id}.jpg`}
                    alt={card.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    onError={() => {}}
                  />
                </div>

                {/* Card info */}
                <div style={{ padding: '10px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#EBE5D9',
                      marginBottom: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.name_zh}
                  </div>
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#7A7260',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
