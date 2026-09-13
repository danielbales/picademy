const KEY = "picademy-scores";
const COVERED_KEY = "picademy-covered";

function getAll() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveScore(avg) {
  const scores = getAll();
  scores.push(avg);
  localStorage.setItem(KEY, JSON.stringify(scores));
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
