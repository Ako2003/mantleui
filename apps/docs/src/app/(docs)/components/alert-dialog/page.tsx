"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="red" onClick={() => setOpen(true)}>Delete Account</Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Content
          title="Delete account"
          description="This action cannot be undone. This will permanently delete your account and remove all of your data from our servers."
        >
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "16px" }}>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action color="red">Delete</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}

render(<Demo />);`;

const successExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="green" onClick={() => setOpen(true)}>
        <CheckCircle size={16} />
        Complete Order
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Content
          title="Order placed successfully!"
          description="Your order #12345 has been confirmed. You will receive a confirmation email shortly with tracking details."
        >
          <AlertDialog.Action color="green">View Order</AlertDialog.Action>
          <AlertDialog.Cancel>Close</AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}

render(<Demo />);`;

const warningExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button color="yellow" variant="outline" onClick={() => setOpen(true)}>
        <AlertTriangle size={16} />
        Unsaved Changes
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Content
          title="Unsaved changes"
          description="You have unsaved changes that will be lost if you leave this page. Do you want to save your changes before leaving?"
        >
          <AlertDialog.Cancel>Stay on page</AlertDialog.Cancel>
          <AlertDialog.Action color="neutral">Discard</AlertDialog.Action>
          <AlertDialog.Action color="blue">Save changes</AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}

render(<Demo />);`;

const infoExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Info size={16} />
        Privacy Policy
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Content
          title="Privacy Policy Updated"
          description="We've updated our privacy policy to comply with new data protection regulations. Key changes include enhanced data encryption, new user consent requirements, and improved data portability options."
        >
          <AlertDialog.Cancel>Remind me later</AlertDialog.Cancel>
          <AlertDialog.Action color="blue">Accept & Continue</AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>
    </div>
  );
}

render(<Demo />);`;

const dangerExample = `function Demo() {
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);
  return (
    <div>
      <Button color="red" variant="outline" onClick={() => setOpen(true)}>
        <Trash2 size={16} />
        Delete Project
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialog.Content
          title="Delete project permanently?"
          description="This will permanently delete the project 'MantleUI' and all associated data including 56 components, 651 tests, and 50 documentation pages. This action cannot be undone."
        >
          <AlertDialog.Cancel>Keep Project</AlertDialog.Cancel>
          <AlertDialog.Action color="red" onClick={() => setConfirmed(true)}>
            Delete Forever
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>
      {confirmed && (
        <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-danger)" }}>
          Project deleted. (Just kidding, this is a demo!)
        </p>
      )}
    </div>
  );
}

render(<Demo />);`;

const allVariantsExample = `function Demo() {
  const [active, setActive] = React.useState(null);
  const dialogs = [
    { id: "success", color: "green", icon: CheckCircle, title: "Payment successful", desc: "Your payment of $49.99 has been processed. A receipt has been sent to your email.", action: "View Receipt", cancel: "Done", trigger: "Success Dialog" },
    { id: "info", color: "blue", icon: Info, title: "New feature available", desc: "We've added a new dark mode feature. Would you like to enable it now?", action: "Enable", cancel: "Maybe Later", trigger: "Info Dialog" },
    { id: "warning", color: "yellow", icon: AlertTriangle, title: "Session expiring", desc: "Your session will expire in 5 minutes due to inactivity. Would you like to extend it?", action: "Extend Session", cancel: "Log Out", trigger: "Warning Dialog" },
    { id: "error", color: "red", icon: AlertCircle, title: "Upload failed", desc: "The file 'report.pdf' could not be uploaded. The file exceeds the maximum size of 10MB.", action: "Try Again", cancel: "Cancel", trigger: "Error Dialog" },
  ];

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {dialogs.map((d) => (
        <div key={d.id}>
          <Button color={d.color} variant="outline" onClick={() => setActive(d.id)}>
            <d.icon size={16} />
            {d.trigger}
          </Button>
          <AlertDialog open={active === d.id} onOpenChange={(open) => !open && setActive(null)}>
            <AlertDialog.Content title={d.title} description={d.desc}>
              <AlertDialog.Cancel>{d.cancel}</AlertDialog.Cancel>
              <AlertDialog.Action color={d.color}>{d.action}</AlertDialog.Action>
            </AlertDialog.Content>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
}

render(<Demo />);`;

const alertDialogProps = [
  {
    name: "open",
    type: "boolean",
    description: "Whether the dialog is open (controlled).",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Called when the open state changes.",
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
    name: "title",
    type: "string",
    description: "The title displayed at the top of the dialog.",
  },
  {
    name: "description",
    type: "string",
    description: "Descriptive text displayed below the title.",
  },
];

const actionProps = [
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color for the action button.",
  },
];

const cancelProps = [
  {
    name: "children",
    type: "ReactNode",
    description: "The label for the cancel button.",
  },
];

export default function AlertDialogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">AlertDialog</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A modal dialog that interrupts the user with important content and
        expects a response. Commonly used for destructive action confirmations.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the button below to open a confirmation dialog.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Success Confirmation</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A positive confirmation after completing an action.
      </p>
      <div className="mt-4">
        <LivePlayground code={successExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Unsaved Changes</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A warning dialog with multiple actions — save, discard, or stay.
      </p>
      <div className="mt-4">
        <LivePlayground code={warningExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Info / Policy</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        An informational dialog requiring user acknowledgment.
      </p>
      <div className="mt-4">
        <LivePlayground code={infoExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Destructive Action</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A high-stakes deletion confirmation with detailed consequences.
      </p>
      <div className="mt-4">
        <LivePlayground code={dangerExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">All Variants</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Four dialog types side by side — success, info, warning, and error.
      </p>
      <div className="mt-4">
        <LivePlayground code={allVariantsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">AlertDialog Props</h2>
      <PropsTable props={alertDialogProps} />

      <h2 className="mt-10 text-xl font-semibold">AlertDialog.Content Props</h2>
      <PropsTable props={contentProps} />

      <h2 className="mt-10 text-xl font-semibold">AlertDialog.Action Props</h2>
      <PropsTable props={actionProps} />

      <h2 className="mt-10 text-xl font-semibold">AlertDialog.Cancel Props</h2>
      <PropsTable props={cancelProps} />
    </div>
  );
}
