"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const variantsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Badge variant="solid">Solid</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="subtle">Subtle</Badge>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Badge color="blue">Blue</Badge>
  <Badge color="red">Red</Badge>
  <Badge color="green">Green</Badge>
  <Badge color="yellow">Yellow</Badge>
  <Badge color="purple">Purple</Badge>
  <Badge color="neutral">Neutral</Badge>
</div>`;

const colorsSubtleExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Badge color="blue" variant="subtle">Blue</Badge>
  <Badge color="red" variant="subtle">Red</Badge>
  <Badge color="green" variant="subtle">Green</Badge>
  <Badge color="yellow" variant="subtle">Yellow</Badge>
  <Badge color="purple" variant="subtle">Purple</Badge>
  <Badge color="neutral" variant="subtle">Neutral</Badge>
</div>`;

const badgeProps = [
  {
    name: "variant",
    type: '"solid" | "outline" | "subtle"',
    default: '"solid"',
    description: "Visual style variant.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "The badge content.",
  },
];

export default function BadgePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Badge</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A small label component for status indicators, counts, and categories.
        Available in multiple variants, sizes, and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={variantsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors (Solid)</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors (Subtle)</h2>
      <div className="mt-4">
        <LivePlayground code={colorsSubtleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={badgeProps} />
    </div>
  );
}
