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

const withLabelExample = `<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
  <Separator style={{ flex: 1 }} />
  <span style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>or continue with</span>
  <Separator style={{ flex: 1 }} />
</div>`;

const loginFormExample = `<div style={{ maxWidth: "320px" }}>
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    <Button style={{ width: "100%" }}>Sign in with Email</Button>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Separator style={{ flex: 1 }} />
      <span style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>OR</span>
      <Separator style={{ flex: 1 }} />
    </div>
    <Button variant="outline" color="neutral" style={{ width: "100%" }}>Sign in with Google</Button>
    <Button variant="outline" color="neutral" style={{ width: "100%" }}>Sign in with GitHub</Button>
  </div>
</div>`;

const toolbarExample = `<div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "var(--mantle-radius-lg)", border: "1px solid var(--mantle-color-border)", background: "var(--mantle-color-bg-subtle)" }}>
  <Button variant="ghost" color="neutral" size="sm" startIcon={<Bold size={14} />} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<Italic size={14} />} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<Underline size={14} />} />
  <Separator orientation="vertical" style={{ height: "20px" }} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<AlignLeft size={14} />} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<AlignCenter size={14} />} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<AlignRight size={14} />} />
  <Separator orientation="vertical" style={{ height: "20px" }} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<Link2 size={14} />} />
  <Button variant="ghost" color="neutral" size="sm" startIcon={<Image size={14} />} />
</div>`;

const sectionExample = `<div style={{ maxWidth: "400px" }}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>Notifications</p>
      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>Manage how you receive alerts</p>
    </div>
    <Switch defaultChecked />
  </div>
  <Separator style={{ margin: "16px 0" }} />
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>Dark Mode</p>
      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>Toggle dark theme</p>
    </div>
    <Switch defaultChecked />
  </div>
  <Separator style={{ margin: "16px 0" }} />
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>Analytics</p>
      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "var(--mantle-color-text-muted)" }}>Share usage data</p>
    </div>
    <Switch />
  </div>
</div>`;

const breadcrumbExample = `<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <span style={{ fontSize: "13px", color: "var(--mantle-accent)" }}>Dashboard</span>
  <Separator orientation="vertical" style={{ height: "14px" }} />
  <span style={{ fontSize: "13px", color: "var(--mantle-accent)" }}>Settings</span>
  <Separator orientation="vertical" style={{ height: "14px" }} />
  <span style={{ fontSize: "13px", color: "var(--mantle-color-text)" }}>Profile</span>
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

      <h2 className="mt-10 text-xl font-semibold">With Label</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Place text between two flex separators for a labeled divider.
      </p>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Login Form</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Common pattern for separating primary and social login options.
      </p>
      <div className="mt-4">
        <LivePlayground code={loginFormExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Toolbar Divider</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Vertical separators group related toolbar actions.
      </p>
      <div className="mt-4">
        <LivePlayground code={toolbarExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Settings List</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Separators between settings items create visual grouping.
      </p>
      <div className="mt-4">
        <LivePlayground code={sectionExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Breadcrumb Style</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Vertical separators as breadcrumb delimiters.
      </p>
      <div className="mt-4">
        <LivePlayground code={breadcrumbExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={separatorProps} />
    </div>
  );
}
