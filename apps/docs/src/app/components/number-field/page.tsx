"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <NumberField label="Quantity" defaultValue={1} />
</div>`;

const minMaxExample = `<div style={{ maxWidth: "320px" }}>
  <NumberField label="Age" min={0} max={120} defaultValue={25} />
</div>`;

const stepExample = `<div style={{ maxWidth: "320px" }}>
  <NumberField label="Price" min={0} max={100} step={0.5} defaultValue={9.5} />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState(5);
  return (
    <div style={{ maxWidth: "320px" }}>
      <NumberField
        label="Items"
        value={value}
        onValueChange={setValue}
        min={0}
        max={10}
      />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Current value: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const withErrorExample = `<div style={{ maxWidth: "320px" }}>
  <NumberField label="Quantity" error="Must be at least 1." defaultValue={0} min={0} />
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <NumberField size="sm" label="Small" defaultValue={1} />
  <NumberField size="md" label="Medium" defaultValue={2} />
  <NumberField size="lg" label="Large" defaultValue={3} />
</div>`;

const prefixSuffixExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <NumberField label="Price (USD)" prefix="$" defaultValue={49} min={0} step={1} />
  <NumberField label="Price (EUR)" prefix="€" defaultValue={39} min={0} step={1} />
  <NumberField label="Discount" suffix="%" defaultValue={15} min={0} max={100} />
  <NumberField label="Weight" suffix="kg" defaultValue={5} min={0} step={0.5} />
</div>`;

const currencyExample = `function Demo() {
  const [amount, setAmount] = React.useState(99.99);
  return (
    <div style={{ maxWidth: "320px" }}>
      <NumberField
        label="Payment Amount"
        prefix="$"
        value={amount}
        onValueChange={setAmount}
        min={0}
        step={0.01}
        color="green"
      />
      <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>
        Total: ${"$"}{amount.toFixed(2)}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <NumberField color="blue" label="Blue" defaultValue={1} />
  <NumberField color="green" label="Green" defaultValue={2} />
  <NumberField color="purple" label="Purple" defaultValue={3} />
</div>`;

const numberFieldProps = [
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
    description: "The minimum allowed value.",
  },
  {
    name: "max",
    type: "number",
    description: "The maximum allowed value.",
  },
  {
    name: "step",
    type: "number",
    default: "1",
    description: "The increment/decrement step for the +/- buttons.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed above the input.",
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
    description: "Accent color for focus ring and buttons.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "prefix",
    type: "ReactNode",
    description: 'Content displayed before the value (e.g. "$", "€").',
  },
  {
    name: "suffix",
    type: "ReactNode",
    description: 'Content displayed after the value (e.g. "%", "kg").',
  },
];

export default function NumberFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">NumberField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A numeric input with increment/decrement buttons, supporting min/max
        constraints, step values, and controlled/uncontrolled modes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Min / Max</h2>
      <div className="mt-4">
        <LivePlayground code={minMaxExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Step</h2>
      <div className="mt-4">
        <LivePlayground code={stepExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Error</h2>
      <div className="mt-4">
        <LivePlayground code={withErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Prefix & Suffix</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add currency symbols, units, or other indicators before or after the
        value.
      </p>
      <div className="mt-4">
        <LivePlayground code={prefixSuffixExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Currency Input</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A controlled payment input with a dollar prefix.
      </p>
      <div className="mt-4">
        <LivePlayground code={currencyExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={numberFieldProps} />
    </div>
  );
}
