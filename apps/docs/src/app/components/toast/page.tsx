"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const { toast } = useToast();
  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          variant="outline"
          onClick={() => toast.info({ title: "Info", description: "This is an informational toast." })}
        >
          Info
        </Button>
        <Button
          variant="outline"
          color="green"
          onClick={() => toast.success({ title: "Success", description: "Your changes have been saved!" })}
        >
          Success
        </Button>
        <Button
          variant="outline"
          color="yellow"
          onClick={() => toast.warning({ title: "Warning", description: "Your session is about to expire." })}
        >
          Warning
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => toast.error({ title: "Error", description: "Something went wrong." })}
        >
          Error
        </Button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

render(<Demo />);`;

const positionsExample = `function Demo() {
  const { toast } = useToast();
  const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {positions.map((pos) => (
          <Button
            key={pos}
            variant="outline"
            size="sm"
            onClick={() => toast.info({ title: pos, description: "Toast appears here." })}
          >
            {pos}
          </Button>
        ))}
      </div>
      <Toaster position="top-left" />
      <Toaster position="top-right" />
      <Toaster position="bottom-left" />
      <Toaster position="bottom-right" />
    </div>
  );
}

render(<Demo />);`;

const promiseExample = `function Demo() {
  const { toast } = useToast();

  const handleSave = () => {
    toast.info({ title: "Saving...", description: "Please wait while we save your changes." });
    setTimeout(() => {
      toast.success({ title: "Saved!", description: "Your changes have been saved successfully." });
    }, 2000);
  };

  const handleDelete = () => {
    toast.warning({ title: "Deleting...", description: "Removing item from database." });
    setTimeout(() => {
      toast.error({ title: "Failed", description: "Could not delete the item. Please try again." });
    }, 1500);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button onClick={handleSave} color="green">Save Changes</Button>
        <Button onClick={handleDelete} color="red" variant="outline">Delete Item</Button>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

render(<Demo />);`;

const customDurationExample = `function Demo() {
  const { toast } = useToast();

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.info({ title: "Quick", description: "Disappears in 2 seconds.", duration: 2000 })}
        >
          2s Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.success({ title: "Standard", description: "Disappears in 5 seconds.", duration: 5000 })}
        >
          5s Toast
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.warning({ title: "Long", description: "Stays for 10 seconds.", duration: 10000 })}
        >
          10s Toast
        </Button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

render(<Demo />);`;

const realWorldExample = `function Demo() {
  const { toast } = useToast();

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <Button
          startIcon={<Mail size={16} />}
          onClick={() => toast.success({
            title: "Email sent",
            description: "Your message has been delivered to john@example.com",
          })}
        >
          Send Email
        </Button>
        <Button
          startIcon={<Download size={16} />}
          variant="outline"
          onClick={() => toast.info({
            title: "Download started",
            description: "report-2024.pdf is being downloaded.",
          })}
        >
          Download
        </Button>
        <Button
          startIcon={<Users size={16} />}
          color="purple"
          onClick={() => toast.success({
            title: "Team member added",
            description: "Alice has been invited to your workspace.",
          })}
        >
          Invite Member
        </Button>
        <Button
          startIcon={<CreditCard size={16} />}
          color="green"
          onClick={() => toast.success({
            title: "Payment processed",
            description: "Your subscription has been renewed for $19/mo.",
          })}
        >
          Pay Now
        </Button>
        <Button
          startIcon={<Shield size={16} />}
          color="red"
          variant="outline"
          onClick={() => toast.error({
            title: "Permission denied",
            description: "You don't have access to this resource.",
          })}
        >
          Access Admin
        </Button>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

render(<Demo />);`;

const toasterProps = [
  {
    name: "position",
    type: '"top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center"',
    default: '"bottom-right"',
    description: "The position where toasts appear on screen.",
  },
];

export default function ToastPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Toast</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A notification system for brief, non-blocking feedback. Use the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useToast
        </code>{" "}
        hook to trigger toasts and render the{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          Toaster
        </code>{" "}
        component to display them.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic Usage</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Click the buttons below to trigger toasts of each variant.
      </p>
      <div className="mt-4">
        <LivePlayground code={basicExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Positions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Toasts can appear in any corner of the screen.
      </p>
      <div className="mt-4">
        <LivePlayground code={positionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Async Actions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Show a loading toast that transitions to success or error after an async
        operation.
      </p>
      <div className="mt-4">
        <LivePlayground code={promiseExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Custom Duration</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Control how long each toast stays visible.
      </p>
      <div className="mt-4">
        <LivePlayground code={customDurationExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Real-World Actions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Common application actions with contextual toast feedback.
      </p>
      <div className="mt-4">
        <LivePlayground code={realWorldExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">useToast API</h2>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        The{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          useToast()
        </code>{" "}
        hook returns an object with the following methods:
      </p>
      <ul className="mt-2 list-inside list-disc text-sm text-slate-600 dark:text-zinc-400">
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.info({ title, description, duration })"}
          </code>{" "}
          &mdash; Show an info toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.success({ title, description, duration })"}
          </code>{" "}
          &mdash; Show a success toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.warning({ title, description, duration })"}
          </code>{" "}
          &mdash; Show a warning toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            {"toast.error({ title, description, duration })"}
          </code>{" "}
          &mdash; Show an error toast
        </li>
        <li>
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
            dismiss(id)
          </code>{" "}
          &mdash; Dismiss a toast by its ID
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Toaster Props</h2>
      <PropsTable props={toasterProps} />
    </div>
  );
}
