// Lightweight canvas confetti burst - no dependencies
const COLORS = ["#E8C84A", "#F0D860", "#FFE566", "#D4A843", "#FF6B6B", "#4ECDC4", "#A78BFA", "#F472B6"];
const COUNT = 30;
const GRAVITY = 0.003;
const DRAG = 0.97;
const DURATION = 1500;

export function fireConfetti() {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;";
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  ctx.scale(devicePixelRatio, devicePixelRatio);
  const w = window.innerWidth;
  const h = window.innerHeight;

  const pieces = Array.from({ length: COUNT }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 8;
    return {
      x: w / 2,
      y: h * 0.35,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      size: 4 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
    };
  });

  const start = performance.now();
  let raf;

  function tick(now) {
    const elapsed = now - start;
    if (elapsed > DURATION) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, w, h);
    const fade = elapsed > DURATION * 0.6 ? 1 - (elapsed - DURATION * 0.6) / (DURATION * 0.4) : 1;

    for (const p of pieces) {
      p.vy += GRAVITY * 16;
      p.vx *= DRAG;
      p.vy *= DRAG;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity = fade;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }

    raf = requestAnimationFrame(tick);
  }

  raf = requestAnimationFrame(tick);
}
