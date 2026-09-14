export default function Reef({ mood = "neutral" }) {
  // Mouth by mood
  const mouth = {
    happy: "M15 27 Q20 31 25 27",
    neutral: "M16 27 Q20 29 24 26.5",
    grumpy: "M15 28 Q20 26 25 28",
  }[mood];

  // Eye pupil Y offset and size for mood
  const pupilRx = mood === "grumpy" ? 1.4 : 1.3;
  const pupilRy = mood === "grumpy" ? 1.0 : 1.3;
  const eyeWhiteRy = mood === "grumpy" ? 1.8 : 2.2;
  const eyeYShift = mood === "grumpy" ? 0.4 : 0;

  // Highlight size
  const highlightR = mood === "happy" ? 0.7 : 0.4;
  const highlight2 = mood === "happy";

  // Eye stalk curvature by mood (grumpy = droopier)
  const stalkLeftEnd = mood === "grumpy" ? "L13 11" : "L14 9";
  const stalkRightEnd = mood === "grumpy" ? "L27 11" : "L26 9";
  const eyeY = mood === "grumpy" ? 10 : 8;

  // Raised pincer angle for grumpy vs happy
  const leftPincerAngle = mood === "happy" ? "Q3 14 1 10 Q0 8 2 9 Q4 10 5 12" : "Q4 16 2 12 Q1 10 3 11 Q5 12 6 14";
  const leftClawTip = mood === "happy" ? "M1 10 Q-1 8 1 6" : "M2 12 Q0 10 2 8";

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Shell gradient - rich red with depth */}
        <radialGradient id="reef-shell" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F25C4E" />
          <stop offset="50%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#B83226" />
        </radialGradient>
        {/* Shell highlight */}
        <radialGradient id="reef-highlight" cx="40%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#FF7B6B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#E74C3C" stopOpacity="0" />
        </radialGradient>
        {/* Pincer gradient */}
        <linearGradient id="reef-pincer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F05A4A" />
          <stop offset="100%" stopColor="#C0392B" />
        </linearGradient>
        {/* Eye stalk gradient */}
        <linearGradient id="reef-stalk" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#E74C3C" />
          <stop offset="100%" stopColor="#D4443A" />
        </linearGradient>
        {/* Underbelly */}
        <radialGradient id="reef-belly" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#F0A090" />
          <stop offset="100%" stopColor="#D4948A" />
        </radialGradient>
      </defs>

      {/* Legs - 3 per side for crab authenticity */}
      <path d="M10 27 Q6 30 3 33" stroke="#C0392B" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M12 28 Q8 32 5 35" stroke="#C0392B" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M14 29 Q11 33 8 37" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M30 27 Q34 30 37 33" stroke="#C0392B" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M28 28 Q32 32 35 35" stroke="#C0392B" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M26 29 Q29 33 32 37" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Leg tips */}
      <circle cx="3" cy="33" r="0.5" fill="#A03020" />
      <circle cx="5" cy="35" r="0.5" fill="#A03020" />
      <circle cx="8" cy="37" r="0.5" fill="#A03020" />
      <circle cx="37" cy="33" r="0.5" fill="#A03020" />
      <circle cx="35" cy="35" r="0.5" fill="#A03020" />
      <circle cx="32" cy="37" r="0.5" fill="#A03020" />

      {/* Body / shell - gradient */}
      <ellipse cx="20" cy="24" rx="13" ry="8" fill="url(#reef-shell)" />
      {/* Shell highlight overlay */}
      <ellipse cx="18" cy="21" rx="7" ry="4" fill="url(#reef-highlight)" />

      {/* Shell segment lines - more detailed carapace pattern */}
      <path d="M20 16 L20 24" fill="none" stroke="#B83226" strokeWidth="0.5" opacity="0.35" />
      <path d="M20 16 Q14 18 9 22" fill="none" stroke="#B83226" strokeWidth="0.4" opacity="0.3" />
      <path d="M20 16 Q26 18 31 22" fill="none" stroke="#B83226" strokeWidth="0.4" opacity="0.3" />
      <path d="M10 22 Q15 20.5 20 22" fill="none" stroke="#C0392B" strokeWidth="0.5" opacity="0.5" />
      <path d="M20 22 Q25 20.5 30 22" fill="none" stroke="#C0392B" strokeWidth="0.5" opacity="0.5" />
      <path d="M12 25 Q16 23.5 20 25" fill="none" stroke="#C0392B" strokeWidth="0.4" opacity="0.4" />
      <path d="M20 25 Q24 23.5 28 25" fill="none" stroke="#C0392B" strokeWidth="0.4" opacity="0.4" />

      {/* Shell bumps/texture dots */}
      <circle cx="15" cy="21" r="0.6" fill="#D44030" opacity="0.4" />
      <circle cx="25" cy="21" r="0.6" fill="#D44030" opacity="0.4" />
      <circle cx="20" cy="19" r="0.5" fill="#D44030" opacity="0.35" />
      <circle cx="17" cy="24" r="0.4" fill="#B83226" opacity="0.3" />
      <circle cx="23" cy="24" r="0.4" fill="#B83226" opacity="0.3" />

      {/* Underbelly hint */}
      <ellipse cx="20" cy="29" rx="8" ry="2.5" fill="url(#reef-belly)" opacity="0.4" />

      {/* Eye stalks - gradient, mood-responsive */}
      <path d={`M16 18 ${stalkLeftEnd}`} stroke="url(#reef-stalk)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d={`M24 18 ${stalkRightEnd}`} stroke="url(#reef-stalk)" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Eyes - expressive based on mood */}
      <ellipse cx="14" cy={eyeY} rx="2.4" ry={eyeWhiteRy} fill="#FFFFFF" />
      <ellipse cx="14" cy={eyeY} rx="2.4" ry={eyeWhiteRy} fill="none" stroke="#DDD" strokeWidth="0.3" />
      <ellipse cx={14.2} cy={eyeY - 0.2 + eyeYShift} rx={pupilRx} ry={pupilRy} fill="#1A1A2E" />
      <circle cx={14.6} cy={eyeY - 0.7 + eyeYShift} r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2 && <circle cx="13.4" cy={eyeY + 0.3} r="0.3" fill="#FFF" opacity="0.5" />}

      <ellipse cx="26" cy={eyeY} rx="2.4" ry={eyeWhiteRy} fill="#FFFFFF" />
      <ellipse cx="26" cy={eyeY} rx="2.4" ry={eyeWhiteRy} fill="none" stroke="#DDD" strokeWidth="0.3" />
      <ellipse cx={25.8} cy={eyeY - 0.2 + eyeYShift} rx={pupilRx} ry={pupilRy} fill="#1A1A2E" />
      <circle cx={26.2} cy={eyeY - 0.7 + eyeYShift} r={highlightR} fill="#FFF" opacity="0.9" />
      {highlight2 && <circle cx="25.4" cy={eyeY + 0.3} r="0.3" fill="#FFF" opacity="0.5" />}

      {/* Grumpy eyelids */}
      {mood === "grumpy" && (
        <>
          <path d={`M11.5 ${eyeY - 1.5} Q14 ${eyeY - 0.5} 16.5 ${eyeY - 1.5}`} fill="url(#reef-stalk)" stroke="none" />
          <path d={`M23.5 ${eyeY - 1.5} Q26 ${eyeY - 0.5} 28.5 ${eyeY - 1.5}`} fill="url(#reef-stalk)" stroke="none" />
        </>
      )}

      {/* Left pincer - raised, making a point */}
      <path d={`M8 20 ${leftPincerAngle}`} fill="none" stroke="url(#reef-pincer)" strokeWidth="2.2" strokeLinecap="round" />
      <path d={leftClawTip} fill="none" stroke="url(#reef-pincer)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Left pincer inner detail */}
      <path d="M3 11 L4.5 12.5" stroke="#A03020" strokeWidth="0.5" opacity="0.4" />

      {/* Right pincer - lower, at rest but ready */}
      <path d="M32 21 Q35 18 37 15 Q38 13 36 14 Q34 15 33 17" fill="none" stroke="url(#reef-pincer)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M37 15 Q39 13 37 11" fill="none" stroke="url(#reef-pincer)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right pincer inner detail */}
      <path d="M36 14 L34.5 15.5" stroke="#A03020" strokeWidth="0.5" opacity="0.4" />

      {/* Mouth - mood dependent */}
      <path d={mouth} fill="none" stroke="#8B2020" strokeWidth="0.9" strokeLinecap="round" />
      {/* Mouth detail for grumpy - teeth or grimace line */}
      {mood === "grumpy" && (
        <path d="M18 27.2 L22 27.2" stroke="#8B2020" strokeWidth="0.4" opacity="0.5" />
      )}
    </svg>
  );
}
