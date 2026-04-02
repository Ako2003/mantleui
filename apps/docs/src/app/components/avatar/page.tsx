"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const withImageExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <Avatar src="https://i.pravatar.cc/150?u=jane" alt="Jane Doe" />
  <Avatar src="https://i.pravatar.cc/150?u=john" alt="John Smith" />
  <Avatar src="https://i.pravatar.cc/150?u=alex" alt="Alex Chen" />
</div>`;

const withInitialsExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <Avatar name="Jane Doe" />
  <Avatar name="John Smith" />
  <Avatar name="Alex Chen" />
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <Avatar name="SM" size="sm" />
  <Avatar name="MD" size="md" />
  <Avatar name="LG" size="lg" />
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
  <Avatar name="BL" color="blue" />
  <Avatar name="RD" color="red" />
  <Avatar name="GR" color="green" />
  <Avatar name="YL" color="yellow" />
  <Avatar name="PR" color="purple" />
  <Avatar name="NT" color="neutral" />
</div>`;

const avatarProps = [
  {
    name: "src",
    type: "string",
    description: "URL of the avatar image.",
  },
  {
    name: "alt",
    type: "string",
    description: "Alt text for the avatar image.",
  },
  {
    name: "name",
    type: "string",
    description: "Name used to generate initials when no image is provided.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Background color for the initials fallback.",
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

export default function AvatarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Avatar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A circular avatar component that displays a user image or falls back to
        generated initials from the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          name
        </code>{" "}
        prop.
      </p>

      <h2 className="mt-10 text-xl font-semibold">With Image</h2>
      <div className="mt-4">
        <LivePlayground code={withImageExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Initials</h2>
      <div className="mt-4">
        <LivePlayground code={withInitialsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={avatarProps} />
    </div>
  );
}
