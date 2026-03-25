"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Surface elevation={1} rounded bordered>
  <div style={{ padding: "24px" }}>
    <p>This is a surface with elevation, rounded corners, and a border.</p>
  </div>
</Surface>`;

const elevationsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <Surface elevation={0} rounded bordered>
    <div style={{ padding: "16px", minWidth: "120px", textAlign: "center" }}>
      Elevation 0
    </div>
  </Surface>
  <Surface elevation={1} rounded>
    <div style={{ padding: "16px", minWidth: "120px", textAlign: "center" }}>
      Elevation 1
    </div>
  </Surface>
  <Surface elevation={2} rounded>
    <div style={{ padding: "16px", minWidth: "120px", textAlign: "center" }}>
      Elevation 2
    </div>
  </Surface>
  <Surface elevation={3} rounded>
    <div style={{ padding: "16px", minWidth: "120px", textAlign: "center" }}>
      Elevation 3
    </div>
  </Surface>
</div>`;

const borderedExample = `<div style={{ display: "flex", gap: "16px" }}>
  <Surface rounded bordered>
    <div style={{ padding: "16px" }}>Bordered</div>
  </Surface>
  <Surface rounded>
    <div style={{ padding: "16px" }}>No border</div>
  </Surface>
</div>`;

const surfaceProps = [
  {
    name: "elevation",
    type: "0 | 1 | 2 | 3",
    default: "0",
    description: "Shadow depth level.",
  },
  {
    name: "rounded",
    type: "boolean",
    default: "false",
    description: "Applies rounded corners.",
  },
  {
    name: "bordered",
    type: "boolean",
    default: "false",
    description: "Adds a visible border.",
  },
];

export default function SurfacePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Surface</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A container component with configurable elevation, border, and rounding
        for building layered interfaces.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Elevations</h2>
      <div className="mt-4">
        <LivePlayground code={elevationsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Bordered</h2>
      <div className="mt-4">
        <LivePlayground code={borderedExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={surfaceProps} />
    </div>
  );
}
