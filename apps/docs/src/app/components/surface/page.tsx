"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Surface elevation="md" rounded="lg" bordered>
  <h3 style={{ margin: "0 0 8px", fontWeight: 600, color: "var(--mantle-color-text)" }}>Surface</h3>
  <p style={{ margin: 0, fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
    A layered container with subtle background, glassmorphism blur, and configurable elevation.
  </p>
</Surface>`;

const elevationsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  {["none", "sm", "md", "lg"].map((elev) => (
    <Surface key={elev} elevation={elev} rounded="lg" bordered>
      <div style={{ minWidth: "120px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>{elev}</p>
        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>elevation</p>
      </div>
    </Surface>
  ))}
</div>`;

const roundedExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  {["none", "sm", "md", "lg"].map((r) => (
    <Surface key={r} rounded={r} elevation="sm" bordered>
      <div style={{ minWidth: "100px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>{r}</p>
        <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>rounded</p>
      </div>
    </Surface>
  ))}
</div>`;

const dashboardExample = `<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
  {[
    { icon: "📊", label: "Analytics", value: "2,847", bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)" },
    { icon: "💰", label: "Revenue", value: "$12.4K", bg: "linear-gradient(135deg, #22c55e, #16a34a)" },
    { icon: "👥", label: "Users", value: "1,204", bg: "linear-gradient(135deg, #8b5cf6, #6d28d9)" },
    { icon: "⚡", label: "Uptime", value: "99.9%", bg: "linear-gradient(135deg, #ef4444, #dc2626)" },
  ].map((item) => (
    <Surface key={item.label} elevation="sm" rounded="lg" bordered>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>{item.icon}</div>
        <div>
          <p style={{ margin: 0, fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>{item.label}</p>
          <p style={{ margin: "2px 0 0", fontSize: "18px", fontWeight: 700, color: "var(--mantle-color-text)" }}>{item.value}</p>
        </div>
      </div>
    </Surface>
  ))}
</div>`;

const nestedExample = `<Surface elevation="md" rounded="lg" bordered>
  <h3 style={{ margin: "0 0 12px", fontWeight: 600, fontSize: "16px", color: "var(--mantle-color-text)" }}>Nested Surfaces</h3>
  <div style={{ display: "flex", gap: "12px" }}>
    <Surface elevation="sm" rounded="md" bordered style={{ flex: 1 }}>
      <p style={{ margin: 0, fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>Inner surface 1</p>
    </Surface>
    <Surface elevation="sm" rounded="md" bordered style={{ flex: 1 }}>
      <p style={{ margin: 0, fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>Inner surface 2</p>
    </Surface>
  </div>
</Surface>`;

const surfaceProps = [
  {
    name: "elevation",
    type: '"none" | "sm" | "md" | "lg"',
    default: '"none"',
    description: "Shadow depth level.",
  },
  {
    name: "rounded",
    type: '"none" | "sm" | "md" | "lg"',
    default: '"md"',
    description: "Border radius size.",
  },
  {
    name: "bordered",
    type: "boolean",
    default: "false",
    description: "Adds a visible border with hover effect.",
  },
];

export default function SurfacePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Surface</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A layered container with configurable elevation, border radius, and
        glassmorphism blur for building depth in your interfaces.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Elevations</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Four elevation levels from flat to prominent shadow.
      </p>
      <div className="mt-4">
        <LivePlayground code={elevationsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Rounded</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Four border radius presets.
      </p>
      <div className="mt-4">
        <LivePlayground code={roundedExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Dashboard Grid</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Surfaces work great as dashboard metric cards with gradient icons.
      </p>
      <div className="mt-4">
        <LivePlayground code={dashboardExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Nested</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Surfaces can be nested for layered depth effects.
      </p>
      <div className="mt-4">
        <LivePlayground code={nestedExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={surfaceProps} />
    </div>
  );
}
