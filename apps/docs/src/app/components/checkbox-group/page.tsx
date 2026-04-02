"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<CheckboxGroup label="Notifications">
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="push" label="Push" />
</CheckboxGroup>`;

const horizontalExample = `<CheckboxGroup label="Favorite fruits" orientation="horizontal">
  <Checkbox value="apple" label="Apple" />
  <Checkbox value="banana" label="Banana" />
  <Checkbox value="cherry" label="Cherry" />
</CheckboxGroup>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
  <CheckboxGroup label="Blue (default)" color="blue" defaultValue={["a"]}>
    <Checkbox value="a" label="Option A" />
    <Checkbox value="b" label="Option B" />
  </CheckboxGroup>
  <CheckboxGroup label="Green" color="green" defaultValue={["a"]}>
    <Checkbox value="a" label="Option A" />
    <Checkbox value="b" label="Option B" />
  </CheckboxGroup>
  <CheckboxGroup label="Purple" color="purple" defaultValue={["a"]}>
    <Checkbox value="a" label="Option A" />
    <Checkbox value="b" label="Option B" />
  </CheckboxGroup>
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState(["email"]);
  return (
    <div>
      <CheckboxGroup label="Contact preferences" value={value} onValueChange={setValue}>
        <Checkbox value="email" label="Email" />
        <Checkbox value="phone" label="Phone" />
        <Checkbox value="mail" label="Mail" />
      </CheckboxGroup>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value.join(", ") || "none"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const checkboxGroupProps = [
  {
    name: "label",
    type: "string",
    description: "Label displayed above the group.",
  },
  {
    name: "value",
    type: "string[]",
    description: "The selected values (controlled).",
  },
  {
    name: "defaultValue",
    type: "string[]",
    description: "The initial selected values (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when the selected values change.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Layout direction of the checkboxes.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color applied to all checkboxes in the group.",
  },
  {
    name: "--mantle-bg",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the background color via style. e.g. style={{ "--mantle-bg": "#1a1a2e" }}',
  },
  {
    name: "--mantle-border",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the border color via style. Set to "transparent" to remove. e.g. style={{ "--mantle-border": "#e94560" }}',
  },
  {
    name: "--mantle-text",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the text color via style. e.g. style={{ "--mantle-text": "#ffffff" }}',
  },
  {
    name: "--mantle-ring",
    type: "CSS variable",
    default: "accent",
    description:
      'Override the focus ring color via style. e.g. style={{ "--mantle-ring": "#e94560" }}',
  },
];

export default function CheckboxGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">CheckboxGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A group of checkboxes with a shared label, supporting vertical and
        horizontal layouts and controlled selection.
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

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={checkboxGroupProps} />
    </div>
  );
}
