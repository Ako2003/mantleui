"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const Carousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.Carousel),
  { ssr: false },
);

const carouselProps = [
  {
    name: "slides",
    type: "ReactNode[]",
    description: "The slides to render inside the carousel.",
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
    name: "showArrows",
    type: "boolean",
    default: "true",
    description: "Whether to show prev/next arrow buttons.",
  },
  {
    name: "showDots",
    type: "boolean",
    default: "true",
    description: "Whether to show dot indicators.",
  },
  {
    name: "gap",
    type: "number",
    default: "0",
    description: "Gap between slides in pixels.",
  },
];

const features = [
  {
    title: "Lightning Fast",
    description: "Optimized animations powered by hardware acceleration.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    title: "Fully Accessible",
    description: "Keyboard navigation and ARIA attributes out of the box.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Touch Friendly",
    description: "Drag to swipe on mobile and desktop alike.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    title: "Composable",
    description: "Drop in any content as slides — cards, images, or forms.",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Themeable",
    description: "Styles that match light and dark modes effortlessly.",
    gradient: "from-fuchsia-500 to-pink-600",
  },
];

const featureSlides = features.map((feature) => (
  <div
    key={feature.title}
    className={`flex h-64 w-full flex-col items-start justify-end rounded-xl bg-gradient-to-br ${feature.gradient} p-6 text-white`}
  >
    <h3 className="text-2xl font-bold">{feature.title}</h3>
    <p className="mt-2 max-w-sm text-sm text-white/90">{feature.description}</p>
  </div>
));

export default function CarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Carousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A flexible slide carousel with arrow and dot navigation, keyboard
        support, autoplay, and drag-to-swipe. Use it to showcase features,
        images, or any repeating content.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Navigate with the arrows, dots, or by dragging a slide.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <Carousel slides={featureSlides} defaultValue={0} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">With autoplay</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Enable autoplay to cycle through slides automatically.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <Carousel
            slides={featureSlides}
            defaultValue={0}
            autoplay
            interval={2500}
            loop
          />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">With gap</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add breathing room between slides with the <code>gap</code> prop.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <Carousel slides={featureSlides} defaultValue={0} gap={24} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { Carousel } from "@mantleui/react/motion";

const slides = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

<Carousel slides={slides} defaultValue={0} loop />
<Carousel slides={slides} autoplay interval={2500} />
<Carousel slides={slides} gap={24} />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={carouselProps} />
    </div>
  );
}
