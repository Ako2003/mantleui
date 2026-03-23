import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllable } from "./useControllable";

describe("useControllable", () => {
  describe("Uncontrolled mode", () => {
    it("returns the default value initially", () => {
      const { result } = renderHook(() =>
        useControllable({ value: undefined, defaultValue: "hello" }),
      );
      expect(result.current[0]).toBe("hello");
    });

    it("updates internal state when setValue is called", () => {
      const { result } = renderHook(() =>
        useControllable({ value: undefined, defaultValue: 0 }),
      );

      act(() => result.current[1](42));
      expect(result.current[0]).toBe(42);
    });

    it("calls onChange when setValue is called", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({ value: undefined, defaultValue: 0, onChange }),
      );

      act(() => result.current[1](5));
      expect(onChange).toHaveBeenCalledWith(5);
    });
  });

  describe("Controlled mode", () => {
    it("returns the controlled value", () => {
      const { result } = renderHook(() =>
        useControllable({ value: "controlled", defaultValue: "default" }),
      );
      expect(result.current[0]).toBe("controlled");
    });

    it("does not update internal state in controlled mode", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useControllable({ value, defaultValue: "default" }),
        { initialProps: { value: "first" as string | undefined } },
      );

      act(() => result.current[1]("new-value"));
      // Value stays as the controlled prop, not the setValue arg
      expect(result.current[0]).toBe("first");

      // Updates when prop changes
      rerender({ value: "second" });
      expect(result.current[0]).toBe("second");
    });

    it("calls onChange in controlled mode", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllable({
          value: "controlled",
          defaultValue: "default",
          onChange,
        }),
      );

      act(() => result.current[1]("new"));
      expect(onChange).toHaveBeenCalledWith("new");
    });
  });
});
