"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Tooltip>
  <Tooltip.Trigger>
    <Button variant="outline">Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Content>This is a tooltip</Tooltip.Content>
</Tooltip>`;

const sideExample = `<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">Top</Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="top">Tooltip on top</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">Bottom</Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="bottom">Tooltip on bottom</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">Left</Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="left">Tooltip on left</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">Right</Button>
    </Tooltip.Trigger>
    <Tooltip.Content side="right">Tooltip on right</Tooltip.Content>
  </Tooltip>
</div>`;

const delayExample = `<div style={{ display: "flex", gap: "12px" }}>
  <Tooltip delayMs={0}>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">No delay</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Instant tooltip</Tooltip.Content>
  </Tooltip>
  <Tooltip delayMs={500}>
    <Tooltip.Trigger>
      <Button variant="outline" size="sm">500ms delay</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Delayed tooltip</Tooltip.Content>
  </Tooltip>
</div>`;

const tooltipProps = [
  {
    name: "delayMs",
    type: "number",
    default: "300",
    description: "Delay in milliseconds before the tooltip appears on hover.",
  },
];

const tooltipContentProps = [
  {
    name: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "The preferred side of the trigger to render the tooltip.",
  },
];

export default function TooltipPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Tooltip</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A compound tooltip component using{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Tooltip.Trigger
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Tooltip.Content
        </code>{" "}
        to display contextual information on hover.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Placement</h2>
      <div className="mt-4">
        <LivePlayground code={sideExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Delay</h2>
      <div className="mt-4">
        <LivePlayground code={delayExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Tooltip Props</h2>
      <PropsTable props={tooltipProps} />

      <h2 className="mt-10 text-xl font-semibold">Tooltip.Content Props</h2>
      <PropsTable props={tooltipContentProps} />
    </div>
  );
}
