"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const verticalExample = `<ScrollShadow maxHeight="200px">
  <div style={{ padding: "16px" }}>
    <p>Line 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Line 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Line 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
    <p>Line 4: Duis aute irure dolor in reprehenderit in voluptate velit.</p>
    <p>Line 5: Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
    <p>Line 6: Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
    <p>Line 7: Neque porro quisquam est, qui dolorem ipsum quia dolor.</p>
    <p>Line 8: Ut enim ad minima veniam, quis nostrum exercitationem.</p>
    <p>Line 9: Quis autem vel eum iure reprehenderit qui in ea voluptate.</p>
    <p>Line 10: At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
  </div>
</ScrollShadow>`;

const horizontalExample = `<ScrollShadow orientation="horizontal" maxWidth="300px">
  <div style={{ display: "flex", gap: "16px", padding: "16px", whiteSpace: "nowrap" }}>
    <Button variant="outline">Item 1</Button>
    <Button variant="outline">Item 2</Button>
    <Button variant="outline">Item 3</Button>
    <Button variant="outline">Item 4</Button>
    <Button variant="outline">Item 5</Button>
    <Button variant="outline">Item 6</Button>
    <Button variant="outline">Item 7</Button>
    <Button variant="outline">Item 8</Button>
  </div>
</ScrollShadow>`;

const scrollShadowProps = [
  {
    name: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Scroll direction for the shadow indicators.",
  },
  {
    name: "maxHeight",
    type: "string",
    description:
      "Maximum height of the scrollable area (for vertical scrolling).",
  },
  {
    name: "maxWidth",
    type: "string",
    description:
      "Maximum width of the scrollable area (for horizontal scrolling).",
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

export default function ScrollShadowPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ScrollShadow</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A scrollable container that displays shadow indicators at the edges when
        content overflows.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Vertical Scroll</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Horizontal Scroll</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={scrollShadowProps} />
    </div>
  );
}
