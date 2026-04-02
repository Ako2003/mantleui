"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const horizontalExample = `<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
  <Button variant="outline">Right</Button>
</ButtonGroup>`;

const verticalExample = `<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <ButtonGroup color="blue">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
  <ButtonGroup color="red">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
  <ButtonGroup color="green">
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
</div>`;

const pillExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", flexWrap: "wrap" }}>
  <ButtonGroup pill divider>
    <Button variant="outline" startIcon={<ChevronLeft size={16} />}>Previous</Button>
    <Button variant="outline" endIcon={<ChevronRight size={16} />}>Next</Button>
  </ButtonGroup>
  <ButtonGroup pill divider>
    <Button variant="outline" color="purple" startIcon={<Image size={16} />}>Photos</Button>
    <Button variant="outline" color="purple" startIcon={<Video size={16} />}>Videos</Button>
    <Button variant="outline" color="purple" startIcon={<MoreHorizontal size={16} />} />
  </ButtonGroup>
  <ButtonGroup pill divider>
    <Button variant="outline" color="green">Left</Button>
    <Button variant="outline" color="green">Center</Button>
    <Button variant="outline" color="green">Right</Button>
  </ButtonGroup>
  <ButtonGroup pill divider>
    <Button variant="outline" startIcon={<AlignLeft size={16} />} />
    <Button variant="outline" startIcon={<AlignCenter size={16} />} />
    <Button variant="outline" startIcon={<AlignRight size={16} />} />
    <Button variant="outline" startIcon={<AlignJustify size={16} />} />
  </ButtonGroup>
</div>`;

const splitButtonExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px", flexWrap: "wrap" }}>
  {/* Merge pull request — split with dropdown */}
  <ButtonGroup pill>
    <Button color="blue">Merge pull request</Button>
    <Dropdown>
      <Dropdown.Trigger style={{ background: "var(--mantle-accent)", borderColor: "var(--mantle-accent)", color: "white" }}>
        <ChevronDown size={16} />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Create a merge commit</Dropdown.Item>
        <Dropdown.Item>Squash and merge</Dropdown.Item>
        <Dropdown.Item>Rebase and merge</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonGroup>

  {/* Fork with count and dropdown */}
  <ButtonGroup pill divider>
    <Button variant="outline" startIcon={<GitFork size={14} />}>Fork</Button>
    <Button variant="outline" color="purple">24</Button>
    <Dropdown>
      <Dropdown.Trigger style={{ borderColor: "var(--mantle-color-border)", color: "var(--mantle-color-text)" }}>
        <ChevronDown size={14} />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Fork to my account</Dropdown.Item>
        <Dropdown.Item>Fork to organization</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonGroup>

  {/* Star with count */}
  <ButtonGroup pill divider>
    <Button variant="outline" color="yellow" startIcon={<Star size={14} />}>Star</Button>
    <Button variant="outline" color="yellow">104</Button>
  </ButtonGroup>

  {/* Thumbs up / down */}
  <ButtonGroup pill divider>
    <Button variant="outline" color="green" startIcon={<ThumbsUp size={14} />}>2.4K</Button>
    <Button variant="outline" color="red" startIcon={<ThumbsDown size={14} />} />
  </ButtonGroup>

  {/* QR code + label */}
  <ButtonGroup pill divider>
    <Button variant="outline" startIcon={<QrCode size={14} />} />
    <Button variant="outline">Scan to pay</Button>
  </ButtonGroup>

  {/* Pinned with dropdown */}
  <ButtonGroup pill divider>
    <Button variant="outline" color="purple" startIcon={<Pin size={14} />}>Pinned</Button>
    <Dropdown>
      <Dropdown.Trigger style={{ borderColor: "var(--mantle-color-border)", color: "var(--mantle-color-text)" }}>
        <ChevronDown size={14} />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Unpin</Dropdown.Item>
        <Dropdown.Item>Move to top</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </ButtonGroup>
</div>`;

const buttonGroupProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the button group.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size applied to all buttons in the group.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    description: "Variant applied to all buttons in the group.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color applied to all buttons in the group.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes.",
  },
  {
    name: "pill",
    type: "boolean",
    default: "false",
    description: "Use fully rounded (pill) corners.",
  },
  {
    name: "divider",
    type: "boolean",
    default: "false",
    description: "Show divider lines between buttons.",
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

export default function ButtonGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ButtonGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        Groups multiple buttons together with shared styling and connected
        borders. Supports horizontal and vertical orientations.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Horizontal</h2>
      <div className="mt-4">
        <LivePlayground code={horizontalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Pill Shape</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          pill
        </code>{" "}
        for fully rounded corners and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          divider
        </code>{" "}
        to show separator lines between buttons.
      </p>
      <div className="mt-4">
        <LivePlayground code={pillExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Split Buttons</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Combine actions with dropdowns, counters, and icon-only segments.
      </p>
      <div className="mt-4">
        <LivePlayground code={splitButtonExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={buttonGroupProps} />
    </div>
  );
}
