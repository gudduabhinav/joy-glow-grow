import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { COLORS_DATA, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Colors — Tiny Genius" },
      { name: "description", content: "Tap to learn colors in English and Hindi." },
    ],
  }),
  component: Colors,
});

function Colors() {
  const lang = useLang();
  const [picked, setPicked] = useState<string | null>(null);

  function tap(id: string, en: string, hi: string) {
    haptic(); pop();
    setPicked(id);
    addStars(1);
    chime();
    speak(lang === "hi" ? hi : en);
  }

  return (
    <main className="min-h-screen bg-gradient-colors flex flex-col select-none">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl" aria-label="Home">🏠</Link>
        <LangToggle />
        <span className="size-14" />
      </header>

      <section className="flex-1 px-5 py-6">
        <h1 className="text-center text-3xl font-extrabold text-white drop-shadow mb-6">
          {lang === "hi" ? "रंग छुओ!" : "Tap a color!"}
        </h1>
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
          {COLORS_DATA.map((c) => {
            const active = picked === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => tap(c.id, c.en, c.hi)}
                aria-label={c.en}
                className={`relative aspect-square rounded-3xl shadow-pop active:scale-95 transition-transform flex items-end justify-center p-2 ${active ? "ring-4 ring-white animate-pop-in" : ""}`}
                style={{ backgroundColor: c.hex }}
              >
                <span className="text-xs font-extrabold px-2 py-1 rounded-full bg-white/90 text-foreground">
                  {lang === "hi" ? c.hi : c.en}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
