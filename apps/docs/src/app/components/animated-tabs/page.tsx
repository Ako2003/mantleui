"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const AnimatedTabs = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.AnimatedTabs),
  { ssr: false },
);

const animatedTabsProps = [
  {
    name: "tabs",
    type: "AnimatedTabItem[]",
    description: "Tab definitions — each item is `{ id, label }`.",
  },
  {
    name: "value",
    type: "string",
    description: "Controlled selected tab id.",
  },
  {
    name: "defaultValue",
    type: "string",
    description: "Default selected tab id in uncontrolled mode.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description: "Called whenever the selected tab changes.",
  },
  {
    name: "variant",
    type: '"underline" | "pill"',
    default: '"underline"',
    description: "Visual style of the active indicator.",
  },
];

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

export default function AnimatedTabsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">AnimatedTabs</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A tab switcher with a smoothly animated active indicator. Choose between
        an underline or pill variant and render your own content based on the
        selected tab.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Underline variant</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A minimal underline glides beneath the active tab.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <AnimatedTabs tabs={tabs} defaultValue="overview" variant="underline" />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Pill variant</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rounded pill follows the active tab — great for segmented controls.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <AnimatedTabs tabs={tabs} defaultValue="analytics" variant="pill" />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { AnimatedTabs } from "@mantleui/react/motion";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

// Underline
<AnimatedTabs tabs={tabs} defaultValue="overview" />

// Pill
<AnimatedTabs tabs={tabs} defaultValue="overview" variant="pill" />

// Controlled
<AnimatedTabs
  tabs={tabs}
  value={active}
  onValueChange={setActive}
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={animatedTabsProps} />
    </div>
  );
}
