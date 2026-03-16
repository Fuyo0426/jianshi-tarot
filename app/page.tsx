import Link from 'next/link';
import StarField from '@/components/StarField';
import JianshiLogo from '@/components/JianshiLogo';
import CardBack from '@/components/CardBack';

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] bg-[#0B0D1A] relative overflow-hidden">
      <StarField />

      {/* Ambient gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,144,45,0.06), transparent)',
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <div className="flex items-center gap-2.5">
          <JianshiLogo size={32} />
          <span className="font-serif text-sm text-[#EBE5D9] tracking-wide">劍獅塔羅</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/decks"
            className="text-xs text-[#7A7260] hover:text-[#C4902D] transition-colors tracking-widest uppercase"
          >
            牌組
          </Link>
        </div>
      </nav>

      {/* Hero — asymmetric split layout */}
      <div className="relative z-10 min-h-[calc(100dvh-80px)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">

            {/* Left: Text content */}
            <div className="md:pr-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #C4902D)' }} />
                <span className="text-[10px] text-[#C4902D] tracking-[0.25em] uppercase font-mono">
                  台南安平守護
                </span>
                <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #C4902D)' }} />
              </div>

              {/* Main headline */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl leading-none tracking-tighter mb-4"
                style={{ fontFamily: 'var(--font-noto-serif)', color: '#EBE5D9' }}
              >
                讓劍獅
                <br />
                <span style={{ color: '#C4902D' }}>為你</span>
                <br />
                指引命運
              </h1>

              <p className="text-[#7A7260] text-sm leading-relaxed mt-6 max-w-[42ch]">
                融合台南安平劍獅守護神話與偉特塔羅千年智慧，
                每一次抽牌都是與命運的對話。
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                <Link href="/reading">
                  <button
                    className="px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide transition-all active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #C4902D, #A87520)',
                      color: '#0B0D1A',
                      boxShadow: '0 4px 24px rgba(196,144,45,0.25)',
                    }}
                  >
                    開始占卜
                  </button>
                </Link>
                <Link href="/decks">
                  <button className="px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide glass-panel text-[#EBE5D9] hover:border-[rgba(196,144,45,0.3)] transition-all active:scale-[0.98]">
                    探索牌組
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[rgba(196,144,45,0.1)]">
                {[
                  { num: '78', label: '張牌卡' },
                  { num: '3', label: '種牌陣' },
                  { num: '2', label: '副牌組' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-mono text-[#C4902D] tracking-tighter">{stat.num}</p>
                    <p className="text-[11px] text-[#7A7260] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Card showcase */}
            <div className="flex justify-center md:justify-end">
              <div className="relative" style={{ width: 280, height: 380 }}>
                <div
                  className="absolute"
                  style={{ width: 140, height: 224, top: 40, left: 20, transform: 'rotate(-12deg)', opacity: 0.35 }}
                >
                  <CardBack className="w-full h-full" />
                </div>
                <div
                  className="absolute"
                  style={{ width: 140, height: 224, top: 20, right: 20, transform: 'rotate(8deg)', opacity: 0.25 }}
                >
                  <CardBack className="w-full h-full" />
                </div>
                <div
                  className="absolute animate-float"
                  style={{
                    width: 160, height: 256,
                    top: 50, left: '50%', transform: 'translateX(-50%)',
                    filter: 'drop-shadow(0 20px 40px rgba(196,144,45,0.2))',
                  }}
                >
                  <CardBack className="w-full h-full animate-gold-pulse" />
                </div>
                <div
                  className="absolute bottom-0 left-1/2"
                  style={{
                    width: 200, height: 40, transform: 'translateX(-50%)',
                    background: 'radial-gradient(ellipse, rgba(196,144,45,0.2), transparent)',
                    filter: 'blur(12px)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature row */}
      <section className="relative z-10 border-t border-[rgba(196,144,45,0.08)] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(196,144,45,0.08)]">
            {[
              {
                icon: '◈',
                title: '偉特牌基礎',
                desc: '1909年出版的公版經典，78張牌卡涵蓋22張大阿爾克納與56張小阿爾克納。',
              },
              {
                icon: '⟁',
                title: '多種牌陣',
                desc: '單張直覺牌、三牌過去現在未來、凱爾特十字六牌陣，深淺皆宜。',
              },
              {
                icon: '⊕',
                title: '劍獅守護版',
                desc: '以台南安平守護象徵重新詮釋的限量牌組，融合台灣民俗精髓。',
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#0B0D1A] px-8 py-10">
                <p className="text-2xl mb-4" style={{ color: '#C4902D', fontFamily: 'var(--font-noto-serif)' }}>
                  {item.icon}
                </p>
                <h3 className="font-serif text-base text-[#EBE5D9] mb-2">{item.title}</h3>
                <p className="text-sm text-[#7A7260] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-[rgba(196,144,45,0.08)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <JianshiLogo size={20} />
            <span className="text-[11px] text-[#4A4538] font-serif">劍獅塔羅 · 台南安平</span>
          </div>
          <p className="text-[11px] text-[#4A4538]">
            占卜結果僅供娛樂與心靈參考，不構成任何決策建議
          </p>
        </div>
      </footer>
    </main>
  );
}
