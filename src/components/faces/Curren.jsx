export default function Curren({ mood = "neutral" }) {
  // Mouth paths by mood
  const mouth =
    mood === "happy"
      ? "M15 28 Q20 33 25 28"    // wide grin
      : mood === "grumpy"
      ? "M16 30 Q20 27 24 30"    // frown
      : "M16.5 28.5 Q20 31 23.5 28.5"; // slight smile

  // Eye shape adjustments
  const eyeRyL = mood === "grumpy" ? 2.2 : 2.8;
  const eyeRyR = mood === "grumpy" ? 2.2 : 2.8;
  const eyeYOffset = mood === "grumpy" ? 0.5 : 0;

  // Highlight size (sparkle)
  const hlR = mood === "happy" ? 1.1 : 0.8;
  const hlR2 = mood === "happy" ? 0.5 : 0;

  // Eyebrow positions
  const browL =
    mood === "happy"
      ? "M12 14.5 Q15 13 18 14.5"
      : mood === "grumpy"
      ? "M12.5 14 Q15 15.5 17.5 15"
      : "M12.5 14.5 Q15 13.8 17.5 14.8";
  const browR =
    mood === "happy"
      ? "M22 14.5 Q25 13 28 14.5"
      : mood === "grumpy"
      ? "M22.5 15 Q25 15.5 27.5 14"
      : "M22.5 14.8 Q25 13.8 27.5 14.5";

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Outer mane gradient - deep amber to golden */}
        <radialGradient id="cur-mane-outer" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#E8A030" />
          <stop offset="70%" stopColor="#C47820" />
          <stop offset="100%" stopColor="#9A5C14" />
        </radialGradient>
        {/* Inner mane gradient - brighter gold */}
        <radialGradient id="cur-mane-inner" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#F0B840" />
          <stop offset="100%" stopColor="#D4882A" />
        </radialGradient>
        {/* Face gradient - warm creamy gold */}
        <radialGradient id="cur-face" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FAD88C" />
          <stop offset="60%" stopColor="#F4C878" />
          <stop offset="100%" stopColor="#E0AC58" />
        </radialGradient>
        {/* Nose gradient */}
        <radialGradient id="cur-nose" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6B4A3A" />
          <stop offset="100%" stopColor="#3A2010" />
        </radialGradient>
        {/* Eye gradient */}
        <radialGradient id="cur-eye" cx="55%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#B87820" />
          <stop offset="100%" stopColor="#6B3E10" />
        </radialGradient>
        {/* Mane tuft shading */}
        <linearGradient id="cur-tuft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4962A" />
          <stop offset="100%" stopColor="#A06818" />
        </linearGradient>
      </defs>

      {/* ---- MANE ---- */}
      {/* Outer mane circle */}
      <circle cx="20" cy="20" r="19" fill="url(#cur-mane-outer)" />
      {/* Inner mane layer for volume */}
      <circle cx="20" cy="20" r="16.5" fill="url(#cur-mane-inner)" />

      {/* Flowing mane tufts around the perimeter */}
      {/* Top tufts */}
      <path d="M12 4 Q14 0 17 2 Q15 5 13 8Z" fill="url(#cur-tuft)" />
      <path d="M20 2 Q22 -1 24 2 Q22 4 20 7Z" fill="url(#cur-tuft)" />
      <path d="M28 4 Q26 0 23 2 Q25 5 27 8Z" fill="url(#cur-tuft)" />
      {/* Upper-left tufts */}
      <path d="M5 9 Q1 6 4 3 Q6 7 10 9Z" fill="url(#cur-tuft)" />
      <path d="M8 5 Q10 1 13 3 Q11 6 9 9Z" fill="url(#cur-tuft)" />
      {/* Upper-right tufts */}
      <path d="M35 9 Q39 6 36 3 Q34 7 30 9Z" fill="url(#cur-tuft)" />
      <path d="M32 5 Q30 1 27 3 Q29 6 31 9Z" fill="url(#cur-tuft)" />
      {/* Side tufts */}
      <path d="M2 15 Q-1 12 1 9 Q3 13 7 14Z" fill="url(#cur-tuft)" />
      <path d="M38 15 Q41 12 39 9 Q37 13 33 14Z" fill="url(#cur-tuft)" />
      <path d="M1 21 Q-2 18 1 15 Q3 19 6 19Z" fill="url(#cur-tuft)" />
      <path d="M39 21 Q42 18 39 15 Q37 19 34 19Z" fill="url(#cur-tuft)" />
      {/* Lower side tufts */}
      <path d="M3 27 Q0 24 2 21 Q4 25 7 25Z" fill="#B06A18" />
      <path d="M37 27 Q40 24 38 21 Q36 25 33 25Z" fill="#B06A18" />
      {/* Bottom tufts */}
      <path d="M8 34 Q5 32 6 29 Q8 32 11 32Z" fill="#B06A18" />
      <path d="M32 34 Q35 32 34 29 Q32 32 29 32Z" fill="#B06A18" />

      {/* Subtle fur texture lines on mane */}
      <path d="M10 10 Q12 8 11 12" fill="none" stroke="#C47820" strokeWidth="0.4" opacity="0.5" />
      <path d="M30 10 Q28 8 29 12" fill="none" stroke="#C47820" strokeWidth="0.4" opacity="0.5" />
      <path d="M5 20 Q7 18 6 22" fill="none" stroke="#C47820" strokeWidth="0.4" opacity="0.5" />
      <path d="M35 20 Q33 18 34 22" fill="none" stroke="#C47820" strokeWidth="0.4" opacity="0.5" />

      {/* ---- FACE ---- */}
      <ellipse cx="20" cy="22" rx="11" ry="10.5" fill="url(#cur-face)" />
      {/* Cheek shading */}
      <ellipse cx="13" cy="25" rx="3" ry="2" fill="#E8B460" opacity="0.3" />
      <ellipse cx="27" cy="25" rx="3" ry="2" fill="#E8B460" opacity="0.3" />

      {/* ---- EARS (peeking through mane) ---- */}
      <ellipse cx="10" cy="12" rx="3" ry="3.5" fill="#D4882A" />
      <ellipse cx="10" cy="12.5" rx="1.8" ry="2.2" fill="#E8A860" opacity="0.6" />
      <ellipse cx="30" cy="12" rx="3" ry="3.5" fill="#D4882A" />
      <ellipse cx="30" cy="12.5" rx="1.8" ry="2.2" fill="#E8A860" opacity="0.6" />

      {/* ---- EYEBROWS ---- */}
      <path d={browL} fill="none" stroke="#9A5C14" strokeWidth="1" strokeLinecap="round" />
      <path d={browR} fill="none" stroke="#9A5C14" strokeWidth="1" strokeLinecap="round" />

      {/* ---- EYES ---- */}
      {/* Left eye */}
      <ellipse cx="15" cy={19 + eyeYOffset} rx="2.5" ry={eyeRyL} fill="url(#cur-eye)" />
      <ellipse cx="15" cy={19 + eyeYOffset} rx="1.5" ry={eyeRyL * 0.6} fill="#2A1808" />
      <circle cx="15.7" cy={18.2 + eyeYOffset} r={hlR} fill="#FFF" opacity="0.9" />
      {hlR2 > 0 && (
        <circle cx="14" cy={19.5 + eyeYOffset} r={hlR2} fill="#FFF" opacity="0.5" />
      )}
      {/* Right eye */}
      <ellipse cx="25" cy={19 + eyeYOffset} rx="2.5" ry={eyeRyR} fill="url(#cur-eye)" />
      <ellipse cx="25" cy={19 + eyeYOffset} rx="1.5" ry={eyeRyR * 0.6} fill="#2A1808" />
      <circle cx="25.7" cy={18.2 + eyeYOffset} r={hlR} fill="#FFF" opacity="0.9" />
      {hlR2 > 0 && (
        <circle cx="24" cy={19.5 + eyeYOffset} r={hlR2} fill="#FFF" opacity="0.5" />
      )}
      {/* Grumpy droopy eyelids */}
      {mood === "grumpy" && (
        <>
          <path d="M12 17.5 Q15 16.5 18 18" fill="url(#cur-face)" stroke="none" />
          <path d="M22 18 Q25 16.5 28 17.5" fill="url(#cur-face)" stroke="none" />
        </>
      )}

      {/* ---- NOSE ---- */}
      <ellipse cx="20" cy="24" rx="3" ry="2" fill="url(#cur-nose)" />
      {/* Nose highlight */}
      <ellipse cx="19.5" cy="23.3" rx="1.3" ry="0.5" fill="#8B6A4A" opacity="0.5" />

      {/* ---- MOUTH ---- */}
      <path d="M20 26 L20 27.5" stroke="#4A3020" strokeWidth="0.8" strokeLinecap="round" />
      <path d={mouth} fill="none" stroke="#4A3020" strokeWidth="0.9" strokeLinecap="round" />

      {/* ---- WHISKER DOTS ---- */}
      <circle cx="13.5" cy="26" r="0.7" fill="#D4AA3A" opacity="0.7" />
      <circle cx="11.5" cy="25" r="0.6" fill="#D4AA3A" opacity="0.6" />
      <circle cx="10" cy="26.5" r="0.5" fill="#D4AA3A" opacity="0.5" />
      <circle cx="26.5" cy="26" r="0.7" fill="#D4AA3A" opacity="0.7" />
      <circle cx="28.5" cy="25" r="0.6" fill="#D4AA3A" opacity="0.6" />
      <circle cx="30" cy="26.5" r="0.5" fill="#D4AA3A" opacity="0.5" />

      {/* ---- CHIN FUR ---- */}
      <ellipse cx="20" cy="32" rx="6" ry="2.5" fill="#F0C470" opacity="0.4" />
    </svg>
  );
}
