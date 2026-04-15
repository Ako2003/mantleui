"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const TextReveal = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.TextReveal),
  { ssr: false },
);

const textRevealProps = [
  {
    name: "children",
    type: "string",
    description: "The text to animate word by word.",
  },
  {
    name: "stagger",
    type: "number",
    default: "0.05",
    description: "Delay in seconds between each word.",
  },
  {
    name: "delay",
    type: "number",
    default: "0",
    description: "Delay in seconds before the animation starts.",
  },
];

const headline = "Interfaces that feel inevitable, built with intention.";
const paragraph =
  "Every component is crafted to be composable, accessible, and quick to integrate — so your product feels polished from the very first click.";

export default function TextRevealPage() {
  const [key, setKey] = useState(0);

  return (
    <div>
      <h1 className="text-3xl font-bold">TextReveal</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Animates a string word by word, sliding each one into place with a
        staggered delay. Ideal for hero headlines and editorial moments.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click replay to run the animations again.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <button
          onClick={() => setKey((k) => k + 1)}
          className="mb-6 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Replay animation
        </button>

        <div className="flex flex-col gap-10">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Headline · stagger 0.08
            </p>
            <TextReveal
              key={`headline-${key}`}
              stagger={0.08}
              className="text-3xl font-bold leading-tight text-white"
            >
              {headline}
            </TextReveal>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Paragraph · stagger 0.03
            </p>
            <TextReveal
              key={`paragraph-${key}`}
              stagger={0.03}
              delay={0.3}
              className="text-lg leading-relaxed text-zinc-300"
            >
              {paragraph}
            </TextReveal>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              Fast · stagger 0.02
            </p>
            <TextReveal
              key={`fast-${key}`}
              stagger={0.02}
              className="text-xl font-medium text-emerald-400"
            >
              A quicker cadence for short lines.
            </TextReveal>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { TextReveal } from "@mantleui/react/motion";

<TextReveal stagger={0.08} className="text-3xl font-bold">
  Interfaces that feel inevitable, built with intention.
</TextReveal>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={textRevealProps} />
    </div>
  );
}
