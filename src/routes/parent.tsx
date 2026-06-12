import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadProgress, resetProgress } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parents — Tiny Genius" },
      { name: "description", content: "Parent area — view your child's bilingual learning progress." },
    ],
  }),
  component: Parent,
});

function Parent() {
  const lang = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [a] = useState(() => 3 + Math.floor(Math.random() * 6));
  const [b] = useState(() => 2 + Math.floor(Math.random() * 6));
  const [answer, setAnswer] = useState("");
  const [progress, setProgress] = useState(loadProgress());
  const [showReset, setShowReset] = useState(false);

  useEffect(() => { if (unlocked) setProgress(loadProgress()); }, [unlocked]);

  function handleReset() {
    resetProgress();
    setProgress(loadProgress());
    setShowReset(false);
  }

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-pop">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">{t("parentCheck", lang)}</h1>
            <LangToggle />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t("parentCheckSub", lang)}</p>
          <p className="mt-6 text-3xl font-extrabold text-center">{a} + {b} = ?</p>
          <input
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-4 w-full rounded-2xl border-2 border-input px-4 py-3 text-xl text-center font-bold focus:outline-none focus:border-primary"
            aria-label="Answer"
          />
          <button
            type="button"
            onClick={() => { if (Number(answer) === a + b) setUnlocked(true); else setAnswer(""); }}
            className="mt-4 w-full rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95 transition-transform"
          >
            {t("unlock", lang)}
          </button>
          <Link to="/" className="mt-3 block text-center text-sm font-semibold text-muted-foreground">← {t("back", lang)}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-xl font-extrabold">{t("parentDashboard", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-5 mt-6 grid grid-cols-2 gap-4">
        <Stat label={t("starsEarned", lang)} value={progress.stars} emoji="⭐" />
        <Stat label={t("lettersLearned", lang)} value={progress.letters.length} emoji="🔤" />
        <Stat label={t("itemsTraced", lang)} value={progress.traced.length} emoji="✏️" />
        <Stat label={t("numbersStat", lang)} value={progress.numbers.length} emoji="🔢" />
        <Stat label={t("animalsStat", lang)} value={progress.animals?.length ?? 0} emoji="🦁" />
        <Stat label={t("colorsStat", lang)} value={progress.colors?.length ?? 0} emoji="🎨" />
        <Stat label={t("quizScore", lang)} value={progress.quizScore ?? 0} emoji="🧠" />
      </section>

      <section className="px-5 mt-8">
        <h2 className="text-lg font-extrabold">{t("lettersMastered", lang)}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {progress.letters.length === 0 && <p className="text-sm text-muted-foreground">{t("nothingYet", lang)}</p>}
          {progress.letters.map((l) => (
            <span key={l} className="size-12 rounded-2xl bg-gradient-abc text-white font-extrabold flex items-center justify-center shadow-pop">{l}</span>
          ))}
        </div>
      </section>

      {/* Reset section */}
      <section className="px-5 mt-8 mb-4">
        {!showReset ? (
          <button
            type="button"
            onClick={() => setShowReset(true)}
            className="w-full rounded-2xl border-2 border-destructive/40 text-destructive font-bold py-3 text-sm"
          >
            🗑️ {t("resetProgress", lang)}
          </button>
        ) : (
          <div className="bg-card rounded-2xl p-4 shadow-pop">
            <p className="text-center font-bold">{t("resetConfirm", lang)}</p>
            <div className="flex gap-3 mt-3">
              <button type="button" onClick={handleReset} className="flex-1 rounded-xl bg-destructive text-white font-bold py-2">{t("yes", lang)}</button>
              <button type="button" onClick={() => setShowReset(false)} className="flex-1 rounded-xl bg-muted font-bold py-2">{t("cancel", lang)}</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function Stat({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-pop">
      <div className="text-4xl">{emoji}</div>
      <div className="mt-1 text-3xl font-extrabold tabular-nums">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}
