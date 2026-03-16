import Image from 'next/image';

// 安平平安 logo — only show left square portion of the image
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
      {/*
        The appa99 logo image is a wide rectangle (logo icon on left + text on right).
        We want only the left square portion.
        Render image at 3× width, anchored to left → shows only leftmost square.
      */}
      <Image
        src={APPA99_LOGO}
        alt="安平平安"
        width={size * 3}
        height={size}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
          objectPosition: 'left center',
          height: size,
          width: 'auto',
        }}
        unoptimized
      />
    </div>
  );
}
