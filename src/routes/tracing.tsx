import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { chime, haptic, pop, speak } from "@/lib/audio";
import { markTraced } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/tracing")({
  head: () => ({
    meta: [
      { title: "Tracing — Tiny Genius" },
      { name: "description", content: "Trace English & Hindi letters and numbers with a rainbow brush." },
    ],
  }),
  component: Tracing,
});

const EN_ITEMS = ["A", "B", "C", "1", "2", "3", "O", "L", "S"];
const HI_ITEMS = ["अ", "आ", "क", "ख", "ग", "१", "२", "३", "ओ"];

function Tracing() {
  const lang = useLang();
  const ITEMS = lang === "hi" ? HI_ITEMS : EN_ITEMS;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const strokeCountRef = useRef(0);
  const [idx, setIdx] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const item = ITEMS[idx % ITEMS.length];

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    drawGuide(ctx, rect.width, rect.height, item);
    strokeCountRef.current = 0;
    setCelebrate(false);
    const isNumber = /[0-9०-९१२३४५६७८९]/.test(item);
    if (lang === "hi") speak(isNumber ? `अंक ${item} लिखो` : `अक्षर ${item} लिखो`);
    else speak(`Trace the ${isNumber ? "number" : "letter"} ${item}`);
  }, [item, lang]);

  function drawGuide(ctx: CanvasRenderingContext2D, w: number, h: number, ch: string) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillRect(0, 0, w, h);
    ctx.font = `900 ${Math.min(w, h) * 0.75}px Fredoka, system-ui`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillText(ch, w / 2, h / 2 + 8);
    ctx.lineWidth = 6;
    ctx.setLineDash([10, 14]);
    ctx.strokeStyle = "rgba(120, 70, 200, 0.55)";
    ctx.strokeText(ch, w / 2, h / 2 + 8);
    ctx.setLineDash([]);
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function start(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    drawingRef.current = true;
    lastRef.current = pos(e);
    canvasRef.current?.setPointerCapture(e.pointerId);
    haptic(8);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const p = pos(e);
    const last = lastRef.current ?? p;
    const hue = (Date.now() / 8) % 360;
    ctx.strokeStyle = `hsl(${hue}, 90%, 60%)`;
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = `hsl(${hue}, 90%, 70%)`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastRef.current = p;
    strokeCountRef.current += Math.hypot(p.x - last.x, p.y - last.y);
  }

  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    pop();
    if (strokeCountRef.current > 400 && !celebrate) {
      setCelebrate(true);
      chime();
      haptic(40);
      markTraced(item);
      const praiseList = t("praise", lang).split("!").map((s) => s.trim()).filter(Boolean);
      const pick = praiseList[Math.floor(Math.random() * praiseList.length)] + "!";
      speak(pick);
    }
  }

  function clearCanvas() {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const r = c.getBoundingClientRect();
    drawGuide(ctx, r.width, r.height, item);
    strokeCountRef.current = 0;
    setCelebrate(false);
  }

  function next() { setIdx((i) => (i + 1) % ITEMS.length); }

  return (
    <main className="min-h-screen bg-gradient-tracing flex flex-col select-none">
      <header className="flex items-center justify-between gap-2 px-4 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-3 py-2 shadow-pop text-sm font-extrabold">
          <span className="text-2xl">{item}</span>
        </div>
        <button type="button" onClick={clearCanvas} aria-label="Clear" className="size-12 rounded-full bg-white/90 shadow-pop text-xl active:scale-95">🧽</button>
      </header>

      <section className="flex-1 px-4 py-4 relative">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="w-full h-full rounded-[36px] shadow-pop bg-white touch-none"
          style={{ minHeight: "60vh" }}
          aria-label={`Tracing ${item}`}
        />
        {celebrate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/95 rounded-3xl px-8 py-6 shadow-pop animate-pop-in text-center">
              <div className="text-6xl animate-bounce-big">🎉</div>
              <div className="mt-2 text-2xl font-extrabold">{t("youDidIt", lang)}</div>
              <button type="button" onClick={next} className="pointer-events-auto mt-4 rounded-full bg-gradient-hero text-white font-extrabold px-6 py-3 shadow-pop active:scale-95">
                {t("next", lang)} →
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
