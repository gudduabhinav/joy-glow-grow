import { t, useLang } from "@/lib/i18n";

export type Level = "easy" | "medium" | "hard";

export function LevelPicker({
  level,
  onChange,
  className = "",
}: {
  level: Level;
  onChange: (l: Level) => void;
  className?: string;
}) {
  const lang = useLang();
  const opts: { id: Level; emoji: string }[] = [
    { id: "easy", emoji: "🌱" },
    { id: "medium", emoji: "🌟" },
    { id: "hard", emoji: "🔥" },
  ];
  const label = (id: Level) =>
    id === "easy"
      ? t("levelEasy", lang)
      : id === "medium"
      ? t("levelMedium", lang)
      : t("levelHard", lang);
  return (
    <div className={`inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur p-1 shadow-pop ${className}`}>
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-3 py-1.5 rounded-full text-sm font-extrabold transition-all ${
            level === o.id
              ? "bg-gradient-hero text-white shadow"
              : "text-foreground/70 hover:bg-white"
          }`}
        >
          {o.emoji} {label(o.id)}
        </button>
      ))}
    </div>
  );
}
