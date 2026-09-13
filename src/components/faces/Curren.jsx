export default function Curren({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Mane */}
      <circle cx="20" cy="20" r="18" fill="#D4882A" />
      <circle cx="20" cy="20" r="16" fill="#E8A030" />
      {/* Mane tufts */}
      <path d="M6 12 Q2 8 6 6 Q8 10 10 12Z" fill="#C47820" />
      <path d="M34 12 Q38 8 34 6 Q32 10 30 12Z" fill="#C47820" />
      <path d="M10 6 Q12 2 16 4 Q14 6 12 10Z" fill="#C47820" />
      <path d="M30 6 Q28 2 24 4 Q26 6 28 10Z" fill="#C47820" />
      <path d="M4 18 Q0 16 2 12 Q4 16 8 16Z" fill="#C47820" />
      <path d="M36 18 Q40 16 38 12 Q36 16 32 16Z" fill="#C47820" />
      {/* Face */}
      <ellipse cx="20" cy="22" rx="11" ry="10" fill="#F4C878" />
      {/* Eyes */}
      <ellipse cx="15" cy="19" rx="2.5" ry="2.8" fill="#8B5A1E" />
      <circle cx="15.7" cy="18.3" r="0.8" fill="#FFF" opacity="0.9" />
      <ellipse cx="25" cy="19" rx="2.5" ry="2.8" fill="#8B5A1E" />
      <circle cx="25.7" cy="18.3" r="0.8" fill="#FFF" opacity="0.9" />
      {/* Nose */}
      <ellipse cx="20" cy="24" rx="3" ry="2" fill="#4A3020" />
      <ellipse cx="20" cy="23.5" rx="1.5" ry="0.6" fill="#6B4A3A" opacity="0.4" />
      {/* Mouth */}
      <path d="M20 26 L20 27.5" stroke="#4A3020" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M16 28 Q20 30.5 24 28" fill="none" stroke="#4A3020" strokeWidth="0.8" strokeLinecap="round" />
      {/* Whisker dots */}
      <circle cx="14" cy="26" r="0.6" fill="#C4A060" />
      <circle cx="12" cy="25" r="0.6" fill="#C4A060" />
      <circle cx="26" cy="26" r="0.6" fill="#C4A060" />
      <circle cx="28" cy="25" r="0.6" fill="#C4A060" />
    </svg>
  );
}
