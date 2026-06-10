import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface ModuleCardProps {
  to: string;
  title: string;
  emoji: string;
  gradient: string;
  description?: string;
  children?: ReactNode;
}

export function ModuleCard({ to, title, emoji, gradient, description }: ModuleCardProps) {
  return (
    <Link
      to={to}
      className={`group relative block rounded-3xl ${gradient} p-5 shadow-pop overflow-hidden active:scale-[0.97] transition-transform min-h-[140px]`}
    >
      <span className="absolute -top-6 -right-6 size-28 rounded-full bg-white/30 blur-2xl" aria-hidden />
      <span className="absolute bottom-2 right-3 text-6xl drop-shadow-md group-active:animate-bounce-big" aria-hidden>
        {emoji}
      </span>
      <h3 className="text-2xl font-extrabold text-white drop-shadow-md tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1 text-sm font-semibold text-white/90 max-w-[60%]">{description}</p>
      )}
    </Link>
  );
}
