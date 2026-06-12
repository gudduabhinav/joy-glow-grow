// Offline-first progress storage. Plain localStorage — survives reloads, works without network.
const KEY = "tinygenius.progress.v1";

export interface Progress {
  stars: number;
  letters: string[];
  numbers: number[];
  traced: string[];
  animals: string[];
  colors: string[];
  fruits: string[];
  body: string[];
  quizScore: number;
  lastVisit: string;
  streak: number;
  lastVisitDate: string;
}

const empty: Progress = {
  stars: 0, letters: [], numbers: [], traced: [],
  animals: [], colors: [], fruits: [], body: [], quizScore: 0,
  lastVisit: new Date().toISOString(),
  streak: 1, lastVisitDate: new Date().toDateString(),
};

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

export function markNumber(n: number) {
  const p = loadProgress();
  if (!p.numbers.includes(n)) {
    p.numbers.push(n);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function markAnimal(id: string) {
  const p = loadProgress();
  if (!p.animals.includes(id)) {
    p.animals.push(id);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function markColor(id: string) {
  const p = loadProgress();
  if (!p.colors.includes(id)) {
    p.colors.push(id);
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function markFruit(id: string) {
  const p = loadProgress();
  if (!(p.fruits ?? []).includes(id)) {
    p.fruits = [...(p.fruits ?? []), id];
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function markBody(id: string) {
  const p = loadProgress();
  if (!(p.body ?? []).includes(id)) {
    p.body = [...(p.body ?? []), id];
    p.stars += 1;
  }
  saveProgress(p);
  return p;
}

export function updateStreak(): number {
  const p = loadProgress();
  const today = new Date().toDateString();
  if (p.lastVisitDate === today) return p.streak ?? 1;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  p.streak = p.lastVisitDate === yesterday ? (p.streak ?? 1) + 1 : 1;
  p.lastVisitDate = today;
  saveProgress(p);
  return p.streak;
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

export function addQuizScore(n: number) {
  const p = loadProgress();
  p.quizScore = (p.quizScore ?? 0) + n;
  p.stars += n;
  saveProgress(p);
  return p;
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(KEY); } catch { /* noop */ }
}
