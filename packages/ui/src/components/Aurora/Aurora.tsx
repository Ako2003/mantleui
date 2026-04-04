import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AuroraProps } from "./Aurora.types";

/* ─── Ribbon ─── */

function Ribbon({
  color,
  speed,
  opacity,
  yOffset,
  index,
}: {
  color: string;
  speed: number;
  opacity: number;
  yOffset: number;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { geometry, originalPositions } = useMemo(() => {
    const segmentsX = 64;
    const segmentsY = 1;
    const geo = new THREE.PlaneGeometry(8, 1.2, segmentsX, segmentsY);
    const posAttr = geo.getAttribute("position");
    const original = new Float32Array(posAttr.array);
    return { geometry: geo, originalPositions: original };
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const geo = meshRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const time = clock.getElapsedTime() * speed;
    const phase = index * 1.5;

    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;
      const ox = originalPositions[ix] ?? 0;
      const oy = originalPositions[ix + 1] ?? 0;

      // Undulate vertices with sin waves
      arr[ix + 1] =
        oy +
        Math.sin(ox * 1.5 + time + phase) * 0.3 +
        Math.sin(ox * 0.7 - time * 0.5 + phase) * 0.2;
      arr[ix + 2] =
        Math.sin(ox * 2 + time * 0.8 + phase) * 0.15 +
        Math.cos(ox + time * 0.3 + phase) * 0.1;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[0, yOffset, 0]}
      rotation={[0.2, 0, 0]}
    >
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Aurora ─── */

/**
 * Flowing northern-lights gradient ribbons.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { Aurora } from "@mantleui/react/three";
 *
 * <Aurora colors={["#3b82f6", "#8b5cf6", "#22c55e"]} layers={4} />
 * ```
 */
export const Aurora = forwardRef<HTMLDivElement, AuroraProps>(function Aurora(
  {
    colors = ["#3b82f6", "#8b5cf6", "#22c55e"],
    speed = 1,
    layers = 3,
    opacity = 0.5,
    height = 400,
    backgroundColor = "transparent",
    className,
    style,
    ...rest
  },
  ref,
) {
  const ribbons = useMemo(() => {
    const items: { color: string; yOffset: number; index: number }[] = [];
    for (let i = 0; i < layers; i++) {
      items.push({
        color: colors[i % colors.length] ?? "#fff",
        yOffset: (i - (layers - 1) / 2) * 0.6,
        index: i,
      });
    }
    return items;
  }, [layers, colors]);

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
        {ribbons.map((ribbon) => (
          <Ribbon
            key={ribbon.index}
            color={ribbon.color}
            speed={speed}
            opacity={opacity}
            yOffset={ribbon.yOffset}
            index={ribbon.index}
          />
        ))}
      </Canvas>
    </div>
  );
});

Aurora.displayName = "Aurora";
