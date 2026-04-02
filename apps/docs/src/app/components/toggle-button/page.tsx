"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<div style={{ display: "flex", gap: "8px" }}>
  <ToggleButton>Default</ToggleButton>
  <ToggleButton defaultPressed>Pressed</ToggleButton>
</div>`;

const variantsExample = `<div style={{ display: "flex", gap: "8px" }}>
  <ToggleButton variant="solid" defaultPressed>Solid</ToggleButton>
  <ToggleButton variant="outline" defaultPressed>Outline</ToggleButton>
  <ToggleButton variant="ghost" defaultPressed>Ghost</ToggleButton>
</div>`;

const colorsExample = `<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
  <ToggleButton color="blue" defaultPressed>Blue</ToggleButton>
  <ToggleButton color="green" defaultPressed>Green</ToggleButton>
  <ToggleButton color="red" defaultPressed>Red</ToggleButton>
  <ToggleButton color="purple" defaultPressed>Purple</ToggleButton>
  <ToggleButton color="neutral" defaultPressed>Neutral</ToggleButton>
</div>`;

const sizesExample = `<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  <ToggleButton size="sm" defaultPressed>Small</ToggleButton>
  <ToggleButton size="md" defaultPressed>Medium</ToggleButton>
  <ToggleButton size="lg" defaultPressed>Large</ToggleButton>
</div>`;

const controlledExample = `function Demo() {
  const [pressed, setPressed] = React.useState(false);
  return (
    <div>
      <ToggleButton pressed={pressed} onPressedChange={setPressed}>
        {pressed ? "On" : "Off"}
      </ToggleButton>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--mantle-color-text)" }}>
        Pressed: {pressed ? "true" : "false"}
      </p>
    </div>
  );
}

render(<Demo />);`;

const withIconsExample = `function Demo() {
  const [fav, setFav] = React.useState(true);
  const [like, setLike] = React.useState(false);
  const [save, setSave] = React.useState(false);
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <ToggleButton pressed={fav} onPressedChange={setFav} startIcon={<Star size={16} fill={fav ? "currentColor" : "none"} />} color="yellow" variant="solid">Favorite</ToggleButton>
      <ToggleButton pressed={like} onPressedChange={setLike} startIcon={<Heart size={16} fill={like ? "currentColor" : "none"} />} color="red" variant="solid">Like</ToggleButton>
      <ToggleButton pressed={save} onPressedChange={setSave} startIcon={<Bookmark size={16} fill={save ? "currentColor" : "none"} />} color="blue" variant="solid">Save</ToggleButton>
    </div>
  );
}

render(<Demo />);`;

const iconOnlyExample = `function Demo() {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [starred, setStarred] = React.useState(true);
  const [pinned, setPinned] = React.useState(false);

  const circleStyle = {
    borderRadius: "9999px",
    width: "44px",
    height: "44px",
    padding: 0,
  };

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <ToggleButton
        pressed={liked}
        onPressedChange={setLiked}
        color="red"
        variant="solid"
        style={circleStyle}
      >
        <Heart size={20} fill={liked ? "currentColor" : "none"} />
      </ToggleButton>
      <ToggleButton
        pressed={saved}
        onPressedChange={setSaved}
        color="blue"
        style={circleStyle}
      >
        <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
      </ToggleButton>
      <ToggleButton
        pressed={starred}
        onPressedChange={setStarred}
        color="yellow"
        variant="solid"
        style={circleStyle}
      >
        <Star size={20} fill={starred ? "currentColor" : "none"} />
      </ToggleButton>
      <ToggleButton
        pressed={pinned}
        onPressedChange={setPinned}
        color="purple"
        variant="solid"
        style={circleStyle}
      >
        <Pin size={18} fill={pinned ? "currentColor" : "none"} />
      </ToggleButton>
    </div>
  );
}

render(<Demo />);`;

const socialActionsExample = `function Demo() {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(128);
  const [saved, setSaved] = React.useState(false);

  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <ToggleButton
          pressed={liked}
          onPressedChange={(v) => {
            setLiked(v);
            setLikes((n) => v ? n + 1 : n - 1);
          }}
          color="red"
          variant="solid"
          style={{ borderRadius: "9999px", width: "40px", height: "40px", padding: 0 }}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </ToggleButton>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--mantle-color-text)", minWidth: "2ch" }}>
          {likes}
        </span>
      </div>
      <ToggleButton
        pressed={saved}
        onPressedChange={setSaved}
        color="blue"
        style={{ borderRadius: "9999px", width: "40px", height: "40px", padding: 0 }}
      >
        <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
      </ToggleButton>
    </div>
  );
}

render(<Demo />);`;

const toggleButtonProps = [
  {
    name: "pressed",
    type: "boolean",
    description: "Whether the button is pressed (controlled).",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    default: "false",
    description: "Whether the button is initially pressed (uncontrolled).",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean) => void",
    description: "Called when the pressed state changes.",
  },
  {
    name: "variant",
    type: '"solid" | "outline" | "ghost"',
    default: '"solid"',
    description: "Visual style variant.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color when pressed.",
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    default: '"md"',
    description: "Size preset.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the toggle button.",
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
  {
    name: "--mantle-hover",
    type: "CSS variable",
    default: "gradient",
    description:
      'Override the hover background via style. Set to "none" to disable. e.g. style={{ "--mantle-hover": "none" }}',
  },
];

export default function ToggleButtonPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">ToggleButton</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A button that toggles between pressed and unpressed states. Supports
        variants, colors, and sizes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Variants</h2>
      <div className="mt-4">
        <LivePlayground code={variantsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Sizes</h2>
      <div className="mt-4">
        <LivePlayground code={sizesExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Controlled</h2>
      <div className="mt-4">
        <LivePlayground code={controlledExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">With Icons</h2>
      <div className="mt-4">
        <LivePlayground code={withIconsExample} noEditor />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Icon-Only (Circular)</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Circular toggle buttons for actions like like, save, star, and pin. The
        icon fills when pressed.
      </p>
      <div className="mt-4">
        <LivePlayground code={iconOnlyExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Social Actions</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Like with counter and bookmark — common social media patterns.
      </p>
      <div className="mt-4">
        <LivePlayground code={socialActionsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toggleButtonProps} />
    </div>
  );
}
