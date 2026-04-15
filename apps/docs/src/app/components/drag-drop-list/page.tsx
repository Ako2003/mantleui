"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PropsTable } from "@/components/PropsTable";
import { CodeBlock } from "@/components/CodeBlock";

const DragDropList = dynamic(
  () => import("@mantleui/react/motion").then((mod) => mod.DragDropList),
  { ssr: false },
) as unknown as typeof import("@mantleui/react/motion").DragDropList;

const dragDropListProps = [
  {
    name: "items",
    type: "T[]",
    description: "The current list of items.",
  },
  {
    name: "onReorder",
    type: "(items: T[]) => void",
    description: "Called with the new list order after a drag ends.",
  },
  {
    name: "renderItem",
    type: "(item: T, index: number) => ReactNode",
    description: "Render function for each item.",
  },
  {
    name: "keyAccessor",
    type: "(item: T) => string | number",
    description:
      "Returns a stable key for each item. Defaults to the item itself.",
  },
];

interface Todo {
  id: string;
  title: string;
  description: string;
  accent: string;
}

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Design system audit",
    description: "Review tokens and component coverage.",
    accent: "from-indigo-500 to-purple-600",
  },
  {
    id: "2",
    title: "Write component docs",
    description: "Cover props, usage, and edge cases.",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "Add visual regression tests",
    description: "Baseline snapshots for motion components.",
    accent: "from-sky-500 to-blue-600",
  },
  {
    id: "4",
    title: "Deploy preview environment",
    description: "Wire up Vercel preview for the docs app.",
    accent: "from-rose-500 to-orange-500",
  },
  {
    id: "5",
    title: "Ship release notes",
    description: "Summarize the new framer-motion components.",
    accent: "from-fuchsia-500 to-pink-600",
  },
];

function DragHandle() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-zinc-500"
      aria-hidden
    >
      <circle cx="9" cy="5" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="9" cy="19" r="1" />
      <circle cx="15" cy="5" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="15" cy="19" r="1" />
    </svg>
  );
}

export default function DragDropListPage() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <div>
      <h1 className="text-3xl font-bold">DragDropList</h1>
      <p className="mt-2 text-slate-600 dark:text-zinc-400">
        A reorderable list powered by framer-motion. Drag items to rearrange
        them and the component calls <code>onReorder</code> with the new order.
        Headless-style API — you render each row yourself.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Interactive Demo</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">
        Grab any card and drag it up or down to reorder the todo list.
      </p>
      <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <DragDropList
          items={todos}
          onReorder={setTodos}
          keyAccessor={(todo) => todo.id}
          renderItem={(todo) => (
            <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
              <DragHandle />
              <div
                className={`h-10 w-10 flex-shrink-0 rounded-md bg-gradient-to-br ${todo.accent}`}
                aria-hidden
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">
                  {todo.title}
                </h3>
                <p className="text-xs text-zinc-400">{todo.description}</p>
              </div>
            </div>
          )}
        />
      </div>

      <h2 className="mt-10 text-xl font-semibold">Usage</h2>
      <CodeBlock
        code={`import { DragDropList } from "@mantleui/react/motion";
import { useState } from "react";

interface Todo {
  id: string;
  title: string;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Design system audit" },
    { id: "2", title: "Write component docs" },
    { id: "3", title: "Deploy preview" },
  ]);

  return (
    <DragDropList
      items={todos}
      onReorder={setTodos}
      keyAccessor={(todo) => todo.id}
      renderItem={(todo) => (
        <div className="card">
          <DragHandle />
          <span>{todo.title}</span>
        </div>
      )}
    />
  );
}`}
      />

      <h2 className="mt-10 text-xl font-semibold">Props</h2>
      <PropsTable props={dragDropListProps} />
    </div>
  );
}
