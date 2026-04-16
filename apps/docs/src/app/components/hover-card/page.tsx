"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const HoverCard = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.HoverCard),
  { ssr: false },
);

const hoverCardProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Card content.",
  },
  {
    name: "lift",
    type: "number",
    default: "8",
    description: "Lift distance in pixels on hover.",
  },
  {
    name: "scale",
    type: "number",
    default: "1.02",
    description: "Scale factor on hover.",
  },
  {
    name: "shadowColor",
    type: "string",
    default: '"rgba(0,0,0,0.15)"',
    description: "Shadow color on hover.",
  },
];

const cards = [
  {
    icon: "◆",
    title: "Subtle lift",
    description: "A gentle 4px rise with a minimal scale.",
    lift: 4,
    scale: 1.01,
    shadowColor: "rgba(59,130,246,0.35)",
    accent: "text-blue-400",
  },
  {
    icon: "✦",
    title: "Default lift",
    description: "Balanced values for most dashboard cards.",
    lift: 8,
    scale: 1.02,
    shadowColor: "rgba(168,85,247,0.35)",
    accent: "text-purple-400",
  },
  {
    icon: "▲",
    title: "Dramatic lift",
    description: "A pronounced 14px rise and larger scale.",
    lift: 14,
    scale: 1.04,
    shadowColor: "rgba(34,197,94,0.35)",
    accent: "text-emerald-400",
  },
];

export default function HoverCardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">HoverCard</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A card container that lifts, scales, and casts a colored shadow on
        hover. Use it to make grids feel tactile without writing bespoke CSS.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover any card to see the lift, scale, and shadow combination.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-8 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {cards.map((card) => (
            <HoverCard
              key={card.title}
              lift={card.lift}
              scale={card.scale}
              shadowColor={card.shadowColor}
              className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className={`text-3xl ${card.accent}`}>{card.icon}</div>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {card.description}
              </p>
              <p className="mt-4 text-xs text-slate-500 dark:text-zinc-500">
                lift {card.lift}px · scale {card.scale}
              </p>
            </HoverCard>
          ))}
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { HoverCard } from "@mantleui/react/motion";

<HoverCard
  lift={8}
  scale={1.02}
  shadowColor="rgba(168,85,247,0.35)"
  className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
>
  <h3>Default lift</h3>
  <p>Balanced values for most dashboard cards.</p>
</HoverCard>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={hoverCardProps} />
    </div>
  );
}
