import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { NUMBERS_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/numbers")({
  head: () => ({
    meta: [
      { title: "Numbers — Tiny Genius" },
      { name: "description", content: "Count 1 to 10 in English and Hindi with cute pictures." },
    ],
  }),
  component: Numbers,
});

function Numbers() {
  const lang = useLang();
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);
  const item = NUMBERS_DATA[idx];

  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
  })), [burst]);

  useEffect(() => {
    haptic(); pop();
    const t = setTimeout(() => speak(lang === "hi" ? item.hi : item.en), 150);
    return () => clearTimeout(t);
  }, [item, lang]);

  function tap() {
    haptic(20); chime();
    addStars(1);
    setBurst((b) => b + 1);
    speak(lang === "hi" ? `${item.hi}` : `${item.n}, ${item.en}`);
  }

  return (
    <main className="min-h-screen bg-gradient-numbers flex flex-col select-none">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold">{idx + 1}/{NUMBERS_DATA.length}</div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <span key={p.id} className="absolute text-3xl" style={{ animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }}>⭐</span>
          ))}
        </div>

        <button
          type="button"
          onClick={tap}
          aria-label={`Number ${item.n}`}
          key={item.n}
          className="relative bg-white rounded-[48px] size-64 sm:size-80 flex flex-col items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in"
        >
          <span className="text-[12rem] sm:text-[16rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent">
            {lang === "hi" ? item.hiNum : item.n}
          </span>
        </button>

        <div className="mt-6 flex items-center gap-3 bg-white/95 rounded-full pl-3 pr-6 py-3 shadow-pop animate-pop-in">
          <span className="text-4xl animate-wiggle">{item.emoji}</span>
          <span className="text-2xl font-extrabold">{lang === "hi" ? item.hi : item.en}</span>
          <span className="text-base font-bold text-muted-foreground">
            {lang === "hi" ? `(${item.en})` : `(${item.hi})`}
          </span>
        </div>

        {/* Counting row */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-sm">
          {Array.from({ length: item.n }).map((_, i) => (
            <span key={i} className="text-3xl animate-pop-in" style={{ animationDelay: `${i * 60}ms` }}>{item.emoji}</span>
          ))}
        </div>
      </section>

      <nav className="flex items-center justify-between px-6 pb-8 pt-4">
        <button type="button" onClick={() => setIdx((i) => (i - 1 + NUMBERS_DATA.length) % NUMBERS_DATA.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Previous">⬅️</button>
        <button type="button" onClick={() => setIdx((i) => (i + 1) % NUMBERS_DATA.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Next">➡️</button>
      </nav>
    </main>
  );
}
