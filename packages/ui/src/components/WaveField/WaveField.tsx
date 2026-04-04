import { forwardRef, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { WaveFieldProps } from "./WaveField.types";

/* ─── Wave Mesh ─── */

function WaveMesh({
  color,
  wireframe,
  speed,
  amplitude,
  frequency,
  segments,
}: {
  color: string;
  wireframe: boolean;
  speed: number;
  amplitude: number;
  frequency: number;
  segments: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry;
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const arr = position.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < position.count; i++) {
      const x = arr[i * 3] ?? 0;
      const y = arr[i * 3 + 1] ?? 0;
      const z =
        Math.sin(x * frequency + time * speed) * amplitude +
        Math.sin(y * frequency * 0.8 + time * speed * 0.6) * amplitude * 0.5;
      arr[i * 3 + 2] = z;
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[8, 8, segments, segments]} />
      <meshPhongMaterial
        color={color}
        wireframe={wireframe}
        side={THREE.DoubleSide}
        transparent
        opacity={wireframe ? 0.6 : 0.9}
        shininess={30}
      />
    </mesh>
  );
}

/* ─── WaveField ─── */

/**
 * An animated sine wave mesh that ripples like water.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { WaveField } from "@mantleui/react/three";
 *
 * <WaveField color="#3b82f6" amplitude={0.5} speed={1.5} />
 * ```
 */
export const WaveField = forwardRef<HTMLDivElement, WaveFieldProps>(
  function WaveField(
    {
      color = "#3b82f6",
      wireframe = true,
      speed = 1,
      amplitude = 0.3,
      frequency = 0.5,
      segments = 50,
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
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <WaveMesh
            color={color}
            wireframe={wireframe}
            speed={speed}
            amplitude={amplitude}
            frequency={frequency}
            segments={segments}
          />
        </Canvas>
      </div>
    );
  },
);

WaveField.displayName = "WaveField";
