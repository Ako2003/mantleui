"use client";

import { LivePlayground } from "@/components/LivePlayground";
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
];

export default function TabsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Tabs</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        A compound tab component with roving tabindex for keyboard navigation.
        Use Arrow keys to move between tabs, Home/End to jump to first/last.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Keyboard Navigation</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Focus a tab and use{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-700">
          ←
        </kbd>{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-700">
          →
        </kbd>{" "}
        to navigate,{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-700">
          Home
        </kbd>{" "}
        <kbd className="rounded border border-slate-300 px-1.5 py-0.5 text-xs dark:border-slate-700">
          End
        </kbd>{" "}
        to jump. Disabled tabs are skipped.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={tabsProps} />
    </div>
  );
}
