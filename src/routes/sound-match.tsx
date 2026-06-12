import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, ANIMALS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/sound-match")({
  head: () => ({
    meta: [
      { title: "Sound Match — Tiny Genius" },
      { name: "description", content: "Match animal sounds to pictures." },
    ],
  }),
  component: SoundMatch,
});

function SoundMatch() {
  const lang = useLang();
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  
  // Shuffle animals once on mount
  const allAnimalsShuffled = useMemo(() => 
    ANIMALS_DATA.sort(() => Math.random() - 0.5), 
    []
  );

  // Get 4 random animals that haven't been used yet
  const getNewRound = () => {
    let available = allAnimalsShuffled.filter((_, idx) => !usedIndices.includes(idx));
    if (available.length < 4) {
      // Reset if we've gone through all
      setUsedIndices([]);
      available = allAnimalsShuffled;
    }
    return available.slice(0, 4).sort(() => Math.random() - 0.5);
  };

  const [animals, setAnimals] = useState(getNewRound());
  const [current, setCurrent] = useState(animals[Math.floor(Math.random() * animals.length)]);

  const handleCorrect = (id: string) => {
    if (id === current.id) {
      haptic();
      chime();
      speak(t("correct", lang));
      addStars(5);
      setScore((s) => s + 1);
      
      // Move to next question
      setTimeout(() => {
        const newAnimals = getNewRound();
        setAnimals(newAnimals);
        setCurrent(newAnimals[Math.floor(Math.random() * newAnimals.length)]);
        setPlayed(false);
      }, 800);
    } else {
      pop();
      speak(t("tryAgain", lang));
    }
  };

  const playSound = () => {
    setPlayed(true);
    speak(lang === "hi" ? current.soundHi : current.soundEn);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky/20 via-background to-grape/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("soundMatch", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-6">🎵 {t("soundMatchDesc", lang)}</p>
        <p className="text-2xl font-extrabold text-primary mb-8">{lang === "hi" ? "स्कोर" : "Score"}: {score}</p>

        <button
          onClick={playSound}
          className="mx-auto block w-20 h-20 rounded-full bg-gradient-hero text-white text-3xl shadow-pop active:scale-95 transition-transform mb-8"
        >
          🔊
        </button>
        <p className="text-sm text-muted-foreground mb-8">{played ? t("soundMatchDesc", lang) : "Tap speaker!"}</p>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {animals.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleCorrect(animal.id)}
              className="rounded-2xl bg-white/80 p-4 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 hover:border-primary/50"
            >
              <div className="text-4xl mb-1">{animal.emoji}</div>
              <div className="text-xs font-bold">{lang === "hi" ? animal.hi : animal.en}</div>
            </button>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
          🏠 {t("home", lang)}
        </Link>
      </div>
    </main>
  );
}
