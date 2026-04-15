"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const TypeWriter = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.TypeWriter),
  { ssr: false },
);

const typeWriterProps = [
  {
    name: "text",
    type: "string | string[]",
    description: "Text or list of texts to cycle through.",
  },
  {
    name: "speed",
    type: "number",
    default: "50",
    description: "Milliseconds per character while typing or deleting.",
  },
  {
    name: "pauseDuration",
    type: "number",
    default: "2000",
    description: "Pause in milliseconds after a word finishes typing.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "true",
    description: "Whether to loop through the text list.",
  },
  {
    name: "cursor",
    type: "boolean",
    default: "true",
    description: "Whether to render the blinking cursor.",
  },
  {
    name: "cursorChar",
    type: "string",
    default: '"|"',
    description: "Character used for the blinking cursor.",
  },
];

export default function TypeWriterPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">TypeWriter</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A typewriter effect that types out a single string or cycles through a
        list of strings, with an optional blinking cursor.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Single string</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A single sentence typed out once.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <TypeWriter
          className="text-2xl font-semibold text-white"
          text="Craft interfaces that feel inevitable."
          speed={45}
          loop={false}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Cycling through roles</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Pass an array of strings to cycle through them on repeat.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-baseline gap-3 text-2xl font-semibold text-white">
          <span className="text-zinc-500">I am a</span>
          <TypeWriter
            className="text-blue-400"
            text={["Designer", "Developer", "Engineer", "Builder"]}
            speed={60}
            pauseDuration={1500}
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Without cursor</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Disable the cursor with{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">
          cursor=&#123;false&#125;
        </code>
        , or customise the character via{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm">
          cursorChar
        </code>
        .
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <TypeWriter
          className="block text-xl font-medium text-white"
          text="Silent and steady."
          speed={55}
          cursor={false}
          loop={false}
        />
        <TypeWriter
          className="mt-4 block text-xl font-medium text-emerald-400"
          text={["> initializing...", "> loading modules...", "> ready."]}
          speed={40}
          cursorChar="_"
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { TypeWriter } from "@mantleui/react/motion";

// Single string
<TypeWriter text="Craft interfaces that feel inevitable." loop={false} />

// Cycling array
<TypeWriter text={["Designer", "Developer", "Engineer"]} speed={60} />

// Custom cursor, no loop
<TypeWriter text="Ready." cursorChar="_" loop={false} />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={typeWriterProps} />
    </div>
  );
}
