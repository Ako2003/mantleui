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

const withDescriptionExample = `<div style={{ maxWidth: "320px" }}>
  <ComboBox
    label="Country"
    description="Start typing to filter the list."
    placeholder="Search countries..."
    options={[
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "ca", label: "Canada" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "au", label: "Australia" },
    ]}
  />
</div>`;

const roundedExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <ComboBox
    placeholder="Default radius"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
  <ComboBox
    placeholder="Pill shape"
    style={{ "--mantle-radius-md": "9999px" }}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
</div>`;

const customHoverExample = `<div style={{ maxWidth: "320px" }}>
  <ComboBox
    label="Framework"
    placeholder="Pick a framework..."
    color="purple"
    style={{ "--mantle-option-hover": "rgba(139, 92, 246, 0.15)" }}
    options={[
      { value: "next", label: "Next.js" },
      { value: "remix", label: "Remix" },
      { value: "astro", label: "Astro" },
      { value: "nuxt", label: "Nuxt" },
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
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for focus ring.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed above the input.",
  },
  {
    name: "description",
    type: "string",
    description: "Helper text displayed below the input.",
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
  {
    name: "--mantle-option-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the option hover background via style. e.g. style={{ "--mantle-option-hover": "#3b82f6" }}',
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

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Helper text below the input with the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          description
        </code>{" "}
        prop.
      </p>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Roundness</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Override{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-radius-md
        </code>{" "}
        to change the input border-radius.
      </p>
      <div className="mt-4">
        <LivePlayground code={roundedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Hover</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Override the dropdown hover effect with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-option-hover
        </code>
        .
      </p>
      <div className="mt-4">
        <LivePlayground code={customHoverExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={comboBoxProps} />
    </div>
  );
}
