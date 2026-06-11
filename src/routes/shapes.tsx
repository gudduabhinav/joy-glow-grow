import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { SHAPES_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/shapes")({
  head: () => ({
    meta: [
      { title: "Shapes — Tiny Genius" },
      { name: "description", content: "Learn shapes in English and Hindi." },
    ],
  }),
  component: Shapes,
});

function ShapeSvg({ kind, color = "#fff" }: { kind: string; color?: string }) {
  const common = { fill: color, stroke: "rgba(0,0,0,0.15)", strokeWidth: 6 };
  switch (kind) {
    case "circle": return <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" {...common} /></svg>;
    case "square": return <svg viewBox="0 0 200 200"><rect x="25" y="25" width="150" height="150" rx="14" {...common} /></svg>;
    case "triangle": return <svg viewBox="0 0 200 200"><polygon points="100,25 180,175 20,175" {...common} /></svg>;
    case "star": return <svg viewBox="0 0 200 200"><polygon points="100,15 123,75 188,80 138,122 155,185 100,150 45,185 62,122 12,80 77,75" {...common} /></svg>;
    case "heart": return <svg viewBox="0 0 200 200"><path d="M100 175 C30 130 20 80 55 55 C85 35 100 70 100 70 C100 70 115 35 145 55 C180 80 170 130 100 175 Z" {...common} /></svg>;
    case "rectangle": return <svg viewBox="0 0 200 200"><rect x="15" y="55" width="170" height="90" rx="12" {...common} /></svg>;
    default: return null;
  }
}

function Shapes() {
  const lang = useLang();
  const [idx, setIdx] = useState(0);
  const s = SHAPES_DATA[idx];

  useEffect(() => {
    haptic(); pop();
    const t = setTimeout(() => speak(lang === "hi" ? s.hi : s.en), 150);
    return () => clearTimeout(t);
  }, [s, lang]);

  function tap() {
    haptic(20); chime(); addStars(1);
    speak(lang === "hi" ? `${s.hi}` : `${s.en}!`);
  }

  return (
    <main className="min-h-screen bg-gradient-shapes flex flex-col select-none">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold">{idx + 1}/{SHAPES_DATA.length}</div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6">
        <button
          type="button"
          onClick={tap}
          key={s.id}
          aria-label={s.en}
          className="size-64 sm:size-80 bg-white rounded-[48px] shadow-pop flex items-center justify-center active:scale-95 transition-transform animate-pop-in p-8"
        >
          <div className="size-full text-primary"><ShapeSvg kind={s.svg} color="currentColor" /></div>
        </button>
        <div className="mt-8 bg-white/95 rounded-full px-6 py-3 shadow-pop animate-pop-in flex items-center gap-3">
          <span className="text-3xl font-extrabold">{lang === "hi" ? s.hi : s.en}</span>
          <span className="text-base font-bold text-muted-foreground">{lang === "hi" ? s.en : s.hi}</span>
        </div>
      </section>

      <nav className="flex items-center justify-between px-6 pb-8 pt-4">
        <button type="button" onClick={() => setIdx((i) => (i - 1 + SHAPES_DATA.length) % SHAPES_DATA.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Previous">⬅️</button>
        <button type="button" onClick={() => setIdx((i) => (i + 1) % SHAPES_DATA.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Next">➡️</button>
      </nav>
    </main>
  );
}
