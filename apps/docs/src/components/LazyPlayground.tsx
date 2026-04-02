"use client";

import dynamic from "next/dynamic";

const LivePlaygroundInner = dynamic(
  () =>
    import("./LivePlayground").then((mod) => ({
      default: mod.LivePlayground,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse rounded-lg border border-slate-200 dark:border-zinc-800">
        <div className="rounded-t-lg bg-white p-6 dark:bg-zinc-950">
          <div className="h-16 rounded bg-slate-100 dark:bg-zinc-900" />
        </div>
        <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    ),
  },
);

export function LivePlayground({ code }: { code: string; noEditor?: boolean }) {
  return <LivePlaygroundInner code={code} />;
}
