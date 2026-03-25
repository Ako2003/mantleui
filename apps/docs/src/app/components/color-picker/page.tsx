"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ColorPicker defaultValue="#3b82f6" />`;

const controlledExample = `function Demo() {
  const [color, setColor] = React.useState("#8b5cf6");
  return (
    <div>
      <ColorPicker value={color} onValueChange={setColor} />
      <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "4px", backgroundColor: color }} />
        <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>{color}</span>
      </div>
    </div>
  );
}

render(<Demo />);`;

const withFieldExample = `<ColorPicker defaultValue="#22c55e" showField />`;

const colorPickerProps = [
  {
    name: "value",
    type: "string",
    description: "The current color value as a hex string (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial color value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the color value changes.",
  },
  {
    name: "showField",
    type: "boolean",
    default: "false",
    description: "Shows a hex color input field below the picker.",
  },
];

export default function ColorPickerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorPicker</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A full-featured color picker combining a color area, sliders, and
        optional hex input field.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Hex Field</h2>
      <div className="mt-4">
        <LivePlayground code={withFieldExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorPickerProps} />
    </div>
  );
}
