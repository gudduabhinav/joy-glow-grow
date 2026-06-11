import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/progress";
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

  useEffect(() => { if (unlocked) setProgress(loadProgress()); }, [unlocked]);

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
