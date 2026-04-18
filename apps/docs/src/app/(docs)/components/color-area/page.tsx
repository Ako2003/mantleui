"use client";

import { LivePlayground } from "@/components/LazyPlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `function Demo() {
  const [sat, setSat] = React.useState(80);
  const [bri, setBri] = React.useState(90);
  return (
    <ColorArea
      hue={220}
      saturation={sat}
      brightness={bri}
      onColorChange={(s, b) => { setSat(s); setBri(b); }}
    />
  );
}

render(<Demo />);`;

const controlledExample = `function Demo() {
  const [sat, setSat] = React.useState(50);
  const [bri, setBri] = React.useState(50);
  return (
    <div>
      <ColorArea
        hue={220}
        saturation={sat}
        brightness={bri}
        onColorChange={(s, b) => { setSat(s); setBri(b); }}
      />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text-muted)" }}>
        Saturation: {sat} | Brightness: {bri}
      </p>
    </div>
  );
}

render(<Demo />);`;

const sizeExample = `function Demo() {
  const [s1, setS1] = React.useState(70);
  const [b1, setB1] = React.useState(80);
  const [s2, setS2] = React.useState(60);
  const [b2, setB2] = React.useState(70);
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <ColorArea hue={0} size={120} saturation={s1} brightness={b1} onColorChange={(s, b) => { setS1(s); setB1(b); }} />
      <ColorArea hue={120} size={200} saturation={s2} brightness={b2} onColorChange={(s, b) => { setS2(s); setB2(b); }} />
    </div>
  );
}

render(<Demo />);`;

const colorAreaProps = [
  {
    name: "hue",
    type: "number",
    description: "The hue value (0-360) that determines the base color.",
  },
  {
    name: "saturation",
    type: "number",
    description: "The saturation value (0-100) on the x-axis (controlled).",
  },
  {
    name: "brightness",
    type: "number",
    description: "The brightness value (0-100) on the y-axis (controlled).",
  },
  {
    name: "onSaturationChange",
    type: "(value: number) => void",
    description: "Called when the saturation changes.",
  },
  {
    name: "onBrightnessChange",
    type: "(value: number) => void",
    description: "Called when the brightness changes.",
  },
  {
    name: "size",
    type: "number",
    default: "160",
    description: "Width and height of the color area in pixels.",
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

export default function ColorAreaPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorArea</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A two-dimensional color picker area for selecting saturation and
        brightness at a given hue.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizeExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorAreaProps} />
    </div>
  );
}
