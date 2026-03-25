"use client";

import React from "react";
import { LiveProvider, LivePreview, LiveEditor, LiveError } from "react-live";
import type { PrismTheme } from "prism-react-renderer";
import * as MantleUI from "@mantleui/react";

const scope = { React, ...MantleUI };

const darkTheme: PrismTheme = {
  plain: {
    color: "#e4e4e7",
    backgroundColor: "#18181b",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#71717a" },
    },
    { types: ["punctuation"], style: { color: "#a1a1aa" } },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#7dd3fc" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin"],
      style: { color: "#86efac" },
    },
    { types: ["operator", "entity", "url"], style: { color: "#a1a1aa" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#c4b5fd" } },
    { types: ["function", "class-name"], style: { color: "#fde68a" } },
    { types: ["regex", "important", "variable"], style: { color: "#fca5a5" } },
  ],
};

interface LivePlaygroundProps {
  code: string;
  noEditor?: boolean;
}

export function LivePlayground({
  code,
  noEditor = false,
}: LivePlaygroundProps) {
  const hasRender = code.includes("render(");

  return (
    <LiveProvider
      code={code}
      scope={scope}
      noInline={hasRender}
      theme={darkTheme}
    >
      <div className="rounded-lg border border-slate-200 dark:border-zinc-800">
        <div className="rounded-t-lg bg-white p-6 dark:bg-zinc-950">
          <LivePreview />
        </div>
        <LiveError className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400" />
        {!noEditor && (
          <div className="border-t border-slate-200 dark:border-zinc-800">
            <LiveEditor className="!font-mono !text-sm" />
          </div>
        )}
      </div>
    </LiveProvider>
  );
}
