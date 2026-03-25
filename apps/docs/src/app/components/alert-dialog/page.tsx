"use client";

import { LivePlayground } from "@/components/LivePlayground";
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
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral"',
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
