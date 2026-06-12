import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { speak, chime, pop, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";

// BILINGUAL_LETTERS local copy for phonics
const BILINGUAL_LETTERS = [
  { letter: "A", letterHi: "ए", wordEn: "Apple", emoji: "🍎" },
  { letter: "B", letterHi: "बी", wordEn: "Ball",  emoji: "⚽" },
  { letter: "C", letterHi: "सी", wordEn: "Cat",   emoji: "🐱" },
  { letter: "D", letterHi: "डी", wordEn: "Dog",   emoji: "🐶" },
  { letter: "E", letterHi: "ई", wordEn: "Elephant", emoji: "🐘" },
  { letter: "F", letterHi: "एफ", wordEn: "Fish",  emoji: "🐟" },
  { letter: "G", letterHi: "जी", wordEn: "Grapes", emoji: "🍇" },
  { letter: "H", letterHi: "एच", wordEn: "Hat",   emoji: "🎩" },
  { letter: "I", letterHi: "आई", wordEn: "Ice cream", emoji: "🍦" },
  { letter: "J", letterHi: "जे", wordEn: "Juice", emoji: "🧃" },
];
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/phonics-farm")({
  head: () => ({
    meta: [
      { title: "Phonics Farm — Tiny Genius" },
      { name: "description", content: "Hear phonics and match words." },
    ],
  }),
  component: PhoneticsFarm,
});

function PhoneticsFarm() {
  const lang = useLang();
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(false);
  const letter = useMemo(() => BILINGUAL_LETTERS[Math.floor(Math.random() * BILINGUAL_LETTERS.length)], []);
  const options = useMemo(
    () => BILINGUAL_LETTERS.sort(() => Math.random() - 0.5).slice(0, 3).map((l: typeof BILINGUAL_LETTERS[number]) => l.letter),
    []
  );

  const choices = useMemo(() => {
    const opts = [...options];
    if (!opts.includes(letter.letter)) {
      opts[Math.floor(Math.random() * 3)] = letter.letter;
    }
    return opts.sort(() => Math.random() - 0.5);
  }, []);

  const playSound = () => {
    setPlayed(true);
    speak(lang === "hi" ? letter.letterHi : letter.letter);
  };

  const handleAnswer = (selected: string) => {
    if (selected === letter.letter) {
      haptic();
      chime();
      speak(t("correct", lang));
      addStars(5);
      setScore((s) => s + 1);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      pop();
      speak(t("tryAgain", lang));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-sky/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("phonicsFarm", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-6">{t("phonicsFarmDesc", lang)}</p>
        <p className="text-2xl font-extrabold text-primary mb-8">⭐ {score}</p>

        <button
          onClick={playSound}
          className="mx-auto block w-20 h-20 rounded-full bg-gradient-abc text-white text-3xl shadow-pop active:scale-95 transition-transform mb-8"
        >
          🔊
        </button>

        {played && (
          <div className="mb-8">
            <p className="text-3xl font-extrabold text-primary mb-4">{letter.emoji}</p>
            <p className="text-xs text-muted-foreground">Which letter?</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mt-8">
          {choices.map((ch) => (
            <button
              key={ch}
              onClick={() => handleAnswer(ch)}
              className="rounded-2xl bg-white/80 p-4 shadow-pop active:scale-95 transition-transform border-2 border-primary/20 hover:border-primary/50"
            >
              <div className="text-5xl font-extrabold text-primary">{ch}</div>
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

// Import BILINGUAL_LETTERS from i18n if not already exported
