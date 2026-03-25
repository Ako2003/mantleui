"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Getting Started", href: "/" },
  { heading: "Form" },
  { label: "Input", href: "/components/input" },
  { label: "Autocomplete", href: "/components/autocomplete" },
  { label: "Checkbox", href: "/components/checkbox" },
  { label: "Switch", href: "/components/switch" },
  { label: "Select", href: "/components/select" },
  { label: "Toggle", href: "/components/toggle" },
  { label: "Calendar", href: "/components/calendar" },
  { heading: "Interactive" },
  { label: "Button", href: "/components/button" },
  { label: "ButtonGroup", href: "/components/button-group" },
  { label: "Accordion", href: "/components/accordion" },
  { label: "Tabs", href: "/components/tabs" },
  { label: "Popover", href: "/components/popover" },
  { label: "DataTable", href: "/components/data-table" },
  { heading: "Feedback" },
  { label: "Badge", href: "/components/badge" },
  { label: "Alert", href: "/components/alert" },
  { label: "AlertDialog", href: "/components/alert-dialog" },
  { label: "Toast", href: "/components/toast" },
  { heading: "Navigation" },
  { label: "Breadcrumb", href: "/components/breadcrumb" },
  { heading: "Layout" },
  { label: "Card", href: "/components/card" },
  { label: "Avatar", href: "/components/avatar" },
  { label: "Separator", href: "/components/separator" },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 dark:border-zinc-800 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-zinc-800">
          <Link href="/" className="text-lg font-bold">
            MantleUI
          </Link>
          <ThemeToggle />
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item, i) => {
              if ("heading" in item) {
                return (
                  <li
                    key={i}
                    className="px-2 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white"
                  >
                    {item.heading}
                  </li>
                );
              }

              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-slate-100 font-medium text-slate-900 dark:bg-zinc-800 dark:text-zinc-50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
