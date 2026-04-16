"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ProgressCircle value={65} />`;

const sizesExample = `<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
  <ProgressCircle value={65} size="sm" />
  <ProgressCircle value={65} size="md" />
  <ProgressCircle value={65} size="lg" />
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
  <ProgressCircle value={75} color="blue" />
  <ProgressCircle value={75} color="red" />
  <ProgressCircle value={75} color="green" />
  <ProgressCircle value={75} color="purple" />
</div>`;

const showValueExample = `<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
  <ProgressCircle value={42} showValue size="lg" />
  <ProgressCircle value={88} showValue size="lg" color="green" />
</div>`;

const strokeWidthExample = `<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
  <ProgressCircle value={60} strokeWidth={2} size="lg" />
  <ProgressCircle value={60} strokeWidth={4} size="lg" />
  <ProgressCircle value={60} strokeWidth={8} size="lg" />
</div>`;

const progressCircleProps = [
  {
    name: "value",
    type: "number",
    description: "Current progress value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "strokeWidth",
    type: "number",
    default: "4",
    description: "Thickness of the circle stroke in pixels.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Whether to display the current value in the center.",
  },
  {
    name: "--mantle-bg",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the background color via style. e.g. style={{ "--mantle-bg": "#1a1a2e" }}',
  },
  {
    name: "--mantle-border",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the border color via style. Set to "transparent" to remove. e.g. style={{ "--mantle-border": "#e94560" }}',
  },
  {
    name: "--mantle-text",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the text color via style. e.g. style={{ "--mantle-text": "#ffffff" }}',
  },
  {
    name: "--mantle-ring",
    type: "CSS variable",
    default: "accent",
    description:
      'Override the focus ring color via style. e.g. style={{ "--mantle-ring": "#e94560" }}',
  },
];

export default function ProgressCirclePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ProgressCircle</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A circular progress indicator that visually represents completion. Can
        optionally display the current value in the center.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Show Value</h2>
      <div className="mt-4">
        <LivePlayground code={showValueExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Stroke Width</h2>
      <div className="mt-4">
        <LivePlayground code={strokeWidthExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={progressCircleProps} />
    </div>
  );
}
