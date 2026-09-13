const KEY = "picademy-scores";

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
