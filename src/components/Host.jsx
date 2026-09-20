export default function Host({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="host-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A4D54" />
          <stop offset="100%" stopColor="#2A2D33" />
        </linearGradient>
        <radialGradient id="host-lens" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#6EC8FF" />
          <stop offset="60%" stopColor="#3A8ECF" />
          <stop offset="100%" stopColor="#1A5080" />
        </radialGradient>
      </defs>
      {/* Camera body */}
      <rect x="4" y="14" width="32" height="20" rx="4" fill="url(#host-body)" />
      {/* Top plate */}
      <rect x="6" y="12" width="28" height="4" rx="2" fill="#3A3D44" />
      {/* Viewfinder bump */}
      <rect x="15" y="9" width="10" height="5" rx="1.5" fill="#3A3D44" />
      <rect x="17" y="10" width="6" height="3" rx="1" fill="#1A1D23" />
      {/* Shutter button */}
      <circle cx="28" cy="10.5" r="2" fill="#E8C84A" />
      <circle cx="28" cy="10.5" r="1.2" fill="#D4B430" />
      {/* Lens outer ring */}
      <circle cx="20" cy="24" r="8" fill="#1A1D23" />
      <circle cx="20" cy="24" r="7" fill="#2A2D33" stroke="#5A5D64" strokeWidth="0.5" />
      {/* Lens glass */}
      <circle cx="20" cy="24" r="5.5" fill="url(#host-lens)" />
      {/* Lens reflection */}
      <ellipse cx="18" cy="22" rx="2" ry="1.5" fill="#FFF" opacity="0.25" />
      {/* Inner lens ring */}
      <circle cx="20" cy="24" r="3" fill="none" stroke="#1A5080" strokeWidth="0.5" opacity="0.6" />
      {/* Flash */}
      <rect x="8" y="13" width="4" height="2" rx="0.5" fill="#6B7280" />
    </svg>
  );
}
