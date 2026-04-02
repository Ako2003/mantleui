"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<FieldError error="This field is required." />`;

const conditionalExample = `function Demo() {
  const [error, setError] = React.useState("");
  const [value, setValue] = React.useState("");

  const validate = (val) => {
    setValue(val);
    if (val.length > 0 && val.length < 3) {
      setError("Must be at least 3 characters.");
    } else {
      setError("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxWidth: "320px" }}>
      <Label htmlFor="name" required>Name</Label>
      <Input
        id="name"
        value={value}
        onChange={(e) => validate(e.target.value)}
        placeholder="Enter your name"
      />
      <FieldError error={error} />
    </div>
  );
}

render(<Demo />);`;

const noErrorExample = `<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
  <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
    When error is empty, nothing is rendered:
  </span>
  <FieldError error="" />
  <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
    (nothing above this line)
  </span>
</div>`;

const fieldErrorProps = [
  {
    name: "error",
    type: "string",
    description:
      "The error message to display. When empty or undefined, nothing is rendered.",
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

export default function FieldErrorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">FieldError</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A conditional error display component that only renders when an error
        string is provided.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Conditional Rendering</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        The error message only appears when the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          error
        </code>{" "}
        prop is a non-empty string.
      </p>
      <div className="mt-4">
        <LivePlayground code={conditionalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">No Error</h2>
      <div className="mt-4">
        <LivePlayground code={noErrorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={fieldErrorProps} />
    </div>
  );
}
