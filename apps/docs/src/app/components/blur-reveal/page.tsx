"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const BlurReveal = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.BlurReveal),
  { ssr: false },
);

const blurRevealProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Content to reveal.",
  },
  {
    name: "blur",
    type: "number",
    default: "20",
    description: "Initial blur amount in pixels.",
  },
  {
    name: "duration",
    type: "number",
    default: "0.8",
    description: "Reveal duration in seconds.",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Reveal delay in seconds.",
  },
];

const cards = [
  {
    blur: 10,
    delay: 0,
    title: "Subtle blur",
    description: "10px blur — a soft focus-in effect.",
    accent: "text-blue-400",
  },
  {
    blur: 25,
    delay: 0.15,
    title: "Default blur",
    description: "25px blur with a small delay stagger.",
    accent: "text-purple-400",
  },
  {
    blur: 40,
    delay: 0.3,
    title: "Dramatic blur",
    description: "40px blur — content comes sharply into focus.",
    accent: "text-emerald-400",
  },
];

export default function BlurRevealPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold">BlurReveal</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Animates content from a blurred, faded state into sharp focus. Use it
        for hero sections, feature grids, and scroll-triggered reveals.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click replay to run the animation again. Each card uses a different blur
        amount and delay.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="mb-5 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
        >
          Replay animation
        </button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <BlurReveal
              key={`${card.title}-${key}`}
              blur={card.blur}
              delay={card.delay}
              duration={0.9}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className={`text-base font-semibold ${card.accent}`}>
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {card.description}
              </p>
            </BlurReveal>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { BlurReveal } from "@mantleui/react/motion";

<BlurReveal blur={25} duration={0.9} delay={0.15}>
  <h2>Sharp focus</h2>
  <p>Content fades from blurred to crisp.</p>
</BlurReveal>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={blurRevealProps} />
    </div>
  );
}
