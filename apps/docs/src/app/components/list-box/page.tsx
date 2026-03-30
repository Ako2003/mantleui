"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ListBox
  items={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
  ]}
  defaultValue="apple"
/>`;

const multipleExample = `<ListBox
  items={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]}
  multiple
  defaultValue={["react", "svelte"]}
/>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("banana");
  return (
    <div>
      <ListBox
        items={[
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "cherry", label: "Cherry" },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Selected: {value}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <ListBox
    color="blue"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
  <ListBox
    color="green"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
  <ListBox
    color="purple"
    items={[
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
    ]}
    defaultValue="a"
  />
</div>`;

const listBoxProps = [
  {
    name: "items",
    type: "{ value: string; label: string }[]",
    description: "Array of selectable items.",
  },
  {
    name: "value",
    type: "string | string[]",
    description: "The selected value(s) (controlled).",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "The initial selected value(s) (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Called when the selection changes.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Allows multiple items to be selected.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for selected items.",
  },
];

export default function ListBoxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ListBox</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A list selection component supporting single and multiple selection
        modes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Selection</h2>
      <div className="mt-4">
        <LivePlayground code={multipleExample} />
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
      <PropsTable props={listBoxProps} />
    </div>
  );
}
