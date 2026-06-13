import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, chime, haptic, pop } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, FRUITS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { LevelPicker, type Level } from "@/components/LevelPicker";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/puzzle-slide")({
  head: () => ({
    meta: [
      { title: "Puzzle Slide — Tiny Genius" },
      { name: "description", content: "Slide and solve the puzzle." },
    ],
  }),
  component: PuzzleSlide,
});

const SIZE: Record<Level, number> = { easy: 2, medium: 3, hard: 4 };

function makeTiles(n: number): (number | null)[] {
  const arr: (number | null)[] = Array.from({ length: n * n - 1 }, (_, i) => i);
  arr.push(null);
  // Do simple shuffle by random valid moves (always solvable)
  let tiles = arr.slice();
  for (let i = 0; i < 80 * n; i++) {
    const empty = tiles.indexOf(null);
    const er = Math.floor(empty / n), ec = empty % n;
    const neighbors = [
      [er - 1, ec], [er + 1, ec], [er, ec - 1], [er, ec + 1],
    ].filter(([r, c]) => r >= 0 && r < n && c >= 0 && c < n);
    const [r, c] = neighbors[Math.floor(Math.random() * neighbors.length)];
    const swap = r * n + c;
    [tiles[empty], tiles[swap]] = [tiles[swap], tiles[empty]];
  }
  return tiles;
}

function PuzzleSlide() {
  const lang = useLang();
  const [level, setLevel] = useState<Level>("easy");
  const n = SIZE[level];
  const item = useMemo(() => FRUITS_DATA[Math.floor(Math.random() * FRUITS_DATA.length)], [level]);
  const [tiles, setTiles] = useState<(number | null)[]>(() => makeTiles(n));
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => { setTiles(makeTiles(n)); setMoves(0); setSolved(false); }, [n, level]);

  const emptyIdx = tiles.indexOf(null);
  const canSwap = (idx: number) => {
    const r = Math.floor(idx / n), c = idx % n;
    const er = Math.floor(emptyIdx / n), ec = emptyIdx % n;
    return (Math.abs(r - er) === 1 && c === ec) || (Math.abs(c - ec) === 1 && r === er);
  };

  const handleTap = (idx: number) => {
    if (!canSwap(idx) || solved) return;
    haptic(); pop();
    const next = [...tiles];
    [next[idx], next[emptyIdx]] = [next[emptyIdx], next[idx]];
    setTiles(next);
    setMoves((m) => m + 1);
    if (next.every((v, i) => (i === next.length - 1 ? v === null : v === i))) {
      chime(); celebrate("big");
      speak(t("complete", lang));
      addStars(Math.max(5, n * n * 4 - moves));
      setSolved(true);
    }
  };

  const cols = n === 2 ? "grid-cols-2" : n === 3 ? "grid-cols-3" : "grid-cols-4";

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-mint/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("puzzleSlide", lang)}</h1>
        <LangToggle />
      </header>

      <div className="flex justify-center mt-4">
        <LevelPicker level={level} onChange={setLevel} />
      </div>

      <section className="px-4 mt-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 text-sm font-bold">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">🎵 {moves}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">{item.emoji} {lang === "hi" ? item.hi : item.en}</span>
        </div>

        {solved ? (
          <div className="py-10">
            <p className="text-7xl mb-3 animate-bounce-big">🎉</p>
            <h2 className="text-2xl font-extrabold mb-2">{t("complete", lang)}!</h2>
            <p className="text-base text-primary font-bold">⭐ {Math.max(5, n * n * 4 - moves)}</p>
            <button onClick={() => { setTiles(makeTiles(n)); setMoves(0); setSolved(false); }} className="mt-6 rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
              🔄 {t("playAgain", lang)}
            </button>
          </div>
        ) : (
          <div className={`grid ${cols} gap-2 max-w-xs mx-auto`}>
            {tiles.map((tile, idx) => (
              <button
                key={idx}
                onClick={() => handleTap(idx)}
                disabled={!canSwap(idx)}
                className={`aspect-square rounded-xl shadow-pop active:scale-95 transition-transform font-extrabold text-3xl flex items-center justify-center ${
                  tile === null
                    ? "bg-transparent shadow-none"
                    : canSwap(idx)
                    ? "bg-gradient-shapes text-white border-2 border-white"
                    : "bg-gradient-shapes/70 text-white border-2 border-white/50"
                }`}
              >
                {tile !== null ? <>{item.emoji}<span className="text-xs">{tile + 1}</span></> : ""}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
