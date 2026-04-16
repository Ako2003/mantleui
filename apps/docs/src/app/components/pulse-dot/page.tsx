"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const PulseDot = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.PulseDot),
  { ssr: false },
);

const pulseDotProps = [
  {
    name: "color",
    type: "string",
    default: '"#ef4444"',
    description: "Dot color.",
  },
  {
    name: "size",
    type: "number",
    default: "12",
    description: "Dot size in pixels.",
  },
];

const statuses = [
  { color: "#ef4444", label: "Live broadcasting" },
  { color: "#22c55e", label: "All systems operational" },
  { color: "#eab308", label: "Degraded performance" },
  { color: "#3b82f6", label: "Syncing in background" },
];

const sizes = [8, 12, 16, 20];

export default function PulseDotPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">PulseDot</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A tiny colored dot with a soft radiating pulse. Perfect for live
        indicators, notification badges, and status markers.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Status indicators</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Pair a PulseDot with a label to communicate live state inline.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-4">
          {statuses.map((status) => (
            <div
              key={status.label}
              className="flex items-center gap-3 text-sm text-slate-700 dark:text-zinc-200"
            >
              <PulseDot color={status.color} size={12} />
              <span>{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Scale the dot with the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          size
        </code>{" "}
        prop.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-end gap-10">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <PulseDot color="#3b82f6" size={s} />
              <span className="text-xs text-slate-500 dark:text-zinc-500">
                {s}px
              </span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Notification badge</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Anchor a pulse dot to a button or icon to draw attention to new
        activity.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-8">
          <div className="relative">
            <button className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
              Inbox
            </button>
            <div className="absolute -right-1 -top-1">
              <PulseDot color="#ef4444" size={10} />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <PulseDot color="#ef4444" size={8} />
            LIVE
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-zinc-300">
            <PulseDot color="#22c55e" size={10} />3 online
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { PulseDot } from "@mantleui/react/motion";

<div className="flex items-center gap-2">
  <PulseDot color="#ef4444" size={10} />
  <span>Live broadcasting</span>
</div>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={pulseDotProps} />
    </div>
  );
}
