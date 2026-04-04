"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";

const Vortex = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.Vortex),
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
        Loading vortex...
      </div>
    ),
  },
);

const vortexProps = [
  {
    name: "count",
    type: "number",
    default: "500",
    description: "Number of particles.",
  },
  {
    name: "color",
    type: "string",
    default: '"#8b5cf6"',
    description: "Particle color.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "radius",
    type: "number",
    default: "2",
    description: "Spiral radius.",
  },
  {
    name: "length",
    type: "number",
    default: "6",
    description: "Spiral length along the Y axis.",
  },
  {
    name: "particleSize",
    type: "number",
    default: "0.02",
    description: "Individual particle size.",
  },
  {
    name: "height",
    type: "string | number",
    default: "400",
    description: "Container height.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    description: "Background color of the container.",
  },
];

export default function VortexPage() {
  const [color, setColor] = useState("#8b5cf6");
  const [count, setCount] = useState(500);
  const [speed, setSpeed] = useState(1);

  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">Vortex</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A swirling 3D particle vortex with configurable density and speed. Built
        with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <Vortex color={color} count={count} speed={speed} height={350} />
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
            Particles: {count}
          </p>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{ width: 160 }}
          />
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
        <code>{`import { Vortex } from "@mantleui/react/three";

<Vortex
  color="#8b5cf6"
  count={500}
  speed={1}
  height={400}
/>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={vortexProps} />
    </div>
  );
}
