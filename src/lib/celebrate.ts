// Toddler celebration — confetti burst + happy chime.
import confetti from "canvas-confetti";

export function celebrate(intensity: "small" | "big" = "big") {
  if (typeof window === "undefined") return;
  const count = intensity === "big" ? 120 : 50;
  const colors = ["#FF7AB6", "#FFD93D", "#5BD17B", "#4D9DFF", "#A66BFF", "#FF9F43"];
  confetti({
    particleCount: count,
    spread: 90,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
    ticks: 220,
  });
  if (intensity === "big") {
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
    }, 200);
  }
}
