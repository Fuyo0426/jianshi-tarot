import Image from 'next/image';
import { TarotCard } from '@/data/cards';

interface CardFaceProps {
  card: TarotCard;
  reversed?: boolean;
  className?: string;
  small?: boolean;
}

function getCardImagePath(card: TarotCard): string {
  if (card.arcana === 'major') {
    const num = card.number.toString().padStart(2, '0');
    return `/cards/rider-waite/major-${num}.jpg`;
  }
  return `/cards/rider-waite/${card.suit}-${card.number}.jpg`;
}

export default function CardFace({ card, reversed = false, className = '', small = false }: CardFaceProps) {
  const imagePath = getCardImagePath(card);

  return (
    <div
      className={`relative rounded-lg overflow-hidden flex flex-col ${className}`}
      style={{
        border: '1px solid rgba(196, 144, 45, 0.4)',
        background: '#0d0f1a',
      }}
    >
      {/* Card image — fills most of the card */}
      <div
        className="relative flex-1 overflow-hidden"
        style={{
          transform: reversed ? 'rotate(180deg)' : undefined,
        }}
      >
        <Image
          src={imagePath}
          alt={card.name_zh}
          fill
          className="object-cover object-top"
          sizes={small ? '80px' : '160px'}
        />
        {/* Subtle gradient overlay at bottom for text legibility */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: 'linear-gradient(to top, rgba(11,13,26,0.92), transparent)',
          }}
        />
      </div>

      {/* Card name footer */}
      <div
        className="relative flex-shrink-0 px-2 py-1.5 text-center"
        style={{ background: 'rgba(11,13,26,0.9)' }}
      >
        <p
          className="leading-tight truncate"
          style={{
            color: card.color,
            fontSize: small ? '8px' : '10px',
            fontFamily: 'var(--font-noto-serif)',
          }}
        >
          {card.name_zh}
        </p>
        {reversed && !small && (
          <p className="text-[7px] text-[#7A7260] font-mono mt-0.5">逆位</p>
        )}
      </div>
    </div>
  );
}
