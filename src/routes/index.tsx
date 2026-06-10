import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mascot } from "@/components/Mascot";
import { ModuleCard } from "@/components/ModuleCard";
import { loadProgress } from "@/lib/progress";
import { speak, pop, haptic } from "@/lib/audio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tiny Genius — Toddler Learning Playground" },
      { name: "description", content: "A magical, ad-free learning app for toddlers aged 1–3. Letters, numbers, tracing, animals and more." },
      { name: "theme-color", content: "#FF7AB6" },
      { property: "og:title", content: "Tiny Genius — Toddler Learning Playground" },
      { property: "og:description", content: "A magical, ad-free learning app for toddlers aged 1–3." },
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
  const [stars, setStars] = useState(0);
  useEffect(() => { setStars(loadProgress().stars); }, []);

  return (
    <main className="min-h-screen bg-background pb-12 select-none">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-pop">
          <span className="text-2xl" aria-hidden>⭐</span>
          <span className="text-xl font-extrabold text-foreground tabular-nums">{stars}</span>
        </div>
        <Link
          to="/parent"
          className="rounded-full bg-white/80 backdrop-blur px-4 py-2 shadow-pop text-sm font-bold text-foreground"
          aria-label="Parent area"
        >
          👨‍👩‍👧 Parents
        </Link>
      </header>

      {/* Hero */}
      <section className="px-5 pt-4 pb-8 text-center">
        <Mascot
          size={180}
          onClick={() => { haptic(); pop(); speak("Hi! Let's learn together!"); }}
          className="mx-auto"
        />
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight bg-gradient-hero bg-clip-text text-transparent leading-none">
          Tiny Genius
        </h1>
        <p className="mt-2 text-base font-semibold text-muted-foreground">Tap anything — let's play!</p>
      </section>

      {/* Modules */}
      <section className="px-4 grid grid-cols-2 gap-4">
        <ModuleCard to="/abc" title="ABC" emoji="🅰️" gradient="bg-gradient-abc" description="Letters & sounds" />
        <ModuleCard to="/numbers" title="123" emoji="🔢" gradient="bg-gradient-numbers" description="Count to 10" />
        <ModuleCard to="/tracing" title="Trace" emoji="✏️" gradient="bg-gradient-tracing" description="Write & draw" />
        <ModuleCard to="/shapes" title="Shapes" emoji="🔺" gradient="bg-gradient-shapes" description="Match & learn" />
        <ModuleCard to="/colors" title="Colors" emoji="🎨" gradient="bg-gradient-colors" description="Splash & play" />
        <ModuleCard to="/animals" title="Animals" emoji="🦁" gradient="bg-gradient-animals" description="Sounds & names" />
      </section>

      <p className="mt-10 text-center text-xs font-semibold text-muted-foreground px-6">
        Ad-free • Safe for ages 1–3 • Works offline after first visit
      </p>
    </main>
  );
}
