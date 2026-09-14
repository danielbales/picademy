export default function Kai({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Head / mantle */}
      <ellipse cx="20" cy="14" rx="10" ry="11" fill="#7B68EE" />
      {/* Head highlight */}
      <ellipse cx="18" cy="10" rx="5" ry="6" fill="#9B8AFE" opacity="0.4" />
      {/* Spots on head */}
      <circle cx="15" cy="9" r="1.2" fill="#5B48CE" opacity="0.5" />
      <circle cx="23" cy="11" r="1" fill="#5B48CE" opacity="0.4" />
      <circle cx="18" cy="15" r="0.8" fill="#5B48CE" opacity="0.4" />
      {/* Eyes */}
      <ellipse cx="15" cy="16" rx="3" ry="3.5" fill="#FFFFFF" />
      <ellipse cx="15.3" cy="16" rx="2" ry="2.5" fill="#1A1A2E" />
      <circle cx="15.8" cy="15.2" r="0.7" fill="#FFF" opacity="0.9" />
      <ellipse cx="25" cy="16" rx="3" ry="3.5" fill="#FFFFFF" />
      <ellipse cx="24.7" cy="16" rx="2" ry="2.5" fill="#1A1A2E" />
      <circle cx="25.2" cy="15.2" r="0.7" fill="#FFF" opacity="0.9" />
      {/* Tentacles */}
      <path d="M12 23 Q8 28 6 32 Q5 34 7 33" fill="none" stroke="#7B68EE" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 24 Q12 30 10 35 Q9 37 11 36" fill="none" stroke="#8B7AEE" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 25 Q17 31 16 36 Q15.5 38 17.5 37" fill="none" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 25 Q23 31 24 36 Q24.5 38 22.5 37" fill="none" stroke="#8B7AEE" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 24 Q28 30 30 35 Q31 37 29 36" fill="none" stroke="#7B68EE" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 23 Q32 28 34 32 Q35 34 33 33" fill="none" stroke="#8B7AEE" strokeWidth="2.2" strokeLinecap="round" />
      {/* Suction cups */}
      <circle cx="7" cy="31" r="0.8" fill="#5B48CE" opacity="0.5" />
      <circle cx="10" cy="34" r="0.7" fill="#5B48CE" opacity="0.4" />
      <circle cx="16" cy="35" r="0.7" fill="#5B48CE" opacity="0.4" />
      <circle cx="24" cy="35" r="0.7" fill="#5B48CE" opacity="0.4" />
      <circle cx="30" cy="34" r="0.7" fill="#5B48CE" opacity="0.4" />
      <circle cx="33" cy="31" r="0.8" fill="#5B48CE" opacity="0.5" />
      {/* Mouth */}
      <path d="M18 20 Q20 21.5 22 20" fill="none" stroke="#5B48CE" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
