import { forwardRef, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { GridPlaneProps } from "./GridPlane.types";

/* ─── ScrollingGrid ─── */

function ScrollingGrid({
  color,
  speed,
  gridSize,
  divisions,
}: {
  color: string;
  speed: number;
  gridSize: number;
  divisions: number;
}) {
  const gridRef = useRef<THREE.GridHelper>(null);

  const gridHelper = useMemo(() => {
    const grid = new THREE.GridHelper(gridSize, divisions, color, color);
    grid.material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
    });
    return grid;
  }, [gridSize, divisions, color]);

  useFrame((_, delta) => {
    if (!gridRef.current) return;

    // Scroll the grid forward
    gridRef.current.position.z += speed * delta * 2;

    // Reset position to create infinite scrolling illusion
    const cellSize = gridSize / divisions;
    if (gridRef.current.position.z >= cellSize) {
      gridRef.current.position.z -= cellSize;
    }
  });

  return (
    <primitive
      ref={gridRef}
      object={gridHelper}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
    />
  );
}

/* ─── GridPlane ─── */

/**
 * An infinite perspective grid with a Tron-like aesthetic.
 * Requires `three` and `@react-three/fiber`.
 *
 * @example
 * ```tsx
 * import { GridPlane } from "@mantleui/react/three";
 *
 * <GridPlane color="#8b5cf6" speed={2} divisions={30} />
 * ```
 */
export const GridPlane = forwardRef<HTMLDivElement, GridPlaneProps>(
  function GridPlane(
    {
      color = "#3b82f6",
      speed = 1,
      gridSize = 20,
      divisions = 20,
      fadeDistance = 15,
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
        <Canvas camera={{ position: [0, 3, 5], fov: 60, near: 0.1, far: 50 }}>
          <fog attach="fog" args={["#000000", 1, fadeDistance]} />
          <ScrollingGrid
            color={color}
            speed={speed}
            gridSize={gridSize}
            divisions={divisions}
          />
        </Canvas>
      </div>
    );
  },
);

GridPlane.displayName = "GridPlane";
