"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Input placeholder="Enter your email" />`;

const withLabelExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Input label="Email" placeholder="you@example.com" />
  <Input label="Password" placeholder="Enter password" type="password" />
</div>`;

const withErrorExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Input label="Email" placeholder="you@example.com" error="Please enter a valid email address." />
</div>`;

const withHelperTextExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <Input label="Username" placeholder="johndoe" helperText="Must be 3-20 characters long." />
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <Input size="sm" placeholder="Small" />
  <Input size="md" placeholder="Medium" />
  <Input size="lg" placeholder="Large" />
</div>`;

const disabledExample = `<Input placeholder="Disabled input" disabled />`;

const inputProps = [
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset for the input.",
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
    name: "helperText",
    type: "string",
    description: "Helper text displayed below the input.",
  },
  {
    name: "error",
    type: "string",
    description:
      "Error message displayed below the input. Overrides helperText.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    description: "Element placed at the start of the input.",
  },
  {
    name: "endIcon",
    type: "ReactNode",
    description: "Element placed at the end of the input.",
  },
  {
    name: "placeholder",
    type: "string",
    description: "Placeholder text shown when the input is empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the input.",
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

export default function InputPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Input</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A text input component with support for labels, helper text, error
        states, icons, and multiple sizes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Error</h2>
      <div className="mt-4">
        <LivePlayground code={withErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Helper Text</h2>
      <div className="mt-4">
        <LivePlayground code={withHelperTextExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={inputProps} />
    </div>
  );
}
