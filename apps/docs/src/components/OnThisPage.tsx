"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  label: string;
}

let tocItems: TocItem[] = [];
let activeId = "";
const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getTocSnapshot() {
  return tocItems;
}

function getActiveSnapshot() {
  return activeId;
}

function serverSnapshot(): never[] {
  return [];
}

function serverActiveSnapshot() {
  return "";
}

export function OnThisPage() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const items = useSyncExternalStore(subscribe, getTocSnapshot, serverSnapshot);
  const active = useSyncExternalStore(
    subscribe,
    getActiveSnapshot,
    serverActiveSnapshot,
  );

  // Extract headings and set up observer when pathname changes
  useEffect(() => {
    // Clean up previous observer
    observerRef.current?.disconnect();

    const main = document.querySelector("main");
    if (!main) return;

    // Small delay to let page render
    const timer = setTimeout(() => {
      const headings = main.querySelectorAll("h2");
      const newItems: TocItem[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent ?? "";
        const id =
          heading.id ||
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        heading.id = id;
        heading.style.scrollMarginTop = "2rem";
        newItems.push({ id, label: text });
      });

      tocItems = newItems;
      activeId = "";
      emit();

      // Set up intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeId = entry.target.id;
              emit();
            }
          }
        },
        { rootMargin: "-20% 0px -60% 0px" },
      );

      for (const item of newItems) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }

      observerRef.current = observer;
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden xl:block" aria-label="On this page">
      <div className="sticky top-10">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
          On this page
        </h3>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm transition-colors ${
                  active === item.id
                    ? "font-medium text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-zinc-300"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
