export default function Mom({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Head */}
      <circle cx="20" cy="21" r="14" fill="#F5DEB3" />
      {/* Hair - soft, warm */}
      <path d="M7 19 Q7 5 20 5 Q33 5 33 19 Q32 12 26 10 Q22 9 20 9 Q18 9 14 10 Q8 12 7 19Z" fill="#8B6340" />
      {/* Soft side hair */}
      <path d="M7 19 Q6 24 8 26 Q8.5 21 9 17Z" fill="#8B6340" />
      <path d="M33 19 Q34 24 32 26 Q31.5 21 31 17Z" fill="#8B6340" />
      {/* Glasses */}
      <rect x="10" y="17" width="9" height="7" rx="3" fill="none" stroke="#9B8570" strokeWidth="1" />
      <rect x="21" y="17" width="9" height="7" rx="3" fill="none" stroke="#9B8570" strokeWidth="1" />
      <line x1="19" y1="20" x2="21" y2="20" stroke="#9B8570" strokeWidth="0.8" />
      {/* Left eye - happy */}
      <ellipse cx="14.5" cy="20.5" rx="1.6" ry="1.8" fill="#4A3728" />
      <circle cx="15" cy="20" r="0.5" fill="#FFF" />
      {/* Right eye - happy */}
      <ellipse cx="25.5" cy="20.5" rx="1.6" ry="1.8" fill="#4A3728" />
      <circle cx="26" cy="20" r="0.5" fill="#FFF" />
      {/* Soft brows */}
      <path d="M11 16 Q14.5 14.5 18 16" fill="none" stroke="#8B6340" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M22 16 Q25.5 14.5 29 16" fill="none" stroke="#8B6340" strokeWidth="0.8" strokeLinecap="round" />
      {/* Nose */}
      <path d="M20 22 L19 24 L21 24" fill="none" stroke="#D4B896" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
      {/* Big warm smile */}
      <path d="M14 27 Q17 31 20 31 Q23 31 26 27" fill="none" stroke="#C4917A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Rosy cheeks */}
      <circle cx="11" cy="25" r="2.5" fill="#F0A0A0" opacity="0.3" />
      <circle cx="29" cy="25" r="2.5" fill="#F0A0A0" opacity="0.3" />
    </svg>
  );
}
