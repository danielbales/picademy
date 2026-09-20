export default function ApertureMark() {
  // 6 blades evenly spaced at 60-degree intervals
  // Each blade is a curved quadrilateral from outer edge toward center
  const cx = 20, cy = 20, R = 16, r = 5;
  const blades = [];
  for (let i = 0; i < 6; i++) {
    const a1 = (i * 60 - 90) * Math.PI / 180;
    const a2 = ((i + 1) * 60 - 90) * Math.PI / 180;
    const amid = ((i + 0.5) * 60 - 90) * Math.PI / 180;
    // Outer points
    const ox1 = cx + R * Math.cos(a1);
    const oy1 = cy + R * Math.sin(a1);
    const ox2 = cx + R * Math.cos(a2);
    const oy2 = cy + R * Math.sin(a2);
    // Inner points (offset to create overlap)
    const ir1 = r + 1;
    const ir2 = r + 2;
    const ix1 = cx + ir1 * Math.cos(a2 - 0.3);
    const iy1 = cy + ir1 * Math.sin(a2 - 0.3);
    const ix2 = cx + ir2 * Math.cos(a1 + 0.3);
    const iy2 = cy + ir2 * Math.sin(a1 + 0.3);
    // Control point for curved outer edge
    const cR = R + 2;
    const cpx = cx + cR * Math.cos(amid);
    const cpy = cy + cR * Math.sin(amid);

    const d = `M${ox1.toFixed(1)},${oy1.toFixed(1)} Q${cpx.toFixed(1)},${cpy.toFixed(1)} ${ox2.toFixed(1)},${oy2.toFixed(1)} L${ix1.toFixed(1)},${iy1.toFixed(1)} L${ix2.toFixed(1)},${iy2.toFixed(1)} Z`;
    blades.push(
      <path
        key={i}
        d={d}
        fill={i % 2 === 0 ? "url(#ap-blade1)" : "url(#ap-blade2)"}
      />
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="ap-blade1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F5E078" />
          <stop offset="100%" stopColor="#D4A830" />
        </linearGradient>
        <linearGradient id="ap-blade2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C84A" />
          <stop offset="100%" stopColor="#B8960F" />
        </linearGradient>
      </defs>
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" fill="none" stroke="#E8C84A" strokeWidth="0.8" opacity="0.35" />
      {/* Blades */}
      {blades}
      {/* Center opening */}
      <circle cx="20" cy="20" r={r} fill="#0A0B0D" />
      {/* Center lens glint */}
      <circle cx="20" cy="20" r="2" fill="#E8C84A" opacity="0.15" />
      <circle cx="20" cy="19" r="1" fill="#FFF8E0" opacity="0.5" />
    </svg>
  );
}
