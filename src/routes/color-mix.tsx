import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { speak, chime, haptic, pop } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, COLORS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";
import { LevelPicker, type Level } from "@/components/LevelPicker";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/color-mix")({
  head: () => ({
    meta: [
      { title: "Color Mix Lab — Tiny Genius" },
      { name: "description", content: "Mix colors to create new ones." },
    ],
  }),
  component: ColorMix,
});

type Mix = { a: string; b: string; result: string; name: { en: string; hi: string } };
const MIXES: Mix[] = [
  { a: "#FF4D4D", b: "#FFD93D", result: "#FF9F43", name: { en: "Orange", hi: "नारंगी" } },
  { a: "#4D9DFF", b: "#FF4D4D", result: "#A66BFF", name: { en: "Purple", hi: "बैंगनी" } },
  { a: "#4D9DFF", b: "#FFD93D", result: "#5BD17B", name: { en: "Green", hi: "हरा" } },
  { a: "#FF4D4D", b: "#FFFFFF", result: "#FF7AB6", name: { en: "Pink", hi: "गुलाबी" } },
  { a: "#FF4D4D", b: "#5BD17B", result: "#A0673B", name: { en: "Brown", hi: "भूरा" } },
];

const ROUNDS: Record<Level, number> = { easy: 3, medium: 5, hard: 8 };

function ColorMix() {
  const lang = useLang();
  const [level, setLevel] = useState<Level>("easy");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const mix = useMemo<Mix>(() => MIXES[Math.floor(Math.random() * MIXES.length)], [round, level]);

  useEffect(() => { setScore(0); setRound(1); setSelected([]); setDone(false); }, [level]);

  // Distractors plus the two correct ingredients
  const palette = useMemo(() => {
    const extras = COLORS_DATA.map((c) => c.hex).filter((h) => h !== mix.a && h !== mix.b);
    const distract = level === "easy" ? 2 : level === "medium" ? 4 : 6;
    const pool = [mix.a, mix.b, ...extras.sort(() => Math.random() - 0.5).slice(0, distract)];
    return pool.sort(() => Math.random() - 0.5);
  }, [mix, level]);

  const handleColor = (hex: string) => {
    if (selected.includes(hex) || selected.length === 2 || done) return;
    haptic(); pop();
    const next = [...selected, hex];
    setSelected(next);
    if (next.length === 2) {
      const ok = (next[0] === mix.a && next[1] === mix.b) || (next[0] === mix.b && next[1] === mix.a);
      if (ok) {
        chime();
        speak((lang === "hi" ? "वाह! " : "Wow! ") + mix.name[lang]);
        const bonus = level === "hard" ? 8 : level === "medium" ? 5 : 3;
        addStars(bonus);
        setScore((s) => s + bonus);
        celebrate("small");
        setTimeout(() => {
          if (round >= ROUNDS[level]) { celebrate("big"); setDone(true); }
          else { setRound((r) => r + 1); }
          setSelected([]);
        }, 1100);
      } else {
        speak(t("tryAgain", lang));
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("colorMixLab", lang)}</h1>
        <LangToggle />
      </header>

      <div className="flex justify-center mt-4">
        <LevelPicker level={level} onChange={setLevel} />
      </div>

      <section className="px-4 mt-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 text-sm font-bold">
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">⭐ {score}</span>
          <span className="rounded-full bg-white/80 px-3 py-1 shadow-pop">{round}/{ROUNDS[level]}</span>
        </div>

        {done ? (
          <div className="py-10">
            <p className="text-7xl mb-3 animate-bounce-big">🎉</p>
            <h2 className="text-2xl font-extrabold mb-2">{t("complete", lang)}!</h2>
            <button onClick={() => { setScore(0); setRound(1); setSelected([]); setDone(false); }} className="mt-4 rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
              🔄 {t("playAgain", lang)}
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">{lang === "hi" ? "यह रंग बनाओ:" : "Make this color:"}</p>
            <div
              className="w-28 h-28 rounded-3xl shadow-pop mx-auto border-4 border-white animate-pulse"
              style={{ backgroundColor: mix.result }}
            />
            <p className="mt-2 text-base font-extrabold">{mix.name[lang]}</p>

            {/* Mixing bowl */}
            <div className="flex justify-center items-center gap-2 mt-6 mb-4 min-h-[60px]">
              {selected.length === 0 ? (
                <p className="text-xs text-muted-foreground">{lang === "hi" ? "२ रंग चुनो" : "Pick 2 colors"}</p>
              ) : (
                selected.map((hex, idx) => (
                  <div key={idx} className="w-14 h-14 rounded-2xl shadow-pop border-2 border-white animate-scale-in" style={{ backgroundColor: hex }} />
                ))
              )}
            </div>

            <div className={`grid gap-3 max-w-xs mx-auto ${palette.length > 6 ? "grid-cols-4" : "grid-cols-3"}`}>
              {palette.map((hex) => (
                <button
                  key={hex}
                  onClick={() => handleColor(hex)}
                  disabled={selected.includes(hex) || selected.length === 2}
                  className="aspect-square rounded-2xl shadow-pop active:scale-95 transition-transform border-2 border-white disabled:opacity-40"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
