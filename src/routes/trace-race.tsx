import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { speak, chime, haptic } from "@/lib/audio";
import { addStars } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/trace-race")({
  head: () => ({
    meta: [
      { title: "Trace Race — Tiny Genius" },
      { name: "description", content: "Race to trace the pattern." },
    ],
  }),
  component: TraceRace,
});

const patterns = [
  { name: "zigzag", instructions: "Make a zigzag!" },
  { name: "circle", instructions: "Draw a circle!" },
  { name: "wave", instructions: "Make waves!" },
];

function TraceRace() {
  const lang = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [time, setTime] = useState(30);
  const [completed, setCompleted] = useState(false);
  const [pattern] = useState(() => patterns[Math.floor(Math.random() * patterns.length)]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    haptic();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "oklch(0.72 0.21 350)";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleClear = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const handleComplete = () => {
    haptic();
    chime();
    speak(t("complete", lang));
    const stars = addStars(Math.max(5, time));
    setCompleted(true);
  };

  if (completed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 flex items-center justify-center pb-12">
        <div className="text-center">
          <p className="text-7xl mb-4">🎉</p>
          <h1 className="text-3xl font-extrabold mb-2">{t("complete", lang)}!</h1>
          <p className="text-lg text-primary font-bold mb-8">⭐ {Math.max(5, time)}</p>
          <Link to="/trace-race" className="inline-flex items-center justify-center rounded-2xl bg-gradient-hero text-white font-extrabold py-3 px-8 shadow-pop">
            🔄 Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-mint/20 via-background to-sky/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("traceRace", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8">
        <p className="text-center text-lg font-bold mb-4">{pattern.instructions}</p>
        <p className="text-center text-3xl font-extrabold text-primary mb-6">⏱️ {time}s</p>

        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="w-full max-w-sm mx-auto border-3 border-primary/30 rounded-2xl bg-white shadow-pop cursor-crosshair"
          style={{ touchAction: "none" }}
        />

        <div className="flex gap-3 justify-center mt-6 max-w-sm mx-auto">
          <button
            onClick={handleClear}
            className="flex-1 rounded-xl bg-muted text-foreground font-bold py-2 shadow-pop active:scale-95 transition-transform"
          >
            🗑️ Clear
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 rounded-xl bg-gradient-hero text-white font-bold py-2 shadow-pop active:scale-95 transition-transform"
          >
            ✓ Done
          </button>
        </div>
      </section>
    </main>
  );
}
