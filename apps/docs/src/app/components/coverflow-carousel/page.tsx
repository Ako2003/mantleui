"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const CoverflowCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.CoverflowCarousel),
  { ssr: false },
);

const coverflowCarouselProps = [
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
  {
    name: "rotateAngle",
    type: "number",
    default: "30",
    description: "rotateY angle (degrees) applied to side slides.",
  },
  {
    name: "slideDistance",
    type: "number",
    default: "150",
    description: "Horizontal distance (px) between adjacent slides.",
  },
];

const covers = [
  { title: "Nebula", gradient: "from-indigo-600 via-purple-600 to-pink-600" },
  { title: "Aurora", gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  { title: "Ember", gradient: "from-rose-500 via-orange-500 to-amber-500" },
  { title: "Glacier", gradient: "from-sky-500 via-blue-500 to-indigo-600" },
  { title: "Verdant", gradient: "from-lime-500 via-emerald-500 to-green-600" },
];

const coverSlides = covers.map((c) => (
  <div
    key={c.title}
    className={`flex h-64 w-64 flex-col items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow-2xl`}
  >
    <h3 className="text-2xl font-bold">{c.title}</h3>
    <p className="mt-1 text-xs uppercase tracking-widest text-white/80">
      Cover art
    </p>
  </div>
));

export default function CoverflowCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">CoverflowCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A 3D coverflow carousel that tilts and depth-layers side slides for a
        cinematic browsing experience. Great for album art, portfolios, and
        showcases.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click a side slide or drag to flip through the covers.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <CoverflowCarousel slides={coverSlides} defaultValue={0} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { CoverflowCarousel } from "@mantleui/react/motion";

const slides = covers.map((c) => <div key={c.title}>{c.title}</div>);

<CoverflowCarousel slides={slides} defaultValue={0} loop />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={coverflowCarouselProps} />
    </div>
  );
}
