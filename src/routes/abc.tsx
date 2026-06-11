import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { speak, pop, chime, haptic } from "@/lib/audio";
import { markLetter } from "@/lib/progress";
import { useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/abc")({
  head: () => ({
    meta: [
      { title: "ABC — Tiny Genius" },
      { name: "description", content: "Learn letters A–Z in English and Hindi with interactive sounds and pictures." },
    ],
  }),
  component: ABC,
});

const BILINGUAL_LETTERS: {
  letter: string;
  letterHi: string;
  wordEn: string;
  wordHi: string;
  wordHiPhonetic: string;
  emoji: string;
  gradient: string;
}[] = [
  { letter: "A", letterHi: "ए", wordEn: "Apple", wordHi: "सेब", wordHiPhonetic: "एप्पल", emoji: "🍎", gradient: "bg-gradient-abc" },
  { letter: "B", letterHi: "बी", wordEn: "Ball", wordHi: "गेंद", wordHiPhonetic: "बॉल", emoji: "⚽", gradient: "bg-gradient-numbers" },
  { letter: "C", letterHi: "सी", wordEn: "Cat", wordHi: "बिल्ली", wordHiPhonetic: "कैट", emoji: "🐱", gradient: "bg-gradient-shapes" },
  { letter: "D", letterHi: "डी", wordEn: "Dog", wordHi: "कुत्ता", wordHiPhonetic: "डॉग", emoji: "🐶", gradient: "bg-gradient-tracing" },
  { letter: "E", letterHi: "ई", wordEn: "Elephant", wordHi: "हाथी", wordHiPhonetic: "एलीफेंट", emoji: "🐘", gradient: "bg-gradient-colors" },
  { letter: "F", letterHi: "एफ", wordEn: "Fish", wordHi: "मछली", wordHiPhonetic: "फिश", emoji: "🐟", gradient: "bg-gradient-animals" },
  { letter: "G", letterHi: "जी", wordEn: "Grapes", wordHi: "अंगूर", wordHiPhonetic: "ग्रेप्स", emoji: "🍇", gradient: "bg-gradient-abc" },
  { letter: "H", letterHi: "एच", wordEn: "Hat", wordHi: "टोपी", wordHiPhonetic: "हैट", emoji: "🎩", gradient: "bg-gradient-numbers" },
  { letter: "I", letterHi: "आई", wordEn: "Ice cream", wordHi: "कुल्फी", wordHiPhonetic: "आइसक्रीम", emoji: "🍦", gradient: "bg-gradient-shapes" },
  { letter: "J", letterHi: "जे", wordEn: "Juice", wordHi: "रस", wordHiPhonetic: "जूस", emoji: "🧃", gradient: "bg-gradient-tracing" },
  { letter: "K", letterHi: "के", wordEn: "Kite", wordHi: "पतंग", wordHiPhonetic: "काइट", emoji: "🪁", gradient: "bg-gradient-colors" },
  { letter: "L", letterHi: "एल", wordEn: "Lion", wordHi: "शेर", wordHiPhonetic: "लायन", emoji: "🦁", gradient: "bg-gradient-animals" },
  { letter: "M", letterHi: "एम", wordEn: "Moon", wordHi: "चाँद", wordHiPhonetic: "मून", emoji: "🌙", gradient: "bg-gradient-abc" },
  { letter: "N", letterHi: "एन", wordEn: "Nest", wordHi: "घोंसला", wordHiPhonetic: "नेस्ट", emoji: "🪺", gradient: "bg-gradient-numbers" },
  { letter: "O", letterHi: "ओ", wordEn: "Orange", wordHi: "संतरा", wordHiPhonetic: "ऑरेंज", emoji: "🍊", gradient: "bg-gradient-shapes" },
  { letter: "P", letterHi: "पी", wordEn: "Panda", wordHi: "पांडा", wordHiPhonetic: "पांडा", emoji: "🐼", gradient: "bg-gradient-tracing" },
  { letter: "Q", letterHi: "क्यू", wordEn: "Queen", wordHi: "रानी", wordHiPhonetic: "क्वीन", emoji: "👑", gradient: "bg-gradient-colors" },
  { letter: "R", letterHi: "आर", wordEn: "Rainbow", wordHi: "इंद्रधनुष", wordHiPhonetic: "रेनबो", emoji: "🌈", gradient: "bg-gradient-animals" },
  { letter: "S", letterHi: "एस", wordEn: "Sun", wordHi: "सूरज", wordHiPhonetic: "सन", emoji: "☀️", gradient: "bg-gradient-abc" },
  { letter: "T", letterHi: "टी", wordEn: "Tree", wordHi: "पेड़", wordHiPhonetic: "ट्री", emoji: "🌳", gradient: "bg-gradient-numbers" },
  { letter: "U", letterHi: "यू", wordEn: "Umbrella", wordHi: "छतरी", wordHiPhonetic: "अम्ब्रेला", emoji: "☂️", gradient: "bg-gradient-shapes" },
  { letter: "V", letterHi: "वी", wordEn: "Van", wordHi: "गाड़ी", wordHiPhonetic: "वैन", emoji: "🚐", gradient: "bg-gradient-tracing" },
  { letter: "W", letterHi: "डब्ल्यू", wordEn: "Whale", wordHi: "ह्वेल मछली", wordHiPhonetic: "ह्वेल", emoji: "🐳", gradient: "bg-gradient-colors" },
  { letter: "X", letterHi: "एक्स", wordEn: "Xylophone", wordHi: "जलतरंग", wordHiPhonetic: "जाइलोफोन", emoji: "🎹", gradient: "bg-gradient-animals" },
  { letter: "Y", letterHi: "वाई", wordEn: "Yo-yo", wordHi: "यो-यो", wordHiPhonetic: "यो-यो", emoji: "🪀", gradient: "bg-gradient-abc" },
  { letter: "Z", letterHi: "जेड", wordEn: "Zebra", wordHi: "जेब्रा", wordHiPhonetic: "जेब्रा", emoji: "🦓", gradient: "bg-gradient-numbers" },
];

function ABC() {
  const lang = useLang();
  const LETTERS = BILINGUAL_LETTERS;
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);
  const safeIdx = idx % LETTERS.length;
  const item = LETTERS[safeIdx];

  const particles = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: `${burst}-${i}`,
    x: Math.cos((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    y: Math.sin((i / 14) * Math.PI * 2) * (60 + Math.random() * 40),
    emoji: ["⭐", "✨", "💖", "🌟"][i % 4],
  })), [burst]);

  useEffect(() => {
    haptic(); pop();
    const t = setTimeout(() => {
      if (lang === "hi") {
        // Hindi mode: "ए... ए से एप्पल... एप्पल यानी सेब!"
        speak(`${item.letterHi}... ${item.letterHi} से ${item.wordHiPhonetic}... ${item.wordHiPhonetic} यानी ${item.wordHi}!`);
      } else {
        // English mode: "A... A for Apple... Apple means Seb!"
        speak(`${item.letter}... ${item.letter} for ${item.wordEn}... ${item.wordEn} means ${item.wordHi}!`);
      }
    }, 150);
    return () => clearTimeout(t);
  }, [item.letter, item.wordEn, lang]);

  function handleTap() {
    haptic(20); chime();
    setBurst((b) => b + 1);
    markLetter(item.letter);
    if (lang === "hi") {
      speak(`${item.letterHi} फॉर ${item.wordHiPhonetic}! ${item.wordHiPhonetic} यानी ${item.wordHi}!`);
    } else {
      speak(`${item.letter} for ${item.wordEn}! ${item.wordEn} means ${item.wordHi}!`);
    }
  }

  return (
    <main className={`min-h-screen ${item.gradient} flex flex-col select-none transition-colors duration-500`}>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop text-sm font-extrabold">{safeIdx + 1} / {LETTERS.length}</div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {particles.map((p) => (
            <span key={p.id} className="absolute text-3xl" style={{ animation: "pop-in 0.7s cubic-bezier(.34,1.56,.64,1) both", transform: `translate(${p.x}px, ${p.y}px)` }}>
              {p.emoji}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={handleTap}
          aria-label={`${item.letter} for ${item.wordEn}`}
          key={`${lang}-${item.letter}`}
          className="relative bg-white rounded-[48px] size-64 sm:size-80 flex items-center justify-center shadow-pop active:scale-95 transition-transform animate-pop-in"
        >
          <span className="text-[12rem] sm:text-[16rem] font-black leading-none bg-gradient-hero bg-clip-text text-transparent">
            {item.letter}
          </span>
        </button>

        <div className="mt-8 flex items-center gap-4 bg-white/95 rounded-full pl-3 pr-6 py-3 shadow-pop animate-pop-in">
          <span className="text-5xl animate-wiggle">{item.emoji}</span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-2xl font-extrabold">
              {lang === "hi" ? `${item.wordHiPhonetic} (${item.wordHi})` : item.wordEn}
            </span>
            {lang === "hi" && <span className="text-xs font-bold text-muted-foreground">{item.wordEn}</span>}
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-between px-6 pb-8 pt-4">
        <button type="button" onClick={() => setIdx((i) => (i - 1 + LETTERS.length) % LETTERS.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Previous">⬅️</button>
        <button type="button" onClick={() => setIdx((i) => (i + 1) % LETTERS.length)} className="size-20 rounded-full bg-white shadow-pop text-4xl flex items-center justify-center active:scale-90" aria-label="Next">➡️</button>
      </nav>
    </main>
  );
}
