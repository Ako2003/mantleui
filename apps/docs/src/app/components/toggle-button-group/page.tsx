"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<ToggleButtonGroup defaultValue="center">
  <ToggleButton value="left">Left</ToggleButton>
  <ToggleButton value="center">Center</ToggleButton>
  <ToggleButton value="right">Right</ToggleButton>
</ToggleButtonGroup>`;

const multipleExample = `<ToggleButtonGroup multiple defaultValue={["bold", "italic"]}>
  <ToggleButton value="bold">Bold</ToggleButton>
  <ToggleButton value="italic">Italic</ToggleButton>
  <ToggleButton value="underline">Underline</ToggleButton>
</ToggleButtonGroup>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <ToggleButtonGroup color="blue" defaultValue="a">
    <ToggleButton value="a">A</ToggleButton>
    <ToggleButton value="b">B</ToggleButton>
    <ToggleButton value="c">C</ToggleButton>
  </ToggleButtonGroup>
  <ToggleButtonGroup color="green" defaultValue="a">
    <ToggleButton value="a">A</ToggleButton>
    <ToggleButton value="b">B</ToggleButton>
    <ToggleButton value="c">C</ToggleButton>
  </ToggleButtonGroup>
  <ToggleButtonGroup color="purple" defaultValue="a">
    <ToggleButton value="a">A</ToggleButton>
    <ToggleButton value="b">B</ToggleButton>
    <ToggleButton value="c">C</ToggleButton>
  </ToggleButtonGroup>
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
  <ToggleButtonGroup size="sm" defaultValue="a">
    <ToggleButton value="a">Small</ToggleButton>
    <ToggleButton value="b">Buttons</ToggleButton>
  </ToggleButtonGroup>
  <ToggleButtonGroup size="md" defaultValue="a">
    <ToggleButton value="a">Medium</ToggleButton>
    <ToggleButton value="b">Buttons</ToggleButton>
  </ToggleButtonGroup>
  <ToggleButtonGroup size="lg" defaultValue="a">
    <ToggleButton value="a">Large</ToggleButton>
    <ToggleButton value="b">Buttons</ToggleButton>
  </ToggleButtonGroup>
</div>`;

const verticalExample = `<ToggleButtonGroup orientation="vertical" defaultValue="top">
  <ToggleButton value="top">Top</ToggleButton>
  <ToggleButton value="middle">Middle</ToggleButton>
  <ToggleButton value="bottom">Bottom</ToggleButton>
</ToggleButtonGroup>`;

const toggleButtonGroupProps = [
  {
    name: "value",
    type: "string | string[]",
    description: "The selected value(s) (controlled).",
  },
  {
    name: "defaultValue",
    type: "string | string[]",
    description: "The initial selected value(s) (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string | string[]) => void",
    description: "Called when the selection changes.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Allows multiple buttons to be selected simultaneously.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the button group.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for selected buttons.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset for all buttons in the group.",
  },
];

export default function ToggleButtonGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ToggleButtonGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A group of toggle buttons that supports single and multiple selection
        modes with horizontal or vertical orientation.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Single Selection</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Selection</h2>
      <div className="mt-4">
        <LivePlayground code={multipleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toggleButtonGroupProps} />
    </div>
  );
}
