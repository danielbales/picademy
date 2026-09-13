export default function Mom({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Ears */}
      <circle cx="10" cy="10" r="5" fill="#8B6A4A" />
      <circle cx="30" cy="10" r="5" fill="#8B6A4A" />
      <circle cx="10" cy="10" r="3" fill="#C4917A" />
      <circle cx="30" cy="10" r="3" fill="#C4917A" />
      {/* Head */}
      <circle cx="20" cy="22" r="15" fill="#8B6A4A" />
      {/* Muzzle */}
      <ellipse cx="20" cy="26" rx="8" ry="6" fill="#C4A87A" />
      {/* Eyes - warm and round */}
      <ellipse cx="14" cy="20" rx="2.5" ry="2.8" fill="#3B2010" />
      <circle cx="14.8" cy="19.2" r="0.8" fill="#FFF" opacity="0.9" />
      <ellipse cx="26" cy="20" rx="2.5" ry="2.8" fill="#3B2010" />
      <circle cx="26.8" cy="19.2" r="0.8" fill="#FFF" opacity="0.9" />
      {/* Happy eyebrows */}
      <path d="M11 16.5 Q14 15 17 16.5" fill="none" stroke="#6B4A2A" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M23 16.5 Q26 15 29 16.5" fill="none" stroke="#6B4A2A" strokeWidth="0.8" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="20" cy="24" rx="2.5" ry="1.8" fill="#4A3020" />
      <ellipse cx="20" cy="23.5" rx="1.2" ry="0.5" fill="#6B4A3A" opacity="0.5" />
      {/* Smile */}
      <path d="M15 28 Q17.5 31 20 31 Q22.5 31 25 28" fill="none" stroke="#6B4A2A" strokeWidth="1" strokeLinecap="round" />
      {/* Rosy cheeks */}
      <circle cx="10" cy="25" r="3" fill="#E8A0A0" opacity="0.25" />
      <circle cx="30" cy="25" r="3" fill="#E8A0A0" opacity="0.25" />
    </svg>
  );
}
