export default function Professor({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Ear tufts */}
      <path d="M8 6 Q6 2 10 4 Q12 5 10 8Z" fill="#8B6914" />
      <path d="M32 6 Q34 2 30 4 Q28 5 30 8Z" fill="#8B6914" />
      {/* Head */}
      <circle cx="20" cy="20" r="15" fill="#8B6914" />
      {/* Face disk */}
      <ellipse cx="20" cy="21" rx="12" ry="11" fill="#D4B896" />
      {/* Face disk inner rings */}
      <ellipse cx="20" cy="21" rx="9" ry="8.5" fill="none" stroke="#C4A886" strokeWidth="0.5" opacity="0.5" />
      {/* Glasses frames */}
      <circle cx="14" cy="19" r="4.5" fill="none" stroke="#4A4A4A" strokeWidth="1.2" />
      <circle cx="26" cy="19" r="4.5" fill="none" stroke="#4A4A4A" strokeWidth="1.2" />
      {/* Glasses bridge */}
      <path d="M18.5 19 L21.5 19" stroke="#4A4A4A" strokeWidth="1" strokeLinecap="round" />
      {/* Lens reflections */}
      <path d="M11 17 Q12 16 13 16.5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" strokeLinecap="round" />
      <path d="M23 17 Q24 16 25 16.5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.7" strokeLinecap="round" />
      {/* Eyes - serious */}
      <ellipse cx="14" cy="19.5" rx="2" ry="2.2" fill="#1A1A0E" />
      <circle cx="14.5" cy="18.8" r="0.6" fill="#FFF" opacity="0.9" />
      <ellipse cx="26" cy="19.5" rx="2" ry="2.2" fill="#1A1A0E" />
      <circle cx="26.5" cy="18.8" r="0.6" fill="#FFF" opacity="0.9" />
      {/* Serious eyebrows */}
      <path d="M10 15 Q14 13.5 18 15" fill="none" stroke="#6B4A0A" strokeWidth="1" strokeLinecap="round" />
      <path d="M22 15 Q26 13.5 30 15" fill="none" stroke="#6B4A0A" strokeWidth="1" strokeLinecap="round" />
      {/* Beak */}
      <path d="M18 24 L20 28 L22 24Z" fill="#D4943A" />
      <path d="M19 24 L20 26.5 L21 24" fill="none" stroke="#B07A2A" strokeWidth="0.4" />
      {/* Feather tufts at sides */}
      <path d="M6 18 Q4 16 5 14" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 18 Q36 16 35 14" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round" />
      {/* Chest feather texture */}
      <path d="M16 30 Q20 32 24 30" fill="none" stroke="#C4A886" strokeWidth="0.5" opacity="0.6" />
      <path d="M17 32 Q20 34 23 32" fill="none" stroke="#C4A886" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}
