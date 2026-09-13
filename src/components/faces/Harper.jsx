export default function Harper({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Body */}
      <ellipse cx="20" cy="22" rx="14" ry="10" fill="#5AADE0" />
      {/* Belly */}
      <ellipse cx="20" cy="24" rx="10" ry="7" fill="#A8D8F0" />
      {/* Dorsal fin */}
      <path d="M20 12 L22 8 L24 14Z" fill="#3A8DC0" />
      {/* Tail */}
      <path d="M5 20 L1 16 L1 26Z" fill="#4A9AD0" />
      {/* Snout */}
      <path d="M30 21 Q36 21 38 22 Q36 23 30 23Z" fill="#5AADE0" />
      {/* Eye */}
      <circle cx="28" cy="20" r="3.5" fill="#FFFFFF" />
      <circle cx="28.5" cy="20" r="2.2" fill="#2A6090" />
      <circle cx="29.2" cy="19.2" r="0.8" fill="#FFF" opacity="0.9" />
      {/* Smile */}
      <path d="M30 23 Q33 25 36 23" fill="none" stroke="#3A8DC0" strokeWidth="0.8" strokeLinecap="round" />
      {/* Flipper */}
      <path d="M18 26 Q14 30 12 28 Q14 26 18 26Z" fill="#4A9AD0" />
      {/* Tail fluke detail */}
      <path d="M3 18 Q1 16 2 14" fill="none" stroke="#3A8DC0" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M3 24 Q1 26 2 28" fill="none" stroke="#3A8DC0" strokeWidth="0.6" strokeLinecap="round" />
      {/* Water splash */}
      <circle cx="10" cy="16" r="1" fill="#A8D8F0" opacity="0.5" />
      <circle cx="14" cy="14" r="0.8" fill="#A8D8F0" opacity="0.4" />
      <circle cx="8" cy="14" r="0.6" fill="#A8D8F0" opacity="0.3" />
    </svg>
  );
}
