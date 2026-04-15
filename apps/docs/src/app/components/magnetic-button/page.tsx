"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const MagneticButton = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.MagneticButton),
  { ssr: false },
);

const magneticButtonProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Button content.",
  },
  {
    name: "strength",
    type: "number",
    default: "0.3",
    description: "Magnetic strength factor between 0 and 1.",
  },
  {
    name: "...rest",
    type: "ButtonHTMLAttributes<HTMLButtonElement>",
    description: "All native button attributes are forwarded.",
  },
];

const variants = [
  { strength: 0.2, label: "Subtle (0.2)" },
  { strength: 0.4, label: "Default (0.4)" },
  { strength: 0.6, label: "Strong (0.6)" },
];

export default function MagneticButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">MagneticButton</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A button that subtly pulls toward the cursor on hover. The effect
        intensity is controlled by a single strength prop.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover each button to feel the pull. Compare different strength values.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-10 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-wrap items-center justify-center gap-10">
          {variants.map((variant) => (
            <div
              key={variant.strength}
              className="flex flex-col items-center gap-3"
            >
              <MagneticButton
                strength={variant.strength}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Hover me
              </MagneticButton>
              <span className="text-xs text-zinc-500">{variant.label}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { MagneticButton } from "@mantleui/react/motion";

<MagneticButton
  strength={0.4}
  className="rounded-full bg-zinc-900 px-6 py-3 text-white"
  onClick={() => console.log("clicked")}
>
  Hover me
</MagneticButton>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={magneticButtonProps} />
    </div>
  );
}
