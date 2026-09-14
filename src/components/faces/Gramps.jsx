export default function Gramps({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      {/* Shell */}
      <ellipse cx="20" cy="18" rx="14" ry="12" fill="#5D7A3A" />
      {/* Shell hexagonal pattern */}
      <path d="M20 8 L26 12 L26 18 L20 22 L14 18 L14 12Z" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      <path d="M14 12 L8 14" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      <path d="M26 12 L32 14" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      <path d="M14 18 L10 22" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      <path d="M26 18 L30 22" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      <path d="M20 22 L20 27" fill="none" stroke="#3D5A2A" strokeWidth="0.8" />
      {/* Shell rim */}
      <path d="M6 24 Q20 30 34 24" fill="none" stroke="#3D5A2A" strokeWidth="1.2" strokeLinecap="round" />
      {/* Neck - wrinkled */}
      <path d="M28 22 Q32 24 33 28 Q34 32 32 34" fill="none" stroke="#8B9B6B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Neck wrinkle lines */}
      <path d="M30 26 Q32 26.5 33 27" fill="none" stroke="#6B7B4B" strokeWidth="0.5" strokeLinecap="round" />
      <path d="M30 28 Q32 28.5 33 29" fill="none" stroke="#6B7B4B" strokeWidth="0.5" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="34" cy="22" rx="5" ry="4.5" fill="#8B9B6B" />
      {/* Eyes - wise and small */}
      <ellipse cx="36" cy="20.5" rx="1.2" ry="1.4" fill="#3B2E10" />
      <circle cx="36.4" cy="20" r="0.4" fill="#FFF" opacity="0.8" />
      {/* Spectacles */}
      <circle cx="36" cy="20.5" r="2.2" fill="none" stroke="#C0C0C0" strokeWidth="0.7" />
      <circle cx="32" cy="21" r="2" fill="none" stroke="#C0C0C0" strokeWidth="0.7" />
      <path d="M33.8 20.5 L34 20.8" stroke="#C0C0C0" strokeWidth="0.5" />
      {/* Other eye behind spectacle */}
      <ellipse cx="32" cy="21" rx="1" ry="1.2" fill="#3B2E10" />
      <circle cx="32.3" cy="20.5" r="0.35" fill="#FFF" opacity="0.8" />
      {/* Mouth - gentle smile */}
      <path d="M35 23.5 Q36 24.5 37.5 24" fill="none" stroke="#5B6B3B" strokeWidth="0.6" strokeLinecap="round" />
      {/* Front legs */}
      <path d="M10 26 Q8 30 7 34" stroke="#8B9B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M14 28 Q13 32 12 35" stroke="#8B9B6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Tail */}
      <path d="M8 22 Q5 20 4 18" stroke="#8B9B6B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
