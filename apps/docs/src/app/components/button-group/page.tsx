"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const horizontalExample = `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`;

const verticalExample = `<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <ButtonGroup color="blue">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
  <ButtonGroup color="red">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
  <ButtonGroup color="green">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
</div>`;

const buttonGroupProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the button group.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size applied to all buttons in the group.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    description: "Variant applied to all buttons in the group.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color applied to all buttons in the group.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
];

export default function ButtonGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ButtonGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Groups multiple buttons together with shared styling and connected
        borders. Supports horizontal and vertical orientations.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={buttonGroupProps} />
    </div>
  );
}
