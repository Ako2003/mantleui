"use client";

import { BentoGrid } from "@mantleui/react/motion";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const bentoGridProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Grid cells. Typically a list of `BentoGrid.Item`s.",
  },
  {
    name: "columns",
    type: "number",
    default: "4",
    description: "Number of columns in the grid.",
  },
  {
    name: "gap",
    type: "number",
    default: "16",
    description: "Gap between cells in pixels.",
  },
];

const bentoGridItemProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Cell content.",
  },
  {
    name: "colSpan",
    type: "number",
    default: "1",
    description: "Number of columns the cell should span.",
  },
  {
    name: "rowSpan",
    type: "number",
    default: "1",
    description: "Number of rows the cell should span.",
  },
];

function CellIcon({ path }: { path: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export default function BentoGridPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">BentoGrid</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A composable grid layout inspired by bento boxes. Combine cells of
        different sizes with <code>colSpan</code> and <code>rowSpan</code> to
        build rich, editorial-style layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A 4-column bento grid with mixed cell sizes.
      </p>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <BentoGrid columns={4} gap={16}>
          <BentoGrid.Item rowSpan={1}>
            <div className="flex h-full min-h-full w-full flex-col justify-between rounded-xl bg-gradient-to-br from-zinc-800 to-black p-5 text-white">
              <CellIcon path="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              <div>
                <h3 className="text-xl font-bold">Dark Mode</h3>
                {/* <p className="text-sm text-white/80">
                  First-class light and dark themes.
                </p> */}
              </div>
            </div>
          </BentoGrid.Item>
          <BentoGrid.Item colSpan={2}>
            <div className="flex h-32 w-full flex-col justify-between rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white">
              <CellIcon path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              <div>
                <h3 className="text-xl font-bold">Fast</h3>
                <p className="text-sm text-white/80">
                  Hardware-accelerated animations.
                </p>
              </div>
            </div>
          </BentoGrid.Item>
          <BentoGrid.Item>
            <div className="flex h-32 w-full flex-col justify-between rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-5 text-white">
              <CellIcon path="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6v4m0 4h.01" />
              <h3 className="text-lg font-bold">Accessible</h3>
            </div>
          </BentoGrid.Item>
          <BentoGrid.Item colSpan={3}>
            <div className="flex h-32 w-full flex-col justify-between rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 p-5 text-white">
              <CellIcon path="M22 12h-4l-3 9L9 3l-3 9H2" />
              <h3 className="text-lg font-bold">Animated</h3>
            </div>
          </BentoGrid.Item>
          <BentoGrid.Item colSpan={1}>
            <div className="flex h-32 w-full flex-col justify-between rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 p-5 text-white">
              <CellIcon path="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              <h3 className="text-lg font-bold">Tested</h3>
            </div>
          </BentoGrid.Item>
        </BentoGrid>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { BentoGrid } from "@mantleui/react/motion";

<BentoGrid columns={4} gap={16}>
  <BentoGrid.Item colSpan={2}>
    <Card>Fast</Card>
  </BentoGrid.Item>
  <BentoGrid.Item>
    <Card>Accessible</Card>
  </BentoGrid.Item>
  <BentoGrid.Item>
    <Card>TypeSafe</Card>
  </BentoGrid.Item>
  <BentoGrid.Item rowSpan={2}>
    <Card>Dark Mode</Card>
  </BentoGrid.Item>
  <BentoGrid.Item colSpan={2}>
    <Card>Animated</Card>
  </BentoGrid.Item>
  <BentoGrid.Item>
    <Card>Tested</Card>
  </BentoGrid.Item>
</BentoGrid>`}
      />

      <h2 className="mt-10 text-xl font-semibold">BentoGrid props</h2>
      <PropsTable props={bentoGridProps} />

      <h2 className="mt-10 text-xl font-semibold">BentoGrid.Item props</h2>
      <PropsTable props={bentoGridItemProps} />
    </div>
  );
}
