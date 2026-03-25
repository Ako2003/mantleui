"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchData } from "@/lib/search-data";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Also generate section entries from page headings at runtime
  const [dynamicItems, setDynamicItems] = useState<
    { title: string; section: string; href: string; category: string }[]
  >([]);

  // Scan all pages for h2 headings when dialog opens
  useEffect(() => {
    if (!open) return;
    // Focus input
    setTimeout(() => inputRef.current?.focus(), 50);

    // Fetch all component pages and extract h2s
    const fetchSections = async () => {
      const pages = searchData.filter((item) => !item.section);
      const items: {
        title: string;
        section: string;
        href: string;
        category: string;
      }[] = [];

      for (const page of pages) {
        try {
          const res = await fetch(page.href);
          if (!res.ok) continue;
          const html = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const headings = doc.querySelectorAll("h2");
          headings.forEach((h) => {
            const text = h.textContent ?? "";
            if (!text || text === "Props") return;
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            // Avoid duplicates with static data
            const exists = searchData.some(
              (s) => s.href === `${page.href}#${id}`,
            );
            if (!exists) {
              items.push({
                title: text,
                section: page.title,
                href: `${page.href}#${id}`,
                category: page.category,
              });
            }
          });
        } catch {
          // Skip failed fetches
        }
      }
      setDynamicItems(items);
    };

    fetchSections();
  }, [open]);

  const allItems = useMemo(
    () => [...searchData, ...dynamicItems],
    [dynamicItems],
  );

  const results = useMemo(() => {
    if (!query.trim()) return allItems.filter((item) => !item.section);
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.section && item.section.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q),
    );
  }, [query, allItems]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setSelectedIndex(0);
  };

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter": {
        e.preventDefault();
        const item = results.at(selectedIndex);
        if (item) navigate(item.href);
        break;
      }
    }
  };

  // Scroll selected into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector("[data-selected='true']");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700 dark:border-zinc-800 dark:text-zinc-500 dark:hover:border-zinc-700 dark:hover:text-zinc-300"
      >
        <SearchIcon />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-zinc-700 dark:text-zinc-500 sm:inline">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[99998] bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close search"
      />
      <div className="fixed inset-x-0 top-[10%] z-[99999] mx-auto w-full max-w-lg px-4">
        <div className="mantle-page-enter overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-zinc-800">
            <SearchIcon />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search components, sections..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-zinc-500"
            />
            <button
              type="button"
              className="rounded border border-slate-200 px-1.5 py-0.5 text-xs text-slate-400 dark:border-zinc-700 dark:text-zinc-500 cursor-pointer bg-transparent"
              onClick={() => setOpen(false)}
            >
              ESC
            </button>
          </div>
          <div
            ref={listRef}
            className="max-h-80 overflow-y-auto p-2"
            role="listbox"
            aria-label="Search results"
          >
            {results.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-slate-500 dark:text-zinc-500">
                No results found.
              </div>
            ) : (
              results.map((item, index) => (
                <button
                  key={item.href}
                  type="button"
                  role="option"
                  aria-selected={index === selectedIndex || undefined}
                  data-selected={index === selectedIndex}
                  onClick={() => navigate(item.href)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    index === selectedIndex
                      ? "bg-slate-100 text-slate-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "text-slate-600 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {item.section ? (
                        <>
                          <span className="text-slate-400 dark:text-zinc-500">
                            {item.section}
                          </span>
                          <span className="mx-1.5 text-slate-300 dark:text-zinc-600">
                            ›
                          </span>
                          {item.title}
                        </>
                      ) : (
                        item.title
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400 dark:text-zinc-600">
                    {item.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-slate-400 dark:text-zinc-500"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
