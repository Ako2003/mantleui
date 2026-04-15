"use client";

import dynamic from "next/dynamic";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const ImageCompare = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.ImageCompare),
  { ssr: false },
);

const imageCompareProps = [
  {
    name: "beforeImage",
    type: "string",
    description: 'URL of the "before" image (shown fully underneath).',
  },
  {
    name: "afterImage",
    type: "string",
    description: 'URL of the "after" image (clipped by the slider).',
  },
  {
    name: "beforeAlt",
    type: "string",
    description: "Alt text for the before image.",
  },
  {
    name: "afterAlt",
    type: "string",
    description: "Alt text for the after image.",
  },
  {
    name: "defaultPosition",
    type: "number",
    default: "50",
    description: "Initial slider position in percent (0-100).",
  },
  {
    name: "height",
    type: "number | string",
    default: "400",
    description: "Height of the compare area.",
  },
  {
    name: "handleColor",
    type: "string",
    default: '"#ffffff"',
    description: "Color of the draggable handle.",
  },
];

export default function ImageComparePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ImageCompare</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A before/after image slider with a draggable handle. Drag or click
        anywhere on the image to reveal more of the before or after state.
        Perfect for showcasing edits, redesigns, or transformations.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Drag the handle left or right to compare the two images.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <ImageCompare
          beforeImage="https://picsum.photos/id/1018/1200/600"
          afterImage="https://picsum.photos/id/1025/1200/600"
          beforeAlt="Mountain landscape"
          afterAlt="Dog portrait"
          height={400}
          defaultPosition={50}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom handle color</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Tailor the handle color to match your brand.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <ImageCompare
          beforeImage="https://picsum.photos/id/1018/1200/600"
          afterImage="https://picsum.photos/id/1025/1200/600"
          beforeAlt="Mountain landscape"
          afterAlt="Dog portrait"
          height={320}
          defaultPosition={40}
          handleColor="#f97316"
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { ImageCompare } from "@mantleui/react/motion";

<ImageCompare
  beforeImage="/before.jpg"
  afterImage="/after.jpg"
  beforeAlt="Original"
  afterAlt="Edited"
  height={400}
  defaultPosition={50}
/>`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={imageCompareProps} />
    </div>
  );
}
