import mascot from "@/assets/mascot.png";

interface MascotProps {
  size?: number;
  bounce?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Mascot({ size = 140, bounce = true, className = "", onClick }: MascotProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Panda mascot — tap to hear hello"
      className={`group relative inline-flex items-center justify-center bg-transparent border-0 p-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full bg-gradient-hero blur-2xl opacity-60"
        aria-hidden
      />
      <img
        src={mascot}
        alt=""
        width={size}
        height={size}
        className={`relative drop-shadow-xl select-none pointer-events-none ${bounce ? "animate-float-y" : ""} group-active:scale-95 transition-transform`}
        draggable={false}
      />
    </button>
  );
}
