import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
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
    youtubeId: "m-bw5zcn5hg"
  },
  {
    id: "machli",
    title: "Machli Jal Ki Rani",
    titleHi: "मछली जल की रानी",
    emoji: "🐟",
    lang: "hi",
    bgGradient: "bg-gradient-animals",
    floatingEmojis: ["🐟", "🌊", "💧", "🐠"],
    youtubeId: "F72r2aU0NW8"
  },
  {
    id: "twinkle",
    title: "Twinkle Twinkle Little Star",
    titleHi: "ट्विंकल ट्विंकल",
    emoji: "⭐",
    lang: "en",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["⭐", "✨", "🌟", "🌙"],
    youtubeId: "5HRrKZQxaXo"
  },
  {
    id: "chanda",
    title: "Chanda Mama Door Ke",
    titleHi: "चंदा मामा दूर के",
    emoji: "🌙",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🌙", "⭐", "🥣", "🍯"],
    youtubeId: "7iVIJDKHhDU"
  },
  {
    id: "kathi",
    title: "Lakdi Ki Kathi",
    titleHi: "लकड़ी की काठी",
    emoji: "🐴",
    lang: "hi",
    bgGradient: "bg-gradient-colors",
    floatingEmojis: ["🐴", "🔨", "🪵", "🏃"],
    youtubeId: "uT0KgOrFwdA"
  },
  {
    id: "naani",
    title: "Naani Teri Morni",
    titleHi: "नानी तेरी मोरनी को मोर ले गया",
    emoji: "🦚",
    lang: "hi",
    bgGradient: "bg-gradient-tracing",
    floatingEmojis: ["🦚", "🦜", "🌸", "🎶"],
    youtubeId: "VI5N37BqwwI"
  },
  {
    id: "tamatar",
    title: "Aaha Tamatar",
    titleHi: "आहा टमाटर बड़े मज़ेदार",
    emoji: "🍅",
    lang: "hi",
    bgGradient: "bg-gradient-abc",
    floatingEmojis: ["🍅", "🥕", "🧅", "🥦"],
    youtubeId: "GeVTkEq4pDs"
  },
  {
    id: "roti",
    title: "Mummy Ki Roti Gol Gol",
    titleHi: "मम्मी की रोटी गोल गोल",
    emoji: "🫓",
    lang: "hi",
    bgGradient: "bg-gradient-numbers",
    floatingEmojis: ["🫓", "💰", "👩‍🍳", "😋"],
    youtubeId: "7BLC80zJQk4"
  },
  {
    id: "aloo",
    title: "Aloo Kachalu Beta",
    titleHi: "आलू कचालू बेटा कहाँ गये थे",
    emoji: "🥔",
    lang: "hi",
    bgGradient: "bg-gradient-shapes",
    floatingEmojis: ["🥔", "🧆", "😄", "🍽️"],
    youtubeId: "5iGi3JpU6h0"
  },
];

function Rhymes() {
  const lang = useLang();
  const [selected, setSelected] = useState<Rhyme | null>(null);
  const [burst, setBurst] = useState(0);

  function handleClose() {
    setSelected(null);
  }

  useEffect(() => {
    return () => { /* cleanup */ };
  }, []);

  const particles = useMemo(() => {
    if (!selected) return [];
    return Array.from({ length: 10 }, (_, i) => ({
      id: `${burst}-${i}`,
      x: Math.sin(i * 1.5) * 90 + (Math.random() - 0.5) * 30,
      y: Math.cos(i * 1.5) * 90 + (Math.random() - 0.5) * 30,
      emoji: selected.floatingEmojis[i % selected.floatingEmojis.length]
    }));
  }, [selected, burst]);

  return (
    <main className="min-h-screen bg-gradient-rhymes flex flex-col select-none">
      {selected ? (
        <div className={`fixed inset-0 z-50 ${selected.bgGradient} flex flex-col p-5 animate-pop-in`}>
          <header className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full bg-white/90 size-14 flex items-center justify-center shadow-pop text-2xl active:scale-95"
              aria-label="Back"
            >
              ⬅️
            </button>
            <h1 className={`text-xl font-extrabold text-white drop-shadow-sm text-center flex-1 px-2 ${selected.lang === "hi" ? "font-hindi" : ""}`}>
              {lang === "hi" ? selected.titleHi : selected.title}
            </h1>
            <span className="size-14" />
          </header>

          <section className="flex-1 flex flex-col items-center justify-start pt-4 px-0 relative overflow-y-auto">
            {/* Particle splash */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute text-3xl animate-float-y"
                  style={{
                    transform: `translate(${p.x}px, ${p.y}px)`,
                    animationDelay: `${parseInt(p.id.split("-")[1]) * 150}ms`
                  }}
                >
                  {p.emoji}
                </span>
              ))}
            </div>

            {/* YouTube Video Embed — full width, autoplay */}
            <div className="w-full bg-black rounded-3xl overflow-hidden shadow-pop animate-pop-in">
              <div className="relative aspect-video w-full">
                <iframe
                  key={selected.youtubeId}
                  src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={selected.title}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Title card below video */}
            <div className="mt-3 w-full bg-white/90 rounded-2xl px-5 py-3 shadow-pop text-center animate-pop-in">
              <p className={`text-2xl font-extrabold text-slate-800 ${selected.lang === "hi" ? "font-hindi" : ""}`}>
                {lang === "hi" ? selected.titleHi : selected.title}
              </p>
              <p className="text-xs font-bold text-slate-400 mt-1">
                {selected.lang === "hi" ? "Hindi Song • हिंदी गाना" : "English Rhyme"}
              </p>
            </div>
          </section>
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
                    setBurst((b) => b + 1);
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
