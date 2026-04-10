import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { DNAHelixProps } from "./DNAHelix.types";

/* ─── Constants ─── */

const SPHERES_PER_STRAND = 80;
const SPHERE_RADIUS = 0.06;
const RUNG_INTERVAL = 4;
const RUNG_RADIUS = 0.015;

/* ─── Helix Group ─── */

function HelixGroup({
  color1,
  color2,
  rungColor,
  speed,
  radius,
  turns,
}: {
  color1: string;
  color2: string;
  rungColor: string;
  speed: number;
  radius: number;
  turns: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const helixHeight = turns * 2;

  const { strand1, strand2, rungs } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    const r: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];

    for (let i = 0; i < SPHERES_PER_STRAND; i++) {
      const t = i / SPHERES_PER_STRAND;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * helixHeight;

      const p1 = new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle + Math.PI) * radius,
        y,
        Math.sin(angle + Math.PI) * radius,
      );

      s1.push(p1);
      s2.push(p2);

      if (i % RUNG_INTERVAL === 0) {
        r.push({ start: p1.clone(), end: p2.clone() });
      }
    }

    return { strand1: s1, strand2: s2, rungs: r };
  }, [radius, turns, helixHeight]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed * 0.5;
    }
  });

  const rungGeometries = useMemo(() => {
    return rungs.map((rung) => {
      const direction = new THREE.Vector3().subVectors(rung.end, rung.start);
      const rungLength = direction.length();
      const midpoint = new THREE.Vector3()
        .addVectors(rung.start, rung.end)
        .multiplyScalar(0.5);

      const quaternion = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      quaternion.setFromUnitVectors(up, direction.normalize());

      return { position: midpoint, quaternion, length: rungLength };
    });
  }, [rungs]);

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      {strand1.map((pos, i) => (
        <mesh key={`s1-${i}`} position={pos}>
          <sphereGeometry args={[SPHERE_RADIUS, 8, 8]} />
          <meshPhongMaterial color={color1} />
        </mesh>
      ))}

      {/* Strand 2 */}
      {strand2.map((pos, i) => (
        <mesh key={`s2-${i}`} position={pos}>
          <sphereGeometry args={[SPHERE_RADIUS, 8, 8]} />
          <meshPhongMaterial color={color2} />
        </mesh>
      ))}

      {/* Rungs */}
      {rungGeometries.map((rung, i) => (
        <mesh
          key={`r-${i}`}
          position={rung.position}
          quaternion={rung.quaternion}
        >
          <cylinderGeometry args={[RUNG_RADIUS, RUNG_RADIUS, rung.length, 6]} />
          <meshBasicMaterial color={rungColor} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── DNAHelix ─── */

/**
 * A rotating double helix with connecting rungs.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { DNAHelix } from "@mantleui/react/three";
 *
 * <DNAHelix color1="#3b82f6" color2="#ef4444" turns={4} />
 * ```
 */
export const DNAHelix = forwardRef<HTMLDivElement, DNAHelixProps>(
  function DNAHelix(
    {
      color1 = "#3b82f6",
      color2 = "#ef4444",
      rungColor = "rgba(255,255,255,0.3)",
      speed = 1,
      radius = 0.5,
      height = 400,
      backgroundColor = "transparent",
      turns = 3,
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
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <HelixGroup
            color1={color1}
            color2={color2}
            rungColor={rungColor}
            speed={speed}
            radius={radius}
            turns={turns}
          />
        </Canvas>
      </div>
    );
  },
);

DNAHelix.displayName = "DNAHelix";
