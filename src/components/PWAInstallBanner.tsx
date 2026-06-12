import { useEffect, useState } from "react";
import { haptic, pop } from "@/lib/audio";
import { useLang } from "@/lib/i18n";

// BeforeInstallPromptEvent — not in standard TS types
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Detect iOS Safari
function isIosSafari() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent;
  return /iphone|ipad|ipod/i.test(ua) && /safari/i.test(ua) && !/crios|fxios/i.test(ua);
}

// Detect if already installed (standalone mode)
function isInstalled() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches
    || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

const DISMISSED_KEY = "tinygenius.pwa.dismissed";

export function PWAInstallBanner() {
  const lang = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Don't show if already installed or user dismissed recently
    if (isInstalled()) return;
    try {
      const ts = localStorage.getItem(DISMISSED_KEY);
      if (ts && Date.now() - Number(ts) < 3 * 24 * 60 * 60 * 1000) return; // 3 days
    } catch { /* noop */ }

    // Android / Chrome — capture the native prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // iOS Safari — show manual instructions after short delay
    if (isIosSafari()) {
      setTimeout(() => setShowIos(true), 3000);
      setTimeout(() => setVisible(true), 3000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    haptic(); pop();
    setVisible(false);
    try { localStorage.setItem(DISMISSED_KEY, String(Date.now())); } catch { /* noop */ }
  }

  async function install() {
    if (!deferredPrompt) return;
    haptic(30);
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setInstalling(false);
    if (outcome === "accepted") {
      setVisible(false);
    } else {
      dismiss();
    }
    setDeferredPrompt(null);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 animate-pop-in"
      style={{ maxWidth: 420, margin: "0 auto" }}
    >
      <div
        className="rounded-[28px] shadow-pop overflow-hidden"
        style={{ background: "linear-gradient(135deg, #ff7ab6, #ffbe3b)" }}
      >
        <div className="px-5 py-4 flex items-center gap-4">
          {/* App icon */}
          <img src="/icon-192.png" alt="Tiny Genius" className="size-14 rounded-2xl shadow flex-shrink-0" />

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-white text-base leading-tight">
              {lang === "hi" ? "📲 ऐप इंस्टॉल करो!" : "📲 Install the App!"}
            </p>
            <p className="text-white/85 text-xs font-semibold mt-0.5 leading-tight">
              {showIos && !deferredPrompt
                ? (lang === "hi"
                    ? "Safari में Share → 'Home Screen पर जोड़ें' टैप करो"
                    : "Tap Share → 'Add to Home Screen' in Safari")
                : (lang === "hi"
                    ? "होम स्क्रीन पर जोड़ें — ऑफलाइन भी चलेगा!"
                    : "Add to home screen — works offline too!")}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {deferredPrompt && (
              <button
                type="button"
                onClick={install}
                disabled={installing}
                className="bg-white text-primary font-extrabold text-sm px-4 py-2 rounded-full shadow active:scale-95 transition-transform"
              >
                {installing
                  ? "⏳"
                  : (lang === "hi" ? "इंस्टॉल" : "Install")}
              </button>
            )}
            <button
              type="button"
              onClick={dismiss}
              className="text-white/70 font-bold text-xs text-center px-2"
            >
              {lang === "hi" ? "बाद में" : "Not now"}
            </button>
          </div>
        </div>

        {/* iOS step hint bar */}
        {showIos && !deferredPrompt && (
          <div className="bg-black/20 px-5 py-2 flex items-center gap-3">
            <span className="text-2xl">1️⃣</span>
            <span className="text-white font-bold text-xs">
              {lang === "hi" ? "नीचे Share बटन दबाओ 🔗" : "Tap the Share button below 🔗"}
            </span>
            <span className="text-2xl ml-auto">2️⃣</span>
            <span className="text-white font-bold text-xs">
              {lang === "hi" ? "'Add to Home Screen' चुनो" : "'Add to Home Screen'"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
