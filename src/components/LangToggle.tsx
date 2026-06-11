import { setLang, useLang } from "@/lib/i18n";
import { haptic, pop } from "@/lib/audio";

export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  return (
    <div className={`inline-flex rounded-full bg-white/90 backdrop-blur p-1 shadow-pop ${className}`} role="group" aria-label="Language">
      {(["en", "hi"] as const).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => { if (!active) { haptic(); pop(); setLang(l); } }}
            className={`px-3 py-1.5 rounded-full text-sm font-extrabold transition-colors ${active ? "bg-gradient-hero text-white" : "text-foreground/70"}`}
            aria-pressed={active}
          >
            {l === "en" ? "EN" : "हिं"}
          </button>
        );
      })}
    </div>
  );
}
