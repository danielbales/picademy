export default function Dolly({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 170" aria-hidden="true">
      {/* neck */}
      <path d="M42 78 C 42 108, 40 140, 38 170 L 82 170 C 80 140, 78 108, 78 78 Z" fill="#E4D2BE" />
      {/* camera strap */}
      <path d="M45 95 C 51 118, 56 131, 60 141" fill="none" stroke="#3A4046" strokeWidth="5" strokeLinecap="round" />
      <path d="M76 92 C 73 116, 66 131, 62 141" fill="none" stroke="#3A4046" strokeWidth="5" strokeLinecap="round" />
      {/* camera */}
      <rect x="35" y="137" width="51" height="31" rx="6" fill="#2C3036" />
      <rect x="35" y="137" width="51" height="9" rx="4" fill="#3D434B" />
      <rect x="69" y="131" width="13" height="8" rx="2.5" fill="#2C3036" />
      <circle cx="75.5" cy="133" r="2.6" fill="#F0616D" />
      <circle cx="58" cy="153" r="13.5" fill="#454C55" />
      <circle cx="58" cy="153" r="9.5" fill="#191C21" />
      <circle cx="58" cy="153" r="5.5" fill="#2E5FCF" />
      <path d="M54 149 Q 57 146 60 148" fill="none" stroke="#BFD4FF" strokeWidth="2.5" strokeLinecap="round" />
      {/* ears */}
      <path d="M40 44 C 30 30, 25 11, 31 2 C 40 -1, 48 16, 53 38 Z" fill="#F2E6D8" />
      <path d="M40 37 C 35 27, 32 15, 35 8 C 40 8, 44 20, 47 35 Z" fill="#F2B8C0" />
      <path d="M80 44 C 90 30, 95 11, 89 2 C 80 -1, 72 16, 67 38 Z" fill="#F2E6D8" />
      <path d="M80 37 C 85 27, 88 15, 85 8 C 80 8, 76 20, 73 35 Z" fill="#F2B8C0" />
      {/* head */}
      <ellipse cx="60" cy="65" rx="28" ry="29" fill="#F2E6D8" />
      {/* fringe */}
      <circle cx="47" cy="44" r="8" fill="#FBF6F0" />
      <circle cx="60" cy="41" r="8.5" fill="#FBF6F0" />
      <circle cx="72" cy="44" r="8" fill="#FBF6F0" />
      {/* backwards cap */}
      <g transform="rotate(-7 60 36)">
        <path d="M86 41 C 103 40, 104 32, 88 31 L 80 33 Z" fill="#0044D6" />
        <path d="M34 40 C 34 20, 86 20, 86 40 C 70 35, 50 35, 34 40 Z" fill="#0052FF" />
        <path d="M34 40 C 34 20, 86 20, 86 40 L 72 38 C 72 22, 62 20, 60 20 C 58 20, 48 22, 48 38 Z" fill="#1F66FF" />
        <rect x="34" y="37" width="52" height="6" rx="3" fill="#0044D6" />
        <circle cx="60" cy="22" r="3" fill="#FFD166" />
      </g>
      {/* cheeks */}
      <circle cx="38" cy="75" r="5" fill="#F2B8C0" opacity="0.7" />
      <circle cx="82" cy="75" r="5" fill="#F2B8C0" opacity="0.7" />
      {/* eyes */}
      <circle cx="47" cy="64" r="10.5" fill="#FFFFFF" stroke="#D9C9B6" strokeWidth="1.5" />
      <circle cx="75" cy="66" r="7" fill="#FFFFFF" stroke="#D9C9B6" strokeWidth="1.5" />
      <circle cx="49.5" cy="66" r="4.8" fill="#1D2327" />
      <circle cx="73" cy="68" r="3.4" fill="#1D2327" />
      <circle cx="51.2" cy="64" r="1.6" fill="#FFFFFF" />
      <circle cx="74.1" cy="66.6" r="1.2" fill="#FFFFFF" />
      {/* brows */}
      <path d="M37 52 Q 47 47 56 51" fill="none" stroke="#5A4636" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M69 54 Q 76 51 83 55" fill="none" stroke="#5A4636" strokeWidth="2.6" strokeLinecap="round" />
      {/* muzzle */}
      <ellipse cx="60" cy="88" rx="19" ry="12.5" fill="#FBF6F0" />
      <path d="M53 84 Q 55 86 57 84" fill="none" stroke="#5A4636" strokeWidth="2" strokeLinecap="round" />
      <path d="M63 84 Q 65 86 67 84" fill="none" stroke="#5A4636" strokeWidth="2" strokeLinecap="round" />
      {/* grin */}
      <path d="M49 90 Q 60 103 72 89 Q 61 96 49 90 Z" fill="#8C5B4E" />
      <rect x="55.5" y="90.5" width="5.2" height="6.5" rx="1.6" fill="#FFFFFF" />
      <rect x="61.3" y="90.5" width="5.2" height="6.5" rx="1.6" fill="#FFFFFF" />
      <path d="M49 90 Q 60 103 72 89" fill="none" stroke="#5A4636" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
