'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { DECKS, Deck, DeckId } from '@/data/decks';
import { Lock, Cards } from '@phosphor-icons/react';

interface DeckSwitcherProps {
  currentDeck: DeckId;
  onSelect: (id: DeckId) => void;
}

export default function DeckSwitcher({ currentDeck, onSelect }: DeckSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-panel text-[#EBE5D9] text-sm transition-all hover:border-[rgba(196,144,45,0.35)] active:scale-[0.98]"
      >
        <Cards size={16} weight="light" style={{ color: '#C4902D' }} />
        <span className="font-serif text-xs">
          {DECKS.find(d => d.id === currentDeck)?.name_zh}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#7A7260] text-xs"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute top-full mt-2 right-0 w-72 glass-panel rounded-xl overflow-hidden"
            style={{ zIndex: 100 }}
          >
            {DECKS.map((deck, i) => (
              <DeckOption
                key={deck.id}
                deck={deck}
                isActive={deck.id === currentDeck}
                index={i}
                onSelect={(id) => {
                  if (!deck.locked) {
                    onSelect(id);
                    setOpen(false);
                  }
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeckOption({
  deck,
  isActive,
  index,
  onSelect,
}: {
  deck: Deck;
  isActive: boolean;
  index: number;
  onSelect: (id: DeckId) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      onClick={() => onSelect(deck.id)}
      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-all
        ${isActive ? 'bg-[rgba(196,144,45,0.1)]' : 'hover:bg-[rgba(255,255,255,0.03)]'}
        ${deck.locked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${index < 1 ? '' : 'border-t border-[rgba(196,144,45,0.08)]'}
      `}
    >
      {/* Color swatch */}
      <div
        className="w-8 h-10 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{
          background: `linear-gradient(160deg, ${deck.backColor}, #0B0D1A)`,
          border: `1px solid ${deck.accentColor}40`,
        }}
      >
        {deck.locked ? (
          <Lock size={12} style={{ color: deck.accentColor }} />
        ) : (
          <div className="w-2 h-2 rounded-full" style={{ background: deck.accentColor }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm text-[#EBE5D9]">{deck.name_zh}</span>
          {deck.locked && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded-full font-mono tracking-wider"
              style={{
                background: `${deck.accentColor}20`,
                color: deck.accentColor,
                border: `1px solid ${deck.accentColor}40`,
              }}
            >
              限量版
            </span>
          )}
        </div>
        <p className="text-[11px] text-[#7A7260] mt-0.5 leading-tight">{deck.tagline}</p>
      </div>

      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#C4902D] mt-2 flex-shrink-0" />
      )}
    </motion.button>
  );
}
