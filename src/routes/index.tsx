import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mascot } from "@/components/Mascot";
import { ModuleCard } from "@/components/ModuleCard";
import { LangToggle } from "@/components/LangToggle";
import { loadProgress, updateStreak } from "@/lib/progress";
import { speak, pop, haptic } from "@/lib/audio";
import { t, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiny Genius — Toddler Learning Playground" },
      { name: "description", content: "Magical bilingual (English + हिन्दी) learning app for toddlers 1–3. Letters, numbers, shapes, colors, animals, games, and AI Madam." },
      { name: "theme-color", content: "#FF7AB6" },
      { property: "og:title", content: "Tiny Genius — Toddler Learning Playground" },
      { property: "og:description", content: "Bilingual (English + Hindi) toddler learning playground with AI Madam." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "icon", href: "/icon-192.png", type: "image/png" },
    ],
  }),
  component: Home,
});

type Tab = "study" | "play";

function Home() {
  const lang = useLang();
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(1);
  const [tab, setTab] = useState<Tab>(() => {
    if (typeof window === "undefined") return "study";
    return (window.localStorage.getItem("tinygenius.tab") as Tab) || "study";
  });

  useEffect(() => {
    const p = loadProgress();
    setStars(p.stars);
    setStreak(updateStreak());
    const onFocus = () => { const fp = loadProgress(); setStars(fp.stars); setStreak(fp.streak ?? 1); };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  useEffect(() => {
    try { window.localStorage.setItem("tinygenius.tab", tab); } catch { /* noop */ }
  }, [tab]);

  return (
    <main className="min-h-screen bg-background pb-12 select-none">
      <header className="flex items-center justify-between gap-2 px-4 pt-6">
        <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-pop">
          <span className="text-2xl">⭐</span>
          <span className="text-xl font-extrabold tabular-nums">{stars}</span>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop">
          <span className="text-lg">🔥</span>
          <span className="text-base font-extrabold tabular-nums">{streak}</span>
        </div>
        <LangToggle />
        <Link to="/parent" className="rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop text-sm font-bold">
          👨‍👩‍👧 {t("parents", lang)}
        </Link>
      </header>

      <section className="px-5 pt-4 pb-4 text-center">
        <Mascot
          size={150}
          onClick={() => { haptic(); pop(); speak(t("hello", lang)); }}
          className="mx-auto"
        />
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight bg-gradient-hero bg-clip-text text-transparent leading-none">
          Tiny Genius
        </h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{t("appTagline", lang)}</p>
      </section>

      {/* AI Madam — featured */}
      <section className="px-4">
        <Link
          to="/madam"
          className="relative flex items-center gap-3 rounded-3xl bg-gradient-to-r from-bubblegum to-grape p-4 shadow-pop active:scale-[0.98] transition-transform overflow-hidden"
        >
          <span className="absolute -right-4 -top-4 size-24 rounded-full bg-white/30 blur-2xl" aria-hidden />
          <div className="text-5xl">👩‍🏫</div>
          <div className="flex-1 text-left">
            <p className="text-xl font-extrabold text-white drop-shadow">💖 {t("madam", lang)}</p>
            <p className="text-xs font-semibold text-white/90">{t("madamDesc", lang)}</p>
          </div>
          <span className="text-2xl">🎤</span>
        </Link>
      </section>

      {/* Tabs */}
      <nav className="sticky top-0 z-10 mt-5 px-4 pb-3 pt-3 bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-fit items-center gap-1 rounded-full bg-white/90 p-1 shadow-pop">
          {(["study", "play"] as const).map((id) => (
            <button
              key={id}
              onClick={() => { haptic(); pop(); setTab(id); }}
              className={`px-6 py-2 rounded-full text-base font-extrabold transition-all ${
                tab === id ? "bg-gradient-hero text-white shadow" : "text-foreground/70"
              }`}
            >
              {id === "study" ? "📚" : "🎮"} {t(id, lang)}
            </button>
          ))}
        </div>
      </nav>

      {tab === "study" ? (
        <section className="px-4 grid grid-cols-2 gap-4 animate-fade-in">
          <ModuleCard to="/rhymes" title={t("rhymes", lang)} emoji="🎶" gradient="bg-gradient-rhymes" description={t("rhymesDesc", lang)} className="col-span-2" />
          <ModuleCard to="/abc" title={t("abc", lang)} emoji="🅰️" gradient="bg-gradient-abc" description={t("abcDesc", lang)} />
          <ModuleCard to="/numbers" title={t("numbers", lang)} emoji="🔢" gradient="bg-gradient-numbers" description={t("numbersDesc", lang)} />
          <ModuleCard to="/tracing" title={t("trace", lang)} emoji="✏️" gradient="bg-gradient-tracing" description={t("traceDesc", lang)} />
          <ModuleCard to="/shapes" title={t("shapes", lang)} emoji="🔺" gradient="bg-gradient-shapes" description={t("shapesDesc", lang)} />
          <ModuleCard to="/colors" title={t("colors", lang)} emoji="🎨" gradient="bg-gradient-colors" description={t("colorsDesc", lang)} />
          <ModuleCard to="/animals" title={t("animals", lang)} emoji="🦁" gradient="bg-gradient-animals" description={t("animalsDesc", lang)} />
          <ModuleCard to="/fruits" title={t("fruits", lang)} emoji="🍎" gradient="bg-gradient-shapes" description={t("fruitsDesc", lang)} />
          <ModuleCard to="/body" title={t("body", lang)} emoji="👁️" gradient="bg-gradient-colors" description={t("bodyDesc", lang)} />
          <ModuleCard to="/phonics-farm" title={t("phonicsFarm", lang)} emoji="🌾" gradient="bg-gradient-abc" description={t("phonicsFarmDesc", lang)} />
          <ModuleCard to="/story-builder" title={t("storyBuilder", lang)} emoji="📖" gradient="bg-gradient-rhymes" description={t("storyBuilderDesc", lang)} />
          <ModuleCard to="/quiz" title={t("quiz", lang)} emoji="🧠" gradient="bg-gradient-rhymes" description={t("quizDesc", lang)} className="col-span-2" />
        </section>
      ) : (
        <section className="px-4 grid grid-cols-2 gap-4 animate-fade-in">
          <ModuleCard to="/peek-a-buddy" title={t("peekABuddy", lang)} emoji="👋" gradient="bg-gradient-rhymes" description={t("peekABuddyDesc", lang)} />
          <ModuleCard to="/sound-match" title={t("soundMatch", lang)} emoji="🔊" gradient="bg-gradient-animals" description={t("soundMatchDesc", lang)} />
          <ModuleCard to="/color-mix" title={t("colorMixLab", lang)} emoji="🎨" gradient="bg-gradient-colors" description={t("colorMixDesc", lang)} />
          <ModuleCard to="/trace-race" title={t("traceRace", lang)} emoji="⚡" gradient="bg-gradient-tracing" description={t("traceRaceDesc", lang)} />
          <ModuleCard to="/rhythm-tap" title={t("rhythmTap", lang)} emoji="🎵" gradient="bg-gradient-rhymes" description={t("rhythmTapDesc", lang)} />
          <ModuleCard to="/puzzle-slide" title={t("puzzleSlide", lang)} emoji="🧩" gradient="bg-gradient-shapes" description={t("puzzleSlideDesc", lang)} />
          <ModuleCard to="/shape-builder" title={t("shapeBuilder", lang)} emoji="🔨" gradient="bg-gradient-shapes" description={t("shapeBuilderDesc", lang)} />
          <ModuleCard to="/treasure-map" title={t("treasureMap", lang)} emoji="🗺️" gradient="bg-gradient-numbers" description={t("treasureMapDesc", lang)} />
          <ModuleCard to="/memory-garden" title={t("memoryGarden", lang)} emoji="🌿" gradient="bg-gradient-animals" description={t("memoryGardenDesc", lang)} />
          <ModuleCard to="/sticker-studio" title={t("stickerStudio", lang)} emoji="✨" gradient="bg-gradient-abc" description={t("stickerStudioDesc", lang)} />
          <ModuleCard to="/daily-challenge" title={t("dailyChallenge", lang)} emoji="🌟" gradient="bg-gradient-hero" description={t("dailyChallengeDesc", lang)} />
          <ModuleCard to="/leaderboard" title={t("leaderboard", lang)} emoji="🏆" gradient="bg-gradient-colors" description={t("leaderboardDesc", lang)} />
          <ModuleCard to="/reward-shop" title={t("rewardShop", lang)} emoji="🛍️" gradient="bg-gradient-abc" description={t("rewardShopDesc", lang)} className="col-span-2" />
        </section>
      )}

      <p className="mt-10 text-center text-xs font-semibold text-muted-foreground px-6">
        {t("footer", lang)}
      </p>
    </main>
  );
}
