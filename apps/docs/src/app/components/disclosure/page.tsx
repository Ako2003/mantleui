"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Disclosure>
  <Disclosure.Trigger>Show more details</Disclosure.Trigger>
  <Disclosure.Content>
    Here are the additional details that were hidden. This content is revealed
    when the trigger is clicked.
  </Disclosure.Content>
</Disclosure>`;

const defaultOpenExample = `<Disclosure defaultOpen>
  <Disclosure.Trigger>Click to collapse</Disclosure.Trigger>
  <Disclosure.Content>
    This content is visible by default because defaultOpen is set to true.
  </Disclosure.Content>
</Disclosure>`;

const controlledExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        State: {open ? "Open" : "Closed"}
      </div>
      <Disclosure open={open} onOpenChange={setOpen}>
        <Disclosure.Trigger>Toggle details</Disclosure.Trigger>
        <Disclosure.Content>
          This disclosure is fully controlled via the open and onOpenChange props.
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}

render(<Demo />);`;

const disclosureProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the disclosure is expanded (controlled).",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "The initial expanded state (uncontrolled).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the expanded state changes.",
  },
];

export default function DisclosurePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Disclosure</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        An expand/collapse component using{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Disclosure.Trigger
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Disclosure.Content
        </code>{" "}
        to show and hide content.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Default Open</h2>
      <div className="mt-4">
        <LivePlayground code={defaultOpenExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={disclosureProps} />
    </div>
  );
}
