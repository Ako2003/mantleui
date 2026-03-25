import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders a kbd element", () => {
    render(<Kbd>Enter</Kbd>);
    const el = screen.getByText("Enter");
    expect(el.tagName).toBe("KBD");
  });

  it("shows content", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘")).toBeInTheDocument();
  });

  it("applies the base class", () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText("K")).toHaveClass("mantle-kbd");
  });

  it("applies custom className", () => {
    render(<Kbd className="custom">Shift</Kbd>);
    expect(screen.getByText("Shift")).toHaveClass("mantle-kbd", "custom");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref}>Tab</Kbd>);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });

  it("passes through HTML attributes", () => {
    render(<Kbd data-testid="kbd-test">Esc</Kbd>);
    expect(screen.getByTestId("kbd-test")).toBeInTheDocument();
  });
});
