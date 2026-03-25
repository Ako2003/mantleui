"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <ComboBox
    label="Favorite Fruit"
    placeholder="Search fruits..."
    options={[
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "grape", label: "Grape" },
      { value: "mango", label: "Mango" },
      { value: "orange", label: "Orange" },
    ]}
  />
</div>`;

const comboBoxProps = [
  {
    name: "options",
    type: "{ value: string; label: string }[]",
    description: "Array of options to display in the dropdown.",
  },
  {
    name: "value",
    type: "string",
    description: "The currently selected value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initially selected value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the selected value changes.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when no value is entered.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the combo box input.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for focus ring.",
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
    name: "emptyMessage",
    type: "string",
    default: '"No results found"',
    description: "Message displayed when no options match the search query.",
  },
];

export default function ComboBoxPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ComboBox</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An alias for the Autocomplete component. A text input with a filterable
        dropdown list for selecting from a set of options.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={comboBoxProps} />
    </div>
  );
}
