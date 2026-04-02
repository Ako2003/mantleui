"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ProgressBar value={60} />`;

const withLabelExample = `<ProgressBar value={75} label="Uploading..." showValue />`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <ProgressBar value={40} size="sm" label="Small" />
  <ProgressBar value={60} size="md" label="Medium" />
  <ProgressBar value={80} size="lg" label="Large" />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <ProgressBar value={70} color="blue" label="Blue" showValue />
  <ProgressBar value={70} color="green" label="Green" showValue />
  <ProgressBar value={70} color="red" label="Red" showValue />
  <ProgressBar value={70} color="purple" label="Purple" showValue />
</div>`;

const indeterminateExample = `<ProgressBar indeterminate label="Loading..." />`;

const customMaxExample = `<ProgressBar value={3} max={10} label="Steps completed" showValue />`;

const progressBarProps = [
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
    description: "Size preset for the bar height.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "label",
    type: "string",
    description: "Accessible label displayed above the bar.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Whether to display the current value as a percentage.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Shows an indeterminate animation instead of a fixed value.",
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

export default function ProgressBarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ProgressBar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A horizontal bar that indicates the progress of a task. Supports
        determinate values and an indeterminate loading state.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label and Value</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Indeterminate</h2>
      <div className="mt-4">
        <LivePlayground code={indeterminateExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Max</h2>
      <div className="mt-4">
        <LivePlayground code={customMaxExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={progressBarProps} />
    </div>
  );
}
