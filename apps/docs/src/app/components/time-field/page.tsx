"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "240px" }}>
  <TimeField label="Meeting time" />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("14:30");
  return (
    <div style={{ maxWidth: "240px" }}>
      <TimeField label="Alarm" value={value} onValueChange={setValue} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Value: {value || "empty"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const errorExample = `<div style={{ maxWidth: "240px" }}>
  <TimeField label="Start time" error="Please enter a valid time" />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "240px" }}>
  <TimeField label="Blue" color="blue" />
  <TimeField label="Green" color="green" />
  <TimeField label="Purple" color="purple" />
</div>`;

const timeFieldProps = [
  {
    name: "value",
    type: "string",
    description: 'The current time value (controlled), e.g. "14:30".',
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial time value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the time value changes.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the time field.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message displayed below the input.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the focus ring.",
  },
];

export default function TimeFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">TimeField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A time input field for entering or selecting a time value. Supports step
        intervals, labels, and error states.
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

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={timeFieldProps} />
    </div>
  );
}
