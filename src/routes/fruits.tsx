import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { markFruit } from "@/lib/progress";
import { FRUITS_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/fruits")({
  head: () => ({
    meta: [
      { title: "Fruits — Tiny Genius" },
      { name: "description", content: "Learn fruits and vegetables in English and Hindi." },
    ],
  }),
  component: Fruits,
});

function Fruits() {
  const lang = useLang();
  const [active, setActive] = useState<string | null>(null);

  function tap(f: typeof FRUITS_DATA[number]) {
    haptic(); pop(); chime();
    setActive(f.id);
    markFruit(f.id);
    speak(lang === "hi" ? f.hi : f.en);
    setTimeout(() => setActive(null), 700);
  }

  return (
    <main className="min-h-screen bg-gradient-animals flex flex-col select-none"
      style={{ background: "linear-gradient(135deg, #f9a825, #ff7043)" }}>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <span className="size-14" />
      </header>

      <section className="flex-1 px-4 py-6">
        <h1 className="text-center text-3xl font-extrabold text-white drop-shadow mb-6">
          {lang === "hi" ? "फल छुओ! 🍎" : "Tap a fruit! 🍎"}
        </h1>
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {FRUITS_DATA.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => tap(f)}
              aria-label={f.en}
              className={`bg-white rounded-3xl p-3 shadow-pop flex flex-col items-center active:scale-95 transition-transform
                ${active === f.id ? "ring-4 ring-yellow-400 animate-pop-in" : ""}`}
            >
              <span className={`text-5xl ${active === f.id ? "animate-bounce-big" : "animate-float-y"}`}>{f.emoji}</span>
              <span className="mt-2 text-sm font-extrabold text-slate-800 text-center leading-tight">
                {lang === "hi" ? f.hi : f.en}
              </span>
              {lang === "hi" && (
                <span className="text-xs text-slate-400 font-semibold">{f.en}</span>
              )}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
