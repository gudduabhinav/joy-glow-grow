import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
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
const HI_ITEMS = ["अ", "आ", "इ", "उ", "ए", "ओ", "क", "ख", "ग"];

// Each path is a SINGLE continuous stroke (no separate M subpaths)
// so animateMotion works correctly. Paths approximate the main strokes of each letter.
const CHARACTER_PATHS: Record<string, string> = {
  // English – clean continuous strokes
  A: "M 20,85 L 50,15 L 80,85 M 65,55 L 35,55",
  B: "M 30,85 L 30,15 C 65,15 65,47 30,47 C 70,47 70,85 30,85",
  C: "M 75,25 C 25,10 20,90 75,75",
  "1": "M 38,28 L 50,15 L 50,85",
  "2": "M 25,35 C 25,10 75,10 75,45 L 25,85 L 75,85",
  "3": "M 25,20 C 68,12 68,47 35,47 C 72,47 72,88 25,80",
  O: "M 50,15 C 20,15 20,85 50,85 C 80,85 80,15 50,15",
  L: "M 35,15 L 35,85 L 70,85",
  S: "M 70,25 C 45,10 22,35 50,50 C 78,65 55,90 30,75",

  // Hindi — single continuous approximations of the main body strokes
  // अ  (left arc + body + right bar + matra line)
  "अ": "M 30,25 L 70,25 L 70,75 L 70,47 L 47,47 C 32,47 32,22 47,22 C 62,22 57,44 47,47 C 58,50 52,72 28,68",
  // आ (अ + extra vertical bar)
  "आ": "M 28,25 L 75,25 L 75,75 L 75,47 L 55,47 C 42,47 42,22 55,22 C 68,22 64,44 55,47 C 65,50 60,72 35,68 L 35,47",
  // इ
  "इ": "M 65,25 L 28,25 C 18,35 25,55 50,55 C 32,55 22,70 35,78",
  // उ
  "उ": "M 35,20 L 35,65 C 35,80 65,80 65,60 C 65,40 40,40 40,25",
  // ए
  "ए": "M 20,25 L 75,25 M 48,25 L 48,60 C 48,75 68,75 68,60",
  // ओ
  "ओ": "M 28,25 L 75,25 L 75,75 L 75,47 L 55,47 C 42,47 42,22 55,22 C 68,22 64,44 55,47 C 65,50 60,72 35,68 M 72,20 C 62,8 55,8 55,15",
  // क
  "क": "M 25,25 L 75,25 L 50,25 L 50,80 L 50,52 C 28,52 28,35 50,35 C 50,52 50,52 50,52 C 68,52 68,72 68,75",
  // ख
  "ख": "M 22,25 L 75,25 L 38,25 L 38,75 L 38,52 C 22,52 22,38 38,38 L 38,45 M 62,25 L 62,75 L 62,52 C 48,52 48,38 62,38",
  // ग
  "ग": "M 20,25 L 65,25 L 40,25 L 40,65 C 40,78 22,78 22,65 C 22,52 40,52 40,65 M 62,25 L 62,78",
};

function samplePathPoints(pathString: string, count = 60): { x: number; y: number }[] {
  if (typeof document === "undefined") return [];
  try {
    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", pathString);
    const totalLength = pathEl.getTotalLength();
    const points = [];
    for (let i = 0; i <= count; i++) {
      const length = (i / count) * totalLength;
      const pt = pathEl.getPointAtLength(length);
      points.push({ x: pt.x, y: pt.y });
    }
    return points;
  } catch (err) {
    console.error("Error sampling path points:", err);
    return [];
  }
}

// TracingDemo — clean preview of the target letter with a friendly pencil bouncing above.
// Works equally well for English and Hindi (no clip/reveal hacks).
function TracingDemo({ item }: { item: string }) {
  const isHindi = /[\u0900-\u097F]/.test(item);
  const fontFamily = isHindi ? "'Baloo 2', system-ui, sans-serif" : "'Fredoka', system-ui, sans-serif";
  const fontSize = isHindi ? 48 : 54;

  return (
    <div
      className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-pop animate-pop-in flex items-center justify-center"
      style={{ width: 84, height: 84, flexShrink: 0 }}
    >
      {/* Faint notebook lines */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent 0 18px, rgba(139,92,246,0.25) 18px 19px)"
      }} />

      {/* Colorful letter */}
      <span
        className="relative select-none leading-none animate-pop-in"
        aria-hidden
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize,
          background: "linear-gradient(160deg, #ff7ab6 0%, #ffbe3b 55%, #4d9dff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {item}
      </span>

      {/* Pencil bouncing on top-right */}
      <span
        className="absolute top-1 right-1 text-lg animate-bounce"
        aria-hidden
        style={{ animationDuration: "1.2s" }}
      >
        ✏️
      </span>
    </div>
  );
}

function Tracing() {
  const lang = useLang();
  const ITEMS = lang === "hi" ? HI_ITEMS : EN_ITEMS;
  const [idx, setIdx] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const item = ITEMS[idx % ITEMS.length];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  const targetPoints = useMemo(() => {
    const pStr = CHARACTER_PATHS[item];
    if (!pStr) return [];
    return samplePathPoints(pStr, 60);
  }, [item]);

  const hitsRef = useRef<boolean[]>([]);
  const totalUserPointsRef = useRef(0);
  const offPathPointsRef = useRef(0);

  // Reset index when language switches (avoid stale slot)
  useEffect(() => { setIdx(0); }, [lang]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    let rafId: number;

    function init() {
      const dpr = window.devicePixelRatio || 1;
      const rect = c!.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) {
        rafId = requestAnimationFrame(init);
        return;
      }
      c!.width = Math.round(rect.width * dpr);
      c!.height = Math.round(rect.height * dpr);
      const ctx = c!.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      drawGuide(ctx, rect.width, rect.height, item);

      // Redraw once fonts are loaded (avoids system-font fallback on first paint)
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => {
          const ctx2 = c!.getContext("2d");
          const r2 = c!.getBoundingClientRect();
          if (ctx2 && r2.width > 1) drawGuide(ctx2, r2.width, r2.height, item);
        });
      }
    }

    rafId = requestAnimationFrame(init);

    // Redraw on resize / orientation change
    const ro = new ResizeObserver(() => {
      const ctx = c.getContext("2d");
      const r = c.getBoundingClientRect();
      if (ctx && r.width > 1 && r.height > 1) {
        const dpr = window.devicePixelRatio || 1;
        c.width = Math.round(r.width * dpr);
        c.height = Math.round(r.height * dpr);
        ctx.scale(dpr, dpr);
        drawGuide(ctx, r.width, r.height, item);
      }
    });
    ro.observe(c);

    // Reset validation tracking refs
    hitsRef.current = new Array(targetPoints.length).fill(false);
    totalUserPointsRef.current = 0;
    offPathPointsRef.current = 0;
    setCelebrate(false);

    const isNumber = /[0-9०-९१२३४५६७८९]/.test(item);
    if (lang === "hi") speak(isNumber ? `अंक ${item} लिखो` : `अक्षर ${item} लिखो`);
    else speak(`Trace the ${isNumber ? "number" : "letter"} ${item}`);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [item, lang, targetPoints]);


  function drawGuide(ctx: CanvasRenderingContext2D, w: number, h: number, ch: string) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const isHindi = /[\u0900-\u097F]/.test(ch);
    // Use 45% of the smaller canvas dimension so the letter always fits comfortably
    const fontSize = Math.min(w, h) * 0.45;
    ctx.font = `800 ${fontSize}px ${isHindi ? "'Baloo 2'" : "Fredoka"}, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Center of canvas — slight upward nudge for Hindi (descenders)
    const cy = h / 2 + (isHindi ? -fontSize * 0.05 : fontSize * 0.04);

    // 1. Solid very light gray fill — acts as the background guide
    ctx.fillStyle = "rgba(226, 232, 240, 0.90)";
    ctx.fillText(ch, w / 2, cy);

    // 2. Purple dotted outline over the fill — shows the stroke path
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([7, 12]);
    ctx.strokeStyle = "rgba(139, 92, 246, 0.55)";
    ctx.strokeText(ch, w / 2, cy);
    ctx.setLineDash([]);
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function getPathSpaceCoords(x: number, y: number) {
    const c = canvasRef.current;
    if (!c) return { x: 50, y: 50 };
    const rect = c.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const size = Math.min(w, h) * 0.70;
    const scale = size / 100;
    const dx = (w - size) / 2;
    const dy = (h - size) / 2;
    return {
      x: (x - dx) / scale,
      y: (y - dy) / scale
    };
  }

  function checkTracingProgress(x: number, y: number) {
    if (!canvasRef.current || targetPoints.length === 0) return;
    const pt = getPathSpaceCoords(x, y);
    totalUserPointsRef.current += 1;
    let minDistance = 999;
    targetPoints.forEach((targetPt, i) => {
      const dist = Math.hypot(pt.x - targetPt.x, pt.y - targetPt.y);
      if (dist < minDistance) minDistance = dist;
      if (dist < 16) hitsRef.current[i] = true;
    });
    if (minDistance > 28) offPathPointsRef.current += 1;
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
    checkTracingProgress(p.x, p.y);
  }

  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    pop();

    const hitCount = hitsRef.current.filter(Boolean).length;
    const hitRatio = hitCount / Math.max(1, targetPoints.length);
    const scribbleRatio = offPathPointsRef.current / Math.max(1, totalUserPointsRef.current);

    if (hitRatio >= 0.50 && scribbleRatio < 0.40 && !celebrate) {
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
    hitsRef.current = new Array(targetPoints.length).fill(false);
    totalUserPointsRef.current = 0;
    offPathPointsRef.current = 0;
    setCelebrate(false);
  }

  function next() { setIdx((i) => (i + 1) % ITEMS.length); }

  return (
    <main className="min-h-screen bg-gradient-tracing flex flex-col select-none">
      <header className="relative z-10 flex items-center justify-between gap-2 px-4 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl active:scale-95" aria-label="Home">🏠</Link>
        <LangToggle />
        <div className="rounded-full bg-white/90 px-4 py-2 shadow-pop font-extrabold text-center">
          <span className={`text-3xl ${lang === "hi" ? "font-hindi" : ""}`}>{item}</span>
        </div>
        <button type="button" onClick={clearCanvas} aria-label="Clear" className="size-12 rounded-full bg-white/90 shadow-pop text-xl active:scale-95">🧽</button>
      </header>

      {/* Animation guidance banner */}
      <div className="relative z-10 flex justify-center px-4 mt-3 mb-1">
        <div className="bg-white/90 backdrop-blur rounded-[24px] px-4 py-2 shadow-pop flex items-center gap-4 animate-pop-in border border-white/20 max-w-sm w-full justify-between">
          <div className="flex flex-col text-left leading-tight">
            <span className="text-xs font-extrabold text-indigo-500 tracking-wide uppercase">
              {lang === "hi" ? "देखो और सीखो" : "WATCH & LEARN"}
            </span>
            <span className="text-sm font-bold text-slate-700 mt-0.5">
              {lang === "hi" ? "ऐसे लिखना सीखें!" : "Trace like this!"}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              {lang === "hi" ? `✏️ अक्षर है: ${item}` : `✏️ Letter: ${item}`}
            </span>
          </div>
          <TracingDemo item={item} />
        </div>
      </div>

      <section className="flex-1 px-4 py-4 relative">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="w-full h-full rounded-[36px] shadow-pop bg-white touch-none"
          style={{ minHeight: "52vh" }}
          aria-label={`Tracing ${item}`}
        />
        {celebrate && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <div className="bg-white/95 rounded-3xl px-8 py-6 shadow-pop animate-pop-in text-center max-w-xs w-full">
              <div className="text-6xl animate-bounce-big">🎉</div>
              <div className="mt-2 text-2xl font-extrabold">{t("youDidIt", lang)}</div>
              <button type="button" onClick={next} className="pointer-events-auto mt-4 w-full rounded-full bg-gradient-hero text-white font-extrabold px-6 py-3 shadow-pop active:scale-95">
                {t("next", lang)} →
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
