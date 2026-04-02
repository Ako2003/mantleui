"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <Toggle onPressedChange={(p) => console.log("pressed:", p)}>
        Bold
      </Toggle>
      <Toggle defaultPressed>Italic</Toggle>
    </div>
  );
}

render(<Demo />);`;

const controlledExample = `function Demo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "ON" : "OFF"}
      </Toggle>
      <span style={{ fontSize: "14px", color: "#64748b" }}>
        State: {pressed ? "pressed" : "not pressed"}
      </span>
    </div>
  );
}

render(<Demo />);`;

const colorsExample = `function Demo() {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Toggle color="blue" defaultPressed>Blue</Toggle>
      <Toggle color="red" defaultPressed>Red</Toggle>
      <Toggle color="green" defaultPressed>Green</Toggle>
      <Toggle color="yellow" defaultPressed>Yellow</Toggle>
      <Toggle color="purple" defaultPressed>Purple</Toggle>
      <Toggle color="neutral" defaultPressed>Neutral</Toggle>
    </div>
  );
}

render(<Demo />);`;

const withIconsExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Toggle startIcon={<Bold size={16} />}>Bold</Toggle>
  <Toggle startIcon={<Italic size={16} />}>Italic</Toggle>
  <Toggle startIcon={<Underline size={16} />}>Underline</Toggle>
</div>`;

const toggleProps = [
  {
    name: "pressed",
    type: "boolean",
    description: "Whether the toggle is pressed (controlled).",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    description: "The initial pressed state (uncontrolled).",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the toggle.",
  },
  {
    name: "--mantle-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the hover background via style. Set to "none" to disable. e.g. style={{ "--mantle-hover": "none" }}',
  },
];

export default function TogglePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Toggle</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A two-state toggle button supporting both controlled and uncontrolled
        usage via the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useControllable
        </code>{" "}
        hook.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Uncontrolled</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toggleProps} />
    </div>
  );
}
