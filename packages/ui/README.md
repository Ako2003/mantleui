# @mantleui/react

A production-grade React component library with 73+ components, dark mode, full TypeScript support, and zero CSS-in-JS runtime. Every color, border, background, and hover effect is customizable via CSS variables.

[![CI](https://github.com/Ako2003/mantleui/actions/workflows/ci.yml/badge.svg)](https://github.com/Ako2003/mantleui/actions)
[![npm](https://img.shields.io/npm/v/@mantleui/react)](https://www.npmjs.com/package/@mantleui/react)

**[Live Docs & Playground](https://mantleui.vercel.app)** · **[GitHub](https://github.com/Ako2003/mantleui)**

---

## Install

```bash
npm install @mantleui/react
# or
pnpm add @mantleui/react
```

## Quick Start

```tsx
import { Button, ThemeProvider } from "@mantleui/react";
import "@mantleui/react/styles.css";

function App() {
  return (
    <ThemeProvider>
      <Button color="blue" variant="solid">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

> **`<ThemeProvider>`** handles dark mode automatically — it detects system preference, persists to localStorage, and sets `data-theme` on `<html>`. All components respond instantly.

## What's Inside

### 73+ Components

| Category          | Components                                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form**          | Input, TextField, TextArea, NumberField, Select, MultiSelect, Autocomplete, ComboBox, Checkbox, RadioGroup, Switch, Slider, DatePicker, DateRangePicker, TimeField, SearchField, InputGroup, InputOTP, Form, Fieldset |
| **Interactive**   | Button, ButtonGroup, Toggle, ToggleButton, ToggleButtonGroup, Accordion, Tabs, Popover, Tooltip, Dropdown, Modal, Drawer, Disclosure, Toolbar                                                                         |
| **Feedback**      | Alert, AlertDialog, Toast, Badge, Spinner, ProgressBar, ProgressCircle, Meter, Skeleton                                                                                                                               |
| **Data**          | DataTable, DataField, ListBox, TagGroup, Chip, Kbd, Calendar, RadioCalendar                                                                                                                                           |
| **Navigation**    | Breadcrumb, Pagination, Link                                                                                                                                                                                          |
| **Layout**        | Card, Surface, Avatar, Separator, ScrollShadow                                                                                                                                                                        |
| **Color**         | ColorPicker, ColorArea, ColorSlider, ColorField, ColorSwatch, ColorSwatchPicker                                                                                                                                       |
| **3D / Advanced** | Globe, ParticleField, Card3D, WaveField, Vortex, DNAHelix, MorphingSphere, StarField, Aurora, GridPlane, WorldMap                                                                                                     |

### 6 Accent Colors + Custom Hex

```tsx
// Built-in presets
<Button color="blue">Blue</Button>
<Button color="red">Red</Button>
<Button color="green">Green</Button>
<Button color="yellow">Yellow</Button>
<Button color="purple">Purple</Button>
<Button color="neutral">Neutral</Button>

// Any custom hex
<Button color="#e94560">Custom</Button>
<Slider color="#ff6b35" defaultValue={50} />
```

### Full CSS Variable Customization

Every component respects these overridable CSS variables:

```tsx
<Button
  style={{
    "--mantle-bg": "#1a1a2e",
    "--mantle-border": "#e94560",
    "--mantle-text": "#ffffff",
    "--mantle-ring": "#e94560",
    "--mantle-hover": "linear-gradient(135deg, #e94560, #533483)",
  }}
>
  Fully Custom
</Button>

// Disable hover effect
<Button style={{ "--mantle-hover": "none" }}>No Hover</Button>
```

| Variable                | Controls                                      |
| ----------------------- | --------------------------------------------- |
| `--mantle-bg`           | Background color                              |
| `--mantle-border`       | Border color                                  |
| `--mantle-text`         | Text color                                    |
| `--mantle-ring`         | Focus ring color                              |
| `--mantle-hover`        | Hover background (set to `"none"` to disable) |
| `--mantle-option-hover` | Dropdown/list item hover                      |

### Dark Mode — Built In

```tsx
import { ThemeProvider, useTheme } from "@mantleui/react";

// Wrap your app once
<ThemeProvider>
  <App />
</ThemeProvider>;

// Toggle anywhere
function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
    />
  );
}
```

ThemeProvider auto-detects `prefers-color-scheme`, persists to `localStorage`, and is SSR-safe via `useSyncExternalStore`.

## Design Patterns

### Compound Components

```tsx
<Accordion>
  <Accordion.Item value="faq-1">
    <Accordion.Trigger>What is MantleUI?</Accordion.Trigger>
    <Accordion.Content>A React component library.</Accordion.Content>
  </Accordion.Item>
</Accordion>

<Tabs defaultValue="tab-1">
  <Tabs.List>
    <Tabs.Trigger value="tab-1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab-2">Settings</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab-1">Account settings</Tabs.Content>
  <Tabs.Content value="tab-2">App settings</Tabs.Content>
</Tabs>
```

### Controlled & Uncontrolled

Every stateful component works both ways:

```tsx
// Uncontrolled — just works
<Select defaultValue="react" options={options} />

// Controlled — full control
<Select value={value} onValueChange={setValue} options={options} />
```

### Headless Hooks

```tsx
import { usePopover, useDataTable, useToast } from "@mantleui/react";

// Full rendering control
const { isOpen, triggerProps, contentProps } = usePopover();
const { toast } = useToast();

toast.success({ title: "Saved!", description: "Changes saved." });
```

### Polymorphic `as` Prop

```tsx
<Button as="a" href="/about">I'm a link</Button>
<Button as="span">I'm a span</Button>
```

### `asChild` for Trigger Composition

```tsx
<Popover>
  <Popover.Trigger asChild>
    <Button>Open Popover</Button>
  </Popover.Trigger>
  <Popover.Content>Content here</Popover.Content>
</Popover>
```

## 3D Components

Optional Three.js-powered components via a separate entry point:

```bash
npm install three @react-three/fiber @react-three/drei
```

```tsx
import { Globe, ParticleField, Card3D } from "@mantleui/react/three";

<Globe
  markers={[{ lat: 40.7, lng: -74, label: "NYC" }]}
  arcs={[{ startLat: 40.7, startLng: -74, endLat: 51.5, endLng: -0.1 }]}
/>

<ParticleField count={200} color="#8b5cf6" connections />

<Card3D maxTilt={15} glare>
  <h3>Hover me — I tilt in 3D</h3>
</Card3D>
```

Three.js deps are **optional peer dependencies** — they won't be installed unless you use the 3D components.

## Accessibility

- WCAG 2.1 Level A compliant
- Full keyboard navigation (Arrow keys, Tab, Enter, Escape)
- ARIA attributes on all interactive components
- Focus-visible outlines everywhere
- `prefers-reduced-motion` support — all animations disabled
- Screen reader tested

## Technical Details

- **Zero runtime CSS** — plain CSS with `mantle-` prefixed classes
- **SSR-safe** — all components guard `document`/`window` access
- **Tree-shakeable** — ESM + CJS builds, import only what you use
- **Strict TypeScript** — no `any`, full prop inference, polymorphic types
- **676+ tests** — Vitest + React Testing Library
- **React 18 & 19** compatible

## Browser Support

Chrome, Firefox, Safari, Edge — last 2 versions.

## License

MIT
