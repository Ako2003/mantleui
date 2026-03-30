"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Checkbox label="Accept terms and conditions" />`;

const withLabelExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Checkbox label="Email notifications" defaultChecked />
  <Checkbox label="SMS notifications" />
  <Checkbox label="Push notifications" disabled />
</div>`;

const controlledExample = `function Demo() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
        label="Controlled checkbox"
      />
      <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
        State: {checked ? "checked" : "unchecked"}
      </span>
    </div>
  );
}

render(<Demo />);`;

const indeterminateExample = `function Demo() {
  const [items, setItems] = React.useState([true, false, true]);
  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Checkbox
        checked={allChecked}
        indeterminate={someChecked}
        onCheckedChange={(checked) => setItems([checked, checked, checked])}
        label="Select all"
      />
      <div style={{ marginLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox
          checked={items[0]}
          onCheckedChange={(c) => setItems([c, items[1], items[2]])}
          label="Item 1"
        />
        <Checkbox
          checked={items[1]}
          onCheckedChange={(c) => setItems([items[0], c, items[2]])}
          label="Item 2"
        />
        <Checkbox
          checked={items[2]}
          onCheckedChange={(c) => setItems([items[0], items[1], c])}
          label="Item 3"
        />
      </div>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <Checkbox color="blue" defaultChecked label="Blue" />
  <Checkbox color="red" defaultChecked label="Red" />
  <Checkbox color="green" defaultChecked label="Green" />
  <Checkbox color="yellow" defaultChecked label="Yellow" />
  <Checkbox color="purple" defaultChecked label="Purple" />
  <Checkbox color="neutral" defaultChecked label="Neutral" />
</div>`;

const checkboxProps = [
  {
    name: "checked",
    type: "boolean",
    description: "Whether the checkbox is checked (controlled).",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "The initial checked state (uncontrolled).",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called when the checked state changes.",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
    description: "Shows an indeterminate (mixed) state.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed next to the checkbox.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the checkbox.",
  },
];

export default function CheckboxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Checkbox</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A checkbox component supporting controlled and uncontrolled usage, with
        indeterminate state for &quot;select all&quot; patterns.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Labels</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Indeterminate</h2>
      <div className="mt-4">
        <LivePlayground code={indeterminateExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={checkboxProps} />
    </div>
  );
}
