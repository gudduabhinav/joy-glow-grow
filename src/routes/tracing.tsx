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

const EN_ITEMS = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M",
  "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "1","2","3","4","5","6","7","8","9","10",
];
const HI_ITEMS = [
  "अ","आ","इ","ई","उ","ऊ","ए","ऐ","ओ","औ",
  "क","ख","ग","घ","च","छ","ज","झ",
  "ट","ठ","ड","ढ","ण","त","थ","द","ध","न",
  "प","फ","ब","भ","म","य","र","ल","व",
  "श","ष","स","ह","क्ष","त्र","ज्ञ",
];

// TracingDemo — A slow, animated trace of the letter's outline to show its shape.
function TracingDemo({ item }: { item: string }) {
  const isHindi = /[\u0900-\u097F]/.test(item);
  const fontFamily = isHindi ? "'Baloo 2', system-ui, sans-serif" : "'Fredoka', system-ui, sans-serif";
  const fontSize = isHindi ? 58 : 66;

  return (
    <div
      className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-purple-200 rounded-2xl overflow-hidden shadow-pop flex items-center justify-center"
      style={{ width: 92, height: 92, flexShrink: 0 }}
    >
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 18px, rgba(139,92,246,0.25) 18px 19px)" }} />

      <svg key={item} viewBox="0 0 100 100" width="92" height="92" className="absolute inset-0">
        <defs>
          <linearGradient id="penInk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff7ab6" />
            <stop offset="55%" stopColor="#ffbe3b" />
            <stop offset="100%" stopColor="#4d9dff" />
          </linearGradient>
        </defs>

        {/* Faint guide letter (the "ghost" to trace over) */}
        <text
          x="50" y="50"
          textAnchor="middle" dominantBaseline="central"
          fontFamily={fontFamily} fontWeight={800} fontSize={fontSize}
          fill="rgba(148,163,184,0.30)"
        >
          {item}
        </text>

        {/* Self-drawing letter — stroke-only, animated via stroke-dashoffset */}
        <text
          x="50" y="50"
          textAnchor="middle" dominantBaseline="central"
          fontFamily={fontFamily} fontWeight={800} fontSize={fontSize}
          fill="none"
          stroke="url(#penInk)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 600,
            strokeDashoffset: 600,
            animation: "tg-draw 2.4s ease-in-out 0.15s infinite",
          }}
        >
          {item}
        </text>

        {/* Pen that sweeps across as the letter is drawn */}
        <g style={{ animation: "tg-pen 2.4s ease-in-out 0.15s infinite", transformOrigin: "50% 50%" }}>
          <text x="0" y="0" fontSize="18" textAnchor="middle">✏️</text>
        </g>
      </svg>

      {/* Local keyframes — scoped to this component */}
      <style>{`
        @keyframes tg-draw {
          0%   { stroke-dashoffset: 600; opacity: 1; }
          70%  { stroke-dashoffset: 0;   opacity: 1; }
          90%  { stroke-dashoffset: 0;   opacity: 1; }
          100% { stroke-dashoffset: 0;   opacity: 0; }
        }
        @keyframes tg-pen {
          0%   { transform: translate(28px, 26px) rotate(-12deg); }
          25%  { transform: translate(50px, 18px) rotate(8deg); }
          50%  { transform: translate(72px, 40px) rotate(14deg); }
          70%  { transform: translate(58px, 72px) rotate(-6deg); }
          90%  { transform: translate(40px, 60px) rotate(0deg); opacity: 1; }
          100% { transform: translate(40px, 60px) rotate(0deg); opacity: 0; }
        }
      `}</style>
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

  const totalUserPointsRef = useRef(0);
  const offPathPointsRef = useRef(0);

  // Grid Coverage Tracking for Validation
  const targetCellsRef = useRef<Set<string>>(new Set());
  const hitCellsRef = useRef<Set<string>>(new Set());
  const cellSize = 12; // size of grid cells

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
      const ctx = c!.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      drawGuide(ctx, rect.width, rect.height, item);
      buildTargetGrid(ctx, rect.width, rect.height, item);

      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => {
          const ctx2 = c!.getContext("2d", { willReadFrequently: true });
          const r2 = c!.getBoundingClientRect();
          if (ctx2 && r2.width > 1) {
            drawGuide(ctx2, r2.width, r2.height, item);
            buildTargetGrid(ctx2, r2.width, r2.height, item);
          }
        });
      }
    }

    rafId = requestAnimationFrame(init);

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

    hitCellsRef.current.clear();
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
  }, [item, lang]);


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

  function buildTargetGrid(ctx: CanvasRenderingContext2D, w: number, h: number, ch: string) {
    // Render the character to an offscreen canvas to map its pixels
    const off = document.createElement("canvas");
    off.width = w; off.height = h;
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    const isHindi = /[\u0900-\u097F]/.test(ch);
    const fontSize = Math.min(w, h) * 0.45;
    octx.font = `800 ${fontSize}px ${isHindi ? "'Baloo 2'" : "Fredoka"}, system-ui, sans-serif`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    const cy = h / 2 + (isHindi ? -fontSize * 0.05 : fontSize * 0.04);

    octx.fillStyle = "#000";
    octx.fillText(ch, w / 2, cy);

    const imgData = octx.getImageData(0, 0, w, h).data;
    const targets = new Set<string>();

    for (let y = 0; y < h; y += cellSize / 2) {
      for (let x = 0; x < w; x += cellSize / 2) {
        const i = (Math.floor(y) * Math.floor(w) + Math.floor(x)) * 4;
        if (imgData[i + 3] > 50) { // If alpha > 50 (pixel is drawn)
          const gx = Math.floor(x / cellSize);
          const gy = Math.floor(y / cellSize);
          targets.add(`${gx},${gy}`);
        }
      }
    }
    targetCellsRef.current = targets;
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
    totalUserPointsRef.current += 1;

    // Validation Check: Update grid hits
    const gx = Math.floor(p.x / cellSize);
    const gy = Math.floor(p.y / cellSize);
    const cellKey = `${gx},${gy}`;
    
    // Allow a 1-cell radius for sloppiness (toddlers aren't precise)
    let isHit = false;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (targetCellsRef.current.has(`${gx + dx},${gy + dy}`)) {
          isHit = true;
          hitCellsRef.current.add(`${gx + dx},${gy + dy}`);
        }
      }
    }
    
    if (!isHit) {
      offPathPointsRef.current += 1;
    }
  }

  function end() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastRef.current = null;
    pop();

    const targets = targetCellsRef.current.size;
    const hits = hitCellsRef.current.size;
    
    if (targets === 0) return; // safety

    const coverage = hits / targets;
    const scribbleRatio = offPathPointsRef.current / Math.max(1, totalUserPointsRef.current);

    // strict completion: must cover 80% of the letter, and can't just be wild scribbling all over the screen.
    if (coverage >= 0.80 && scribbleRatio < 0.35 && !celebrate) {
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
    hitCellsRef.current.clear();
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
