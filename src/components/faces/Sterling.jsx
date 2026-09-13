export default function Sterling({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Head */}
      <circle cx="20" cy="21" r="14" fill="#F5DEB3" />
      {/* Slicked hair */}
      <path d="M8 16 Q8 6 20 6 Q32 6 32 16 Q30 10 20 10 Q10 10 8 16Z" fill="#3B3024" />
      {/* Left eye */}
      <ellipse cx="15" cy="19" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="15.6" cy="18.4" r="0.6" fill="#FFF" />
      {/* Right eye - behind monocle */}
      <ellipse cx="25" cy="19" rx="2" ry="2.2" fill="#2C1810" />
      <circle cx="25.6" cy="18.4" r="0.6" fill="#FFF" />
      {/* Monocle */}
      <circle cx="25" cy="19" r="4.5" fill="none" stroke="#D4A843" strokeWidth="1.2" />
      <line x1="29" y1="21" x2="32" y2="30" stroke="#D4A843" strokeWidth="0.8" />
      {/* Stern brow */}
      <line x1="12" y1="15" x2="18" y2="15.5" stroke="#3B3024" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="22" y1="15.5" x2="28" y2="15" stroke="#3B3024" strokeWidth="1.2" strokeLinecap="round" />
      {/* Tight lips */}
      <line x1="16" y1="26" x2="24" y2="26" stroke="#C4917A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Subtle frown hint */}
      <path d="M16 27 Q20 25.5 24 27" fill="none" stroke="#C4917A" strokeWidth="0.6" strokeLinecap="round" />
      {/* Nose */}
      <path d="M20 21 L19 24 L21 24" fill="none" stroke="#D4B896" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
