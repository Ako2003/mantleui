"use client";

import React from "react";
import { LiveProvider, LivePreview, LiveEditor, LiveError } from "react-live";
import * as MantleUI from "@mantleui/react";

const scope = { React, ...MantleUI };

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
    <LiveProvider code={code} scope={scope} noInline={hasRender}>
      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-800">
        <div className="bg-white p-6 dark:bg-zinc-950">
          <LivePreview />
        </div>
        <LiveError className="border-t border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400" />
        {!noEditor && (
          <div className="border-t border-slate-200 dark:border-zinc-800">
            <LiveEditor className="!bg-slate-50 !font-mono !text-sm dark:!bg-zinc-900" />
          </div>
        )}
      </div>
    </LiveProvider>
  );
}
