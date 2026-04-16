"use client";

import { LivePlayground } from "@/components/LazyPlayground";
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
  {
    name: "--mantle-bg",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the background color via style. e.g. style={{ "--mantle-bg": "#1a1a2e" }}',
  },
  {
    name: "--mantle-border",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the border color via style. Set to "transparent" to remove. e.g. style={{ "--mantle-border": "#e94560" }}',
  },
  {
    name: "--mantle-text",
    type: "CSS variable",
    default: "theme default",
    description:
      'Override the text color via style. e.g. style={{ "--mantle-text": "#ffffff" }}',
  },
  {
    name: "--mantle-ring",
    type: "CSS variable",
    default: "accent",
    description:
      'Override the focus ring color via style. e.g. style={{ "--mantle-ring": "#e94560" }}',
  },
  {
    name: "--mantle-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the hover background via style. Set to "none" to disable. e.g. style={{ "--mantle-hover": "none" }}',
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
