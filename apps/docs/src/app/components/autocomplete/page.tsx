"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <Autocomplete
    placeholder="Search fruits..."
    options={[
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "grape", label: "Grape" },
      { value: "mango", label: "Mango" },
      { value: "orange", label: "Orange" },
      { value: "strawberry", label: "Strawberry" },
    ]}
  />
</div>`;

const withLabelExample = `<div style={{ maxWidth: "320px" }}>
  <Autocomplete
    label="Favorite Fruit"
    placeholder="Type to search..."
    options={[
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "grape", label: "Grape" },
      { value: "mango", label: "Mango" },
      { value: "orange", label: "Orange" },
      { value: "strawberry", label: "Strawberry" },
    ]}
  />
</div>`;

const withDescriptionExample = `<div style={{ maxWidth: "320px" }}>
  <Autocomplete
    label="Programming Language"
    description="Choose the language you use most often."
    placeholder="Search languages..."
    options={[
      { value: "typescript", label: "TypeScript" },
      { value: "javascript", label: "JavaScript" },
      { value: "python", label: "Python" },
      { value: "rust", label: "Rust" },
      { value: "go", label: "Go" },
    ]}
  />
</div>`;

const roundedExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Autocomplete
    placeholder="Default radius"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
  <Autocomplete
    placeholder="Fully rounded (pill)"
    style={{ "--mantle-radius-md": "9999px" }}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
  <Autocomplete
    placeholder="No rounding"
    style={{ "--mantle-radius-md": "0" }}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
    ]}
  />
</div>`;

const customHoverExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Autocomplete
    placeholder="Default gradient"
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
    ]}
  />
  <Autocomplete
    placeholder="Solid blue hover"
    style={{ "--mantle-option-hover": "rgba(59, 130, 246, 0.15)" }}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
    ]}
  />
  <Autocomplete
    placeholder="Purple gradient"
    color="purple"
    style={{ "--mantle-option-hover": "linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent)" }}
    options={[
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "svelte", label: "Svelte" },
      { value: "angular", label: "Angular" },
    ]}
  />
</div>`;

const autocompleteProps = [
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
    description: "Disables the autocomplete input.",
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
    description: "Helper text displayed below the label.",
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
  {
    name: "--mantle-option-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the option hover background via style. e.g. style={{ "--mantle-option-hover": "#3b82f6" }}',
  },
];

export default function AutocompletePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Autocomplete</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A text input with a filterable dropdown list for selecting from a set of
        options. Supports labels, error states, and custom empty messages.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add helper text below the label with the{" "}
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
        via style to change the input border-radius.
      </p>
      <div className="mt-4">
        <LivePlayground code={roundedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Hover Style</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Override the option hover background with the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-option-hover
        </code>{" "}
        CSS variable. Works with solid colors, gradients, or any CSS background
        value.
      </p>
      <div className="mt-4">
        <LivePlayground code={customHoverExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={autocompleteProps} />
    </div>
  );
}
