import Image from 'next/image';

const APPA99_LOGO = 'https://appa99.com/store/images/appa99/s_siteinfo/7_1.jpg';

interface CardBackProps {
  deckColor?: string;
  className?: string;
  small?: boolean;
}

export default function CardBack({ deckColor = '#1A2744', className = '', small = false }: CardBackProps) {
  const s = small ? 0.6 : 1;
  const logoSize = small ? 40 : 68;

  return (
    <div
      className={`relative rounded-lg overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, ${deckColor}ee, #0B0D1A)`,
        border: '1px solid rgba(196, 144, 45, 0.35)',
      }}
    >
      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cardGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(196,144,45,0.08)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cardGrid)" />
      </svg>

      {/* Corner ornaments */}
      <svg className="absolute top-2 left-2" width={12 * s} height={12 * s} viewBox="0 0 12 12">
        <path d="M0 12 L0 0 L12 0" stroke="rgba(196,144,45,0.5)" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute top-2 right-2" width={12 * s} height={12 * s} viewBox="0 0 12 12">
        <path d="M12 12 L12 0 L0 0" stroke="rgba(196,144,45,0.5)" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute bottom-2 left-2" width={12 * s} height={12 * s} viewBox="0 0 12 12">
        <path d="M0 0 L0 12 L12 12" stroke="rgba(196,144,45,0.5)" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute bottom-2 right-2" width={12 * s} height={12 * s} viewBox="0 0 12 12">
        <path d="M12 0 L12 12 L0 12" stroke="rgba(196,144,45,0.5)" strokeWidth="1" fill="none" />
      </svg>

      {/* Center logo — real appa99 劍獅 image */}
      <div
        className="relative z-10 animate-float rounded-full overflow-hidden"
        style={{
          width: logoSize,
          height: logoSize,
          border: '1px solid rgba(196,144,45,0.4)',
          boxShadow: '0 0 20px rgba(196,144,45,0.15)',
        }}
      >
        <Image
          src={APPA99_LOGO}
          alt="劍獅守護"
          fill
          className="object-cover"
          sizes={`${logoSize}px`}
          unoptimized
        />
      </div>
    </div>
  );
}
