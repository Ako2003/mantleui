"use client";

import dynamic from "next/dynamic";
import { Bell, Home, Mail, Search, Settings, User } from "lucide-react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const FloatingDock = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.FloatingDock),
  { ssr: false },
);

const floatingDockProps = [
  {
    name: "items",
    type: "FloatingDockItem[]",
    description:
      "Dock items. Each item has `{ icon, label, onClick?, href? }`.",
  },
];

const floatingDockItemProps = [
  {
    name: "icon",
    type: "ReactNode",
    description: "Icon content (typically an SVG).",
  },
  {
    name: "label",
    type: "string",
    description: "Accessible label shown in the tooltip.",
  },
  {
    name: "onClick",
    type: "() => void",
    description: "Optional click handler.",
  },
  {
    name: "href",
    type: "string",
    description: "Optional anchor href — the item renders as an `<a>`.",
  },
];

const items = [
  { icon: <Home size={22} />, label: "Home", onClick: () => {} },
  { icon: <Search size={22} />, label: "Search", onClick: () => {} },
  { icon: <Mail size={22} />, label: "Mail", onClick: () => {} },
  { icon: <Bell size={22} />, label: "Notifications", onClick: () => {} },
  { icon: <Settings size={22} />, label: "Settings", onClick: () => {} },
  { icon: <User size={22} />, label: "Profile", onClick: () => {} },
];

export default function FloatingDockPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">FloatingDock</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A macOS-inspired floating dock with icons that magnify as the pointer
        approaches and reveal a tooltip for each item. Great for portfolios,
        editors, and app shells.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Move your cursor across the dock to see the icons scale and labels
        appear.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex min-h-40 items-center justify-center">
          <FloatingDock items={items} />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { FloatingDock } from "@mantleui/react/motion";
import { Home, Search, Mail, Bell, Settings, User } from "lucide-react";

const items = [
  { icon: <Home size={22} />, label: "Home", onClick: () => {} },
  { icon: <Search size={22} />, label: "Search", onClick: () => {} },
  { icon: <Mail size={22} />, label: "Mail", onClick: () => {} },
  { icon: <Bell size={22} />, label: "Notifications", onClick: () => {} },
  { icon: <Settings size={22} />, label: "Settings", onClick: () => {} },
  { icon: <User size={22} />, label: "Profile", href: "/profile" },
];

<FloatingDock items={items} />`}
      />

      <h2 className="mt-10 text-xl font-semibold">FloatingDock props</h2>
      <PropsTable props={floatingDockProps} />

      <h2 className="mt-10 text-xl font-semibold">FloatingDockItem shape</h2>
      <PropsTable props={floatingDockItemProps} />
    </div>
  );
}
