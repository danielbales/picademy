import { useState, useEffect } from "react";
import { SKILLS } from "./data";

export function toGrade(avg) {
  if (avg >= 7.2) return "Gold";
  if (avg >= 5.7) return "Silver";
  if (avg >= 4.0) return "Bronze";
  return "Basic";
}

export const average = (skills) => SKILLS.reduce((sum, s) => sum + skills[s.id], 0) / SKILLS.length;
export const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

export function useCountUp(target, key) {
  const [value, setValue] = useState(target || 0);
  useEffect(() => {
    if (target == null) return undefined;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    let raf;
    let vibrated = false;
    const start = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - start) / 700);
      setValue(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!vibrated) {
        vibrated = true;
        navigator.vibrate?.(40);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, key]);
  return value;
}
