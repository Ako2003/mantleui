import { renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { useComposedRefs } from "./useComposedRefs";

describe("useComposedRefs", () => {
  it("sets a callback ref", () => {
    const callbackRef = vi.fn();
    const { result } = renderHook(() => useComposedRefs(callbackRef));

    const node = document.createElement("div");
    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
  });

  it("sets an object ref", () => {
    const objectRef = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useComposedRefs(objectRef));

    const node = document.createElement("div");
    result.current(node);

    expect(objectRef.current).toBe(node);
  });

  it("sets multiple refs at once", () => {
    const callbackRef = vi.fn();
    const objectRef = createRef<HTMLDivElement>();
    const { result } = renderHook(() =>
      useComposedRefs(callbackRef, objectRef),
    );

    const node = document.createElement("div");
    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
    expect(objectRef.current).toBe(node);
  });

  it("handles undefined refs gracefully", () => {
    const callbackRef = vi.fn();
    const { result } = renderHook(() =>
      useComposedRefs(undefined, callbackRef, undefined),
    );

    const node = document.createElement("div");
    result.current(node);

    expect(callbackRef).toHaveBeenCalledWith(node);
  });
});
