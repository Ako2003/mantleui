"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
  <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
</div>`;

const shortcutsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
    <span style={{ width: "80px", fontSize: "14px" }}>Copy</span>
    <Kbd>⌘</Kbd> + <Kbd>C</Kbd>
  </div>
  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
    <span style={{ width: "80px", fontSize: "14px" }}>Paste</span>
    <Kbd>⌘</Kbd> + <Kbd>V</Kbd>
  </div>
  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
    <span style={{ width: "80px", fontSize: "14px" }}>Undo</span>
    <Kbd>⌘</Kbd> + <Kbd>Z</Kbd>
  </div>
  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
    <span style={{ width: "80px", fontSize: "14px" }}>Save</span>
    <Kbd>⌘</Kbd> + <Kbd>S</Kbd>
  </div>
</div>`;

const inlineExample = `<p style={{ fontSize: "14px" }}>
  Press <Kbd>Enter</Kbd> to submit, or <Kbd>Esc</Kbd> to cancel.
</p>`;

const kbdProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The keyboard key label to display.",
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

export default function KbdPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Kbd</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Displays a keyboard key or shortcut in a styled inline element.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Keyboard Shortcuts</h2>
      <div className="mt-4">
        <LivePlayground code={shortcutsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Inline Usage</h2>
      <div className="mt-4">
        <LivePlayground code={inlineExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={kbdProps} />
    </div>
  );
}
