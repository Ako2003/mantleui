"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Toolbar>
  <Button variant="outline" size="sm">Cut</Button>
  <Button variant="outline" size="sm">Copy</Button>
  <Button variant="outline" size="sm">Paste</Button>
  <Separator orientation="vertical" />
  <Button variant="outline" size="sm">Undo</Button>
  <Button variant="outline" size="sm">Redo</Button>
</Toolbar>`;

const verticalExample = `<Toolbar orientation="vertical">
  <Button variant="outline" size="sm">Top</Button>
  <Button variant="outline" size="sm">Middle</Button>
  <Button variant="outline" size="sm">Bottom</Button>
</Toolbar>`;

const toolbarProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the toolbar items.",
  },
];

export default function ToolbarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Toolbar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A container for grouping action buttons and controls in a horizontal or
        vertical bar.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toolbarProps} />
    </div>
  );
}
