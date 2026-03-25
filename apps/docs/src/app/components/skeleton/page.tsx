"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Skeleton width="100%" height="20px" />
  <Skeleton width="80%" height="20px" />
  <Skeleton width="60%" height="20px" />
</div>`;

const shapesExample = `<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
  <Skeleton width="48px" height="48px" rounded="full" />
  <Skeleton width="48px" height="48px" rounded="md" />
  <Skeleton width="48px" height="48px" rounded="none" />
</div>`;

const cardExample = `<div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
  <Skeleton width="48px" height="48px" rounded="full" />
  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
    <Skeleton width="140px" height="16px" />
    <Skeleton width="200px" height="14px" />
    <Skeleton width="100%" height="60px" rounded="md" />
  </div>
</div>`;

const noAnimateExample = `<Skeleton width="100%" height="20px" animate={false} />`;

const skeletonProps = [
  {
    name: "width",
    type: "string | number",
    default: '"100%"',
    description: "Width of the skeleton element.",
  },
  {
    name: "height",
    type: "string | number",
    default: '"20px"',
    description: "Height of the skeleton element.",
  },
  {
    name: "rounded",
    type: '"none" | "sm" | "md" | "lg" | "full"',
    default: '"sm"',
    description: "Border radius.",
  },
  {
    name: "animate",
    type: "boolean",
    default: "true",
    description: "Whether the skeleton shows a loading animation.",
  },
];

export default function SkeletonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Skeleton</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A placeholder loading element that mimics the shape of content while it
        loads.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Shapes</h2>
      <div className="mt-4">
        <LivePlayground code={shapesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Card Placeholder</h2>
      <div className="mt-4">
        <LivePlayground code={cardExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Without Animation</h2>
      <div className="mt-4">
        <LivePlayground code={noAnimateExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={skeletonProps} />
    </div>
  );
}
