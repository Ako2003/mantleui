"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <ColorSwatch color="#3b82f6" />
  <ColorSwatch color="#ef4444" />
  <ColorSwatch color="#22c55e" />
  <ColorSwatch color="#eab308" />
  <ColorSwatch color="#a855f7" />
  <ColorSwatch color="#171717" />
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <ColorSwatch color="#3b82f6" size="sm" />
  <ColorSwatch color="#3b82f6" size="md" />
  <ColorSwatch color="#3b82f6" size="lg" />
</div>`;

const roundedExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <ColorSwatch color="#a855f7" rounded="none" />
  <ColorSwatch color="#a855f7" rounded="sm" />
  <ColorSwatch color="#a855f7" rounded="md" />
  <ColorSwatch color="#a855f7" rounded="full" />
</div>`;

const cssColorsExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <ColorSwatch color="rgb(59, 130, 246)" />
  <ColorSwatch color="hsl(0, 84%, 60%)" />
  <ColorSwatch color="tomato" />
  <ColorSwatch color="green" />
</div>`;

const colorSwatchProps = [
  {
    name: "color",
    type: "string",
    description: "The CSS color to display (hex, rgb, hsl, named color, etc.).",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "rounded",
    type: '"none" | "sm" | "md" | "full"',
    default: '"full"',
    description: "Border radius.",
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

export default function ColorSwatchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorSwatch</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A small preview of a color value. Accepts any valid CSS color string.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Rounded</h2>
      <div className="mt-4">
        <LivePlayground code={roundedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">CSS Color Formats</h2>
      <div className="mt-4">
        <LivePlayground code={cssColorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorSwatchProps} />
    </div>
  );
}
