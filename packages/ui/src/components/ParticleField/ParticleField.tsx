import { forwardRef, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParticleFieldProps } from "./ParticleField.types";

/* ─── Particles ─── */

function Particles({
  count,
  color,
  particleSize,
  spread,
  speed,
  connections,
  connectionDistance,
  connectionOpacity,
}: {
  count: number;
  color: string;
  particleSize: number;
  spread: number;
  speed: number;
  connections: boolean;
  connectionDistance: number;
  connectionOpacity: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const [{ positions, velocitiesArr }] = useState(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocitiesArr: vel };
  });

  // Wrap velocities in a ref so React doesn't track its mutations
  const velocitiesRef = useRef(velocitiesArr);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const halfSpread = spread / 2;

    const velocities = velocitiesRef.current;
    if (!velocities) return;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] = (arr[ix] ?? 0) + (velocities[ix] ?? 0) * speed * delta * 60;
      arr[ix + 1] =
        (arr[ix + 1] ?? 0) + (velocities[ix + 1] ?? 0) * speed * delta * 60;
      arr[ix + 2] =
        (arr[ix + 2] ?? 0) + (velocities[ix + 2] ?? 0) * speed * delta * 60;

      // Bounce off edges
      for (let j = 0; j < 3; j++) {
        const v = arr[ix + j] ?? 0;
        if (v > halfSpread || v < -halfSpread) {
          velocities[ix + j] = -(velocities[ix + j] ?? 0);
        }
      }
    }
    pos.needsUpdate = true;

    // Connection lines
    if (connections && lineRef.current) {
      const linePositions: number[] = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = (arr[i * 3] ?? 0) - (arr[j * 3] ?? 0);
          const dy = (arr[i * 3 + 1] ?? 0) - (arr[j * 3 + 1] ?? 0);
          const dz = (arr[i * 3 + 2] ?? 0) - (arr[j * 3 + 2] ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionDistance) {
            linePositions.push(
              arr[i * 3] ?? 0,
              arr[i * 3 + 1] ?? 0,
              arr[i * 3 + 2] ?? 0,
              arr[j * 3] ?? 0,
              arr[j * 3 + 1] ?? 0,
              arr[j * 3 + 2] ?? 0,
            );
          }
        }
      }
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3),
      );
    }
  });

  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          color={color}
          size={particleSize}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
      {connections && (
        <lineSegments ref={lineRef} geometry={lineGeometry}>
          <lineBasicMaterial
            color={color}
            transparent
            opacity={connectionOpacity}
          />
        </lineSegments>
      )}
    </>
  );
}

/* ─── ParticleField ─── */

/**
 * An animated 3D particle field with optional connection lines.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { ParticleField } from "@mantleui/react/three";
 *
 * <ParticleField count={150} color="#8b5cf6" height={300} />
 * ```
 */
export const ParticleField = forwardRef<HTMLDivElement, ParticleFieldProps>(
  function ParticleField(
    {
      count = 200,
      color = "#3b82f6",
      particleSize = 0.015,
      spread = 5,
      speed = 1,
      connections = true,
      connectionDistance = 1.5,
      connectionOpacity = 0.15,
      backgroundColor = "transparent",
      height = 400,
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
        <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
          <Particles
            count={count}
            color={color}
            particleSize={particleSize}
            spread={spread}
            speed={speed}
            connections={connections}
            connectionDistance={connectionDistance}
            connectionOpacity={connectionOpacity}
          />
        </Canvas>
      </div>
    );
  },
);

ParticleField.displayName = "ParticleField";
