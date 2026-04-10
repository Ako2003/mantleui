"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const FadeCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.FadeCarousel),
  { ssr: false },
);

const fadeCarouselProps = [
  {
    name: "slides",
    type: "ReactNode[]",
    description: "The slides to render.",
  },
  {
    name: "value",
    type: "number",
    description: "Controlled current slide index.",
  },
  {
    name: "defaultValue",
    type: "number",
    default: "0",
    description: "Default current slide index (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(index: number) => void",
    description: "Called when the current slide changes.",
  },
  {
    name: "autoplay",
    type: "boolean",
    default: "false",
    description: "Whether the carousel auto-advances.",
  },
  {
    name: "interval",
    type: "number",
    default: "3000",
    description: "Autoplay interval in ms.",
  },
  {
    name: "loop",
    type: "boolean",
    default: "true",
    description: "Whether to wrap around at edges.",
  },
];

const scenes = [
  {
    title: "Sunrise",
    description: "The day begins with quiet anticipation.",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    title: "Midday",
    description: "Light at its sharpest, shadows at their shortest.",
    gradient: "from-sky-400 via-cyan-400 to-blue-500",
  },
  {
    title: "Golden Hour",
    description: "A last amber glow before the light gives way.",
    gradient: "from-yellow-400 via-orange-500 to-fuchsia-600",
  },
  {
    title: "Nightfall",
    description: "Stars emerge and the world grows still.",
    gradient: "from-indigo-700 via-violet-800 to-slate-900",
  },
];

const sceneSlides = scenes.map((s) => (
  <div
    key={s.title}
    className={`flex h-64 w-full flex-col items-start justify-end rounded-xl bg-gradient-to-br ${s.gradient} p-6 text-white`}
  >
    <h3 className="text-2xl font-bold">{s.title}</h3>
    <p className="mt-2 max-w-sm text-sm text-white/90">{s.description}</p>
  </div>
));

export default function FadeCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">FadeCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A carousel that cross-fades between slides rather than sliding them.
        Ideal for full-bleed imagery, hero backgrounds, and softer transitions.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Autoplay is enabled — slides gently cross-fade on a 3 second cycle.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <FadeCarousel
            slides={sceneSlides}
            defaultValue={0}
            autoplay
            interval={3000}
            loop
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { FadeCarousel } from "@mantleui/react/motion";

const slides = [
  <div key="1">Sunrise</div>,
  <div key="2">Midday</div>,
  <div key="3">Golden Hour</div>,
  <div key="4">Nightfall</div>,
];

<FadeCarousel slides={slides} defaultValue={0} autoplay interval={3000} loop />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={fadeCarouselProps} />
    </div>
  );
}
