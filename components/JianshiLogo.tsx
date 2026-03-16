interface JianshiLogoProps {
  size?: number;
  className?: string;
}

export default function JianshiLogo({ size = 48, className = '' }: JianshiLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer octagon frame */}
      <path
        d="M50 4 L82 18 L96 50 L82 82 L50 96 L18 82 L4 50 L18 18 Z"
        stroke="#C4902D"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      {/* Inner circle */}
      <circle cx="50" cy="50" r="30" stroke="#C4902D" strokeWidth="1" fill="none" opacity="0.4" />

      {/* Lion face - stylized */}
      {/* Head */}
      <circle cx="50" cy="45" r="16" fill="rgba(196,144,45,0.12)" stroke="#C4902D" strokeWidth="1.2" />

      {/* Eyes */}
      <circle cx="44" cy="42" r="2.5" fill="#C4902D" />
      <circle cx="56" cy="42" r="2.5" fill="#C4902D" />
      <circle cx="44.8" cy="41.2" r="1" fill="#0B0D1A" />
      <circle cx="56.8" cy="41.2" r="1" fill="#0B0D1A" />

      {/* Nose */}
      <path d="M48.5 47 L50 49 L51.5 47 Z" fill="#C4902D" opacity="0.8" />

      {/* Mouth */}
      <path d="M46 51 Q50 54 54 51" stroke="#C4902D" strokeWidth="1" fill="none" />

      {/* Ears */}
      <path d="M36 35 L39 28 L44 35" fill="rgba(196,144,45,0.2)" stroke="#C4902D" strokeWidth="1" />
      <path d="M56 35 L61 28 L64 35" fill="rgba(196,144,45,0.2)" stroke="#C4902D" strokeWidth="1" />

      {/* Mane rays */}
      <path d="M34 45 L26 42 M34 50 L25 50 M35 55 L27 58" stroke="#C4902D" strokeWidth="1" opacity="0.5" />
      <path d="M66 45 L74 42 M66 50 L75 50 M65 55 L73 58" stroke="#C4902D" strokeWidth="1" opacity="0.5" />

      {/* Sword element below */}
      <line x1="50" y1="62" x2="50" y2="86" stroke="#C4902D" strokeWidth="1.5" />
      <path d="M46 66 L54 66" stroke="#C4902D" strokeWidth="1.5" />
      <path d="M48 86 L50 90 L52 86" fill="#C4902D" opacity="0.8" />

      {/* Corner decorations */}
      <circle cx="18" cy="18" r="2" fill="#C4902D" opacity="0.4" />
      <circle cx="82" cy="18" r="2" fill="#C4902D" opacity="0.4" />
      <circle cx="18" cy="82" r="2" fill="#C4902D" opacity="0.4" />
      <circle cx="82" cy="82" r="2" fill="#C4902D" opacity="0.4" />
    </svg>
  );
}
