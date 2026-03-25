"use client";

import { LivePlayground } from "@/components/LivePlayground";
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
