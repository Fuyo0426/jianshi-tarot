'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { decodeReading, getCardById, SPREAD_CONFIG, SpreadType } from '@/lib/tarot';
import { DrawnCard } from '@/lib/tarot';
import { TarotCard } from '@/data/cards';
import JianshiLogo from '@/components/JianshiLogo';
import StarField from '@/components/StarField';
import FlippableCard from '@/components/FlippableCard';
import { DECKS, DeckId } from '@/data/decks';

interface ResolvedCard {
  card: TarotCard;
  reversed: boolean;
  positionLabel: string;
  position: number;
}

export default function ResultClient() {
  const params = useSearchParams();
  const [activeCard, setActiveCard] = useState<ResolvedCard | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);

  const { cards, spread, question, deckId } = useMemo(() => {
    const r = params.get('r');
    const spread = (params.get('spread') || 'single') as SpreadType;
    const question = params.get('q') || '';
    const deckId = (params.get('deck') || 'rider-waite') as DeckId;

    if (!r) return { cards: [], spread, question, deckId };

    const decoded = decodeReading(r);
    if (!decoded) return { cards: [], spread, question, deckId };

    const spreadPositions = SPREAD_CONFIG[spread]?.positions ?? [];
    const cards: ResolvedCard[] = decoded
      .map((d) => {
        const card = getCardById(d.id);
        if (!card) return null;
        return {
          card,
          reversed: d.rev,
          position: d.pos,
          positionLabel: spreadPositions[d.pos] ?? `第${d.pos + 1}張`,
        };
      })
      .filter(Boolean) as ResolvedCard[];

    return { cards, spread, question, deckId };
  }, [params]);

  const spreadConfig = SPREAD_CONFIG[spread];
  const deck = DECKS.find(d => d.id === deckId);
  const allFlipped = flippedCount >= cards.length;

  if (cards.length === 0) {
    return (
      <main className="min-h-[100dvh] bg-[#0B0D1A] flex flex-col items-center justify-center gap-6">
        <JianshiLogo size={48} />
        <p className="font-serif text-[#7A7260]">無效的牌局資料</p>
        <Link href="/reading">
          <button className="glass-panel px-6 py-3 rounded-lg text-sm text-[#EBE5D9]">重新占卜</button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#0B0D1A] relative overflow-hidden">
      <StarField />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(196,144,45,0.05), transparent)',
          zIndex: 1,
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <JianshiLogo size={28} />
          <span className="font-serif text-sm text-[#EBE5D9]">劍獅塔羅</span>
        </Link>
        <Link href="/reading">
          <button className="text-xs text-[#7A7260] hover:text-[#C4902D] transition-colors font-mono tracking-widest">
            再占一次
          </button>
        </Link>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ background: 'linear-gradient(to right, transparent, #C4902D)' }} />
            <span className="text-[10px] text-[#C4902D] tracking-[0.3em] uppercase font-mono">
              {spreadConfig.label_zh}
            </span>
            <div className="h-px w-6" style={{ background: 'linear-gradient(to left, transparent, #C4902D)' }} />
          </div>
          {question && (
            <p
              className="font-serif text-sm text-[#EBE5D9] max-w-lg mx-auto leading-relaxed mb-2 px-4 py-3 rounded-lg"
              style={{ background: 'rgba(196,144,45,0.06)', border: '1px solid rgba(196,144,45,0.12)' }}
            >
              「{question}」
            </p>
          )}
          <p className="text-[11px] text-[#7A7260] mt-3">
            {allFlipped ? '所有牌卡已翻開，向下查看完整解讀' : '點擊牌卡翻開，聆聽命運的指引'}
          </p>
        </div>

        {/* Cards spread */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-16">
          {cards.map((item, i) => (
            <div
              key={item.card.id}
              onClick={() => setActiveCard(item)}
              className="cursor-pointer"
            >
              <FlippableCard
                card={item.card}
                reversed={item.reversed}
                positionLabel={item.positionLabel}
                index={i}
                deckBackColor={deck?.backColor}
                onFlip={() => setFlippedCount(c => c + 1)}
              />
            </div>
          ))}
        </div>

        {/* Card detail modal */}
        <AnimatePresence>
          {activeCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
              style={{ zIndex: 200 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setActiveCard(null);
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'rgba(11,13,26,0.85)', backdropFilter: 'blur(8px)' }}
              />
              <motion.div
                initial={{ y: 40, scale: 0.96 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 40, scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 250, damping: 28 }}
                className="relative w-full max-w-xl rounded-2xl overflow-y-auto max-h-[90vh]"
                style={{
                  background: 'linear-gradient(160deg, #14182A, #0E1120)',
                  border: '1px solid rgba(196,144,45,0.25)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
                  zIndex: 201,
                }}
              >
                {/* Top accent line */}
                <div
                  className="h-px w-full flex-shrink-0"
                  style={{ background: `linear-gradient(to right, transparent, ${activeCard.card.color}, transparent)` }}
                />

                <div className="p-6 md:p-8">
                  {/* Card header */}
                  <div className="flex items-start gap-5 mb-6">
                    <div
                      className="flex-shrink-0 w-16 h-24 rounded-lg flex items-center justify-center text-2xl font-serif"
                      style={{
                        background: `radial-gradient(ellipse, ${activeCard.card.color}20, transparent)`,
                        border: `1px solid ${activeCard.card.color}30`,
                        color: activeCard.card.color,
                      }}
                    >
                      {activeCard.card.arcana === 'major' ? activeCard.card.number : '♦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-[#7A7260] font-mono tracking-widest uppercase">
                          {activeCard.positionLabel}
                        </span>
                        {activeCard.reversed && (
                          <span
                            className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                            style={{
                              background: 'rgba(196,144,45,0.1)',
                              color: '#C4902D',
                              border: '1px solid rgba(196,144,45,0.2)',
                            }}
                          >
                            逆位
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-xl text-[#EBE5D9] leading-tight">
                        {activeCard.card.name_zh}
                      </h3>
                      <p className="text-[11px] text-[#7A7260] mt-0.5">{activeCard.card.name}</p>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {activeCard.card.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] px-2 py-0.5 rounded-full font-sans"
                            style={{
                              background: `${activeCard.card.color}12`,
                              color: activeCard.card.color,
                              border: `1px solid ${activeCard.card.color}22`,
                            }}
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Attribute badges: Element / Astrology / Yes-No */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {activeCard.card.element && (
                      <span
                        className="text-[10px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,144,45,0.15)', color: '#B8B0A0' }}
                      >
                        <span style={{ color: activeCard.card.color }}>◈</span> {activeCard.card.element}
                      </span>
                    )}
                    {activeCard.card.astrology && (
                      <span
                        className="text-[10px] px-2.5 py-1 rounded-full font-mono flex items-center gap-1"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,144,45,0.15)', color: '#B8B0A0' }}
                      >
                        <span style={{ color: activeCard.card.color }}>★</span> {activeCard.card.astrology}
                      </span>
                    )}
                    {activeCard.card.yes_no && (
                      <span
                        className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                        style={{
                          background: activeCard.card.yes_no === 'yes'
                            ? 'rgba(100,200,100,0.08)'
                            : activeCard.card.yes_no === 'no'
                            ? 'rgba(200,80,80,0.08)'
                            : 'rgba(180,160,80,0.08)',
                          border: `1px solid ${activeCard.card.yes_no === 'yes' ? 'rgba(100,200,100,0.25)' : activeCard.card.yes_no === 'no' ? 'rgba(200,80,80,0.25)' : 'rgba(180,160,80,0.25)'}`,
                          color: activeCard.card.yes_no === 'yes' ? '#7EC87E' : activeCard.card.yes_no === 'no' ? '#C87E7E' : '#C8B87E',
                        }}
                      >
                        {activeCard.card.yes_no === 'yes' ? '✓ 是' : activeCard.card.yes_no === 'no' ? '✗ 否' : '～ 中性'}
                      </span>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="space-y-5">
                    {/* 整體解讀 */}
                    <div>
                      <p className="text-[10px] text-[#C4902D] tracking-widest uppercase font-mono mb-2">
                        {activeCard.reversed ? '逆位解讀' : '正位解讀'}
                      </p>
                      <p className="text-sm text-[#EBE5D9] leading-[1.9] font-serif">
                        {activeCard.reversed
                          ? activeCard.card.reversed.meaning
                          : activeCard.card.upright.meaning}
                      </p>
                      {/* English general meaning if available */}
                      {(activeCard.reversed ? activeCard.card.reversed_general : activeCard.card.upright_general) && (
                        <p className="text-[11px] text-[#7A7260] leading-relaxed mt-2 italic">
                          {(activeCard.reversed ? activeCard.card.reversed_general : activeCard.card.upright_general)?.slice(0, 220)}
                          {((activeCard.reversed ? activeCard.card.reversed_general : activeCard.card.upright_general)?.length ?? 0) > 220 ? '…' : ''}
                        </p>
                      )}
                    </div>

                    {/* 三欄：感情 / 事業 / 財務 */}
                    <div>
                      <p className="text-[10px] text-[#C4902D] tracking-widest uppercase font-mono mb-2">
                        各面向解讀
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          {
                            label: '感情',
                            icon: '♡',
                            zh: activeCard.reversed ? activeCard.card.reversed.love : activeCard.card.upright.love,
                            en: activeCard.reversed ? activeCard.card.reversed_love_en : activeCard.card.upright_love_en,
                          },
                          {
                            label: '事業',
                            icon: '⚡',
                            zh: activeCard.reversed ? activeCard.card.reversed.career : activeCard.card.upright.career,
                            en: activeCard.reversed ? activeCard.card.reversed_career_en : activeCard.card.upright_career_en,
                          },
                          {
                            label: '財務',
                            icon: '◎',
                            zh: '',
                            en: activeCard.reversed ? activeCard.card.reversed_finance_en : activeCard.card.upright_finance_en,
                          },
                        ].map((section) => (
                          <div
                            key={section.label}
                            className="rounded-lg px-3 py-3"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,144,45,0.08)' }}
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <span style={{ color: activeCard.card.color }} className="text-xs">{section.icon}</span>
                              <p className="text-[9px] text-[#7A7260] tracking-widest uppercase font-mono">
                                {section.label}
                              </p>
                            </div>
                            {section.zh && (
                              <p className="text-[11px] text-[#C0B8A8] leading-relaxed mb-1.5 font-serif">
                                {section.zh}
                              </p>
                            )}
                            {section.en && (
                              <p className="text-[10px] text-[#5A5448] leading-relaxed italic">
                                {section.en.slice(0, 160)}{section.en.length > 160 ? '…' : ''}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 指引 - 引言格式 */}
                    <div
                      className="rounded-lg px-4 py-3 pl-5"
                      style={{
                        background: `${activeCard.card.color}08`,
                        border: `1px solid ${activeCard.card.color}18`,
                        borderLeft: `3px solid ${activeCard.card.color}`,
                      }}
                    >
                      <p className="text-[9px] tracking-widest uppercase mb-2 font-mono" style={{ color: activeCard.card.color }}>
                        指引
                      </p>
                      <p className="text-[12px] text-[#C0B8A8] leading-[1.8] font-serif italic">
                        {activeCard.reversed
                          ? activeCard.card.reversed.advice
                          : activeCard.card.upright.advice}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveCard(null)}
                    className="w-full mt-6 py-3 rounded-lg text-sm text-[#7A7260] transition-all hover:text-[#EBE5D9] active:scale-[0.98]"
                    style={{ border: '1px solid rgba(196,144,45,0.1)' }}
                  >
                    關閉
                  </button>
                </div>

                {/* Jianshi watermark */}
                <div
                  className="absolute bottom-4 right-4 opacity-15"
                  style={{ pointerEvents: 'none' }}
                >
                  <JianshiLogo size={24} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary when all flipped */}
        <AnimatePresence>
          {allFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="rounded-2xl p-8 mb-12"
              style={{
                background: 'linear-gradient(160deg, rgba(17,21,34,0.9), rgba(14,17,32,0.9))',
                border: '1px solid rgba(196,144,45,0.15)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <JianshiLogo size={28} />
                <div>
                  <h3 className="font-serif text-base text-[#EBE5D9]">牌局總結</h3>
                  <p className="text-[11px] text-[#7A7260]">點擊任一牌卡查看完整解讀</p>
                </div>
              </div>

              <div className="space-y-3">
                {cards.map((item) => (
                  <button
                    key={item.card.id}
                    onClick={() => setActiveCard(item)}
                    className="w-full flex items-center gap-4 text-left p-3 rounded-lg transition-all hover:bg-[rgba(196,144,45,0.06)] active:scale-[0.99]"
                    style={{ border: '1px solid rgba(196,144,45,0.06)' }}
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 font-mono text-xs"
                      style={{ background: `${item.card.color}15`, color: item.card.color }}
                    >
                      {item.position + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#7A7260]">{item.positionLabel}</span>
                        {item.reversed && (
                          <span className="text-[9px] text-[#C4902D] font-mono">逆位</span>
                        )}
                      </div>
                      <p className="font-serif text-sm text-[#EBE5D9] mt-0.5">{item.card.name_zh}</p>
                    </div>
                    <p className="text-[11px] text-[#7A7260] max-w-[180px] hidden md:block leading-relaxed">
                      {item.reversed
                        ? item.card.reversed.meaning.slice(0, 40) + '...'
                        : item.card.upright.meaning.slice(0, 40) + '...'}
                    </p>
                    <span className="text-[#4A4538] text-xs flex-shrink-0">→</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <Link href="/reading" className="flex-1">
                  <button
                    className="w-full py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all active:scale-[0.98]"
                    style={{
                      background: 'linear-gradient(135deg, #C4902D, #A87520)',
                      color: '#0B0D1A',
                    }}
                  >
                    再占一次
                  </button>
                </Link>
                <Link href="/" className="flex-1">
                  <button className="w-full py-3.5 rounded-xl text-sm glass-panel text-[#EBE5D9] transition-all active:scale-[0.98]">
                    回首頁
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
