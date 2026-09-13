const KEY = "picademy-scores";
const COVERED_KEY = "picademy-covered";
const STREAK_KEY = "picademy-streak";

function today() {
  return new Date().toISOString().slice(0, 10);
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
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScore(avg) {
  const scores = getAll();
  scores.push(avg);
  sessionStorage.setItem(KEY, JSON.stringify(scores));
}

export function getBest() {
  const scores = getAll();
  return scores.length ? Math.max(...scores) : null;
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
