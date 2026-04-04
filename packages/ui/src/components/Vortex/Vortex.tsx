import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { VortexProps } from "./Vortex.types";

/* ─── Spiral Particles ─── */

function SpiralParticles({
  count,
  color,
  speed,
  radius,
  length,
  particleSize,
}: {
  count: number;
  color: string;
  speed: number;
  radius: number;
  length: number;
  particleSize: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  const offsets = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random();
    }
    return arr;
  }, [count]);

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = offsets[i] ?? 0;
      const angle = t * Math.PI * 2 * 6;
      const r = radius * (0.2 + t * 0.8);
      const y = (t - 0.5) * length;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, [count, radius, length, offsets]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const position = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = position.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const offset = offsets[i] ?? 0;
      const t = (offset + time * speed * 0.1) % 1;
      const angle = t * Math.PI * 2 * 6 + time * speed;
      const r = radius * (0.2 + t * 0.8);
      const y = (t - 0.5) * length;

      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }

    position.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.005;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(initialPositions, 3),
    );
    return geo;
  }, [initialPositions]);

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          color={color}
          size={particleSize}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}

/* ─── Vortex ─── */

/**
 * A spiraling particle tornado/tunnel effect.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { Vortex } from "@mantleui/react/three";
 *
 * <Vortex count={800} color="#8b5cf6" speed={1.5} />
 * ```
 */
export const Vortex = forwardRef<HTMLDivElement, VortexProps>(function Vortex(
  {
    count = 500,
    color = "#8b5cf6",
    speed = 1,
    radius = 2,
    length = 6,
    particleSize = 0.02,
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
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <SpiralParticles
          count={count}
          color={color}
          speed={speed}
          radius={radius}
          length={length}
          particleSize={particleSize}
        />
      </Canvas>
    </div>
  );
});

Vortex.displayName = "Vortex";
