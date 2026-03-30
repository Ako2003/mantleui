"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Calendar />`;

const controlledExample = `function Demo() {
  const [date, setDate] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <Calendar value={date} onValueChange={setDate} />
      <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {date ? date.toLocaleDateString() : "none"}
      </span>
    </div>
  );
}

render(<Demo />);`;

const calendarProps = [
  {
    name: "value",
    type: "Date | null",
    description: "The currently selected date (controlled).",
  },
  {
    name: "defaultValue",
    type: "Date",
    description: "The initially selected date (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(date: Date | null) => void",
    description: "Called when the selected date changes.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the selected date indicator.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
];

export default function CalendarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Calendar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A date picker calendar component for selecting a single date. Supports
        controlled and uncontrolled modes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use state to track the selected date and display it below the calendar.
      </p>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={calendarProps} />
    </div>
  );
}
