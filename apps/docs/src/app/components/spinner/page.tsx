"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const sizesExample = `<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  <Spinner color="blue" />
  <Spinner color="red" />
  <Spinner color="green" />
  <Spinner color="purple" />
  <Spinner color="neutral" />
</div>`;

const withLabelExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <Spinner label="Loading..." />
  <Spinner label="Please wait..." size="lg" />
</div>`;

const spinnerProps = [
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
    name: "label",
    type: "string",
    description: "Accessible label text displayed alongside the spinner.",
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

export default function SpinnerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Spinner</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An animated loading indicator available in multiple sizes and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={spinnerProps} />
    </div>
  );
}
