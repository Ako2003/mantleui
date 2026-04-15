"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const Marquee = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.Marquee),
  { ssr: false },
);

type Direction = "left" | "right";

const marqueeProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Content to scroll horizontally.",
  },
  {
    name: "speed",
    type: "number",
    default: "50",
    description: "Scroll speed in pixels per second.",
  },
  {
    name: "direction",
    type: '"left" | "right"',
    default: '"left"',
    description: "Scroll direction.",
  },
  {
    name: "pauseOnHover",
    type: "boolean",
    default: "true",
    description: "Whether to pause the animation on hover.",
  },
];

const logos = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Stark Industries",
  "Wayne Enterprises",
  "Wonka Industries",
  "Cyberdyne",
  "Aperture",
];

const testimonials = [
  {
    quote: "This library transformed how we ship UI.",
    author: "Lead Engineer, Acme",
  },
  {
    quote: "The accessibility story is the best I've seen.",
    author: "Design Director, Globex",
  },
  {
    quote: "Tree-shaking that actually works.",
    author: "Platform Team, Hooli",
  },
  {
    quote: "Composable and predictable. Love it.",
    author: "Staff Engineer, Stark",
  },
  {
    quote: "Our velocity doubled after we adopted it.",
    author: "Frontend Lead, Wayne",
  },
];

export default function MarqueePage() {
  const [direction, setDirection] = useState<Direction>("left");

  return (
    <div>
      <h1 className="text-3xl font-bold">Marquee</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A seamless horizontal scroller that loops any content forever. Ideal for
        logo clouds, testimonials, and ticker tapes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Logo Cloud</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Hover to pause. Toggle the direction below.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
          Direction:
        </span>
        {(["left", "right"] as Direction[]).map((d) => (
          <button
            key={d}
            onClick={() => setDirection(d)}
            className={`rounded-md border px-3 py-1 text-xs font-medium transition ${
              direction === d
                ? "border-white bg-white text-black"
                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 py-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Marquee speed={60} direction={direction} pauseOnHover>
          {logos.map((logo) => (
            <div
              key={logo}
              className="mx-3 flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-zinc-300"
            >
              {logo}
            </div>
          ))}
        </Marquee>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Testimonials</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A slower marquee with testimonial cards.
      </p>
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 py-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Marquee speed={30} direction="left" pauseOnHover>
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="mx-3 w-80 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <p className="text-sm leading-relaxed text-zinc-200">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-xs font-medium text-zinc-500">
                — {t.author}
              </p>
            </div>
          ))}
        </Marquee>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { Marquee } from "@mantleui/react/motion";

<Marquee speed={60} direction="left" pauseOnHover>
  {logos.map((logo) => (
    <div key={logo} className="mx-3">
      {logo}
    </div>
  ))}
</Marquee>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={marqueeProps} />
    </div>
  );
}
