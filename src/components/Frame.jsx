export default function Frame({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 130" aria-hidden="true">
      {/* Outer frame */}
      <rect x="6" y="6" width="88" height="118" rx="3" fill="#B8922E" />
      {/* Frame face */}
      <rect x="9" y="9" width="82" height="112" rx="2" fill="#D4A843" />
      {/* Inner bevel */}
      <rect x="16" y="16" width="68" height="98" rx="2" fill="#B8922E" />
      {/* Mat */}
      <rect x="19" y="19" width="62" height="92" rx="1.5" fill="#EDE6D6" />
      {/* Dark opening */}
      <rect x="25" y="25" width="50" height="80" rx="1" fill="#0A0B0D" />
      {/* Corner rosettes */}
      <circle cx="15" cy="15" r="5" fill="#E8C84A" />
      <circle cx="85" cy="15" r="5" fill="#E8C84A" />
      <circle cx="15" cy="115" r="5" fill="#E8C84A" />
      <circle cx="85" cy="115" r="5" fill="#E8C84A" />
      <circle cx="15" cy="15" r="2" fill="#D4A843" />
      <circle cx="85" cy="15" r="2" fill="#D4A843" />
      <circle cx="15" cy="115" r="2" fill="#D4A843" />
      <circle cx="85" cy="115" r="2" fill="#D4A843" />
      {/* Top ornament */}
      <path d="M38 9 Q 50 2 62 9" fill="none" stroke="#E8C84A" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes peeking from the dark */}
      <ellipse cx="39" cy="56" rx="4" ry="4.5" fill="#1D2327" />
      <ellipse cx="61" cy="56" rx="4" ry="4.5" fill="#1D2327" />
      <ellipse cx="39" cy="56" rx="3" ry="3.5" fill="#D4A843" opacity="0.7" />
      <ellipse cx="61" cy="56" rx="3" ry="3.5" fill="#D4A843" opacity="0.7" />
      <circle cx="40.5" cy="55" r="1.2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="62.5" cy="55" r="1.2" fill="#FFFFFF" opacity="0.9" />
      {/* Subtle smirk */}
      <path d="M44 67 Q 50 72 56 67" fill="none" stroke="#D4A843" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Name plaque */}
      <rect x="30" y="95" width="40" height="7" rx="1.5" fill="#E8C84A" />
      <rect x="33" y="96.5" width="34" height="4" rx="1" fill="#D4A843" />
    </svg>
  );
}
