import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadProgress } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Tiny Genius" },
      { name: "description", content: "See who's winning!" },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  const lang = useLang();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    const storedProfiles = localStorage.getItem("childProfiles");
    
    if (storedProfiles) {
      try {
        const pfs = JSON.parse(storedProfiles);
        setProfiles(pfs.sort((a: any, b: any) => b.stars - a.stars));
      } catch {
        setProfiles([]);
      }
    } else {
      // Default: current player
      setProfiles([
        { name: "Your Child", stars: progress.stars, emoji: "😊", id: "default" },
      ]);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("leaderboard", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 max-w-sm mx-auto">
        <p className="text-center text-lg font-bold mb-8">{t("leaderboardDesc", lang)}</p>

        <div className="space-y-3">
          {profiles.map((profile, idx) => (
            <div
              key={profile.id}
              className={`rounded-2xl p-4 shadow-pop flex items-center justify-between ${
                idx === 0
                  ? "bg-gradient-hero text-white"
                  : "bg-white/80 text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                </span>
                <div>
                  <p className="font-bold">{profile.name}</p>
                  <p className="text-xs opacity-75">
                    {profile.emoji || "😊"}
                  </p>
                </div>
              </div>
              <p className="text-2xl font-extrabold">⭐ {profile.stars}</p>
            </div>
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>No profiles yet. Start playing to appear on the leaderboard!</p>
          </div>
        )}
      </section>

      <div className="mt-12 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
          🏠 {t("home", lang)}
        </Link>
      </div>
    </main>
  );
}
