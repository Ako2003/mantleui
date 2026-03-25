"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <TextField label="Email" placeholder="you@example.com" />
</div>`;

const withDescriptionExample = `<div style={{ maxWidth: "320px" }}>
  <TextField
    label="Username"
    placeholder="johndoe"
    description="Must be 3-20 characters long."
  />
</div>`;

const withErrorExample = `<div style={{ maxWidth: "320px" }}>
  <TextField
    label="Email"
    placeholder="you@example.com"
    error="Please enter a valid email address."
  />
</div>`;

const requiredExample = `<div style={{ maxWidth: "320px" }}>
  <TextField label="Full name" placeholder="John Doe" required />
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <TextField size="sm" label="Small" placeholder="Small input" />
  <TextField size="md" label="Medium" placeholder="Medium input" />
  <TextField size="lg" label="Large" placeholder="Large input" />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <TextField color="blue" label="Blue" placeholder="Blue focus ring" />
  <TextField color="green" label="Green" placeholder="Green focus ring" />
  <TextField color="purple" label="Purple" placeholder="Purple focus ring" />
</div>`;

const textFieldProps = [
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
    description:
      "Error message displayed below the input. Overrides description when set.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marks the field as required with a visual indicator.",
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
    description: "Size preset for the input.",
  },
];

export default function TextFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">TextField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A complete text input component with built-in label, description, error
        handling, and multiple sizes and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Error</h2>
      <div className="mt-4">
        <LivePlayground code={withErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Required</h2>
      <div className="mt-4">
        <LivePlayground code={requiredExample} />
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
      <PropsTable props={textFieldProps} />
    </div>
  );
}
