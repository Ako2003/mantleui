"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const AnimatedList = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.AnimatedList),
  { ssr: false },
);

type Direction = "up" | "down" | "left" | "right";

const animatedListProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Items to render with staggered entry animation.",
  },
  {
    name: "stagger",
    type: "number",
    default: "0.1",
    description: "Delay in seconds between each child's animation.",
  },
  {
    name: "direction",
    type: '"up" | "down" | "left" | "right"',
    default: '"up"',
    description: "Direction each item slides from.",
  },
  {
    name: "distance",
    type: "number",
    default: "20",
    description: "Distance in pixels each item travels on entry.",
  },
];

const notifications = [
  {
    icon: "✉",
    title: "New message from Sarah",
    time: "2 min ago",
  },
  {
    icon: "★",
    title: "Your PR was approved",
    time: "12 min ago",
  },
  {
    icon: "↑",
    title: "Build deployed to production",
    time: "1 hour ago",
  },
  {
    icon: "●",
    title: "3 new comments on your post",
    time: "2 hours ago",
  },
  {
    icon: "♥",
    title: "Alex liked your update",
    time: "3 hours ago",
  },
  {
    icon: "⚑",
    title: "Weekly report available",
    time: "1 day ago",
  },
];

export default function AnimatedListPage() {
  const [visible, setVisible] = useState(true);
  const [direction, setDirection] = useState<Direction>("up");

  return (
    <div>
      <h1 className="text-3xl font-bold">AnimatedList</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A list container that animates its children in with a staggered entry.
        Works with any direction and distance, ideal for notification feeds,
        todos, and timelines.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Toggle the list and switch the entry direction.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setVisible((v) => !v)}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            {visible ? "Unmount list" : "Mount list"}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
              Direction:
            </span>
            {(["up", "down", "left", "right"] as Direction[]).map((d) => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={`rounded-md border px-3 py-1 text-xs font-medium transition ${
                  direction === d
                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {visible && (
          <AnimatedList
            stagger={0.08}
            direction={direction}
            distance={24}
            className="flex flex-col gap-2"
          >
            {notifications.map((n) => (
              <div
                key={n.title}
                className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-900 dark:bg-zinc-800 dark:text-white">
                  {n.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {n.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">
                    {n.time}
                  </p>
                </div>
              </div>
            ))}
          </AnimatedList>
        )}
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { AnimatedList } from "@mantleui/react/motion";

<AnimatedList stagger={0.08} direction="up" distance={24}>
  {items.map((item) => (
    <div key={item.id}>{item.title}</div>
  ))}
</AnimatedList>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={animatedListProps} />
    </div>
  );
}
