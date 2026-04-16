"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const VerticalCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.VerticalCarousel),
  { ssr: false },
);

const verticalCarouselProps = [
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
    name: "height",
    type: "number",
    default: "400",
    description: "Viewport height in pixels.",
  },
];

const sections = [
  {
    title: "Discover",
    description: "Explore a curated catalog of production-ready components.",
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Customize",
    description: "Tune every detail with flexible, composable APIs.",
    gradient: "from-cyan-500 to-sky-600",
  },
  {
    title: "Compose",
    description: "Mix primitives into rich, accessible experiences.",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Ship",
    description: "Deploy with confidence and delight your users.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const sectionSlides = sections.map((s) => (
  <div
    key={s.title}
    className={`flex h-full w-full flex-col items-start justify-end rounded-xl bg-gradient-to-br ${s.gradient} p-8 text-white`}
  >
    <h3 className="text-3xl font-bold">{s.title}</h3>
    <p className="mt-2 max-w-md text-sm text-white/90">{s.description}</p>
  </div>
));

export default function VerticalCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">VerticalCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A vertically-scrolling carousel with up/down navigation. Ideal for full
        height storytelling, vertical product tours, and mobile-first layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Navigate with the up/down arrows or drag vertically to swipe.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <VerticalCarousel
            slides={sectionSlides}
            defaultValue={0}
            height={400}
            loop
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { VerticalCarousel } from "@mantleui/react/motion";

const slides = [
  <div key="1">Discover</div>,
  <div key="2">Customize</div>,
  <div key="3">Compose</div>,
  <div key="4">Ship</div>,
];

<VerticalCarousel slides={slides} defaultValue={0} height={400} loop />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={verticalCarouselProps} />
    </div>
  );
}
