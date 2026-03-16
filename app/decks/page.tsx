import Link from 'next/link';
import JianshiLogo from '@/components/JianshiLogo';
import StarField from '@/components/StarField';
import CardBack from '@/components/CardBack';
import { DECKS } from '@/data/decks';

export default function DecksPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0B0D1A] relative overflow-hidden">
      <StarField />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <JianshiLogo size={28} />
          <span className="font-serif text-sm text-[#EBE5D9]">劍獅塔羅</span>
        </Link>
        <Link href="/reading">
          <button
            className="px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #C4902D, #A87520)',
              color: '#0B0D1A',
            }}
          >
            開始占卜
          </button>
        </Link>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[10px] text-[#C4902D] tracking-[0.3em] uppercase font-mono mb-4">DECKS</p>
          <h1
            className="text-4xl md:text-5xl leading-none tracking-tighter text-[#EBE5D9]"
            style={{ fontFamily: 'var(--font-noto-serif)' }}
          >
            牌組系列
          </h1>
          <p className="text-[#7A7260] text-sm mt-4 max-w-[45ch] leading-relaxed">
            每套牌組都有其獨特的視覺語言與文化底蘊，
            解讀邏輯一致，視覺體驗截然不同。
          </p>
        </div>

        {/* Deck list — asymmetric 2-col zig-zag */}
        <div className="space-y-8">
          {DECKS.map((deck, i) => (
            <div
              key={deck.id}
              className={`grid grid-cols-1 md:grid-cols-5 gap-8 items-center ${
                i % 2 === 1 ? 'md:[direction:rtl]' : ''
              }`}
            >
              {/* Card visual */}
              <div className={`md:col-span-2 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <div className="relative flex justify-center">
                  {/* Background cards */}
                  {[0, 1].map((j) => (
                    <div
                      key={j}
                      className="absolute"
                      style={{
                        width: 120,
                        height: 192,
                        top: j * 8,
                        left: `calc(50% + ${(j - 0.5) * 24}px)`,
                        transform: `translateX(-50%) rotate(${(j - 0.5) * 10}deg)`,
                        opacity: 0.25 + j * 0.1,
                      }}
                    >
                      <CardBack deckColor={deck.backColor} className="w-full h-full" />
                    </div>
                  ))}
                  {/* Main card */}
                  <div
                    className="relative"
                    style={{
                      width: 140,
                      height: 224,
                      filter: `drop-shadow(0 16px 32px ${deck.accentColor}20)`,
                    }}
                  >
                    <CardBack deckColor={deck.backColor} className="w-full h-full animate-float" />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className={`md:col-span-3 ${i % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-1 h-12 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: `linear-gradient(to bottom, ${deck.accentColor}, transparent)` }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif text-xl text-[#EBE5D9]">{deck.name_zh}</span>
                      {deck.locked && (
                        <span
                          className="text-[9px] px-2 py-0.5 rounded-full font-mono tracking-wider"
                          style={{
                            background: `${deck.accentColor}15`,
                            color: deck.accentColor,
                            border: `1px solid ${deck.accentColor}30`,
                          }}
                        >
                          限量版
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7A7260] font-mono">{deck.name}</p>
                  </div>
                </div>

                <p className="text-sm text-[#B8B0A0] leading-relaxed mb-6">{deck.description}</p>

                <div className="flex items-center gap-3">
                  {!deck.locked ? (
                    <Link href={`/reading?deck=${deck.id}`}>
                      <button
                        className="px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${deck.accentColor}, ${deck.accentColor}aa)`,
                          color: '#0B0D1A',
                        }}
                      >
                        使用此牌組占卜
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide opacity-50 cursor-not-allowed"
                      style={{
                        border: `1px solid ${deck.accentColor}30`,
                        color: deck.accentColor,
                      }}
                    >
                      即將推出
                    </button>
                  )}
                  <span className="text-[11px] text-[#4A4538]">{deck.tagline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer divider */}
        <div
          className="mt-24 pt-12 border-t border-[rgba(196,144,45,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <JianshiLogo size={20} />
            <span className="text-[11px] text-[#4A4538] font-serif">劍獅塔羅 · 台南安平</span>
          </div>
          <Link href="/reading">
            <button
              className="text-xs px-6 py-2.5 rounded-lg transition-all active:scale-[0.98]"
              style={{ background: 'rgba(196,144,45,0.08)', color: '#C4902D', border: '1px solid rgba(196,144,45,0.15)' }}
            >
              開始占卜
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
