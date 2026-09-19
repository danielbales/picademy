export default function Gramps({ mood = "neutral", temper }) {
  // Mouth shape by mood
  const mouth = {
    happy: "M34 23.8 Q35.5 25.5 38 24.2",
    neutral: "M35 23.5 Q36 24.5 37.5 24",
    grumpy: "M34.5 24.5 Q36 23.5 37.5 24.2",
  }[mood];

  // Eye openness (ry) by mood
  const eyeRy = { happy: 1.6, neutral: 1.4, grumpy: 1.0 }[mood];
  const eyeSmallRy = { happy: 1.4, neutral: 1.2, grumpy: 0.85 }[mood];

  // Highlight size for sparkly happy eyes
  const hlR = { happy: 0.6, neutral: 0.4, grumpy: 0.3 }[mood];
  const hlSmallR = { happy: 0.5, neutral: 0.35, grumpy: 0.25 }[mood];

  // Brow offset for grumpy (lower brow)
  const browY = { happy: 18.2, neutral: 18.5, grumpy: 19.2 }[mood];
  const browSmallY = { happy: 18.8, neutral: 19, grumpy: 19.6 }[mood];

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Shell gradient - warm olive with depth */}
        <radialGradient id="gramps-shell" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#7A9E4E" />
          <stop offset="50%" stopColor="#5D7A3A" />
          <stop offset="100%" stopColor="#3D5A2A" />
        </radialGradient>
        {/* Shell rim highlight */}
        <linearGradient id="gramps-rim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4A6630" />
          <stop offset="50%" stopColor="#6B8C48" />
          <stop offset="100%" stopColor="#4A6630" />
        </linearGradient>
        {/* Skin gradient - warm leathery green */}
        <radialGradient id="gramps-skin" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#A0AE82" />
          <stop offset="100%" stopColor="#8B9B6B" />
        </radialGradient>
        {/* Spectacle lens tint */}
        <radialGradient id="gramps-lens" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4E0F0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#A0B0C8" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Shadow under shell */}
      <ellipse cx="20" cy="27" rx="13" ry="3" fill="#2A3A1A" opacity="0.2" />

      {/* Shell body */}
      <ellipse cx="20" cy="18" rx="14" ry="12" fill="url(#gramps-shell)" />

      {/* Shell sheen highlight */}
      <ellipse cx="17" cy="14" rx="6" ry="4" fill="#8AAF55" opacity="0.25" />

      {/* Shell hexagonal pattern */}
      <path
        d="M20 8 L26 12 L26 18 L20 22 L14 18 L14 12Z"
        fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6"
      />
      <path d="M14 12 L8 14" fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6" />
      <path d="M26 12 L32 14" fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6" />
      <path d="M14 18 L10 22" fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6" />
      <path d="M26 18 L30 22" fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6" />
      <path d="M20 22 L20 27" fill="none" stroke="#3D5A2A" strokeWidth="0.7" opacity="0.6" />
      {/* Extra hex subdivisions */}
      <path d="M20 8 L20 12" fill="none" stroke="#3D5A2A" strokeWidth="0.5" opacity="0.4" />
      <path d="M17 10 L14 12" fill="none" stroke="#3D5A2A" strokeWidth="0.5" opacity="0.4" />
      <path d="M23 10 L26 12" fill="none" stroke="#3D5A2A" strokeWidth="0.5" opacity="0.4" />

      {/* Shell rim */}
      <path
        d="M6 24 Q20 30 34 24"
        fill="none" stroke="url(#gramps-rim)" strokeWidth="1.4" strokeLinecap="round"
      />

      {/* Neck - wrinkled, warm skin */}
      <path
        d="M28 22 Q32 24 33 28 Q34 32 32 34"
        fill="none" stroke="url(#gramps-skin)" strokeWidth="3.8" strokeLinecap="round"
      />
      {/* Neck wrinkle lines */}
      <path d="M30 25.5 Q32 26 33 26.5" fill="none" stroke="#6B7B4B" strokeWidth="0.45" strokeLinecap="round" />
      <path d="M30 27.5 Q32 28 33 28.5" fill="none" stroke="#6B7B4B" strokeWidth="0.45" strokeLinecap="round" />
      <path d="M30.5 29.5 Q32 30 33 30.5" fill="none" stroke="#6B7B4B" strokeWidth="0.4" strokeLinecap="round" />

      {/* Head */}
      <ellipse cx="34" cy="22" rx="5.2" ry="4.8" fill="url(#gramps-skin)" />
      {/* Head subtle shading */}
      <ellipse cx="33" cy="21" rx="3" ry="2.5" fill="#B0BE92" opacity="0.3" />

      {/* Forehead wrinkles */}
      <path d="M31 19 Q33 18.8 35 19" fill="none" stroke="#7A8A5A" strokeWidth="0.35" strokeLinecap="round" />
      <path d="M31.5 19.6 Q33.5 19.4 35.5 19.6" fill="none" stroke="#7A8A5A" strokeWidth="0.3" strokeLinecap="round" opacity="0.6" />

      {/* Spectacles - prominent frames */}
      {/* Right lens (front eye) */}
      <circle cx="36" cy="20.8" r="2.6" fill="url(#gramps-lens)" stroke="#9A8A6A" strokeWidth="0.8" />
      {/* Left lens (back eye) */}
      <circle cx="31.8" cy="21.2" r="2.3" fill="url(#gramps-lens)" stroke="#9A8A6A" strokeWidth="0.8" />
      {/* Bridge */}
      <path d="M33.6 20.8 L34 21" stroke="#9A8A6A" strokeWidth="0.6" strokeLinecap="round" />
      {/* Temple arm */}
      <path d="M29.6 20.8 Q29 20.5 28.5 20" stroke="#9A8A6A" strokeWidth="0.5" strokeLinecap="round" />
      {/* Lens glint */}
      <path d="M34.8 19.6 Q35.2 19.3 35.6 19.5" fill="none" stroke="#FFF" strokeWidth="0.3" opacity="0.5" />

      {/* Eyes - wise, mood-reactive */}
      {/* Right eye (front) */}
      <ellipse cx="36" cy="20.8" rx="1.2" ry={eyeRy} fill="#3B2E10" />
      <circle cx="36.4" cy={20.8 - eyeRy * 0.3} r={hlR} fill="#FFF" opacity="0.85" />
      {mood === "happy" && (
        <circle cx="35.6" cy={20.8 + eyeRy * 0.15} r={0.2} fill="#FFF" opacity="0.5" />
      )}

      {/* Left eye (back) */}
      <ellipse cx="31.8" cy="21.2" rx="1" ry={eyeSmallRy} fill="#3B2E10" />
      <circle cx="32.1" cy={21.2 - eyeSmallRy * 0.3} r={hlSmallR} fill="#FFF" opacity="0.85" />

      {/* Eyebrow ridges - mood-reactive */}
      <path
        d={`M34.5 ${browY} Q36 ${browY - 0.6} 37.5 ${browY}`}
        fill="none" stroke="#6B7B4B" strokeWidth="0.5" strokeLinecap="round"
      />
      <path
        d={`M30.5 ${browSmallY} Q32 ${browSmallY - 0.5} 33.2 ${browSmallY}`}
        fill="none" stroke="#6B7B4B" strokeWidth="0.45" strokeLinecap="round"
      />

      {/* Nostril */}
      <circle cx="37.2" cy="22.5" r="0.35" fill="#5B6B3B" opacity="0.6" />

      {/* Mouth - mood-reactive */}
      <path
        d={mouth}
        fill="none" stroke="#5B6B3B" strokeWidth="0.65" strokeLinecap="round"
      />
      {/* Chin fold */}
      <path d="M35.5 25 Q36.5 25.3 37 25" fill="none" stroke="#7A8A5A" strokeWidth="0.3" strokeLinecap="round" opacity="0.5" />

      {/* Front legs */}
      <path d="M10 26 Q8 30 7 34" stroke="url(#gramps-skin)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M14 28 Q13 32 12 35" stroke="url(#gramps-skin)" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* Toes */}
      <path d="M6.5 34 L5.5 35 M7 34 L7 35.5 M7.5 34 L8.5 35" stroke="#8B9B6B" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M11.5 35 L10.5 36 M12 35 L12 36.5 M12.5 35 L13.5 36" stroke="#8B9B6B" strokeWidth="0.6" strokeLinecap="round" />

      {/* Tail */}
      <path d="M8 22 Q5 20 4 18" stroke="url(#gramps-skin)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="3.8" cy="17.8" r="0.6" fill="#8B9B6B" />

      {/* ---- TEMPER OVERLAYS ---- */}
      {temper === "brutal" && (
        <>
          <path d="M32.5 17.5 Q31 14 30 12" stroke="#CC2200" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M35.5 17.5 Q37 14 38 12" stroke="#CC2200" strokeWidth="2" strokeLinecap="round" fill="none" />
        </>
      )}
      {temper === "gentle" && (
        <ellipse cx="34" cy="14" rx="5" ry="1.5" fill="none" stroke="#FFD700" strokeWidth="1.2" opacity="0.7" />
      )}
    </svg>
  );
}
