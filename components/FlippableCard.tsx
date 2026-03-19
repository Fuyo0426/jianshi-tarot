'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { TarotCard } from '@/data/cards';
import CardBack from './CardBack';
import CardFace from './CardFace';

interface FlippableCardProps {
  card: TarotCard;
  reversed: boolean;
  positionLabel: string;
  index: number;
  deckBackColor?: string;
  onFlip?: () => void;
}

export default function FlippableCard({
  card,
  reversed,
  positionLabel,
  index,
  deckBackColor = '#1A2744',
  onFlip,
}: FlippableCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
      onFlip?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
      className="flex flex-col items-center gap-3"
    >
      {/* Position label */}
      <span className="text-[11px] text-[#7A7260] font-mono tracking-widest uppercase">
        {positionLabel}
      </span>

      {/* Card flip container */}
      <div
        className="card-flip-container cursor-pointer"
        style={{ width: 220, height: 352 }}
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, type: 'spring', stiffness: 100, damping: 18 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Card back */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
            <CardBack
              deckColor={deckBackColor}
              className="w-full h-full"
            />
            {!flipped && (
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-3 left-0 right-0 flex justify-center"
              >
                <span className="text-[9px] text-[#C4902D] font-mono tracking-widest">TAP</span>
              </motion.div>
            )}
          </div>

          {/* Card face */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <CardFace
              card={card}
              reversed={reversed}
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Card name (shown after flip) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: flipped ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center"
      >
        <p className="font-serif text-sm text-[#EBE5D9]">{card.name_zh}</p>
        {reversed && (
          <p className="text-[10px] text-[#7A7260] mt-0.5">逆位</p>
        )}
      </motion.div>
    </motion.div>
  );
}
