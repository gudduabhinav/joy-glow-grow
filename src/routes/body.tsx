import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { markBody } from "@/lib/progress";
import { BODY_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/body")({
  head: () => ({
    meta: [
      { title: "Body Parts — Tiny Genius" },
      { name: "description", content: "Learn body parts in English and Hindi." },
    ],
  }),
  component: Body,
});

function Body() {
  const lang = useLang();
  const [active, setActive] = useState<string | null>(null);

  function tap(b: typeof BODY_DATA[number]) {
    haptic(20); pop(); chime();
    setActive(b.id);
    markBody(b.id);
    const text = lang === "hi"
      ? `यह है ${b.hi}!`
      : `This is your ${b.en}!`;
    speak(text);
    setTimeout(() => setActive(null), 800);
  }

  return (
    <main className="min-h-screen flex flex-col select-none"
      style={{ background: "linear-gradient(135deg, #ce93d8, #f48fb1)" }}>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <span className="size-14" />
      </header>

      <section className="flex-1 px-4 py-6">
        <h1 className="text-center text-3xl font-extrabold text-white drop-shadow mb-6">
          {lang === "hi" ? "शरीर के अंग छुओ! 👁️" : "Tap body parts! 👁️"}
        </h1>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {BODY_DATA.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => tap(b)}
              aria-label={b.en}
              className={`bg-white rounded-3xl p-5 shadow-pop flex flex-col items-center active:scale-95 transition-transform
                ${active === b.id ? "ring-4 ring-purple-400 scale-105" : ""}`}
            >
              <span className={`text-6xl ${active === b.id ? "animate-bounce-big" : "animate-wiggle"}`}>{b.emoji}</span>
              <span className="mt-3 text-xl font-extrabold text-slate-800">
                {lang === "hi" ? b.hi : b.en}
              </span>
              <span className="text-sm font-semibold text-slate-400 mt-0.5">
                {lang === "hi" ? b.en : b.hi}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
