import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { GlobeArc, GlobeMarker, GlobeProps } from "./Globe.types";

/* ─── Helpers ─── */

function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/* ─── Dot Sphere ─── */

function DotSphere({ color, radius }: { color: string; radius: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = 2000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      pts.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        ),
      );
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [points]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.01}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthTest={false}
      />
    </points>
  );
}

/* ─── Marker ─── */

function Marker({
  lat,
  lng,
  color = "#3b82f6",
  size = 0.02,
  radius,
}: GlobeMarker & { radius: number }) {
  const position = useMemo(
    () => latLngToVector3(lat, lng, radius),
    [lat, lng, radius],
  );
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

/* ─── Arc ─── */

function Arc({
  startLat,
  startLng,
  endLat,
  endLng,
  color = "#3b82f6",
  radius,
}: GlobeArc & { radius: number }) {
  const curve = useMemo(() => {
    const start = latLngToVector3(startLat, startLng, radius);
    const end = latLngToVector3(endLat, endLng, radius);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(radius + dist * 0.4);
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [startLat, startLng, endLat, endLng, radius]);

  const lineObj = useMemo(() => {
    const points = curve.getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
    });
    return new THREE.Line(geo, mat);
  }, [curve, color]);

  return <primitive object={lineObj} />;
}

/* ─── Rotating Group ─── */

function RotatingGroup({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && speed > 0) {
      groupRef.current.rotation.y += delta * speed * 0.3;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/* ─── Globe ─── */

/**
 * An interactive 3D globe with dot grid, markers, and arcs.
 * Requires `three`, `@react-three/fiber`, and `@react-three/drei`.
 *
 * @example
 * ```tsx
 * import { Globe } from "@mantleui/react/three";
 *
 * <Globe
 *   markers={[
 *     { lat: 40.7, lng: -74, label: "New York" },
 *     { lat: 51.5, lng: -0.1, label: "London" },
 *   ]}
 *   arcs={[
 *     { startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 },
 *   ]}
 * />
 * ```
 */
export const Globe = forwardRef<HTMLDivElement, GlobeProps>(function Globe(
  {
    size = 400,
    color = "#3b82f6",
    dotColor = "rgba(255,255,255,0.3)",
    backgroundColor = "transparent",
    autoRotateSpeed = 0.5,
    interactive = true,
    markers = [],
    arcs = [],
    className,
    style,
    ...rest
  },
  ref,
) {
  const radius = 1;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: size,
        height: size,
        background: backgroundColor,
        ...style,
      }}
      {...rest}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <RotatingGroup speed={autoRotateSpeed}>
          {/* Globe shell */}
          <mesh>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshPhongMaterial
              color="#111"
              transparent
              opacity={0.85}
              shininess={5}
            />
          </mesh>

          {/* Dot grid */}
          <DotSphere color={dotColor} radius={radius * 1.002} />

          {/* Glow ring */}
          <mesh>
            <sphereGeometry args={[radius * 1.01, 64, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.05} />
          </mesh>

          {/* Markers */}
          {markers.map((m, i) => (
            <Marker
              key={`m-${i}`}
              {...m}
              color={m.color ?? color}
              radius={radius * 1.005}
            />
          ))}

          {/* Arcs */}
          {arcs.map((a, i) => (
            <Arc
              key={`a-${i}`}
              {...a}
              color={a.color ?? color}
              radius={radius}
            />
          ))}
        </RotatingGroup>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            rotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
});

Globe.displayName = "Globe";
