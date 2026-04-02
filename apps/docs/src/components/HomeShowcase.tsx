"use client";

import React, { useState } from "react";
import {
  Button,
  Toggle,
  Badge,
  Switch,
  Tabs,
  Slider,
  ProgressBar,
  Chip,
  Avatar,
  Accordion,
  Alert,
  Tooltip,
  Card,
  Separator,
} from "@mantleui/react";

const accentColors = [
  { name: "Blue", value: "blue" as const },
  { name: "Red", value: "red" as const },
  { name: "Green", value: "green" as const },
  { name: "Yellow", value: "yellow" as const },
  { name: "Purple", value: "purple" as const },
];

export function ComponentShowcase() {
  const [color, setColor] = useState<
    "blue" | "red" | "green" | "yellow" | "purple"
  >("blue");
  const [sliderVal, setSliderVal] = useState(65);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <div className="mx-auto max-w-4xl">
      {/* Color Picker Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <span className="mr-2 text-sm font-medium text-slate-500 dark:text-zinc-500">
          Accent:
        </span>
        {accentColors.map((c) => (
          <button
            key={c.value}
            onClick={() => setColor(c.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              color === c.value
                ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Buttons & Badges */}
        <ShowcaseCard title="Buttons & Badges">
          <div className="flex flex-wrap items-center gap-2">
            <Button color={color} size="sm">
              Primary
            </Button>
            <Button color={color} variant="outline" size="sm">
              Outline
            </Button>
            <Button color={color} variant="ghost" size="sm">
              Ghost
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge color={color} variant="solid">
              New
            </Badge>
            <Badge color={color} variant="outline">
              Beta
            </Badge>
            <Badge color={color} variant="subtle">
              Draft
            </Badge>
            <Chip color={color} size="sm">
              React
            </Chip>
            <Chip color={color} size="sm">
              TypeScript
            </Chip>
          </div>
        </ShowcaseCard>

        {/* Toggle & Switch */}
        <ShowcaseCard title="Toggle & Switch">
          <div className="flex items-center gap-4">
            <Toggle color={color} defaultPressed>
              Bold
            </Toggle>
            <Toggle color={color}>Italic</Toggle>
            <Toggle color={color}>Underline</Toggle>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Switch
              color={color}
              checked={switchOn}
              onCheckedChange={setSwitchOn}
              label="Notifications"
            />
          </div>
          <div className="mt-3 flex items-center gap-4">
            <Switch color={color} defaultChecked label="Dark mode" />
          </div>
        </ShowcaseCard>

        {/* Slider & Progress */}
        <ShowcaseCard title="Slider & Progress">
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-500 dark:text-zinc-500">
                <span>Volume</span>
                <span>{sliderVal}%</span>
              </div>
              <Slider
                color={color}
                value={sliderVal}
                onValueChange={setSliderVal}
              />
            </div>
            <div>
              <div className="mb-2 text-xs text-slate-500 dark:text-zinc-500">
                Upload progress
              </div>
              <ProgressBar value={sliderVal} color={color} size="md" />
            </div>
          </div>
        </ShowcaseCard>

        {/* Tabs */}
        <ShowcaseCard title="Tabs">
          <Tabs color={color} defaultValue="preview">
            <Tabs.List>
              <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
              <Tabs.Trigger value="code">Code</Tabs.Trigger>
              <Tabs.Trigger value="tests">Tests</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="preview">
              <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
                Live component preview with hot reload.
              </p>
            </Tabs.Content>
            <Tabs.Content value="code">
              <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
                Source code with syntax highlighting.
              </p>
            </Tabs.Content>
            <Tabs.Content value="tests">
              <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400">
                676+ tests with Vitest & RTL.
              </p>
            </Tabs.Content>
          </Tabs>
        </ShowcaseCard>

        {/* Avatars & Cards */}
        <ShowcaseCard title="Avatars & Cards">
          <div className="flex items-center gap-3">
            <Avatar name="Alice" color={color} size="sm" />
            <Avatar name="Bob" color={color} size="md" />
            <Avatar name="Charlie" color={color} size="lg" />
            <Avatar
              src="https://i.pravatar.cc/80?img=12"
              name="Diana"
              size="lg"
            />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-2">
            <Tooltip content="Copy to clipboard">
              <Button color={color} variant="outline" size="sm">
                Hover me
              </Button>
            </Tooltip>
            <Tooltip content="Save changes" placement="bottom">
              <Button color={color} variant="ghost" size="sm">
                Bottom tip
              </Button>
            </Tooltip>
          </div>
        </ShowcaseCard>

        {/* Accordion */}
        <ShowcaseCard title="Accordion">
          <Accordion color={color}>
            <Accordion.Item value="what">
              <Accordion.Trigger>What is MantleUI?</Accordion.Trigger>
              <Accordion.Content>
                A React component library with 73 components, built to showcase
                frontend architecture and design patterns.
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="patterns">
              <Accordion.Trigger>Which patterns?</Accordion.Trigger>
              <Accordion.Content>
                Compound components, headless hooks, polymorphic components, and
                controlled/uncontrolled patterns.
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </ShowcaseCard>
      </div>

      {/* Alert */}
      <div className="mt-6">
        <Alert color={color} variant="info">
          <Alert.Title>Interactive Demo</Alert.Title>
          <Alert.Description>
            Change the accent color above to see all components update in
            real-time. Every component supports 6 built-in colors plus custom
            hex values.
          </Alert.Description>
        </Alert>
      </div>
    </div>
  );
}

function ShowcaseCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/80">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-600">
        {title}
      </h3>
      {children}
    </div>
  );
}
