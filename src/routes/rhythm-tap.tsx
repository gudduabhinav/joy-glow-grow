import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { speak, chime, pop, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/rhythm-tap")({
  head: () => ({
    meta: [
      { title: "Rhythm Tap — Tiny Genius" },
      { name: "description", content: "Tap to the rhythm beat!" },
    ],
  }),
  component: RhythmTap,
});

function RhythmTap() {
  const lang = useLang();
  const [beats, setBeats] = useState<boolean[]>([]);
  const [taps, setTaps] = useState<boolean[]>([]);
  const [combo, setCombo] = useState(0);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const newBeats = Array.from({ length: 8 }, () => Math.random() > 0.5);
    setBeats(newBeats);
    setTaps([]);
    setRound((r) => r + 1);

    // Play rhythm
    let delay = 500;
    newBeats.forEach((beat) => {
      if (beat) {
        setTimeout(() => {
          haptic();
          speak("Tap!");
        }, delay);
      }
      delay += 400;
    });
  }, []);

  const handleTap = (idx: number) => {
    if (idx < taps.length) return; // Can't tap same spot twice

    const isCorrect = beats[idx] === true;
    setTaps([...taps, isCorrect]);

    if (isCorrect) {
      haptic();
      chime();
      setCombo((c) => c + 1);
    } else {
      pop();
      setCombo(0);
    }

    // Check if done
    if (taps.length + 1 === beats.length) {
      const finalScore = combo + (isCorrect ? 1 : 0);
      setTimeout(() => {
        addStars(finalScore * 2);
        speak(t("complete", lang));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }, 500);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-grape/20 via-background to-sky/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("rhythmTap", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-6">🎵 {t("rhythmTapDesc", lang)}</p>
        <p className="text-3xl font-extrabold text-primary mb-8">Combo: {combo}</p>

        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-8">
          {beats.map((beat, idx) => (
            <button
              key={idx}
              onClick={() => handleTap(idx)}
              disabled={idx < taps.length}
              className={`aspect-square rounded-xl font-bold text-xl shadow-pop active:scale-95 transition-transform ${
                idx < taps.length
                  ? taps[idx]
                    ? "bg-gradient-hero text-white"
                    : "bg-destructive text-white"
                  : "bg-white/80 border-2 border-primary/30"
              }`}
            >
              {idx < taps.length ? (taps[idx] ? "✓" : "✗") : beat ? "🎵" : ""}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {taps.length}/{beats.length} tapped
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
          🏠 {t("home", lang)}
        </Link>
      </div>
    </main>
  );
}
