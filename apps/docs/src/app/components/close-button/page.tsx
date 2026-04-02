"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const sizesExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <CloseButton size="sm" />
  <CloseButton size="md" />
  <CloseButton size="lg" />
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <CloseButton color="blue" />
  <CloseButton color="red" />
  <CloseButton color="green" />
  <CloseButton color="neutral" />
</div>`;

const closeButtonProps = [
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"neutral"',
    description: "Accent color.",
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

export default function CloseButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">CloseButton</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A button with a close icon, typically used inside modals, drawers, and
        dismissible elements.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={closeButtonProps} />
    </div>
  );
}
