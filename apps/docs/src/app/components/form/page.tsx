"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
        <TextField label="Name" placeholder="Enter your name" />
        <TextField label="Email" placeholder="Enter your email" />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

render(<Demo />);`;

const formProps = [
  {
    name: "onSubmit",
    type: "(event: FormEvent) => void",
    description: "Called when the form is submitted.",
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

export default function FormPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Form</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A form wrapper component that handles submit events. Use it to group
        form fields and manage submission logic.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={formProps} />
    </div>
  );
}
