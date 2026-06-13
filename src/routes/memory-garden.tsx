import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, chime, haptic, pop } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, ANIMALS_DATA, FRUITS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { LevelPicker, type Level } from "@/components/LevelPicker";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/memory-garden")({
  head: () => ({
    meta: [
      { title: "Memory Garden — Tiny Genius" },
      { name: "description", content: "Flip and match pairs!" },
    ],
  }),
  component: MemoryGarden,
});

const PAIRS: Record<Level, number> = { easy: 3, medium: 6, hard: 8 };

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function MemoryGarden() {
  const lang = useLang();
  const [level, setLevel] = useState<Level>("easy");
  const pool = useMemo(() => [...ANIMALS_DATA, ...FRUITS_DATA.map((f) => ({ id: f.id, emoji: f.emoji, en: f.en, hi: f.hi }))], []);

  const make = useMemo(() => () => {
    const picks = shuffle(pool).slice(0, PAIRS[level]);
    return shuffle(picks.flatMap((p) => [p, p])).map((p, i) => ({ ...p, key: i }));
  }, [level, pool]);

  const [cards, setCards] = useState(make);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => { setCards(make()); setFlipped([]); setMatched([]); setMoves(0); }, [level, make]);

  const handleFlip = (idx: number) => {
    if (matched.includes(idx) || flipped.includes(idx) || flipped.length === 2) return;
    haptic(); pop();
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].id === cards[b].id) {
        chime();
        speak(lang === "hi" ? cards[a].hi : cards[a].en);
        setTimeout(() => {
          const newMatched = [...matched, a, b];
          setMatched(newMatched);
          setFlipped([]);
          if (newMatched.length === cards.length) {
            celebrate("big");
            const bonus = Math.max(10, PAIRS[level] * 5 - moves);
            addStars(bonus);
            speak(t("complete", lang));
          }
        }, 500);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  const isComplete = matched.length === cards.length && cards.length > 0;
  const cols = PAIRS[level] <= 3 ? "grid-cols-3" : PAIRS[level] <= 6 ? "grid-cols-4" : "grid-cols-4";

  return (
    <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-mint/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("memoryGarden", lang)}</h1>
        <LangToggle />
      </header>

      <div className="flex justify-center mt-4">
        <LevelPicker level={level} onChange={setLevel} />
      </div>

      <section className="px-4 mt-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 text-sm font-bold">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">🎵 {moves}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">✨ {matched.length / 2}/{cards.length / 2}</span>
        </div>

        {isComplete ? (
          <div className="py-10">
            <p className="text-7xl mb-3 animate-bounce-big">🎉</p>
            <h2 className="text-2xl font-extrabold mb-2">{t("complete", lang)}!</h2>
            <button onClick={() => setCards(make())} className="mt-4 rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
              🔄 {t("playAgain", lang)}
            </button>
          </div>
        ) : (
          <div className={`grid ${cols} gap-2 max-w-sm mx-auto`}>
            {cards.map((card, idx) => {
              const isUp = flipped.includes(idx) || matched.includes(idx);
              return (
                <button
                  key={card.key}
                  onClick={() => handleFlip(idx)}
                  disabled={isUp}
                  className={`aspect-square rounded-xl shadow-pop active:scale-95 transition-all font-bold text-3xl ${
                    matched.includes(idx)
                      ? "bg-mint/40 border-2 border-mint scale-95 opacity-70"
                      : isUp
                      ? "bg-white border-2 border-primary"
                      : "bg-gradient-animals text-white border-2 border-white"
                  }`}
                >
                  {isUp ? card.emoji : "🌿"}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
