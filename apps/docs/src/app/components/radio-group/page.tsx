"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<RadioGroup label="Favorite fruit" defaultValue="apple">
  <RadioGroup.Item value="apple" label="Apple" />
  <RadioGroup.Item value="banana" label="Banana" />
  <RadioGroup.Item value="cherry" label="Cherry" />
</RadioGroup>`;

const horizontalExample = `<RadioGroup label="Size" defaultValue="md" orientation="horizontal">
  <RadioGroup.Item value="sm" label="Small" />
  <RadioGroup.Item value="md" label="Medium" />
  <RadioGroup.Item value="lg" label="Large" />
</RadioGroup>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
  <RadioGroup label="Blue (default)" color="blue" defaultValue="a">
    <RadioGroup.Item value="a" label="Option A" />
    <RadioGroup.Item value="b" label="Option B" />
  </RadioGroup>
  <RadioGroup label="Green" color="green" defaultValue="a">
    <RadioGroup.Item value="a" label="Option A" />
    <RadioGroup.Item value="b" label="Option B" />
  </RadioGroup>
  <RadioGroup label="Purple" color="purple" defaultValue="a">
    <RadioGroup.Item value="a" label="Option A" />
    <RadioGroup.Item value="b" label="Option B" />
  </RadioGroup>
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("email");
  return (
    <div>
      <RadioGroup label="Contact method" value={value} onValueChange={setValue}>
        <RadioGroup.Item value="email" label="Email" />
        <RadioGroup.Item value="phone" label="Phone" />
        <RadioGroup.Item value="mail" label="Mail" />
      </RadioGroup>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const disabledExample = `<RadioGroup label="Options" defaultValue="a" disabled>
  <RadioGroup.Item value="a" label="Option A" />
  <RadioGroup.Item value="b" label="Option B" />
  <RadioGroup.Item value="c" label="Option C" />
</RadioGroup>`;

const radioGroupProps = [
  {
    name: "value",
    type: "string",
    description: "The selected value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial selected value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected value changes.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed above the group.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Layout direction of the radio items.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for the radio indicators.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables all radio items in the group.",
  },
];

const radioGroupItemProps = [
  {
    name: "value",
    type: "string",
    description: "The value of this radio item.",
  },
  {
    name: "label",
    type: "string",
    description: "Label displayed next to the radio indicator.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables this individual radio item.",
  },
];

export default function RadioGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">RadioGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A group of radio buttons for selecting a single value from a list of
        options. Supports vertical and horizontal layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">RadioGroup Props</h2>
      <PropsTable props={radioGroupProps} />

      <h2 className="mt-10 text-xl font-semibold">RadioGroup.Item Props</h2>
      <PropsTable props={radioGroupItemProps} />
    </div>
  );
}
