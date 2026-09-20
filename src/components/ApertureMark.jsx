export default function ApertureMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <radialGradient id="ap-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E078" />
          <stop offset="50%" stopColor="#E8C84A" />
          <stop offset="100%" stopColor="#B8960F" />
        </radialGradient>
        <radialGradient id="ap-center" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="100%" stopColor="#E8C84A" />
        </radialGradient>
      </defs>
      {/* Outer glow ring */}
      <circle cx="20" cy="20" r="18" fill="none" stroke="#E8C84A" strokeWidth="1" opacity="0.3" />
      {/* Aperture blades - 6 overlapping curved blades */}
      <path d="M20 4 Q28 10 26 20 L20 20 Z" fill="url(#ap-glow)" opacity="0.9" />
      <path d="M33 9 Q32 19 24 25 L20 20 Z" fill="#D4B430" opacity="0.85" />
      <path d="M35 24 Q28 30 18 28 L20 20 Z" fill="url(#ap-glow)" opacity="0.9" />
      <path d="M20 36 Q12 30 14 20 L20 20 Z" fill="#D4B430" opacity="0.85" />
      <path d="M7 31 Q8 21 16 15 L20 20 Z" fill="url(#ap-glow)" opacity="0.9" />
      <path d="M5 16 Q12 10 22 12 L20 20 Z" fill="#D4B430" opacity="0.85" />
      {/* Blade edge highlights */}
      <path d="M20 4 Q28 10 26 20" fill="none" stroke="#FFF5C8" strokeWidth="0.5" opacity="0.5" />
      <path d="M35 24 Q28 30 18 28" fill="none" stroke="#FFF5C8" strokeWidth="0.5" opacity="0.5" />
      <path d="M7 31 Q8 21 16 15" fill="none" stroke="#FFF5C8" strokeWidth="0.5" opacity="0.5" />
      {/* Center opening */}
      <circle cx="20" cy="20" r="4.5" fill="#0A0B0D" />
      <circle cx="20" cy="20" r="3.5" fill="url(#ap-center)" opacity="0.15" />
      {/* Center bright dot */}
      <circle cx="20" cy="20" r="1.5" fill="#FFF8E0" opacity="0.6" />
    </svg>
  );
}
