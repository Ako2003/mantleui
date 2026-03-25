"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "8px" }}>
  <ToggleButton>Default</ToggleButton>
  <ToggleButton defaultPressed>Pressed</ToggleButton>
</div>`;

const variantsExample = `<div style={{ display: "flex", gap: "8px" }}>
  <ToggleButton variant="solid" defaultPressed>Solid</ToggleButton>
  <ToggleButton variant="outline" defaultPressed>Outline</ToggleButton>
  <ToggleButton variant="ghost" defaultPressed>Ghost</ToggleButton>
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <ToggleButton color="blue" defaultPressed>Blue</ToggleButton>
  <ToggleButton color="green" defaultPressed>Green</ToggleButton>
  <ToggleButton color="red" defaultPressed>Red</ToggleButton>
  <ToggleButton color="purple" defaultPressed>Purple</ToggleButton>
  <ToggleButton color="neutral" defaultPressed>Neutral</ToggleButton>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <ToggleButton size="sm" defaultPressed>Small</ToggleButton>
  <ToggleButton size="md" defaultPressed>Medium</ToggleButton>
  <ToggleButton size="lg" defaultPressed>Large</ToggleButton>
</div>`;

const controlledExample = `function Demo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div>
      <ToggleButton pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "On" : "Off"}
      </ToggleButton>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Pressed: {pressed ? "true" : "false"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const toggleButtonProps = [
  {
    name: "pressed",
    type: "boolean",
    description: "Whether the button is pressed (controlled).",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    description: "Whether the button is initially pressed (uncontrolled).",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"outline"',
    description: "Visual style variant.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color when pressed.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the toggle button.",
  },
];

export default function ToggleButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ToggleButton</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A button that toggles between pressed and unpressed states. Supports
        variants, colors, and sizes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={variantsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toggleButtonProps} />
    </div>
  );
}
