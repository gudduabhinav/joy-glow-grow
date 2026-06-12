import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, chime, haptic, pop } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, ANIMALS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/memory-garden")({
  head: () => ({
    meta: [
      { title: "Memory Garden — Tiny Genius" },
      { name: "description", content: "Flip and match pairs!" },
    ],
  }),
  component: MemoryGarden,
});

function MemoryGarden() {
  const lang = useLang();
  const animals = useMemo(
    () => ANIMALS_DATA.slice(0, 4).flatMap((a) => [a, a]).sort(() => Math.random() - 0.5),
    []
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleFlip = (idx: number) => {
    if (matched.includes(idx) || flipped.includes(idx)) return;
    haptic();

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      const id1 = animals[newFlipped[0]].id;
      const id2 = animals[newFlipped[1]].id;

      if (id1 === id2) {
        chime();
        setMatched([...matched, newFlipped[0], newFlipped[1]]);
        setFlipped([]);

        if (matched.length + 2 === animals.length) {
          speak(t("complete", lang));
          addStars(20);
        }
      } else {
        pop();
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isComplete = matched.length === animals.length;

  if (isComplete) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-mint/10 flex items-center justify-center pb-12">
        <div className="text-center">
          <p className="text-7xl mb-4">🎉</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("complete", lang)}!</h1>
          <p className="text-lg text-primary font-bold mb-2">🎵 {moves} moves</p>
          <p className="text-lg text-primary font-bold mb-8">⭐ 20</p>
          <Link to="/memory-garden" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
            🔄 Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-mint/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("memoryGarden", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-4">{t("memoryGardenDesc", lang)}</p>
        <p className="text-xl font-bold text-primary mb-6">🎵 {moves}</p>

        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {animals.map((animal, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            return (
              <button
                key={idx}
                onClick={() => handleFlip(idx)}
                disabled={isFlipped}
                className={`aspect-square rounded-lg shadow-pop active:scale-95 transition-transform font-bold text-2xl ${
                  isFlipped
                    ? "bg-white/80 border-2 border-primary/30"
                    : "bg-gradient-animals text-white border-2 border-white"
                }`}
              >
                {isFlipped ? animal.emoji : "🌿"}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
