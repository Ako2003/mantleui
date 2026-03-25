"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "var(--mantle-color-text)" }}>
            Drawer Title
          </h2>
          <p style={{ flex: 1, fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
            This is the drawer body content. You can place any content here — forms, navigation, details panels, etc.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

render(<Demo />);`;

const sidesExample = `function Demo() {
  const [side, setSide] = React.useState("right");
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["left", "right", "bottom"].map((s) => (
          <Button
            key={s}
            variant="outline"
            onClick={() => { setSide(s); setOpen(true); }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
      </div>
      <Drawer open={open} onOpenChange={setOpen} side={side}>
        <div style={{ padding: "24px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "var(--mantle-color-text)" }}>
            Drawer from {side}
          </h2>
          <p style={{ marginTop: "12px", fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
            This drawer slides in from the {side}.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

render(<Demo />);`;

const drawerProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the drawer is open.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    name: "side",
    type: '"left" | "right" | "bottom"',
    default: '"right"',
    description: "The side of the screen the drawer slides in from.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Content rendered inside the drawer panel.",
  },
];

export default function DrawerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Drawer</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A panel that slides in from the edge of the screen. Useful for
        navigation, forms, or supplementary content without leaving the current
        page. Closes on Escape or overlay click.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button to open a drawer from the right.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sides</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        The drawer can slide in from the left, right, or bottom.
      </p>
      <div className="mt-4">
        <LivePlayground code={sidesExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={drawerProps} />
    </div>
  );
}
