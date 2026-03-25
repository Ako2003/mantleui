"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={50} label="Volume" />
</div>`;

const showValueExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={75} label="Brightness" showValue />
</div>`;

const minMaxExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={500} min={100} max={1000} step={50} label="Price" showValue />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState(30);
  return (
    <div style={{ maxWidth: "320px" }}>
      <Slider value={value} onValueChange={setValue} label="Opacity" showValue />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Value: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Slider defaultValue={60} color="blue" label="Blue" />
  <Slider defaultValue={60} color="green" label="Green" />
  <Slider defaultValue={60} color="purple" label="Purple" />
  <Slider defaultValue={60} color="red" label="Red" />
</div>`;

const disabledExample = `<div style={{ maxWidth: "320px" }}>
  <Slider defaultValue={40} label="Disabled" disabled />
</div>`;

const sliderProps = [
  {
    name: "value",
    type: "number",
    description: "The current value (controlled).",
  },
  {
    name: "defaultValue",
    type: "number",
    description: "The initial value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: number) => void",
    description: "Called when the value changes.",
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
    name: "step",
    type: "number",
    default: "1",
    description: "Step increment.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for the slider track and thumb.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the slider.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the slider.",
  },
  {
    name: "showValue",
    type: "boolean",
    default: "false",
    description: "Displays the current value next to the label.",
  },
];

export default function SliderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Slider</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A range slider for selecting a numeric value within a defined range.
        Supports labels, value display, and step increments.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Show Value</h2>
      <div className="mt-4">
        <LivePlayground code={showValueExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Min / Max / Step</h2>
      <div className="mt-4">
        <LivePlayground code={minMaxExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={sliderProps} />
    </div>
  );
}
