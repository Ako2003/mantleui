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
  return (
    <div style={{ maxWidth: "400px" }}>
      <Disclosure style={{ border: "none", borderRadius: 0, overflow: "visible" }}>
        <Disclosure.Trigger style={{
          padding: 0,
          background: "linear-gradient(135deg, var(--mantle-accent-subtle), transparent)",
          border: "1px solid var(--mantle-color-border)",
          borderRadius: "12px",
          gap: "10px",
          padding: "12px 16px",
        }}>
          <span style={{ fontSize: "20px" }}>✨</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>
              Preview MantleUI Components
            </div>
            <div style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)", marginTop: "2px" }}>
              Click to explore the component showcase
            </div>
          </div>
        </Disclosure.Trigger>
        <Disclosure.Content style={{ borderTop: "none", padding: 0 }}>
          <div style={{
            marginTop: "8px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid var(--mantle-color-border)",
            backdropFilter: "blur(12px)",
            background: "var(--mantle-color-bg-subtle)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[
                { icon: "🎨", label: "Themes", desc: "6 colors" },
                { icon: "🧩", label: "Components", desc: "56 total" },
                { icon: "✅", label: "Tests", desc: "651 passing" },
                { icon: "♿", label: "A11y", desc: "ARIA ready" },
                { icon: "🌙", label: "Dark Mode", desc: "Built-in" },
                { icon: "📱", label: "Responsive", desc: "Mobile first" },
              ].map((item) => (
                <div key={item.label} style={{
                  textAlign: "center",
                  padding: "12px 8px",
                  borderRadius: "8px",
                  border: "1px solid var(--mantle-color-border)",
                  background: "var(--mantle-color-bg-muted)",
                }}>
                  <div style={{ fontSize: "24px" }}>{item.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--mantle-color-text)", marginTop: "6px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--mantle-color-text-muted)", marginTop: "2px" }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "16px",
              padding: "12px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--mantle-accent), var(--mantle-accent-hover))",
              color: "white",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}>
              Get Started with MantleUI →
            </div>
          </div>
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
