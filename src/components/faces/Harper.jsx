export default function Harper({ mood = "neutral", temper }) {
  // Mouth paths by mood
  const mouth =
    mood === "happy"
      ? "M16 28 Q20 32 24 28"     // wide grin
      : mood === "grumpy"
      ? "M17 29.5 Q20 27 23 29.5" // frown
      : "M17 28.5 Q20 30.5 23 28.5"; // slight smile

  // Eye shape adjustments
  const eyeRy = mood === "grumpy" ? 2.4 : 3;
  const eyeYOffset = mood === "grumpy" ? 0.4 : 0;

  // Highlight size
  const hlR = mood === "happy" ? 1.2 : 0.8;
  const hlR2 = mood === "happy" ? 0.5 : 0;

  // Eyebrow-like forehead markings
  const browAngleL =
    mood === "happy"
      ? "M11.5 13 Q14.5 11.5 17.5 13"
      : mood === "grumpy"
      ? "M12 12.5 Q14.5 14 17 13.5"
      : "M12 13 Q14.5 12 17 13.2";
  const browAngleR =
    mood === "happy"
      ? "M22.5 13 Q25.5 11.5 28.5 13"
      : mood === "grumpy"
      ? "M23 13.5 Q25.5 14 28 12.5"
      : "M23 13.2 Q25.5 12 28 13";

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Head gradient - pink tones */}
        <radialGradient id="har-head" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#F08ED0" />
          <stop offset="60%" stopColor="#E26AB5" />
          <stop offset="100%" stopColor="#C4509A" />
        </radialGradient>
        {/* Muzzle / light face area */}
        <radialGradient id="har-muzzle" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FCD6EC" />
          <stop offset="100%" stopColor="#F0B8D8" />
        </radialGradient>
        {/* Nose gradient */}
        <radialGradient id="har-nose" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#9A3068" />
          <stop offset="100%" stopColor="#6A1848" />
        </radialGradient>
        {/* Eye iris gradient - amber/gold for sharp cheetah eyes */}
        <radialGradient id="har-iris" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#E8A830" />
          <stop offset="100%" stopColor="#B87020" />
        </radialGradient>
        {/* Ear inner gradient */}
        <radialGradient id="har-ear-in" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A0D0" />
          <stop offset="100%" stopColor="#D46AA0" />
        </radialGradient>
      </defs>

      {/* ---- HEAD - narrower, more angular cheetah shape ---- */}
      <ellipse cx="20" cy="21" rx="15" ry="16.5" fill="url(#har-head)" />

      {/* ---- EARS - small and round like a cheetah ---- */}
      <circle cx="10" cy="7" r="3.5" fill="url(#har-head)" />
      <circle cx="10" cy="7.5" r="2" fill="url(#har-ear-in)" />
      <circle cx="30" cy="7" r="3.5" fill="url(#har-head)" />
      <circle cx="30" cy="7.5" r="2" fill="url(#har-ear-in)" />
      {/* Dark ear backs - cheetah signature */}
      <path d="M7.5 5 Q10 3.5 12.5 5" fill="#6A1848" opacity="0.5" />
      <path d="M27.5 5 Q30 3.5 32.5 5" fill="#6A1848" opacity="0.5" />

      {/* ---- SPOTS - dense, small, solid cheetah spots ---- */}
      <circle cx="8" cy="14" r="1" fill="#8A2868" opacity="0.55" />
      <circle cx="10" cy="11" r="0.8" fill="#8A2868" opacity="0.5" />
      <circle cx="13" cy="9" r="0.7" fill="#8A2868" opacity="0.45" />
      <circle cx="17" cy="7" r="0.6" fill="#8A2868" opacity="0.4" />
      <circle cx="20" cy="5.5" r="0.5" fill="#8A2868" opacity="0.35" />
      <circle cx="23" cy="7" r="0.6" fill="#8A2868" opacity="0.4" />
      <circle cx="27" cy="9" r="0.7" fill="#8A2868" opacity="0.45" />
      <circle cx="30" cy="11" r="0.8" fill="#8A2868" opacity="0.5" />
      <circle cx="32" cy="14" r="1" fill="#8A2868" opacity="0.55" />
      <circle cx="7" cy="20" r="0.9" fill="#8A2868" opacity="0.4" />
      <circle cx="33" cy="20" r="0.9" fill="#8A2868" opacity="0.4" />
      <circle cx="9" cy="17" r="0.7" fill="#8A2868" opacity="0.45" />
      <circle cx="31" cy="17" r="0.7" fill="#8A2868" opacity="0.45" />
      <circle cx="7" cy="26" r="0.7" fill="#8A2868" opacity="0.35" />
      <circle cx="33" cy="26" r="0.7" fill="#8A2868" opacity="0.35" />
      <circle cx="11" cy="30" r="0.6" fill="#8A2868" opacity="0.3" />
      <circle cx="29" cy="30" r="0.6" fill="#8A2868" opacity="0.3" />
      <circle cx="15" cy="6" r="0.5" fill="#8A2868" opacity="0.35" />
      <circle cx="25" cy="6" r="0.5" fill="#8A2868" opacity="0.35" />
      <circle cx="6" cy="23" r="0.6" fill="#8A2868" opacity="0.3" />
      <circle cx="34" cy="23" r="0.6" fill="#8A2868" opacity="0.3" />

      {/* ---- MUZZLE AREA ---- */}
      <ellipse cx="20" cy="24" rx="9" ry="8.5" fill="url(#har-muzzle)" />

      {/* Forehead shading */}
      <ellipse cx="20" cy="14" rx="7" ry="3.5" fill="#F08ED0" opacity="0.3" />

      {/* ---- BROW MARKINGS ---- */}
      <path d={browAngleL} fill="none" stroke="#A03878" strokeWidth="0.9" strokeLinecap="round" />
      <path d={browAngleR} fill="none" stroke="#A03878" strokeWidth="0.9" strokeLinecap="round" />

      {/* ---- EYES - angular amber cheetah eyes ---- */}
      {/* Left eye */}
      <ellipse cx="14.5" cy={17 + eyeYOffset} rx="2.8" ry={eyeRy} fill="#FFFFFF" />
      <ellipse cx="14.8" cy={17 + eyeYOffset} rx="1.8" ry={eyeRy * 0.7} fill="url(#har-iris)" />
      <ellipse cx="15" cy={17 + eyeYOffset} rx="0.9" ry={eyeRy * 0.45} fill="#1A1008" />
      <circle cx="15.5" cy={16 + eyeYOffset} r={hlR} fill="#FFF" opacity="0.9" />
      {hlR2 > 0 && (
        <circle cx="13.8" cy={17.8 + eyeYOffset} r={hlR2} fill="#FFF" opacity="0.5" />
      )}
      {/* Right eye */}
      <ellipse cx="25.5" cy={17 + eyeYOffset} rx="2.8" ry={eyeRy} fill="#FFFFFF" />
      <ellipse cx="25.2" cy={17 + eyeYOffset} rx="1.8" ry={eyeRy * 0.7} fill="url(#har-iris)" />
      <ellipse cx="25" cy={17 + eyeYOffset} rx="0.9" ry={eyeRy * 0.45} fill="#1A1008" />
      <circle cx="25.8" cy={16 + eyeYOffset} r={hlR} fill="#FFF" opacity="0.9" />
      {hlR2 > 0 && (
        <circle cx="24.5" cy={17.8 + eyeYOffset} r={hlR2} fill="#FFF" opacity="0.5" />
      )}
      {/* Grumpy droopy eyelids */}
      {mood === "grumpy" && (
        <>
          <path d="M11.2 15.5 Q14.5 14.5 17.8 16" fill="url(#har-muzzle)" stroke="none" />
          <path d="M22.2 16 Q25.5 14.5 28.8 15.5" fill="url(#har-muzzle)" stroke="none" />
        </>
      )}

      {/* ---- TEAR MARKS - thick, prominent cheetah signature ---- */}
      {/* Left tear mark - bold dark line from inner eye down to jaw */}
      <path
        d="M12.5 19 Q11.5 22 10.5 26 Q10 28.5 10 31"
        fill="none"
        stroke="#3A0820"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right tear mark */}
      <path
        d="M27.5 19 Q28.5 22 29.5 26 Q30 28.5 30 31"
        fill="none"
        stroke="#3A0820"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* ---- NOSE ---- */}
      <ellipse cx="20" cy="23" rx="2.5" ry="1.8" fill="url(#har-nose)" />
      {/* Nose highlight */}
      <ellipse cx="19.5" cy="22.4" rx="1" ry="0.4" fill="#B84888" opacity="0.5" />

      {/* ---- NOSE TO MOUTH LINE ---- */}
      <path d="M20 24.8 L20 26.5" stroke="#6A2848" strokeWidth="0.7" strokeLinecap="round" />

      {/* ---- MOUTH ---- */}
      <path d={mouth} fill="none" stroke="#6A2848" strokeWidth="0.8" strokeLinecap="round" />

      {/* ---- WHISKERS - subtle ---- */}
      <line x1="12" y1="23" x2="5" y2="21.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.5" />
      <line x1="12" y1="24.5" x2="4.5" y2="24.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.5" />
      <line x1="12" y1="26" x2="5" y2="27.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.4" />
      <line x1="28" y1="23" x2="35" y2="21.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.5" />
      <line x1="28" y1="24.5" x2="35.5" y2="24.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.5" />
      <line x1="28" y1="26" x2="35" y2="27.5" stroke="#D8A0C0" strokeWidth="0.3" opacity="0.4" />

      {/* ---- CHEEK SHADING ---- */}
      <ellipse cx="10" cy="25" rx="2.5" ry="2" fill="#E880C0" opacity="0.2" />
      <ellipse cx="30" cy="25" rx="2.5" ry="2" fill="#E880C0" opacity="0.2" />

      {/* ---- CHIN ---- */}
      <ellipse cx="20" cy="33" rx="5" ry="2" fill="#FCD6EC" opacity="0.3" />

      {/* ---- TEMPER OVERLAYS ---- */}
      {temper === "brutal" && (
        <>
          <path d="M14 5 Q12 1 10 -1" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M26 5 Q28 1 30 -1" stroke="#CC2200" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      {temper === "gentle" && (
        <ellipse cx="20" cy="1" rx="8" ry="2.5" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.7" />
      )}
    </svg>
  );
}
