import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { speak, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang, SHAPES_DATA } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/shape-builder")({
  head: () => ({
    meta: [
      { title: "Shape Builder — Tiny Genius" },
      { name: "description", content: "Build with shapes!" },
    ],
  }),
  component: ShapeBuilder,
});

function ShapeBuilder() {
  const lang = useLang();
  const objects = [
    { name: "house", shapes: ["square", "triangle"], emoji: "🏠" },
    { name: "tree", shapes: ["triangle", "square"], emoji: "🌳" },
    { name: "rocket", shapes: ["triangle", "square", "square"], emoji: "🚀" },
  ];

  const target = useMemo(() => objects[Math.floor(Math.random() * objects.length)], []);
  const [placed, setPlaced] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleShapeDrop = (shapeId: string) => {
    haptic();
    const newPlaced = [...placed, shapeId];
    setPlaced(newPlaced);

    if (newPlaced.length === target.shapes.length) {
      const isCorrect = newPlaced.every(
        (shape, idx) => SHAPES_DATA.find((s) => s.id === shape)?.id === target.shapes[idx]
      );

      if (isCorrect) {
        chime();
        speak(t("complete", lang));
        addStars(10);
        setCompleted(true);
      } else {
        speak(t("tryAgain", lang));
        setPlaced([]);
      }
    }
  };

  if (completed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-sunshine/10 flex items-center justify-center pb-12">
        <div className="text-center">
          <p className="text-7xl mb-4">{target.emoji}</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("complete", lang)}!</h1>
          <p className="text-lg text-primary font-bold mb-8">⭐ 10</p>
          <Link to="/shape-builder" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
            🔄 Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-sunshine/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("shapeBuilder", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 text-center">
        <p className="text-lg font-bold mb-4">{t("shapeBuilderDesc", lang)}</p>
        <p className="text-5xl mb-6">{target.emoji}</p>

        <div className="bg-white/80 rounded-2xl p-6 shadow-pop max-w-xs mx-auto mb-8">
          <p className="text-sm text-muted-foreground mb-3">Shapes needed:</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {target.shapes.map((shapeId, idx) => {
              const shape = SHAPES_DATA.find((s) => s.id === shapeId);
              return (
                <div key={idx} className="text-3xl">{shape?.emoji}</div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {SHAPES_DATA.slice(0, 3).map((shape) => (
            <button
              key={shape.id}
              onClick={() => handleShapeDrop(shape.id)}
              className="aspect-square rounded-2xl bg-white/80 shadow-pop active:scale-95 transition-transform border-2 border-primary/20"
            >
              <div className="text-3xl">{shape.emoji}</div>
            </button>
          ))}
        </div>

        {placed.length > 0 && (
          <p className="mt-6 text-sm text-muted-foreground">
            {placed.length}/{target.shapes.length}
          </p>
        )}
      </section>
    </main>
  );
}
