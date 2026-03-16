import Image from 'next/image';

const APPA99_LOGO = 'https://appa99.com/store/images/appa99/s_siteinfo/7_1.jpg';

interface JianshiLogoProps {
  size?: number;
  className?: string;
}

export default function JianshiLogo({ size = 48, className = '' }: JianshiLogoProps) {
  return (
    <div
      className={`flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        borderRadius: '6px',
        border: '1px solid rgba(196,144,45,0.45)',
      }}
    >
      <Image
        src={APPA99_LOGO}
        alt="安平平安 劍獅守護"
        fill
        className="object-cover"
        sizes={`${size}px`}
        unoptimized
      />
    </div>
  );
}
