export default function Harper({ mood = "neutral" }) {
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
        {/* Spot color */}
        <radialGradient id="har-spot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A03878" />
          <stop offset="100%" stopColor="#8A2868" />
        </radialGradient>
        {/* Tear line gradient */}
        <linearGradient id="har-tear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A1830" />
          <stop offset="100%" stopColor="#6A2848" />
        </linearGradient>
        {/* Ear inner gradient */}
        <radialGradient id="har-ear-in" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5A0D0" />
          <stop offset="100%" stopColor="#D46AA0" />
        </radialGradient>
      </defs>

      {/* ---- HEAD ---- */}
      <ellipse cx="20" cy="21" rx="17" ry="17.5" fill="url(#har-head)" />

      {/* Subtle fur texture - short strokes around the head */}
      <path d="M7 12 Q8 10.5 7.5 13" fill="none" stroke="#D05898" strokeWidth="0.4" opacity="0.4" />
      <path d="M33 12 Q32 10.5 32.5 13" fill="none" stroke="#D05898" strokeWidth="0.4" opacity="0.4" />
      <path d="M5 22 Q6 20.5 5.5 23" fill="none" stroke="#D05898" strokeWidth="0.4" opacity="0.4" />
      <path d="M35 22 Q34 20.5 34.5 23" fill="none" stroke="#D05898" strokeWidth="0.4" opacity="0.4" />

      {/* ---- SPOTS (scattered across head) ---- */}
      <circle cx="8" cy="15" r="1.3" fill="url(#har-spot)" opacity="0.5" />
      <circle cx="12" cy="10" r="1.1" fill="url(#har-spot)" opacity="0.45" />
      <circle cx="17" cy="8" r="0.9" fill="url(#har-spot)" opacity="0.4" />
      <circle cx="23" cy="7.5" r="1" fill="url(#har-spot)" opacity="0.4" />
      <circle cx="28" cy="10" r="1.1" fill="url(#har-spot)" opacity="0.45" />
      <circle cx="32" cy="15" r="1.3" fill="url(#har-spot)" opacity="0.5" />
      <circle cx="7" cy="24" r="1" fill="url(#har-spot)" opacity="0.35" />
      <circle cx="33" cy="24" r="1" fill="url(#har-spot)" opacity="0.35" />
      <circle cx="10" cy="30" r="0.8" fill="url(#har-spot)" opacity="0.3" />
      <circle cx="30" cy="30" r="0.8" fill="url(#har-spot)" opacity="0.3" />
      <circle cx="15" cy="6" r="0.7" fill="url(#har-spot)" opacity="0.35" />
      <circle cx="25" cy="6" r="0.7" fill="url(#har-spot)" opacity="0.35" />

      {/* ---- EARS ---- */}
      {/* Left ear */}
      <ellipse cx="8" cy="8" rx="4.5" ry="5.5" fill="url(#har-head)" />
      <ellipse cx="8" cy="8.5" rx="2.8" ry="3.5" fill="url(#har-ear-in)" />
      {/* Right ear */}
      <ellipse cx="32" cy="8" rx="4.5" ry="5.5" fill="url(#har-head)" />
      <ellipse cx="32" cy="8.5" rx="2.8" ry="3.5" fill="url(#har-ear-in)" />

      {/* ---- MUZZLE AREA (lighter face) ---- */}
      <ellipse cx="20" cy="24" rx="10" ry="9" fill="url(#har-muzzle)" />

      {/* Forehead shading */}
      <ellipse cx="20" cy="14" rx="8" ry="4" fill="#F08ED0" opacity="0.3" />

      {/* ---- BROW MARKINGS ---- */}
      <path d={browAngleL} fill="none" stroke="#A03878" strokeWidth="0.9" strokeLinecap="round" />
      <path d={browAngleR} fill="none" stroke="#A03878" strokeWidth="0.9" strokeLinecap="round" />

      {/* ---- EYES ---- */}
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

      {/* ---- TEAR LINES (cheetah signature) ---- */}
      {/* Left tear line */}
      <path
        d="M12.5 20 Q11 24 10.5 28"
        fill="none"
        stroke="url(#har-tear)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Right tear line */}
      <path
        d="M27.5 20 Q29 24 29.5 28"
        fill="none"
        stroke="url(#har-tear)"
        strokeWidth="1"
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

      {/* ---- WHISKERS ---- */}
      {/* Left whiskers */}
      <line x1="12" y1="23" x2="4" y2="21.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.6" />
      <line x1="12" y1="24.5" x2="3.5" y2="24.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.6" />
      <line x1="12" y1="26" x2="4" y2="27.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.5" />
      {/* Right whiskers */}
      <line x1="28" y1="23" x2="36" y2="21.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.6" />
      <line x1="28" y1="24.5" x2="36.5" y2="24.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.6" />
      <line x1="28" y1="26" x2="36" y2="27.5" stroke="#D8A0C0" strokeWidth="0.4" opacity="0.5" />

      {/* ---- CHEEK SHADING ---- */}
      <ellipse cx="10" cy="25" rx="2.5" ry="2" fill="#E880C0" opacity="0.2" />
      <ellipse cx="30" cy="25" rx="2.5" ry="2" fill="#E880C0" opacity="0.2" />

      {/* ---- CHIN ---- */}
      <ellipse cx="20" cy="32" rx="5" ry="2" fill="#FCD6EC" opacity="0.3" />
    </svg>
  );
}
