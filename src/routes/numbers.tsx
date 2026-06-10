import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/numbers")({
  component: Soon,
});
export const RouteShapes = null;

function Soon() {
  return (
    <main className="min-h-screen bg-gradient-numbers flex flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl animate-float-y">🔢</div>
      <h1 className="mt-4 text-4xl font-extrabold text-white drop-shadow">Numbers</h1>
      <p className="mt-2 text-white/90 font-semibold">Coming next — counting fun!</p>
      <Link to="/" className="mt-8 rounded-full bg-white text-foreground font-extrabold px-6 py-3 shadow-pop">🏠 Home</Link>
    </main>
  );
}
