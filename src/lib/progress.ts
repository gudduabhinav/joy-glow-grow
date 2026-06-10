// Offline-first progress storage. Plain localStorage — survives reloads, works without network.
const KEY = "tinygenius.progress.v1";

export interface Progress {
  stars: number;
  letters: string[]; // letters mastered
  numbers: number[]; // numbers traced
  traced: string[];  // tracing items completed
  lastVisit: string;
}

const empty: Progress = { stars: 0, letters: [], numbers: [], traced: [], lastVisit: new Date().toISOString() };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...JSON.parse(raw) };
  } catch {
    return empty;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* quota */ }
}

export function addStars(n: number) {
  const p = loadProgress();
  p.stars += n;
  saveProgress(p);
  return p.stars;
}

export function markLetter(letter: string) {
  const p = loadProgress();
  if (!p.letters.includes(letter)) {
    p.letters.push(letter);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function markTraced(id: string) {
  const p = loadProgress();
  if (!p.traced.includes(id)) {
    p.traced.push(id);
    p.stars += 2;
  }
  saveProgress(p);
  return p;
}
