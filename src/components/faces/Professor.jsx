export default function Professor({ mood = "neutral" }) {
  // Mouth paths by mood
  const mouth = {
    happy: "M16 25 Q20 29 24 25",
    neutral: "M17 25 Q20 27 23 25",
    grumpy: "M16 26 Q20 24 24 26",
  }[mood];

  // Eyebrow curves by mood
  const browLeft = {
    happy: "M10 15 Q14 13 18 14.5",
    neutral: "M10 15 Q14 13.5 18 15",
    grumpy: "M10 14 Q14 15.5 18 16",
  }[mood];
  const browRight = {
    happy: "M22 14.5 Q26 13 30 15",
    neutral: "M22 15 Q26 13.5 30 15",
    grumpy: "M22 16 Q26 15.5 30 14",
  }[mood];

  // Eye shape by mood
  const eyeRyLeft = mood === "grumpy" ? 1.6 : 2.2;
  const eyeRyRight = mood === "grumpy" ? 1.6 : 2.2;
  const eyeYOffset = mood === "grumpy" ? 0.4 : 0;

  // Highlight size (sparkly eyes when happy)
  const highlightR = mood === "happy" ? 0.9 : 0.6;
  const highlight2R = mood === "happy" ? 0.45 : 0;

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Main feather gradient - amber/brown with warmth */}
        <radialGradient id="prof-feather" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#A67C1A" />
          <stop offset="60%" stopColor="#8B6914" />
          <stop offset="100%" stopColor="#6B4A0A" />
        </radialGradient>
        {/* Face disk gradient - warm cream with depth */}
        <radialGradient id="prof-disk" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#E8D5B8" />
          <stop offset="70%" stopColor="#D4B896" />
          <stop offset="100%" stopColor="#C4A886" />
        </radialGradient>
        {/* Beak gradient */}
        <linearGradient id="prof-beak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0A844" />
          <stop offset="100%" stopColor="#B07A2A" />
        </linearGradient>
        {/* Glasses lens tint */}
        <radialGradient id="prof-lens" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C8D8E8" stopOpacity="0.08" />
        </radialGradient>
        {/* Eye gradient */}
        <radialGradient id="prof-eye" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#3A2A0E" />
          <stop offset="100%" stopColor="#1A1A0E" />
        </radialGradient>
      </defs>

      {/* Ear tufts - more detailed */}
      <path d="M8 7 Q5 1 10 3 Q13 4.5 10 8Z" fill="url(#prof-feather)" />
      <path d="M9 7 Q7 3 10.5 4" fill="none" stroke="#6B4A0A" strokeWidth="0.4" opacity="0.5" />
      <path d="M32 7 Q35 1 30 3 Q27 4.5 30 8Z" fill="url(#prof-feather)" />
      <path d="M31 7 Q33 3 29.5 4" fill="none" stroke="#6B4A0A" strokeWidth="0.4" opacity="0.5" />

      {/* Head */}
      <circle cx="20" cy="20" r="15" fill="url(#prof-feather)" />

      {/* Feather texture on head */}
      <path d="M10 12 Q12 10 14 12" fill="none" stroke="#6B4A0A" strokeWidth="0.3" opacity="0.4" />
      <path d="M26 12 Q28 10 30 12" fill="none" stroke="#6B4A0A" strokeWidth="0.3" opacity="0.4" />
      <path d="M8 18 Q9 16 11 17" fill="none" stroke="#6B4A0A" strokeWidth="0.3" opacity="0.3" />
      <path d="M29 17 Q31 16 32 18" fill="none" stroke="#6B4A0A" strokeWidth="0.3" opacity="0.3" />

      {/* Face disk - main */}
      <ellipse cx="20" cy="21" rx="12" ry="11" fill="url(#prof-disk)" />
      {/* Face disk concentric rings */}
      <ellipse cx="20" cy="21" rx="10.5" ry="9.8" fill="none" stroke="#C4A886" strokeWidth="0.4" opacity="0.4" />
      <ellipse cx="20" cy="21" rx="9" ry="8.5" fill="none" stroke="#C4A886" strokeWidth="0.3" opacity="0.3" />
      {/* Face disk feather lines radiating out */}
      <path d="M12 14 Q14 16 14 18" fill="none" stroke="#C4A886" strokeWidth="0.3" opacity="0.35" />
      <path d="M28 14 Q26 16 26 18" fill="none" stroke="#C4A886" strokeWidth="0.3" opacity="0.35" />
      <path d="M10 22 Q12 21 13 22" fill="none" stroke="#C4A886" strokeWidth="0.3" opacity="0.3" />
      <path d="M27 22 Q28 21 30 22" fill="none" stroke="#C4A886" strokeWidth="0.3" opacity="0.3" />

      {/* Glasses frames - thicker, more prominent */}
      <circle cx="14" cy="19" r="5" fill="url(#prof-lens)" stroke="#3A3A3A" strokeWidth="1.3" />
      <circle cx="26" cy="19" r="5" fill="url(#prof-lens)" stroke="#3A3A3A" strokeWidth="1.3" />
      {/* Glasses bridge */}
      <path d="M19 18.5 Q20 17.8 21 18.5" fill="none" stroke="#3A3A3A" strokeWidth="1.1" strokeLinecap="round" />
      {/* Glasses temples (arms going to sides) */}
      <path d="M9 18 Q7 17.5 5.5 18" stroke="#3A3A3A" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M31 18 Q33 17.5 34.5 18" stroke="#3A3A3A" strokeWidth="0.9" fill="none" strokeLinecap="round" />

      {/* Lens reflections - curved glare lines */}
      <path d="M10.5 16.5 Q12 15.5 13.5 16" fill="none" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" strokeLinecap="round" />
      <path d="M22.5 16.5 Q24 15.5 25.5 16" fill="none" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.6" strokeLinecap="round" />
      {/* Secondary small reflection */}
      <circle cx="16.5" cy="21" r="0.5" fill="#FFFFFF" opacity="0.25" />
      <circle cx="28.5" cy="21" r="0.5" fill="#FFFFFF" opacity="0.25" />

      {/* Eyebrows - expressive based on mood */}
      <path d={browLeft} fill="none" stroke="#5A3A08" strokeWidth="1.1" strokeLinecap="round" />
      <path d={browRight} fill="none" stroke="#5A3A08" strokeWidth="1.1" strokeLinecap="round" />

      {/* Eyes - wise and deep */}
      <ellipse cx="14" cy={19.5 + eyeYOffset} rx="2" ry={eyeRyLeft} fill="url(#prof-eye)" />
      <circle cx={14.5} cy={18.8 + eyeYOffset} r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2R > 0 && (
        <circle cx="13" cy={19.8 + eyeYOffset} r={highlight2R} fill="#FFF" opacity="0.5" />
      )}
      <ellipse cx="26" cy={19.5 + eyeYOffset} rx="2" ry={eyeRyRight} fill="url(#prof-eye)" />
      <circle cx={26.5} cy={18.8 + eyeYOffset} r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2R > 0 && (
        <circle cx="25" cy={19.8 + eyeYOffset} r={highlight2R} fill="#FFF" opacity="0.5" />
      )}

      {/* Beak - with gradient and nostril detail */}
      <path d="M18 24 L20 28.5 L22 24Z" fill="url(#prof-beak)" />
      <path d="M19 24.2 L20 27 L21 24.2" fill="none" stroke="#9A6A1A" strokeWidth="0.4" />
      {/* Nostrils */}
      <circle cx="19.2" cy="25" r="0.3" fill="#9A6A1A" opacity="0.5" />
      <circle cx="20.8" cy="25" r="0.3" fill="#9A6A1A" opacity="0.5" />

      {/* Mouth - mood dependent */}
      <path d={mouth} fill="none" stroke="#8B6020" strokeWidth="0.7" strokeLinecap="round" />

      {/* Feather tufts at sides - more layered */}
      <path d="M6 18 Q4 16 5 13.5" fill="none" stroke="#A67C1A" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6.5 19 Q5 17.5 5.5 15.5" fill="none" stroke="#8B6914" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M34 18 Q36 16 35 13.5" fill="none" stroke="#A67C1A" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M33.5 19 Q35 17.5 34.5 15.5" fill="none" stroke="#8B6914" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Chest feather texture - layered Vs */}
      <path d="M15 30 Q20 32.5 25 30" fill="none" stroke="#C4A886" strokeWidth="0.5" opacity="0.5" />
      <path d="M16 31.5 Q20 33.5 24 31.5" fill="none" stroke="#C4A886" strokeWidth="0.45" opacity="0.45" />
      <path d="M17 33 Q20 34.8 23 33" fill="none" stroke="#C4A886" strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}
