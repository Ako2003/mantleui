"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <DatePicker label="Date" placeholder="Select a date" />
</div>`;

const controlledExample = `function Demo() {
  const [date, setDate] = React.useState(null);
  return (
    <div style={{ maxWidth: "320px" }}>
      <DatePicker label="Birthday" placeholder="Pick a date" value={date} onValueChange={setDate} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {date ? date.toLocaleDateString() : "none"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const errorExample = `<div style={{ maxWidth: "320px" }}>
  <DatePicker label="Start date" placeholder="Select a date" error="This field is required" />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <DatePicker label="Blue" placeholder="Select..." color="blue" />
  <DatePicker label="Green" placeholder="Select..." color="green" />
  <DatePicker label="Purple" placeholder="Select..." color="purple" />
</div>`;

const datePickerProps = [
  {
    name: "value",
    type: "Date | null",
    description: "The selected date (controlled).",
  },
  {
    name: "defaultValue",
    type: "Date",
    description: "The initial selected date (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(date: Date | null) => void",
    description: "Called when the selected date changes.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text when no date is selected.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the date picker.",
  },
  {
    name: "error",
    type: "string",
    description: "Error message displayed below the input.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for focus ring and calendar selection.",
  },
];

export default function DatePickerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DatePicker</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A date picker input with a calendar dropdown for selecting a single
        date. Supports labels, error states, and colors.
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
      <PropsTable props={datePickerProps} />
    </div>
  );
}
