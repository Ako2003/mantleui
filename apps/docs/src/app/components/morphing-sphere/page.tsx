"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";

const MorphingSphere = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.MorphingSphere),
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
        Loading morphing sphere...
      </div>
    ),
  },
);

const morphingSphereProps = [
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "Sphere color.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "distortion",
    type: "number",
    default: "0.3",
    description: "Vertex displacement intensity.",
  },
  {
    name: "detail",
    type: "number",
    default: "64",
    description: "Sphere geometry detail (segments).",
  },
  {
    name: "wireframe",
    type: "boolean",
    default: "false",
    description: "Render as wireframe.",
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

export default function MorphingSpherePage() {
  const [color, setColor] = useState("#3b82f6");
  const [distortion, setDistortion] = useState(0.3);
  const [wireframe, setWireframe] = useState(false);

  const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#ef4444", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-bold">MorphingSphere</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A continuously morphing 3D sphere with vertex displacement. Built with
        Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <MorphingSphere
          color={color}
          distortion={distortion}
          wireframe={wireframe}
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
            Distortion: {distortion.toFixed(1)}
          </p>
          <input
            type="range"
            min={0.1}
            max={1}
            step={0.1}
            value={distortion}
            onChange={(e) => setDistortion(Number(e.target.value))}
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
      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm dark:bg-zinc-900">
        <code>{`import { MorphingSphere } from "@mantleui/react/three";

<MorphingSphere
  color="#3b82f6"
  distortion={0.3}
  wireframe={false}
  height={400}
/>`}</code>
      </pre>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={morphingSphereProps} />
    </div>
  );
}
