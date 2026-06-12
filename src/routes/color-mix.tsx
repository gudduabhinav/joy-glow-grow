import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { speak, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, COLORS_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/color-mix")({
  head: () => ({
    meta: [
      { title: "Color Mix Lab — Tiny Genius" },
      { name: "description", content: "Mix colors to create new ones." },
    ],
  }),
  component: ColorMix,
});

const colorMixes: { color1: string; color2: string; result: string }[] = [
  { color1: "#FF4D4D", color2: "#FFD93D", result: "#FFB84D" }, // red + yellow = orange
  { color1: "#4D9DFF", color2: "#FF4D4D", result: "#A66BFF" }, // blue + red = purple
  { color1: "#FF7AB6", color2: "#FFD93D", result: "#FFA566" }, // pink + yellow = coral
];

function ColorMix() {
  const lang = useLang();
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const mix = useMemo(() => colorMixes[Math.floor(Math.random() * colorMixes.length)], []);

  const handleColorClick = (hex: string) => {
    const newSelected = [...selected, hex];
    setSelected(newSelected);
    haptic();

    if (newSelected.length === 2) {
      const isCorrect =
        (newSelected[0] === mix.color1 && newSelected[1] === mix.color2) ||
        (newSelected[0] === mix.color2 && newSelected[1] === mix.color1);

      if (isCorrect) {
        chime();
        speak(t("correct", lang));
        addStars(5);
        setScore((s) => s + 1);
        setTimeout(() => {
          setSelected([]);
        }, 1500);
      } else {
        speak(t("tryAgain", lang));
        setTimeout(() => {
          setSelected([]);
        }, 800);
      }
    }
  };

  return (
    <main className="min-h-screen bg-background pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("colorMixLab", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-6">{t("colorMixDesc", lang)}</p>
        <p className="text-2xl font-extrabold text-primary mb-8">⭐ {score}</p>

        {/* Target color */}
        <div className="max-w-xs mx-auto mb-8">
          <p className="text-sm text-muted-foreground mb-3">Make this color:</p>
          <div
            className="w-24 h-24 rounded-3xl shadow-pop mx-auto border-4 border-primary/30"
            style={{ backgroundColor: mix.result }}
          />
        </div>

        {/* Selected colors */}
        {selected.length > 0 && (
          <div className="flex justify-center gap-3 mb-8">
            {selected.map((hex, idx) => (
              <div
                key={idx}
                className="w-12 h-12 rounded-2xl shadow-pop border-2 border-white"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        )}

        {/* Color options */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {COLORS_DATA.slice(0, 6).map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorClick(color.hex)}
              disabled={selected.length === 2}
              className="w-16 h-16 rounded-2xl shadow-pop active:scale-95 transition-transform border-3 border-white"
              style={{
                backgroundColor: color.hex,
                opacity: selected.length === 2 ? 0.5 : 1,
              }}
            />
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link to="/" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
          🏠 {t("home", lang)}
        </Link>
      </div>
    </main>
  );
}
