import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { speak, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, FRUITS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/puzzle-slide")({
  head: () => ({
    meta: [
      { title: "Puzzle Slide — Tiny Genius" },
      { name: "description", content: "Slide and solve the puzzle." },
    ],
  }),
  component: PuzzleSlide,
});

function PuzzleSlide() {
  const lang = useLang();
  const item = useMemo(() => FRUITS_DATA[Math.floor(Math.random() * FRUITS_DATA.length)], []);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [tiles, setTiles] = useState<(number | null)[]>(() => {
    const arr = Array.from({ length: 9 }, (_, i) => i);
    return arr.sort(() => Math.random() - 0.5);
  });

  const emptyIdx = tiles.indexOf(null);

  const canSwap = (idx: number) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;
    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const handleTap = (idx: number) => {
    if (!canSwap(idx)) return;
    haptic();

    const newTiles = [...tiles];
    [newTiles[idx], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[idx]];
    setTiles(newTiles);
    setMoves((m) => m + 1);

    if (newTiles.every((t, i) => t === i)) {
      chime();
      speak(t("complete", lang));
      addStars(Math.max(5, 30 - moves));
      setSolved(true);
    }
  };

  if (solved) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-mint/10 flex items-center justify-center pb-12">
        <div className="text-center">
          <p className="text-7xl mb-4">🎉</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("complete", lang)}!</h1>
          <p className="text-lg text-primary font-bold mb-2">🎵 {moves} moves</p>
          <p className="text-lg text-primary font-bold mb-8">⭐ {Math.max(5, 30 - moves)}</p>
          <Link to="/puzzle-slide" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
            🔄 Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-mint/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("puzzleSlide", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-4">{t("puzzleSlideDesc", lang)}</p>
        <p className="text-2xl font-extrabold text-primary mb-6">🎵 {moves}</p>

        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {tiles.map((tile, idx) => (
            <button
              key={idx}
              onClick={() => handleTap(idx)}
              disabled={!canSwap(idx)}
              className={`aspect-square rounded-xl shadow-pop active:scale-95 transition-transform font-bold text-2xl ${
                tile === null
                  ? "bg-transparent"
                  : "bg-gradient-shapes text-white border-2 border-white"
              }`}
            >
              {tile !== null ? (tile + 1) : ""}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
