import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { markLetter } from "@/lib/progress";
import { HINDI_LETTERS, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/abc")({
  head: () => ({
    meta: [
      { title: "ABC — Tiny Genius" },
      { name: "description", content: "Learn letters A–Z and Hindi क ख ग with sounds and pictures." },
    ],
  }),
  component: ABC,
});

const ENGLISH_LETTERS: { letter: string; word: string; wordEn: string; emoji: string; gradient: string }[] = [
  { letter: "A", word: "Apple", wordEn: "Apple", emoji: "🍎", gradient: "bg-gradient-abc" },
  { letter: "B", word: "Ball", wordEn: "Ball", emoji: "⚽", gradient: "bg-gradient-numbers" },
  { letter: "C", word: "Cat", wordEn: "Cat", emoji: "🐱", gradient: "bg-gradient-shapes" },
  { letter: "D", word: "Dog", wordEn: "Dog", emoji: "🐶", gradient: "bg-gradient-tracing" },
  { letter: "E", word: "Elephant", wordEn: "Elephant", emoji: "🐘", gradient: "bg-gradient-colors" },
  { letter: "F", word: "Fish", wordEn: "Fish", emoji: "🐟", gradient: "bg-gradient-animals" },
  { letter: "G", word: "Grapes", wordEn: "Grapes", emoji: "🍇", gradient: "bg-gradient-abc" },
  { letter: "H", word: "Hat", wordEn: "Hat", emoji: "🎩", gradient: "bg-gradient-numbers" },
  { letter: "I", word: "Ice cream", wordEn: "Ice cream", emoji: "🍦", gradient: "bg-gradient-shapes" },
  { letter: "J", word: "Juice", wordEn: "Juice", emoji: "🧃", gradient: "bg-gradient-tracing" },
  { letter: "K", word: "Kite", wordEn: "Kite", emoji: "🪁", gradient: "bg-gradient-colors" },
  { letter: "L", word: "Lion", wordEn: "Lion", emoji: "🦁", gradient: "bg-gradient-animals" },
  { letter: "M", word: "Moon", wordEn: "Moon", emoji: "🌙", gradient: "bg-gradient-abc" },
  { letter: "N", word: "Nest", wordEn: "Nest", emoji: "🪺", gradient: "bg-gradient-numbers" },
  { letter: "O", word: "Orange", wordEn: "Orange", emoji: "🍊", gradient: "bg-gradient-shapes" },
  { letter: "P", word: "Panda", wordEn: "Panda", emoji: "🐼", gradient: "bg-gradient-tracing" },
  { letter: "Q", word: "Queen", wordEn: "Queen", emoji: "👑", gradient: "bg-gradient-colors" },
  { letter: "R", word: "Rainbow", wordEn: "Rainbow", emoji: "🌈", gradient: "bg-gradient-animals" },
  { letter: "S", word: "Sun", wordEn: "Sun", emoji: "☀️", gradient: "bg-gradient-abc" },
  { letter: "T", word: "Tree", wordEn: "Tree", emoji: "🌳", gradient: "bg-gradient-numbers" },
  { letter: "U", word: "Umbrella", wordEn: "Umbrella", emoji: "☂️", gradient: "bg-gradient-shapes" },
  { letter: "V", word: "Van", wordEn: "Van", emoji: "🚐", gradient: "bg-gradient-tracing" },
  { letter: "W", word: "Whale", wordEn: "Whale", emoji: "🐳", gradient: "bg-gradient-colors" },
  { letter: "X", word: "Xylophone", wordEn: "Xylophone", emoji: "🎹", gradient: "bg-gradient-animals" },
  { letter: "Y", word: "Yo-yo", wordEn: "Yo-yo", emoji: "🪀", gradient: "bg-gradient-abc" },
  { letter: "Z", word: "Zebra", wordEn: "Zebra", emoji: "🦓", gradient: "bg-gradient-numbers" },
];

function ABC() {
  const lang = useLang();
  const LETTERS = lang === "hi" ? HINDI_LETTERS : ENGLISH_LETTERS;
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);
  const safeIdx = idx % LETTERS.length;
  const item = LETTERS[safeIdx];

  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    emoji: ["⭐", "✨", "💖", "🌟"][i % 4],
  })), [burst]);

  useEffect(() => {
    haptic(); pop();
    const t = setTimeout(() => speak(`${item.letter}. ${item.word}.`), 150);
    return () => clearTimeout(t);
  }, [item.letter, item.word, lang]);

  function handleTap() {
    haptic(20); chime();
    setBurst((b) => b + 1);
    markLetter(item.letter);
    if (lang === "hi") speak(`${item.letter} से ${item.word}`);
    else speak(`${item.letter} is for ${item.word}!`);
  }

  return (
    <main className={`min-h-screen ${item.gradient} flex flex-col select-none transition-colors duration-500`}>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold">{safeIdx + 1} / {LETTERS.length}</div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <span key={p.id} className="absolute text-3xl" style={{ animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }}>
              {p.emoji}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleTap}
          aria-label={`${item.letter} for ${item.word}`}
          key={`${lang}-${item.letter}`}
          className="relative bg-white rounded-[48px] size-64 sm:size-80 flex items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in"
        >
          <span className="text-[12rem] sm:text-[16rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent">
            {item.letter}
          </span>
        </button>

        <div className="mt-8 flex items-center gap-4 bg-white/95 rounded-full pl-3 pr-6 py-3 shadow-pop animate-pop-in">
          <span className="text-5xl animate-wiggle">{item.emoji}</span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-2xl font-extrabold">{item.word}</span>
            {lang === "hi" && <span className="text-xs font-bold text-muted-foreground">{item.wordEn}</span>}
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-between px-6 pb-8 pt-4">
        <button type="button" onClick={() => setIdx((i) => (i - 1 + LETTERS.length) % LETTERS.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Previous">⬅️</button>
        <button type="button" onClick={() => setIdx((i) => (i + 1) % LETTERS.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Next">➡️</button>
      </nav>
    </main>
  );
}
