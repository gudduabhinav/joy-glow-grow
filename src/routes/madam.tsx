import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { LangToggle } from "@/components/LangToggle";
import { Mascot } from "@/components/Mascot";
import { speak, haptic, pop } from "@/lib/audio";
import { t, useLang, speechLang } from "@/lib/i18n";
import { askMadam } from "@/lib/madam.functions";

export const Route = createFileRoute("/madam")({
  head: () => ({
    meta: [
      { title: "AI Madam — Tiny Genius" },
      { name: "description", content: "Voice chat with your loving AI teacher." },
    ],
  }),
  component: MadamPage,
});

type Turn = { role: "child" | "madam"; text: string };

// Minimal types for SpeechRecognition (not in standard lib).
interface SR extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: unknown) => void) | null;
  onend: (() => void) | null;
}

function getSR(): (new () => SR) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SR;
    webkitSpeechRecognition?: new () => SR;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

function MadamPage() {
  const lang = useLang();
  const ask = useServerFn(askMadam);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [supported] = useState(() => !!getSR());
  const recRef = useRef<SR | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, status]);

  // Greeting
  useEffect(() => {
    const greet = t("madamHello", lang);
    setTurns([{ role: "madam", text: greet }]);
    const id = setTimeout(() => speak(greet, { lang }), 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function sendToMadam(text: string) {
    setTurns((p) => [...p, { role: "child", text }]);
    setStatus("thinking");
    try {
      const res = (await ask({ data: { message: text, lang } })) as { reply: string };
      setTurns((p) => [...p, { role: "madam", text: res.reply }]);
      setStatus("speaking");
      speak(res.reply, { lang, onEnd: () => setStatus("idle"), onError: () => setStatus("idle") });
    } catch {
      const fb = lang === "hi" ? "ओहो, फिर बोलो बेटू 🌸" : "Oops, say it again sweetie 🌸";
      setTurns((p) => [...p, { role: "madam", text: fb }]);
      speak(fb, { lang, onEnd: () => setStatus("idle") });
    }
  }

  function toggleMic() {
    haptic();
    pop();
    const SRCls = getSR();
    if (!SRCls) return;
    if (status === "listening") {
      recRef.current?.stop();
      return;
    }
    if (status !== "idle") return;
    const r = new SRCls();
    r.lang = speechLang[lang];
    r.continuous = false;
    r.interimResults = false;
    r.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript ?? "";
      if (text.trim()) void sendToMadam(text.trim());
    };
    r.onerror = () => setStatus("idle");
    r.onend = () => {
      if (status === "listening") setStatus("idle");
    };
    recRef.current = r;
    setStatus("listening");
    try {
      r.start();
    } catch {
      setStatus("idle");
    }
  }

  const ringClass =
    status === "listening"
      ? "ring-8 ring-bubblegum/60 animate-pulse"
      : status === "thinking"
      ? "ring-8 ring-sunshine/60 animate-pulse"
      : status === "speaking"
      ? "ring-8 ring-sky/60"
      : "ring-4 ring-white";

  return (
    <main className="min-h-screen bg-gradient-to-b from-bubblegum/30 via-background to-sky/20 pb-32 select-none">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">💖 {t("madam", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-5 mt-4 text-center">
        <div className={`mx-auto rounded-full ${ringClass} transition-all w-fit p-1`}>
          <Mascot size={140} bounce={status !== "idle"} onClick={toggleMic} />
        </div>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          {status === "listening" && t("listening", lang)}
          {status === "thinking" && t("thinking", lang)}
          {status === "speaking" && "🗣️"}
          {status === "idle" && t("tapToTalk", lang)}
        </p>
      </section>

      <section
        ref={scrollRef}
        className="mx-auto mt-4 max-w-md px-4 max-h-[45vh] overflow-y-auto space-y-2"
      >
        {turns.map((tn, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-2 shadow-pop text-base font-semibold ${
              tn.role === "madam"
                ? "bg-white/90 mr-8 rounded-bl-sm"
                : "bg-gradient-hero text-white ml-8 rounded-br-sm text-right"
            }`}
          >
            {tn.role === "madam" && <span className="mr-1">👩‍🏫</span>}
            {tn.text}
          </div>
        ))}
      </section>

      <div className="fixed bottom-6 inset-x-0 flex flex-col items-center gap-2 px-6">
        {!supported && (
          <p className="text-xs text-destructive bg-white/90 rounded-full px-3 py-1 shadow-pop">
            {t("micNotSupported", lang)}
          </p>
        )}
        <button
          onClick={toggleMic}
          disabled={!supported || status === "thinking" || status === "speaking"}
          className={`size-20 rounded-full text-4xl shadow-pop active:scale-95 transition-all ${
            status === "listening"
              ? "bg-destructive text-white animate-pulse"
              : "bg-gradient-hero text-white"
          } disabled:opacity-50`}
          aria-label={t("tapToTalk", lang)}
        >
          {status === "listening" ? "⏹️" : "🎤"}
        </button>
      </div>
    </main>
  );
}
