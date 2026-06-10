import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/colors")({ component: C });
function C() {
  return (
    <main className="min-h-screen bg-gradient-colors flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl animate-float-y">🎨</div>
      <h1 className="mt-4 text-4xl font-extrabold text-white drop-shadow">Colors</h1>
      <p className="mt-2 text-white/90 font-semibold">Coming next!</p>
      <Link to="/" className="mt-8 rounded-full bg-white text-foreground font-extrabold px-6 py-3 shadow-pop">🏠 Home</Link>
    </main>
  );
}
