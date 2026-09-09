"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMotionValue, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Planet horizon = pure-CSS arc (instant; also the phone / reduced-motion / no-WebGL
 * version) with the Three.js Earth cross-fading in on top once its textures are ready.
 *
 * The box is anchored to the bottom of its positioned parent; give it a height via
 * `className`. The globe's visible cap fills the lower half of the box and the upper
 * half is head-room for the atmosphere halo, so a `h-[40vh]` box shows a 20vh cap.
 *
 * Used by the pinned Process timeline (the hero shows the whole globe instead, via
 * three/GlobeBackdrop) — one dynamic import, one chunk, one texture cache either way.
 */

const Earth3D = dynamic(() => import("@/components/three/Earth3D"), { ssr: false });

/** Horizon line at the vertical centre of the box – the one value the perspective framing is exact for. */
const CAP_FRACTION = 0.5;

interface EarthHorizonProps {
  /** 0 → 1 progress adding rotation on top of the idle spin. Omit for idle spin only. */
  progress?: MotionValue<number>;
  /** Mount the WebGL scene (the caller decides *when*: idle, near-viewport, desktop-only…). */
  enabled?: boolean;
  /** Keep the render loop running (false while the section is off-screen). */
  active?: boolean;
  /** Reduced-motion: one static frame, no spin. */
  reduced?: boolean;
  /** Idle spin speed (rad/s). */
  idleSpeed?: number;
  /** Extra rotation (radians) applied across `progress` 0 → 1. */
  scrollTurn?: number;
  className?: string;
}

export default function EarthHorizon({
  progress,
  enabled = true,
  active = true,
  reduced = false,
  idleSpeed,
  scrollTurn,
  className,
}: EarthHorizonProps) {
  const still = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);
  const handleLost = useCallback(() => setReady(false), []);

  // Bring the CSS arc back if the scene is switched off after it had taken over.
  useEffect(() => {
    if (!enabled) setReady(false);
  }, [enabled]);

  return (
    <div aria-hidden className={cn("horizon pointer-events-none absolute inset-x-0 bottom-0", className)}>
      {/* CSS horizon – shown until the WebGL globe is ready, or for good if WebGL is off / unavailable.
          `.horizon-disc` (globals.css) sizes the circle to the same silhouette Earth3D solves for. */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <div
          className="horizon-disc absolute left-1/2 aspect-square -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#0a1230_0%,#0c1738_90%,rgba(37,99,235,0.9)_97%,rgba(186,230,253,0.95)_99.4%,transparent_100%)] shadow-[0_0_90px_24px_rgba(59,130,246,0.4),0_0_220px_80px_rgba(37,99,235,0.2)]"
          style={{ top: `${(1 - CAP_FRACTION) * 100}%` }}
        />
      </div>

      {enabled ? (
        <Earth3D
          progress={progress ?? still}
          active={active}
          reduced={reduced}
          capFraction={CAP_FRACTION}
          idleSpeed={idleSpeed}
          scrollTurn={scrollTurn}
          onReady={handleReady}
          onLost={handleLost}
        />
      ) : null}
    </div>
  );
}
