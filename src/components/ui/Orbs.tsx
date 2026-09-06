import { cn } from "@/lib/utils";

interface OrbProps {
  className?: string;
  tone?: "violet" | "fuchsia" | "pink";
  /** Diameter in px (rendered via inline style so Tailwind doesn't need arbitrary classes). */
  size?: number;
  animate?: "drift" | "drift-slow" | "float" | "none";
  style?: React.CSSProperties;
}

/**
 * Soft glowing ambient orb. Rendered with radial gradients (not filter: blur)
 * so dozens can be on screen without hurting paint performance.
 */
export function Orb({
  className,
  tone = "violet",
  size = 600,
  animate = "drift",
  style,
}: OrbProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "orb",
        tone === "violet" && "orb-violet",
        tone === "fuchsia" && "orb-fuchsia",
        tone === "pink" && "orb-pink",
        animate === "drift" && "animate-drift",
        animate === "drift-slow" && "animate-drift-slow",
        animate === "float" && "animate-float-slow",
        className,
      )}
      style={{ width: size, height: size, ...style }}
    />
  );
}

/**
 * Subtle dotted grid that fades out toward the edges – adds "tech" texture behind sections.
 */
export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 100%)",
      }}
    />
  );
}
