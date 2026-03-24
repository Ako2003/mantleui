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
];

export default function AccordionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Accordion</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        A compound component using context to share state between{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          Accordion.Item
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          Accordion.Trigger
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
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

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={accordionProps} />
    </div>
  );
}
