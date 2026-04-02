"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Link href="#">This is a link</Link>`;

const colorsExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <Link href="#" color="blue">Blue</Link>
  <Link href="#" color="red">Red</Link>
  <Link href="#" color="green">Green</Link>
  <Link href="#" color="purple">Purple</Link>
  <Link href="#" color="neutral">Neutral</Link>
</div>`;

const externalExample = `<Link href="https://example.com" external>
  External link
</Link>`;

const underlineExample = `<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
  <Link href="#" underline="always">Always</Link>
  <Link href="#" underline="hover">Hover</Link>
  <Link href="#" underline="none">None</Link>
</div>`;

const linkProps = [
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color.",
  },
  {
    name: "external",
    type: "boolean",
    default: "false",
    description: "Opens the link in a new tab and shows an external link icon.",
  },
  {
    name: "underline",
    type: '"always" | "hover" | "none"',
    default: '"hover"',
    description: "Controls when the underline is visible.",
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
];

export default function LinkPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Link</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A styled anchor element with color, external link, and underline
        options.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">External</h2>
      <div className="mt-4">
        <LivePlayground code={externalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Underline</h2>
      <div className="mt-4">
        <LivePlayground code={underlineExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={linkProps} />
    </div>
  );
}
