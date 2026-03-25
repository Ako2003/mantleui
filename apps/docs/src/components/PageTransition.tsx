"use client";

import React from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="mantle-page-enter">{children}</div>;
}
