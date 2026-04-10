"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const WaveField = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.WaveField),
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
        Loading wave field...
      </div>
    ),
  },
);

const waveFieldProps = [
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Wave color.",
  },
  {
    name: "wireframe",
    type: "boolean",
    default: "true",
    description: "Render as wireframe.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "amplitude",
    type: "number",
    default: "0.3",
    description: "Wave amplitude.",
  },
  {
    name: "frequency",
    type: "number",
    default: "0.5",
    description: "Wave frequency.",
  },
  {
    name: "segments",
    type: "number",
    default: "50",
    description: "Number of plane segments.",
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

export default function WaveFieldPage() {
  const [color, setColor] = useState("#3b82f6");
  const [wireframe, setWireframe] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [amplitude, setAmplitude] = useState(0.3);

  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">WaveField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An animated 3D wave plane with configurable color, amplitude, and speed.
        Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <WaveField
          color={color}
          wireframe={wireframe}
          speed={speed}
          amplitude={amplitude}
          height={350}
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
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-600 dark:text-zinc-400">
            Amplitude: {amplitude.toFixed(1)}
          </p>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.1}
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            style={{ width: 160 }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={wireframe}
              onChange={(e) => setWireframe(e.target.checked)}
              style={{ marginRight: 6 }}
            />
            Wireframe
          </label>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { WaveField } from "@mantleui/react/three";

<WaveField
  color="#3b82f6"
  wireframe
  speed={1}
  amplitude={0.3}
  height={400}
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={waveFieldProps} />
    </div>
  );
}
