import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { StarFieldProps } from "./StarField.types";

/* ─── Stars ─── */

function Stars({
  count,
  color,
  speed,
  depth,
  starSize,
}: {
  count: number;
  color: string;
  speed: number;
  depth: number;
  starSize: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix] = (Math.random() - 0.5) * 10;
      pos[ix + 1] = (Math.random() - 0.5) * 10;
      pos[ix + 2] = -Math.random() * depth;
    }
    return pos;
  }, [count, depth]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const iz = i * 3 + 2;
      arr[iz] = (arr[iz] ?? 0) + speed * delta * 4;

      // Reset star to far distance when it passes the camera
      if ((arr[iz] ?? 0) > 1) {
        arr[iz] = -depth;
        arr[i * 3] = (Math.random() - 0.5) * 10;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      }
    }

    posAttr.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={starSize}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}

/* ─── StarField ─── */

/**
 * A warp-speed star tunnel / hyperspace effect.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { StarField } from "@mantleui/react/three";
 *
 * <StarField count={1500} speed={2} depth={15} />
 * ```
 */
export const StarField = forwardRef<HTMLDivElement, StarFieldProps>(
  function StarField(
    {
      count = 1000,
      color = "#ffffff",
      speed = 1,
      depth = 10,
      starSize = 0.01,
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
        <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
          <Stars
            count={count}
            color={color}
            speed={speed}
            depth={depth}
            starSize={starSize}
          />
        </Canvas>
      </div>
    );
  },
);

StarField.displayName = "StarField";
