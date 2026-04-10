"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const DNAHelix = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.DNAHelix),
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
        Loading DNA helix...
      </div>
    ),
  },
);

const dnaHelixProps = [
  {
    name: "color1",
    type: "string",
    default: '"#3b82f6"',
    description: "First strand color.",
  },
  {
    name: "color2",
    type: "string",
    default: '"#ef4444"',
    description: "Second strand color.",
  },
  {
    name: "rungColor",
    type: "string",
    default: '"rgba(255,255,255,0.3)"',
    description: "Connecting rung color.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Rotation speed multiplier.",
  },
  {
    name: "radius",
    type: "number",
    default: "0.5",
    description: "Helix radius.",
  },
  {
    name: "turns",
    type: "number",
    default: "3",
    description: "Number of helix turns.",
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

export default function DNAHelixPage() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#ef4444");
  const [speed, setSpeed] = useState(1);

  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">DNAHelix</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An animated 3D double helix with two colored strands and connecting
        rungs. Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <DNAHelix color1={color1} color2={color2} speed={speed} height={350} />
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Strand 1 Color
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor1(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: c,
                  border:
                    color1 === c
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
            Strand 2 Color
          </p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor2(c)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: c,
                  border:
                    color2 === c
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
      <CodeBlock
        code={`import { DNAHelix } from "@mantleui/react/three";

<DNAHelix
  color1="#3b82f6"
  color2="#ef4444"
  speed={1}
  height={400}
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dnaHelixProps} />
    </div>
  );
}
