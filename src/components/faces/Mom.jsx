export default function Mom({ mood = "neutral", temper }) {
  // Mouth shapes by mood
  const mouth = {
    happy: "M14 28.5 Q17 32 20 32 Q23 32 26 28.5",
    neutral: "M15.5 28.5 Q17.5 30.5 20 30.5 Q22.5 30.5 24.5 28.5",
    grumpy: "M16 29.5 Q20 28 24 29.5",
  }[mood];

  // Eye expression by mood
  const eyeRy = mood === "grumpy" ? 2.2 : 2.8;
  const browY = mood === "happy" ? 15.5 : mood === "grumpy" ? 17.5 : 16.5;
  const browCurve = mood === "grumpy" ? 0.8 : -1.5; // positive = flat/angry, negative = arched
  const highlightR = mood === "happy" ? 1.1 : 0.8;
  const highlight2 = mood === "happy";
  const cheekOpacity = mood === "happy" ? 0.4 : mood === "grumpy" ? 0.15 : 0.3;

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Main fur gradient - warm brown */}
        <radialGradient id="mom-fur" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#A07850" />
          <stop offset="60%" stopColor="#8B6A4A" />
          <stop offset="100%" stopColor="#6B4A2A" />
        </radialGradient>
        {/* Ear inner gradient */}
        <radialGradient id="mom-ear" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4A48A" />
          <stop offset="100%" stopColor="#C4917A" />
        </radialGradient>
        {/* Muzzle gradient - lighter warm tone */}
        <radialGradient id="mom-muzzle" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#D4B88A" />
          <stop offset="100%" stopColor="#C4A87A" />
        </radialGradient>
        {/* Head sheen */}
        <radialGradient id="mom-sheen" cx="40%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#C4A07A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C4A07A" stopOpacity="0" />
        </radialGradient>
        {/* Cheek blush */}
        <radialGradient id="mom-blush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8888A" stopOpacity="1" />
          <stop offset="70%" stopColor="#E8A0A0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E8A0A0" stopOpacity="0" />
        </radialGradient>
        {/* Nose gradient */}
        <radialGradient id="mom-nose" cx="45%" cy="35%" r="50%">
          <stop offset="0%" stopColor="#5A3828" />
          <stop offset="100%" stopColor="#3A2018" />
        </radialGradient>
        {/* Fuzzy fur texture overlay */}
        <radialGradient id="mom-fuzz" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9B7A5A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6B4A2A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ears - behind head */}
      {/* Left ear */}
      <ellipse cx="9" cy="10" rx="5.5" ry="5" fill="url(#mom-fur)" />
      <ellipse cx="9" cy="10" rx="3.2" ry="2.8" fill="url(#mom-ear)" />
      {/* Right ear */}
      <ellipse cx="31" cy="10" rx="5.5" ry="5" fill="url(#mom-fur)" />
      <ellipse cx="31" cy="10" rx="3.2" ry="2.8" fill="url(#mom-ear)" />

      {/* Head */}
      <circle cx="20" cy="22" r="15" fill="url(#mom-fur)" />
      {/* Sheen overlay */}
      <circle cx="20" cy="22" r="15" fill="url(#mom-sheen)" />

      {/* Subtle fur texture marks */}
      <line x1="10" y1="15" x2="11" y2="14" stroke="#6B4A2A" strokeWidth="0.3" opacity="0.3" />
      <line x1="29" y1="15" x2="30" y2="14" stroke="#6B4A2A" strokeWidth="0.3" opacity="0.3" />
      <line x1="8" y1="22" x2="7" y2="21" stroke="#6B4A2A" strokeWidth="0.3" opacity="0.25" />
      <line x1="32" y1="22" x2="33" y2="21" stroke="#6B4A2A" strokeWidth="0.3" opacity="0.25" />
      <line x1="14" y1="12" x2="15" y2="11.5" stroke="#A07850" strokeWidth="0.3" opacity="0.2" />
      <line x1="25" y1="12" x2="26" y2="11.5" stroke="#A07850" strokeWidth="0.3" opacity="0.2" />

      {/* Muzzle */}
      <ellipse cx="20" cy="26.5" rx="8.5" ry="6.5" fill="url(#mom-muzzle)" />

      {/* Eyebrows */}
      <path
        d={`M11 ${browY} Q14 ${browY + browCurve} 17 ${browY}`}
        fill="none" stroke="#6B4A2A" strokeWidth="0.8" strokeLinecap="round"
      />
      <path
        d={`M23 ${browY} Q26 ${browY + browCurve} 29 ${browY}`}
        fill="none" stroke="#6B4A2A" strokeWidth="0.8" strokeLinecap="round"
      />

      {/* Eyes */}
      {/* Left eye */}
      <ellipse cx="14" cy="20" rx="2.5" ry={eyeRy} fill="#3B2010" />
      <circle cx="14.8" cy="19" r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2 && (
        <circle cx="13.2" cy="20.8" r="0.4" fill="#FFF" opacity="0.6" />
      )}
      {/* Right eye */}
      <ellipse cx="26" cy="20" rx="2.5" ry={eyeRy} fill="#3B2010" />
      <circle cx="26.8" cy="19" r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2 && (
        <circle cx="25.2" cy="20.8" r="0.4" fill="#FFF" opacity="0.6" />
      )}

      {/* Grumpy half-lids */}
      {mood === "grumpy" && (
        <>
          <ellipse cx="14" cy="18.5" rx="3" ry="1.5" fill="#8B6A4A" opacity="0.5" />
          <ellipse cx="26" cy="18.5" rx="3" ry="1.5" fill="#8B6A4A" opacity="0.5" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="20" cy="24.2" rx="2.6" ry="1.9" fill="url(#mom-nose)" />
      {/* Nose shine */}
      <ellipse cx="19.5" cy="23.6" rx="1.2" ry="0.5" fill="#6B4A3A" opacity="0.45" />

      {/* Mouth */}
      <path
        d={mouth}
        fill="none" stroke="#5A3828" strokeWidth="1" strokeLinecap="round"
      />

      {/* Rosy cheeks */}
      <circle cx="9" cy="25" r="3.5" fill="url(#mom-blush)" opacity={cheekOpacity} />
      <circle cx="31" cy="25" r="3.5" fill="url(#mom-blush)" opacity={cheekOpacity} />

      {/* Chin shadow */}
      <ellipse cx="20" cy="33" rx="7" ry="1.5" fill="#6B4A2A" opacity="0.12" />

      {/* ---- TEMPER OVERLAYS ---- */}
      {temper === "brutal" && (
        <>
          <path d="M15 7 Q13 2 11 0" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M25 7 Q27 2 29 0" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {temper === "gentle" && (
        <ellipse cx="20" cy="3" rx="8" ry="2.5" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
      )}
    </svg>
  );
}
