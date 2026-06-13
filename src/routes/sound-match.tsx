import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, ANIMALS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { LevelPicker, type Level } from "@/components/LevelPicker";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/sound-match")({
  head: () => ({
    meta: [
      { title: "Sound Match — Tiny Genius" },
      { name: "description", content: "Match animal sounds to pictures." },
    ],
  }),
  component: SoundMatch,
});

const ROUND_BY_LEVEL: Record<Level, { choices: number; rounds: number; stars: number }> = {
  easy: { choices: 3, rounds: 5, stars: 3 },
  medium: { choices: 4, rounds: 7, stars: 5 },
  hard: { choices: 6, rounds: 10, stars: 8 },
};

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function SoundMatch() {
  const lang = useLang();
  const [level, setLevel] = useState<Level>("easy");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const cfg = ROUND_BY_LEVEL[level];

  const makeRound = useMemo(() => () => {
    const picks = shuffle(ANIMALS_DATA).slice(0, cfg.choices);
    return { picks, target: picks[Math.floor(Math.random() * picks.length)] };
  }, [cfg.choices]);

  const [{ picks, target }, setRoundData] = useState(makeRound);

  // Reset on level change
  useEffect(() => {
    setScore(0); setRound(1); setStreak(0); setDone(false);
    setRoundData(makeRound());
  }, [level, makeRound]);

  const playSound = () => speak(lang === "hi" ? target.soundHi : target.soundEn);

  // Auto-play sound when round changes
  useEffect(() => { const id = setTimeout(playSound, 250); return () => clearTimeout(id); /* eslint-disable-next-line */ }, [target.id, lang]);

  const handleChoice = (id: string) => {
    if (done) return;
    if (id === target.id) {
      haptic(); chime();
      const bonus = streak >= 2 ? cfg.stars * 2 : cfg.stars;
      addStars(bonus);
      setScore((s) => s + bonus);
      setStreak((s) => s + 1);
      if (round >= cfg.rounds) {
        celebrate("big");
        speak(t("complete", lang));
        setDone(true);
      } else {
        celebrate("small");
        setTimeout(() => { setRound((r) => r + 1); setRoundData(makeRound()); }, 700);
      }
    } else {
      pop(); setStreak(0); speak(t("tryAgain", lang));
    }
  };

  if (done) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 flex items-center justify-center pb-12 px-6">
        <div className="text-center">
          <p className="text-7xl mb-2 animate-bounce-big">🎉</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("complete", lang)}!</h1>
          <p className="text-xl font-bold text-primary">⭐ {score}</p>
          <div className="mt-8 flex flex-col gap-3 items-center">
            <button onClick={() => { setScore(0); setRound(1); setStreak(0); setDone(false); setRoundData(makeRound()); }} className="rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">🔄 {t("playAgain", lang)}</button>
            <Link to="/" className="text-sm font-bold text-muted-foreground">🏠 {t("home", lang)}</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("soundMatch", lang)}</h1>
        <LangToggle />
      </header>

      <div className="flex justify-center mt-4">
        <LevelPicker level={level} onChange={setLevel} />
      </div>

      <section className="px-4 mt-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-4 text-sm font-bold">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">⭐ {score}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">{round}/{cfg.rounds}</span>
          {streak >= 2 && <span className="rounded-full bg-gradient-hero text-white px-3 py-1 shadow-pop animate-pulse">🔥 x{streak}</span>}
        </div>

        <button
          onClick={playSound}
          className="mx-auto block size-24 rounded-full bg-gradient-hero text-white text-4xl shadow-pop active:scale-95 transition-transform mb-6 animate-pulse"
          aria-label="Play sound"
        >🔊</button>

        <div className={`grid gap-3 max-w-sm mx-auto ${cfg.choices > 4 ? "grid-cols-3" : "grid-cols-2"}`}>
          {picks.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleChoice(animal.id)}
              className="rounded-2xl bg-white/90 p-4 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 hover:border-primary/50"
            >
              <div className="text-5xl mb-1">{animal.emoji}</div>
              <div className="text-xs font-bold">{lang === "hi" ? animal.hi : animal.en}</div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
