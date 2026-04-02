"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "320px" }}>
  <TextArea label="Bio" placeholder="Tell us about yourself..." />
</div>`;

const withDescriptionExample = `<div style={{ maxWidth: "320px" }}>
  <TextArea
    label="Comments"
    placeholder="Leave a comment..."
    description="Markdown is supported."
  />
</div>`;

const withErrorExample = `<div style={{ maxWidth: "320px" }}>
  <TextArea
    label="Feedback"
    placeholder="Your feedback..."
    error="Feedback must be at least 10 characters."
  />
</div>`;

const requiredExample = `<div style={{ maxWidth: "320px" }}>
  <TextArea label="Message" placeholder="Write your message..." required />
</div>`;

const resizeExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
  <TextArea label="Vertical (default)" placeholder="Can resize vertically..." resize="vertical" />
  <TextArea label="Horizontal" placeholder="Can resize horizontally..." resize="horizontal" />
  <TextArea label="Both" placeholder="Can resize both directions..." resize="both" />
  <TextArea label="None" placeholder="Cannot be resized..." resize="none" />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <TextArea color="blue" label="Blue" placeholder="Blue focus ring" />
  <TextArea color="green" label="Green" placeholder="Green focus ring" />
  <TextArea color="purple" label="Purple" placeholder="Purple focus ring" />
</div>`;

const textAreaProps = [
  {
    name: "label",
    type: "string",
    description: "Label text displayed above the textarea.",
  },
  {
    name: "description",
    type: "string",
    description: "Helper text displayed below the textarea.",
  },
  {
    name: "error",
    type: "string",
    description:
      "Error message displayed below the textarea. Overrides description when set.",
  },
  {
    name: "required",
    type: "boolean",
    default: "false",
    description: "Marks the field as required with a visual indicator.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the focus ring.",
  },
  {
    name: "resize",
    type: '"vertical" | "horizontal" | "both" | "none"',
    default: '"vertical"',
    description: "Controls the resize behavior of the textarea.",
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

export default function TextAreaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">TextArea</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A multiline text input with built-in label, description, error handling,
        and configurable resize behavior.
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

      <h2 className="mt-10 text-xl font-semibold">Resize Modes</h2>
      <div className="mt-4">
        <LivePlayground code={resizeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={textAreaProps} />
    </div>
  );
}
