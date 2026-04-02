"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Tabs defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Trigger value="tab-1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab-2">Notifications</Tabs.Trigger>
    <Tabs.Trigger value="tab-3" disabled>Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab-1">
    Manage your account settings and preferences.
  </Tabs.Content>
  <Tabs.Content value="tab-2">
    Configure how you receive notifications.
  </Tabs.Content>
  <Tabs.Content value="tab-3">
    View and manage your billing information.
  </Tabs.Content>
</Tabs>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
  <Tabs defaultValue="t1" color="red">
    <Tabs.List>
      <Tabs.Trigger value="t1">Red Tab</Tabs.Trigger>
      <Tabs.Trigger value="t2">Another</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="t1">Red accent tabs.</Tabs.Content>
    <Tabs.Content value="t2">Second tab content.</Tabs.Content>
  </Tabs>
  <Tabs defaultValue="t1" color="purple">
    <Tabs.List>
      <Tabs.Trigger value="t1">Purple Tab</Tabs.Trigger>
      <Tabs.Trigger value="t2">Another</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="t1">Purple accent tabs.</Tabs.Content>
    <Tabs.Content value="t2">Second tab content.</Tabs.Content>
  </Tabs>
</div>`;

const pillExample = `<Tabs variant="pill" defaultValue="reports">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">
    A summary of your project activity.
  </Tabs.Content>
  <Tabs.Content value="analytics">
    Detailed analytics and metrics.
  </Tabs.Content>
  <Tabs.Content value="reports">
    Generate and download detailed reports.
  </Tabs.Content>
</Tabs>`;

const pillWithSeparatorExample = `<Tabs variant="pill" defaultValue="reports">
  <Tabs.List>
    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
    <Tabs.Separator />
    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
    <Tabs.Separator />
    <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">
    A summary of your project activity.
  </Tabs.Content>
  <Tabs.Content value="analytics">
    Detailed analytics and metrics.
  </Tabs.Content>
  <Tabs.Content value="reports">
    Generate and download detailed reports.
  </Tabs.Content>
</Tabs>`;

const verticalExample = `<Tabs orientation="vertical" defaultValue="general">
  <Tabs.List>
    <Tabs.Trigger value="general">General</Tabs.Trigger>
    <Tabs.Trigger value="security">Security</Tabs.Trigger>
    <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
    <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="general">
    Manage your general account settings.
  </Tabs.Content>
  <Tabs.Content value="security">
    Update your password and two-factor authentication.
  </Tabs.Content>
  <Tabs.Content value="notifications">
    Configure email and push notification preferences.
  </Tabs.Content>
  <Tabs.Content value="billing">
    View invoices and manage payment methods.
  </Tabs.Content>
</Tabs>`;

const verticalPillExample = `<Tabs orientation="vertical" variant="pill" defaultValue="profile">
  <Tabs.List>
    <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
    <Tabs.Trigger value="appearance">Appearance</Tabs.Trigger>
    <Tabs.Trigger value="integrations">Integrations</Tabs.Trigger>
    <Tabs.Trigger value="advanced">Advanced</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="profile">
    Edit your name, avatar, and bio.
  </Tabs.Content>
  <Tabs.Content value="appearance">
    Customize theme, colors, and layout.
  </Tabs.Content>
  <Tabs.Content value="integrations">
    Connect third-party services and APIs.
  </Tabs.Content>
  <Tabs.Content value="advanced">
    Developer settings and experimental features.
  </Tabs.Content>
</Tabs>`;

const tabsProps = [
  {
    name: "value",
    type: "string",
    description: "The currently active tab value (controlled).",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "The initially active tab value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called when the active tab changes.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the active tab indicator.",
  },
  {
    name: "variant",
    type: '"underline" | "pill"',
    default: '"underline"',
    description:
      "Visual variant. Pill uses a rounded container with sliding background.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout orientation. Vertical renders tabs as a sidebar.",
  },
  {
    name: "--mantle-bg",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the background color via style. e.g. style={{ "--mantle-bg": "#1a1a2e" }}',
  },
  {
    name: "--mantle-border",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the border color via style. Set to "transparent" to remove. e.g. style={{ "--mantle-border": "#e94560" }}',
  },
  {
    name: "--mantle-text",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the text color via style. e.g. style={{ "--mantle-text": "#ffffff" }}',
  },
  {
    name: "--mantle-ring",
    type: "CSS variable",
    default: "accent",
    description:
      'Override the focus ring color via style. e.g. style={{ "--mantle-ring": "#e94560" }}',
  },
];

export default function TabsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Tabs</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compound tab component with roving tabindex for keyboard navigation.
        Use Arrow keys to move between tabs, Home/End to jump to first/last.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Keyboard Navigation</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Focus a tab and use{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-zinc-700">
          ←
        </kbd>{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-zinc-700">
          →
        </kbd>{" "}
        to navigate,{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-zinc-700">
          Home
        </kbd>{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-zinc-700">
          End
        </kbd>{" "}
        to jump. Disabled tabs are skipped.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Pill Variant</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rounded pill-style tab list with a sliding background indicator.
      </p>
      <div className="mt-4">
        <LivePlayground code={pillExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Separator</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          {"<Tabs.Separator />"}
        </code>{" "}
        between triggers to display separator lines.
      </p>
      <div className="mt-4">
        <LivePlayground code={pillWithSeparatorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Sidebar-style tabs with content on the right. Uses ArrowUp/Down for
        keyboard navigation.
      </p>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical Pill</h2>
      <div className="mt-4">
        <LivePlayground code={verticalPillExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={tabsProps} />
    </div>
  );
}
