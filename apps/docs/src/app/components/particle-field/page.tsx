"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const ParticleField = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.ParticleField),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100%",
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--mantle-color-text-muted)",
        }}
      >
        Loading particles...
      </div>
    ),
  },
);

const particleFieldProps = [
  {
    name: "count",
    type: "number",
    default: "200",
    description: "Number of particles.",
  },
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Particle and connection line color.",
  },
  {
    name: "particleSize",
    type: "number",
    default: "0.015",
    description: "Size of each particle.",
  },
  {
    name: "spread",
    type: "number",
    default: "5",
    description: "Spread radius of the particle field.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "connections",
    type: "boolean",
    default: "true",
    description: "Show connection lines between nearby particles.",
  },
  {
    name: "connectionDistance",
    type: "number",
    default: "1.5",
    description: "Maximum distance for drawing connections.",
  },
  {
    name: "connectionOpacity",
    type: "number",
    default: "0.15",
    description: "Opacity of connection lines.",
  },
  {
    name: "backgroundColor",
    type: "string",
    default: '"transparent"',
    description: "Background color of the container.",
  },
  {
    name: "height",
    type: "string | number",
    default: '"400px"',
    description: "Height of the container.",
  },
];

export default function ParticleFieldPage() {
  const [count, setCount] = useState(150);
  const [color, setColor] = useState("#8b5cf6");
  const [connections, setConnections] = useState(true);
  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#22c55e",
    "#ef4444",
    "#eab308",
    "#ffffff",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold">ParticleField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An animated 3D particle field with optional connection lines between
        nearby particles. Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <ParticleField
          count={count}
          color={color}
          connections={connections}
          height={350}
          speed={0.8}
        />
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
            min={50}
            max={400}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            style={{ width: 160 }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={connections}
              onChange={(e) => setConnections(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Connections
          </label>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { ParticleField } from "@mantleui/react/three";

<ParticleField
  count={200}
  color="#8b5cf6"
  height={400}
  connections
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={particleFieldProps} />
    </div>
  );
}
