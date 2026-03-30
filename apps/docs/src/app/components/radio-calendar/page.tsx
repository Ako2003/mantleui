"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<RadioCalendar
  dates={[
    new Date(2025, 2, 10),
    new Date(2025, 2, 15),
    new Date(2025, 2, 20),
    new Date(2025, 2, 25),
  ]}
/>`;

const controlledExample = `function Demo() {
  const dates = [
    new Date(2025, 2, 10),
    new Date(2025, 2, 15),
    new Date(2025, 2, 20),
    new Date(2025, 2, 25),
  ];
  const [value, setValue] = React.useState(null);
  return (
    <div>
      <RadioCalendar dates={dates} value={value} onValueChange={setValue} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value ? value.toLocaleDateString() : "none"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
  <RadioCalendar
    color="blue"
    dates={[new Date(2025, 2, 5), new Date(2025, 2, 12), new Date(2025, 2, 19)]}
    defaultValue={new Date(2025, 2, 12)}
  />
  <RadioCalendar
    color="green"
    dates={[new Date(2025, 2, 5), new Date(2025, 2, 12), new Date(2025, 2, 19)]}
    defaultValue={new Date(2025, 2, 12)}
  />
</div>`;

const radioCalendarProps = [
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
    name: "dates",
    type: "Date[]",
    description: "Array of selectable dates to highlight on the calendar.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the selected date indicator.",
  },
];

export default function RadioCalendarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">RadioCalendar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A calendar that restricts selection to a specific set of dates,
        displayed as radio-style selectable options.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={radioCalendarProps} />
    </div>
  );
}
