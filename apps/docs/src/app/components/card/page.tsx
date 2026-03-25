"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Card>
  <Card.Body>
    <p style={{ color: "var(--mantle-color-text)" }}>
      A simple card with some content inside.
    </p>
  </Card.Body>
</Card>`;

const fullExample = `<Card>
  <Card.Header>
    <h3 style={{ margin: 0, fontWeight: 600, color: "var(--mantle-color-text)" }}>
      Card Title
    </h3>
    <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
      Card description goes here.
    </p>
  </Card.Header>
  <Card.Body>
    <p style={{ color: "var(--mantle-color-text)" }}>
      This is the main content area of the card. You can put any content here
      including text, images, forms, or other components.
    </p>
  </Card.Body>
  <Card.Footer>
    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </div>
  </Card.Footer>
</Card>`;

const multipleCardsExample = `<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
  <Card>
    <Card.Header>
      <h3 style={{ margin: 0, fontWeight: 600, color: "var(--mantle-color-text)" }}>Free</h3>
    </Card.Header>
    <Card.Body>
      <p style={{ fontSize: "32px", fontWeight: 700, margin: 0, color: "var(--mantle-color-text)" }}>$0</p>
      <p style={{ fontSize: "14px", color: "#64748b" }}>Perfect for getting started.</p>
    </Card.Body>
    <Card.Footer>
      <Button variant="outline" style={{ width: "100%" }}>Get Started</Button>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Header>
      <h3 style={{ margin: 0, fontWeight: 600, color: "var(--mantle-color-text)" }}>Pro</h3>
    </Card.Header>
    <Card.Body>
      <p style={{ fontSize: "32px", fontWeight: 700, margin: 0, color: "var(--mantle-color-text)" }}>$19</p>
      <p style={{ fontSize: "14px", color: "#64748b" }}>For professionals and teams.</p>
    </Card.Body>
    <Card.Footer>
      <Button style={{ width: "100%" }}>Upgrade</Button>
    </Card.Footer>
  </Card>
</div>`;

const cardProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the card container.",
  },
  {
    name: "children",
    type: "ReactNode",
    description:
      "The card content. Typically Card.Header, Card.Body, and Card.Footer.",
  },
];

const cardHeaderProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the header section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Header content.",
  },
];

const cardBodyProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the body section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Body content.",
  },
];

const cardFooterProps = [
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes for the footer section.",
  },
  {
    name: "children",
    type: "ReactNode",
    description: "Footer content.",
  },
];

export default function CardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Card</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compound container component with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Header
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Body
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Card.Footer
        </code>{" "}
        sub-components for structured content layouts.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Full Card</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A card with header, body, and footer sections.
      </p>
      <div className="mt-4">
        <LivePlayground code={fullExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Card Grid</h2>
      <div className="mt-4">
        <LivePlayground code={multipleCardsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Card Props</h2>
      <PropsTable props={cardProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Header Props</h2>
      <PropsTable props={cardHeaderProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Body Props</h2>
      <PropsTable props={cardBodyProps} />

      <h2 className="mt-10 text-xl font-semibold">Card.Footer Props</h2>
      <PropsTable props={cardFooterProps} />
    </div>
  );
}
