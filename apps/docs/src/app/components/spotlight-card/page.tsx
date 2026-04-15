"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const SpotlightCard = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.SpotlightCard),
  { ssr: false },
);

const spotlightCardProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Card content.",
  },
  {
    name: "spotlightColor",
    type: "string",
    default: '"rgba(255,255,255,0.1)"',
    description: "Spotlight color that follows the cursor.",
  },
  {
    name: "size",
    type: "number",
    default: "400",
    description: "Spotlight radius in pixels.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional class name for the card container.",
  },
  {
    name: "style",
    type: "CSSProperties",
    description: "Inline styles for the card container.",
  },
];

const cards = [
  {
    title: "Lightning fast",
    description:
      "Tree-shakable components with zero runtime overhead. Build what you need, ship nothing more.",
    color: "rgba(59,130,246,0.2)",
    accent: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Accessible by default",
    description:
      "Every component ships with full keyboard navigation, ARIA attributes, and screen reader support.",
    color: "rgba(168,85,247,0.2)",
    accent: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Composable",
    description:
      "Small, focused primitives that compose into the UI patterns your product needs.",
    color: "rgba(34,197,94,0.2)",
    accent: "text-green-600 dark:text-green-400",
  },
];

export default function SpotlightCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">SpotlightCard</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A card with a soft radial spotlight that follows the cursor on hover.
        Great for feature grids, pricing tiers, and product highlights.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover any card to reveal the spotlight.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <SpotlightCard
              key={card.title}
              spotlightColor={card.color}
              size={350}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className={`text-base font-semibold ${card.accent}`}>
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {card.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { SpotlightCard } from "@mantleui/react/motion";

<SpotlightCard
  spotlightColor="rgba(59,130,246,0.15)"
  size={350}
  className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
>
  <h3>Lightning fast</h3>
  <p>Tree-shakable components with zero runtime overhead.</p>
</SpotlightCard>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={spotlightCardProps} />
    </div>
  );
}
