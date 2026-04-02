"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const hueExample = `<div style={{ maxWidth: "320px" }}>
  <ColorSlider channel="hue" defaultValue={180} />
</div>`;

const saturationExample = `<div style={{ maxWidth: "320px" }}>
  <ColorSlider channel="saturation" defaultValue={50} />
</div>`;

const lightnessExample = `<div style={{ maxWidth: "320px" }}>
  <ColorSlider channel="lightness" defaultValue={50} />
</div>`;

const controlledExample = `function Demo() {
  const [hue, setHue] = React.useState(200);
  return (
    <div style={{ maxWidth: "320px" }}>
      <ColorSlider channel="hue" value={hue} onValueChange={setHue} />
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Hue: {hue}
      </p>
    </div>
  );
}

render(<Demo />);`;

const colorSliderProps = [
  {
    name: "channel",
    type: '"hue" | "saturation" | "lightness"',
    description: "The color channel this slider controls.",
  },
  {
    name: "value",
    type: "number",
    description: "The current value (controlled).",
  },
  {
    name: "defaultValue",
    type: "number",
    description: "The initial value (uncontrolled).",
  },
  {
    name: "onValueChange",
    type: "(value: number) => void",
    description: "Called when the value changes.",
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

export default function ColorSliderPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ColorSlider</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A slider for adjusting a single color channel such as hue, saturation,
        or lightness.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Hue</h2>
      <div className="mt-4">
        <LivePlayground code={hueExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Saturation</h2>
      <div className="mt-4">
        <LivePlayground code={saturationExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Lightness</h2>
      <div className="mt-4">
        <LivePlayground code={lightnessExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={colorSliderProps} />
    </div>
  );
}
