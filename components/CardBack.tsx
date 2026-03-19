import Image from 'next/image';

interface CardBackProps {
  deckColor?: string;
  className?: string;
  small?: boolean;
}

export default function CardBack({ className = '' }: CardBackProps) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden ${className}`}
    >
      <Image
        src="/card-back.jpg"
        alt="安平平安塔羅牌背面"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 120px, 200px"
      />
    </div>
  );
}
