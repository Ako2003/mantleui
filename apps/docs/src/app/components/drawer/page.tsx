"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <Drawer.Content>
          <Drawer.Header>Drawer Title</Drawer.Header>
          <Drawer.Body>
            <p>This is the drawer body content. Place any content here.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </Drawer.Footer>
        </Drawer.Content>
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
        {["left", "right", "top", "bottom"].map((s) => (
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
        <Drawer.Content>
          <Drawer.Header>Drawer from {side}</Drawer.Header>
          <Drawer.Body>
            <p>This drawer slides in from the {side}.</p>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </div>
  );
}

render(<Demo />);`;

const drawerProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the drawer is open (controlled).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    name: "side",
    type: '"left" | "right" | "top" | "bottom"',
    default: '"right"',
    description: "The side of the screen the drawer slides in from.",
  },
];

const contentProps = [
  {
    name: "children",
    type: "ReactNode",
    description:
      "Drawer content, typically Drawer.Header, Drawer.Body, and Drawer.Footer.",
  },
];

const headerProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The header title content.",
  },
];

const bodyProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The main body content of the drawer.",
  },
];

const footerProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The footer content, typically action buttons.",
  },
];

export default function DrawerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Drawer</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A panel that slides in from the edge of the screen. Useful for
        navigation, forms, or supplementary content without leaving the current
        page.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button below to open a drawer from the right.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sides</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        The drawer can slide in from any edge of the screen.
      </p>
      <div className="mt-4">
        <LivePlayground code={sidesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Drawer Props</h2>
      <PropsTable props={drawerProps} />

      <h2 className="mt-10 text-xl font-semibold">Drawer.Content Props</h2>
      <PropsTable props={contentProps} />

      <h2 className="mt-10 text-xl font-semibold">Drawer.Header Props</h2>
      <PropsTable props={headerProps} />

      <h2 className="mt-10 text-xl font-semibold">Drawer.Body Props</h2>
      <PropsTable props={bodyProps} />

      <h2 className="mt-10 text-xl font-semibold">Drawer.Footer Props</h2>
      <PropsTable props={footerProps} />
    </div>
  );
}
