import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { haptic, pop } from "@/lib/audio";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/rhymes")({
  head: () => ({
    meta: [
      { title: "Rhymes — Tiny Genius" },
      { name: "description", content: "Sing along and watch popular bilingual nursery rhymes and videos." },
    ],
  }),
  component: Rhymes,
});

interface Rhyme {
  id: string;
  title: string;
  titleHi: string;
  emoji: string;
  lang: "en" | "hi";
  bgGradient: string;
  floatingEmojis: string[];
  youtubeId: string;
  startSec: number; // skip channel intro
  endSec: number;   // stop before end-screen ads
}

const RHYMES_DATA: Rhyme[] = [
  {
    id: "johny",
    title: "Johny Johny Yes Papa",
    titleHi: "जॉनी जॉनी यस पापा",
    emoji: "👶",
    lang: "en",
    bgGradient: "bg-gradient-abc",
    floatingEmojis: ["👶", "🍬", "🍭", "😀"],
    youtubeId: "m-bw5zcn5hg",
    startSec: 10, endSec: 188
  },
  {
    id: "machli",
    title: "Machli Jal Ki Rani",
    titleHi: "मछली जल की रानी",
    emoji: "🐟",
    lang: "hi",
    bgGradient: "bg-gradient-animals",
    floatingEmojis: ["🐟", "🌊", "💧", "🐠"],
    youtubeId: "F72r2aU0NW8",
    startSec: 10, endSec: 163
  },
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    titleHi: "ट्विंकल ट्विंकल",
    emoji: "⭐",
    lang: "en",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["⭐", "✨", "🌟", "🌙"],
    youtubeId: "5HRrKZQxaXo",
    startSec: 10, endSec: 143
  },
  {
    id: "chanda",
    title: "Chanda Mama Door Ke",
    titleHi: "चंदा मामा दूर के",
    emoji: "🌙",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🌙", "⭐", "🥣", "🍯"],
    youtubeId: "7iVIJDKHhDU",
    startSec: 10, endSec: 148
  },
  {
    id: "kathi",
    title: "Lakdi Ki Kathi",
    titleHi: "लकड़ी की काठी",
    emoji: "🐴",
    lang: "hi",
    bgGradient: "bg-gradient-colors",
    floatingEmojis: ["🐴", "🔨", "🪵", "🏃"],
    youtubeId: "uT0KgOrFwdA",
    startSec: 10, endSec: 158
  },
  {
    id: "naani",
    title: "Naani Teri Morni",
    titleHi: "नानी तेरी मोरनी को मोर ले गया",
    emoji: "🦚",
    lang: "hi",
    bgGradient: "bg-gradient-tracing",
    floatingEmojis: ["🦚", "🦜", "🌸", "🎶"],
    youtubeId: "VI5N37BqwwI",
    startSec: 10, endSec: 153
  },
  {
    id: "tamatar",
    title: "Aaha Tamatar",
    titleHi: "आहा टमाटर बड़े मज़ेदार",
    emoji: "🍅",
    lang: "hi",
    bgGradient: "bg-gradient-abc",
    floatingEmojis: ["🍅", "🥕", "🧅", "🥦"],
    youtubeId: "GeVTkEq4pDs",
    startSec: 10, endSec: 177
  },
  {
    id: "roti",
    title: "Mummy Ki Roti Gol Gol",
    titleHi: "मम्मी की रोटी गोल गोल",
    emoji: "🫓",
    lang: "hi",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["🫓", "💰", "👩‍🍳", "😋"],
    youtubeId: "7BLC80zJQk4",
    startSec: 10, endSec: 128
  },
  {
    id: "aloo",
    title: "Aloo Kachalu Beta",
    titleHi: "आलू कचालू बेटा कहाँ गये थे",
    emoji: "🥔",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🥔", "🧆", "😄", "🍽️"],
    youtubeId: "5iGi3JpU6h0",
    startSec: 10, endSec: 143
  },
];

function Rhymes() {
  const lang = useLang();
  const [selected, setSelected] = useState<Rhyme | null>(null);

  function handleClose() {
    setSelected(null);
  }

  return (
    <main className="min-h-screen bg-gradient-rhymes flex flex-col select-none">
      {selected ? (
        <div className={`fixed inset-0 z-50 ${selected.bgGradient} flex flex-col animate-pop-in overflow-hidden`}>
          {/* Floating emoji decorations */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {selected.floatingEmojis.map((e, i) => (
              <span
                key={i}
                className="absolute text-4xl opacity-40 animate-bounce"
                style={{
                  left: `${(i * 23 + 8) % 90}%`,
                  top: `${(i * 31 + 12) % 80}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              >
                {e}
              </span>
            ))}
          </div>

          {/* Compact header */}
          <header className="relative z-10 flex items-center gap-3 px-4 pt-5 pb-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full bg-white/95 size-11 flex items-center justify-center shadow-pop text-xl active:scale-95 flex-shrink-0"
              aria-label="Back"
            >
              ⬅️
            </button>
            <h1 className={`flex-1 text-lg font-extrabold text-white drop-shadow-md leading-tight ${selected.lang === "hi" ? "font-hindi" : ""}`}>
              {lang === "hi" ? selected.titleHi : selected.title}
            </h1>
          </header>

          {/* Video — fixed 16:9 frame inside a colorful, rounded "TV" so no black bars */}
          <div className="relative z-10 flex-1 px-4 pb-4 flex flex-col items-center justify-center min-h-0">
            <div
              className="w-full max-w-md rounded-[32px] p-3 shadow-pop"
              style={{
                background: "linear-gradient(135deg, #ffd6f0, #ffe9b8, #bde4ff)",
                border: "4px solid rgba(255,255,255,0.85)",
              }}
            >
              <div className="relative w-full overflow-hidden rounded-[22px] bg-black/80" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  key={selected.youtubeId}
                  src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&fs=1&start=${selected.startSec}&end=${selected.endSec}`}
                  title={selected.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {/* Decorative dots like a TV bezel */}
              <div className="flex justify-center gap-1.5 mt-2">
                <span className="size-2 rounded-full bg-pink-400"></span>
                <span className="size-2 rounded-full bg-amber-400"></span>
                <span className="size-2 rounded-full bg-sky-400"></span>
              </div>
            </div>

            {/* Info chip */}
            <div className="mt-4 w-full max-w-md bg-white/95 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-pop">
              <span className="text-3xl">{selected.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-extrabold text-slate-800 text-sm leading-tight truncate ${selected.lang === "hi" ? "font-hindi" : ""}`}>
                  {lang === "hi" ? selected.titleHi : selected.title}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  {selected.lang === "hi" ? "Hindi Song • हिंदी गाना" : "English Rhyme"}
                </p>
              </div>
            </div>
          </div>
        </div>

      ) : (
        <>
          <header className="flex items-center justify-between px-5 pt-6">
            <Link
              to="/"
              className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95"
              aria-label="Home"
            >
              🏠
            </Link>
            <h1 className="text-2xl font-extrabold text-white drop-shadow-md">
              {lang === "hi" ? "बाल कविताएं 🎶" : "Rhymes & Poems 🎶"}
            </h1>
            <Link to="/parent" className="rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop text-sm font-bold">
              👨‍👩‍👧
            </Link>
          </header>

          <section className="flex-1 px-5 py-4 overflow-y-auto">
            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
              {RHYMES_DATA.map((rhyme, i) => (
                <button
                  key={rhyme.id}
                  type="button"
                  onClick={() => {
                    haptic(15);
                    pop();
                    setSelected(rhyme);
                  }}
                  className="w-full rounded-[28px] p-4 shadow-pop flex items-center justify-between text-left active:scale-[0.97] transition-transform bg-white border border-slate-100 animate-pop-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl bg-slate-50 rounded-2xl p-2 size-14 flex items-center justify-center shadow-sm">
                      {rhyme.emoji}
                    </span>
                    <div className="flex flex-col">
                      <span className={`text-base font-extrabold text-slate-800 leading-tight ${rhyme.lang === "hi" ? "font-hindi" : ""}`}>
                        {lang === "hi" ? rhyme.titleHi : rhyme.title}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 mt-0.5">
                        {rhyme.lang === "hi" ? "Hindi • हिंदी" : "English Rhyme"}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl ml-2">▶️</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
