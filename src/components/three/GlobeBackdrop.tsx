"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Whole glowing globe floating behind the hero copy – a pure-CSS planet disc (instant;
 * also the phone / reduced-motion / no-WebGL version) with the Three.js Earth
 * cross-fading in on top once its textures are ready.
 *
 * The box fills its positioned parent (give it `absolute inset-0`); the globe's
 * diameter is `size` × the box height and its centre sits `offsetY` × the box height
 * below the middle. The CSS disc is drawn with the same geometry, so the swap doesn't
 * morph. Same cross-fade contract as three/EarthHorizon (the Process stage's horizon).
 */

const Earth3D = dynamic(() => import("@/components/three/Earth3D"), { ssr: false });

interface GlobeBackdropProps {
  /** 0 → 1 progress adding rotation on top of the idle spin. Omit for idle spin only. */
  progress?: MotionValue<number>;
  /** Mount the WebGL scene (the caller decides *when*: idle, near-viewport, desktop-only…). */
  enabled?: boolean;
  /** Keep the render loop running (false while the section is off-screen). */
  active?: boolean;
  /** Reduced-motion: one static frame, no spin. */
  reduced?: boolean;
  /** Globe diameter as a fraction of the box height (0–1, default 0.8). */
  size?: number;
  /** Centre shifted down by this fraction of the box height (0–1, default 0). */
  offsetY?: number;
  /** Idle spin speed in rad/s. */
  idleSpeed?: number;
  /** City-lights emissive strength — the hero dims this to keep the copy readable. */
  emissiveIntensity?: number;
  className?: string;
}

export default function GlobeBackdrop({
  progress,
  enabled = true,
  active = true,
  reduced = false,
  size = 0.8,
  offsetY = 0,
  idleSpeed,
  emissiveIntensity,
  className,
}: GlobeBackdropProps) {
  const still = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleLost = useCallback(() => setReady(false), []);

  // Bring the CSS disc back if the scene is switched off after it had taken over.
  useEffect(() => {
    if (!enabled) setReady(false);
  }, [enabled]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      {/* CSS planet – shown until the WebGL globe is ready, or for good if WebGL is off / unavailable. */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div
          className="absolute left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#070d20_0%,#0a1433_52%,#0d1e4a_82%,#123063_94%,rgba(37,99,235,0.85)_98.4%,rgba(186,230,253,0.9)_99.5%,transparent_100%)] shadow-[0_0_110px_28px_rgba(59,130,246,0.32),0_0_280px_80px_rgba(37,99,235,0.16)]"
          style={{ height: `${size * 100}%`, top: `${50 + offsetY * 100}%` }}
        />
      </div>

      {enabled ? (
        <Earth3D
          variant="sphere"
          size={size}
          offsetY={offsetY}
          progress={progress ?? still}
          active={active}
          reduced={reduced}
          idleSpeed={idleSpeed}
          emissiveIntensity={emissiveIntensity}
          onReady={handleReady}
          onLost={handleLost}
        />
      ) : null}
    </div>
  );
}
