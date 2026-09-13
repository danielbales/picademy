import { useEffect, useRef } from "react";

const COLORS = ["#E8C84A", "#578BFA", "#E26AB5", "#27AD75", "#F4B740", "#F0616D", "#A78BFA", "#3CC8C8"];
const COUNT = 120;
const GRAVITY = 0.003;
const DURATION = 3500;

export default function Confetti({ fire }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!fire) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const pieces = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 40,
      w: 6 + Math.random() * 6,
      h: 4 + Math.random() * 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 6,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * Math.PI * 2,
      rv: (Math.random() - 0.5) * 0.15,
      wobble: Math.random() * Math.PI * 2,
    }));

    const start = performance.now();
    let raf;

    function draw(now) {
      const elapsed = now - start;
      if (elapsed > DURATION) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }
      const fade = elapsed > DURATION - 800 ? (DURATION - elapsed) / 800 : 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = fade;
      for (const p of pieces) {
        p.vy += GRAVITY * (now - start);
        p.x += p.vx;
        p.vx += Math.sin(p.wobble) * 0.03;
        p.wobble += 0.04;
        p.y += p.vy * 0.4;
        p.rot += p.rv;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fire]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
}
