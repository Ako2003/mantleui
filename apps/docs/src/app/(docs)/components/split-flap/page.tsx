"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const SplitFlap = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.SplitFlap),
  { ssr: false },
);

const splitFlapProps = [
  {
    name: "value",
    type: "string | number",
    description: "The value to display. Coerced to string.",
  },
  {
    name: "length",
    type: "number",
    description: "Pad the value to this length using leading spaces.",
  },
];

const tickers: string[] = [
  "AAPL 185.42",
  "MSFT 378.91",
  "GOOG 142.67",
  "NVDA 875.28",
  "TSLA 248.50",
  "META 512.13",
];

const statuses: string[] = [
  "BOARDING",
  "ON TIME",
  "DELAYED",
  "LANDED",
  "CANCELLED",
];

function pickRandom(list: string[], current: string): string {
  if (list.length === 0) return current;
  const filtered = list.filter((item) => item !== current);
  const pool = filtered.length > 0 ? filtered : list;
  return pool[Math.floor(Math.random() * pool.length)] ?? current;
}

export default function SplitFlapPage() {
  const [ticker, setTicker] = useState<string>("AAPL 185.42");
  const [status, setStatus] = useState<string>("BOARDING");

  const randomizeTicker = () => {
    setTicker((current) => pickRandom(tickers, current));
  };

  const randomizeStatus = () => {
    setStatus((current) => pickRandom(statuses, current));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">SplitFlap</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A retro split-flap display that animates each character independently
        when the value changes. Inspired by airport departure boards and stock
        tickers.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Stock ticker</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button to shuffle the ticker and watch each flap rotate into
        place.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-5">
          <SplitFlap value={ticker} length={11} />
          <button
            type="button"
            onClick={randomizeTicker}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Shuffle ticker
          </button>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Flight board</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use shorter labels for a status board feel.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-5">
          <SplitFlap value={status} length={9} />
          <button
            type="button"
            onClick={randomizeStatus}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            Update status
          </button>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { SplitFlap } from "@mantleui/react/motion";
import { useState } from "react";

function Ticker() {
  const [value, setValue] = useState("AAPL 185.42");
  return (
    <>
      <SplitFlap value={value} length={11} />
      <button onClick={() => setValue("MSFT 378.91")}>Update</button>
    </>
  );
}`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={splitFlapProps} />
    </div>
  );
}
