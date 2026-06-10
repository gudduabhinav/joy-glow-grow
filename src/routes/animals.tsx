import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/animals")({ component: C });
function C() {
  return (
    <main className="min-h-screen bg-gradient-animals flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl animate-float-y">🦁</div>
      <h1 className="mt-4 text-4xl font-extrabold text-white drop-shadow">Animals</h1>
      <p className="mt-2 text-white/90 font-semibold">Coming next!</p>
      <Link to="/" className="mt-8 rounded-full bg-white text-foreground font-extrabold px-6 py-3 shadow-pop">🏠 Home</Link>
    </main>
  );
}
