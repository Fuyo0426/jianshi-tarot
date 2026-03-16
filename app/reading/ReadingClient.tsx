'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SpreadType, SPREAD_CONFIG, shuffleAndDraw, encodeReading } from '@/lib/tarot';
import { DeckId } from '@/data/decks';
import DeckSwitcher from '@/components/DeckSwitcher';
import JianshiLogo from '@/components/JianshiLogo';
import StarField from '@/components/StarField';
import CardBack from '@/components/CardBack';

const SPREAD_DESCRIPTIONS: Record<SpreadType, { desc: string; icon: string }> = {
  single: {
    desc: '一張牌，一個清晰的指引。適合每日問卜或單一問題。',
    icon: '◈',
  },
  three: {
    desc: '三張牌揭示過去的因、當下的狀態、以及未來的走向。',
    icon: '◈ ◈ ◈',
  },
  celtic: {
    desc: '六張牌深度解析你的處境，從根源到最終建議全面剖析。',
    icon: '◈ ◈ ◈\n  ◈ ◈ ◈',
  },
};

export default function ReadingClient() {
  const router = useRouter();
  const [step, setStep] = useState<'spread' | 'question' | 'shuffle'>('spread');
  const [spread, setSpread] = useState<SpreadType>('single');
  const [question, setQuestion] = useState('');
  const [deck, setDeck] = useState<DeckId>('rider-waite');
  const [isShuffling, setIsShuffling] = useState(false);

  const handleStartReading = async () => {
    setStep('shuffle');
    setIsShuffling(true);

    // Simulate shuffling animation
    await new Promise(r => setTimeout(r, 1800));

    const drawn = shuffleAndDraw(spread);
    const encoded = encodeReading(drawn);

    const params = new URLSearchParams({
      r: encoded,
      spread,
      deck,
      ...(question ? { q: question } : {}),
    });

    router.push(`/result?${params.toString()}`);
  };

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
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-6">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <JianshiLogo size={28} />
          <span className="font-serif text-sm text-[#EBE5D9]">劍獅塔羅</span>
        </Link>
        <DeckSwitcher currentDeck={deck} onSelect={setDeck} />
      </nav>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] px-6 py-12">
        <AnimatePresence mode="wait">

          {/* Step 1: Choose spread */}
          {step === 'spread' && (
            <motion.div
              key="spread"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-12">
                <p className="text-[10px] text-[#C4902D] tracking-[0.3em] uppercase font-mono mb-3">第一步</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#EBE5D9] tracking-tight">選擇牌陣</h2>
                <p className="text-[#7A7260] text-sm mt-3">你想以什麼方式探索命運？</p>
              </div>

              <div className="space-y-3">
                {(Object.keys(SPREAD_CONFIG) as SpreadType[]).map((s, i) => {
                  const config = SPREAD_CONFIG[s];
                  const desc = SPREAD_DESCRIPTIONS[s];
                  const isSelected = spread === s;

                  return (
                    <motion.button
                      key={s}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 25 }}
                      onClick={() => setSpread(s)}
                      className="w-full text-left px-6 py-5 rounded-xl transition-all active:scale-[0.99]"
                      style={{
                        background: isSelected ? 'rgba(196,144,45,0.08)' : 'rgba(17,21,34,0.5)',
                        border: isSelected
                          ? '1px solid rgba(196,144,45,0.4)'
                          : '1px solid rgba(196,144,45,0.1)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs flex-shrink-0"
                            style={{
                              background: isSelected ? 'rgba(196,144,45,0.15)' : 'rgba(196,144,45,0.06)',
                              color: '#C4902D',
                            }}
                          >
                            {config.count}
                          </div>
                          <div>
                            <p className="font-serif text-base text-[#EBE5D9]">{config.label_zh}</p>
                            <p className="text-[11px] text-[#7A7260] mt-0.5">{desc.desc}</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ scale: isSelected ? 1 : 0 }}
                          className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                          style={{ background: '#C4902D' }}
                        >
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#0B0D1A" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setStep('question')}
                className="w-full mt-8 py-4 rounded-xl text-sm font-medium tracking-wide transition-all active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, #C4902D, #A87520)',
                  color: '#0B0D1A',
                  boxShadow: '0 4px 24px rgba(196,144,45,0.2)',
                }}
              >
                繼續
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Question (optional) */}
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="w-full max-w-xl"
            >
              <div className="text-center mb-12">
                <p className="text-[10px] text-[#C4902D] tracking-[0.3em] uppercase font-mono mb-3">第二步</p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#EBE5D9] tracking-tight">心中的問題</h2>
                <p className="text-[#7A7260] text-sm mt-3">將你的困惑或疑問帶入牌局（可留空）</p>
              </div>

              <div
                className="rounded-xl p-1"
                style={{ border: '1px solid rgba(196,144,45,0.2)', background: 'rgba(17,21,34,0.6)' }}
              >
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="例：我現在的感情走向是什麼？這份工作機會適合我嗎？..."
                  rows={4}
                  maxLength={200}
                  className="w-full bg-transparent px-4 py-3 text-sm text-[#EBE5D9] placeholder-[#4A4538] resize-none outline-none"
                  style={{ fontFamily: 'var(--font-noto-serif)' }}
                />
                <div className="flex justify-end px-4 pb-2">
                  <span className="text-[10px] text-[#4A4538] font-mono">
                    {question.length}/200
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep('spread')}
                  className="flex-1 py-3.5 rounded-xl text-sm text-[#7A7260] glass-panel transition-all active:scale-[0.98]"
                >
                  返回
                </button>
                <button
                  onClick={handleStartReading}
                  className="flex-[2] py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #C4902D, #A87520)',
                    color: '#0B0D1A',
                    boxShadow: '0 4px 24px rgba(196,144,45,0.2)',
                  }}
                >
                  開始抽牌
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Shuffling */}
          {step === 'shuffle' && (
            <motion.div
              key="shuffle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="flex flex-col items-center gap-8"
            >
              {/* Shuffling animation */}
              <div className="relative" style={{ width: 200, height: 280 }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      width: 130,
                      height: 208,
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [
                        -65 + i * 10,
                        -65 + (i - 1) * 30,
                        -65 + i * 10,
                      ],
                      y: [
                        -104 + i * 8,
                        -104 + (i + 1) * 8,
                        -104 + i * 8,
                      ],
                      rotate: [i * 6 - 6, i * 6 - 3, i * 6 - 6],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  >
                    <CardBack className="w-full h-full" />
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-serif text-lg text-[#EBE5D9]"
                >
                  牌正在洗混中...
                </motion.p>
                <p className="text-[11px] text-[#7A7260] mt-2">
                  {question ? `問題：${question.slice(0, 30)}${question.length > 30 ? '...' : ''}` : '傾注你的意念'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
