"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { navItems } from "@/lib/navItems";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Prevent scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile header bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-label="Open navigation"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <Link href="/" className="text-lg font-bold">
          MantleUI
        </Link>
        <ThemeToggle />
      </header>

      {/* Overlay + Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close navigation"
          />
          <div
            className="fixed inset-y-0 left-0 z-[9999] w-72 overflow-y-auto border-r border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
            style={{ animation: "mantle-slide-in-left 200ms ease-out" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-zinc-800">
              <Link
                href="/"
                className="text-lg font-bold"
                onClick={() => setOpen(false)}
              >
                MantleUI
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                aria-label="Close navigation"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="px-4 pt-4">
              <SearchDialog />
            </div>

            <nav className="px-4 py-4">
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
                        onClick={() => setOpen(false)}
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
        </>
      )}
    </>
  );
}
