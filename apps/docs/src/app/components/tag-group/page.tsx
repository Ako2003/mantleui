"use client";

import { LivePlayground } from "@/components/LivePlayground";
import { PropsTable } from "@/components/PropsTable";

const basicExample = `<TagGroup label="Technologies">
  <TagGroup.Tag value="react">React</TagGroup.Tag>
  <TagGroup.Tag value="typescript">TypeScript</TagGroup.Tag>
  <TagGroup.Tag value="nodejs">Node.js</TagGroup.Tag>
</TagGroup>`;

const removableExample = `function Demo() {
  const [tags, setTags] = React.useState(["react", "typescript", "nodejs", "graphql"]);
  const handleRemove = (value) => {
    setTags((prev) => prev.filter((t) => t !== value));
  };
  return (
    <TagGroup label="Skills">
      {tags.map((tag) => (
        <TagGroup.Tag key={tag} value={tag} onRemove={() => handleRemove(tag)}>
          {tag}
        </TagGroup.Tag>
      ))}
    </TagGroup>
  );
}

render(<Demo />);`;

const colorsExample = `<TagGroup label="Status">
  <TagGroup.Tag value="open" color="green">Open</TagGroup.Tag>
  <TagGroup.Tag value="review" color="yellow">In Review</TagGroup.Tag>
  <TagGroup.Tag value="closed" color="red">Closed</TagGroup.Tag>
  <TagGroup.Tag value="archived" color="neutral">Archived</TagGroup.Tag>
</TagGroup>`;

const tagGroupProps = [
  {
    name: "label",
    type: "string",
    description: "Label displayed above the tag group.",
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

const tagProps = [
  {
    name: "value",
    type: "string",
    description: "The unique value of the tag.",
  },
  {
    name: "onRemove",
    type: "() => void",
    description:
      "Called when the remove button is clicked. Shows a remove button when provided.",
  },
  {
    name: "color",
    type: '"blue" | "red" | "green" | "yellow" | "purple" | "neutral" | string',
    default: '"blue"',
    description: "Accent color of the tag.",
  },
];

export default function TagGroupPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">TagGroup</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A group of tags for displaying and managing a collection of labels.
        Supports removable tags with color variants.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Basic</h2>
      <div className="mt-4">
        <LivePlayground code={basicExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Removable Tags</h2>
      <div className="mt-4">
        <LivePlayground code={removableExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Colors</h2>
      <div className="mt-4">
        <LivePlayground code={colorsExample} />
      </div>

      <h2 className="mt-10 text-xl font-semibold">TagGroup Props</h2>
      <PropsTable props={tagGroupProps} />

      <h2 className="mt-10 text-xl font-semibold">TagGroup.Tag Props</h2>
      <PropsTable props={tagProps} />
    </div>
  );
}
