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

const withIconsExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="ghost" startIcon={<Heart size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Add to favorites</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="ghost" startIcon={<Bookmark size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Save for later</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="ghost" startIcon={<Download size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Download file</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button variant="ghost" startIcon={<Trash2 size={16} />} color="red" />
    </Tooltip.Trigger>
    <Tooltip.Content>Delete item</Tooltip.Content>
  </Tooltip>
</div>`;

const toolbarExample = `<div style={{
  display: "inline-flex",
  gap: "2px",
  padding: "4px",
  borderRadius: "10px",
  background: "var(--mantle-color-bg-muted)",
}}>
  <Tooltip delayMs={200}>
    <Tooltip.Trigger>
      <Button variant="ghost" size="sm" startIcon={<Bold size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Bold (Ctrl+B)</Tooltip.Content>
  </Tooltip>
  <Tooltip delayMs={200}>
    <Tooltip.Trigger>
      <Button variant="ghost" size="sm" startIcon={<Italic size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Italic (Ctrl+I)</Tooltip.Content>
  </Tooltip>
  <Tooltip delayMs={200}>
    <Tooltip.Trigger>
      <Button variant="ghost" size="sm" startIcon={<Underline size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Underline (Ctrl+U)</Tooltip.Content>
  </Tooltip>
  <Tooltip delayMs={200}>
    <Tooltip.Trigger>
      <Button variant="ghost" size="sm" startIcon={<Strikethrough size={16} />} />
    </Tooltip.Trigger>
    <Tooltip.Content>Strikethrough</Tooltip.Content>
  </Tooltip>
</div>`;

const avatarTooltipExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Tooltip>
    <Tooltip.Trigger>
      <Avatar name="Alice Johnson" size="md" />
    </Tooltip.Trigger>
    <Tooltip.Content>Alice Johnson — Online</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Avatar name="Bob Smith" size="md" />
    </Tooltip.Trigger>
    <Tooltip.Content>Bob Smith — Away</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Avatar name="Carol Lee" size="md" />
    </Tooltip.Trigger>
    <Tooltip.Content>Carol Lee — Offline</Tooltip.Content>
  </Tooltip>
</div>`;

const disabledButtonExample = `<div style={{ display: "flex", gap: "12px" }}>
  <Tooltip>
    <Tooltip.Trigger>
      <span style={{ display: "inline-block" }}>
        <Button disabled>Can't click me</Button>
      </span>
    </Tooltip.Trigger>
    <Tooltip.Content>This action is currently unavailable</Tooltip.Content>
  </Tooltip>
  <Tooltip>
    <Tooltip.Trigger>
      <Button>Enabled</Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Click to proceed</Tooltip.Content>
  </Tooltip>
</div>`;

const tooltipProps = [
  {
    name: "delayMs",
    type: "number",
    default: "300",
    description: "Delay in milliseconds before the tooltip appears on hover.",
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

      <h2 className="mt-10 text-xl font-semibold">Icon Buttons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Tooltips are essential for icon-only buttons to communicate their
        purpose.
      </p>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Toolbar</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A formatting toolbar with tooltips showing keyboard shortcuts.
      </p>
      <div className="mt-4">
        <LivePlayground code={toolbarExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Avatar Tooltips</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Show user details on hover over avatars.
      </p>
      <div className="mt-4">
        <LivePlayground code={avatarTooltipExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Disabled Button</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Wrap a disabled button in a{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          {"<span>"}
        </code>{" "}
        so the tooltip trigger can still receive hover events.
      </p>
      <div className="mt-4">
        <LivePlayground code={disabledButtonExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Tooltip Props</h2>
      <PropsTable props={tooltipProps} />

      <h2 className="mt-10 text-xl font-semibold">Tooltip.Content Props</h2>
      <PropsTable props={tooltipContentProps} />
    </div>
  );
}
