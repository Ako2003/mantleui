"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const variantsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Chip variant="solid">Solid</Chip>
  <Chip variant="outline">Outline</Chip>
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Chip color="blue">Blue</Chip>
  <Chip color="red">Red</Chip>
  <Chip color="green">Green</Chip>
  <Chip color="yellow">Yellow</Chip>
  <Chip color="purple">Purple</Chip>
  <Chip color="neutral">Neutral</Chip>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <Chip size="sm">Small</Chip>
  <Chip size="md">Medium</Chip>
  <Chip size="lg">Large</Chip>
</div>`;

const dismissibleExample = `function Demo() {
  const [visible, setVisible] = React.useState(true);
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {visible ? (
        <Chip onDismiss={() => setVisible(false)}>Dismissible</Chip>
      ) : (
        <Button size="sm" onClick={() => setVisible(true)}>Reset</Button>
      )}
    </div>
  );
}

render(<Demo />);`;

const selectableExample = `function Demo() {
  const [selected, setSelected] = React.useState(false);
  return (
    <Chip selected={selected} onSelectedChange={setSelected}>
      {selected ? "Selected" : "Click me"}
    </Chip>
  );
}

render(<Demo />);`;

const disabledExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <Chip disabled>Disabled</Chip>
  <Chip disabled variant="outline">Disabled Outline</Chip>
</div>`;

const withIconsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
  <Chip startIcon={<Check size={14} />} color="green">Verified</Chip>
  <Chip startIcon={<Star size={14} />} color="yellow">Featured</Chip>
  <Chip startIcon={<AlertCircle size={14} />} color="red" variant="outline">Critical</Chip>
  <Chip startIcon={<Info size={14} />}>Info</Chip>
</div>`;

const chipProps = [
  {
    name: "variant",
    type: '"solid" | "outline"',
    default: '"solid"',
    description: "Visual style variant.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "onDismiss",
    type: "() => void",
    description:
      "Called when the dismiss button is clicked. Shows a dismiss icon when provided.",
  },
  {
    name: "selected",
    type: "boolean",
    default: "false",
    description: "Whether the chip is selected (controlled).",
  },
  {
    name: "onSelectedChange",
    type: "(selected: boolean) => void",
    description: "Called when the selected state changes.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the chip.",
  },
];

export default function ChipPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Chip</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compact element for displaying tags, filters, or selections. Supports
        dismissible and selectable behaviors.
      </p>

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

      <h2 className="mt-10 text-xl font-semibold">Dismissible</h2>
      <div className="mt-4">
        <LivePlayground code={dismissibleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Selectable</h2>
      <div className="mt-4">
        <LivePlayground code={selectableExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled</h2>
      <div className="mt-4">
        <LivePlayground code={disabledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={chipProps} />
    </div>
  );
}
