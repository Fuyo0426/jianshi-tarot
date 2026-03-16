import Image from 'next/image';

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
      }}
    >
      <Image
        src="/logo.jpg"
        alt="安平平安"
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
