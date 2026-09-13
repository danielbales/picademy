export default function Harper({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Body */}
      <ellipse cx="20" cy="22" rx="12" ry="9" fill="#E8B84B" />
      {/* Spots */}
      <circle cx="14" cy="19" r="1.2" fill="#8B5E1A" opacity="0.7" />
      <circle cx="18" cy="17" r="1" fill="#8B5E1A" opacity="0.6" />
      <circle cx="24" cy="18" r="1.1" fill="#8B5E1A" opacity="0.7" />
      <circle cx="16" cy="24" r="0.9" fill="#8B5E1A" opacity="0.5" />
      <circle cx="22" cy="25" r="1" fill="#8B5E1A" opacity="0.6" />
      <circle cx="26" cy="22" r="0.8" fill="#8B5E1A" opacity="0.5" />
      <circle cx="12" cy="23" r="0.7" fill="#8B5E1A" opacity="0.5" />
      {/* Belly */}
      <ellipse cx="20" cy="25" rx="8" ry="5" fill="#F5DFA0" />
      {/* Head */}
      <circle cx="30" cy="17" r="6" fill="#E8B84B" />
      {/* Muzzle */}
      <ellipse cx="34" cy="18" rx="3" ry="2.5" fill="#F5DFA0" />
      {/* Nose */}
      <ellipse cx="35.5" cy="17.2" rx="1" ry="0.7" fill="#4A3520" />
      {/* Eyes */}
      <ellipse cx="29" cy="15.5" rx="1.8" ry="2" fill="#FFFFFF" />
      <ellipse cx="29.3" cy="15.5" rx="1.2" ry="1.5" fill="#C67B1A" />
      <circle cx="29.6" cy="15" r="0.5" fill="#FFF" opacity="0.9" />
      {/* Ears */}
      <ellipse cx="26" cy="12" rx="2" ry="2.5" fill="#E8B84B" />
      <ellipse cx="26" cy="12.5" rx="1.2" ry="1.5" fill="#D4943A" />
      <ellipse cx="32" cy="12.5" rx="1.8" ry="2.2" fill="#E8B84B" />
      <ellipse cx="32" cy="13" rx="1" ry="1.3" fill="#D4943A" />
      {/* Tear lines */}
      <path d="M31 17.5 Q32.5 20 33 21" fill="none" stroke="#4A3520" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M28 17.5 Q27 20 26.5 21" fill="none" stroke="#4A3520" strokeWidth="0.6" strokeLinecap="round" />
      {/* Mouth */}
      <path d="M34 19 Q35 20 36 19.5" fill="none" stroke="#4A3520" strokeWidth="0.5" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="36" y1="17" x2="39" y2="16" stroke="#D4943A" strokeWidth="0.4" />
      <line x1="36" y1="18.5" x2="39.5" y2="18.5" stroke="#D4943A" strokeWidth="0.4" />
      <line x1="36" y1="19.5" x2="39" y2="20.5" stroke="#D4943A" strokeWidth="0.4" />
      {/* Front legs */}
      <rect x="16" y="28" width="2.5" height="6" rx="1" fill="#E8B84B" />
      <rect x="22" y="28" width="2.5" height="6" rx="1" fill="#E8B84B" />
      {/* Paws */}
      <ellipse cx="17.2" cy="34.5" rx="1.8" ry="1" fill="#D4943A" />
      <ellipse cx="23.2" cy="34.5" rx="1.8" ry="1" fill="#D4943A" />
      {/* Tail */}
      <path d="M8 20 Q4 16 3 12 Q2.5 10 4 11" fill="none" stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="4" cy="11" r="1.5" fill="#4A3520" />
      {/* Head spots */}
      <circle cx="27" cy="13.5" r="0.6" fill="#8B5E1A" opacity="0.5" />
      <circle cx="33" cy="15" r="0.5" fill="#8B5E1A" opacity="0.4" />
    </svg>
  );
}
