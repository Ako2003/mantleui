"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const ParallaxCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.ParallaxCarousel),
  { ssr: false },
);

const parallaxCarouselProps = [
  {
    name: "slides",
    type: "ParallaxSlide[]",
    description:
      "Array of slides. Each slide has an image URL and overlay content.",
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

const parallaxSlides = [
  {
    image: "https://picsum.photos/1200/600?random=1",
    content: (
      <div className="text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
          Chapter one
        </p>
        <h3 className="mt-2 text-3xl font-bold">Into the Wild</h3>
        <p className="mt-2 max-w-md text-sm text-white/90">
          Venture beyond the familiar and discover landscapes that redefine
          what's possible.
        </p>
      </div>
    ),
  },
  {
    image: "https://picsum.photos/1200/600?random=2",
    content: (
      <div className="text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
          Chapter two
        </p>
        <h3 className="mt-2 text-3xl font-bold">Above the Clouds</h3>
        <p className="mt-2 max-w-md text-sm text-white/90">
          Rise into the stratosphere where silence meets a sky full of color.
        </p>
      </div>
    ),
  },
  {
    image: "https://picsum.photos/1200/600?random=3",
    content: (
      <div className="text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
          Chapter three
        </p>
        <h3 className="mt-2 text-3xl font-bold">Into the Deep</h3>
        <p className="mt-2 max-w-md text-sm text-white/90">
          Descend into the ocean's hush and witness life in its most brilliant
          forms.
        </p>
      </div>
    ),
  },
];

export default function ParallaxCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ParallaxCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A full-bleed carousel with parallax backgrounds and overlay content.
        Perfect for hero sections, storytelling, and immersive marketing
        experiences.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Swipe or use the arrows to shift between scenes.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <ParallaxCarousel slides={parallaxSlides} defaultValue={0} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { ParallaxCarousel } from "@mantleui/react/motion";

const slides = [
  {
    image: "https://picsum.photos/1200/600?random=1",
    content: <h3>Into the Wild</h3>,
  },
  {
    image: "https://picsum.photos/1200/600?random=2",
    content: <h3>Above the Clouds</h3>,
  },
];

<ParallaxCarousel slides={slides} defaultValue={0} loop />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={parallaxCarouselProps} />
    </div>
  );
}
