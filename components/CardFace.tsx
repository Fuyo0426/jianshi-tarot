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

export default function CardFace({ card, reversed = false, className = '', small: _small = false }: CardFaceProps) {
  const imagePath = getCardImagePath(card);

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${className}`}
      style={{
        border: '1px solid rgba(196, 144, 45, 0.4)',
        background: '#0d0f1a',
        transform: reversed ? 'rotate(180deg)' : undefined,
      }}
    >
      <Image
        src={imagePath}
        alt={card.name_zh}
        fill
        className="object-cover object-top"
        sizes="160px"
      />
    </div>
  );
}
