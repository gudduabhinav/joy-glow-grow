import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/daily-challenge")({
  head: () => ({
    meta: [
      { title: "Daily Challenge — Tiny Genius" },
      { name: "description", content: "One game per day!" },
    ],
  }),
  component: DailyChallenge,
});

const GAMES = [
  { name: "Peek-a-Buddy", to: "/peek-a-buddy", emoji: "👋" },
  { name: "Sound Match", to: "/sound-match", emoji: "🔊" },
  { name: "Color Mix", to: "/color-mix", emoji: "🎨" },
  { name: "Rhythm Tap", to: "/rhythm-tap", emoji: "🎵" },
  { name: "Memory Garden", to: "/memory-garden", emoji: "🌿" },
];

function DailyChallenge() {
  const lang = useLang();
  const [todayGame, setTodayGame] = useState<(typeof GAMES)[0] | null>(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem("dailyChallenge.date");
    
    if (stored !== today) {
      const gameOfTheDay = GAMES[Math.floor(Math.random() * GAMES.length)];
      setTodayGame(gameOfTheDay);
      localStorage.setItem("dailyChallenge.date", today);
      localStorage.setItem("dailyChallenge.game", gameOfTheDay.name);
    } else {
      const gameName = localStorage.getItem("dailyChallenge.game");
      const game = GAMES.find((g) => g.name === gameName) || GAMES[0];
      setTodayGame(game);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sunshine/20 via-background to-sky/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("dailyChallenge", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-12 text-center max-w-sm mx-auto">
        <p className="text-lg font-bold mb-8">🌟 {t("dailyChallengeDesc", lang)}</p>

        {todayGame ? (
          <div className="bg-white/80 rounded-3xl p-8 shadow-pop mb-8">
            <div className="text-7xl mb-4">{todayGame.emoji}</div>
            <h2 className="text-2xl font-extrabold mb-6">{todayGame.name}</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Bonus: +50 stars for completing today's challenge!
            </p>
            <Link
              to={todayGame.to}
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop"
            >
              ▶️ Play Now
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">Loading today's challenge...</p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">Come back tomorrow for a new challenge!</p>
      </section>
    </main>
  );
}
