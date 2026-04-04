"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";

const GridPlane = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.GridPlane),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mantle-color-text-muted)",
        }}
      >
        Loading grid plane...
      </div>
    ),
  },
);

const gridPlaneProps = [
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Grid line color.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Scroll speed multiplier.",
  },
  {
    name: "gridSize",
    type: "number",
    default: "20",
    description: "Grid size.",
  },
  {
    name: "divisions",
    type: "number",
    default: "20",
    description: "Number of grid divisions.",
  },
  {
    name: "fadeDistance",
    type: "number",
    default: "15",
    description: "Distance at which the grid fades.",
  },
  {
    name: "height",
    type: "string | number",
    default: "400",
    description: "Height of the container.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    description: "Background color of the container.",
  },
];

export default function GridPlanePage() {
  const [color, setColor] = useState("#3b82f6");
  const [speed, setSpeed] = useState(1);

  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">GridPlane</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A retro-futuristic scrolling grid plane with perspective and fade
        effects. Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <GridPlane color={color} speed={speed} height={350} />
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Color
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: c,
                  border:
                    color === c
                      ? "2px solid var(--mantle-color-text)"
                      : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Speed: {speed.toFixed(1)}
          </p>
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: 160 }}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm dark:bg-zinc-900">
        <code>{`import { GridPlane } from "@mantleui/react/three";

<GridPlane
  color="#3b82f6"
  speed={1}
  height={400}
/>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={gridPlaneProps} />
    </div>
  );
}
