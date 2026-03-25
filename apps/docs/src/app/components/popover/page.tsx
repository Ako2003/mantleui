"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const compoundExample = `<Popover>
  <Popover.Trigger>Click me</Popover.Trigger>
  <Popover.Content>
    <div style={{ padding: "4px" }}>
      <strong>Popover Content</strong>
      <p style={{ marginTop: "4px", fontSize: "14px", color: "#64748b" }}>
        This is a popover with click-outside and Escape to close.
      </p>
    </div>
  </Popover.Content>
</Popover>`;

const headlessExample = `function Demo() {
  const { isOpen, triggerProps, contentProps } = usePopover();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        {...triggerProps}
        style={{
          padding: "8px 16px",
          border: "1px solid var(--mantle-color-border)",
          borderRadius: "6px",
          cursor: "pointer",
          background: "transparent",
          color: "var(--mantle-color-text)",
        }}
      >
        Headless Trigger
      </button>
      {isOpen && (
        <div
          {...contentProps}
          style={{
            ...contentProps.style,
            padding: "12px",
            border: "1px solid var(--mantle-color-border)",
            borderRadius: "8px",
            background: "var(--mantle-color-bg-subtle)",
            boxShadow: "var(--mantle-shadow-md)",
            color: "var(--mantle-color-text)",
            marginTop: "4px",
            minWidth: "200px",
          }}
        >
          Full rendering control with the headless hook!
        </div>
      )}
    </div>
  );
}

render(<Demo />);`;

const placementExample = `<div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", padding: "80px 40px" }}>
  <Popover placement="top">
    <Popover.Trigger>Top</Popover.Trigger>
    <Popover.Content>Placement: top</Popover.Content>
  </Popover>
  <Popover placement="top-start">
    <Popover.Trigger>Top Start</Popover.Trigger>
    <Popover.Content>Placement: top-start</Popover.Content>
  </Popover>
  <Popover placement="top-end">
    <Popover.Trigger>Top End</Popover.Trigger>
    <Popover.Content>Placement: top-end</Popover.Content>
  </Popover>
  <Popover placement="bottom">
    <Popover.Trigger>Bottom</Popover.Trigger>
    <Popover.Content>Placement: bottom</Popover.Content>
  </Popover>
  <Popover placement="bottom-start">
    <Popover.Trigger>Bottom Start</Popover.Trigger>
    <Popover.Content>Placement: bottom-start</Popover.Content>
  </Popover>
  <Popover placement="bottom-end">
    <Popover.Trigger>Bottom End</Popover.Trigger>
    <Popover.Content>Placement: bottom-end</Popover.Content>
  </Popover>
  <Popover placement="left">
    <Popover.Trigger>Left</Popover.Trigger>
    <Popover.Content>Placement: left</Popover.Content>
  </Popover>
  <Popover placement="right">
    <Popover.Trigger>Right</Popover.Trigger>
    <Popover.Content>Placement: right</Popover.Content>
  </Popover>
</div>`;

const popoverProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the popover is open (controlled).",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "The initial open state (uncontrolled).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    name: "placement",
    type: '"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end"',
    default: '"bottom"',
    description: "Placement of the popover relative to the trigger.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for focus rings.",
  },
];

export default function PopoverPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Popover</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A popover with two consumption modes: a styled compound component for
        convenience, or a headless{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          usePopover()
        </code>{" "}
        hook for full rendering control.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Compound Component</h2>
      <div className="mt-4">
        <LivePlayground code={compoundExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Headless Hook</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          usePopover()
        </code>{" "}
        when you need complete control over the markup and styling.
      </p>
      <div className="mt-4">
        <LivePlayground code={headlessExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Placement</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          placement
        </code>{" "}
        prop to control where the popover appears relative to the trigger.
      </p>
      <div className="mt-4">
        <LivePlayground code={placementExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={popoverProps} />
    </div>
  );
}
