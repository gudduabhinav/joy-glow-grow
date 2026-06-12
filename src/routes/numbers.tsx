import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { markNumber } from "@/lib/progress";
import { useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/numbers")({
  head: () => ({
    meta: [
      { title: "Numbers — Tiny Genius" },
      { name: "description", content: "Count 1 to 20, visual counting, and multiplication tables in English and Hindi." },
    ],
  }),
  component: Numbers,
});

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_NUMBERS = [
  { n: 1,  en: "One",      hi: "एक",      hiNum: "१",  emoji: "🍎" },
  { n: 2,  en: "Two",      hi: "दो",      hiNum: "२",  emoji: "🍌" },
  { n: 3,  en: "Three",    hi: "तीन",     hiNum: "३",  emoji: "🐱" },
  { n: 4,  en: "Four",     hi: "चार",     hiNum: "४",  emoji: "⭐" },
  { n: 5,  en: "Five",     hi: "पाँच",    hiNum: "५",  emoji: "🌸" },
  { n: 6,  en: "Six",      hi: "छह",      hiNum: "६",  emoji: "🎈" },
  { n: 7,  en: "Seven",    hi: "सात",     hiNum: "७",  emoji: "🍓" },
  { n: 8,  en: "Eight",    hi: "आठ",      hiNum: "८",  emoji: "🦋" },
  { n: 9,  en: "Nine",     hi: "नौ",      hiNum: "९",  emoji: "🐢" },
  { n: 10, en: "Ten",      hi: "दस",      hiNum: "१०", emoji: "🐬" },
  { n: 11, en: "Eleven",   hi: "ग्यारह",  hiNum: "११", emoji: "🌙" },
  { n: 12, en: "Twelve",   hi: "बारह",    hiNum: "१२", emoji: "🎂" },
  { n: 13, en: "Thirteen", hi: "तेरह",    hiNum: "१३", emoji: "🦄" },
  { n: 14, en: "Fourteen", hi: "चौदह",    hiNum: "१४", emoji: "🌈" },
  { n: 15, en: "Fifteen",  hi: "पंद्रह",  hiNum: "१५", emoji: "🏆" },
  { n: 16, en: "Sixteen",  hi: "सोलह",    hiNum: "१६", emoji: "🚀" },
  { n: 17, en: "Seventeen",hi: "सत्रह",   hiNum: "१७", emoji: "🦋" },
  { n: 18, en: "Eighteen", hi: "अठारह",   hiNum: "१८", emoji: "🌺" },
  { n: 19, en: "Nineteen", hi: "उन्नीस",  hiNum: "१९", emoji: "🐠" },
  { n: 20, en: "Twenty",   hi: "बीस",     hiNum: "२०", emoji: "🎉" },
];

const TABLE_EMOJIS = ["🍎","🌟","🐱","🍌","🌸","🎈","🍓","🦋","🐢","🐬"];
type Tab = "learn" | "count" | "table";

// ─── Learn Tab ───────────────────────────────────────────────────────────────

function LearnTab({ lang }: { lang: "en" | "hi" }) {
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);
  const item = ALL_NUMBERS[idx];

  const touchStartX = useRef(0);
  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e: React.TouchEvent) {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) next(); else prev();
  }

  function prev() { setIdx((i) => (i - 1 + ALL_NUMBERS.length) % ALL_NUMBERS.length); }
  function next() { setIdx((i) => (i + 1) % ALL_NUMBERS.length); }

  const particles = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
  })), [burst]);

  useEffect(() => {
    haptic(); pop();
    const t = setTimeout(() => speak(lang === "hi" ? item.hi : `${item.n}, ${item.en}`), 150);
    return () => clearTimeout(t);
  }, [item, lang]);

  function tap() {
    haptic(20); chime();
    markNumber(item.n);
    setBurst((b) => b + 1);
    speak(lang === "hi" ? item.hi : `${item.n}, ${item.en}`);
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-6 relative flex-1"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Particles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {particles.map((p) => (
          <span key={p.id} className="absolute text-2xl" style={{ animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }}>⭐</span>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-4 flex-wrap justify-center max-w-xs">
        {ALL_NUMBERS.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)}
            className={`rounded-full transition-all ${i === idx ? "w-4 h-2.5 bg-white" : "size-2 bg-white/40"}`}
          />
        ))}
      </div>

      {/* Number card */}
      <button
        type="button" onClick={tap} aria-label={`Number ${item.n}`} key={item.n}
        className="relative bg-white rounded-[48px] w-56 h-56 sm:w-72 sm:h-72 flex flex-col items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in"
      >
        <span className="text-[7rem] sm:text-[9rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent">
          {lang === "hi" ? item.hiNum : item.n}
        </span>
        <span className="text-4xl mt-1 animate-wiggle">{item.emoji}</span>
      </button>

      {/* Name chip */}
      <div className="mt-5 flex items-center gap-3 bg-white/95 rounded-full px-6 py-3 shadow-pop animate-pop-in">
        <span className="text-2xl font-extrabold">{lang === "hi" ? item.hi : item.en}</span>
        <span className="text-base font-bold text-muted-foreground">
          {lang === "hi" ? `(${item.en})` : `(${item.hi})`}
        </span>
      </div>

      {/* Emoji count row — max 10 shown, then +N */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-xs">
        {Array.from({ length: Math.min(item.n, 10) }).map((_, i) => (
          <span key={i} className="text-2xl animate-pop-in" style={{ animationDelay: `${i * 50}ms` }}>{item.emoji}</span>
        ))}
        {item.n > 10 && (
          <span className="text-lg font-extrabold text-white/90 self-center">+{item.n - 10}</span>
        )}
      </div>

      {/* Nav buttons */}
      <div className="flex items-center gap-6 mt-6">
        <button type="button" onClick={prev} className="size-16 rounded-full bg-white shadow-pop text-3xl flex items-center justify-center active:scale-90" aria-label="Previous">⬅️</button>
        <span className="text-white font-extrabold text-sm">{idx + 1}/{ALL_NUMBERS.length}</span>
        <button type="button" onClick={next} className="size-16 rounded-full bg-white shadow-pop text-3xl flex items-center justify-center active:scale-90" aria-label="Next">➡️</button>
      </div>
    </div>
  );
}

// ─── Counting Tab ─────────────────────────────────────────────────────────────

function CountingTab({ lang }: { lang: "en" | "hi" }) {
  const [target, setTarget] = useState(5);
  const [count, setCount] = useState(0);
  const item = ALL_NUMBERS[target - 1];

  useEffect(() => {
    setCount(0);
    speak(lang === "hi"
      ? `${item.hi} तक गिनो!`
      : `Count to ${item.en}!`);
  }, [target, lang]);

  function tapEmoji() {
    if (count >= target) return;
    haptic(10); pop();
    const next = count + 1;
    setCount(next);
    speak(lang === "hi" ? ALL_NUMBERS[next - 1].hi : String(next));
    if (next === target) {
      setTimeout(() => { chime(); haptic(40); speak(lang === "hi" ? "शाबाश! 🎉" : "Well done! 🎉"); }, 200);
    }
  }

  function reset() { setCount(0); pop(); }

  return (
    <div className="flex flex-col items-center px-5 py-4 flex-1">
      {/* Target picker */}
      <div className="bg-white/20 rounded-2xl p-3 mb-4 w-full max-w-sm">
        <p className="text-white font-extrabold text-sm text-center mb-2">
          {lang === "hi" ? "कितने तक गिनें?" : "Count up to:"}
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {[5, 10, 15, 20].map((n) => (
            <button key={n} type="button"
              onClick={() => { haptic(); setTarget(n); }}
              className={`px-4 py-1.5 rounded-full font-extrabold text-sm transition-all ${target === n ? "bg-white text-slate-800 shadow-pop" : "bg-white/30 text-white"}`}
            >{n}</button>
          ))}
        </div>
      </div>

      {/* Counter display */}
      <div className="bg-white/95 rounded-3xl px-8 py-4 shadow-pop text-center mb-4 w-full max-w-sm">
        <p className="text-sm font-bold text-muted-foreground">
          {lang === "hi" ? "अभी तक" : "So far"}
        </p>
        <p className="text-6xl font-black bg-gradient-hero bg-clip-text text-transparent leading-none mt-1">
          {lang === "hi" ? ALL_NUMBERS[Math.max(count - 1, 0)].hiNum : count}
        </p>
        <p className="text-base font-bold text-slate-500 mt-1">
          {count === 0 ? (lang === "hi" ? "छुओ शुरू करो!" : "Tap to start!") : (lang === "hi" ? ALL_NUMBERS[count - 1].hi : ALL_NUMBERS[count - 1].en)}
        </p>
        {count === target && (
          <p className="text-green-500 font-extrabold mt-1 animate-pop-in">
            {lang === "hi" ? "🎉 शाबाश!" : "🎉 Amazing!"}
          </p>
        )}
      </div>

      {/* Emoji grid — tap to count */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm w-full">
        {Array.from({ length: target }).map((_, i) => {
          const filled = i < count;
          return (
            <button
              key={i} type="button" onClick={tapEmoji}
              className={`text-3xl transition-all duration-200 rounded-2xl p-1 active:scale-95 ${filled ? "opacity-100 animate-pop-in" : "opacity-30 grayscale"}`}
              style={{ animationDelay: `${i * 40}ms` }}
              aria-label={`Item ${i + 1}`}
            >
              {item.emoji}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={reset}
        className="mt-5 bg-white/30 text-white font-extrabold px-6 py-2 rounded-full active:scale-95">
        🔄 {lang === "hi" ? "फिर से" : "Reset"}
      </button>
    </div>
  );
}

// ─── Tables Tab ───────────────────────────────────────────────────────────────

function TablesTab({ lang }: { lang: "en" | "hi" }) {
  const [tableOf, setTableOf] = useState(2);
  const [revealed, setRevealed] = useState(0);
  const emoji = TABLE_EMOJIS[tableOf - 1];

  useEffect(() => {
    setRevealed(0);
    speak(lang === "hi"
      ? `${ALL_NUMBERS[tableOf - 1].hi} का पहाड़ा`
      : `Table of ${tableOf}`);
  }, [tableOf, lang]);

  function revealNext() {
    if (revealed >= 10) return;
    const next = revealed + 1;
    setRevealed(next);
    haptic(10); pop();
    const result = tableOf * next;
    const resultItem = ALL_NUMBERS[result - 1];
    if (lang === "hi") {
      speak(`${ALL_NUMBERS[tableOf - 1].hi} गुना ${ALL_NUMBERS[next - 1].hi} बराबर ${resultItem?.hi ?? result}`);
    } else {
      speak(`${tableOf} times ${next} equals ${result}`);
    }
    if (next === 10) { setTimeout(() => { chime(); haptic(50); }, 300); }
  }

  function toHindi(n: number): string {
    if (n <= 20) return ALL_NUMBERS[n - 1]?.hiNum ?? String(n);
    // for results > 20, just return the number
    return String(n);
  }

  return (
    <div className="flex flex-col items-center px-4 py-4 flex-1">
      {/* Table selector */}
      <div className="bg-white/20 rounded-2xl p-3 mb-4 w-full max-w-sm">
        <p className="text-white font-extrabold text-sm text-center mb-2">
          {lang === "hi" ? "किसका पहाड़ा?" : "Table of:"}
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          {[2,3,4,5,6,7,8,9,10].map((n) => (
            <button key={n} type="button"
              onClick={() => { haptic(); setTableOf(n); }}
              className={`w-10 h-10 rounded-2xl font-extrabold text-base transition-all ${tableOf === n ? "bg-white text-slate-800 shadow-pop" : "bg-white/30 text-white"}`}
            >{n}</button>
          ))}
        </div>
      </div>

      {/* Table rows */}
      <div className="w-full max-w-sm space-y-2 overflow-y-auto" style={{ maxHeight: "52vh" }}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((step) => {
          const result = tableOf * step;
          const visible = step <= revealed;
          return (
            <button
              key={step} type="button"
              onClick={visible ? undefined : revealNext}
              disabled={visible}
              className={`w-full rounded-2xl px-4 py-3 flex items-center justify-between shadow-pop transition-all active:scale-[0.98]
                ${visible ? "bg-white" : "bg-white/30 cursor-pointer"}`}
              aria-label={`${tableOf} × ${step}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{emoji}</span>
                <span className="text-xl font-extrabold text-slate-800">
                  {lang === "hi"
                    ? `${toHindi(tableOf)} × ${toHindi(step)}`
                    : `${tableOf} × ${step}`}
                </span>
              </div>
              {visible ? (
                <span className="text-2xl font-black text-primary">
                  = {lang === "hi" ? (toHindi(result)) : result}
                </span>
              ) : (
                <span className="text-white font-extrabold text-base px-3 py-1 bg-white/40 rounded-full">
                  {lang === "hi" ? "छुओ" : "Tap"}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {revealed < 10 && (
        <button type="button" onClick={revealNext}
          className="mt-4 bg-white text-slate-800 font-extrabold px-6 py-3 rounded-full shadow-pop active:scale-95">
          {lang === "hi" ? "अगला ➡️" : "Next ➡️"}
        </button>
      )}
      {revealed === 10 && (
        <div className="mt-4 flex gap-3">
          <p className="text-white font-extrabold text-lg animate-pop-in">🎉 {lang === "hi" ? "पहाड़ा पूरा!" : "Table done!"}</p>
          <button type="button" onClick={() => setRevealed(0)}
            className="bg-white/30 text-white font-bold px-4 py-2 rounded-full active:scale-95">
            🔄
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function Numbers() {
  const lang = useLang();
  const [tab, setTab] = useState<Tab>("learn");

  const tabs: { id: Tab; label: string; labelHi: string; emoji: string }[] = [
    { id: "learn", label: "Learn",    labelHi: "सीखो",    emoji: "🔢" },
    { id: "count", label: "Count",    labelHi: "गिनो",    emoji: "👆" },
    { id: "table", label: "Tables",   labelHi: "पहाड़ा",  emoji: "✖️" },
  ];

  return (
    <main className="min-h-screen bg-gradient-numbers flex flex-col select-none">
      <header className="flex items-center justify-between px-5 pt-6 flex-shrink-0">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <span className="size-14" />
      </header>

      {/* Tab bar */}
      <div className="flex gap-2 px-5 mt-4 flex-shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id} type="button"
            onClick={() => { haptic(); pop(); setTab(t.id); }}
            className={`flex-1 rounded-2xl py-2.5 font-extrabold text-sm flex items-center justify-center gap-1.5 transition-all
              ${tab === t.id ? "bg-white text-slate-800 shadow-pop" : "bg-white/25 text-white"}`}
          >
            <span>{t.emoji}</span>
            <span>{lang === "hi" ? t.labelHi : t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 flex flex-col pb-6 overflow-hidden">
        {tab === "learn" && <LearnTab lang={lang} />}
        {tab === "count" && <CountingTab lang={lang} />}
        {tab === "table" && <TablesTab lang={lang} />}
      </div>
    </main>
  );
}
