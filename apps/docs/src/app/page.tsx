export default function HomePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight">MantleUI</h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-zinc-400">
        A modern React component library built to showcase frontend
        architecture, design patterns, and technical craftsmanship.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <FeatureCard
          title="Design Patterns"
          description="Compound components, render props, headless hooks, polymorphic components, and controlled/uncontrolled patterns."
        />
        <FeatureCard
          title="Accessible by Default"
          description="WAI-ARIA compliant with keyboard navigation, screen reader support, and focus management built in."
        />
        <FeatureCard
          title="Type Safe"
          description="Strict TypeScript throughout. Polymorphic components with correct prop inference for any element type."
        />
        <FeatureCard
          title="Zero Runtime CSS"
          description="CSS Modules with CSS custom properties for theming. No JavaScript overhead for styles."
        />
      </div>

      <h2 className="mt-14 text-2xl font-semibold">Form</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ComponentLink
          href="/components/input"
          name="Input"
          pattern="Label / Error / Icons"
        />
        <ComponentLink
          href="/components/checkbox"
          name="Checkbox"
          pattern="Indeterminate"
        />
        <ComponentLink
          href="/components/switch"
          name="Switch"
          pattern="Toggle Switch"
        />
        <ComponentLink
          href="/components/select"
          name="Select"
          pattern="Custom Dropdown"
        />
        <ComponentLink
          href="/components/toggle"
          name="Toggle"
          pattern="Controlled / Uncontrolled"
        />
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Interactive</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ComponentLink
          href="/components/button"
          name="Button"
          pattern="Polymorphic"
        />
        <ComponentLink
          href="/components/accordion"
          name="Accordion"
          pattern="Compound"
        />
        <ComponentLink
          href="/components/tabs"
          name="Tabs"
          pattern="Compound + Roving Tabindex"
        />
        <ComponentLink
          href="/components/popover"
          name="Popover"
          pattern="Headless Hook"
        />
        <ComponentLink
          href="/components/data-table"
          name="DataTable"
          pattern="All Patterns"
        />
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Feedback</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ComponentLink
          href="/components/badge"
          name="Badge"
          pattern="Variants + Colors"
        />
        <ComponentLink
          href="/components/alert"
          name="Alert"
          pattern="Info / Success / Warning / Error"
        />
        <ComponentLink
          href="/components/toast"
          name="Toast"
          pattern="Global Notifications"
        />
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Layout</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ComponentLink href="/components/card" name="Card" pattern="Compound" />
        <ComponentLink
          href="/components/avatar"
          name="Avatar"
          pattern="Image + Initials"
        />
        <ComponentLink
          href="/components/separator"
          name="Separator"
          pattern="Divider"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 p-5 dark:border-zinc-800">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function ComponentLink({
  href,
  name,
  pattern,
}: {
  href: string;
  name: string;
  pattern: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
    >
      <span className="font-medium">{name}</span>
      <span className="text-xs text-slate-500 dark:text-zinc-500">
        {pattern}
      </span>
    </a>
  );
}
