"use client";

import { LivePlayground } from "@/components/LivePlayground";
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
