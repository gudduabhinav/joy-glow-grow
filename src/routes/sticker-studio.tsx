import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { loadProgress } from "@/lib/progress";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/sticker-studio")({
  head: () => ({
    meta: [
      { title: "Sticker Studio — Tiny Genius" },
      { name: "description", content: "Collect and decorate with stickers!" },
    ],
  }),
  component: StickerStudio,
});

const STICKERS = ["⭐", "🌈", "🎈", "🎉", "💫", "🌟", "✨", "🦋", "🌸", "🎨", "🎭", "🎪"];

function StickerStudio() {
  const lang = useLang();
  const [progress, setProgress] = useState(loadProgress());
  const [collected, setCollected] = useState<string[]>([]);
  const [canvas, setCanvas] = useState<string[]>([]);

  useEffect(() => {
    const stickersEarned = Math.min(12, Math.floor(progress.stars / 5));
    setCollected(STICKERS.slice(0, stickersEarned));
  }, [progress]);

  const handlePlaceSticker = (sticker: string) => {
    setCanvas([...canvas, sticker]);
  };

  const handleDownload = () => {
    const text = "My Sticker Art:\n" + canvas.join(" ");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", "stickers.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-grape/20 via-background to-coral/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("stickerStudio", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8">
        <p className="text-center text-lg font-bold mb-4">{t("stickerStudioDesc", lang)}</p>

        {/* Canvas */}
        <div className="bg-white/80 rounded-2xl p-4 shadow-pop max-w-xs mx-auto h-40 mb-6 overflow-hidden">
          <div className="text-2xl flex flex-wrap gap-1">
            {canvas.map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>

        {/* Sticker palette */}
        <p className="text-sm font-bold text-muted-foreground mb-2">Stickers collected: {collected.length}/12</p>
        <div className="grid grid-cols-6 gap-2 max-w-xs mx-auto mb-6">
          {STICKERS.map((sticker, idx) => (
            <button
              key={sticker}
              onClick={() => collected.includes(sticker) && handlePlaceSticker(sticker)}
              disabled={!collected.includes(sticker)}
              className={`aspect-square rounded-lg text-2xl shadow-pop active:scale-95 transition-transform ${
                collected.includes(sticker)
                  ? "bg-white/80 border-2 border-primary/30"
                  : "bg-gray-300 border-2 border-gray-400 opacity-40"
              }`}
            >
              {sticker}
            </button>
          ))}
        </div>

        <div className="flex gap-3 max-w-xs mx-auto">
          <button
            onClick={() => setCanvas([])}
            className="flex-1 rounded-xl bg-muted text-foreground font-bold py-2 shadow-pop"
          >
            🗑️ Clear
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 rounded-xl bg-gradient-hero text-white font-bold py-2 shadow-pop"
          >
            💾 Save
          </button>
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
