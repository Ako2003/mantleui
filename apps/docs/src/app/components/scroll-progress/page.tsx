"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const ScrollProgress = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.ScrollProgress),
  { ssr: false },
);

const scrollProgressProps = [
  {
    name: "color",
    type: "string",
    default: '"#3b82f6"',
    description: "CSS color of the progress bar.",
  },
  {
    name: "height",
    type: "number",
    default: "3",
    description: "Height of the bar in pixels.",
  },
  {
    name: "position",
    type: '"top" | "bottom"',
    default: '"top"',
    description: "Edge of the viewport to pin the bar to.",
  },
  {
    name: "zIndex",
    type: "number",
    default: "9999",
    description: "CSS z-index for stacking over other fixed elements.",
  },
];

export default function ScrollProgressPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ScrollProgress</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A thin bar fixed to the top (or bottom) of the viewport that tracks how
        far the user has scrolled through the page. Drop it into any layout for
        instant reading progress feedback.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Scroll this page up and down — the bar fixed to the top of the viewport
        fills in as you scroll. Each example below mounts its own bar, so only
        the last one mounted will be visible at any given time.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <ScrollProgress color="#3b82f6" height={3} />
        <div className="flex flex-col gap-4 text-sm text-zinc-300">
          <p>
            Default blue bar pinned to the top of the viewport with a height of
            3px.
          </p>
          <p>
            Try scrolling this page to see the bar grow from left to right as
            you approach the bottom.
          </p>
          <p>
            The component is rendered via a portal, so it will appear at the
            very top of the window regardless of where{" "}
            <code>ScrollProgress</code> is placed in your component tree.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom colors</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Tailor the color and thickness to match your theme.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <ScrollProgress color="#ec4899" height={4} />
        <p className="text-sm text-zinc-300">
          A 4px pink bar — scroll to see it update in real time.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Pinned to bottom</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use <code>position=&quot;bottom&quot;</code> to pin the bar to the
        bottom edge of the viewport.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <ScrollProgress color="#10b981" height={5} position="bottom" />
        <p className="text-sm text-zinc-300">
          A 5px emerald bar pinned to the bottom of the viewport.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { ScrollProgress } from "@mantleui/react/motion";

// Default
<ScrollProgress />

// Custom color and height
<ScrollProgress color="#ec4899" height={4} />

// Pinned to the bottom
<ScrollProgress color="#10b981" position="bottom" />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={scrollProgressProps} />
    </div>
  );
}
