"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Switch label="Airplane mode" />`;

const withLabelExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <Switch label="Dark mode" defaultChecked />
  <Switch label="Notifications" />
  <Switch label="Auto-update" disabled />
</div>`;

const sizesExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Switch size="sm" label="Small" defaultChecked />
  <Switch size="md" label="Medium" defaultChecked />
  <Switch size="lg" label="Large" defaultChecked />
</div>`;

const colorsExample = `<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
  <Switch color="blue" defaultChecked label="Blue" />
  <Switch color="red" defaultChecked label="Red" />
  <Switch color="green" defaultChecked label="Green" />
  <Switch color="yellow" defaultChecked label="Yellow" />
  <Switch color="purple" defaultChecked label="Purple" />
  <Switch color="neutral" defaultChecked label="Neutral" />
</div>`;

const withThumbIconExample = `<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
  <Switch
    label="Dark mode"
    thumbIcon={<Moon size={12} />}
    defaultChecked
  />
  <Switch
    label="Notifications"
    thumbIcon={<Bell size={12} />}
    color="green"
    defaultChecked
  />
  <Switch
    label="Wi-Fi"
    thumbIcon={<Wifi size={12} />}
    color="purple"
  />
</div>`;

const withDescriptionExample = `<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
  <Switch
    label="Marketing emails"
    description="Receive emails about new products, features, and promotions."
    defaultChecked
  />
  <Switch
    label="Security alerts"
    description="Get notified about unusual account activity."
    defaultChecked
    color="green"
  />
  <Switch
    label="Beta features"
    description="Try experimental features before they are released."
    color="purple"
  />
</div>`;

const controlledExample = `function Demo() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Switch checked={enabled} onCheckedChange={setEnabled} label="Wi-Fi" />
      <span style={{ fontSize: "14px", color: "var(--mantle-color-text)" }}>
        {enabled ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
}

render(<Demo />);`;

const switchProps = [
  {
    name: "checked",
    type: "boolean",
    description: "Whether the switch is on (controlled).",
  },
  {
    name: "defaultChecked",
    type: "boolean",
    default: "false",
    description: "The initial on/off state (uncontrolled).",
  },
  {
    name: "onCheckedChange",
    type: "(checked: boolean) => void",
    description: "Called when the switch state changes.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color when the switch is on.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "label",
    type: "string",
    description: "Label text displayed next to the switch.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the switch.",
  },
  {
    name: "description",
    type: "ReactNode",
    description: "Description text displayed below the label.",
  },
  {
    name: "thumbIcon",
    type: "ReactNode",
    description: "Icon displayed inside the switch thumb.",
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

export default function SwitchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Switch</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A toggle switch for boolean settings, supporting controlled and
        uncontrolled modes with multiple sizes and colors.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Labels</h2>
      <div className="mt-4">
        <LivePlayground code={withLabelExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Thumb Icon</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Display an icon inside the switch thumb that reflects the toggle state.
      </p>
      <div className="mt-4">
        <LivePlayground code={withThumbIconExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Description</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Add descriptive text below the label for additional context.
      </p>
      <div className="mt-4">
        <LivePlayground code={withDescriptionExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={switchProps} />
    </div>
  );
}
