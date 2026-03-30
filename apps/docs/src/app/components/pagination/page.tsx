"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [page, setPage] = React.useState(1);
  return (
    <div>
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Current page: {page}
      </p>
    </div>
  );
}

render(<Demo />);`;

const siblingCountExample = `function Demo() {
  const [page, setPage] = React.useState(5);
  return (
    <Pagination page={page} totalPages={20} onPageChange={setPage} siblingCount={2} />
  );
}

render(<Demo />);`;

const colorsExample = `function Demo() {
  const [page, setPage] = React.useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Pagination page={page} totalPages={5} onPageChange={setPage} color="blue" />
      <Pagination page={page} totalPages={5} onPageChange={setPage} color="green" />
      <Pagination page={page} totalPages={5} onPageChange={setPage} color="purple" />
    </div>
  );
}

render(<Demo />);`;

const paginationProps = [
  {
    name: "page",
    type: "number",
    description: "The current active page.",
  },
  {
    name: "totalPages",
    type: "number",
    description: "Total number of pages.",
  },
  {
    name: "onPageChange",
    type: "(page: number) => void",
    description: "Called when the page changes.",
  },
  {
    name: "siblingCount",
    type: "number",
    default: "1",
    description:
      "Number of sibling pages shown on each side of the current page.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the active page indicator.",
  },
];

export default function PaginationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Pagination</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A pagination component for navigating between pages of content. Supports
        configurable sibling count and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sibling Count</h2>
      <div className="mt-4">
        <LivePlayground code={siblingCountExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={paginationProps} />
    </div>
  );
}
