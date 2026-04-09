"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const StarField = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.StarField),
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
        Loading star field...
      </div>
    ),
  },
);

const starFieldProps = [
  {
    name: "count",
    type: "number",
    default: "1000",
    description: "Number of stars.",
  },
  {
    name: "color",
    type: "string",
    default: '"#ffffff"',
    description: "Star color.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Warp speed multiplier.",
  },
  {
    name: "depth",
    type: "number",
    default: "10",
    description: "Depth of the star tunnel.",
  },
  {
    name: "starSize",
    type: "number",
    default: "0.01",
    description: "Size of each star point.",
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

export default function StarFieldPage() {
  const [color, setColor] = useState("#ffffff");
  const [count, setCount] = useState(1000);
  const [speed, setSpeed] = useState(1);

  const colors = ["#ffffff", "#3b82f6", "#8b5cf6", "#22c55e", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">StarField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A warp-speed star field effect with configurable density and color.
        Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <StarField color={color} count={count} speed={speed} height={350} />
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
            Stars: {count}
          </p>
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
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
      <CodeBlock code={`import { StarField } from "@mantleui/react/three";

<StarField
  color="#ffffff"
  count={1000}
  speed={1}
  height={400}
/>`} />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={starFieldProps} />
    </div>
  );
}
