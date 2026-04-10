import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MorphingSphereProps } from "./MorphingSphere.types";

/* ─── Sphere ─── */

function Sphere({
  color,
  speed,
  distortion,
  detail,
  wireframe,
}: {
  color: string;
  speed: number;
  distortion: number;
  detail: number;
  wireframe: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const originalPositions = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, detail, detail);
    const posAttr = geo.getAttribute("position");
    return new Float32Array(posAttr.array);
  }, [detail]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const time = clock.getElapsedTime() * speed;

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;
      const ox = originalPositions[ix] ?? 0;
      const oy = originalPositions[ix + 1] ?? 0;
      const oz = originalPositions[ix + 2] ?? 0;

      // Compute normal direction (sphere centered at origin, so normal = position)
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;

      // Noise-like displacement
      const displacement =
        Math.sin(ox * 3 + time) *
        Math.cos(oy * 4 + time) *
        Math.sin(oz * 2 + time) *
        distortion;

      arr[ix] = ox + nx * displacement;
      arr[ix + 1] = oy + ny * displacement;
      arr[ix + 2] = oz + nz * displacement;
    }

    posAttr.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, detail, detail]} />
      <meshPhongMaterial color={color} wireframe={wireframe} shininess={30} />
    </mesh>
  );
}

/* ─── MorphingSphere ─── */

/**
 * A sphere that deforms with organic noise-based vertex displacement.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { MorphingSphere } from "@mantleui/react/three";
 *
 * <MorphingSphere color="#8b5cf6" distortion={0.5} wireframe />
 * ```
 */
export const MorphingSphere = forwardRef<HTMLDivElement, MorphingSphereProps>(
  function MorphingSphere(
    {
      color = "#3b82f6",
      speed = 1,
      distortion = 0.3,
      detail = 64,
      wireframe = false,
      height = 400,
      backgroundColor = "transparent",
      className,
      style,
      ...rest
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: "100%",
          height: typeof height === "number" ? `${height}px` : height,
          background: backgroundColor,
          ...style,
        }}
        {...rest}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Sphere
            color={color}
            speed={speed}
            distortion={distortion}
            detail={detail}
            wireframe={wireframe}
          />
        </Canvas>
      </div>
    );
  },
);

MorphingSphere.displayName = "MorphingSphere";
