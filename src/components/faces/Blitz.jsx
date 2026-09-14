export default function Blitz({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Body */}
      <ellipse cx="20" cy="20" rx="6" ry="8" fill="#00C853" transform="rotate(-10 20 20)" />
      {/* Body highlight / iridescence */}
      <ellipse cx="19" cy="18" rx="3" ry="5" fill="#00BFA5" opacity="0.5" transform="rotate(-10 19 18)" />
      {/* Throat patch */}
      <ellipse cx="21" cy="22" rx="3" ry="3.5" fill="#E53935" />
      <ellipse cx="21" cy="21.5" rx="2" ry="2.5" fill="#FF5252" opacity="0.4" />
      {/* Head */}
      <circle cx="20" cy="12" r="5" fill="#00C853" />
      {/* Head highlight */}
      <circle cx="19" cy="11" r="2.5" fill="#00BFA5" opacity="0.5" />
      {/* Eye */}
      <circle cx="22" cy="11" r="1.8" fill="#1A1A2E" />
      <circle cx="22.5" cy="10.5" r="0.5" fill="#FFF" opacity="0.9" />
      {/* Beak - long and thin */}
      <path d="M25 12 L35 11 L25 13Z" fill="#333333" />
      {/* Left wing - motion blur effect */}
      <path d="M14 18 Q6 10 3 6" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M14 19 Q7 12 5 9" fill="none" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M14 20 Q8 14 6 11" fill="none" stroke="#00C853" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* Right wing - motion blur effect */}
      <path d="M26 18 Q34 10 37 6" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M26 19 Q33 12 35 9" fill="none" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M26 20 Q32 14 34 11" fill="none" stroke="#00C853" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      {/* Tail feathers */}
      <path d="M18 28 Q14 34 12 38" fill="none" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 28 Q18 34 17 38" fill="none" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 28 Q22 34 22 38" fill="none" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tiny feet */}
      <path d="M18 27 L16 30 M16 30 L15 29 M16 30 L17 29" stroke="#666" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M22 27 L24 30 M24 30 L23 29 M24 30 L25 29" stroke="#666" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}
