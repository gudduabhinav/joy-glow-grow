import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mascot } from "@/components/Mascot";
import { ModuleCard } from "@/components/ModuleCard";
import { LangToggle } from "@/components/LangToggle";
import { loadProgress } from "@/lib/progress";
import { speak, pop, haptic } from "@/lib/audio";
import { t, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiny Genius — Toddler Learning Playground" },
      { name: "description", content: "Magical bilingual (English + हिन्दी) learning app for toddlers 1–3. Letters, numbers, shapes, colors, animals." },
      { name: "theme-color", content: "#FF7AB6" },
      { property: "og:title", content: "Tiny Genius — Toddler Learning Playground" },
      { property: "og:description", content: "Bilingual (English + Hindi) toddler learning playground." },
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

function Home() {
  const lang = useLang();
  const [stars, setStars] = useState(0);
  useEffect(() => { setStars(loadProgress().stars); }, []);

  return (
    <main className="min-h-screen bg-background pb-12 select-none">
      <header className="flex items-center justify-between gap-2 px-4 pt-6">
        <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-pop">
          <span className="text-2xl">⭐</span>
          <span className="text-xl font-extrabold tabular-nums">{stars}</span>
        </div>
        <LangToggle />
        <Link to="/parent" className="rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow-pop text-sm font-bold">
          👨‍👩‍👧 {t("parents", lang)}
        </Link>
      </header>

      <section className="px-5 pt-4 pb-8 text-center">
        <Mascot
          size={180}
          onClick={() => { haptic(); pop(); speak(t("hello", lang)); }}
          className="mx-auto"
        />
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight bg-gradient-hero bg-clip-text text-transparent leading-none">
          Tiny Genius
        </h1>
        <p className="mt-2 text-base font-semibold text-muted-foreground">{t("appTagline", lang)}</p>
      </section>

      <section className="px-4 grid grid-cols-2 gap-4">
        <ModuleCard to="/rhymes" title={t("rhymes", lang)} emoji="🎶" gradient="bg-gradient-rhymes" description={t("rhymesDesc", lang)} className="col-span-2" />
        <ModuleCard to="/abc" title={t("abc", lang)} emoji="🅰️" gradient="bg-gradient-abc" description={t("abcDesc", lang)} />
        <ModuleCard to="/numbers" title={t("numbers", lang)} emoji="🔢" gradient="bg-gradient-numbers" description={t("numbersDesc", lang)} />
        <ModuleCard to="/tracing" title={t("trace", lang)} emoji="✏️" gradient="bg-gradient-tracing" description={t("traceDesc", lang)} />
        <ModuleCard to="/shapes" title={t("shapes", lang)} emoji="🔺" gradient="bg-gradient-shapes" description={t("shapesDesc", lang)} />
        <ModuleCard to="/colors" title={t("colors", lang)} emoji="🎨" gradient="bg-gradient-colors" description={t("colorsDesc", lang)} />
        <ModuleCard to="/animals" title={t("animals", lang)} emoji="🦁" gradient="bg-gradient-animals" description={t("animalsDesc", lang)} />
      </section>

      <p className="mt-10 text-center text-xs font-semibold text-muted-foreground px-6">
        {t("footer", lang)}
      </p>
    </main>
  );
}
