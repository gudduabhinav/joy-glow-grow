import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { LevelPicker, type Level } from "@/components/LevelPicker";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/peek-a-buddy")({
  head: () => ({
    meta: [
      { title: "Peek-a-Buddy — Tiny Genius" },
      { name: "description", content: "Find the hiding buddy game." },
    ],
  }),
  component: PeekABuddy,
});

const BOXES: Record<Level, number> = { easy: 4, medium: 9, hard: 16 };

function PeekABuddy() {
  const lang = useLang();
  const [level, setLevel] = useState<Level>("easy");
  const [buddy, setBuddy] = useState(0);
  const [revealed, setRevealed] = useState<number | null>(null);
  const [found, setFound] = useState(0);
  const [streak, setStreak] = useState(0);
  const n = BOXES[level];

  const nextRound = () => {
    setRevealed(null);
    setBuddy(Math.floor(Math.random() * n));
  };

  useEffect(() => { setBuddy(Math.floor(Math.random() * n)); setRevealed(null); }, [n]);

  const handleBoxClick = (idx: number) => {
    if (revealed !== null) return;
    setRevealed(idx);
    haptic(); pop();
    if (idx === buddy) {
      chime();
      const bonus = 3 + (streak >= 2 ? 3 : 0);
      addStars(bonus);
      setFound((f) => f + 1);
      setStreak((s) => s + 1);
      celebrate(streak >= 2 ? "big" : "small");
      speak(t("found", lang));
      setTimeout(nextRound, 1100);
    } else {
      speak(t("tryAgain", lang));
      setStreak(0);
      setTimeout(() => setRevealed(null), 800);
    }
  };

  const cols = n <= 4 ? "grid-cols-2" : n <= 9 ? "grid-cols-3" : "grid-cols-4";

  return (
    <main className="min-h-screen bg-gradient-to-br from-bubblegum/20 via-background to-sunshine/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold text-center flex-1">{t("peekABuddy", lang)}</h1>
        <LangToggle />
      </header>

      <div className="flex justify-center mt-4">
        <LevelPicker level={level} onChange={(l) => { setLevel(l); setFound(0); setStreak(0); }} />
      </div>

      <section className="px-4 mt-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 text-sm font-bold">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">⭐ {found}</span>
          {streak >= 2 && <span className="rounded-full bg-gradient-hero text-white px-3 py-1 shadow-pop animate-pulse">🔥 x{streak}</span>}
        </div>

        <div className={`grid ${cols} gap-3 max-w-sm mx-auto`}>
          {Array.from({ length: n }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleBoxClick(idx)}
              disabled={revealed !== null}
              className={`aspect-square rounded-2xl font-extrabold text-4xl shadow-pop transition-all active:scale-95 ${
                revealed === idx && idx === buddy
                  ? "bg-gradient-hero text-white scale-110"
                  : revealed === idx
                  ? "bg-destructive/80 text-white"
                  : "bg-white/80 hover:bg-white border-2 border-primary/20"
              }`}
            >
              {revealed === idx ? (idx === buddy ? "😊" : "❌") : ""}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
