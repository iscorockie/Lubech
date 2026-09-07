"use client";

import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 3D "planet horizon" used behind the pinned Process timeline.
 *
 * – Night-side Earth (brand-graded texture) rising from the bottom of the viewport,
 *   like the hero backdrop, with a fresnel rim + volumetric-looking atmosphere halo.
 * – Rotation = slow idle spin + extra turn driven by the section's scroll progress
 *   (read straight from a MotionValue inside useFrame → zero React re-renders).
 * – Only mounted when the section is near the viewport (see Process.tsx), the render
 *   loop pauses when off-screen, and everything degrades to a CSS fallback when WebGL
 *   is unavailable or the textures fail to load.
 */

const MAP_URL = "/textures/earth-night-blue.webp";
const LIGHTS_URL = "/textures/earth-lights.webp";

/** Spin axis leans toward the camera so mid-latitudes (not the pole) ride the horizon. */
const AXIS_TILT = Math.PI / 3;
/** Extra rotation applied across the full pinned scroll (radians). */
const SCROLL_TURN = Math.PI * 0.55;
/** Idle spin speed (rad/s). */
const IDLE_SPEED = 0.02;
/** Atmosphere halo radius relative to the globe. */
const HALO_SCALE = 1.14;

const VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

/** Thin bright limb on the globe itself (FrontSide, additive). */
const RIM_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float ndv = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
    float rim = pow(1.0 - ndv, uPower);
    gl_FragColor = vec4(uColor * rim * uIntensity, rim);
  }
`;

/** Soft glow fading outwards from the limb (BackSide of a slightly larger sphere). */
const HALO_FRAG = /* glsl */ `
  uniform vec3 uInner;
  uniform vec3 uOuter;
  uniform float uEdge;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Back-face normals point away from the camera: 0 at the outer silhouette,
    // -uEdge right at the globe's limb.
    float d = clamp(-dot(normalize(vNormal), normalize(vView)) / uEdge, 0.0, 1.0);
    float a = pow(d, 2.4);
    vec3 col = mix(uOuter, uInner, d);
    gl_FragColor = vec4(col * a * uIntensity, a);
  }
`;

interface GlobeProps {
  progress: MotionValue<number>;
  reduced: boolean;
  capFraction: number;
  onReady?: () => void;
}

function Globe({ progress, reduced, capFraction, onReady }: GlobeProps) {
  const viewport = useThree((s) => s.viewport);
  const [map, lights] = useLoader(THREE.TextureLoader, [MAP_URL, LIGHTS_URL]);

  const gl = useThree((s) => s.gl);
  useMemo(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    for (const t of [map, lights]) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, maxAniso);
      t.generateMipmaps = true;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.needsUpdate = true;
    }
  }, [gl, map, lights]);

  /*
   * Frame the globe as a horizon: the visible cap takes `capFraction` of the canvas
   * height and the radius is large enough for the arc to span (almost) the full width.
   */
  const capH = viewport.height * capFraction;
  const R = Math.max(viewport.width * 0.85, capH * 2.8);
  const centerY = -viewport.height / 2 + capH - R;

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 96, 96), []);

  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: RIM_FRAG,
        uniforms: {
          uColor: { value: new THREE.Color("#bae6fd") },
          uPower: { value: 2.6 },
          uIntensity: { value: 1.6 },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const haloMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: HALO_FRAG,
        uniforms: {
          uInner: { value: new THREE.Color("#38bdf8") },
          uOuter: { value: new THREE.Color("#2563eb") },
          uEdge: { value: Math.sqrt(1 - 1 / (HALO_SCALE * HALO_SCALE)) },
          uIntensity: { value: 1.35 },
        },
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      rimMaterial.dispose();
      haloMaterial.dispose();
    },
    [geometry, rimMaterial, haloMaterial],
  );

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  const spinRef = useRef<THREE.Mesh>(null);
  const smoothed = useRef(0);

  useFrame((state, dt) => {
    const mesh = spinRef.current;
    if (!mesh || reduced) return;
    // Ease toward the scroll target so scrubbing feels weighty rather than 1:1 jittery.
    const target = progress.get();
    smoothed.current += (target - smoothed.current) * (1 - Math.exp(-Math.min(dt, 0.1) * 5));
    mesh.rotation.y = 0.9 + smoothed.current * SCROLL_TURN + state.clock.elapsedTime * IDLE_SPEED;
  });

  return (
    <group position={[0, centerY, 0]}>
      {/* Key light: top-left, cool blue-white → lit cap with a soft terminator */}
      <directionalLight position={[-0.7, 1.2, 0.8]} intensity={2.6} color="#dbeafe" />
      {/* Fill: cyan from the lower right */}
      <directionalLight position={[1.2, -0.2, 0.5]} intensity={0.9} color="#22d3ee" />
      <ambientLight intensity={0.7} color="#3b82f6" />

      <group rotation={[AXIS_TILT, 0, 0]}>
        <mesh ref={spinRef} geometry={geometry} scale={R} rotation={[0, 0.9, 0]}>
          <meshStandardMaterial
            map={map}
            emissiveMap={lights}
            emissive="#e0f2fe"
            emissiveIntensity={1.7}
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      </group>

      <mesh geometry={geometry} material={rimMaterial} scale={R * 1.004} />
      <mesh geometry={geometry} material={haloMaterial} scale={R * HALO_SCALE} />
    </group>
  );
}

/* ── Guards ─────────────────────────────────────────────────────────────── */

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

class CanvasErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* ── Public component ──────────────────────────────────────────────────── */

export interface Earth3DProps {
  /** 0 → 1 scroll progress of the pinned section (MotionValue, read per frame). */
  progress: MotionValue<number>;
  /** Run the render loop (false when the section is off-screen). */
  active?: boolean;
  /** Reduced-motion: render a single static frame, no spin. */
  reduced?: boolean;
  /** Fires once the textures are loaded and the first frame can be drawn. */
  onReady?: () => void;
  /** Fraction of the canvas height covered by the visible cap of the globe (0–1). */
  capFraction?: number;
  className?: string;
}

export default function Earth3D({
  progress,
  active = true,
  reduced = false,
  onReady,
  capFraction = 0.3,
  className,
}: Earth3DProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  // If the browser drops the context (GPU reset, too many contexts…) unmount and let the
  // CSS horizon take over rather than leaving a blank canvas behind the timeline.
  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.domElement.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setSupported(false);
    });
  }, []);

  if (!supported) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <CanvasErrorBoundary>
        <Canvas
          flat
          dpr={[1, 1.5]}
          frameloop={reduced ? "demand" : active ? "always" : "never"}
          camera={{ position: [0, 0, 24], fov: 10, near: 0.5, far: 80 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
          }}
          style={{ background: "transparent" }}
          onCreated={handleCreated}
        >
          <Suspense fallback={null}>
            <Globe progress={progress} reduced={reduced} capFraction={capFraction} onReady={onReady} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
