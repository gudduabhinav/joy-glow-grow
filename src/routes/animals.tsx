import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { markAnimal } from "@/lib/progress";
import { ANIMALS_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/animals")({
  head: () => ({
    meta: [
      { title: "Animals — Tiny Genius" },
      { name: "description", content: "Meet animals and hear their sounds in English and Hindi." },
    ],
  }),
  component: Animals,
});

function Animals() {
  const lang = useLang();
  const [active, setActive] = useState<string | null>(null);

  function tap(a: typeof ANIMALS_DATA[number]) {
    haptic(); pop(); chime();
    setActive(a.id);
    markAnimal(a.id);
    const text = lang === "hi" ? `${a.hi}. ${a.soundHi}` : `${a.en}. ${a.soundEn}`;
    speak(text);
    setTimeout(() => setActive(null), 800);
  }

  return (
    <main className="min-h-screen bg-gradient-animals flex flex-col select-none">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl" aria-label="Home">🏠</Link>
        <LangToggle />
        <span className="size-14" />
      </header>

      <section className="flex-1 px-4 py-6">
        <h1 className="text-center text-3xl font-extrabold text-white drop-shadow mb-6">
          {lang === "hi" ? "जानवर छुओ!" : "Tap an animal!"}
        </h1>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {ANIMALS_DATA.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => tap(a)}
              aria-label={a.en}
              className="relative bg-white rounded-3xl p-4 shadow-pop active:scale-95 transition-transform flex flex-col items-center"
            >
              <span className={`text-7xl ${active === a.id ? "animate-bounce-big" : "animate-float-y"}`}>{a.emoji}</span>
              <span className="mt-2 text-xl font-extrabold">{lang === "hi" ? a.hi : a.en}</span>
              <span className="text-xs font-bold text-muted-foreground">{lang === "hi" ? a.soundHi : a.soundEn}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
