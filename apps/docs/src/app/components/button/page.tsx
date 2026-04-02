"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <Button variant="solid">Solid</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`;

const loadingExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Button loading>Saving...</Button>
  <Button variant="outline" loading>Loading</Button>
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <Button color="blue">Blue</Button>
  <Button color="red">Red</Button>
  <Button color="green">Green</Button>
  <Button color="yellow">Yellow</Button>
  <Button color="purple">Purple</Button>
  <Button color="neutral">Neutral</Button>
</div>`;

const colorsOutlineExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <Button color="blue" variant="outline">Blue</Button>
  <Button color="red" variant="outline">Red</Button>
  <Button color="green" variant="outline">Green</Button>
  <Button color="yellow" variant="outline">Yellow</Button>
  <Button color="purple" variant="outline">Purple</Button>
  <Button color="neutral" variant="outline">Neutral</Button>
</div>`;

const withIconsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <Button startIcon={<Search size={16} />}>Search</Button>
  <Button startIcon={<Download size={16} />} variant="outline">Download</Button>
  <Button endIcon={<ArrowRight size={16} />}>Continue</Button>
  <Button startIcon={<Plus size={16} />} color="green">Create New</Button>
  <Button startIcon={<Trash2 size={16} />} color="red" variant="outline">Delete</Button>
  <Button startIcon={<Settings size={16} />} variant="ghost">Settings</Button>
</div>`;

const polymorphicExample = `<div style={{ display: "flex", gap: "8px" }}>
  <Button as="a" href="#" variant="solid">As Link</Button>
  <Button as="span" variant="outline">As Span</Button>
</div>`;

const socialLoginExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "380px" }}>
  <Button
    variant="outline"
    color="neutral"
    size="lg"
    startIcon={
      <svg width="18" height="18" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    }
  >
    Sign in with Google
  </Button>
  <Button
    variant="outline"
    color="neutral"
    size="lg"
    startIcon={
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    }
  >
    Sign in with GitHub
  </Button>
  <Button
    variant="outline"
    color="neutral"
    size="lg"
    startIcon={
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    }
  >
    Sign in with Apple
  </Button>
</div>`;

const customStylingExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
  <Button
    style={{
      "--mantle-bg": "#1a1a2e",
      "--mantle-border": "#e94560",
      "--mantle-text": "#e94560",
      "--mantle-hover": "#e94560",
      "--mantle-ring": "#e94560",
    }}
  >
    Cyberpunk
  </Button>
  <Button
    style={{
      "--mantle-bg": "#0f3460",
      "--mantle-border": "#16213e",
      "--mantle-text": "#e0e0e0",
      "--mantle-hover": "linear-gradient(135deg, #0f3460, #533483)",
      "--mantle-ring": "#533483",
    }}
  >
    Deep Space
  </Button>
  <Button
    style={{
      "--mantle-bg": "transparent",
      "--mantle-border": "transparent",
      "--mantle-text": "var(--mantle-accent)",
      "--mantle-hover": "none",
    }}
  >
    No border, no hover
  </Button>
</div>`;

const buttonProps = [
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"solid"',
    description: "Visual style variant.",
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
    description: "Accent color.",
  },
  {
    name: "loading",
    type: "boolean",
    default: "false",
    description: "Shows a loading spinner and disables interaction.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the button.",
  },
  {
    name: "as",
    type: "ElementType",
    default: '"button"',
    description: "The element type to render as.",
  },
  {
    name: "startIcon",
    type: "ReactNode",
    description: "Element placed before the label.",
  },
  {
    name: "endIcon",
    type: "ReactNode",
    description: "Element placed after the label.",
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
  {
    name: "--mantle-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the hover background via style. Set to "none" to disable. e.g. style={{ "--mantle-hover": "none" }}',
  },
];

export default function ButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Button</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A polymorphic button component that can render as any element type via
        the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          as
        </code>{" "}
        prop.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors (Outline)</h2>
      <div className="mt-4">
        <LivePlayground code={colorsOutlineExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Loading State</h2>
      <div className="mt-4">
        <LivePlayground code={loadingExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Polymorphic</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          as
        </code>{" "}
        prop to render as a different element while keeping all Button styles
        and behavior.
      </p>
      <div className="mt-4">
        <LivePlayground code={polymorphicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Social Login</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Full-width social sign-in buttons with brand icons.
      </p>
      <div className="mt-4">
        <LivePlayground code={socialLoginExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Styling</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Override any color with CSS variables. All components support{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-bg
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-border
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-text
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-ring
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          --mantle-hover
        </code>
        .
      </p>
      <div className="mt-4">
        <LivePlayground code={customStylingExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={buttonProps} />
    </div>
  );
}
