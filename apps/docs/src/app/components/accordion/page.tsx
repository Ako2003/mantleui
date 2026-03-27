"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Accordion defaultValue={["item-1"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>What is MantleUI?</Accordion.Trigger>
    <Accordion.Content>
      A React component library showcasing modern design patterns and accessibility.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes! Full WAI-ARIA support with keyboard navigation baked in.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Can multiple items be open?</Accordion.Trigger>
    <Accordion.Content>
      Set the multiple prop to true to allow multiple items open simultaneously.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const multipleExample = `<Accordion multiple defaultValue={["item-1", "item-2"]}>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Section 1</Accordion.Trigger>
    <Accordion.Content>Content for section 1.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Section 2</Accordion.Trigger>
    <Accordion.Content>Content for section 2.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Section 3</Accordion.Trigger>
    <Accordion.Content>Content for section 3.</Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const faqExample = `<Accordion>
  <Accordion.Item value="order">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <ShoppingCart size={18} />
        How do I place an order?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      Browse our catalog, add items to your cart, and proceed to checkout. You can pay with credit card, PayPal, or Apple Pay.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="modify">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <ClipboardEdit size={18} />
        Can I modify or cancel my order?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      Yes, you can modify or cancel your order within 1 hour of placing it. Go to your order history and select the order you want to change.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="payment">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <CreditCard size={18} />
        What payment methods do you accept?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers for orders over $500.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="shipping">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Package size={18} />
        How much does shipping cost?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      Standard shipping is free on orders over $50. Express shipping is $9.99, and overnight delivery is $19.99.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="international">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Globe size={18} />
        Do you ship internationally?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      Yes! We ship to over 50 countries. International shipping rates and delivery times vary by destination. See our shipping page for details.
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="refund">
    <Accordion.Trigger>
      <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <RefreshCw size={18} />
        How do I request a refund?
      </span>
    </Accordion.Trigger>
    <Accordion.Content>
      You can request a refund within 30 days of delivery. Visit your order history, select the item, and click "Request Refund". Refunds are processed within 5-7 business days.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>`;

const withColorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <Accordion color="blue" defaultValue={["info"]}>
    <Accordion.Item value="info">
      <Accordion.Trigger>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Info size={18} />
          Information
        </span>
      </Accordion.Trigger>
      <Accordion.Content>
        This is an informational accordion section with the blue accent color.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
  <Accordion color="green" defaultValue={["success"]}>
    <Accordion.Item value="success">
      <Accordion.Trigger>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <CheckCircle size={18} />
          Success
        </span>
      </Accordion.Trigger>
      <Accordion.Content>
        Everything is working correctly. This uses the green accent color.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
  <Accordion color="red" defaultValue={["warning"]}>
    <Accordion.Item value="warning">
      <Accordion.Trigger>
        <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <AlertTriangle size={18} />
          Warning
        </span>
      </Accordion.Trigger>
      <Accordion.Content>
        Please review this section carefully. Uses the red accent color.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
</div>`;

const accordionProps = [
  {
    name: "value",
    type: "string[]",
    description: "The currently open item values (controlled).",
  },
  {
    name: "defaultValue",
    type: "string[]",
    default: "[]",
    description: "The initially open item values (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: string[]) => void",
    description: "Called when open items change.",
  },
  {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Whether multiple items can be open at once.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
    default: '"blue"',
    description: "Accent color for focus rings.",
  },
];

export default function AccordionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Accordion</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compound component using context to share state between{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Accordion.Item
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Accordion.Trigger
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Accordion.Content
        </code>
        .
      </p>

      <h2 className="mt-10 text-xl font-semibold">Single Mode</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Multiple Mode</h2>
      <div className="mt-4">
        <LivePlayground code={multipleExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">FAQ with Icons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A polished FAQ section using Lucide icons alongside each question.
      </p>
      <div className="mt-4">
        <LivePlayground code={faqExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Colors</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Accordions with different accent colors for contextual sections.
      </p>
      <div className="mt-4">
        <LivePlayground code={withColorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={accordionProps} />
    </div>
  );
}
