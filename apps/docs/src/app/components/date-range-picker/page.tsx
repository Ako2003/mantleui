"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [range, setRange] = React.useState(null);
  return (
    <div style={{ maxWidth: "400px" }}>
      <DateRangePicker
        label="Trip dates"
        placeholder="Select date range"
        startDate={range ? range.start : undefined}
        endDate={range ? range.end : undefined}
        onRangeChange={setRange}
      />
    </div>
  );
}

render(<Demo />);`;

const controlledExample = `function Demo() {
  const [range, setRange] = React.useState(null);
  return (
    <div style={{ maxWidth: "400px" }}>
      <DateRangePicker
        label="Booking period"
        placeholder="Select dates"
        startDate={range ? range.start : undefined}
        endDate={range ? range.end : undefined}
        onRangeChange={setRange}
      />
      {range && (
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
          Start: {range.start.toLocaleDateString()} | End: {range.end.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const errorExample = `function Demo() {
  const [range, setRange] = React.useState(null);
  return (
    <div style={{ maxWidth: "400px" }}>
      <DateRangePicker
        label="Period"
        placeholder="Select dates"
        error="Please select a valid range"
        startDate={range ? range.start : undefined}
        endDate={range ? range.end : undefined}
        onRangeChange={setRange}
      />
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `function Demo() {
  const [r1, setR1] = React.useState(null);
  const [r2, setR2] = React.useState(null);
  const [r3, setR3] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <DateRangePicker label="Blue" placeholder="Select..." color="blue" startDate={r1?.start} endDate={r1?.end} onRangeChange={setR1} />
      <DateRangePicker label="Green" placeholder="Select..." color="green" startDate={r2?.start} endDate={r2?.end} onRangeChange={setR2} />
      <DateRangePicker label="Purple" placeholder="Select..." color="purple" startDate={r3?.start} endDate={r3?.end} onRangeChange={setR3} />
    </div>
  );
}

render(<Demo />);`;

const dateRangePickerProps = [
  {
    name: "startDate",
    type: "Date | null",
    description: "The selected start date (controlled).",
  },
  {
    name: "endDate",
    type: "Date | null",
    description: "The selected end date (controlled).",
  },
  {
    name: "onRangeChange",
    type: "(startDate: Date | null, endDate: Date | null) => void",
    description: "Called when the selected date range changes.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text when no dates are selected.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the date range picker.",
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
    description: "Accent color for focus ring and calendar selection.",
  },
];

export default function DateRangePickerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DateRangePicker</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A date range picker for selecting a start and end date. Supports labels,
        error states, and colors.
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
      <PropsTable props={dateRangePickerProps} />
    </div>
  );
}
