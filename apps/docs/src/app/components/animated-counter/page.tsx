"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const AnimatedCounter = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.AnimatedCounter),
  { ssr: false },
);

const animatedCounterProps = [
  {
    name: "value",
    type: "number",
    description: "The target number to animate to.",
  },
  {
    name: "duration",
    type: "number",
    default: "1.5",
    description: "Animation duration in seconds.",
  },
  {
    name: "decimals",
    type: "number",
    default: "0",
    description: "Number of decimal places to display.",
  },
  {
    name: "prefix",
    type: "string",
    description: 'Optional prefix rendered before the number (e.g. "$").',
  },
  {
    name: "suffix",
    type: "string",
    description: 'Optional suffix rendered after the number (e.g. "+").',
  },
];

export default function AnimatedCounterPage() {
  const [values, setValues] = useState({
    revenue: 5234,
    users: 1234567,
    conversion: 98.5,
  });

  const randomize = () => {
    setValues({
      revenue: Math.floor(Math.random() * 10000) + 1000,
      users: Math.floor(Math.random() * 2000000) + 500000,
      conversion: parseFloat((Math.random() * 100).toFixed(1)),
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">AnimatedCounter</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A number counter that smoothly animates from its previous value to a new
        target value. Perfect for dashboards, stats, and KPIs.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button to animate the counters to new random values.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Revenue
            </p>
            <AnimatedCounter
              className="mt-2 text-3xl font-bold text-white"
              value={values.revenue}
              prefix="$"
              duration={1.5}
            />
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Total Users
            </p>
            <AnimatedCounter
              className="mt-2 text-3xl font-bold text-white"
              value={values.users}
              suffix=" users"
              duration={2}
            />
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Conversion
            </p>
            <AnimatedCounter
              className="mt-2 text-3xl font-bold text-white"
              value={values.conversion}
              decimals={1}
              suffix="%"
              duration={1.5}
            />
          </div>
        </div>
        <button
          onClick={randomize}
          className="mt-5 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Randomize values
        </button>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { AnimatedCounter } from "@mantleui/react/motion";

<AnimatedCounter value={5234} prefix="$" duration={1.5} />
<AnimatedCounter value={1234567} suffix=" users" />
<AnimatedCounter value={98.5} decimals={1} suffix="%" />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={animatedCounterProps} />
    </div>
  );
}
