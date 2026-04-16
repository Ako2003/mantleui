"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <Modal.Header>Modal Title</Modal.Header>
          <Modal.Body>
            <p>This is the modal body content. You can place any content here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const longContentExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <Modal.Header>Terms of Service</Modal.Header>
          <Modal.Body>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>Decline</Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const welcomeExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Welcome Modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <div style={{ position: "relative", padding: "32px 24px 24px" }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "var(--mantle-color-bg-muted)", border: "none",
                borderRadius: "9999px", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--mantle-color-text-muted)",
              }}
            >
              <X size={16} />
            </button>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "var(--mantle-color-bg-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px",
            }}>
              <Rocket size={24} style={{ color: "var(--mantle-accent)" }} />
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--mantle-color-text)", margin: 0 }}>
              Welcome to MantleUI
            </h2>
            <p style={{ fontSize: "14px", color: "var(--mantle-color-text-muted)", marginTop: "8px", lineHeight: 1.6 }}>
              A beautiful, fast, and modern React UI library for building accessible and customizable web applications with ease.
            </p>
            <Button
              onClick={() => setOpen(false)}
              style={{ width: "100%", marginTop: "24px" }}
              size="lg"
            >
              Continue
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const successExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="green" onClick={() => setOpen(true)}>Payment Success</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <div style={{ padding: "32px 24px 24px", textAlign: "center" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "9999px",
              background: "var(--mantle-color-bg-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <ShieldCheck size={28} style={{ color: "#22c55e" }} />
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--mantle-color-text)", margin: 0 }}>
              Payment Successful
            </h2>
            <p style={{ fontSize: "14px", color: "var(--mantle-color-text-muted)", marginTop: "8px", lineHeight: 1.6 }}>
              Your payment of $49.99 has been processed successfully. A confirmation email has been sent to your inbox.
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                style={{ flex: 1 }}
              >
                View Receipt
              </Button>
              <Button
                color="green"
                onClick={() => setOpen(false)}
                style={{ flex: 1 }}
              >
                Done
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const upgradeExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="purple" onClick={() => setOpen(true)}>Upgrade Plan</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content>
          <div style={{ position: "relative", padding: "32px 24px 24px" }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "var(--mantle-color-bg-muted)", border: "none",
                borderRadius: "9999px", width: "32px", height: "32px",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--mantle-color-text-muted)",
              }}
            >
              <X size={16} />
            </button>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "var(--mantle-color-bg-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "20px",
            }}>
              <Sparkles size={24} style={{ color: "#8b5cf6" }} />
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "var(--mantle-color-text)", margin: 0 }}>
              Upgrade to Pro
            </h2>
            <p style={{ fontSize: "14px", color: "var(--mantle-color-text-muted)", marginTop: "8px", lineHeight: 1.6 }}>
              Unlock advanced features and priority support.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
              {["Unlimited projects", "Priority support", "Custom domains", "Advanced analytics"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
                  <Check size={16} style={{ color: "#8b5cf6" }} />
                  {f}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                style={{ flex: 1 }}
              >
                Maybe Later
              </Button>
              <Button
                color="purple"
                onClick={() => setOpen(false)}
                style={{ flex: 1 }}
              >
                Upgrade — $19/mo
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const backdropExample = `function Demo() {
  const [opaqueOpen, setOpaqueOpen] = React.useState(false);
  const [blurOpen, setBlurOpen] = React.useState(false);
  const [transparentOpen, setTransparentOpen] = React.useState(false);
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Button onClick={() => setOpaqueOpen(true)}>Opaque</Button>
      <Modal open={opaqueOpen} onOpenChange={setOpaqueOpen} backdrop="opaque">
        <Modal.Content>
          <Modal.Header>Opaque Backdrop</Modal.Header>
          <Modal.Body>
            The default dark overlay that blocks the background content.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpaqueOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Button variant="outline" onClick={() => setBlurOpen(true)}>Blur</Button>
      <Modal open={blurOpen} onOpenChange={setBlurOpen} backdrop="blur">
        <Modal.Content>
          <Modal.Header>Blur Backdrop</Modal.Header>
          <Modal.Body>
            A frosted glass effect that blurs the background while keeping it partially visible.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setBlurOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Button variant="ghost" onClick={() => setTransparentOpen(true)}>Transparent</Button>
      <Modal open={transparentOpen} onOpenChange={setTransparentOpen} backdrop="transparent">
        <Modal.Content>
          <Modal.Header>Transparent Backdrop</Modal.Header>
          <Modal.Body>
            No backdrop — the background is fully visible. Click outside to close.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setTransparentOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}

render(<Demo />);`;

const modalProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the modal is open (controlled).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
  },
  {
    name: "backdrop",
    type: '"opaque" | "blur" | "transparent"',
    default: '"opaque"',
    description: "Backdrop style behind the modal.",
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

const contentProps = [
  {
    name: "children",
    type: "ReactNode",
    description:
      "Modal content, typically Modal.Header, Modal.Body, and Modal.Footer.",
  },
];

const headerProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The header title content.",
  },
];

const bodyProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The main body content of the modal.",
  },
];

const footerProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The footer content, typically action buttons.",
  },
];

export default function ModalPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Modal</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A dialog overlay that focuses the user&apos;s attention on a specific
        task or piece of information. Composed with Modal.Content, Modal.Header,
        Modal.Body, and Modal.Footer.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button below to open a modal with a header, body, and footer.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Scrollable Content</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        When the body content is long, it scrolls automatically.
      </p>
      <div className="mt-4">
        <LivePlayground code={longContentExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Welcome</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        An onboarding modal with icon, description, and a full-width CTA button.
      </p>
      <div className="mt-4">
        <LivePlayground code={welcomeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Success</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A centered confirmation modal for successful actions.
      </p>
      <div className="mt-4">
        <LivePlayground code={successExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Upgrade</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A pricing/upgrade modal with feature checklist.
      </p>
      <div className="mt-4">
        <LivePlayground code={upgradeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Backdrop</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Three backdrop styles: opaque (dark overlay), blur (frosted glass), and
        transparent (no backdrop).
      </p>
      <div className="mt-4">
        <LivePlayground code={backdropExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Modal Props</h2>
      <PropsTable props={modalProps} />

      <h2 className="mt-10 text-xl font-semibold">Modal.Content Props</h2>
      <PropsTable props={contentProps} />

      <h2 className="mt-10 text-xl font-semibold">Modal.Header Props</h2>
      <PropsTable props={headerProps} />

      <h2 className="mt-10 text-xl font-semibold">Modal.Body Props</h2>
      <PropsTable props={bodyProps} />

      <h2 className="mt-10 text-xl font-semibold">Modal.Footer Props</h2>
      <PropsTable props={footerProps} />
    </div>
  );
}
