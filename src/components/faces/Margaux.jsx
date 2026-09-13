export default function Margaux({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Head */}
      <circle cx="20" cy="21" r="14" fill="#F0D5C4" />
      {/* Hair - stylish bob */}
      <path d="M6 20 Q6 5 20 4 Q34 5 34 20 Q34 14 30 12 Q26 10 20 10 Q14 10 10 12 Q6 14 6 20Z" fill="#1A0A00" />
      {/* Left hair drape */}
      <path d="M6 20 Q5 26 8 28 Q9 22 10 18Z" fill="#1A0A00" />
      {/* Right hair drape */}
      <path d="M34 20 Q35 26 32 28 Q31 22 30 18Z" fill="#1A0A00" />
      {/* Left eye - cat-eye shape */}
      <ellipse cx="15" cy="20" rx="2.2" ry="1.8" fill="#2C1810" />
      <circle cx="15.5" cy="19.5" r="0.6" fill="#FFF" />
      {/* Right eye */}
      <ellipse cx="25" cy="20" rx="2.2" ry="1.8" fill="#2C1810" />
      <circle cx="25.5" cy="19.5" r="0.6" fill="#FFF" />
      {/* Eyeliner wings */}
      <path d="M12 19.5 Q11 18.5 10.5 18" fill="none" stroke="#1A0A00" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M28 19.5 Q29 18.5 29.5 18" fill="none" stroke="#1A0A00" strokeWidth="0.8" strokeLinecap="round" />
      {/* Brows - arched */}
      <path d="M12 16 Q15 14 18 16" fill="none" stroke="#1A0A00" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M22 16 Q25 14 28 16" fill="none" stroke="#1A0A00" strokeWidth="0.9" strokeLinecap="round" />
      {/* Nose */}
      <path d="M20 22 L19 24.5 L21 24.5" fill="none" stroke="#D4A58C" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lips - bold */}
      <path d="M16 27 Q18 25.5 20 26.5 Q22 25.5 24 27" fill="#C44060" stroke="#C44060" strokeWidth="0.5" strokeLinejoin="round" />
      <path d="M16 27 Q20 29 24 27" fill="#A83050" stroke="#A83050" strokeWidth="0.3" />
      {/* Beauty mark */}
      <circle cx="27" cy="25" r="0.7" fill="#3B2010" />
    </svg>
  );
}
