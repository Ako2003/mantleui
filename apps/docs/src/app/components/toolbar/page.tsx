"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<Toolbar>
  <Button variant="outline" size="sm">Cut</Button>
  <Button variant="outline" size="sm">Copy</Button>
  <Button variant="outline" size="sm">Paste</Button>
  <Separator orientation="vertical" />
  <Button variant="outline" size="sm">Undo</Button>
  <Button variant="outline" size="sm">Redo</Button>
</Toolbar>`;

const verticalExample = `<Toolbar orientation="vertical">
  <Button variant="outline" size="sm">Top</Button>
  <Button variant="outline" size="sm">Middle</Button>
  <Button variant="outline" size="sm">Bottom</Button>
</Toolbar>`;

const textEditorExample = `function Demo() {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);
  const [underline, setUnderline] = React.useState(false);
  const [align, setAlign] = React.useState("left");

  return (
    <Toolbar style={{ flexWrap: "wrap" }}>
      <ToggleButton pressed={bold} onPressedChange={setBold} size="sm">
        <Bold size={16} />
      </ToggleButton>
      <ToggleButton pressed={italic} onPressedChange={setItalic} size="sm">
        <Italic size={16} />
      </ToggleButton>
      <ToggleButton pressed={underline} onPressedChange={setUnderline} size="sm">
        <Underline size={16} />
      </ToggleButton>
      <ToggleButton size="sm">
        <Strikethrough size={16} />
      </ToggleButton>
      <Separator orientation="vertical" />
      <ToggleButtonGroup value={align} onValueChange={setAlign} size="sm">
        <ToggleButton value="left"><AlignLeft size={16} /></ToggleButton>
        <ToggleButton value="center"><AlignCenter size={16} /></ToggleButton>
        <ToggleButton value="right"><AlignRight size={16} /></ToggleButton>
        <ToggleButton value="justify"><AlignJustify size={16} /></ToggleButton>
      </ToggleButtonGroup>
      <Separator orientation="vertical" />
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" startIcon={<Plus size={16} />} />
        </Tooltip.Trigger>
        <Tooltip.Content>Insert</Tooltip.Content>
      </Tooltip>
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" startIcon={<Image size={16} />} />
        </Tooltip.Trigger>
        <Tooltip.Content>Add image</Tooltip.Content>
      </Tooltip>
    </Toolbar>
  );
}

render(<Demo />);`;

const drawingToolsExample = `function Demo() {
  const [tool, setTool] = React.useState("cursor");
  const [color, setColor] = React.useState("#3b82f6");
  const colors = ["#ef4444", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#000000"];

  return (
    <Toolbar style={{ padding: "8px", gap: "4px" }}>
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <ToggleButton pressed={tool === "cursor"} onPressedChange={() => setTool("cursor")} size="sm" color="neutral">
            <Compass size={16} />
          </ToggleButton>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Select</Tooltip.Content>
      </Tooltip>
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <ToggleButton pressed={tool === "pen"} onPressedChange={() => setTool("pen")} size="sm" color="neutral">
            <ClipboardEdit size={16} />
          </ToggleButton>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Draw</Tooltip.Content>
      </Tooltip>
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <ToggleButton pressed={tool === "text"} onPressedChange={() => setTool("text")} size="sm" color="neutral">
            <FileText size={16} />
          </ToggleButton>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Text</Tooltip.Content>
      </Tooltip>
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <ToggleButton pressed={tool === "image"} onPressedChange={() => setTool("image")} size="sm" color="neutral">
            <Image size={16} />
          </ToggleButton>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Image</Tooltip.Content>
      </Tooltip>
      <Separator orientation="vertical" style={{ height: "20px" }} />
      <Tooltip delayMs={200}>
        <Tooltip.Trigger>
          <Button variant="ghost" size="sm" startIcon={<Trash2 size={16} />} color="red" />
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Delete</Tooltip.Content>
      </Tooltip>
      <Separator orientation="vertical" style={{ height: "20px" }} />
      <div style={{ display: "flex", gap: "4px", padding: "0 4px" }}>
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            style={{
              width: "24px", height: "24px", borderRadius: "6px",
              background: c, border: color === c ? "2px solid var(--mantle-color-text)" : "2px solid transparent",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </Toolbar>
  );
}

render(<Demo />);`;

const mediaPlayerExample = `function Demo() {
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(70);
  const [muted, setMuted] = React.useState(false);

  return (
    <Toolbar style={{ alignItems: "center", padding: "10px 16px", gap: "8px", background: "var(--mantle-color-bg-muted)", borderRadius: "12px" }}>
      <Button variant="ghost" size="sm" startIcon={<RefreshCw size={16} />} />
      <Button variant="ghost" size="sm" startIcon={
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 12L5 21V3l14 9z"/></svg>
      } onClick={() => setPlaying(!playing)} />
      <Button variant="ghost" size="sm" startIcon={<ArrowRight size={16} />} />
      <Separator orientation="vertical" style={{ height: "24px", margin: "0 4px" }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", minWidth: "120px" }}>
        <span style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)", fontVariantNumeric: "tabular-nums" }}>1:23</span>
        <div style={{ flex: 1 }}>
          <Slider defaultValue={35} size="sm" style={{ "--mantle-slider-track": "rgba(255,255,255,0.15)" }} />
        </div>
        <span style={{ fontSize: "12px", color: "var(--mantle-color-text-muted)", fontVariantNumeric: "tabular-nums" }}>3:45</span>
      </div>
      <Separator orientation="vertical" style={{ height: "24px", margin: "0 4px" }} />
      <ToggleButton pressed={muted} onPressedChange={setMuted} size="sm" color="neutral">
        <Mic size={16} />
      </ToggleButton>
      <div style={{ width: "100px" }}>
        <Slider value={muted ? 0 : volume} onValueChange={setVolume} size="sm" style={{ "--mantle-slider-track": "rgba(255,255,255,0.15)" }} />
      </div>
    </Toolbar>
  );
}

render(<Demo />);`;

const actionBarExample = `<Toolbar style={{ justifyContent: "space-between", padding: "8px 16px", background: "var(--mantle-color-bg-muted)", borderRadius: "12px" }}>
  <div style={{ display: "flex", gap: "4px" }}>
    <Button variant="ghost" size="sm" startIcon={<Heart size={16} />}>Like</Button>
    <Button variant="ghost" size="sm" startIcon={<Bookmark size={16} />}>Save</Button>
    <Button variant="ghost" size="sm" startIcon={<Download size={16} />}>Download</Button>
  </div>
  <div style={{ display: "flex", gap: "4px" }}>
    <Button variant="ghost" size="sm" color="red" startIcon={<Trash2 size={16} />}>Delete</Button>
    <Dropdown color="neutral">
      <Dropdown.Trigger><MoreHorizontal size={16} /></Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Share</Dropdown.Item>
        <Dropdown.Item>Report</Dropdown.Item>
        <Dropdown.Item>Copy Link</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</Toolbar>`;

const toolbarProps = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description: "Layout direction of the toolbar items.",
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

export default function ToolbarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Toolbar</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A container for grouping action buttons and controls in a horizontal or
        vertical bar.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Vertical</h2>
      <div className="mt-4">
        <LivePlayground code={verticalExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Text Editor</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A rich text toolbar with formatting toggles, alignment group, and insert
        buttons with tooltips.
      </p>
      <div className="mt-4">
        <LivePlayground code={textEditorExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Drawing Tools</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A vertical sidebar toolbar with tool selection, delete button, and color
        palette.
      </p>
      <div className="mt-4">
        <LivePlayground code={drawingToolsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Media Player</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A playback toolbar with transport controls, progress slider, mute
        toggle, and volume slider.
      </p>
      <div className="mt-4">
        <LivePlayground code={mediaPlayerExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Action Bar</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        A split toolbar with left-aligned actions and a right-aligned dropdown
        menu.
      </p>
      <div className="mt-4">
        <LivePlayground code={actionBarExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={toolbarProps} />
    </div>
  );
}
