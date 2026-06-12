import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { addQuizScore } from "@/lib/progress";
import { ANIMALS_DATA, COLORS_DATA, SHAPES_DATA, NUMBERS_DATA, t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — Tiny Genius" },
      { name: "description", content: "Test what you know! Animals, Colors, Shapes quiz in English and Hindi." },
    ],
  }),
  component: Quiz,
});

type QuizItem = { id: string; label: string; labelHi: string; emoji?: string; color?: string };
type QuizMode = "animals" | "colors" | "shapes" | "numbers";

const MODES: { id: QuizMode; label: string; labelHi: string; emoji: string; gradient: string }[] = [
  { id: "animals", label: "Animals", labelHi: "जानवर", emoji: "🦁", gradient: "bg-gradient-animals" },
  { id: "colors",  label: "Colors",  labelHi: "रंग",   emoji: "🎨", gradient: "bg-gradient-colors" },
  { id: "shapes",  label: "Shapes",  labelHi: "आकार",  emoji: "🔺", gradient: "bg-gradient-shapes" },
  { id: "numbers", label: "Numbers", labelHi: "नंबर",  emoji: "🔢", gradient: "bg-gradient-numbers" },
];

const POOL: Record<QuizMode, QuizItem[]> = {
  animals: ANIMALS_DATA.map((a) => ({ id: a.id, label: a.en, labelHi: a.hi, emoji: a.emoji })),
  colors:  COLORS_DATA.map((c)  => ({ id: c.id, label: c.en, labelHi: c.hi, color: c.hex })),
  shapes:  SHAPES_DATA.map((s)  => ({ id: s.id, label: s.en, labelHi: s.hi, emoji: s.emoji })),
  numbers: NUMBERS_DATA.map((n) => ({ id: String(n.n), label: n.en, labelHi: n.hi, emoji: n.emoji })),
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeQuestion(mode: QuizMode) {
  const pool = POOL[mode];
  const shuffled = shuffle(pool);
  const correct = shuffled[0];
  const options = shuffled.slice(0, 4);
  return { correct, options: shuffle(options) };
}

// Color swatch for colors mode
function ColorSwatch({ hex, size = 48 }: { hex: string; size?: number }) {
  return (
    <span
      className="rounded-2xl inline-block border-2 border-white/60 shadow"
      style={{ width: size, height: size, backgroundColor: hex }}
    />
  );
}

const TOTAL_QUESTIONS = 8;

function Quiz() {
  const lang = useLang();
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  const question = useMemo(() => mode ? makeQuestion(mode) : null, [mode, qNum]); // eslint-disable-line react-hooks/exhaustive-deps

  // Speak the question when it appears
  useEffect(() => {
    if (!question || !mode || picked !== null) return;
    const label = lang === "hi" ? question.correct.labelHi : question.correct.label;
    const prefix = lang === "hi" ? t("quizTitle", lang).replace("…?", "") : "Which one is ";
    setTimeout(() => speak(`${prefix} ${label}?`), 300);
  }, [question, lang, mode]);

  function handlePick(item: QuizItem) {
    if (picked !== null) return;
    setPicked(item.id);
    const isCorrect = item.id === question!.correct.id;
    if (isCorrect) {
      haptic(30); chime();
      setScore((s) => s + 1);
      addQuizScore(1);
      speak(t("correct", lang));
    } else {
      haptic(80); pop();
      speak(t("wrong", lang));
    }
    setTimeout(() => {
      if (qNum + 1 >= TOTAL_QUESTIONS) {
        setDone(true);
      } else {
        setQNum((q) => q + 1);
        setPicked(null);
      }
    }, 1000);
  }

  function restart() {
    setQNum(0); setScore(0); setDone(false); setPicked(null);
  }

  function backToModes() {
    setMode(null); restart();
  }

  // Mode picker screen
  if (!mode) {
    return (
      <main className="min-h-screen bg-gradient-rhymes flex flex-col select-none">
        <header className="flex items-center justify-between px-5 pt-6">
          <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
          <LangToggle />
          <span className="size-14" />
        </header>

        <section className="flex-1 px-5 py-6">
          <h1 className="text-center text-3xl font-extrabold text-white drop-shadow mb-2">
            {lang === "hi" ? "क्विज़ चुनो! 🧠" : "Pick a Quiz! 🧠"}
          </h1>
          <p className="text-center text-white/80 font-semibold mb-6 text-sm">
            {lang === "hi" ? `${TOTAL_QUESTIONS} सवाल` : `${TOTAL_QUESTIONS} questions`}
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => { haptic(); pop(); setMode(m.id); }}
                className={`${m.gradient} rounded-3xl p-5 shadow-pop active:scale-95 transition-transform flex flex-col items-start min-h-[120px]`}
              >
                <span className="text-5xl mb-2">{m.emoji}</span>
                <span className="text-xl font-extrabold text-white drop-shadow">
                  {lang === "hi" ? m.labelHi : m.label}
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // Done screen
  if (done) {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    const medal = pct === 100 ? "🏆" : pct >= 75 ? "🥇" : pct >= 50 ? "🥈" : "🥉";
    return (
      <main className="min-h-screen bg-gradient-rhymes flex flex-col items-center justify-center select-none px-6">
        <div className="bg-white rounded-[40px] p-8 shadow-pop text-center max-w-sm w-full animate-pop-in">
          <div className="text-7xl animate-bounce-big">{medal}</div>
          <h2 className="mt-4 text-3xl font-extrabold">{t("quizDone", lang)}</h2>
          <p className="mt-2 text-5xl font-black text-primary">{score}/{TOTAL_QUESTIONS}</p>
          <p className="text-base font-semibold text-muted-foreground mt-1">
            {lang === "hi" ? `${pct}% सही` : `${pct}% correct`}
          </p>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => { restart(); }} className="flex-1 rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95">
              {t("playAgain", lang)}
            </button>
            <button type="button" onClick={backToModes} className="flex-1 rounded-2xl bg-muted font-extrabold py-3 shadow-pop active:scale-95">
              {lang === "hi" ? "बदलो" : "Change"}
            </button>
          </div>
          <Link to="/" className="mt-4 block text-sm font-semibold text-muted-foreground">← {t("back", lang)}</Link>
        </div>
      </main>
    );
  }

  if (!question) return null;
  const { correct, options } = question;
  const currentMode = MODES.find((m) => m.id === mode)!;

  return (
    <main className={`min-h-screen ${currentMode.gradient} flex flex-col select-none`}>
      <header className="flex items-center justify-between px-5 pt-6">
        <button type="button" onClick={backToModes} className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Back">⬅️</button>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold">
          {qNum + 1}/{TOTAL_QUESTIONS} · ⭐{score}
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-5 pb-6">
        {/* Question */}
        <div className="bg-white/95 rounded-[32px] px-6 py-5 shadow-pop text-center max-w-sm w-full mb-6 animate-pop-in">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
            {t("quizTitle", lang)}
          </p>
          <p className="mt-2 text-4xl font-extrabold text-slate-800">
            {lang === "hi" ? correct.labelHi : correct.label}
          </p>
          {mode === "colors" && correct.color && (
            <div className="flex justify-center mt-3">
              <ColorSwatch hex={correct.color} size={56} />
            </div>
          )}
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
          {options.map((opt) => {
            const isCorrect = opt.id === correct.id;
            const isPicked = picked === opt.id;
            const isWrong = isPicked && !isCorrect;
            const showGreen = picked !== null && isCorrect;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handlePick(opt)}
                disabled={picked !== null}
                className={`
                  relative rounded-3xl bg-white shadow-pop p-4 flex flex-col items-center justify-center min-h-[100px] active:scale-95 transition-all
                  ${showGreen ? "ring-4 ring-green-400 bg-green-50 scale-105" : ""}
                  ${isWrong ? "ring-4 ring-red-400 bg-red-50" : ""}
                  ${picked !== null && !isPicked && !isCorrect ? "opacity-50" : ""}
                `}
                aria-label={opt.label}
              >
                {mode === "colors" && opt.color ? (
                  <ColorSwatch hex={opt.color} size={52} />
                ) : (
                  <span className="text-5xl leading-none">{opt.emoji}</span>
                )}
                <span className="mt-2 text-sm font-extrabold text-slate-700 text-center leading-tight">
                  {lang === "hi" ? opt.labelHi : opt.label}
                </span>
                {showGreen && <span className="absolute top-1 right-2 text-xl">✅</span>}
                {isWrong && <span className="absolute top-1 right-2 text-xl">❌</span>}
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
