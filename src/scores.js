const KEY = "picademy-scores";
const COVERED_KEY = "picademy-covered";
const STREAK_KEY = "picademy-streak";
const DAILY_KEY = "picademy-daily";
const CREDITS_KEY = "picademy-credits";
const LIMIT_HITS_KEY = "picademy-limit-hits";
const FREE_DAILY = 9999; // TODO: set back to 5 before launch

function today() {
  return new Date().toISOString().slice(0, 10);
}

/* ---- Daily usage & credits ---- */

function loadDaily() {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return { date: today(), used: 0 };
    const d = JSON.parse(raw);
    return d.date === today() ? d : { date: today(), used: 0 };
  } catch {
    return { date: today(), used: 0 };
  }
}

export function getRemaining() {
  const d = loadDaily();
  const freeLeft = Math.max(0, FREE_DAILY - d.used);
  const credits = getCredits();
  return { freeLeft, credits, total: freeLeft + credits, daily: FREE_DAILY };
}

export function getCredits() {
  try {
    return parseInt(localStorage.getItem(CREDITS_KEY) || "0", 10) || 0;
  } catch {
    return 0;
  }
}

export function useGrade() {
  const d = loadDaily();
  if (d.used < FREE_DAILY) {
    d.used++;
    localStorage.setItem(DAILY_KEY, JSON.stringify(d));
    return true;
  }
  const credits = getCredits();
  if (credits > 0) {
    localStorage.setItem(CREDITS_KEY, String(credits - 1));
    return true;
  }
  return false;
}

export function addCredits(n) {
  const current = getCredits();
  localStorage.setItem(CREDITS_KEY, String(current + n));
}

export function bumpLimitHit() {
  try {
    const hits = parseInt(localStorage.getItem(LIMIT_HITS_KEY) || "0", 10) || 0;
    localStorage.setItem(LIMIT_HITS_KEY, String(hits + 1));
  } catch { /* ignore */ }
}

function loadStreak() {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lastDate: null, best: 0 };
  } catch {
    return { count: 0, lastDate: null, best: 0 };
  }
}

export function getStreak() {
  const s = loadStreak();
  const t = today();
  if (s.lastDate === t) return s.count;
  // Check if yesterday — streak is still alive but not yet extended
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  if (s.lastDate === yStr) return s.count;
  // Streak broken
  return 0;
}

export function bumpStreak() {
  const s = loadStreak();
  const t = today();
  if (s.lastDate === t) return { count: s.count, isNewBest: false };
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  const count = s.lastDate === yStr ? s.count + 1 : 1;
  const best = Math.max(count, s.best || 0);
  const isNewBest = count > (s.best || 0) && count > 1;
  localStorage.setItem(STREAK_KEY, JSON.stringify({ count, lastDate: t, best }));
  return { count, isNewBest };
}

function getAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveScore(avg, photoUrl) {
  const scores = getAll();
  scores.push(avg);
  localStorage.setItem(KEY, JSON.stringify(scores));
  const thumb = await makeThumbnail(photoUrl);
  // Track best photo thumbnail
  const prev = getBest();
  let best = prev;
  if (prev === null || avg >= prev.score) {
    best = { score: avg, thumb };
    localStorage.setItem(KEY + "-best", JSON.stringify(best));
  }
  // Track last 3 submissions
  const recent = getRecent();
  recent.push({ score: avg, thumb });
  if (recent.length > 3) recent.shift();
  localStorage.setItem(KEY + "-recent", JSON.stringify(recent));
  return best;
}

function makeThumbnail(dataUrl) {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        const size = 48;
        c.width = size;
        c.height = size;
        const ctx = c.getContext("2d");
        const s = Math.min(img.width, img.height);
        const sx = (img.width - s) / 2;
        const sy = (img.height - s) / 2;
        ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
        resolve(c.toDataURL("image/jpeg", 0.5));
      };
      img.onerror = () => resolve(null);
      img.src = dataUrl;
    } catch {
      resolve(null);
    }
  });
}

export function getBest() {
  // Try new format first (with thumbnail)
  try {
    const raw = localStorage.getItem(KEY + "-best");
    if (raw) return JSON.parse(raw);
  } catch {}
  // Fallback to old format
  const scores = getAll();
  if (!scores.length) return null;
  return { score: Math.max(...scores), thumb: null };
}

export function getRecent() {
  try {
    const raw = localStorage.getItem(KEY + "-recent");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCovered(covered) {
  localStorage.setItem(COVERED_KEY, JSON.stringify(covered));
}

export function getCovered() {
  try {
    const raw = localStorage.getItem(COVERED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
