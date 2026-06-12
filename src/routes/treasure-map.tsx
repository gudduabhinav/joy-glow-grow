import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { speak, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/treasure-map")({
  head: () => ({
    meta: [
      { title: "Treasure Map — Tiny Genius" },
      { name: "description", content: "Follow directions to find treasure!" },
    ],
  }),
  component: TreasureMap,
});

const directions = ["left", "right", "up", "down"];

function TreasureMap() {
  const lang = useLang();
  const [path, setPath] = useState<string[]>([]);
  const [pos, setPos] = useState({ x: 1, y: 1 });
  const [found, setFound] = useState(false);
  const targetDir = useMemo(
    () => directions[Math.floor(Math.random() * directions.length)],
    []
  );

  const handleDirection = (dir: string) => {
    haptic();
    const newPath = [...path, dir];
    setPath(newPath);

    let newPos = { ...pos };
    if (dir === "left") newPos.x = Math.max(0, pos.x - 1);
    else if (dir === "right") newPos.x = Math.min(2, pos.x + 1);
    else if (dir === "up") newPos.y = Math.max(0, pos.y - 1);
    else if (dir === "down") newPos.y = Math.min(2, pos.y + 1);

    setPos(newPos);

    if (newPos.x === 2 && newPos.y === 2) {
      chime();
      speak(t("found", lang));
      addStars(10);
      setFound(true);
    }
  };

  if (found) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 flex items-center justify-center pb-12">
        <div className="text-center">
          <p className="text-7xl mb-4">💎</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("found", lang)}!</h1>
          <p className="text-lg text-primary font-bold mb-8">⭐ 10</p>
          <Link to="/treasure-map" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
            🔄 Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("treasureMap", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-6">{t("treasureMapDesc", lang)}</p>

        {/* Map Grid */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
          {Array.from({ length: 9 }).map((_, idx) => {
            const x = idx % 3;
            const y = Math.floor(idx / 3);
            const isPlayer = pos.x === x && pos.y === y;
            const isTarget = x === 2 && y === 2;

            return (
              <div
                key={idx}
                className={`aspect-square rounded-xl shadow-pop flex items-center justify-center font-bold text-2xl ${
                  isTarget
                    ? "bg-yellow-300"
                    : isPlayer
                    ? "bg-gradient-hero text-white"
                    : "bg-white/80 border-2 border-primary/20"
                }`}
              >
                {isPlayer ? "🎯" : isTarget ? "💎" : ""}
              </div>
            );
          })}
        </div>

        {/* Direction Buttons */}
        <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-6">
          <div />
          <button
            onClick={() => handleDirection("up")}
            className="rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl"
          >
            ⬆️
          </button>
          <div />
          <button
            onClick={() => handleDirection("left")}
            className="rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl"
          >
            ⬅️
          </button>
          <button
            onClick={() => handleDirection("down")}
            className="rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl"
          >
            ⬇️
          </button>
          <button
            onClick={() => handleDirection("right")}
            className="rounded-xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 text-2xl"
          >
            ➡️
          </button>
        </div>

        <p className="text-sm text-muted-foreground">Moves: {path.length}</p>
      </section>
    </main>
  );
}
