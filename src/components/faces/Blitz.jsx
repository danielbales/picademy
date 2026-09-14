export default function Blitz({ mood = "neutral" }) {
  // Mouth/beak expression by mood
  const beakLower = {
    happy: "M25.2 13 L33 12.5 L25.2 14.2Z",
    neutral: "M25.2 13 L34 12.2 L25.2 13.8Z",
    grumpy: "M25.2 12.8 L33 12.8 L25.2 13.5Z",
  }[mood];

  // Eye size by mood
  const eyeRy = { happy: 2.0, neutral: 1.8, grumpy: 1.4 }[mood];
  const eyeRx = { happy: 1.9, neutral: 1.8, grumpy: 1.9 }[mood];

  // Pupil size
  const pupilR = { happy: 1.1, neutral: 1.0, grumpy: 1.0 }[mood];

  // Highlight size for sparkly happy eyes
  const hlR = { happy: 0.7, neutral: 0.5, grumpy: 0.4 }[mood];

  // Eye Y position (droopy for grumpy)
  const eyeY = { happy: 10.8, neutral: 11, grumpy: 11.3 }[mood];

  // Brow angle for grumpy
  const browEnd = { happy: 9, neutral: 9.2, grumpy: 10 }[mood];

  // Wing spread energy
  const wingOpacity = { happy: 0.9, neutral: 0.8, grumpy: 0.6 }[mood];

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        {/* Iridescent body gradient - green to teal shift */}
        <radialGradient id="blitz-body" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="40%" stopColor="#00C853" />
          <stop offset="80%" stopColor="#00BFA5" />
          <stop offset="100%" stopColor="#009688" />
        </radialGradient>
        {/* Head iridescent gradient */}
        <radialGradient id="blitz-head" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="50%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#00897B" />
        </radialGradient>
        {/* Throat gorget gradient - ruby red iridescence */}
        <radialGradient id="blitz-gorget" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FF5252" />
          <stop offset="40%" stopColor="#E53935" />
          <stop offset="100%" stopColor="#C62828" />
        </radialGradient>
        {/* Gorget shimmer highlight */}
        <linearGradient id="blitz-gorget-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF8A80" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FF5252" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFAB91" stopOpacity="0.3" />
        </linearGradient>
        {/* Wing motion gradient */}
        <linearGradient id="blitz-wing-l" x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#00BFA5" />
        </linearGradient>
        <linearGradient id="blitz-wing-r" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C853" />
          <stop offset="100%" stopColor="#00BFA5" />
        </linearGradient>
        {/* Beak gradient */}
        <linearGradient id="blitz-beak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
      </defs>

      {/* Left wing - motion blur effect */}
      <path d="M14 17 Q5 8 2 4" fill="none" stroke="url(#blitz-wing-l)" strokeWidth="2.2" strokeLinecap="round" opacity={wingOpacity} />
      <path d="M14 18.5 Q6 10 3.5 7" fill="none" stroke="#00BFA5" strokeWidth="1.6" strokeLinecap="round" opacity={wingOpacity * 0.55} />
      <path d="M14 19.5 Q7 12.5 5 9.5" fill="none" stroke="#00E676" strokeWidth="1" strokeLinecap="round" opacity={wingOpacity * 0.3} />
      {/* Wing blur speed lines */}
      <path d="M13.5 16 Q8 9 4 5.5" fill="none" stroke="#00C853" strokeWidth="0.5" strokeLinecap="round" opacity={wingOpacity * 0.2} />

      {/* Right wing - motion blur effect */}
      <path d="M26 17 Q35 8 38 4" fill="none" stroke="url(#blitz-wing-r)" strokeWidth="2.2" strokeLinecap="round" opacity={wingOpacity} />
      <path d="M26 18.5 Q34 10 36.5 7" fill="none" stroke="#00BFA5" strokeWidth="1.6" strokeLinecap="round" opacity={wingOpacity * 0.55} />
      <path d="M26 19.5 Q33 12.5 35 9.5" fill="none" stroke="#00E676" strokeWidth="1" strokeLinecap="round" opacity={wingOpacity * 0.3} />
      {/* Wing blur speed lines */}
      <path d="M26.5 16 Q32 9 36 5.5" fill="none" stroke="#00C853" strokeWidth="0.5" strokeLinecap="round" opacity={wingOpacity * 0.2} />

      {/* Body */}
      <ellipse cx="20" cy="20" rx="6" ry="8.5" fill="url(#blitz-body)" transform="rotate(-8 20 20)" />
      {/* Body iridescent highlight stripe */}
      <ellipse cx="18.5" cy="17" rx="2.5" ry="5" fill="#69F0AE" opacity="0.2" transform="rotate(-8 18.5 17)" />

      {/* Throat gorget patch */}
      <ellipse cx="21" cy="22.5" rx="3.2" ry="3.8" fill="url(#blitz-gorget)" />
      {/* Gorget shimmer */}
      <ellipse cx="21" cy="22" rx="2.2" ry="2.8" fill="url(#blitz-gorget-sheen)" />
      {/* Gorget feather texture */}
      <path d="M19.5 21 Q21 20.5 22.5 21" fill="none" stroke="#FF8A80" strokeWidth="0.3" opacity="0.4" />
      <path d="M19 22 Q21 21.5 23 22" fill="none" stroke="#FF8A80" strokeWidth="0.3" opacity="0.35" />
      <path d="M19.2 23 Q21 22.5 22.8 23" fill="none" stroke="#FFAB91" strokeWidth="0.3" opacity="0.3" />

      {/* Head */}
      <circle cx="20" cy="12" r="5.2" fill="url(#blitz-head)" />
      {/* Head iridescent highlight */}
      <circle cx="18.5" cy="10.5" r="2.8" fill="#69F0AE" opacity="0.2" />
      {/* Crown feather texture */}
      <path d="M16 9.5 Q17 8.5 18 9" fill="none" stroke="#009688" strokeWidth="0.35" opacity="0.5" />
      <path d="M17.5 8.8 Q18.5 8 19.5 8.5" fill="none" stroke="#009688" strokeWidth="0.3" opacity="0.4" />

      {/* Eye - large, expressive, mood-reactive */}
      <ellipse cx="22" cy={eyeY} rx={eyeRx} ry={eyeRy} fill="#FFF" opacity="0.95" />
      <circle cx="22.2" cy={eyeY} r={pupilR} fill="#1A1A2E" />
      {/* Main highlight */}
      <circle cx="22.6" cy={eyeY - 0.5} r={hlR} fill="#FFF" opacity="0.95" />
      {/* Secondary highlight for sparkle */}
      {mood === "happy" && (
        <circle cx="21.5" cy={eyeY + 0.4} r={0.25} fill="#FFF" opacity="0.7" />
      )}
      {/* Iris ring */}
      <circle cx="22.2" cy={eyeY} r={pupilR + 0.3} fill="none" stroke="#2C2C4E" strokeWidth="0.2" opacity="0.4" />

      {/* Eyebrow - mood-reactive */}
      <path
        d={`M20.5 ${browEnd - 1.2} Q22.5 ${browEnd - 2} 24 ${browEnd - 1}`}
        fill="none" stroke="#007A3A" strokeWidth="0.5" strokeLinecap="round" opacity="0.6"
      />

      {/* Beak - sharp, long, tapered */}
      {/* Upper mandible */}
      <path d="M25 12 L35 11.2 L25.2 12.6Z" fill="url(#blitz-beak)" />
      {/* Lower mandible - mood-reactive */}
      <path d={beakLower} fill="#555" />
      {/* Beak highlight */}
      <path d="M26 11.8 L32 11.5" fill="none" stroke="#666" strokeWidth="0.25" opacity="0.5" />
      {/* Beak tip detail */}
      <circle cx="35" cy="11.2" r="0.2" fill="#111" />

      {/* Tail feathers - longer, more dynamic */}
      <path d="M17 28 Q13 33 10 38" fill="none" stroke="#00C853" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19 28 Q16 34 14 38" fill="none" stroke="#00BFA5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 28 Q20 34 19 38" fill="none" stroke="#00C853" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M23 28 Q24 34 24 38" fill="none" stroke="#009688" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

      {/* Tiny feet */}
      <path d="M18 27 L16 30 M16 30 L14.8 29 M16 30 L17 29.2" stroke="#555" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M22 27 L24 30 M24 30 L22.8 29 M24 30 L25.2 29.2" stroke="#555" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}
