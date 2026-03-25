"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const verticalExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <DataField label="Name" value="John Doe" />
  <DataField label="Email" value="john@example.com" />
  <DataField label="Role" value="Administrator" />
</div>`;

const horizontalExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <DataField label="Status" value="Active" orientation="horizontal" />
  <DataField label="Created" value="March 15, 2025" orientation="horizontal" />
  <DataField label="Updated" value="March 20, 2025" orientation="horizontal" />
</div>`;

const dataFieldProps = [
  {
    name: "label",
    type: "string",
    description: "The field label text.",
  },
  {
    name: "value",
    type: "ReactNode",
    description: "The field value to display.",
  },
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Layout direction of the label and value.",
  },
];

export default function DataFieldPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">DataField</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A read-only field for displaying a label-value pair. Supports vertical
        and horizontal layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dataFieldProps} />
    </div>
  );
}
