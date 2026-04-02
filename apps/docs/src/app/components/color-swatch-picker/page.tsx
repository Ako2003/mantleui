"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ColorSwatchPicker
  colors={["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"]}
  defaultValue="#3b82f6"
/>`;

const controlledExample = `function Demo() {
  const [color, setColor] = React.useState("#22c55e");
  return (
    <div>
      <ColorSwatchPicker
        colors={["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#64748b"]}
        value={color}
        onValueChange={setColor}
      />
      <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "4px", backgroundColor: color }} />
        <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>{color}</span>
      </div>
    </div>
  );
}

render(<Demo />);`;

const swatchSizeExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <ColorSwatchPicker
    colors={["#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"]}
    swatchSize={24}
    defaultValue="#ef4444"
  />
  <ColorSwatchPicker
    colors={["#ef4444", "#22c55e", "#3b82f6", "#8b5cf6"]}
    swatchSize={40}
    defaultValue="#ef4444"
  />
</div>`;

const colorSwatchPickerProps = [
  {
    name: "colors",
    type: "string[]",
    description: "Array of hex color strings to display as swatches.",
  },
  {
    name: "value",
    type: "string",
    description: "The selected color value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial selected color value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected color changes.",
  },
  {
    name: "swatchSize",
    type: "number",
    default: "32",
    description: "Size of each color swatch in pixels.",
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

export default function ColorSwatchPickerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorSwatchPicker</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A grid of color swatches for picking from a predefined palette.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Swatch Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={swatchSizeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorSwatchPickerProps} />
    </div>
  );
}
