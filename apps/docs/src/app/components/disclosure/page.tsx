"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ maxWidth: "480px" }}>
  <Disclosure>
    <Disclosure.Trigger>Show more details</Disclosure.Trigger>
    <Disclosure.Content>
      Here are the additional details that were hidden. This content is revealed
      when the trigger is clicked.
    </Disclosure.Content>
  </Disclosure>
</div>`;

const defaultOpenExample = `<div style={{ maxWidth: "480px" }}>
  <Disclosure defaultOpen>
    <Disclosure.Trigger>Click to collapse</Disclosure.Trigger>
    <Disclosure.Content>
      This content is visible by default because defaultOpen is set to true.
    </Disclosure.Content>
  </Disclosure>
</div>`;

const controlledExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ maxWidth: "480px" }}>
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

const styledExample = `function Demo() {
  const features = [
    { icon: <Star size={18} />, label: "Themes", desc: "6 accent colors", color: "#eab308" },
    { icon: <Package size={18} />, label: "Components", desc: "72 total", color: "#3b82f6" },
    { icon: <Shield size={18} />, label: "Tests", desc: "676+ passing", color: "#22c55e" },
    { icon: <Compass size={18} />, label: "A11y", desc: "ARIA ready", color: "#8b5cf6" },
    { icon: <Moon size={18} />, label: "Dark Mode", desc: "Built-in", color: "#6366f1" },
    { icon: <Globe size={18} />, label: "Responsive", desc: "Mobile first", color: "#ef4444" },
  ];
  return (
    <div style={{ maxWidth: "400px" }}>
      <Disclosure style={{ border: "none", borderRadius: 0, overflow: "visible" }}>
        <Disclosure.Trigger style={{
          background: "linear-gradient(135deg, var(--mantle-accent-subtle), transparent)",
          border: "1px solid var(--mantle-color-border)",
          borderRadius: "12px",
          gap: "10px",
          padding: "12px 16px",
        }}>
          <Sparkles size={20} style={{ color: "var(--mantle-accent)" }} />
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>
              Preview MantleUI Components
            </div>
            <Description>Click to explore the component showcase</Description>
          </div>
        </Disclosure.Trigger>
        <Disclosure.Content style={{ borderTop: "none", padding: 0 }}>
          <Card style={{ marginTop: "8px" }}>
            <Card.Body style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {features.map((f) => (
                <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", color: f.color, flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)" }}>{f.label}</div>
                    <div style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)" }}>{f.desc}</div>
                  </div>
                </div>
              ))}
              <Separator />
              <Button style={{ width: "100%" }} endIcon={<ArrowRight size={16} />}>
                Get Started with MantleUI
              </Button>
            </Card.Body>
          </Card>
        </Disclosure.Content>
      </Disclosure>
    </div>
  );
}

render(<Demo />);`;

const faqExample = `function Demo() {
  const faqs = [
    { q: "What is MantleUI?", a: "A modern React component library with 56+ components, built with accessibility, dark mode, and clean architecture in mind." },
    { q: "Is it free to use?", a: "Yes! MantleUI is open source and free for both personal and commercial projects." },
    { q: "Does it support dark mode?", a: "Absolutely. Every component has built-in dark mode support via CSS custom properties and a ThemeProvider." },
  ];

  return (
    <div style={{ maxWidth: "480px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {faqs.map((faq) => (
        <Disclosure key={faq.q}>
          <Disclosure.Trigger>
            {faq.q}
          </Disclosure.Trigger>
          <Disclosure.Content>
            {faq.a}
          </Disclosure.Content>
        </Disclosure>
      ))}
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

      <h2 className="mt-10 text-xl font-semibold">Styled Card</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rich, visually polished disclosure with a gradient trigger and a grid
        of features inside.
      </p>
      <div className="mt-4">
        <LivePlayground code={styledExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">FAQ</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Multiple disclosures styled as a FAQ section.
      </p>
      <div className="mt-4">
        <LivePlayground code={faqExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={disclosureProps} />
    </div>
  );
}
