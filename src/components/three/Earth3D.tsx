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
 * 3D Earth – rendered either as a "planet horizon" (used by the pinned Process timeline
 * through <EarthHorizon>) or as a whole globe (used by the hero through <GlobeBackdrop>;
 * both wrappers add a CSS disc that shows until this is ready).
 *
 * – Night-side Earth (brand-graded texture), with a fresnel rim + volumetric-looking
 *   atmosphere halo.
 * – Horizon variant: the planet rises from the bottom of the canvas, visible cap taking
 *   `capFraction` of the height. Sphere variant: the whole planet floats inside the
 *   canvas, diameter `size` × height, centre shifted down by `offsetY` × height.
 * – Rotation = slow idle spin + extra turn driven by a scroll-progress MotionValue
 *   (read straight from the MotionValue inside useFrame → zero React re-renders).
 * – Mounted lazily by the caller, the render loop pauses when off-screen, and
 *   everything degrades to the CSS fallback when WebGL is unavailable, the context is
 *   lost or the textures fail to load.
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

/* Fixed camera (see <Canvas camera>). */
const CAMERA_Z = 24;
const CAMERA_FOV = 10;
const CAMERA_NEAR = 0.5;
const HALF_FOV_TAN = Math.tan((CAMERA_FOV / 2) * (Math.PI / 180));
/** Largest globe whose halo still sits in front of the near plane. */
const MAX_RADIUS = (CAMERA_Z - CAMERA_NEAR - 0.5) / HALO_SCALE;

/**
 * Planet radius (world units) for a canvas of `width` × `height` world units whose visible
 * cap is `capFraction` of the height. At least 0.85 × width (the wide, flat horizon of the
 * Process stage), and for shallow canvases the smallest sphere whose *perspective*
 * silhouette still covers the bottom corners, so the arc always leaves through the sides
 * (+3 % so the rim glow never pinches in a corner). With capFraction 0.5 the camera's
 * optical axis is tangent to the sphere at its top point, so the horizon line sits exactly
 * on the canvas centre line whatever the radius. Extremely wide canvases hit MAX_RADIUS and
 * render a dome that exits through the bottom corners instead (hidden by the page fade).
 * EarthHorizon's CSS disc uses the same rules, so the cross-fade doesn't morph.
 */
function horizonRadius(width: number, height: number, capFraction: number): number {
  const aspect = width / height;
  // Unit direction of the frustum's bottom-left corner ray (view space, camera at origin).
  const len = Math.hypot(aspect * HALF_FOV_TAN, HALF_FOV_TAN, 1);
  const uy = -HALF_FOV_TAN / len;
  const uz = -1 / len;
  const covers = (r: number) => {
    const cy = -height / 2 + height * capFraction - r;
    const cz = -CAMERA_Z;
    const along = cy * uy + cz * uz;
    return cy * cy + cz * cz - along * along <= r * r;
  };
  let fit = MAX_RADIUS;
  if (covers(MAX_RADIUS)) {
    let lo = 0;
    let hi = MAX_RADIUS;
    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2;
      if (covers(mid)) hi = mid;
      else lo = mid;
    }
    fit = hi * 1.03;
  }
  return Math.min(Math.max(fit, width * 0.85), MAX_RADIUS);
}

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
  /** "horizon": planet cap rising from the bottom · "sphere": whole globe in the canvas. */
  variant: "horizon" | "sphere";
  capFraction: number;
  /** Sphere variant: globe diameter as a fraction of the canvas height. */
  size: number;
  /** Sphere variant: centre shifted down by this fraction of the canvas height. */
  offsetY: number;
  idleSpeed: number;
  scrollTurn: number;
  /** City-lights emissive strength (the hero dims this to keep copy readable). */
  emissiveIntensity: number;
  onReady?: () => void;
}

function Globe({
  progress,
  reduced,
  variant,
  capFraction,
  size,
  offsetY,
  idleSpeed,
  scrollTurn,
  emissiveIntensity,
  onReady,
}: GlobeProps) {
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

  // Frame the globe. Horizon: the visible cap takes `capFraction` of the canvas height.
  // Sphere: the whole planet sits inside the canvas, `size` of its height across.
  const capH = viewport.height * capFraction;
  const R =
    variant === "horizon"
      ? horizonRadius(viewport.width, viewport.height, capFraction)
      : Math.min((viewport.height * size) / 2, MAX_RADIUS);
  const centerY =
    variant === "horizon" ? -viewport.height / 2 + capH - R : -viewport.height * offsetY;

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
    mesh.rotation.y = 0.9 + smoothed.current * scrollTurn + state.clock.elapsedTime * idleSpeed;
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
            emissiveIntensity={emissiveIntensity}
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
  /** Fires if the WebGL context is lost afterwards (the canvas unmounts itself). */
  onLost?: () => void;
  /** How the planet is framed: "horizon" (cap rising from the bottom) or "sphere" (whole globe). */
  variant?: "horizon" | "sphere";
  /** Horizon variant: fraction of the canvas height covered by the globe's visible cap (0–1). */
  capFraction?: number;
  /** Sphere variant: globe diameter as a fraction of the canvas height (0–1). */
  size?: number;
  /** Sphere variant: centre shifted down by this fraction of the canvas height (0–1). */
  offsetY?: number;
  /** Idle spin speed in rad/s. */
  idleSpeed?: number;
  /** Extra rotation (radians) applied across `progress` 0 → 1. */
  scrollTurn?: number;
  /** City-lights emissive strength, 0–2+ (default 1.7; dim behind hero copy). */
  emissiveIntensity?: number;
  className?: string;
}

export default function Earth3D({
  progress,
  active = true,
  reduced = false,
  onReady,
  onLost,
  variant = "horizon",
  capFraction = 0.3,
  size = 0.8,
  offsetY = 0,
  idleSpeed = IDLE_SPEED,
  scrollTurn = SCROLL_TURN,
  emissiveIntensity = 1.7,
  className,
}: Earth3DProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  // If the browser drops the context (GPU reset, too many contexts…) unmount and let the
  // CSS horizon take over rather than leaving a blank canvas behind the timeline.
  const handleCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      gl.domElement.addEventListener("webglcontextlost", (e) => {
        e.preventDefault();
        setSupported(false);
        onLost?.();
      });
    },
    [onLost],
  );

  if (!supported) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <CanvasErrorBoundary>
        <Canvas
          flat
          dpr={[1, 1.5]}
          frameloop={reduced ? "demand" : active ? "always" : "never"}
          camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV, near: CAMERA_NEAR, far: 80 }}
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
            <Globe
              progress={progress}
              reduced={reduced}
              variant={variant}
              capFraction={capFraction}
              size={size}
              offsetY={offsetY}
              idleSpeed={idleSpeed}
              scrollTurn={scrollTurn}
              emissiveIntensity={emissiveIntensity}
              onReady={onReady}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
