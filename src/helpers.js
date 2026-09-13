import { useState, useEffect } from "react";
import { SKILLS } from "./data";

export function toGrade(avg) {
  const scale = [
    [9.0, "A+"], [8.3, "A"], [7.7, "A-"], [7.2, "B+"], [6.7, "B"],
    [6.2, "B-"], [5.7, "C+"], [5.2, "C"], [4.5, "C-"], [3.5, "D"],
  ];
  for (const [min, g] of scale) if (avg >= min) return g;
  return "F";
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
    const start = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - start) / 700);
      setValue(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, key]);
  return value;
}
