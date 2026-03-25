"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <Button variant="solid">Solid</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`;

const loadingExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Button loading>Saving...</Button>
  <Button variant="outline" loading>Loading</Button>
</div>`;

const polymorphicExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Button as="a" href="#" variant="solid">As Link</Button>
  <Button as="span" variant="outline">As Span</Button>
</div>`;

const buttonProps = [
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"solid"',
    description: "Visual style variant.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner and disables interaction.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button.",
  },
  {
    name: "as",
    type: "ElementType",
    default: '"button"',
    description: "The element type to render as.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    description: "Element placed before the label.",
  },
  {
    name: "endIcon",
    type: "ReactNode",
    description: "Element placed after the label.",
  },
];

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Button</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A polymorphic button component that can render as any element type via
        the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          as
        </code>{" "}
        prop.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Loading State</h2>
      <div className="mt-4">
        <LivePlayground code={loadingExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Polymorphic</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          as
        </code>{" "}
        prop to render as a different element while keeping all Button styles
        and behavior.
      </p>
      <div className="mt-4">
        <LivePlayground code={polymorphicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={buttonProps} />
    </div>
  );
}
