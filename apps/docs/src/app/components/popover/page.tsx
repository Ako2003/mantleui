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

const placementExample = `function Demo() {
  const [placement, setPlacement] = React.useState("bottom");
  const placements = [
    "top-start", "top", "top-end",
    "left-start", null, "right-start",
    "left", null, "right",
    "left-end", null, "right-end",
    "bottom-start", "bottom", "bottom-end",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "6px",
        width: "320px",
      }}>
        {placements.map((p, i) =>
          p ? (
            <button
              key={p}
              onClick={() => setPlacement(p)}
              style={{
                padding: "6px 4px",
                fontSize: "11px",
                borderRadius: "6px",
                border: placement === p ? "1px solid var(--mantle-accent)" : "1px solid var(--mantle-color-border)",
                background: placement === p ? "var(--mantle-accent-subtle)" : "transparent",
                color: placement === p ? "var(--mantle-accent)" : "var(--mantle-color-text-muted)",
                cursor: "pointer",
                fontFamily: "var(--mantle-font-mono)",
              }}
            >
              {p}
            </button>
          ) : (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "var(--mantle-color-text-muted)",
              border: "1px dashed var(--mantle-color-border)",
              borderRadius: "6px",
            }}>
              trigger
            </div>
          )
        )}
      </div>
      <Popover placement={placement}>
        <Popover.Trigger>Click me ({placement})</Popover.Trigger>
        <Popover.Content>
          <div style={{ padding: "4px" }}>
            <strong>Placement: {placement}</strong>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}

render(<Demo />);`;

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
