"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <SearchField placeholder="Search..." />
</div>`;

const controlledExample = `function Demo() {
  const [value, setValue] = React.useState("");
  return (
    <div style={{ maxWidth: "320px" }}>
      <SearchField
        value={value}
        onValueChange={setValue}
        onClear={() => setValue("")}
        placeholder="Type to search..."
      />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        {value ? \`Searching for: "\${value}"\` : "No search query"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <SearchField size="sm" placeholder="Small search..." />
  <SearchField size="md" placeholder="Medium search..." />
  <SearchField size="lg" placeholder="Large search..." />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <SearchField color="blue" placeholder="Blue focus ring" />
  <SearchField color="green" placeholder="Green focus ring" />
  <SearchField color="purple" placeholder="Purple focus ring" />
</div>`;

const withClearExample = `function Demo() {
  const [value, setValue] = React.useState("initial query");
  return (
    <div style={{ maxWidth: "320px" }}>
      <SearchField
        value={value}
        onValueChange={setValue}
        onClear={() => setValue("")}
        placeholder="Search..."
      />
    </div>
  );
}

render(<Demo />);`;

const searchFieldProps = [
  {
    name: "value",
    type: "string",
    description: "The current search value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initial search value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the search value changes.",
  },
  {
    name: "onClear",
    type: "() => void",
    description: "Called when the clear button is clicked.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when the input is empty.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for the focus ring.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
];

export default function SearchFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">SearchField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A search input with a built-in clear button, supporting controlled and
        uncontrolled modes with multiple sizes and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Clear Button</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A clear button appears when the field has a value. Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          onClear
        </code>{" "}
        callback to handle clearing.
      </p>
      <div className="mt-4">
        <LivePlayground code={withClearExample} />
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
      <PropsTable props={searchFieldProps} />
    </div>
  );
}
