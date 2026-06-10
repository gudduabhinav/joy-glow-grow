// Tiny Genius audio helpers — uses Web Speech API for narration.
// Works offline once the OS has voices installed (true on iOS/Android/macOS/Windows).

let cachedVoices: SpeechSynthesisVoice[] | null = null;

function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  if (cachedVoices && cachedVoices.length) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export function speak(text: string, opts: { rate?: number; pitch?: number; lang?: string } = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 0.85;
    u.pitch = opts.pitch ?? 1.3;
    u.lang = opts.lang ?? "en-US";
    const voices = getVoices();
    // Prefer a child-friendly or female voice if available
    const preferred = voices.find((v) => /child|kid|samantha|karen|google.*female/i.test(v.name))
      ?? voices.find((v) => v.lang.startsWith(u.lang));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  } catch {
    /* no-op */
  }
}

// Simple synthesized "pop" / "ding" using Web Audio — no asset download needed.
let audioCtx: AudioContext | null = null;
function ctx() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  return audioCtx;
}

export function pop() {
  const c = ctx();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(660, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(990, c.currentTime + 0.12);
  g.gain.setValueAtTime(0.001, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.25, c.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.2);
  o.connect(g).connect(c.destination);
  o.start();
  o.stop(c.currentTime + 0.22);
}

export function chime() {
  const c = ctx();
  if (!c) return;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, c.currentTime + i * 0.1);
    g.gain.exponentialRampToValueAtTime(0.2, c.currentTime + i * 0.1 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + i * 0.1 + 0.4);
    o.connect(g).connect(c.destination);
    o.start(c.currentTime + i * 0.1);
    o.stop(c.currentTime + i * 0.1 + 0.45);
  });
}

export function haptic(ms = 15) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(ms); } catch { /* noop */ }
  }
}
