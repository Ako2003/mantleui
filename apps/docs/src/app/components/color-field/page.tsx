"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "240px" }}>
  <ColorField label="Color" defaultValue="#3b82f6" />
</div>`;

const controlledExample = `function Demo() {
  const [color, setColor] = React.useState("#22c55e");
  return (
    <div style={{ maxWidth: "240px" }}>
      <ColorField label="Theme color" value={color} onValueChange={setColor} />
      <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "4px", backgroundColor: color }} />
        <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>{color}</span>
      </div>
    </div>
  );
}

render(<Demo />);`;

const errorExample = `<div style={{ maxWidth: "240px" }}>
  <ColorField label="Brand color" defaultValue="invalid" error="Please enter a valid hex color" />
</div>`;

const colorFieldProps = [
  {
    name: "value",
    type: "string",
    description: "The current hex color value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial hex color value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the color value changes.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the color field.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message displayed below the input.",
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

export default function ColorFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A text input for entering hex color values with a color preview swatch.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Error</h2>
      <div className="mt-4">
        <LivePlayground code={errorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorFieldProps} />
    </div>
  );
}
