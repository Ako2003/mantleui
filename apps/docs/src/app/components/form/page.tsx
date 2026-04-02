"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
        <TextField label="Name" placeholder="Enter your name" />
        <TextField label="Email" placeholder="Enter your email" />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
}

render(<Demo />);`;

const signUpExample = `function Demo() {
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };
  return (
    <Card style={{ maxWidth: "400px" }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "18px", color: "var(--mantle-color-text)" }}>Create Account</h3>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>Sign up to get started</p>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "flex", gap: "12px" }}>
              <TextField label="First name" placeholder="John" style={{ flex: 1 }} />
              <TextField label="Last name" placeholder="Doe" style={{ flex: 1 }} />
            </div>
            <TextField label="Email" placeholder="john@example.com" startIcon={<Mail size={16} />} />
            <TextField label="Password" placeholder="Min. 8 characters" type="password" startIcon={<Lock size={16} />} />
            <Checkbox label="I agree to the Terms and Privacy Policy" />
            <Button type="submit" style={{ width: "100%" }} disabled={submitted}>
              {submitted ? "Account Created!" : "Create Account"}
            </Button>
            <Separator />
            <p style={{ margin: 0, textAlign: "center", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>
              Already have an account? <Link href="#">Sign in</Link>
            </p>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

render(<Demo />);`;

const contactFormExample = `function Demo() {
  const [status, setStatus] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };
  return (
    <Card style={{ maxWidth: "420px" }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "18px", color: "var(--mantle-color-text)" }}>Contact Us</h3>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>We will get back to you within 24 hours</p>
      </Card.Header>
      <Card.Body>
        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircle size={48} style={{ color: "#22c55e", margin: "0 auto 12px" }} />
            <p style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "var(--mantle-color-text)" }}>Message Sent!</p>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--mantle-color-text-muted)" }}>Thank you for reaching out.</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <TextField label="Name" placeholder="Your name" />
              <TextField label="Email" placeholder="you@example.com" />
              <Select
                label="Topic"
                placeholder="Select a topic"
                options={[
                  { value: "general", label: "General Inquiry" },
                  { value: "support", label: "Technical Support" },
                  { value: "billing", label: "Billing Question" },
                  { value: "feedback", label: "Feedback" },
                ]}
              />
              <TextArea label="Message" placeholder="Tell us how we can help..." rows={4} />
              <Button type="submit" style={{ width: "100%" }} disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

render(<Demo />);`;

const settingsFormExample = `function Demo() {
  const [saved, setSaved] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  return (
    <Card style={{ maxWidth: "460px" }}>
      <Card.Header>
        <h3 style={{ margin: 0, fontWeight: 600, fontSize: "18px", color: "var(--mantle-color-text)" }}>Profile Settings</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar name="Jane Doe" size="lg" />
              <div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>
            </div>
            <Separator />
            <div style={{ display: "flex", gap: "12px" }}>
              <TextField label="Display name" defaultValue="Jane Doe" style={{ flex: 1 }} />
              <TextField label="Username" defaultValue="janedoe" style={{ flex: 1 }} />
            </div>
            <TextArea label="Bio" defaultValue="Senior Frontend Engineer. Passionate about design systems." rows={3} />
            <Separator />
            <h4 style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "var(--mantle-color-text)" }}>Notifications</h4>
            <Switch label="Email notifications" description="Receive email about account activity" defaultChecked />
            <Switch label="Marketing emails" description="Receive tips and product updates" />
            <Separator />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button variant="outline" color="neutral">Cancel</Button>
              <Button type="submit">{saved ? "Saved!" : "Save Changes"}</Button>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

render(<Demo />);`;

const formProps = [
  {
    name: "onSubmit",
    type: "(event: FormEvent) => void",
    description: "Called when the form is submitted.",
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

export default function FormPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Form</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A form wrapper component that handles submit events. Use it to group
        form fields and manage submission logic.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sign Up</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A registration form with name fields, email, password, checkbox consent,
        and a sign-in link.
      </p>
      <div className="mt-4">
        <LivePlayground code={signUpExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Contact Form</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A contact form with topic select, textarea, and a success state after
        submission.
      </p>
      <div className="mt-4">
        <LivePlayground code={contactFormExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Profile Settings</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        An account settings page with avatar, bio, notification toggles, and
        save/cancel actions.
      </p>
      <div className="mt-4">
        <LivePlayground code={settingsFormExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={formProps} />
    </div>
  );
}
