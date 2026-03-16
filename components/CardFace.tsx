import { TarotCard } from '@/data/cards';

interface CardFaceProps {
  card: TarotCard;
  reversed?: boolean;
  className?: string;
  small?: boolean;
}

const SUIT_SYMBOLS: Record<string, string> = {
  cups: '◎',
  wands: '|',
  swords: '✦',
  pentacles: '⬡',
};

export default function CardFace({ card, reversed = false, className = '', small = false }: CardFaceProps) {
  const isMinor = card.arcana === 'minor';

  return (
    <div
      className={`relative rounded-lg overflow-hidden flex flex-col ${className}`}
      style={{
        background: `linear-gradient(160deg, #111522 0%, #0d1020 100%)`,
        border: '1px solid rgba(196, 144, 45, 0.4)',
        transform: reversed ? 'rotate(180deg)' : undefined,
      }}
    >
      {/* Top number/suit */}
      <div className="flex items-start justify-between px-3 pt-3">
        <span
          style={{ color: card.color, fontSize: small ? '10px' : '12px' }}
          className="font-mono font-bold opacity-80"
        >
          {isMinor ? card.number : (card.number === 0 ? '0' : card.number.toString().padStart(2, '0'))}
        </span>
        {isMinor && card.suit && (
          <span style={{ color: card.color, fontSize: small ? '10px' : '12px' }} className="opacity-60">
            {SUIT_SYMBOLS[card.suit]}
          </span>
        )}
      </div>

      {/* Center artwork area */}
      <div className="flex-1 flex items-center justify-center px-2 py-1">
        <div
          className="w-full rounded flex items-center justify-center relative overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at center, ${card.color}18, transparent)`,
            border: `1px solid ${card.color}22`,
            aspectRatio: '3/4',
            maxHeight: small ? '60px' : '120px',
          }}
        >
          {/* Decorative SVG art */}
          <svg
            viewBox="0 0 80 80"
            width={small ? 40 : 70}
            height={small ? 40 : 70}
            xmlns="http://www.w3.org/2000/svg"
          >
            {card.arcana === 'major' ? (
              /* Major arcana - ornate star pattern */
              <>
                <circle cx="40" cy="40" r="28" stroke={card.color} strokeWidth="0.8" fill="none" opacity="0.3" />
                <circle cx="40" cy="40" r="20" stroke={card.color} strokeWidth="0.6" fill="none" opacity="0.2" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 40 + 10 * Math.cos(rad);
                  const y1 = 40 + 10 * Math.sin(rad);
                  const x2 = 40 + 28 * Math.cos(rad);
                  const y2 = 40 + 28 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={card.color} strokeWidth="0.6" opacity="0.4" />;
                })}
                <circle cx="40" cy="40" r="6" fill={card.color} opacity="0.6" />
                <circle cx="40" cy="40" r="3" fill={card.color} opacity="0.9" />
                {/* Number in center */}
                <text x="40" y="45" textAnchor="middle" fill={card.color} fontSize="10" fontFamily="serif" opacity="0.8">
                  {card.number === 0 ? '☽' : card.number}
                </text>
              </>
            ) : (
              /* Minor arcana - suit-based pattern */
              <>
                {Array.from({ length: Math.min(card.number, 4) }).map((_, i) => {
                  const angle = (i / Math.min(card.number, 4)) * Math.PI * 2;
                  const r = 20;
                  const cx = 40 + r * Math.cos(angle - Math.PI / 2);
                  const cy = 40 + r * Math.sin(angle - Math.PI / 2);
                  return <circle key={i} cx={cx} cy={cy} r="4" fill={card.color} opacity="0.5" />;
                })}
                <text x="40" y="45" textAnchor="middle" fill={card.color} fontSize="14" opacity="0.7">
                  {SUIT_SYMBOLS[card.suit || 'cups']}
                </text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Card name */}
      <div className="px-2 pb-3 text-center">
        <p
          className="font-serif leading-tight"
          style={{
            color: card.color,
            fontSize: small ? '9px' : '11px',
          }}
        >
          {card.name_zh}
        </p>
        {!small && (
          <p className="text-[8px] text-[#7A7260] mt-0.5 tracking-wider uppercase">
            {card.name}
          </p>
        )}
      </div>

      {/* Reversed indicator */}
      {reversed && (
        <div
          className="absolute top-1 right-1 text-[8px] font-mono"
          style={{ color: card.color, opacity: 0.6, transform: 'rotate(180deg)' }}
        >
          ↓
        </div>
      )}
    </div>
  );
}
