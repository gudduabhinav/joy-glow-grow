import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadProgress, addStars, saveProgress } from "@/lib/progress";
import { speak, chime, haptic } from "@/lib/audio";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/reward-shop")({
  head: () => ({
    meta: [
      { title: "Reward Shop — Tiny Genius" },
      { name: "description", content: "Spend your stars on rewards!" },
    ],
  }),
  component: RewardShop,
});

const REWARDS = [
  { id: 1, name: "Gold Star", emoji: "🌟", cost: 5 },
  { id: 2, name: "Rainbow", emoji: "🌈", cost: 10 },
  { id: 3, name: "Sparkle", emoji: "✨", cost: 15 },
  { id: 4, name: "Rocket", emoji: "🚀", cost: 20 },
  { id: 5, name: "Trophy", emoji: "🏆", cost: 25 },
  { id: 6, name: "Crown", emoji: "👑", cost: 30 },
];

function RewardShop() {
  const lang = useLang();
  const [progress, setProgress] = useState(loadProgress());
  const [owned, setOwned] = useState<number[]>(() => {
    const stored = localStorage.getItem("ownedRewards");
    return stored ? JSON.parse(stored) : [];
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handlePurchase = (reward: (typeof REWARDS)[0]) => {
    if (owned.includes(reward.id)) {
      setMessage("Already owned!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    if (progress.stars >= reward.cost) {
      haptic();
      chime();
      const newStars = progress.stars - reward.cost;
      const newProgress = { ...progress, stars: newStars };
      saveProgress(newProgress);
      setProgress(newProgress);

      const newOwned = [...owned, reward.id];
      setOwned(newOwned);
      localStorage.setItem("ownedRewards", JSON.stringify(newOwned));

      setMessage(`Got ${reward.name}!`);
      speak(t("found", lang));
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage("Not enough stars!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sunshine/20 via-background to-coral/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("rewardShop", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 max-w-sm mx-auto">
        <div className="bg-white/80 rounded-2xl p-4 shadow-pop mb-6 text-center">
          <p className="text-sm text-muted-foreground">Your stars</p>
          <p className="text-4xl font-extrabold text-primary">⭐ {progress.stars}</p>
        </div>

        {message && (
          <div className="mb-6 bg-gradient-hero text-white rounded-2xl p-3 text-center font-bold shadow-pop">
            {message}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {REWARDS.map((reward) => (
            <button
              key={reward.id}
              onClick={() => handlePurchase(reward)}
              className={`rounded-2xl p-4 shadow-pop active:scale-95 transition-transform ${
                owned.includes(reward.id)
                  ? "bg-muted text-muted-foreground opacity-50"
                  : progress.stars >= reward.cost
                  ? "bg-white/80 hover:border-primary/50"
                  : "bg-white/50 opacity-60"
              } border-2 border-primary/20`}
            >
              <div className="text-4xl mb-2">{reward.emoji}</div>
              <p className="text-xs font-bold">{reward.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {owned.includes(reward.id) ? "✓ Owned" : `${reward.cost}⭐`}
              </p>
            </button>
          ))}
        </div>

        {owned.length > 0 && (
          <div className="mt-8 bg-white/80 rounded-2xl p-4 shadow-pop">
            <p className="font-bold mb-3">Your collection:</p>
            <div className="text-3xl flex flex-wrap gap-2">
              {REWARDS.filter((r) => owned.includes(r.id)).map((r) => (
                <span key={r.id}>{r.emoji}</span>
              ))}
            </div>
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
