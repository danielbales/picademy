export default function Host({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <radialGradient id="lida-skin" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#F0D8C8" />
          <stop offset="100%" stopColor="#D8B8A0" />
        </radialGradient>
        <linearGradient id="lida-beret" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
      </defs>

      {/* Scarf / turtleneck */}
      <path d="M12 34 Q14 30 20 29 Q26 30 28 34 L30 40 L10 40 Z" fill="#1A1A1A" />
      <path d="M15 32 Q17 31 20 30.5 Q23 31 25 32" fill="none" stroke="#2A2A2A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 34 Q17 33 20 32.5 Q23 33 26 34" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="20" cy="22" rx="10" ry="11" fill="url(#lida-skin)" />

      {/* Beret */}
      <ellipse cx="20" cy="13" rx="11" ry="5" fill="url(#lida-beret)" />
      <path d="M9 13 Q9 8 20 8 Q31 8 31 13" fill="url(#lida-beret)" />
      {/* Beret nub */}
      <circle cx="20" cy="7" r="1.5" fill="#2A2A2A" />
      {/* Beret band */}
      <path d="M10 14 Q20 16 30 14" fill="none" stroke="#3A3A3A" strokeWidth="0.8" />
      {/* Beret highlight */}
      <ellipse cx="16" cy="10" rx="3" ry="1.5" fill="#3A3A3A" opacity="0.5" />

      {/* Round glasses - pretentious oversized */}
      <circle cx="15.5" cy="22" r="4.5" fill="none" stroke="#3A3A3A" strokeWidth="1.2" />
      <circle cx="24.5" cy="22" r="4.5" fill="none" stroke="#3A3A3A" strokeWidth="1.2" />
      {/* Bridge */}
      <path d="M19 21 Q20 20 21 21" fill="none" stroke="#3A3A3A" strokeWidth="1" />
      {/* Lens tint */}
      <circle cx="15.5" cy="22" r="3.8" fill="#6EC8FF" opacity="0.08" />
      <circle cx="24.5" cy="22" r="3.8" fill="#6EC8FF" opacity="0.08" />
      {/* Lens glare */}
      <ellipse cx="13.5" cy="20.5" rx="1.2" ry="0.8" fill="#FFF" opacity="0.15" />
      <ellipse cx="22.5" cy="20.5" rx="1.2" ry="0.8" fill="#FFF" opacity="0.15" />

      {/* Eyes behind glasses - slightly narrowed, judgy */}
      <ellipse cx="15.5" cy="22.2" rx="1.6" ry="1.2" fill="#1A1A1A" />
      <circle cx="16" cy="21.8" r="0.4" fill="#FFF" opacity="0.7" />
      <ellipse cx="24.5" cy="22.2" rx="1.6" ry="1.2" fill="#1A1A1A" />
      <circle cx="25" cy="21.8" r="0.4" fill="#FFF" opacity="0.7" />
      {/* Slightly raised eyebrow - snooty */}
      <path d="M12 18 Q15.5 16.5 19 18.5" fill="none" stroke="#A08878" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M21 18.5 Q24.5 16 28 17.5" fill="none" stroke="#A08878" strokeWidth="0.8" strokeLinecap="round" />

      {/* Upturned nose - snooty */}
      <path d="M19 25 Q20 24 21 25" fill="none" stroke="#C0A090" strokeWidth="0.8" strokeLinecap="round" />

      {/* Pursed/unimpressed mouth */}
      <path d="M17 28 Q20 27.5 23 28" fill="none" stroke="#B08878" strokeWidth="0.8" strokeLinecap="round" />

      {/* Subtle blush */}
      <ellipse cx="12" cy="25" rx="2" ry="1.2" fill="#E0A090" opacity="0.2" />
      <ellipse cx="28" cy="25" rx="2" ry="1.2" fill="#E0A090" opacity="0.2" />
    </svg>
  );
}
