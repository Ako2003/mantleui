"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const ThumbnailCarousel = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.ThumbnailCarousel),
  { ssr: false },
);

const thumbnailCarouselProps = [
  {
    name: "images",
    type: "ThumbnailImage[]",
    description:
      "Array of images. Each image has a `src` URL and optional `alt` text.",
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

const productImages = [
  {
    src: "https://picsum.photos/800/600?random=11",
    alt: "Product view one",
  },
  {
    src: "https://picsum.photos/800/600?random=12",
    alt: "Product view two",
  },
  {
    src: "https://picsum.photos/800/600?random=13",
    alt: "Product view three",
  },
  {
    src: "https://picsum.photos/800/600?random=14",
    alt: "Product view four",
  },
  {
    src: "https://picsum.photos/800/600?random=15",
    alt: "Product view five",
  },
];

export default function ThumbnailCarouselPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ThumbnailCarousel</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An image carousel with a thumbnail navigation strip. Commonly used for
        product galleries, media libraries, and photo collections.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click a thumbnail, use the arrows, or drag the main image to navigate.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto" style={{ maxWidth: 600 }}>
          <ThumbnailCarousel images={productImages} defaultValue={0} loop />
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { ThumbnailCarousel } from "@mantleui/react/motion";

const images = [
  { src: "https://picsum.photos/800/600?random=11", alt: "View one" },
  { src: "https://picsum.photos/800/600?random=12", alt: "View two" },
  { src: "https://picsum.photos/800/600?random=13", alt: "View three" },
];

<ThumbnailCarousel images={images} defaultValue={0} loop />`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={thumbnailCarouselProps} />
    </div>
  );
}
