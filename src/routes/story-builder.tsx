import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { speak, chime } from "@/lib/audio";
import { t, useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export const Route = createFileRoute("/story-builder")({
  head: () => ({
    meta: [
      { title: "Story Builder — Tiny Genius" },
      { name: "description", content: "Create your own story!" },
    ],
  }),
  component: StoryBuilder,
});

const STORY_PARTS = {
  character: ["🦁", "🐶", "🐱", "🐸", "🦆", "🐻"],
  action: ["jumped", "ran", "danced", "sang", "played", "swam"],
  place: ["forest", "beach", "mountain", "lake", "garden", "sky"],
};

function StoryBuilder() {
  const lang = useLang();
  const [selected, setSelected] = useState({
    character: "",
    action: "",
    place: "",
  });
  const [story, setStory] = useState("");

  const handleSelect = (key: "character" | "action" | "place", value: string) => {
    setSelected({ ...selected, [key]: value });
  };

  const buildStory = () => {
    if (selected.character && selected.action && selected.place) {
      const storyText = `${selected.character} ${selected.action} in the ${selected.place}!`;
      setStory(storyText);
      chime();
      speak(storyText);
    }
  };

  const downloadStory = () => {
    if (!story) return;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(story)
    );
    element.setAttribute("download", "my_story.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-coral/20 via-background to-grape/10 pb-12">
      <header className="flex items-center justify-between px-5 pt-6">
        <Link to="/" className="rounded-full bg-white/90 size-12 flex items-center justify-center shadow-pop text-xl">←</Link>
        <h1 className="text-2xl font-extrabold">{t("storyBuilder", lang)}</h1>
        <LangToggle />
      </header>

      <section className="px-4 mt-8 max-w-sm mx-auto">
        <p className="text-center text-lg font-bold mb-8">{t("storyBuilderDesc", lang)}</p>

        {/* Character */}
        <div className="mb-6">
          <p className="font-bold mb-2">Who? {selected.character}</p>
          <div className="grid grid-cols-3 gap-2">
            {STORY_PARTS.character.map((char) => (
              <button
                key={char}
                onClick={() => handleSelect("character", char)}
                className={`text-3xl p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${
                  selected.character === char
                    ? "bg-gradient-hero ring-2 ring-primary"
                    : "bg-white/80"
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="mb-6">
          <p className="font-bold mb-2">What? {selected.action}</p>
          <div className="grid grid-cols-2 gap-2">
            {STORY_PARTS.action.map((action) => (
              <button
                key={action}
                onClick={() => handleSelect("action", action)}
                className={`font-bold p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${
                  selected.action === action
                    ? "bg-gradient-abc text-white"
                    : "bg-white/80"
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Place */}
        <div className="mb-6">
          <p className="font-bold mb-2">Where? {selected.place}</p>
          <div className="grid grid-cols-2 gap-2">
            {STORY_PARTS.place.map((place) => (
              <button
                key={place}
                onClick={() => handleSelect("place", place)}
                className={`font-bold p-2 rounded-lg shadow-pop active:scale-95 transition-transform ${
                  selected.place === place
                    ? "bg-gradient-colors text-white"
                    : "bg-white/80"
                }`}
              >
                {place}
              </button>
            ))}
          </div>
        </div>

        {/* Build Button */}
        <button
          onClick={buildStory}
          disabled={!selected.character || !selected.action || !selected.place}
          className="w-full rounded-2xl bg-gradient-hero text-white font-extrabold py-3 shadow-pop active:scale-95 transition-transform disabled:opacity-50"
        >
          ✨ Create Story
        </button>

        {/* Story Display */}
        {story && (
          <div className="mt-6 bg-white/80 rounded-2xl p-4 shadow-pop">
            <p className="text-center text-lg font-bold mb-4">{story}</p>
            <button
              onClick={downloadStory}
              className="w-full rounded-xl bg-gradient-hero text-white font-bold py-2"
            >
              💾 Save Story
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
