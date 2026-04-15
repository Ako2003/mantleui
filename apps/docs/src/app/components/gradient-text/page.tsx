"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const GradientText = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.GradientText),
  { ssr: false },
);

const gradientTextProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Text content.",
  },
  {
    name: "colors",
    type: "string[]",
    description:
      "Gradient stops. The first color is appended automatically for a seamless loop.",
  },
  {
    name: "duration",
    type: "number",
    default: "3",
    description: "Duration of one full animation cycle in seconds.",
  },
  {
    name: "as",
    type: "ElementType",
    default: '"span"',
    description: "The element to render (polymorphic).",
  },
];

export default function GradientTextPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">GradientText</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An animated multi-stop gradient text component. Great for hero
        headlines, feature badges, and anywhere you want eye-catching typography
        without static backgrounds.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        The gradient smoothly loops through its color stops.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-col gap-8">
          <GradientText
            as="h2"
            className="text-5xl font-extrabold tracking-tight"
          >
            Beautiful Gradients
          </GradientText>

          <GradientText
            className="text-4xl font-bold"
            colors={["#f97316", "#ec4899", "#8b5cf6"]}
          >
            Sunset Glow
          </GradientText>

          <GradientText
            className="text-4xl font-bold"
            duration={6}
            colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"]}
          >
            Slow and steady
          </GradientText>

          <GradientText as="h2" className="text-3xl font-semibold">
            Polymorphic heading
          </GradientText>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { GradientText } from "@mantleui/react/motion";

// Default colors
<GradientText className="text-5xl font-extrabold">
  Beautiful Gradients
</GradientText>

// Custom colors
<GradientText
  className="text-4xl font-bold"
  colors={["#f97316", "#ec4899", "#8b5cf6"]}
>
  Sunset Glow
</GradientText>

// Slower animation
<GradientText className="text-4xl font-bold" duration={6}>
  Slow and steady
</GradientText>

// Polymorphic element
<GradientText as="h2" className="text-3xl font-semibold">
  Section heading
</GradientText>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={gradientTextProps} />
    </div>
  );
}
