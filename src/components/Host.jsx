export default function Host({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Curled tail */}
      <path d="M8 32 Q4 28 6 24 Q8 20 12 22" fill="none" stroke="#3DBF5E" strokeWidth="2.5" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="22" cy="26" rx="10" ry="7" fill="#3DBF5E" />
      {/* Belly stripe */}
      <ellipse cx="22" cy="28" rx="7" ry="4" fill="#8AE070" opacity="0.5" />
      {/* Head crest */}
      <path d="M28 10 Q32 6 34 10 Q32 8 30 12Z" fill="#2DA04A" />
      {/* Head */}
      <ellipse cx="26" cy="16" rx="9" ry="8" fill="#3DBF5E" />
      {/* Eye turret - the big chameleon eye */}
      <circle cx="24" cy="13" r="5.5" fill="#2DA04A" />
      <circle cx="24" cy="13" r="4" fill="#F4D83D" />
      <circle cx="24" cy="13" r="2" fill="#0A0B0D" />
      <circle cx="25" cy="12" r="0.8" fill="#FFF" opacity="0.9" />
      {/* Mouth line - slight smile */}
      <path d="M19 20 Q23 22 30 18" fill="none" stroke="#2DA04A" strokeWidth="1" strokeLinecap="round" />
      {/* Front leg */}
      <path d="M18 30 L16 34 M16 34 L14 33 M16 34 L18 33" stroke="#3DBF5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Back leg */}
      <path d="M28 30 L30 34 M30 34 L28 33 M30 34 L32 33" stroke="#3DBF5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spots */}
      <circle cx="18" cy="24" r="1.5" fill="#2DA04A" opacity="0.5" />
      <circle cx="24" cy="23" r="1.2" fill="#2DA04A" opacity="0.5" />
      <circle cx="28" cy="25" r="1" fill="#2DA04A" opacity="0.5" />
    </svg>
  );
}
