export default function Kai({ mood = "neutral", temper }) {
  // Mouth shapes by mood
  const mouth = {
    happy: "M16 20.5 Q18 23 20 23 Q22 23 24 20.5",
    neutral: "M17.5 20.5 Q20 22 22.5 20.5",
    grumpy: "M17 21.5 Q20 20 23 21.5",
  }[mood];

  // Eye adjustments by mood
  const eyeScale = mood === "happy" ? 1.1 : mood === "grumpy" ? 0.85 : 1;
  const highlightR = mood === "happy" ? 1.1 : 0.7;
  const highlight2R = mood === "happy" ? 0.5 : 0;
  const eyeSquish = mood === "grumpy" ? 0.82 : 1; // vertical squish for grumpy
  const lidOpacity = mood === "grumpy" ? 0.55 : 0;

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Main mantle gradient - rich purple */}
        <radialGradient id="kai-mantle" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="50%" stopColor="#7B68EE" />
          <stop offset="100%" stopColor="#5B3FD4" />
        </radialGradient>
        {/* Highlight sheen on top of head */}
        <radialGradient id="kai-sheen" cx="40%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
        </radialGradient>
        {/* Tentacle gradient */}
        <linearGradient id="kai-tent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B68EE" />
          <stop offset="100%" stopColor="#5B3FD4" />
        </linearGradient>
        <linearGradient id="kai-tent-alt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9B8AFE" />
          <stop offset="100%" stopColor="#7B68EE" />
        </linearGradient>
        {/* Eye iris gradient */}
        <radialGradient id="kai-iris" cx="55%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#2A2A4E" />
          <stop offset="100%" stopColor="#0D0D1A" />
        </radialGradient>
        {/* Suction cup gradient */}
        <radialGradient id="kai-cup" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#7B5FCE" />
          <stop offset="100%" stopColor="#4A2FAA" />
        </radialGradient>
      </defs>

      {/* Tentacles - curling at tips */}
      <path
        d="M11 23 Q7 27 5.5 31 Q4.5 33.5 6 34 Q7.5 34.5 8 32"
        fill="none" stroke="url(#kai-tent)" strokeWidth="2.4" strokeLinecap="round"
      />
      <path
        d="M14.5 24 Q11 29 9 34 Q8 36.5 10 36.5 Q12 36.5 12.5 34"
        fill="none" stroke="url(#kai-tent-alt)" strokeWidth="2.1" strokeLinecap="round"
      />
      <path
        d="M17.5 25 Q16.5 30.5 15 35 Q14 37.5 16 37.5 Q18 37.5 18 35"
        fill="none" stroke="url(#kai-tent)" strokeWidth="2" strokeLinecap="round"
      />
      <path
        d="M22.5 25 Q23.5 30.5 25 35 Q26 37.5 24 37.5 Q22 37.5 22 35"
        fill="none" stroke="url(#kai-tent-alt)" strokeWidth="2" strokeLinecap="round"
      />
      <path
        d="M25.5 24 Q29 29 31 34 Q32 36.5 30 36.5 Q28 36.5 27.5 34"
        fill="none" stroke="url(#kai-tent)" strokeWidth="2.1" strokeLinecap="round"
      />
      <path
        d="M29 23 Q33 27 34.5 31 Q35.5 33.5 34 34 Q32.5 34.5 32 32"
        fill="none" stroke="url(#kai-tent-alt)" strokeWidth="2.4" strokeLinecap="round"
      />

      {/* Suction cups on tentacle curls */}
      <circle cx="7.5" cy="33" r="0.9" fill="url(#kai-cup)" opacity="0.6" />
      <circle cx="11.5" cy="35.5" r="0.8" fill="url(#kai-cup)" opacity="0.5" />
      <circle cx="17" cy="36.5" r="0.8" fill="url(#kai-cup)" opacity="0.5" />
      <circle cx="23" cy="36.5" r="0.8" fill="url(#kai-cup)" opacity="0.5" />
      <circle cx="28.5" cy="35.5" r="0.8" fill="url(#kai-cup)" opacity="0.5" />
      <circle cx="32.5" cy="33" r="0.9" fill="url(#kai-cup)" opacity="0.6" />

      {/* Head / mantle */}
      <ellipse cx="20" cy="14" rx="11" ry="12" fill="url(#kai-mantle)" />
      {/* Sheen overlay */}
      <ellipse cx="20" cy="14" rx="11" ry="12" fill="url(#kai-sheen)" />

      {/* Texture spots on head */}
      <circle cx="14" cy="8" r="1.3" fill="#5B48CE" opacity="0.35" />
      <circle cx="24" cy="10" r="1.1" fill="#5B48CE" opacity="0.3" />
      <circle cx="18" cy="13" r="0.9" fill="#5B48CE" opacity="0.3" />
      <circle cx="26" cy="7" r="0.7" fill="#5B48CE" opacity="0.25" />
      <circle cx="11" cy="13" r="0.6" fill="#5B48CE" opacity="0.2" />

      {/* Eyes - large octopus eyes */}
      {/* Left eye */}
      <ellipse
        cx="14.5" cy="16"
        rx={3.2 * eyeScale} ry={3.8 * eyeScale * eyeSquish}
        fill="#FFFFFF" stroke="#4A3CB8" strokeWidth="0.4"
      />
      <ellipse
        cx="14.8" cy="16"
        rx={2.2 * eyeScale} ry={2.8 * eyeScale * eyeSquish}
        fill="url(#kai-iris)"
      />
      {/* Main highlight */}
      <circle cx="15.5" cy="14.8" r={highlightR} fill="#FFF" opacity="0.95" />
      {/* Secondary sparkle (happy only) */}
      {highlight2R > 0 && (
        <circle cx="13.8" cy="16.8" r={highlight2R} fill="#FFF" opacity="0.7" />
      )}
      {/* Grumpy droopy lid */}
      {lidOpacity > 0 && (
        <ellipse cx="14.5" cy="14" rx="3.5" ry="2" fill="#5B3FD4" opacity={lidOpacity} />
      )}

      {/* Right eye */}
      <ellipse
        cx="25.5" cy="16"
        rx={3.2 * eyeScale} ry={3.8 * eyeScale * eyeSquish}
        fill="#FFFFFF" stroke="#4A3CB8" strokeWidth="0.4"
      />
      <ellipse
        cx="25.2" cy="16"
        rx={2.2 * eyeScale} ry={2.8 * eyeScale * eyeSquish}
        fill="url(#kai-iris)"
      />
      {/* Main highlight */}
      <circle cx="25.9" cy="14.8" r={highlightR} fill="#FFF" opacity="0.95" />
      {/* Secondary sparkle (happy only) */}
      {highlight2R > 0 && (
        <circle cx="24.2" cy="16.8" r={highlight2R} fill="#FFF" opacity="0.7" />
      )}
      {/* Grumpy droopy lid */}
      {lidOpacity > 0 && (
        <ellipse cx="25.5" cy="14" rx="3.5" ry="2" fill="#5B3FD4" opacity={lidOpacity} />
      )}

      {/* Mouth */}
      <path
        d={mouth}
        fill="none" stroke="#4A2FAA" strokeWidth="0.9" strokeLinecap="round"
      />

      {/* Subtle bottom edge shadow on mantle */}
      <ellipse cx="20" cy="24" rx="9" ry="1.5" fill="#4A2FAA" opacity="0.15" />

      {/* ---- TEMPER OVERLAYS ---- */}
      {temper === "brutal" && (
        <>
          <path d="M15 4 Q13 0 11 -2" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M25 4 Q27 0 29 -2" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {temper === "gentle" && (
        <ellipse cx="20" cy="0" rx="8" ry="2.5" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
      )}
    </svg>
  );
}
