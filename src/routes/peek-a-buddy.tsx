import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/peek-a-buddy")({
  head: () => ({
    meta: [
      { title: "Peek-a-Buddy — Tiny Genius" },
      { name: "description", content: "Find the hiding buddy game." },
    ],
  }),
  component: PeekABuddy,
});

function PeekABuddy() {
  const lang = useLang();
  const [revealed, setRevealed] = useState<number | null>(null);
  const [found, setFound] = useState(0);
  const [boxes] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const buddyBox = Math.floor(Math.random() * boxes.length);

  const handleBoxClick = (idx: number) => {
    setRevealed(idx);
    haptic();
    pop();
    if (idx === buddyBox) {
      speak(t("found", lang));
      chime();
      addStars(3);
      setFound((f) => f + 1);
      setTimeout(() => {
        setRevealed(null);
        const newBuddy = Math.floor(Math.random() * boxes.length);
        // Reset with new buddy
        window.location.reload();
      }, 1500);
    } else {
      speak(t("tryAgain", lang));
      setTimeout(() => setRevealed(null), 800);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-sunshine/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold text-center flex-1">{t("peekABuddy", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold text-foreground mb-2">{t("found", lang)}: <span className="text-3xl text-primary">{found}</span></p>
        <p className="text-base text-muted-foreground mb-8">{t("peekABuddyDesc", lang)}</p>

        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {boxes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleBoxClick(idx)}
              disabled={revealed !== null}
              className={`aspect-square rounded-2xl font-extrabold text-4xl shadow-pop transition-all active:scale-95 ${
                revealed === idx
                  ? "bg-gradient-hero text-white scale-105"
                  : revealed === buddyBox && revealed !== null
                  ? "bg-gradient-hero text-white"
                  : "bg-white/80 hover:bg-white border-2 border-primary/20"
              }`}
            >
              {revealed === idx ? "👋" : revealed === buddyBox && revealed !== null && idx === buddyBox ? "😊" : ""}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
          🏠 {t("home", lang)}
        </Link>
      </div>
    </main>
  );
}
