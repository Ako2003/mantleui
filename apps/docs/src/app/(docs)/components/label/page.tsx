"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Label htmlFor="email-input">Email address</Label>`;

const requiredExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Label htmlFor="name-input" required>Full name</Label>
  <Label htmlFor="bio-input">Bio (optional)</Label>
</div>`;

const disabledExample = `<Label htmlFor="disabled-input" disabled>Disabled label</Label>`;

const withInputExample = `<div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "320px" }}>
  <Label htmlFor="username" required>Username</Label>
  <Input id="username" placeholder="Enter your username" />
</div>`;

const labelProps = [
  {
    name: "htmlFor",
    type: "string",
    description: "The ID of the form element this label is associated with.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Displays a required asterisk (*) after the label text.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Applies disabled styling to the label.",
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

export default function LabelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Label</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A form label component that associates with inputs via{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          htmlFor
        </code>
        , with support for required indicators and disabled styling.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Required Asterisk</h2>
      <div className="mt-4">
        <LivePlayground code={requiredExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Input</h2>
      <div className="mt-4">
        <LivePlayground code={withInputExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={labelProps} />
    </div>
  );
}
