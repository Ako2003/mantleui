"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const Aurora = dynamic(
  () => import("@mantleui/react/three").then((mod) => mod.Aurora),
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
        Loading aurora...
      </div>
    ),
  },
);

const auroraProps = [
  {
    name: "colors",
    type: "string[]",
    default: '["#3b82f6", "#8b5cf6", "#22c55e"]',
    description: "Aurora ribbon colors.",
  },
  {
    name: "speed",
    type: "number",
    default: "1",
    description: "Animation speed multiplier.",
  },
  {
    name: "layers",
    type: "number",
    default: "3",
    description: "Number of ribbon layers.",
  },
  {
    name: "opacity",
    type: "number",
    default: "0.5",
    description: "Ribbon opacity.",
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

export default function AuroraPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Aurora</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A mesmerizing aurora borealis effect with layered, flowing ribbons of
        light. Built with Three.js and @react-three/fiber.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-black dark:border-zinc-800">
        <Aurora
          colors={["#3b82f6", "#8b5cf6", "#22c55e"]}
          speed={1}
          height={350}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { Aurora } from "@mantleui/react/three";

<Aurora
  colors={["#3b82f6", "#8b5cf6", "#22c55e"]}
  speed={1}
  layers={3}
  opacity={0.5}
  height={400}
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={auroraProps} />
    </div>
  );
}
