import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { markLetter } from "@/lib/progress";

export const Route = createFileRoute("/abc")({
  head: () => ({
    meta: [
      { title: "ABC — Tiny Genius" },
      { name: "description", content: "Learn letters A to Z with sounds, pictures and playful animations." },
    ],
  }),
  component: ABC,
});

const LETTERS: { letter: string; word: string; emoji: string; gradient: string }[] = [
  { letter: "A", word: "Apple", emoji: "🍎", gradient: "bg-gradient-abc" },
  { letter: "B", word: "Ball", emoji: "⚽", gradient: "bg-gradient-numbers" },
  { letter: "C", word: "Cat", emoji: "🐱", gradient: "bg-gradient-shapes" },
  { letter: "D", word: "Dog", emoji: "🐶", gradient: "bg-gradient-tracing" },
  { letter: "E", word: "Elephant", emoji: "🐘", gradient: "bg-gradient-colors" },
  { letter: "F", word: "Fish", emoji: "🐟", gradient: "bg-gradient-animals" },
  { letter: "G", word: "Grapes", emoji: "🍇", gradient: "bg-gradient-abc" },
  { letter: "H", word: "Hat", emoji: "🎩", gradient: "bg-gradient-numbers" },
  { letter: "I", word: "Ice cream", emoji: "🍦", gradient: "bg-gradient-shapes" },
  { letter: "J", word: "Juice", emoji: "🧃", gradient: "bg-gradient-tracing" },
  { letter: "K", word: "Kite", emoji: "🪁", gradient: "bg-gradient-colors" },
  { letter: "L", word: "Lion", emoji: "🦁", gradient: "bg-gradient-animals" },
  { letter: "M", word: "Moon", emoji: "🌙", gradient: "bg-gradient-abc" },
  { letter: "N", word: "Nest", emoji: "🪺", gradient: "bg-gradient-numbers" },
  { letter: "O", word: "Orange", emoji: "🍊", gradient: "bg-gradient-shapes" },
  { letter: "P", word: "Panda", emoji: "🐼", gradient: "bg-gradient-tracing" },
  { letter: "Q", word: "Queen", emoji: "👑", gradient: "bg-gradient-colors" },
  { letter: "R", word: "Rainbow", emoji: "🌈", gradient: "bg-gradient-animals" },
  { letter: "S", word: "Sun", emoji: "☀️", gradient: "bg-gradient-abc" },
  { letter: "T", word: "Tree", emoji: "🌳", gradient: "bg-gradient-numbers" },
  { letter: "U", word: "Umbrella", emoji: "☂️", gradient: "bg-gradient-shapes" },
  { letter: "V", word: "Van", emoji: "🚐", gradient: "bg-gradient-tracing" },
  { letter: "W", word: "Whale", emoji: "🐳", gradient: "bg-gradient-colors" },
  { letter: "X", word: "Xylophone", emoji: "🎹", gradient: "bg-gradient-animals" },
  { letter: "Y", word: "Yo-yo", emoji: "🪀", gradient: "bg-gradient-abc" },
  { letter: "Z", word: "Zebra", emoji: "🦓", gradient: "bg-gradient-numbers" },
];

function ABC() {
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);
  const item = LETTERS[idx];

  // Particles
  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    emoji: ["⭐", "✨", "💖", "🌟"][i % 4],
  })), [burst]);

  useEffect(() => {
    haptic();
    pop();
    const t = setTimeout(() => speak(`${item.letter}. ${item.word}.`), 150);
    return () => clearTimeout(t);
  }, [item.letter, item.word]);

  function handleTap() {
    haptic(20);
    chime();
    setBurst((b) => b + 1);
    markLetter(item.letter);
    speak(`${item.letter} is for ${item.word}!`);
  }

  function next() {
    setIdx((i) => (i + 1) % LETTERS.length);
  }
  function prev() {
    setIdx((i) => (i - 1 + LETTERS.length) % LETTERS.length);
  }

  return (
    <main className={`min-h-screen ${item.gradient} flex flex-col select-none transition-colors duration-500`}>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link
          to="/"
          className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95 transition-transform"
          aria-label="Back home"
        >
          🏠
        </Link>
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold text-foreground">
          {idx + 1} / {LETTERS.length}
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Particle burst */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute text-3xl"
              style={{
                animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both",
                transform: `translate(${p.x}px, ${p.y}px)`,
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleTap}
          aria-label={`Letter ${item.letter} for ${item.word}`}
          className="relative bg-white rounded-[48px] size-64 sm:size-80 flex items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in"
          key={item.letter}
        >
          <span className="text-[14rem] sm:text-[18rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent">
            {item.letter}
          </span>
        </button>

        <div className="mt-8 flex items-center gap-4 bg-white/95 rounded-full pl-3 pr-6 py-3 shadow-pop animate-pop-in">
          <span className="text-5xl animate-wiggle" aria-hidden>{item.emoji}</span>
          <span className="text-3xl font-extrabold text-foreground">{item.word}</span>
        </div>
      </section>

      {/* Big nav arrows */}
      <nav className="flex items-center justify-between px-6 pb-8 pt-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous letter"
          className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90 transition-transform"
        >
          ⬅️
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next letter"
          className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90 transition-transform"
        >
          ➡️
        </button>
      </nav>
    </main>
  );
}
