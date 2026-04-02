"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link href="#">Electronics</Breadcrumb.Link>
  <Breadcrumb.Separator />
  <Breadcrumb.Link active>Headphones</Breadcrumb.Link>
</Breadcrumb>`;

const customSeparatorExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Products</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Electronics</Breadcrumb.Link>
  <Breadcrumb.Separator>\u203a</Breadcrumb.Separator>
  <Breadcrumb.Link active>Headphones</Breadcrumb.Link>
</Breadcrumb>`;

const arrowSeparatorExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
  <Breadcrumb.Separator>→</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Settings</Breadcrumb.Link>
  <Breadcrumb.Separator>→</Breadcrumb.Separator>
  <Breadcrumb.Link active>Profile</Breadcrumb.Link>
</Breadcrumb>`;

const withIconsExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Home
    </span>
  </Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      Projects
    </span>
  </Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link active>
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      README.md
    </span>
  </Breadcrumb.Link>
</Breadcrumb>`;

const longPathExample = `<Breadcrumb>
  <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Documents</Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">2024</Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Q4</Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link href="#">Reports</Breadcrumb.Link>
  <Breadcrumb.Separator>/</Breadcrumb.Separator>
  <Breadcrumb.Link active>Annual Summary.pdf</Breadcrumb.Link>
</Breadcrumb>`;

const styledExample = `<div style={{
  padding: "10px 16px",
  borderRadius: "10px",
  border: "1px solid var(--mantle-color-border)",
  background: "var(--mantle-color-bg-subtle)",
  display: "inline-block",
}}>
  <Breadcrumb>
    <Breadcrumb.Link href="#">
      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Home
      </span>
    </Breadcrumb.Link>
    <Breadcrumb.Separator>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </Breadcrumb.Separator>
    <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
    <Breadcrumb.Separator>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </Breadcrumb.Separator>
    <Breadcrumb.Link active>Breadcrumb</Breadcrumb.Link>
  </Breadcrumb>
</div>`;

const breadcrumbProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "Breadcrumb links and separators.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
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

const linkProps = [
  {
    name: "href",
    type: "string",
    description: "The URL the link points to.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description:
      "Marks the link as the current page. Active links are visually distinct and not clickable.",
  },
];

const separatorProps = [
  {
    name: "children",
    type: "ReactNode",
    default: '"/"',
    description: "Custom separator character or element.",
  },
];

export default function BreadcrumbPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Breadcrumb</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A navigation component that shows the user their current location within
        a hierarchy. Built with compound components:{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Breadcrumb.Link
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Breadcrumb.Separator
        </code>
        .
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Separator</h2>
      <div className="mt-4">
        <LivePlayground code={customSeparatorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Arrow Separator</h2>
      <div className="mt-4">
        <LivePlayground code={arrowSeparatorExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Links can contain icons alongside text for better visual context.
      </p>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Long Path</h2>
      <div className="mt-4">
        <LivePlayground code={longPathExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Styled Container</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Wrap the breadcrumb in a styled card with chevron SVG separators.
      </p>
      <div className="mt-4">
        <LivePlayground code={styledExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Breadcrumb Props</h2>
      <PropsTable props={breadcrumbProps} />

      <h2 className="mt-10 text-xl font-semibold">Breadcrumb.Link Props</h2>
      <PropsTable props={linkProps} />

      <h2 className="mt-10 text-xl font-semibold">
        Breadcrumb.Separator Props
      </h2>
      <PropsTable props={separatorProps} />
    </div>
  );
}
