"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const horizontalExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <p style={{ margin: 0, color: "var(--mantle-color-text)" }}>Content above</p>
  <Separator />
  <p style={{ margin: 0, color: "var(--mantle-color-text)" }}>Content below</p>
</div>`;

const verticalExample = `<div style={{ display: "flex", alignItems: "center", gap: "12px", height: "24px" }}>
  <span style={{ color: "var(--mantle-color-text)" }}>Home</span>
  <Separator orientation="vertical" />
  <span style={{ color: "var(--mantle-color-text)" }}>About</span>
  <Separator orientation="vertical" />
  <span style={{ color: "var(--mantle-color-text)" }}>Contact</span>
</div>`;

const separatorProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "The orientation of the separator.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
];

export default function SeparatorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Separator</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A visual divider for separating content sections. Supports both
        horizontal and vertical orientations.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          orientation=&quot;vertical&quot;
        </code>{" "}
        inside a flex row to create a vertical divider.
      </p>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={separatorProps} />
    </div>
  );
}
