export default function Reef({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Legs */}
      <path d="M10 28 Q6 32 4 34" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 29 Q9 33 7 36" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M30 28 Q34 32 36 34" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28 29 Q31 33 33 36" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Body / shell */}
      <ellipse cx="20" cy="24" rx="13" ry="8" fill="#E74C3C" />
      {/* Shell highlights */}
      <ellipse cx="18" cy="21" rx="6" ry="3.5" fill="#C0392B" opacity="0.5" />
      {/* Shell texture lines */}
      <path d="M10 22 Q15 20 20 22" fill="none" stroke="#C0392B" strokeWidth="0.6" opacity="0.7" />
      <path d="M20 22 Q25 20 30 22" fill="none" stroke="#C0392B" strokeWidth="0.6" opacity="0.7" />
      {/* Eye stalks */}
      <path d="M16 18 L14 10" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 18 L26 10" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
      {/* Eyes - beady */}
      <circle cx="14" cy="9" r="2.2" fill="#FFFFFF" />
      <circle cx="14.3" cy="8.8" r="1.3" fill="#1A1A2E" />
      <circle cx="14.7" cy="8.3" r="0.4" fill="#FFF" opacity="0.9" />
      <circle cx="26" cy="9" r="2.2" fill="#FFFFFF" />
      <circle cx="25.7" cy="8.8" r="1.3" fill="#1A1A2E" />
      <circle cx="26.1" cy="8.3" r="0.4" fill="#FFF" opacity="0.9" />
      {/* Left pincer - raised and open */}
      <path d="M8 20 Q4 16 2 12 Q1 10 3 11 Q5 12 6 14" fill="none" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 12 Q0 10 2 8" fill="none" stroke="#E74C3C" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right pincer - raised and open */}
      <path d="M32 20 Q36 16 38 12 Q39 10 37 11 Q35 12 34 14" fill="none" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 12 Q40 10 38 8" fill="none" stroke="#E74C3C" strokeWidth="1.8" strokeLinecap="round" />
      {/* Mouth - sassy smirk */}
      <path d="M17 26 Q20 28 23 25.5" fill="none" stroke="#8B2020" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
