"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <Meter value={60} label="Storage" showValue />
</div>`;

const thresholdsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Meter value={20} min={0} max={100} low={30} high={70} optimum={50} label="Low usage" showValue />
  <Meter value={50} min={0} max={100} low={30} high={70} optimum={50} label="Normal usage" showValue />
  <Meter value={85} min={0} max={100} low={30} high={70} optimum={50} label="High usage" showValue />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Meter value={70} color="blue" label="Blue" showValue />
  <Meter value={70} color="green" label="Green" showValue />
  <Meter value={70} color="red" label="Red" showValue />
  <Meter value={70} color="purple" label="Purple" showValue />
</div>`;

const meterProps = [
  {
    name: "value",
    type: "number",
    description: "The current meter value.",
  },
  {
    name: "min",
    type: "number",
    default: "0",
    description: "Minimum value.",
  },
  {
    name: "max",
    type: "number",
    default: "100",
    description: "Maximum value.",
  },
  {
    name: "low",
    type: "number",
    description: "The upper bound of the low range.",
  },
  {
    name: "high",
    type: "number",
    description: "The lower bound of the high range.",
  },
  {
    name: "optimum",
    type: "number",
    description: "The optimal value within the range.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the meter fill.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the meter.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Displays the current value next to the label.",
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

export default function MeterPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Meter</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A meter component for displaying a scalar value within a known range.
        Supports low, high, and optimum thresholds for contextual coloring.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Thresholds</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use the low, high, and optimum props to define value ranges that affect
        the meter appearance.
      </p>
      <div className="mt-4">
        <LivePlayground code={thresholdsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={meterProps} />
    </div>
  );
}
