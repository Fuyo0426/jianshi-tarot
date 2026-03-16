import Image from 'next/image';

const APPA99_LOGO = 'https://appa99.com/store/images/appa99/s_siteinfo/7_1.jpg';

interface JianshiLogoProps {
  size?: number;
  className?: string;
}

export default function JianshiLogo({ size = 48, className = '' }: JianshiLogoProps) {
  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        border: '1px solid rgba(196,144,45,0.4)',
        position: 'relative',
      }}
    >
      <Image
        src={APPA99_LOGO}
        alt="劍獅守護 Logo"
        fill
        className="object-cover"
        sizes={`${size}px`}
        unoptimized
      />
    </div>
  );
}
